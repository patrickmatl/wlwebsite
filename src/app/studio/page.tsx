import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { getSession } from '@/lib/server/auth';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Studio',
  robots: { index: false, follow: false },
};

/**
 * /studio just points at the right place.
 *
 * The dashboard lives at /studio/dashboard rather than at the root of the
 * (admin) route group because Next cannot build a page that sits directly
 * inside a group: it fails to emit that page's client-reference manifest and
 * the whole production build dies on ENOENT. Sub-routes of the group are fine,
 * so the dashboard moved down one level and this redirect keeps /studio working
 * as the address everyone already has.
 */
export default async function StudioIndex() {
  const session = await getSession('admin');
  redirect(session ? '/studio/dashboard' : '/studio/login');
}
