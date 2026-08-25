import { db } from './db';
import { draftReply, type ConversationTurn } from '@/lib/quote-agent';
import { notifyOwner } from './notify';

/**
 * Shared handling for a client's email reply, whatever brought it in.
 *
 * Two transports reach this:
 *   - /api/inbound       — Resend's inbound webhook (push)
 *   - /api/inbound/poll  — IMAP poll of the quotes@ mailbox (pull, cPanel cron)
 *
 * Both append the client's message to the thread, ask the agent for the next
 * move, and queue that draft for approval. The client never receives an
 * automated reply without a human approving it in /studio.
 */

/** Strip quoted history so the agent reads only what the client just wrote. */
export function stripQuotedReply(text: string): string {
  const cutMarkers = [
    /^On .+ wrote:$/m,
    /^-{2,}\s*Original Message\s*-{2,}$/im,
    /^_{10,}$/m,
    /^From:\s.+$/m,
    /^─{20,}$/m, // our own quote divider
    /^-{2,}\s*$/m, // signature delimiter
  ];
  let out = text;
  for (const marker of cutMarkers) {
    const m = out.match(marker);
    if (m && m.index !== undefined) out = out.slice(0, m.index);
  }
  return out
    .split('\n')
    .filter((l) => !l.trim().startsWith('>'))
    .join('\n')
    .trim();
}

/** Pull a bare address out of "Name <addr@host>" or a plain address. */
export function parseAddress(raw: string): string {
  return (raw.match(/<([^>]+)>/)?.[1] ?? raw).trim().toLowerCase();
}

export type InboundResult =
  | { handled: true; threadId: string; action: 'ask' | 'quote' | 'failed' }
  | { handled: false; reason: string };

export async function processInboundEmail(params: {
  fromRaw: string;
  subject?: string | null;
  text: string;
}): Promise<InboundResult> {
  const fromEmail = parseAddress(params.fromRaw ?? '');
  const body = stripQuotedReply(params.text ?? '');

  if (!fromEmail || !body) return { handled: false, reason: 'no usable sender or body' };

  // Find this sender's most recent lead, and its thread.
  const { data: lead } = await db()
    .from('leads')
    .select('*')
    .ilike('email', fromEmail)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!lead) {
    // Unknown sender — notify rather than drop it on the floor.
    await notifyOwner({
      title: `Email from unknown sender: ${fromEmail}`,
      summary: body.slice(0, 160),
      threadId: '',
    }).catch(() => {});
    return { handled: false, reason: 'no matching lead' };
  }

  const { data: thread } = await db()
    .from('quote_threads')
    .select('*')
    .eq('lead_id', lead.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!thread) return { handled: false, reason: 'no thread' };

  await db().from('quote_messages').insert({
    thread_id: thread.id,
    role: 'client',
    subject: params.subject ?? null,
    body,
  });

  try {
    // Rebuild the conversation (sent messages only — drafts never happened
    // from the client's point of view).
    const { data: msgs } = await db()
      .from('quote_messages')
      .select('role, body, sent_at')
      .eq('thread_id', thread.id)
      .order('created_at', { ascending: true });

    const history: ConversationTurn[] = (msgs ?? [])
      .filter((m) => m.role === 'client' || (m.role === 'studio' && m.sent_at))
      .map((m) => ({ role: m.role === 'client' ? 'client' : 'studio', text: m.body }));

    const draft = await draftReply({
      enquiry: {
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        service: lead.service,
        budget: lead.budget,
        timeline: lead.timeline,
        details: lead.details,
      },
      history,
    });

    await db().from('quote_messages').insert({
      thread_id: thread.id,
      role: 'draft',
      subject: draft.email_subject,
      body: draft.email_body,
      action: draft.action,
      reasoning: draft.reasoning,
      confidence: draft.confidence,
      quote_lines: draft.lines,
      quote_total: draft.total,
    });

    await db().from('quote_threads').update({ state: 'awaiting_approval' }).eq('id', thread.id);

    await notifyOwner({
      title:
        draft.action === 'quote'
          ? `${lead.name} replied — quote ready (${draft.totalFormatted})`
          : `${lead.name} replied — draft ready`,
      summary: body.slice(0, 160),
      threadId: thread.id,
    });

    return { handled: true, threadId: thread.id, action: draft.action };
  } catch (err) {
    console.error('[inbound] drafting failed', err);
    await notifyOwner({
      title: `${lead.name} replied (AI draft failed)`,
      summary: body.slice(0, 160),
      threadId: thread.id,
    }).catch(() => {});
    return { handled: true, threadId: thread.id, action: 'failed' };
  }
}
