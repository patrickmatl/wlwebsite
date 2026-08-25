import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Content Marketing Pricing Pretoria',
  description: 'SEO content marketing packages for Pretoria businesses from R3,850/month. Blog writing, keyword research, content strategy and monthly performance reports.',
  alternates: { canonical: 'https://wlcreationx.co.za/pricing/content-marketing-pretoria' },
  openGraph: {
    title: 'Content Marketing Pricing Pretoria',
    description: 'SEO content marketing packages for Pretoria businesses from R3,850/month. Blog writing, keyword research, content strategy and monthly performance reports.',
    url: 'https://wlcreationx.co.za/pricing/content-marketing-pretoria',
    siteName: 'WL CreationX',
    locale: 'en_ZA',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'WL CreationX — Graphic Design Company in Pretoria' }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
