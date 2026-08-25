'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import Footer from './Footer';
import { AudioPlaybackProvider } from './AudioContext';

const CustomCursor = dynamic(() => import('./CustomCursor'), {
  ssr: false,
  loading: () => null,
});

const Navigation = dynamic(() => import('./Navigation'), {
  ssr: false,
  loading: () => null,
});

const SchemaOrg = dynamic(() => import('./SchemaOrg'), {
  ssr: false,
});

interface ClientRootWrapperProps {
  children: React.ReactNode;
}

export default function ClientRootWrapper({ children }: ClientRootWrapperProps) {
  const [mounted, setMounted] = useState(false);
  const [hasFinePointer, setHasFinePointer] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

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

  // During SSR and initial mount, return a minimal layout
  if (!mounted) {
    return (
      <AudioPlaybackProvider>
        {children}
      </AudioPlaybackProvider>
    );
  }

  return (
    <AudioPlaybackProvider>
      {hasFinePointer && !prefersReducedMotion && mounted && <CustomCursor />}
      {mounted && <Navigation />}
      {children}
      {/* Visible on every page, homepage included. Previously the homepage got
          only the `hidden` copy in layout.tsx, i.e. links for crawlers only. */}
      <Footer />
      <SchemaOrg />
    </AudioPlaybackProvider>
  );
}
