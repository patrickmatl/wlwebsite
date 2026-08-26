'use client';

import { useEffect, useState } from 'react';
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
  // The Footer is included here as well as below: it has no browser-only
  // dependencies, and leaving it out meant the site's internal links were
  // absent from the server-rendered HTML entirely.
  if (!mounted) {
    return (
      <AudioPlaybackProvider>
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
