'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

/**
 * Studio navigation — one list of destinations, two presentations.
 *
 * On a wide screen it is a fixed rail down the left. On a phone it is a sticky
 * bar with a sheet behind a Menu button. Patrick runs this business from his
 * phone as much as from a desk, and ten destinations in a horizontally
 * scrolling strip means hunting by swipe: the sheet puts every section two taps
 * away and keeps the current one named in the bar the whole time.
 */

type NavItem = { href: string; label: string; hint: string };

const NAV: NavItem[] = [
  { href: '/studio', label: 'Dashboard', hint: 'Where the studio stands' },
  { href: '/studio/inbox', label: 'Approvals', hint: 'Replies waiting to send' },
  { href: '/studio/deals', label: 'Deals', hint: 'The pipeline' },
  { href: '/studio/contacts', label: 'Contacts', hint: 'People' },
  { href: '/studio/companies', label: 'Companies', hint: 'Businesses' },
  { href: '/studio/quotes', label: 'Quotes', hint: 'Sent and accepted' },
  { href: '/studio/projects', label: 'Projects', hint: 'Work in progress' },
  { href: '/studio/invoices', label: 'Invoices', hint: 'Billing and payments' },
  { href: '/studio/tasks', label: 'Tasks', hint: 'What you owe someone' },
  { href: '/studio/settings', label: 'Settings', hint: 'Studio details' },
];

/**
 * `/studio` is the dashboard itself, so it matches only exactly — a prefix
 * match would light it up on every page in the CRM.
 */
function isActive(pathname: string, href: string): boolean {
  if (href === '/studio') return pathname === '/studio';
  return pathname === href || pathname.startsWith(href + '/');
}

const RAIL_LINK =
  'block rounded-lg border border-transparent px-3 py-2 text-sm font-medium transition';
const RAIL_ON = 'border-[#FFD700]/30 bg-[#FFD700]/10 text-[#FFD700]';
const RAIL_OFF = 'text-neutral-400 hover:bg-white/5 hover:text-white';

export default function AdminNav({
  user,
}: {
  user: { name: string; email: string; role: 'owner' | 'staff' };
}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const current = NAV.find((item) => isActive(pathname, item.href)) ?? NAV[0];

  // Following a link inside the sheet navigates without unmounting this
  // component, so the route change itself has to close the sheet.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  async function signOut() {
    setSigningOut(true);
    try {
      await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'logout', kind: 'admin' }),
      });
    } catch {
      // The session cookie is httpOnly, so only the server can clear it and
      // there is nothing useful to retry from here. Leaving for the login page
      // regardless is still right: if the cookie somehow survived, that page
      // sends the session straight back in.
    }
    // A hard navigation rather than router.push — the Next router cache holds
    // rendered payloads belonging to the signed-out user and must not survive.
    window.location.href = '/studio/login';
  }

  const signOutButton = (className: string) => (
    <button type="button" onClick={signOut} disabled={signingOut} className={className}>
      {signingOut ? 'Signing out…' : 'Sign out'}
    </button>
  );

  const whoami = (
    <div className="min-w-0">
      <p className="truncate text-sm font-medium text-white">{user.name}</p>
      <p className="truncate text-xs text-neutral-500">
        {user.role === 'owner' ? 'Owner' : 'Staff'} · {user.email}
      </p>
    </div>
  );

  return (
    <>
      {/* Wide screens: a fixed rail. */}
      <nav
        aria-label="Studio sections"
        className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex lg:w-60 lg:flex-col lg:border-r lg:border-white/10 lg:bg-black"
      >
        <div className="border-b border-white/10 px-5 py-5">
          <Link href="/studio" className="block">
            <span className="font-syne text-lg font-bold text-[#FFD700]">WL CreationX</span>
            <span className="mt-0.5 block text-xs uppercase tracking-widest text-neutral-500">
              Studio
            </span>
          </Link>
        </div>

        <ul className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {NAV.map((item) => {
            const on = isActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={on ? 'page' : undefined}
                  className={`${RAIL_LINK} ${on ? RAIL_ON : RAIL_OFF}`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="space-y-3 border-t border-white/10 px-5 py-4">
          {whoami}
          {signOutButton(
            'w-full rounded-lg border border-white/15 px-3 py-2 text-sm font-medium text-neutral-300 transition hover:border-red-500/40 hover:text-red-300 disabled:opacity-50',
          )}
        </div>
      </nav>

      {/* Phones: a sticky bar, with every section behind one tap. */}
      <div className="sticky top-0 z-40 border-b border-white/10 bg-black/95 backdrop-blur lg:hidden">
        <div className="flex items-center gap-3 px-4 py-3">
          <Link href="/studio" className="font-syne text-base font-bold text-[#FFD700]">
            WL
          </Link>
          <span className="min-w-0 flex-1 truncate text-sm font-medium text-white">
            {current.label}
          </span>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="studio-menu"
            className="rounded-lg border border-white/15 px-3 py-1.5 text-sm font-medium text-neutral-200 transition hover:border-white/30"
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>

        {menuOpen && (
          <nav
            id="studio-menu"
            aria-label="Studio sections"
            className="max-h-[70vh] overflow-y-auto border-t border-white/10 px-4 py-4"
          >
            <ul className="grid grid-cols-2 gap-2">
              {NAV.map((item) => {
                const on = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={on ? 'page' : undefined}
                      className={`block rounded-lg border px-3 py-2.5 transition ${
                        on
                          ? 'border-[#FFD700]/40 bg-[#FFD700]/10'
                          : 'border-white/10 bg-white/[0.03] hover:border-white/25'
                      }`}
                    >
                      <span
                        className={`block text-sm font-medium ${on ? 'text-[#FFD700]' : 'text-white'}`}
                      >
                        {item.label}
                      </span>
                      <span className="mt-0.5 block text-[11px] leading-tight text-neutral-500">
                        {item.hint}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
              {whoami}
              {signOutButton(
                'shrink-0 rounded-lg border border-red-500/40 px-3 py-2 text-sm font-medium text-red-300 transition hover:bg-red-500/10 disabled:opacity-50',
              )}
            </div>
          </nav>
        )}
      </div>
    </>
  );
}
