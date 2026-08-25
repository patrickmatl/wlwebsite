import { Space_Grotesk, Syne } from 'next/font/google';
import './globals.css';
import { Metadata } from 'next';
import { sharedViewport } from './shared-metadata';
import ClientRootWrapper from '@/components/ClientRootWrapper';
import Breadcrumb from '@/components/Navigation/Breadcrumb';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { Suspense } from 'react';
import DeferredUI from '@/components/DeferredUI';
import { BUSINESS, LOCAL_BUSINESS } from '@/data/business';

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

/**
 * IMPORTANT: do NOT add `alternates.canonical` here.
 *
 * A canonical URL set in the root layout is inherited by every page that does
 * not define its own `alternates`. This layout used to set
 * `canonical: 'https://wlcreationx.co.za'`, which told Google that almost
 * every page on the site was a duplicate of the homepage — a plausible
 * contributor to the site-wide ranking collapse. Canonicals belong on each
 * page/layout, pointing at that page's own URL.
 */
export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.url),
  title: {
    default: 'WL CreationX | Graphic Design Company Pretoria',
    template: '%s | WL CreationX',
  },
  description:
    'WL CreationX is a Pretoria graphic design company offering branding, logo design, web design, videography, photography and digital marketing across Gauteng.',
  applicationName: 'WL CreationX',
  openGraph: {
    siteName: 'WL CreationX',
    locale: 'en_ZA',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'WL CreationX — Graphic Design Company in Pretoria',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport = sharedViewport;

// Site-wide entity data: one consistent LocalBusiness/Organization node,
// server-rendered so every crawler (including AI crawlers that don't run JS)
// sees it on every page.
const organizationJsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  ...LOCAL_BUSINESS,
  description:
    'WL CreationX is a graphic design company in Pretoria, South Africa, providing branding, logo design, web design, packaging design, videography, photography and digital marketing services since 2013.',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${syne.variable}`} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="google-site-verification" content="jc8_wF_WjX96VJLj227cbJCEpeseZ-k9U7XSupr4QMw" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        {/** Font preconnects */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-black text-white font-space-grotesk" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: organizationJsonLd }}
        />
        <ClientRootWrapper>
          <BreadcrumbJsonLd />
          <main className="flex min-h-[100svh] flex-col bg-[#0A0A0A] text-white">
            <Suspense fallback={null}>
              {children}
            </Suspense>
          </main>
          {/** Render breadcrumb after main to keep hero first in DOM */}
          <Breadcrumb />
          <DeferredUI />
        </ClientRootWrapper>
      </body>
    </html>
  );
}
