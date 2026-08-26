'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BTN, INPUT } from '@/components/crm/ui';

/**
 * The note box on a company record.
 *
 * Deliberately a twin of the one on a contact rather than a shared import:
 * these are route-local islands, and the CRM's shared components live in
 * @/components/crm/ui. The write goes through /api/crm, where the admin session
 * is checked.
 */
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

    try {
      const res = await fetch('/api/crm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add-note',
          entityType: 'company',
          entityId,
          body: text,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as Record<string, unknown>;
      setSaving(false);

      if (!res.ok) {
        setError(typeof json.error === 'string' ? json.error : 'That did not go through.');
        return;
      }

      setBody('');
      router.refresh();
    } catch {
      setSaving(false);
      setError('No connection to the studio. Try again in a moment.');
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <label htmlFor="company-note-body" className="sr-only">
        Add a note
      </label>
      <textarea
        id="company-note-body"
        rows={3}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="How they like to work, who signs off, what was agreed."
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
