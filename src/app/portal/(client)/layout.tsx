import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';
import { BUSINESS } from '@/data/business';
import { getSession } from '@/lib/server/auth';
import PortalNav from './PortalNav';

/**
 * The signed-in half of the client portal.
 *
 * The guard lives here so nothing in the group can be reached without a client
 * session — but every page checks again for itself. A layout is a convenience,
 * not a security boundary: a page reached some other way (a parallel route
 * added later, a refactor that moves a file) must not become readable because
 * this file was the only gate.
 *
 * The sign-in pages sit outside this group on purpose. Inside it they would
 * redirect to themselves.
 */

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: {
    default: 'Client portal',
    template: '%s · WL CreationX',
  },
  // Somebody's quotes and invoices. Inherited by every page in the group.
  robots: { index: false, follow: false },
};

export default async function PortalLayout({ children }: { children: ReactNode }) {
  const session = await getSession('client');
  if (!session) redirect('/portal/login');

  return (
    <div className="min-h-[100svh] bg-black text-white">
      <PortalNav name={session.name} email={session.email} />

      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-10">{children}</div>

      <footer className="mx-auto w-full max-w-5xl px-4 pb-12 sm:px-6">
        <div className="border-t border-white/10 pt-6 text-xs leading-relaxed text-neutral-600">
          <p>
            Something not looking right? Email{' '}
            <a
              href={`mailto:${BUSINESS.email}`}
              className="text-neutral-400 underline underline-offset-4 transition hover:text-[#FFD700]"
            >
              {BUSINESS.email}
            </a>{' '}
            or call{' '}
            <a
              href={`tel:${BUSINESS.phoneE164}`}
              className="text-neutral-400 underline underline-offset-4 transition hover:text-[#FFD700]"
            >
              {BUSINESS.phoneDisplay}
            </a>
            . We would rather hear from you than have you guess.
          </p>
          <p className="mt-2">
            {BUSINESS.name} · {BUSINESS.address.street}, {BUSINESS.address.suburb},{' '}
            {BUSINESS.address.city}
          </p>
        </div>
      </footer>
    </div>
  );
}
