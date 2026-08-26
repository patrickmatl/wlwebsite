import { BUSINESS } from '@/data/business';
import { STANDARD_INCLUSIONS, CURRENCY_SYMBOL } from '@/data/pricing';
import type { QuoteLineResolved } from '@/lib/quote-agent';
import { signatureHtml, signatureText } from './email-signature';

/**
 * Renders the final client-facing email: the agent's prose, then a clean
 * itemised quote generated from the resolved line items (never from model
 * free-text, so the numbers can't drift from the price list).
 */
export function renderClientEmail(params: {
  body: string;
  lines: QuoteLineResolved[];
  total: number | null;
  validityDays: number;
  clientName: string;
}): string {
  const parts: string[] = [params.body.trim()];

  if (params.lines.length) {
    parts.push('', '─'.repeat(52), 'QUOTE', '─'.repeat(52), '');

    for (const l of params.lines) {
      const qty = l.quantity > 1 ? ` x${l.quantity}` : '';
      const amount =
        l.lineTotal === null
          ? 'Quoted on request'
          : `${CURRENCY_SYMBOL}${l.lineTotal.toLocaleString('en-ZA')}`;
      parts.push(`${l.name}${qty}`);
      if (l.note) parts.push(`  ${l.note}`);
      parts.push(`  ${amount}`, '');
    }

    parts.push('─'.repeat(52));
    parts.push(
      params.total === null
        ? 'TOTAL: quoted on request — some items need scoping first'
        : `TOTAL: ${CURRENCY_SYMBOL}${params.total.toLocaleString('en-ZA')}`,
    );
    parts.push('─'.repeat(52), '');
    parts.push(`Valid for ${params.validityDays} days. Prices exclude VAT.`, '');
    parts.push('Included with every project:');
    for (const inc of STANDARD_INCLUSIONS) parts.push(`  • ${inc}`);
  }

  parts.push('', signatureText());

  return parts.join('\n');
}

/**
 * The instant acknowledgement.
 *
 * Sent the moment a form is submitted, before the agent has even run. It is a
 * fixed template with no AI in it, so it can go out with no review and cannot
 * say anything unintended. Its whole job is that nobody who contacts the studio
 * ever sits there wondering whether it arrived.
 */
export function renderAck(params: { clientName: string; service?: string | null }): {
  subject: string;
  text: string;
  html: string;
} {
  const first = params.clientName.trim().split(/\s+/)[0] || 'there';
  const about = params.service ? ` about ${params.service.toLowerCase()}` : '';

  const body =
    `Hi ${first}\n\n` +
    `Thanks for getting in touch${about} — your enquiry has come through and we are looking at it now.\n\n` +
    `You will hear back from us shortly, either with a quote or with a couple of questions if we need to pin the scope down first.\n\n` +
    `If it is urgent, phone or WhatsApp us on ${BUSINESS.phoneDisplay} and we will pick it up straight away.`;

  return {
    subject: `We have your enquiry — ${BUSINESS.name}`,
    text: `${body}\n\n${signatureText()}`,
    html: wrapEmail(
      body
        .split(/\n\s*\n/)
        .map(
          (p) =>
            `<p style="margin:0 0 14px 0;font-family:${FONT};font-size:15px;line-height:23px;color:${INK};">${esc(
              p,
            ).replace(/\n/g, '<br />')}</p>`,
        )
        .join(''),
      'We have your enquiry',
    ),
  };
}

const FONT = "Arial, 'Helvetica Neue', Helvetica, sans-serif";
const GOLD = '#B8860B';
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

function money(n: number): string {
  return `${CURRENCY_SYMBOL}${n.toLocaleString('en-ZA')}`;
}

/**
 * The HTML half of the same email. Sent alongside the plain-text version, so a
 * client on a text-only reader still gets everything — the two must always say
 * the same thing.
 *
 * Same email-client constraints as the signature: tables, inline styles,
 * explicit colours, no webfonts.
 */
export function renderClientEmailHtml(params: {
  body: string;
  lines: QuoteLineResolved[];
  total: number | null;
  validityDays: number;
  clientName: string;
}): string {
  const paragraphs = params.body
    .trim()
    .split(/\n\s*\n/)
    .map(
      (p) =>
        `<p style="margin:0 0 14px 0;font-family:${FONT};font-size:15px;line-height:23px;color:${INK};">${esc(
          p.trim(),
        ).replace(/\n/g, '<br />')}</p>`,
    )
    .join('');

  let quote = '';
  if (params.lines.length) {
    const rows = params.lines
      .map((l) => {
        const qty = l.quantity > 1 ? ` &times;${l.quantity}` : '';
        const amount = l.lineTotal === null ? 'Quoted on request' : money(l.lineTotal);
        return `<tr>
  <td style="padding:12px 12px 12px 0;border-bottom:1px solid ${RULE};font-family:${FONT};font-size:14px;line-height:20px;color:${INK};">
    <strong>${esc(l.name)}</strong>${qty}
    ${l.note ? `<br /><span style="font-size:12px;line-height:17px;color:${MUTED};">${esc(l.note)}</span>` : ''}
  </td>
  <td align="right" valign="top" style="padding:12px 0;border-bottom:1px solid ${RULE};font-family:${FONT};font-size:14px;line-height:20px;color:${INK};white-space:nowrap;">${esc(
    amount,
  )}</td>
</tr>`;
      })
      .join('');

    const totalText =
      params.total === null
        ? 'Quoted on request &mdash; some items need scoping first'
        : money(params.total);

    const inclusions = STANDARD_INCLUSIONS.map(
      (inc) =>
        `<tr><td style="padding:0 0 4px 0;font-family:${FONT};font-size:12px;line-height:18px;color:${MUTED};">&bull;&nbsp; ${esc(
          inc,
        )}</td></tr>`,
    ).join('');

    quote = `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;margin:24px 0 0 0;">
  <tr><td style="border-top:2px solid ${GOLD};padding:14px 0 10px 0;font-family:${FONT};font-size:12px;line-height:16px;color:${GOLD};font-weight:bold;letter-spacing:1.5px;">QUOTE</td></tr>
  <tr><td>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">${rows}
      <tr>
        <td style="padding:14px 12px 0 0;font-family:${FONT};font-size:15px;line-height:22px;color:${INK};font-weight:bold;">Total</td>
        <td align="right" style="padding:14px 0 0 0;font-family:${FONT};font-size:18px;line-height:22px;color:${INK};font-weight:bold;white-space:nowrap;">${totalText}</td>
      </tr>
    </table>
  </td></tr>
  <tr><td style="padding:10px 0 18px 0;font-family:${FONT};font-size:12px;line-height:17px;color:${MUTED};">Valid for ${
    params.validityDays
  } days. Prices exclude VAT.</td></tr>
  <tr><td style="padding:0 0 6px 0;font-family:${FONT};font-size:12px;line-height:16px;color:${INK};font-weight:bold;">Included with every project</td></tr>
  <tr><td><table role="presentation" cellpadding="0" cellspacing="0" border="0">${inclusions}</table></td></tr>
</table>`;
  }

  return wrapEmail(
    `${paragraphs}${quote}`,
    params.lines.length ? `Your quote from ${BUSINESS.name}` : `A note from ${BUSINESS.name}`,
  );
}

/**
 * The shared HTML shell: light background, a 600px white card, the signature.
 * `preheader` is the hidden line inboxes show next to the subject — without one
 * they scrape the first words of the body, which reads badly.
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
