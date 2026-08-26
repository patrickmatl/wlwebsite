import crypto from 'crypto';

/**
 * Shared auth for the endpoints a cron job calls (/api/inbound/poll and
 * /api/followups).
 *
 * These reach into the mailbox and email clients, so they must never be open to
 * the internet. Without INBOUND_POLL_SECRET set they refuse to run at all,
 * rather than defaulting to open.
 */
export type CronAuth = { ok: true } | { ok: false; status: number; error: string };

export function authoriseCron(request: Request): CronAuth {
  const expected = process.env.INBOUND_POLL_SECRET;
  if (!expected) {
    return { ok: false, status: 503, error: 'INBOUND_POLL_SECRET is not set' };
  }

  const url = new URL(request.url);
  const provided =
    url.searchParams.get('secret') ??
    request.headers.get('authorization')?.replace(/^Bearer\s+/i, '') ??
    '';

  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  const match = a.length === b.length && crypto.timingSafeEqual(a, b);

  return match ? { ok: true } : { ok: false, status: 401, error: 'Unauthorised' };
}
