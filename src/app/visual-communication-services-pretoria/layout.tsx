import React from 'react';
import type { Metadata } from 'next';
import { sharedViewport } from '@/app/shared-metadata';

export const viewport = sharedViewport;

export const metadata: Metadata = {
  title: 'Visual Communication Design Pretoria',
  description: 'Visual communication design in Pretoria: corporate identity packs, stationery and marketing design from WL CreationX, with itemised rates in rand.',
  alternates: {
    canonical: 'https://wlcreationx.co.za/visual-communication-services-pretoria',
  },
  openGraph: {
    title: 'Visual Communication Design Pretoria',
    description: 'Visual communication design in Pretoria: corporate identity packs, stationery and marketing design from WL CreationX, with itemised rates in rand.',
    url: 'https://wlcreationx.co.za/visual-communication-services-pretoria',
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

export default function VisualCommunicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
