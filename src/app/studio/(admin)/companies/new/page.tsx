import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Card, PageHeader } from '@/components/crm/ui';
import { getSession } from '@/lib/server/auth';
import CompanyForm from '../CompanyForm';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'New company',
  robots: { index: false, follow: false },
};

export default async function NewCompanyPage() {
  const session = await getSession('admin');
  if (!session) redirect('/studio/login');

  return (
    <>
      <PageHeader
        title="New company"
        subtitle="The business behind the people — where their deals, projects and invoices add up."
      />

      <div className="mb-4">
        <Link
          href="/studio/companies"
          className="text-xs text-neutral-400 underline underline-offset-4 hover:text-white"
        >
          Back to companies
        </Link>
      </div>

      <Card className="max-w-3xl">
        <CompanyForm mode="create" cancelHref="/studio/companies" />
      </Card>
    </>
  );
}
