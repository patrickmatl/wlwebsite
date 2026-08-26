'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BTN, BTN_GHOST, INPUT, LABEL } from '@/components/crm/ui';

/**
 * The one company form — inline on the record, and on its own page at /new and
 * /edit. Writes go through /api/crm, where the admin session is checked.
 */

export type CompanyFormValues = {
  name: string;
  trading_name: string;
  registration_number: string;
  vat_number: string;
  industry: string;
  website: string;
  email: string;
  phone: string;
  address_line1: string;
  suburb: string;
  city: string;
  province: string;
  postal_code: string;
  country: string;
  notes: string;
};

export const BLANK_COMPANY: CompanyFormValues = {
  name: '',
  trading_name: '',
  registration_number: '',
  vat_number: '',
  industry: '',
  website: '',
  email: '',
  phone: '',
  address_line1: '',
  suburb: '',
  city: '',
  province: '',
  postal_code: '',
  country: 'South Africa',
  notes: '',
};

const PROVINCES = [
  'Eastern Cape',
  'Free State',
  'Gauteng',
  'KwaZulu-Natal',
  'Limpopo',
  'Mpumalanga',
  'North West',
  'Northern Cape',
  'Western Cape',
];

function orNull(value: string): string | null {
  const trimmed = value.trim();
  return trimmed === '' ? null : trimmed;
}

function idFromResponse(json: Record<string, unknown>): string | null {
  const company = json.company as { id?: unknown } | undefined;
  if (company && typeof company.id === 'string') return company.id;
  return typeof json.id === 'string' ? json.id : null;
}

function Field({
  id,
  label,
  value,
  onChange,
  type = 'text',
  required = false,
  placeholder,
  hint,
  list,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (next: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  hint?: string;
  list?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className={LABEL}>
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder={placeholder}
        list={list}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={INPUT}
      />
      {hint && <p className="mt-1.5 text-xs text-neutral-500">{hint}</p>}
    </div>
  );
}

export default function CompanyForm({
  mode,
  companyId,
  initial,
  cancelHref,
  doneHref,
  submitLabel,
}: {
  mode: 'create' | 'edit';
  /** Required when editing — the record being patched. */
  companyId?: string;
  initial?: CompanyFormValues;
  cancelHref?: string;
  /** Where to go after a successful save. Omitted on an inline edit, which stays put. */
  doneHref?: string;
  submitLabel?: string;
}) {
  const router = useRouter();
  const [values, setValues] = useState<CompanyFormValues>(initial ?? BLANK_COMPANY);
  const [state, setState] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [error, setError] = useState<string | null>(null);

  function patch(next: Partial<CompanyFormValues>) {
    setValues((current) => ({ ...current, ...next }));
    // Any keystroke means the last save is no longer what is on screen.
    setState('idle');
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (state === 'saving') return;

    setState('saving');
    setError(null);

    try {
      const res = await fetch('/api/crm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: mode === 'create' ? 'create-company' : 'update-company',
          ...(mode === 'edit' ? { id: companyId } : null),
          name: values.name.trim(),
          trading_name: orNull(values.trading_name),
          registration_number: orNull(values.registration_number),
          vat_number: orNull(values.vat_number),
          industry: orNull(values.industry),
          website: orNull(values.website),
          email: orNull(values.email)?.toLowerCase() ?? null,
          phone: orNull(values.phone),
          address_line1: orNull(values.address_line1),
          suburb: orNull(values.suburb),
          city: orNull(values.city),
          province: orNull(values.province),
          postal_code: orNull(values.postal_code),
          // country is NOT NULL in the schema, so it falls back rather than
          // being sent as null when the field is cleared.
          country: values.country.trim() || 'South Africa',
          notes: orNull(values.notes),
        }),
      });

      const json = (await res.json().catch(() => ({}))) as Record<string, unknown>;

      if (!res.ok) {
        setState('idle');
        setError(
          typeof json.error === 'string'
            ? json.error
            : 'The company could not be saved. Please try again.',
        );
        return;
      }

      if (mode === 'create') {
        const id = idFromResponse(json);
        router.push(id ? `/studio/companies/${id}` : '/studio/companies');
        router.refresh();
        return;
      }

      setState('saved');
      router.refresh();
      if (doneHref) router.push(doneHref);
    } catch {
      setState('idle');
      setError('No connection to the studio. Check your network and try again.');
    }
  }

  const saving = state === 'saving';

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          id="name"
          label="Registered name"
          required
          value={values.name}
          onChange={(v) => patch({ name: v })}
        />
        <Field
          id="trading_name"
          label="Trading as"
          hint="Only if it differs from the registered name."
          value={values.trading_name}
          onChange={(v) => patch({ trading_name: v })}
        />
        <Field
          id="industry"
          label="Industry"
          value={values.industry}
          onChange={(v) => patch({ industry: v })}
        />
        <Field
          id="website"
          label="Website"
          type="url"
          placeholder="https://"
          autoComplete="url"
          value={values.website}
          onChange={(v) => patch({ website: v })}
        />
        <Field
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(v) => patch({ email: v })}
        />
        <Field
          id="phone"
          label="Phone"
          type="tel"
          autoComplete="tel"
          placeholder="+27 12 000 0000"
          value={values.phone}
          onChange={(v) => patch({ phone: v })}
        />
      </div>

      <fieldset>
        <legend className="mb-3 font-syne text-sm font-bold text-white">Billing details</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            id="registration_number"
            label="Company registration number"
            placeholder="2019/123456/07"
            value={values.registration_number}
            onChange={(v) => patch({ registration_number: v })}
          />
          <Field
            id="vat_number"
            label="VAT number"
            placeholder="4123456789"
            hint="Goes on their invoices when they are VAT registered."
            value={values.vat_number}
            onChange={(v) => patch({ vat_number: v })}
          />
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 font-syne text-sm font-bold text-white">Address</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            id="address_line1"
            label="Street address"
            autoComplete="address-line1"
            value={values.address_line1}
            onChange={(v) => patch({ address_line1: v })}
          />
          <Field
            id="suburb"
            label="Suburb"
            autoComplete="address-line2"
            value={values.suburb}
            onChange={(v) => patch({ suburb: v })}
          />
          <Field
            id="city"
            label="City"
            autoComplete="address-level2"
            value={values.city}
            onChange={(v) => patch({ city: v })}
          />
          <Field
            id="province"
            label="Province"
            list="sa-provinces"
            autoComplete="address-level1"
            value={values.province}
            onChange={(v) => patch({ province: v })}
          />
          <Field
            id="postal_code"
            label="Postal code"
            autoComplete="postal-code"
            value={values.postal_code}
            onChange={(v) => patch({ postal_code: v })}
          />
          <Field
            id="country"
            label="Country"
            autoComplete="country-name"
            value={values.country}
            onChange={(v) => patch({ country: v })}
          />
        </div>
        <datalist id="sa-provinces">
          {PROVINCES.map((province) => (
            <option key={province} value={province} />
          ))}
        </datalist>
      </fieldset>

      <div>
        <label htmlFor="company-notes" className={LABEL}>
          Notes
        </label>
        <textarea
          id="company-notes"
          name="notes"
          rows={4}
          value={values.notes}
          onChange={(e) => patch({ notes: e.target.value })}
          placeholder="How they like to work, who signs off, anything worth remembering."
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
            : (submitLabel ?? (mode === 'create' ? 'Create company' : 'Save changes'))}
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
