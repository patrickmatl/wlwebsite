'use client';

import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';
import Breadcrumb from '@/components/Breadcrumb';
import RelatedServices from '@/components/RelatedServices';
import GetInTouchButton from '@/components/GetInTouchButton';
import { serviceFAQs } from '@/data/serviceFAQs';

const WebsiteDesignPage = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Website Design', href: '/pricing/website-design' }
  ];

  const packages = [
    {
      name: "3 Page Custom Website",
      price: "R8,980.00",
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />,
      features: [
        "3 Custom Pages",
        "Mobile Responsive Design",
        "Contact Form Integration",
        "Social Media Integration",
        "Basic SEO Setup",
        "Google Analytics Integration",
        "2 Rounds of Revisions",
        "Training Session",
        "3 Months Support"
      ]
    },
    {
      name: "6 Page Custom Website",
      price: "R14,780.00",
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />,
      features: [
        "6 Custom Pages",
        "Mobile Responsive Design",
        "Advanced Contact Forms",
        "Social Media Integration",
        "Enhanced SEO Setup",
        "Google Analytics & Search Console",
        "3 Rounds of Revisions",
        "2 Training Sessions",
        "6 Months Support"
      ]
    },
    {
      name: "9 Page Custom Website",
      price: "R17,420.00",
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />,
      features: [
        "9 Custom Pages",
        "Mobile Responsive Design",
        "Advanced Forms & Integration",
        "Social Media Integration",
        "Comprehensive SEO Setup",
        "Full Analytics Suite",
        "4 Rounds of Revisions",
        "3 Training Sessions",
        "12 Months Support"
      ]
    },
    {
      name: "Catalog Website",
      price: "R19,780.00",
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />,
      features: [
        "Up to 50 Products",
        "Product Categories",
        "Search Functionality",
        "Mobile Responsive Design",
        "Product Filtering",
        "SEO Optimization",
        "Analytics Integration",
        "3 Training Sessions",
        "12 Months Support"
      ]
    },
    {
      name: "E-Commerce Website",
      price: "R23,690.00",
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />,
      features: [
        "Unlimited Products",
        "Payment Gateway Integration",
        "Inventory Management",
        "Order Management",
        "Customer Accounts",
        "Mobile Responsive Design",
        "Advanced SEO Setup",
        "4 Training Sessions",
        "12 Months Support"
      ]
    }
  ];

  const additionalFeatures = [
    {
      name: "POPIA Compliancy",
      price: "R1,350.00",
      description: "Complete POPIA compliance implementation for your website"
    },
    {
      name: "Custom Development",
      price: "Starting at R27,980.00",
      description: "Tailored solutions for unique business requirements"
    },
    {
      name: "Rush Service",
      price: "+50% of package price",
      description: "Expedited delivery within 5-7 business days"
    }
  ];

  const relatedServices = [
    {
      title: 'Website Maintenance',
      description: 'Keep your website secure, up-to-date, and performing at its best.',
      href: '/pricing/website-maintenance',
      anchor: 'View Maintenance Plans'
    },
    {
      title: 'Digital Marketing',
      description: 'Boost your online presence with our digital marketing services.',
      href: '/pricing/google-ads',
      anchor: 'Explore Digital Marketing'
    },
    {
      title: 'Custom Development',
      description: 'Tailored web applications and custom functionality.',
      href: '/pricing/custom-development',
      anchor: 'View Development Services'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Header Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] to-[#FFA500]">
          Website Design Packages
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Professional web design solutions tailored to your business needs.
          All packages include mobile responsiveness, SEO optimization, and dedicated support.
        </p>
      </div>

      {/* Main Packages Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {packages.map((pkg, index) => (
          <motion.div
            key={pkg.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-zinc-900 rounded-lg p-8 border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-[#FFD700] mb-2">{pkg.name}</h3>
                <p className="text-3xl font-bold">{pkg.price}</p>
              </div>
              {pkg.icon}
            </div>

            <ul className="space-y-3 mb-8">
              {pkg.features.map((feature, i) => (
                <li key={i} className="flex items-center text-gray-300">
                  <FaCheck className="text-[#FFD700] mr-2 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button className="w-full py-3 px-4 bg-[#FFD700] text-black font-semibold rounded hover:bg-[#FFE44D] transition-colors">
              Get Started
            </button>
          </motion.div>
        ))}
      </div>

      {/* Additional Features */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-[#FFD700] text-center mb-8">Additional Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {additionalFeatures.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-zinc-900 rounded-lg p-6 border border-[#FFD700]/20"
            >
              <h3 className="text-xl font-bold text-[#FFD700] mb-2">{feature.name}</h3>
              <p className="text-2xl font-bold mb-4">{feature.price}</p>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <section className="py-20 bg-neutral-800">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {serviceFAQs['website-design']?.map((faq, index) => (
              <motion.div
                key={faq.question}
                className="bg-neutral-900 rounded-lg p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-bold text-white mb-3">{faq.question}</h3>
                <p className="text-neutral-400">{faq.answer}</p>
              </motion.div>
            )) || []}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <RelatedServices
        currentService="Website Design"
        services={relatedServices}
      />

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Build Your Dream Website?
          </h2>
          <p className="text-xl text-neutral-300 mb-8">
            Contact us for a free consultation and let's create something amazing together
          </p>
          <GetInTouchButton variant="primary" text="Start Your Project" className="text-lg" />
        </div>
      </section>
    </div>
  );
};

export default WebsiteDesignPage;
