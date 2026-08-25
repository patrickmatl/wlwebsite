import { NextResponse } from 'next/server';
import { waitUntil } from '@vercel/functions';
import { db, quoteSystemConfigured } from '@/lib/server/db';
import { draftReply } from '@/lib/quote-agent';
import { notifyOwner } from '@/lib/server/notify';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
// The AI draft runs in the background via waitUntil, but the function must stay
// alive long enough to finish it after the response is sent.
export const maxDuration = 60;

type LeadRow = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  budget: string | null;
  timeline: string | null;
  details: string;
};

/**
 * Website form -> lead -> (background) AI draft -> owner notification.
 *
 * The visitor gets a response as soon as the lead is safely stored — they never
 * wait on the model. Drafting and notifying happen after the response is sent,
 * via waitUntil. Nothing is emailed to the client: the draft waits in /studio
 * for a human to approve.
 */
export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  // Honeypot — bots fill hidden fields, humans don't.
  if (typeof payload.website === 'string' && payload.website.trim() !== '') {
    return NextResponse.json({ ok: true }); // silently accept, store nothing
  }

  const name = String(payload.name ?? '').trim();
  const email = String(payload.email ?? '').trim();
  const details = String(payload.details ?? payload.message ?? '').trim();

  if (!name || !email || !details) {
    return NextResponse.json(
      { error: 'Name, email and project details are required.' },
      { status: 400 },
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'That email address looks invalid.' }, { status: 400 });
  }

  if (!quoteSystemConfigured()) {
    return NextResponse.json(
      { error: 'Enquiry system is not configured. Please phone or WhatsApp us.' },
      { status: 503 },
    );
  }

  const lead = {
    name,
    email,
    phone: payload.phone ? String(payload.phone).trim() : null,
    service: payload.service ? String(payload.service).trim() : null,
    budget: payload.budget ? String(payload.budget).trim() : null,
    timeline: payload.timeline ? String(payload.timeline).trim() : null,
    details,
    source_page: payload.source_page ? String(payload.source_page).slice(0, 200) : null,
  };

  const { data: inserted, error: insertError } = await db()
    .from('leads')
    .insert(lead)
    .select()
    .single();

  if (insertError || !inserted) {
    console.error('[leads] insert failed', insertError);
    return NextResponse.json({ error: 'Could not save your enquiry.' }, { status: 500 });
  }

  // Lead is safe. Everything below runs after the response is sent.
  waitUntil(draftInBackground(inserted as LeadRow));

  return NextResponse.json({ ok: true });
}

async function draftInBackground(lead: LeadRow): Promise<void> {
  try {
    const subject = `Your enquiry with WL CreationX${lead.service ? ` — ${lead.service}` : ''}`;

    const { data: thread } = await db()
      .from('quote_threads')
      .insert({ lead_id: lead.id, subject })
      .select()
      .single();

    if (!thread) throw new Error('could not create thread');

    const draft = await draftReply({
      enquiry: {
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        service: lead.service,
        budget: lead.budget,
        timeline: lead.timeline,
        details: lead.details,
      },
    });

    await db().from('quote_messages').insert({
      thread_id: thread.id,
      role: 'draft',
      subject: draft.email_subject,
      body: draft.email_body,
      action: draft.action,
      reasoning: draft.reasoning,
      confidence: draft.confidence,
      quote_lines: draft.lines,
      quote_total: draft.total,
    });

    await notifyOwner({
      title:
        draft.action === 'quote'
          ? `Quote ready: ${lead.name} — ${draft.totalFormatted}`
          : `New lead: ${lead.name} (needs info)`,
      summary: lead.details.slice(0, 160),
      threadId: thread.id,
    });
  } catch (err) {
    console.error('[leads] drafting failed (lead was saved)', err);
    // Still ping the owner so a lead is never silently missed.
    await notifyOwner({
      title: `New lead: ${lead.name}`,
      summary: `${lead.details.slice(0, 140)} — AI draft failed, reply manually.`,
      threadId: lead.id,
    }).catch(() => {});
  }
}
