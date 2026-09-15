import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Badge, BTN_GHOST, Card, EmptyState, INPUT, PageHeader, relativeTime } from '@/components/crm/ui';
import { getSession } from '@/lib/server/auth';
import { listConversations } from '@/lib/server/messages';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Messages',
  robots: { index: false, follow: false },
};

function one(value: string | string[] | undefined): string {
  return Array.isArray(value) ? (value[0] ?? '') : (value ?? '');
}

/**
 * Who we are talking to.
 *
 * Not the approval queue. That page answers "what has the agent written that I
 * have not sent yet", and a conversation vanishes from it the moment there is
 * nothing pending — which is exactly when you want to go and say something.
 * This one is the list of people, and it never empties.
 */
export default async function MessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await getSession('admin');
  if (!session) redirect('/studio/login');

  const params = await searchParams;
  const q = one(params.q).trim().toLowerCase();

  const all = await listConversations();
  const conversations = q
    ? all.filter((c) =>
        [c.clientName, c.clientEmail, c.subject, c.ref ?? '']
          .join(' ')
          .toLowerCase()
          .includes(q),
      )
    : all;

  const waiting = all.filter((c) => c.needsUs).length;

  return (
    <>
      <PageHeader
        title="Messages"
        subtitle={
          waiting > 0
            ? `${waiting} ${waiting === 1 ? 'conversation is' : 'conversations are'} waiting on you.`
            : 'Every conversation with a client, and somewhere to type.'
        }
      />

      <form method="get" className="mb-5 flex flex-wrap items-center gap-2">
        <input
          type="search"
          name="q"
          defaultValue={one(params.q)}
          placeholder="Search by name, address or subject"
          aria-label="Search conversations"
          className={`${INPUT} w-full sm:w-80`}
        />
        <button type="submit" className={BTN_GHOST}>
          Search
        </button>
        {q && (
          <Link href="/studio/messages" className={BTN_GHOST}>
            Clear
          </Link>
        )}
      </form>

      <Card>
        {conversations.length === 0 ? (
          <EmptyState
            title={q ? `No conversation matches “${one(params.q)}”` : 'No conversations yet'}
            hint="A conversation starts the first time someone emails the studio, or when you open one from a contact."
          />
        ) : (
          <ul className="-mx-2 divide-y divide-white/5">
            {conversations.map((c) => (
              <li key={c.threadId}>
                <Link
                  href={`/studio/messages/${c.threadId}`}
                  className="block rounded-lg px-2 py-3 transition hover:bg-white/5"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <span className="flex min-w-0 flex-wrap items-center gap-2">
                      <span className="truncate text-sm font-medium text-white">
                        {c.clientName}
                      </span>
                      {c.needsUs && <Badge tone="gold">Your turn</Badge>}
                      {c.state === 'closed' && <Badge tone="neutral">Closed</Badge>}
                    </span>
                    <span className="shrink-0 text-xs text-neutral-500">
                      {relativeTime(c.updatedAt)}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-neutral-400">{c.subject}</p>
                  {c.lastSnippet && (
                    <p className="mt-1 truncate text-xs text-neutral-600">
                      {c.lastRole === 'client' ? 'They said' : 'You said'}: {c.lastSnippet}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </>
  );
}
