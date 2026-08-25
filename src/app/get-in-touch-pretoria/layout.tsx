import React from 'react';
import type { Metadata } from 'next';
import { sharedViewport } from '../shared-metadata';

export const viewport = sharedViewport;

const pageTitle = 'Contact WL CreationX | Graphic Design Pretoria';
const pageDescription =
  'Contact WL CreationX in Waterkloof Glen, Pretoria for a free consultation and quote on graphic design, branding, and web design. Call, WhatsApp, or send the form.';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: 'https://wlcreationx.co.za/get-in-touch-pretoria',
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: 'https://wlcreationx.co.za/get-in-touch-pretoria',
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

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
