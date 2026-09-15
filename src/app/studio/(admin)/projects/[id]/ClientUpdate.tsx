'use client';

import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { BTN, INPUT, relativeTime } from '@/components/crm/ui';
import type { Activity, ProjectMilestone } from '@/lib/crm/types';
import { postCrm } from '../../deals/crm-post';

/**
 * Updates the client actually receives.
 *
 * Deliberately separate from the notes card next to it, and the difference is
 * the whole point: a note is for the studio, an update is sent. Mixing them
 * into one box is how somebody eventually writes "client is being difficult
 * about the third revision" and emails it to the client.
 *
 * Ticking a milestone here is the honest way to move the stepper. The client
 * sees progress move at the same moment they are told why, rather than the bar
 * creeping forward with nobody told anything.
 */
export default function ClientUpdate({
  projectId,
  clientName,
  clientEmail,
  milestones,
  updates,
}: {
  projectId: string;
  clientName: string | null;
  clientEmail: string | null;
  milestones: ProjectMilestone[];
  updates: Activity[];
}) {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [milestoneId, setMilestoneId] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState<string | null>(null);

  const open = milestones.filter((m) => m.status !== 'done' && m.status !== 'skipped');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = message.trim();
    if (!text || busy) return;

    setBusy(true);
    setError(null);
    setSent(null);

    const result = await postCrm({
      action: 'send-project-update',
      projectId,
      message: text,
      completeMilestoneId: milestoneId || undefined,
    });

    setBusy(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setMessage('');
    setMilestoneId('');
    setSent(clientEmail ? `Sent to ${clientEmail}.` : 'Recorded — no email address on file.');
    router.refresh();
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-neutral-400">
        {clientEmail ? (
          <>
            Goes straight to <span className="text-neutral-200">{clientName ?? 'the client'}</span>{' '}
            at <span className="text-neutral-200">{clientEmail}</span>, and shows in their portal.
          </>
        ) : (
          <>
            This contact has no email address, so an update here is recorded on the timeline but
            not sent.
          </>
        )}
      </p>

      <form onSubmit={submit}>
        <label className="sr-only" htmlFor="client-update">
          Update for the client
        </label>
        <textarea
          id="client-update"
          className={INPUT + ' min-h-28 resize-y'}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={
            'Your deposit landed this morning, so I have started on the redraw. ' +
            'First concepts will be with you by the end of the week.'
          }
        />

        {open.length > 0 && (
          <div className="mt-3">
            <label
              htmlFor="complete-milestone"
              className="mb-1.5 block text-xs uppercase tracking-wide text-neutral-500"
            >
              Mark a stage done with this update (optional)
            </label>
            <select
              id="complete-milestone"
              className={INPUT}
              value={milestoneId}
              onChange={(event) => setMilestoneId(event.target.value)}
            >
              <option value="">Just send the message</option>
              {open.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.title}
                </option>
              ))}
            </select>
          </div>
        )}

        {error && (
          <p role="alert" className="mt-2 text-sm text-red-300">
            {error}
          </p>
        )}
        {sent && <p className="mt-2 text-sm text-[#FFD700]">{sent}</p>}

        <button type="submit" className={BTN + ' mt-3'} disabled={busy || !message.trim()}>
          {busy ? 'Sending…' : clientEmail ? 'Send update to client' : 'Record update'}
        </button>
      </form>

      {updates.length === 0 ? (
        <p className="border-t border-white/10 pt-4 text-sm text-neutral-500">
          The client has not been told anything yet.
        </p>
      ) : (
        <ul className="space-y-3 border-t border-white/10 pt-4">
          {updates.map((u) => (
            <li key={u.id} className="rounded-lg border border-white/10 bg-black/30 p-3">
              <p className="whitespace-pre-wrap text-sm text-neutral-200">{u.body}</p>
              <p className="mt-1.5 text-xs text-neutral-500">
                {u.title} · {relativeTime(u.created_at)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
