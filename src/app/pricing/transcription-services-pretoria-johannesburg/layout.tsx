import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Transcription Services Pretoria & Joburg',
  description: 'Human transcription for Pretoria and Johannesburg from R25 per minute of audio. Accurate, confidential transcripts with timestamps and speaker labels.',
  alternates: { canonical: 'https://wlcreationx.co.za/pricing/transcription-services-pretoria-johannesburg' },
  openGraph: {
    title: 'Transcription Services Pretoria & Joburg',
    description: 'Human transcription for Pretoria and Johannesburg from R25 per minute of audio. Accurate, confidential transcripts with timestamps and speaker labels.',
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
