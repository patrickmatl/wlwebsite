import { StaticImageData } from 'next/image';

export interface FAQ {
  question: string;
  answer: string;
}

export interface LocationContent {
  h1?: string;
  intro?: string;
  aboutArea?: {
    h2: string;
    content: string;
    keyPoints: string[];
    benefits: {
      title: string;
      description: string;
    }[];
  };
  services?: {
    h2: string;
    intro: string;
    list: {
      h3: string;
      content: string;
      features: string[];
      benefits: string[];
    }[];
  };
  process?: {
    h2: string;
    steps: {
      title: string;
      description: string;
    }[];
  };
  industries?: {
    h2: string;
    content: string;
    list: string[];
    descriptions: {
      industry: string;
      description: string;
    }[];
  };
  expertise?: {
    h2: string;
    content: string;
    points: {
      h3: string;
      content: string;
    }[];
  };
  portfolio?: {
    h2: string;
    projects: {
      name: string;
      description: string;
      outcome: string;
      image?: StaticImageData;
    }[];
  };
  pricing?: {
    h2: string;
    packages: {
      name: string;
      description: string;
      features: string[];
      price?: string;
    }[];
  };
  testimonials?: {
    h2: string;
    list: {
      client: string;
      company: string;
      content: string;
      rating: number;
    }[];
  };
  trends?: {
    h2: string;
    list: {
      trend: string;
      description: string;
      implications: string;
    }[];
  };
  contact?: {
    h2?: string;
    phone?: string;
    email?: string;
    address?: string;
    hours?: string;
    cta?: {
      primary: string;
      secondary: string[];
    };
  };
  relatedAreas?: {
    h2: string;
    areas: {
      name: string;
      slug: string;
      description: string;
    }[];
  };
  faq?: {
    h2: string;
    questions: FAQ[];
  };
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  features: string[];
  benefits: string[];
  metaTitle?: string;
  metaDescription?: string;
  content?: {
    intro: string;
    features: string[];
    benefits: string[];
    process: Array<{
      title: string;
      description: string;
    }>;
    faqs: Array<{
      question: string;
      answer: string;
    }>;
  };
}

export interface ServiceVariation {
  slug: string;
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
}

export interface Location {
  id: string;
  slug: string;
  city: string;
  title: string;
  description: string;
  region: string;
  subtitle?: string;
  metaTitle?: string;
  metaDescription?: string;
  areas?: string[];
  serviceAreas?: {
    primary: string[];
    secondary: string[];
  };
  nearbyAreas?: string[];
  content?: {
    h1: string;
    h2: {
      about: string;
      services: string;
      expertise: string;
      process: string;
      industries: string;
      portfolio: string;
      testimonials: string;
      faq: string;
      contact: string;
    };
    intro: string;
    aboutArea: {
      h2: string;
      content: string;
      keyPoints: string[];
      benefits: Array<{
        title: string;
        description: string;
      }>;
    };
    expertise: {
      content: string;
      areas: Array<{
        title: string;
        description: string;
      }>;
    };
    industries: {
      content: string;
      sectors: string[];
      descriptions?: Array<{
        industry: string;
        description: string;
      }>;
    };
    services: {
      h2: string;
      intro: string;
      mainService?: string;
      list: Array<{
        h3: string;
        content: string;
        features: string[];
        benefits: string[];
        slug?: string;
      }>;
    };
    testimonials: Array<{
      client: string;
      company: string;
      content: string;
      rating: number;
    }>;
    faqs: Array<{
      question: string;
      answer: string;
    }>;
    contact: {
      h2: string;
      email: string;
      phone: string;
      address: string;
      hours: string;
      cta: {
        primary: string;
        secondary: Array<{
          url: string;
          text: string;
        }>;
      };
    };
    coordinates?: {
      latitude: string;
      longitude: string;
    };
  };
  subLocations?: Array<{
    name: string;
    slug: string;
    description: string;
  }>;
}

export interface Region {
  id: string;
  name: string;
  locations: Location[];
}
