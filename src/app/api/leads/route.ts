import { NextResponse } from 'next/server';
import { waitUntil } from '@vercel/functions';
import { db, quoteSystemConfigured } from '@/lib/server/db';
import { draftReply } from '@/lib/quote-agent';
import { notifyOwner, sendEmail } from '@/lib/server/notify';
import { renderAck } from '@/lib/server/render-quote';
import { releaseDraft } from '@/lib/server/autosend';
import { createThread, tagSubject } from '@/lib/server/threads';

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
 * Website form -> lead -> instant acknowledgement -> AI draft -> reply.
 *
 * The visitor gets a response as soon as the lead is safely stored; they never
 * wait on the model. Everything after that happens once the response is sent,
 * via waitUntil:
 *
 *   1. A fixed acknowledgement email goes out immediately, so nobody is left
 *      wondering whether the form worked.
 *   2. The agent drafts the real reply.
 *   3. autosend.ts decides whether it goes out by itself or waits in /studio.
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
    origin: 'form',
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
  waitUntil(handleInBackground(inserted as LeadRow));

  return NextResponse.json({ ok: true });
}

async function handleInBackground(lead: LeadRow): Promise<void> {
  let threadId: string | null = null;

  try {
    const subject = `Your enquiry with WL CreationX${lead.service ? ` — ${lead.service}` : ''}`;
    const thread = await createThread({ leadId: lead.id, subject });
    threadId = thread.id;

    // 1. Acknowledge immediately. This is a fixed template with no AI in it, so
    //    it needs no approval and cannot say anything unintended. It is sent
    //    before the model runs so a slow or failing model never delays it.
    const ack = renderAck({ clientName: lead.name, service: lead.service });
    try {
      await sendEmail({
        to: lead.email,
        subject: tagSubject(ack.subject, thread.ref),
        text: ack.text,
        html: ack.html,
      });
      await db().from('quote_messages').insert({
        thread_id: thread.id,
        role: 'studio',
        subject: ack.subject,
        body: ack.text,
        action: 'ack',
        sent_at: new Date().toISOString(),
        approved_by: 'automatic',
      });
    } catch (err) {
      // A failed acknowledgement must not stop the real reply being drafted.
      console.error('[leads] acknowledgement failed', err);
    }

    // 2. Draft the real reply.
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

    const { data: message } = await db()
      .from('quote_messages')
      .insert({
        thread_id: thread.id,
        role: 'draft',
        subject: draft.email_subject,
        body: draft.email_body,
        action: draft.action,
        intent: draft.intent,
        reasoning: draft.reasoning,
        confidence: draft.confidence,
        quote_lines: draft.lines,
        quote_total: draft.total,
      })
      .select()
      .single();

    if (!message) throw new Error('could not store draft');

    // 3. Send it, or queue it for approval.
    await releaseDraft({
      messageId: message.id,
      threadId: thread.id,
      draft,
      leadName: lead.name,
      summary: lead.details.slice(0, 160),
    });
  } catch (err) {
    console.error('[leads] drafting failed (lead was saved)', err);
    // Still ping the owner so a lead is never silently missed.
    await notifyOwner({
      title: `New lead: ${lead.name}`,
      summary: `${lead.details.slice(0, 140)} — AI draft failed, reply manually.`,
      threadId: threadId ?? lead.id,
    }).catch(() => {});
  }
}
