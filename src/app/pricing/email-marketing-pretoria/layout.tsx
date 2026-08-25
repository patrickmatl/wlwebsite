import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Email Marketing Pricing Pretoria',
  description: 'Email marketing packages for Pretoria businesses from R2,850/month. Campaign design, automation flows, list management, A/B testing and clear analytics.',
  alternates: { canonical: 'https://wlcreationx.co.za/pricing/email-marketing-pretoria' },
  openGraph: {
    title: 'Email Marketing Pricing Pretoria',
    description: 'Email marketing packages for Pretoria businesses from R2,850/month. Campaign design, automation flows, list management, A/B testing and clear analytics.',
    url: 'https://wlcreationx.co.za/pricing/email-marketing-pretoria',
    siteName: 'WL CreationX',
    locale: 'en_ZA',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'WL CreationX — Graphic Design Company in Pretoria' }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
