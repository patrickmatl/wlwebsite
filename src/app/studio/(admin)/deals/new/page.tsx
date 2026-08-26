import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { BTN_GHOST, PageHeader } from '@/components/crm/ui';
import { contactName } from '@/lib/crm/types';
import { getSession } from '@/lib/server/auth';
import { listCompanies, listContacts } from '@/lib/server/crm';
import DealForm, { type CompanyOption, type ContactOption } from './DealForm';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'New deal',
  robots: { index: false, follow: false },
};

/** searchParams values arrive as string | string[] | undefined. */
function one(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? '';
  return value ?? '';
}

export default async function NewDealPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await getSession('admin');
  if (!session) redirect('/studio/login');

  const [params, contacts, companies] = await Promise.all([
    searchParams,
    listContacts({ limit: 500 }),
    listCompanies({ limit: 500 }),
  ]);

  const contactOptions: ContactOption[] = contacts.map((contact) => ({
    id: contact.id,
    // The email disambiguates the two Thabo Molefes this book will eventually
    // hold, which a name alone cannot.
    label: `${contactName(contact)} · ${contact.email}`,
    companyId: contact.company_id,
  }));

  const companyOptions: CompanyOption[] = companies.map((company) => ({
    id: company.id,
    name: company.name,
  }));

  // A deal is often opened from a contact or company page, so those pages can
  // hand the client through in the URL. Ids that match nothing are dropped
  // rather than pre-selected into a broken form.
  const contactId = one(params.contactId);
  const companyId = one(params.companyId);

  return (
    <>
      <PageHeader
        title="New deal"
        subtitle="An opportunity worth tracking — a name and a stage is enough to start."
        action={
          <Link href="/studio/deals" className={BTN_GHOST}>
            Back to the board
          </Link>
        }
      />

      <div className="max-w-3xl">
        <DealForm
          contacts={contactOptions}
          companies={companyOptions}
          initial={{
            title: one(params.title),
            contactId: contactOptions.some((c) => c.id === contactId) ? contactId : '',
            companyId: companyOptions.some((c) => c.id === companyId) ? companyId : '',
            source: one(params.source),
          }}
        />
      </div>
    </>
  );
}
