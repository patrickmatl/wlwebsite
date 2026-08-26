'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BTN, Card, INPUT, LABEL, formatDate } from '@/components/crm/ui';
import { BUSINESS } from '@/data/business';
import { postPortal } from '../../portal-post';

type ContactDetails = {
  first_name: string;
  last_name: string;
  phone: string;
  job_title: string;
  marketing_consent: boolean;
  consent_at: string | null;
  company_name: string | null;
};

type Seed = { name: string; email: string };

function splitName(full: string): { first: string; last: string } {
  const parts = full.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { first: '', last: '' };
  return { first: parts[0], last: parts.slice(1).join(' ') };
}

/**
 * The client's own details, and their marketing consent.
 *
 * Both live here rather than on the server page because src/lib/server/portal.ts
 * exposes no read for the signed-in contact's own record, and no page in this
 * slice queries the database itself. The session gives a name and an address to
 * start from, so the form is never blank while the rest loads — and if the load
 * fails outright, it degrades to those two fields rather than to nothing.
 */
export default function DetailsForm({ seed }: { seed: Seed }) {
  const fallback = splitName(seed.name);

  const [firstNameValue, setFirstName] = useState(fallback.first);
  const [lastNameValue, setLastName] = useState(fallback.last);
  const [phone, setPhone] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState<string | null>(null);

  const [consent, setConsent] = useState(false);
  const [consentAt, setConsentAt] = useState<string | null>(null);
  const [consentBusy, setConsentBusy] = useState(false);
  const [consentNote, setConsentNote] = useState<string | null>(null);

  const [loaded, setLoaded] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let live = true;

    (async () => {
      const result = await postPortal<{ contact?: Partial<ContactDetails> | null }>({
        action: 'get-details',
      });

      if (!live) return;

      const contact = result.ok ? result.data.contact : null;

      if (!contact) {
        setLoadFailed(true);
        setLoaded(true);
        return;
      }

      setFirstName(contact.first_name ?? fallback.first);
      setLastName(contact.last_name ?? fallback.last);
      setPhone(contact.phone ?? '');
      setJobTitle(contact.job_title ?? '');
      setCompany(contact.company_name ?? null);
      setConsent(Boolean(contact.marketing_consent));
      setConsentAt(contact.consent_at ?? null);
      setLoaded(true);
    })();

    return () => {
      live = false;
    };
    // Seeds come from the server session and never change while mounted.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function save(event: React.FormEvent) {
    event.preventDefault();
    if (!firstNameValue.trim()) return;

    setSaving(true);
    setError(null);
    setSaved(false);

    const result = await postPortal({
      action: 'update-details',
      first_name: firstNameValue.trim(),
      last_name: lastNameValue.trim() || null,
      phone: phone.trim() || null,
      job_title: jobTitle.trim() || null,
    });

    setSaving(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setSaved(true);
    window.setTimeout(() => setSaved(false), 4000);
  }

  async function toggleConsent() {
    const next = !consent;

    setConsentBusy(true);
    setConsentNote(null);

    const result = await postPortal({ action: 'update-details', marketing_consent: next });

    setConsentBusy(false);

    if (!result.ok) {
      setConsentNote(result.error);
      return;
    }

    setConsent(next);
    setConsentAt(next ? new Date().toISOString() : null);
    setConsentNote(
      next
        ? 'Thank you — we will keep it worth reading.'
        : 'Withdrawn. You will not receive marketing from us again.',
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <form onSubmit={save}>
          <h2 className="font-syne text-base font-bold text-white">Your details</h2>
          <p className="mt-1 text-sm text-neutral-400">
            This is who we address things to, and where we reach you when something needs a person
            rather than an email.
          </p>

          {loadFailed ? (
            <p className="mt-4 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs leading-relaxed text-neutral-400">
              We could not load your saved details just now, so the fields below start from what is
              on your sign-in. Saving will still update your record.
            </p>
          ) : null}

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="first_name" className={LABEL}>
                First name
              </label>
              <input
                id="first_name"
                name="first_name"
                type="text"
                autoComplete="given-name"
                required
                disabled={!loaded}
                value={firstNameValue}
                onChange={(event) => setFirstName(event.target.value)}
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
                type="text"
                autoComplete="family-name"
                disabled={!loaded}
                value={lastNameValue}
                onChange={(event) => setLastName(event.target.value)}
                className={INPUT}
              />
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
                disabled={!loaded}
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="+27 …"
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
                type="text"
                autoComplete="organization-title"
                disabled={!loaded}
                value={jobTitle}
                onChange={(event) => setJobTitle(event.target.value)}
                className={INPUT}
              />
            </div>
          </div>

          <div className="mt-5 rounded-lg border border-white/10 bg-black/30 px-4 py-3">
            <p className="text-xs uppercase tracking-wide text-neutral-500">Email address</p>
            <p className="mt-1 text-sm font-medium text-white">{seed.email}</p>
            <p className="mt-1.5 text-xs leading-relaxed text-neutral-500">
              {/* Changing it here would let anyone with a live session move the
                  account to an address they control. It moves by conversation. */}
              This is how you sign in, so it is not editable here. Email{' '}
              <a
                href={`mailto:${BUSINESS.email}?subject=${encodeURIComponent('Change my portal email address')}`}
                className="underline underline-offset-4 transition hover:text-[#FFD700]"
              >
                {BUSINESS.email}
              </a>{' '}
              and we will move it across for you.
            </p>
          </div>

          {company ? (
            <div className="mt-4 rounded-lg border border-white/10 bg-black/30 px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-neutral-500">Company</p>
              <p className="mt-1 text-sm font-medium text-white">{company}</p>
              <p className="mt-1.5 text-xs text-neutral-500">
                You can see everything WL CreationX is doing for {company}, and so can your
                colleagues on this account.
              </p>
            </div>
          ) : null}

          {error ? (
            <p
              role="alert"
              className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300"
            >
              {error}
            </p>
          ) : null}

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={saving || !loaded || !firstNameValue.trim()}
              className={BTN}
            >
              {saving ? 'Saving…' : 'Save changes'}
            </button>
            {saved ? (
              <span className="text-sm text-emerald-300" role="status">
                Saved.
              </span>
            ) : null}
          </div>
        </form>
      </Card>

      <Card>
        <h2 className="font-syne text-base font-bold text-white">Marketing emails</h2>
        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-neutral-400">
          Occasional notes about what the studio is making — new work, ideas worth stealing, the
          odd offer. Nothing to do with your projects: quotes, invoices and project updates always
          reach you regardless.
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-white/10 bg-black/30 px-4 py-3.5">
          <div>
            <p className="text-sm font-medium text-white">
              {consent ? 'You are subscribed' : 'You are not subscribed'}
            </p>
            <p className="mt-0.5 text-xs text-neutral-500">
              {consent && consentAt
                ? `Consent recorded ${formatDate(consentAt)}.`
                : consent
                  ? 'Consent recorded.'
                  : 'We will not send you marketing.'}
            </p>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={consent}
            aria-label="Marketing emails"
            disabled={consentBusy || !loaded}
            onClick={toggleConsent}
            className={`relative h-7 w-12 shrink-0 rounded-full border transition disabled:opacity-50 ${
              consent
                ? 'border-[#FFD700] bg-[#FFD700]/30'
                : 'border-white/20 bg-white/5 hover:border-white/40'
            }`}
          >
            <span
              className={`absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full transition-all ${
                consent ? 'left-[26px] bg-[#FFD700]' : 'left-[3px] bg-neutral-400'
              }`}
            />
          </button>
        </div>

        {consentNote ? (
          <p className="mt-3 text-sm text-neutral-300" role="status">
            {consentNote}
          </p>
        ) : null}

        <p className="mt-4 text-xs leading-relaxed text-neutral-500">
          You may withdraw consent at any time, and this switch is all it takes — no email, no
          waiting. We keep the date your consent was given because POPIA requires us to be able to
          show it. See our{' '}
          <Link
            href="/data-protection-policy-pretoria"
            className="underline underline-offset-4 transition hover:text-[#FFD700]"
          >
            data protection policy
          </Link>{' '}
          for what we hold and why.
        </p>
      </Card>
    </div>
  );
}
