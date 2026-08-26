'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * "Apply for this position", with the form behind it.
 *
 * Every job on the careers page previously ended at a mailto: link, which
 * assumes a working mail client and leaves the applicant to guess what to
 * write. This asks for the few things a first sift actually needs and takes
 * the CV with it.
 *
 * The 5MB ceiling is enforced twice — here so the applicant is told instantly,
 * and again in /api/careers because a client-side check is a courtesy, not a
 * control. Either way the message names the careers address, so someone with a
 * 30MB portfolio PDF still knows exactly how to apply.
 */

const CAREERS_EMAIL = 'careers@wlcreationx.co.za';
const MAX_BYTES = 5 * 1024 * 1024;

export default function ApplyButton({
  role,
  className = '',
}: {
  role: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [cvName, setCvName] = useState<string | null>(null);
  const firstField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    const t = setTimeout(() => firstField.current?.focus(), 60);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      clearTimeout(t);
      document.body.style.overflow = '';
    };
  }, [open]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const form = new FormData(e.currentTarget);
    const cv = form.get('cv');

    if (cv && typeof cv === 'object' && 'size' in cv) {
      const file = cv as File;
      if (file.size > MAX_BYTES) {
        setError(
          `${file.name} is ${(file.size / 1024 / 1024).toFixed(1)}MB and the limit is 5MB. ` +
            `Please attach a smaller version, or email it straight to ${CAREERS_EMAIL}.`,
        );
        return;
      }
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/careers', { method: 'POST', body: form });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(payload.error || 'Could not send that. Please try again.');
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  }

  const field =
    'w-full rounded-md bg-black/60 border border-neutral-700 px-3 py-2.5 text-white placeholder-neutral-500 focus:border-[#FFD700] focus:outline-none focus:ring-1 focus:ring-[#FFD700]';

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className={`inline-flex items-center justify-center rounded-lg bg-[#FFD700] px-6 py-3 font-bold text-black transition-colors duration-300 hover:bg-[#FFC000] ${className}`}
      >
        Apply for this position
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="apply-title"
          onClick={() => setOpen(false)}
        >
          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-[#FFD700]/30 bg-zinc-900 p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {done ? (
              <div className="py-6 text-center">
                <h2 className="mb-3 text-2xl font-bold text-[#FFD700]">Application sent</h2>
                <p className="mb-6 text-neutral-300">
                  Thanks — your application for <strong>{role}</strong> is with our careers team,
                  and we have emailed you a confirmation. We only reply to applications we are
                  taking further, and that can take a few weeks.
                </p>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded bg-[#FFD700] px-6 py-2.5 font-semibold text-black transition-colors hover:bg-[#FFE44D]"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <h2 id="apply-title" className="text-xl font-bold text-[#FFD700]">
                      Apply — {role}
                    </h2>
                    <p className="mt-1 text-sm text-neutral-400">
                      Goes straight to {CAREERS_EMAIL}
                    </p>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    aria-label="Close"
                    className="text-2xl leading-none text-neutral-500 transition-colors hover:text-white"
                  >
                    &times;
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input type="hidden" name="role" value={role} />
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute left-[-9999px] h-0 w-0 opacity-0"
                  />

                  <div>
                    <label htmlFor="ap-name" className="mb-1 block text-sm text-neutral-300">
                      Your name <span className="text-[#FFD700]">*</span>
                    </label>
                    <input ref={firstField} id="ap-name" name="name" required className={field} />
                  </div>

                  <div>
                    <label htmlFor="ap-email" className="mb-1 block text-sm text-neutral-300">
                      Email <span className="text-[#FFD700]">*</span>
                    </label>
                    <input id="ap-email" name="email" type="email" required className={field} />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="ap-phone" className="mb-1 block text-sm text-neutral-300">
                        Phone
                      </label>
                      <input id="ap-phone" name="phone" type="tel" className={field} />
                    </div>
                    <div>
                      <label htmlFor="ap-portfolio" className="mb-1 block text-sm text-neutral-300">
                        Portfolio link
                      </label>
                      <input
                        id="ap-portfolio"
                        name="portfolio"
                        className={field}
                        placeholder="Behance, site, Drive…"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="ap-cv" className="mb-1 block text-sm text-neutral-300">
                      Your CV <span className="text-neutral-500">(PDF or Word, up to 5MB)</span>
                    </label>
                    <input
                      id="ap-cv"
                      name="cv"
                      type="file"
                      accept=".pdf,.doc,.docx,.rtf,.odt,.txt,.png,.jpg,.jpeg,.pages"
                      onChange={(e) => setCvName(e.target.files?.[0]?.name ?? null)}
                      className="w-full rounded-md border border-neutral-700 bg-black/60 px-3 py-2.5 text-sm text-neutral-300 file:mr-3 file:rounded file:border-0 file:bg-[#FFD700] file:px-3 file:py-1.5 file:font-semibold file:text-black"
                    />
                    {cvName && <p className="mt-1 text-xs text-neutral-400">Attached: {cvName}</p>}
                  </div>

                  <div>
                    <label htmlFor="ap-message" className="mb-1 block text-sm text-neutral-300">
                      Why this role?
                    </label>
                    <textarea
                      id="ap-message"
                      name="message"
                      rows={4}
                      className={field}
                      placeholder="A few lines about you and the work you want to be doing."
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
                    {submitting ? 'Sending…' : 'Send application'}
                  </button>

                  <p className="text-center text-xs text-neutral-500">
                    Prefer email? Send it to{' '}
                    <a href={`mailto:${CAREERS_EMAIL}`} className="text-[#FFD700] hover:underline">
                      {CAREERS_EMAIL}
                    </a>
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
