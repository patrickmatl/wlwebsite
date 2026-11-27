import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Annual Report Design & Print Pretoria',
  description: 'Annual report design and print in Pretoria: R18 500 for up to 24 pages, R32 000 for 25–48 pages. Financials typeset, infographics and print managed.',
  alternates: { canonical: 'https://wlcreationx.co.za/pricing/annual-report-design-and-print-pretoria' },
  openGraph: {
    title: 'Annual Report Design & Print Pretoria',
    description: 'Annual report design and print in Pretoria: R18 500 for up to 24 pages, R32 000 for 25–48 pages. Financials typeset, infographics and print managed.',
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
