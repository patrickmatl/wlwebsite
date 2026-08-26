'use client';

import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { BTN, BTN_DANGER, BTN_GHOST, INPUT, LABEL, formatDate } from '@/components/crm/ui';
import {
  formatRand,
  round2,
  type InvoiceStatus,
  type Payment,
  type PaymentMethod,
} from '@/lib/crm/types';
import { postCrm } from '../../deals/crm-post';

/**
 * The working half of an invoice: send it, void it, and capture what came in.
 *
 * Everything here is deliberately outside the printed document — a client's
 * copy carries the balance due, not the studio's controls or the reference on
 * every EFT that has landed against it.
 */

const METHODS: { id: PaymentMethod; label: string }[] = [
  { id: 'eft', label: 'EFT' },
  { id: 'card', label: 'Card' },
  { id: 'cash', label: 'Cash' },
  { id: 'other', label: 'Other' },
];

/** Today in South Africa, so a late-night capture does not date to yesterday. */
function todayISO(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Johannesburg' }).format(new Date());
}

export default function InvoiceActions({
  invoiceId,
  number,
  status,
  total,
  amountPaid,
  payments,
}: {
  invoiceId: string;
  number: string;
  status: InvoiceStatus;
  total: number;
  amountPaid: number;
  payments: Payment[];
}) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [voiding, setVoiding] = useState(false);
  const [reason, setReason] = useState('');

  const balance = round2(total - amountPaid);

  const [amount, setAmount] = useState(balance > 0 ? String(balance) : '');
  const [method, setMethod] = useState<PaymentMethod>('eft');
  const [reference, setReference] = useState('');
  const [receivedAt, setReceivedAt] = useState(todayISO());

  async function run(key: string, payload: Record<string, unknown>): Promise<boolean> {
    if (busy) return false;
    setBusy(key);
    setError(null);

    const result = await postCrm(payload);
    setBusy(null);

    if (!result.ok) {
      setError(result.error);
      return false;
    }

    router.refresh();
    return true;
  }

  async function record(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const value = Number(amount);
    if (!Number.isFinite(value) || value <= 0) {
      setError('Enter the amount that came in.');
      return;
    }

    const ok = await run('record-payment', {
      action: 'record-payment',
      invoiceId,
      amount: round2(value),
      method,
      reference: reference.trim() || null,
      receivedAt: receivedAt || null,
    });

    if (ok) {
      setReference('');
      setAmount('');
    }
  }

  const isVoid = status === 'void';
  const sendable = !isVoid && status !== 'paid';
  // voidInvoice refuses once money is against it, so the button says so first.
  const voidable = !isVoid && amountPaid <= 0;

  return (
    <div className="space-y-5">
      {error && (
        <p
          role="alert"
          className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-sm text-red-300"
        >
          {error}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          className={BTN}
          disabled={busy !== null || !sendable}
          onClick={() => void run('send-invoice', { action: 'send-invoice', invoiceId })}
          title={
            isVoid
              ? 'This invoice was voided'
              : status === 'paid'
                ? 'Already settled in full'
                : undefined
          }
        >
          {busy === 'send-invoice'
            ? 'Sending…'
            : status === 'draft'
              ? 'Send to client'
              : 'Send again'}
        </button>

        <button type="button" className={BTN_GHOST} onClick={() => window.print()}>
          Print or save as PDF
        </button>

        <button
          type="button"
          className={BTN_GHOST}
          disabled={busy !== null || !voidable}
          onClick={() => setVoiding((open) => !open)}
          title={
            isVoid
              ? 'Already void'
              : amountPaid > 0
                ? 'Money has been received against this invoice — remove the payment first'
                : undefined
          }
        >
          Void
        </button>
      </div>

      {voiding && (
        <form
          onSubmit={(event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            void run('void-invoice', {
              action: 'void-invoice',
              invoiceId,
              reason: reason.trim() || null,
            }).then((ok) => {
              if (ok) {
                setVoiding(false);
                setReason('');
              }
            });
          }}
          className="rounded-lg border border-red-500/30 bg-red-500/[0.06] p-4"
        >
          <label className={LABEL} htmlFor="void-reason">
            Why is {number} being voided?
          </label>
          <textarea
            id="void-reason"
            className={INPUT + ' min-h-20 resize-y'}
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            placeholder="Raised against the wrong quote — replaced by a corrected invoice."
            autoFocus
          />
          <p className="mt-1 text-xs text-neutral-500">
            A void invoice stays on record with its number. Numbers are never reused — that is what
            makes the sequence auditable.
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            <button type="submit" className={BTN_DANGER} disabled={busy !== null}>
              {busy === 'void-invoice' ? 'Voiding…' : 'Void this invoice'}
            </button>
            <button
              type="button"
              className={BTN_GHOST}
              disabled={busy !== null}
              onClick={() => setVoiding(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* ── Payments ─────────────────────────────────────────────────────── */}
      <div className="border-t border-white/10 pt-5">
        <h3 className="mb-3 font-syne text-base font-bold text-white">Payments</h3>

        {payments.length === 0 ? (
          <p className="text-sm text-neutral-500">Nothing received yet.</p>
        ) : (
          <ul className="mb-4 space-y-2">
            {payments.map((payment) => (
              <li
                key={payment.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/10 bg-black/30 px-3 py-2.5"
              >
                <div className="min-w-0">
                  <p className="text-sm text-neutral-100">
                    <span className="tabular-nums font-medium">
                      {formatRand(Number(payment.amount))}
                    </span>
                    <span className="text-neutral-500"> · {payment.method.toUpperCase()}</span>
                  </p>
                  <p className="mt-0.5 text-xs text-neutral-500">
                    {formatDate(payment.received_at)}
                    {payment.reference ? ' · ref ' + payment.reference : ''}
                  </p>
                </div>

                <button
                  type="button"
                  disabled={busy !== null || isVoid}
                  onClick={() => {
                    if (
                      window.confirm(
                        'Remove the payment of ' +
                          formatRand(Number(payment.amount)) +
                          '? The invoice balance is worked out again from what is left.',
                      )
                    ) {
                      void run('delete-payment-' + payment.id, {
                        action: 'delete-payment',
                        paymentId: payment.id,
                      });
                    }
                  }}
                  className="shrink-0 rounded-md border border-white/15 px-2.5 py-1 text-xs text-neutral-400 transition hover:border-red-500/40 hover:text-red-300 disabled:opacity-40"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}

        {isVoid ? (
          <p className="text-sm text-neutral-500">
            A voided invoice cannot take a payment.
          </p>
        ) : (
          <form onSubmit={record} className="rounded-lg border border-white/10 bg-black/30 p-4">
            <p className="mb-3 text-xs uppercase tracking-wide text-neutral-400">
              Record a payment
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className={LABEL} htmlFor="payment-amount">
                  Amount received
                </label>
                <input
                  id="payment-amount"
                  className={INPUT}
                  type="number"
                  step="0.01"
                  min="0.01"
                  inputMode="decimal"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  placeholder={balance > 0 ? String(balance) : '0.00'}
                  required
                />
                {balance > 0 && (
                  <p className="mt-1 text-xs text-neutral-500">
                    {formatRand(balance)} still outstanding.
                  </p>
                )}
              </div>

              <div>
                <label className={LABEL} htmlFor="payment-method">
                  Method
                </label>
                <select
                  id="payment-method"
                  className={INPUT}
                  value={method}
                  onChange={(event) => setMethod(event.target.value as PaymentMethod)}
                >
                  {METHODS.map((option) => (
                    <option key={option.id} value={option.id} className="bg-black">
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={LABEL} htmlFor="payment-reference">
                  Reference
                </label>
                <input
                  id="payment-reference"
                  className={INPUT}
                  value={reference}
                  onChange={(event) => setReference(event.target.value)}
                  placeholder={number}
                />
              </div>

              <div>
                <label className={LABEL} htmlFor="payment-date">
                  Date received
                </label>
                <input
                  id="payment-date"
                  className={INPUT}
                  type="date"
                  value={receivedAt}
                  onChange={(event) => setReceivedAt(event.target.value)}
                />
              </div>
            </div>

            <button type="submit" className={BTN + ' mt-4'} disabled={busy !== null}>
              {busy === 'record-payment' ? 'Recording…' : 'Record payment'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
