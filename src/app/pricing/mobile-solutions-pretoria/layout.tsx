import React from 'react';
import type { Metadata } from 'next';
import { sharedViewport } from '@/app/shared-metadata';

export const viewport = sharedViewport;

export const metadata: Metadata = {
  title: 'Mobile Solutions Pricing Pretoria',
  description: 'Mobile app development pricing from WL CreationX in Pretoria. Native and cross-platform mobile solutions for business, quoted with clear, transparent costs.',
  alternates: {
    canonical: 'https://wlcreationx.co.za/pricing/mobile-solutions-pretoria',
  },
  openGraph: {
    title: 'Mobile Solutions Pricing Pretoria',
    description: 'Mobile app development pricing from WL CreationX in Pretoria. Native and cross-platform mobile solutions for business, quoted with clear, transparent costs.',
    url: 'https://wlcreationx.co.za/pricing/mobile-solutions-pretoria',
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

export default function MobileSolutionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
