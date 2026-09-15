import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { Badge, BTN_GHOST, Card, PageHeader, formatDateTime, relativeTime } from '@/components/crm/ui';
import { getSession } from '@/lib/server/auth';
import { formatBytes } from '@/lib/server/files';
import { getConversation } from '@/lib/server/messages';
import Composer from './Composer';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Conversation',
  robots: { index: false, follow: false },
};

/**
 * One conversation, oldest at the top.
 *
 * Read like a transcript rather than an inbox: a client's message and our
 * reply sit in the order they happened, so you can see what was actually
 * agreed without reconstructing it from five forwarded emails.
 *
 * Drafts the agent has written but nobody has approved are not here. They are
 * not part of the conversation until they are sent, and showing them would put
 * words in the studio's mouth that the client has never read. They stay in the
 * approval queue where they can still be edited.
 */
export default async function ConversationPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getSession('admin');
  if (!session) redirect('/studio/login');

  const { id } = await params;
  const conversation = await getConversation(id);
  if (!conversation) notFound();

  const { thread, clientName, clientEmail, contactId, messages, files } = conversation;

  return (
    <>
      <PageHeader
        title={clientName}
        subtitle={[thread.subject, clientEmail].filter(Boolean).join(' · ')}
      />

      <div className="mb-5 flex flex-wrap gap-3">
        <Link href="/studio/messages" className={BTN_GHOST}>
          All conversations
        </Link>
        {contactId && (
          <Link href={`/studio/contacts/${contactId}`} className={BTN_GHOST}>
            Open the contact
          </Link>
        )}
        {thread.ref && (
          <span className="self-center text-xs text-neutral-600">
            Reference {thread.ref} — it rides in the subject line so replies come back here
          </span>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="space-y-5 lg:col-span-3">
          <Card>
            <h2 className="mb-4 font-syne text-lg font-bold text-white">Conversation</h2>

            {messages.length === 0 ? (
              <p className="text-sm text-neutral-500">
                Nothing has been said yet. Whatever you type below will be the first message.
              </p>
            ) : (
              <ol className="space-y-4">
                {messages.map((message) => {
                  const fromClient = message.role === 'client';
                  return (
                    <li
                      key={message.id}
                      className={`rounded-xl border p-4 ${
                        fromClient
                          ? 'border-white/10 bg-white/[0.03]'
                          : 'border-[#FFD700]/20 bg-[#FFD700]/[0.04]'
                      }`}
                    >
                      <div className="mb-1.5 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                        <span
                          className={`text-xs font-medium uppercase tracking-wide ${
                            fromClient ? 'text-neutral-400' : 'text-[#FFD700]'
                          }`}
                        >
                          {fromClient ? clientName : 'WL CreationX'}
                        </span>
                        <span
                          className="shrink-0 text-xs text-neutral-600"
                          title={formatDateTime(message.sent_at ?? message.created_at)}
                        >
                          {relativeTime(message.sent_at ?? message.created_at)}
                        </span>
                      </div>
                      <p className="whitespace-pre-wrap text-sm leading-relaxed text-neutral-200">
                        {message.body}
                      </p>
                    </li>
                  );
                })}
              </ol>
            )}
          </Card>

          <Card>
            <h2 className="mb-3 font-syne text-lg font-bold text-white">Reply</h2>
            <Composer
              threadId={thread.id}
              clientName={clientName}
              clientEmail={clientEmail}
              contactId={contactId}
            />
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-syne text-lg font-bold text-white">Files</h2>
              {files.length > 0 && <Badge tone="neutral">{files.length}</Badge>}
            </div>

            {files.length === 0 ? (
              <p className="text-sm text-neutral-500">
                Nothing exchanged yet. Anything you attach to a reply is kept here, and so is
                anything they send back.
              </p>
            ) : (
              <ul className="-mx-2 divide-y divide-white/5">
                {files.map((file) => (
                  <li key={file.id}>
                    <a
                      href={`/api/studio/files/${file.id}`}
                      className="block rounded-lg px-2 py-2.5 transition hover:bg-white/5"
                    >
                      <span className="block truncate text-sm font-medium text-[#FFD700]">
                        {file.name}
                      </span>
                      <span className="mt-0.5 block text-xs text-neutral-500">
                        {[
                          file.uploaded_by === 'studio' ? 'Sent by us' : 'From the client',
                          formatBytes(file.size_bytes),
                          relativeTime(file.created_at),
                        ]
                          .filter(Boolean)
                          .join(' · ')}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            )}

            {!contactId && (
              <p className="mt-3 border-t border-white/10 pt-3 text-xs text-neutral-600">
                This conversation is not linked to a contact yet, so files cannot be filed against
                anyone. Open the contact record first and the panel will fill in.
              </p>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}
