import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { consumeLoginToken, safeNext } from '@/lib/server/auth';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Signing in',
  robots: { index: false, follow: false },
};

/**
 * Redeeming a studio sign-in link.
 *
 * This page used to call consumeLoginToken() directly in its body, and every
 * valid link therefore died with "a server-side exception has occurred".
 * consumeLoginToken() creates the session, createSession() writes the session
 * cookie, and Next refuses a cookie write while a component is rendering — it
 * is only allowed from a Server Action or a Route Handler. An invalid token hid
 * the bug completely, because it returns before reaching the cookie and simply
 * redirects, so the route looked healthy under any test that did not use a real
 * link.
 *
 * The portal side already solved this. The shape below is deliberately the same
 * as src/app/portal/login/verify/page.tsx, for the same two reasons:
 *
 *   1. Redeeming happens in the Server Action, where writing a cookie is legal.
 *
 *   2. Redeeming on POST rather than GET protects the token. A magic link is
 *      single use, and corporate mail filters, link scanners and Outlook's safe
 *      links all fetch URLs before any human clicks. On GET those scanners burn
 *      the token and the real person arrives to "already used". One deliberate
 *      click cannot be triggered by a scanner.
 */
async function completeSignIn(formData: FormData) {
  'use server';

  const token = String(formData.get('token') ?? '').trim();
  if (!token) redirect('/studio/login?error=invalid');

  /**
   * Only consumeLoginToken is guarded, and deliberately so.
   *
   * redirect() works by throwing NEXT_REDIRECT, so wrapping the redirects below
   * in this try would swallow them and turn every successful sign-in into an
   * error. The catch is therefore as tight as it can be.
   *
   * It exists because an unhandled throw here renders "a server-side exception
   * has occurred" with nothing but a digest, which tells the person signing in
   * nothing and tells us almost as little. consumeLoginToken spends the token
   * and then creates the session, and createSession throws outright if the
   * sessions insert is rejected — so a schema or constraint problem surfaces as
   * an opaque 500 on a spent token, which is the worst of both.
   */
  let result: Awaited<ReturnType<typeof consumeLoginToken>>;
  try {
    result = await consumeLoginToken(token);
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    console.error('[studio-login] sign-in failed', err);
    redirect(`/studio/login?error=server&detail=${encodeURIComponent(detail.slice(0, 180))}`);
  }

  if (!result.ok) redirect(`/studio/login?error=${result.reason}`);

  // A client link must not open the studio just because it was pasted here.
  // The session it created is the portal one, so send them where it works.
  if (result.kind !== 'admin') redirect('/portal');

  const next = String(formData.get('next') ?? '').trim();
  redirect(safeNext(next || null, 'admin') ?? '/studio');
}

export default async function StudioVerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; next?: string }>;
}) {
  const { token, next } = await searchParams;
  const clean = token?.trim();

  // No token is a mangled URL rather than a failed sign-in.
  if (!clean) redirect('/studio/login?error=invalid');

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4 py-16 text-white">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFD700]">
            WL CreationX
          </div>
          <h1 className="mt-2 font-syne text-2xl font-bold">Confirm sign-in</h1>
          <p className="mt-2 text-sm text-neutral-400">
            One tap and you are in. We ask because email security scanners open links before you
            do, and each link works only once.
          </p>
        </div>

        <form action={completeSignIn} className="space-y-4">
          <input type="hidden" name="token" value={clean} />
          <input type="hidden" name="next" value={next ?? ''} />
          <button
            type="submit"
            className="w-full rounded-lg bg-[#FFD700] px-4 py-3 font-semibold text-black transition hover:bg-[#FFE44D]"
          >
            Sign me in
          </button>
        </form>

        <p className="mt-4 text-center text-xs leading-relaxed text-neutral-500">
          Did not ask for this? Close the page — nothing happens until you tap the button, and the
          link expires on its own.
        </p>
      </div>
    </main>
  );
}
