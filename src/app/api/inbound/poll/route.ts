import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { processInboundEmail } from '@/lib/server/inbound';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
// Several replies may need drafting in one pass.
export const maxDuration = 60;

/**
 * IMAP poll of the quotes@ mailbox.
 *
 * Resend gives you an inbound webhook; plain SMTP does not. So when the studio
 * sends over SMTP, a cPanel cron job hits this endpoint every few minutes and
 * it pulls anything unread out of the mailbox, hands it to the same pipeline
 * the webhook uses, then marks the message seen so it is never processed twice.
 *
 * Auth: INBOUND_POLL_SECRET, as ?secret= or a Bearer token. Without it set the
 * endpoint refuses to run rather than exposing the mailbox to the internet.
 */

const MAX_PER_RUN = 10;

function authorised(request: Request): boolean {
  const expected = process.env.INBOUND_POLL_SECRET;
  if (!expected) return false;

  const url = new URL(request.url);
  const provided =
    url.searchParams.get('secret') ??
    request.headers.get('authorization')?.replace(/^Bearer\s+/i, '') ??
    '';

  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export async function GET(request: Request) {
  if (!authorised(request)) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  const host = process.env.IMAP_HOST ?? process.env.SMTP_HOST;
  const user = process.env.IMAP_USER ?? process.env.SMTP_USER;
  const pass = process.env.IMAP_PASSWORD ?? process.env.SMTP_PASSWORD;

  if (!host || !user || !pass) {
    return NextResponse.json({ error: 'IMAP is not configured' }, { status: 503 });
  }

  // Imported lazily so these Node-only libraries never reach a client bundle.
  const { ImapFlow } = await import('imapflow');
  const { simpleParser } = await import('mailparser');

  const client = new ImapFlow({
    host,
    port: Number(process.env.IMAP_PORT ?? 993),
    secure: true,
    auth: { user, pass },
    logger: false,
  });

  const processed: { from: string; result: string }[] = [];

  try {
    await client.connect();
    const lock = await client.getMailboxLock('INBOX');
    try {
      const unseen = await client.search({ seen: false }, { uid: true });
      const uids = (unseen || []).slice(-MAX_PER_RUN);

      for (const uid of uids) {
        // Mark seen first: a message that crashes the agent must not be retried
        // forever on every cron tick. The owner is notified on failure anyway.
        await client.messageFlagsAdd({ uid: String(uid) }, ['\\Seen'], { uid: true });

        const msg = await client.fetchOne(String(uid), { source: true }, { uid: true });
        if (!msg || !msg.source) continue;

        const mail = await simpleParser(msg.source);
        const fromRaw = mail.from?.text ?? '';
        const text = mail.text ?? '';

        // Ignore bounces, vacation replies, server notices and our own copies.
        // Without this, cPanel's own status mail reaches the "unknown sender"
        // branch and pings the owner every time it arrives.
        const senderLocal = (fromRaw.match(/<([^>]+)>/)?.[1] ?? fromRaw).split('@')[0];
        const isAuto =
          Boolean(mail.headers.get('auto-submitted')) ||
          Boolean(mail.headers.get('list-unsubscribe')) ||
          /^(mailer-daemon|postmaster|no-?reply|noreply|cpanel|root|bounces?|daemon)$/i.test(
            senderLocal.trim(),
          ) ||
          fromRaw.toLowerCase().includes(user.toLowerCase());

        if (isAuto) {
          processed.push({ from: fromRaw, result: 'skipped: automated' });
          continue;
        }

        const outcome = await processInboundEmail({
          fromRaw,
          subject: mail.subject ?? null,
          text,
        });

        processed.push({
          from: fromRaw,
          result: outcome.handled ? `drafted (${outcome.action})` : `skipped: ${outcome.reason}`,
        });
      }
    } finally {
      lock.release();
    }
  } catch (err) {
    console.error('[inbound/poll] failed', err);
    return NextResponse.json(
      { error: 'Poll failed', detail: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  } finally {
    await client.logout().catch(() => {});
  }

  return NextResponse.json({ ok: true, count: processed.length, processed });
}
