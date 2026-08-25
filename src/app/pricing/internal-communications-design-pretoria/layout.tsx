import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Internal Communications Design Pretoria',
  description: 'Internal communications design in Pretoria from R1,800. Branded staff newsletters, memos and campaign packs delivered in editable, print-ready formats.',
  alternates: { canonical: 'https://wlcreationx.co.za/pricing/internal-communications-design-pretoria' },
  openGraph: {
    title: 'Internal Communications Design Pretoria',
    description: 'Internal communications design in Pretoria from R1,800. Branded staff newsletters, memos and campaign packs delivered in editable, print-ready formats.',
    url: 'https://wlcreationx.co.za/pricing/internal-communications-design-pretoria',
    siteName: 'WL CreationX',
    locale: 'en_ZA',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'WL CreationX — Graphic Design Company in Pretoria' }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
