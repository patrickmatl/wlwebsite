import type { ReactNode } from 'react';
import { BUSINESS } from '@/data/business';

/**
 * The frame around the signed-out pages.
 *
 * It cannot live in a layout: the sign-in pages sit outside the (client) route
 * group precisely so they stay reachable without a session, and a layout at
 * /portal/login would only be shared by two files anyway.
 */
export default function AuthShell({
  heading,
  intro,
  children,
}: {
  heading: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-[100svh] items-center justify-center bg-black px-4 py-16 text-white">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFD700]">
            WL CreationX
          </div>
          <h1 className="mt-2 font-syne text-2xl font-bold">{heading}</h1>
          {intro && <p className="mt-2 text-sm leading-relaxed text-neutral-400">{intro}</p>}
        </div>

        {children}

        <p className="mt-8 text-center text-xs leading-relaxed text-neutral-600">
          Trouble signing in? Email{' '}
          <a
            href={`mailto:${BUSINESS.email}`}
            className="text-neutral-400 underline underline-offset-4 transition hover:text-[#FFD700]"
          >
            {BUSINESS.email}
          </a>{' '}
          or call {BUSINESS.phoneDisplay}.
        </p>
      </div>
    </div>
  );
}
