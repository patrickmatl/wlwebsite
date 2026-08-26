import { db } from './db';
import { BUSINESS } from '@/data/business';
import { notifyOwner, sendEmail } from './notify';
import { renderPaymentReceived } from './render-quote';
import { tagSubject } from './threads';
import {
  readProofOfPayment,
  mightBeProofOfPayment,
  type InboundAttachment,
  type ProofOfPaymentReading,
} from './proof-of-payment';

/**
 * A client says they have paid. What happens next.
 *
 * The rule, chosen deliberately: money is credited automatically only when the
 * amount read off the document matches an open invoice **to the cent**. That
 * covers the ordinary case — a client paying the deposit they were invoiced —
 * without ever letting a misread digit or an edited screenshot mark a job paid
 * and start work on it.
 *
 * Anything else is still answered warmly and immediately, so the client is
 * never left wondering whether their POP arrived; it simply lands in the
 * owner's hands instead of moving money on its own. A partial payment, an
 * overpayment, an unreadable figure, a POP against no invoice and a low
 * confidence reading are all "tell a human", not "guess".
 *
 * Note what this does not claim: a proof of payment is an instruction, not
 * cleared funds. The wording never says the money has arrived in the bank,
 * only that the POP was received and applied to the invoice.
 */

const round2 = (n: number) => Math.round(n * 100) / 100;

export type PaymentOutcome =
  | { handled: false }
  | { handled: true; credited: boolean; note: string };

/**
 * Try to handle an inbound email as a proof of payment.
 *
 * Returns { handled: false } when this is not about money at all, in which case
 * the caller carries on to the normal drafting path.
 */
export async function handleProofOfPayment(params: {
  leadId: string;
  leadName: string;
  leadEmail: string;
  threadId: string;
  threadRef: string | null;
  threadSubject: string | null;
  subject?: string | null;
  body: string;
  files: InboundAttachment[];
}): Promise<PaymentOutcome> {
  if (!mightBeProofOfPayment(params.subject, params.body, params.files)) {
    return { handled: false };
  }

  // Only worth reading if this client actually owes something. A "thanks,
  // paid!" on a thread with no invoice is a normal reply, not a POP.
  const invoices = await openInvoicesFor(params.leadId);
  if (!invoices.length) return { handled: false };

  const reading = await readProofOfPayment({
    subject: params.subject,
    body: params.body,
    files: params.files,
  });

  // Could not read it at all — never silently ignore, because the client
  // believes they have paid and is now waiting.
  if (!reading) {
    return hold(params, invoices, null, 'the proof of payment could not be read automatically');
  }
  if (!reading.isProofOfPayment) return { handled: false };

  if (reading.amount === null || reading.confidence === 'low') {
    return hold(
      params,
      invoices,
      reading,
      reading.amount === null
        ? 'the amount could not be read off the document'
        : `the amount read (${reading.amount}) is low confidence`,
    );
  }

  // The one automatic path: an exact match against a single open invoice.
  const amount = round2(reading.amount);
  const matches = invoices.filter((inv) => round2(inv.total - inv.amount_paid) === amount);

  if (matches.length !== 1) {
    return hold(
      params,
      invoices,
      reading,
      matches.length === 0
        ? `no open invoice has an outstanding balance of exactly ${amount}`
        : `${matches.length} open invoices each have a balance of ${amount}`,
    );
  }

  return credit(params, matches[0], reading);
}

type OpenInvoice = {
  id: string;
  number: string;
  total: number;
  amount_paid: number;
  quote_id: string | null;
};

async function openInvoicesFor(leadId: string): Promise<OpenInvoice[]> {
  const { data: lead } = await db()
    .from('leads')
    .select('contact_id')
    .eq('id', leadId)
    .maybeSingle();
  if (!lead?.contact_id) return [];

  const { data } = await db()
    .from('invoices')
    .select('id, number, total, amount_paid, quote_id')
    .eq('contact_id', lead.contact_id)
    .in('status', ['sent', 'part_paid', 'overdue'])
    .order('created_at', { ascending: false })
    .limit(20);

  return (data ?? []) as OpenInvoice[];
}

/** Record the payment, tell the client what it settled, attach the invoice. */
async function credit(
  params: Parameters<typeof handleProofOfPayment>[0],
  invoice: OpenInvoice,
  reading: ProofOfPaymentReading,
): Promise<PaymentOutcome> {
  const amount = round2(reading.amount as number);

  const crm = await import('./crm');
  const { ensureShareToken, invoiceDocument, documentFilename } = await import('./documents');
  const { renderDocumentPdf } = await import('./document-pdf');

  const { invoice: updated } = await crm.recordPayment(
    {
      invoiceId: invoice.id,
      amount,
      method: 'eft',
      reference: reading.reference ?? null,
      receivedAt: reading.paidAt ?? null,
      notes: `Matched automatically from a proof of payment emailed by the client${
        reading.notes ? ` — ${reading.notes}` : ''
      }`,
    },
    'autopilot',
  );

  const outstanding = await projectOutstanding(invoice.quote_id);

  const token = await ensureShareToken('invoices', invoice.id);
  const viewUrl = token ? `${BUSINESS.url}/i/${token}` : null;
  const doc = await invoiceDocument(invoice.id, BUSINESS.url);
  const pdf = doc ? await renderDocumentPdf(doc) : null;

  const mail = renderPaymentReceived({
    clientName: params.leadName,
    amount,
    invoiceNumber: invoice.number,
    settledInFull: round2(updated.total - updated.amount_paid) <= 0,
    outstanding,
    viewUrl,
  });

  await sendEmail({
    to: params.leadEmail,
    subject: tagSubject(mail.subject, params.threadRef),
    text: mail.text,
    html: mail.html,
    attachments: pdf
      ? [
          {
            filename: doc ? documentFilename(doc) : `${invoice.number}.pdf`,
            content: pdf,
            contentType: 'application/pdf',
          },
        ]
      : undefined,
  });

  // Logged last and never allowed to throw: the payment is recorded and the
  // client already has the email, so a failure to write the thread's audit line
  // must not surface as a failed payment or invite a retry that pays twice.
  await db()
    .from('quote_messages')
    .insert({
      thread_id: params.threadId,
      role: 'studio',
      subject: mail.subject,
      body: mail.text,
      action: 'payment',
      intent: 'proof_of_payment',
      reasoning: `Exact match against invoice ${invoice.number}; payment recorded automatically.`,
      confidence: 'high',
      sent_at: new Date().toISOString(),
      approved_by: 'autopilot',
    })
    .then(({ error }) => {
      if (error) console.error('[pop] could not log the payment message', error);
    });

  await notifyOwner({
    title: `Payment recorded — R${amount.toLocaleString('en-ZA')} from ${params.leadName}`,
    summary: [
      `${params.leadName} sent a proof of payment matching invoice ${invoice.number} exactly, so it has been recorded and their updated invoice emailed to them.`,
      `Reference: ${reading.reference ?? 'none shown'}.`,
      `Invoice ${invoice.number} is now ${
        round2(updated.total - updated.amount_paid) <= 0 ? 'settled in full' : 'part paid'
      }.`,
      outstanding !== null
        ? `Still to invoice on this project: R${outstanding.toLocaleString('en-ZA')}.`
        : '',
      'This is a proof of payment and not a bank confirmation — check it reflects before starting work.',
    ]
      .filter(Boolean)
      .join(' '),
    threadId: params.threadId,
  }).catch(() => {});

  return { handled: true, credited: true, note: `credited ${amount} to ${invoice.number}` };
}

/**
 * Acknowledge without moving money.
 *
 * The client still gets an immediate, human reply — silence after sending a POP
 * is exactly when a client starts to worry — but nothing is credited and no
 * invoice is reissued until the owner has looked.
 */
async function hold(
  params: Parameters<typeof handleProofOfPayment>[0],
  invoices: OpenInvoice[],
  reading: ProofOfPaymentReading | null,
  why: string,
): Promise<PaymentOutcome> {
  const { renderHandoverAck } = await import('./render-quote');
  const ack = renderHandoverAck({ clientName: params.leadName });

  await sendEmail({
    to: params.leadEmail,
    subject: tagSubject('Thanks — checking your payment', params.threadRef),
    text: ack.text,
    html: ack.html,
  }).catch((err) => console.error('[pop] ack failed', err));

  await db()
    .from('quote_threads')
    .update({ state: 'awaiting_approval' })
    .eq('id', params.threadId);

  await notifyOwner({
    title: `Proof of payment needs you — ${params.leadName}`,
    summary: [
      `${params.leadName} <${params.leadEmail}> sent something that looks like a proof of payment. Nothing has been credited, because ${why}.`,
      reading
        ? `Read from the document: amount ${reading.amount ?? 'unreadable'}, reference ${
            reading.reference ?? 'none'
          }, paid to ${reading.paidTo ?? 'not shown'}, confidence ${reading.confidence}.`
        : 'The document could not be read at all.',
      reading?.notes ? `Note: ${reading.notes}` : '',
      `Open invoices — ${invoices
        .map((i) => `${i.number}: R${round2(i.total - i.amount_paid).toLocaleString('en-ZA')} outstanding`)
        .join('; ')}.`,
      'The client has been told a person is checking it.',
    ]
      .filter(Boolean)
      .join(' '),
    threadId: params.threadId,
  }).catch(() => {});

  return { handled: true, credited: false, note: `held for review — ${why}` };
}

/**
 * What is still owed on the project as a whole: the quote, less everything
 * actually paid against it. Null when there is no quote to measure against,
 * in which case the client is told nothing rather than something invented.
 */
async function projectOutstanding(quoteId: string | null): Promise<number | null> {
  if (!quoteId) return null;

  const { data: quote } = await db()
    .from('quotes')
    .select('subtotal')
    .eq('id', quoteId)
    .maybeSingle();
  if (!quote) return null;

  const { data: invoices } = await db()
    .from('invoices')
    .select('amount_paid, status')
    .eq('quote_id', quoteId);

  const paid = (invoices ?? [])
    .filter((i) => i.status !== 'void')
    .reduce((sum, i) => sum + Number(i.amount_paid ?? 0), 0);

  return round2(Math.max(0, Number(quote.subtotal ?? 0) - paid));
}
