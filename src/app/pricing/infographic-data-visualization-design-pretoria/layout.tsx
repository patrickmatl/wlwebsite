import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Infographic Design Pretoria | Pricing',
  description: 'Custom infographic and data visualization design in Pretoria from R2,800. Branded charts, icons and visuals for reports, marketing and digital content.',
  alternates: { canonical: 'https://wlcreationx.co.za/pricing/infographic-data-visualization-design-pretoria' },
  openGraph: {
    title: 'Infographic Design Pretoria | Pricing',
    description: 'Custom infographic and data visualization design in Pretoria from R2,800. Branded charts, icons and visuals for reports, marketing and digital content.',
    url: 'https://wlcreationx.co.za/pricing/infographic-data-visualization-design-pretoria',
    siteName: 'WL CreationX',
    locale: 'en_ZA',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'WL CreationX — Graphic Design Company in Pretoria' }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
