import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import type { ReactNode } from 'react';
import {
  BTN,
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
import { contactName } from '@/lib/crm/types';
import { getSession } from '@/lib/server/auth';
import { getDealFull } from '@/lib/server/crm';
import DealActions, { AddNoteForm } from './DealActions';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Deal',
  robots: { index: false, follow: false },
};

const NONE = <span className="text-neutral-600">—</span>;

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-neutral-400">{label}</dt>
      <dd className="mt-1 break-words text-sm text-neutral-200">{children}</dd>
    </div>
  );
}

function SectionHeading({ children }: { children: ReactNode }) {
  return <h2 className="mb-4 font-syne text-lg font-bold text-white">{children}</h2>;
}

export default async function DealPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getSession('admin');
  if (!session) redirect('/studio/login');

  const { id } = await params;
  // getDealFull is scoped by nothing but the id, which is correct here: an
  // admin session is authorised for the whole book.
  const detail = await getDealFull(id);
  if (!detail) notFound();

  const { deal, contact, company, quotes, projects, invoices, notes, activity } = detail;

  // Carrying the deal and its client through means the quote comes back
  // already attached to this pipeline entry.
  const quoteParams = new URLSearchParams({ dealId: deal.id });
  if (deal.contact_id) quoteParams.set('contactId', deal.contact_id);
  if (deal.company_id) quoteParams.set('companyId', deal.company_id);

  const project = projects[0] ?? null;
  const clientLine =
    [company?.name, contact ? contactName(contact) : null].filter(Boolean).join(' · ') ||
    'No client linked yet';

  return (
    <>
      <PageHeader
        title={deal.title}
        subtitle={clientLine}
        action={
          <div className="flex flex-wrap gap-3">
            <Link href={`/studio/quotes/new?${quoteParams.toString()}`} className={BTN}>
              Create a quote
            </Link>
            <Link href="/studio/deals" className={BTN_GHOST}>
              Back to the board
            </Link>
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* ── The deal itself ───────────────────────────────────────────── */}
          <Card>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <StatusPill status={deal.stage} />
              <span className="font-syne text-2xl font-bold text-[#FFD700]">
                <Money amount={deal.value === null ? null : Number(deal.value)} />
              </span>
              <span className="text-xs text-neutral-500">
                opened {relativeTime(deal.created_at)}
              </span>
            </div>

            <dl className="grid gap-5 sm:grid-cols-2">
              <Fact label="Company">
                {company ? (
                  <Link
                    href={`/studio/companies/${company.id}`}
                    className="text-[#FFD700] hover:underline"
                  >
                    {company.name}
                  </Link>
                ) : (
                  NONE
                )}
              </Fact>

              <Fact label="Contact">
                {contact ? (
                  <>
                    <Link
                      href={`/studio/contacts/${contact.id}`}
                      className="text-[#FFD700] hover:underline"
                    >
                      {contactName(contact)}
                    </Link>
                    <span className="block text-xs text-neutral-500">{contact.email}</span>
                  </>
                ) : (
                  NONE
                )}
              </Fact>

              <Fact label="Source">{deal.source || NONE}</Fact>
              <Fact label="Expected close">{formatDate(deal.expected_close_date)}</Fact>

              {deal.won_at && <Fact label="Won">{formatDateTime(deal.won_at)}</Fact>}
              {deal.lost_at && (
                <>
                  <Fact label="Lost">{formatDateTime(deal.lost_at)}</Fact>
                  <Fact label="Lost because">{deal.lost_reason || NONE}</Fact>
                </>
              )}
            </dl>

            {deal.notes && (
              <div className="mt-5 border-t border-white/10 pt-4">
                <p className="text-xs uppercase tracking-wide text-neutral-400">Brief</p>
                <p className="mt-1 whitespace-pre-wrap text-sm text-neutral-300">{deal.notes}</p>
              </div>
            )}

            <div className="mt-5 border-t border-white/10 pt-4">
              <DealActions dealId={deal.id} stage={deal.stage} />
            </div>
          </Card>

          {/* ── Quotes ────────────────────────────────────────────────────── */}
          <Card>
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="font-syne text-lg font-bold text-white">Quotes</h2>
              <Link
                href={`/studio/quotes/new?${quoteParams.toString()}`}
                className="text-sm text-[#FFD700] hover:underline"
              >
                New quote
              </Link>
            </div>

            {quotes.length === 0 ? (
              <EmptyState
                title="No quotes on this deal"
                hint="Build one from the price list and it will attach itself here."
              />
            ) : (
              <TableWrap>
                <thead>
                  <tr>
                    <Th>Number</Th>
                    <Th right>Total</Th>
                    <Th>Status</Th>
                    <Th>Sent</Th>
                    <Th>Valid until</Th>
                  </tr>
                </thead>
                <tbody>
                  {quotes.map((quote) => (
                    <tr key={quote.id}>
                      <Td>
                        <Link
                          href={`/studio/quotes/${quote.id}`}
                          className="font-medium text-[#FFD700] hover:underline"
                        >
                          {quote.number}
                        </Link>
                      </Td>
                      <Td right>
                        <Money amount={Number(quote.total)} />
                      </Td>
                      <Td>
                        <StatusPill status={quote.status} />
                      </Td>
                      <Td>{formatDate(quote.sent_at)}</Td>
                      <Td>{formatDate(quote.valid_until)}</Td>
                    </tr>
                  ))}
                </tbody>
              </TableWrap>
            )}
          </Card>

          {/* ── Project ───────────────────────────────────────────────────── */}
          <Card>
            <SectionHeading>Project</SectionHeading>

            {!project ? (
              <EmptyState
                title="No project yet"
                hint="A project is created from an accepted quote, on the quote page."
              />
            ) : (
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="min-w-0">
                  <Link
                    href={`/studio/projects/${project.id}`}
                    className="text-sm font-medium text-[#FFD700] hover:underline"
                  >
                    {project.code} · {project.name}
                  </Link>
                  <p className="mt-0.5 text-xs text-neutral-500">
                    Due {formatDate(project.due_at)} · {project.revisions_used} of{' '}
                    {project.revisions_included} revisions used
                  </p>
                </div>
                <StatusPill status={project.status} />
              </div>
            )}
          </Card>

          {/* ── Invoices ──────────────────────────────────────────────────── */}
          {invoices.length > 0 && (
            <Card>
              <SectionHeading>Invoices</SectionHeading>
              <TableWrap>
                <thead>
                  <tr>
                    <Th>Number</Th>
                    <Th>Kind</Th>
                    <Th right>Total</Th>
                    <Th right>Paid</Th>
                    <Th>Status</Th>
                    <Th>Due</Th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice.id}>
                      <Td>
                        <Link
                          href={`/studio/invoices/${invoice.id}`}
                          className="font-medium text-[#FFD700] hover:underline"
                        >
                          {invoice.number}
                        </Link>
                      </Td>
                      <Td className="capitalize">{invoice.kind}</Td>
                      <Td right>
                        <Money amount={Number(invoice.total)} />
                      </Td>
                      <Td right>
                        <Money amount={Number(invoice.amount_paid)} />
                      </Td>
                      <Td>
                        <StatusPill status={invoice.status} />
                      </Td>
                      <Td>{formatDate(invoice.due_date)}</Td>
                    </tr>
                  ))}
                </tbody>
              </TableWrap>
            </Card>
          )}
        </div>

        {/* ── Notes and timeline ──────────────────────────────────────────── */}
        <div className="space-y-6">
          <Card>
            <SectionHeading>Notes</SectionHeading>
            <AddNoteForm dealId={deal.id} />

            {notes.length > 0 && (
              <ul className="mt-5 space-y-4 border-t border-white/10 pt-4">
                {notes.map((note) => (
                  <li key={note.id}>
                    <p className="whitespace-pre-wrap text-sm text-neutral-200">{note.body}</p>
                    <p className="mt-1 text-xs text-neutral-500">
                      {note.author} · {relativeTime(note.created_at)}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card>
            <SectionHeading>Timeline</SectionHeading>

            {activity.length === 0 ? (
              <EmptyState title="Nothing has happened yet" />
            ) : (
              <ol className="space-y-4 border-l border-white/10 pl-4">
                {activity.map((entry) => (
                  <li key={entry.id} className="relative">
                    <span
                      aria-hidden
                      className="absolute -left-5 top-1.5 h-2 w-2 rounded-full bg-[#FFD700]/60"
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
