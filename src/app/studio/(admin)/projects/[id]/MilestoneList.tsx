'use client';

import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { BTN, BTN_GHOST, INPUT, LABEL, formatDate } from '@/components/crm/ui';
import type { ProjectMilestone } from '@/lib/crm/types';
import { postCrm } from '../../deals/crm-post';

/**
 * The schedule the client watches.
 *
 * Order is edited with up/down rather than drag: this list gets worked on a
 * phone as often as at a desk, and a drag handle small enough to sit beside a
 * checkbox is a handle you miss. The local copy moves first so the row does not
 * wait on a round trip, and the server order is re-read on the refresh.
 */
export default function MilestoneList({
  projectId,
  milestones,
}: {
  projectId: string;
  milestones: ProjectMilestone[];
}) {
  const router = useRouter();

  // Reset the working copy whenever the server sends a new list. Comparing the
  // prop against what was last seen is React's own pattern for this; an effect
  // would render the stale order for a frame first.
  const [items, setItems] = useState<ProjectMilestone[]>(milestones);
  const [seen, setSeen] = useState<ProjectMilestone[]>(milestones);
  if (seen !== milestones) {
    setSeen(milestones);
    setItems(milestones);
  }

  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [dueAt, setDueAt] = useState('');
  const [clientVisible, setClientVisible] = useState(true);

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

  async function add(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = title.trim();
    if (!text) return;

    const ok = await run('add', {
      action: 'add-milestone',
      projectId,
      title: text,
      dueAt: dueAt || null,
      clientVisible,
    });

    if (ok) {
      setTitle('');
      setDueAt('');
      setClientVisible(true);
      setAdding(false);
    }
  }

  function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;

    const next = items.slice();
    const [moved] = next.splice(index, 1);
    next.splice(target, 0, moved);
    setItems(next);

    void run('reorder', {
      action: 'reorder-milestones',
      projectId,
      orderedIds: next.map((m) => m.id),
    });
  }

  const doneCount = items.filter((m) => m.status === 'done').length;

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

      {items.length === 0 ? (
        <p className="rounded-lg border border-dashed border-white/15 px-4 py-6 text-center text-sm text-neutral-400">
          No milestones yet. Break the work into the steps the client will watch.
        </p>
      ) : (
        <>
          <p className="text-xs text-neutral-500">
            {doneCount} of {items.length} complete
          </p>

          <ul className="space-y-2">
            {items.map((milestone, index) => {
              const isDone = milestone.status === 'done';

              return (
                <li
                  key={milestone.id}
                  className="flex items-start gap-3 rounded-lg border border-white/10 bg-black/30 p-3"
                >
                  <input
                    type="checkbox"
                    checked={isDone}
                    disabled={busy !== null}
                    aria-label={'Mark ' + milestone.title + (isDone ? ' not done' : ' done')}
                    onChange={() =>
                      void run('status-' + milestone.id, {
                        action: 'update-milestone',
                        milestoneId: milestone.id,
                        status: isDone ? 'pending' : 'done',
                      })
                    }
                    className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#FFD700]"
                  />

                  <div className="min-w-0 flex-1">
                    <p
                      className={
                        'text-sm ' +
                        (isDone ? 'text-neutral-500 line-through' : 'text-neutral-100')
                      }
                    >
                      {milestone.title}
                    </p>
                    <p className="mt-0.5 text-xs text-neutral-500">
                      {milestone.due_at ? 'Due ' + formatDate(milestone.due_at) : 'No date'}
                      {isDone && milestone.completed_at
                        ? ' · done ' + formatDate(milestone.completed_at)
                        : ''}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      type="button"
                      disabled={busy !== null}
                      onClick={() =>
                        void run('visible-' + milestone.id, {
                          action: 'update-milestone',
                          milestoneId: milestone.id,
                          clientVisible: !milestone.client_visible,
                        })
                      }
                      title={
                        milestone.client_visible
                          ? 'The client can see this step — hide it'
                          : 'Internal only — show it to the client'
                      }
                      className={
                        'rounded-md border px-2 py-1 text-[11px] font-medium transition disabled:opacity-50 ' +
                        (milestone.client_visible
                          ? 'border-[#FFD700]/40 bg-[#FFD700]/10 text-[#FFD700]'
                          : 'border-white/15 text-neutral-400 hover:text-white')
                      }
                    >
                      {milestone.client_visible ? 'Client' : 'Internal'}
                    </button>

                    <button
                      type="button"
                      disabled={busy !== null || index === 0}
                      onClick={() => move(index, -1)}
                      aria-label={'Move ' + milestone.title + ' up'}
                      className="rounded-md border border-white/15 px-2 py-1 text-xs text-neutral-400 transition hover:text-white disabled:opacity-30"
                    >
                      &uarr;
                    </button>

                    <button
                      type="button"
                      disabled={busy !== null || index === items.length - 1}
                      onClick={() => move(index, 1)}
                      aria-label={'Move ' + milestone.title + ' down'}
                      className="rounded-md border border-white/15 px-2 py-1 text-xs text-neutral-400 transition hover:text-white disabled:opacity-30"
                    >
                      &darr;
                    </button>

                    <button
                      type="button"
                      disabled={busy !== null}
                      onClick={() => {
                        if (window.confirm('Delete the milestone "' + milestone.title + '"?')) {
                          void run('delete-' + milestone.id, {
                            action: 'delete-milestone',
                            milestoneId: milestone.id,
                          });
                        }
                      }}
                      aria-label={'Delete ' + milestone.title}
                      className="rounded-md border border-white/15 px-2 py-1 text-xs text-neutral-500 transition hover:border-red-500/40 hover:text-red-300 disabled:opacity-30"
                    >
                      &times;
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}

      {adding ? (
        <form onSubmit={add} className="rounded-lg border border-white/10 bg-black/30 p-4">
          <label className={LABEL} htmlFor="milestone-title">
            Milestone
          </label>
          <input
            id="milestone-title"
            className={INPUT}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="First concepts to the client"
            autoFocus
            required
          />

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div>
              <label className={LABEL} htmlFor="milestone-due">
                Due date
              </label>
              <input
                id="milestone-due"
                type="date"
                className={INPUT}
                value={dueAt}
                onChange={(event) => setDueAt(event.target.value)}
              />
            </div>

            <label className="flex items-end gap-2 pb-2 text-sm text-neutral-300">
              <input
                type="checkbox"
                checked={clientVisible}
                onChange={(event) => setClientVisible(event.target.checked)}
                className="h-4 w-4 cursor-pointer accent-[#FFD700]"
              />
              Show this step in the client portal
            </label>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <button type="submit" className={BTN} disabled={busy !== null}>
              {busy === 'add' ? 'Adding…' : 'Add milestone'}
            </button>
            <button
              type="button"
              className={BTN_GHOST}
              disabled={busy !== null}
              onClick={() => setAdding(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          type="button"
          className={BTN_GHOST}
          disabled={busy !== null}
          onClick={() => setAdding(true)}
        >
          Add a milestone
        </button>
      )}
    </div>
  );
}
