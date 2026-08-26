import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import type { ReactNode } from 'react';
import {
  BTN_GHOST,
  CARD,
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
import { BUSINESS, FULL_ADDRESS } from '@/data/business';
import { contactName, formatRand, round2 } from '@/lib/crm/types';
import { getSession } from '@/lib/server/auth';
import {
  getInvoiceFull,
  getProject,
  getQuote,
  getSettings,
  listActivity,
} from '@/lib/server/crm';
import InvoiceActions from './InvoiceActions';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Invoice',
  robots: { index: false, follow: false },
};

/**
 * Ctrl+P has to produce a document a client can be sent, not a screenshot of
 * the console. Three things make that true: the studio chrome comes out, the
 * page inverts to black on white, and the working controls (send, void, the
 * payment capture, the timeline) drop out with .print-hide.
 *
 * The rail and the phone bar belong to (admin)/layout.tsx, which this slice
 * must not edit, so they are hidden from here by the handles they actually
 * carry in the DOM.
 */
const PRINT_CSS = `
@media print {
  @page { size: A4; margin: 16mm; }

  html, body {
    background: #ffffff !important;
    color: #000000 !important;
  }

  /* Studio navigation: the fixed rail and the sheet both carry this label. */
  nav[aria-label="Studio sections"] { display: none !important; }

  /* The phone bar is an unlabelled sticky div in the layout; nothing else on
     this page is sticky, so that is the handle available. */
  body .sticky { display: none !important; }

  /* Everything on this page that is a control rather than the document. */
  .print-hide { display: none !important; }

  /* The layout pads the content past a rail that is no longer there. */
  main { padding-left: 0 !important; }
  main > div {
    max-width: none !important;
    padding: 0 !important;
    margin: 0 !important;
  }

  #invoice-document {
    border: 0 !important;
    padding: 0 !important;
    border-radius: 0 !important;
  }

  /* Invert the whole document in one rule rather than element by element —
     the screen palette is deliberate and none of it survives on paper. */
  #invoice-document, #invoice-document * {
    background: transparent !important;
    color: #000000 !important;
    border-color: #b3b3b3 !important;
    box-shadow: none !important;
  }

  /* Keep a table from splitting a line across two pages. */
  #invoice-document tr { page-break-inside: avoid; }
}
`;

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
      className={
        'flex items-baseline justify-between gap-6 ' +
        (strong ? 'border-t border-white/10 pt-2.5' : '')
      }
    >
      <span className={strong ? 'text-sm font-medium text-white' : 'text-sm text-neutral-400'}>
        {label}
      </span>
      <span
        className={
          'tabular-nums ' +
          (strong ? 'font-syne text-xl font-bold text-[#FFD700]' : 'text-sm text-neutral-200')
        }
      >
        {value}
      </span>
    </div>
  );
}

export default async function InvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getSession('admin');
  if (!session) redirect('/studio/login');

  const { id } = await params;
  const full = await getInvoiceFull(id);
  if (!full) notFound();

  const { invoice, items, payments, contact, company } = full;

  const [settings, activity, project, quote] = await Promise.all([
    getSettings(),
    listActivity('invoice', invoice.id, 30),
    invoice.project_id ? getProject(invoice.project_id) : Promise.resolve(null),
    invoice.quote_id ? getQuote(invoice.quote_id) : Promise.resolve(null),
  ]);

  const total = Number(invoice.total);
  const amountPaid = Number(invoice.amount_paid);
  const balance = round2(total - amountPaid);

  /**
   * An invoice raised while the studio was VAT registered keeps printing its
   * VAT line even if the setting is switched off later — the document is a tax
   * record, not a live view of today's registration.
   */
  const vatAmount = Number(invoice.vat_amount);
  const showVat = settings.vat_registered || vatAmount > 0;
  // Only a document that actually levies VAT may be headed "Tax Invoice".
  const heading = vatAmount > 0 ? 'Tax Invoice' : 'Invoice';

  const client = company?.name ?? (contact ? contactName(contact) : null);

  const addressLines = [
    company?.address_line1,
    company?.suburb,
    [company?.city, company?.postal_code].filter(Boolean).join(' '),
    company?.province,
  ].filter((line): line is string => Boolean(line && line.trim()));

  const hasBanking = Boolean(
    settings.bank_name ||
      settings.bank_account_name ||
      settings.bank_account_number ||
      settings.bank_branch_code,
  );

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: PRINT_CSS }} />

      <div className="print-hide">
        <PageHeader
          title={'Invoice ' + invoice.number}
          subtitle={
            [client, invoice.kind + ' invoice', 'issued ' + formatDate(invoice.issue_date)]
              .filter(Boolean)
              .join(' · ')
          }
          action={
            <Link href="/studio/invoices" className={BTN_GHOST}>
              All invoices
            </Link>
          }
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* ── The document ──────────────────────────────────────────────── */}
          <div id="invoice-document" className={CARD}>
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div>
                <p className="font-syne text-xl font-bold text-[#FFD700]">{BUSINESS.name}</p>
                <p className="mt-1.5 max-w-xs text-xs leading-relaxed text-neutral-400">
                  {FULL_ADDRESS}
                </p>
                <p className="mt-1 text-xs text-neutral-400">{BUSINESS.email}</p>
                <p className="text-xs text-neutral-400">{BUSINESS.phoneDisplay}</p>
                {showVat && settings.vat_number && (
                  <p className="mt-1 text-xs text-neutral-400">
                    VAT reg. no. {settings.vat_number}
                  </p>
                )}
              </div>

              <div className="text-right">
                <p className="font-syne text-lg font-bold uppercase tracking-wide text-white">
                  {heading}
                </p>
                <p className="mt-1 font-medium text-neutral-200">{invoice.number}</p>
                <p className="mt-1.5 text-xs text-neutral-400">
                  Issued {formatDate(invoice.issue_date)}
                </p>
                <p className="text-xs text-neutral-400">Due {formatDate(invoice.due_date)}</p>
                <div className="mt-2 print-hide">
                  <StatusPill status={invoice.status} />
                </div>
              </div>
            </div>

            {invoice.status === 'void' && (
              <p className="mt-5 rounded-lg border border-red-500/40 px-4 py-2.5 text-sm font-medium text-red-300">
                This invoice has been voided. It is kept on record so the numbering stays unbroken.
              </p>
            )}

            {/* ── Billed to ───────────────────────────────────────────────── */}
            <div className="mt-6 rounded-lg border border-white/10 bg-black/30 p-4">
              <p className="text-xs uppercase tracking-wide text-neutral-400">Billed to</p>

              {company && (
                <p className="mt-1.5 text-sm font-medium text-white">{company.name}</p>
              )}
              {!company && contact && (
                <p className="mt-1.5 text-sm font-medium text-white">{contactName(contact)}</p>
              )}

              {addressLines.map((line) => (
                <p key={line} className="text-xs text-neutral-400">
                  {line}
                </p>
              ))}

              {company?.registration_number && (
                <p className="mt-1 text-xs text-neutral-400">
                  Reg. no. {company.registration_number}
                </p>
              )}
              {company?.vat_number && (
                <p className="text-xs text-neutral-400">VAT reg. no. {company.vat_number}</p>
              )}

              {contact && (
                <p className="mt-2 text-xs text-neutral-400">
                  {company ? contactName(contact) + ' · ' : ''}
                  {contact.email}
                  {contact.phone ? ' · ' + contact.phone : ''}
                </p>
              )}

              {!company && !contact && (
                <p className="mt-1.5 text-sm text-neutral-600">No client on this invoice.</p>
              )}
            </div>

            {/* ── Lines ───────────────────────────────────────────────────── */}
            <div className="mt-6">
              <TableWrap>
                <thead>
                  <tr>
                    <Th>Description</Th>
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
                        <Money amount={item.unit_price === null ? null : Number(item.unit_price)} />
                      </Td>
                      <Td right>
                        <Money amount={item.line_total === null ? null : Number(item.line_total)} />
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </TableWrap>
            </div>

            {/* ── Totals ──────────────────────────────────────────────────── */}
            <div className="mt-5 ml-auto max-w-xs space-y-2">
              <TotalRow label="Subtotal" value={formatRand(Number(invoice.subtotal))} />
              {showVat && (
                <TotalRow
                  label={'VAT at ' + Number(invoice.vat_rate) + '%'}
                  value={formatRand(vatAmount)}
                />
              )}
              <TotalRow label="Total" value={formatRand(total)} strong />

              {amountPaid > 0 && (
                <>
                  <TotalRow label="Less paid" value={'−' + formatRand(amountPaid)} />
                  <TotalRow label="Balance due" value={formatRand(balance)} strong />
                </>
              )}
            </div>

            {!showVat && (
              <p className="mt-3 text-right text-xs text-neutral-500">
                Not VAT registered — no VAT is charged.
              </p>
            )}

            {invoice.status === 'paid' && (
              <p className="mt-4 text-right text-sm font-medium text-emerald-300">
                Paid in full{invoice.paid_at ? ' on ' + formatDate(invoice.paid_at) : ''} — thank
                you.
              </p>
            )}

            {/* ── How to pay ──────────────────────────────────────────────── */}
            {hasBanking && balance > 0 && invoice.status !== 'void' && (
              <div className="mt-6 border-t border-white/10 pt-4">
                <p className="text-xs uppercase tracking-wide text-neutral-400">Banking details</p>
                <dl className="mt-2 grid gap-x-6 gap-y-1 text-sm text-neutral-300 sm:grid-cols-2">
                  {settings.bank_account_name && (
                    <div className="flex justify-between gap-4">
                      <dt className="text-neutral-500">Account name</dt>
                      <dd>{settings.bank_account_name}</dd>
                    </div>
                  )}
                  {settings.bank_name && (
                    <div className="flex justify-between gap-4">
                      <dt className="text-neutral-500">Bank</dt>
                      <dd>{settings.bank_name}</dd>
                    </div>
                  )}
                  {settings.bank_account_number && (
                    <div className="flex justify-between gap-4">
                      <dt className="text-neutral-500">Account number</dt>
                      <dd className="tabular-nums">{settings.bank_account_number}</dd>
                    </div>
                  )}
                  {settings.bank_branch_code && (
                    <div className="flex justify-between gap-4">
                      <dt className="text-neutral-500">Branch code</dt>
                      <dd className="tabular-nums">{settings.bank_branch_code}</dd>
                    </div>
                  )}
                </dl>
                <p className="mt-2 text-xs text-neutral-400">
                  Please use <span className="font-medium text-neutral-200">{invoice.number}</span>{' '}
                  as your payment reference.
                </p>
              </div>
            )}

            {invoice.notes && (
              <div className="mt-5 border-t border-white/10 pt-4">
                <p className="whitespace-pre-wrap text-xs text-neutral-400">{invoice.notes}</p>
              </div>
            )}
          </div>

          {/* ── The working half ──────────────────────────────────────────── */}
          <div className="print-hide">
            <Card>
              <SectionHeading>Actions</SectionHeading>
              <InvoiceActions
                invoiceId={invoice.id}
                number={invoice.number}
                status={invoice.status}
                total={total}
                amountPaid={amountPaid}
                payments={payments}
              />
            </Card>
          </div>
        </div>

        {/* ── Context ─────────────────────────────────────────────────────── */}
        <div className="space-y-6 print-hide">
          <Card>
            <SectionHeading>Linked records</SectionHeading>

            <dl className="space-y-4">
              <div>
                <dt className="text-xs uppercase tracking-wide text-neutral-400">Quote</dt>
                <dd className="mt-1 text-sm">
                  {quote ? (
                    <Link
                      href={'/studio/quotes/' + quote.id}
                      className="text-[#FFD700] hover:underline"
                    >
                      {quote.number}
                    </Link>
                  ) : (
                    <span className="text-neutral-600">Raised by hand</span>
                  )}
                </dd>
              </div>

              <div>
                <dt className="text-xs uppercase tracking-wide text-neutral-400">Project</dt>
                <dd className="mt-1 text-sm">
                  {project ? (
                    <Link
                      href={'/studio/projects/' + project.id}
                      className="text-[#FFD700] hover:underline"
                    >
                      {project.code} · {project.name}
                    </Link>
                  ) : (
                    <span className="text-neutral-600">Not attached to a project</span>
                  )}
                </dd>
              </div>

              <div>
                <dt className="text-xs uppercase tracking-wide text-neutral-400">Sent</dt>
                <dd className="mt-1 text-sm text-neutral-200">
                  {invoice.sent_at ? formatDateTime(invoice.sent_at) : 'Not sent yet'}
                </dd>
              </div>
            </dl>
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
                    <p
                      className="mt-0.5 text-xs text-neutral-500"
                      title={formatDateTime(entry.created_at)}
                    >
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
