/**
 * The last few server errors, kept in memory, readable by digest.
 *
 * In production Next replaces a server-side exception with "a server-side
 * exception has occurred" and a numeric digest, and puts the real message only
 * in the server logs. On Railway those logs are not reachable from here, so a
 * failure that only happens in production — the studio sign-in, at the time of
 * writing — cannot be diagnosed at all: every attempt burns a single-use token
 * and yields the same eleven-digit number.
 *
 * instrumentation.ts records every request error here, and
 * /api/diag/last-error?digest=… hands one back. The digest is the gate: a
 * person can only read the error whose digest they were just shown on the
 * error page, which is exactly the person who needs it, and it requires no
 * shared secret. Entries expire after thirty minutes and the buffer is small.
 *
 * This relies on one long-lived Node process, which is what Railway runs. On a
 * per-request serverless platform the hook and the route would land in
 * different instances and the map would always be empty — it would fail
 * harmlessly, but it would not help.
 */

export type CapturedError = {
  digest: string;
  message: string;
  name: string;
  stack: string | null;
  path: string;
  method: string;
  routeType: string | null;
  renderSource: string | null;
  at: string;
};

const TTL_MS = 30 * 60 * 1000;
const MAX = 20;

const errors = new Map<string, CapturedError>();

export function recordError(entry: CapturedError): void {
  errors.set(entry.digest, entry);
  if (errors.size > MAX) {
    const oldest = errors.keys().next().value;
    if (oldest !== undefined) errors.delete(oldest);
  }
}

export function lookupError(digest: string): CapturedError | null {
  const hit = errors.get(digest);
  if (!hit) return null;
  if (Date.now() - Date.parse(hit.at) > TTL_MS) {
    errors.delete(digest);
    return null;
  }
  return hit;
}
