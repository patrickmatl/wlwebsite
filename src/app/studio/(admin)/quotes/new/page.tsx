import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { BTN_GHOST, PageHeader } from '@/components/crm/ui';
import { contactName } from '@/lib/crm/types';
import { getSession } from '@/lib/server/auth';
import {
  effectiveVatRate,
  getDeal,
  getSettings,
  listCompanies,
  listContacts,
} from '@/lib/server/crm';
import QuoteBuilder, { type CompanyOption, type ContactOption } from './QuoteBuilder';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'New quote',
  robots: { index: false, follow: false },
};

function one(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? '';
  return value ?? '';
}

/** Today in South Africa. The server runs in UTC, and SAST is two hours ahead. */
function todayISO(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Johannesburg' }).format(new Date());
}

/** Date arithmetic at UTC noon, so a few hours either way cannot roll the day. */
function addDaysISO(iso: string, days: number): string {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export default async function NewQuotePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await getSession('admin');
  if (!session) redirect('/studio/login');

  const [params, contacts, companies, settings] = await Promise.all([
    searchParams,
    listContacts({ limit: 500 }),
    listCompanies({ limit: 500 }),
    getSettings(),
  ]);

  const contactOptions: ContactOption[] = contacts.map((contact) => ({
    id: contact.id,
    label: `${contactName(contact)} · ${contact.email}`,
    companyId: contact.company_id,
  }));

  const companyOptions: CompanyOption[] = companies.map((company) => ({
    id: company.id,
    name: company.name,
  }));

  // A quote is usually started from a deal, which already knows who it is for.
  const requestedDealId = one(params.dealId);
  const deal = requestedDealId ? await getDeal(requestedDealId) : null;

  const contactId = one(params.contactId) || deal?.contact_id || '';
  const companyId = one(params.companyId) || deal?.company_id || '';

  const validityDays = Number(settings.quote_validity_days);

  return (
    <>
      <PageHeader
        title="New quote"
        subtitle={
          deal
            ? `For the deal “${deal.title}”. Prices come from the studio price list.`
            : 'Pick the work from the price list, adjust what needs adjusting, and send it.'
        }
        action={
          <Link href={deal ? `/studio/deals/${deal.id}` : '/studio/quotes'} className={BTN_GHOST}>
            {deal ? 'Back to the deal' : 'All quotes'}
          </Link>
        }
      />

      <QuoteBuilder
        contacts={contactOptions}
        companies={companyOptions}
        // Resolved on the server: until the studio is VAT registered this is 0,
        // so the builder cannot show VAT the business does not charge.
        vatRate={effectiveVatRate(settings)}
        vatRegistered={settings.vat_registered}
        defaultValidUntil={addDaysISO(todayISO(), Number.isFinite(validityDays) ? validityDays : 30)}
        initial={{
          dealId: deal?.id ?? '',
          contactId: contactOptions.some((c) => c.id === contactId) ? contactId : '',
          companyId: companyOptions.some((c) => c.id === companyId) ? companyId : '',
        }}
      />
    </>
  );
}
