import { NextResponse } from 'next/server';
import { requestLogin, endSession, type SessionKind } from '@/lib/server/auth';
import { sendEmail } from '@/lib/server/notify';
import { signatureHtml, signatureText } from '@/lib/server/email-signature';
import { BUSINESS } from '@/data/business';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Sign-in and sign-out, for the studio and the client portal alike.
 *
 * Shared by both sides because the mechanism is identical — only the audience
 * and the destination differ — and because one endpoint means one place where
 * the non-disclosure rule below is enforced.
 */

const FONT = "Arial, 'Helvetica Neue', Helvetica, sans-serif";
const GOLD = '#B8860B'; // the site's #FFD700 is illegible on the white email card
const INK = '#111111';
const MUTED = '#5A5A5A';
const RULE = '#E4E4E4';

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Where the emailed link points.
 *
 * Deliberately NOT taken from the request's Host header in production. A magic
 * link is a bearer credential, and a poisoned Host would mint one pointing at
 * someone else's server — the classic password-reset host-header attack. The
 * canonical URL is a constant, so the link can only ever go to our own domain.
 * The request origin is used in development, where localhost has to work.
 */
function baseUrlFor(request: Request): string {
  const configured = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) return configured.replace(/\/+$/, '');
  if (process.env.NODE_ENV === 'production') return BUSINESS.url;
  try {
    return new URL(request.url).origin;
  } catch {
    return BUSINESS.url;
  }
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const action = String(body.action ?? '');
  const kind = body.kind === 'admin' ? 'admin' : body.kind === 'client' ? 'client' : null;

  switch (action) {
    case 'request-login': {
      // A bad `kind` is a caller bug, not somebody probing for accounts, so it
      // can be reported honestly without telling anyone who has an account.
      if (!kind) return NextResponse.json({ error: 'Unknown sign-in type.' }, { status: 400 });

      const email = typeof body.email === 'string' ? body.email.trim() : '';
      const next = typeof body.next === 'string' ? body.next : undefined;

      // Everything below is wrapped so that a mail-server outage, a malformed
      // address or a genuine send all leave through the same door. See the
      // comment on `sameAnswer` for why that matters.
      if (email.includes('@')) {
        try {
          const result = await requestLogin({
            email,
            kind,
            baseUrl: baseUrlFor(request),
            next,
          });

          if (result.ok) {
            const mail = loginEmail({
              name: result.name,
              link: result.link,
              kind,
            });
            await sendEmail({
              to: result.email,
              subject: mail.subject,
              text: mail.text,
              html: mail.html,
            });
          }
        } catch (error) {
          // Logged for the operator, never surfaced: the shape of a failure is
          // itself information about whether there was an account to fail on.
          console.error('[auth] sign-in link not sent:', error);
        }
      }

      return sameAnswer();
    }

    case 'logout': {
      if (!kind) return NextResponse.json({ error: 'Unknown sign-in type.' }, { status: 400 });
      await endSession(kind);
      return NextResponse.json({ ok: true });
    }

    default:
      return NextResponse.json({ error: 'Unknown action.' }, { status: 400 });
  }
}

/**
 * The single answer every sign-in request gets.
 *
 * Unknown address, disabled account, rate-limited, or actually sent — all four
 * return this, byte for byte. Any difference at all (a status code, a field, a
 * word) turns the endpoint into an oracle for "does this person have an
 * account here", which for a client portal is a list of who the studio works
 * with. The user-facing copy on both sign-in pages is written to match: "if
 * that address is on file, a link is on its way".
 */
function sameAnswer(): NextResponse {
  return NextResponse.json({ ok: true }, { status: 200 });
}

/** Subject, text and HTML for one sign-in link. */
function loginEmail(params: { name: string; link: string; kind: SessionKind }): {
  subject: string;
  text: string;
  html: string;
} {
  const first = params.name.trim().split(/\s+/)[0] || 'there';
  const where = params.kind === 'admin' ? 'the studio' : 'your client portal';
  const subject =
    params.kind === 'admin'
      ? `Your sign-in link — ${BUSINESS.name} studio`
      : `Your sign-in link — ${BUSINESS.name}`;

  const opening = `Hi ${first}`;
  const line = `Here is your link into ${where}. Tap it and you are in — there is no password to remember.`;
  const caveat =
    'The link expires in 20 minutes and works only once, so open it on the device you want to stay signed in on.';
  const footnote =
    'If you did not ask for this, you can ignore it — nothing has changed on your account and the link will quietly expire.';

  const text = [
    opening,
    '',
    line,
    '',
    params.link,
    '',
    caveat,
    '',
    footnote,
    '',
    signatureText(),
  ].join('\n');

  const paragraph = (content: string, colour = INK, size = '15px', lineHeight = '23px') =>
    `<p style="margin:0 0 14px 0;font-family:${FONT};font-size:${size};line-height:${lineHeight};color:${colour};">${content}</p>`;

  const inner = [
    `<div style="font-family:${FONT};font-size:11px;line-height:16px;letter-spacing:1.5px;color:${GOLD};font-weight:bold;">SIGN IN</div>`,
    `<h1 style="margin:8px 0 14px 0;font-family:${FONT};font-size:21px;line-height:28px;color:${INK};">${esc(opening)}</h1>`,
    paragraph(esc(line)),
    // One button, and the raw URL is not repeated in the body: a long token
    // pasted as text is what makes these emails look like phishing.
    `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 18px 0;"><tr>
      <td style="background-color:${INK};border-radius:6px;">
        <a href="${esc(params.link)}" style="display:inline-block;padding:13px 26px;font-family:${FONT};font-size:15px;font-weight:bold;color:#FFD700;text-decoration:none;">Sign in &rarr;</a>
      </td>
    </tr></table>`,
    paragraph(esc(caveat), MUTED, '13px', '20px'),
    `<p style="margin:0;padding:14px 0 0 0;border-top:1px solid ${RULE};font-family:${FONT};font-size:12px;line-height:18px;color:${MUTED};">${esc(footnote)}</p>`,
  ].join('');

  return { subject, text, html: wrapEmail(inner, 'Your sign-in link — it expires in 20 minutes.') };
}

/**
 * The house email shell: light ground, a 600px white card, the signature.
 *
 * A near-copy of the private wrapEmail() in render-quote.ts. Duplicated rather
 * than imported because that one is not exported; if a third caller appears it
 * should be lifted into a shared module instead of copied again.
 */
function wrapEmail(inner: string, preheader: string): string {
  return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="color-scheme" content="light" />
<title>${esc(BUSINESS.name)}</title>
</head>
<body style="margin:0;padding:0;background-color:#F6F6F4;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(preheader)}</div>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;background-color:#F6F6F4;">
  <tr><td align="center" style="padding:24px 12px;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="border-collapse:collapse;width:100%;max-width:600px;background-color:#FFFFFF;border:1px solid ${RULE};border-radius:8px;">
      <tr><td style="padding:28px 28px 0 28px;">${inner}</td></tr>
      <tr><td style="padding:24px 28px 28px 28px;">${signatureHtml()}</td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}
