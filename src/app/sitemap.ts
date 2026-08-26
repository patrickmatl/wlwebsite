import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import { regions } from '@/data/regions';
import { services } from '@/data/services';
import { isIndexableServiceArea } from '@/data/service-areas';

/**
 * Single source of truth for the sitemap.
 *
 * The previous version emitted /services/{slug}, /locations/{slug} and
 * /locations/{slug}/{service} URLs. None of those routes exist in this app -
 * the real dynamic route is /[city]/[service] - so the sitemap was handing
 * Google several hundred 404s and burning crawl budget on them.
 *
 * Every URL below is checked against a real route. If you add a page, add it
 * here too.
 */

const BASE_URL = 'https://wlcreationx.co.za';

// Top-level pages, highest priority first.
const CORE_ROUTES: Array<[string, number, MetadataRoute.Sitemap[number]['changeFrequency']]> = [
  ['/', 1.0, 'daily'],
  ['/pricing', 0.9, 'weekly'],
  // The one commercial term within reach: position 15 with no page until now.
  ['/logo-design-pretoria', 0.9, 'weekly'],
  ['/project-showcase-pretoria', 0.9, 'weekly'],
  ['/videography-services-pretoria', 0.9, 'weekly'],
  ['/photography-services-pretoria', 0.9, 'weekly'],
  ['/branding-solutions-pretoria', 0.85, 'weekly'],
  ['/visual-communication-services-pretoria', 0.85, 'weekly'],
  ['/digital-marketing-services-pretoria', 0.85, 'weekly'],
  ['/service-bundles-pretoria', 0.8, 'weekly'],
  ['/about-graphic-design-company-pretoria', 0.8, 'monthly'],
  ['/get-in-touch-pretoria', 0.8, 'monthly'],
  ['/service-areas-pretoria', 0.75, 'weekly'],
  ['/creative-industry-blog-pretoria', 0.75, 'weekly'],
  ['/join-our-team-pretoria', 0.5, 'monthly'],
  ['/creative-industry-blog-pretoria/the-history-of-graphic-design-in-south-africa', 0.6, 'monthly'],
  ['/legal-terms-pretoria', 0.3, 'yearly'],
  ['/data-protection-policy-pretoria', 0.3, 'yearly'],
  ['/website-cookie-guidelines-pretoria', 0.3, 'yearly'],
];

// /pricing/* service pages that exist on disk.
const PRICING_SLUGS = [
  'website-design-pretoria',
  'graphic-design-pretoria',
  'ecommerce-pretoria',
  'mobile-solutions-pretoria',
  'custom-development-pretoria',
  'website-maintenance-pretoria',
  'packaging-design-pretoria',
  'print-design-pretoria',
  'marketing-materials-pretoria',
  'seo-pretoria',
  'google-ads-pretoria',
  'social-media-pretoria',
  'email-marketing-pretoria',
  'content-marketing-pretoria',
  'photography-pretoria',
  'product-photography-pretoria',
  'corporate-video-pretoria',
  'drone-video-pretoria',
  'annual-report-design-and-print-pretoria',
  'copywriting-services-pretoria-johannesburg',
  'copy-editing-services-pretoria-johannesburg',
  'transcription-services-pretoria-johannesburg',
  // NOTE: the old thin duplicates (event-branding-pretoria,
  // infographic-design-pretoria, interactive-digital-publication(s)-...,
  // internal-communications-pretoria, investor-relations-pretoria,
  // presentation-design-pretoria, sustainability-esg-reports-pretoria and the
  // top-level annual-report page) now 301-redirect to the canonical versions
  // below, so they must NOT appear in the sitemap.
  'event-branding-design-pretoria',
  'infographic-data-visualization-design-pretoria',
  'interactive-digital-publication-interactive-pdf-design-pretoria',
  'internal-communications-design-pretoria',
  'investor-relations-material-design-services-pretoria',
  'presentation-design-services-pretoria',
  'sustainability-esg-report-design-services-pretoria',
];

/** Blog post slugs read from the MDX content directory, so new posts are
 *  picked up automatically. */
function blogSlugs(): string[] {
  try {
    return fs
      .readdirSync(path.join(process.cwd(), 'src/content/blog'))
      .filter((f) => f.endsWith('.mdx'))
      .map((f) => f.replace(/\.mdx$/, ''));
  } catch {
    return [];
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date().toISOString();
  const routes: MetadataRoute.Sitemap = [];

  for (const [path, priority, changeFrequency] of CORE_ROUTES) {
    routes.push({ url: `${BASE_URL}${path}`, lastModified, changeFrequency, priority });
  }

  for (const slug of PRICING_SLUGS) {
    routes.push({
      url: `${BASE_URL}/pricing/${slug}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  // Blog posts.
  for (const slug of blogSlugs()) {
    routes.push({
      url: `${BASE_URL}/creative-industry-blog-pretoria/${slug}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  }

  // /service-areas-pretoria/[locationId] - real route, driven by regions data.
  for (const region of regions) {
    for (const location of region.locations) {
      routes.push({
        url: `${BASE_URL}/service-areas-pretoria/${location.slug}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  // /[city]/[service] - real route. Only emit combinations the route will
  // actually resolve, i.e. a known location slug paired with a known service
  // slug. Sublocations are included because findLocation() resolves them.
  for (const region of regions) {
    for (const location of region.locations) {
      const citySlugs = [location.slug, ...(location.subLocations?.map((s) => s.slug) ?? [])];
      for (const city of citySlugs) {
        // A sitemap is a list of pages worth indexing, and the templated city
        // pages outside the studio's real service area are not. They carry a
        // noindex for the same reason; listing them here would only contradict
        // it and spend crawl budget on thirty-five near-duplicates.
        if (!isIndexableServiceArea(city)) continue;
        for (const service of services) {
          routes.push({
            url: `${BASE_URL}/${city}/${service.slug}`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.5,
          });
        }
      }
    }
  }

  return routes;
}
