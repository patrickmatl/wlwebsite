'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BTN, BTN_DANGER, BTN_GHOST, INPUT } from '@/components/crm/ui';

/**
 * The interactive corners of a contact record.
 *
 * Two small islands rather than a client page: the record itself stays a server
 * component so nothing about the contact reaches the browser except what is
 * rendered, and every write goes through /api/crm where the admin session is
 * checked again.
 */

async function post(body: Record<string, unknown>): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch('/api/crm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const json = (await res.json().catch(() => ({}))) as Record<string, unknown>;
    if (res.ok) return { ok: true };
    return {
      ok: false,
      error: typeof json.error === 'string' ? json.error : 'That did not go through.',
    };
  } catch {
    return { ok: false, error: 'No connection to the studio. Try again in a moment.' };
  }
}

export function PortalControls({
  contactId,
  email,
  portalEnabled,
  archived,
}: {
  contactId: string;
  email: string;
  portalEnabled: boolean;
  archived: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState<'toggle' | 'invite' | null>(null);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function toggle() {
    setBusy('toggle');
    setError(null);
    // portal_enabled is an ordinary column on the contact, so switching access
    // is the same patch as any other edit rather than a special endpoint.
    const result = await post({
      action: 'update-contact',
      id: contactId,
      portal_enabled: !portalEnabled,
    });
    setBusy(null);
    if (!result.ok) {
      setError(result.error ?? null);
      return;
    }
    setSent(false);
    router.refresh();
  }

  async function invite() {
    setBusy('invite');
    setError(null);
    const result = await post({ action: 'send-portal-invite', contactId });
    setBusy(null);
    if (!result.ok) {
      setError(result.error ?? null);
      return;
    }
    setSent(true);
    router.refresh();
  }

  return (
    <div className="space-y-3">
      <p className="text-sm leading-relaxed text-neutral-400">
        {archived
          ? 'This contact is archived, so they cannot sign in. Restore them to reopen the portal.'
          : portalEnabled
            ? 'They can sign in at the client portal to read their quotes, projects and invoices.'
            : 'The portal is closed to this contact. Any sign-in link they already hold will be refused.'}
      </p>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={toggle}
          disabled={busy !== null || archived}
          className={portalEnabled ? BTN_DANGER : BTN}
        >
          {busy === 'toggle'
            ? 'Saving…'
            : portalEnabled
              ? 'Disable portal access'
              : 'Enable portal access'}
        </button>

        <button
          type="button"
          onClick={invite}
          disabled={busy !== null || archived || !portalEnabled}
          className={BTN_GHOST}
        >
          {busy === 'invite' ? 'Sending…' : 'Email a sign-in link'}
        </button>
      </div>

      {!portalEnabled && !archived && (
        <p className="text-xs text-neutral-500">
          Turn access on before sending a link — a link for a disabled contact will not sign them
          in.
        </p>
      )}

      {sent && (
        <p className="text-sm text-emerald-300">
          A sign-in link is on its way to {email}. It works once and expires in 20 minutes.
        </p>
      )}

      {error && (
        <p role="alert" className="text-sm text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}

export function NoteComposer({ entityId }: { entityId: string }) {
  const router = useRouter();
  const [body, setBody] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    const text = body.trim();
    if (!text || saving) return;

    setSaving(true);
    setError(null);
    const result = await post({
      action: 'add-note',
      entityType: 'contact',
      entityId,
      body: text,
    });
    setSaving(false);

    if (!result.ok) {
      setError(result.error ?? null);
      return;
    }

    setBody('');
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <label htmlFor="note-body" className="sr-only">
        Add a note
      </label>
      <textarea
        id="note-body"
        rows={3}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="What was said, what was agreed, what to chase."
        className={INPUT}
      />
      <div className="flex items-center gap-3">
        <button type="submit" disabled={saving || body.trim() === ''} className={BTN}>
          {saving ? 'Saving…' : 'Add note'}
        </button>
        {error && (
          <span role="alert" className="text-sm text-red-300">
            {error}
          </span>
        )}
      </div>
    </form>
  );
}
