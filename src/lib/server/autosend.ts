import { db } from './db';
import { sendEmail, notifyOwner } from './notify';
import { renderClientEmail, renderClientEmailHtml, signatureName } from './render-quote';
import { tagSubject, type ThreadRow } from './threads';
import type { AgentAction } from '@/lib/quote-agent';
import type { QuoteLineResolved } from '@/lib/quote-agent';
import { BUSINESS } from '@/data/business';

/**
 * One send path, and one place that decides whether a draft goes out by itself.
 *
 * Both the owner clicking Approve in /studio and the autopilot end up in
 * sendDraft(), so an automatic email and a hand-approved one are byte-identical
 * and neither can drift from the other.
 *
 * Autopilot levels (QUOTE_AUTOPILOT):
 *   off  — nothing is ever sent automatically; every draft waits in /studio.
 *   safe — the default. Sends unless the agent flagged itself low-confidence.
 *   all  — sends regardless of confidence.
 *
 * 'ignore' and 'handover' are never auto-sent at any level: one means there is
 * nothing to say, the other means a person is needed. QUOTE_AUTOPILOT_MAX, if
 * set, holds back any quote above that rand total whatever the level.
 */

export type AutopilotLevel = 'off' | 'safe' | 'all';

export function autopilotLevel(): AutopilotLevel {
  const raw = (process.env.QUOTE_AUTOPILOT ?? 'safe').toLowerCase();
  return raw === 'off' || raw === 'all' ? raw : 'safe';
}

export type AutoSendDecision = { send: boolean; reason: string };

export function decideAutoSend(draft: {
  action: AgentAction;
  confidence: 'high' | 'medium' | 'low';
  total: number | null;
}): AutoSendDecision {
  if (draft.action === 'ignore') return { send: false, reason: 'nothing to reply to' };
  if (draft.action === 'handover') return { send: false, reason: 'needs a person' };

  const level = autopilotLevel();
  if (level === 'off') return { send: false, reason: 'autopilot is off' };

  if (level === 'safe' && draft.confidence === 'low') {
    return { send: false, reason: 'agent flagged low confidence' };
  }

  const ceiling = Number(process.env.QUOTE_AUTOPILOT_MAX ?? '');
  if (Number.isFinite(ceiling) && ceiling > 0 && draft.action === 'quote') {
    // An unpriced quote ("on request") has no total to compare, so it is held.
    if (draft.total === null) {
      return { send: false, reason: 'quote has no fixed total' };
    }
    if (draft.total > ceiling) {
      return { send: false, reason: `quote of R${draft.total} is over the R${ceiling} ceiling` };
    }
  }

  return { send: true, reason: `autopilot ${level}, confidence ${draft.confidence}` };
}

/**
 * The undercharge brake.
 *
 * The model cannot invent a price — resolveLines() takes every amount from
 * pricing.ts and the response schema has no price field — so the danger is not
 * a wrong number but the wrong *item*: quoting a R1,450 infographic against a
 * card the client clicked at R2,800, or a single carton where a range was
 * described. That is silent, it repeats, and nobody notices.
 *
 * The package the client clicked, and the price they were shown, travel with
 * the enquiry, so when a quote comes in under the figure that brought them here
 * there is something concrete to check against. Held, never adjusted: the
 * number may be right and the advertised price wrong, and quietly raising a
 * total is how a client gets a quote nobody at the studio has seen.
 *
 * Deliberately narrow. A guard that fires on ordinary quotes trains the owner
 * to click past it, and then it protects nothing at all.
 */
export function advertisedFloorBreach(
  enquiryDetails: string | null | undefined,
  total: number | null,
): { breached: boolean; advertised?: number; reason?: string } {
  if (total === null || !enquiryDetails) return { breached: false };

  // Written by the pricing-page form as: listed at R2,500 / R2 500 / R2500.00
  const m = /listed at\s*R\s*([\d][\d\s.,]*)/i.exec(enquiryDetails);
  if (!m) return { breached: false };

  // Strip separators. A trailing ",00" or ".00" is cents, not thousands.
  const advertised = Number(m[1].replace(/[\s,]/g, '').replace(/\.00$/, ''));
  if (!Number.isFinite(advertised) || advertised <= 0) return { breached: false };

  // A rand of slack: the advertised figure is often rounded for the card.
  if (total >= advertised - 1) return { breached: false };

  return {
    breached: true,
    advertised,
    reason:
      `quote of R${total.toLocaleString('en-ZA')} is below the R${advertised.toLocaleString('en-ZA')} ` +
      `the client was shown on the package they clicked`,
  };
}

export type SendResult =
  | { ok: true }
  | { ok: false; status: number; error: string };

/**
 * Send one drafted message to the client and record that it went.
 *
 * `approvedBy` is stored so the queue always shows whether a person or the
 * autopilot released a given email.
 */
export async function sendDraft(params: {
  messageId: string;
  editedBody?: string;
  editedSubject?: string;
  approvedBy: 'owner' | 'autopilot';
}): Promise<SendResult> {
  const { data: msg } = await db()
    .from('quote_messages')
    .select('*, quote_threads!inner(id, lead_id, subject, ref)')
    .eq('id', params.messageId)
    .maybeSingle();

  if (!msg) return { ok: false, status: 404, error: 'Draft not found' };
  if (msg.sent_at) return { ok: false, status: 409, error: 'Already sent' };

  const thread = msg.quote_threads as Pick<ThreadRow, 'id' | 'lead_id' | 'subject' | 'ref'>;

  const { data: lead } = await db().from('leads').select('*').eq('id', thread.lead_id).single();
  if (!lead) return { ok: false, status: 404, error: 'Lead not found' };

  // Owner edits win over whatever the agent wrote.
  const finalBody = params.editedBody ? String(params.editedBody) : msg.body;
  const finalSubject = params.editedSubject ? String(params.editedSubject) : msg.subject;

  // Write to whoever actually sent the last message, not to whoever the
  // account belongs to. Mail arrives from shared addresses and from people
  // sending on a colleague's behalf, and greeting the account holder in front
  // of the person who wrote is the kind of slip that reads as a mailmerge.
  const replyToName = (await latestClientSignature(thread.id)) ?? (lead.name as string);

  const emailParams = {
    body: finalBody,
    lines: (msg.quote_lines ?? []) as QuoteLineResolved[],
    total: msg.quote_total as number | null,
    validityDays: 30,
    clientName: replyToName,
  };

  // A quote becomes a real document BEFORE the email is written, not after.
  // Otherwise there is nothing to link to and nothing to attach, which is how
  // the automatic quotes were going out as plain email while the hand-sent ones
  // carried a PDF and a portal link.
  const docKind = msg.action === 'accept' ? ('proforma' as const) : ('quote' as const);
  const doc =
    msg.action === 'quote'
      ? await issueQuoteDocument(params.messageId)
      : msg.action === 'accept'
        ? await issueDepositDocument(lead.id as string)
        : null;

  try {
    await sendEmail({
      to: lead.email as string,
      subject: tagSubject(finalSubject ?? thread.subject, thread.ref),
      text: renderClientEmail({ ...emailParams, viewUrl: doc?.viewUrl, docKind }),
      html: renderClientEmailHtml({ ...emailParams, viewUrl: doc?.viewUrl, docKind }),
      attachments: doc?.pdf
        ? [{ filename: doc.filename, content: doc.pdf, contentType: 'application/pdf' }]
        : undefined,
    });
  } catch (err) {
    console.error('[send] failed', err);
    return {
      ok: false,
      status: 502,
      error: err instanceof Error ? err.message : 'Send failed',
    };
  }

  await db()
    .from('quote_messages')
    .update({
      role: 'studio',
      body: finalBody,
      subject: finalSubject,
      sent_at: new Date().toISOString(),
      approved_by: params.approvedBy,
    })
    .eq('id', params.messageId);

  await db().from('quote_threads').update({ state: 'awaiting_client' }).eq('id', thread.id);

  // An accepted job is won; a quote that has gone out is quoted.
  if (msg.action === 'accept') {
    await db().from('leads').update({ status: 'won' }).eq('id', lead.id);
  } else if (msg.action === 'quote') {
    await db().from('leads').update({ status: 'quoted' }).eq('id', lead.id);
  }

  // Mirror what just happened into the CRM. Deliberately after the send and
  // deliberately swallowed: the email has already left, so a CRM hiccup must
  // not report failure to the caller or, worse, cause a retry that sends twice.
  await mirrorToCrm({
    action: msg.action as string | null,
    messageId: params.messageId,
    leadId: lead.id as string,
  }).catch((err) => console.error('[send] CRM mirror failed', err));

  return { ok: true };
}

/**
 * An open quote on this thread that money has already been taken against.
 *
 * The interlock on revising: once a client has paid a deposit, the job is
 * running, and quietly replacing the document that describes it — voiding the
 * invoice they paid against in the process — is not something to do without a
 * person looking. Returns null in the ordinary case, which is most of them.
 */
async function paidQuoteOnThread(
  threadId: string,
): Promise<{ number: string; paidTotal: number } | null> {
  const { data: msgs } = await db()
    .from('quote_messages')
    .select('id')
    .eq('thread_id', threadId);

  const ids = (msgs ?? []).map((m) => m.id as string);
  if (!ids.length) return null;

  const { data: quotes } = await db()
    .from('quotes')
    .select('id, number, status')
    .in('message_id', ids)
    .in('status', ['draft', 'sent', 'accepted']);

  const crm = await import('./crm');
  for (const q of quotes ?? []) {
    const money = await crm.quoteMoneyState(q.id as string);
    if (money.paid) return { number: q.number as string, paidTotal: money.paidTotal };
  }
  return null;
}

/**
 * The name the client signed their most recent message with, if any.
 *
 * Only the latest one counts: a thread can change hands part way through, and
 * whoever wrote last is who we are answering. Null whenever nothing can be
 * read confidently, in which case the caller falls back to the account name.
 */
async function latestClientSignature(threadId: string): Promise<string | null> {
  const { data } = await db()
    .from('quote_messages')
    .select('body')
    .eq('thread_id', threadId)
    .eq('role', 'client')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  return data?.body ? signatureName(data.body as string) : null;
}

/**
 * Keep the CRM in step with what the agent just emailed.
 *
 * The agent's drafts live in quote_messages; the CRM's quotes, projects and
 * invoices are separate records a client can actually open in the portal. This
 * is the seam between the two, so a quote that went out by email is the same
 * quote the client sees when they sign in.
 */
async function mirrorToCrm(params: {
  action: string | null;
  messageId: string;
  leadId: string;
}): Promise<void> {
  const crm = await import('./crm');

  // 'quote' is handled before sending, by issueQuoteDocument().
  if (params.action === 'quote') return;

  if (params.action === 'accept') {
    // Which quote did they accept? The most recent one still open on this lead.
    const { data: lead } = await db()
      .from('leads')
      .select('contact_id')
      .eq('id', params.leadId)
      .maybeSingle();

    if (!lead?.contact_id) return;

    const { data: open } = await db()
      .from('quotes')
      .select('id, status')
      .eq('contact_id', lead.contact_id)
      .in('status', ['sent', 'accepted'])
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!open) return;

    if (open.status === 'sent') {
      await crm.acceptQuote(open.id, { name: null, ip: null }, 'client-email');
    }

    // Both of these return the existing record if one is already there, so a
    // client who says "yes" twice does not get two projects and two invoices.
    await crm.projectFromQuote(open.id, 'autopilot');
    await crm.depositInvoiceFromQuote(open.id, 'autopilot');
  }
}

/**
 * Apply the autopilot to a freshly drafted message: send it, or leave it in the
 * queue. Either way the owner is told what happened — an automatic send is
 * still worth knowing about, it just doesn't need acting on.
 */
export async function releaseDraft(params: {
  messageId: string;
  threadId: string;
  draft: {
    action: AgentAction;
    intent?: string;
    confidence: 'high' | 'medium' | 'low';
    total: number | null;
    totalFormatted: string;
    reasoning: string;
  };
  leadName: string;
  leadEmail?: string | null;
  summary: string;
}): Promise<{ sent: boolean; reason: string }> {
  let decision = decideAutoSend(params.draft);

  // Checked here rather than inside decideAutoSend so the lead's own words are
  // available: the package they clicked and the price they were shown live in
  // the enquiry, not in the draft.
  if (decision.send && params.draft.action === 'quote') {
    const { data: thread } = await db()
      .from('quote_threads')
      .select('lead_id')
      .eq('id', params.threadId)
      .maybeSingle();

    if (thread?.lead_id) {
      const { data: lead } = await db()
        .from('leads')
        .select('details')
        .eq('id', thread.lead_id)
        .maybeSingle();

      const breach = advertisedFloorBreach(lead?.details as string | null, params.draft.total);
      if (breach.breached) decision = { send: false, reason: breach.reason as string };
    }

    // A new quote on a thread that already has one is a revision. That is fine
    // and handled automatically — unless money has been taken against the quote
    // being replaced, in which case a person decides. Note this fires only on a
    // fresh QUOTE: ordinary replies on a paid job (brand colours, a meeting
    // time, a thank-you) are untouched, because they are not action 'quote'.
    if (decision.send) {
      const paid = await paidQuoteOnThread(params.threadId);
      if (paid) {
        decision = {
          send: false,
          reason:
            `this revises quote ${paid.number}, which has already been paid ` +
            `${paid.paidTotal.toLocaleString('en-ZA')} — a person must decide how to handle the change`,
        };
      }
    }
  }

  if (!decision.send) {
    if (params.draft.action === 'ignore') {
      // Spam. Close it quietly — waking someone up defeats the point.
      await db().from('quote_threads').update({ state: 'closed' }).eq('id', params.threadId);
      return { sent: false, reason: decision.reason };
    }

    // A person is being asked to deal with this, which used to mean the sender
    // heard nothing at all until somebody opened /studio. For a client with a
    // complaint that is the worst possible answer, so they get a short holding
    // reply — fixed text, no AI, promising only that a human is looking.
    if (params.draft.action === 'handover' && params.leadEmail) {
      await sendHoldingReply(params.leadEmail, params.leadName, params.draft.intent);
    }

    const title =
      params.draft.action === 'handover'
        ? `${params.leadName} — needs you personally`
        : params.draft.action === 'quote'
          ? `Approve quote: ${params.leadName} — ${params.draft.totalFormatted}`
          : `Approve reply: ${params.leadName}`;

    await notifyOwner({
      title,
      summary: `${params.summary}\n\n(${decision.reason})`,
      threadId: params.threadId,
    });
    return { sent: false, reason: decision.reason };
  }

  const result = await sendDraft({ messageId: params.messageId, approvedBy: 'autopilot' });

  if (!result.ok) {
    await notifyOwner({
      title: `${params.leadName} — automatic send failed`,
      summary: `${result.error}. The draft is still waiting in the queue.`,
      threadId: params.threadId,
    }).catch(() => {});
    return { sent: false, reason: result.error };
  }

  const what =
    params.draft.action === 'quote'
      ? `quote sent — ${params.draft.totalFormatted}`
      : params.draft.action === 'accept'
        ? 'job confirmed'
        : 'reply sent';

  await notifyOwner({
    title: `${params.leadName}: ${what}`,
    summary: params.draft.reasoning,
    threadId: params.threadId,
  }).catch(() => {});

  return { sent: true, reason: decision.reason };
}

/**
 * Turn the agent's draft into an issued quote, and render its PDF.
 *
 * Deliberately best-effort: if any of this fails the email still goes out with
 * the itemised quote in the body, which is what used to happen every time. A
 * missing attachment is a worse email; a missing email is a lost client.
 */
async function issueQuoteDocument(
  messageId: string,
): Promise<{ viewUrl: string | null; pdf: Buffer | null; filename: string } | null> {
  try {
    const crm = await import('./crm');
    const { ensureShareToken, quoteDocument, documentFilename } = await import('./documents');
    const { renderDocumentPdf } = await import('./document-pdf');

    const quote = await crm.quoteFromAgentDraft(messageId, 'autopilot');
    if (quote.status === 'draft') await crm.sendQuote(quote.id, 'autopilot');

    // A client asking for changes gets a revision, not a second live document.
    // Done after the replacement exists and is sent, so a failure anywhere
    // above leaves the original standing rather than retiring it with nothing
    // to take its place. releaseDraft has already refused to reach here if the
    // predecessor was paid; supersedePriorQuotes checks again regardless.
    const replaced = await crm.supersedePriorQuotes(quote.id, 'autopilot').catch((err) => {
      console.error('[send] could not supersede the previous quote', err);
      return null;
    });

    if (replaced?.superseded.length) {
      console.info(
        `[send] quote ${quote.number} replaces ${replaced.superseded.join(', ')}` +
          (replaced.voidedInvoices.length
            ? ` (voided ${replaced.voidedInvoices.length} unpaid invoice(s))`
            : ''),
      );
    }

    // The share link works without a login, so a client can forward the quote to
    // whoever signs off without that person needing an account.
    const token = await ensureShareToken('quotes', quote.id);
    const baseUrl = BUSINESS.url;
    const viewUrl = token ? `${baseUrl}/q/${token}` : `${baseUrl}/portal/quotes/${quote.id}`;

    const doc = await quoteDocument(quote.id, baseUrl);
    const pdf = doc ? await renderDocumentPdf(doc) : null;

    return { viewUrl, pdf, filename: doc ? documentFilename(doc) : `${quote.number}.pdf` };
  } catch (err) {
    console.error('[send] could not issue the quote document', err);
    return null;
  }
}

/**
 * Turn an acceptance into a proforma the client actually receives.
 *
 * The CRM already created a deposit invoice the moment a client said yes — but
 * it created it *after* the email had gone, and never sent it. So the agent
 * wrote "I will invoice a 50% deposit", nothing followed, and one real reply
 * went further and promised "a brief creative questionnaire" that exists
 * nowhere in this system. The client then waits for a document that is never
 * coming, and the job quietly dies.
 *
 * Issuing it here, before the email is composed, is what makes the promise
 * true: the proforma is attached to the very message that mentions it. The
 * underlying CRM calls all return an existing record rather than making a
 * second one, so a client who says "yes" twice gets one project and one
 * deposit invoice.
 */
async function issueDepositDocument(
  leadId: string,
): Promise<{ viewUrl: string | null; pdf: Buffer | null; filename: string } | null> {
  try {
    const crm = await import('./crm');
    const { ensureShareToken, invoiceDocument, documentFilename } = await import('./documents');
    const { renderDocumentPdf } = await import('./document-pdf');

    const { data: lead } = await db()
      .from('leads')
      .select('contact_id')
      .eq('id', leadId)
      .maybeSingle();
    if (!lead?.contact_id) return null;

    const { data: open } = await db()
      .from('quotes')
      .select('id, status')
      .eq('contact_id', lead.contact_id)
      .in('status', ['sent', 'accepted'])
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    if (!open) return null;

    if (open.status === 'sent') {
      await crm.acceptQuote(open.id, { name: null, ip: null }, 'client-email');
    }
    await crm.projectFromQuote(open.id, 'autopilot');
    const invoice = await crm.depositInvoiceFromQuote(open.id, 'autopilot');

    const token = await ensureShareToken('invoices', invoice.id);
    const baseUrl = BUSINESS.url;
    const viewUrl = token ? `${baseUrl}/i/${token}` : `${baseUrl}/portal/invoices/${invoice.id}`;

    const doc = await invoiceDocument(invoice.id, baseUrl);
    const pdf = doc ? await renderDocumentPdf(doc) : null;

    return { viewUrl, pdf, filename: doc ? documentFilename(doc) : `${invoice.number}.pdf` };
  } catch (err) {
    // A failure here must not stop the acceptance email: the client saying yes
    // is the important part, and mirrorToCrm still creates the records after.
    console.error('[send] could not issue the deposit invoice', err);
    return null;
  }
}

/**
 * A brief "we have this, a person is looking" reply.
 *
 * Deliberately withheld from anything that smells of fraud or cold sales: a
 * reply to a phishing attempt confirms the address is read by a human, which is
 * the entire objective of sending it. Genuine clients get the courtesy; the
 * rest get silence.
 */
const NO_HOLDING_REPLY = new Set(['scam_or_phishing', 'sales_pitch_or_spam']);

async function sendHoldingReply(
  to: string,
  name: string,
  intent?: string,
): Promise<void> {
  if (intent && NO_HOLDING_REPLY.has(intent)) return;

  try {
    const { renderHandoverAck } = await import('./render-quote');
    const ack = renderHandoverAck({ clientName: name });
    await sendEmail({ to, subject: ack.subject, text: ack.text, html: ack.html });
  } catch (err) {
    console.error('[send] holding reply failed', err);
  }
}
