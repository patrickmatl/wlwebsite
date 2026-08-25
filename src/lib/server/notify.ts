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

/** Send an email through Resend. Returns the provider message id. */
export async function sendEmail(params: {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
  /** Set to thread outbound mail correctly in the client's inbox */
  headers?: Record<string, string>;
}): Promise<string | null> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.QUOTE_FROM_EMAIL;
  if (!key || !from) {
    console.warn('[notify] Resend not configured — email not sent');
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
