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
  /** Files to attach. A quote is expected as a PDF, not just as an email body. */
  attachments?: { filename: string; content: Buffer; contentType?: string }[];
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
      attachments: params.attachments,
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
      attachments: params.attachments?.map((a) => ({
        filename: a.filename,
        content: a.content.toString('base64'),
      })),
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

/**
 * Tell the owner a new lead or reply is waiting.
 *
 * The link is a plain button to the thread, with no credential in it. If the
 * session has lapsed, /studio bounces to the sign-in page and comes straight
 * back here afterwards — so the worst case is one click on an emailed sign-in
 * link, and the usual case is none.
 *
 * Putting a working token in every notification would save that click, but it
 * would also mean a fortnight of forwarded or archived emails each carrying a
 * live key to the CRM. Not worth it.
 */
export async function notifyOwner(params: {
  title: string;
  summary: string;
  threadId: string;
  /** Overrides the default "open the thread" destination. */
  url?: string;
  /** Text on the button. */
  cta?: string;
}): Promise<void> {
  const url =
    params.url ?? (params.threadId ? `${SITE}/studio/inbox?thread=${params.threadId}` : `${SITE}/studio`);
  const cta = params.cta ?? 'Open in the studio';

  const recipients = ownerRecipients();

  await Promise.allSettled([
    sendOwnerPush({ title: params.title, body: params.summary, url, tag: params.threadId }),
    ...recipients.map((to) =>
      sendEmail({
        to,
        subject: params.title,
        text: `${params.summary}\n\n${cta}: ${url}\n`,
        html: renderOwnerEmail({ title: params.title, summary: params.summary, url, cta }),
      }),
    ),
  ]);
}

/**
 * Who gets told. OWNER_EMAIL accepts a comma-separated list.
 *
 * Sent as separate messages rather than one with several recipients, so nobody
 * can see the others' addresses and one bad address cannot bounce the lot.
 */
function ownerRecipients(): string[] {
  return (process.env.OWNER_EMAIL ?? '')
    .split(',')
    .map((address) => address.trim())
    .filter((address) => address.includes('@'));
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * The internal notification email.
 *
 * A bare URL pasted into a plain-text email is exactly what spam filters and
 * readers both dislike, so this is a short line of context and one button. The
 * raw link is deliberately not printed anywhere in the body.
 */
function renderOwnerEmail(params: {
  title: string;
  summary: string;
  url: string;
  cta: string;
}): string {
  const FONT = "Arial, 'Helvetica Neue', Helvetica, sans-serif";

  return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="color-scheme" content="light" />
<title>${escapeHtml(params.title)}</title>
</head>
<body style="margin:0;padding:0;background-color:#F6F6F4;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(params.summary.slice(0, 120))}</div>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;background-color:#F6F6F4;">
  <tr><td align="center" style="padding:24px 12px;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="560" style="border-collapse:collapse;width:100%;max-width:560px;background-color:#FFFFFF;border:1px solid #E4E4E4;border-radius:8px;">
      <tr><td style="padding:26px 28px 0 28px;">
        <div style="font-family:${FONT};font-size:11px;line-height:16px;letter-spacing:1.5px;color:#B8860B;font-weight:bold;">WL CREATIONX STUDIO</div>
        <h1 style="margin:8px 0 12px 0;font-family:${FONT};font-size:19px;line-height:26px;color:#111111;">${escapeHtml(params.title)}</h1>
        <p style="margin:0 0 22px 0;font-family:${FONT};font-size:14px;line-height:21px;color:#5A5A5A;">${escapeHtml(params.summary)}</p>
      </td></tr>
      <tr><td style="padding:0 28px 8px 28px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
          <td style="background-color:#111111;border-radius:6px;">
            <a href="${escapeHtml(params.url)}"
               style="display:inline-block;padding:12px 22px;font-family:${FONT};font-size:14px;font-weight:bold;color:#FFD700;text-decoration:none;">${escapeHtml(params.cta)} &rarr;</a>
          </td>
        </tr></table>
      </td></tr>
      <tr><td style="padding:18px 28px 26px 28px;">
        <p style="margin:0;font-family:${FONT};font-size:12px;line-height:18px;color:#8A8A8A;">
          Sent to you only &mdash; the client has not seen this. If you are signed out, the button
          will ask for your email and send you a sign-in link.
        </p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}
