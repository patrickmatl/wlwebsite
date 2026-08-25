import React from 'react';
import type { Metadata } from 'next';
import { sharedViewport } from '@/app/shared-metadata';

export const viewport = sharedViewport;

export const metadata: Metadata = {
  title: 'Packaging Design Pricing Pretoria',
  description: 'Packaging design pricing from WL CreationX in Pretoria. Product packaging, label and box design packages for local brands with clear, upfront design rates.',
  alternates: {
    canonical: 'https://wlcreationx.co.za/pricing/packaging-design-pretoria',
  },
  openGraph: {
    title: 'Packaging Design Pricing Pretoria',
    description: 'Packaging design pricing from WL CreationX in Pretoria. Product packaging, label and box design packages for local brands with clear, upfront design rates.',
    url: 'https://wlcreationx.co.za/pricing/packaging-design-pretoria',
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

export default function PackagingDesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
