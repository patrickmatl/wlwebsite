import crypto from 'crypto';
import { db } from './db';
import { BUSINESS, FULL_ADDRESS } from '@/data/business';
import { STANDARD_INCLUSIONS } from '@/data/pricing';
import { formatRand } from '@/lib/crm/types';
import type { Settings } from '@/lib/crm/types';

/**
 * One document model, three documents.
 *
 * A quote, an invoice and a pro forma are the same object with different words
 * on it and different rules about what those words may claim. Assembling them
 * here means the PDF, the web view, the print view and the emailed copy can
 * never show different totals or a different bank account.
 */

export type DocumentKind = 'quote' | 'invoice' | 'proforma';

export type DocumentLine = {
  name: string;
  description: string | null;
  quantity: number;
  unitPrice: number | null;
  lineTotal: number | null;
  /**
   * What this line buys. Frozen onto the row when the document was raised, so
   * a client sees what they were promised on the day, not what the price list
   * happens to say now.
   */
  includes: string[];
};

export type DocumentParty = {
  name: string;
  contactName?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string[];
  vatNumber?: string | null;
  registrationNumber?: string | null;
};

export type DocumentModel = {
  kind: DocumentKind;
  /** What the document calls itself. Legally load-bearing — see titleFor(). */
  title: string;
  /** Shown under the title when the document is not what it might look like. */
  disclaimer: string | null;
  number: string;
  issueDate: string;
  /** "Valid until" on a quote, "Due" on an invoice. */
  dateLabel: string | null;
  dateValue: string | null;
  status: string;
  from: DocumentParty;
  to: DocumentParty;
  intro: string | null;
  lines: DocumentLine[];
  subtotal: number;
  vatRate: number;
  vatAmount: number;
  total: number;
  amountPaid: number | null;
  balanceDue: number | null;
  currency: string;
  /** True when any line is priced on request, so the total is not the whole story. */
  hasOnRequest: boolean;
  inclusions: readonly string[];
  terms: string | null;
  banking: {
    bankName: string | null;
    accountName: string | null;
    accountNumber: string | null;
    branchCode: string | null;
    reference: string;
  } | null;
  notes: string | null;
  /** Where the recipient can open this online, if a share link exists. */
  shareUrl: string | null;
};

/**
 * What the document is allowed to call itself.
 *
 * In South Africa only a VAT vendor may issue a "Tax Invoice", and a pro forma
 * must never read as one. Getting this wrong is not a cosmetic problem, so the
 * title is derived from the settings rather than hard-coded anywhere.
 */
function titleFor(kind: DocumentKind, vatRegistered: boolean): { title: string; disclaimer: string | null } {
  if (kind === 'quote') return { title: 'QUOTATION', disclaimer: null };

  if (kind === 'proforma') {
    return {
      title: 'PRO FORMA INVOICE',
      disclaimer: 'This is not a tax invoice. A tax invoice follows once payment is received.',
    };
  }

  return vatRegistered
    ? { title: 'TAX INVOICE', disclaimer: null }
    : {
        title: 'INVOICE',
        // Saying so plainly stops a client's bookkeeper hunting for a VAT number
        // that does not exist, and stops anyone treating this as VAT-claimable.
        disclaimer: 'WL CreationX is not a registered VAT vendor. No VAT is charged on this invoice.',
      };
}

export async function getSettingsRow(): Promise<Settings> {
  const { data } = await db().from('settings').select('*').eq('id', true).maybeSingle();
  return (data ?? {
    vat_registered: false,
    vat_number: null,
    vat_rate: 15,
    quote_validity_days: 30,
    deposit_percent: 50,
    payment_terms_days: 14,
    bank_name: null,
    bank_account_name: null,
    bank_account_number: null,
    bank_branch_code: null,
    invoice_notes: null,
  }) as Settings;
}

function studioParty(settings: Settings): DocumentParty {
  return {
    name: BUSINESS.name,
    email: BUSINESS.email,
    phone: BUSINESS.phoneDisplay,
    address: FULL_ADDRESS.split(', '),
    vatNumber: settings.vat_registered ? settings.vat_number : null,
  };
}

function bankingFor(settings: Settings, reference: string) {
  if (!settings.bank_account_number) return null;
  return {
    bankName: settings.bank_name,
    accountName: settings.bank_account_name,
    accountNumber: settings.bank_account_number,
    branchCode: settings.bank_branch_code,
    reference,
  };
}

async function partyFor(contactId: string | null, companyId: string | null): Promise<DocumentParty> {
  const [{ data: contact }, { data: company }] = await Promise.all([
    contactId
      ? db().from('contacts').select('*').eq('id', contactId).maybeSingle()
      : Promise.resolve({ data: null }),
    companyId
      ? db().from('companies').select('*').eq('id', companyId).maybeSingle()
      : Promise.resolve({ data: null }),
  ]);

  const person = contact
    ? [contact.first_name, contact.last_name].filter(Boolean).join(' ').trim()
    : null;

  if (company) {
    return {
      name: company.name,
      contactName: person,
      email: contact?.email ?? company.email,
      phone: contact?.phone ?? company.phone,
      address: [company.address_line1, company.suburb, company.city, company.postal_code].filter(
        Boolean,
      ) as string[],
      vatNumber: company.vat_number,
      registrationNumber: company.registration_number,
    };
  }

  return {
    name: person ?? 'Client',
    email: contact?.email ?? null,
    phone: contact?.phone ?? null,
    address: [],
  };
}

const num = (v: unknown): number => (typeof v === 'number' ? v : Number(v ?? 0) || 0);

/** Build the model for a quote. */
export async function quoteDocument(quoteId: string, baseUrl: string): Promise<DocumentModel | null> {
  const { data: quote } = await db().from('quotes').select('*').eq('id', quoteId).maybeSingle();
  if (!quote) return null;

  const [settings, items, to] = await Promise.all([
    getSettingsRow(),
    db().from('quote_items').select('*').eq('quote_id', quoteId).order('position'),
    partyFor(quote.contact_id, quote.company_id),
  ]);

  const lines: DocumentLine[] = (items.data ?? []).map((i) => ({
    name: i.name,
    description: i.description,
    quantity: num(i.quantity),
    unitPrice: i.unit_price === null ? null : num(i.unit_price),
    lineTotal: i.line_total === null ? null : num(i.line_total),
    includes: Array.isArray(i.includes) ? (i.includes as string[]) : [],
  }));

  const { title, disclaimer } = titleFor('quote', settings.vat_registered);

  return {
    kind: 'quote',
    title,
    disclaimer,
    number: quote.number,
    issueDate: quote.sent_at ?? quote.created_at,
    dateLabel: 'Valid until',
    dateValue: quote.valid_until,
    status: quote.status,
    from: studioParty(settings),
    to,
    intro: quote.intro,
    lines,
    subtotal: num(quote.subtotal),
    vatRate: num(quote.vat_rate),
    vatAmount: num(quote.vat_amount),
    total: num(quote.total),
    amountPaid: null,
    balanceDue: null,
    currency: quote.currency ?? 'ZAR',
    hasOnRequest: lines.some((l) => l.unitPrice === null),
    inclusions: STANDARD_INCLUSIONS,
    terms: quote.terms,
    // A quote is not a request for payment, so no bank details on it. Putting
    // them here is how clients end up paying against an unsigned quote.
    banking: null,
    notes: null,
    shareUrl: quote.public_token ? `${baseUrl}/q/${quote.public_token}` : null,
  };
}

/** Build the model for an invoice or a pro forma. */
export async function invoiceDocument(
  invoiceId: string,
  baseUrl: string,
): Promise<DocumentModel | null> {
  const { data: invoice } = await db().from('invoices').select('*').eq('id', invoiceId).maybeSingle();
  if (!invoice) return null;

  const [settings, items, to] = await Promise.all([
    getSettingsRow(),
    db().from('invoice_items').select('*').eq('invoice_id', invoiceId).order('position'),
    partyFor(invoice.contact_id, invoice.company_id),
  ]);

  const lines: DocumentLine[] = (items.data ?? []).map((i) => ({
    name: i.name,
    description: i.description,
    quantity: num(i.quantity),
    unitPrice: i.unit_price === null ? null : num(i.unit_price),
    lineTotal: i.line_total === null ? null : num(i.line_total),
    includes: Array.isArray(i.includes) ? (i.includes as string[]) : [],
  }));

  const kind: DocumentKind = invoice.kind === 'proforma' ? 'proforma' : 'invoice';
  const { title, disclaimer } = titleFor(kind, settings.vat_registered);

  const total = num(invoice.total);
  const paid = num(invoice.amount_paid);

  return {
    kind,
    title,
    disclaimer,
    number: invoice.number,
    issueDate: invoice.issue_date,
    dateLabel: kind === 'proforma' ? 'Payable by' : 'Due',
    dateValue: invoice.due_date,
    status: invoice.status,
    from: studioParty(settings),
    to,
    intro: null,
    lines,
    subtotal: num(invoice.subtotal),
    vatRate: num(invoice.vat_rate),
    vatAmount: num(invoice.vat_amount),
    total,
    amountPaid: paid,
    balanceDue: Math.max(0, total - paid),
    currency: invoice.currency ?? 'ZAR',
    hasOnRequest: lines.some((l) => l.unitPrice === null),
    inclusions: [],
    terms: null,
    banking: bankingFor(settings, invoice.number),
    notes: invoice.notes ?? settings.invoice_notes,
    shareUrl: invoice.public_token ? `${baseUrl}/i/${invoice.public_token}` : null,
  };
}

// ── Share links ─────────────────────────────────────────────────────────────

/**
 * Mint (or reuse) the read-only link for a document.
 *
 * Reused rather than rotated on every send: a client who forwards last month's
 * link to their accountant should not find it dead. Revoking is a deliberate
 * act — see revokeShareLink().
 */
export async function ensureShareToken(
  table: 'quotes' | 'invoices',
  id: string,
): Promise<string | null> {
  const { data: existing } = await db()
    .from(table)
    .select('public_token')
    .eq('id', id)
    .maybeSingle();

  if (!existing) return null;
  if (existing.public_token) return existing.public_token;

  // 24 bytes: far past guessable, still short enough to sit in an email nicely.
  const token = crypto.randomBytes(24).toString('base64url');
  const { data } = await db()
    .from(table)
    .update({ public_token: token })
    .eq('id', id)
    .is('public_token', null)
    .select('public_token')
    .maybeSingle();

  // Lost a race with a concurrent send — re-read rather than overwrite.
  if (!data) {
    const { data: again } = await db()
      .from(table)
      .select('public_token')
      .eq('id', id)
      .maybeSingle();
    return again?.public_token ?? null;
  }

  return data.public_token;
}

export async function revokeShareLink(table: 'quotes' | 'invoices', id: string): Promise<void> {
  await db().from(table).update({ public_token: null }).eq('id', id);
}

/**
 * Resolve a share token to a document.
 *
 * The only way in without a session, so it is deliberately narrow: the token
 * must match exactly, and a document still in draft is never reachable — a
 * draft has not been sent, so no legitimate link to it can exist.
 */
export async function documentByShareToken(
  token: string,
  baseUrl: string,
): Promise<DocumentModel | null> {
  if (!token || token.length < 16) return null;

  const { data: quote } = await db()
    .from('quotes')
    .select('id, status')
    .eq('public_token', token)
    .maybeSingle();

  if (quote) {
    if (quote.status === 'draft') return null;
    await db()
      .from('quotes')
      .update({ public_viewed_at: new Date().toISOString() })
      .eq('id', quote.id)
      .is('public_viewed_at', null)
      .then(() => undefined, () => undefined);
    return quoteDocument(quote.id, baseUrl);
  }

  const { data: invoice } = await db()
    .from('invoices')
    .select('id, status')
    .eq('public_token', token)
    .maybeSingle();

  if (invoice) {
    if (invoice.status === 'draft' || invoice.status === 'void') return null;
    await db()
      .from('invoices')
      .update({ public_viewed_at: new Date().toISOString() })
      .eq('id', invoice.id)
      .is('public_viewed_at', null)
      .then(() => undefined, () => undefined);
    return invoiceDocument(invoice.id, baseUrl);
  }

  return null;
}

/** A filename a client can find again in their downloads folder. */
export function documentFilename(doc: DocumentModel): string {
  const who = doc.to.name.replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '');
  return `${doc.number}-${who || 'WL-CreationX'}.pdf`;
}

export { formatRand };
