import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/server/notify';
import { BUSINESS } from '@/data/business';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 30;

/**
 * Job applications.
 *
 * Deliberately separate from /api/leads. An applicant is not a lead: filing
 * them as one would put a CV into the sales pipeline, hand it to the quoting
 * agent, and eventually chase them with a follow-up asking whether they had
 * thought any more about their quote.
 *
 * So this route does one thing — deliver the application to careers@ with the
 * CV attached — and touches neither the CRM nor the agent.
 */

const CAREERS_EMAIL = process.env.CAREERS_EMAIL || BUSINESS.careersEmail;

/** Matches the limit stated in the form. Anything larger is refused politely. */
const MAX_CV_BYTES = 5 * 1024 * 1024;

const ALLOWED_CV =
  /\.(pdf|docx?|rtf|odt|txt|png|jpe?g|pages)$/i;

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: 'Could not read the form.' }, { status: 400 });
  }

  // Honeypot — bots fill hidden fields, applicants do not.
  if (String(form.get('website') ?? '').trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = String(form.get('name') ?? '').trim();
  const email = String(form.get('email') ?? '').trim();
  const phone = String(form.get('phone') ?? '').trim();
  const role = String(form.get('role') ?? '').trim() || 'General application';
  const message = String(form.get('message') ?? '').trim();
  const portfolio = String(form.get('portfolio') ?? '').trim();

  if (!name || !email) {
    return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'That email address does not look right.' }, { status: 400 });
  }

  const attachments: { filename: string; content: Buffer; contentType?: string }[] = [];
  const cv = form.get('cv');

  if (cv && typeof cv === 'object' && 'arrayBuffer' in cv) {
    const file = cv as File;
    if (file.size > 0) {
      if (file.size > MAX_CV_BYTES) {
        // Told plainly, with the way out, rather than a generic failure: an
        // applicant who cannot attach their CV must still know how to apply.
        return NextResponse.json(
          {
            error: `That file is ${(file.size / 1024 / 1024).toFixed(1)}MB and the limit is 5MB. Please send it straight to ${CAREERS_EMAIL} instead, or attach a smaller version.`,
          },
          { status: 413 },
        );
      }
      if (!ALLOWED_CV.test(file.name)) {
        return NextResponse.json(
          {
            error: `We cannot accept ${file.name.split('.').pop()} files here. Please attach a PDF or Word document, or email it to ${CAREERS_EMAIL}.`,
          },
          { status: 415 },
        );
      }
      attachments.push({
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer()),
        contentType: file.type || 'application/octet-stream',
      });
    }
  }

  const lines = [
    `Position: ${role}`,
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : '',
    portfolio ? `Portfolio: ${portfolio}` : '',
    '',
    message ? message : '(No covering message.)',
    '',
    attachments.length ? `CV attached: ${attachments[0].filename}` : 'No CV attached.',
  ].filter(Boolean);

  try {
    await sendEmail({
      to: CAREERS_EMAIL,
      subject: `Application — ${role} — ${name}`,
      text: lines.join('\n'),
      // So a reply from careers@ goes to the applicant, not to the website.
      replyTo: email,
      attachments,
    });
  } catch (err) {
    console.error('[careers] could not deliver application', err);
    return NextResponse.json(
      {
        error: `We could not send that. Please email your application to ${CAREERS_EMAIL} and we will pick it up.`,
      },
      { status: 502 },
    );
  }

  // Acknowledge the applicant separately. If this fails the application has
  // still arrived, so it must never turn a success into an error.
  sendEmail({
    to: email,
    subject: `We have your application — ${BUSINESS.name}`,
    text: [
      `Hi ${name.split(/\s+/)[0]},`,
      '',
      `Thanks for applying for the ${role} position. Your application has reached our careers inbox and a person will read it.`,
      '',
      attachments.length
        ? `We have your CV (${attachments[0].filename}).`
        : `We did not receive a CV with this — if you meant to attach one, reply to this email with it.`,
      '',
      `We only reply to applications we are taking further, and that can take a few weeks. Thank you for your interest in the studio.`,
      '',
      BUSINESS.name,
    ].join('\n'),
  }).catch((err) => console.error('[careers] applicant acknowledgement failed', err));

  return NextResponse.json({ ok: true });
}
