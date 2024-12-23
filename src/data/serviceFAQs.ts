export type FAQ = {
  question: string;
  answer: string;
};

export const serviceFAQs: Record<string, FAQ[]> = {
  'ecommerce': [
    {
      question: "What e-commerce platforms do you support?",
      answer: "We support all major e-commerce platforms including Shopify, WooCommerce, Magento, and custom solutions built with modern frameworks."
    },
    {
      question: "How long does it take to build an e-commerce website?",
      answer: "The timeline varies depending on the complexity of your requirements. A basic e-commerce site can be ready in 4-6 weeks, while more complex solutions may take 8-12 weeks."
    },
    {
      question: "Do you provide ongoing support after launch?",
      answer: "Yes, we offer comprehensive maintenance and support packages to ensure your e-commerce site runs smoothly after launch."
    },
    {
      question: "Can you integrate payment gateways and shipping solutions?",
      answer: "Yes, we integrate all major payment gateways and shipping providers suitable for the South African market."
    },
    {
      question: "Do you handle product data migration?",
      answer: "Yes, we can help migrate your existing product catalog and customer data to your new e-commerce platform."
    }
  ],
  'website-maintenance': [
    {
      question: "What does website maintenance include?",
      answer: "Our maintenance services include security updates, performance optimization, content updates, backup management, and technical support."
    },
    {
      question: "How often do you perform updates?",
      answer: "We perform regular monthly updates and immediate security patches when necessary."
    },
    {
      question: "Do you provide emergency support?",
      answer: "Yes, our premium maintenance packages include emergency support with priority response times."
    }
  ],
  'google-ads': [
    {
      question: "How do you measure campaign success?",
      answer: "We track key metrics including ROI, conversion rates, click-through rates, and cost per acquisition to measure campaign performance."
    },
    {
      question: "What is the minimum ad spend required?",
      answer: "Our packages start with a minimum monthly ad spend of R5,000, which we can adjust based on your goals and budget."
    },
    {
      question: "How often do you optimize campaigns?",
      answer: "We perform weekly optimizations and provide monthly performance reports with detailed insights."
    }
  ],
  'graphic-design': [
    {
      question: "What file formats do you deliver?",
      answer: "We provide files in all standard formats including AI, PSD, PDF, JPG, PNG, and vector formats suitable for both print and digital use."
    },
    {
      question: "How many revisions are included?",
      answer: "Our packages typically include 2-3 rounds of revisions to ensure your complete satisfaction."
    },
    {
      question: "Do you offer rush services?",
      answer: "Yes, we offer expedited services for urgent projects at an additional fee."
    }
  ],
  'marketing-materials': [
    {
      question: "What types of marketing materials do you create?",
      answer: "We design brochures, flyers, business cards, banners, posters, presentations, and any other marketing collateral you need."
    },
    {
      question: "Do you handle printing?",
      answer: "Yes, we can manage the printing process with our trusted print partners to ensure quality results."
    },
    {
      question: "Can you work with existing brand guidelines?",
      answer: "Absolutely, we ensure all materials align with your existing brand guidelines and visual identity."
    }
  ],
  'mobile-solutions': [
    {
      question: "What types of mobile apps do you develop?",
      answer: "We develop native iOS and Android apps, as well as cross-platform solutions using React Native or Flutter."
    },
    {
      question: "How long does mobile app development take?",
      answer: "Development time varies from 3-6 months depending on the complexity and features required."
    },
    {
      question: "Do you provide app store submission support?",
      answer: "Yes, we handle the entire app store submission process for both Apple App Store and Google Play Store."
    }
  ],
  'packaging-design': [
    {
      question: "Do you create 3D mockups?",
      answer: "Yes, we provide realistic 3D mockups to help visualize the final product before production."
    },
    {
      question: "Can you work with specific packaging requirements?",
      answer: "Yes, we design for all packaging types and ensure compliance with industry standards and regulations."
    },
    {
      question: "Do you handle printing specifications?",
      answer: "Yes, we provide print-ready files with proper specifications for your packaging manufacturer."
    }
  ],
  'print-design': [
    {
      question: "What print materials do you design?",
      answer: "We design everything from business cards and brochures to large format banners and trade show displays."
    },
    {
      question: "Do you provide print-ready files?",
      answer: "Yes, all our designs come with print-ready files in the appropriate format and color specifications."
    },
    {
      question: "Can you recommend printing services?",
      answer: "Yes, we can connect you with our network of trusted printing partners."
    }
  ],
  'social-media': [
    {
      question: "Which social media platforms do you manage?",
      answer: "We manage all major platforms including Facebook, Instagram, LinkedIn, Twitter, and TikTok."
    },
    {
      question: "How often do you post content?",
      answer: "Posting frequency varies by package, typically ranging from 3-5 posts per week per platform."
    },
    {
      question: "Do you create the content?",
      answer: "Yes, we handle content creation including graphics, captions, and hashtag research."
    }
  ],
  'custom-development': [
    {
      question: "What technologies do you use?",
      answer: "We use modern technologies including React, Node.js, Python, and other frameworks based on project requirements."
    },
    {
      question: "How do you ensure project quality?",
      answer: "We follow industry best practices, conduct thorough testing, and provide detailed documentation."
    },
    {
      question: "Do you provide post-launch support?",
      answer: "Yes, we offer ongoing maintenance and support packages for all custom development projects."
    }
  ]
};
