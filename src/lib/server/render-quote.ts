import { BUSINESS } from '@/data/business';
import { STANDARD_INCLUSIONS, CURRENCY_SYMBOL } from '@/data/pricing';
import { signOffName, type QuoteLineResolved } from '@/lib/quote-agent';
import { signatureHtml, signatureText } from './email-signature';

/**
 * Both ends of the letter, written here rather than by the model.
 *
 * The agent is told to open on the substance of the enquiry, which it does
 * well — but nothing ever required it to greet the client, so it decided per
 * email. One real reply opened "Hi Patrick," and the next began "Ember Roast
 * sounds like a great addition to the Centurion coffee scene", with no
 * greeting at all. Either can be defended; having both is what reads as
 * machine-written.
 *
 * So the greeting and the sign-off are fixed here and the model's own attempt
 * at either is stripped first, which also puts the sign-off where it belongs —
 * after the itemised quote instead of stranded above it.
 */

/** "Dear" reads more formal than "Hi"; set EMAIL_SALUTATION to swap it. */
const SALUTATION_WORD = process.env.EMAIL_SALUTATION?.trim() || 'Dear';

function salutation(clientName: string): string {
  const name = greetingName(clientName);
  // greetingName() returns "there" when it has nothing usable, and
  // "Dear there," is worse than not naming them at all.
  return name === 'there' ? 'Good day,' : `${SALUTATION_WORD} ${name},`;
}

function closing(): string {
  return `Kind regards,\n${signOffName()}`;
}

/** A greeting the model wrote: one short line, nothing but the hello. */
const GREETING_LINE =
  /^(hi|hello|hey|dear|good\s+(morning|afternoon|evening|day))\b[^.!?]{0,40}[,.!]?$/i;

/** A sign-off the model wrote, on a line of its own. */
const SIGN_OFF_LINE =
  /^(kind regards|warm regards|best regards|best wishes|regards|sincerely|yours sincerely|yours faithfully|many thanks|thank you|thanks|cheers|all the best|best)[.,!]?$/i;

function stripSalutation(body: string): string {
  const lines = body.split('\n');
  while (lines.length && lines[0].trim() === '') lines.shift();
  if (lines.length && GREETING_LINE.test(lines[0].trim())) {
    lines.shift();
    while (lines.length && lines[0].trim() === '') lines.shift();
  }
  return lines.join('\n');
}

function stripSignOff(body: string): string {
  const lines = body.split('\n');
  const dropTrailingBlanks = () => {
    while (lines.length && lines[lines.length - 1].trim() === '') lines.pop();
  };
  dropTrailingBlanks();

  // Either "Kind regards," alone, or "Kind regards," followed by a name.
  for (const take of [2, 1]) {
    const at = lines.length - take;
    if (at >= 0 && SIGN_OFF_LINE.test(lines[at].trim())) {
      lines.splice(at);
      break;
    }
  }

  dropTrailingBlanks();
  return lines.join('\n');
}

/** The agent's prose with any greeting or sign-off of its own removed. */
function letterBody(body: string): string {
  return stripSignOff(stripSalutation(body.trim())).trim();
}

/**
 * Prose to HTML paragraphs.
 *
 * Blank-line-separated blocks become <p>; single newlines inside a block stay
 * as line breaks. Margin and line-height live here so every email in the file
 * breathes the same way instead of each one carrying its own copy.
 */
function paragraphsHtml(text: string, opts: { topMargin?: number } = {}): string {
  const top = opts.topMargin ?? 0;
  return text
    .trim()
    .split(/\n\s*\n/)
    .filter((p) => p.trim() !== '')
    .map(
      (p, i) =>
        `<p style="margin:${i === 0 ? top : 0}px 0 18px 0;font-family:${FONT};font-size:15px;line-height:25px;color:${INK};">${esc(
          p.trim(),
        ).replace(/\n/g, '<br />')}</p>`,
    )
    .join('');
}

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
  /** Where the client can open the quote and accept it, if it has been issued. */
  viewUrl?: string | null;
}): string {
  const parts: string[] = [salutation(params.clientName), '', letterBody(params.body)];

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
      for (const inc of l.includes ?? []) parts.push(`    • ${inc}`);
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

    if (params.viewUrl) {
      parts.push('', 'The quote is attached as a PDF. You can also open it and accept it here:', params.viewUrl);
    }
  }

  // The sign-off closes the letter, so it goes after the quote rather than
  // above it — otherwise the itemised prices read as a postscript.
  parts.push('', closing(), '', signatureText());

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
  const about = params.service ? ` about ${params.service.toLowerCase()}` : '';

  const body =
    `Thanks for getting in touch${about} — your enquiry has come through and we are looking at it now.\n\n` +
    `You will hear back from us shortly, either with a quote or with a couple of questions if we need to pin the scope down first.\n\n` +
    `If it is urgent, phone or WhatsApp us on ${BUSINESS.phoneDisplay} and we will pick it up straight away.`;

  const letter = `${salutation(params.clientName)}\n\n${body}\n\n${closing()}`;

  return {
    subject: `We have your enquiry — ${BUSINESS.name}`,
    text: `${letter}\n\n${signatureText()}`,
    html: wrapEmail(paragraphsHtml(letter), 'We have your enquiry'),
  };
}

/**
 * How to open an email to someone.
 *
 * Naively taking the first word turns "Mrs Botha" into "Hi Mrs", which is the
 * kind of small wrongness that tells a reader immediately that nothing human
 * wrote this. A title on its own is never a greeting: keep the surname with it.
 */
const TITLES = new Set(['mr', 'mrs', 'ms', 'miss', 'dr', 'prof', 'professor', 'sir', 'madam']);

export function greetingName(fullName: string): string {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'there';

  const first = parts[0];
  const isTitle = TITLES.has(first.toLowerCase().replace(/\.$/, ''));

  // "Mrs Botha" -> "Mrs Botha"; "Mrs" alone -> fall back rather than greet a title.
  if (isTitle) return parts.length > 1 ? `${first} ${parts[1]}` : 'there';
  return first;
}

/**
 * The holding reply for anything a person has to handle.
 *
 * Complaints, disputes and anything the agent could not read confidently are
 * held for a human — which used to mean the sender heard nothing at all until
 * somebody opened /studio. For a client with a problem that is the worst
 * possible response.
 *
 * Fixed text with no AI in it, so it cannot guess at a situation it does not
 * understand. It promises only that a person is looking, which is true the
 * moment it is sent.
 */
export function renderHandoverAck(params: { clientName: string }): {
  subject: string;
  text: string;
  html: string;
} {
  const body =
    `Thanks for your message — it has reached us and I have read it.\n\n` +
    `This one deserves a proper answer rather than a quick one, so I am passing it to ` +
    `someone who can deal with it directly. You will hear back from us personally.\n\n` +
    `If it is urgent in the meantime, phone or WhatsApp ${BUSINESS.phoneDisplay}.`;

  const letter = `${salutation(params.clientName)}\n\n${body}\n\n${closing()}`;

  return {
    subject: 'We have your message',
    text: `${letter}\n\n${signatureText()}`,
    html: wrapEmail(paragraphsHtml(letter), 'We have your message'),
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
  viewUrl?: string | null;
}): string {
  const paragraphs =
    paragraphsHtml(salutation(params.clientName)) + paragraphsHtml(letterBody(params.body));

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
    ${
      (l.includes ?? []).length
        ? `<ul style="margin:6px 0 0 0;padding:0 0 0 16px;">${(l.includes ?? [])
            .map(
              (inc) =>
                `<li style="font-size:12px;line-height:18px;color:${MUTED};">${esc(inc)}</li>`,
            )
            .join('')}</ul>`
        : ''
    }
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

  // One button, after the itemised quote: accepting should be the easy thing to do.
  const cta = params.viewUrl
    ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:22px 0 4px 0;"><tr>
         <td style="background-color:#111111;border-radius:6px;">
           <a href="${esc(params.viewUrl)}" style="display:inline-block;padding:12px 22px;font-family:${FONT};font-size:14px;font-weight:bold;color:#FFD700;text-decoration:none;">View and accept the quote &rarr;</a>
         </td></tr></table>
       <p style="margin:0;font-family:${FONT};font-size:12px;line-height:18px;color:${MUTED};">The quote is attached as a PDF as well.</p>`
    : '';

  const signOff = paragraphsHtml(closing(), { topMargin: 26 });

  return wrapEmail(
    `${paragraphs}${quote}${cta}${signOff}`,
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
