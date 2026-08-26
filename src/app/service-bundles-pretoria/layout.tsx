import React from 'react';
import type { Metadata } from 'next';
import { sharedViewport } from '@/app/shared-metadata';

export const viewport = sharedViewport;

export const metadata: Metadata = {
  title: 'Service Bundles & Packages Pretoria',
  description: 'Bundled design packages from WL CreationX in Pretoria: logo design from R2,080 and custom websites from R8,980, with clear deliverables and delivery times.',
  alternates: {
    canonical: 'https://wlcreationx.co.za/service-bundles-pretoria',
  },
  openGraph: {
    title: 'Service Bundles & Packages Pretoria',
    description: 'Bundled design packages from WL CreationX in Pretoria: logo design from R2,080 and custom websites from R8,980, with clear deliverables and delivery times.',
    url: 'https://wlcreationx.co.za/service-bundles-pretoria',
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

export default function ServiceBundlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
