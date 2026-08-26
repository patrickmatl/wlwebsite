import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';
import AdminNav from '@/components/crm/AdminNav';
import { getSession } from '@/lib/server/auth';

/**
 * The signed-in half of the studio.
 *
 * Everything inside this route group is behind the admin session. The guard
 * lives here so no page in the group can be reached without one, but each page
 * checks again for itself — a layout is a convenience, not a security boundary,
 * and a page rendered any other way (a future parallel route, a mistake in a
 * refactor) must not become readable because this file was the only gate.
 */

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: {
    default: 'Studio',
    template: '%s · Studio',
  },
  // Private business data. Inherited by every page in the group.
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getSession('admin');
  if (!session) redirect('/studio/login');

  return (
    <div className="min-h-screen bg-black text-white">
      <AdminNav user={{ name: session.name, email: session.email, role: session.role }} />
      {/* The rail is fixed, so the content is padded past it rather than
          sharing a flex row — that keeps each page a normal document that
          scrolls on its own. */}
      <main className="lg:pl-60">
        <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
          {children}
        </div>
      </main>
    </div>
  );
}
