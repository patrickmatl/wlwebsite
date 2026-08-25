import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Transcription Services Pretoria & Johannesburg',
  description: 'Human transcription services for Pretoria and Johannesburg from R250. Accurate, confidential transcripts with timestamps, speaker labels and fast turnaround.',
  alternates: { canonical: 'https://wlcreationx.co.za/pricing/transcription-services-pretoria-johannesburg' },
  openGraph: {
    title: 'Transcription Services Pretoria & Johannesburg',
    description: 'Human transcription services for Pretoria and Johannesburg from R250. Accurate, confidential transcripts with timestamps, speaker labels and fast turnaround.',
    url: 'https://wlcreationx.co.za/pricing/transcription-services-pretoria-johannesburg',
    siteName: 'WL CreationX',
    locale: 'en_ZA',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'WL CreationX — Graphic Design Company in Pretoria' }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
