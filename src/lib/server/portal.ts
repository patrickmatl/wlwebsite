import { db } from './db';
import type { ClientSession } from './auth';
import type { Invoice, InvoiceItem, Project, ProjectMilestone, Quote, QuoteItem, StoredFile } from '@/lib/crm/types';

/**
 * Every read the client portal performs.
 *
 * This module exists so that scoping happens in exactly one place. The portal
 * pages never query the database directly and never accept an id they then
 * look up unchecked — they call a function here, which applies the session's
 * scope inside the query itself.
 *
 * That is the whole defence against the obvious attack on a portal: change the
 * id in the URL and read somebody else's invoice. Here, an id that is not in
 * scope simply returns no row, because the scope is part of the WHERE clause
 * rather than an `if` somewhere afterwards that can be forgotten.
 *
 * Scope rule: a contact attached to a company sees that company's work, which
 * is what colleagues expect of a business portal. A contact with no company
 * sees only their own. Nothing else is ever visible, and internal files are
 * excluded everywhere.
 */

type Scope = { contactId: string; companyId: string | null };

function scopeOf(session: ClientSession): Scope {
  return { contactId: session.contactId, companyId: session.companyId };
}

/**
 * The scope as a PostgREST filter string.
 *
 * Ids come from a server-resolved session, never from user input, so they
 * cannot carry the commas or dots that would break out of this expression.
 */
function scopeFilter(scope: Scope): string {
  return scope.companyId
    ? `contact_id.eq.${scope.contactId},company_id.eq.${scope.companyId}`
    : `contact_id.eq.${scope.contactId}`;
}

// ── Quotes ──────────────────────────────────────────────────────────────────

/** Quotes the client is allowed to see: anything actually sent to them. */
export async function listQuotes(session: ClientSession): Promise<Quote[]> {
  const { data } = await db()
    .from('quotes')
    .select('*')
    .or(scopeFilter(scopeOf(session)))
    // A draft has not been sent and must never appear in the portal.
    .neq('status', 'draft')
    .order('created_at', { ascending: false });

  return (data ?? []) as Quote[];
}

export async function getQuote(
  session: ClientSession,
  quoteId: string,
): Promise<{ quote: Quote; items: QuoteItem[] } | null> {
  const { data: quote } = await db()
    .from('quotes')
    .select('*')
    .eq('id', quoteId)
    .or(scopeFilter(scopeOf(session)))
    .neq('status', 'draft')
    .maybeSingle();

  if (!quote) return null;

  const { data: items } = await db()
    .from('quote_items')
    .select('*')
    .eq('quote_id', quoteId)
    .order('position', { ascending: true });

  return { quote: quote as Quote, items: (items ?? []) as QuoteItem[] };
}

/**
 * Record that the client opened a quote.
 *
 * Only the first view is stamped — "when did they look at it" is useful,
 * "how many times" is not, and re-stamping would destroy the answer.
 */
export async function markQuoteViewed(session: ClientSession, quoteId: string): Promise<void> {
  await db()
    .from('quotes')
    .update({ viewed_at: new Date().toISOString() })
    .eq('id', quoteId)
    .or(scopeFilter(scopeOf(session)))
    .is('viewed_at', null)
    .then(
      () => undefined,
      () => undefined,
    );
}

// ── Projects ────────────────────────────────────────────────────────────────

export async function listProjects(session: ClientSession): Promise<Project[]> {
  const { data } = await db()
    .from('projects')
    .select('*')
    .or(scopeFilter(scopeOf(session)))
    .order('updated_at', { ascending: false });

  return (data ?? []) as Project[];
}

export async function getProject(
  session: ClientSession,
  projectId: string,
): Promise<{ project: Project; milestones: ProjectMilestone[]; files: StoredFile[] } | null> {
  const { data: project } = await db()
    .from('projects')
    .select('*')
    .eq('id', projectId)
    .or(scopeFilter(scopeOf(session)))
    .maybeSingle();

  if (!project) return null;

  const { data: milestones } = await db()
    .from('project_milestones')
    .select('*')
    .eq('project_id', projectId)
    .eq('client_visible', true)
    .order('position', { ascending: true });

  const { data: files } = await db()
    .from('files')
    .select('*')
    .eq('project_id', projectId)
    .eq('visibility', 'client')
    .order('created_at', { ascending: false });

  return {
    project: project as Project,
    milestones: (milestones ?? []) as ProjectMilestone[],
    files: (files ?? []) as StoredFile[],
  };
}

// ── Invoices ────────────────────────────────────────────────────────────────

export async function listInvoices(session: ClientSession): Promise<Invoice[]> {
  const { data } = await db()
    .from('invoices')
    .select('*')
    .or(scopeFilter(scopeOf(session)))
    // Drafts and voided invoices are the studio's business, not the client's.
    .not('status', 'in', '(draft,void)')
    .order('issue_date', { ascending: false });

  return (data ?? []) as Invoice[];
}

export async function getInvoice(
  session: ClientSession,
  invoiceId: string,
): Promise<{ invoice: Invoice; items: InvoiceItem[] } | null> {
  const { data: invoice } = await db()
    .from('invoices')
    .select('*')
    .eq('id', invoiceId)
    .or(scopeFilter(scopeOf(session)))
    .not('status', 'in', '(draft,void)')
    .maybeSingle();

  if (!invoice) return null;

  const { data: items } = await db()
    .from('invoice_items')
    .select('*')
    .eq('invoice_id', invoiceId)
    .order('position', { ascending: true });

  return { invoice: invoice as Invoice, items: (items ?? []) as InvoiceItem[] };
}

// ── Files ───────────────────────────────────────────────────────────────────

/**
 * Resolve a file the client is allowed to download.
 *
 * A file is in scope only through a parent record that is itself in scope, so
 * ownership is re-derived here rather than trusted from the file row.
 */
export async function getDownloadableFile(
  session: ClientSession,
  fileId: string,
): Promise<StoredFile | null> {
  const { data: file } = await db()
    .from('files')
    .select('*')
    .eq('id', fileId)
    .eq('visibility', 'client')
    .maybeSingle();

  if (!file) return null;

  const f = file as StoredFile;

  if (f.project_id) {
    const project = await getProject(session, f.project_id);
    return project ? f : null;
  }
  if (f.invoice_id) {
    const invoice = await getInvoice(session, f.invoice_id);
    return invoice ? f : null;
  }
  if (f.quote_id) {
    const quote = await getQuote(session, f.quote_id);
    return quote ? f : null;
  }
  // Attached to the person directly.
  return f.contact_id === session.contactId ? f : null;
}

// ── Dashboard ───────────────────────────────────────────────────────────────

export type PortalSummary = {
  openQuotes: number;
  activeProjects: number;
  unpaidInvoices: number;
  amountOutstanding: number;
  awaitingYou: { kind: 'quote' | 'invoice'; id: string; label: string; amount: number }[];
};

export async function getSummary(session: ClientSession): Promise<PortalSummary> {
  const [quotes, projects, invoices] = await Promise.all([
    listQuotes(session),
    listProjects(session),
    listInvoices(session),
  ]);

  const openQuotes = quotes.filter((q) => q.status === 'sent');
  const unpaid = invoices.filter((i) => i.status !== 'paid');

  return {
    openQuotes: openQuotes.length,
    activeProjects: projects.filter(
      (p) => !['delivered', 'cancelled'].includes(p.status),
    ).length,
    unpaidInvoices: unpaid.length,
    amountOutstanding: unpaid.reduce((sum, i) => sum + (i.total - i.amount_paid), 0),
    awaitingYou: [
      ...openQuotes.map((q) => ({
        kind: 'quote' as const,
        id: q.id,
        label: `Quote ${q.number}`,
        amount: q.total,
      })),
      ...unpaid.map((i) => ({
        kind: 'invoice' as const,
        id: i.id,
        label: `Invoice ${i.number}`,
        amount: i.total - i.amount_paid,
      })),
    ],
  };
}
