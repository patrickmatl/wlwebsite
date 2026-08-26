import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import type { ReactNode } from 'react';
import {
  BTN_GHOST,
  Card,
  EmptyState,
  Money,
  PageHeader,
  StatusPill,
  TableWrap,
  Td,
  Th,
  formatDate,
  formatDateTime,
  relativeTime,
} from '@/components/crm/ui';
import { contactName, formatRand } from '@/lib/crm/types';
import { getSession } from '@/lib/server/auth';
import {
  getDeal,
  getQuoteFull,
  getSettings,
  listActivity,
  listInvoices,
  listProjects,
} from '@/lib/server/crm';
import QuoteActions from './QuoteActions';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Quote',
  robots: { index: false, follow: false },
};

function SectionHeading({ children }: { children: ReactNode }) {
  return <h2 className="mb-4 font-syne text-lg font-bold text-white">{children}</h2>;
}

function TotalRow({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div
      className={`flex items-baseline justify-between gap-6 ${
        strong ? 'border-t border-white/10 pt-2.5' : ''
      }`}
    >
      <span className={strong ? 'text-sm font-medium text-white' : 'text-sm text-neutral-400'}>
        {label}
      </span>
      <span
        className={`tabular-nums ${
          strong ? 'font-syne text-xl font-bold text-[#FFD700]' : 'text-sm text-neutral-200'
        }`}
      >
        {value}
      </span>
    </div>
  );
}

export default async function QuotePage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getSession('admin');
  if (!session) redirect('/studio/login');

  const { id } = await params;
  const full = await getQuoteFull(id);
  if (!full) notFound();

  const { quote, items, contact, company } = full;

  const [settings, activity, projects, invoices, deal] = await Promise.all([
    getSettings(),
    listActivity('quote', quote.id, 30),
    listProjects({ quoteId: quote.id }),
    listInvoices({ quoteId: quote.id, limit: 50 }),
    quote.deal_id ? getDeal(quote.deal_id) : Promise.resolve(null),
  ]);

  const project = projects[0] ?? null;
  const deposit = invoices.find((inv) => inv.kind === 'deposit' && inv.status !== 'void') ?? null;

  const hasOnRequest = items.some((item) => item.unit_price === null);

  /**
   * A quote issued while the studio was VAT registered must keep printing its
   * VAT line even if the setting is switched off later — the document is a tax
   * record, not a live view of today's registration.
   */
  const showVat = settings.vat_registered || Number(quote.vat_amount) > 0;

  const client = company?.name ?? (contact ? contactName(contact) : null);

  const history: { label: string; at: string; detail: string | null }[] = [
    { label: 'Drafted', at: quote.created_at, detail: null },
    { label: 'Sent to the client', at: quote.sent_at ?? '', detail: null },
    { label: 'Opened by the client', at: quote.viewed_at ?? '', detail: null },
    {
      label: 'Accepted',
      at: quote.accepted_at ?? '',
      detail:
        [
          quote.accepted_by_name ? `by ${quote.accepted_by_name}` : null,
          quote.accepted_ip ? `from ${quote.accepted_ip}` : null,
        ]
          .filter(Boolean)
          .join(' · ') || null,
    },
    { label: 'Declined', at: quote.declined_at ?? '', detail: quote.decline_reason },
  ]
    .filter((entry) => Boolean(entry.at))
    .sort((a, b) => Date.parse(a.at) - Date.parse(b.at));

  return (
    <>
      <PageHeader
        title={`Quote ${quote.number}`}
        subtitle={
          [client, `issued ${formatDate(quote.created_at)}`].filter(Boolean).join(' · ') ||
          `issued ${formatDate(quote.created_at)}`
        }
        action={
          <Link href="/studio/quotes" className={BTN_GHOST}>
            All quotes
          </Link>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* ── The document ──────────────────────────────────────────────── */}
          <Card>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <StatusPill status={quote.status} />
              <div className="text-right text-xs text-neutral-500">
                <div>Valid until {formatDate(quote.valid_until)}</div>
                {quote.sent_at && <div>Sent {formatDate(quote.sent_at)}</div>}
              </div>
            </div>

            {(contact || company) && (
              <div className="mb-5 rounded-lg border border-white/10 bg-black/30 p-4">
                <p className="text-xs uppercase tracking-wide text-neutral-400">Quoted to</p>
                {company && (
                  <Link
                    href={`/studio/companies/${company.id}`}
                    className="mt-1 block text-sm font-medium text-[#FFD700] hover:underline"
                  >
                    {company.name}
                  </Link>
                )}
                {contact && (
                  <p className="mt-0.5 text-sm text-neutral-300">
                    <Link
                      href={`/studio/contacts/${contact.id}`}
                      className="hover:text-[#FFD700] hover:underline"
                    >
                      {contactName(contact)}
                    </Link>
                    <span className="text-neutral-500"> · {contact.email}</span>
                  </p>
                )}
              </div>
            )}

            {quote.intro && (
              <p className="mb-5 whitespace-pre-wrap text-sm text-neutral-300">{quote.intro}</p>
            )}

            <TableWrap>
              <thead>
                <tr>
                  <Th>Item</Th>
                  <Th right>Qty</Th>
                  <Th right>Unit price</Th>
                  <Th right>Line total</Th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <Td>
                      <span className="font-medium text-white">{item.name}</span>
                      {item.description && (
                        <span className="mt-0.5 block whitespace-pre-wrap text-xs text-neutral-500">
                          {item.description}
                        </span>
                      )}
                    </Td>
                    <Td right>{Number(item.quantity)}</Td>
                    <Td right>
                      {item.unit_price === null ? (
                        <span className="text-xs text-neutral-500">Quoted on request</span>
                      ) : (
                        <Money amount={Number(item.unit_price)} />
                      )}
                    </Td>
                    <Td right>
                      {item.line_total === null ? (
                        <span className="text-xs text-neutral-500">—</span>
                      ) : (
                        <Money amount={Number(item.line_total)} />
                      )}
                    </Td>
                  </tr>
                ))}
              </tbody>
            </TableWrap>

            <div className="mt-5 ml-auto max-w-xs space-y-2">
              <TotalRow label="Subtotal" value={formatRand(Number(quote.subtotal))} />
              {showVat && (
                <TotalRow
                  label={`VAT at ${Number(quote.vat_rate)}%`}
                  value={formatRand(Number(quote.vat_amount))}
                />
              )}
              <TotalRow label="Total" value={formatRand(Number(quote.total))} strong />
            </div>

            {hasOnRequest && (
              <p className="mt-3 text-right text-xs text-[#FFD700]">
                Plus the items quoted on request — this total is not the final figure.
              </p>
            )}
            {!showVat && (
              <p className="mt-3 text-right text-xs text-neutral-500">
                Not VAT registered — no VAT is charged.
              </p>
            )}

            {quote.terms && (
              <div className="mt-5 border-t border-white/10 pt-4">
                <p className="text-xs uppercase tracking-wide text-neutral-400">Terms</p>
                <p className="mt-1 whitespace-pre-wrap text-sm text-neutral-400">{quote.terms}</p>
              </div>
            )}
          </Card>

          {/* ── Actions ───────────────────────────────────────────────────── */}
          <Card>
            <SectionHeading>Actions</SectionHeading>
            <QuoteActions
              quoteId={quote.id}
              status={quote.status}
              subtotal={Number(quote.subtotal)}
              suggestedName={contact ? contactName(contact) : ''}
              projectId={project?.id ?? null}
              depositInvoiceId={deposit?.id ?? null}
            />
          </Card>

          {/* ── What this quote is attached to ────────────────────────────── */}
          <Card>
            <SectionHeading>Linked records</SectionHeading>

            <dl className="grid gap-5 sm:grid-cols-2">
              <div>
                <dt className="text-xs uppercase tracking-wide text-neutral-400">Deal</dt>
                <dd className="mt-1 text-sm">
                  {deal ? (
                    <Link
                      href={`/studio/deals/${deal.id}`}
                      className="text-[#FFD700] hover:underline"
                    >
                      {deal.title}
                    </Link>
                  ) : (
                    <span className="text-neutral-600">Not on the pipeline</span>
                  )}
                </dd>
              </div>

              <div>
                <dt className="text-xs uppercase tracking-wide text-neutral-400">Project</dt>
                <dd className="mt-1 text-sm">
                  {project ? (
                    <Link
                      href={`/studio/projects/${project.id}`}
                      className="text-[#FFD700] hover:underline"
                    >
                      {project.code} · {project.name}
                    </Link>
                  ) : (
                    <span className="text-neutral-600">Not started</span>
                  )}
                </dd>
              </div>
            </dl>

            {invoices.length > 0 && (
              <div className="mt-5 border-t border-white/10 pt-4">
                <p className="mb-3 text-xs uppercase tracking-wide text-neutral-400">Invoices</p>
                <ul className="space-y-2">
                  {invoices.map((invoice) => (
                    <li
                      key={invoice.id}
                      className="flex flex-wrap items-center justify-between gap-2"
                    >
                      <Link
                        href={`/studio/invoices/${invoice.id}`}
                        className="text-sm text-[#FFD700] hover:underline"
                      >
                        {invoice.number}
                        <span className="text-neutral-500"> · {invoice.kind}</span>
                      </Link>
                      <span className="flex items-center gap-3">
                        <Money amount={Number(invoice.total)} className="text-sm text-neutral-200" />
                        <StatusPill status={invoice.status} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card>
        </div>

        {/* ── History and timeline ────────────────────────────────────────── */}
        <div className="space-y-6">
          <Card>
            <SectionHeading>Status history</SectionHeading>

            <ol className="space-y-4 border-l border-white/10 pl-4">
              {history.map((entry) => (
                <li key={entry.label} className="relative">
                  <span
                    aria-hidden
                    className="absolute -left-5 top-1.5 h-2 w-2 rounded-full bg-[#FFD700]/60"
                  />
                  <p className="text-sm text-neutral-200">{entry.label}</p>
                  <p className="mt-0.5 text-xs text-neutral-500">{formatDateTime(entry.at)}</p>
                  {entry.detail && (
                    <p className="mt-0.5 whitespace-pre-wrap text-xs text-neutral-400">
                      {entry.detail}
                    </p>
                  )}
                </li>
              ))}
            </ol>

            {/* Superseded and expired carry no timestamp column of their own,
                so they are stated rather than dated. */}
            {(quote.status === 'superseded' || quote.status === 'expired') && (
              <p className="mt-4 border-t border-white/10 pt-3 text-xs text-neutral-400">
                This quote is {quote.status} and can no longer be accepted.
              </p>
            )}

            {quote.status === 'sent' && !quote.viewed_at && (
              <p className="mt-4 border-t border-white/10 pt-3 text-xs text-neutral-500">
                The client has not opened it yet.
              </p>
            )}
          </Card>

          <Card>
            <SectionHeading>Timeline</SectionHeading>

            {activity.length === 0 ? (
              <EmptyState title="Nothing logged yet" />
            ) : (
              <ol className="space-y-4 border-l border-white/10 pl-4">
                {activity.map((entry) => (
                  <li key={entry.id} className="relative">
                    <span
                      aria-hidden
                      className="absolute -left-5 top-1.5 h-2 w-2 rounded-full bg-white/25"
                    />
                    <p className="text-sm text-neutral-200">{entry.title}</p>
                    {entry.body && (
                      <p className="mt-0.5 whitespace-pre-wrap text-xs text-neutral-500">
                        {entry.body}
                      </p>
                    )}
                    <p className="mt-0.5 text-xs text-neutral-500">
                      {entry.actor} · {relativeTime(entry.created_at)}
                    </p>
                  </li>
                ))}
              </ol>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}
