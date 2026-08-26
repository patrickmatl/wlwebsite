import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import {
  Card,
  EmptyState,
  PageHeader,
  StatusPill,
  TableWrap,
  Td,
  Th,
  formatDate,
} from '@/components/crm/ui';
import { PROJECT_STATUSES, contactName, type ProjectStatus } from '@/lib/crm/types';
import { getSession } from '@/lib/server/auth';
import { listCompanies, listContacts, listProjects } from '@/lib/server/crm';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Projects',
  robots: { index: false, follow: false },
};

function one(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? '';
  return value ?? '';
}

/** Today in South Africa — the server runs in UTC and SAST is two hours ahead. */
function todayISO(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Johannesburg' }).format(new Date());
}

const CHIP = 'rounded-full border px-3 py-1.5 text-sm font-medium transition';
const CHIP_ON = 'border-[#FFD700]/50 bg-[#FFD700]/10 text-[#FFD700]';
const CHIP_OFF = 'border-white/15 text-neutral-400 hover:border-white/30 hover:text-white';

const OPEN_STATUSES: ProjectStatus[] = PROJECT_STATUSES.filter((s) => !s.done).map((s) => s.id);

/**
 * Revisions are the most common source of scope arguments, so the count is
 * stated plainly and turns red the moment it passes what the quote included —
 * that is the point where the next round has to be billed rather than absorbed.
 */
function RevisionsUsed({ used, included }: { used: number; included: number }) {
  const over = used > included;

  return (
    <span className={`text-sm ${over ? 'font-medium text-red-300' : 'text-neutral-300'}`}>
      <span className="tabular-nums">
        {used} of {included}
      </span>{' '}
      used
      {over && (
        <span className="mt-0.5 block text-xs">
          {used - included} past the quote — bill the extra
        </span>
      )}
    </span>
  );
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await getSession('admin');
  if (!session) redirect('/studio/login');

  const [params, projects, contacts, companies] = await Promise.all([
    searchParams,
    // One unfiltered read rather than one per filter: it keeps the chip counts
    // honest and the page to a single query.
    listProjects({ limit: 300 }),
    listContacts({ includeArchived: true, limit: 500 }),
    listCompanies({ limit: 500 }),
  ]);

  const requested = one(params.status);
  const status = PROJECT_STATUSES.some((s) => s.id === requested)
    ? (requested as ProjectStatus)
    : null;
  const activeOnly = status === null && requested === 'active';

  const contactNames = new Map(contacts.map((c) => [c.id, contactName(c)]));
  const companyNames = new Map(companies.map((c) => [c.id, c.name]));

  const counts = new Map<ProjectStatus, number>();
  for (const project of projects) {
    counts.set(project.status, (counts.get(project.status) ?? 0) + 1);
  }
  const activeCount = projects.filter((p) => OPEN_STATUSES.includes(p.status)).length;

  const visible = status
    ? projects.filter((p) => p.status === status)
    : activeOnly
      ? projects.filter((p) => OPEN_STATUSES.includes(p.status))
      : projects;

  const today = todayISO();

  return (
    <>
      <PageHeader
        title="Projects"
        subtitle="Work sold and in the studio. A project opens from an accepted quote."
      />

      <div className="mb-5 flex flex-wrap gap-2">
        <Link
          href="/studio/projects"
          className={`${CHIP} ${status === null && !activeOnly ? CHIP_ON : CHIP_OFF}`}
        >
          All <span className="text-xs opacity-70">{projects.length}</span>
        </Link>
        <Link
          href="/studio/projects?status=active"
          className={`${CHIP} ${activeOnly ? CHIP_ON : CHIP_OFF}`}
        >
          Live <span className="text-xs opacity-70">{activeCount}</span>
        </Link>
        {PROJECT_STATUSES.map((filter) => (
          <Link
            key={filter.id}
            href={`/studio/projects?status=${filter.id}`}
            className={`${CHIP} ${status === filter.id ? CHIP_ON : CHIP_OFF}`}
          >
            {filter.label} <span className="text-xs opacity-70">{counts.get(filter.id) ?? 0}</span>
          </Link>
        ))}
      </div>

      <Card>
        {visible.length === 0 ? (
          <EmptyState
            title={status || activeOnly ? 'Nothing under that filter' : 'No projects yet'}
            hint={
              status || activeOnly
                ? 'Try another filter, or clear it to see everything.'
                : 'Accept a quote and open the project from it.'
            }
          />
        ) : (
          <>
            <p className="mb-4 text-sm text-neutral-400">
              {visible.length} project{visible.length === 1 ? '' : 's'}
            </p>

            <TableWrap>
              <thead>
                <tr>
                  <Th>Code</Th>
                  <Th>Project</Th>
                  <Th>Client</Th>
                  <Th>Status</Th>
                  <Th>Due</Th>
                  <Th>Revisions</Th>
                </tr>
              </thead>
              <tbody>
                {visible.map((project) => {
                  const client =
                    (project.company_id ? companyNames.get(project.company_id) : null) ??
                    (project.contact_id ? contactNames.get(project.contact_id) : null) ??
                    null;

                  const closed = PROJECT_STATUSES.find((s) => s.id === project.status)?.done ?? false;

                  // Only live work can run late — a delivered project that ran
                  // over is history, and flagging it red forever is just noise.
                  const late = !closed && project.due_at !== null && project.due_at < today;

                  return (
                    <tr key={project.id}>
                      <Td>
                        <Link
                          href={`/studio/projects/${project.id}`}
                          className="font-medium text-[#FFD700] hover:underline"
                        >
                          {project.code}
                        </Link>
                      </Td>
                      <Td>
                        <span className="font-medium text-white">{project.name}</span>
                      </Td>
                      <Td>{client ?? <span className="text-neutral-600">—</span>}</Td>
                      <Td>
                        <StatusPill status={project.status} />
                      </Td>
                      <Td className={late ? 'text-red-300' : ''}>
                        {formatDate(project.due_at)}
                        {late && <span className="block text-xs">overdue</span>}
                      </Td>
                      <Td>
                        <RevisionsUsed
                          used={Number(project.revisions_used)}
                          included={Number(project.revisions_included)}
                        />
                      </Td>
                    </tr>
                  );
                })}
              </tbody>
            </TableWrap>
          </>
        )}
      </Card>
    </>
  );
}
