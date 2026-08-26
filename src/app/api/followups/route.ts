import { NextResponse } from 'next/server';
import { db } from '@/lib/server/db';
import { draftReply, type ConversationTurn } from '@/lib/quote-agent';
import { releaseDraft } from '@/lib/server/autosend';
import { authoriseCron } from '@/lib/server/cron-auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/**
 * Chase quotes that have gone quiet.
 *
 * A quote sent and never answered is the most common way a lead dies, so a
 * daily cPanel cron calls this. It finds conversations where we spoke last,
 * nothing has come back for a few days, and we haven't already nudged twice,
 * then drafts a short follow-up and hands it to the autopilot like any other
 * reply.
 *
 * Two nudges is the cap. Past that it is pestering, and the thread is closed
 * as lost so it stops appearing in the queue.
 */

const QUIET_DAYS = Number(process.env.FOLLOWUP_AFTER_DAYS ?? 3);
const MAX_FOLLOW_UPS = Number(process.env.FOLLOWUP_MAX ?? 2);
const MAX_PER_RUN = 10;

export async function GET(request: Request) {
  const auth = authoriseCron(request);
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const cutoff = new Date(Date.now() - QUIET_DAYS * 24 * 60 * 60 * 1000).toISOString();

  const { data: threads, error } = await db()
    .from('quote_threads')
    .select('id, lead_id, subject, follow_ups_sent, updated_at')
    .eq('state', 'awaiting_client')
    .lt('updated_at', cutoff)
    .order('updated_at', { ascending: true })
    .limit(MAX_PER_RUN);

  if (error) {
    console.error('[followups] query failed', error);
    return NextResponse.json({ error: 'Query failed' }, { status: 500 });
  }

  const results: { thread: string; outcome: string }[] = [];

  for (const thread of threads ?? []) {
    const sentSoFar = thread.follow_ups_sent ?? 0;

    const { data: lead } = await db()
      .from('leads')
      .select('*')
      .eq('id', thread.lead_id)
      .maybeSingle();

    // Won or lost deals are finished business — never chase them.
    if (!lead || lead.status === 'won' || lead.status === 'lost' || lead.status === 'spam') {
      await db().from('quote_threads').update({ state: 'closed' }).eq('id', thread.id);
      results.push({ thread: thread.id, outcome: 'closed: not an open lead' });
      continue;
    }

    if (sentSoFar >= MAX_FOLLOW_UPS) {
      await db().from('quote_threads').update({ state: 'closed' }).eq('id', thread.id);
      await db().from('leads').update({ status: 'lost' }).eq('id', lead.id);
      results.push({ thread: thread.id, outcome: 'closed: no reply after final follow-up' });
      continue;
    }

    try {
      const { data: msgs } = await db()
        .from('quote_messages')
        .select('role, body, sent_at')
        .eq('thread_id', thread.id)
        .order('created_at', { ascending: true });

      const history: ConversationTurn[] = (msgs ?? [])
        .filter((m) => m.role === 'client' || (m.role === 'studio' && m.sent_at))
        .map((m) => ({ role: m.role === 'client' ? 'client' : 'studio', text: m.body }));

      history.push({
        role: 'studio',
        text:
          `[Instruction, not part of the conversation] The client has not replied for ${QUIET_DAYS} days. ` +
          `This is follow-up ${sentSoFar + 1} of ${MAX_FOLLOW_UPS}. Write a short, warm nudge — two or three ` +
          `sentences, no pressure, no discount, no new prices. Offer to adjust the scope or talk it through. ` +
          `Use action "ask".`,
      });

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

      const { data: message } = await db()
        .from('quote_messages')
        .insert({
          thread_id: thread.id,
          role: 'draft',
          subject: draft.email_subject,
          body: draft.email_body,
          action: draft.action,
          intent: draft.intent,
          reasoning: draft.reasoning,
          confidence: draft.confidence,
          quote_lines: draft.lines,
          quote_total: draft.total,
        })
        .select()
        .single();

      if (!message) throw new Error('could not store follow-up draft');

      const released = await releaseDraft({
        messageId: message.id,
        threadId: thread.id,
        draft,
        leadName: lead.name,
        summary: `No reply for ${QUIET_DAYS} days — follow-up ${sentSoFar + 1}.`,
      });

      // Count it only once it has actually gone; a draft still sitting in the
      // queue must not burn one of the two allowed nudges.
      if (released.sent) {
        await db()
          .from('quote_threads')
          .update({ follow_ups_sent: sentSoFar + 1 })
          .eq('id', thread.id);
      }

      results.push({
        thread: thread.id,
        outcome: released.sent ? `follow-up ${sentSoFar + 1} sent` : `queued: ${released.reason}`,
      });
    } catch (err) {
      console.error('[followups] failed for thread', thread.id, err);
      results.push({ thread: thread.id, outcome: 'failed' });
    }
  }

  return NextResponse.json({ ok: true, considered: threads?.length ?? 0, results });
}
