import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Corporate Video Pretoria | Pricing',
  description: 'Corporate video production in Pretoria from R6,500. Scripting, filming, editing, motion graphics and HD/4K delivery, with drone footage on premium shoots.',
  alternates: { canonical: 'https://wlcreationx.co.za/pricing/corporate-video-pretoria' },
  openGraph: {
    title: 'Corporate Video Pretoria | Pricing',
    description: 'Corporate video production in Pretoria from R6,500. Scripting, filming, editing, motion graphics and HD/4K delivery, with drone footage on premium shoots.',
    url: 'https://wlcreationx.co.za/pricing/corporate-video-pretoria',
    siteName: 'WL CreationX',
    locale: 'en_ZA',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'WL CreationX — Graphic Design Company in Pretoria' }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
