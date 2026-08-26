import type { Metadata } from 'next';
import { first } from '../format';
import AuthShell from './AuthShell';
import LoginForm from './LoginForm';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Sign in',
  robots: { index: false, follow: false },
};

/**
 * Client sign-in.
 *
 * Deliberately outside the (client) route group: the guard lives on that
 * group's layout, so a sign-in page inside it would redirect to itself.
 */

/** Each reason a link can fail gets its own sentence — "invalid" tells a
 *  person nothing about what to do next, and they are not the same problem. */
const LINK_ERRORS: Record<string, { title: string; body: string }> = {
  invalid: {
    title: 'That link could not be read',
    body:
      'Email apps sometimes shorten or wrap a long link. Request a fresh one below and open it ' +
      'straight from the email.',
  },
  expired: {
    title: 'That link has expired',
    body:
      'Sign-in links last 20 minutes, so a forwarded email cannot be used to open your account ' +
      'later. A new one takes a moment.',
  },
  used: {
    title: 'That link has already been used',
    body:
      'Each link opens once. If you did not just sign in somewhere, request another below and ' +
      'tell the studio.',
  },
  signout: {
    title: 'We could not end your session cleanly',
    body:
      'You may still be signed in. Request a fresh link to start again, and close the browser if ' +
      'you are on a shared computer.',
  },
};

export default async function PortalLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const next = first(params.next) ?? null;
  const error = first(params.error);
  const signedOut = first(params.signed_out) === '1';
  const problem = error ? LINK_ERRORS[error] : undefined;

  return (
    <AuthShell
      heading="Client portal"
      intro="Your quotes, projects, files and invoices — all in one place."
    >
      {problem && (
        <div className="mb-5 rounded-xl border border-red-500/40 bg-red-500/10 p-4">
          <p className="text-sm font-medium text-red-200">{problem.title}</p>
          <p className="mt-1 text-xs leading-relaxed text-red-300/80">{problem.body}</p>
        </div>
      )}

      {signedOut && !problem && (
        <div className="mb-5 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center">
          <p className="text-sm text-neutral-200">You are signed out.</p>
          <p className="mt-1 text-xs text-neutral-500">Sign in again whenever you need us.</p>
        </div>
      )}

      <LoginForm next={next} />
    </AuthShell>
  );
}
