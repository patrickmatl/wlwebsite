'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import MainNav from './Navigation/MainNav';
import PerformanceOptimizer from './Performance/PerformanceOptimizer';

// Dynamically import CustomCursor with no SSR
const CustomCursor = dynamic(() => import('./CustomCursor'), {
  ssr: false
});

interface RootClientWrapperProps {
  children: React.ReactNode;
  spaceGrotesk: { variable: string };
  syne: { variable: string };
}

export default function RootClientWrapper({
  children,
  spaceGrotesk,
  syne,
}: RootClientWrapperProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className={`${spaceGrotesk.variable} ${syne.variable}`}>
        <MainNav />
        {children}
      </div>
    );
  }

  return (
    <PerformanceOptimizer>
      <div className={`${spaceGrotesk.variable} ${syne.variable}`}>
        <CustomCursor />
        <MainNav />
        {children}
      </div>
    </PerformanceOptimizer>
  );
}
