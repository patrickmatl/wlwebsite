import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import {
  BTN,
  BTN_GHOST,
  Card,
  EmptyState,
  INPUT,
  PageHeader,
  TableWrap,
  Td,
  Th,
} from '@/components/crm/ui';
import { getSession } from '@/lib/server/auth';
import { listCompanies, listContacts } from '@/lib/server/crm';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Companies',
  robots: { index: false, follow: false },
};

/** The page cap. Hitting it is the cue to search rather than scroll. */
const LIMIT = 200;

function one(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value) ?? '';
}

export default async function CompaniesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await getSession('admin');
  if (!session) redirect('/studio/login');

  const params = await searchParams;
  const q = one(params.q).trim();

  // Postgres does the filtering; the contacts come back in one read and are
  // counted here. There is no count helper in the CRM layer, and at studio
  // scale one extra query beats one query per company.
  const [companies, contacts] = await Promise.all([
    listCompanies({ search: q || undefined, limit: LIMIT }),
    listContacts({ limit: 500, includeArchived: true }),
  ]);

  const people = new Map<string, number>();
  for (const contact of contacts) {
    if (!contact.company_id) continue;
    people.set(contact.company_id, (people.get(contact.company_id) ?? 0) + 1);
  }

  const capped = companies.length === LIMIT;
  const subtitle = q
    ? `${companies.length}${capped ? '+' : ''} matching “${q}”`
    : `${companies.length}${capped ? '+' : ''} ${companies.length === 1 ? 'business' : 'businesses'} on file`;

  return (
    <>
      <PageHeader
        title="Companies"
        subtitle={subtitle}
        action={
          <Link href="/studio/companies/new" className={BTN}>
            New company
          </Link>
        }
      />

      {/* A plain GET form: the query lives in the URL, so a search is
          bookmarkable, shareable and survives a reload. */}
      <form method="get" className="mb-4 flex flex-wrap items-center gap-2">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Search name or email"
          aria-label="Search companies"
          className={`${INPUT} sm:w-72`}
        />
        <button type="submit" className={BTN_GHOST}>
          Search
        </button>
        {q && (
          <Link href="/studio/companies" className={BTN_GHOST}>
            Clear
          </Link>
        )}
      </form>

      <Card>
        {companies.length === 0 ? (
          <EmptyState
            title={q ? `Nothing matches “${q}”` : 'No companies yet'}
            hint={
              q
                ? 'Try part of the registered name, the trading name or an email address.'
                : 'Add a company to group its people, deals and invoices in one place.'
            }
          />
        ) : (
          <TableWrap>
            <thead>
              <tr>
                <Th>Company</Th>
                <Th>Industry</Th>
                <Th>Location</Th>
                <Th>Email</Th>
                <Th>Phone</Th>
                <Th right>People</Th>
                <Th right>
                  <span className="sr-only">Actions</span>
                </Th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => {
                const where = [company.city, company.province].filter(Boolean).join(', ');
                const headcount = people.get(company.id) ?? 0;
                return (
                  <tr key={company.id} className="transition hover:bg-white/[0.03]">
                    <Td>
                      <Link
                        href={`/studio/companies/${company.id}`}
                        className="font-medium text-white hover:text-[#FFD700]"
                      >
                        {company.name}
                      </Link>
                      {company.trading_name && company.trading_name !== company.name && (
                        <span className="mt-0.5 block text-xs text-neutral-500">
                          Trading as {company.trading_name}
                        </span>
                      )}
                    </Td>
                    <Td>
                      {company.industry ?? <span className="text-neutral-500">—</span>}
                    </Td>
                    <Td>{where || <span className="text-neutral-500">—</span>}</Td>
                    <Td>
                      {company.email ? (
                        <a
                          href={`mailto:${company.email}`}
                          className="break-all text-neutral-300 hover:text-[#FFD700]"
                        >
                          {company.email}
                        </a>
                      ) : (
                        <span className="text-neutral-500">—</span>
                      )}
                    </Td>
                    <Td>
                      {company.phone ? (
                        <a
                          href={`tel:${company.phone.replace(/\s+/g, '')}`}
                          className="whitespace-nowrap text-neutral-300 hover:text-[#FFD700]"
                        >
                          {company.phone}
                        </a>
                      ) : (
                        <span className="text-neutral-500">—</span>
                      )}
                    </Td>
                    <Td right>
                      <span className={headcount === 0 ? 'text-neutral-500' : 'text-neutral-200'}>
                        {headcount}
                      </span>
                    </Td>
                    <Td right>
                      <Link
                        href={`/studio/companies/${company.id}/edit`}
                        className="text-xs text-neutral-400 underline underline-offset-4 hover:text-white"
                      >
                        Edit
                      </Link>
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          </TableWrap>
        )}

        {capped && (
          <p className="mt-4 text-xs text-neutral-500">
            Showing the first {LIMIT}. Search to narrow it down.
          </p>
        )}
      </Card>
    </>
  );
}
