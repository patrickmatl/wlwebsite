/**
 * Shared CRM types.
 *
 * These mirror supabase/migrations/003_crm.sql. Every string union here is
 * also a CHECK constraint in the database, so an invalid value is rejected by
 * Postgres even if something gets past TypeScript.
 */

export type DealStage = 'new' | 'qualifying' | 'quoted' | 'negotiating' | 'won' | 'lost';

export const DEAL_STAGES: { id: DealStage; label: string; open: boolean }[] = [
  { id: 'new', label: 'New', open: true },
  { id: 'qualifying', label: 'Qualifying', open: true },
  { id: 'quoted', label: 'Quoted', open: true },
  { id: 'negotiating', label: 'Negotiating', open: true },
  { id: 'won', label: 'Won', open: false },
  { id: 'lost', label: 'Lost', open: false },
];

export type QuoteStatus = 'draft' | 'sent' | 'accepted' | 'declined' | 'expired' | 'superseded';

export type ProjectStatus =
  | 'not_started'
  | 'in_progress'
  | 'with_client'
  | 'revisions'
  | 'delivered'
  | 'on_hold'
  | 'cancelled';

export const PROJECT_STATUSES: { id: ProjectStatus; label: string; done: boolean }[] = [
  { id: 'not_started', label: 'Not started', done: false },
  { id: 'in_progress', label: 'In progress', done: false },
  { id: 'with_client', label: 'With client', done: false },
  { id: 'revisions', label: 'In revisions', done: false },
  { id: 'delivered', label: 'Delivered', done: true },
  { id: 'on_hold', label: 'On hold', done: false },
  { id: 'cancelled', label: 'Cancelled', done: true },
];

export type MilestoneStatus = 'pending' | 'in_progress' | 'done' | 'skipped';

export type InvoiceKind = 'deposit' | 'balance' | 'full' | 'additional';
export type InvoiceStatus = 'draft' | 'sent' | 'part_paid' | 'paid' | 'overdue' | 'void';
export type PaymentMethod = 'eft' | 'card' | 'cash' | 'other';

export type EntityType =
  | 'contact'
  | 'company'
  | 'deal'
  | 'quote'
  | 'project'
  | 'invoice'
  | 'lead'
  | 'thread';

export type Company = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  trading_name: string | null;
  registration_number: string | null;
  vat_number: string | null;
  website: string | null;
  phone: string | null;
  email: string | null;
  address_line1: string | null;
  suburb: string | null;
  city: string | null;
  province: string | null;
  postal_code: string | null;
  country: string;
  industry: string | null;
  notes: string | null;
};

export type Contact = {
  id: string;
  created_at: string;
  updated_at: string;
  company_id: string | null;
  first_name: string;
  last_name: string | null;
  email: string;
  phone: string | null;
  job_title: string | null;
  is_primary: boolean;
  marketing_consent: boolean;
  consent_at: string | null;
  portal_enabled: boolean;
  last_login_at: string | null;
  status: 'active' | 'archived';
  notes: string | null;
};

export type Deal = {
  id: string;
  created_at: string;
  updated_at: string;
  contact_id: string | null;
  company_id: string | null;
  lead_id: string | null;
  title: string;
  stage: DealStage;
  value: number | null;
  currency: string;
  source: string | null;
  expected_close_date: string | null;
  won_at: string | null;
  lost_at: string | null;
  lost_reason: string | null;
  notes: string | null;
};

export type QuoteItem = {
  id: string;
  quote_id: string;
  position: number;
  price_item_id: string | null;
  name: string;
  description: string | null;
  quantity: number;
  unit_price: number | null;
  line_total: number | null;
};

export type Quote = {
  id: string;
  created_at: string;
  updated_at: string;
  number: string;
  deal_id: string | null;
  contact_id: string | null;
  company_id: string | null;
  message_id: string | null;
  status: QuoteStatus;
  subtotal: number;
  vat_rate: number;
  vat_amount: number;
  total: number;
  currency: string;
  intro: string | null;
  terms: string | null;
  valid_until: string | null;
  sent_at: string | null;
  viewed_at: string | null;
  accepted_at: string | null;
  declined_at: string | null;
  decline_reason: string | null;
  accepted_by_name: string | null;
  accepted_ip: string | null;
};

export type ProjectMilestone = {
  id: string;
  created_at: string;
  project_id: string;
  position: number;
  title: string;
  status: MilestoneStatus;
  due_at: string | null;
  completed_at: string | null;
  client_visible: boolean;
};

export type Project = {
  id: string;
  created_at: string;
  updated_at: string;
  code: string;
  name: string;
  deal_id: string | null;
  quote_id: string | null;
  contact_id: string | null;
  company_id: string | null;
  status: ProjectStatus;
  brief: string | null;
  started_at: string | null;
  due_at: string | null;
  delivered_at: string | null;
  closed_at: string | null;
  revisions_included: number;
  revisions_used: number;
  notes: string | null;
};

export type InvoiceItem = {
  id: string;
  invoice_id: string;
  position: number;
  name: string;
  description: string | null;
  quantity: number;
  unit_price: number | null;
  line_total: number | null;
};

export type Invoice = {
  id: string;
  created_at: string;
  updated_at: string;
  number: string;
  project_id: string | null;
  deal_id: string | null;
  quote_id: string | null;
  contact_id: string | null;
  company_id: string | null;
  kind: InvoiceKind;
  status: InvoiceStatus;
  subtotal: number;
  vat_rate: number;
  vat_amount: number;
  total: number;
  amount_paid: number;
  currency: string;
  issue_date: string;
  due_date: string | null;
  sent_at: string | null;
  paid_at: string | null;
  notes: string | null;
};

export type Payment = {
  id: string;
  created_at: string;
  invoice_id: string;
  amount: number;
  method: PaymentMethod;
  reference: string | null;
  received_at: string;
  notes: string | null;
};

export type StoredFile = {
  id: string;
  created_at: string;
  name: string;
  mime: string | null;
  size_bytes: number | null;
  storage_path: string;
  visibility: 'internal' | 'client';
  project_id: string | null;
  quote_id: string | null;
  invoice_id: string | null;
  contact_id: string | null;
  uploaded_by: string;
};

export type Activity = {
  id: string;
  created_at: string;
  entity_type: EntityType;
  entity_id: string;
  kind: string;
  title: string;
  body: string | null;
  actor: string;
  meta: Record<string, unknown> | null;
};

export type Task = {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  notes: string | null;
  due_at: string | null;
  done_at: string | null;
  priority: 'low' | 'normal' | 'high';
  assigned_to: string | null;
  entity_type: EntityType | null;
  entity_id: string | null;
};

export type Note = {
  id: string;
  created_at: string;
  updated_at: string;
  entity_type: EntityType;
  entity_id: string;
  body: string;
  author: string;
};

export type Settings = {
  vat_registered: boolean;
  vat_number: string | null;
  vat_rate: number;
  quote_validity_days: number;
  deposit_percent: number;
  payment_terms_days: number;
  bank_name: string | null;
  bank_account_name: string | null;
  bank_account_number: string | null;
  bank_branch_code: string | null;
  invoice_notes: string | null;
};

/** Rand, the way South African invoices read it. */
export function formatRand(amount: number | null | undefined): string {
  if (amount === null || amount === undefined) return '—';
  return `R${Number(amount).toLocaleString('en-ZA', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function contactName(c: Pick<Contact, 'first_name' | 'last_name'>): string {
  return [c.first_name, c.last_name].filter(Boolean).join(' ').trim();
}

/**
 * Totals for a set of lines.
 *
 * Money is computed in one place so a quote, the invoice raised from it, and
 * what the client sees in the portal can never disagree. Rounded to cents at
 * each step, because summing unrounded values and rounding once produces
 * totals that are a cent off what the printed lines add up to.
 */
export function computeTotals(
  lines: { quantity: number; unit_price: number | null }[],
  vatRate: number,
): { subtotal: number; vatAmount: number; total: number; hasOnRequest: boolean } {
  let subtotal = 0;
  let hasOnRequest = false;

  for (const line of lines) {
    if (line.unit_price === null) {
      hasOnRequest = true;
      continue;
    }
    subtotal += round2(line.unit_price * line.quantity);
  }

  subtotal = round2(subtotal);
  const vatAmount = round2(subtotal * (vatRate / 100));
  return { subtotal, vatAmount, total: round2(subtotal + vatAmount), hasOnRequest };
}

export function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}
