import { BUSINESS, FULL_ADDRESS } from '@/data/business';

/**
 * The studio's email signature — one definition, used by the automated quote
 * emails and by the copy pasted into Outlook/webmail. It reads its details
 * from src/data/business.ts, so the NAP in a signature can never drift from
 * the NAP on the website or in the structured data. That consistency is a
 * local-search signal, not just tidiness.
 *
 * Constraints this is built around, because email clients are not browsers:
 *   - Tables and inline styles only. No <style> block (Gmail strips it on
 *     forward), no flexbox/grid, no external CSS.
 *   - Web-safe fonts. Outlook will not load a webfont, so Syne is out; the
 *     stack falls back cleanly rather than rendering something unintended.
 *   - Images are blocked by default in most clients, so nothing important is
 *     inside one. The logo has alt text and fixed dimensions so the layout
 *     doesn't jump when it's suppressed.
 *   - Social links are text, not icon images, for the same reason.
 *   - Every colour is explicit. Outlook's dark mode inverts anything it
 *     believes is a default, which is how signatures end up unreadable.
 *   - No award, certification or rating claims.
 */

const GOLD = '#B8860B'; // darker than the site's #FFD700 — gold on white must stay legible
const INK = '#111111';
const MUTED = '#5A5A5A';
const RULE = '#E4E4E4';
const FONT = "Arial, 'Helvetica Neue', Helvetica, sans-serif";

export type SignatureIdentity = {
  /** Person's name. Omit for a general studio signature. */
  name?: string;
  /** Job title, e.g. "Creative Director". Only shown alongside a name. */
  role?: string;
  /** Personal address; falls back to the studio address. */
  email?: string;
  /** Personal/direct number; falls back to the studio number. */
  phoneDisplay?: string;
  phoneE164?: string;
};

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const SOCIALS: { label: string; url: string }[] = [
  { label: 'Instagram', url: 'https://www.instagram.com/wlcreationx' },
  { label: 'Facebook', url: 'https://www.facebook.com/wlcreationx' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/company/wlcreationx' },
];

/** The signature as HTML. Safe to append to the end of an email body. */
export function signatureHtml(identity: SignatureIdentity = {}): string {
  const email = identity.email ?? BUSINESS.email;
  const phoneDisplay = identity.phoneDisplay ?? BUSINESS.phoneDisplay;
  const phoneE164 = identity.phoneE164 ?? BUSINESS.phoneE164;
  const years = new Date().getFullYear() - BUSINESS.foundedYear;

  const link = (href: string, text: string, colour = INK, bold = false) =>
    `<a href="${esc(href)}" style="color:${colour};text-decoration:none;${
      bold ? 'font-weight:bold;' : ''
    }">${esc(text)}</a>`;

  const nameBlock = identity.name
    ? `<tr><td style="padding:0 0 1px 0;font-family:${FONT};font-size:16px;line-height:20px;color:${INK};font-weight:bold;">${esc(
        identity.name,
      )}</td></tr>` +
      (identity.role
        ? `<tr><td style="padding:0 0 6px 0;font-family:${FONT};font-size:12px;line-height:16px;color:${MUTED};letter-spacing:0.3px;">${esc(
            identity.role,
          )}</td></tr>`
        : '')
    : '';

  const socials = SOCIALS.map((s) => link(s.url, s.label, MUTED)).join(
    `<span style="color:${RULE};"> &nbsp;|&nbsp; </span>`,
  );

  // role="presentation" keeps screen readers from announcing the layout tables.
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;font-family:${FONT};">
  <tr>
    <td style="padding:0 0 10px 0;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
        <tr>
          <td valign="top" style="padding:0 16px 0 0;">
            <a href="${esc(BUSINESS.url)}" style="text-decoration:none;">
              <img src="${esc(BUSINESS.url)}/images/brand/logo-512.png"
                   width="64" height="64" alt="${esc(BUSINESS.name)}"
                   style="display:block;width:64px;height:64px;border:0;outline:none;background-color:#000000;border-radius:6px;" />
            </a>
          </td>
          <td valign="top" style="border-left:2px solid ${GOLD};padding:0 0 0 16px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
              ${nameBlock}
              <tr>
                <td style="padding:0 0 2px 0;font-family:${FONT};font-size:${
                  identity.name ? '13px' : '17px'
                };line-height:20px;color:${INK};font-weight:bold;letter-spacing:0.2px;">${esc(
                  BUSINESS.name,
                )}</td>
              </tr>
              <tr>
                <td style="padding:0 0 8px 0;font-family:${FONT};font-size:12px;line-height:16px;color:${GOLD};">Graphic Design &amp; Brand Studio &middot; Pretoria</td>
              </tr>
              <tr>
                <td style="padding:0 0 2px 0;font-family:${FONT};font-size:13px;line-height:19px;color:${INK};">
                  ${link(`tel:${phoneE164}`, phoneDisplay)}<span style="color:${RULE};"> &nbsp;|&nbsp; </span>${link(
                    `mailto:${email}`,
                    email,
                  )}
                </td>
              </tr>
              <tr>
                <td style="padding:0 0 2px 0;font-family:${FONT};font-size:13px;line-height:19px;">
                  ${link(BUSINESS.url, BUSINESS.url.replace(/^https:\/\//, ''), GOLD, true)}
                </td>
              </tr>
              <tr>
                <td style="padding:0 0 8px 0;font-family:${FONT};font-size:12px;line-height:17px;color:${MUTED};">${esc(
                  FULL_ADDRESS,
                )}</td>
              </tr>
              <tr>
                <td style="font-family:${FONT};font-size:12px;line-height:17px;color:${MUTED};">${socials}</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="border-top:1px solid ${RULE};padding:8px 0 0 0;font-family:${FONT};font-size:11px;line-height:15px;color:${MUTED};">
      Designing brands from Pretoria since ${BUSINESS.foundedYear} &mdash; ${years} years.
      <br />
      This email and any attachments are confidential and intended for the named recipient.
      If it reached you in error, please tell us and delete it. Personal information is
      processed in line with POPIA.
    </td>
  </tr>
</table>`;
}

/** The plain-text equivalent, for the text/plain half of every message. */
export function signatureText(identity: SignatureIdentity = {}): string {
  const email = identity.email ?? BUSINESS.email;
  const phoneDisplay = identity.phoneDisplay ?? BUSINESS.phoneDisplay;

  return [
    '--',
    identity.name ? `${identity.name}${identity.role ? ` | ${identity.role}` : ''}` : null,
    BUSINESS.name + ' | Graphic Design & Brand Studio, Pretoria',
    `${phoneDisplay} | ${email}`,
    BUSINESS.url,
    FULL_ADDRESS,
    '',
    `Designing brands from Pretoria since ${BUSINESS.foundedYear}.`,
    'This email is confidential and intended for the named recipient. Personal',
    'information is processed in line with POPIA.',
  ]
    .filter((l) => l !== null)
    .join('\n');
}
