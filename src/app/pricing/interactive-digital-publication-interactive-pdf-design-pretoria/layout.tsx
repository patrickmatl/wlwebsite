import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Interactive PDF & Digital Publication Design Pretoria',
  description: 'Interactive PDF and digital publication design in Pretoria from R3,900. Clickable navigation, embedded video and flipbook effects for web and print.',
  alternates: { canonical: 'https://wlcreationx.co.za/pricing/interactive-digital-publication-interactive-pdf-design-pretoria' },
  openGraph: {
    title: 'Interactive PDF & Digital Publication Design Pretoria',
    description: 'Interactive PDF and digital publication design in Pretoria from R3,900. Clickable navigation, embedded video and flipbook effects for web and print.',
    url: 'https://wlcreationx.co.za/pricing/interactive-digital-publication-interactive-pdf-design-pretoria',
    siteName: 'WL CreationX',
    locale: 'en_ZA',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'WL CreationX — Graphic Design Company in Pretoria' }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
