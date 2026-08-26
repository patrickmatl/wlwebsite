import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { CARD, EmptyState, PageHeader, StatusPill, formatDate } from '@/components/crm/ui';
import type { Project } from '@/lib/crm/types';
import { getSession } from '@/lib/server/auth';
import { listProjects } from '@/lib/server/portal';
import { dueLanguage, isPast, isProjectClosed } from '../../format';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Projects',
  robots: { index: false, follow: false },
};

function ProjectCard({ project }: { project: Project }) {
  const closed = isProjectClosed(project.status);
  const due = dueLanguage(project.due_at);
  const overdue = isPast(project.due_at) && !closed;
  const revisionsLeft = Math.max(project.revisions_included - project.revisions_used, 0);

  return (
    <Link
      href={`/portal/projects/${project.id}`}
      className={`${CARD} block transition hover:border-[#FFD700]/40`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-syne text-base font-bold text-white">{project.name}</p>
          <p className="mt-0.5 text-xs text-neutral-500">{project.code}</p>
        </div>
        <StatusPill status={project.status} />
      </div>

      {project.brief ? (
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-neutral-400">
          {project.brief}
        </p>
      ) : null}

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-neutral-500">
        {project.delivered_at ? (
          <span className="text-emerald-300/80">Delivered {formatDate(project.delivered_at)}</span>
        ) : project.due_at ? (
          <span className={overdue ? 'text-red-300' : undefined}>
            Due {formatDate(project.due_at)}
            {due ? ` · ${due}` : ''}
          </span>
        ) : (
          <span>Started {formatDate(project.started_at ?? project.created_at)}</span>
        )}

        <span>
          {closed
            ? `${project.revisions_used} of ${project.revisions_included} revision rounds used`
            : `${revisionsLeft} of ${project.revisions_included} revision rounds left`}
        </span>
      </div>
    </Link>
  );
}

export default async function PortalProjectsPage() {
  const session = await getSession('client');
  if (!session) redirect('/portal/login');

  const projects = await listProjects(session);
  const active = projects.filter((project) => !isProjectClosed(project.status));
  const closed = projects.filter((project) => isProjectClosed(project.status));

  return (
    <div className="space-y-10">
      <PageHeader
        title="Projects"
        subtitle="Where every piece of work stands, what has been delivered, and what is still to come."
      />

      {projects.length === 0 ? (
        <EmptyState
          title="No projects yet"
          hint="A project opens as soon as you accept a quote. You will see its milestones, its files and how many revision rounds are left."
        />
      ) : null}

      {active.length > 0 ? (
        <section>
          <h2 className="mb-4 font-syne text-lg font-bold text-white">In the studio</h2>
          <div className="space-y-3">
            {active.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      ) : null}

      {closed.length > 0 ? (
        <section>
          <h2 className="mb-4 font-syne text-lg font-bold text-white">Wrapped up</h2>
          <p className="mb-4 text-sm text-neutral-500">
            Finished work stays here for good, files and all — nothing is archived away from you.
          </p>
          <div className="space-y-3">
            {closed.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
