import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://wlcreationx.co.za'
  
  // Main routes with priorities
  const mainRoutes = [
    {
      route: '',
      priority: 1.0,
      changeFrequency: 'daily' as const,
    },
    {
      route: '/services',
      priority: 0.9,
      changeFrequency: 'weekly' as const,
    },
    {
      route: '/portfolio',
      priority: 0.9,
      changeFrequency: 'weekly' as const,
    },
    {
      route: '/about',
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    },
    {
      route: '/contact',
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    },
    {
      route: '/blog',
      priority: 0.9,
      changeFrequency: 'weekly' as const,
    },
  ]

  // Service pages with specific priorities
  const serviceRoutes = [
    {
      route: '/services/graphic-design',
      priority: 0.9,
      changeFrequency: 'weekly' as const,
    },
    {
      route: '/services/web-design',
      priority: 0.9,
      changeFrequency: 'weekly' as const,
    },
    {
      route: '/services/branding',
      priority: 0.9,
      changeFrequency: 'weekly' as const,
    },
    {
      route: '/services/digital-marketing',
      priority: 0.9,
      changeFrequency: 'weekly' as const,
    },
    {
      route: '/services/ui-ux-design',
      priority: 0.9,
      changeFrequency: 'weekly' as const,
    },
  ]

  // Location-specific pages for local SEO
  const locationRoutes = [
    {
      route: '/locations/pretoria',
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    },
    {
      route: '/locations/pretoria-east',
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    },
    {
      route: '/locations/pretoria-north',
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    },
  ]

  // Combine all routes
  const allRoutes = [...mainRoutes, ...serviceRoutes, ...locationRoutes]

  // Map routes to sitemap format
  const sitemap = allRoutes.map(({ route, priority, changeFrequency }) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency,
    priority,
  }))

  return sitemap
}
