export type FAQ = {
  question: string;
  answer: string;
};

export const serviceFAQs: Record<string, FAQ[]> = {
  'website-design': [
    { question: "Do you build responsive websites?", answer: "Yes, all websites are fully responsive and optimized for mobile, tablet, and desktop." },
    { question: "Can I update my website content?", answer: "Yes, we use CMS platforms and provide training so you can make updates easily." },
    { question: "Do you provide hosting and domain setup?", answer: "We assist with hosting, domains, SSL certificates, and ongoing maintenance if required." },
    { question: "How long does a website project take?", answer: "Typical timelines are 4–6 weeks for standard sites and 8–12 weeks for complex builds." },
    { question: "Do you handle SEO basics?", answer: "Yes, we implement on-page SEO, sitemaps, metadata, and performance best practices." }
  ],
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
  'branding': [
    { question: "What’s included in a branding package?", answer: "Logo system, color palette, typography, brand guidelines, and key assets for print and digital." },
    { question: "Do you redesign existing brands?", answer: "Yes, we can refine or reimagine your brand while preserving brand equity." },
    { question: "Will I receive a brand style guide?", answer: "Yes, we deliver a comprehensive brand manual with usage rules and examples." },
    { question: "How many logo concepts do you provide?", answer: "We typically present 2–3 strategic concepts with iterative refinement." },
    { question: "Can you create social and stationery assets?", answer: "Yes, we design social templates and stationery such as business cards, letterheads, and email signatures." }
  ],
  'logo-design': [
    { question: "What makes a good logo?", answer: "Distinctive, scalable, versatile across color and formats, and aligned with your brand positioning." },
    { question: "Do you provide vector files?", answer: "Yes, logos are delivered in vector formats (AI, SVG, PDF) and raster formats (PNG, JPG)." },
    { question: "How many revisions are included?", answer: "Standard packages include up to 3 revision rounds." },
    { question: "Can you refresh an existing logo?", answer: "Yes, we can modernize and refine your logo while maintaining recognizability." },
    { question: "Do you supply social media avatars and favicons?", answer: "Yes, we export platform-specific assets for consistent digital presence." }
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
      question: "What does your Google Ads service include?",
      answer: "Our Google Ads service includes campaign strategy development, keyword research, ad copy creation, landing page optimization, conversion tracking setup, and monthly performance reports."
    },
    {
      question: "How long does it take to see results?",
      answer: "While initial results can be seen within days, optimal campaign performance typically develops over 2-3 months as we gather data and optimize your campaigns."
    },
    {
      question: "Do you provide regular reporting?",
      answer: "Yes, we provide detailed monthly reports covering key metrics like impressions, clicks, conversions, and ROI, along with strategic recommendations."
    },
    {
      question: "Can you work with my existing Google Ads account?",
      answer: "Yes, we can either optimize your existing account or create a new one based on your needs and previous performance data."
    },
    {
      question: "What budget do you recommend for Google Ads?",
      answer: "The recommended budget varies based on your industry, competition, and goals. We'll help you determine an optimal budget during our initial consultation."
    },
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
    },
    {
      question: "What graphic design services do you offer?",
      answer: "We offer a comprehensive range of graphic design services including logo design, branding, marketing materials, social media graphics, packaging design, and more."
    },
    {
      question: "How long does a typical graphic design project take?",
      answer: "Project timelines vary based on complexity. Logo design typically takes 1-2 weeks, while complete branding packages may take 3-4 weeks."
    },
    {
      question: "Do you provide source files after project completion?",
      answer: "Yes, we provide all necessary source files in various formats suitable for both print and digital use."
    },
    {
      question: "How many revisions are included in your design process?",
      answer: "Our standard packages include up to 3 revision rounds. Additional revisions can be arranged if needed."
    },
    {
      question: "Can you work with existing brand guidelines?",
      answer: "Yes, we can work within your existing brand guidelines to ensure consistency across all design materials."
    }
  ],
  'marketing-materials': [
    {
      question: "What types of marketing materials do you design?",
      answer: "We design a wide range of marketing materials including presentations, email templates, brochures, flyers, business cards, banners, and more."
    },
    {
      question: "How long does it take to complete a marketing materials project?",
      answer: "Project timelines vary based on complexity and type. Basic designs typically take 2-3 days, while more complex projects may take 5-7 days."
    },
    {
      question: "Do you provide print-ready files?",
      answer: "Yes, we provide print-ready files in various formats suitable for both digital and physical printing."
    },
    {
      question: "Can you work with my existing brand guidelines?",
      answer: "Yes, we ensure all marketing materials align with your existing brand guidelines for consistency."
    },
    {
      question: "Do you offer rush services?",
      answer: "Yes, we offer expedited services for urgent projects at an additional fee."
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
    { question: "Do you create 3D mockups?", answer: "Yes, we provide realistic 3D mockups to visualize the final product before production." },
    { question: "Can you work with specific packaging requirements?", answer: "Yes, we design for all packaging types and ensure compliance with industry standards and regulations." },
    { question: "Do you handle printing specifications?", answer: "We deliver print-ready files with dielines, bleed, CMYK profiles, and finishing notes." },
    { question: "Can you assist with vendors?", answer: "We coordinate with printers and packaging suppliers to ensure accurate production." },
    { question: "Do you provide sustainability options?", answer: "We can recommend eco-friendly materials and printing techniques where available." }
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
