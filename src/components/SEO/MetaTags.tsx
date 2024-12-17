'use client';

import Head from 'next/head';

interface MetaTagsProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
}

export default function MetaTags({
  title = 'Graphic Design Company Pretoria | WL CreationX',
  description = 'Premier graphic design studio in Pretoria. Expert branding, web design, and digital marketing services. Transform your brand with WL CreationX.',
  canonicalUrl = 'https://wlcreationx.co.za',
  ogImage = 'https://wlcreationx.co.za/og-image.jpg'
}: MetaTagsProps) {
  return (
    <Head>
      {/* Performance & Security */}
      <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; font-src 'self' data: https:;" />
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="SAMEORIGIN" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta name="referrer" content="strict-origin-when-cross-origin" />

      {/* PWA Support */}
      <meta name="application-name" content="WL CreationX" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      <meta name="apple-mobile-web-app-title" content="WL CreationX" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content="#000000" />

      {/* Social Media & SEO */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@wlcreationx" />
      <meta name="twitter:creator" content="@wlcreationx" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Location-specific */}
      <meta name="geo.region" content="ZA-GT" />
      <meta name="geo.placename" content="Pretoria" />
      <meta name="geo.position" content="-25.7479;28.2293" />
      <meta name="ICBM" content="-25.7479, 28.2293" />

      {/* Canonical & Language */}
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" href={canonicalUrl} hrefLang="en-za" />
      <link rel="alternate" href={canonicalUrl} hrefLang="x-default" />

      {/* Favicons */}
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Head>
  );
}
