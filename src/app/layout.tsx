import { Space_Grotesk, Syne } from 'next/font/google';
import './globals.css';
import { Metadata } from 'next';
import ClientRootWrapper from '@/components/ClientRootWrapper';
import AudioPlayer from '@/components/AudioPlayer';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Navigation/Breadcrumb';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { Suspense } from 'react';

// Configure fonts
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'WL CreationX - Web Design & Digital Marketing Agency',
  description: 'Professional web design, digital marketing, and graphic design services in South Africa. We help businesses grow their online presence.',
  openGraph: {
    title: 'WL CreationX - Web Design & Digital Marketing Agency',
    description: 'Professional web design, digital marketing, and graphic design services in South Africa. We help businesses grow their online presence.',
    url: 'https://wlcreationx.co.za',
    siteName: 'WL CreationX',
    images: [
      {
        url: 'https://wlcreationx.co.za/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'WL CreationX - Web Design & Digital Marketing Agency',
      },
    ],
    locale: 'en_ZA',
    type: 'website',
  },
  alternates: {
    canonical: 'https://wlcreationx.co.za',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${syne.variable}`} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-site-verification" content="jc8_wF_WjX96VJLj227cbJCEpeseZ-k9U7XSupr4QMw" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </head>
      <body className="bg-black text-white font-space-grotesk" suppressHydrationWarning>
        <ClientRootWrapper>
          <AudioPlayer />
          <BreadcrumbJsonLd />
          <Breadcrumb />
          <div className={`${typeof window !== 'undefined' && window.location.pathname === '/' ? 'h-screen overflow-hidden' : ''}`}>
            <main className="flex min-h-[100svh] flex-col bg-[#0A0A0A] text-white">
              <Suspense fallback={null}>
                {children}
              </Suspense>
            </main>
          </div>
          <div className="hidden">
            <Footer />
          </div>
        </ClientRootWrapper>
      </body>
    </html>
  );
}
