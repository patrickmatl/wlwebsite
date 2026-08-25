import React from 'react';

// Metadata for this route lives in page.tsx (title, description, canonical,
// Open Graph). Keeping it out of the layout avoids conflicting values.
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
