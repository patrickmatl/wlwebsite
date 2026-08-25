'use client';

import Link from 'next/link';
import { FaDesktop, FaPalette, FaShoppingCart, FaMobileAlt, FaCode } from 'react-icons/fa';

const PricingPage = () => {
  const pricingCategories = [
    {
      title: "Website Design",
      icon: <FaDesktop className="w-12 h-12 mb-4 text-[#FFD700]" />,
      description: "Professional web design packages for businesses of all sizes. From simple landing pages to complex e-commerce solutions.",
      link: "/pricing/website-design-pretoria",
      packages: ["3 Page Custom Website from R8,980", "6 Page Custom Website from R14,780", "9 Page Custom Website from R17,420", "E-Commerce Website from R23,690"]
    },
    {
      title: "Graphic Design",
      icon: <FaPalette className="w-12 h-12 mb-4 text-[#FFD700]" />,
      description: "Complete branding solutions including logo design, corporate identity, and marketing materials.",
      link: "/pricing/graphic-design-pretoria",
      packages: ["Logo Design from R2,080", "Corporate Identity Pack from R4,160", "Business Cards from R1,040", "Marketing Materials from R780"]
    },
    {
      title: "E-Commerce Solutions",
      icon: <FaShoppingCart className="w-12 h-12 mb-4 text-[#FFD700]" />,
      description: "Full-featured online store solutions with payment integration, inventory management, and more.",
      link: "/pricing/ecommerce-pretoria",
      packages: ["Basic Online Store from R19,780", "Advanced E-Commerce from R23,690", "Custom Solutions Available", "Includes Payment Gateway Integration"]
    },
    {
      title: "Mobile Solutions",
      icon: <FaMobileAlt className="w-12 h-12 mb-4 text-[#FFD700]" />,
      description: "Mobile-first web applications and responsive design solutions for modern businesses.",
      link: "/pricing/mobile-solutions-pretoria",
      packages: ["Progressive Web Apps", "Mobile-First Websites", "Custom Mobile Solutions", "Cross-Platform Compatibility"]
    },
    {
      title: "Custom Development",
      icon: <FaCode className="w-12 h-12 mb-4 text-[#FFD700]" />,
      description: "Tailored development solutions for unique business requirements and complex systems.",
      link: "/pricing/custom-development-pretoria",
      packages: ["Custom Web Applications", "System Integration", "API Development", "Database Solutions"]
    },
    {
      title: "Corporate Video",
      icon: <FaDesktop className="w-12 h-12 mb-4 text-[#FFD700]" />,
      description: "Professional video production for businesses and brands in Pretoria.",
      link: "/pricing/corporate-video-pretoria",
      packages: ["Starter from R6,500", "Business from R12,000", "Premium from R22,000"]
    },
    {
      title: "Drone Video",
      icon: <FaDesktop className="w-12 h-12 mb-4 text-[#FFD700]" />,
      description: "Aerial video production for stunning perspectives and dynamic storytelling.",
      link: "/pricing/drone-video-pretoria",
      packages: ["Starter from R4,500", "Business from R7,900", "Premium from R13,500"]
    },
    {
      title: "Photography",
      icon: <FaPalette className="w-12 h-12 mb-4 text-[#FFD700]" />,
      description: "Professional photography for events, brands, and businesses in Pretoria.",
      link: "/pricing/photography-pretoria",
      packages: ["Basic from R2,500", "Standard from R4,500", "Premium from R7,800"]
    },
    {
      title: "Product Photography",
      icon: <FaPalette className="w-12 h-12 mb-4 text-[#FFD700]" />,
      description: "High-quality product images to boost your e-commerce and marketing.",
      link: "/pricing/product-photography-pretoria",
      packages: ["Starter from R1,800", "Business from R3,200", "Premium from R5,900"]
    },
    {
      title: "SEO",
      icon: <FaDesktop className="w-12 h-12 mb-4 text-[#FFD700]" />,
      description: "Search engine optimization services to boost your visibility and rankings.",
      link: "/pricing/seo-pretoria",
      packages: ["Local SEO", "National SEO", "E-Commerce SEO"]
    },
    {
      title: "Social Media Marketing",
      icon: <FaPalette className="w-12 h-12 mb-4 text-[#FFD700]" />,
      description: "Grow your brand and engage your audience on all major platforms.",
      link: "/pricing/social-media-pretoria",
      packages: ["Starter", "Growth", "Premium"]
    },
    {
      title: "Google Ads",
      icon: <FaDesktop className="w-12 h-12 mb-4 text-[#FFD700]" />,
      description: "Targeted advertising campaigns to drive traffic and conversions.",
      link: "/pricing/google-ads-pretoria",
      packages: ["Setup", "Monthly Management"]
    },
    {
      title: "Email Marketing",
      icon: <FaDesktop className="w-12 h-12 mb-4 text-[#FFD700]" />,
      description: "Effective campaigns to nurture leads and retain customers.",
      link: "/pricing/email-marketing-pretoria",
      packages: ["Setup", "Ongoing Campaigns"]
    },
    {
      title: "Content Marketing",
      icon: <FaPalette className="w-12 h-12 mb-4 text-[#FFD700]" />,
      description: "Engaging content creation for blogs, websites, and social media.",
      link: "/pricing/content-marketing-pretoria",
      packages: ["Blog Posts", "Website Content", "Social Media Content"]
    },
    {
      title: "Print Design",
      icon: <FaPalette className="w-12 h-12 mb-4 text-[#FFD700]" />,
      description: "Professional print design for brochures, flyers, and more.",
      link: "/pricing/print-design-pretoria",
      packages: ["Brochures", "Flyers", "Posters"]
    },
    {
      title: "Marketing Materials",
      icon: <FaPalette className="w-12 h-12 mb-4 text-[#FFD700]" />,
      description: "Design and print of business cards, banners, and other marketing assets.",
      link: "/pricing/marketing-materials-pretoria",
      packages: ["Business Cards", "Banners", "Stickers"]
    },
    {
      title: "Packaging Design",
      icon: <FaPalette className="w-12 h-12 mb-4 text-[#FFD700]" />,
      description: "Custom packaging solutions to elevate your product presentation.",
      link: "/pricing/packaging-design-pretoria",
      packages: ["Box Design", "Label Design"]
    },
    {
      title: "Annual Report Design & Print",
      icon: <FaPalette className="w-12 h-12 mb-4 text-[#FFD700]" />,
      description: "Professional annual report design and printing for corporates and NGOs.",
      link: "/pricing/annual-report-design-and-print-pretoria",
      packages: ["Design", "Print"]
    },
    {
      title: "Website Maintenance",
      icon: <FaDesktop className="w-12 h-12 mb-4 text-[#FFD700]" />,
      description: "Ongoing website care, updates, and support packages.",
      link: "/pricing/website-maintenance-pretoria",
      packages: ["Basic", "Standard", "Premium"]
    },
    {
      title: "Presentation Design Services Pretoria",
      icon: <FaDesktop className="w-12 h-12 mb-4 text-[#FFD700]" />,
      description: "Custom PowerPoint, Google Slides, and Keynote presentations to impress your audience and elevate your brand.",
      link: "/pricing/presentation-design-services-pretoria",
      packages: ["Business Presentations", "Investor Decks", "Conference Slides"]
    },
    {
      title: "Investor Relations Material Design Services Pretoria",
      icon: <FaDesktop className="w-12 h-12 mb-4 text-[#FFD700]" />,
      description: "Professional design and copy for investor decks, shareholder updates, and financial communications.",
      link: "/pricing/investor-relations-material-design-services-pretoria",
      packages: ["Investor Decks", "Shareholder Reports", "Financial Updates"]
    },
    {
      title: "Sustainability & ESG Report Design Services Pretoria",
      icon: <FaPalette className="w-12 h-12 mb-4 text-[#FFD700]" />,
      description: "Design and production of sustainability and ESG reports for companies committed to corporate responsibility.",
      link: "/pricing/sustainability-esg-report-design-services-pretoria",
      packages: ["Sustainability Reports", "ESG Reports", "Integrated Reports"]
    },
    {
      title: "Infographic & Data Visualization Design Pretoria",
      icon: <FaPalette className="w-12 h-12 mb-4 text-[#FFD700]" />,
      description: "Custom infographics and visual data storytelling for reports, marketing, and digital content.",
      link: "/pricing/infographic-data-visualization-design-pretoria",
      packages: ["Infographics", "Charts & Graphs", "Data Visualizations"]
    },
    {
      title: "Interactive Digital Publication & Interactive PDF Design Pretoria",
      icon: <FaDesktop className="w-12 h-12 mb-4 text-[#FFD700]" />,
      description: "Creation of interactive PDFs and digital magazines for engaging online experiences.",
      link: "/pricing/interactive-digital-publication-interactive-pdf-design-pretoria",
      packages: ["Interactive PDFs", "Digital Magazines", "Clickable Brochures"]
    },
    {
      title: "Internal Communications Design Pretoria",
      icon: <FaDesktop className="w-12 h-12 mb-4 text-[#FFD700]" />,
      description: "Branded internal documents, onboarding kits, and employee handbooks for effective communication.",
      link: "/pricing/internal-communications-design-pretoria",
      packages: ["Employee Handbooks", "Onboarding Kits", "Internal Newsletters"]
    },
    {
      title: "Event Branding Design Pretoria",
      icon: <FaPalette className="w-12 h-12 mb-4 text-[#FFD700]" />,
      description: "Branding, signage, and digital assets for corporate events, expos, and conferences.",
      link: "/pricing/event-branding-design-pretoria",
      packages: ["Event Branding", "Signage", "Event Programs"]
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] to-[#FFA500]">
          Our Services & Pricing
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Explore our comprehensive range of digital solutions tailored to meet your business needs.
          Each service is crafted with expertise and attention to detail.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pricingCategories.map((category, index) => (
          <div
            key={category.title}
            className="bg-zinc-900 rounded-lg p-8 border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all"
          >
            <div className="text-center mb-6">
              {category.icon}
              <h3 className="text-2xl font-bold text-[#FFD700] mb-4">{category.title}</h3>
              <p className="text-gray-300 mb-6">{category.description}</p>
            </div>

            <div className="space-y-3 mb-6">
              {category.packages.map((pkg, i) => (
                <div key={i} className="flex items-center text-sm text-gray-300">
                  <span className="text-[#FFD700] mr-2">•</span>
                  {pkg}
                </div>
              ))}
            </div>

            <Link 
              href={category.link}
              className="block w-full py-2 px-4 bg-[#FFD700] text-black font-semibold rounded text-center hover:bg-[#FFE44D] transition-colors"
            >
              View Full Pricing
            </Link>
          </div>
        ))}
      </div>

      {/* Additional Information */}
      <div className="max-w-7xl mx-auto mt-16 text-center">
        <h2 className="text-2xl font-bold text-[#FFD700] mb-4">Need a Custom Solution?</h2>
        <p className="text-gray-300 mb-6">
          We offer tailored solutions to meet your specific requirements. 
          Contact us for a personalized quote.
        </p>
        <Link 
          href="/get-in-touch-pretoria"
          className="inline-block py-2 px-8 bg-[#FFD700] text-black font-semibold rounded hover:bg-[#FFE44D] transition-colors"
        >
          Get in Touch
        </Link>
      </div>
    </div>
  );
};

export default PricingPage;
