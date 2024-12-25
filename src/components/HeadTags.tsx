'use client';

import Script from 'next/script';

export default function HeadTags() {
  return (
    <>
      {/* Preload critical assets */}
      <link
        rel="preload"
        href="/videos/hero-bg.mp4"
        as="video"
        type="video/mp4"
      />
      
      {/* Preload critical fonts */}
      <link
        rel="preload"
        href="/fonts/syne.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      
      {/* Preload critical JS */}
      <Script
        src="/js/main.js"
        strategy="beforeInteractive"
        key="main-js"
      />
      
      {/* Defer non-critical CSS */}
      <link
        rel="stylesheet"
        href="/css/070df7d0eda22564.css"
        media="print"
        onLoad="this.media='all'"
      />
    </>
  );
}
