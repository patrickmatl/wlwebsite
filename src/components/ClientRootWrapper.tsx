'use client';

import { useEffect, useState } from 'react';

interface ClientRootWrapperProps {
  children: React.ReactNode;
}

export default function ClientRootWrapper({ children }: ClientRootWrapperProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Only add suppressHydrationWarning when on client
  const props = isClient ? { suppressHydrationWarning: true } : {};

  return <div {...props}>{children}</div>;
}
