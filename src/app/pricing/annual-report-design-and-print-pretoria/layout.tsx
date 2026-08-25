import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Annual Report Design & Print Pretoria | Pricing',
  description: 'Professional annual report design and print in Pretoria from R25 000. Layouts up to 200 pages, infographics, premium finishes and reliable delivery.',
  alternates: { canonical: 'https://wlcreationx.co.za/pricing/annual-report-design-and-print-pretoria' },
  openGraph: {
    title: 'Annual Report Design & Print Pretoria | Pricing',
    description: 'Professional annual report design and print in Pretoria from R25 000. Layouts up to 200 pages, infographics, premium finishes and reliable delivery.',
    url: 'https://wlcreationx.co.za/pricing/annual-report-design-and-print-pretoria',
    siteName: 'WL CreationX',
    locale: 'en_ZA',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'WL CreationX — Graphic Design Company in Pretoria' }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
