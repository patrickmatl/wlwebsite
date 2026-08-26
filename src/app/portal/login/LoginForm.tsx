'use client';

import { useState } from 'react';
import { BTN, INPUT, LABEL } from '@/components/crm/ui';
import { postAuth } from '../portal-post';

/**
 * Requests a sign-in link for a client.
 *
 * The confirmation is deliberately identical whatever happened on the server —
 * address unknown, portal access switched off, rate limited, or a link
 * genuinely sent. Anything else turns this box into a way to find out who WL
 * CreationX works with, which is exactly the kind of thing a competitor would
 * enjoy and a client would not.
 *
 * For the same reason the request is treated as successful even when the API
 * answers with an error status: the only failure surfaced here is one that
 * stopped the request reaching the server at all.
 */
export default function LoginForm({ next }: { next: string | null }) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!email.trim()) return;
    setState('sending');

    const result = await postAuth({
      action: 'request-login',
      kind: 'client',
      email: email.trim(),
      next,
    });

    // `ok: false` from a reachable server still means "we are not telling you".
    setState(result.ok || result.error.startsWith('That did not go through') ? 'sent' : 'error');
  }

  if (state === 'sent') {
    return (
      <div className="rounded-xl border border-[#FFD700]/30 bg-[#FFD700]/5 p-6 text-center">
        <p className="font-syne text-base font-bold text-[#FFD700]">Check your inbox</p>
        <p className="mt-2 text-sm leading-relaxed text-neutral-300">
          If that address is on file, a sign-in link is on its way. It opens once and expires
          after 20 minutes.
        </p>
        <p className="mt-3 text-xs leading-relaxed text-neutral-500">
          Nothing after a minute or two? Have a look in spam, then try again.
        </p>
        <button
          type="button"
          onClick={() => setState('idle')}
          className="mt-4 text-xs text-neutral-400 underline underline-offset-4 transition hover:text-white"
        >
          Use a different address
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label htmlFor="email" className={LABEL}>
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          autoFocus
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@yourcompany.co.za"
          className={INPUT}
        />
        <p className="mt-1.5 text-xs text-neutral-500">
          Use the address the studio corresponds with you on.
        </p>
      </div>

      {state === 'error' && (
        <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          We could not reach the studio just then. Check your connection and try again.
        </p>
      )}

      <button type="submit" disabled={state === 'sending'} className={`${BTN} w-full`}>
        {state === 'sending' ? 'Sending…' : 'Email me a sign-in link'}
      </button>

      <p className="text-center text-xs leading-relaxed text-neutral-500">
        There is no password to remember. Each link signs you in once, and your session lasts a
        month.
      </p>
    </form>
  );
}
