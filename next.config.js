/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Optimization re-enabled: it was disabled sitewide, serving raw files.
    // On Vercel, next/image serves resized AVIF/WebP from the edge for free
    // at this site's scale (~62 unique source images).
    formats: ['image/avif', 'image/webp'],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[path][name][ext]'
      }
    });
    return config;
  },
  // Handle static file paths
  output: 'standalone',
  poweredByHeader: false,
  reactStrictMode: true,

  /**
   * Permanent (308) redirects for the retired thin-duplicate pages, served as
   * real HTTP redirects at the edge. The page-level redirect() calls remain as
   * a fallback, but statically prerendered pages express those only as a
   * meta-refresh (HTTP 200) — a weaker signal to Google than a real 308.
   */
  async redirects() {
    return [
      { source: '/pricing/event-branding-pretoria', destination: '/pricing/event-branding-design-pretoria', permanent: true },
      { source: '/pricing/infographic-design-pretoria', destination: '/pricing/infographic-data-visualization-design-pretoria', permanent: true },
      { source: '/pricing/interactive-digital-publication-design-pretoria', destination: '/pricing/interactive-digital-publication-interactive-pdf-design-pretoria', permanent: true },
      { source: '/pricing/interactive-digital-publications-pretoria', destination: '/pricing/interactive-digital-publication-interactive-pdf-design-pretoria', permanent: true },
      { source: '/pricing/internal-communications-pretoria', destination: '/pricing/internal-communications-design-pretoria', permanent: true },
      { source: '/pricing/investor-relations-pretoria', destination: '/pricing/investor-relations-material-design-services-pretoria', permanent: true },
      { source: '/pricing/presentation-design-pretoria', destination: '/pricing/presentation-design-services-pretoria', permanent: true },
      { source: '/pricing/sustainability-esg-reports-pretoria', destination: '/pricing/sustainability-esg-report-design-services-pretoria', permanent: true },
      { source: '/annual-report-design-and-print-pretoria', destination: '/pricing/annual-report-design-and-print-pretoria', permanent: true },
    ];
  }
};

module.exports = nextConfig;
