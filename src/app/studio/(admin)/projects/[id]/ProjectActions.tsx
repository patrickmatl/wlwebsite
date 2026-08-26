'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BTN, BTN_GHOST } from '@/components/crm/ui';
import { PROJECT_STATUSES, type ProjectStatus } from '@/lib/crm/types';
import { postCrm } from '../../deals/crm-post';

/**
 * What the studio can do to a project from here.
 *
 * The disabled rules mirror the guards in src/lib/server/crm.ts rather than
 * standing in for them — the server is still the authority, and a stale page
 * that gets past a greyed-out button comes back with the real refusal.
 */
export default function ProjectActions({
  projectId,
  status,
  quoteId,
  quoteNumber,
  balanceInvoiceId,
}: {
  projectId: string;
  status: ProjectStatus;
  /** Null when the project was opened by hand rather than from a quote. */
  quoteId: string | null;
  quoteNumber: string | null;
  /** Set once a balance invoice exists, so the button links instead of raising a second. */
  balanceInvoiceId: string | null;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function run(
    key: string,
    payload: Record<string, unknown>,
    onDone?: (data: Record<string, unknown>) => void,
  ) {
    if (busy) return;
    setBusy(key);
    setError(null);

    const result = await postCrm(payload);

    if (!result.ok) {
      setBusy(null);
      setError(result.error);
      return;
    }

    if (onDone) {
      onDone(result.data);
      // The button stays disabled through the navigation that follows.
      return;
    }

    setBusy(null);
    router.refresh();
  }

  function goToInvoice(data: Record<string, unknown>) {
    const invoice = data.invoice as { id?: string } | undefined;
    router.push(invoice?.id ? '/studio/invoices/' + invoice.id : '/studio/invoices');
    router.refresh();
  }

  const delivered = status === 'delivered';
  const cancelled = status === 'cancelled';

  return (
    <div className="space-y-4">
      {error && (
        <p
          role="alert"
          className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-sm text-red-300"
        >
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label
            className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-neutral-400"
            htmlFor="project-status"
          >
            Status
          </label>
          <select
            id="project-status"
            value={status}
            disabled={busy !== null}
            onChange={(event) =>
              void run('status', {
                action: 'set-project-status',
                projectId,
                status: event.target.value as ProjectStatus,
              })
            }
            className="rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700]/40 disabled:opacity-50"
          >
            {PROJECT_STATUSES.map((option) => (
              <option key={option.id} value={option.id} className="bg-black">
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {busy === 'status' && <p className="pb-2 text-xs text-neutral-500">Saving…</p>}
      </div>

      <div className="flex flex-wrap gap-3 border-t border-white/10 pt-4">
        <button
          type="button"
          className={BTN}
          disabled={busy !== null || delivered || cancelled}
          onClick={() =>
            void run('deliver', {
              action: 'set-project-status',
              projectId,
              status: 'delivered',
            })
          }
          title={
            delivered
              ? 'Already delivered'
              : cancelled
                ? 'This project was cancelled'
                : undefined
          }
        >
          {busy === 'deliver' ? 'Marking…' : delivered ? 'Delivered' : 'Mark delivered'}
        </button>

        <button
          type="button"
          className={BTN_GHOST}
          disabled={busy !== null || (!quoteId && !balanceInvoiceId)}
          onClick={() => {
            if (balanceInvoiceId) {
              router.push('/studio/invoices/' + balanceInvoiceId);
              return;
            }
            if (!quoteId) return;
            void run(
              'balance',
              { action: 'balance-invoice-from-quote', quoteId },
              goToInvoice,
            );
          }}
          title={
            quoteId
              ? 'Invoices whatever of quote ' + (quoteNumber ?? '') + ' is not yet on an invoice'
              : 'This project was not opened from a quote, so there is nothing to bill the balance against'
          }
        >
          {busy === 'balance'
            ? 'Raising…'
            : balanceInvoiceId
              ? 'Go to the balance invoice'
              : 'Raise the balance invoice'}
        </button>
      </div>

      {!quoteId && !balanceInvoiceId && (
        <p className="text-xs text-neutral-500">
          The balance is worked out from the quote this project came from. Raise an invoice by hand
          from the client instead.
        </p>
      )}
    </div>
  );
}
