'use client';

import { useState } from 'react';
import { BTN, INPUT, LABEL } from '@/components/crm/ui';

/**
 * Requests a sign-in link.
 *
 * The confirmation is deliberately the same whatever happened on the server —
 * address unknown, account disabled, rate limited or genuinely sent. Anything
 * else turns this box into a way to find out who has an account.
 */
export default function LoginForm({ next }: { next: string | null }) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setState('sending');

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'request-login', kind: 'admin', email, next }),
      });
      setState(res.ok ? 'sent' : 'error');
    } catch {
      setState('error');
    }
  }

  if (state === 'sent') {
    return (
      <div className="rounded-xl border border-[#FFD700]/30 bg-[#FFD700]/5 p-5 text-center">
        <p className="font-syne text-base font-bold text-[#FFD700]">Check your email</p>
        <p className="mt-2 text-sm leading-relaxed text-neutral-300">
          If that address is registered, a sign-in link is on its way. It works once and expires
          in 20 minutes.
        </p>
        <button
          type="button"
          onClick={() => setState('idle')}
          className="mt-4 text-xs text-neutral-400 underline underline-offset-4 hover:text-white"
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
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@wlcreationx.co.za"
          className={INPUT}
        />
      </div>

      {state === 'error' && (
        <p className="text-sm text-red-300">Something went wrong. Please try again.</p>
      )}

      <button type="submit" disabled={state === 'sending'} className={`${BTN} w-full`}>
        {state === 'sending' ? 'Sending…' : 'Email me a sign-in link'}
      </button>

      <p className="text-center text-xs leading-relaxed text-neutral-500">
        There is no password to remember. Each link signs you in once, and the session lasts a
        fortnight.
      </p>
    </form>
  );
}
