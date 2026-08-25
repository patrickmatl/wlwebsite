import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SEO Services & Pricing Pretoria',
  description: 'SEO packages in Pretoria from R4,850 per month. Keyword research, on-page and technical SEO, local SEO, link building and monthly performance reporting.',
  alternates: { canonical: 'https://wlcreationx.co.za/pricing/seo-pretoria' },
  openGraph: {
    title: 'SEO Services & Pricing Pretoria',
    description: 'SEO packages in Pretoria from R4,850 per month. Keyword research, on-page and technical SEO, local SEO, link building and monthly performance reporting.',
    url: 'https://wlcreationx.co.za/pricing/seo-pretoria',
    siteName: 'WL CreationX',
    locale: 'en_ZA',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'WL CreationX — Graphic Design Company in Pretoria' }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
