import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Drone Video Pretoria | Pricing',
  description: 'Licensed drone video packages in Pretoria from R4,500. Cinematic 4K aerial footage, CAA-compliant flights, colour grading and social media edits included.',
  alternates: { canonical: 'https://wlcreationx.co.za/pricing/drone-video-pretoria' },
  openGraph: {
    title: 'Drone Video Pretoria | Pricing',
    description: 'Licensed drone video packages in Pretoria from R4,500. Cinematic 4K aerial footage, CAA-compliant flights, colour grading and social media edits included.',
    url: 'https://wlcreationx.co.za/pricing/drone-video-pretoria',
    siteName: 'WL CreationX',
    locale: 'en_ZA',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'WL CreationX — Graphic Design Company in Pretoria' }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
