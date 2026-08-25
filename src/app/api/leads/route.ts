import { NextResponse } from 'next/server';
import { db, quoteSystemConfigured } from '@/lib/server/db';
import { draftReply } from '@/lib/quote-agent';
import { notifyOwner } from '@/lib/server/notify';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Website form -> lead -> AI draft -> owner notification.
 *
 * Deliberately does NOT email the client. The draft waits in /studio for a
 * human to approve. Failure to draft never fails the request: capturing the
 * lead is what matters, the AI is a convenience on top.
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
    // Nothing to write to — surface a clear error rather than pretending.
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

  // Everything below is best-effort. The lead is already safe.
  try {
    const subject = `Your enquiry with WL CreationX${lead.service ? ` — ${lead.service}` : ''}`;

    const { data: thread } = await db()
      .from('quote_threads')
      .insert({ lead_id: inserted.id, subject })
      .select()
      .single();

    if (thread) {
      const draft = await draftReply({ enquiry: { ...lead, details } });

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
            ? `Quote ready: ${name} — ${draft.totalFormatted}`
            : `New lead: ${name} (needs info)`,
        summary: details.slice(0, 160),
        threadId: thread.id,
      });
    }
  } catch (err) {
    console.error('[leads] drafting failed (lead was saved)', err);
    // Still ping the owner so a lead is never silently missed.
    await notifyOwner({
      title: `New lead: ${name}`,
      summary: `${details.slice(0, 140)} — AI draft failed, reply manually.`,
      threadId: inserted.id,
    }).catch(() => {});
  }

  return NextResponse.json({ ok: true });
}
