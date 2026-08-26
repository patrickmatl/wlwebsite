import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { processInboundEmail } from '@/lib/server/inbound';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
// Drafting can take ~10s; the webhook must not time out before it finishes.
export const maxDuration = 60;

/**
 * Inbound email webhook (Resend).
 *
 * Only used when the studio sends through Resend. On the SMTP transport the
 * equivalent path is /api/inbound/poll, which pulls the same messages over
 * IMAP. Both funnel into processInboundEmail().
 */

/** Verify the Svix-style signature Resend sends, so randoms can't inject mail. */
function verifySignature(rawBody: string, headers: Headers): boolean {
  const secret = process.env.RESEND_WEBHOOK_SECRET;
  // No secret means no way to tell Resend from anyone else, so refuse rather
  // than wave everything through. An open inbound webhook lets a stranger post
  // a fabricated client email and have the agent send a quote — signed by this
  // domain — to any address they choose, which is the studio's sending
  // reputation spent on someone else's spam. The studio is on SMTP, where
  // /api/inbound/poll is the live path, so this costs nothing until Resend is
  // deliberately configured. Same stance as cron-auth.ts.
  if (!secret) return false;

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

export async function POST(request: Request) {
  const raw = await request.text();

  if (!process.env.RESEND_WEBHOOK_SECRET) {
    console.warn('[inbound] RESEND_WEBHOOK_SECRET unset — webhook refused');
    return NextResponse.json({ error: 'Webhook is not configured' }, { status: 503 });
  }
  if (!verifySignature(raw, request.headers)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
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
  const result = await processInboundEmail({
    fromRaw: data.from ?? '',
    subject: data.subject ?? null,
    text: data.text ?? '',
  });

  return NextResponse.json(
    result.handled ? { ok: true } : { ok: true, skipped: result.reason },
  );
}
