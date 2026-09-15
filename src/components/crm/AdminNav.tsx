'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState, type FormEvent, type RefObject } from 'react';

/**
 * Studio navigation — one list of destinations, two presentations.
 *
 * On a wide screen it is a fixed rail down the left. On a phone it is a sticky
 * bar with a sheet behind a Menu button. Patrick runs this business from his
 * phone as much as from a desk, and ten destinations in a horizontally
 * scrolling strip means hunting by swipe: the sheet puts every section two taps
 * away and keeps the current one named in the bar the whole time.
 *
 * Above the sections, in both presentations, sits one search box. Before it,
 * finding a record meant knowing which list it lived in — was that R4,800 a
 * quote or already an invoice? — and getting it wrong cost two more page loads.
 * The box asks nothing: type a name, a number, part of either, and the answer
 * comes back grouped.
 */

type NavItem = { href: string; label: string; hint: string };

const NAV: NavItem[] = [
  { href: '/studio/dashboard', label: 'Dashboard', hint: 'Where the studio stands' },
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
  // /studio redirects here, so treat both as the dashboard being active.
  if (href === '/studio/dashboard') return pathname === '/studio' || pathname === '/studio/dashboard';
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
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [term, setTerm] = useState('');
  const railSearch = useRef<HTMLInputElement | null>(null);

  const current = NAV.find((item) => isActive(pathname, item.href)) ?? NAV[0];

  // Following a link inside the sheet navigates without unmounting this
  // component, so the route change itself has to close the sheet.
  useEffect(() => {
    setMenuOpen(false);
    // A term left sitting in the box after you have moved on reads like a
    // filter that is still applied. On the results page it is exactly right,
    // so it stays there and nowhere else.
    if (pathname !== '/studio/search') setTerm('');
  }, [pathname]);

  // "/" jumps to the box from anywhere, as it does in most tools with a search.
  // Ignored while a field already has focus, or it would eat every slash typed
  // into a URL or a date.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== '/' || event.metaKey || event.ctrlKey || event.altKey) return;
      const el = event.target as HTMLElement | null;
      const tag = el?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el?.isContentEditable) return;
      if (!railSearch.current) return;
      event.preventDefault();
      railSearch.current.focus();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

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

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const q = term.trim();
    if (!q) return;
    setMenuOpen(false);
    router.push(`/studio/search?q=${encodeURIComponent(q)}`);
  }

  /**
   * The same box twice, once in the rail and once in the sheet.
   *
   * It keeps `action` and `method` so that it still works as an ordinary GET
   * form if the JavaScript has not loaded yet — the studio is used on hotel
   * wifi and on a phone with one bar, and a search box that does nothing for
   * the first second is worse than a slower one that always works.
   */
  const searchForm = (opts: {
    id: string;
    ref?: RefObject<HTMLInputElement | null>;
    className?: string;
  }) => (
    <form
      role="search"
      action="/studio/search"
      method="get"
      onSubmit={submitSearch}
      className={opts.className}
    >
      <label className="sr-only" htmlFor={opts.id}>
        Search the studio
      </label>
      <div className="relative">
        <input
          id={opts.id}
          ref={opts.ref}
          type="search"
          name="q"
          value={term}
          onChange={(event) => setTerm(event.target.value)}
          placeholder="Search clients, quotes, invoices"
          className="w-full rounded-lg border border-white/15 bg-white/[0.03] py-2 pl-3 pr-9 text-sm text-white placeholder:text-neutral-600 focus:border-[#FFD700]/40 focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Search"
          className="absolute inset-y-0 right-0 flex w-9 items-center justify-center text-neutral-500 transition hover:text-[#FFD700]"
        >
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-4 w-4">
            <circle cx="9" cy="9" r="5.25" stroke="currentColor" strokeWidth="1.5" />
            <path d="M13 13l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </form>
  );

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
          <Link href="/studio/dashboard" className="block">
            <span className="font-syne text-lg font-bold text-[#FFD700]">WL CreationX</span>
            <span className="mt-0.5 block text-xs uppercase tracking-widest text-neutral-500">
              Studio
            </span>
          </Link>
        </div>

        <div className="border-b border-white/10 px-3 py-3">
          {searchForm({ id: 'studio-search-rail', ref: railSearch })}
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
          <Link href="/studio/dashboard" className="font-syne text-base font-bold text-[#FFD700]">
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
            {searchForm({ id: 'studio-search-sheet', className: 'mb-4' })}

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
