import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin/', '/*.json$', '/*.xml$'],
    },
    sitemap: 'https://wlcreationx.co.za/sitemap.xml',
    host: 'https://wlcreationx.co.za',
  }
}
