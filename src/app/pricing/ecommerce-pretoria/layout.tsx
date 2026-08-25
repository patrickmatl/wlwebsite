import React from 'react';
import type { Metadata } from 'next';
import { sharedViewport } from '@/app/shared-metadata';

export const viewport = sharedViewport;

export const metadata: Metadata = {
  title: 'E-commerce Website Pricing Pretoria',
  description: 'E-commerce website development pricing from WL CreationX in Pretoria. Online store builds, payment integration and product setup with clear package costs.',
  alternates: {
    canonical: 'https://wlcreationx.co.za/pricing/ecommerce-pretoria',
  },
  openGraph: {
    title: 'E-commerce Website Pricing Pretoria',
    description: 'E-commerce website development pricing from WL CreationX in Pretoria. Online store builds, payment integration and product setup with clear package costs.',
    url: 'https://wlcreationx.co.za/pricing/ecommerce-pretoria',
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

export default function EcommerceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
