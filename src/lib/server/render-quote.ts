import { BUSINESS, FULL_ADDRESS } from '@/data/business';
import { STANDARD_INCLUSIONS, CURRENCY_SYMBOL } from '@/data/pricing';
import type { QuoteLineResolved } from '@/lib/quote-agent';

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

  parts.push(
    '',
    '—',
    BUSINESS.name,
    FULL_ADDRESS,
    `${BUSINESS.phoneDisplay} · ${BUSINESS.email}`,
    BUSINESS.url,
  );

  return parts.join('\n');
}
