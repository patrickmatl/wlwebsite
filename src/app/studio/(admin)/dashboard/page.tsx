import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';
import {
  Badge,
  Card,
  EmptyState,
  Money,
  PageHeader,
  Stat,
  formatDate,
  relativeTime,
} from '@/components/crm/ui';
import { formatRand, round2, type EntityType } from '@/lib/crm/types';
import { getDashboardView } from '@/lib/server/crm';
import { getSession } from '@/lib/server/auth';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Dashboard',
  robots: { index: false, follow: false },
};

/** Where each kind of record lives in the studio. */
const ENTITY_PATHS: Record<EntityType, string> = {
  contact: '/studio/contacts',
  company: '/studio/companies',
  deal: '/studio/deals',
  quote: '/studio/quotes',
  project: '/studio/projects',
  invoice: '/studio/invoices',
  // Leads and agent threads have no record page of their own — they are worked
  // through the approval queue.
  lead: '/studio/inbox',
  thread: '/studio/inbox',
};

function entityHref(type: EntityType | null, id: string | null): string | null {
  if (!type || !id) return null;
  const base = ENTITY_PATHS[type];
  // Activity rows are historical: a `kind` written by a future migration would
  // land here as an unmapped type, and an unlinked row beats a dead link.
  if (!base) return null;
  return type === 'lead' || type === 'thread' ? base : `${base}/${id}`;
}

/**
 * Whole days elapsed since a date.
 *
 * Positive means it is in the past. Dates arrive as `date` columns (midnight
 * UTC), which is close enough for "how late is this" — nobody chases an
 * invoice to the hour.
 */
function daysSince(value: string | null): number | null {
  if (!value) return null;
  const then = Date.parse(value);
  if (Number.isNaN(then)) return null;
  return Math.floor((Date.now() - then) / 86_400_000);
}

function plural(n: number, word: string): string {
  return `${n} ${word}${n === 1 ? '' : 's'}`;
}

/**
 * The server runs in UTC and Patrick does not, so the hour has to be asked for
 * in his timezone or the dashboard wishes him good morning at eight at night.
 */
function greeting(): string {
  const hour = Number(
    new Intl.DateTimeFormat('en-ZA', {
      timeZone: 'Africa/Johannesburg',
      hour: 'numeric',
      hour12: false,
    }).format(new Date()),
  );
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

function AttentionRow({
  href,
  title,
  meta,
  amount,
  flag,
}: {
  href: string;
  title: string;
  meta: string;
  amount?: number | null;
  flag?: ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="-mx-2 flex items-start justify-between gap-3 rounded-lg px-2 py-2.5 transition hover:bg-white/5"
      >
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="min-w-0 break-words text-sm font-medium text-white">{title}</span>
            {flag}
          </div>
          <p className="mt-0.5 text-xs text-neutral-500">{meta}</p>
        </div>
        {amount !== undefined && amount !== null && (
          <Money amount={amount} className="shrink-0 text-sm font-medium text-neutral-200" />
        )}
      </Link>
    </li>
  );
}

function AttentionGroup({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section className="mb-5 last:mb-0">
      <h3 className="mb-1 text-xs font-medium uppercase tracking-wide text-neutral-400">
        {heading}
      </h3>
      <ul className="divide-y divide-white/5">{children}</ul>
    </section>
  );
}

export default async function DashboardPage() {
  const session = await getSession('admin');
  if (!session) redirect('/studio/login');

  const { metrics, overdueInvoices, staleQuotes, dueTasks, activity } = await getDashboardView();

  const attentionCount = overdueInvoices.length + staleQuotes.length + dueTasks.length;
  const firstName = session.name.split(' ')[0] || session.name;

  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle={`${greeting()}, ${firstName}. Here is where the studio stands.`}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat
          label="Open pipeline"
          value={formatRand(metrics.pipelineValue)}
          hint={plural(metrics.pipelineCount, 'deal') + ' still in play'}
          href="/studio/deals"
        />
        <Stat
          label="Quotes awaiting reply"
          value={String(metrics.quotesAwaiting)}
          hint={`${formatRand(metrics.quotesAwaitingValue)} out with clients`}
          href="/studio/quotes"
        />
        <Stat
          label="Outstanding"
          value={formatRand(metrics.outstandingTotal)}
          hint={
            metrics.overdueTotal > 0
              ? `${plural(metrics.outstandingCount, 'invoice')} · ${formatRand(metrics.overdueTotal)} overdue`
              : `${plural(metrics.outstandingCount, 'invoice')} unpaid`
          }
          href="/studio/invoices"
        />
        <Stat
          label="Active projects"
          value={String(metrics.activeProjects)}
          hint="On the desk right now"
          href="/studio/projects"
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        {/* ── Needs attention ──────────────────────────────────────────── */}
        <Card className="lg:col-span-3">
          <div className="mb-4 flex items-baseline justify-between gap-3">
            <h2 className="font-syne text-lg font-bold text-white">Needs attention</h2>
            {attentionCount > 0 && <Badge tone="gold">{attentionCount}</Badge>}
          </div>

          {attentionCount === 0 ? (
            <EmptyState
              title="Nothing to chase"
              hint="Overdue invoices, quotes that have gone quiet and tasks due today will collect here."
            />
          ) : (
            <>
              {overdueInvoices.length > 0 && (
                <AttentionGroup heading="Overdue invoices">
                  {overdueInvoices.map((invoice) => {
                    const late = daysSince(invoice.due_date);
                    return (
                      <AttentionRow
                        key={invoice.id}
                        href={`/studio/invoices/${invoice.id}`}
                        title={`Invoice ${invoice.number}`}
                        meta={[invoice.clientName, `due ${formatDate(invoice.due_date)}`]
                          .filter(Boolean)
                          .join(' · ')}
                        amount={round2(invoice.total - invoice.amount_paid)}
                        flag={
                          <Badge tone="red">
                            {late !== null && late > 0 ? `${plural(late, 'day')} late` : 'Overdue'}
                          </Badge>
                        }
                      />
                    );
                  })}
                </AttentionGroup>
              )}

              {staleQuotes.length > 0 && (
                <AttentionGroup heading="Quotes with no answer">
                  {staleQuotes.map((quote) => {
                    const quiet = daysSince(quote.sent_at);
                    return (
                      <AttentionRow
                        key={quote.id}
                        href={`/studio/quotes/${quote.id}`}
                        title={`Quote ${quote.number}`}
                        meta={[
                          quote.clientName,
                          `sent ${formatDate(quote.sent_at)}`,
                          quote.viewed_at ? `opened ${relativeTime(quote.viewed_at)}` : 'never opened',
                        ]
                          .filter(Boolean)
                          .join(' · ')}
                        amount={quote.total}
                        flag={
                          <Badge tone="gold">
                            {quiet === null ? 'No answer' : `${plural(quiet, 'day')} quiet`}
                          </Badge>
                        }
                      />
                    );
                  })}
                </AttentionGroup>
              )}

              {dueTasks.length > 0 && (
                <AttentionGroup heading="Tasks due">
                  {dueTasks.map((task) => {
                    const late = daysSince(task.due_at);
                    const overdue = late !== null && late > 0;
                    return (
                      <AttentionRow
                        key={task.id}
                        href={entityHref(task.entity_type, task.entity_id) ?? '/studio/tasks'}
                        title={task.title}
                        meta={
                          task.due_at
                            ? overdue
                              ? `Was due ${formatDate(task.due_at)}`
                              : `Due today, ${formatDate(task.due_at)}`
                            : 'No due date'
                        }
                        flag={
                          task.priority === 'high' ? (
                            <Badge tone="red">High</Badge>
                          ) : overdue ? (
                            <Badge tone="red">Overdue</Badge>
                          ) : (
                            <Badge tone="gold">Today</Badge>
                          )
                        }
                      />
                    );
                  })}
                </AttentionGroup>
              )}
            </>
          )}
        </Card>

        {/* ── Recent activity ──────────────────────────────────────────── */}
        <Card className="lg:col-span-2">
          <h2 className="mb-4 font-syne text-lg font-bold text-white">Recent activity</h2>

          {activity.length === 0 ? (
            <EmptyState
              title="Nothing has happened yet"
              hint="Quotes sent, invoices paid and notes added all land here as they happen."
            />
          ) : (
            <ol className="space-y-4 border-l border-white/10 pl-4">
              {activity.map((entry) => {
                const href = entityHref(entry.entity_type, entry.entity_id);
                const body = (
                  <>
                    <p className="text-sm text-neutral-200">{entry.title}</p>
                    {entry.body && (
                      <p className="mt-0.5 line-clamp-2 text-xs text-neutral-500">{entry.body}</p>
                    )}
                    <p className="mt-0.5 text-xs text-neutral-500">
                      {entry.actor} · {relativeTime(entry.created_at)}
                    </p>
                  </>
                );

                return (
                  <li key={entry.id} className="relative">
                    <span
                      aria-hidden
                      className="absolute -left-5 top-1.5 h-2 w-2 rounded-full bg-[#FFD700]/60"
                    />
                    {href ? (
                      <Link
                        href={href}
                        className="-mx-2 block rounded-lg px-2 py-1 transition hover:bg-white/5"
                      >
                        {body}
                      </Link>
                    ) : (
                      <div className="px-2 py-1">{body}</div>
                    )}
                  </li>
                );
              })}
            </ol>
          )}
        </Card>
      </div>
    </>
  );
}
