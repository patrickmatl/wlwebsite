import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import type { ReactNode } from 'react';
import { Money, StatusPill, TableWrap, Td, Th, formatDate } from '@/components/crm/ui';
import { BUSINESS, FULL_ADDRESS } from '@/data/business';
import { formatRand } from '@/lib/crm/types';
import { getSession } from '@/lib/server/auth';
import { getQuote, markQuoteViewed } from '@/lib/server/portal';
import { isPast, paragraphs } from '../../../format';
import PrintButton from '../../../PrintButton';
import { documentPrintCss } from '../../../print-css';
import QuoteDecision from './QuoteDecision';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Quote',
  robots: { index: false, follow: false },
};

const DOC_ID = 'quote-doc';

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
        strong ? 'print-rule border-t border-white/10 pt-3' : ''
      }`}
    >
      <span className={strong ? 'text-sm font-medium text-white' : 'text-sm text-neutral-400'}>
        {label}
      </span>
      <span
        className={
          strong
            ? 'print-accent font-syne text-xl font-bold tabular-nums text-[#FFD700]'
            : 'text-sm tabular-nums text-neutral-200'
        }
      >
        {value}
      </span>
    </div>
  );
}

function Prose({ text }: { text: string | null }) {
  const blocks = paragraphs(text);
  if (blocks.length === 0) return null;

  return (
    <div className="space-y-3">
      {blocks.map((block, index) => (
        <p key={index} className="whitespace-pre-line text-sm leading-relaxed text-neutral-300">
          {block}
        </p>
      ))}
    </div>
  );
}

function Panel({
  tone,
  title,
  children,
}: {
  tone: 'good' | 'quiet' | 'warn';
  title: string;
  children: ReactNode;
}) {
  const tones = {
    good: 'border-emerald-500/40 bg-emerald-500/[0.07]',
    quiet: 'border-white/15 bg-white/[0.03]',
    warn: 'border-[#FFD700]/30 bg-[#FFD700]/[0.05]',
  } as const;

  const headings = {
    good: 'text-emerald-300',
    quiet: 'text-white',
    warn: 'text-[#FFD700]',
  } as const;

  return (
    <div className={`rounded-xl border p-6 ${tones[tone]}`}>
      <p className={`font-syne text-lg font-bold ${headings[tone]}`}>{title}</p>
      <div className="mt-2 max-w-2xl space-y-2 text-sm leading-relaxed text-neutral-300">
        {children}
      </div>
    </div>
  );
}

export default async function PortalQuotePage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getSession('client');
  if (!session) redirect('/portal/login');

  const { id } = await params;
  const found = await getQuote(session, id);
  if (!found) notFound();

  const { quote, items } = found;

  // Stamped only once, inside a query that is already scoped to this session —
  // an id from the URL never reaches the database on its own.
  await markQuoteViewed(session, quote.id);

  const hasOnRequest = items.some((item) => item.unit_price === null);
  const showVat = Number(quote.vat_amount) > 0;
  const lapsed = quote.status === 'sent' && isPast(quote.valid_until);

  return (
    <div className="space-y-8">
      <div className="print-hide">
        <Link
          href="/portal/quotes"
          className="text-xs text-neutral-400 underline underline-offset-4 transition hover:text-[#FFD700]"
        >
          ← All quotes
        </Link>
      </div>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-syne text-2xl font-bold text-white">Quote {quote.number}</h1>
            <StatusPill status={quote.status} />
          </div>
          <p className="mt-1 text-sm text-neutral-400">
            Sent {formatDate(quote.sent_at ?? quote.created_at)}
            {quote.valid_until ? ` · valid until ${formatDate(quote.valid_until)}` : ''}
          </p>
        </div>
        <PrintButton label="Print or save as PDF" />
      </div>

      {quote.status === 'accepted' ? (
        <Panel tone="good" title="You accepted this quote">
          <p>
            Accepted on {formatDate(quote.accepted_at)}
            {quote.accepted_by_name ? ` by ${quote.accepted_by_name}` : ''}. This is your record of
            it — keep or print this page.
          </p>
          <p className="font-medium text-white">What happens next</p>
          <ol className="space-y-1.5 text-neutral-300">
            <li>1. The brief and scope below are confirmed, and studio time is booked.</li>
            <li>
              2. A deposit invoice arrives by email and appears under{' '}
              <Link
                href="/portal/invoices"
                className="underline underline-offset-4 transition hover:text-[#FFD700]"
              >
                Invoices
              </Link>
              , payable by EFT.
            </li>
            <li>
              3. Once the deposit reflects, your project opens under{' '}
              <Link
                href="/portal/projects"
                className="underline underline-offset-4 transition hover:text-[#FFD700]"
              >
                Projects
              </Link>{' '}
              with its milestones, and we begin.
            </li>
          </ol>
        </Panel>
      ) : null}

      {quote.status === 'declined' ? (
        <Panel tone="quiet" title="You declined this quote">
          <p>
            Declined on {formatDate(quote.declined_at)}. Nothing is outstanding and nothing further
            happens on our side.
          </p>
          {quote.decline_reason ? (
            <p className="text-neutral-400">You told us: “{quote.decline_reason}”</p>
          ) : null}
          <p>
            If circumstances change, email{' '}
            <a
              href={`mailto:${BUSINESS.email}`}
              className="underline underline-offset-4 transition hover:text-[#FFD700]"
            >
              {BUSINESS.email}
            </a>{' '}
            and we will happily revisit it.
          </p>
        </Panel>
      ) : null}

      {quote.status === 'expired' ? (
        <Panel tone="quiet" title="This quote has lapsed">
          <p>
            It was valid until {formatDate(quote.valid_until)}. Prices move, so rather than let you
            act on an old number we mark them expired.
          </p>
          <p>
            Still interested? Email{' '}
            <a
              href={`mailto:${BUSINESS.email}?subject=${encodeURIComponent(`Refresh quote ${quote.number}`)}`}
              className="underline underline-offset-4 transition hover:text-[#FFD700]"
            >
              {BUSINESS.email}
            </a>{' '}
            and we will refresh it, usually the same day.
          </p>
        </Panel>
      ) : null}

      {quote.status === 'superseded' ? (
        <Panel tone="quiet" title="This quote has been replaced">
          <p>
            A newer version has been sent to you — look for the most recent quote in your list. This
            one is kept for your records only.
          </p>
        </Panel>
      ) : null}

      {/* The document itself. Everything inside this element is what prints. */}
      <article
        id={DOC_ID}
        className="rounded-xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
      >
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
            <p className="font-syne text-xl font-bold text-white">Quote {quote.number}</p>
            <p className="mt-1 text-xs text-neutral-500">
              Issued {formatDate(quote.sent_at ?? quote.created_at)}
            </p>
            {quote.valid_until ? (
              <p className="text-xs text-neutral-500">Valid until {formatDate(quote.valid_until)}</p>
            ) : null}
          </div>
        </header>

        <section className="print-rule border-b border-white/10 py-6">
          <p className="text-xs uppercase tracking-wide text-neutral-500">Prepared for</p>
          <p className="mt-1 text-sm font-medium text-white">{session.name}</p>
          <p className="text-sm text-neutral-400">{session.email}</p>
        </section>

        {paragraphs(quote.intro).length > 0 ? (
          <section className="print-rule border-b border-white/10 py-6">
            <Prose text={quote.intro} />
          </section>
        ) : null}

        <section className="py-6">
          <h2 className="mb-4 font-syne text-base font-bold text-white">What is included</h2>

          {items.length === 0 ? (
            <p className="text-sm text-neutral-400">
              This quote has no line items — please contact the studio.
            </p>
          ) : (
            <TableWrap>
              <thead>
                <tr>
                  <Th>Item</Th>
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
                      {item.unit_price === null ? (
                        <span className="text-xs text-neutral-500">On request</span>
                      ) : (
                        <Money amount={item.unit_price} className="text-neutral-300" />
                      )}
                    </Td>
                    <Td right>
                      {item.unit_price === null ? (
                        <span className="text-xs text-neutral-500">—</span>
                      ) : (
                        <Money amount={item.line_total} className="font-medium text-white" />
                      )}
                    </Td>
                  </tr>
                ))}
              </tbody>
            </TableWrap>
          )}

          <div className="ml-auto mt-6 w-full max-w-xs space-y-2.5">
            <TotalRow label="Subtotal" value={formatRand(quote.subtotal)} />
            {showVat ? (
              <TotalRow
                label={`VAT at ${Number(quote.vat_rate)}%`}
                value={formatRand(quote.vat_amount)}
              />
            ) : null}
            <TotalRow label="Total" value={formatRand(quote.total)} strong />
          </div>

          {hasOnRequest ? (
            <p className="mt-4 text-xs leading-relaxed text-neutral-500">
              Items marked “on request” are priced once we have scoped them with you, and are not
              part of the total above. Nothing there is billed without a quote of its own.
            </p>
          ) : null}

          {!showVat ? (
            <p className="mt-2 text-xs text-neutral-500">
              All amounts are in South African Rand.
            </p>
          ) : null}
        </section>

        {paragraphs(quote.terms).length > 0 ? (
          <section className="print-rule border-t border-white/10 pt-6">
            <h2 className="mb-3 font-syne text-base font-bold text-white">
              How we work on this
            </h2>
            <Prose text={quote.terms} />
          </section>
        ) : null}
      </article>

      {quote.status === 'sent' ? (
        <div className="print-hide space-y-4">
          {lapsed ? (
            <div className="rounded-lg border border-white/15 bg-white/[0.03] px-4 py-3 text-xs leading-relaxed text-neutral-400">
              This quote was valid until {formatDate(quote.valid_until)}. You are still welcome to
              accept it — we will confirm the pricing with you before anything is invoiced.
            </div>
          ) : null}

          <QuoteDecision
            quoteId={quote.id}
            quoteNumber={quote.number}
            total={Number(quote.total)}
            hasOnRequest={hasOnRequest}
          />
        </div>
      ) : null}

      <style dangerouslySetInnerHTML={{ __html: documentPrintCss(DOC_ID) }} />
    </div>
  );
}
