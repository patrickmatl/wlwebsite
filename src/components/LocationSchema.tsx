import { Location } from '@/types';
import { LOCAL_BUSINESS } from '@/data/business';

interface LocationSchemaProps {
  location: Location;
  baseUrl?: string;
}

/**
 * Emits one honest schema.org Service node for a service-area page.
 * WL CreationX has a single office in Pretoria and serves other cities
 * from there (on-site in Gauteng, remote nationwide). The schema shape
 * reflects that: one real Pretoria provider (LOCAL_BUSINESS) with the
 * city as areaServed — never a fabricated local branch, address, phone,
 * rating, or review.
 */
export default function LocationSchema({ location, baseUrl = 'https://wlcreationx.co.za' }: LocationSchemaProps) {
  const pageUrl = `${baseUrl}/service-areas-pretoria/${location.slug}`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: `Graphic Design & Creative Services in ${location.city}`,
    description: `Graphic design, website design, branding and packaging design for ${location.city} businesses, delivered by WL CreationX from our Pretoria studio — on-site across Gauteng and remotely nationwide.`,
    serviceType: 'Graphic design and creative services',
    url: pageUrl,
    provider: LOCAL_BUSINESS,
    areaServed: [
      { '@type': 'City', name: location.city },
      { '@type': 'AdministrativeArea', name: location.region },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `Design Services for ${location.city}`,
      itemListElement: [
        'Graphic Design',
        'Website Design',
        'Branding',
        'Packaging Design',
      ].map((name) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name,
        },
      })),
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
