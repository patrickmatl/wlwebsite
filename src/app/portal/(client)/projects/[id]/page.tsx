import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { Card, EmptyState, StatusPill, formatDate } from '@/components/crm/ui';
import { BUSINESS } from '@/data/business';
import type { ProjectMilestone } from '@/lib/crm/types';
import { getSession } from '@/lib/server/auth';
import { getProject } from '@/lib/server/portal';
import { dueLanguage, formatBytes, isPast, isProjectClosed, paragraphs } from '../../../format';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Project',
  robots: { index: false, follow: false },
};

/** The dot on the rail. Its shape carries the state, not just its colour. */
function MilestoneDot({ status }: { status: ProjectMilestone['status'] }) {
  if (status === 'done') {
    return (
      <span
        aria-hidden
        className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FFD700] text-[11px] font-bold text-black"
      >
        ✓
      </span>
    );
  }

  if (status === 'in_progress') {
    return (
      <span
        aria-hidden
        className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-[#FFD700] bg-black"
      >
        <span className="h-2 w-2 rounded-full bg-[#FFD700]" />
      </span>
    );
  }

  if (status === 'skipped') {
    return (
      <span
        aria-hidden
        className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black text-[11px] text-neutral-600"
      >
        –
      </span>
    );
  }

  return (
    <span
      aria-hidden
      className="relative z-10 h-6 w-6 shrink-0 rounded-full border border-white/20 bg-black"
    />
  );
}

function Stepper({ milestones }: { milestones: ProjectMilestone[] }) {
  return (
    <ol className="relative">
      {milestones.map((milestone, index) => {
        const last = index === milestones.length - 1;
        const overdue =
          milestone.status !== 'done' &&
          milestone.status !== 'skipped' &&
          isPast(milestone.due_at);

        return (
          <li key={milestone.id} className={`relative flex gap-4 ${last ? '' : 'pb-7'}`}>
            {/* The rail is drawn behind the dots rather than between them, so
                a wrapping title cannot leave a gap in the line. */}
            {last ? null : (
              <span
                aria-hidden
                className="absolute left-[11px] top-6 h-full w-px bg-white/10"
              />
            )}

            <MilestoneDot status={milestone.status} />

            <div className="min-w-0 pb-1">
              <p
                className={`text-sm font-medium ${
                  milestone.status === 'skipped' ? 'text-neutral-500' : 'text-white'
                }`}
              >
                {milestone.title}
              </p>

              <p className="mt-0.5 text-xs text-neutral-500">
                {milestone.status === 'done' && milestone.completed_at
                  ? `Completed ${formatDate(milestone.completed_at)}`
                  : milestone.status === 'done'
                    ? 'Completed'
                    : milestone.status === 'in_progress'
                      ? 'In progress now'
                      : milestone.status === 'skipped'
                        ? 'Not needed on this project'
                        : milestone.due_at
                          ? `Planned for ${formatDate(milestone.due_at)}${
                              overdue ? ` · ${dueLanguage(milestone.due_at)}` : ''
                            }`
                          : 'Still to come'}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export default async function PortalProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getSession('client');
  if (!session) redirect('/portal/login');

  const { id } = await params;
  const found = await getProject(session, id);
  if (!found) notFound();

  const { project, milestones, files } = found;

  const closed = isProjectClosed(project.status);
  const countable = milestones.filter((milestone) => milestone.status !== 'skipped');
  const complete = countable.filter((milestone) => milestone.status === 'done').length;
  const percent = countable.length === 0 ? 0 : Math.round((complete / countable.length) * 100);

  const revisionsLeft = Math.max(project.revisions_included - project.revisions_used, 0);

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/portal/projects"
          className="text-xs text-neutral-400 underline underline-offset-4 transition hover:text-[#FFD700]"
        >
          ← All projects
        </Link>
      </div>

      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-syne text-2xl font-bold text-white">{project.name}</h1>
          <StatusPill status={project.status} />
        </div>
        <p className="mt-1 text-sm text-neutral-400">
          {project.code}
          {project.started_at ? ` · started ${formatDate(project.started_at)}` : ''}
          {project.delivered_at ? ` · delivered ${formatDate(project.delivered_at)}` : ''}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {paragraphs(project.brief).length > 0 ? (
            <Card>
              <h2 className="mb-3 font-syne text-base font-bold text-white">The brief</h2>
              <div className="space-y-3">
                {paragraphs(project.brief).map((block, index) => (
                  <p
                    key={index}
                    className="whitespace-pre-line text-sm leading-relaxed text-neutral-300"
                  >
                    {block}
                  </p>
                ))}
              </div>
            </Card>
          ) : null}

          <Card>
            <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="font-syne text-base font-bold text-white">Where we are</h2>
              {countable.length > 0 ? (
                <span className="text-xs text-neutral-400">
                  {complete} of {countable.length} complete
                </span>
              ) : null}
            </div>

            {milestones.length === 0 ? (
              <p className="text-sm leading-relaxed text-neutral-400">
                The milestones for this project have not been set out yet. They will appear here as
                soon as we have mapped the work — usually within a day of kick-off.
              </p>
            ) : (
              <>
                {countable.length > 0 ? (
                  <div className="mb-6">
                    <div
                      className="h-1.5 w-full overflow-hidden rounded-full bg-white/10"
                      role="progressbar"
                      aria-valuenow={percent}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label="Project progress"
                    >
                      <div
                        className="h-full rounded-full bg-[#FFD700] transition-all"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                ) : null}

                <Stepper milestones={milestones} />
              </>
            )}
          </Card>

          <Card>
            <h2 className="mb-4 font-syne text-base font-bold text-white">Your files</h2>

            {files.length === 0 ? (
              <p className="text-sm leading-relaxed text-neutral-400">
                Nothing to download yet. Drafts, proofs and final artwork all land here as they are
                approved, and they stay available for good.
              </p>
            ) : (
              <ul className="divide-y divide-white/5">
                {files.map((file) => (
                  <li
                    key={file.id}
                    className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-white">{file.name}</p>
                      <p className="mt-0.5 text-xs text-neutral-500">
                        Added {formatDate(file.created_at)}
                        {formatBytes(file.size_bytes) ? ` · ${formatBytes(file.size_bytes)}` : ''}
                      </p>
                    </div>
                    {/* A plain anchor, not next/link: this is an API route that
                        streams a file, not a page to navigate to. */}
                    <a
                      href={`/api/portal/files/${file.id}`}
                      rel="nofollow"
                      className="shrink-0 rounded-lg border border-white/15 px-3 py-1.5 text-xs font-medium text-neutral-200 transition hover:border-[#FFD700]/50 hover:text-[#FFD700]"
                    >
                      Download
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <h2 className="mb-4 font-syne text-base font-bold text-white">Revisions</h2>

            <div className="flex items-baseline gap-2">
              <span className="font-syne text-3xl font-bold text-[#FFD700]">
                {revisionsLeft}
              </span>
              <span className="text-sm text-neutral-400">
                of {project.revisions_included} left
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5" aria-hidden>
              {Array.from({ length: project.revisions_included }).map((_, index) => (
                <span
                  key={index}
                  className={`h-2 w-8 rounded-full ${
                    index < project.revisions_used ? 'bg-white/15' : 'bg-[#FFD700]'
                  }`}
                />
              ))}
            </div>

            <p className="mt-4 text-xs leading-relaxed text-neutral-500">
              {revisionsLeft === 0
                ? 'The rounds included in your quote have been used. Anything further is quoted separately — we will always agree it with you before a minute is billed.'
                : 'Each round is one consolidated set of changes. Extra rounds beyond what your quote included are quoted separately, and never billed without your say-so.'}
            </p>
          </Card>

          <Card>
            <h2 className="mb-4 font-syne text-base font-bold text-white">At a glance</h2>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-neutral-400">Status</dt>
                <dd>
                  <StatusPill status={project.status} />
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-neutral-400">Started</dt>
                <dd className="text-neutral-200">{formatDate(project.started_at)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-neutral-400">{closed ? 'Delivered' : 'Due'}</dt>
                <dd className="text-neutral-200">
                  {closed ? formatDate(project.delivered_at) : formatDate(project.due_at)}
                </dd>
              </div>
            </dl>

            <p className="mt-5 text-xs leading-relaxed text-neutral-500">
              Something look wrong, or need a date moved? Email{' '}
              <a
                href={`mailto:${BUSINESS.email}?subject=${encodeURIComponent(project.code)}`}
                className="underline underline-offset-4 transition hover:text-[#FFD700]"
              >
                {BUSINESS.email}
              </a>{' '}
              and quote {project.code}.
            </p>
          </Card>
        </div>
      </div>

      {project.status === 'cancelled' ? (
        <EmptyState
          title="This project was cancelled"
          hint="Everything above is kept as a record. If you would like to pick it up again, just say the word."
        />
      ) : null}
    </div>
  );
}
