'use client';

import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { BTN, BTN_GHOST, CARD, INPUT, LABEL } from '@/components/crm/ui';
import { DEAL_STAGES, type DealStage } from '@/lib/crm/types';
import { postCrm } from '../crm-post';

export type ContactOption = { id: string; label: string; companyId: string | null };
export type CompanyOption = { id: string; name: string };

type CreateResponse = { deal?: { id: string } };

/** The ways work actually arrives here — free text, but these cover most of it. */
const SOURCES = [
  'Website enquiry',
  'Referral',
  'Instagram',
  'Facebook',
  'Google',
  'Walk-in',
  'Repeat client',
  'Cold outreach',
];

export default function DealForm({
  contacts,
  companies,
  initial,
}: {
  contacts: ContactOption[];
  companies: CompanyOption[];
  initial: { title: string; contactId: string; companyId: string; source: string };
}) {
  const router = useRouter();

  const [title, setTitle] = useState(initial.title);
  const [companyId, setCompanyId] = useState(initial.companyId);
  const [contactId, setContactId] = useState(initial.contactId);
  const [stage, setStage] = useState<DealStage>('new');
  const [value, setValue] = useState('');
  const [source, setSource] = useState(initial.source);
  const [expectedClose, setExpectedClose] = useState('');
  const [notes, setNotes] = useState('');

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Once a company is chosen, only its people are plausible. Contacts with no
  // company stay listed either way — sole traders are most of this book.
  const visibleContacts = companyId
    ? contacts.filter((c) => c.companyId === companyId || c.companyId === null)
    : contacts;

  function onContactChange(next: string) {
    setContactId(next);
    // Picking a person who belongs somewhere fills the company in, because
    // billing follows the company and forgetting it here is easy.
    const contact = contacts.find((c) => c.id === next);
    if (contact?.companyId && !companyId) setCompanyId(contact.companyId);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving) return;

    const trimmed = title.trim();
    if (!trimmed) {
      setError('Give the deal a title so it can be recognised on the board.');
      return;
    }

    let parsedValue: number | null = null;
    if (value.trim()) {
      const n = Number(value.replace(/[\s,]/g, ''));
      if (!Number.isFinite(n) || n < 0) {
        setError('The value must be a number in Rand, or left blank.');
        return;
      }
      parsedValue = n;
    }

    setSaving(true);
    setError(null);

    const result = await postCrm<CreateResponse>({
      action: 'create-deal',
      title: trimmed,
      contactId: contactId || null,
      companyId: companyId || null,
      stage,
      value: parsedValue,
      source: source.trim() || null,
      expectedCloseDate: expectedClose || null,
      notes: notes.trim() || null,
    });

    if (!result.ok) {
      setSaving(false);
      setError(result.error);
      return;
    }

    const id = result.data.deal?.id;
    // Stay on saving through the navigation — re-enabling the button here just
    // invites a second deal from an impatient second click.
    router.push(id ? `/studio/deals/${id}` : '/studio/deals');
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className={`${CARD} space-y-5`}>
      {error && (
        <p
          role="alert"
          className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-sm text-red-300"
        >
          {error}
        </p>
      )}

      <div>
        <label className={LABEL} htmlFor="deal-title">
          Title
        </label>
        <input
          id="deal-title"
          className={INPUT}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Brand identity for Kgosi Attorneys"
          required
          autoFocus
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={LABEL} htmlFor="deal-company">
            Company
          </label>
          <select
            id="deal-company"
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
          <label className={LABEL} htmlFor="deal-contact">
            Contact
          </label>
          <select
            id="deal-contact"
            className={INPUT}
            value={contactId}
            onChange={(event) => onContactChange(event.target.value)}
          >
            <option value="">No contact</option>
            {visibleContacts.map((contact) => (
              <option key={contact.id} value={contact.id}>
                {contact.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={LABEL} htmlFor="deal-stage">
            Stage
          </label>
          <select
            id="deal-stage"
            className={INPUT}
            value={stage}
            onChange={(event) => setStage(event.target.value as DealStage)}
          >
            {DEAL_STAGES.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={LABEL} htmlFor="deal-value">
            Value (Rand, excl. VAT)
          </label>
          <input
            id="deal-value"
            className={INPUT}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            inputMode="decimal"
            placeholder="18500"
          />
          <p className="mt-1 text-xs text-neutral-500">
            Leave blank until there is a number worth forecasting.
          </p>
        </div>

        <div>
          <label className={LABEL} htmlFor="deal-source">
            Source
          </label>
          <input
            id="deal-source"
            className={INPUT}
            value={source}
            onChange={(event) => setSource(event.target.value)}
            list="deal-sources"
            placeholder="Website enquiry"
          />
          <datalist id="deal-sources">
            {SOURCES.map((option) => (
              <option key={option} value={option} />
            ))}
          </datalist>
        </div>

        <div>
          <label className={LABEL} htmlFor="deal-close">
            Expected close
          </label>
          <input
            id="deal-close"
            className={INPUT}
            type="date"
            value={expectedClose}
            onChange={(event) => setExpectedClose(event.target.value)}
          />
        </div>
      </div>

      <div>
        <label className={LABEL} htmlFor="deal-notes">
          Notes
        </label>
        <textarea
          id="deal-notes"
          className={`${INPUT} min-h-24 resize-y`}
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="What they asked for, what was promised, anything to remember."
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <button type="submit" className={BTN} disabled={saving}>
          {saving ? 'Creating…' : 'Create deal'}
        </button>
        <button
          type="button"
          className={BTN_GHOST}
          disabled={saving}
          onClick={() => router.push('/studio/deals')}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
