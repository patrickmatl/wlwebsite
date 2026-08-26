import type { InvoiceKind } from '@/lib/crm/types';

/**
 * What an invoice is for, in the words a client would use.
 *
 * Its own module rather than a constant in the list page: Next rejects any
 * export from a page file that is not one of its own config fields.
 */
export const KIND_LABELS: Record<InvoiceKind, string> = {
  deposit: 'Deposit',
  balance: 'Balance',
  full: 'Full amount',
  additional: 'Additional work',
};

/** The same idea, as a document heading. */
export const KIND_HEADINGS: Record<InvoiceKind, string> = {
  deposit: 'Deposit invoice',
  balance: 'Balance invoice',
  full: 'Invoice',
  additional: 'Invoice for additional work',
};
