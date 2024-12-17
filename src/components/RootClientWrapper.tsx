'use client';

import dynamic from 'next/dynamic';
import Navigation from './Navigation/Navigation';
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
  return (
    <PerformanceOptimizer>
      <div className={`${spaceGrotesk.variable} ${syne.variable}`}>
        <CustomCursor />
        <Navigation />
        {children}
      </div>
    </PerformanceOptimizer>
  );
}
