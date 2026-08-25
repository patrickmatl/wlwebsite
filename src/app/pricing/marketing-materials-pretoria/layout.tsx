import React from 'react';
import type { Metadata } from 'next';
import { sharedViewport } from '@/app/shared-metadata';

export const viewport = sharedViewport;

export const metadata: Metadata = {
  title: 'Marketing Materials Pricing Pretoria',
  description: 'Marketing material design pricing from WL CreationX in Pretoria. Brochures, flyers, business cards and branded collateral with clear per-item design rates.',
  alternates: {
    canonical: 'https://wlcreationx.co.za/pricing/marketing-materials-pretoria',
  },
  openGraph: {
    title: 'Marketing Materials Pricing Pretoria',
    description: 'Marketing material design pricing from WL CreationX in Pretoria. Brochures, flyers, business cards and branded collateral with clear per-item design rates.',
    url: 'https://wlcreationx.co.za/pricing/marketing-materials-pretoria',
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

export default function MarketingMaterialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
