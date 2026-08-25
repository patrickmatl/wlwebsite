import React from 'react';
import type { Metadata } from 'next';
import { sharedViewport } from '@/app/shared-metadata';

export const viewport = sharedViewport;

export const metadata: Metadata = {
  title: 'Pricing & Packages',
  description: 'Transparent pricing for graphic design, web design, marketing and creative services from WL CreationX in Pretoria. Compare packages, rates and add-ons.',
  alternates: {
    canonical: 'https://wlcreationx.co.za/pricing',
  },
  openGraph: {
    title: 'Pricing & Packages',
    description: 'Transparent pricing for graphic design, web design, marketing and creative services from WL CreationX in Pretoria. Compare packages, rates and add-ons.',
    url: 'https://wlcreationx.co.za/pricing',
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

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black">
      {children}
    </div>
  );
}
