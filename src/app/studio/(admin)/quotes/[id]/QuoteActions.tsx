'use client';

import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { BTN, BTN_DANGER, BTN_GHOST, INPUT, LABEL } from '@/components/crm/ui';
import type { QuoteStatus } from '@/lib/crm/types';
import { postCrm } from '../../deals/crm-post';

/**
 * Everything that can be done to a quote from the studio side.
 *
 * The disabled rules deliberately mirror the guards in src/lib/server/crm.ts
 * rather than merely decorating them. The server is still the authority — a
 * greyed-out button is a courtesy, and a stale page that gets past it comes
 * back with the real refusal in the error strip.
 */

type Panel = 'accept' | 'decline' | null;

export default function QuoteActions({
  quoteId,
  status,
  subtotal,
  suggestedName,
  projectId,
  depositInvoiceId,
}: {
  quoteId: string;
  status: QuoteStatus;
  subtotal: number;
  /** Prefills the acceptance name — usually the contact who was quoted. */
  suggestedName: string;
  /** Set when a project already exists for this quote, so the button links instead. */
  projectId: string | null;
  depositInvoiceId: string | null;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [panel, setPanel] = useState<Panel>(null);
  const [name, setName] = useState(suggestedName);
  const [reason, setReason] = useState('');

  async function run(
    action: string,
    payload: Record<string, unknown> = {},
    onDone?: (data: Record<string, unknown>) => void,
  ) {
    if (busy) return;
    setBusy(action);
    setError(null);

    const result = await postCrm({ action, quoteId, ...payload });

    if (!result.ok) {
      setBusy(null);
      setError(result.error);
      return;
    }

    setPanel(null);
    setReason('');

    if (onDone) {
      onDone(result.data);
      // The button stays disabled through the navigation that follows.
      return;
    }

    setBusy(null);
    router.refresh();
  }

  function goToChild(key: 'project' | 'invoice', base: string) {
    return (data: Record<string, unknown>) => {
      const child = data[key] as { id?: string } | undefined;
      router.push(child?.id ? `${base}/${child.id}` : base);
      router.refresh();
    };
  }

  const sendable = status !== 'accepted' && status !== 'superseded';
  const acceptable = status === 'sent' || status === 'expired';
  const declinable = status !== 'accepted' && status !== 'declined' && status !== 'superseded';
  const supersedable = status !== 'accepted' && status !== 'superseded';
  const billable = status !== 'declined' && status !== 'superseded';

  return (
    <div className="space-y-3">
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
          onClick={() => void run('send-quote')}
          title={sendable ? undefined : `A ${status} quote cannot be sent again`}
        >
          {busy === 'send-quote'
            ? 'Sending…'
            : status === 'draft'
              ? 'Send to client'
              : 'Send again'}
        </button>

        <button
          type="button"
          className={BTN_GHOST}
          disabled={busy !== null || !acceptable}
          onClick={() => setPanel((open) => (open === 'accept' ? null : 'accept'))}
          title={
            status === 'draft' ? 'Send the quote before recording an acceptance' : undefined
          }
        >
          Mark accepted
        </button>

        <button
          type="button"
          className={BTN_GHOST}
          disabled={busy !== null || !declinable}
          onClick={() => setPanel((open) => (open === 'decline' ? null : 'decline'))}
        >
          Mark declined
        </button>

        <button
          type="button"
          className={BTN_GHOST}
          disabled={busy !== null || !supersedable}
          onClick={() => {
            if (
              window.confirm(
                'Supersede this quote? It stays on record but can no longer be accepted.',
              )
            ) {
              void run('supersede-quote');
            }
          }}
        >
          {busy === 'supersede-quote' ? 'Superseding…' : 'Supersede'}
        </button>
      </div>

      <div className="flex flex-wrap gap-3 border-t border-white/10 pt-3">
        <button
          type="button"
          className={BTN_GHOST}
          disabled={busy !== null || !billable}
          onClick={() =>
            void run('create-project-from-quote', {}, goToChild('project', '/studio/projects'))
          }
        >
          {busy === 'create-project-from-quote'
            ? 'Opening…'
            : projectId
              ? 'Go to the project'
              : 'Create a project'}
        </button>

        <button
          type="button"
          className={BTN_GHOST}
          disabled={busy !== null || !billable || subtotal <= 0}
          onClick={() =>
            void run('deposit-invoice-from-quote', {}, goToChild('invoice', '/studio/invoices'))
          }
          title={subtotal > 0 ? undefined : 'There is no priced work to take a deposit against'}
        >
          {busy === 'deposit-invoice-from-quote'
            ? 'Raising…'
            : depositInvoiceId
              ? 'Go to the deposit invoice'
              : 'Raise a deposit invoice'}
        </button>
      </div>

      {panel === 'accept' && (
        <form
          onSubmit={(event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            void run('accept-quote', { name: name.trim() || null });
          }}
          className="rounded-lg border border-emerald-500/30 bg-emerald-500/[0.06] p-4"
        >
          <label className={LABEL} htmlFor="accepted-by">
            Who accepted?
          </label>
          <input
            id="accepted-by"
            className={INPUT}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Name of the person who said yes"
            autoFocus
          />
          <p className="mt-1 text-xs text-neutral-500">
            Record this only for an acceptance that came by phone or email. A client accepting in
            the portal signs their own name and IP against it.
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            <button type="submit" className={BTN} disabled={busy !== null}>
              {busy === 'accept-quote' ? 'Saving…' : 'Record acceptance'}
            </button>
            <button
              type="button"
              className={BTN_GHOST}
              disabled={busy !== null}
              onClick={() => setPanel(null)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {panel === 'decline' && (
        <form
          onSubmit={(event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            void run('decline-quote', { reason: reason.trim() || null });
          }}
          className="rounded-lg border border-red-500/30 bg-red-500/[0.06] p-4"
        >
          <label className={LABEL} htmlFor="decline-reason">
            Why did they decline?
          </label>
          <textarea
            id="decline-reason"
            className={`${INPUT} min-h-20 resize-y`}
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            placeholder="Price was over budget — they asked for a lighter scope."
            autoFocus
          />
          <p className="mt-1 text-xs text-neutral-500">
            The deal stays open: a declined price is usually the start of a negotiation.
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            <button type="submit" className={BTN_DANGER} disabled={busy !== null}>
              {busy === 'decline-quote' ? 'Saving…' : 'Record decline'}
            </button>
            <button
              type="button"
              className={BTN_GHOST}
              disabled={busy !== null}
              onClick={() => setPanel(null)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
