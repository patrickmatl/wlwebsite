'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState, type FormEvent } from 'react';
import { BTN, BTN_GHOST, INPUT } from '@/components/crm/ui';
import { postCrm } from '../../deals/crm-post';

/**
 * Typing to a client.
 *
 * Attachments upload first and the message goes second, on purpose. The file
 * becomes a stored record the moment it lands, so a send that fails does not
 * take it with it, and the studio ends up holding exactly what the client
 * received rather than a note that something was attached.
 *
 * There is no formatting toolbar. This is an email to one person about their
 * job, and every studio message that has ever gone out of this system has been
 * plain paragraphs.
 */
export default function Composer({
  threadId,
  clientName,
  clientEmail,
  contactId,
}: {
  threadId: string;
  clientName: string;
  clientEmail: string;
  /** Attachments are filed against the person, so uploads need this. */
  contactId: string | null;
}) {
  const router = useRouter();
  const fileInput = useRef<HTMLInputElement | null>(null);
  const [body, setBody] = useState('');
  const [chosen, setChosen] = useState<File[]>([]);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState<string | null>(null);

  function pick(event: { target: HTMLInputElement }) {
    setChosen([...(event.target.files ?? [])]);
    setSent(null);
    setError(null);
  }

  function clearFiles() {
    setChosen([]);
    if (fileInput.current) fileInput.current.value = '';
  }

  async function upload(): Promise<string[]> {
    if (chosen.length === 0) return [];

    const form = new FormData();
    if (contactId) form.set('contactId', contactId);
    for (const file of chosen) form.append('file', file);

    const res = await fetch('/api/studio/files', { method: 'POST', body: form });
    const data = (await res.json().catch(() => ({}))) as {
      files?: { id: string }[];
      error?: string;
    };

    if (!res.ok) throw new Error(data.error ?? `That upload did not go through (${res.status}).`);
    return (data.files ?? []).map((f) => f.id);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = body.trim();
    if (!text || busy) return;

    setError(null);
    setSent(null);

    let fileIds: string[] = [];
    if (chosen.length > 0) {
      setBusy('upload');
      try {
        fileIds = await upload();
      } catch (err) {
        setBusy(null);
        setError(err instanceof Error ? err.message : 'That upload did not go through.');
        return;
      }
    }

    setBusy('send');
    const result = await postCrm<{ attached?: string[] }>({
      action: 'send-message',
      threadId,
      body: text,
      fileIds,
    });
    setBusy(null);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setBody('');
    clearFiles();
    const count = result.data.attached?.length ?? 0;
    setSent(
      count > 0
        ? `Sent to ${clientEmail} with ${count} ${count === 1 ? 'attachment' : 'attachments'}.`
        : `Sent to ${clientEmail}.`,
    );
    router.refresh();
  }

  if (!clientEmail) {
    return (
      <p className="text-sm text-neutral-400">
        This conversation has no email address on it, so there is nowhere to reply to.
      </p>
    );
  }

  return (
    <form onSubmit={submit}>
      <p className="mb-2 text-sm text-neutral-400">
        Goes to <span className="text-neutral-200">{clientName}</span> at{' '}
        <span className="text-neutral-200">{clientEmail}</span>. Their reply comes back here.
      </p>

      <label className="sr-only" htmlFor="message-body">
        Your message
      </label>
      <textarea
        id="message-body"
        className={INPUT + ' min-h-32 resize-y'}
        value={body}
        onChange={(event) => setBody(event.target.value)}
        placeholder={
          'Hi there\n\nBefore I start on the redraw I need a few things from you — the ' +
          'exact company name, your brand colours, and the original logo file.'
        }
      />

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <label className={BTN_GHOST + ' cursor-pointer'}>
          Attach files
          <input
            ref={fileInput}
            type="file"
            multiple
            onChange={pick}
            className="sr-only"
          />
        </label>
        {chosen.length > 0 && (
          <>
            <span className="text-xs text-neutral-400">
              {chosen.map((f) => f.name).join(', ')}
            </span>
            <button type="button" onClick={clearFiles} className="text-xs text-neutral-500 underline underline-offset-4 hover:text-white">
              Remove
            </button>
          </>
        )}
      </div>

      {error && (
        <p role="alert" className="mt-2 text-sm text-red-300">
          {error}
        </p>
      )}
      {sent && <p className="mt-2 text-sm text-[#FFD700]">{sent}</p>}

      <button type="submit" className={BTN + ' mt-3'} disabled={busy !== null || !body.trim()}>
        {busy === 'upload' ? 'Attaching…' : busy === 'send' ? 'Sending…' : 'Send'}
      </button>
    </form>
  );
}
