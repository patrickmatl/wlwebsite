/** @type {import('next').NextConfig} */
const nextConfig = {
  // @react-pdf ships ESM subpath exports that Next's bundler mangles. Left
  // external, Node loads it directly and the PDF renderer works in the
  // serverless function.
  serverExternalPackages: ['@react-pdf/renderer'],
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
  // NOT 'standalone'. Next's standalone tracer cannot copy the client-reference
  // manifest for a page that sits directly inside a route group — the brackets
  // in `app/studio/(admin)/page.tsx` break the copy and the whole build fails.
  // Vercel packages its own output, and Railway/Node run fine on `next start`,
  // so standalone buys nothing here and costs a broken deploy.
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

      /*
       * LEGACY URL RECOVERY.
       *
       * Search Console still holds URLs from the pre-remediation site — it
       * reported /services/branding and /blog/digital-marketing-south-africa
       * as "Excluded by noindex", and /locations/ekurhuleni/packaging-design-company
       * and /locations/boksburg/website-design-company as 404s. Those are the
       * old cloaked doorway patterns. Any residual links pointing at them
       * currently die on a 404; these 308s route them to the closest real page
       * so the equity lands somewhere useful instead of being lost.
       *
       * Ordering matters: specific rules first, wildcards last.
       */
      // Old /services/* pages -> their real equivalents
      { source: '/services/branding', destination: '/branding-solutions-pretoria', permanent: true },
      { source: '/services/logo-design', destination: '/pricing/graphic-design-pretoria', permanent: true },
      { source: '/services/graphic-design', destination: '/pricing/graphic-design-pretoria', permanent: true },
      { source: '/services/web-design', destination: '/pricing/website-design-pretoria', permanent: true },
      { source: '/services/website-design', destination: '/pricing/website-design-pretoria', permanent: true },
      { source: '/services/packaging-design', destination: '/pricing/packaging-design-pretoria', permanent: true },
      { source: '/services/photography', destination: '/photography-services-pretoria', permanent: true },
      { source: '/services/video', destination: '/videography-services-pretoria', permanent: true },
      { source: '/services/digital-marketing', destination: '/digital-marketing-services-pretoria', permanent: true },
      { source: '/services/seo', destination: '/pricing/seo-pretoria', permanent: true },
      { source: '/services', destination: '/pricing', permanent: true },
      { source: '/services/:slug*', destination: '/pricing', permanent: true },

      // Old /blog/* -> the real blog route
      { source: '/blog', destination: '/creative-industry-blog-pretoria', permanent: true },
      { source: '/blog/:slug*', destination: '/creative-industry-blog-pretoria', permanent: true },

      // Old cloaked doorway pattern /locations/{city}/{service}-company
      { source: '/locations', destination: '/service-areas-pretoria', permanent: true },
      { source: '/locations/:city', destination: '/service-areas-pretoria', permanent: true },
      { source: '/locations/:city/:service*', destination: '/service-areas-pretoria', permanent: true },

      // Other legacy top-level URLs that were linked across the old site
      { source: '/about', destination: '/about-graphic-design-company-pretoria', permanent: true },
      { source: '/about-us', destination: '/about-graphic-design-company-pretoria', permanent: true },
      { source: '/contact', destination: '/get-in-touch-pretoria', permanent: true },
      { source: '/contact-us', destination: '/get-in-touch-pretoria', permanent: true },
      { source: '/portfolio', destination: '/project-showcase-pretoria', permanent: true },
      { source: '/portfolio/:slug*', destination: '/project-showcase-pretoria', permanent: true },
      { source: '/case-studies', destination: '/project-showcase-pretoria', permanent: true },
      { source: '/case-studies/:slug*', destination: '/project-showcase-pretoria', permanent: true },
      { source: '/privacy-policy', destination: '/data-protection-policy-pretoria', permanent: true },
      { source: '/terms', destination: '/legal-terms-pretoria', permanent: true },
      { source: '/terms-of-service', destination: '/legal-terms-pretoria', permanent: true },
    ];
  }
};

module.exports = nextConfig;
