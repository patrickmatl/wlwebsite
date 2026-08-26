import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product Photography Pricing Pretoria',
  description: 'Product photography packages in Pretoria from R3,850. White background, lifestyle and e-commerce shots with retouching, high-res files and commercial rights.',
  alternates: { canonical: 'https://wlcreationx.co.za/pricing/product-photography-pretoria' },
  openGraph: {
    title: 'Product Photography Pricing Pretoria',
    description: 'Product photography packages in Pretoria from R3,850. White background, lifestyle and e-commerce shots with retouching, high-res files and commercial rights.',
    url: 'https://wlcreationx.co.za/pricing/product-photography-pretoria',
    siteName: 'WL CreationX',
    locale: 'en_ZA',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'WL CreationX — Graphic Design Company in Pretoria' }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
