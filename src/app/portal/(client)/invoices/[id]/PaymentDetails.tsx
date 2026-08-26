'use client';

import { useEffect, useState } from 'react';
import { BUSINESS } from '@/data/business';
import { formatRand } from '@/lib/crm/types';
import { postPortal } from '../../../portal-post';

type Payment = {
  bank_name: string | null;
  account_name: string | null;
  account_number: string | null;
  branch_code: string | null;
  notes: string | null;
};

/** One banking field, with a copy button — account numbers get mistyped. */
function DetailRow({
  label,
  value,
  copied,
  onCopy,
}: {
  label: string;
  value: string | null;
  copied: boolean;
  onCopy: () => void;
}) {
  if (!value) return null;

  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-2">
      <dt className="text-xs uppercase tracking-wide text-neutral-500">{label}</dt>
      <dd className="flex items-center gap-2 text-sm font-medium text-white">
        <span className="tabular-nums">{value}</span>
        <button
          type="button"
          onClick={onCopy}
          className="print-hide text-[11px] text-neutral-500 underline underline-offset-4 transition hover:text-[#FFD700]"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </dd>
    </div>
  );
}

/**
 * How to pay this invoice.
 *
 * The banking details come from /api/portal rather than from the page, because
 * every portal read on the server goes through src/lib/server/portal.ts and
 * that module exposes no settings read. Fetching them here keeps the rule
 * intact: no page in this slice touches the database on its own.
 *
 * If the call fails the panel still tells the client how to pay — falling back
 * to the studio's published contact details rather than showing nothing, since
 * an invoice with no route to settling it is worse than a slightly manual one.
 */
export default function PaymentDetails({
  reference,
  amountDue,
}: {
  reference: string;
  amountDue: number;
}) {
  const [payment, setPayment] = useState<Payment | null>(null);
  const [state, setState] = useState<'loading' | 'ready' | 'unavailable'>('loading');
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    let live = true;

    (async () => {
      const result = await postPortal<{ payment?: Partial<Payment> | null }>({
        action: 'payment-details',
      });

      if (!live) return;

      const details = result.ok ? result.data.payment : null;

      if (!details || !details.account_number) {
        setState('unavailable');
        return;
      }

      setPayment({
        bank_name: details.bank_name ?? null,
        account_name: details.account_name ?? null,
        account_number: details.account_number ?? null,
        branch_code: details.branch_code ?? null,
        notes: details.notes ?? null,
      });
      setState('ready');
    })();

    return () => {
      live = false;
    };
  }, []);

  async function copy(label: string, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      window.setTimeout(() => setCopied(null), 2000);
    } catch {
      // Clipboard access is refused in plenty of ordinary situations — an
      // insecure origin, a locked-down browser. The value is on screen either
      // way, so there is nothing to report.
    }
  }

  const row = (label: string, value: string | null) => (
    <DetailRow
      key={label}
      label={label}
      value={value}
      copied={copied === label}
      onCopy={() => {
        if (value) void copy(label, value);
      }}
    />
  );

  return (
    <section className="print-rule mt-8 rounded-lg border border-white/10 bg-black/30 p-5">
      <h2 className="font-syne text-base font-bold text-white">How to pay</h2>
      <p className="mt-1.5 text-sm text-neutral-400">
        By EFT, please — {formatRand(amountDue)}. We do not take card payments.
      </p>

      {state === 'loading' ? (
        <div className="mt-4 space-y-2" aria-live="polite">
          <div className="h-3 w-2/3 animate-pulse rounded bg-white/10" />
          <div className="h-3 w-1/2 animate-pulse rounded bg-white/10" />
          <div className="h-3 w-3/5 animate-pulse rounded bg-white/10" />
        </div>
      ) : null}

      {state === 'ready' && payment ? (
        <dl className="mt-4 divide-y divide-white/5">
          {row('Bank', payment.bank_name)}
          {row('Account name', payment.account_name)}
          {row('Account number', payment.account_number)}
          {row('Branch code', payment.branch_code)}
          {row('Reference', reference)}
        </dl>
      ) : null}

      {state === 'unavailable' ? (
        <div className="mt-4 rounded-lg border border-white/10 bg-white/[0.03] p-4">
          <p className="text-sm leading-relaxed text-neutral-300">
            We could not load the banking details just now. Email{' '}
            <a
              href={`mailto:${BUSINESS.email}?subject=${encodeURIComponent(`Banking details for ${reference}`)}`}
              className="underline underline-offset-4 transition hover:text-[#FFD700]"
            >
              {BUSINESS.email}
            </a>{' '}
            or call {BUSINESS.phoneDisplay} and we will send them straight through. They are also
            on the copy of this invoice that was emailed to you.
          </p>
        </div>
      ) : null}

      <p className="mt-4 text-xs leading-relaxed text-neutral-500">
        Please use <span className="font-medium text-neutral-300">{reference}</span> as your
        payment reference — it is how we match the payment to your account. Send the proof of
        payment to {BUSINESS.email} if you would like it acknowledged the same day.
      </p>

      {state === 'ready' && payment?.notes ? (
        <p className="mt-3 whitespace-pre-line text-xs leading-relaxed text-neutral-500">
          {payment.notes}
        </p>
      ) : null}
    </section>
  );
}
