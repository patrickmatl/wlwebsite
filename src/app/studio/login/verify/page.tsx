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

  /**
   * The whole body is guarded, not just the token call.
   *
   * A tighter try around consumeLoginToken did not catch this: sign-in still
   * died with the same opaque digest and never reached the error page, which
   * proves the throw is somewhere else in the action. So the net is widened
   * until it is visible.
   *
   * redirect() signals by throwing, and that throw carries a digest beginning
   * "NEXT_REDIRECT". Re-throwing those is what keeps a successful sign-in
   * working; anything else is a real failure and is shown on the login page
   * rather than rendered as Next's bare "a server-side exception has occurred".
   */
  try {
    const token = String(formData.get('token') ?? '').trim();
    if (!token) redirect('/studio/login?error=invalid');

    const result = await consumeLoginToken(token);

    if (!result.ok) redirect(`/studio/login?error=${result.reason}`);

    // A client link must not open the studio just because it was pasted here.
    // The session it created is the portal one, so send them where it works.
    if (result.kind !== 'admin') redirect('/portal');

    /**
     * Land on the dashboard directly, not on /studio.
     *
     * /studio exists only to redirect() to /studio/dashboard. Sending a
     * just-signed-in person there meant the action's own redirect resolved
     * to a page whose entire render is another redirect — a redirect chained
     * off a redirect inside the same server-action response. Every sign-in
     * then died in "Server Components render" with an identical digest while
     * the action itself never threw, and because the response was a 500 the
     * session cookie set a moment earlier never reached the browser. One hop
     * is one fewer place for that to happen, and the dashboard is where
     * /studio was always going to put them anyway.
     */
    /**
     * DIAGNOSTIC LANDING — land on the login page, not the dashboard.
     *
     * Sign-in kept failing with one unchanging digest (854132305) whether the
     * action redirected to /studio or straight to /studio/dashboard, and a
     * try/catch around the whole action never fired. So the action is fine
     * and the crash is in the render of whichever authenticated page it
     * redirects to — and because that render 500s, the session cookie the
     * action just set is thrown away with the response, which is why every
     * attempt ends signed out.
     *
     * /studio/login reads no session and renders the same signed in or out,
     * so it cannot fail for this reason. Landing there proves the cookie
     * sticks, and leaves a real signed-in browser session that can open each
     * studio route on its own and show exactly which one throws. The page
     * recognises the session and offers the dashboard rather than the form.
     */
    const next = String(formData.get('next') ?? '').trim();
    redirect(safeNext(next || null, 'admin') ?? '/studio/login?signed=1');
  } catch (err) {
    const digest = (err as { digest?: unknown })?.digest;
    if (typeof digest === 'string' && digest.startsWith('NEXT_REDIRECT')) throw err;

    const detail = err instanceof Error ? `${err.name}: ${err.message}` : String(err);
    console.error('[studio-login] sign-in failed', err);
    redirect(`/studio/login?error=server&detail=${encodeURIComponent(detail.slice(0, 240))}`);
  }
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
