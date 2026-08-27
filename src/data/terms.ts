/**
 * Standard terms for quotes and proforma invoices.
 *
 * These render in the visible "Terms" block of the PDF (small print, but on
 * the document face) and that placement is load-bearing, not cosmetic: under
 * the Consumer Protection Act 68 of 2008 a term that limits the studio's
 * liability or imposes an obligation on the client is enforceable ONLY if it
 * is conspicuous and in plain language (s49, s22). A term hidden in dense
 * boilerplate is void — it protects the client's chargeback claim, not the
 * studio. Never move these into a linked page, a footnote, or an attachment.
 *
 * Specific choices, so nobody "improves" them into a liability:
 * - The cancellation charge is work-done + 20% of the amount paid, expressly
 *   capped at the amount paid. An uncapped or flat-forfeit fee reads as a
 *   penalty and gets struck down under CPA s17 / the Conventional Penalties
 *   Act. Reasonable and capped is what makes it stick.
 * - The quote is an estimate UNTIL acceptance, and expressly binding after —
 *   saying "never binding" would let clients argue the studio's own accepted
 *   quotes are worthless.
 * - The automated-assistant line is an honest disclosure with a pre-acceptance
 *   error-correction path (ECTA 25 of 2002 s20 rewards exactly this). It is
 *   not, and must never become, a buried "auto-generated, not our problem"
 *   disclaimer.
 * - Copyright is actively assigned on final payment (Copyright Act s22(3)
 *   needs written assignment from the studio's side), and use of the work
 *   before final payment is barred — that is the studio's real leverage on a
 *   non-paying client.
 */

/** Rendered on every quote PDF under "Terms". */
export const QUOTE_TERMS = [
  '1) This quotation is an estimate, valid for 30 days from issue. Once you accept it within that period, the price is fixed for the work described; it changes only if the scope changes (see 2).',
  '2) If the scope changes, we will send a revised quote before extra work begins.',
  '3) Our automated quoting assistant helped prepare this quote. If a line looks mispriced, reply before accepting and a person will correct it.',
  '4) Work is scheduled once the 50% deposit is paid; the balance is due on handover of the final artwork.',
  '5) Two revision rounds are included; further rounds are quoted before we start them.',
  '6) If you cancel after paying, we keep the value of work already done plus a 20% cancellation fee for the booking slot we held — together never more than you have paid — and refund the rest promptly.',
  '7) On final payment we assign copyright in the final artwork to you and hand over the editable working files; until then the work remains ours and may not be used.',
  '8) Content you supply (logos, photos, text) must be yours to use; any third-party claim about supplied content is your responsibility, not ours.',
  '9) We may show the finished work in our portfolio unless you ask us not to.',
  '10) All prices are in Rand; we are not a registered VAT vendor, so no VAT is charged.',
].join(' ');

/** Rendered on every proforma invoice PDF — the payment moment, so the money
 *  terms are repeated where the client is about to act on them. */
export const PROFORMA_TERMS = [
  'Your 50% deposit books this job into our schedule; the balance is due on handover of the final artwork.',
  'Two revision rounds are included; extra rounds are quoted before we start.',
  'If you cancel after paying, we keep the value of work already done plus a 20% cancellation fee — together never more than you have paid — and refund the rest promptly.',
  'On final payment we assign copyright in the final artwork to you and hand over the editable working files; until then the work remains ours and may not be used.',
  'All amounts are in Rand; WL CreationX is not a registered VAT vendor, so no VAT is charged.',
].join(' ');

/** One honest sentence in the quote email footer. Visible by design — see the
 *  file comment: disclosure is what makes the error-correction term work. */
export const AUTOMATION_DISCLOSURE =
  'This quote was prepared with help from our automated quoting assistant; if anything looks off, just reply and a person will check it.';
