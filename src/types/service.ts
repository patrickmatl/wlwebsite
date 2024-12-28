export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  metaTitle?: string;
  metaDescription?: string;
  features: string[];
  benefits: string[];
  intro?: string;
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
