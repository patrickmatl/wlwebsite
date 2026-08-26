import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { BTN } from '@/components/crm/ui';
import { consumeLoginToken, safeNext } from '@/lib/server/auth';
import { first } from '../../format';
import AuthShell from '../AuthShell';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Signing you in',
  robots: { index: false, follow: false },
};

/**
 * Redeeming a sign-in link.
 *
 * Two things shape this page.
 *
 * First, a session cookie can only be written from a Server Action or a Route
 * Handler — Next throws if a component tries to set one while rendering — so
 * consumeLoginToken() runs in the action below rather than in the page body.
 *
 * Second, that constraint turns out to be the right behaviour anyway. A magic
 * link is single-use, and corporate mail filters, link scanners and Outlook's
 * "safe links" all fetch URLs before the human ever clicks. If redeeming
 * happened on GET, those scanners would burn the token and the client would be
 * met with "already used" through no fault of their own. A POST behind one
 * deliberate click cannot be triggered by a scanner.
 */
async function completeSignIn(formData: FormData) {
  'use server';

  const token = String(formData.get('token') ?? '').trim();
  if (!token) redirect('/portal/login?error=invalid');

  const result = await consumeLoginToken(token);
  if (!result.ok) redirect(`/portal/login?error=${result.reason}`);

  // A link minted for the studio side must not land someone in the portal just
  // because it was opened at this URL. The session it created is the admin one.
  if (result.kind !== 'client') redirect('/studio');

  const next = String(formData.get('next') ?? '').trim();
  redirect(safeNext(next || null, 'client') ?? '/portal');
}

export default async function PortalVerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const token = first(params.token)?.trim();
  const next = first(params.next) ?? '';

  // No token at all is not a failed sign-in, it is a mangled URL. Send them
  // back to the form with wording that says so.
  if (!token) redirect('/portal/login?error=invalid');

  return (
    <AuthShell
      heading="Confirm sign-in"
      intro="One tap and you are in. We ask because email security scanners open links before you do, and each link works only once."
    >
      <form action={completeSignIn} className="space-y-4">
        <input type="hidden" name="token" value={token} />
        <input type="hidden" name="next" value={next} />
        <button type="submit" className={`${BTN} w-full`}>
          Sign me in
        </button>
      </form>

      <p className="mt-4 text-center text-xs leading-relaxed text-neutral-500">
        Did not ask for this? Close the page — nothing happens until you tap the button, and the
        link expires on its own.
      </p>
    </AuthShell>
  );
}
