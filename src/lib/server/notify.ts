import webpush from 'web-push';
import { db } from './db';
import { BUSINESS } from '@/data/business';

/**
 * Owner notifications: web push (primary — lands on your phone/desktop without
 * opening anything) plus an email fallback.
 */

const SITE = BUSINESS.url;

function pushConfigured(): boolean {
  return Boolean(
    process.env.VAPID_PUBLIC_KEY &&
      process.env.VAPID_PRIVATE_KEY &&
      process.env.VAPID_SUBJECT,
  );
}

export async function sendOwnerPush(payload: {
  title: string;
  body: string;
  url?: string;
  tag?: string;
}): Promise<{ sent: number; failed: number }> {
  if (!pushConfigured()) return { sent: 0, failed: 0 };

  webpush.setVapidDetails(
    process.env.VAPID_SUBJECT!,
    process.env.VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!,
  );

  const { data: subs } = await db().from('push_subscriptions').select('*');
  if (!subs?.length) return { sent: 0, failed: 0 };

  let sent = 0;
  let failed = 0;
  const dead: string[] = [];

  await Promise.all(
    subs.map(async (s) => {
      try {
        await webpush.sendNotification(
          {
            endpoint: s.endpoint,
            keys: { p256dh: s.p256dh, auth: s.auth },
          },
          JSON.stringify({
            title: payload.title,
            body: payload.body,
            url: payload.url ?? `${SITE}/studio`,
            tag: payload.tag ?? 'wl-lead',
          }),
        );
        sent++;
      } catch (err: unknown) {
        failed++;
        // 404/410 mean the subscription is dead — prune it.
        const status = (err as { statusCode?: number })?.statusCode;
        if (status === 404 || status === 410) dead.push(s.endpoint);
      }
    }),
  );

  if (dead.length) {
    await db().from('push_subscriptions').delete().in('endpoint', dead);
  }

  return { sent, failed };
}

/**
 * Send an email.
 *
 * Two transports, picked automatically:
 *  1. SMTP (SMTP_HOST set) — sends through the studio's own cPanel mailbox, so
 *     mail comes from the real wlcreationx.co.za domain at no extra cost.
 *  2. Resend (RESEND_API_KEY set) — better deliverability and inbound reply
 *     webhooks, but needs a paid plan to add the domain.
 *
 * SMTP wins if both are configured.
 */
export async function sendEmail(params: {
  to: string;
  subject: string;
  text: string;
  /** Optional HTML half. Clients that can render it will; the rest see `text`. */
  html?: string;
  replyTo?: string;
  /** Set to thread outbound mail correctly in the client's inbox */
  headers?: Record<string, string>;
}): Promise<string | null> {
  const from = process.env.QUOTE_FROM_EMAIL;

  if (process.env.SMTP_HOST) {
    if (!from || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.warn('[notify] SMTP partially configured — email not sent');
      return null;
    }
    // Imported lazily: nodemailer is Node-only and should never be pulled into
    // an edge/client bundle by accident.
    const nodemailer = (await import('nodemailer')).default;
    const port = Number(process.env.SMTP_PORT ?? 465);
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465, // 465 = implicit TLS, 587 = STARTTLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const info = await transport.sendMail({
      from,
      to: params.to,
      subject: params.subject,
      text: params.text,
      html: params.html,
      // No Reply-To by default: replies must land back in the quotes@ mailbox
      // that /api/inbound/poll reads, or the conversation loop breaks.
      replyTo: params.replyTo,
      headers: params.headers,
    });
    return info.messageId ?? null;
  }

  const key = process.env.RESEND_API_KEY;
  if (!key || !from) {
    console.warn('[notify] No email transport configured — email not sent');
    return null;
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [params.to],
      subject: params.subject,
      text: params.text,
      html: params.html,
      reply_to: params.replyTo ?? BUSINESS.email,
      headers: params.headers,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`Resend failed (${res.status}): ${detail.slice(0, 300)}`);
  }

  const json = (await res.json()) as { id?: string };
  return json.id ?? null;
}

/** Tell the owner a new lead or reply is waiting for approval. */
export async function notifyOwner(params: {
  title: string;
  summary: string;
  threadId: string;
}): Promise<void> {
  const url = `${SITE}/studio?thread=${params.threadId}`;

  await Promise.allSettled([
    sendOwnerPush({ title: params.title, body: params.summary, url, tag: params.threadId }),
    process.env.OWNER_EMAIL
      ? sendEmail({
          to: process.env.OWNER_EMAIL,
          subject: params.title,
          text: `${params.summary}\n\nReview and approve:\n${url}\n`,
        })
      : Promise.resolve(null),
  ]);
}
