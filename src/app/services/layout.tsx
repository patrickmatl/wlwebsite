import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services | WL Creationx',
  description: 'Explore our comprehensive range of digital services including web design, development, and marketing solutions.',
};

export default function ServicesLayout({
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
