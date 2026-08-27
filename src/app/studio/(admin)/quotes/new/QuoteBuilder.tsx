'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState, type FormEvent } from 'react';
import { BTN, BTN_GHOST, CARD, INPUT, LABEL } from '@/components/crm/ui';
import { computeTotals, formatRand, round2 } from '@/lib/crm/types';
import { ALL_ITEMS, PRICING, formatPrice, type PriceItem, type PriceUnit } from '@/data/pricing';
import { postCrm } from '../../deals/crm-post';

/**
 * Building a quote from the price list.
 *
 * Prices are only ever picked from src/data/pricing.ts, never typed from
 * memory — that file is the single source of truth the whole business quotes
 * from. A line can still be overridden here, but it starts from the list.
 *
 * "On request" is a first-class state, not a zero. An item with no published
 * price (amount === null) is added with a blank unit price, and while any such
 * line is on the quote the total is presented as incomplete rather than as a
 * number that quietly leaves that work out.
 */

export type ContactOption = { id: string; label: string; companyId: string | null };
export type CompanyOption = { id: string; name: string };

type CreateResponse = { quote?: { id: string } };

type Line = {
  /** Local only — quote_items get their real ids from the database. */
  key: string;
  priceItemId: string | null;
  name: string;
  description: string;
  /** Kept as text so the field can be emptied mid-edit without snapping to 1. */
  quantity: string;
  /** Blank means quoted on request. */
  unitPrice: string;
  unit: PriceUnit | null;
};

/** Categories for the picker, with anything outside them gathered as extras. */
const CATALOGUE: { name: string; items: PriceItem[] }[] = [
  ...PRICING.map((category) => ({ name: category.name, items: category.items })),
  {
    name: 'Extras',
    items: ALL_ITEMS.filter(
      (item) => !PRICING.some((category) => category.items.some((i) => i.id === item.id)),
    ),
  },
].filter((group) => group.items.length > 0);

function unitHint(unit: PriceUnit | null): string {
  switch (unit) {
    case 'per-month':
      return 'months';
    case 'per-page':
      return 'pages';
    case 'per-image':
      return 'images';
    case 'per-word':
      return 'words';
    case 'per-hour':
      return 'hours';
    default:
      return 'qty';
  }
}

function parseQuantity(raw: string): { value: number; invalid: boolean } {
  const text = raw.trim();
  if (!text) return { value: 1, invalid: false };
  const n = Number(text.replace(/[\s,]/g, ''));
  if (!Number.isFinite(n) || n <= 0) return { value: 1, invalid: true };
  return { value: n, invalid: false };
}

/** Blank is a real answer here: it means the line is quoted on request. */
function parseMoney(raw: string): { value: number | null; invalid: boolean } {
  const text = raw.trim();
  if (!text) return { value: null, invalid: false };
  const n = Number(text.replace(/[\sR,]/gi, ''));
  if (!Number.isFinite(n) || n < 0) return { value: null, invalid: true };
  return { value: round2(n), invalid: false };
}

let keySeed = 0;
function nextKey(): string {
  keySeed += 1;
  return `line-${keySeed}`;
}

export default function QuoteBuilder({
  contacts,
  companies,
  vatRate,
  vatRegistered,
  defaultValidUntil,
  initial,
}: {
  contacts: ContactOption[];
  companies: CompanyOption[];
  /** Already resolved through effectiveVatRate() on the server — 0 when unregistered. */
  vatRate: number;
  vatRegistered: boolean;
  defaultValidUntil: string;
  initial: { dealId: string; contactId: string; companyId: string };
}) {
  const router = useRouter();

  const [contactId, setContactId] = useState(initial.contactId);
  const [companyId, setCompanyId] = useState(initial.companyId);
  const [lines, setLines] = useState<Line[]>([]);
  const [picked, setPicked] = useState('');
  const [intro, setIntro] = useState('');
  const [terms, setTerms] = useState('');
  const [validUntil, setValidUntil] = useState(defaultValidUntil);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const visibleContacts = companyId
    ? contacts.filter((c) => c.companyId === companyId || c.companyId === null)
    : contacts;

  const parsed = useMemo(
    () =>
      lines.map((line) => {
        const quantity = parseQuantity(line.quantity);
        const price = parseMoney(line.unitPrice);
        return {
          quantity: quantity.value,
          unit_price: price.value,
          lineTotal: price.value === null ? null : round2(price.value * quantity.value),
          invalid: quantity.invalid || price.invalid,
        };
      }),
    [lines],
  );

  const totals = useMemo(
    () =>
      computeTotals(
        parsed.map((p) => ({ quantity: p.quantity, unit_price: p.unit_price })),
        vatRate,
      ),
    [parsed, vatRate],
  );

  const hasInvalid = parsed.some((p) => p.invalid);
  const missingName = lines.some((line) => !line.name.trim());

  function addFromCatalogue(itemId: string) {
    const item = ALL_ITEMS.find((i) => i.id === itemId);
    if (!item) return;

    setLines((current) => [
      ...current,
      {
        key: nextKey(),
        priceItemId: item.id,
        name: item.name,
        // What the client actually receives reads better on a quote than a bare
        // item name, and it is editable from here.
        description: item.includes.join(' · '),
        quantity: '1',
        unitPrice: item.amount === null ? '' : String(item.amount),
        unit: item.unit,
      },
    ]);
    setPicked('');
  }

  function addCustomLine() {
    setLines((current) => [
      ...current,
      {
        key: nextKey(),
        priceItemId: null,
        name: '',
        description: '',
        quantity: '1',
        unitPrice: '',
        unit: null,
      },
    ]);
  }

  function patchLine(key: string, patch: Partial<Line>) {
    setLines((current) => current.map((line) => (line.key === key ? { ...line, ...patch } : line)));
  }

  function removeLine(key: string) {
    setLines((current) => current.filter((line) => line.key !== key));
  }

  function moveLine(index: number, direction: -1 | 1) {
    const target = index + direction;
    setLines((current) => {
      if (target < 0 || target >= current.length) return current;
      const next = [...current];
      const [moved] = next.splice(index, 1);
      next.splice(target, 0, moved);
      return next;
    });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving) return;

    if (lines.length === 0) {
      setError('A quote needs at least one line.');
      return;
    }
    if (missingName) {
      setError('Every line needs a name — that is what the client reads.');
      return;
    }
    if (hasInvalid) {
      setError('Check the quantities and prices: one of them is not a number.');
      return;
    }
    if (!contactId && !companyId) {
      setError('Pick the contact or the company this quote is for.');
      return;
    }

    setSaving(true);
    setError(null);

    const result = await postCrm<CreateResponse>({
      action: 'create-quote',
      dealId: initial.dealId || null,
      contactId: contactId || null,
      companyId: companyId || null,
      intro: intro.trim() || null,
      terms: terms.trim() || null,
      validUntil: validUntil || null,
      items: lines.map((line, index) => ({
        price_item_id: line.priceItemId,
        name: line.name.trim(),
        description: line.description.trim() || null,
        quantity: parsed[index].quantity,
        unit_price: parsed[index].unit_price,
      })),
    });

    if (!result.ok) {
      setSaving(false);
      setError(result.error);
      return;
    }

    const id = result.data.quote?.id;
    // Left saving through the navigation: a second click here burns a second
    // quote number.
    router.push(id ? `/studio/quotes/${id}` : '/studio/quotes');
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        {error && (
          <p
            role="alert"
            className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-sm text-red-300"
          >
            {error}
          </p>
        )}

        {/* ── Who it is for ─────────────────────────────────────────────── */}
        <div className={CARD}>
          <h2 className="mb-4 font-syne text-lg font-bold text-white">Client</h2>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={LABEL} htmlFor="quote-company">
                Company
              </label>
              <select
                id="quote-company"
                className={INPUT}
                value={companyId}
                onChange={(event) => setCompanyId(event.target.value)}
              >
                <option value="">No company</option>
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={LABEL} htmlFor="quote-contact">
                Contact
              </label>
              <select
                id="quote-contact"
                className={INPUT}
                value={contactId}
                onChange={(event) => {
                  const next = event.target.value;
                  setContactId(next);
                  const contact = contacts.find((c) => c.id === next);
                  if (contact?.companyId && !companyId) setCompanyId(contact.companyId);
                }}
              >
                <option value="">No contact</option>
                {visibleContacts.map((contact) => (
                  <option key={contact.id} value={contact.id}>
                    {contact.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {initial.dealId && (
            <p className="mt-4 text-xs text-neutral-500">
              This quote will be attached to the deal it was started from.
            </p>
          )}
        </div>

        {/* ── The lines ─────────────────────────────────────────────────── */}
        <div className={CARD}>
          <h2 className="mb-4 font-syne text-lg font-bold text-white">Line items</h2>

          <div className="mb-5 flex flex-wrap items-end gap-3">
            <div className="min-w-0 flex-1">
              <label className={LABEL} htmlFor="quote-picker">
                Add from the price list
              </label>
              <select
                id="quote-picker"
                className={INPUT}
                value={picked}
                onChange={(event) => {
                  setPicked(event.target.value);
                  if (event.target.value) addFromCatalogue(event.target.value);
                }}
              >
                <option value="">Choose an item…</option>
                {CATALOGUE.map((group) => (
                  <optgroup key={group.name} label={group.name}>
                    {group.items.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name} — {formatPrice(item)}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
            <button type="button" className={BTN_GHOST} onClick={addCustomLine}>
              Custom line
            </button>
          </div>

          {lines.length === 0 ? (
            <p className="rounded-lg border border-dashed border-white/15 px-4 py-10 text-center text-sm text-neutral-500">
              Nothing on the quote yet. Pick something from the price list above.
            </p>
          ) : (
            <ul className="space-y-4">
              {lines.map((line, index) => {
                const state = parsed[index];
                const onRequest = state.unit_price === null && !state.invalid;

                return (
                  <li
                    key={line.key}
                    className="rounded-lg border border-white/10 bg-black/30 p-4"
                  >
                    <div className="flex items-start gap-2">
                      <div className="min-w-0 flex-1">
                        <label className="sr-only" htmlFor={`${line.key}-name`}>
                          Item name
                        </label>
                        <input
                          id={`${line.key}-name`}
                          className={INPUT}
                          value={line.name}
                          onChange={(event) => patchLine(line.key, { name: event.target.value })}
                          placeholder="What the client is buying"
                        />
                      </div>

                      <div className="flex shrink-0 gap-1">
                        <button
                          type="button"
                          aria-label="Move up"
                          disabled={index === 0}
                          onClick={() => moveLine(index, -1)}
                          className="rounded-md border border-white/15 px-2 py-2 text-xs text-neutral-400 transition hover:text-white disabled:opacity-30"
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          aria-label="Move down"
                          disabled={index === lines.length - 1}
                          onClick={() => moveLine(index, 1)}
                          className="rounded-md border border-white/15 px-2 py-2 text-xs text-neutral-400 transition hover:text-white disabled:opacity-30"
                        >
                          ↓
                        </button>
                        <button
                          type="button"
                          aria-label={`Remove ${line.name || 'this line'}`}
                          onClick={() => removeLine(line.key)}
                          className="rounded-md border border-red-500/40 px-2 py-2 text-xs text-red-300 transition hover:bg-red-500/10"
                        >
                          ✕
                        </button>
                      </div>
                    </div>

                    <label className="sr-only" htmlFor={`${line.key}-description`}>
                      Description
                    </label>
                    <textarea
                      id={`${line.key}-description`}
                      className={`${INPUT} mt-2 min-h-16 resize-y text-xs`}
                      value={line.description}
                      onChange={(event) =>
                        patchLine(line.key, { description: event.target.value })
                      }
                      placeholder="What is included — edit this to suit the job."
                    />

                    <div className="mt-3 grid gap-3 sm:grid-cols-3">
                      <div>
                        <label className={LABEL} htmlFor={`${line.key}-qty`}>
                          {unitHint(line.unit)}
                        </label>
                        <input
                          id={`${line.key}-qty`}
                          className={INPUT}
                          value={line.quantity}
                          inputMode="decimal"
                          onChange={(event) =>
                            patchLine(line.key, { quantity: event.target.value })
                          }
                        />
                      </div>

                      <div>
                        <label className={LABEL} htmlFor={`${line.key}-price`}>
                          Unit price
                        </label>
                        <input
                          id={`${line.key}-price`}
                          className={INPUT}
                          value={line.unitPrice}
                          inputMode="decimal"
                          placeholder="On request"
                          onChange={(event) =>
                            patchLine(line.key, { unitPrice: event.target.value })
                          }
                        />
                      </div>

                      <div>
                        <span className={LABEL}>Line total</span>
                        <p
                          className={`px-1 py-2 text-sm tabular-nums ${
                            onRequest ? 'text-[#FFD700]' : 'text-neutral-200'
                          }`}
                        >
                          {state.invalid
                            ? 'Not a number'
                            : onRequest
                              ? 'Quoted on request'
                              : formatRand(state.lineTotal)}
                        </p>
                      </div>
                    </div>

                    {onRequest && (
                      <p className="mt-1 text-xs text-neutral-500">
                        Leave the price blank to quote this on request, or fill it in once the job
                        has been scoped.
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* ── Wording ───────────────────────────────────────────────────── */}
        <div className={CARD}>
          <h2 className="mb-4 font-syne text-lg font-bold text-white">Wording</h2>

          <div className="space-y-5">
            <div>
              <label className={LABEL} htmlFor="quote-intro">
                Intro
              </label>
              <textarea
                id="quote-intro"
                className={`${INPUT} min-h-20 resize-y`}
                value={intro}
                onChange={(event) => setIntro(event.target.value)}
                placeholder="Thanks for the brief — here is what the work involves and what it costs."
              />
            </div>

            <div>
              <label className={LABEL} htmlFor="quote-terms">
                Terms
              </label>
              <textarea
                id="quote-terms"
                className={`${INPUT} min-h-20 resize-y`}
                value={terms}
                onChange={(event) => setTerms(event.target.value)}
                placeholder="Deposit to begin, balance on handover. Two rounds of changes included."
              />
            </div>

            <div className="sm:max-w-xs">
              <label className={LABEL} htmlFor="quote-valid">
                Valid until
              </label>
              <input
                id="quote-valid"
                type="date"
                className={INPUT}
                value={validUntil}
                onChange={(event) => setValidUntil(event.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Running total ───────────────────────────────────────────────── */}
      <div className="lg:col-span-1">
        <div className={`${CARD} lg:sticky lg:top-6`}>
          <h2 className="mb-4 font-syne text-lg font-bold text-white">Total</h2>

          <div className="space-y-2">
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-sm text-neutral-400">Subtotal</span>
              <span className="text-sm tabular-nums text-neutral-200">
                {formatRand(totals.subtotal)}
              </span>
            </div>

            {vatRegistered && (
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-sm text-neutral-400">VAT at {vatRate}%</span>
                <span className="text-sm tabular-nums text-neutral-200">
                  {formatRand(totals.vatAmount)}
                </span>
              </div>
            )}

            <div className="flex items-baseline justify-between gap-4 border-t border-white/10 pt-2.5">
              <span className="text-sm font-medium text-white">
                {totals.hasOnRequest ? 'Priced so far' : 'Total'}
              </span>
              <span className="font-syne text-xl font-bold text-[#FFD700]">
                {formatRand(totals.total)}
              </span>
            </div>
          </div>

          {totals.hasOnRequest && (
            <p className="mt-3 rounded-lg border border-[#FFD700]/30 bg-[#FFD700]/[0.06] px-3 py-2 text-xs text-[#FFD700]">
              Incomplete — some lines are quoted on request and carry no value into this figure.
            </p>
          )}

          {!vatRegistered && (
            <p className="mt-3 text-xs text-neutral-500">
              Not VAT registered, so no VAT is added.
            </p>
          )}

          <p className="mt-3 text-xs text-neutral-500">
            {lines.length} line{lines.length === 1 ? '' : 's'} · saved as a draft, not sent.
          </p>

          <div className="mt-4 space-y-3">
            <button type="submit" className={`${BTN} w-full`} disabled={saving}>
              {saving ? 'Creating…' : 'Create quote'}
            </button>
            <button
              type="button"
              className={`${BTN_GHOST} w-full`}
              disabled={saving}
              onClick={() => router.back()}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
