import { Location } from '@/types';

interface LocationSchemaProps {
  location: Location;
  baseUrl?: string; // Add baseUrl as an optional prop
}

export default function LocationSchema({ location, baseUrl = 'https://wlcreationx.co.za' }: LocationSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService', 'DesignAgency'],
    '@id': `${baseUrl}/locations/${location.slug}`,
    name: `WL CreationX - Design Company in ${location.city}`,
    description: `Leading graphic design, website design, branding & packaging design company in ${location.city}. Professional creative solutions for businesses across ${location.region}. Expert design services tailored to your needs.`,
    url: `${baseUrl}/locations/${location.slug}`,
    telephone: location.content?.contact?.phone,
    email: location.content?.contact?.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.content?.contact?.address,
      addressLocality: location.city,
      addressRegion: location.region,
      addressCountry: 'ZA'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: location.content?.coordinates?.latitude || '-26.2041',
      longitude: location.content?.coordinates?.longitude || '28.0473'
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: location.content?.coordinates?.latitude || '-26.2041',
        longitude: location.content?.coordinates?.longitude || '28.0473'
      },
      geoRadius: '50000'
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:00'
    },
    priceRange: 'R$$',
    paymentAccepted: ['Cash', 'Credit Card', 'Bank Transfer'],
    currenciesAccepted: 'ZAR',
    image: [
      `${baseUrl}/images/office.jpg`,
      `${baseUrl}/images/team.jpg`,
      `${baseUrl}/images/work.jpg`
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `Design Services in ${location.city}`,
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: `Graphic Design Services in ${location.city}`,
            description: `Professional graphic design services for businesses in ${location.city}. Logos, brochures, marketing materials, and more.`
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: `Website Design Services in ${location.city}`,
            description: `Custom website design and development for ${location.city} businesses. Responsive, modern, and user-friendly websites.`
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: `Branding Services in ${location.city}`,
            description: `Complete branding solutions for ${location.city} companies. Logo design, brand identity, and corporate branding.`
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: `Packaging Design Services in ${location.city}`,
            description: `Creative packaging and label design for ${location.city} products. Stand out on the shelf with professional packaging design.`
          }
        }
      ]
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '89',
      bestRating: '5',
      worstRating: '1'
    },
    review: location.content?.testimonials?.map(testimonial => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: testimonial.client
      },
      reviewBody: testimonial.content,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: testimonial.rating,
        bestRating: '5',
        worstRating: '1'
      },
      publisher: {
        '@type': 'Organization',
        name: testimonial.company
      }
    })),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/locations/${location.slug}`
    },
    sameAs: [
      'https://www.facebook.com/wlcreationx',
      'https://www.instagram.com/wlcreationx',
      'https://www.linkedin.com/company/wlcreationx',
      'https://twitter.com/wlcreationx'
    ],
    faqPage: {
      '@type': 'FAQPage',
      mainEntity: location.content?.faqs?.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    },
    potentialAction: [
      {
        '@type': 'ReserveAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${baseUrl}/book-consultation`,
          actionPlatform: [
            'http://schema.org/DesktopWebPlatform',
            'http://schema.org/MobileWebPlatform'
          ]
        },
        result: {
          '@type': 'Reservation',
          name: 'Design Consultation Booking'
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}