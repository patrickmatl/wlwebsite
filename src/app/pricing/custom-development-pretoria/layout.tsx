import React from 'react';
import type { Metadata } from 'next';
import { sharedViewport } from '@/app/shared-metadata';

export const viewport = sharedViewport;

export const metadata: Metadata = {
  title: 'Custom Development Pricing Pretoria',
  description: 'Custom software and web application development pricing from WL CreationX in Pretoria. Tailored builds, modern technologies and transparent project quotes.',
  alternates: {
    canonical: 'https://wlcreationx.co.za/pricing/custom-development-pretoria',
  },
  openGraph: {
    title: 'Custom Development Pricing Pretoria',
    description: 'Custom software and web application development pricing from WL CreationX in Pretoria. Tailored builds, modern technologies and transparent project quotes.',
    url: 'https://wlcreationx.co.za/pricing/custom-development-pretoria',
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

export default function CustomDevelopmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
