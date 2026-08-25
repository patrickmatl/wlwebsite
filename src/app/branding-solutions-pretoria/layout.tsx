import React from 'react';
import type { Metadata } from 'next';
import { sharedViewport } from '@/app/shared-metadata';

export const viewport = sharedViewport;

export const metadata: Metadata = {
  title: 'Branding Solutions Pretoria',
  description: 'Brand identity design in Pretoria from WL CreationX. Logo design, corporate identity packs and brand guidelines that give your business a consistent look.',
  alternates: {
    canonical: 'https://wlcreationx.co.za/branding-solutions-pretoria',
  },
  openGraph: {
    title: 'Branding Solutions Pretoria',
    description: 'Brand identity design in Pretoria from WL CreationX. Logo design, corporate identity packs and brand guidelines that give your business a consistent look.',
    url: 'https://wlcreationx.co.za/branding-solutions-pretoria',
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

export default function BrandIdentityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
