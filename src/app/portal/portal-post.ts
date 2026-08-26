/**
 * The one way the portal talks to the server from the browser.
 *
 * Every client-side mutation the portal makes goes through here, so the
 * transport, the error unwrapping, and the rule that a failed request must
 * never surface as a raw exception live in one place rather than in every
 * component that needs to write something.
 *
 * Nothing here reads business data — portal reads happen on the server via
 * src/lib/server/portal.ts, where the session scope is part of the query.
 */

export type PortalResult<T> = { ok: true; data: T } | { ok: false; error: string };

async function post<T>(url: string, payload: Record<string, unknown>): Promise<PortalResult<T>> {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const body = (await res.json().catch(() => ({}))) as Record<string, unknown>;

    if (!res.ok) {
      const message = typeof body.error === 'string' && body.error.trim() ? body.error : null;
      // A lapsed session is the one failure the client can act on themselves,
      // so it is named instead of being reported as a bare status code.
      if (res.status === 401) {
        return {
          ok: false,
          error: message ?? 'You have been signed out. Sign in again to carry on.',
        };
      }
      return { ok: false, error: message ?? `That did not go through (${res.status}).` };
    }

    return { ok: true, data: body as T };
  } catch {
    return {
      ok: false,
      error: 'Could not reach the studio. Check your connection and try again.',
    };
  }
}

/** Portal mutations: accept-quote, decline-quote, update-details, payment-details, get-details. */
export function postPortal<T = Record<string, unknown>>(payload: Record<string, unknown>) {
  return post<T>('/api/portal', payload);
}

/** Sign-in and sign-out. Separate endpoint because it is shared with the studio. */
export function postAuth<T = Record<string, unknown>>(payload: Record<string, unknown>) {
  return post<T>('/api/auth', payload);
}
