import crypto from 'crypto';
import { cookies } from 'next/headers';

/**
 * Minimal admin gate for /studio.
 *
 * A single shared secret (ADMIN_TOKEN) exchanged for an httpOnly cookie.
 * Deliberately simple — this guards a one-person approval queue, not a
 * multi-tenant app. If more people ever need access, replace this with
 * Supabase Auth rather than handing the token around.
 */

const COOKIE = 'wl_studio';

function expectedCookieValue(token: string): string {
  return crypto.createHash('sha256').update(`wl-studio:${token}`).digest('hex');
}

export function checkToken(supplied: string): boolean {
  const token = process.env.ADMIN_TOKEN;
  if (!token) return false;
  const a = Buffer.from(supplied);
  const b = Buffer.from(token);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export function cookieValue(): string {
  return expectedCookieValue(process.env.ADMIN_TOKEN ?? '');
}

export async function isAuthed(): Promise<boolean> {
  const token = process.env.ADMIN_TOKEN;
  if (!token) return false;
  const jar = await cookies();
  const got = jar.get(COOKIE)?.value;
  if (!got) return false;
  const a = Buffer.from(got);
  const b = Buffer.from(expectedCookieValue(token));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

/** For API routes: accepts the cookie OR an Authorization: Bearer <token>. */
export async function isAuthedRequest(request: Request): Promise<boolean> {
  if (await isAuthed()) return true;
  const auth = request.headers.get('authorization') ?? '';
  const bearer = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  return bearer ? checkToken(bearer) : false;
}

export const ADMIN_COOKIE_NAME = COOKIE;
