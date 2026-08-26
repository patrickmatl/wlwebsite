import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { Money, StatusPill, TableWrap, Td, Th, formatDate } from '@/components/crm/ui';
import { BUSINESS, FULL_ADDRESS } from '@/data/business';
import { formatRand } from '@/lib/crm/types';
import { getSession } from '@/lib/server/auth';
import { getInvoice } from '@/lib/server/portal';
import { dueLanguage, isPast, paragraphs } from '../../../format';
import PrintButton from '../../../PrintButton';
import { documentPrintCss } from '../../../print-css';
import { KIND_HEADINGS } from '../kinds';
import PaymentDetails from './PaymentDetails';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Invoice',
  robots: { index: false, follow: false },
};

const DOC_ID = 'invoice-doc';

function TotalRow({
  label,
  value,
  strong = false,
  muted = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
  muted?: boolean;
}) {
  return (
    <div
      className={`flex items-baseline justify-between gap-6 ${
        strong ? 'print-rule border-t border-white/10 pt-3' : ''
      }`}
    >
      <span
        className={
          strong ? 'text-sm font-medium text-white' : `text-sm ${muted ? 'text-neutral-500' : 'text-neutral-400'}`
        }
      >
        {label}
      </span>
      <span
        className={
          strong
            ? 'print-accent font-syne text-xl font-bold tabular-nums text-[#FFD700]'
            : `text-sm tabular-nums ${muted ? 'text-neutral-500' : 'text-neutral-200'}`
        }
      >
        {value}
      </span>
    </div>
  );
}

export default async function PortalInvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getSession('client');
  if (!session) redirect('/portal/login');

  const { id } = await params;
  const found = await getInvoice(session, id);
  if (!found) notFound();

  const { invoice, items } = found;

  const total = Number(invoice.total);
  const paid = Number(invoice.amount_paid);
  const balance = total - paid;
  const settled = balance <= 0;
  const showVat = Number(invoice.vat_amount) > 0;
  const late = !settled && isPast(invoice.due_date);

  return (
    <div className="space-y-8">
      <div className="print-hide">
        <Link
          href="/portal/invoices"
          className="text-xs text-neutral-400 underline underline-offset-4 transition hover:text-[#FFD700]"
        >
          ← All invoices
        </Link>
      </div>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-syne text-2xl font-bold text-white">Invoice {invoice.number}</h1>
            <StatusPill status={invoice.status} />
          </div>
          <p className="mt-1 text-sm text-neutral-400">
            Issued {formatDate(invoice.issue_date)}
            {invoice.due_date ? ` · due ${formatDate(invoice.due_date)}` : ''}
          </p>
        </div>
        <PrintButton label="Print or save as PDF" />
      </div>

      {settled ? (
        <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/[0.07] p-6">
          <p className="font-syne text-lg font-bold text-emerald-300">Paid in full — thank you.</p>
          <p className="mt-2 text-sm leading-relaxed text-neutral-300">
            {invoice.paid_at
              ? `Settled on ${formatDate(invoice.paid_at)}. `
              : 'Settled in full. '}
            Nothing further is owed on this invoice. Keep this page as your receipt, or print it.
          </p>
        </div>
      ) : late ? (
        <div className="rounded-xl border border-red-500/40 bg-red-500/[0.07] p-6">
          <p className="font-syne text-lg font-bold text-red-300">
            {formatRand(balance)} is past due
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-300">
            This was due on {formatDate(invoice.due_date)} — {dueLanguage(invoice.due_date)}. If it
            is already on its way, ignore this. If something is holding it up, tell us and we will
            sort it out between us rather than let it sit.
          </p>
        </div>
      ) : null}

      {/* The document itself. Everything inside this element is what prints. */}
      <article id={DOC_ID} className="rounded-xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
        <header className="print-rule flex flex-wrap items-start justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <p className="print-accent text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFD700]">
              {BUSINESS.name}
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-neutral-500">{FULL_ADDRESS}</p>
            <p className="text-xs text-neutral-500">
              {BUSINESS.email} · {BUSINESS.phoneDisplay}
            </p>
          </div>
          <div className="text-left sm:text-right">
            <p className="font-syne text-xl font-bold text-white">
              {KIND_HEADINGS[invoice.kind]}
            </p>
            <p className="mt-1 text-sm font-medium text-neutral-300">{invoice.number}</p>
            <p className="mt-1 text-xs text-neutral-500">
              Issued {formatDate(invoice.issue_date)}
            </p>
            {invoice.due_date ? (
              <p className="text-xs text-neutral-500">Due {formatDate(invoice.due_date)}</p>
            ) : null}
          </div>
        </header>

        <section className="print-rule border-b border-white/10 py-6">
          <p className="text-xs uppercase tracking-wide text-neutral-500">Billed to</p>
          <p className="mt-1 text-sm font-medium text-white">{session.name}</p>
          <p className="text-sm text-neutral-400">{session.email}</p>
        </section>

        <section className="py-6">
          {items.length === 0 ? (
            <p className="text-sm text-neutral-400">
              This invoice has no line items — please contact the studio before paying it.
            </p>
          ) : (
            <TableWrap>
              <thead>
                <tr>
                  <Th>Description</Th>
                  <Th right>Qty</Th>
                  <Th right>Unit</Th>
                  <Th right>Amount</Th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <Td>
                      <span className="font-medium text-white">{item.name}</span>
                      {item.description ? (
                        <span className="mt-1 block whitespace-pre-line text-xs leading-relaxed text-neutral-400">
                          {item.description}
                        </span>
                      ) : null}
                    </Td>
                    <Td right>
                      <span className="tabular-nums text-neutral-300">{item.quantity}</span>
                    </Td>
                    <Td right>
                      <Money amount={item.unit_price} className="text-neutral-300" />
                    </Td>
                    <Td right>
                      <Money amount={item.line_total} className="font-medium text-white" />
                    </Td>
                  </tr>
                ))}
              </tbody>
            </TableWrap>
          )}

          <div className="ml-auto mt-6 w-full max-w-xs space-y-2.5">
            <TotalRow label="Subtotal" value={formatRand(invoice.subtotal)} />
            {showVat ? (
              <TotalRow
                label={`VAT at ${Number(invoice.vat_rate)}%`}
                value={formatRand(invoice.vat_amount)}
              />
            ) : null}
            <TotalRow label="Invoice total" value={formatRand(total)} />
            {paid > 0 ? (
              <TotalRow label="Already paid" value={`− ${formatRand(paid)}`} muted />
            ) : null}
            <TotalRow
              label={settled ? 'Balance' : 'Balance due'}
              value={formatRand(Math.max(balance, 0))}
              strong
            />
          </div>

          {!showVat ? (
            <p className="mt-4 text-xs text-neutral-500">
              All amounts are in South African Rand and exclude VAT.
            </p>
          ) : null}
        </section>

        {paragraphs(invoice.notes).length > 0 ? (
          <section className="print-rule border-t border-white/10 pt-6">
            <h2 className="mb-3 font-syne text-base font-bold text-white">Notes</h2>
            <div className="space-y-3">
              {paragraphs(invoice.notes).map((block, index) => (
                <p
                  key={index}
                  className="whitespace-pre-line text-sm leading-relaxed text-neutral-300"
                >
                  {block}
                </p>
              ))}
            </div>
          </section>
        ) : null}

        {settled ? (
          <section className="print-rule mt-8 rounded-lg border border-emerald-500/30 bg-emerald-500/[0.05] p-5">
            <p className="text-sm font-medium text-emerald-300">Paid in full</p>
            <p className="mt-1 text-xs text-neutral-400">
              {invoice.paid_at
                ? `Received ${formatDate(invoice.paid_at)}. `
                : ''}
              No payment is due. Thank you.
            </p>
          </section>
        ) : (
          <PaymentDetails reference={invoice.number} amountDue={balance} />
        )}
      </article>

      <style dangerouslySetInnerHTML={{ __html: documentPrintCss(DOC_ID) }} />
    </div>
  );
}
