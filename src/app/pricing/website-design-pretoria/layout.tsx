import React from 'react';
import type { Metadata } from 'next';
import { sharedViewport } from '@/app/shared-metadata';

export const viewport = sharedViewport;

export const metadata: Metadata = {
  title: 'Website Design Pretoria | Packages from R8,980',
  description: 'Website design in Pretoria from R8,980 for a three-page site. Fixed prices per page count, mobile-responsive, SEO set up before launch, and you own the files.',
  alternates: {
    canonical: 'https://wlcreationx.co.za/pricing/website-design-pretoria',
  },
  openGraph: {
    title: 'Website Design Pretoria | Packages from R8,980',
    description: 'Website design in Pretoria from R8,980 for a three-page site. Fixed prices per page count, mobile-responsive, SEO set up before launch, and you own the files.',
    url: 'https://wlcreationx.co.za/pricing/website-design-pretoria',
    siteName: 'WL CreationX',
    locale: 'en_ZA',
    type: 'website',
    images: ['/images/og-image.jpg'],
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

export default function WebsiteDesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
