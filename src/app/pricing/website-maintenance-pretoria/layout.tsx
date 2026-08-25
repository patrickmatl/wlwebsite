import React from 'react';
import type { Metadata } from 'next';
import { sharedViewport } from '@/app/shared-metadata';

export const viewport = sharedViewport;

export const metadata: Metadata = {
  title: 'Website Maintenance Pricing Pretoria',
  description: 'Website maintenance pricing from WL CreationX in Pretoria. Updates, backups, security and support plans that keep your site fast, secure and up to date.',
  alternates: {
    canonical: 'https://wlcreationx.co.za/pricing/website-maintenance-pretoria',
  },
  openGraph: {
    title: 'Website Maintenance Pricing Pretoria',
    description: 'Website maintenance pricing from WL CreationX in Pretoria. Updates, backups, security and support plans that keep your site fast, secure and up to date.',
    url: 'https://wlcreationx.co.za/pricing/website-maintenance-pretoria',
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

export default function WebsiteMaintenanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
