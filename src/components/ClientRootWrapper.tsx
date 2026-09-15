'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import Footer from './Footer';
import { AudioPlaybackProvider } from './AudioContext';

const CustomCursor = dynamic(() => import('./CustomCursor'), {
  ssr: false,
  loading: () => null,
});

// Server-rendered on purpose. With ssr:false the site navigation existed only
// after hydration, so Googlebot's HTML pass — and every AI crawler that does
// not run JavaScript — saw no site structure at all on any of the 69 indexed
// pages. The component reads no browser API during render; its only effect is
// a route-change menu close.
const Navigation = dynamic(() => import('./Navigation'));

interface ClientRootWrapperProps {
  children: React.ReactNode;
}

export default function ClientRootWrapper({ children }: ClientRootWrapperProps) {
  const pathname = usePathname();

  /**
   * The studio and the client portal are applications, not pages of the
   * marketing site, and they carry their own navigation.
   *
   * Rendering the site chrome over them put the marketing nav pill on top of
   * the portal's own tabs and the studio's header — two navigations fighting
   * for the same strip of screen, offering a signed-in client links to
   * "Pricing" and "Portfolio" while covering the tabs they came for. It also
   * dropped the marketing footer, the WhatsApp bubble and a breadcrumb reading
   * "Home Studio Contacts f0e4a7d5-…" underneath every record.
   *
   * The SEO reason the nav is server-rendered at all does not apply here:
   * every route below is noindex, so there is nothing for a crawler to follow.
   */
  const isApp = pathname?.startsWith('/studio') || pathname?.startsWith('/portal');

  const [mounted, setMounted] = useState(false);
  const [hasFinePointer, setHasFinePointer] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Handle hydration mismatch by deferring state updates
    const timer = setTimeout(() => {
      setMounted(true);
      const finePointerMq = window.matchMedia('(pointer: fine)');
      const reducedMotionMq = window.matchMedia('(prefers-reduced-motion: reduce)');
      setHasFinePointer(finePointerMq.matches);
      setPrefersReducedMotion(reducedMotionMq.matches);
    }, 0);

    const handlePointerChange = (e: MediaQueryListEvent) => {
      setHasFinePointer(e.matches);
    };

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    const finePointerMq = window.matchMedia('(pointer: fine)');
    const reducedMotionMq = window.matchMedia('(prefers-reduced-motion: reduce)');
    finePointerMq.addEventListener('change', handlePointerChange);
    reducedMotionMq.addEventListener('change', handleMotionChange);
    
    return () => {
      clearTimeout(timer);
      finePointerMq.removeEventListener('change', handlePointerChange);
      reducedMotionMq.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // During SSR and initial mount, return a minimal layout.
  //
  // The Footer is included here as well as below: it has no browser-only
  // dependencies, and leaving it out meant the site's internal links were
  // absent from the server-rendered HTML entirely.
  //
  // Navigation is here for the same reason, and it is the bigger half of that
  // bug. This branch is what a crawler receives, and until now it contained no
  // navigation at all — so the site's entire internal link graph was whatever
  // the footer happened to list. That is why an audit found the digital
  // marketing page linked from 0 of 65 pages while sitting in the sitemap at
  // priority 0.85.
  //
  // Navigation only needs the browser for its overlay, which is state-driven
  // and starts closed, so rendering it on the server costs nothing and emits
  // the visible desktop nav into the HTML where it can actually be followed.
  // CustomCursor stays out: it genuinely requires pointer APIs.
  if (isApp) {
    return <AudioPlaybackProvider>{children}</AudioPlaybackProvider>;
  }

  if (!mounted) {
    return (
      <AudioPlaybackProvider>
        <Navigation />
        {children}
        <Footer />
      </AudioPlaybackProvider>
    );
  }

  return (
    <AudioPlaybackProvider>
      {hasFinePointer && !prefersReducedMotion && mounted && <CustomCursor />}
      <Navigation />
      {children}
      {/* Visible on every page, homepage included. Previously the homepage got
          only the `hidden` copy in layout.tsx, i.e. links for crawlers only. */}
      <Footer />
    </AudioPlaybackProvider>
  );
}
