import { NextResponse } from 'next/server';
import { authoriseCron } from '@/lib/server/cron-auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/**
 * Health check for the things that only fail in production.
 *
 * Exists because a hosting move surfaces exactly one class of bug: an
 * environment variable that is present but wrong, or an outbound call the new
 * platform will not make. Neither shows up locally, and neither is visible in a
 * log viewer that only keeps container startup.
 *
 * Reports whether each secret is *present and plausibly shaped* — never its
 * value — and actually exercises the two outbound dependencies rather than
 * assuming they work. Guarded by the same secret as the cron endpoints.
 */
export async function GET(request: Request) {
  const auth = authoriseCron(request);
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const env: Record<string, string> = {};
  for (const key of [
    'SUPABASE_URL',
    'SUPABASE_SERVICE_ROLE_KEY',
    'GEMINI_API_KEY',
    'GEMINI_MODEL',
    'SMTP_HOST',
    'SMTP_USER',
    'SMTP_PASSWORD',
    'QUOTE_FROM_EMAIL',
    'OWNER_EMAIL',
    'ADMIN_TOKEN',
    'INBOUND_POLL_SECRET',
    'QUOTE_AUTOPILOT',
  ]) {
    const v = process.env[key];
    env[key] = v ? `${v.length} chars, starts "${v.slice(0, 4)}"` : 'MISSING';
  }

  // Gemini: the call the drafting pipeline actually makes.
  let gemini: unknown;
  try {
    const { draftReply } = await import('@/lib/quote-agent');
    const draft = await draftReply({
      enquiry: {
        name: 'Diagnostic',
        email: 'diagnostic@example.invalid',
        service: 'Logo Design',
        details: 'We need a logo with four concepts. What does that cost?',
      },
    });
    gemini = { ok: true, action: draft.action, total: draft.total, lines: draft.lines.length };
  } catch (err) {
    gemini = { ok: false, error: err instanceof Error ? err.message : String(err) };
  }

  // SMTP: connect and authenticate without sending anything.
  let smtp: unknown;
  try {
    const nodemailer = (await import('nodemailer')).default;
    const port = Number(process.env.SMTP_PORT ?? 465);
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
    });
    await transport.verify();
    smtp = { ok: true };
  } catch (err) {
    smtp = { ok: false, error: err instanceof Error ? err.message : String(err) };
  }

  return NextResponse.json({ env, gemini, smtp }, { status: 200 });
}
