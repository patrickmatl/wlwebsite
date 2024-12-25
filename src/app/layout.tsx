import type { Metadata } from 'next';
import { Space_Grotesk, Syne } from 'next/font/google';
import './globals.css';
import ClientRootWrapper from '@/components/ClientRootWrapper';
import AudioPlayer from '@/components/AudioPlayer';
import Footer from '@/components/Footer';

// Configure fonts
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

const syne = Syne({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-syne',
});

export const metadata: Metadata = {
  title: 'WL CreationX - Design Agency in Pretoria, South Africa',
  description: 'Transforming brands through creative excellence. Your trusted design partner in South Africa.',
  keywords: 'design agency, graphic design, web design, branding, Pretoria, South Africa',
  openGraph: {
    title: 'WL CreationX - Design Agency in Pretoria',
    description: 'Transforming brands through creative excellence. Your trusted design partner in South Africa.',
    type: 'website',
    locale: 'en_ZA',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${syne.variable}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link
          rel="preload"
          href="/fonts/SpaceGrotesk-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Syne-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="/css/070df7d0eda22564.css"
          media="all"
        />
      </head>
      <body className="bg-black text-white font-space-grotesk">
        <ClientRootWrapper>
          <AudioPlayer />
          <main className="flex min-h-[100svh] flex-col bg-[#0A0A0A] text-white">
            {children}
          </main>
          <div className="hidden">
            <Footer />
          </div>
        </ClientRootWrapper>
      </body>
    </html>
  );
}
