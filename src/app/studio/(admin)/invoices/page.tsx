import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import {
  BTN_GHOST,
  Card,
  EmptyState,
  INPUT,
  Money,
  PageHeader,
  Stat,
  StatusPill,
  TableWrap,
  Td,
  Th,
  formatDate,
} from '@/components/crm/ui';
import { contactName, formatRand, type Invoice, type InvoiceStatus } from '@/lib/crm/types';
import { getSession } from '@/lib/server/auth';
import { listCompanies, listContacts, listInvoices } from '@/lib/server/crm';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Invoices',
  robots: { index: false, follow: false },
};

const STATUS_FILTERS: { id: InvoiceStatus; label: string }[] = [
  { id: 'draft', label: 'Draft' },
  { id: 'sent', label: 'Sent' },
  { id: 'part_paid', label: 'Part paid' },
  { id: 'paid', label: 'Paid' },
  { id: 'overdue', label: 'Overdue' },
  { id: 'void', label: 'Void' },
];

function one(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? '';
  return value ?? '';
}

/** Today in South Africa — the server runs in UTC and SAST is two hours ahead. */
function todayISO(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Johannesburg' }).format(new Date());
}

/**
 * Money still owed on one invoice.
 *
 * A draft has not been asked for and a void was withdrawn, so neither is money
 * anyone owes the studio — counting them would flatter the figure that matters
 * most on this page.
 */
function outstandingOn(invoice: Invoice): number {
  if (invoice.status === 'draft' || invoice.status === 'void' || invoice.status === 'paid') return 0;
  const balance = Number(invoice.total) - Number(invoice.amount_paid);
  return balance > 0 ? balance : 0;
}

const CHIP = 'rounded-full border px-3 py-1.5 text-sm font-medium transition';
const CHIP_ON = 'border-[#FFD700]/50 bg-[#FFD700]/10 text-[#FFD700]';
const CHIP_OFF = 'border-white/15 text-neutral-400 hover:border-white/30 hover:text-white';

export default async function InvoicesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await getSession('admin');
  if (!session) redirect('/studio/login');

  const params = await searchParams;
  const q = one(params.q).trim();

  const [invoices, contacts, companies] = await Promise.all([
    // Still one read rather than one per filter, so the chip counts stay
    // honest. They now count within the search, which is what someone who
    // has just typed a client's name expects them to mean.
    listInvoices({ limit: 300, search: q || undefined }),
    listContacts({ includeArchived: true, limit: 500 }),
    listCompanies({ limit: 500 }),
  ]);

  const requested = one(params.status);
  const status = STATUS_FILTERS.some((f) => f.id === requested)
    ? (requested as InvoiceStatus)
    : null;

  const today = todayISO();

  const contactNames = new Map(contacts.map((c) => [c.id, contactName(c)]));
  const companyNames = new Map(companies.map((c) => [c.id, c.name]));

  const counts = new Map<InvoiceStatus, number>();
  for (const invoice of invoices) {
    counts.set(invoice.status, (counts.get(invoice.status) ?? 0) + 1);
  }

  const outstanding = invoices.reduce((sum, invoice) => sum + outstandingOn(invoice), 0);

  // "Past its due date" is decided on the date rather than trusted from the
  // status column, which only moves when the payments trigger or the nightly
  // sweep runs. An invoice that fell due this morning is late now.
  const isLate = (invoice: Invoice) =>
    outstandingOn(invoice) > 0 && invoice.due_date !== null && invoice.due_date < today;

  const lateInvoices = invoices.filter(isLate);
  const overdueValue = lateInvoices.reduce((sum, invoice) => sum + outstandingOn(invoice), 0);

  const visible = status ? invoices.filter((i) => i.status === status) : invoices;
  const visibleOutstanding = visible.reduce((sum, invoice) => sum + outstandingOn(invoice), 0);

  // Every chip link keeps the search term; losing it on a filter click is
  // the quickest way to make a search box feel broken.
  const base = q ? `/studio/invoices?q=${encodeURIComponent(q)}` : '/studio/invoices';

  return (
    <>
      <PageHeader
        title="Invoices"
        subtitle="What has been billed, what has been paid, and what is still owed."
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Stat
          label="Outstanding"
          value={formatRand(outstanding)}
          hint="Sent and part paid, drafts and voids excluded"
        />
        <Stat
          label="Overdue"
          value={formatRand(overdueValue)}
          hint={
            lateInvoices.length === 1
              ? '1 invoice past its due date'
              : lateInvoices.length + ' invoices past their due date'
          }
        />
        <Stat
          label="Billed this list"
          value={formatRand(invoices.reduce((sum, i) => (i.status === 'void' ? sum : sum + Number(i.total)), 0))}
          hint={invoices.length + ' invoices, voids excluded'}
        />
      </div>

      {/* A plain GET form: the query lives in the URL, so a search is
          bookmarkable, shareable and survives a reload. */}
      <form method="get" className="mb-4 flex flex-wrap items-center gap-2">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Search by invoice number or client"
          aria-label="Search invoices"
          className={`${INPUT} sm:w-80`}
        />
        {status && <input type="hidden" name="status" value={status} />}
        <button type="submit" className={BTN_GHOST}>
          Search
        </button>
        {q && (
          <Link href={status ? `/studio/invoices?status=${status}` : '/studio/invoices'} className={BTN_GHOST}>
            Clear
          </Link>
        )}
      </form>

      <div className="mb-5 flex flex-wrap gap-2">
        <Link href={base} className={CHIP + ' ' + (status === null ? CHIP_ON : CHIP_OFF)}>
          All <span className="text-xs opacity-70">{invoices.length}</span>
        </Link>
        {STATUS_FILTERS.map((filter) => (
          <Link
            key={filter.id}
            href={`${base}${base.includes("?") ? "&" : "?"}status=${filter.id}`}
            className={CHIP + ' ' + (status === filter.id ? CHIP_ON : CHIP_OFF)}
          >
            {filter.label} <span className="text-xs opacity-70">{counts.get(filter.id) ?? 0}</span>
          </Link>
        ))}
      </div>

      <Card>
        {visible.length === 0 ? (
          <EmptyState
            title={status ? 'No ' + status.replace('_', ' ') + ' invoices' : 'No invoices yet'}
            hint={
              status
                ? 'Try another filter, or clear it to see everything.'
                : 'Raise one from an accepted quote or a live project.'
            }
          />
        ) : (
          <>
            <p className="mb-4 text-sm text-neutral-400">
              {visible.length} invoice{visible.length === 1 ? '' : 's'} ·{' '}
              <span className="tabular-nums text-neutral-200">
                {formatRand(visibleOutstanding)}
              </span>{' '}
              outstanding
            </p>

            <TableWrap fit>
              <thead>
                <tr>
                  <Th>Number</Th>
                  <Th>Client</Th>
                  <Th hide>Kind</Th>
                  <Th hide right>Total</Th>
                  <Th hide right>Paid</Th>
                  <Th right>Balance</Th>
                  <Th>Status</Th>
                  <Th hide>Due</Th>
                </tr>
              </thead>
              <tbody>
                {visible.map((invoice) => {
                  const client =
                    (invoice.company_id ? companyNames.get(invoice.company_id) : null) ??
                    (invoice.contact_id ? contactNames.get(invoice.contact_id) : null) ??
                    null;

                  const late = isLate(invoice);
                  const balance = outstandingOn(invoice);

                  return (
                    <tr key={invoice.id} className={late ? 'bg-red-500/[0.07]' : ''}>
                      <Td>
                        <Link
                          href={'/studio/invoices/' + invoice.id}
                          className="font-medium text-[#FFD700] hover:underline"
                        >
                          {invoice.number}
                        </Link>
                      </Td>
                      <Td>{client ?? <span className="text-neutral-600">—</span>}</Td>
                      <Td hide>
                        <span className="text-xs uppercase tracking-wide text-neutral-400">
                          {invoice.kind}
                        </span>
                      </Td>
                      <Td hide right>
                        <Money amount={Number(invoice.total)} />
                      </Td>
                      <Td hide right>
                        <Money amount={Number(invoice.amount_paid)} />
                      </Td>
                      <Td right className={late ? 'font-medium text-red-300' : ''}>
                        {balance > 0 ? <Money amount={balance} /> : <span className="text-neutral-600">—</span>}
                      </Td>
                      <Td>
                        <StatusPill status={late && invoice.status !== 'overdue' ? 'overdue' : invoice.status} />
                      </Td>
                      <Td hide className={late ? 'text-red-300' : ''}>
                        {formatDate(invoice.due_date)}
                        {late && <span className="block text-xs">past due</span>}
                      </Td>
                    </tr>
                  );
                })}
              </tbody>
            </TableWrap>
          </>
        )}
      </Card>
    </>
  );
}
