'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BTN, BTN_GHOST, INPUT, LABEL } from '@/components/crm/ui';
import { formatRand } from '@/lib/crm/types';
import { postPortal } from '../../../portal-post';

/**
 * Accepting or declining a quote.
 *
 * The two paths are deliberately not symmetrical. Accepting is a commitment
 * that the studio will act on — it books time and triggers a deposit invoice —
 * so it asks for a typed name and restates exactly what is being agreed to.
 * Declining is one click and a blank, optional box: a client who is not going
 * ahead should never have to justify themselves to a form.
 */
export default function QuoteDecision({
  quoteId,
  quoteNumber,
  total,
  hasOnRequest,
}: {
  quoteId: string;
  quoteNumber: string;
  total: number;
  hasOnRequest: boolean;
}) {
  const router = useRouter();
  const [mode, setMode] = useState<'idle' | 'accept' | 'decline'>('idle');
  const [name, setName] = useState('');
  const [reason, setReason] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<'accepted' | 'declined' | null>(null);

  async function accept(event: React.FormEvent) {
    event.preventDefault();
    if (name.trim().length < 2) return;

    setBusy(true);
    setError(null);

    const result = await postPortal({
      action: 'accept-quote',
      quoteId,
      name: name.trim(),
    });

    setBusy(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setDone('accepted');
    // The page re-renders from the server with the accepted state, which is
    // the version of the truth that matters — this component only reports it.
    router.refresh();
  }

  async function decline() {
    setBusy(true);
    setError(null);

    const result = await postPortal({
      action: 'decline-quote',
      quoteId,
      reason: reason.trim() || null,
    });

    setBusy(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setDone('declined');
    router.refresh();
  }

  if (done === 'accepted') {
    return (
      <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/[0.07] p-6">
        <p className="font-syne text-lg font-bold text-emerald-300">Accepted. Thank you.</p>
        <p className="mt-2 text-sm leading-relaxed text-neutral-200">
          {quoteNumber} is confirmed and the studio has been notified.
        </p>
      </div>
    );
  }

  if (done === 'declined') {
    return (
      <div className="rounded-xl border border-white/15 bg-white/[0.03] p-6">
        <p className="font-syne text-lg font-bold text-white">Noted — thank you for telling us.</p>
        <p className="mt-2 text-sm leading-relaxed text-neutral-300">
          We have marked {quoteNumber} declined. Nothing further happens, and there is nothing to
          pay. If the timing or the scope was the problem, say the word and we will put together
          something that fits better.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
      {mode === 'idle' ? (
        <>
          <h2 className="font-syne text-lg font-bold text-white">Ready to go ahead?</h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-neutral-400">
            Accepting confirms the scope above and books the studio time. Nothing is payable at
            this moment — a deposit invoice follows separately.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button type="button" onClick={() => setMode('accept')} className={BTN}>
              Accept this quote
            </button>
            <button
              type="button"
              onClick={() => setMode('decline')}
              className="text-sm text-neutral-400 underline underline-offset-4 transition hover:text-white"
            >
              No thanks, decline it
            </button>
          </div>
        </>
      ) : null}

      {mode === 'accept' ? (
        <form onSubmit={accept}>
          <h2 className="font-syne text-lg font-bold text-[#FFD700]">Confirm your acceptance</h2>

          <div className="mt-4 rounded-lg border border-[#FFD700]/25 bg-[#FFD700]/[0.05] p-4">
            <p className="text-sm leading-relaxed text-neutral-200">
              You are accepting{' '}
              <span className="font-semibold text-white">{quoteNumber}</span> for{' '}
              <span className="font-syne font-bold text-[#FFD700]">{formatRand(total)}</span>
              {hasOnRequest ? ', plus the items marked on request once they are scoped' : ''}.
            </p>
            <ul className="mt-3 space-y-1.5 text-xs leading-relaxed text-neutral-400">
              <li>· The brief and scope set out above are confirmed as written.</li>
              <li>· We reserve studio time and start on the agreed date.</li>
              <li>· A deposit invoice follows by email — nothing is payable right now.</li>
            </ul>
          </div>

          <div className="mt-5">
            <label htmlFor="accept-name" className={LABEL}>
              Type your full name to confirm
            </label>
            <input
              id="accept-name"
              name="name"
              type="text"
              autoComplete="name"
              autoFocus
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your full name"
              className={INPUT}
            />
            <p className="mt-1.5 text-xs text-neutral-500">
              Your name and the date are recorded against this quote as your agreement to it.
            </p>
          </div>

          {error ? (
            <p
              role="alert"
              className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300"
            >
              {error}
            </p>
          ) : null}

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button type="submit" disabled={busy || name.trim().length < 2} className={BTN}>
              {busy ? 'Confirming…' : `Accept ${quoteNumber}`}
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('idle');
                setError(null);
              }}
              disabled={busy}
              className="text-sm text-neutral-400 underline underline-offset-4 transition hover:text-white disabled:opacity-50"
            >
              Not yet
            </button>
          </div>
        </form>
      ) : null}

      {mode === 'decline' ? (
        <div>
          <h2 className="font-syne text-lg font-bold text-white">Decline this quote</h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-neutral-400">
            That is completely fine — no hard feelings and nothing to pay. If there is something
            you would like us to know, the box is there; leaving it blank is just as welcome.
          </p>

          <div className="mt-4">
            <label htmlFor="decline-reason" className={LABEL}>
              Anything you would like to tell us? (optional)
            </label>
            <textarea
              id="decline-reason"
              name="reason"
              rows={3}
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              placeholder="Budget, timing, went another way — whatever it is, it helps us."
              className={`${INPUT} resize-y`}
            />
          </div>

          {error ? (
            <p
              role="alert"
              className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300"
            >
              {error}
            </p>
          ) : null}

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button type="button" onClick={decline} disabled={busy} className={BTN_GHOST}>
              {busy ? 'Sending…' : 'Decline this quote'}
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('idle');
                setError(null);
              }}
              disabled={busy}
              className="text-sm text-neutral-400 underline underline-offset-4 transition hover:text-white disabled:opacity-50"
            >
              Never mind
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
