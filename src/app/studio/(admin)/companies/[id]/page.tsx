import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import type { ReactNode } from 'react';
import {
  Badge,
  Card,
  EmptyState,
  Money,
  PageHeader,
  Stat,
  StatusPill,
  TableWrap,
  Td,
  Th,
  formatDate,
  formatDateTime,
  relativeTime,
} from '@/components/crm/ui';
import { DEAL_STAGES, contactName, formatRand, round2 } from '@/lib/crm/types';
import { getSession } from '@/lib/server/auth';
import { getCompany, getCompanyDetail } from '@/lib/server/crm';
import CompanyForm from '../CompanyForm';
import { NoteComposer } from './CompanyActions';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const noindex = { index: false, follow: false };

  // The name is only looked up for someone already signed in — an
  // unauthenticated request must not learn a client's name from a page title.
  const session = await getSession('admin');
  if (!session) return { title: 'Company', robots: noindex };

  const { id } = await params;
  const company = await getCompany(id);
  return { title: company?.name ?? 'Company', robots: noindex };
}

const OPEN_STAGES = new Set(DEAL_STAGES.filter((s) => s.open).map((s) => s.id));

function Section({
  id,
  title,
  count,
  children,
  action,
}: {
  id: string;
  title: string;
  count?: number;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <Card>
      <div
        id={id}
        className="mb-4 flex scroll-mt-24 flex-wrap items-center justify-between gap-3"
      >
        <h2 className="font-syne text-lg font-bold text-white">
          {title}
          {count !== undefined && count > 0 && (
            <span className="ml-2 align-middle text-sm font-normal text-neutral-500">{count}</span>
          )}
        </h2>
        {action}
      </div>
      {children}
    </Card>
  );
}

export default async function CompanyPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getSession('admin');
  if (!session) redirect('/studio/login');

  const { id } = await params;
  const detail = await getCompanyDetail(id);
  if (!detail) notFound();

  const { company, contacts, deals, projects, invoices, notes, activity } = detail;

  // Lifetime value is what has actually been settled. A part-paid invoice
  // stays under Outstanding until it closes, so the two figures never
  // double-count the same rand.
  const paid = invoices.filter((invoice) => invoice.status === 'paid');
  const lifetimeValue = round2(paid.reduce((sum, invoice) => sum + invoice.total, 0));
  const outstanding = round2(
    invoices
      .filter((invoice) => invoice.status !== 'draft' && invoice.status !== 'void')
      .reduce((sum, invoice) => sum + (invoice.total - invoice.amount_paid), 0),
  );
  const openDeals = deals.filter((deal) => OPEN_STAGES.has(deal.stage));
  const openValue = round2(openDeals.reduce((sum, deal) => sum + (deal.value ?? 0), 0));

  const address = [
    company.address_line1,
    company.suburb,
    company.city,
    company.province,
    company.postal_code,
    company.country,
  ]
    .filter(Boolean)
    .join(', ');

  const tel = company.phone ? company.phone.replace(/\s+/g, '') : null;

  return (
    <>
      <div className="mb-4">
        <Link
          href="/studio/companies"
          className="text-xs text-neutral-400 underline underline-offset-4 hover:text-white"
        >
          Back to companies
        </Link>
      </div>

      <PageHeader
        title={company.name}
        subtitle={
          [
            company.trading_name && company.trading_name !== company.name
              ? `Trading as ${company.trading_name}`
              : null,
            company.industry,
          ]
            .filter(Boolean)
            .join(' · ') || `Added ${formatDate(company.created_at)}`
        }
        action={
          company.vat_number ? <Badge tone="gold">VAT {company.vat_number}</Badge> : undefined
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat
          label="Lifetime value"
          value={formatRand(lifetimeValue)}
          hint={`${paid.length} invoice${paid.length === 1 ? '' : 's'} paid in full`}
        />
        <Stat
          label="Outstanding"
          value={formatRand(outstanding)}
          hint={outstanding > 0 ? 'Still to be collected' : 'Nothing owing'}
        />
        <Stat
          label="Open pipeline"
          value={formatRand(openValue)}
          hint={`${openDeals.length} deal${openDeals.length === 1 ? '' : 's'} still in play`}
        />
        <Stat
          label="People"
          value={String(contacts.length)}
          hint={contacts.length === 1 ? 'One contact on file' : 'Contacts on file'}
        />
      </div>

      {/* How to reach them, one tap away on a phone. */}
      <Card className="mt-6">
        <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt className="text-xs uppercase tracking-wide text-neutral-400">Email</dt>
            <dd className="mt-1 text-sm">
              {company.email ? (
                <a
                  href={`mailto:${company.email}`}
                  className="break-all text-white hover:text-[#FFD700]"
                >
                  {company.email}
                </a>
              ) : (
                <span className="text-neutral-500">Not on file</span>
              )}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-neutral-400">Phone</dt>
            <dd className="mt-1 text-sm">
              {tel ? (
                <a href={`tel:${tel}`} className="text-white hover:text-[#FFD700]">
                  {company.phone}
                </a>
              ) : (
                <span className="text-neutral-500">Not on file</span>
              )}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-neutral-400">Website</dt>
            <dd className="mt-1 text-sm">
              {company.website ? (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="break-all text-white hover:text-[#FFD700]"
                >
                  {company.website.replace(/^https?:\/\//, '')}
                </a>
              ) : (
                <span className="text-neutral-500">Not on file</span>
              )}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-neutral-400">Address</dt>
            <dd className="mt-1 text-sm text-neutral-200">
              {address || <span className="text-neutral-500">Not on file</span>}
            </dd>
          </div>
        </dl>
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* ── The record ─────────────────────────────────────────────────── */}
        <div className="space-y-6 lg:col-span-2">
          <Section
            id="details"
            title="Details"
            action={
              <Link
                href={`/studio/companies/${company.id}/edit`}
                className="text-xs text-neutral-400 underline underline-offset-4 hover:text-white"
              >
                Open on its own page
              </Link>
            }
          >
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
            />
          </Section>

          <Section
            id="contacts"
            title="People"
            count={contacts.length}
            action={
              <Link
                href={`/studio/contacts/new?company=${company.id}`}
                className="text-xs text-neutral-400 underline underline-offset-4 hover:text-white"
              >
                Add a contact
              </Link>
            }
          >
            {contacts.length === 0 ? (
              <EmptyState
                title="Nobody here yet"
                hint="Add the person you actually deal with, so quotes and invoices have somewhere to go."
              />
            ) : (
              <TableWrap>
                <thead>
                  <tr>
                    <Th>Name</Th>
                    <Th>Email</Th>
                    <Th>Phone</Th>
                    <Th>Portal</Th>
                    <Th>Last login</Th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
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
                    </tr>
                  ))}
                </tbody>
              </TableWrap>
            )}
          </Section>

          <Section id="deals" title="Deals" count={deals.length}>
            {deals.length === 0 ? (
              <EmptyState title="No deals yet" hint="An enquiry that goes anywhere becomes one." />
            ) : (
              <TableWrap>
                <thead>
                  <tr>
                    <Th>Deal</Th>
                    <Th>Stage</Th>
                    <Th right>Value</Th>
                    <Th>Expected close</Th>
                  </tr>
                </thead>
                <tbody>
                  {deals.map((deal) => (
                    <tr key={deal.id} className="transition hover:bg-white/[0.03]">
                      <Td>
                        <Link
                          href={`/studio/deals/${deal.id}`}
                          className="font-medium text-white hover:text-[#FFD700]"
                        >
                          {deal.title}
                        </Link>
                      </Td>
                      <Td>
                        <StatusPill status={deal.stage} />
                      </Td>
                      <Td right>
                        <Money amount={deal.value} />
                      </Td>
                      <Td>
                        <span className="whitespace-nowrap text-neutral-400">
                          {formatDate(deal.expected_close_date)}
                        </span>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </TableWrap>
            )}
          </Section>

          <Section id="projects" title="Projects" count={projects.length}>
            {projects.length === 0 ? (
              <EmptyState
                title="No projects yet"
                hint="An accepted quote becomes a project on the board."
              />
            ) : (
              <TableWrap>
                <thead>
                  <tr>
                    <Th>Project</Th>
                    <Th>Status</Th>
                    <Th>Due</Th>
                    <Th>Delivered</Th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.id} className="transition hover:bg-white/[0.03]">
                      <Td>
                        <Link
                          href={`/studio/projects/${project.id}`}
                          className="font-medium text-white hover:text-[#FFD700]"
                        >
                          {project.name}
                        </Link>
                        <span className="mt-0.5 block text-xs text-neutral-500">
                          {project.code}
                        </span>
                      </Td>
                      <Td>
                        <StatusPill status={project.status} />
                      </Td>
                      <Td>
                        <span className="whitespace-nowrap text-neutral-400">
                          {formatDate(project.due_at)}
                        </span>
                      </Td>
                      <Td>
                        <span className="whitespace-nowrap text-neutral-400">
                          {formatDate(project.delivered_at)}
                        </span>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </TableWrap>
            )}
          </Section>

          <Section id="invoices" title="Invoices" count={invoices.length}>
            {invoices.length === 0 ? (
              <EmptyState title="No invoices yet" hint="Billing raised against this company." />
            ) : (
              <TableWrap>
                <thead>
                  <tr>
                    <Th>Number</Th>
                    <Th>Status</Th>
                    <Th>Issued</Th>
                    <Th>Due</Th>
                    <Th right>Total</Th>
                    <Th right>Outstanding</Th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => {
                    const owing = round2(invoice.total - invoice.amount_paid);
                    return (
                      <tr key={invoice.id} className="transition hover:bg-white/[0.03]">
                        <Td>
                          <Link
                            href={`/studio/invoices/${invoice.id}`}
                            className="font-medium text-white hover:text-[#FFD700]"
                          >
                            {invoice.number}
                          </Link>
                        </Td>
                        <Td>
                          <StatusPill status={invoice.status} />
                        </Td>
                        <Td>
                          <span className="whitespace-nowrap text-neutral-400">
                            {formatDate(invoice.issue_date)}
                          </span>
                        </Td>
                        <Td>
                          <span className="whitespace-nowrap text-neutral-400">
                            {formatDate(invoice.due_date)}
                          </span>
                        </Td>
                        <Td right>
                          <Money amount={invoice.total} />
                        </Td>
                        <Td right>
                          <Money
                            amount={owing}
                            className={owing > 0 ? 'text-[#FFD700]' : 'text-neutral-500'}
                          />
                        </Td>
                      </tr>
                    );
                  })}
                </tbody>
              </TableWrap>
            )}
          </Section>
        </div>

        {/* ── The side rail ──────────────────────────────────────────────── */}
        <div className="space-y-6">
          <Section id="notes" title="Notes" count={notes.length}>
            <NoteComposer entityId={company.id} />

            {notes.length > 0 && (
              <ul className="mt-5 space-y-4">
                {notes.map((note) => (
                  <li key={note.id} className="rounded-lg border border-white/10 bg-black/30 p-4">
                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-neutral-200">
                      {note.body}
                    </p>
                    <p className="mt-2 text-xs text-neutral-500">
                      {note.author} · {formatDateTime(note.created_at)}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </Section>

          <Section id="activity" title="Activity">
            {activity.length === 0 ? (
              <EmptyState title="Nothing recorded yet" />
            ) : (
              <ol className="space-y-4 border-l border-white/10 pl-4">
                {activity.map((entry) => (
                  <li key={entry.id} className="relative">
                    <span
                      aria-hidden
                      className="absolute -left-5 top-1.5 h-2 w-2 rounded-full bg-[#FFD700]/60"
                    />
                    <p className="text-sm text-neutral-200">{entry.title}</p>
                    {entry.body && (
                      <p className="mt-0.5 whitespace-pre-wrap text-xs leading-relaxed text-neutral-500">
                        {entry.body}
                      </p>
                    )}
                    <p className="mt-0.5 text-xs text-neutral-500">
                      {entry.actor} · {relativeTime(entry.created_at)}
                    </p>
                  </li>
                ))}
              </ol>
            )}
          </Section>
        </div>
      </div>
    </>
  );
}
