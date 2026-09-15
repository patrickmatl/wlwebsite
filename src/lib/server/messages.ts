import { db } from './db';
import { sendEmail } from './notify';
import { signatureHtml, signatureText } from './email-signature';
import { createThread, tagSubject, type ThreadRow } from './threads';
import { fileBytes, getFile, listFilesForContact, type StoredFile } from './files';
import { logActivity } from './crm';

/**
 * Talking to a client from the studio.
 *
 * Every email in and out of this business already lands in `quote_messages` —
 * the agent writes there, the inbound poller writes there, the follow-up cron
 * writes there. The only way to *read* any of it was the approval queue, which
 * shows a thread solely while a draft is waiting on it, and the only way to
 * write was to approve something the agent had composed. There was no way to
 * simply email a client a question.
 *
 * So this is the conversation itself, separated from the approval machinery: a
 * list of who we are talking to, one page per conversation, and a box to type
 * in. A message sent from here goes out under the same thread reference the
 * agent uses, which is what makes the client's reply come back to the same
 * place rather than opening a second conversation about the same job.
 */

const INK = '#111111';

export type ConversationMessage = {
  id: string;
  created_at: string;
  role: 'client' | 'studio' | 'draft';
  subject: string | null;
  body: string;
  sent_at: string | null;
};

export type ConversationSummary = {
  threadId: string;
  ref: string | null;
  subject: string;
  state: string;
  updatedAt: string;
  clientName: string;
  clientEmail: string;
  contactId: string | null;
  lastRole: 'client' | 'studio' | 'draft' | null;
  lastSnippet: string;
  /** The client spoke last, or a draft is queued: it is our move. */
  needsUs: boolean;
};

export type Conversation = {
  thread: ThreadRow;
  clientName: string;
  clientEmail: string;
  contactId: string | null;
  messages: ConversationMessage[];
  files: StoredFile[];
};

type LeadRow = {
  id: string;
  name: string | null;
  email: string | null;
  contact_id: string | null;
};

function snippet(text: string, length = 140): string {
  return text.replace(/\s+/g, ' ').trim().slice(0, length);
}

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** The studio's words, with blank lines kept as paragraph breaks. */
function paragraphs(message: string): string {
  return message
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map(
      (p) =>
        `<p style="margin:0 0 14px 0;font-size:15px;line-height:23px;color:${INK};">${esc(p).replace(/\n/g, '<br />')}</p>`,
    )
    .join('');
}

/**
 * Every conversation, most recently active first.
 *
 * Deliberately not filtered by state. A closed conversation is still the place
 * you go to see what was said, and to say something else.
 */
export async function listConversations(limit = 200): Promise<ConversationSummary[]> {
  const { data: threads } = await db()
    .from('quote_threads')
    .select('id, lead_id, subject, ref, state, follow_ups_sent, updated_at')
    .order('updated_at', { ascending: false })
    .limit(limit);

  const rows = (threads ?? []) as (ThreadRow & { updated_at: string })[];
  if (rows.length === 0) return [];

  const leadIds = [...new Set(rows.map((t) => t.lead_id))];
  const { data: leads } = await db()
    .from('leads')
    .select('id, name, email, contact_id')
    .in('id', leadIds);

  const leadById = new Map<string, LeadRow>();
  for (const l of (leads ?? []) as LeadRow[]) leadById.set(l.id, l);

  /**
   * One query for the last message of every thread rather than one per thread.
   * Ordered newest first, so the first sighting of a thread id is its latest.
   */
  const { data: recent } = await db()
    .from('quote_messages')
    .select('thread_id, role, body, created_at')
    .in('thread_id', rows.map((t) => t.id))
    .order('created_at', { ascending: false })
    .limit(2000);

  const lastByThread = new Map<string, { role: string; body: string }>();
  for (const m of (recent ?? []) as { thread_id: string; role: string; body: string }[]) {
    if (!lastByThread.has(m.thread_id)) lastByThread.set(m.thread_id, m);
  }

  return rows.map((t) => {
    const lead = leadById.get(t.lead_id);
    const last = lastByThread.get(t.id);
    const role = (last?.role as ConversationSummary['lastRole']) ?? null;
    return {
      threadId: t.id,
      ref: t.ref,
      subject: t.subject,
      state: t.state,
      updatedAt: t.updated_at,
      clientName: lead?.name?.trim() || lead?.email || 'Unknown',
      clientEmail: lead?.email ?? '',
      contactId: lead?.contact_id ?? null,
      lastRole: role,
      lastSnippet: last ? snippet(last.body) : '',
      needsUs: t.state === 'awaiting_approval' || role === 'client',
    };
  });
}

export async function getConversation(threadId: string): Promise<Conversation | null> {
  const { data: thread } = await db()
    .from('quote_threads')
    .select('*')
    .eq('id', threadId)
    .maybeSingle();
  if (!thread) return null;

  const t = thread as ThreadRow;

  const [{ data: lead }, { data: messages }] = await Promise.all([
    db().from('leads').select('id, name, email, contact_id').eq('id', t.lead_id).maybeSingle(),
    db()
      .from('quote_messages')
      .select('id, created_at, role, subject, body, sent_at')
      .eq('thread_id', threadId)
      .order('created_at', { ascending: true }),
  ]);

  const l = (lead ?? null) as LeadRow | null;
  const contactId = l?.contact_id ?? null;

  return {
    thread: t,
    clientName: l?.name?.trim() || l?.email || 'Unknown',
    clientEmail: l?.email ?? '',
    contactId,
    // Drafts are left out on purpose: an unapproved draft is not part of the
    // conversation, and showing it here would read as something already said.
    messages: ((messages ?? []) as ConversationMessage[]).filter(
      (m) => m.role === 'client' || (m.role === 'studio' && m.sent_at),
    ),
    files: contactId ? await listFilesForContact(contactId) : [],
  };
}

/** The conversation to open for a contact, if they have one. */
export async function threadIdForContact(contactId: string): Promise<string | null> {
  const { data: leads } = await db()
    .from('leads')
    .select('id')
    .eq('contact_id', contactId)
    .order('created_at', { ascending: false });

  const ids = (leads ?? []).map((l) => (l as { id: string }).id);
  if (ids.length === 0) return null;

  const { data: thread } = await db()
    .from('quote_threads')
    .select('id')
    .in('lead_id', ids)
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  return (thread as { id: string } | null)?.id ?? null;
}

/**
 * Open a conversation with somebody who has never emailed us.
 *
 * A thread needs a lead because that is what it hangs off, so one is written
 * for a contact that has none. It is marked `quoted` rather than `new` so it
 * does not appear in the pipeline as an enquiry that arrived: nobody enquired,
 * the studio started this.
 */
export async function startConversationWithContact(
  contactId: string,
  subject = 'A message from WL CreationX',
): Promise<string> {
  const existing = await threadIdForContact(contactId);
  if (existing) return existing;

  const { data: contact } = await db()
    .from('contacts')
    .select('id, first_name, last_name, email')
    .eq('id', contactId)
    .maybeSingle();

  if (!contact) throw new Error(`contact ${contactId} not found`);
  const c = contact as { first_name: string | null; last_name: string | null; email: string };
  const name = [c.first_name, c.last_name].filter(Boolean).join(' ').trim() || c.email;

  const { data: lead, error } = await db()
    .from('leads')
    .insert({
      name,
      email: c.email,
      details: 'Conversation started from the studio.',
      status: 'quoted',
      contact_id: contactId,
    })
    .select('id')
    .single();

  if (error || !lead) throw new Error(`could not open a conversation: ${error?.message}`);

  const thread = await createThread({ leadId: (lead as { id: string }).id, subject });
  return thread.id;
}

export type SendMessageResult = {
  messageId: string;
  to: string;
  subject: string;
  attached: string[];
};

/**
 * Send a message the studio typed.
 *
 * The thread reference goes in the subject exactly as the agent does it, so a
 * reply comes back to this conversation instead of starting a new one. The
 * message is recorded as `studio` with `sent_at` set, which is the same shape
 * an approved draft leaves behind — the conversation cannot tell, and should
 * not be able to tell, whether a human or the agent wrote a given line.
 */
export async function sendStudioMessage(params: {
  threadId: string;
  body: string;
  subject?: string | null;
  /** Ids of files already stored by the upload route. */
  fileIds?: string[];
  actor?: string;
}): Promise<SendMessageResult> {
  const body = params.body?.trim();
  if (!body) throw new Error('a message needs something to say');

  const conversation = await getConversation(params.threadId);
  if (!conversation) throw new Error(`conversation ${params.threadId} not found`);

  const to = conversation.clientEmail?.trim();
  if (!to) throw new Error('this conversation has no email address to reply to');

  const subject = tagSubject(
    params.subject?.trim() || conversation.thread.subject || 'A message from WL CreationX',
    conversation.thread.ref,
  );

  /**
   * Attachments are fetched back out of storage rather than kept in memory
   * from the upload: the file is already the record, and reading it here means
   * what the client receives is exactly what the studio can see afterwards.
   */
  const attachments: { filename: string; content: Buffer; contentType?: string }[] = [];
  for (const id of params.fileIds ?? []) {
    const file = await getFile(id);
    if (!file) continue;
    attachments.push({
      filename: file.name,
      content: await fileBytes(file),
      contentType: file.mime ?? undefined,
    });
  }

  await sendEmail({
    to,
    subject,
    text: `${body}\n\n${signatureText()}`,
    html:
      `<div style="font-family:Helvetica,Arial,sans-serif;max-width:560px;">` +
      paragraphs(body) +
      signatureHtml() +
      `</div>`,
    attachments: attachments.length > 0 ? attachments : undefined,
  });

  const { data: message, error } = await db()
    .from('quote_messages')
    .insert({
      thread_id: params.threadId,
      role: 'studio',
      subject,
      body,
      sent_at: new Date().toISOString(),
      approved_by: params.actor ?? 'studio',
    })
    .select('id')
    .single();

  if (error || !message) throw new Error(`sent, but not recorded: ${error?.message}`);

  // The ball is with the client, and anything they have not replied to yet
  // should not count against the follow-up sequence twice.
  await db()
    .from('quote_threads')
    .update({ state: 'awaiting_client', follow_ups_sent: 0, updated_at: new Date().toISOString() })
    .eq('id', params.threadId);

  if (conversation.contactId) {
    await logActivity({
      entityType: 'contact',
      entityId: conversation.contactId,
      kind: 'message_sent',
      title: `Email sent to ${to}`,
      body,
      actor: params.actor ?? 'studio',
      meta: attachments.length > 0 ? { attached: attachments.map((a) => a.filename) } : undefined,
    });
  }

  return {
    messageId: (message as { id: string }).id,
    to,
    subject,
    attached: attachments.map((a) => a.filename),
  };
}
