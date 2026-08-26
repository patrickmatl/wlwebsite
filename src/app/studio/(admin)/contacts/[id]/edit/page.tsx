import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { Card, PageHeader } from '@/components/crm/ui';
import { contactName } from '@/lib/crm/types';
import { getSession } from '@/lib/server/auth';
import { getContact, listCompanies } from '@/lib/server/crm';
import ContactForm from '../../ContactForm';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Edit contact',
  robots: { index: false, follow: false },
};

/**
 * The same form as the Details section of the record, on a page of its own.
 *
 * It is one component, so the two cannot disagree. This route exists because a
 * bookmark, a link from the list and a phone-sized screen all want the form
 * without the rest of the record around it.
 */
export default async function EditContactPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getSession('admin');
  if (!session) redirect('/studio/login');

  const { id } = await params;
  const [contact, companies] = await Promise.all([getContact(id), listCompanies({ limit: 500 })]);
  if (!contact) notFound();

  const record = `/studio/contacts/${contact.id}`;

  return (
    <>
      <div className="mb-4">
        <Link
          href={record}
          className="text-xs text-neutral-400 underline underline-offset-4 hover:text-white"
        >
          Back to {contactName(contact) || contact.email}
        </Link>
      </div>

      <PageHeader title="Edit contact" subtitle={contactName(contact) || contact.email} />

      <Card className="max-w-3xl">
        <ContactForm
          mode="edit"
          contactId={contact.id}
          companies={companies.map((c) => ({ id: c.id, name: c.name }))}
          initial={{
            first_name: contact.first_name,
            last_name: contact.last_name ?? '',
            email: contact.email,
            phone: contact.phone ?? '',
            job_title: contact.job_title ?? '',
            company_id: contact.company_id ?? '',
            marketing_consent: contact.marketing_consent,
            notes: contact.notes ?? '',
          }}
          cancelHref={record}
          doneHref={record}
        />
      </Card>
    </>
  );
}
