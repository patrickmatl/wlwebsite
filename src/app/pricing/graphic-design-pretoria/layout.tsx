import React from 'react';
import type { Metadata } from 'next';
import { sharedViewport } from '@/app/shared-metadata';

export const viewport = sharedViewport;

export const metadata: Metadata = {
  title: 'Graphic Design Pretoria | Prices from R2,080',
  description: 'Graphic design in Pretoria from R2,080 for a logo. Itemised prices for logos, corporate identity and marketing material, with two revision rounds included.',
  alternates: {
    canonical: 'https://wlcreationx.co.za/pricing/graphic-design-pretoria',
  },
  openGraph: {
    title: 'Graphic Design Pretoria | Prices from R2,080',
    description: 'Graphic design in Pretoria from R2,080 for a logo. Itemised prices for logos, corporate identity and marketing material, with two revision rounds included.',
    url: 'https://wlcreationx.co.za/pricing/graphic-design-pretoria',
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

export default function GraphicDesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
