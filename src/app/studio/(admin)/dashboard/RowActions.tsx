'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { postCrm } from '../deals/crm-post';

/**
 * The things you would have opened the record to do, done from the row.
 *
 * "Needs attention" was a list of links: every item on it cost a page load to
 * reach, a click to act on, and the back button to return — and the four
 * actions that answer almost every row are one click each. Chasing six quiet
 * quotes was eighteen navigations. It is now six clicks without leaving the
 * page.
 *
 * Anything that cannot be undone from the same row asks first. Sending an email
 * is not undoable either, but it is what the button says it does, so a
 * confirmation there would only train the operator to dismiss dialogs.
 */

export type RowAction = {
  label: string;
  /** Replaces the label while the request is in flight. */
  busyLabel: string;
  /** Sent to /api/crm as-is; must carry its own `action`. */
  payload: Record<string, unknown>;
  /** Asked before anything is sent, for changes the row cannot take back. */
  confirm?: string;
  danger?: boolean;
  /** Replaces the whole button once it has run, for one-shot actions. */
  doneLabel?: string;
};

const PILL =
  'rounded-md border px-2.5 py-1 text-xs font-medium transition disabled:cursor-not-allowed disabled:opacity-40';
const PILL_QUIET = 'border-white/15 text-neutral-300 hover:border-white/35 hover:text-white';
const PILL_DANGER = 'border-red-500/30 text-red-300 hover:border-red-500/60 hover:bg-red-500/10';

export default function RowActions({ actions }: { actions: RowAction[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState<number | null>(null);
  const [done, setDone] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function run(index: number, action: RowAction) {
    if (busy !== null) return;
    if (action.confirm && !window.confirm(action.confirm)) return;

    setBusy(index);
    setError(null);

    const result = await postCrm(action.payload);

    setBusy(null);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    /**
     * The row usually disappears on refresh, because acting on it is what
     * takes it off the list. When it does not — a chase leaves the quote in
     * place for a week — the button says so rather than looking untouched.
     */
    if (action.doneLabel) setDone(index);
    router.refresh();
  }

  return (
    <div className="mt-1.5">
      <div className="flex flex-wrap gap-2">
        {actions.map((action, index) => (
          <button
            key={action.label}
            type="button"
            className={`${PILL} ${action.danger ? PILL_DANGER : PILL_QUIET}`}
            disabled={busy !== null || done === index}
            onClick={() => void run(index, action)}
          >
            {busy === index
              ? action.busyLabel
              : done === index && action.doneLabel
                ? action.doneLabel
                : action.label}
          </button>
        ))}
      </div>
      {error && (
        <p role="alert" className="mt-1.5 text-xs text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}
