import React from 'react';
import { Service } from '@/types';

interface ServiceSchemaProps {
  service: Service;
  location: string;
  baseUrl: string;
}

export default function ServiceSchema({ service, location, baseUrl }: ServiceSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['Service', 'CreativeWork'],
    '@id': `${baseUrl}/services/${service.slug}`,
    name: service.title,
    description: service.description,
    provider: {
      '@type': 'LocalBusiness',
      name: 'WL CreationX',
      description: `Professional creative agency in ${location}`,
      url: baseUrl,
      areaServed: {
        '@type': 'City',
        name: location
      }
    },
    serviceType: 'Creative Services',
    category: 'Professional Services',
    serviceOutput: [
      ...service.features.map(f => f.toLowerCase()),
      ...service.benefits.map(b => b.toLowerCase())
    ].join(', '),
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'ZAR',
        minPrice: '2500.00'
      },
      areaServed: {
        '@type': 'City',
        name: location
      },
      eligibleRegion: {
        '@type': 'Country',
        name: 'South Africa'
      }
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service.title} Features`,
      itemListElement: service.features.map((feature, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: feature
        },
        position: index + 1
      }))
    },
    termsOfService: `${baseUrl}/terms-of-service`,
    brand: {
      '@type': 'Brand',
      name: 'WL CreationX',
      logo: `${baseUrl}/images/logo.png`
    },
    review: [
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5'
        },
        author: {
          '@type': 'Person',
          name: 'John Smith'
        },
        reviewBody: `Excellent ${service.title.toLowerCase()} service! The team at WL CreationX delivered beyond our expectations.`
      }
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '47',
      bestRating: '5',
      worstRating: '1'
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/services/${service.slug}`
    },
    additionalType: [
      'https://schema.org/ProfessionalService',
      'https://schema.org/CreativeWork'
    ],
    faqPage: {
      '@type': 'FAQPage',
      mainEntity: service.content?.faqs?.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      })) || []
    },
    workExample: [
      {
        '@type': 'CreativeWork',
        name: 'Project Example 1',
        description: 'A showcase of our recent work in this service category',
        image: `${baseUrl}/images/portfolio/example1.jpg`,
        url: `${baseUrl}/portfolio/example1`
      }
    ],
    potentialAction: [
      {
        '@type': 'OrderAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${baseUrl}/quote`,
          actionPlatform: [
            'http://schema.org/DesktopWebPlatform',
            'http://schema.org/MobileWebPlatform'
          ]
        },
        result: {
          '@type': 'Quote',
          name: 'Service Quote'
        }
      }
    ],
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: '-26.2041',
        longitude: '28.0473'
      },
      geoRadius: '50000'
    },
    availableChannel: [
      {
        '@type': 'ServiceChannel',
        name: 'Online Consultation',
        serviceUrl: `${baseUrl}/book-consultation`
      },
      {
        '@type': 'ServiceChannel',
        name: 'Office Visit',
        serviceLocation: {
          '@type': 'Place',
          name: `WL CreationX ${location} Office`
        }
      }
    ],
    isRelatedTo: [
      {
        '@type': 'Service',
        name: 'Brand Strategy',
        url: `${baseUrl}/services/brand-strategy`
      },
      {
        '@type': 'Service',
        name: 'Digital Marketing',
        url: `${baseUrl}/services/digital-marketing`
      }
    ],
    keywords: [
      service.title.toLowerCase(),
      `${location.toLowerCase()} ${service.title.toLowerCase()}`,
      'creative agency',
      'design services',
      'professional services',
      ...service.features.map(f => f.toLowerCase()),
      ...service.benefits.map(b => b.toLowerCase())
    ].join(',')
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
