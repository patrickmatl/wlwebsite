import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { CARD, Card, Money, Stat, StatusPill, formatDate } from '@/components/crm/ui';
import { formatRand } from '@/lib/crm/types';
import type { Project } from '@/lib/crm/types';
import { getSession } from '@/lib/server/auth';
import { getSummary, listProjects } from '@/lib/server/portal';
import { dueLanguage, firstName, isPast, isProjectClosed } from '../format';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Overview',
  robots: { index: false, follow: false },
};

function ProjectRow({ project }: { project: Project }) {
  const due = dueLanguage(project.due_at);
  const overdue = isPast(project.due_at) && !isProjectClosed(project.status);

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

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-neutral-400">
        {project.due_at ? (
          <span className={overdue ? 'text-red-300' : undefined}>
            Due {formatDate(project.due_at)}
            {due ? ` · ${due}` : ''}
          </span>
        ) : null}
        <span>
          {project.revisions_used} of {project.revisions_included} revision rounds used
        </span>
      </div>
    </Link>
  );
}

export default async function PortalOverviewPage() {
  const session = await getSession('client');
  if (!session) redirect('/portal/login');

  const [summary, projects] = await Promise.all([getSummary(session), listProjects(session)]);

  const active = projects.filter((project) => !isProjectClosed(project.status));
  const closed = projects.filter((project) => isProjectClosed(project.status));

  const quotesWaiting = summary.awaitingYou.filter((item) => item.kind === 'quote');
  const invoicesWaiting = summary.awaitingYou.filter((item) => item.kind === 'invoice');
  const nothingWaiting = summary.awaitingYou.length === 0;
  const hasHistory = projects.length > 0 || summary.awaitingYou.length > 0;

  return (
    <div className="space-y-10">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFD700]">
          Client portal
        </p>
        <h1 className="mt-2 font-syne text-3xl font-bold text-white">
          Good to see you, {firstName(session.name)}.
        </h1>
      </div>

      {/* What needs them, first and unmissable. Everything further down this
          page is reference; this is the only part that asks for anything. */}
      <section>
        {nothingWaiting ? (
          <div className="rounded-xl border border-[#FFD700]/25 bg-[#FFD700]/[0.04] p-6">
            <p className="font-syne text-lg font-bold text-[#FFD700]">
              Nothing needs you right now.
            </p>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-neutral-300">
              {active.length > 0
                ? 'Your work is with us and moving along. We will email you the moment there is something to look over — until then there is nothing to chase.'
                : 'No quotes waiting on an answer, and nothing outstanding. If you have something new in mind, reply to any of our emails and we will pick it up from there.'}
            </p>
          </div>
        ) : (
          <>
            <h2 className="mb-4 font-syne text-lg font-bold text-white">Waiting on you</h2>
            <div className="space-y-3">
              {quotesWaiting.map((item) => (
                <Link
                  key={item.id}
                  href={`/portal/quotes/${item.id}`}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#FFD700]/30 bg-[#FFD700]/[0.05] p-5 transition hover:border-[#FFD700]/60"
                >
                  <div className="min-w-0">
                    <p className="font-syne text-base font-bold text-white">{item.label}</p>
                    <p className="mt-0.5 text-xs text-neutral-400">
                      Ready for your yes or no. There is no rush and no obligation.
                    </p>
                  </div>
                  <div className="text-right">
                    <Money
                      amount={item.amount}
                      className="block font-syne text-lg font-bold text-[#FFD700]"
                    />
                    <span className="text-xs text-neutral-400">Read it through</span>
                  </div>
                </Link>
              ))}

              {invoicesWaiting.map((item) => (
                <Link
                  key={item.id}
                  href={`/portal/invoices/${item.id}`}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/15 bg-white/[0.03] p-5 transition hover:border-white/30"
                >
                  <div className="min-w-0">
                    <p className="font-syne text-base font-bold text-white">{item.label}</p>
                    <p className="mt-0.5 text-xs text-neutral-400">
                      Payable by EFT. Banking details are on the invoice.
                    </p>
                  </div>
                  <div className="text-right">
                    <Money
                      amount={item.amount}
                      className="block font-syne text-lg font-bold text-white"
                    />
                    <span className="text-xs text-neutral-400">Still outstanding</span>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </section>

      {hasHistory ? (
        <section className="grid gap-4 sm:grid-cols-3">
          <Stat
            label="Open quotes"
            value={String(summary.openQuotes)}
            hint="awaiting your answer"
            href="/portal/quotes"
          />
          <Stat
            label="Active projects"
            value={String(summary.activeProjects)}
            hint="in the studio right now"
            href="/portal/projects"
          />
          <Stat
            label="Outstanding"
            value={formatRand(summary.amountOutstanding)}
            hint={
              summary.unpaidInvoices === 1
                ? 'across 1 invoice'
                : `across ${summary.unpaidInvoices} invoices`
            }
            href="/portal/invoices"
          />
        </section>
      ) : null}

      <section>
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="font-syne text-lg font-bold text-white">Your projects</h2>
          {projects.length > 0 ? (
            <Link
              href="/portal/projects"
              className="text-xs text-neutral-400 underline underline-offset-4 transition hover:text-[#FFD700]"
            >
              See all
            </Link>
          ) : null}
        </div>

        {active.length > 0 ? (
          <div className="space-y-3">
            {active.map((project) => (
              <ProjectRow key={project.id} project={project} />
            ))}
          </div>
        ) : closed.length > 0 ? (
          <Card>
            <p className="text-sm text-neutral-300">
              Nothing in the studio at the moment — everything is wrapped up.
            </p>
            <p className="mt-2 text-xs text-neutral-500">
              Your delivered work stays here, files and all.{' '}
              <Link
                href="/portal/projects"
                className="underline underline-offset-4 transition hover:text-[#FFD700]"
              >
                Open your project history
              </Link>
              .
            </p>
          </Card>
        ) : (
          <Card>
            <p className="text-sm text-neutral-300">
              Your first project will appear here the moment a quote is accepted.
            </p>
            <p className="mt-2 text-xs leading-relaxed text-neutral-500">
              You will be able to follow every milestone, download the files as they land, and see
              exactly how many revision rounds are left.
            </p>
          </Card>
        )}
      </section>
    </div>
  );
}
