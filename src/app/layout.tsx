'use client';

import { Space_Grotesk, Syne } from 'next/font/google';
import { usePathname } from 'next/navigation';
import './globals.css';
import Footer from '@/components/Footer';
import ClientRootWrapper from '@/components/ClientRootWrapper';
import AudioPlayer from '@/components/AudioPlayer';

// Body font
const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  display: 'swap',
});

// Heading font
const syne = Syne({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-syne',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <html lang="en" className={`${spaceGrotesk.className} ${syne.variable}`}>
      <head>
        <title>Graphic Design Company | Graphic Design Agency Pretoria</title>
        <meta name="description" content="Top graphic design company and agency in Pretoria. Professional branding, web design, and creative solutions for businesses. Contact us for expert design services." />
      </head>
      <body className="bg-black text-white">
        <ClientRootWrapper>
          <AudioPlayer />
          <main className="flex min-h-[100svh] flex-col bg-[#0A0A0A] text-white font-space-grotesk overflow-x-hidden">
            {children}
          </main>
          {!isHomePage && <Footer />}
        </ClientRootWrapper>
      </body>
    </html>
  );
}
