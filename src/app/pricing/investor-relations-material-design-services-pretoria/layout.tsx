import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Investor Relations Material Design Pretoria',
  description: 'Investor relations design in Pretoria from R5,000. Investor decks, shareholder reports and AGM presentations with clear financial data visualization.',
  alternates: { canonical: 'https://wlcreationx.co.za/pricing/investor-relations-material-design-services-pretoria' },
  openGraph: {
    title: 'Investor Relations Material Design Pretoria',
    description: 'Investor relations design in Pretoria from R5,000. Investor decks, shareholder reports and AGM presentations with clear financial data visualization.',
    url: 'https://wlcreationx.co.za/pricing/investor-relations-material-design-services-pretoria',
    siteName: 'WL CreationX',
    locale: 'en_ZA',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'WL CreationX — Graphic Design Company in Pretoria' }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
