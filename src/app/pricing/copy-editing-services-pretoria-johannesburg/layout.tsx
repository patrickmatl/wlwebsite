import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Copy Editing Services Pretoria & Joburg',
  description: 'Copy editing from R200 per document for Pretoria and Johannesburg. We polish grammar, clarity, tone and style with tracked changes and revision rounds.',
  alternates: { canonical: 'https://wlcreationx.co.za/pricing/copy-editing-services-pretoria-johannesburg' },
  openGraph: {
    title: 'Copy Editing Services Pretoria & Joburg',
    description: 'Copy editing from R200 per document for Pretoria and Johannesburg. We polish grammar, clarity, tone and style with tracked changes and revision rounds.',
    url: 'https://wlcreationx.co.za/pricing/copy-editing-services-pretoria-johannesburg',
    siteName: 'WL CreationX',
    locale: 'en_ZA',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'WL CreationX — Graphic Design Company in Pretoria' }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
