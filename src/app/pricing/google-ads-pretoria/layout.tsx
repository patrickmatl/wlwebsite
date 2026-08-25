import React from 'react';
import type { Metadata } from 'next';
import { sharedViewport } from '@/app/shared-metadata';

export const viewport = sharedViewport;

export const metadata: Metadata = {
  title: 'Google Ads Management Pricing Pretoria',
  description: 'Google Ads management pricing from WL CreationX in Pretoria. Campaign setup, keyword targeting and monthly optimisation packages with transparent fees.',
  alternates: {
    canonical: 'https://wlcreationx.co.za/pricing/google-ads-pretoria',
  },
  openGraph: {
    title: 'Google Ads Management Pricing Pretoria',
    description: 'Google Ads management pricing from WL CreationX in Pretoria. Campaign setup, keyword targeting and monthly optimisation packages with transparent fees.',
    url: 'https://wlcreationx.co.za/pricing/google-ads-pretoria',
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

export default function GoogleAdsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
