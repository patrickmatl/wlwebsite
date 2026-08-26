import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import type { ReactNode } from 'react';
import {
  BTN_GHOST,
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
import { PROJECT_STATUSES, contactName, type Invoice } from '@/lib/crm/types';
import { getSession } from '@/lib/server/auth';
import {
  getDeal,
  getProjectFull,
  getQuote,
  listActivity,
  listInvoices,
  listNotes,
} from '@/lib/server/crm';
import MilestoneList from './MilestoneList';
import ProjectActions from './ProjectActions';
import ProjectNotes from './ProjectNotes';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Project',
  robots: { index: false, follow: false },
};

function SectionHeading({ children }: { children: ReactNode }) {
  return <h2 className="mb-4 font-syne text-lg font-bold text-white">{children}</h2>;
}

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-neutral-400">{label}</dt>
      <dd className="mt-1 text-sm text-neutral-200">{children}</dd>
    </div>
  );
}

/** Rough is fine — this is a "will it open on a phone" figure, not an audit. */
function fileSize(bytes: number | null): string {
  if (bytes === null || !Number.isFinite(bytes)) return '—';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return Math.round(bytes / 1024) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

/** Today in South Africa — the server runs in UTC and SAST is two hours ahead. */
function todayISO(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Johannesburg' }).format(new Date());
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getSession('admin');
  if (!session) redirect('/studio/login');

  const { id } = await params;
  const full = await getProjectFull(id);
  if (!full) notFound();

  const { project, milestones, files, contact, company } = full;

  const [activity, notes, byProject, byQuote, quote, deal] = await Promise.all([
    listActivity('project', project.id, 30),
    listNotes('project', project.id),
    listInvoices({ projectId: project.id, limit: 50 }),
    // An invoice raised straight off the quote before the project existed
    // carries the quote id but no project id, so it has to be picked up on both.
    project.quote_id
      ? listInvoices({ quoteId: project.quote_id, limit: 50 })
      : Promise.resolve([] as Invoice[]),
    project.quote_id ? getQuote(project.quote_id) : Promise.resolve(null),
    project.deal_id ? getDeal(project.deal_id) : Promise.resolve(null),
  ]);

  const invoices = [...byProject, ...byQuote].filter(
    (invoice, index, all) => all.findIndex((other) => other.id === invoice.id) === index,
  );

  const balanceInvoice =
    invoices.find((invoice) => invoice.kind === 'balance' && invoice.status !== 'void') ?? null;

  const client = company?.name ?? (contact ? contactName(contact) : null);
  const closed = PROJECT_STATUSES.find((s) => s.id === project.status)?.done ?? false;
  const late = !closed && project.due_at !== null && project.due_at < todayISO();

  const revisionsUsed = Number(project.revisions_used);
  const revisionsIncluded = Number(project.revisions_included);
  const overRevisions = revisionsUsed > revisionsIncluded;

  return (
    <>
      <PageHeader
        title={project.code + ' · ' + project.name}
        subtitle={
          [client, 'opened ' + formatDate(project.created_at)].filter(Boolean).join(' · ')
        }
        action={
          <Link href="/studio/projects" className={BTN_GHOST}>
            All projects
          </Link>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* ── The brief and the facts ───────────────────────────────────── */}
          <Card>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <StatusPill status={project.status} />
              <span
                className={
                  'text-sm ' + (overRevisions ? 'font-medium text-red-300' : 'text-neutral-400')
                }
              >
                <span className="tabular-nums">
                  {revisionsUsed} of {revisionsIncluded}
                </span>{' '}
                revisions used
              </span>
            </div>

            {project.brief ? (
              <p className="whitespace-pre-wrap text-sm text-neutral-300">{project.brief}</p>
            ) : (
              <p className="text-sm text-neutral-600">No brief captured.</p>
            )}

            <dl className="mt-5 grid gap-5 border-t border-white/10 pt-5 sm:grid-cols-3">
              <Fact label="Client">
                {company ? (
                  <Link
                    href={'/studio/companies/' + company.id}
                    className="text-[#FFD700] hover:underline"
                  >
                    {company.name}
                  </Link>
                ) : contact ? (
                  <Link
                    href={'/studio/contacts/' + contact.id}
                    className="text-[#FFD700] hover:underline"
                  >
                    {contactName(contact)}
                  </Link>
                ) : (
                  <span className="text-neutral-600">Unassigned</span>
                )}
                {company && contact && (
                  <span className="mt-0.5 block text-xs text-neutral-500">
                    {contactName(contact)} · {contact.email}
                  </span>
                )}
              </Fact>

              <Fact label="Due">
                <span className={late ? 'text-red-300' : ''}>
                  {formatDate(project.due_at)}
                  {late && <span className="block text-xs">overdue</span>}
                </span>
              </Fact>

              <Fact label="Delivered">{formatDate(project.delivered_at)}</Fact>

              <Fact label="Started">{formatDate(project.started_at)}</Fact>

              <Fact label="Quote">
                {quote ? (
                  <Link
                    href={'/studio/quotes/' + quote.id}
                    className="text-[#FFD700] hover:underline"
                  >
                    {quote.number}
                  </Link>
                ) : (
                  <span className="text-neutral-600">Opened by hand</span>
                )}
              </Fact>

              <Fact label="Deal">
                {deal ? (
                  <Link href={'/studio/deals/' + deal.id} className="text-[#FFD700] hover:underline">
                    {deal.title}
                  </Link>
                ) : (
                  <span className="text-neutral-600">Not on the pipeline</span>
                )}
              </Fact>
            </dl>

            {project.notes && (
              <div className="mt-5 border-t border-white/10 pt-4">
                <p className="text-xs uppercase tracking-wide text-neutral-400">Internal notes</p>
                <p className="mt-1 whitespace-pre-wrap text-sm text-neutral-400">{project.notes}</p>
              </div>
            )}
          </Card>

          {/* ── Actions ───────────────────────────────────────────────────── */}
          <Card>
            <SectionHeading>Actions</SectionHeading>
            <ProjectActions
              projectId={project.id}
              status={project.status}
              quoteId={project.quote_id}
              quoteNumber={quote?.number ?? null}
              balanceInvoiceId={balanceInvoice?.id ?? null}
            />
          </Card>

          {/* ── Milestones ────────────────────────────────────────────────── */}
          <Card>
            <SectionHeading>Milestones</SectionHeading>
            <MilestoneList projectId={project.id} milestones={milestones} />
          </Card>

          {/* ── Files ─────────────────────────────────────────────────────── */}
          <Card>
            <SectionHeading>Files</SectionHeading>

            {files.length === 0 ? (
              <EmptyState
                title="No files on this project"
                hint="Anything uploaded is internal until it is published to the client."
              />
            ) : (
              <TableWrap>
                <thead>
                  <tr>
                    <Th>Name</Th>
                    <Th>Visibility</Th>
                    <Th right>Size</Th>
                    <Th>Added</Th>
                  </tr>
                </thead>
                <tbody>
                  {files.map((file) => (
                    <tr key={file.id}>
                      <Td>
                        <span className="font-medium text-white">{file.name}</span>
                        {file.mime && (
                          <span className="mt-0.5 block text-xs text-neutral-500">{file.mime}</span>
                        )}
                      </Td>
                      <Td>
                        {file.visibility === 'client' ? (
                          <Badge tone="gold">Client can see it</Badge>
                        ) : (
                          <Badge>Internal only</Badge>
                        )}
                      </Td>
                      <Td right>{fileSize(file.size_bytes === null ? null : Number(file.size_bytes))}</Td>
                      <Td>
                        {formatDate(file.created_at)}
                        <span className="mt-0.5 block text-xs text-neutral-500">
                          {file.uploaded_by}
                        </span>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </TableWrap>
            )}
          </Card>

          {/* ── Billing ───────────────────────────────────────────────────── */}
          <Card>
            <SectionHeading>Invoices</SectionHeading>

            {invoices.length === 0 ? (
              <EmptyState title="Nothing billed yet" />
            ) : (
              <ul className="space-y-2">
                {invoices.map((invoice) => (
                  <li key={invoice.id} className="flex flex-wrap items-center justify-between gap-2">
                    <Link
                      href={'/studio/invoices/' + invoice.id}
                      className="text-sm text-[#FFD700] hover:underline"
                    >
                      {invoice.number}
                      <span className="text-neutral-500"> · {invoice.kind}</span>
                    </Link>
                    <span className="flex items-center gap-3">
                      <Money amount={Number(invoice.total)} className="text-sm text-neutral-200" />
                      <StatusPill status={invoice.status} />
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>

        {/* ── Notes and timeline ──────────────────────────────────────────── */}
        <div className="space-y-6">
          <Card>
            <SectionHeading>Notes</SectionHeading>
            <ProjectNotes projectId={project.id} notes={notes} />
          </Card>

          <Card>
            <SectionHeading>Timeline</SectionHeading>

            {activity.length === 0 ? (
              <EmptyState title="Nothing logged yet" />
            ) : (
              <ol className="space-y-4 border-l border-white/10 pl-4">
                {activity.map((entry) => (
                  <li key={entry.id} className="relative">
                    <span
                      aria-hidden
                      className="absolute -left-5 top-1.5 h-2 w-2 rounded-full bg-white/25"
                    />
                    <p className="text-sm text-neutral-200">{entry.title}</p>
                    {entry.body && (
                      <p className="mt-0.5 whitespace-pre-wrap text-xs text-neutral-500">
                        {entry.body}
                      </p>
                    )}
                    <p
                      className="mt-0.5 text-xs text-neutral-500"
                      title={formatDateTime(entry.created_at)}
                    >
                      {entry.actor} · {relativeTime(entry.created_at)}
                    </p>
                  </li>
                ))}
              </ol>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}
