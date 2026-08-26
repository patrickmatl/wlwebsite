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
  StatusPill,
  TableWrap,
  Td,
  Th,
  formatDate,
  formatDateTime,
  relativeTime,
} from '@/components/crm/ui';
import { contactName, round2 } from '@/lib/crm/types';
import { getSession } from '@/lib/server/auth';
import { getContact, getContactDetail, listCompanies } from '@/lib/server/crm';
import ContactForm from '../ContactForm';
import { NoteComposer, PortalControls } from './ContactActions';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const noindex = { index: false, follow: false };

  // The name is only looked up for someone who is already signed in — an
  // unauthenticated request must not learn a client's name from a page title.
  const session = await getSession('admin');
  if (!session) return { title: 'Contact', robots: noindex };

  const { id } = await params;
  const contact = await getContact(id);
  return {
    title: contact ? contactName(contact) || contact.email : 'Contact',
    robots: noindex,
  };
}

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

export default async function ContactPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getSession('admin');
  if (!session) redirect('/studio/login');

  const { id } = await params;
  const [detail, companies] = await Promise.all([
    getContactDetail(id),
    listCompanies({ limit: 500 }),
  ]);
  if (!detail) notFound();

  const { contact, company, deals, quotes, projects, invoices, notes, activity } = detail;
  const name = contactName(contact) || contact.email;
  const archived = contact.status === 'archived';
  const tel = contact.phone ? contact.phone.replace(/\s+/g, '') : null;

  return (
    <>
      <div className="mb-4">
        <Link
          href="/studio/contacts"
          className="text-xs text-neutral-400 underline underline-offset-4 hover:text-white"
        >
          Back to contacts
        </Link>
      </div>

      <PageHeader
        title={name}
        subtitle={
          [contact.job_title, company?.name].filter(Boolean).join(' at ') ||
          `Added ${formatDate(contact.created_at)}`
        }
        action={
          <div className="flex flex-wrap items-center gap-2">
            {archived && <Badge tone="neutral">Archived</Badge>}
            <Badge tone={contact.portal_enabled ? 'green' : 'neutral'}>
              {contact.portal_enabled ? 'Portal on' : 'Portal off'}
            </Badge>
            <Badge tone={contact.marketing_consent ? 'gold' : 'neutral'}>
              {contact.marketing_consent ? 'Marketing: yes' : 'Marketing: no'}
            </Badge>
          </div>
        }
      />

      {/* How to reach them, one tap away on a phone. */}
      <Card className="mb-6">
        <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt className="text-xs uppercase tracking-wide text-neutral-400">Email</dt>
            <dd className="mt-1">
              <a
                href={`mailto:${contact.email}`}
                className="break-all text-sm text-white hover:text-[#FFD700]"
              >
                {contact.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-neutral-400">Phone</dt>
            <dd className="mt-1 text-sm">
              {tel ? (
                <a href={`tel:${tel}`} className="text-white hover:text-[#FFD700]">
                  {contact.phone}
                </a>
              ) : (
                <span className="text-neutral-500">Not on file</span>
              )}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-neutral-400">Company</dt>
            <dd className="mt-1 text-sm">
              {company ? (
                <Link
                  href={`/studio/companies/${company.id}`}
                  className="text-white hover:text-[#FFD700]"
                >
                  {company.name}
                </Link>
              ) : (
                <span className="text-neutral-500">None</span>
              )}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-neutral-400">Last portal login</dt>
            <dd className="mt-1 text-sm text-neutral-200">
              {contact.last_login_at ? formatDateTime(contact.last_login_at) : 'Never signed in'}
            </dd>
          </div>
        </dl>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* ── The record ─────────────────────────────────────────────────── */}
        <div className="space-y-6 lg:col-span-2">
          <Section
            id="details"
            title="Details"
            action={
              <Link
                href={`/studio/contacts/${contact.id}/edit`}
                className="text-xs text-neutral-400 underline underline-offset-4 hover:text-white"
              >
                Open on its own page
              </Link>
            }
          >
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
            />
            {contact.marketing_consent && contact.consent_at && (
              <p className="mt-4 text-xs text-neutral-500">
                Marketing consent recorded {formatDateTime(contact.consent_at)}.
              </p>
            )}
          </Section>

          <Section
            id="deals"
            title="Deals"
            count={deals.length}
            action={
              <Link
                href="/studio/deals"
                className="text-xs text-neutral-400 underline underline-offset-4 hover:text-white"
              >
                All deals
              </Link>
            }
          >
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

          <Section id="quotes" title="Quotes" count={quotes.length}>
            {quotes.length === 0 ? (
              <EmptyState title="No quotes yet" hint="Quotes raised for this person land here." />
            ) : (
              <TableWrap>
                <thead>
                  <tr>
                    <Th>Number</Th>
                    <Th>Status</Th>
                    <Th right>Total</Th>
                    <Th>Sent</Th>
                    <Th>Valid until</Th>
                  </tr>
                </thead>
                <tbody>
                  {quotes.map((quote) => (
                    <tr key={quote.id} className="transition hover:bg-white/[0.03]">
                      <Td>
                        <Link
                          href={`/studio/quotes/${quote.id}`}
                          className="font-medium text-white hover:text-[#FFD700]"
                        >
                          {quote.number}
                        </Link>
                      </Td>
                      <Td>
                        <StatusPill status={quote.status} />
                      </Td>
                      <Td right>
                        <Money amount={quote.total} />
                      </Td>
                      <Td>
                        <span className="whitespace-nowrap text-neutral-400">
                          {formatDate(quote.sent_at)}
                        </span>
                      </Td>
                      <Td>
                        <span className="whitespace-nowrap text-neutral-400">
                          {formatDate(quote.valid_until)}
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
              <EmptyState title="No invoices yet" hint="Billing raised against this person." />
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

          <Section id="notes" title="Notes" count={notes.length}>
            <NoteComposer entityId={contact.id} />

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
        </div>

        {/* ── The side rail ──────────────────────────────────────────────── */}
        <div className="space-y-6">
          <Section id="portal" title="Portal access">
            <PortalControls
              contactId={contact.id}
              email={contact.email}
              portalEnabled={contact.portal_enabled}
              archived={archived}
            />
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
