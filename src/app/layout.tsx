import type { Metadata } from 'next';
import { Space_Grotesk, Syne } from 'next/font/google';
import './globals.css';
import ClientRootWrapper from '@/components/ClientRootWrapper';
import AudioPlayer from '@/components/AudioPlayer';
import HeadTags from '@/components/HeadTags';
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
        <HeadTags />
      </head>
      <body className="bg-black text-white font-space-grotesk">
        <ClientRootWrapper>
          <AudioPlayer />
          <main className="flex min-h-[100svh] flex-col bg-[#0A0A0A] text-white overflow-x-hidden">
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
