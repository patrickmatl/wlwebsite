import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Copywriting Services Pretoria & Joburg',
  description: 'SEO copywriting for web pages, blogs and ads from R300 in Pretoria and Johannesburg. Persuasive, conversion-focused copy with research and revisions.',
  alternates: { canonical: 'https://wlcreationx.co.za/pricing/copywriting-services-pretoria-johannesburg' },
  openGraph: {
    title: 'Copywriting Services Pretoria & Joburg',
    description: 'SEO copywriting for web pages, blogs and ads from R300 in Pretoria and Johannesburg. Persuasive, conversion-focused copy with research and revisions.',
    url: 'https://wlcreationx.co.za/pricing/copywriting-services-pretoria-johannesburg',
    siteName: 'WL CreationX',
    locale: 'en_ZA',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'WL CreationX — Graphic Design Company in Pretoria' }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
