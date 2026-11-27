import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Design & Marketing Blog Pretoria',
  description:
    'Practical guides on graphic design, branding, web design and marketing costs from WL CreationX, a Pretoria design agency working across South Africa.',
  alternates: {
    canonical: 'https://wlcreationx.co.za/creative-industry-blog-pretoria',
  },
  openGraph: {
    title: 'Design & Marketing Blog Pretoria | WL CreationX',
    description:
      'Practical guides on graphic design, branding, web design and marketing costs from WL CreationX, a Pretoria design agency working across South Africa.',
    url: 'https://wlcreationx.co.za/creative-industry-blog-pretoria',
    siteName: 'WL CreationX',
    locale: 'en_ZA',
    type: 'website',
    images: ['/images/og-image.jpg'],
  },
};

export default function BlogLayout({
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
