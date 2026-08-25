import React from 'react';
import type { Metadata } from 'next';
import { sharedViewport } from '@/app/shared-metadata';

export const viewport = sharedViewport;

export const metadata: Metadata = {
  title: 'Website Design Pricing Pretoria',
  description: 'Website design pricing from WL CreationX in Pretoria. Custom, mobile-responsive websites with SEO setup, quoted per page count with transparent rates.',
  alternates: {
    canonical: 'https://wlcreationx.co.za/pricing/website-design-pretoria',
  },
  openGraph: {
    title: 'Website Design Pricing Pretoria',
    description: 'Website design pricing from WL CreationX in Pretoria. Custom, mobile-responsive websites with SEO setup, quoted per page count with transparent rates.',
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
