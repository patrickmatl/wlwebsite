import type { Metadata } from 'next';
import LoginForm from './LoginForm';

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
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const { next, error } = await searchParams;

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

        <LoginForm next={next ?? null} />
      </div>
    </main>
  );
}
