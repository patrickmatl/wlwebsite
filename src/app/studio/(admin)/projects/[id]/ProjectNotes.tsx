'use client';

import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { BTN, INPUT, relativeTime } from '@/components/crm/ui';
import type { Note } from '@/lib/crm/types';
import { postCrm } from '../../deals/crm-post';

/**
 * Internal notes on a project.
 *
 * A note also lands on the timeline (addNote logs it), so this list and the
 * activity feed deliberately overlap: the notes card is where you write and
 * scan them, the timeline is where they sit in order against everything else
 * that happened.
 */
export default function ProjectNotes({
  projectId,
  notes,
}: {
  projectId: string;
  notes: Note[];
}) {
  const router = useRouter();
  const [body, setBody] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = body.trim();
    if (!text || busy) return;

    setBusy(true);
    setError(null);

    const result = await postCrm({
      action: 'add-note',
      entityType: 'project',
      entityId: projectId,
      body: text,
    });

    setBusy(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setBody('');
    router.refresh();
  }

  return (
    <div className="space-y-4">
      <form onSubmit={submit}>
        <label className="sr-only" htmlFor="project-note">
          Add a note
        </label>
        <textarea
          id="project-note"
          className={INPUT + ' min-h-20 resize-y'}
          value={body}
          onChange={(event) => setBody(event.target.value)}
          placeholder="Client asked for the logo mark to sit left of the wordmark."
        />

        {error && (
          <p role="alert" className="mt-2 text-sm text-red-300">
            {error}
          </p>
        )}

        <button type="submit" className={BTN + ' mt-3'} disabled={busy || !body.trim()}>
          {busy ? 'Saving…' : 'Add note'}
        </button>
      </form>

      {notes.length === 0 ? (
        <p className="border-t border-white/10 pt-4 text-sm text-neutral-500">
          Nothing written down yet.
        </p>
      ) : (
        <ul className="space-y-3 border-t border-white/10 pt-4">
          {notes.map((note) => (
            <li key={note.id} className="rounded-lg border border-white/10 bg-black/30 p-3">
              <p className="whitespace-pre-wrap text-sm text-neutral-200">{note.body}</p>
              <p className="mt-1.5 text-xs text-neutral-500">
                {note.author} · {relativeTime(note.created_at)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
