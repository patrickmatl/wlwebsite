import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import {
  BTN,
  BTN_GHOST,
  Badge,
  Card,
  EmptyState,
  INPUT,
  PageHeader,
  TableWrap,
  Td,
  Th,
  relativeTime,
} from '@/components/crm/ui';
import { contactName } from '@/lib/crm/types';
import { getSession } from '@/lib/server/auth';
import { listCompanies, listContacts } from '@/lib/server/crm';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Contacts',
  robots: { index: false, follow: false },
};

/** The page cap. Hitting it is the cue to search rather than scroll. */
const LIMIT = 200;

function one(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value) ?? '';
}

export default async function ContactsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await getSession('admin');
  if (!session) redirect('/studio/login');

  const params = await searchParams;
  const q = one(params.q).trim();
  const includeArchived = one(params.archived) === '1';

  // Filtering happens in Postgres, not here — the list has to stay honest when
  // the studio has more contacts than one page can hold.
  const [contacts, companies] = await Promise.all([
    listContacts({ search: q || undefined, includeArchived, limit: LIMIT }),
    listCompanies({ limit: 500 }),
  ]);

  const companyName = new Map(companies.map((c) => [c.id, c.name]));
  const capped = contacts.length === LIMIT;

  // The archived toggle keeps whatever is being searched for.
  const toggle = new URLSearchParams();
  if (q) toggle.set('q', q);
  if (!includeArchived) toggle.set('archived', '1');
  const toggleQuery = toggle.toString();
  const toggleHref = `/studio/contacts${toggleQuery ? `?${toggleQuery}` : ''}`;

  const subtitle = q
    ? `${contacts.length}${capped ? '+' : ''} matching “${q}”`
    : `${contacts.length}${capped ? '+' : ''} ${contacts.length === 1 ? 'person' : 'people'} on file`;

  return (
    <>
      <PageHeader
        title="Contacts"
        subtitle={subtitle}
        action={
          <Link href="/studio/contacts/new" className={BTN}>
            New contact
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
          placeholder="Search name, email or phone"
          aria-label="Search contacts"
          className={`${INPUT} sm:w-72`}
        />
        {includeArchived && <input type="hidden" name="archived" value="1" />}
        <button type="submit" className={BTN_GHOST}>
          Search
        </button>
        {q && (
          <Link
            href={includeArchived ? '/studio/contacts?archived=1' : '/studio/contacts'}
            className={BTN_GHOST}
          >
            Clear
          </Link>
        )}
        <Link
          href={toggleHref}
          className="ml-auto text-xs text-neutral-400 underline underline-offset-4 hover:text-white"
        >
          {includeArchived ? 'Hide archived' : 'Include archived'}
        </Link>
      </form>

      <Card>
        {contacts.length === 0 ? (
          <EmptyState
            title={q ? `Nobody matches “${q}”` : 'No contacts yet'}
            hint={
              q
                ? 'Try part of a first name, an email address or a phone number.'
                : 'Enquiries from the site create contacts automatically. You can also add one by hand.'
            }
          />
        ) : (
          <TableWrap>
            <thead>
              <tr>
                <Th>Name</Th>
                <Th>Company</Th>
                <Th>Email</Th>
                <Th>Phone</Th>
                <Th>Portal</Th>
                <Th>Last login</Th>
                <Th right>
                  <span className="sr-only">Actions</span>
                </Th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => {
                const company = contact.company_id ? companyName.get(contact.company_id) : null;
                return (
                  <tr key={contact.id} className="transition hover:bg-white/[0.03]">
                    <Td>
                      <Link
                        href={`/studio/contacts/${contact.id}`}
                        className="font-medium text-white hover:text-[#FFD700]"
                      >
                        {contactName(contact) || contact.email}
                      </Link>
                      {contact.status === 'archived' && (
                        <span className="ml-2 align-middle">
                          <Badge tone="neutral">Archived</Badge>
                        </span>
                      )}
                      {contact.job_title && (
                        <span className="mt-0.5 block text-xs text-neutral-500">
                          {contact.job_title}
                        </span>
                      )}
                    </Td>
                    <Td>
                      {contact.company_id && company ? (
                        <Link
                          href={`/studio/companies/${contact.company_id}`}
                          className="text-neutral-300 hover:text-[#FFD700]"
                        >
                          {company}
                        </Link>
                      ) : (
                        <span className="text-neutral-500">—</span>
                      )}
                    </Td>
                    <Td>
                      <a
                        href={`mailto:${contact.email}`}
                        className="break-all text-neutral-300 hover:text-[#FFD700]"
                      >
                        {contact.email}
                      </a>
                    </Td>
                    <Td>
                      {contact.phone ? (
                        <a
                          href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                          className="whitespace-nowrap text-neutral-300 hover:text-[#FFD700]"
                        >
                          {contact.phone}
                        </a>
                      ) : (
                        <span className="text-neutral-500">—</span>
                      )}
                    </Td>
                    <Td>
                      <Badge tone={contact.portal_enabled ? 'green' : 'neutral'}>
                        {contact.portal_enabled ? 'Enabled' : 'Off'}
                      </Badge>
                    </Td>
                    <Td>
                      <span className="whitespace-nowrap text-neutral-400">
                        {contact.last_login_at ? relativeTime(contact.last_login_at) : 'Never'}
                      </span>
                    </Td>
                    <Td right>
                      <Link
                        href={`/studio/contacts/${contact.id}/edit`}
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
