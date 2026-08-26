import { findPriceItem } from '@/data/pricing';
import { db } from './db';
import {
  computeTotals,
  contactName,
  formatRand,
  round2,
  DEAL_STAGES,
  PROJECT_STATUSES,
  type Activity,
  type Company,
  type Contact,
  type Deal,
  type DealStage,
  type EntityType,
  type Invoice,
  type InvoiceItem,
  type InvoiceKind,
  type InvoiceStatus,
  type MilestoneStatus,
  type Note,
  type Payment,
  type PaymentMethod,
  type Project,
  type ProjectMilestone,
  type ProjectStatus,
  type Quote,
  type QuoteItem,
  type QuoteStatus,
  type Settings,
  type StoredFile,
  type Task,
} from '@/lib/crm/types';

/**
 * Everything the studio side of the CRM reads and writes.
 *
 * The split matters: src/lib/server/portal.ts holds the client-facing reads and
 * scopes every one of them to a session. This module holds the admin reads and
 * all mutations, and applies NO scoping at all — it assumes the caller has
 * already proven it is an admin with `getSession('admin')`. Nothing here may be
 * reached from a portal page, and a portal route that needs to write (accepting
 * a quote, say) must first establish scope through portal.ts and only then call
 * in here with an id it has proved the client owns.
 *
 * Conventions:
 *   * Every mutation takes an optional trailing `actor` (the admin's name, or
 *     'client' / 'autopilot') which lands on the activity timeline. It defaults
 *     to 'studio'.
 *   * Money is only ever computed by computeTotals()/round2() from crm/types,
 *     so a quote and the invoice raised from it can never disagree.
 *   * Supabase errors throw with the operation named, because a silent null
 *     from a failed write is far worse than a 500.
 */

// ── Result handling ─────────────────────────────────────────────────────────

type Result = { data: unknown; error: { message: string } | null };

function ensure(res: Result, what: string): void {
  if (res.error) throw new Error(`could not ${what}: ${res.error.message}`);
}

function rows<T>(res: Result, what: string): T[] {
  ensure(res, what);
  return (res.data ?? []) as T[];
}

function row<T>(res: Result, what: string): T {
  ensure(res, what);
  if (res.data === null || res.data === undefined) {
    throw new Error(`could not ${what}: the database returned no row`);
  }
  return res.data as T;
}

function maybeRow<T>(res: Result, what: string): T | null {
  ensure(res, what);
  return (res.data ?? null) as T | null;
}

/** For lookups where more than one row is conceivable — `.maybeSingle()` would throw. */
function firstRow<T>(res: Result, what: string): T | null {
  return rows<T>(res, what)[0] ?? null;
}

// ── Small helpers ───────────────────────────────────────────────────────────

function nowISO(): string {
  return new Date().toISOString();
}

/**
 * Today in South Africa.
 *
 * The server runs in UTC and SAST is UTC+2, so a date taken from `toISOString`
 * is a day behind for the first two hours of every local morning — long enough
 * to date an invoice wrongly or mis-flag one as overdue.
 */
function todayISO(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Johannesburg' }).format(new Date());
}

/** Date arithmetic at UTC noon, so a shift of a few hours can never roll the day. */
function addDaysISO(iso: string, days: number): string {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

function num(value: unknown, fallback = 0): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

/** Drop undefined keys so a partial update never blanks a column by accident. */
function defined<T extends object>(patch: T): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(patch)) {
    if (value !== undefined) out[key] = value;
  }
  return out;
}

function clampLimit(limit: number | undefined, fallback: number, max = 500): number {
  const n = Math.floor(num(limit, fallback));
  if (n < 1) return fallback;
  return Math.min(n, max);
}

/**
 * A search term wrapped so PostgREST cannot misread it.
 *
 * `.or()` builds a filter list where commas separate conditions and dots
 * separate column from operator, so a raw term containing either would rewrite
 * the query. Double quotes make the value opaque; inside them only \ and "
 * still mean anything, and both are escaped.
 */
function likeTerm(term: string): string {
  const escaped = term.trim().slice(0, 120).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  return `"%${escaped}%"`;
}

const OPEN_DEAL_STAGES: DealStage[] = DEAL_STAGES.filter((s) => s.open).map((s) => s.id);
const CLOSED_PROJECT_STATUSES: ProjectStatus[] = PROJECT_STATUSES.filter((s) => s.done).map(
  (s) => s.id,
);

// ── Line items ──────────────────────────────────────────────────────────────

/** One line as a caller supplies it, before positions and totals are worked out. */
export type LineInput = {
  /** Id from src/data/pricing.ts when the line came from the price list. Quotes only. */
  price_item_id?: string | null;
  name: string;
  description?: string | null;
  quantity?: number | null;
  /** null means "on request" — it carries no value into the totals. */
  unit_price?: number | null;
};

type NormalisedLine = {
  price_item_id: string | null;
  name: string;
  description: string | null;
  quantity: number;
  unit_price: number | null;
  line_total: number | null;
  includes: string[];
};

function normaliseLines(items: LineInput[]): NormalisedLine[] {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('a document needs at least one line item');
  }

  return items.map((item, index) => {
    const name = (item.name ?? '').trim();
    if (!name) throw new Error(`line ${index + 1} has no name`);

    const rawQty = num(item.quantity, 1);
    const quantity = rawQty > 0 ? rawQty : 1;
    const unitPrice =
      item.unit_price === null || item.unit_price === undefined ? null : round2(num(item.unit_price));

    return {
      price_item_id: item.price_item_id ?? null,
      name,
      description: item.description?.trim() || null,
      quantity,
      unit_price: unitPrice,
      line_total: unitPrice === null ? null : round2(unitPrice * quantity),
      // What the money buys, taken from the price list and frozen onto the row.
      // Whoever raised the line may pass its deliverables explicitly; otherwise
      // they are looked up by price id. Never written by hand or by the model:
      // these are promises the studio has to keep.
      includes: lineInclusions(item),
    };
  });
}

/**
 * The deliverables behind a line.
 *
 * A client seeing "Poster design — R1,560" has no idea what that buys, which is
 * where price objections start. Every item in pricing.ts already carries the
 * honest list, so it is copied through rather than invented.
 */
function lineInclusions(item: LineInput): string[] {
  const supplied = (item as { includes?: unknown }).includes;
  if (Array.isArray(supplied)) return supplied.filter((x): x is string => typeof x === 'string');

  if (item.price_item_id) {
    const priced = findPriceItem(item.price_item_id);
    if (priced) return [...priced.includes];
  }

  return [];
}

// ── Document numbering ──────────────────────────────────────────────────────

/**
 * Allocate the next value for a counter key.
 *
 * next_number() takes a row lock, so two requests landing together get two
 * different numbers rather than a duplicate — which is the whole point of doing
 * this in the database instead of `select max(number) + 1`.
 */
async function nextCounter(key: string): Promise<number> {
  const { data, error } = await db().rpc('next_number', { p_key: key });
  if (error) throw new Error(`could not allocate a number for "${key}": ${error.message}`);

  const n = Number(data);
  if (!Number.isFinite(n) || n < 1) {
    throw new Error(`counter "${key}" returned no usable value`);
  }
  return n;
}

function pad(n: number, width = 4): string {
  return String(n).padStart(width, '0');
}

/** e.g. "Q-2026-0001". Numbering restarts each year, so the key is per year. */
export async function nextQuoteNumber(): Promise<string> {
  const year = new Date().getFullYear();
  return `Q-${year}-${pad(await nextCounter(`quote:${year}`))}`;
}

/** e.g. "INV-2026-0001". */
export async function nextInvoiceNumber(): Promise<string> {
  const year = new Date().getFullYear();
  return `INV-${year}-${pad(await nextCounter(`invoice:${year}`))}`;
}

/** e.g. "WLX-0001". Project codes run continuously — they are not a tax record. */
export async function nextProjectCode(): Promise<string> {
  return `WLX-${pad(await nextCounter('project'))}`;
}

// ── Activity ────────────────────────────────────────────────────────────────

export type ActivityInput = {
  entityType: EntityType;
  entityId: string;
  kind: string;
  title: string;
  body?: string | null;
  actor?: string;
  meta?: Record<string, unknown> | null;
};

/**
 * Write a line onto an entity's timeline.
 *
 * Deliberately the one function here that does not throw. A timeline entry is a
 * record of something that already happened; if the write fails, the payment or
 * stage change must still stand. Returns null when it could not be written.
 */
export async function logActivity(input: ActivityInput): Promise<Activity | null> {
  try {
    const { data, error } = await db()
      .from('activities')
      .insert({
        entity_type: input.entityType,
        entity_id: input.entityId,
        kind: input.kind,
        title: input.title,
        body: input.body ?? null,
        actor: input.actor?.trim() || 'studio',
        meta: input.meta ?? null,
      })
      .select('*')
      .single();

    if (error) {
      console.error('[crm] activity not logged:', error.message);
      return null;
    }
    return data as Activity;
  } catch (err) {
    console.error('[crm] activity not logged:', err);
    return null;
  }
}

export async function listActivity(
  entityType: EntityType,
  entityId: string,
  limit = 50,
): Promise<Activity[]> {
  return rows<Activity>(
    await db()
      .from('activities')
      .select('*')
      .eq('entity_type', entityType)
      .eq('entity_id', entityId)
      .order('created_at', { ascending: false })
      .limit(clampLimit(limit, 50)),
    'load the timeline',
  );
}

export async function listRecentActivity(limit = 20): Promise<Activity[]> {
  return rows<Activity>(
    await db()
      .from('activities')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(clampLimit(limit, 20)),
    'load recent activity',
  );
}

// ── Settings ────────────────────────────────────────────────────────────────

export async function getSettings(): Promise<Settings> {
  const settings = maybeRow<Settings>(
    await db().from('settings').select('*').eq('id', true).maybeSingle(),
    'load settings',
  );

  if (!settings) {
    throw new Error('the settings row is missing — run supabase/migrations/003_crm.sql');
  }
  return settings;
}

export async function updateSettings(patch: Partial<Settings>): Promise<Settings> {
  const update = defined({ ...patch });
  if (Object.keys(update).length === 0) return getSettings();

  return row<Settings>(
    await db().from('settings').update(update).eq('id', true).select('*').single(),
    'save settings',
  );
}

/**
 * The VAT rate that actually applies to a new document.
 *
 * Storing a rate is not the same as levying it. WL CreationX quotes exclude
 * VAT, and until the studio is registered a quote must carry 0% rather than
 * silently adding 15% the business does not charge and cannot claim.
 */
export function effectiveVatRate(settings: Settings): number {
  return settings.vat_registered ? num(settings.vat_rate) : 0;
}

// ── Companies ───────────────────────────────────────────────────────────────

export type CompanyInput = {
  name: string;
  trading_name?: string | null;
  registration_number?: string | null;
  vat_number?: string | null;
  website?: string | null;
  phone?: string | null;
  email?: string | null;
  address_line1?: string | null;
  suburb?: string | null;
  city?: string | null;
  province?: string | null;
  postal_code?: string | null;
  country?: string;
  industry?: string | null;
  notes?: string | null;
};

export async function listCompanies(
  options: { search?: string; limit?: number } = {},
): Promise<Company[]> {
  let query = db().from('companies').select('*');

  const term = options.search?.trim();
  if (term) {
    const like = likeTerm(term);
    query = query.or(`name.ilike.${like},trading_name.ilike.${like},email.ilike.${like}`);
  }

  return rows<Company>(
    await query.order('name', { ascending: true }).limit(clampLimit(options.limit, 200)),
    'load companies',
  );
}

export async function getCompany(id: string): Promise<Company | null> {
  return maybeRow<Company>(
    await db().from('companies').select('*').eq('id', id).maybeSingle(),
    'load the company',
  );
}

export async function createCompany(input: CompanyInput, actor = 'studio'): Promise<Company> {
  const name = input.name?.trim();
  if (!name) throw new Error('a company needs a name');

  const company = row<Company>(
    await db()
      .from('companies')
      .insert(defined({ ...input, name }))
      .select('*')
      .single(),
    'create the company',
  );

  await logActivity({
    entityType: 'company',
    entityId: company.id,
    kind: 'created',
    title: `Company added: ${company.name}`,
    actor,
  });

  return company;
}

export async function updateCompany(
  id: string,
  patch: Partial<CompanyInput>,
  actor = 'studio',
): Promise<Company> {
  const update = defined({ ...patch });
  if (Object.keys(update).length === 0) {
    const current = await getCompany(id);
    if (!current) throw new Error(`company ${id} not found`);
    return current;
  }

  const company = row<Company>(
    await db().from('companies').update(update).eq('id', id).select('*').single(),
    'update the company',
  );

  await logActivity({
    entityType: 'company',
    entityId: company.id,
    kind: 'updated',
    title: 'Company details updated',
    actor,
    meta: { fields: Object.keys(update) },
  });

  return company;
}

/**
 * Match a company by name, case-insensitively.
 *
 * The ilike is re-checked in JavaScript because a name containing % or _ would
 * otherwise behave as a wildcard and match the wrong company.
 */
async function findCompanyByName(name: string): Promise<Company | null> {
  const target = name.trim().toLowerCase();
  if (!target) return null;

  const candidates = rows<Company>(
    await db().from('companies').select('*').ilike('name', name.trim()).limit(20),
    'look up the company',
  );

  return candidates.find((c) => (c.name ?? '').trim().toLowerCase() === target) ?? null;
}

// ── Contacts ────────────────────────────────────────────────────────────────

export type ContactInput = {
  first_name: string;
  last_name?: string | null;
  email: string;
  phone?: string | null;
  company_id?: string | null;
  job_title?: string | null;
  is_primary?: boolean;
  marketing_consent?: boolean;
  portal_enabled?: boolean;
  notes?: string | null;
};

export async function listContacts(
  options: { search?: string; limit?: number; companyId?: string; includeArchived?: boolean } = {},
): Promise<Contact[]> {
  let query = db().from('contacts').select('*');

  if (!options.includeArchived) query = query.eq('status', 'active');
  if (options.companyId) query = query.eq('company_id', options.companyId);

  const term = options.search?.trim();
  if (term) {
    const like = likeTerm(term);
    query = query.or(
      `first_name.ilike.${like},last_name.ilike.${like},email.ilike.${like},phone.ilike.${like}`,
    );
  }

  return rows<Contact>(
    await query.order('created_at', { ascending: false }).limit(clampLimit(options.limit, 200)),
    'load contacts',
  );
}

export async function getContact(id: string): Promise<Contact | null> {
  return maybeRow<Contact>(
    await db().from('contacts').select('*').eq('id', id).maybeSingle(),
    'load the contact',
  );
}

/**
 * Resolve a contact by email address, case-insensitively.
 *
 * The unique index is on lower(email), but PostgREST cannot filter on an
 * expression, so this uses ilike and then re-checks the match exactly — an
 * address containing % or _ would otherwise match somebody else's row.
 */
export async function getContactByEmail(email: string): Promise<Contact | null> {
  const target = email?.trim().toLowerCase();
  if (!target) return null;

  const candidates = rows<Contact>(
    await db().from('contacts').select('*').ilike('email', target).limit(20),
    'look up the contact',
  );

  return candidates.find((c) => (c.email ?? '').trim().toLowerCase() === target) ?? null;
}

export async function createContact(input: ContactInput, actor = 'studio'): Promise<Contact> {
  const email = input.email?.trim().toLowerCase();
  const first = input.first_name?.trim();
  if (!email) throw new Error('a contact needs an email address');
  if (!first) throw new Error('a contact needs a first name');

  const contact = row<Contact>(
    await db()
      .from('contacts')
      .insert(
        defined({
          ...input,
          email,
          first_name: first,
          last_name: input.last_name?.trim() || null,
          // POPIA: consent is worth nothing without the moment it was given.
          consent_at: input.marketing_consent ? nowISO() : null,
        }),
      )
      .select('*')
      .single(),
    'create the contact',
  );

  await logActivity({
    entityType: 'contact',
    entityId: contact.id,
    kind: 'created',
    title: `Contact added: ${contactName(contact)}`,
    actor,
  });

  return contact;
}

export async function updateContact(
  id: string,
  patch: Partial<ContactInput>,
  actor = 'studio',
): Promise<Contact> {
  const current = await getContact(id);
  if (!current) throw new Error(`contact ${id} not found`);

  const update = defined({
    ...patch,
    email: patch.email === undefined ? undefined : patch.email.trim().toLowerCase(),
    first_name: patch.first_name === undefined ? undefined : patch.first_name.trim(),
    last_name: patch.last_name === undefined ? undefined : patch.last_name?.trim() || null,
  });

  // consent_at means "when the consent now on file was given". Granting stamps
  // it, withdrawing clears it, and the timeline below keeps the history that
  // POPIA actually wants — a record of the change, not a stale timestamp.
  if (patch.marketing_consent !== undefined && patch.marketing_consent !== current.marketing_consent) {
    update.consent_at = patch.marketing_consent ? nowISO() : null;
  }

  if (Object.keys(update).length === 0) return current;

  const contact = row<Contact>(
    await db().from('contacts').update(update).eq('id', id).select('*').single(),
    'update the contact',
  );

  await logActivity({
    entityType: 'contact',
    entityId: contact.id,
    kind: 'updated',
    title: 'Contact details updated',
    actor,
    meta: { fields: Object.keys(update) },
  });

  if (update.consent_at !== undefined) {
    await logActivity({
      entityType: 'contact',
      entityId: contact.id,
      kind: 'consent',
      title: contact.marketing_consent
        ? 'Marketing consent given'
        : 'Marketing consent withdrawn',
      actor,
    });
  }

  return contact;
}

/** Archiving also closes the portal door — an archived contact must not be able to sign in. */
export async function archiveContact(id: string, actor = 'studio'): Promise<Contact> {
  const contact = row<Contact>(
    await db()
      .from('contacts')
      .update({ status: 'archived', portal_enabled: false })
      .eq('id', id)
      .select('*')
      .single(),
    'archive the contact',
  );

  await logActivity({
    entityType: 'contact',
    entityId: contact.id,
    kind: 'archived',
    title: `Archived ${contactName(contact)}`,
    actor,
  });

  return contact;
}

export async function unarchiveContact(id: string, actor = 'studio'): Promise<Contact> {
  const contact = row<Contact>(
    await db()
      .from('contacts')
      .update({ status: 'active', portal_enabled: true })
      .eq('id', id)
      .select('*')
      .single(),
    'restore the contact',
  );

  await logActivity({
    entityType: 'contact',
    entityId: contact.id,
    kind: 'restored',
    title: `Restored ${contactName(contact)}`,
    actor,
  });

  return contact;
}

/**
 * Split a display name into first and last.
 *
 * Inbound mail hands over whatever the sender's client put in the From header,
 * which is anything from "Jane" to "Smith, Jane" to the address again. Returns
 * an empty first name when there is nothing usable, so the caller can fall back
 * to the address.
 */
export function splitFullName(full: string | null | undefined): {
  first_name: string;
  last_name: string | null;
} {
  const cleaned = (full ?? '').replace(/["'<>]/g, ' ').replace(/\s+/g, ' ').trim();

  // Some clients put the address itself in the display name — that is not a name.
  if (!cleaned || cleaned.includes('@')) return { first_name: '', last_name: null };

  if (cleaned.includes(',')) {
    const [surname, ...rest] = cleaned.split(',');
    const given = rest.join(' ').trim();
    if (given && surname.trim()) return { first_name: given, last_name: surname.trim() };
  }

  const parts = cleaned.split(' ').filter(Boolean);
  if (parts.length === 0) return { first_name: '', last_name: null };
  if (parts.length === 1) return { first_name: parts[0], last_name: null };
  return { first_name: parts[0], last_name: parts.slice(1).join(' ') };
}

/** "jane.smith92" -> "Jane Smith", so a nameless lead is still addressable. */
function nameFromEmail(email: string): { first_name: string; last_name: string | null } {
  const local = email.split('@')[0] ?? '';
  const words = local
    .replace(/[._\-+]+/g, ' ')
    .replace(/\d+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1));

  if (words.length === 0) return { first_name: 'Client', last_name: null };
  if (words.length === 1) return { first_name: words[0], last_name: null };
  return { first_name: words[0], last_name: words.slice(1).join(' ') };
}

/**
 * The one way a lead or an inbound email becomes a CRM contact.
 *
 * Everything resolves on the email address, matched case-insensitively, so the
 * same person writing from the same mailbox always lands on the same record.
 * A unique index on lower(email) backs that up, and the insert below recovers
 * from a collision rather than failing — two emails arriving together must not
 * turn into a lost lead.
 */
export async function findOrCreateContactByEmail(
  input: { email: string; name?: string | null; phone?: string | null; companyName?: string | null },
  actor = 'studio',
): Promise<Contact> {
  const email = input.email?.trim().toLowerCase();
  if (!email || !email.includes('@')) throw new Error(`"${input.email}" is not an email address`);

  const existing = await getContactByEmail(email);

  // A company may have arrived with the message even when the person is known.
  let companyId: string | null = existing?.company_id ?? null;
  const companyName = input.companyName?.trim();
  if (companyName && !companyId) {
    const company = (await findCompanyByName(companyName)) ?? (await createCompany({ name: companyName }, actor));
    companyId = company.id;
  }

  if (existing) {
    // Fill blanks only. Never overwrite something a human has typed with
    // whatever an email signature happened to say.
    const fill = defined({
      phone: existing.phone ? undefined : input.phone?.trim() || undefined,
      company_id: existing.company_id ? undefined : companyId ?? undefined,
    });

    if (Object.keys(fill).length === 0) return existing;

    return row<Contact>(
      await db().from('contacts').update(fill).eq('id', existing.id).select('*').single(),
      'update the contact',
    );
  }

  const split = splitFullName(input.name);
  const names = split.first_name ? split : nameFromEmail(email);

  const { data, error } = await db()
    .from('contacts')
    .insert({
      email,
      first_name: names.first_name,
      last_name: names.last_name,
      phone: input.phone?.trim() || null,
      company_id: companyId,
    })
    .select('*')
    .single();

  if (error) {
    // Someone else won the race on lower(email). Their row is the right one.
    const raced = await getContactByEmail(email);
    if (raced) return raced;
    throw new Error(`could not create the contact for ${email}: ${error.message}`);
  }

  const contact = data as Contact;
  await logActivity({
    entityType: 'contact',
    entityId: contact.id,
    kind: 'created',
    title: `Contact created from ${actor === 'studio' ? 'an enquiry' : actor}: ${contactName(contact)}`,
    actor,
  });

  return contact;
}

export type ContactDetail = {
  contact: Contact;
  company: Company | null;
  deals: Deal[];
  quotes: Quote[];
  projects: Project[];
  invoices: Invoice[];
  notes: Note[];
  activity: Activity[];
};

export async function getContactDetail(id: string): Promise<ContactDetail | null> {
  const contact = await getContact(id);
  if (!contact) return null;

  const [company, deals, quotes, projects, invoices, notes, activity] = await Promise.all([
    contact.company_id ? getCompany(contact.company_id) : Promise.resolve(null),
    listDeals({ contactId: id }),
    listQuotes({ contactId: id }),
    listProjects({ contactId: id }),
    listInvoices({ contactId: id }),
    listNotes('contact', id),
    listActivity('contact', id, 30),
  ]);

  return { contact, company, deals, quotes, projects, invoices, notes, activity };
}

export type CompanyDetail = {
  company: Company;
  contacts: Contact[];
  deals: Deal[];
  projects: Project[];
  invoices: Invoice[];
  notes: Note[];
  activity: Activity[];
};

export async function getCompanyDetail(id: string): Promise<CompanyDetail | null> {
  const company = await getCompany(id);
  if (!company) return null;

  const [contacts, deals, projects, invoices, notes, activity] = await Promise.all([
    listContacts({ companyId: id, includeArchived: true }),
    listDeals({ companyId: id }),
    listProjects({ companyId: id }),
    listInvoices({ companyId: id }),
    listNotes('company', id),
    listActivity('company', id, 30),
  ]);

  return { company, contacts, deals, projects, invoices, notes, activity };
}

// ── Deals ───────────────────────────────────────────────────────────────────

export type DealInput = {
  title: string;
  contactId?: string | null;
  companyId?: string | null;
  leadId?: string | null;
  stage?: DealStage;
  value?: number | null;
  source?: string | null;
  expectedCloseDate?: string | null;
  notes?: string | null;
};

export async function listDeals(
  options: {
    stage?: DealStage;
    open?: boolean;
    contactId?: string;
    companyId?: string;
    limit?: number;
  } = {},
): Promise<Deal[]> {
  let query = db().from('deals').select('*');

  if (options.stage) query = query.eq('stage', options.stage);
  else if (options.open) query = query.in('stage', OPEN_DEAL_STAGES);
  if (options.contactId) query = query.eq('contact_id', options.contactId);
  if (options.companyId) query = query.eq('company_id', options.companyId);

  return rows<Deal>(
    await query.order('updated_at', { ascending: false }).limit(clampLimit(options.limit, 300)),
    'load deals',
  );
}

/** The kanban board. Every stage is present even when empty, so columns never vanish. */
export async function dealsByStage(): Promise<Record<DealStage, Deal[]>> {
  const all = await listDeals({ limit: 500 });

  const grouped = {} as Record<DealStage, Deal[]>;
  for (const stage of DEAL_STAGES) grouped[stage.id] = [];
  for (const deal of all) {
    if (grouped[deal.stage]) grouped[deal.stage].push(deal);
  }

  return grouped;
}

export async function getDeal(id: string): Promise<Deal | null> {
  return maybeRow<Deal>(
    await db().from('deals').select('*').eq('id', id).maybeSingle(),
    'load the deal',
  );
}

export type DealDetail = {
  deal: Deal;
  contact: Contact | null;
  company: Company | null;
  quotes: Quote[];
  projects: Project[];
  invoices: Invoice[];
  notes: Note[];
  activity: Activity[];
};

export async function getDealFull(id: string): Promise<DealDetail | null> {
  const deal = await getDeal(id);
  if (!deal) return null;

  const [contact, company, quotes, projects, invoices, notes, activity] = await Promise.all([
    deal.contact_id ? getContact(deal.contact_id) : Promise.resolve(null),
    deal.company_id ? getCompany(deal.company_id) : Promise.resolve(null),
    listQuotes({ dealId: id }),
    listProjects({ dealId: id }),
    listInvoices({ dealId: id }),
    listNotes('deal', id),
    listActivity('deal', id, 30),
  ]);

  return { deal, contact, company, quotes, projects, invoices, notes, activity };
}

export async function createDeal(input: DealInput, actor = 'studio'): Promise<Deal> {
  const title = input.title?.trim();
  if (!title) throw new Error('a deal needs a title');

  const deal = row<Deal>(
    await db()
      .from('deals')
      .insert(
        defined({
          title,
          contact_id: input.contactId ?? null,
          company_id: input.companyId ?? null,
          lead_id: input.leadId ?? null,
          stage: input.stage ?? 'new',
          value: input.value === undefined ? null : input.value,
          source: input.source ?? null,
          expected_close_date: input.expectedCloseDate ?? null,
          notes: input.notes ?? null,
        }),
      )
      .select('*')
      .single(),
    'create the deal',
  );

  await logActivity({
    entityType: 'deal',
    entityId: deal.id,
    kind: 'created',
    title: `Deal opened: ${deal.title}`,
    body: deal.value === null ? null : `Estimated at ${formatRand(deal.value)}`,
    actor,
  });

  return deal;
}

export async function updateDeal(
  id: string,
  patch: Partial<DealInput>,
  actor = 'studio',
): Promise<Deal> {
  const update = defined({
    title: patch.title?.trim(),
    contact_id: patch.contactId,
    company_id: patch.companyId,
    lead_id: patch.leadId,
    value: patch.value,
    source: patch.source,
    expected_close_date: patch.expectedCloseDate,
    notes: patch.notes,
  });

  // Stage moves carry side effects, so they go through moveDealStage only.
  if (Object.keys(update).length === 0) {
    const current = await getDeal(id);
    if (!current) throw new Error(`deal ${id} not found`);
    return current;
  }

  const deal = row<Deal>(
    await db().from('deals').update(update).eq('id', id).select('*').single(),
    'update the deal',
  );

  await logActivity({
    entityType: 'deal',
    entityId: deal.id,
    kind: 'updated',
    title: 'Deal updated',
    actor,
    meta: { fields: Object.keys(update) },
  });

  return deal;
}

/**
 * Move a deal along the pipeline.
 *
 * Won and lost are stamped here rather than left to the caller so the dates are
 * always there to report on, and moving a deal back into play clears the stamp
 * — a deal cannot be both open and closed on 3 March.
 */
export async function moveDealStage(
  id: string,
  stage: DealStage,
  options: { reason?: string | null } = {},
  actor = 'studio',
): Promise<Deal> {
  const current = await getDeal(id);
  if (!current) throw new Error(`deal ${id} not found`);
  if (!DEAL_STAGES.some((s) => s.id === stage)) throw new Error(`"${stage}" is not a deal stage`);

  const update: Record<string, unknown> = { stage };

  if (stage === 'won') {
    update.won_at = current.won_at ?? nowISO();
    update.lost_at = null;
    update.lost_reason = null;
  } else if (stage === 'lost') {
    update.lost_at = current.lost_at ?? nowISO();
    update.lost_reason = options.reason?.trim() || current.lost_reason || null;
    update.won_at = null;
  } else {
    update.won_at = null;
    update.lost_at = null;
    update.lost_reason = null;
  }

  const deal = row<Deal>(
    await db().from('deals').update(update).eq('id', id).select('*').single(),
    'move the deal',
  );

  const label = DEAL_STAGES.find((s) => s.id === stage)?.label ?? stage;
  await logActivity({
    entityType: 'deal',
    entityId: deal.id,
    kind: 'stage_changed',
    title: `Deal moved to ${label}`,
    body: stage === 'lost' ? deal.lost_reason : null,
    actor,
    meta: { from: current.stage, to: stage },
  });

  return deal;
}

// ── Quotes ──────────────────────────────────────────────────────────────────

export type CreateQuoteInput = {
  dealId?: string | null;
  contactId?: string | null;
  companyId?: string | null;
  messageId?: string | null;
  items: LineInput[];
  intro?: string | null;
  terms?: string | null;
  /** Defaults to today + the settings validity window. */
  validUntil?: string | null;
};

export type QuoteFull = {
  quote: Quote;
  items: QuoteItem[];
  contact: Contact | null;
  company: Company | null;
};

export async function listQuotes(
  options: {
    status?: QuoteStatus;
    contactId?: string;
    companyId?: string;
    dealId?: string;
    limit?: number;
  } = {},
): Promise<Quote[]> {
  let query = db().from('quotes').select('*');

  if (options.status) query = query.eq('status', options.status);
  if (options.contactId) query = query.eq('contact_id', options.contactId);
  if (options.companyId) query = query.eq('company_id', options.companyId);
  if (options.dealId) query = query.eq('deal_id', options.dealId);

  return rows<Quote>(
    await query.order('created_at', { ascending: false }).limit(clampLimit(options.limit, 300)),
    'load quotes',
  );
}

export async function getQuote(id: string): Promise<Quote | null> {
  return maybeRow<Quote>(
    await db().from('quotes').select('*').eq('id', id).maybeSingle(),
    'load the quote',
  );
}

export async function listQuoteItems(quoteId: string): Promise<QuoteItem[]> {
  return rows<QuoteItem>(
    await db()
      .from('quote_items')
      .select('*')
      .eq('quote_id', quoteId)
      .order('position', { ascending: true }),
    'load the quote lines',
  );
}

export async function getQuoteFull(id: string): Promise<QuoteFull | null> {
  const quote = await getQuote(id);
  if (!quote) return null;

  const [items, contact, company] = await Promise.all([
    listQuoteItems(id),
    quote.contact_id ? getContact(quote.contact_id) : Promise.resolve(null),
    quote.company_id ? getCompany(quote.company_id) : Promise.resolve(null),
  ]);

  return { quote, items, contact, company };
}

/**
 * Raise a formal quote.
 *
 * The number is allocated first and the totals are frozen onto the row, so a
 * later change to the price list can never alter a quote already issued.
 */
export async function createQuote(input: CreateQuoteInput, actor = 'studio'): Promise<Quote> {
  const lines = normaliseLines(input.items);
  const settings = await getSettings();
  const vatRate = effectiveVatRate(settings);
  const totals = computeTotals(lines, vatRate);

  const number = await nextQuoteNumber();

  const quote = row<Quote>(
    await db()
      .from('quotes')
      .insert({
        number,
        deal_id: input.dealId ?? null,
        contact_id: input.contactId ?? null,
        company_id: input.companyId ?? null,
        message_id: input.messageId ?? null,
        status: 'draft',
        subtotal: totals.subtotal,
        vat_rate: vatRate,
        vat_amount: totals.vatAmount,
        total: totals.total,
        intro: input.intro?.trim() || null,
        terms: input.terms?.trim() || null,
        valid_until:
          input.validUntil ?? addDaysISO(todayISO(), num(settings.quote_validity_days, 30)),
      })
      .select('*')
      .single(),
    'create the quote',
  );

  const itemsResult = await db()
    .from('quote_items')
    .insert(lines.map((line, index) => ({ ...line, quote_id: quote.id, position: index })));

  if (itemsResult.error) {
    // PostgREST has no transactions, so a quote whose lines failed to write is
    // removed rather than left as a numbered document with nothing on it.
    await db().from('quotes').delete().eq('id', quote.id);
    throw new Error(`could not write the quote lines: ${itemsResult.error.message}`);
  }

  await logActivity({
    entityType: 'quote',
    entityId: quote.id,
    kind: 'created',
    title: `Quote ${quote.number} drafted`,
    body: totals.hasOnRequest
      ? `${formatRand(quote.total)} plus items quoted on request`
      : formatRand(quote.total),
    actor,
    meta: { number: quote.number, total: quote.total },
  });

  if (input.dealId) {
    await logActivity({
      entityType: 'deal',
      entityId: input.dealId,
      kind: 'quote_created',
      title: `Quote ${quote.number} drafted`,
      actor,
      meta: { quoteId: quote.id },
    });
  }

  return quote;
}

/** Mark a quote as issued. Sending the email itself belongs to the mail slice. */
export async function sendQuote(id: string, actor = 'studio'): Promise<Quote> {
  const current = await getQuote(id);
  if (!current) throw new Error(`quote ${id} not found`);
  if (current.status === 'accepted' || current.status === 'superseded') {
    throw new Error(`quote ${current.number} is ${current.status} and cannot be sent again`);
  }

  const settings = await getSettings();
  const quote = row<Quote>(
    await db()
      .from('quotes')
      .update({
        status: 'sent',
        sent_at: nowISO(),
        valid_until:
          current.valid_until ?? addDaysISO(todayISO(), num(settings.quote_validity_days, 30)),
      })
      .eq('id', id)
      .select('*')
      .single(),
    'send the quote',
  );

  await logActivity({
    entityType: 'quote',
    entityId: quote.id,
    kind: 'sent',
    title: `Quote ${quote.number} sent`,
    body: formatRand(quote.total),
    actor,
  });

  // A quote out with the client is what "quoted" means on the pipeline.
  if (quote.deal_id) {
    const deal = await getDeal(quote.deal_id);
    if (deal && (deal.stage === 'new' || deal.stage === 'qualifying')) {
      await moveDealStage(deal.id, 'quoted', {}, actor);
    }
  }

  return quote;
}

/**
 * Record that a client accepted.
 *
 * `name` and `ip` are the evidence that somebody agreed, captured at the click.
 * The caller is responsible for having established that this quote belongs to
 * whoever is clicking — from the portal that means resolving it through
 * portal.ts getQuote() first.
 */
export async function acceptQuote(
  id: string,
  evidence: { name?: string | null; ip?: string | null } = {},
  actor = 'client',
): Promise<Quote> {
  const current = await getQuote(id);
  if (!current) throw new Error(`quote ${id} not found`);
  if (current.status === 'accepted') return current;
  if (current.status === 'draft') throw new Error('a draft quote has not been sent yet');
  if (current.status === 'superseded' || current.status === 'declined') {
    throw new Error(`quote ${current.number} is ${current.status} and can no longer be accepted`);
  }

  const quote = row<Quote>(
    await db()
      .from('quotes')
      .update({
        status: 'accepted',
        accepted_at: nowISO(),
        accepted_by_name: evidence.name?.trim() || null,
        accepted_ip: evidence.ip?.trim() || null,
        declined_at: null,
        decline_reason: null,
      })
      .eq('id', id)
      .select('*')
      .single(),
    'accept the quote',
  );

  await logActivity({
    entityType: 'quote',
    entityId: quote.id,
    kind: 'accepted',
    title: `Quote ${quote.number} accepted`,
    body: quote.accepted_by_name ? `Accepted by ${quote.accepted_by_name}` : null,
    actor,
    meta: { total: quote.total, ip: quote.accepted_ip },
  });

  if (quote.deal_id) {
    await moveDealStage(quote.deal_id, 'won', {}, actor);
  }

  return quote;
}

export async function declineQuote(
  id: string,
  reason?: string | null,
  actor = 'client',
): Promise<Quote> {
  const current = await getQuote(id);
  if (!current) throw new Error(`quote ${id} not found`);
  if (current.status === 'accepted') {
    throw new Error(`quote ${current.number} has already been accepted`);
  }

  const quote = row<Quote>(
    await db()
      .from('quotes')
      .update({
        status: 'declined',
        declined_at: nowISO(),
        decline_reason: reason?.trim() || null,
      })
      .eq('id', id)
      .select('*')
      .single(),
    'decline the quote',
  );

  // The deal is deliberately left open: a declined price is often the start of
  // a negotiation, not the end of the opportunity.
  await logActivity({
    entityType: 'quote',
    entityId: quote.id,
    kind: 'declined',
    title: `Quote ${quote.number} declined`,
    body: quote.decline_reason,
    actor,
  });

  return quote;
}

/** Retire a quote that has been replaced by a revised one. */
export async function supersedeQuote(id: string, actor = 'studio'): Promise<Quote> {
  const current = await getQuote(id);
  if (!current) throw new Error(`quote ${id} not found`);
  if (current.status === 'accepted') {
    throw new Error(`quote ${current.number} has been accepted and cannot be superseded`);
  }

  const quote = row<Quote>(
    await db().from('quotes').update({ status: 'superseded' }).eq('id', id).select('*').single(),
    'supersede the quote',
  );

  await logActivity({
    entityType: 'quote',
    entityId: quote.id,
    kind: 'superseded',
    title: `Quote ${quote.number} superseded`,
    actor,
  });

  return quote;
}

/** One line of the agent's draft, as stored in quote_messages.quote_lines. */
type AgentQuoteLine = {
  includes?: string[];
  id?: string | null;
  name?: string | null;
  unitPrice?: number | null;
  quantity?: number | null;
  lineTotal?: number | null;
  note?: string | null;
};

/**
 * Promote an AI-drafted quote email into a formal, numbered quote.
 *
 * The draft in quote_messages is a proposal; this is the document the client
 * can accept. It is idempotent on message_id, because clicking twice must not
 * burn a second quote number.
 */
export async function quoteFromAgentDraft(messageId: string, actor = 'studio'): Promise<Quote> {
  const already = firstRow<Quote>(
    await db()
      .from('quotes')
      .select('*')
      .eq('message_id', messageId)
      .order('created_at', { ascending: false })
      .limit(1),
    'look for an existing quote',
  );
  if (already) return already;

  const message = maybeRow<{
    id: string;
    thread_id: string;
    subject: string | null;
    quote_lines: AgentQuoteLine[] | null;
  }>(
    await db()
      .from('quote_messages')
      .select('id, thread_id, subject, quote_lines')
      .eq('id', messageId)
      .maybeSingle(),
    'load the draft',
  );
  if (!message) throw new Error(`quote draft ${messageId} not found`);

  const drafted = Array.isArray(message.quote_lines) ? message.quote_lines : [];
  if (drafted.length === 0) throw new Error('that draft has no quote lines to turn into a quote');

  const thread = maybeRow<{ id: string; lead_id: string; subject: string | null }>(
    await db()
      .from('quote_threads')
      .select('id, lead_id, subject')
      .eq('id', message.thread_id)
      .maybeSingle(),
    'load the conversation',
  );
  if (!thread) throw new Error('that draft is not attached to a conversation');

  const lead = maybeRow<{
    id: string;
    name: string;
    email: string;
    phone: string | null;
    service: string | null;
    origin: string | null;
  }>(
    await db()
      .from('leads')
      .select('id, name, email, phone, service, origin')
      .eq('id', thread.lead_id)
      .maybeSingle(),
    'load the lead',
  );
  if (!lead) throw new Error('that conversation has no lead behind it');

  const contact = await findOrCreateContactByEmail(
    { email: lead.email, name: lead.name, phone: lead.phone },
    actor,
  );

  // Point the lead at the CRM records it produced, so the two pipelines agree.
  await db()
    .from('leads')
    .update({ contact_id: contact.id, company_id: contact.company_id })
    .eq('id', lead.id);

  // A quote belongs on the pipeline. Reuse the lead's deal if it already has
  // one rather than opening a second for the same conversation.
  let deal = firstRow<Deal>(
    await db()
      .from('deals')
      .select('*')
      .eq('lead_id', lead.id)
      .order('created_at', { ascending: false })
      .limit(1),
    'look up the deal',
  );

  if (!deal) {
    deal = await createDeal(
      {
        title: thread.subject?.trim() || lead.service?.trim() || `Enquiry from ${lead.name}`,
        contactId: contact.id,
        companyId: contact.company_id,
        leadId: lead.id,
        stage: 'quoted',
        source: lead.origin ?? 'email',
      },
      actor,
    );
  }

  const items: LineInput[] = drafted.map((line) => ({
    price_item_id: line.id ?? null,
    name: (line.name ?? '').trim() || 'Design work',
    description: line.note?.trim() || null,
    quantity: num(line.quantity, 1),
    unit_price: line.unitPrice === null || line.unitPrice === undefined ? null : num(line.unitPrice),
  }));

  const quote = await createQuote(
    {
      dealId: deal.id,
      contactId: contact.id,
      companyId: contact.company_id,
      messageId: message.id,
      items,
    },
    actor,
  );

  if (deal.stage === 'new' || deal.stage === 'qualifying') {
    await moveDealStage(deal.id, 'quoted', {}, actor);
  }

  return quote;
}

// ── Projects ────────────────────────────────────────────────────────────────

export type CreateProjectInput = {
  name?: string | null;
  quoteId?: string | null;
  dealId?: string | null;
  contactId?: string | null;
  companyId?: string | null;
  brief?: string | null;
  dueAt?: string | null;
  status?: ProjectStatus;
  revisionsIncluded?: number;
  notes?: string | null;
};

export type ProjectFull = {
  project: Project;
  milestones: ProjectMilestone[];
  files: StoredFile[];
  contact: Contact | null;
  company: Company | null;
};

export async function listProjects(
  options: {
    status?: ProjectStatus;
    active?: boolean;
    contactId?: string;
    companyId?: string;
    dealId?: string;
    quoteId?: string;
    limit?: number;
  } = {},
): Promise<Project[]> {
  let query = db().from('projects').select('*');

  if (options.status) query = query.eq('status', options.status);
  else if (options.active) query = query.not('status', 'in', `(${CLOSED_PROJECT_STATUSES.join(',')})`);
  if (options.contactId) query = query.eq('contact_id', options.contactId);
  if (options.companyId) query = query.eq('company_id', options.companyId);
  if (options.dealId) query = query.eq('deal_id', options.dealId);
  if (options.quoteId) query = query.eq('quote_id', options.quoteId);

  return rows<Project>(
    await query.order('updated_at', { ascending: false }).limit(clampLimit(options.limit, 300)),
    'load projects',
  );
}

export async function getProject(id: string): Promise<Project | null> {
  return maybeRow<Project>(
    await db().from('projects').select('*').eq('id', id).maybeSingle(),
    'load the project',
  );
}

export async function listMilestones(projectId: string): Promise<ProjectMilestone[]> {
  return rows<ProjectMilestone>(
    await db()
      .from('project_milestones')
      .select('*')
      .eq('project_id', projectId)
      .order('position', { ascending: true }),
    'load the milestones',
  );
}

/** Admin view: internal files included, unlike the portal's. */
export async function listProjectFiles(projectId: string): Promise<StoredFile[]> {
  return rows<StoredFile>(
    await db()
      .from('files')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false }),
    'load the project files',
  );
}

export async function getProjectFull(id: string): Promise<ProjectFull | null> {
  const project = await getProject(id);
  if (!project) return null;

  const [milestones, files, contact, company] = await Promise.all([
    listMilestones(id),
    listProjectFiles(id),
    project.contact_id ? getContact(project.contact_id) : Promise.resolve(null),
    project.company_id ? getCompany(project.company_id) : Promise.resolve(null),
  ]);

  return { project, milestones, files, contact, company };
}

/** Work out who a document belongs to when the caller only gave a parent record. */
async function resolveParty(input: {
  contactId?: string | null;
  companyId?: string | null;
  projectId?: string | null;
  quoteId?: string | null;
  dealId?: string | null;
}): Promise<{ contact_id: string | null; company_id: string | null }> {
  let contactId = input.contactId ?? null;
  let companyId = input.companyId ?? null;

  const parents: (Project | Quote | Deal | null)[] = [];
  if (!contactId || !companyId) {
    if (input.projectId) parents.push(await getProject(input.projectId));
    if (input.quoteId) parents.push(await getQuote(input.quoteId));
    if (input.dealId) parents.push(await getDeal(input.dealId));
  }

  for (const parent of parents) {
    if (!parent) continue;
    contactId = contactId ?? parent.contact_id;
    companyId = companyId ?? parent.company_id;
  }

  return { contact_id: contactId, company_id: companyId };
}

export async function createProject(input: CreateProjectInput, actor = 'studio'): Promise<Project> {
  const party = await resolveParty(input);

  let name = input.name?.trim() ?? '';
  if (!name && input.quoteId) {
    const quote = await getQuote(input.quoteId);
    if (quote) name = `Project for quote ${quote.number}`;
  }
  if (!name && input.dealId) {
    const deal = await getDeal(input.dealId);
    if (deal) name = deal.title;
  }
  if (!name) throw new Error('a project needs a name');

  const code = await nextProjectCode();

  const project = row<Project>(
    await db()
      .from('projects')
      .insert(
        defined({
          code,
          name,
          quote_id: input.quoteId ?? null,
          deal_id: input.dealId ?? null,
          contact_id: party.contact_id,
          company_id: party.company_id,
          status: input.status ?? 'not_started',
          brief: input.brief?.trim() || null,
          due_at: input.dueAt ?? null,
          revisions_included: input.revisionsIncluded,
          notes: input.notes ?? null,
        }),
      )
      .select('*')
      .single(),
    'create the project',
  );

  await logActivity({
    entityType: 'project',
    entityId: project.id,
    kind: 'created',
    title: `Project ${project.code} opened: ${project.name}`,
    actor,
  });

  return project;
}

/**
 * Turn an accepted quote into a live project.
 *
 * Milestones are seeded from the quote lines, so what was sold is exactly what
 * appears on the schedule the client watches. Idempotent per quote — a second
 * click returns the project that already exists rather than opening a rival.
 */
export async function projectFromQuote(quoteId: string, actor = 'studio'): Promise<Project> {
  const existing = firstRow<Project>(
    await db()
      .from('projects')
      .select('*')
      .eq('quote_id', quoteId)
      .order('created_at', { ascending: false })
      .limit(1),
    'look for an existing project',
  );
  if (existing) return existing;

  const full = await getQuoteFull(quoteId);
  if (!full) throw new Error(`quote ${quoteId} not found`);

  const { quote, items, contact, company } = full;
  const who = company?.name ?? (contact ? contactName(contact) : null);

  const project = await createProject(
    {
      name: who ? `${who} — ${items[0]?.name ?? 'Design work'}` : `Quote ${quote.number}`,
      quoteId: quote.id,
      dealId: quote.deal_id,
      contactId: quote.contact_id,
      companyId: quote.company_id,
      brief: quote.intro,
    },
    actor,
  );

  if (items.length > 0) {
    const seeded = await db()
      .from('project_milestones')
      .insert(
        items.map((item, index) => ({
          project_id: project.id,
          position: index,
          title: item.name,
          status: 'pending',
          client_visible: true,
        })),
      );
    ensure(seeded, 'seed the project milestones');
  }

  await logActivity({
    entityType: 'quote',
    entityId: quote.id,
    kind: 'project_opened',
    title: `Project ${project.code} opened from this quote`,
    actor,
    meta: { projectId: project.id },
  });

  return project;
}

export async function updateProject(
  id: string,
  patch: Partial<CreateProjectInput>,
  actor = 'studio',
): Promise<Project> {
  const update = defined({
    name: patch.name?.trim(),
    brief: patch.brief,
    due_at: patch.dueAt,
    contact_id: patch.contactId,
    company_id: patch.companyId,
    quote_id: patch.quoteId,
    deal_id: patch.dealId,
    revisions_included: patch.revisionsIncluded,
    notes: patch.notes,
  });

  if (Object.keys(update).length === 0) {
    const current = await getProject(id);
    if (!current) throw new Error(`project ${id} not found`);
    return current;
  }

  const project = row<Project>(
    await db().from('projects').update(update).eq('id', id).select('*').single(),
    'update the project',
  );

  await logActivity({
    entityType: 'project',
    entityId: project.id,
    kind: 'updated',
    title: 'Project updated',
    actor,
    meta: { fields: Object.keys(update) },
  });

  return project;
}

/**
 * Move a project's status, stamping the dates that go with it.
 *
 * started_at is only ever set once — the first time real work begins — because
 * a project that bounces between in-progress and with-client would otherwise
 * keep resetting the day it started.
 */
export async function setProjectStatus(
  id: string,
  status: ProjectStatus,
  actor = 'studio',
): Promise<Project> {
  const current = await getProject(id);
  if (!current) throw new Error(`project ${id} not found`);

  const definition = PROJECT_STATUSES.find((s) => s.id === status);
  if (!definition) throw new Error(`"${status}" is not a project status`);

  const update: Record<string, unknown> = { status };
  const now = nowISO();

  if (status !== 'not_started' && !current.started_at) update.started_at = now;

  if (status === 'delivered') {
    update.delivered_at = current.delivered_at ?? now;
    update.closed_at = current.closed_at ?? now;
  } else if (status === 'cancelled') {
    update.closed_at = current.closed_at ?? now;
  } else {
    // Reopened work is not closed and not delivered.
    update.closed_at = null;
    update.delivered_at = null;
  }

  const project = row<Project>(
    await db().from('projects').update(update).eq('id', id).select('*').single(),
    'change the project status',
  );

  await logActivity({
    entityType: 'project',
    entityId: project.id,
    kind: 'status_changed',
    title: `Project ${project.code} — ${definition.label}`,
    actor,
    meta: { from: current.status, to: status },
  });

  return project;
}

export type MilestoneInput = {
  projectId: string;
  title: string;
  status?: MilestoneStatus;
  dueAt?: string | null;
  clientVisible?: boolean;
  position?: number;
};

export async function addMilestone(input: MilestoneInput, actor = 'studio'): Promise<ProjectMilestone> {
  const title = input.title?.trim();
  if (!title) throw new Error('a milestone needs a title');

  let position = input.position;
  if (position === undefined) {
    const existing = await listMilestones(input.projectId);
    position = existing.length;
  }

  const milestone = row<ProjectMilestone>(
    await db()
      .from('project_milestones')
      .insert({
        project_id: input.projectId,
        title,
        status: input.status ?? 'pending',
        due_at: input.dueAt ?? null,
        client_visible: input.clientVisible ?? true,
        position,
      })
      .select('*')
      .single(),
    'add the milestone',
  );

  await logActivity({
    entityType: 'project',
    entityId: input.projectId,
    kind: 'milestone_added',
    title: `Milestone added: ${milestone.title}`,
    actor,
  });

  return milestone;
}

export async function updateMilestone(
  id: string,
  patch: { title?: string; status?: MilestoneStatus; dueAt?: string | null; clientVisible?: boolean },
  actor = 'studio',
): Promise<ProjectMilestone> {
  const update = defined({
    title: patch.title?.trim(),
    status: patch.status,
    due_at: patch.dueAt,
    client_visible: patch.clientVisible,
  });

  // completed_at follows the status rather than the caller, so it cannot drift.
  if (patch.status !== undefined) {
    update.completed_at = patch.status === 'done' ? nowISO() : null;
  }

  if (Object.keys(update).length === 0) {
    const current = maybeRow<ProjectMilestone>(
      await db().from('project_milestones').select('*').eq('id', id).maybeSingle(),
      'load the milestone',
    );
    if (!current) throw new Error(`milestone ${id} not found`);
    return current;
  }

  const milestone = row<ProjectMilestone>(
    await db().from('project_milestones').update(update).eq('id', id).select('*').single(),
    'update the milestone',
  );

  if (patch.status === 'done') {
    await logActivity({
      entityType: 'project',
      entityId: milestone.project_id,
      kind: 'milestone_done',
      title: `Milestone complete: ${milestone.title}`,
      actor,
    });
  }

  return milestone;
}

export async function deleteMilestone(id: string): Promise<void> {
  ensure(await db().from('project_milestones').delete().eq('id', id), 'delete the milestone');
}

/**
 * Rewrite milestone order.
 *
 * Each update is scoped by project_id as well as id, so an id belonging to a
 * different project cannot be dragged into this one's ordering.
 */
export async function reorderMilestones(projectId: string, orderedIds: string[]): Promise<ProjectMilestone[]> {
  for (let index = 0; index < orderedIds.length; index += 1) {
    ensure(
      await db()
        .from('project_milestones')
        .update({ position: index })
        .eq('id', orderedIds[index])
        .eq('project_id', projectId),
      'reorder the milestones',
    );
  }

  return listMilestones(projectId);
}

// ── Invoices ────────────────────────────────────────────────────────────────

export type CreateInvoiceInput = {
  projectId?: string | null;
  dealId?: string | null;
  quoteId?: string | null;
  contactId?: string | null;
  companyId?: string | null;
  kind?: InvoiceKind;
  items: LineInput[];
  issueDate?: string | null;
  dueDate?: string | null;
  notes?: string | null;
};

export type InvoiceFull = {
  invoice: Invoice;
  items: InvoiceItem[];
  payments: Payment[];
  contact: Contact | null;
  company: Company | null;
};

export async function listInvoices(
  options: {
    status?: InvoiceStatus;
    unpaid?: boolean;
    overdue?: boolean;
    contactId?: string;
    companyId?: string;
    dealId?: string;
    projectId?: string;
    quoteId?: string;
    limit?: number;
  } = {},
): Promise<Invoice[]> {
  let query = db().from('invoices').select('*');

  if (options.status) query = query.eq('status', options.status);
  else if (options.unpaid || options.overdue) query = query.not('status', 'in', '(draft,void,paid)');

  if (options.contactId) query = query.eq('contact_id', options.contactId);
  if (options.companyId) query = query.eq('company_id', options.companyId);
  if (options.dealId) query = query.eq('deal_id', options.dealId);
  if (options.projectId) query = query.eq('project_id', options.projectId);
  if (options.quoteId) query = query.eq('quote_id', options.quoteId);

  // The overdue status is only refreshed by the payments trigger, so "past its
  // due date" is decided on the date here rather than trusted from the column.
  if (options.overdue) query = query.lt('due_date', todayISO());

  return rows<Invoice>(
    await query.order('issue_date', { ascending: false }).limit(clampLimit(options.limit, 300)),
    'load invoices',
  );
}

export async function getInvoice(id: string): Promise<Invoice | null> {
  return maybeRow<Invoice>(
    await db().from('invoices').select('*').eq('id', id).maybeSingle(),
    'load the invoice',
  );
}

export async function listInvoiceItems(invoiceId: string): Promise<InvoiceItem[]> {
  return rows<InvoiceItem>(
    await db()
      .from('invoice_items')
      .select('*')
      .eq('invoice_id', invoiceId)
      .order('position', { ascending: true }),
    'load the invoice lines',
  );
}

export async function listPayments(invoiceId: string): Promise<Payment[]> {
  return rows<Payment>(
    await db()
      .from('payments')
      .select('*')
      .eq('invoice_id', invoiceId)
      .order('received_at', { ascending: false }),
    'load the payments',
  );
}

export async function getInvoiceFull(id: string): Promise<InvoiceFull | null> {
  const invoice = await getInvoice(id);
  if (!invoice) return null;

  const [items, payments, contact, company] = await Promise.all([
    listInvoiceItems(id),
    listPayments(id),
    invoice.contact_id ? getContact(invoice.contact_id) : Promise.resolve(null),
    invoice.company_id ? getCompany(invoice.company_id) : Promise.resolve(null),
  ]);

  return { invoice, items, payments, contact, company };
}

export async function createInvoice(input: CreateInvoiceInput, actor = 'studio'): Promise<Invoice> {
  const lines = normaliseLines(input.items);
  if (lines.some((line) => line.unit_price === null)) {
    throw new Error('an invoice cannot contain a line quoted "on request" — price it first');
  }

  const settings = await getSettings();
  const vatRate = effectiveVatRate(settings);
  const totals = computeTotals(lines, vatRate);
  const party = await resolveParty(input);

  const issueDate = input.issueDate ?? todayISO();
  const number = await nextInvoiceNumber();

  const invoice = row<Invoice>(
    await db()
      .from('invoices')
      .insert({
        number,
        project_id: input.projectId ?? null,
        deal_id: input.dealId ?? null,
        quote_id: input.quoteId ?? null,
        contact_id: party.contact_id,
        company_id: party.company_id,
        kind: input.kind ?? 'full',
        status: 'draft',
        subtotal: totals.subtotal,
        vat_rate: vatRate,
        vat_amount: totals.vatAmount,
        total: totals.total,
        issue_date: issueDate,
        due_date: input.dueDate ?? addDaysISO(issueDate, num(settings.payment_terms_days, 14)),
        notes: input.notes?.trim() || settings.invoice_notes || null,
      })
      .select('*')
      .single(),
    'create the invoice',
  );

  const itemsResult = await db()
    .from('invoice_items')
    .insert(
      lines.map((line, index) => ({
        invoice_id: invoice.id,
        position: index,
        name: line.name,
        description: line.description,
        quantity: line.quantity,
        unit_price: line.unit_price,
        line_total: line.line_total,
      })),
    );

  if (itemsResult.error) {
    // Same reasoning as createQuote: no transactions, so an invoice with no
    // lines is removed rather than left occupying a number.
    await db().from('invoices').delete().eq('id', invoice.id);
    throw new Error(`could not write the invoice lines: ${itemsResult.error.message}`);
  }

  await logActivity({
    entityType: 'invoice',
    entityId: invoice.id,
    kind: 'created',
    title: `Invoice ${invoice.number} raised`,
    body: formatRand(invoice.total),
    actor,
    meta: { number: invoice.number, kind: invoice.kind, total: invoice.total },
  });

  if (invoice.project_id) {
    await logActivity({
      entityType: 'project',
      entityId: invoice.project_id,
      kind: 'invoice_raised',
      title: `Invoice ${invoice.number} raised — ${formatRand(invoice.total)}`,
      actor,
      meta: { invoiceId: invoice.id },
    });
  }

  return invoice;
}

/** Subtotal already committed to invoices against a quote, ignoring voided ones. */
async function invoicedSubtotal(quoteId: string): Promise<number> {
  const existing = await listInvoices({ quoteId, limit: 100 });
  return round2(
    existing
      .filter((inv) => inv.status !== 'void')
      .reduce((sum, inv) => sum + num(inv.subtotal), 0),
  );
}

/**
 * Raise the deposit that starts the work.
 *
 * The percentage comes off the ex-VAT subtotal and VAT is then applied to the
 * deposit, so deposit plus balance add back to exactly the quoted total.
 */
export async function depositInvoiceFromQuote(quoteId: string, actor = 'studio'): Promise<Invoice> {
  const quote = await getQuote(quoteId);
  if (!quote) throw new Error(`quote ${quoteId} not found`);
  if (quote.status === 'declined' || quote.status === 'superseded') {
    throw new Error(`quote ${quote.number} is ${quote.status} — nothing to invoice`);
  }

  const already = (await listInvoices({ quoteId, limit: 100 })).find(
    (inv) => inv.kind === 'deposit' && inv.status !== 'void',
  );
  if (already) return already;

  const settings = await getSettings();
  const percent = num(settings.deposit_percent, 50);
  const amount = round2(num(quote.subtotal) * (percent / 100));
  if (amount <= 0) throw new Error(`quote ${quote.number} has no value to take a deposit from`);

  return createInvoice(
    {
      quoteId: quote.id,
      dealId: quote.deal_id,
      contactId: quote.contact_id,
      companyId: quote.company_id,
      kind: 'deposit',
      items: [
        {
          name: `Deposit — ${percent}% to begin`,
          description: `Against quote ${quote.number}`,
          quantity: 1,
          unit_price: amount,
        },
      ],
    },
    actor,
  );
}

/** Invoice whatever of the quote is not yet on an invoice. */
export async function balanceInvoiceFromQuote(quoteId: string, actor = 'studio'): Promise<Invoice> {
  const quote = await getQuote(quoteId);
  if (!quote) throw new Error(`quote ${quoteId} not found`);
  if (quote.status === 'declined' || quote.status === 'superseded') {
    throw new Error(`quote ${quote.number} is ${quote.status} — nothing to invoice`);
  }

  const remaining = round2(num(quote.subtotal) - (await invoicedSubtotal(quoteId)));
  if (remaining <= 0) {
    throw new Error(`quote ${quote.number} is already fully invoiced`);
  }

  const project = firstRow<Project>(
    await db().from('projects').select('*').eq('quote_id', quoteId).limit(1),
    'look up the project',
  );

  return createInvoice(
    {
      quoteId: quote.id,
      dealId: quote.deal_id,
      projectId: project?.id ?? null,
      contactId: quote.contact_id,
      companyId: quote.company_id,
      kind: 'balance',
      items: [
        {
          name: 'Balance on completion',
          description: `Against quote ${quote.number}`,
          quantity: 1,
          unit_price: remaining,
        },
      ],
    },
    actor,
  );
}

export async function sendInvoice(id: string, actor = 'studio'): Promise<Invoice> {
  const current = await getInvoice(id);
  if (!current) throw new Error(`invoice ${id} not found`);
  if (current.status === 'void') throw new Error(`invoice ${current.number} has been voided`);
  if (current.status === 'paid') return current;

  const settings = await getSettings();
  const invoice = row<Invoice>(
    await db()
      .from('invoices')
      .update({
        // Only a draft actually becomes "sent". Re-sending a reminder must not
        // walk an invoice back from part_paid or overdue — the payments trigger
        // owns those, and overwriting them here is how the two disagree.
        status: current.status === 'draft' ? 'sent' : current.status,
        sent_at: current.sent_at ?? nowISO(),
        due_date:
          current.due_date ??
          addDaysISO(current.issue_date, num(settings.payment_terms_days, 14)),
      })
      .eq('id', id)
      .select('*')
      .single(),
    'send the invoice',
  );

  await logActivity({
    entityType: 'invoice',
    entityId: invoice.id,
    kind: 'sent',
    title: `Invoice ${invoice.number} sent`,
    body: `${formatRand(invoice.total)} due ${invoice.due_date ?? 'on receipt'}`,
    actor,
  });

  return invoice;
}

export async function voidInvoice(id: string, reason?: string | null, actor = 'studio'): Promise<Invoice> {
  const current = await getInvoice(id);
  if (!current) throw new Error(`invoice ${id} not found`);
  if (num(current.amount_paid) > 0) {
    throw new Error(
      `invoice ${current.number} has ${formatRand(current.amount_paid)} against it — refund and remove the payment before voiding`,
    );
  }

  const invoice = row<Invoice>(
    await db().from('invoices').update({ status: 'void' }).eq('id', id).select('*').single(),
    'void the invoice',
  );

  await logActivity({
    entityType: 'invoice',
    entityId: invoice.id,
    kind: 'voided',
    title: `Invoice ${invoice.number} voided`,
    body: reason?.trim() || null,
    actor,
  });

  return invoice;
}

/**
 * Record money received.
 *
 * amount_paid, paid_at and status are NOT set here — the payments trigger
 * recalculates them from the payment rows. Writing them from application code
 * as well is how those numbers drift apart.
 */
export async function recordPayment(
  input: {
    invoiceId: string;
    amount: number;
    method?: PaymentMethod;
    reference?: string | null;
    receivedAt?: string | null;
    notes?: string | null;
  },
  actor = 'studio',
): Promise<{ payment: Payment; invoice: Invoice }> {
  const amount = round2(num(input.amount));
  if (!(amount > 0)) throw new Error('a payment must be more than nothing');

  const target = await getInvoice(input.invoiceId);
  if (!target) throw new Error(`invoice ${input.invoiceId} not found`);
  if (target.status === 'void') {
    throw new Error(`invoice ${target.number} has been voided and cannot take a payment`);
  }

  const payment = row<Payment>(
    await db()
      .from('payments')
      .insert({
        invoice_id: input.invoiceId,
        amount,
        method: input.method ?? 'eft',
        reference: input.reference?.trim() || null,
        received_at: input.receivedAt ?? todayISO(),
        notes: input.notes?.trim() || null,
      })
      .select('*')
      .single(),
    'record the payment',
  );

  // Re-read so the caller sees what the trigger made of it.
  const invoice = await getInvoice(input.invoiceId);
  if (!invoice) throw new Error(`invoice ${input.invoiceId} disappeared while recording a payment`);

  await logActivity({
    entityType: 'invoice',
    entityId: invoice.id,
    kind: invoice.status === 'paid' ? 'paid' : 'payment_recorded',
    title:
      invoice.status === 'paid'
        ? `Invoice ${invoice.number} paid in full`
        : `Payment received: ${formatRand(amount)}`,
    body:
      invoice.status === 'paid'
        ? formatRand(invoice.total)
        : `${formatRand(num(invoice.total) - num(invoice.amount_paid))} still outstanding`,
    actor,
    meta: { paymentId: payment.id, method: payment.method, reference: payment.reference },
  });

  if (invoice.project_id && invoice.status === 'paid') {
    await logActivity({
      entityType: 'project',
      entityId: invoice.project_id,
      kind: 'invoice_paid',
      title: `Invoice ${invoice.number} paid in full`,
      actor,
      meta: { invoiceId: invoice.id },
    });
  }

  return { payment, invoice };
}

/** Remove a payment captured in error. The trigger walks the invoice back. */
export async function deletePayment(id: string, actor = 'studio'): Promise<Invoice | null> {
  const payment = maybeRow<Payment>(
    await db().from('payments').select('*').eq('id', id).maybeSingle(),
    'load the payment',
  );
  if (!payment) return null;

  ensure(await db().from('payments').delete().eq('id', id), 'delete the payment');

  const invoice = await getInvoice(payment.invoice_id);
  if (invoice) {
    await logActivity({
      entityType: 'invoice',
      entityId: invoice.id,
      kind: 'payment_removed',
      title: `Payment of ${formatRand(payment.amount)} removed`,
      actor,
    });
  }

  return invoice;
}

// ── Tasks ───────────────────────────────────────────────────────────────────

/**
 * Tasks and notes may hang off anything except a mail thread — the CHECK
 * constraints on those two tables leave 'thread' out, so the input types do too.
 */
export type LinkableEntityType = Exclude<EntityType, 'thread'>;

export type TaskInput = {
  title: string;
  notes?: string | null;
  dueAt?: string | null;
  priority?: 'low' | 'normal' | 'high';
  assignedTo?: string | null;
  entityType?: LinkableEntityType | null;
  entityId?: string | null;
};

export async function listTasks(
  options: {
    open?: boolean;
    entityType?: LinkableEntityType;
    entityId?: string;
    dueBefore?: string;
    limit?: number;
  } = {},
): Promise<Task[]> {
  let query = db().from('tasks').select('*');

  if (options.open === true) query = query.is('done_at', null);
  else if (options.open === false) query = query.not('done_at', 'is', null);

  if (options.entityType) query = query.eq('entity_type', options.entityType);
  if (options.entityId) query = query.eq('entity_id', options.entityId);
  if (options.dueBefore) query = query.lte('due_at', options.dueBefore);

  return rows<Task>(
    await query
      // Nulls last so dated work leads the list and someday-tasks sink.
      .order('due_at', { ascending: true, nullsFirst: false })
      .order('created_at', { ascending: false })
      .limit(clampLimit(options.limit, 200)),
    'load tasks',
  );
}

export async function createTask(input: TaskInput, actor = 'studio'): Promise<Task> {
  const title = input.title?.trim();
  if (!title) throw new Error('a task needs a title');

  const task = row<Task>(
    await db()
      .from('tasks')
      .insert({
        title,
        notes: input.notes?.trim() || null,
        due_at: input.dueAt ?? null,
        priority: input.priority ?? 'normal',
        assigned_to: input.assignedTo?.trim() || null,
        entity_type: input.entityType ?? null,
        entity_id: input.entityId ?? null,
      })
      .select('*')
      .single(),
    'create the task',
  );

  if (task.entity_type && task.entity_id) {
    await logActivity({
      entityType: task.entity_type,
      entityId: task.entity_id,
      kind: 'task_created',
      title: `Task: ${task.title}`,
      body: task.due_at ? `Due ${task.due_at}` : null,
      actor,
    });
  }

  return task;
}

export async function updateTask(id: string, patch: Partial<TaskInput>): Promise<Task> {
  const update = defined({
    title: patch.title?.trim(),
    notes: patch.notes,
    due_at: patch.dueAt,
    priority: patch.priority,
    assigned_to: patch.assignedTo,
    entity_type: patch.entityType,
    entity_id: patch.entityId,
  });

  if (Object.keys(update).length === 0) {
    const current = maybeRow<Task>(
      await db().from('tasks').select('*').eq('id', id).maybeSingle(),
      'load the task',
    );
    if (!current) throw new Error(`task ${id} not found`);
    return current;
  }

  return row<Task>(
    await db().from('tasks').update(update).eq('id', id).select('*').single(),
    'update the task',
  );
}

export async function completeTask(id: string, actor = 'studio'): Promise<Task> {
  const task = row<Task>(
    await db().from('tasks').update({ done_at: nowISO() }).eq('id', id).select('*').single(),
    'complete the task',
  );

  if (task.entity_type && task.entity_id) {
    await logActivity({
      entityType: task.entity_type,
      entityId: task.entity_id,
      kind: 'task_done',
      title: `Task done: ${task.title}`,
      actor,
    });
  }

  return task;
}

export async function reopenTask(id: string): Promise<Task> {
  return row<Task>(
    await db().from('tasks').update({ done_at: null }).eq('id', id).select('*').single(),
    'reopen the task',
  );
}

export async function deleteTask(id: string): Promise<void> {
  ensure(await db().from('tasks').delete().eq('id', id), 'delete the task');
}

// ── Notes ───────────────────────────────────────────────────────────────────

export async function listNotes(
  entityType: LinkableEntityType,
  entityId: string,
): Promise<Note[]> {
  return rows<Note>(
    await db()
      .from('notes')
      .select('*')
      .eq('entity_type', entityType)
      .eq('entity_id', entityId)
      .order('created_at', { ascending: false }),
    'load notes',
  );
}

export async function addNote(
  input: { entityType: LinkableEntityType; entityId: string; body: string; author?: string },
  actor = 'studio',
): Promise<Note> {
  const body = input.body?.trim();
  if (!body) throw new Error('a note needs something in it');

  const note = row<Note>(
    await db()
      .from('notes')
      .insert({
        entity_type: input.entityType,
        entity_id: input.entityId,
        body,
        author: input.author?.trim() || actor,
      })
      .select('*')
      .single(),
    'add the note',
  );

  await logActivity({
    entityType: input.entityType,
    entityId: input.entityId,
    kind: 'note',
    title: 'Note added',
    // The note itself goes on the timeline so the story reads in one place.
    body: note.body,
    actor: note.author,
  });

  return note;
}

export async function updateNote(id: string, body: string): Promise<Note> {
  const text = body?.trim();
  if (!text) throw new Error('a note needs something in it');

  return row<Note>(
    await db().from('notes').update({ body: text }).eq('id', id).select('*').single(),
    'update the note',
  );
}

export async function deleteNote(id: string): Promise<void> {
  ensure(await db().from('notes').delete().eq('id', id), 'delete the note');
}

// ── Dashboard ───────────────────────────────────────────────────────────────

export type Dashboard = {
  openDeals: { count: number; value: number; items: Deal[] };
  quotesAwaitingResponse: { count: number; value: number; items: Quote[] };
  overdueInvoices: { count: number; outstanding: number; items: Invoice[] };
  /** Every unpaid invoice, overdue or not. */
  totalOutstanding: number;
  activeProjects: { count: number; overdue: number; items: Project[] };
  tasksDue: { count: number; items: Task[] };
  recentActivity: Activity[];
};

export async function getDashboard(): Promise<Dashboard> {
  const today = todayISO();

  const [deals, quotes, unpaid, projects, tasks, recentActivity] = await Promise.all([
    listDeals({ open: true, limit: 500 }),
    listQuotes({ status: 'sent', limit: 200 }),
    listInvoices({ unpaid: true, limit: 300 }),
    listProjects({ active: true, limit: 300 }),
    listTasks({ open: true, limit: 100 }),
    listRecentActivity(15),
  ]);

  const overdue = unpaid.filter((inv) => inv.due_date !== null && inv.due_date < today);

  const dueTasks = tasks.filter((task) => task.due_at !== null && task.due_at <= today);

  return {
    openDeals: {
      count: deals.length,
      value: round2(deals.reduce((sum, deal) => sum + num(deal.value), 0)),
      items: deals.slice(0, 10),
    },
    quotesAwaitingResponse: {
      count: quotes.length,
      value: round2(quotes.reduce((sum, quote) => sum + num(quote.total), 0)),
      items: quotes.slice(0, 10),
    },
    overdueInvoices: {
      count: overdue.length,
      outstanding: round2(
        overdue.reduce((sum, inv) => sum + (num(inv.total) - num(inv.amount_paid)), 0),
      ),
      items: overdue.slice(0, 10),
    },
    totalOutstanding: round2(
      unpaid.reduce((sum, inv) => sum + (num(inv.total) - num(inv.amount_paid)), 0),
    ),
    activeProjects: {
      count: projects.length,
      overdue: projects.filter((p) => p.due_at !== null && p.due_at < today).length,
      items: projects.slice(0, 10),
    },
    tasksDue: {
      // The count is what is actually due; the list carries a little more so the
      // panel still shows something on a quiet day.
      count: dueTasks.length,
      items: tasks.slice(0, 10),
    },
    recentActivity,
  };
}

// ── Dashboard view ───────────────────────────────────────────────────────────

/**
 * The dashboard, shaped for the screen rather than for the database.
 *
 * getDashboard() returns the raw counts and rows. The page also needs a name
 * next to each figure — "Invoice INV-2026-0004" means nothing without knowing
 * whose it is — so this resolves the client names in one extra query rather
 * than letting the page fetch them row by row.
 */
export type DashboardMetrics = {
  pipelineValue: number;
  pipelineCount: number;
  quotesAwaiting: number;
  quotesAwaitingValue: number;
  outstandingTotal: number;
  outstandingCount: number;
  overdueTotal: number;
  activeProjects: number;
};

export type NamedInvoice = Invoice & { clientName: string };
export type NamedQuote = Quote & { clientName: string };

export type DashboardView = {
  metrics: DashboardMetrics;
  overdueInvoices: NamedInvoice[];
  /** Sent, unanswered, and quiet for a while. */
  staleQuotes: NamedQuote[];
  dueTasks: Task[];
  activity: Activity[];
};

/** How long a sent quote may sit unanswered before it needs chasing. */
const STALE_QUOTE_DAYS = 7;

async function nameLookup(ids: (string | null)[]): Promise<Map<string, string>> {
  const unique = [...new Set(ids.filter((id): id is string => Boolean(id)))];
  const names = new Map<string, string>();
  if (unique.length === 0) return names;

  const { data } = await db()
    .from('contacts')
    .select('id, first_name, last_name, company_id')
    .in('id', unique);

  for (const c of data ?? []) {
    names.set(c.id, [c.first_name, c.last_name].filter(Boolean).join(' ').trim());
  }
  return names;
}

export async function getDashboardView(): Promise<DashboardView> {
  const d = await getDashboard();

  const names = await nameLookup([
    ...d.overdueInvoices.items.map((i) => i.contact_id),
    ...d.quotesAwaitingResponse.items.map((q) => q.contact_id),
  ]);

  const named = (id: string | null) => (id && names.get(id)) || 'Unknown client';

  const cutoff = new Date(Date.now() - STALE_QUOTE_DAYS * 24 * 60 * 60 * 1000).toISOString();

  return {
    metrics: {
      pipelineValue: d.openDeals.value,
      pipelineCount: d.openDeals.count,
      quotesAwaiting: d.quotesAwaitingResponse.count,
      quotesAwaitingValue: d.quotesAwaitingResponse.value,
      outstandingTotal: d.totalOutstanding,
      outstandingCount: d.overdueInvoices.count,
      overdueTotal: d.overdueInvoices.outstanding,
      activeProjects: d.activeProjects.count,
    },
    overdueInvoices: d.overdueInvoices.items.map((i) => ({ ...i, clientName: named(i.contact_id) })),
    staleQuotes: d.quotesAwaitingResponse.items
      .filter((q) => q.sent_at !== null && q.sent_at < cutoff)
      .map((q) => ({ ...q, clientName: named(q.contact_id) })),
    dueTasks: d.tasksDue.items,
    activity: d.recentActivity,
  };
}
