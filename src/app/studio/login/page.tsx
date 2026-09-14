import type { Metadata } from 'next';
import Link from 'next/link';
import LoginForm from './LoginForm';
import { getSession } from '@/lib/server/auth';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Sign in',
  robots: { index: false, follow: false },
};

/**
 * Studio sign-in.
 *
 * Deliberately outside the (admin) route group, so it stays reachable when
 * signed out — putting it inside the guarded group would redirect it to itself.
 */
export default async function StudioLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string; detail?: string; signed?: string }>;
}) {
  const { next, error, detail, signed } = await searchParams;

  /**
   * A just-completed sign-in lands here instead of on the dashboard while the
   * dashboard render is being diagnosed (see verify/page.tsx). Only when that
   * is the case is the session looked up — an ordinary visit to this page
   * reads no cookie and renders exactly as it always has, so this adds no new
   * way for the login page itself to fail.
   */
  const session = signed === '1' ? await getSession('admin') : null;

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4 py-16 text-white">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFD700]">
            WL CreationX
          </div>
          <h1 className="mt-2 font-syne text-2xl font-bold">Studio</h1>
          <p className="mt-2 text-sm text-neutral-400">
            Enter the email address the studio is registered to and we will send you a sign-in
            link.
          </p>
        </div>

        {session && (
          <div className="mb-4 rounded-lg border border-[#FFD700]/40 bg-[#FFD700]/10 px-4 py-3 text-sm">
            <p className="font-semibold text-[#FFD700]">You are signed in as {session.name}.</p>
            <p className="mt-1 text-neutral-300">The session was created and the cookie is set.</p>
            <Link
              href="/studio/dashboard"
              className="mt-3 inline-block rounded-lg bg-[#FFD700] px-4 py-2 font-semibold text-black transition hover:bg-[#FFE44D]"
            >
              Open the dashboard
            </Link>
          </div>
        )}
        {signed === '1' && !session && (
          <p className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300">
            The sign-in completed but no session cookie reached the browser. Request a fresh link below.
          </p>
        )}
        {error === 'invalid' && (
          <p className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300">
            That sign-in link is not valid. Request a new one below.
          </p>
        )}
        {error === 'expired' && (
          <p className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300">
            That link has expired — they last 20 minutes. Request a fresh one below.
          </p>
        )}
        {error === 'used' && (
          <p className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300">
            That link has already been used. Each one works once; request another below.
          </p>
        )}
        {/*
          A sign-in that fails on our side, rather than because the link was
          bad. Previously this rendered Next's bare "a server-side exception has
          occurred" page with only a digest, on a token that had already been
          spent — so the person could neither read what went wrong nor reuse the
          link. `detail` is only ever reached by someone who just clicked a
          genuine link, so it cannot be probed, and it says what actually broke.
        */}
        {error === 'server' && (
          <div className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300">
            <p>Something went wrong signing you in — this one is on us, not the link.</p>
            {detail && (
              <p className="mt-2 break-words font-mono text-xs text-red-200/80">{detail}</p>
            )}
            <p className="mt-2 text-red-300/80">Request a fresh link below and try again.</p>
          </div>
        )}

        <LoginForm next={next ?? null} />
      </div>
    </main>
  );
}
