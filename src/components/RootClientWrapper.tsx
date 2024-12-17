'use client';

import dynamic from 'next/dynamic';
import Navigation from './Navigation/Navigation';

// Dynamically import the cursor to avoid hydration issues
const CustomCursor = dynamic(() => import('@/components/CustomCursor'), {
  ssr: false // Disable SSR for the cursor
});

export default function RootClientWrapper({
  children,
  spaceGrotesk,
  syne,
}: {
  children: React.ReactNode;
  spaceGrotesk: { variable: string };
  syne: { variable: string };
}) {
  return (
    <div className={`${spaceGrotesk.variable} ${syne.variable}`}>
      <CustomCursor />
      <Navigation />
      {children}
    </div>
  );
}
