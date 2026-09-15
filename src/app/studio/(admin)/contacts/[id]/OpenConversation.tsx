'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BTN_GHOST } from '@/components/crm/ui';
import { postCrm } from '../../deals/crm-post';

/**
 * Start talking to somebody who has never emailed us.
 *
 * A conversation hangs off a lead, and a contact added by hand has none, so
 * there is nothing to open. This writes the missing pieces on the first click
 * rather than making the studio create a fake enquiry to be able to send an
 * email — which is what it would otherwise have to do.
 */
export default function OpenConversation({ contactId }: { contactId: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function open() {
    if (busy) return;
    setBusy(true);
    setError(null);

    const result = await postCrm<{ threadId?: string }>({
      action: 'start-conversation',
      contactId,
    });

    if (!result.ok || !result.data.threadId) {
      setBusy(false);
      setError(result.ok ? 'That conversation could not be opened.' : result.error);
      return;
    }

    router.push(`/studio/messages/${result.data.threadId}`);
  }

  return (
    <>
      <button type="button" className={BTN_GHOST} disabled={busy} onClick={() => void open()}>
        {busy ? 'Opening…' : 'Email this client'}
      </button>
      {error && (
        <p role="alert" className="mt-2 w-full text-sm text-red-300">
          {error}
        </p>
      )}
    </>
  );
}
