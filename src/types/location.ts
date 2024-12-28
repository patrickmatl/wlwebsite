export interface Location {
  id: string;
  city: string;
  slug: string;
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  content: {
    about: string;
    services: string[];
    process: string[];
    industries: string[];
    expertise: string[];
    portfolio: Array<{
      title: string;
      description: string;
      image: string;
    }>;
    pricing: Array<{
      title: string;
      price: string;
      features: string[];
    }>;
    testimonials: Array<{
      name: string;
      company: string;
      text: string;
      rating: number;
    }>;
    faq: Array<{
      question: string;
      answer: string;
    }>;
    trends: Array<{
      title: string;
      description: string;
    }>;
    contact: {
      email: string;
      phone: string;
      address: string;
    };
    relatedAreas: string[];
  };
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  features: string[];
  benefits: string[];
}
