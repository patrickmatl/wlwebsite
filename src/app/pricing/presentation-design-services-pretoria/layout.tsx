import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Presentation Design Services Pretoria',
  description: 'Presentation design in Pretoria from R3,500. Custom PowerPoint, Keynote and Google Slides decks with branding, infographics and clear data visualisation.',
  alternates: { canonical: 'https://wlcreationx.co.za/pricing/presentation-design-services-pretoria' },
  openGraph: {
    title: 'Presentation Design Services Pretoria',
    description: 'Presentation design in Pretoria from R3,500. Custom PowerPoint, Keynote and Google Slides decks with branding, infographics and clear data visualisation.',
    url: 'https://wlcreationx.co.za/pricing/presentation-design-services-pretoria',
    siteName: 'WL CreationX',
    locale: 'en_ZA',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'WL CreationX — Graphic Design Company in Pretoria' }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
