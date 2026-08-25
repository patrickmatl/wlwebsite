import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sustainability & ESG Report Design Pretoria',
  description: 'Sustainability and ESG report design in Pretoria from R7,500. GRI and JSE-aligned layouts, custom infographics and data visuals in print and digital formats.',
  alternates: { canonical: 'https://wlcreationx.co.za/pricing/sustainability-esg-report-design-services-pretoria' },
  openGraph: {
    title: 'Sustainability & ESG Report Design Pretoria',
    description: 'Sustainability and ESG report design in Pretoria from R7,500. GRI and JSE-aligned layouts, custom infographics and data visuals in print and digital formats.',
    url: 'https://wlcreationx.co.za/pricing/sustainability-esg-report-design-services-pretoria',
    siteName: 'WL CreationX',
    locale: 'en_ZA',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'WL CreationX — Graphic Design Company in Pretoria' }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
