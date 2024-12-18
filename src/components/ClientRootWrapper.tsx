'use client';

import { useEffect, useState } from 'react';
import CustomCursor from './CustomCursor';
import Navigation from './Navigation';

interface ClientRootWrapperProps {
  children: React.ReactNode;
}

export default function ClientRootWrapper({ children }: ClientRootWrapperProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <>
      <CustomCursor />
      <Navigation />
      {children}
    </>
  );
}
