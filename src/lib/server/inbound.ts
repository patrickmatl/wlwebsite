import { db } from './db';
import { draftReply, type ConversationTurn, type QuoteDraft } from '@/lib/quote-agent';
import { notifyOwner } from './notify';
import { releaseDraft } from './autosend';
import { createThread, extractThreadRef, findThreadForReply, type ThreadRow } from './threads';
import { syncLeadToCrm } from './lead-sync';
import { handleProofOfPayment } from './payments';
import type { InboundAttachment } from './proof-of-payment';

/**
 * Every inbound email ends up here, whichever way it arrived:
 *   - /api/inbound       — Resend's webhook (push)
 *   - /api/inbound/poll  — IMAP poll of the quotes@ mailbox (pull, cPanel cron)
 *
 * Three cases are handled:
 *   1. A reply on a conversation we already know about -> continue the thread.
 *   2. A cold email from someone with no lead -> create the lead and start one.
 *      This is how a client who emails the studio directly, without ever
 *      touching the website form, still gets an automated reply.
 *   3. Spam, newsletters and sales pitches -> classified and dropped, without
 *      creating a lead or waking anyone.
 *
 * Whether the drafted reply is actually sent is decided in autosend.ts.
 */

/** Strip quoted history so the agent reads only what the client just wrote. */
export function stripQuotedReply(text: string): string {
  const cutMarkers = [
    /^On .+ wrote:$/m,
    /^-{2,}\s*Original Message\s*-{2,}$/im,
    /^_{10,}$/m,
    /^From:\s.+$/m,
    /^─{20,}$/m, // our own quote divider
    /^--\s*$/m, // signature delimiter
  ];
  let out = text;
  for (const marker of cutMarkers) {
    const m = out.match(marker);
    if (m && m.index !== undefined) out = out.slice(0, m.index);
  }
  return out
    .split('\n')
    .filter((l) => !l.trim().startsWith('>'))
    .join('\n')
    .trim();
}

/** Pull a bare address out of "Name <addr@host>" or a plain address. */
export function parseAddress(raw: string): string {
  return (raw.match(/<([^>]+)>/)?.[1] ?? raw).trim().toLowerCase();
}

/** Pull the display name out of "Name <addr@host>", falling back to the local part. */
export function parseDisplayName(raw: string, email: string): string {
  const quoted = raw.match(/^\s*"?([^"<]+?)"?\s*</);
  const name = quoted?.[1]?.trim();
  if (name && !name.includes('@')) return name;

  // "john.smith@" -> "John Smith"
  const local = email.split('@')[0] ?? 'there';
  return local
    .replace(/[._-]+/g, ' ')
    .replace(/\d+/g, '')
    .trim()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
    .trim();
}

/**
 * Scams that must never reach the model at all.
 *
 * The agent is told to ignore these, and it does. This is the second lock: a
 * fixed list, checked before any AI runs, so no model slip and no cleverly
 * worded message can ever produce a reply to one. Replying is the whole point
 * of these emails — it confirms a human reads this address.
 *
 * Deliberately narrow. Every pattern names a specific racket rather than a mood,
 * because "urgent" and "final notice" appear in real client emails too, and a
 * missed enquiry costs far more than one scam the model has to classify itself.
 */
const SCAM_PATTERNS: RegExp[] = [
  // The domain-renewal racket, in its usual disguises. The gap between the noun
  // and the verb allows dots on purpose: the domain name itself sits in there
  // ("your domain wlcreationx.co.za is expiring"), and excluding dots made the
  // commonest version of this scam the one pattern that missed.
  /\bdomain\b[^\n]{0,40}\b(expir|renew|suspend|deactivat)/i,
  /\b(renew|renewal)\b[^\n]{0,30}\b(listing|registration|subscription)\b/i,
  /search engine (submission|registration|listing)/i,
  /\bseo (submission|listing)\b/i,
  // Payment and credential bait.
  /\b(unclaimed|undelivered)\b[^\n]{0,20}\b(parcel|package|shipment)\b/i,
  /\byour (account|mailbox|password)\b[^\n]{0,30}\b(suspend|expir|deactivat|verif)/i,
  /\b(verify|confirm)\b[^\n]{0,25}\b(bank|banking|card|payment) details\b/i,
  // Trademark and registry shakedowns.
  /\btrademark\b[^\n]{0,40}\b(application|infringement|registration)\b/i,
  /\b(business|company) (award|nomination)\b[^\n]{0,30}\b(fee|payment|invoice)\b/i,
];

/** True when a message matches a known racket outright. */
export function looksLikeScam(subject: string | null | undefined, body: string): boolean {
  // Only the opening of the body: these emails lead with the hook, and scanning
  // a long forwarded thread invites false positives from quoted history.
  const haystack = [subject ?? '', body.slice(0, 1200)].join('\n');
  return SCAM_PATTERNS.some((pattern) => pattern.test(haystack));
}

export type InboundResult =
  | { handled: true; threadId: string; action: string; sent: boolean; newLead: boolean }
  | { handled: false; reason: string };

export async function processInboundEmail(params: {
  fromRaw: string;
  subject?: string | null;
  text: string;
  /** Filenames of anything attached — the agent is told they exist. */
  attachments?: string[];
  /**
   * The attachments themselves, where we have them. Only the IMAP path
   * supplies these, and only proof-of-payment reading looks at them; the
   * drafting agent still works from filenames alone.
   */
  files?: InboundAttachment[];
}): Promise<InboundResult> {
  const fromEmail = parseAddress(params.fromRaw ?? '');
  const body = stripQuotedReply(params.text ?? '');

  if (!fromEmail || !body) return { handled: false, reason: 'no usable sender or body' };

  const ref = extractThreadRef(params.subject, params.text);
  const existing = await findThreadForReply({ ref, email: fromEmail });

  return existing
    ? continueThread({ ...params, fromEmail, body, existing })
    : startFromColdEmail({ ...params, fromEmail, body });
}

/** A reply on a conversation we already have. */
async function continueThread(params: {
  fromEmail: string;
  body: string;
  subject?: string | null;
  attachments?: string[];
  files?: InboundAttachment[];
  existing: { thread: ThreadRow; lead: Record<string, unknown> };
}): Promise<InboundResult> {
  const { thread, lead } = params.existing;

  await db().from('quote_messages').insert({
    thread_id: thread.id,
    role: 'client',
    subject: params.subject ?? null,
    body: params.body,
  });

  // Money is settled before the drafting agent ever sees the message. A proof
  // of payment is reconciled against the invoice record by payments.ts, so no
  // figure a client is going to check against their bank is ever produced by a
  // model. If this is not about a payment it returns handled:false and the
  // ordinary path continues untouched.
  const payment = await handleProofOfPayment({
    leadId: lead.id as string,
    leadName: lead.name as string,
    leadEmail: lead.email as string,
    threadId: thread.id,
    threadRef: thread.ref,
    threadSubject: thread.subject,
    subject: params.subject,
    body: params.body,
    files: params.files ?? [],
  }).catch((err) => {
    console.error('[inbound] proof-of-payment handling failed', err);
    return { handled: false as const };
  });

  if (payment.handled) {
    await db()
      .from('quote_threads')
      .update({ follow_ups_sent: 0 })
      .eq('id', thread.id);
    return {
      handled: true,
      threadId: thread.id,
      action: payment.credited ? 'payment' : 'payment_held',
      sent: true,
      newLead: false,
    };
  }

  // A client who replies has re-engaged: any follow-up count starts over.
  await db()
    .from('quote_threads')
    .update({ state: 'awaiting_approval', follow_ups_sent: 0 })
    .eq('id', thread.id);

  try {
    // Rebuild the conversation from sent messages only — drafts never happened
    // as far as the client is concerned.
    const { data: msgs } = await db()
      .from('quote_messages')
      .select('role, body, sent_at')
      .eq('thread_id', thread.id)
      .order('created_at', { ascending: true });

    const history: ConversationTurn[] = (msgs ?? [])
      .filter((m) => m.role === 'client' || (m.role === 'studio' && m.sent_at))
      .map((m) => ({ role: m.role === 'client' ? 'client' : 'studio', text: m.body }));

    const draft = await draftReply({
      enquiry: leadToEnquiry(lead),
      history,
      attachments: params.attachments,
    });

    return await storeAndRelease({
      threadId: thread.id,
      draft,
      leadName: String(lead.name ?? 'Client'),
      leadEmail: String(lead.email ?? '') || null,
      summary: params.body.slice(0, 160),
      newLead: false,
    });
  } catch (err) {
    console.error('[inbound] drafting failed', err);
    await notifyOwner({
      title: `${lead.name} replied (AI draft failed)`,
      summary: params.body.slice(0, 160),
      threadId: thread.id,
    }).catch(() => {});
    return { handled: true, threadId: thread.id, action: 'failed', sent: false, newLead: false };
  }
}

/**
 * Nobody we know. Classify it first: only genuine enquiries become leads, so
 * the pipeline doesn't fill up with newsletters and cold sales mail.
 */
async function startFromColdEmail(params: {
  fromRaw: string;
  fromEmail: string;
  body: string;
  subject?: string | null;
  attachments?: string[];
}): Promise<InboundResult> {
  const name = parseDisplayName(params.fromRaw, params.fromEmail);

  // Checked before the model runs, and before any lead is created. Nothing is
  // sent, nobody is notified, and no record is kept beyond this log line —
  // exactly as if the message had never arrived.
  if (looksLikeScam(params.subject, params.body)) {
    console.info('[inbound] scam pattern, dropped', params.fromEmail);
    return { handled: false, reason: 'scam pattern' };
  }

  let draft: QuoteDraft;
  try {
    draft = await draftReply({
      enquiry: {
        name,
        email: params.fromEmail,
        service: null,
        details: params.subject ? `Subject: ${params.subject}\n\n${params.body}` : params.body,
      },
      attachments: params.attachments,
      isColdEmail: true,
    });
  } catch (err) {
    console.error('[inbound] cold-email classification failed', err);
    await notifyOwner({
      title: `Email from ${name} (could not be read automatically)`,
      summary: params.body.slice(0, 160),
      threadId: '',
    }).catch(() => {});
    return { handled: false, reason: 'classification failed' };
  }

  // Spam and pitches stop here — no lead, no thread, no notification.
  if (draft.action === 'ignore') {
    console.info('[inbound] ignored', params.fromEmail, draft.intent);
    return { handled: false, reason: `ignored (${draft.intent})` };
  }

  const { data: lead, error } = await db()
    .from('leads')
    .insert({
      name,
      email: params.fromEmail,
      details: params.body.slice(0, 8000),
      source_page: 'email',
      origin: 'email',
      status: draft.action === 'handover' ? 'new' : 'new',
    })
    .select()
    .single();

  if (error || !lead) {
    console.error('[inbound] could not create lead from email', error);
    return { handled: false, reason: 'could not create lead' };
  }

  const thread = await createThread({
    leadId: lead.id,
    subject: params.subject?.trim() || `Enquiry from ${name}`,
  });

  // Someone who emailed the studio directly belongs in the CRM exactly as much
  // as someone who used the form.
  await syncLeadToCrm({
    id: lead.id,
    name,
    email: params.fromEmail,
    details: params.body,
    origin: 'email',
  });

  await db().from('quote_messages').insert({
    thread_id: thread.id,
    role: 'client',
    subject: params.subject ?? null,
    body: params.body,
  });

  return await storeAndRelease({
    threadId: thread.id,
    draft,
    leadName: name,
    leadEmail: params.fromEmail,
    summary: params.body.slice(0, 160),
    newLead: true,
  });
}

/** Save the draft, then let the autopilot decide whether it goes out. */
async function storeAndRelease(params: {
  threadId: string;
  draft: QuoteDraft;
  leadName: string;
  leadEmail?: string | null;
  summary: string;
  newLead: boolean;
}): Promise<InboundResult> {
  const { draft } = params;

  const { data: message } = await db()
    .from('quote_messages')
    .insert({
      thread_id: params.threadId,
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

  if (!message) {
    return { handled: false, reason: 'could not store draft' };
  }

  const released = await releaseDraft({
    messageId: message.id,
    threadId: params.threadId,
    draft,
    leadName: params.leadName,
    leadEmail: params.leadEmail,
    summary: params.summary,
  });

  return {
    handled: true,
    threadId: params.threadId,
    action: draft.action,
    sent: released.sent,
    newLead: params.newLead,
  };
}

function leadToEnquiry(lead: Record<string, unknown>) {
  return {
    name: String(lead.name ?? ''),
    email: String(lead.email ?? ''),
    phone: (lead.phone as string | null) ?? null,
    service: (lead.service as string | null) ?? null,
    budget: (lead.budget as string | null) ?? null,
    timeline: (lead.timeline as string | null) ?? null,
    details: String(lead.details ?? ''),
  };
}
