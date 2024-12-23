import React from 'react';
import type { Metadata } from 'next';

// Base metadata that will be used across all pricing pages
export const metadata: Metadata = {
  title: 'Services & Pricing | WL Creationx',
  description: 'Explore our range of digital services and transparent pricing options.',
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

// Simple layout component without params handling
export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black">
      {children}
    </div>
  );
}
