import React from 'react';
import type { Metadata } from 'next';
import { sharedViewport } from '@/app/shared-metadata';

export const viewport = sharedViewport;

export const metadata: Metadata = {
  title: 'Graphic Design Price List Pretoria',
  description: 'Full graphic design price list from WL CreationX in Pretoria: corporate identity packs, logo design and design services with itemised rates in rand.',
  alternates: {
    canonical: 'https://wlcreationx.co.za/visual-communication-services-pretoria',
  },
  openGraph: {
    title: 'Graphic Design Price List Pretoria',
    description: 'Full graphic design price list from WL CreationX in Pretoria: corporate identity packs, logo design and design services with itemised rates in rand.',
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
