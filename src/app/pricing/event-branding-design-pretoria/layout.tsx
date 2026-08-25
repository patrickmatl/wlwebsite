import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Event Branding Design Pretoria | Pricing',
  description: 'Event branding design in Pretoria from R5,000: event logos, signage, lanyards, digital banners and print-ready collateral for conferences and launches.',
  alternates: { canonical: 'https://wlcreationx.co.za/pricing/event-branding-design-pretoria' },
  openGraph: {
    title: 'Event Branding Design Pretoria | Pricing',
    description: 'Event branding design in Pretoria from R5,000: event logos, signage, lanyards, digital banners and print-ready collateral for conferences and launches.',
    url: 'https://wlcreationx.co.za/pricing/event-branding-design-pretoria',
    siteName: 'WL CreationX',
    locale: 'en_ZA',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'WL CreationX — Graphic Design Company in Pretoria' }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
