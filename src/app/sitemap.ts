import { MetadataRoute } from 'next';
import { regions } from '@/data/regions';
import { services } from '@/data/services';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://wlcreationx.co.za';
  const currentDate = new Date().toISOString();

  // Core pages with high priority
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8
    }
  ];

  // Service pages
  services.forEach(service => {
    routes.push({
      url: `${baseUrl}/services/${service.slug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8
    });
  });

  // Location pages
  regions.forEach(region => {
    region.locations.forEach(location => {
      // Main location page
      routes.push({
        url: `${baseUrl}/locations/${location.slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.8
      });

      // Service variations for each location
      [
        'graphic-design-company',
        'website-design-company',
        'branding-agency',
        'logo-design-company',
        'packaging-design-company'
      ].forEach(serviceSlug => {
        routes.push({
          url: `${baseUrl}/locations/${location.slug}/${serviceSlug}`,
          lastModified: currentDate,
          changeFrequency: 'weekly',
          priority: 0.7
        });
      });

      // Sublocation pages
      location.subLocations?.forEach(sublocation => {
        routes.push({
          url: `${baseUrl}/locations/${sublocation.slug}`,
          lastModified: currentDate,
          changeFrequency: 'weekly',
          priority: 0.7
        });

        // Service variations for each sublocation
        [
          'graphic-design-company',
          'website-design-company',
          'branding-agency',
          'logo-design-company',
          'packaging-design-company'
        ].forEach(serviceSlug => {
          routes.push({
            url: `${baseUrl}/locations/${sublocation.slug}/${serviceSlug}`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.6
          });
        });
      });
    });
  });

  // Additional pages
  const additionalPages = [
    { path: '/blog', priority: 0.8, changeFrequency: 'daily' as const },
    { path: '/pricing', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/careers', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/brand-identity-packages', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/packages', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/privacy-policy', priority: 0.4, changeFrequency: 'yearly' as const },
    { path: '/terms', priority: 0.4, changeFrequency: 'yearly' as const },
    { path: '/cookie-policy', priority: 0.4, changeFrequency: 'yearly' as const }
  ];

  additionalPages.forEach(page => {
    routes.push({
      url: `${baseUrl}${page.path}`,
      lastModified: currentDate,
      changeFrequency: page.changeFrequency,
      priority: page.priority
    });
  });

  return routes;
}
