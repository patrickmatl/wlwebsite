import crypto from 'crypto';
import { db } from './db';

/**
 * Thread references.
 *
 * Every conversation gets a short token like [WLX-7F3K2] which rides in the
 * subject line of everything we send. When a reply comes back, the token tells
 * us exactly which conversation it belongs to.
 *
 * Without it we would have to guess from the sender's address, which breaks the
 * moment a client has two jobs running, or replies from a colleague's mailbox.
 * The address match stays as a fallback for people who start a fresh email.
 */

// No vowels, no 0/O/1/I — the token gets read aloud and retyped by humans.
const ALPHABET = '23456789BCDFGHJKLMNPQRSTVWXYZ';

export function newThreadRef(): string {
  const bytes = crypto.randomBytes(5);
  let out = '';
  for (let i = 0; i < 5; i++) out += ALPHABET[bytes[i] % ALPHABET.length];
  return `WLX-${out}`;
}

const REF_PATTERN = /\[?(WLX-[23456789BCDFGHJKLMNPQRSTVWXYZ]{5})\]?/i;

/** Pull a thread reference out of a subject line (or anywhere in the body). */
export function extractThreadRef(...haystack: (string | null | undefined)[]): string | null {
  for (const h of haystack) {
    const m = h?.match(REF_PATTERN);
    if (m) return m[1].toUpperCase();
  }
  return null;
}

/** Add the reference to a subject line, unless it is already there. */
export function tagSubject(subject: string, ref: string | null): string {
  if (!ref || subject.includes(ref)) return subject;
  return `${subject} [${ref}]`;
}

export type ThreadRow = {
  id: string;
  lead_id: string;
  subject: string;
  ref: string | null;
  state: string;
  follow_ups_sent: number | null;
};

/** Create a thread with a unique reference. */
export async function createThread(params: {
  leadId: string;
  subject: string;
}): Promise<ThreadRow> {
  // Collisions are vanishingly unlikely (29^5 ≈ 20.5m) but a duplicate ref
  // would misroute a client's reply, so retry rather than assume.
  for (let attempt = 0; attempt < 5; attempt++) {
    const ref = newThreadRef();
    const { data, error } = await db()
      .from('quote_threads')
      .insert({ lead_id: params.leadId, subject: params.subject, ref })
      .select()
      .single();

    if (data) return data as ThreadRow;
    if (error && !/duplicate|unique/i.test(error.message)) {
      throw new Error(`could not create thread: ${error.message}`);
    }
  }
  throw new Error('could not create thread: ran out of reference attempts');
}

/** Find the thread a reply belongs to: by reference first, then by sender. */
export async function findThreadForReply(params: {
  ref: string | null;
  email: string;
}): Promise<{ thread: ThreadRow; lead: Record<string, unknown> } | null> {
  if (params.ref) {
    const { data: thread } = await db()
      .from('quote_threads')
      .select('*')
      .eq('ref', params.ref)
      .maybeSingle();

    if (thread) {
      const { data: lead } = await db()
        .from('leads')
        .select('*')
        .eq('id', (thread as ThreadRow).lead_id)
        .single();
      if (lead) return { thread: thread as ThreadRow, lead };
    }
  }

  // Fallback: most recent lead from this address, and its newest thread.
  const { data: lead } = await db()
    .from('leads')
    .select('*')
    .ilike('email', params.email)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!lead) return null;

  const { data: thread } = await db()
    .from('quote_threads')
    .select('*')
    .eq('lead_id', lead.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  return thread ? { thread: thread as ThreadRow, lead } : null;
}
