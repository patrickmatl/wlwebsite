import { NextResponse } from 'next/server';
import { waitUntil } from '@vercel/functions';
import { db, quoteSystemConfigured } from '@/lib/server/db';
import { draftReply } from '@/lib/quote-agent';
import { notifyOwner, sendEmail } from '@/lib/server/notify';
import { renderAck } from '@/lib/server/render-quote';
import { releaseDraft } from '@/lib/server/autosend';
import { createThread, tagSubject } from '@/lib/server/threads';
import { syncLeadToCrm } from '@/lib/server/lead-sync';

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

    // Put the person and the opportunity into the CRM. Best-effort by design:
    // it must never delay or block the reply the client is waiting for.
    await syncLeadToCrm({ ...lead, origin: 'form' });

    // Draft the real reply first.
    //
    // The acknowledgement is deliberately NOT sent yet. When the autopilot is
    // on, a personal reply lands within about fifteen seconds — and a generic
    // "we have your enquiry" arriving one minute before a real answer is the
    // single most automated-feeling thing this system could do. So the receipt
    // is only sent if the real reply is not going straight out.
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

    const released = await releaseDraft({
      messageId: message.id,
      threadId: thread.id,
      draft,
      leadName: lead.name,
      summary: lead.details.slice(0, 160),
    });

    // Nothing went to the client — the draft is waiting for a human, or it was
    // classified as needing one. Send the receipt so they are not left wondering
    // whether the form worked.
    if (!released.sent) await sendAcknowledgement(lead, thread.ref);
  } catch (err) {
    console.error('[leads] drafting failed (lead was saved)', err);

    // The model failed, so the client has heard nothing at all. The receipt is
    // now the only thing standing between them and silence.
    await sendAcknowledgement(lead, null).catch(() => {});

    // Still ping the owner so a lead is never silently missed.
    await notifyOwner({
      title: `New lead: ${lead.name}`,
      summary: `${lead.details.slice(0, 140)} — AI draft failed, reply manually.`,
      threadId: threadId ?? lead.id,
    }).catch(() => {});
  }
}

/**
 * The fixed receipt.
 *
 * No AI in it, so it needs no approval and cannot say anything unintended. Sent
 * only when a real reply is not going out immediately — see handleInBackground.
 */
async function sendAcknowledgement(lead: LeadRow, ref: string | null): Promise<void> {
  try {
    const ack = renderAck({ clientName: lead.name, service: lead.service });
    await sendEmail({
      to: lead.email,
      subject: tagSubject(ack.subject, ref),
      text: ack.text,
      html: ack.html,
    });
  } catch (err) {
    console.error('[leads] acknowledgement failed', err);
  }
}
