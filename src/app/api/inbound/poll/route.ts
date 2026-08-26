import { NextResponse } from 'next/server';
import { processInboundEmail } from '@/lib/server/inbound';
import { authoriseCron } from '@/lib/server/cron-auth';

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

export async function GET(request: Request) {
  const auth = authoriseCron(request);
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

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
          Boolean(mail.headers.get('list-id')) ||
          /bulk|list|auto_reply/i.test(String(mail.headers.get('precedence') ?? '')) ||
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
          attachments: (mail.attachments ?? [])
            .map((a) => a.filename)
            .filter((f): f is string => Boolean(f)),
          // The bytes as well, not only the names: a proof of payment is
          // usually a screenshot, and until these were carried through there
          // was nothing for the reader to look at.
          //
          // Inline parts are excluded. Almost every business email carries its
          // sender's logo as a `related` attachment with a Content-ID, and
          // treating that as an enclosure has the agent thanking clients for
          // "the image you sent" — or worse, reading a signature strip as a
          // brief. A real attachment is one the sender deliberately attached.
          files: (mail.attachments ?? [])
            .filter(
              (a) =>
                Buffer.isBuffer(a.content) &&
                a.contentDisposition !== 'inline' &&
                !a.cid &&
                Boolean(a.filename),
            )
            .map((a) => ({
              filename: a.filename as string,
              mimeType: a.contentType ?? 'application/octet-stream',
              content: a.content as Buffer,
            })),
        });

        processed.push({
          from: fromRaw,
          result: outcome.handled
            ? `${outcome.action}${outcome.sent ? ' (sent)' : ' (queued)'}${outcome.newLead ? ' [new lead]' : ''}`
            : `skipped: ${outcome.reason}`,
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
