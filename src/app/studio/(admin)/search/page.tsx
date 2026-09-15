import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';
import {
  BTN_GHOST,
  Card,
  EmptyState,
  INPUT,
  PageHeader,
  StatusPill,
  formatDate,
} from '@/components/crm/ui';
import { contactName, formatRand } from '@/lib/crm/types';
import { getSession } from '@/lib/server/auth';
import { searchEverything } from '@/lib/server/crm';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Search',
  robots: { index: false, follow: false },
};

function one(value: string | string[] | undefined): string {
  return Array.isArray(value) ? (value[0] ?? '') : (value ?? '');
}

/**
 * A result row.
 *
 * Every hit is a link to the record, because reaching the record is the only
 * reason anyone is on this page. The right-hand slot carries whatever tells
 * them it is the right one — a status, a total, a date — so they can recognise
 * it without opening it first.
 */
function Hit({
  href,
  title,
  meta,
  right,
}: {
  href: string;
  title: string;
  meta?: string | null;
  right?: ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 rounded-lg px-3 py-2.5 transition hover:bg-white/5"
      >
        <span className="min-w-0">
          <span className="block truncate text-sm font-medium text-[#FFD700]">{title}</span>
          {meta ? <span className="block truncate text-xs text-neutral-500">{meta}</span> : null}
        </span>
        {right ? <span className="shrink-0 text-sm text-neutral-300">{right}</span> : null}
      </Link>
    </li>
  );
}

function Group({
  title,
  count,
  moreHref,
  children,
}: {
  title: string;
  count: number;
  moreHref: string;
  children: ReactNode;
}) {
  if (count === 0) return null;
  return (
    <Card>
      <div className="mb-2 flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="font-syne text-base font-bold text-white">
          {title} <span className="text-sm font-normal text-neutral-500">{count}</span>
        </h2>
        {/* Each list keeps its own search, so "see all" is a real continuation
            rather than dropping the term and starting again. */}
        <Link href={moreHref} className="text-xs text-neutral-400 underline underline-offset-4 hover:text-white">
          See all in {title.toLowerCase()}
        </Link>
      </div>
      <ul className="-mx-3">{children}</ul>
    </Card>
  );
}

export default async function StudioSearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await getSession('admin');
  if (!session) redirect('/studio/login');

  const params = await searchParams;
  const q = one(params.q).trim();
  const results = await searchEverything(q);
  const enc = encodeURIComponent(q);

  return (
    <>
      <PageHeader
        title="Search"
        subtitle={
          q
            ? `${results.total} result${results.total === 1 ? '' : 's'} for “${q}”`
            : 'Find a client, quote, invoice or project without picking a list first.'
        }
      />

      <form method="get" className="mb-5 flex flex-wrap items-center gap-2">
        <input
          type="search"
          name="q"
          defaultValue={q}
          autoFocus
          placeholder="Name, email, quote number, invoice number, project code"
          aria-label="Search the studio"
          className={`${INPUT} w-full sm:w-[28rem]`}
        />
        <button type="submit" className={BTN_GHOST}>
          Search
        </button>
        {q && (
          <Link href="/studio/search" className={BTN_GHOST}>
            Clear
          </Link>
        )}
      </form>

      {!q ? (
        <Card>
          <EmptyState
            title="What are you looking for?"
            hint="A person, a business, a quote or invoice number, or a project code. Partial words are fine."
          />
        </Card>
      ) : results.total === 0 ? (
        <Card>
          <EmptyState
            title={`Nothing matches “${q}”`}
            hint="Try part of a name or just the number — QUO, INV and WLX references all work."
          />
        </Card>
      ) : (
        <div className="space-y-5">
          <Group title="Contacts" count={results.contacts.length} moreHref={`/studio/contacts?q=${enc}`}>
            {results.contacts.map((c) => (
              <Hit
                key={c.id}
                href={`/studio/contacts/${c.id}`}
                title={contactName(c)}
                meta={[c.email, c.phone].filter(Boolean).join(' · ') || null}
                right={c.status === 'active' ? null : <StatusPill status={c.status} />}
              />
            ))}
          </Group>

          <Group title="Companies" count={results.companies.length} moreHref={`/studio/companies?q=${enc}`}>
            {results.companies.map((c) => (
              <Hit key={c.id} href={`/studio/companies/${c.id}`} title={c.name} meta={c.email} />
            ))}
          </Group>

          <Group title="Quotes" count={results.quotes.length} moreHref={`/studio/quotes?q=${enc}`}>
            {results.quotes.map((quote) => (
              <Hit
                key={quote.id}
                href={`/studio/quotes/${quote.id}`}
                title={quote.number}
                meta={`Issued ${formatDate(quote.created_at)}`}
                right={
                  <>
                    {formatRand(Number(quote.total))} <StatusPill status={quote.status} />
                  </>
                }
              />
            ))}
          </Group>

          <Group title="Invoices" count={results.invoices.length} moreHref={`/studio/invoices?q=${enc}`}>
            {results.invoices.map((invoice) => (
              <Hit
                key={invoice.id}
                href={`/studio/invoices/${invoice.id}`}
                title={invoice.number}
                meta={`${invoice.kind} · issued ${formatDate(invoice.issue_date)}`}
                right={
                  <>
                    {formatRand(Number(invoice.total))} <StatusPill status={invoice.status} />
                  </>
                }
              />
            ))}
          </Group>

          <Group title="Projects" count={results.projects.length} moreHref={`/studio/projects?q=${enc}`}>
            {results.projects.map((project) => (
              <Hit
                key={project.id}
                href={`/studio/projects/${project.id}`}
                title={project.code ? `${project.code} · ${project.name}` : project.name}
                meta={project.due_at ? `Due ${formatDate(project.due_at)}` : null}
                right={<StatusPill status={project.status} />}
              />
            ))}
          </Group>
        </div>
      )}
    </>
  );
}
