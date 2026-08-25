import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Photography Pricing Pretoria',
  description: 'Professional photography packages in Pretoria from R2,500. One-hour to half-day shoots with edited images, online gallery delivery and commercial use rights.',
  alternates: { canonical: 'https://wlcreationx.co.za/pricing/photography-pretoria' },
  openGraph: {
    title: 'Photography Pricing Pretoria',
    description: 'Professional photography packages in Pretoria from R2,500. One-hour to half-day shoots with edited images, online gallery delivery and commercial use rights.',
    url: 'https://wlcreationx.co.za/pricing/photography-pretoria',
    siteName: 'WL CreationX',
    locale: 'en_ZA',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'WL CreationX — Graphic Design Company in Pretoria' }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
