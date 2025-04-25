import { NextResponse } from 'next/server';

const BASE_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

// List your static routes here
const staticRoutes = [
  '',
  'about-graphic-design-company-pretoria',
  'project-showcase-pretoria',
  'get-in-touch-pretoria',
  'pricing',
  'service-areas-pretoria',
  'branding-solutions-pretoria',
  'visual-communication-services-pretoria',
  'service-bundles-pretoria',
  'creative-industry-blog-pretoria',
  'website-cookie-guidelines-pretoria',
  'data-protection-policy-pretoria',
];

// List your main pricing/service slugs here
const pricingSlugs = [
  'website-design-pretoria',
  'graphic-design-pretoria',
  'ecommerce-pretoria',
  'mobile-solutions-pretoria',
  'custom-development-pretoria',
  'packaging-design-pretoria',
  'print-design-pretoria',
  'email-marketing-pretoria',
  'google-ads-pretoria',
  'seo-pretoria',
  'social-media-pretoria',
  'photography-pretoria',
  'product-photography-pretoria',
  'corporate-video-pretoria',
  'drone-video-pretoria',
  'marketing-materials-pretoria',
  'content-marketing-pretoria',
  'copy-editing-services-pretoria-johannesburg',
  'copywriting-services-pretoria-johannesburg',
  'transcription-services-pretoria-johannesburg',
  'annual-report-design-and-print-pretoria',
  'website-maintenance-pretoria',
];

export async function GET() {
  const urls = [
    ...staticRoutes.map((route) => `${BASE_URL}/${route}`),
    ...pricingSlugs.map((slug) => `${BASE_URL}/pricing/${slug}`),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      (url) => `<url><loc>${url.replace(/\/$/, '')}</loc></url>`
    )
    .join('\n  ')}
</urlset>`;

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
