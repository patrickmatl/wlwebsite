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
 * Storage lives on globalThis, not in a module-level variable. Next bundles
 * instrumentation.ts and route handlers into separate server chunks, so a
 * plain `const errors = new Map()` here would be instantiated once per chunk:
 * the hook would write to one Map and the route would read an empty other one.
 * That is precisely what happened on the first attempt — the readout was empty
 * seconds after a reproduced failure. globalThis is one object per process.
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

type Store = { list: CapturedError[] };

function store(): Store {
  const g = globalThis as typeof globalThis & { __wlLastErrors?: Store };
  if (!g.__wlLastErrors) g.__wlLastErrors = { list: [] };
  return g.__wlLastErrors;
}

function fresh(e: CapturedError): boolean {
  return Date.now() - Date.parse(e.at) <= TTL_MS;
}

export function recordError(entry: CapturedError): void {
  const s = store();
  s.list = [entry, ...s.list.filter(fresh)].slice(0, MAX);
}

/** Exact match on digest. */
export function lookupError(digest: string): CapturedError | null {
  return store().list.find((e) => fresh(e) && e.digest === digest) ?? null;
}

/**
 * The most recent error within `withinMs`, regardless of digest.
 *
 * Next does not always attach `digest` to the error object by the time
 * onRequestError sees it — the digest on the page is computed afterwards — so
 * an exact lookup can miss the very error the person is holding. Someone who
 * has just triggered an error and is asking within a couple of minutes is
 * that person.
 */
export function recentError(withinMs: number): CapturedError | null {
  const cutoff = Date.now() - withinMs;
  return store().list.find((e) => Date.parse(e.at) >= cutoff) ?? null;
}
