import React from 'react';
import type { Metadata } from 'next';
import { sharedViewport } from '@/app/shared-metadata';

export const viewport = sharedViewport;

const TITLE = 'Logo Design Pretoria | From R2,080, 2 Revisions Included';
const DESCRIPTION =
  'Logo design in Pretoria from R2,080 for two concepts, R3,120 for four, R4,160 for six. Two revision rounds included, print-ready files, and you own the artwork outright.';
const URL = 'https://wlcreationx.co.za/logo-design-pretoria';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: 'WL CreationX',
    locale: 'en_ZA',
    type: 'website',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function LogoDesignLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
