'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * The form behind every "Get Started" button on a pricing page.
 *
 * Those buttons were decorative — a styled <button> with no onClick, on every
 * package on every pricing page. Someone reading the packages, deciding on one
 * and pressing the button got nothing at all, which is the most expensive
 * moment on the site to do nothing in: that is a visitor who has already
 * chosen.
 *
 * The package they pressed travels with the enquiry, so the reply can quote
 * that package rather than asking which one they meant. Name and email are
 * required because a quote cannot be sent without them; everything else is
 * optional, because each extra required field costs conversions and the agent
 * can ask for what it actually needs.
 */

export type PackageEnquiryProps = {
  /** The package they chose, e.g. "Basic Packaging". */
  packageName: string;
  /** As displayed on the card, e.g. "R2,500". Sent as context, never as a promise. */
  packagePrice?: string;
  /** The service this pricing page is for, e.g. "Packaging design". */
  service: string;
  open: boolean;
  onClose: () => void;
};

export default function PackageEnquiryModal({
  packageName,
  packagePrice,
  service,
  open,
  onClose,
}: PackageEnquiryProps) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  // Escape closes, and focus lands in the first field rather than nowhere.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const t = setTimeout(() => firstFieldRef.current?.focus(), 60);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      clearTimeout(t);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = new FormData(e.currentTarget);

    // Honeypot: bots fill hidden fields, people do not.
    if (form.get('website')?.toString()) {
      setDone(true);
      setSubmitting(false);
      return;
    }

    const company = form.get('company')?.toString().trim();
    const extra = form.get('extra')?.toString().trim();

    // Written as prose because the agent reads this as the client's brief. It
    // needs to know which package was chosen to quote the right thing.
    const details = [
      `Chose the "${packageName}" package${packagePrice ? ` (listed at ${packagePrice})` : ''} on the ${service} pricing page.`,
      company ? `Company: ${company}` : '',
      extra ? `\n${extra}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.get('name')?.toString() ?? '',
          email: form.get('email')?.toString() ?? '',
          phone: form.get('phone')?.toString() || null,
          service: `${service} — ${packageName}`,
          details,
          source_page: typeof window !== 'undefined' ? window.location.pathname : null,
          website: '',
        }),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload.error || 'Could not send that. Please try again.');
      }
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  const field =
    'w-full rounded-md bg-black/60 border border-neutral-700 px-3 py-2.5 text-white placeholder-neutral-500 focus:border-[#FFD700] focus:outline-none focus:ring-1 focus:ring-[#FFD700]';

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="package-enquiry-title"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-[#FFD700]/30 bg-zinc-900 p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {done ? (
          <div className="py-6 text-center">
            <h2 className="mb-3 text-2xl font-bold text-[#FFD700]">Thank you — that is with us</h2>
            <p className="mb-6 text-neutral-300">
              We have your enquiry about the <strong>{packageName}</strong> package. You will get a
              reply by email shortly, with a quote or a couple of questions if we need to pin the
              scope down first.
            </p>
            <button
              onClick={onClose}
              className="rounded bg-[#FFD700] px-6 py-2.5 font-semibold text-black transition-colors hover:bg-[#FFE44D]"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 id="package-enquiry-title" className="text-xl font-bold text-[#FFD700]">
                  {packageName}
                </h2>
                <p className="mt-1 text-sm text-neutral-400">
                  {service}
                  {packagePrice ? ` · ${packagePrice}` : ''}
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="text-2xl leading-none text-neutral-500 transition-colors hover:text-white"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot — visually hidden, not display:none, so bots still fill it. */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
              />

              <div>
                <label htmlFor="pe-name" className="mb-1 block text-sm text-neutral-300">
                  Your name <span className="text-[#FFD700]">*</span>
                </label>
                <input
                  ref={firstFieldRef}
                  id="pe-name"
                  name="name"
                  required
                  className={field}
                  placeholder="Lerato Mokoena"
                />
              </div>

              <div>
                <label htmlFor="pe-email" className="mb-1 block text-sm text-neutral-300">
                  Email <span className="text-[#FFD700]">*</span>
                </label>
                <input
                  id="pe-email"
                  name="email"
                  type="email"
                  required
                  className={field}
                  placeholder="you@company.co.za"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="pe-phone" className="mb-1 block text-sm text-neutral-300">
                    Phone
                  </label>
                  <input
                    id="pe-phone"
                    name="phone"
                    type="tel"
                    className={field}
                    placeholder="082 000 0000"
                  />
                </div>
                <div>
                  <label htmlFor="pe-company" className="mb-1 block text-sm text-neutral-300">
                    Company
                  </label>
                  <input id="pe-company" name="company" className={field} placeholder="Optional" />
                </div>
              </div>

              <div>
                <label htmlFor="pe-extra" className="mb-1 block text-sm text-neutral-300">
                  Anything else we should know?
                </label>
                <textarea
                  id="pe-extra"
                  name="extra"
                  rows={4}
                  className={field}
                  placeholder="What you are making, deadlines, quantities, anything you already have — the more you tell us, the closer the quote."
                />
              </div>

              {error && (
                <p role="alert" className="text-sm text-red-400">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded bg-[#FFD700] px-4 py-3 font-semibold text-black transition-colors hover:bg-[#FFE44D] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? 'Sending…' : 'Send my enquiry'}
              </button>

              <p className="text-center text-xs text-neutral-500">
                We reply by email. No newsletter, and we never pass your details on.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
