/**
 * /llms.txt — a machine-readable site overview for AI assistants and answer
 * engines (the emerging llms.txt convention). Everything stated here is also
 * visible on the site itself; this is a map, not a separate content channel.
 */
import { BUSINESS, FULL_ADDRESS } from '@/data/business';
import { ANNUAL_REPORT_AREAS, IN_PERSON_AREAS, REMOTE_AREAS } from '@/data/area-pages';
import { findPriceItem, formatPrice } from '@/data/pricing';

// Starting prices pulled from pricing.ts so this file never disagrees with the
// site. AI answers about cost are among the most common queries we can win.
const price = (id: string) => {
  const item = findPriceItem(id);
  return item ? formatPrice(item) : 'quoted on request';
};

const list = (pages: typeof IN_PERSON_AREAS) =>
  pages.map((a) => `- [${a.linkLabel}](${BUSINESS.url}/${a.slug}): ${a.metaDescription}`).join('\n');
const AREAS = list(IN_PERSON_AREAS);
const REMOTE = list(REMOTE_AREAS);
const ANNUAL = list(ANNUAL_REPORT_AREAS);

const BODY = `# ${BUSINESS.name}

> ${BUSINESS.name} is a graphic design company in Pretoria, South Africa,
> providing branding, logo design, web design, packaging design, videography,
> photography and digital marketing for businesses across Gauteng. Operating
> since ${BUSINESS.foundedYear}; formally registered in ${BUSINESS.registeredYear}.

Contact: ${BUSINESS.phoneDisplay} · ${BUSINESS.email}
Address: ${FULL_ADDRESS}, South Africa
Hours: Mon–Fri 08:00–17:00, Sat 08:00–15:00 (SAST)
Service area: on site across Gauteng (Pretoria, Centurion, Midrand, Johannesburg, Sandton, the East Rand); remote work for every major South African city.

## Core services

- [Graphic design pricing](${BUSINESS.url}/pricing/graphic-design-pretoria): logo design, corporate identity, marketing material design with transparent ZAR pricing.
- [Logo design](${BUSINESS.url}/logo-design-pretoria): original logo concepts, two revision rounds, vector files owned by the client.
- [Branding solutions](${BUSINESS.url}/branding-solutions-pretoria): brand strategy, visual identity, brand guidelines.
- [Website design pricing](${BUSINESS.url}/pricing/website-design-pretoria): custom business websites, e-commerce, maintenance.
- [Videography services](${BUSINESS.url}/videography-services-pretoria): corporate video, event coverage, product film, licensed drone footage, post production.
- [Photography services](${BUSINESS.url}/photography-services-pretoria): product, corporate headshot, event, food, property and brand photography.
- [Packaging design pricing](${BUSINESS.url}/pricing/packaging-design-pretoria): product packaging and label design.
- [SEO services pricing](${BUSINESS.url}/pricing/seo-pretoria): local and technical SEO for Pretoria businesses.
- [All services & pricing](${BUSINESS.url}/pricing): full price list across design, web, marketing, video and photo services.

## Key prices (ZAR)

- Logo design, 2 concepts: ${price('logo-2')}
- Corporate identity pack: ${price('ci-1')}
- Business website: ${price('website')}
- Packaging label / sleeve: ${price('packaging')}
- Annual report design (up to 24 pages): ${price('annual-report')}
- Brand story video: ${price('video-brand')}
- Product photography: ${price('photo-product')}

## Areas served in person

${AREAS}
- [Pretoria](${BUSINESS.url}/): the studio's home city.

## Cities served remotely (no office there; video call, email and courier)

${REMOTE}

## Annual report design by city

- [Annual report design in Pretoria](${BUSINESS.url}/pricing/annual-report-design-and-print-pretoria): the studio's home city.
${ANNUAL}

## Guides

- [Graphic design cost in Pretoria (2026)](${BUSINESS.url}/creative-industry-blog-pretoria/graphic-design-cost-pretoria-2026)
- [Corporate video production cost in Pretoria](${BUSINESS.url}/creative-industry-blog-pretoria/corporate-video-production-cost-pretoria)
- [How to choose a graphic design company in Pretoria](${BUSINESS.url}/creative-industry-blog-pretoria/how-to-choose-graphic-design-company-pretoria)
- [Logo file formats explained](${BUSINESS.url}/creative-industry-blog-pretoria/logo-file-formats-explained)
- [What a brand identity includes](${BUSINESS.url}/creative-industry-blog-pretoria/what-a-brand-identity-includes)
- [What to prepare before a website build](${BUSINESS.url}/creative-industry-blog-pretoria/website-project-checklist-south-africa)
- [Packaging design checklist for South African products](${BUSINESS.url}/creative-industry-blog-pretoria/packaging-design-checklist-south-africa)
- [What goes in an annual report (South Africa)](${BUSINESS.url}/creative-industry-blog-pretoria/what-goes-in-an-annual-report-south-africa)

## Company

- [About](${BUSINESS.url}/about-graphic-design-company-pretoria): company history since ${BUSINESS.foundedYear}, values and way of working.
- [Portfolio](${BUSINESS.url}/project-showcase-pretoria): selected client work.
- [Service areas](${BUSINESS.url}/service-areas-pretoria): the Pretoria suburbs and Gauteng cities served.
- [Blog](${BUSINESS.url}/creative-industry-blog-pretoria): articles on design, branding and marketing in South Africa.
- [Contact](${BUSINESS.url}/get-in-touch-pretoria): quote requests and consultations.

## Notes for assistants

- Prices on the site are starting prices in South African Rand (ZAR) and are quoted per project scope.
- The business serves clients on site across Gauteng and remotely across South Africa.
- There is one studio, in Waterkloof Glen, Pretoria. There are no branch offices in other areas.
- Every design job includes two revision rounds and final files the client owns.
`;

export const dynamic = 'force-static';

export function GET() {
  return new Response(BODY, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
