'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BTN, BTN_GHOST, INPUT, LABEL } from '@/components/crm/ui';

/**
 * The one contact form.
 *
 * It renders in two places — inline in the Details section of a contact record,
 * and on its own page at /new and /edit — because an edit made on a phone and an
 * edit made at the desk must not be two forms that drift apart. Everything goes
 * through /api/crm, which is where the admin session is checked; this component
 * never touches the database.
 */

export type CompanyOption = { id: string; name: string };

export type ContactFormValues = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  job_title: string;
  company_id: string;
  marketing_consent: boolean;
  notes: string;
};

export const BLANK_CONTACT: ContactFormValues = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  job_title: '',
  company_id: '',
  marketing_consent: false,
  notes: '',
};

/** Sentinel for the "type a new company" option — no company id can collide with it. */
const NEW_COMPANY = '__new__';

/** A blank field means "nothing on file", which the column stores as null, not "". */
function orNull(value: string): string | null {
  const trimmed = value.trim();
  return trimmed === '' ? null : trimmed;
}

function idFromResponse(json: Record<string, unknown>): string | null {
  const contact = json.contact as { id?: unknown } | undefined;
  if (contact && typeof contact.id === 'string') return contact.id;
  return typeof json.id === 'string' ? json.id : null;
}

export default function ContactForm({
  mode,
  companies,
  contactId,
  initial,
  cancelHref,
  doneHref,
  submitLabel,
}: {
  mode: 'create' | 'edit';
  companies: CompanyOption[];
  /** Required when editing — the record being patched. */
  contactId?: string;
  initial?: ContactFormValues;
  cancelHref?: string;
  /** Where to go after a successful save. Omitted on an inline edit, which stays put. */
  doneHref?: string;
  submitLabel?: string;
}) {
  const router = useRouter();
  const [values, setValues] = useState<ContactFormValues>(initial ?? BLANK_CONTACT);
  const [companyChoice, setCompanyChoice] = useState<string>(initial?.company_id ?? '');
  const [newCompanyName, setNewCompanyName] = useState('');
  const [state, setState] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [error, setError] = useState<string | null>(null);

  function patch(next: Partial<ContactFormValues>) {
    setValues((current) => ({ ...current, ...next }));
    // Any keystroke means the last save is no longer what is on screen.
    setState('idle');
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (state === 'saving') return;

    if (companyChoice === NEW_COMPANY && !newCompanyName.trim()) {
      setError('Give the new company a name, or pick one from the list.');
      return;
    }

    setState('saving');
    setError(null);

    try {
      const res = await fetch('/api/crm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: mode === 'create' ? 'create-contact' : 'update-contact',
          ...(mode === 'edit' ? { id: contactId } : null),
          first_name: values.first_name.trim(),
          last_name: orNull(values.last_name),
          email: values.email.trim().toLowerCase(),
          phone: orNull(values.phone),
          job_title: orNull(values.job_title),
          // At most one of these is ever set: an existing company, or a name to
          // find-or-create. Both null means the person is not tied to a business.
          company_id: companyChoice === NEW_COMPANY || companyChoice === '' ? null : companyChoice,
          company_name: companyChoice === NEW_COMPANY ? newCompanyName.trim() : null,
          marketing_consent: values.marketing_consent,
          notes: orNull(values.notes),
        }),
      });

      const json = (await res.json().catch(() => ({}))) as Record<string, unknown>;

      if (!res.ok) {
        setState('idle');
        setError(
          typeof json.error === 'string'
            ? json.error
            : 'The contact could not be saved. Please try again.',
        );
        return;
      }

      if (mode === 'create') {
        const id = idFromResponse(json);
        router.push(id ? `/studio/contacts/${id}` : '/studio/contacts');
        router.refresh();
        return;
      }

      setState('saved');
      // The record page reads on the server, so the refresh is what moves the
      // change into the header, the timeline and the list behind it.
      router.refresh();
      if (doneHref) router.push(doneHref);
    } catch {
      setState('idle');
      setError('No connection to the studio. Check your network and try again.');
    }
  }

  const saving = state === 'saving';

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="first_name" className={LABEL}>
            First name
          </label>
          <input
            id="first_name"
            name="first_name"
            required
            autoComplete="given-name"
            value={values.first_name}
            onChange={(e) => patch({ first_name: e.target.value })}
            className={INPUT}
          />
        </div>

        <div>
          <label htmlFor="last_name" className={LABEL}>
            Last name
          </label>
          <input
            id="last_name"
            name="last_name"
            autoComplete="family-name"
            value={values.last_name}
            onChange={(e) => patch({ last_name: e.target.value })}
            className={INPUT}
          />
        </div>

        <div>
          <label htmlFor="email" className={LABEL}>
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={values.email}
            onChange={(e) => patch({ email: e.target.value })}
            className={INPUT}
          />
          <p className="mt-1.5 text-xs text-neutral-500">
            One contact per address — it is how their portal sign-in and their replies find this
            record.
          </p>
        </div>

        <div>
          <label htmlFor="phone" className={LABEL}>
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+27 82 000 0000"
            value={values.phone}
            onChange={(e) => patch({ phone: e.target.value })}
            className={INPUT}
          />
        </div>

        <div>
          <label htmlFor="job_title" className={LABEL}>
            Job title
          </label>
          <input
            id="job_title"
            name="job_title"
            autoComplete="organization-title"
            value={values.job_title}
            onChange={(e) => patch({ job_title: e.target.value })}
            className={INPUT}
          />
        </div>

        <div>
          <label htmlFor="company_id" className={LABEL}>
            Company
          </label>
          <select
            id="company_id"
            name="company_id"
            value={companyChoice}
            onChange={(e) => {
              setCompanyChoice(e.target.value);
              setState('idle');
            }}
            className={INPUT}
          >
            <option value="">No company</option>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
            <option value={NEW_COMPANY}>Add a new company…</option>
          </select>

          {companyChoice === NEW_COMPANY && (
            <input
              aria-label="New company name"
              placeholder="Company name"
              value={newCompanyName}
              onChange={(e) => setNewCompanyName(e.target.value)}
              className={`${INPUT} mt-2`}
            />
          )}
        </div>
      </div>

      {/* POPIA: consent to marketing is a different thing from doing business
          together, so the label has to say what it actually permits. */}
      <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={values.marketing_consent}
            onChange={(e) => patch({ marketing_consent: e.target.checked })}
            className="mt-0.5 h-4 w-4 shrink-0 accent-[#FFD700]"
          />
          <span>
            <span className="block text-sm font-medium text-white">
              This person has agreed to receive marketing from WL CreationX
            </span>
            <span className="mt-1 block text-xs leading-relaxed text-neutral-400">
              Tick this only if they actually said yes. Under POPIA it is separate from working
              together: quotes, invoices and project updates go out either way. The date the
              consent was given is recorded, and unticking the box withdraws it.
            </span>
          </span>
        </label>
      </div>

      <div>
        <label htmlFor="contact-notes" className={LABEL}>
          Notes
        </label>
        <textarea
          id="contact-notes"
          name="notes"
          rows={4}
          value={values.notes}
          onChange={(e) => patch({ notes: e.target.value })}
          placeholder="Anything worth remembering about this person."
          className={INPUT}
        />
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-300">
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" disabled={saving} className={BTN}>
          {saving
            ? 'Saving…'
            : (submitLabel ?? (mode === 'create' ? 'Create contact' : 'Save changes'))}
        </button>

        {cancelHref && (
          <Link href={cancelHref} className={BTN_GHOST}>
            Cancel
          </Link>
        )}

        {state === 'saved' && <span className="text-sm text-emerald-300">Saved.</span>}
      </div>
    </form>
  );
}
