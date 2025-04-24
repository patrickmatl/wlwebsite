import React from 'react';
import type { Metadata } from 'next';
import { sharedViewport } from '../shared-metadata';

export const viewport = sharedViewport;

export const metadata: Metadata = {
  title: 'Contact Us | WL Creationx',
  description: 'Get in touch with WL Creationx for all your digital needs. Professional web design, development, and digital marketing services in South Africa.',
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
