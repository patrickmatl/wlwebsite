'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

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
  const [isDesktop, setIsDesktop] = useState(false);  // Default to false to match SSR

  useEffect(() => {
    // Handle hydration mismatch by deferring state updates
    const timer = setTimeout(() => {
      setMounted(true);
      setIsDesktop(window.innerWidth >= 1024);
    }, 0);

    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // During SSR and initial mount, return a minimal layout
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <>
      {isDesktop && mounted && <CustomCursor />}
      {mounted && <Navigation />}
      {children}
      <SchemaOrg />
    </>
  );
}
