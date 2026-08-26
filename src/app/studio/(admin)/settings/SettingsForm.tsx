'use client';

import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { BTN, INPUT, LABEL } from '@/components/crm/ui';
import type { Settings } from '@/lib/crm/types';
import { postCrm } from '../deals/crm-post';

/**
 * The studio's own details, and the numbers every new document is built from.
 *
 * Nothing here reaches back into a quote or invoice that already exists: those
 * froze their rate, their validity and their terms at the moment they were
 * raised, because they are records of what was agreed rather than a live view
 * of today's settings. The UI says so where it matters — VAT especially, which
 * is the setting most likely to be flipped mid-year.
 */
export default function SettingsForm({ settings }: { settings: Settings }) {
  const router = useRouter();

  const [vatRegistered, setVatRegistered] = useState(settings.vat_registered);
  const [vatNumber, setVatNumber] = useState(settings.vat_number ?? '');
  const [vatRate, setVatRate] = useState(String(Number(settings.vat_rate)));
  const [validityDays, setValidityDays] = useState(String(Number(settings.quote_validity_days)));
  const [depositPercent, setDepositPercent] = useState(String(Number(settings.deposit_percent)));
  const [termsDays, setTermsDays] = useState(String(Number(settings.payment_terms_days)));
  const [bankName, setBankName] = useState(settings.bank_name ?? '');
  const [accountName, setAccountName] = useState(settings.bank_account_name ?? '');
  const [accountNumber, setAccountNumber] = useState(settings.bank_account_number ?? '');
  const [branchCode, setBranchCode] = useState(settings.bank_branch_code ?? '');
  const [invoiceNotes, setInvoiceNotes] = useState(settings.invoice_notes ?? '');

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  /**
   * A cleared number field means "leave it alone", not zero — a blank payment
   * terms box must not silently make every new invoice due on the day it is
   * raised.
   */
  function toNumber(value: string, fallback: number): number {
    if (value.trim() === '') return fallback;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;

    setBusy(true);
    setError(null);
    setSaved(false);

    const result = await postCrm({
      action: 'update-settings',
      settings: {
        vat_registered: vatRegistered,
        vat_number: vatNumber.trim() || null,
        vat_rate: toNumber(vatRate, Number(settings.vat_rate)),
        quote_validity_days: Math.round(
          toNumber(validityDays, Number(settings.quote_validity_days)),
        ),
        deposit_percent: Math.round(toNumber(depositPercent, Number(settings.deposit_percent))),
        payment_terms_days: Math.round(toNumber(termsDays, Number(settings.payment_terms_days))),
        bank_name: bankName.trim() || null,
        bank_account_name: accountName.trim() || null,
        bank_account_number: accountNumber.trim() || null,
        bank_branch_code: branchCode.trim() || null,
        invoice_notes: invoiceNotes.trim() || null,
      },
    });

    setBusy(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setSaved(true);
    router.refresh();
  }

  const vatChanged = vatRegistered !== settings.vat_registered;

  return (
    <form onSubmit={submit} className="space-y-6">
      {error && (
        <p
          role="alert"
          className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-sm text-red-300"
        >
          {error}
        </p>
      )}

      {saved && (
        <p
          role="status"
          className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-2.5 text-sm text-emerald-300"
        >
          Saved. Every quote and invoice raised from now on uses these.
        </p>
      )}

      {/* ── VAT ───────────────────────────────────────────────────────────── */}
      <section className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
        <h2 className="mb-1 font-syne text-lg font-bold text-white">VAT</h2>
        <p className="mb-4 text-sm text-neutral-400">
          WL CreationX quotes exclude VAT. Until the studio is registered, nothing charges it.
        </p>

        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={vatRegistered}
            onChange={(event) => setVatRegistered(event.target.checked)}
            className="mt-1 h-4 w-4 cursor-pointer accent-[#FFD700]"
          />
          <span>
            <span className="block text-sm font-medium text-neutral-100">
              The studio is VAT registered
            </span>
            <span className="mt-0.5 block text-xs text-neutral-500">
              Switch this on only once SARS has issued the registration.
            </span>
          </span>
        </label>

        <p className="mt-4 rounded-lg border border-[#FFD700]/30 bg-[#FFD700]/[0.06] px-4 py-3 text-xs leading-relaxed text-[#FFD700]">
          Turning VAT on or off changes every <strong>new</strong> quote and invoice from the moment
          you save. Documents already raised keep the rate they were issued at and their totals do
          not move — they are tax records, not a live view of this page.
          {vatChanged && (
            <span className="mt-2 block font-medium">
              You are about to{' '}
              {vatRegistered ? 'start charging VAT' : 'stop charging VAT'} on new documents.
            </span>
          )}
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className={LABEL} htmlFor="vat-number">
              VAT registration number
            </label>
            <input
              id="vat-number"
              className={INPUT}
              value={vatNumber}
              onChange={(event) => setVatNumber(event.target.value)}
              placeholder="4123456789"
              inputMode="numeric"
            />
            <p className="mt-1 text-xs text-neutral-500">Printed on every tax invoice.</p>
          </div>

          <div>
            <label className={LABEL} htmlFor="vat-rate">
              VAT rate (%)
            </label>
            <input
              id="vat-rate"
              className={INPUT}
              type="number"
              step="0.5"
              min="0"
              max="100"
              value={vatRate}
              onChange={(event) => setVatRate(event.target.value)}
            />
            <p className="mt-1 text-xs text-neutral-500">
              The South African standard rate is 15%.
            </p>
          </div>
        </div>
      </section>

      {/* ── Quoting and billing terms ─────────────────────────────────────── */}
      <section className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
        <h2 className="mb-1 font-syne text-lg font-bold text-white">Quoting and billing</h2>
        <p className="mb-4 text-sm text-neutral-400">
          The defaults a new document starts from. Each one can still be overridden on the document
          itself.
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className={LABEL} htmlFor="validity-days">
              Quote valid for (days)
            </label>
            <input
              id="validity-days"
              className={INPUT}
              type="number"
              step="1"
              min="1"
              value={validityDays}
              onChange={(event) => setValidityDays(event.target.value)}
            />
          </div>

          <div>
            <label className={LABEL} htmlFor="deposit-percent">
              Deposit (%)
            </label>
            <input
              id="deposit-percent"
              className={INPUT}
              type="number"
              step="1"
              min="0"
              max="100"
              value={depositPercent}
              onChange={(event) => setDepositPercent(event.target.value)}
            />
            <p className="mt-1 text-xs text-neutral-500">Taken off the ex-VAT subtotal.</p>
          </div>

          <div>
            <label className={LABEL} htmlFor="terms-days">
              Payment terms (days)
            </label>
            <input
              id="terms-days"
              className={INPUT}
              type="number"
              step="1"
              min="0"
              value={termsDays}
              onChange={(event) => setTermsDays(event.target.value)}
            />
            <p className="mt-1 text-xs text-neutral-500">Sets the due date on a new invoice.</p>
          </div>
        </div>
      </section>

      {/* ── Banking ───────────────────────────────────────────────────────── */}
      <section className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
        <h2 className="mb-1 font-syne text-lg font-bold text-white">Banking details</h2>
        <p className="mb-4 text-sm text-neutral-400">
          Printed on every invoice that still has a balance due.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={LABEL} htmlFor="account-name">
              Account name
            </label>
            <input
              id="account-name"
              className={INPUT}
              value={accountName}
              onChange={(event) => setAccountName(event.target.value)}
              placeholder="WL CreationX"
            />
          </div>

          <div>
            <label className={LABEL} htmlFor="bank-name">
              Bank
            </label>
            <input
              id="bank-name"
              className={INPUT}
              value={bankName}
              onChange={(event) => setBankName(event.target.value)}
              placeholder="FNB"
            />
          </div>

          <div>
            <label className={LABEL} htmlFor="account-number">
              Account number
            </label>
            <input
              id="account-number"
              className={INPUT}
              value={accountNumber}
              onChange={(event) => setAccountNumber(event.target.value)}
              inputMode="numeric"
            />
          </div>

          <div>
            <label className={LABEL} htmlFor="branch-code">
              Branch code
            </label>
            <input
              id="branch-code"
              className={INPUT}
              value={branchCode}
              onChange={(event) => setBranchCode(event.target.value)}
              inputMode="numeric"
              placeholder="250655"
            />
          </div>
        </div>
      </section>

      {/* ── Invoice footer ────────────────────────────────────────────────── */}
      <section className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
        <h2 className="mb-1 font-syne text-lg font-bold text-white">Invoice notes</h2>
        <p className="mb-4 text-sm text-neutral-400">
          Added to the foot of a new invoice when nothing more specific is written on it.
        </p>

        <label className="sr-only" htmlFor="invoice-notes">
          Invoice notes
        </label>
        <textarea
          id="invoice-notes"
          className={INPUT + ' min-h-24 resize-y'}
          value={invoiceNotes}
          onChange={(event) => setInvoiceNotes(event.target.value)}
          placeholder="Payment is due within the agreed terms. Files are released on final payment."
        />
      </section>

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className={BTN} disabled={busy}>
          {busy ? 'Saving…' : 'Save settings'}
        </button>
        <p className="text-xs text-neutral-500">
          Existing quotes and invoices are untouched by anything on this page.
        </p>
      </div>
    </form>
  );
}
