import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Videography Pretoria | Video Production Company',
  description:
    'Videography and video production in Pretoria. Corporate video, event coverage, brand films, drone and product video, shot and edited in-house by WL CreationX. Get a quote.',
  keywords: [
    'videography pretoria',
    'video production pretoria',
    'videographer pretoria',
    'corporate video pretoria',
    'event videographer pretoria',
    'drone videography pretoria',
    'video production company pretoria',
    'brand film pretoria',
  ],
  alternates: {
    canonical: 'https://wlcreationx.co.za/videography-services-pretoria',
  },
  openGraph: {
    title: 'Videography Pretoria | Video Production Company | WL CreationX',
    description:
      'Corporate video, event coverage, brand films and drone work in Pretoria. Filmed and edited in-house by WL CreationX.',
    url: 'https://wlcreationx.co.za/videography-services-pretoria',
    siteName: 'WL CreationX',
    locale: 'en_ZA',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'WL CreationX — Graphic Design Company in Pretoria' }],
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

export default function VideographyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
