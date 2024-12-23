// Define base types for Schema.org structures
type WithContext = {
  '@context': 'https://schema.org';
  '@type': string;
};

type SchemaOrganization = WithContext & {
  '@type': 'Organization';
  name: string;
  url: string;
  logo: string;
  sameAs: string[];
};

type SchemaService = WithContext & {
  '@type': 'Service';
  name: string;
  description: string;
  provider: SchemaOrganization;
  areaServed: string;
  offers?: Array<{
    '@type': 'Offer';
    name: string;
    description: string;
    price: string;
    priceCurrency: string;
  }>;
};

type SchemaFAQPage = WithContext & {
  '@type': 'FAQPage';
  mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }>;
};

export type RelatedService = {
  href: string;
  anchor: string;
  title: string;
  description: string;
};

const organization: Omit<SchemaOrganization, '@context'> = {
  '@type': 'Organization',
  name: "WL Creationx",
  url: "https://wlcreationx.co.za",
  logo: "https://wlcreationx.co.za/images/logo.png",
  sameAs: [
    "https://facebook.com/wlcreations",
    "https://instagram.com/wlcreations",
    "https://linkedin.com/company/wlcreations"
  ]
};

export const generateServiceSchema = (
  name: string,
  description: string,
  offers: Array<{ name: string; description: string; price: string }>
): string => {
  const schema: SchemaService = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@context': 'https://schema.org',
      ...organization
    },
    areaServed: "South Africa",
    offers: offers.map(offer => ({
      '@type': 'Offer',
      name: offer.name,
      description: offer.description,
      price: offer.price,
      priceCurrency: 'ZAR'
    }))
  };

  return JSON.stringify(schema);
};

export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>): string => {
  const schema: SchemaFAQPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return JSON.stringify(schema);
};

export const generateBreadcrumbSchema = (items: Array<{ label: string; href: string }>): string => {
  const schema: WithContext & {
    '@type': 'BreadcrumbList';
    itemListElement: Array<{
      '@type': 'ListItem';
      position: number;
      name: string;
      item: string;
    }>;
  } = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `https://wlcreationx.co.za${item.href}`
    }))
  };

  return JSON.stringify(schema);
};
