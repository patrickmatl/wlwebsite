import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { db } from '@/lib/server/db';
import { draftReply, type ConversationTurn } from '@/lib/quote-agent';
import { notifyOwner } from '@/lib/server/notify';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
// Drafting can take ~10s; the webhook must not time out before it finishes.
export const maxDuration = 60;

/**
 * Inbound email webhook (Resend).
 *
 * When a client replies to a quote, this appends their message to the thread,
 * asks the agent for the next move, and queues that draft for approval.
 * The client never receives an automated reply without a human approving it.
 */

/** Verify the Svix-style signature Resend sends, so randoms can't inject mail. */
function verifySignature(rawBody: string, headers: Headers): boolean {
  const secret = process.env.RESEND_WEBHOOK_SECRET;
  if (!secret) return true; // not configured — allow, but log below

  const id = headers.get('svix-id');
  const timestamp = headers.get('svix-timestamp');
  const signature = headers.get('svix-signature');
  if (!id || !timestamp || !signature) return false;

  // Reject anything older than 5 minutes (replay protection)
  const age = Math.abs(Date.now() / 1000 - Number(timestamp));
  if (!Number.isFinite(age) || age > 300) return false;

  const key = Buffer.from(secret.replace(/^whsec_/, ''), 'base64');
  const expected = crypto
    .createHmac('sha256', key)
    .update(`${id}.${timestamp}.${rawBody}`)
    .digest('base64');

  // Header may carry several space-separated "v1,<sig>" values
  return signature.split(' ').some((part) => {
    const sig = part.split(',')[1];
    if (!sig) return false;
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    return a.length === b.length && crypto.timingSafeEqual(a, b);
  });
}

/** Strip quoted history so the agent reads only what the client just wrote. */
function stripQuotedReply(text: string): string {
  const cutMarkers = [
    /^On .+ wrote:$/m,
    /^-{2,}\s*Original Message\s*-{2,}$/im,
    /^_{10,}$/m,
    /^From:\s.+$/m,
    /^─{20,}$/m, // our own quote divider
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

export async function POST(request: Request) {
  const raw = await request.text();

  if (!verifySignature(raw, request.headers)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }
  if (!process.env.RESEND_WEBHOOK_SECRET) {
    console.warn('[inbound] RESEND_WEBHOOK_SECRET unset — webhook is unauthenticated');
  }

  let event: {
    type?: string;
    data?: { from?: string; subject?: string; text?: string; html?: string };
  };
  try {
    event = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const data = event.data ?? {};
  const fromRaw = data.from ?? '';
  const fromEmail = (fromRaw.match(/<([^>]+)>/)?.[1] ?? fromRaw).trim().toLowerCase();
  const body = stripQuotedReply(data.text ?? '');

  if (!fromEmail || !body) {
    return NextResponse.json({ ok: true, skipped: 'no usable sender or body' });
  }

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
    return NextResponse.json({ ok: true, skipped: 'no matching lead' });
  }

  const { data: thread } = await db()
    .from('quote_threads')
    .select('*')
    .eq('lead_id', lead.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!thread) return NextResponse.json({ ok: true, skipped: 'no thread' });

  await db().from('quote_messages').insert({
    thread_id: thread.id,
    role: 'client',
    subject: data.subject ?? null,
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

    await db()
      .from('quote_threads')
      .update({ state: 'awaiting_approval' })
      .eq('id', thread.id);

    await notifyOwner({
      title:
        draft.action === 'quote'
          ? `${lead.name} replied — quote ready (${draft.totalFormatted})`
          : `${lead.name} replied — draft ready`,
      summary: body.slice(0, 160),
      threadId: thread.id,
    });
  } catch (err) {
    console.error('[inbound] drafting failed', err);
    await notifyOwner({
      title: `${lead.name} replied (AI draft failed)`,
      summary: body.slice(0, 160),
      threadId: thread.id,
    }).catch(() => {});
  }

  return NextResponse.json({ ok: true });
}
