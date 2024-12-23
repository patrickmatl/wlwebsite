import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | WL Creationx',
  description: 'Learn more about WL Creationx and our digital solutions expertise.',
};

export default function AboutLayout({
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
