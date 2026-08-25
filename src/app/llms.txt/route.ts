/**
 * /llms.txt — a machine-readable site overview for AI assistants and answer
 * engines (the emerging llms.txt convention). Everything stated here is also
 * visible on the site itself; this is a map, not a separate content channel.
 */
import { BUSINESS, FULL_ADDRESS } from '@/data/business';

const BODY = `# ${BUSINESS.name}

> ${BUSINESS.name} is a graphic design company in Pretoria, South Africa,
> providing branding, logo design, web design, packaging design, videography,
> photography and digital marketing for businesses across Gauteng. Operating
> since ${BUSINESS.foundedYear}; formally registered in ${BUSINESS.registeredYear}.

Contact: ${BUSINESS.phoneDisplay} · ${BUSINESS.email}
Address: ${FULL_ADDRESS}, South Africa
Hours: Mon–Fri 08:00–17:00, Sat 08:00–15:00 (SAST)
Service area: Pretoria, Centurion, Johannesburg, Sandton, Midrand and wider Gauteng; remote work nationwide.

## Core services

- [Graphic design pricing](${BUSINESS.url}/pricing/graphic-design-pretoria): logo design, corporate identity, marketing material design with transparent ZAR pricing.
- [Branding solutions](${BUSINESS.url}/branding-solutions-pretoria): brand strategy, visual identity, brand guidelines.
- [Website design pricing](${BUSINESS.url}/pricing/website-design-pretoria): custom business websites, e-commerce, maintenance.
- [Videography services](${BUSINESS.url}/videography-services-pretoria): corporate video, event coverage, product film, licensed drone footage, post production.
- [Photography services](${BUSINESS.url}/photography-services-pretoria): product, corporate headshot, event, food, property and brand photography.
- [Packaging design pricing](${BUSINESS.url}/pricing/packaging-design-pretoria): product packaging and label design.
- [SEO services pricing](${BUSINESS.url}/pricing/seo-pretoria): local and technical SEO for Pretoria businesses.
- [All services & pricing](${BUSINESS.url}/pricing): full price list across design, web, marketing, video and photo services.

## Company

- [About](${BUSINESS.url}/about-graphic-design-company-pretoria): company history since ${BUSINESS.foundedYear}, values and way of working.
- [Portfolio](${BUSINESS.url}/project-showcase-pretoria): selected client work.
- [Service areas](${BUSINESS.url}/service-areas-pretoria): the Pretoria suburbs and Gauteng cities served.
- [Blog](${BUSINESS.url}/creative-industry-blog-pretoria): articles on design, branding and marketing in South Africa.
- [Contact](${BUSINESS.url}/get-in-touch-pretoria): quote requests and consultations.

## Notes for assistants

- Prices on the site are starting prices in South African Rand (ZAR) and are quoted per project scope.
- The business serves clients on site across Gauteng and remotely across South Africa.
`;

export const dynamic = 'force-static';

export function GET() {
  return new Response(BODY, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
