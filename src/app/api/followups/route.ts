import { NextResponse } from 'next/server';
import { db } from '@/lib/server/db';
import { draftReply, type ConversationTurn } from '@/lib/quote-agent';
import { releaseDraft } from '@/lib/server/autosend';
import { authoriseCron } from '@/lib/server/cron-auth';
import { pruneAuth } from '@/lib/server/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/**
 * Chase quotes that have gone quiet — without becoming the studio that pesters.
 *
 * A quote sent and never answered is the most common way a lead dies, so a
 * daily cPanel cron calls this. Anything the client says resets the sequence
 * completely, and a won or lost lead is never chased at all.
 */

/**
 * Two touches, widening, then stop.
 *
 * SCHEDULE[n] is how many quiet days must pass before follow-up n+1 goes out,
 * counted from the last thing either side said. So '3,7' means the first nudge
 * three days after the quote, and the second a further seven days after that —
 * about a fortnight end to end. The gap widens deliberately: two nudges three
 * days apart reads as chasing, the same two spread over two weeks reads as
 * diligent.
 *
 * Each touch does a different job, which is the difference between a sequence
 * that converts and one that annoys:
 *   1. Helpful  — assume the quote raised a question, and offer to answer it.
 *   2. Close-out — say we are closing the file. It is the highest-responding
 *      message in the sequence precisely because it asks for nothing and gives
 *      the client an easy, face-saving exit.
 *
 * There is no third. No discounts, no deadlines, no "just bumping this".
 */
const SCHEDULE = (process.env.FOLLOWUP_DAYS ?? '3,7')
  .split(',')
  .map((d) => Number(d.trim()))
  .filter((d) => Number.isFinite(d) && d > 0);

const MAX_FOLLOW_UPS = SCHEDULE.length;
const MAX_PER_RUN = 10;

/** What this particular touch should try to do. */
function briefFor(touch: number, quietDays: number): string {
  const isFinal = touch >= MAX_FOLLOW_UPS;

  if (isFinal) {
    return (
      `[Instruction, not part of the conversation] The client has not replied for ${quietDays} days, ` +
      `and this is the last message we will send. Write a short, gracious close-out: say we are closing ` +
      `the file for now so it stops sitting in their inbox, that there is no obligation either way, and ` +
      `that they are welcome to reply whenever the timing is better and we will pick it straight up. ` +
      `Warm and completely pressure-free. Do not ask a question, do not offer a discount, do not mention ` +
      `prices, and do not suggest they have done anything wrong by not replying. Use action "ask".`
    );
  }

  return (
    `[Instruction, not part of the conversation] The client has not replied for ${quietDays} days. ` +
    `This is follow-up ${touch} of ${MAX_FOLLOW_UPS}. Write two or three sentences that assume the quote ` +
    `raised a question rather than that they are ignoring us: offer to walk through it, adjust the scope, ` +
    `or split the work into phases if the budget is the sticking point. No pressure, no deadline, no ` +
    `discount, no new prices, and never the words "just checking in" or "touching base". Use action "ask".`
  );
}

export async function GET(request: Request) {
  const auth = authoriseCron(request);
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  // Widest possible net: anything quiet for the shortest gap in the schedule.
  // Each thread is then checked against the gap its own next touch requires.
  const soonest = Math.min(...SCHEDULE);
  const cutoff = new Date(Date.now() - soonest * 24 * 60 * 60 * 1000).toISOString();

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
    const quietDays = Math.floor(
      (Date.now() - Date.parse(thread.updated_at)) / (24 * 60 * 60 * 1000),
    );

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

    // Not yet due for its next touch — the gap widens as the sequence goes on.
    const required = SCHEDULE[sentSoFar];
    if (required !== undefined && quietDays < required) {
      results.push({ thread: thread.id, outcome: `not due (${quietDays}/${required} days)` });
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

      history.push({ role: 'studio', text: briefFor(sentSoFar + 1, quietDays) });

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
        summary:
          sentSoFar + 1 >= MAX_FOLLOW_UPS
            ? `No reply for ${quietDays} days — final close-out message.`
            : `No reply for ${quietDays} days — follow-up ${sentSoFar + 1} of ${MAX_FOLLOW_UPS}.`,
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

  const housekeeping = await dailyHousekeeping();

  return NextResponse.json({
    ok: true,
    considered: threads?.length ?? 0,
    results,
    housekeeping,
  });
}

/**
 * The rest of the daily tidy-up, run off the same cron.
 *
 * These are the jobs with no natural trigger: nothing happens when a quote's
 * validity date passes, or when a session quietly expires, so without a sweep
 * the CRM slowly fills with records claiming to be live when they are not.
 */
async function dailyHousekeeping(): Promise<{
  quotesExpired: number;
  invoicesMarkedOverdue: number;
  sessionsPruned: number;
  tokensPruned: number;
}> {
  const today = new Date().toISOString().slice(0, 10);

  // A quote past its validity date is no longer on the table. Only ones still
  // awaiting an answer — an accepted quote stays accepted forever.
  const { data: expired } = await db()
    .from('quotes')
    .update({ status: 'expired' })
    .eq('status', 'sent')
    .not('valid_until', 'is', null)
    .lt('valid_until', today)
    .select('id');

  // Overdue is a fact about the date, not an event, so it needs a sweep too.
  const { data: overdue } = await db()
    .from('invoices')
    .update({ status: 'overdue' })
    .in('status', ['sent', 'part_paid'])
    .not('due_date', 'is', null)
    .lt('due_date', today)
    .select('id');

  const pruned = await pruneAuth();

  return {
    quotesExpired: expired?.length ?? 0,
    invoicesMarkedOverdue: overdue?.length ?? 0,
    sessionsPruned: pruned.sessions,
    tokensPruned: pruned.tokens,
  };
}
