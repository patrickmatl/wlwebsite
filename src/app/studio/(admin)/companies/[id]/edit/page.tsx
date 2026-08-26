import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { Card, PageHeader } from '@/components/crm/ui';
import { getSession } from '@/lib/server/auth';
import { getCompany } from '@/lib/server/crm';
import CompanyForm from '../../CompanyForm';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Edit company',
  robots: { index: false, follow: false },
};

/**
 * The same form as the Details section of the record, on a page of its own.
 *
 * It is one component, so the two cannot disagree. This route exists because a
 * bookmark, a link from the list and a phone-sized screen all want the form
 * without the rest of the record around it.
 */
export default async function EditCompanyPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getSession('admin');
  if (!session) redirect('/studio/login');

  const { id } = await params;
  const company = await getCompany(id);
  if (!company) notFound();

  const record = `/studio/companies/${company.id}`;

  return (
    <>
      <div className="mb-4">
        <Link
          href={record}
          className="text-xs text-neutral-400 underline underline-offset-4 hover:text-white"
        >
          Back to {company.name}
        </Link>
      </div>

      <PageHeader title="Edit company" subtitle={company.name} />

      <Card className="max-w-3xl">
        <CompanyForm
          mode="edit"
          companyId={company.id}
          initial={{
            name: company.name,
            trading_name: company.trading_name ?? '',
            registration_number: company.registration_number ?? '',
            vat_number: company.vat_number ?? '',
            industry: company.industry ?? '',
            website: company.website ?? '',
            email: company.email ?? '',
            phone: company.phone ?? '',
            address_line1: company.address_line1 ?? '',
            suburb: company.suburb ?? '',
            city: company.city ?? '',
            province: company.province ?? '',
            postal_code: company.postal_code ?? '',
            country: company.country,
            notes: company.notes ?? '',
          }}
          cancelHref={record}
          doneHref={record}
        />
      </Card>
    </>
  );
}
