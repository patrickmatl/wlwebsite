'use client';

import { BTN_GHOST } from '@/components/crm/ui';

/**
 * Printing is the client's own path to a PDF — the browser's "save as PDF" is
 * always available, needs no server round trip, and produces a file with their
 * own name on it. The portal deliberately does not generate one itself.
 */
export default function PrintButton({ label = 'Print or save as PDF' }: { label?: string }) {
  return (
    <button type="button" onClick={() => window.print()} className={BTN_GHOST}>
      {label}
    </button>
  );
}
