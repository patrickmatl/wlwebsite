/**
 * The one way the studio console talks to /api/crm.
 *
 * Every admin mutation goes to the same action-dispatched endpoint, so the
 * transport, the error unwrapping and the rule that a failed fetch must never
 * surface as a raw exception all live here instead of in nine components.
 *
 * It sits under deals/ because that is the slice that needed it first; the
 * quotes slice imports it too. It belongs in src/lib the moment there is a
 * shared client-side lib to hold it.
 */

export type CrmResult<T> = { ok: true; data: T } | { ok: false; error: string };

export async function postCrm<T = Record<string, unknown>>(
  payload: Record<string, unknown>,
): Promise<CrmResult<T>> {
  try {
    const res = await fetch('/api/crm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const body = (await res.json().catch(() => ({}))) as Record<string, unknown>;

    if (!res.ok) {
      const message = typeof body.error === 'string' && body.error.trim() ? body.error : null;
      // A 401 means the session lapsed while the page sat open, which reads as
      // a mystery failure unless it is named.
      if (res.status === 401) {
        return { ok: false, error: message ?? 'Your session has expired — sign in again.' };
      }
      return { ok: false, error: message ?? `That did not go through (${res.status}).` };
    }

    return { ok: true, data: body as T };
  } catch {
    // The only failure mode the operator can usefully act on themselves.
    return { ok: false, error: 'Could not reach the server. Check your connection and try again.' };
  }
}
