import React from 'react';
import type { Metadata } from 'next';
import { sharedViewport } from '@/app/shared-metadata';

export const viewport = sharedViewport;

export const metadata: Metadata = {
  title: 'Print Design Pricing Pretoria',
  description: 'Print design pricing from WL CreationX in Pretoria. Brochures, posters, business cards and print-ready artwork with itemised, transparent package rates.',
  alternates: {
    canonical: 'https://wlcreationx.co.za/pricing/print-design-pretoria',
  },
  openGraph: {
    title: 'Print Design Pricing Pretoria',
    description: 'Print design pricing from WL CreationX in Pretoria. Brochures, posters, business cards and print-ready artwork with itemised, transparent package rates.',
    url: 'https://wlcreationx.co.za/pricing/print-design-pretoria',
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

export default function PrintDesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
