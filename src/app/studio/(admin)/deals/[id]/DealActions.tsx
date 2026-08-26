'use client';

import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { BTN, BTN_DANGER, BTN_GHOST, INPUT } from '@/components/crm/ui';
import { DEAL_STAGES, type DealStage } from '@/lib/crm/types';
import { postCrm } from '../crm-post';

/**
 * Closing a deal and moving it along the pipeline.
 *
 * The lost reason is asked for inline rather than through window.prompt: it is
 * the one field on this page anybody re-reads six months later, and a native
 * prompt gives no room to write a sentence and no way to change your mind
 * halfway through typing it.
 */

export default function DealActions({
  dealId,
  stage,
}: {
  dealId: string;
  stage: DealStage;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [askingReason, setAskingReason] = useState(false);
  const [reason, setReason] = useState('');

  async function move(next: DealStage, options: { reason?: string } = {}) {
    if (busy) return;
    setBusy(next);
    setError(null);

    const result = await postCrm({
      action: 'move-deal-stage',
      dealId,
      stage: next,
      reason: options.reason ?? null,
    });

    setBusy(null);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setAskingReason(false);
    setReason('');
    router.refresh();
  }

  function onLost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void move('lost', { reason: reason.trim() || undefined });
  }

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

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          className={BTN}
          disabled={busy !== null || stage === 'won'}
          onClick={() => void move('won')}
        >
          {busy === 'won' ? 'Saving…' : stage === 'won' ? 'Won' : 'Mark won'}
        </button>

        <button
          type="button"
          className={BTN_DANGER}
          disabled={busy !== null}
          onClick={() => setAskingReason((open) => !open)}
        >
          {stage === 'lost' ? 'Change the lost reason' : 'Mark lost'}
        </button>

        <label className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wide text-neutral-400">Stage</span>
          <select
            value={stage}
            disabled={busy !== null}
            onChange={(event) => {
              const next = event.target.value as DealStage;
              // Losing a deal always goes through the reason panel, whichever
              // control started it.
              if (next === 'lost') setAskingReason(true);
              else void move(next);
            }}
            className="rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-[#FFD700] disabled:opacity-50"
          >
            {DEAL_STAGES.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {askingReason && (
        <form
          onSubmit={onLost}
          className="rounded-lg border border-red-500/30 bg-red-500/[0.06] p-4"
        >
          <label className="block text-xs uppercase tracking-wide text-neutral-400" htmlFor="lost-reason">
            Why was it lost?
          </label>
          <textarea
            id="lost-reason"
            className={`${INPUT} mt-1.5 min-h-20 resize-y`}
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            placeholder="Went with a cheaper studio. Budget was R8k against our R14k."
            autoFocus
          />
          <p className="mt-1 text-xs text-neutral-500">
            Optional, but this is what makes the lost column worth reading later.
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            <button type="submit" className={BTN_DANGER} disabled={busy !== null}>
              {busy === 'lost' ? 'Saving…' : 'Mark lost'}
            </button>
            <button
              type="button"
              className={BTN_GHOST}
              disabled={busy !== null}
              onClick={() => {
                setAskingReason(false);
                setReason('');
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

/** Adding a note to the deal. Notes land on the timeline as well as the list. */
export function AddNoteForm({ dealId }: { dealId: string }) {
  const router = useRouter();
  const [body, setBody] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = body.trim();
    if (!text || saving) return;

    setSaving(true);
    setError(null);

    const result = await postCrm({
      action: 'add-note',
      entityType: 'deal',
      entityId: dealId,
      body: text,
    });

    setSaving(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setBody('');
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit}>
      {error && (
        <p role="alert" className="mb-2 text-sm text-red-300">
          {error}
        </p>
      )}
      <textarea
        className={`${INPUT} min-h-20 resize-y`}
        value={body}
        onChange={(event) => setBody(event.target.value)}
        placeholder="Called about the deadline — they need it before the expo on the 14th."
        aria-label="New note"
      />
      <button type="submit" className={`${BTN_GHOST} mt-2`} disabled={saving || !body.trim()}>
        {saving ? 'Adding…' : 'Add note'}
      </button>
    </form>
  );
}
