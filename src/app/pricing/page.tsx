'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaDesktop, FaPalette, FaShoppingCart, FaMobileAlt, FaCode } from 'react-icons/fa';

const PricingPage = () => {
  const pricingCategories = [
    {
      title: "Website Design",
      icon: <FaDesktop className="w-12 h-12 mb-4 text-[#FFD700]" />,
      description: "Professional web design packages for businesses of all sizes. From simple landing pages to complex e-commerce solutions.",
      link: "/pricing/website-design",
      packages: [
        "3 Page Custom Website from R8,980",
        "6 Page Custom Website from R14,780",
        "9 Page Custom Website from R17,420",
        "E-Commerce Website from R23,690"
      ]
    },
    {
      title: "Graphic Design",
      icon: <FaPalette className="w-12 h-12 mb-4 text-[#FFD700]" />,
      description: "Complete branding solutions including logo design, corporate identity, and marketing materials.",
      link: "/pricing/graphic-design",
      packages: [
        "Logo Design from R2,080",
        "Corporate Identity Pack from R4,160",
        "Business Cards from R1,040",
        "Marketing Materials from R780"
      ]
    },
    {
      title: "E-Commerce Solutions",
      icon: <FaShoppingCart className="w-12 h-12 mb-4 text-[#FFD700]" />,
      description: "Full-featured online store solutions with payment integration, inventory management, and more.",
      link: "/pricing/ecommerce",
      packages: [
        "Basic Online Store from R19,780",
        "Advanced E-Commerce from R23,690",
        "Custom Solutions Available",
        "Includes Payment Gateway Integration"
      ]
    },
    {
      title: "Mobile Solutions",
      icon: <FaMobileAlt className="w-12 h-12 mb-4 text-[#FFD700]" />,
      description: "Mobile-first web applications and responsive design solutions for modern businesses.",
      link: "/pricing/mobile-solutions",
      packages: [
        "Progressive Web Apps",
        "Mobile-First Websites",
        "Custom Mobile Solutions",
        "Cross-Platform Compatibility"
      ]
    },
    {
      title: "Custom Development",
      icon: <FaCode className="w-12 h-12 mb-4 text-[#FFD700]" />,
      description: "Tailored development solutions for unique business requirements and complex systems.",
      link: "/pricing/custom-development",
      packages: [
        "Custom Web Applications",
        "System Integration",
        "API Development",
        "Database Solutions"
      ]
    }
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
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
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
          </motion.div>
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
          href="/contact"
          className="inline-block py-2 px-8 bg-[#FFD700] text-black font-semibold rounded hover:bg-[#FFE44D] transition-colors"
        >
          Get in Touch
        </Link>
      </div>
    </div>
  );
};

export default PricingPage;
