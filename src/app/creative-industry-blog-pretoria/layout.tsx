import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Design & Marketing Blog Pretoria',
  description:
    'Practical articles on graphic design, branding, web design and digital marketing from WL CreationX, a Pretoria design agency serving businesses across South Africa.',
  alternates: {
    canonical: 'https://wlcreationx.co.za/creative-industry-blog-pretoria',
  },
  openGraph: {
    title: 'Design & Marketing Blog Pretoria | WL CreationX',
    description:
      'Practical articles on graphic design, branding, web design and digital marketing from WL CreationX, a Pretoria design agency serving businesses across South Africa.',
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
