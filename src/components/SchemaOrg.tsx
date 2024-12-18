'use client';

import Script from 'next/script';

export default function SchemaOrg() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "WL CreationX",
    "description": "Design Agency in Pretoria, South Africa",
    "url": "https://wlcreationx.co.za",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Pretoria",
      "addressCountry": "ZA"
    }
  };

  return (
    <Script 
      id="schema-org" 
      type="application/ld+json"
      strategy="afterInteractive"
    >
      {JSON.stringify(schemaData)}
    </Script>
  );
}
