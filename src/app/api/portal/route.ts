import { NextResponse } from 'next/server';
import { getSession, type ClientSession } from '@/lib/server/auth';
import { getQuote } from '@/lib/server/portal';
import { acceptQuote, declineQuote, getContact, getSettings, updateContact } from '@/lib/server/crm';
import { notifyOwner } from '@/lib/server/notify';
import { contactName, formatRand } from '@/lib/crm/types';
import { BUSINESS } from '@/data/business';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Everything the client portal writes.
 *
 * The rule this file exists to keep: an id arriving in the body is a claim,
 * not a fact. Before anything is done to a quote it is re-fetched through
 * src/lib/server/portal.ts, where the session's scope is part of the WHERE
 * clause. If the re-fetch comes back empty, the id was not theirs and the
 * request dies there — the id is never handed to crm.ts on the strength of
 * having been posted.
 */

export async function POST(request: Request) {
  const session = await getSession('client');
  if (!session) {
    return NextResponse.json(
      { error: 'You have been signed out. Sign in again to carry on.' },
      { status: 401 },
    );
  }

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const action = String(body.action ?? '');

  try {
    switch (action) {
      case 'accept-quote':
        return await handleAccept(request, session, body);

      case 'decline-quote':
        return await handleDecline(session, body);

      case 'update-details':
        return await handleUpdateDetails(session, body);

      case 'payment-details':
        return await handlePaymentDetails();

      case 'get-details':
        return await handleGetDetails(session);

      default:
        return NextResponse.json({ error: 'Unknown action.' }, { status: 400 });
    }
  } catch (error) {
    // crm.ts throws Errors whose messages are already written for a human, so
    // they are passed through rather than replaced with a generic apology.
    const message = error instanceof Error ? error.message : 'Something went wrong.';
    console.error(`[portal] ${action} failed:`, error);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

// ── Quote decisions ─────────────────────────────────────────────────────────

async function handleAccept(
  request: Request,
  session: ClientSession,
  body: Record<string, unknown>,
): Promise<NextResponse> {
  const quoteId = readString(body.quoteId);
  if (!quoteId) return bad('Which quote?');

  const name = readString(body.name);
  // Two characters is the shortest thing that is plausibly a name, and it is
  // what the acceptance form already enforces on its side.
  if (!name || name.length < 2) {
    return bad('Please type your name to accept — it is what signs the acceptance.');
  }

  const scoped = await getQuote(session, quoteId);
  if (!scoped) return notYours();

  const { quote } = scoped;

  if (quote.status !== 'sent') {
    return NextResponse.json({ error: alreadySettled(quote.status) }, { status: 409 });
  }

  const accepted = await acceptQuote(
    quote.id,
    { name, ip: clientIp(request) },
    // The actor on the timeline is the person, so the studio can see at a
    // glance that this was accepted in the portal rather than logged by hand.
    name,
  );

  // Best-effort: the acceptance is already recorded, and a push or mail
  // failure must not turn a successful acceptance into an error on screen.
  try {
    await notifyOwner({
      title: `Quote ${accepted.number} accepted`,
      summary: `${name} accepted ${accepted.number} (${formatRand(accepted.total)}) in the portal.`,
      threadId: '',
      url: `${BUSINESS.url}/studio/quotes/${accepted.id}`,
      cta: 'Open the quote',
    });
  } catch (error) {
    console.error('[portal] acceptance notification failed:', error);
  }

  return NextResponse.json({
    ok: true,
    quote: { id: accepted.id, number: accepted.number, status: accepted.status },
  });
}

async function handleDecline(
  session: ClientSession,
  body: Record<string, unknown>,
): Promise<NextResponse> {
  const quoteId = readString(body.quoteId);
  if (!quoteId) return bad('Which quote?');

  const reason = readString(body.reason);

  const scoped = await getQuote(session, quoteId);
  if (!scoped) return notYours();

  const { quote } = scoped;

  if (quote.status !== 'sent' && quote.status !== 'expired') {
    return NextResponse.json({ error: alreadySettled(quote.status) }, { status: 409 });
  }

  const declined = await declineQuote(quote.id, reason, session.name || session.email);

  try {
    await notifyOwner({
      title: `Quote ${declined.number} declined`,
      summary: reason
        ? `${session.name || session.email} declined ${declined.number}: ${reason}`
        : `${session.name || session.email} declined ${declined.number} without giving a reason.`,
      threadId: '',
      url: `${BUSINESS.url}/studio/quotes/${declined.id}`,
      cta: 'Open the quote',
    });
  } catch (error) {
    console.error('[portal] decline notification failed:', error);
  }

  return NextResponse.json({
    ok: true,
    quote: { id: declined.id, number: declined.number, status: declined.status },
  });
}

/** Why a quote can no longer be decided on, in words the client can act on. */
function alreadySettled(status: string): string {
  switch (status) {
    case 'accepted':
      return 'This quote has already been accepted. Give the studio a shout if something needs changing.';
    case 'declined':
      return 'This quote has already been declined. Ask the studio for a fresh one and we will send it through.';
    case 'expired':
      return `This quote has expired. Ask the studio to re-issue it — phone or WhatsApp ${BUSINESS.phoneDisplay} and we will sort it out.`;
    case 'superseded':
      return 'This quote has been replaced by a newer one. Have a look for the latest version in your portal.';
    default:
      return 'This quote is not open for a decision.';
  }
}

// ── The client's own details ────────────────────────────────────────────────

/**
 * Update the signed-in person's own record.
 *
 * The contact id comes from the session and nowhere else, so there is no id to
 * validate and no way to edit a colleague by posting theirs. Email is
 * deliberately not editable here: it is the sign-in credential, and changing
 * it from inside a session would let a borrowed session take the account.
 */
async function handleUpdateDetails(
  session: ClientSession,
  body: Record<string, unknown>,
): Promise<NextResponse> {
  const firstName = readString(body.firstName);
  if (!firstName) return bad('A first name is needed.');

  const contact = await updateContact(
    session.contactId,
    {
      first_name: firstName,
      last_name: readString(body.lastName),
      phone: readString(body.phone),
      job_title: readString(body.jobTitle),
      ...(typeof body.marketingConsent === 'boolean'
        ? { marketing_consent: body.marketingConsent }
        : null),
    },
    session.name || session.email,
  );

  return NextResponse.json({ ok: true, contact: publicContact(contact) });
}

async function handleGetDetails(session: ClientSession): Promise<NextResponse> {
  const contact = await getContact(session.contactId);
  if (!contact) return NextResponse.json({ error: 'Your details are not available.' }, { status: 404 });
  return NextResponse.json({ ok: true, contact: publicContact(contact) });
}

/**
 * The subset of a contact row the client may see.
 *
 * An allowlist rather than a delete-list, so a column added to the table later
 * — an internal note, a credit flag — cannot leak into the portal by default.
 */
function publicContact(contact: {
  id: string;
  first_name: string;
  last_name: string | null;
  email: string;
  phone: string | null;
  job_title: string | null;
  marketing_consent: boolean;
}) {
  return {
    id: contact.id,
    first_name: contact.first_name,
    last_name: contact.last_name,
    name: contactName(contact),
    email: contact.email,
    phone: contact.phone,
    job_title: contact.job_title,
    marketing_consent: contact.marketing_consent,
  };
}

// ── How to pay ──────────────────────────────────────────────────────────────

/**
 * The studio's banking details for the invoice page.
 *
 * These are the studio's own published details, not client-scoped data, so
 * there is nothing here to scope to a session — every signed-in client gets
 * the same answer. Read through crm.ts rather than with a query of our own,
 * because no portal page or route writes SQL.
 */
async function handlePaymentDetails(): Promise<NextResponse> {
  const settings = await getSettings();

  return NextResponse.json({
    ok: true,
    payment: {
      bank_name: settings.bank_name,
      account_name: settings.bank_account_name,
      account_number: settings.bank_account_number,
      branch_code: settings.bank_branch_code,
      notes: settings.invoice_notes,
    },
  });
}

// ── Helpers ─────────────────────────────────────────────────────────────────

/**
 * The client's IP, as evidence attached to an acceptance.
 *
 * x-forwarded-for is a list; the first entry is the original client. It is
 * trivially spoofable by the client, which is fine — this is corroboration
 * for a signed acceptance, not authentication, and the session already did
 * the authenticating.
 */
function clientIp(request: Request): string | null {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim();
    if (first) return first.slice(0, 45); // an IPv6 literal is at most 45 chars
  }
  const real = request.headers.get('x-real-ip');
  return real ? real.trim().slice(0, 45) : null;
}

function readString(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

function bad(message: string): NextResponse {
  return NextResponse.json({ error: message }, { status: 400 });
}

/**
 * The answer for an id that is not in this client's scope.
 *
 * 404, not 403: "you may not see this" confirms the record exists, which is
 * exactly what someone walking ids up the URL bar is trying to establish.
 */
function notYours(): NextResponse {
  return NextResponse.json({ error: 'That quote is not available.' }, { status: 404 });
}
