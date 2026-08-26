import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { consumeLoginToken, safeNext } from '@/lib/server/auth';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Signing in',
  robots: { index: false, follow: false },
};

/**
 * Redeems a studio sign-in link.
 *
 * Everything meaningful happens server-side before anything renders: the token
 * is spent, a session cookie is set, and the browser is redirected. There is no
 * client-side step, so the token never reaches JavaScript.
 */
export default async function VerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; next?: string }>;
}) {
  const { token, next } = await searchParams;

  if (!token) redirect('/studio/login?error=invalid');

  const result = await consumeLoginToken(token);

  if (!result.ok) redirect(`/studio/login?error=${result.reason}`);
  if (result.kind !== 'admin') redirect('/studio/login?error=invalid');

  redirect(safeNext(next, 'admin') ?? '/studio');
}
