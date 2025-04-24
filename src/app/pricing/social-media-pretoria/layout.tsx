import React from 'react';
import type { Metadata } from 'next';
import { sharedViewport } from '@/app/shared-metadata';

export const viewport = sharedViewport;

export const metadata: Metadata = {
  title: 'Social Media Services | WL Creationx',
  description: 'Professional social media management and marketing services to boost your online presence.',
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

export default function SocialMediaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
