import React from 'react';
import type { Metadata } from 'next';
import { sharedViewport } from '@/app/shared-metadata';

export const viewport = sharedViewport;

export const metadata: Metadata = {
  title: 'Packaging Design Pretoria | From R4,850',
  description: 'Packaging design in Pretoria: labels from R4,850, cartons R4,850, 3–5 product ranges R9,850. Built on your printer’s dieline, print-ready files you own.',
  alternates: {
    canonical: 'https://wlcreationx.co.za/pricing/packaging-design-pretoria',
  },
  openGraph: {
    title: 'Packaging Design Pretoria | From R4,850',
    description: 'Packaging design in Pretoria: labels from R4,850, cartons R4,850, 3–5 product ranges R9,850. Built on your printer’s dieline, print-ready files you own.',
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
