'use client';

import Head from 'next/head';

interface MetaTagsProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  type?: string;
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  noindex?: boolean;
}

export default function MetaTags({
  title = 'Graphic Design Company Pretoria | WL CreationX',
  description = 'Premier graphic design studio in Pretoria. Expert branding, web design, and digital marketing services. Transform your brand with WL CreationX.',
  canonicalUrl = 'https://wlcreationx.co.za',
  ogImage = 'https://wlcreationx.co.za/og-image.jpg',
  type = 'website',
  keywords = [
    'graphic design pretoria',
    'web design pretoria',
    'logo design pretoria',
    'branding agency pretoria',
    'digital marketing pretoria',
  ],
  author = 'WL CreationX',
  publishedTime,
  modifiedTime,
  section = 'Design Services',
  noindex = false,
}: MetaTagsProps) {
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={author} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="WL CreationX" />
      <meta property="og:locale" content="en_ZA" />

      {/* Article Specific Tags */}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {section && <meta property="article:section" content={section} />}

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@wlcreationx" />
      <meta name="twitter:creator" content="@wlcreationx" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Geo Tags */}
      <meta name="geo.region" content="ZA-GT" />
      <meta name="geo.placename" content="Pretoria" />
      <meta name="geo.position" content="-25.7479;28.2293" />
      <meta name="ICBM" content="-25.7479, 28.2293" />

      {/* Mobile Specific */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#000000" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />

      {/* Security Headers */}
      <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; font-src 'self' data: https:;" />
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="SAMEORIGIN" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta name="referrer" content="strict-origin-when-cross-origin" />

      {/* Preconnect to Important Origins */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* PWA Support */}
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    </Head>
  );
}
