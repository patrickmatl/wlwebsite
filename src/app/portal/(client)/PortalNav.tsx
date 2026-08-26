'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { postAuth } from '../portal-post';

const LINKS: { href: string; label: string; exact?: boolean }[] = [
  { href: '/portal', label: 'Overview', exact: true },
  { href: '/portal/quotes', label: 'Quotes' },
  { href: '/portal/projects', label: 'Projects' },
  { href: '/portal/invoices', label: 'Invoices' },
  { href: '/portal/details', label: 'Details' },
];

function isActive(pathname: string, href: string, exact?: boolean): boolean {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * The portal's header.
 *
 * Client-side only because of two things: the active nav state, and sign-out.
 * Everything below it renders on the server.
 */
export default function PortalNav({ name, email }: { name: string; email: string }) {
  const pathname = usePathname();
  const [signingOut, setSigningOut] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function signOut() {
    setSigningOut(true);
    setError(null);

    const result = await postAuth({ action: 'logout', kind: 'client' });

    if (!result.ok) {
      // Navigating anyway would tell them they are signed out when the session
      // is still live on the server — the one lie a sign-out button must never
      // tell, least of all on a borrowed computer.
      setSigningOut(false);
      setError('We could not end your session. Try again, or close the browser entirely.');
      return;
    }

    // A full load rather than a router push, so nothing rendered under the old
    // session survives in the client cache.
    window.location.assign('/portal/login?signed_out=1');
  }

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-black/85 backdrop-blur">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/portal" className="group min-w-0">
            <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFD700]">
              WL CreationX
            </span>
            <span className="block font-syne text-sm font-bold text-white transition group-hover:text-[#FFD700]">
              Client portal
            </span>
          </Link>

          <div className="flex min-w-0 items-center gap-3">
            <div className="hidden min-w-0 text-right sm:block">
              <div className="truncate text-sm font-medium text-white">{name}</div>
              <div className="truncate text-xs text-neutral-500">{email}</div>
            </div>
            <button
              type="button"
              onClick={signOut}
              disabled={signingOut}
              className="shrink-0 rounded-lg border border-white/15 px-3 py-1.5 text-xs font-medium text-neutral-300 transition hover:border-white/30 hover:text-white disabled:opacity-50"
            >
              {signingOut ? 'Signing out…' : 'Sign out'}
            </button>
          </div>
        </div>

        <nav aria-label="Portal sections" className="-mx-1 flex gap-1 overflow-x-auto pb-2">
          {LINKS.map((link) => {
            const active = isActive(pathname, link.href, link.exact);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={`shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                  active
                    ? 'bg-[#FFD700]/10 text-[#FFD700]'
                    : 'text-neutral-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {error && (
          <p className="pb-2 text-xs text-red-300" role="alert">
            {error}
          </p>
        )}
      </div>
    </header>
  );
}
