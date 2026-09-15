/**
 * The guards that stand between the agent and a client's inbox.
 *
 * Not broad coverage — deliberately. These cover the four paths where a bug
 * reaches a real person and costs real money:
 *
 *   1. the autopilot brake      — decides whether an email sends itself
 *   2. the advertised-price floor — stops the studio undercutting its own page
 *   3. the CV gate              — keeps a job applicant's personal data out of the model
 *   4. catalogue integrity      — the agent may only quote ids that exist
 *
 * Node's built-in runner, run through tsx. No new dependencies, matching the
 * approach already taken in document-text.ts.
 *
 *   npm test
 */
import { test, describe, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

import { decideAutoSend, advertisedFloorBreach } from '@/lib/server/autosend';
import { looksLikeJobApplication } from '@/lib/quote-agent';
import { ALL_ITEMS, findPriceItem, printSellPrice, PRINT_MIN_HANDLING } from '@/data/pricing';

// ── 1. The autopilot brake ───────────────────────────────────────────────────

describe('decideAutoSend', () => {
  const env = { ...process.env };
  beforeEach(() => {
    delete process.env.QUOTE_AUTOPILOT;
    delete process.env.QUOTE_AUTOPILOT_MAX;
  });
  afterEach(() => {
    process.env = { ...env };
  });

  const draft = (over: Partial<Parameters<typeof decideAutoSend>[0]> = {}) => ({
    action: 'quote' as const,
    confidence: 'high' as const,
    total: 5000 as number | null,
    ...over,
  });

  // The two that must hold at EVERY autopilot level, including 'all'.
  for (const level of ['off', 'safe', 'all']) {
    test(`never auto-sends 'ignore' at level ${level}`, () => {
      process.env.QUOTE_AUTOPILOT = level;
      assert.equal(decideAutoSend(draft({ action: 'ignore' })).send, false);
    });

    test(`never auto-sends 'handover' at level ${level}`, () => {
      process.env.QUOTE_AUTOPILOT = level;
      assert.equal(decideAutoSend(draft({ action: 'handover' })).send, false);
    });
  }

  test("'off' holds everything, even a confident quote", () => {
    process.env.QUOTE_AUTOPILOT = 'off';
    assert.equal(decideAutoSend(draft()).send, false);
  });

  test("'safe' holds a low-confidence draft", () => {
    process.env.QUOTE_AUTOPILOT = 'safe';
    assert.equal(decideAutoSend(draft({ confidence: 'low' })).send, false);
  });

  test("'safe' sends a high-confidence draft", () => {
    process.env.QUOTE_AUTOPILOT = 'safe';
    assert.equal(decideAutoSend(draft()).send, true);
  });

  test("'all' sends even low confidence", () => {
    process.env.QUOTE_AUTOPILOT = 'all';
    assert.equal(decideAutoSend(draft({ confidence: 'low' })).send, true);
  });

  test('defaults to safe when unset — low confidence is held', () => {
    assert.equal(decideAutoSend(draft({ confidence: 'low' })).send, false);
  });

  test('holds a quote over the ceiling', () => {
    process.env.QUOTE_AUTOPILOT = 'all';
    process.env.QUOTE_AUTOPILOT_MAX = '10000';
    assert.equal(decideAutoSend(draft({ total: 25000 })).send, false);
  });

  test('sends a quote under the ceiling', () => {
    process.env.QUOTE_AUTOPILOT = 'all';
    process.env.QUOTE_AUTOPILOT_MAX = '10000';
    assert.equal(decideAutoSend(draft({ total: 2500 })).send, true);
  });

  test('holds an on-request quote when a ceiling is set — nothing to compare', () => {
    process.env.QUOTE_AUTOPILOT = 'all';
    process.env.QUOTE_AUTOPILOT_MAX = '10000';
    assert.equal(decideAutoSend(draft({ total: null })).send, false);
  });
});

// ── 2. The advertised-price floor ────────────────────────────────────────────

describe('advertisedFloorBreach', () => {
  test('flags a quote below the figure the client was shown', () => {
    const r = advertisedFloorBreach('Basic Packaging listed at R2 500', 1800);
    assert.equal(r.breached, true);
    assert.equal(r.advertised, 2500);
  });

  test('accepts a quote above the advertised figure', () => {
    assert.equal(advertisedFloorBreach('listed at R2,500', 9850).breached, false);
  });

  test('tolerates the rounding rand', () => {
    assert.equal(advertisedFloorBreach('listed at R2500', 2499).breached, false);
  });

  test('reads cents without inflating the figure', () => {
    assert.equal(advertisedFloorBreach('listed at R2500.00', 2600).breached, false);
  });

  test('no advertised price mentioned — nothing to breach', () => {
    assert.equal(advertisedFloorBreach('I need a logo', 500).breached, false);
  });

  test('an on-request total cannot breach', () => {
    assert.equal(advertisedFloorBreach('listed at R2 500', null).breached, false);
  });
});

// ── 3. The CV gate ───────────────────────────────────────────────────────────

describe('looksLikeJobApplication', () => {
  // Must be caught: the attachment is never opened, so a CV never reaches the model.
  const applications: Array<[string, string[]]> = [
    ['Please find my CV attached, I am looking for work', ['CV.pdf']],
    ['Hi, applying for the junior designer position', ['Thabo_Resume.docx']],
    ['I would like to apply for a vacancy at your studio', ['doc.pdf']],
    ['Enquiring about an internship', ['portfolio.pdf']],
    ['Attached is my resume', ['file.pdf']],
    ['Do you have any vacancies?', ['a.pdf']],
    ['I am seeking employment as a designer', ['a.pdf']],
    ['Job application - graphic designer', ['a.pdf']],
    ['hello', ['john-cv.pdf']],
    ['hello', ['curriculum vitae.pdf']],
    ['hello', ['my_resume_2026.pdf']],
  ];
  for (const [body, files] of applications) {
    test(`treats as job application: ${body.slice(0, 40)} ${JSON.stringify(files)}`, () => {
      assert.equal(looksLikeJobApplication(body, files), true);
    });
  }

  // Must NOT be caught: a false positive means the brief goes unread, which is
  // how a job gets underquoted. These are the phrasings that nearly tripped it.
  const clients: Array<[string, string[]]> = [
    ['We need packaging for 3 rooibos flavours, brief attached', ['brief.pdf']],
    ['Please quote on the logo position and apply our brand colours', ['spec.docx']],
    ['Quote for annual report, 32 pages', ['report-draft.pdf']],
    ['Can you apply the new branding to these', ['artwork.ai']],
    ['Need a rate card designed', ['prices.xlsx']],
    ['Our CVS Pharmacy account needs signage', ['signage.pdf']],
    ['Recover our old logo files', ['recovery.pdf']],
    ['Vacancy signage for our shopfront', ['shop.pdf']],
    ['Branding for our internship programme', ['brief.pdf']],
    ['We need to apply for a trademark, design the mark', ['mark.pdf']],
  ];
  for (const [body, files] of clients) {
    test(`reads the attachment: ${body.slice(0, 40)}`, () => {
      assert.equal(looksLikeJobApplication(body, files), false);
    });
  }

  test('no attachments, no text — not an application', () => {
    assert.equal(looksLikeJobApplication('', []), false);
  });
});

// ── 4. Catalogue integrity ───────────────────────────────────────────────────
//
// The agent quotes by citing an id. An id that does not resolve is silently
// dropped and the total becomes "on request", so a typo here shows up as a
// mysteriously incomplete quote rather than an error.

describe('price catalogue', () => {
  test('every id is unique', () => {
    const ids = ALL_ITEMS.map((i) => i.id);
    const dupes = ids.filter((id, n) => ids.indexOf(id) !== n);
    assert.deepEqual(dupes, [], `duplicate price ids: ${dupes.join(', ')}`);
  });

  test('every id resolves through findPriceItem', () => {
    for (const item of ALL_ITEMS) {
      assert.equal(findPriceItem(item.id)?.id, item.id, `${item.id} does not resolve`);
    }
  });

  test('an unknown id resolves to undefined, never a guess', () => {
    assert.equal(findPriceItem('no-such-item'), undefined);
    assert.equal(findPriceItem(''), undefined);
  });

  test('every item has a name, a url and at least one inclusion', () => {
    for (const item of ALL_ITEMS) {
      assert.ok(item.name.trim(), `${item.id} has no name`);
      assert.ok(item.url.startsWith('/'), `${item.id} has a bad url: ${item.url}`);
      assert.ok(item.includes.length > 0, `${item.id} promises nothing`);
    }
  });

  test('amounts are either a positive number or null (quoted on request)', () => {
    for (const item of ALL_ITEMS) {
      if (item.amount === null) continue;
      assert.ok(
        Number.isFinite(item.amount) && item.amount > 0,
        `${item.id} has a nonsense amount: ${item.amount}`,
      );
    }
  });

  test('every unit is one the renderer knows how to format', () => {
    const known = new Set([
      'fixed', 'from', 'per-month', 'per-page', 'per-image', 'per-word', 'per-hour', 'per-minute', 'per-unit',
    ]);
    for (const item of ALL_ITEMS) {
      assert.ok(known.has(item.unit), `${item.id} has an unknown unit: ${item.unit}`);
    }
  });

  test('no priced item undercuts a single extra revision round', () => {
    // R520 buys one more round of changes. Anything cheaper than that for a
    // whole deliverable is a pricing error, except per-unit rates which are
    // multiplied by a quantity.
    const perUnit = new Set(['per-page', 'per-image', 'per-word', 'per-hour', 'per-minute', 'per-unit']);
    for (const item of ALL_ITEMS) {
      if (item.id === 'extra-revision' || item.amount === null || perUnit.has(item.unit)) continue;
      assert.ok(item.amount >= 520, `${item.id} is R${item.amount}, below the revision floor`);
    }
  });
});

// The agent may only quote from this catalogue, so any /pricing page that sells
// a service the catalogue does not carry is a service it cannot quote — the
// client reads a price on the site and gets "that needs a scoping call". These
// pages are the ones that advertise packages; each must be reachable from at
// least one price item.
describe('the catalogue covers what the site advertises', () => {
  const SELLING_PAGES = [
    'annual-report-design-and-print-pretoria', 'content-marketing-pretoria',
    'copy-editing-services-pretoria-johannesburg', 'copywriting-services-pretoria-johannesburg',
    'corporate-video-pretoria', 'custom-development-pretoria', 'drone-video-pretoria',
    'ecommerce-pretoria', 'email-marketing-pretoria', 'google-ads-pretoria',
    'graphic-design-pretoria', 'marketing-materials-pretoria', 'mobile-solutions-pretoria',
    'packaging-design-pretoria', 'photography-pretoria', 'print-design-pretoria',
    'product-photography-pretoria', 'seo-pretoria', 'social-media-pretoria',
    'transcription-services-pretoria-johannesburg', 'website-design-pretoria',
    'website-maintenance-pretoria',
  ];

  for (const page of SELLING_PAGES) {
    test(`/pricing/${page} has at least one price item`, () => {
      const url = `/pricing/${page}`;
      const hits = ALL_ITEMS.filter((i) => i.url === url);
      assert.ok(
        hits.length > 0,
        `nothing in the catalogue points at ${url}, so the agent cannot quote a service ` +
          'the site sells. Add the published tiers as price items.',
      );
    });
  }
});

// A share link is only useful if the record it points at is reachable. The
// acceptance flow mints the token and emails it, so anything between creating
// the invoice and building the URL that leaves it in 'draft' produces a 404 for
// a paying client — which is exactly what happened in production.
describe('the deposit invoice is issued before its link is emailed', () => {
  const autosend = fs.readFileSync(
    path.join(process.cwd(), 'src/lib/server/autosend.ts'),
    'utf8',
  );
  const documents = fs.readFileSync(
    path.join(process.cwd(), 'src/lib/server/documents.ts'),
    'utf8',
  );

  test('issueDepositDocument calls sendInvoice', () => {
    const fn = autosend.slice(autosend.indexOf('async function issueDepositDocument'));
    const body = fn.slice(0, fn.indexOf('\n}\n'));
    assert.match(
      body,
      /sendInvoice\(/,
      'the deposit invoice must be moved out of draft before its share link is sent, ' +
        'or documentByShareToken refuses it and the client gets a 404',
    );
  });

  test('sendInvoice runs before the share token is minted', () => {
    const fn = autosend.slice(autosend.indexOf('async function issueDepositDocument'));
    const body = fn.slice(0, fn.indexOf('\n}\n'));
    assert.ok(
      body.indexOf('sendInvoice(') < body.indexOf('ensureShareToken('),
      'order matters: issue the invoice, then build the link',
    );
  });

  test('draft and void documents are still unreachable by share token', () => {
    // The guard this bug exposed is correct and must stay.
    assert.match(documents, /status === 'draft'/);
    assert.match(documents, /status === 'void'/);
  });
});

// consumeLoginToken writes the session cookie, and Next only permits that from
// a Server Action or Route Handler. Calling it in a page body throws on every
// VALID link while an invalid one still redirects cleanly — so this breaks sign
// in completely and looks fine to any test that does not hold a real token.
describe('sign-in links redeem inside a server action', () => {
  for (const side of ['studio', 'portal']) {
    const file = path.join(process.cwd(), `src/app/${side}/login/verify/page.tsx`);
    const src = fs.readFileSync(file, 'utf8');

    test(`${side}: consumeLoginToken is not called in the page body`, () => {
      const component = src.slice(src.search(/export default async function/));
      assert.ok(
        !component.includes('consumeLoginToken('),
        `${side} verify redeems the token while rendering — createSession writes a cookie ` +
          'and Next throws "a server-side exception has occurred" on every valid link',
      );
    });

    test(`${side}: redemption happens in a 'use server' action`, () => {
      const action = src.slice(0, src.search(/export default async function/));
      assert.match(action, /'use server'/, `${side} verify needs a server action`);
      assert.match(action, /consumeLoginToken\(/, `${side} verify must redeem inside that action`);
    });
  }
});

// A project's milestones are the only thing the client portal has to show
// progress with. Seeding them from quote line items produced a single box that
// never moved, so the stages are now the studio's process.
describe('new projects open with real stages', () => {
  const crm = fs.readFileSync(path.join(process.cwd(), 'src/lib/server/crm.ts'), 'utf8');

  test('PROJECT_STAGES exists and covers the arc of a job', () => {
    assert.match(crm, /export const PROJECT_STAGES/);
    const block = crm.slice(crm.indexOf('export const PROJECT_STAGES'));
    const list = block.slice(0, block.indexOf('] as const'));
    for (const word of ['Deposit', 'Brief', 'concepts', 'Changes', 'artwork', 'Handover']) {
      assert.ok(
        new RegExp(word, 'i').test(list),
        `PROJECT_STAGES should still cover "${word}" — the portal's "Where we are" is built from these`,
      );
    }
  });

  test('projectFromQuote seeds the stages, not the quote line items', () => {
    const fn = crm.slice(crm.indexOf('export async function projectFromQuote'));
    const body = fn.slice(0, fn.indexOf('\n}\n'));
    assert.match(body, /PROJECT_STAGES\.map/, 'stages must be what gets seeded');
    assert.ok(
      !/items\.map\([^)]*\)\s*,?\s*\)\s*;?\s*\n\s*ensure\(seeded/.test(body),
      'line items must no longer be seeded as milestones — they duplicate the quote',
    );
  });
});

describe('annual report tiers', () => {
  // Additional pages are R250 while the packages work out far higher per page,
  // so the cheap per-page line can rebuild a job the packages already cover.
  // The guard is the note on annual-report-page telling the agent not to; this
  // test makes sure the note stays there if anyone edits the prices again.
  test('the additional-page line warns against rebuilding a package', () => {
    const page = findPriceItem('annual-report-page');
    assert.ok(page, 'annual-report-page is missing');
    assert.match(
      page!.notes ?? '',
      /ONLY for pages beyond the largest package/i,
      'annual-report-page must keep its steering note — without it the agent can quote ' +
        '24 pages plus extras instead of the larger package and undercut it',
    );
  });

  test('rebuilding the 25-48 package from extras is cheaper — so the note is load-bearing', () => {
    const base = findPriceItem('annual-report')!.amount!;
    const large = findPriceItem('annual-report-large')!.amount!;
    const perPage = findPriceItem('annual-report-page')!.amount!;
    const rebuilt = base + perPage * 24; // 24pp package + 24 more pages = 48pp
    // Documenting the hazard rather than asserting it away: if a future price
    // change makes the rebuild MORE expensive, the note stops being critical
    // and this test should be revisited rather than deleted.
    assert.ok(
      rebuilt < large,
      `rebuild (R${rebuilt}) is no longer cheaper than the package (R${large}) — ` +
        'the arbitrage is gone, revisit the note on annual-report-page',
    );
  });
});

describe('printSellPrice', () => {
  test('small runs take the minimum handling fee, not the percentage', () => {
    assert.equal(printSellPrice(400), 400 + PRINT_MIN_HANDLING);
  });

  test('large runs take the markup once it beats the minimum', () => {
    assert.equal(printSellPrice(10000), 14000);
  });

  test('never returns less than cost', () => {
    for (const cost of [0, 1, 100, 1000, 50000]) {
      assert.ok(printSellPrice(cost) >= cost, `sell price below cost at ${cost}`);
    }
  });
});
