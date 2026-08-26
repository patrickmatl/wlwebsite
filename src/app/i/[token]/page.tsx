import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { documentByShareToken } from '@/lib/server/documents';
import DocumentView from '@/components/crm/DocumentView';
import { BUSINESS } from '@/data/business';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Invoice',
  // A share link is unguessable but not secret enough to be indexed.
  robots: { index: false, follow: false },
};

/**
 * An invoice or pro forma, openable by anyone holding the link.
 *
 * Same idea as the shared quote: a client forwards it to whoever pays
 * without that person needing an account. Void and draft invoices are
 * unreachable, so only a genuinely issued document can be opened, and
 * banking details travel with it.
 */
export default async function SharedInvoicePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const doc = await documentByShareToken(token, BUSINESS.url);
  if (!doc || doc.kind === 'quote') notFound();

  return (
    <main className="min-h-screen bg-neutral-100 px-4 py-10 print:bg-white print:p-0">
      <DocumentView doc={doc} />

      <div className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-between gap-3 print:hidden">
        <a
          href={`/api/documents/share/${token}`}
          className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-semibold text-[#FFD700] transition hover:bg-black"
        >
          Download PDF
        </a>
        <p className="text-xs text-neutral-500">
          Questions? Reply to the email this came from, or call {BUSINESS.phoneDisplay}.
        </p>
      </div>
    </main>
  );
}
