import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import {
  BTN,
  Card,
  EmptyState,
  Money,
  PageHeader,
  StatusPill,
  TableWrap,
  Td,
  Th,
  formatDate,
} from '@/components/crm/ui';
import { contactName, formatRand, type QuoteStatus } from '@/lib/crm/types';
import { getSession } from '@/lib/server/auth';
import { listCompanies, listContacts, listQuotes } from '@/lib/server/crm';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Quotes',
  robots: { index: false, follow: false },
};

const STATUS_FILTERS: { id: QuoteStatus; label: string }[] = [
  { id: 'draft', label: 'Draft' },
  { id: 'sent', label: 'Sent' },
  { id: 'accepted', label: 'Accepted' },
  { id: 'declined', label: 'Declined' },
  { id: 'expired', label: 'Expired' },
  { id: 'superseded', label: 'Superseded' },
];

function one(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? '';
  return value ?? '';
}

/** Today in South Africa — the server runs in UTC and SAST is two hours ahead. */
function todayISO(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Johannesburg' }).format(new Date());
}

const CHIP = 'rounded-full border px-3 py-1.5 text-sm font-medium transition';
const CHIP_ON = 'border-[#FFD700]/50 bg-[#FFD700]/10 text-[#FFD700]';
const CHIP_OFF = 'border-white/15 text-neutral-400 hover:border-white/30 hover:text-white';

export default async function QuotesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await getSession('admin');
  if (!session) redirect('/studio/login');

  const [params, quotes, contacts, companies] = await Promise.all([
    searchParams,
    // One unfiltered read rather than one per filter: it keeps the chip counts
    // honest and the page to a single query.
    listQuotes({ limit: 300 }),
    listContacts({ includeArchived: true, limit: 500 }),
    listCompanies({ limit: 500 }),
  ]);

  const requested = one(params.status);
  const status = STATUS_FILTERS.some((f) => f.id === requested)
    ? (requested as QuoteStatus)
    : null;

  const contactNames = new Map(contacts.map((c) => [c.id, contactName(c)]));
  const companyNames = new Map(companies.map((c) => [c.id, c.name]));

  const counts = new Map<QuoteStatus, number>();
  for (const quote of quotes) counts.set(quote.status, (counts.get(quote.status) ?? 0) + 1);

  const visible = status ? quotes.filter((q) => q.status === status) : quotes;
  const visibleValue = visible.reduce((sum, quote) => sum + Number(quote.total), 0);

  const today = todayISO();

  return (
    <>
      <PageHeader
        title="Quotes"
        subtitle="Every quote the studio has issued, and where each one stands."
        action={
          <Link href="/studio/quotes/new" className={BTN}>
            New quote
          </Link>
        }
      />

      <div className="mb-5 flex flex-wrap gap-2">
        <Link href="/studio/quotes" className={`${CHIP} ${status === null ? CHIP_ON : CHIP_OFF}`}>
          All <span className="text-xs opacity-70">{quotes.length}</span>
        </Link>
        {STATUS_FILTERS.map((filter) => (
          <Link
            key={filter.id}
            href={`/studio/quotes?status=${filter.id}`}
            className={`${CHIP} ${status === filter.id ? CHIP_ON : CHIP_OFF}`}
          >
            {filter.label} <span className="text-xs opacity-70">{counts.get(filter.id) ?? 0}</span>
          </Link>
        ))}
      </div>

      <Card>
        {visible.length === 0 ? (
          <EmptyState
            title={status ? `No ${status} quotes` : 'No quotes yet'}
            hint={
              status
                ? 'Try another filter, or clear it to see everything.'
                : 'Build one from the price list with New quote.'
            }
          />
        ) : (
          <>
            <p className="mb-4 text-sm text-neutral-400">
              {visible.length} quote{visible.length === 1 ? '' : 's'} ·{' '}
              <span className="tabular-nums text-neutral-200">{formatRand(visibleValue)}</span>
            </p>

            <TableWrap>
              <thead>
                <tr>
                  <Th>Number</Th>
                  <Th>Client</Th>
                  <Th right>Total</Th>
                  <Th>Status</Th>
                  <Th>Sent</Th>
                  <Th>Valid until</Th>
                </tr>
              </thead>
              <tbody>
                {visible.map((quote) => {
                  const client =
                    (quote.company_id ? companyNames.get(quote.company_id) : null) ??
                    (quote.contact_id ? contactNames.get(quote.contact_id) : null) ??
                    null;

                  // A sent quote past its date is dead in practice even if the
                  // nightly sweep has not restamped it yet, so it is flagged on
                  // the date rather than on the column.
                  const lapsed =
                    quote.status === 'sent' &&
                    quote.valid_until !== null &&
                    quote.valid_until < today;

                  return (
                    <tr key={quote.id}>
                      <Td>
                        <Link
                          href={`/studio/quotes/${quote.id}`}
                          className="font-medium text-[#FFD700] hover:underline"
                        >
                          {quote.number}
                        </Link>
                      </Td>
                      <Td>{client ?? <span className="text-neutral-600">—</span>}</Td>
                      <Td right>
                        <Money amount={Number(quote.total)} />
                      </Td>
                      <Td>
                        <StatusPill status={quote.status} />
                      </Td>
                      <Td>{formatDate(quote.sent_at)}</Td>
                      <Td className={lapsed ? 'text-red-300' : ''}>
                        {formatDate(quote.valid_until)}
                        {lapsed && <span className="block text-xs">lapsed</span>}
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
