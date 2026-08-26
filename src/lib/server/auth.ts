import crypto from 'crypto';
import { cookies, headers } from 'next/headers';
import { db } from './db';

/**
 * Sessions for the studio and for the client portal.
 *
 * Both sides sign in with a magic link rather than a password. That is a
 * deliberate choice for a CRM whose users are clients, not staff: there is no
 * password to reuse, leak, or reset, and the studio never becomes the custodian
 * of anyone's credentials. The mailbox is already the recovery channel for any
 * password system, so it may as well be the credential.
 *
 * Tokens are 32 random bytes. Only their SHA-256 hash is stored, so a database
 * dump hands an attacker nothing usable — the raw token exists only in the
 * emailed link and, once redeemed, in an httpOnly cookie.
 *
 * SHA-256 is right here precisely because these are high-entropy random tokens.
 * bcrypt/argon2 exist to slow down guessing of low-entropy human passwords;
 * against 256 bits of randomness there is nothing to slow down.
 *
 * The portal is NOT Supabase Auth. A session resolves server-side to exactly
 * one contact id, and every portal query is scoped to it there — see
 * src/lib/server/portal.ts. The browser never holds a database credential.
 */

const ADMIN_COOKIE = 'wl_admin';
const CLIENT_COOKIE = 'wl_portal';

/** Sessions are long enough not to be annoying, short enough to expire. */
const ADMIN_SESSION_DAYS = 14;
const CLIENT_SESSION_DAYS = 30;

/** A magic link is single-use and short-lived. */
const LOGIN_TOKEN_MINUTES = 20;

export type SessionKind = 'admin' | 'client';

export type AdminSession = {
  kind: 'admin';
  sessionId: string;
  adminUserId: string;
  email: string;
  name: string;
  role: 'owner' | 'staff';
};

export type ClientSession = {
  kind: 'client';
  sessionId: string;
  contactId: string;
  companyId: string | null;
  email: string;
  name: string;
};

export type Session = AdminSession | ClientSession;

function sha256(value: string): string {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function newToken(): string {
  return crypto.randomBytes(32).toString('base64url');
}

function daysFromNow(days: number): string {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
}

async function requestMeta(): Promise<{ ip: string | null; userAgent: string | null }> {
  try {
    const h = await headers();
    const forwarded = h.get('x-forwarded-for');
    return {
      ip: forwarded ? forwarded.split(',')[0].trim() : h.get('x-real-ip'),
      userAgent: h.get('user-agent'),
    };
  } catch {
    return { ip: null, userAgent: null };
  }
}

// ── Sessions ────────────────────────────────────────────────────────────────

/** Mint a session and set its cookie. Returns the session row id. */
export async function createSession(params: {
  kind: SessionKind;
  adminUserId?: string;
  contactId?: string;
}): Promise<string> {
  const raw = newToken();
  const meta = await requestMeta();
  const days = params.kind === 'admin' ? ADMIN_SESSION_DAYS : CLIENT_SESSION_DAYS;

  const { data, error } = await db()
    .from('sessions')
    .insert({
      token_hash: sha256(raw),
      kind: params.kind,
      admin_user_id: params.adminUserId ?? null,
      contact_id: params.contactId ?? null,
      expires_at: daysFromNow(days),
      ip: meta.ip,
      user_agent: meta.userAgent?.slice(0, 300) ?? null,
    })
    .select('id')
    .single();

  if (error || !data) throw new Error(`could not create session: ${error?.message}`);

  const jar = await cookies();
  jar.set(params.kind === 'admin' ? ADMIN_COOKIE : CLIENT_COOKIE, raw, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: days * 24 * 60 * 60,
  });

  return data.id;
}

/** Resolve the current session for one side, or null. */
export async function getSession(kind: 'admin'): Promise<AdminSession | null>;
export async function getSession(kind: 'client'): Promise<ClientSession | null>;
export async function getSession(kind: SessionKind): Promise<Session | null> {
  const jar = await cookies();
  const raw = jar.get(kind === 'admin' ? ADMIN_COOKIE : CLIENT_COOKIE)?.value;
  if (!raw) return null;

  const { data } = await db()
    .from('sessions')
    .select('id, kind, admin_user_id, contact_id, expires_at, revoked_at')
    .eq('token_hash', sha256(raw))
    .maybeSingle();

  if (!data) return null;
  if (data.kind !== kind) return null;
  if (data.revoked_at) return null;
  if (Date.parse(data.expires_at) < Date.now()) return null;

  if (kind === 'admin') {
    const { data: user } = await db()
      .from('admin_users')
      .select('id, email, name, role, is_active')
      .eq('id', data.admin_user_id)
      .maybeSingle();

    if (!user || !user.is_active) return null;

    return {
      kind: 'admin',
      sessionId: data.id,
      adminUserId: user.id,
      email: user.email,
      name: user.name,
      role: user.role as 'owner' | 'staff',
    };
  }

  const { data: contact } = await db()
    .from('contacts')
    .select('id, company_id, email, first_name, last_name, portal_enabled, status')
    .eq('id', data.contact_id)
    .maybeSingle();

  if (!contact || !contact.portal_enabled || contact.status !== 'active') return null;

  return {
    kind: 'client',
    sessionId: data.id,
    contactId: contact.id,
    companyId: contact.company_id,
    email: contact.email,
    name: [contact.first_name, contact.last_name].filter(Boolean).join(' '),
  };
}

/** Touch last_seen_at. Best-effort — never block a request on it. */
export async function touchSession(sessionId: string): Promise<void> {
  await db()
    .from('sessions')
    .update({ last_seen_at: new Date().toISOString() })
    .eq('id', sessionId)
    .then(
      () => undefined,
      () => undefined,
    );
}

export async function endSession(kind: SessionKind): Promise<void> {
  const jar = await cookies();
  const name = kind === 'admin' ? ADMIN_COOKIE : CLIENT_COOKIE;
  const raw = jar.get(name)?.value;

  if (raw) {
    await db()
      .from('sessions')
      .update({ revoked_at: new Date().toISOString() })
      .eq('token_hash', sha256(raw))
      .then(
        () => undefined,
        () => undefined,
      );
  }

  jar.delete(name);
}

// ── Magic links ─────────────────────────────────────────────────────────────

export type LoginRequestResult =
  | { ok: true; email: string; link: string; name: string }
  /** Nothing was sent, but the caller must still answer the user identically. */
  | { ok: false; reason: 'unknown' | 'disabled' | 'rate_limited' };

/**
 * Rate limit: per address and per IP, over a rolling window.
 *
 * This stops the endpoint being used to spray mail at somebody's inbox, and it
 * is why the caller must give the same answer whether or not the address is
 * known — otherwise the endpoint becomes a way to test who has an account.
 */
const RATE_WINDOW_MINUTES = 15;
const MAX_PER_EMAIL = 5;
const MAX_PER_IP = 15;

async function rateLimited(email: string, ip: string | null): Promise<boolean> {
  const since = new Date(Date.now() - RATE_WINDOW_MINUTES * 60 * 1000).toISOString();

  const { count: byEmail } = await db()
    .from('login_attempts')
    .select('id', { count: 'exact', head: true })
    .gte('created_at', since)
    .ilike('email', email);

  if ((byEmail ?? 0) >= MAX_PER_EMAIL) return true;

  if (ip) {
    const { count: byIp } = await db()
      .from('login_attempts')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', since)
      .eq('ip', ip);

    if ((byIp ?? 0) >= MAX_PER_IP) return true;
  }

  return false;
}

/**
 * Create a login link for an address, if it belongs to someone who may sign in.
 *
 * Returns the link rather than sending it, so the caller decides how it goes
 * out and this stays testable.
 */
export async function requestLogin(params: {
  email: string;
  kind: SessionKind;
  baseUrl: string;
  /** Where to land after signing in. Validated by safeNext(). */
  next?: string;
}): Promise<LoginRequestResult> {
  const email = params.email.trim().toLowerCase();
  const meta = await requestMeta();

  if (await rateLimited(email, meta.ip)) {
    await db()
      .from('login_attempts')
      .insert({ email, ip: meta.ip, outcome: 'rate_limited' });
    return { ok: false, reason: 'rate_limited' };
  }

  let adminUserId: string | null = null;
  let contactId: string | null = null;
  let name = '';

  if (params.kind === 'admin') {
    const { data: user } = await db()
      .from('admin_users')
      .select('id, name, is_active')
      .ilike('email', email)
      .maybeSingle();

    if (!user) {
      await db().from('login_attempts').insert({ email, ip: meta.ip, outcome: 'unknown' });
      return { ok: false, reason: 'unknown' };
    }
    if (!user.is_active) {
      await db().from('login_attempts').insert({ email, ip: meta.ip, outcome: 'disabled' });
      return { ok: false, reason: 'disabled' };
    }
    adminUserId = user.id;
    name = user.name;
  } else {
    const { data: contact } = await db()
      .from('contacts')
      .select('id, first_name, last_name, portal_enabled, status')
      .ilike('email', email)
      .maybeSingle();

    if (!contact) {
      await db().from('login_attempts').insert({ email, ip: meta.ip, outcome: 'unknown' });
      return { ok: false, reason: 'unknown' };
    }
    if (!contact.portal_enabled || contact.status !== 'active') {
      await db().from('login_attempts').insert({ email, ip: meta.ip, outcome: 'disabled' });
      return { ok: false, reason: 'disabled' };
    }
    contactId = contact.id;
    name = [contact.first_name, contact.last_name].filter(Boolean).join(' ');
  }

  const raw = newToken();
  await db().from('login_tokens').insert({
    token_hash: sha256(raw),
    kind: params.kind,
    email,
    admin_user_id: adminUserId,
    contact_id: contactId,
    expires_at: new Date(Date.now() + LOGIN_TOKEN_MINUTES * 60 * 1000).toISOString(),
    ip: meta.ip,
  });

  await db().from('login_attempts').insert({ email, ip: meta.ip, outcome: 'sent' });

  const path = params.kind === 'admin' ? '/studio/login/verify' : '/portal/login/verify';
  const next = safeNext(params.next, params.kind);
  const query = `token=${encodeURIComponent(raw)}${next ? `&next=${encodeURIComponent(next)}` : ''}`;

  return { ok: true, email, name, link: `${params.baseUrl}${path}?${query}` };
}

/**
 * Sanitise a post-login redirect.
 *
 * `next` arrives from a query string, so without this it is an open redirect:
 * a link to our own sign-in page that lands the user on someone else's site,
 * still trusting the WL CreationX domain it started on. Only a relative path
 * inside the right section is allowed — anything absolute, protocol-relative,
 * or belonging to the other side of the app is dropped.
 */
export function safeNext(next: string | undefined | null, kind: SessionKind): string | null {
  if (!next) return null;
  if (!next.startsWith('/')) return null;
  if (next.startsWith('//')) return null; // protocol-relative -> another host
  if (next.includes('\\')) return null; // some parsers treat these as slashes

  const root = kind === 'admin' ? '/studio' : '/portal';
  if (next !== root && !next.startsWith(`${root}/`) && !next.startsWith(`${root}?`)) return null;

  // Never bounce straight back into the sign-in flow.
  if (next.startsWith(`${root}/login`)) return null;

  return next;
}

export type ConsumeResult =
  | { ok: true; kind: SessionKind }
  | { ok: false; reason: 'invalid' | 'expired' | 'used' };

/** Redeem a magic link exactly once and start a session. */
export async function consumeLoginToken(raw: string): Promise<ConsumeResult> {
  const hash = sha256(raw);

  const { data: token } = await db()
    .from('login_tokens')
    .select('id, kind, admin_user_id, contact_id, expires_at, used_at')
    .eq('token_hash', hash)
    .maybeSingle();

  if (!token) return { ok: false, reason: 'invalid' };
  if (token.used_at) return { ok: false, reason: 'used' };
  if (Date.parse(token.expires_at) < Date.now()) return { ok: false, reason: 'expired' };

  // Mark used before minting the session, and only if it is still unused. Two
  // requests racing on the same link — a mail client prefetching it while the
  // human clicks, say — must not both succeed.
  const { data: claimed } = await db()
    .from('login_tokens')
    .update({ used_at: new Date().toISOString() })
    .eq('id', token.id)
    .is('used_at', null)
    .select('id')
    .maybeSingle();

  if (!claimed) return { ok: false, reason: 'used' };

  await createSession({
    kind: token.kind as SessionKind,
    adminUserId: token.admin_user_id ?? undefined,
    contactId: token.contact_id ?? undefined,
  });

  const stamp = { last_login_at: new Date().toISOString() };
  if (token.kind === 'admin') {
    await db().from('admin_users').update(stamp).eq('id', token.admin_user_id);
  } else {
    await db().from('contacts').update(stamp).eq('id', token.contact_id);
  }

  return { ok: true, kind: token.kind as SessionKind };
}

/** Remove expired sessions and tokens. Called from the daily cron. */
export async function pruneAuth(): Promise<{ sessions: number; tokens: number }> {
  const now = new Date().toISOString();
  const { data: s } = await db().from('sessions').delete().lt('expires_at', now).select('id');
  const { data: t } = await db().from('login_tokens').delete().lt('expires_at', now).select('id');
  return { sessions: s?.length ?? 0, tokens: t?.length ?? 0 };
}

export const COOKIE_NAMES = { admin: ADMIN_COOKIE, client: CLIENT_COOKIE };
