'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { BTN, INPUT, LABEL, formatDate } from '@/components/crm/ui';
import type { Task } from '@/lib/crm/types';
import { postCrm } from '../deals/crm-post';

/** What a task hangs off, resolved on the server so this list can just render it. */
export type TaskLink = { label: string; href: string | null };

const PRIORITIES: { id: 'low' | 'normal' | 'high'; label: string }[] = [
  { id: 'low', label: 'Low' },
  { id: 'normal', label: 'Normal' },
  { id: 'high', label: 'High' },
];

/** Today in South Africa, so a task due today is not already red at 02:00 UTC. */
function todayISO(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Johannesburg' }).format(new Date());
}

export default function TaskList({
  open,
  done,
  links,
}: {
  open: Task[];
  done: Task[];
  links: Record<string, TaskLink>;
}) {
  const router = useRouter();

  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showDone, setShowDone] = useState(false);

  const [title, setTitle] = useState('');
  const [dueAt, setDueAt] = useState('');
  const [priority, setPriority] = useState<'low' | 'normal' | 'high'>('normal');

  const today = todayISO();

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
      action: 'create-task',
      title: text,
      dueAt: dueAt || null,
      priority,
    });

    if (ok) {
      setTitle('');
      setDueAt('');
      setPriority('normal');
    }
  }

  function linkFor(task: Task): TaskLink | null {
    if (!task.entity_type || !task.entity_id) return null;
    return links[task.entity_type + ':' + task.entity_id] ?? null;
  }

  function row(task: Task, complete: boolean) {
    const late = !complete && task.due_at !== null && task.due_at < today;
    const dueToday = !complete && task.due_at === today;
    const link = linkFor(task);

    return (
      <li
        key={task.id}
        className={
          'flex items-start gap-3 rounded-lg border p-3 transition ' +
          (late
            ? 'border-red-500/40 bg-red-500/[0.07]'
            : 'border-white/10 bg-black/30')
        }
      >
        <input
          type="checkbox"
          checked={complete}
          disabled={busy !== null}
          aria-label={complete ? 'Reopen ' + task.title : 'Complete ' + task.title}
          onChange={() =>
            void run(task.id, {
              action: complete ? 'reopen-task' : 'complete-task',
              taskId: task.id,
            })
          }
          className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#FFD700]"
        />

        <div className="min-w-0 flex-1">
          <p
            className={
              'text-sm ' + (complete ? 'text-neutral-500 line-through' : 'text-neutral-100')
            }
          >
            {task.title}
            {task.priority === 'high' && !complete && (
              <span className="ml-2 rounded-full border border-red-500/40 px-2 py-0.5 text-[11px] font-medium text-red-300">
                High
              </span>
            )}
          </p>

          {task.notes && (
            <p className="mt-0.5 whitespace-pre-wrap text-xs text-neutral-500">{task.notes}</p>
          )}

          <p className="mt-1 flex flex-wrap items-center gap-x-2 text-xs text-neutral-500">
            <span className={late ? 'font-medium text-red-300' : dueToday ? 'text-[#FFD700]' : ''}>
              {task.due_at
                ? late
                  ? 'Overdue · ' + formatDate(task.due_at)
                  : dueToday
                    ? 'Due today'
                    : 'Due ' + formatDate(task.due_at)
                : 'No date'}
            </span>

            {link && (
              <>
                <span aria-hidden>·</span>
                {link.href ? (
                  <Link href={link.href} className="text-neutral-400 hover:text-[#FFD700]">
                    {link.label}
                  </Link>
                ) : (
                  <span>{link.label}</span>
                )}
              </>
            )}

            {task.assigned_to && (
              <>
                <span aria-hidden>·</span>
                <span>{task.assigned_to}</span>
              </>
            )}
          </p>
        </div>

        <button
          type="button"
          disabled={busy !== null}
          onClick={() => {
            if (window.confirm('Delete the task "' + task.title + '"?')) {
              void run('delete-' + task.id, { action: 'delete-task', taskId: task.id });
            }
          }}
          aria-label={'Delete ' + task.title}
          className="shrink-0 rounded-md border border-white/15 px-2 py-1 text-xs text-neutral-500 transition hover:border-red-500/40 hover:text-red-300 disabled:opacity-40"
        >
          &times;
        </button>
      </li>
    );
  }

  const overdue = open.filter((t) => t.due_at !== null && t.due_at < today).length;

  return (
    <div className="space-y-6">
      {error && (
        <p
          role="alert"
          className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-sm text-red-300"
        >
          {error}
        </p>
      )}

      {/* ── Quick add ─────────────────────────────────────────────────────── */}
      <form onSubmit={add} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
        <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto]">
          <div>
            <label className={LABEL} htmlFor="task-title">
              What needs doing?
            </label>
            <input
              id="task-title"
              className={INPUT}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Send the Kruger logo files"
              required
            />
          </div>

          <div>
            <label className={LABEL} htmlFor="task-due">
              Due
            </label>
            <input
              id="task-due"
              type="date"
              className={INPUT}
              value={dueAt}
              onChange={(event) => setDueAt(event.target.value)}
            />
          </div>

          <div>
            <label className={LABEL} htmlFor="task-priority">
              Priority
            </label>
            <select
              id="task-priority"
              className={INPUT}
              value={priority}
              onChange={(event) =>
                setPriority(event.target.value as 'low' | 'normal' | 'high')
              }
            >
              {PRIORITIES.map((option) => (
                <option key={option.id} value={option.id} className="bg-black">
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" className={BTN + ' mt-4'} disabled={busy !== null || !title.trim()}>
          {busy === 'add' ? 'Adding…' : 'Add task'}
        </button>
      </form>

      {/* ── Open ──────────────────────────────────────────────────────────── */}
      <div>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-neutral-400">
            {open.length} open
            {overdue > 0 && (
              <span className="text-red-300">
                {' '}
                · {overdue} overdue
              </span>
            )}
          </p>

          <label className="flex items-center gap-2 text-sm text-neutral-400">
            <input
              type="checkbox"
              checked={showDone}
              onChange={(event) => setShowDone(event.target.checked)}
              className="h-4 w-4 cursor-pointer accent-[#FFD700]"
            />
            Show completed
          </label>
        </div>

        {open.length === 0 ? (
          <p className="rounded-xl border border-dashed border-white/15 px-6 py-12 text-center text-sm text-neutral-400">
            Nothing owed to anyone. Enjoy it.
          </p>
        ) : (
          <ul className="space-y-2">{open.map((task) => row(task, false))}</ul>
        )}
      </div>

      {/* ── Completed ─────────────────────────────────────────────────────── */}
      {showDone && (
        <div>
          <p className="mb-3 text-sm text-neutral-400">
            {done.length} completed{done.length > 0 ? ' · most recent first' : ''}
          </p>

          {done.length === 0 ? (
            <p className="rounded-xl border border-dashed border-white/15 px-6 py-8 text-center text-sm text-neutral-500">
              Nothing ticked off yet.
            </p>
          ) : (
            <ul className="space-y-2">{done.map((task) => row(task, true))}</ul>
          )}
        </div>
      )}
    </div>
  );
}
