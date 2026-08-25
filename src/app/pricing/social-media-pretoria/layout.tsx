import React from 'react';
import type { Metadata } from 'next';
import { sharedViewport } from '@/app/shared-metadata';

export const viewport = sharedViewport;

export const metadata: Metadata = {
  title: 'Social Media Management Pricing Pretoria',
  description: 'Social media management pricing from WL CreationX in Pretoria. Content creation, scheduling and channel management packages with clear monthly rates.',
  alternates: {
    canonical: 'https://wlcreationx.co.za/pricing/social-media-pretoria',
  },
  openGraph: {
    title: 'Social Media Management Pricing Pretoria',
    description: 'Social media management pricing from WL CreationX in Pretoria. Content creation, scheduling and channel management packages with clear monthly rates.',
    url: 'https://wlcreationx.co.za/pricing/social-media-pretoria',
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

export default function SocialMediaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
