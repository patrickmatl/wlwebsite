import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Photography Pretoria | Commercial Photographer | WL CreationX',
  description:
    'Commercial photography in Pretoria. Product, corporate headshot, event, food and property photography, shot and retouched in-house by WL CreationX. Get a quote.',
  keywords: [
    'photography pretoria',
    'photographer pretoria',
    'commercial photographer pretoria',
    'product photography pretoria',
    'corporate headshots pretoria',
    'event photographer pretoria',
    'food photography pretoria',
    'property photography pretoria',
  ],
  alternates: {
    canonical: 'https://wlcreationx.co.za/photography-services-pretoria',
  },
  openGraph: {
    title: 'Photography Pretoria | Commercial Photographer | WL CreationX',
    description:
      'Product, corporate, event and food photography in Pretoria. Shot and retouched in-house by WL CreationX.',
    url: 'https://wlcreationx.co.za/photography-services-pretoria',
    siteName: 'WL CreationX',
    locale: 'en_ZA',
    type: 'website',
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

export default function PhotographyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
