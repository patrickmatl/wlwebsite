import React from 'react';
import { Service } from '@/types';
import { LOCAL_BUSINESS } from '@/data/business';

interface ServiceSchemaProps {
  service: Service;
  location: string;
  baseUrl: string;
}

/**
 * Emits a single, honest schema.org Service node for a digital-marketing
 * service page. The provider is the one real Pretoria business (referenced
 * via the canonical LOCAL_BUSINESS node) — no reviews, ratings, or invented
 * URLs. The OfferCatalog lists only the features actually shown on the page.
 */
export default function ServiceSchema({ service, location, baseUrl }: ServiceSchemaProps) {
  const pageUrl = `${baseUrl}/digital-marketing-services-pretoria/${service.slug}`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: service.title,
    description: service.description,
    serviceType: service.title,
    url: pageUrl,
    provider: LOCAL_BUSINESS,
    areaServed: [
      { '@type': 'City', name: 'Pretoria' },
      { '@type': 'AdministrativeArea', name: 'Gauteng' },
      ...(location && location !== 'Pretoria' && location !== 'Gauteng'
        ? [{ '@type': 'City', name: location }]
        : []),
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service.title} — What's Included`,
      itemListElement: service.features.map((feature) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: feature,
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
