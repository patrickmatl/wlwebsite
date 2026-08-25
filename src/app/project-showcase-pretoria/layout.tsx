import React from 'react';
import type { Metadata } from 'next';
import { sharedViewport } from '../shared-metadata';

export const viewport = sharedViewport;

const title = 'Design Portfolio Pretoria';
const description =
  'Browse the WL CreationX portfolio: logo design and packaging design projects created in Pretoria for businesses across South Africa since 2013.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: 'https://wlcreationx.co.za/project-showcase-pretoria',
  },
  openGraph: {
    title,
    description,
    url: 'https://wlcreationx.co.za/project-showcase-pretoria',
    siteName: 'WL CreationX',
    locale: 'en_ZA',
    type: 'website',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
