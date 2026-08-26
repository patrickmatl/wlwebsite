import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Card, PageHeader } from '@/components/crm/ui';
import { getSession } from '@/lib/server/auth';
import { listCompanies } from '@/lib/server/crm';
import ContactForm, { BLANK_CONTACT } from '../ContactForm';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'New contact',
  robots: { index: false, follow: false },
};

export default async function NewContactPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await getSession('admin');
  if (!session) redirect('/studio/login');

  const params = await searchParams;
  // Arriving from a company record pre-selects that company, so adding the
  // second person at a client is one click rather than a search.
  const companyId = (Array.isArray(params.company) ? params.company[0] : params.company) ?? '';

  const companies = await listCompanies({ limit: 500 });
  const preselected = companies.some((c) => c.id === companyId) ? companyId : '';

  return (
    <>
      <PageHeader
        title="New contact"
        subtitle="One person, one email address. Enquiries from the site create their own."
      />

      <div className="mb-4">
        <Link
          href="/studio/contacts"
          className="text-xs text-neutral-400 underline underline-offset-4 hover:text-white"
        >
          Back to contacts
        </Link>
      </div>

      <Card className="max-w-3xl">
        <ContactForm
          mode="create"
          companies={companies.map((c) => ({ id: c.id, name: c.name }))}
          initial={{ ...BLANK_CONTACT, company_id: preselected }}
          cancelHref="/studio/contacts"
        />
      </Card>
    </>
  );
}
