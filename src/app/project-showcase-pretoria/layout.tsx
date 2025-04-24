import React from 'react';
import type { Metadata } from 'next';
import { sharedViewport } from '../shared-metadata';

export const viewport = sharedViewport;

export const metadata: Metadata = {
  title: 'Portfolio | WL Creationx',
  description: 'Explore our portfolio of successful digital projects. Web design, development, and digital marketing case studies from South Africa.',
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
  // Removed Breadcrumb and Head imports, and Breadcrumb/Head usage since handled globally
  return <>{children}</>;
}
