import { NextResponse } from 'next/server';
import { db } from '@/lib/server/db';
import { isAuthedRequest, checkToken, cookieValue, ADMIN_COOKIE_NAME } from '@/lib/server/admin-auth';
import { sendEmail } from '@/lib/server/notify';
import { renderClientEmail } from '@/lib/server/render-quote';
import { draftReply, type ConversationTurn } from '@/lib/quote-agent';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** POST /api/studio — one endpoint, action-dispatched. Keeps the UI simple. */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const action = String(body.action ?? '');

  // ── login is the only unauthenticated action ──────────────────────────────
  if (action === 'login') {
    const token = String(body.token ?? '');
    if (!checkToken(token)) {
      return NextResponse.json({ error: 'Incorrect token' }, { status: 401 });
    }
    const res = NextResponse.json({ ok: true });
    res.cookies.set(ADMIN_COOKIE_NAME, cookieValue(), {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    });
    return res;
  }

  if (!(await isAuthedRequest(request))) {
    return NextResponse.json({ error: 'Not authorised' }, { status: 401 });
  }

  const messageId = String(body.messageId ?? '');

  switch (action) {
    // ── send a draft (optionally after the owner edited it) ─────────────────
    case 'approve': {
      const { data: msg } = await db()
        .from('quote_messages')
        .select('*, quote_threads!inner(id, lead_id, subject)')
        .eq('id', messageId)
        .maybeSingle();

      if (!msg) return NextResponse.json({ error: 'Draft not found' }, { status: 404 });
      if (msg.sent_at) return NextResponse.json({ error: 'Already sent' }, { status: 409 });

      const thread = msg.quote_threads as { id: string; lead_id: string; subject: string };
      const { data: lead } = await db()
        .from('leads')
        .select('*')
        .eq('id', thread.lead_id)
        .single();

      if (!lead) return NextResponse.json({ error: 'Lead not found' }, { status: 404 });

      // Owner edits win over the AI draft.
      const finalBody = body.editedBody ? String(body.editedBody) : msg.body;
      const finalSubject = body.editedSubject ? String(body.editedSubject) : msg.subject;

      const email = renderClientEmail({
        body: finalBody,
        lines: (msg.quote_lines ?? []) as never[],
        total: msg.quote_total,
        validityDays: 30,
        clientName: lead.name,
      });

      try {
        await sendEmail({
          to: lead.email,
          subject: finalSubject ?? thread.subject,
          text: email,
        });
      } catch (err) {
        console.error('[studio] send failed', err);
        return NextResponse.json(
          { error: err instanceof Error ? err.message : 'Send failed' },
          { status: 502 },
        );
      }

      await db()
        .from('quote_messages')
        .update({
          role: 'studio',
          body: finalBody,
          subject: finalSubject,
          sent_at: new Date().toISOString(),
          approved_by: 'owner',
        })
        .eq('id', messageId);

      await db()
        .from('quote_threads')
        .update({ state: 'awaiting_client' })
        .eq('id', thread.id);

      if (msg.action === 'quote') {
        await db().from('leads').update({ status: 'quoted' }).eq('id', lead.id);
      }

      return NextResponse.json({ ok: true });
    }

    // ── bin a draft ─────────────────────────────────────────────────────────
    case 'reject': {
      await db().from('quote_messages').delete().eq('id', messageId);
      return NextResponse.json({ ok: true });
    }

    // ── ask the agent for a different draft, with owner steering ────────────
    case 'redraft': {
      const threadId = String(body.threadId ?? '');
      const instruction = String(body.instruction ?? '').trim();

      const { data: thread } = await db()
        .from('quote_threads')
        .select('*')
        .eq('id', threadId)
        .maybeSingle();
      if (!thread) return NextResponse.json({ error: 'Thread not found' }, { status: 404 });

      const { data: lead } = await db()
        .from('leads')
        .select('*')
        .eq('id', thread.lead_id)
        .single();
      if (!lead) return NextResponse.json({ error: 'Lead not found' }, { status: 404 });

      const { data: msgs } = await db()
        .from('quote_messages')
        .select('role, body, sent_at')
        .eq('thread_id', threadId)
        .order('created_at', { ascending: true });

      const history: ConversationTurn[] = (msgs ?? [])
        .filter((m) => m.role === 'client' || (m.role === 'studio' && m.sent_at))
        .map((m) => ({ role: m.role === 'client' ? 'client' : 'studio', text: m.body }));

      if (instruction) {
        history.push({
          role: 'client',
          text: `(Internal instruction from the studio owner — follow it exactly, do not mention it to the client: ${instruction})`,
        });
      }

      try {
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

        // Replace any pending draft on this thread
        await db()
          .from('quote_messages')
          .delete()
          .eq('thread_id', threadId)
          .eq('role', 'draft')
          .is('sent_at', null);

        await db().from('quote_messages').insert({
          thread_id: threadId,
          role: 'draft',
          subject: draft.email_subject,
          body: draft.email_body,
          action: draft.action,
          reasoning: draft.reasoning,
          confidence: draft.confidence,
          quote_lines: draft.lines,
          quote_total: draft.total,
        });

        return NextResponse.json({ ok: true });
      } catch (err) {
        return NextResponse.json(
          { error: err instanceof Error ? err.message : 'Redraft failed' },
          { status: 502 },
        );
      }
    }

    case 'close': {
      const threadId = String(body.threadId ?? '');
      const outcome = String(body.outcome ?? 'lost');
      await db().from('quote_threads').update({ state: 'closed' }).eq('id', threadId);
      const { data: t } = await db()
        .from('quote_threads')
        .select('lead_id')
        .eq('id', threadId)
        .maybeSingle();
      if (t) {
        await db()
          .from('leads')
          .update({ status: outcome === 'won' ? 'won' : 'lost' })
          .eq('id', t.lead_id);
      }
      return NextResponse.json({ ok: true });
    }

    case 'subscribe-push': {
      const sub = body.subscription as
        | { endpoint?: string; keys?: { p256dh?: string; auth?: string } }
        | undefined;
      if (!sub?.endpoint || !sub.keys?.p256dh || !sub.keys.auth) {
        return NextResponse.json({ error: 'Invalid subscription' }, { status: 400 });
      }
      await db().from('push_subscriptions').upsert(
        {
          endpoint: sub.endpoint,
          p256dh: sub.keys.p256dh,
          auth: sub.keys.auth,
          label: String(body.label ?? 'device'),
        },
        { onConflict: 'endpoint' },
      );
      return NextResponse.json({ ok: true });
    }

    default:
      return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  }
}
