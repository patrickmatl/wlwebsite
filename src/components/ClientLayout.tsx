'use client';

import dynamic from 'next/dynamic';

// Dynamically import the cursor to avoid hydration issues
const CustomCursor = dynamic(() => import('@/components/CustomCursor'), {
  ssr: false // Disable SSR for the cursor
});

export default function ClientLayout({
  children,
  spaceGrotesk,
  syne,
}: {
  children: React.ReactNode;
  spaceGrotesk: { variable: string };
  syne: { variable: string };
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${spaceGrotesk.variable} ${syne.variable} font-sans antialiased`}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
