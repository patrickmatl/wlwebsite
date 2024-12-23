'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaBox, FaBars, FaCheck, FaShoppingBag, FaBoxOpen, FaGift } from 'react-icons/fa';
import Breadcrumb from '@/components/Breadcrumb';
import RelatedServices from '@/components/RelatedServices';
import GetInTouchButton from '@/components/GetInTouchButton';
import { serviceFAQs } from '@/data/serviceFAQs';

const PackagingDesignPage = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Packaging Design', href: '/pricing/packaging-design' }
  ];

  const packages = [
    {
      name: "Basic Packaging",
      price: "R2,500",
      icon: <FaBox className="w-8 h-8 text-[#FFD700]" />,
      features: [
        "1 Product Package Design",
        "2 Design Concepts",
        "3 Revision Rounds",
        "Print-Ready Files",
        "Basic 3D Mockup",
        "5-7 Day Delivery"
      ]
    },
    {
      name: "Professional Package",
      price: "R4,750",
      icon: <FaBoxOpen className="w-8 h-8 text-[#FFD700]" />,
      features: [
        "2 Product Package Designs",
        "3 Design Concepts Each",
        "5 Revision Rounds",
        "Print-Ready Files",
        "Advanced 3D Mockups",
        "Label Design",
        "3-5 Day Delivery"
      ]
    },
    {
      name: "Premium Collection",
      price: "R8,950",
      icon: <FaGift className="w-8 h-8 text-[#FFD700]" />,
      features: [
        "Full Product Line (Up to 5 Items)",
        "Multiple Design Concepts",
        "Unlimited Revisions",
        "Print-Ready Files",
        "Photorealistic 3D Mockups",
        "Label & Insert Designs",
        "Brand Style Guide",
        "Priority 2-3 Day Delivery"
      ]
    }
  ];

  const additionalServices = [
    {
      name: "3D Mockup Rendering",
      price: "R1,200",
      icon: <FaBox className="w-6 h-6 text-[#FFD700]" />,
      description: "Photorealistic 3D renderings of your packaging design from multiple angles"
    },
    {
      name: "Label Design",
      price: "R850",
      icon: <FaBars className="w-6 h-6 text-[#FFD700]" />,
      description: "Custom label design with nutritional information and required certifications"
    },
    {
      name: "Package Insert",
      price: "R650",
      icon: <FaShoppingBag className="w-6 h-6 text-[#FFD700]" />,
      description: "Design of instruction manuals, promotional inserts, or product information sheets"
    }
  ];

  const relatedServices = [
    {
      title: "Graphic Design",
      description: "Complete branding and visual identity solutions",
      href: "/pricing/graphic-design",
      anchor: "View Graphic Design Services"
    },
    {
      title: "Print Design",
      description: "Professional print media design services",
      href: "/pricing/print-design",
      anchor: "View Print Design Services"
    },
    {
      title: "Marketing Materials",
      description: "Comprehensive marketing collateral design",
      href: "/pricing/marketing-materials",
      anchor: "View Marketing Materials Services"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
      <Breadcrumb items={breadcrumbItems} />
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Packaging Design Services</h1>
        <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
          Transform your products with eye-catching packaging designs that make a lasting impression
        </p>
      </div>

      {/* Packages Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {packages.map((pkg, index) => (
          <motion.div
            key={pkg.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-zinc-900 rounded-lg p-8 border border-[#FFD700]/20"
          >
            <div className="flex items-center justify-center mb-6">
              {pkg.icon}
            </div>
            <h3 className="text-2xl font-bold text-[#FFD700] text-center mb-4">{pkg.name}</h3>
            <p className="text-3xl font-bold text-center mb-8">{pkg.price}</p>
            <ul className="space-y-4 mb-8">
              {pkg.features.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <FaCheck className="text-[#FFD700] mr-2 flex-shrink-0 mt-1" />
                  <span className="text-neutral-300">{feature}</span>
                </li>
              ))}
            </ul>
            <button className="w-full py-3 px-4 bg-[#FFD700] text-black font-semibold rounded hover:bg-[#FFE44D] transition-colors">
              Get Started
            </button>
          </motion.div>
        ))}
      </div>

      {/* Additional Services */}
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-[#FFD700] text-center mb-8">Additional Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {additionalServices.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-zinc-900 rounded-lg p-6 border border-[#FFD700]/20"
            >
              <h3 className="text-xl font-bold text-[#FFD700] mb-2">{service.name}</h3>
              <p className="text-2xl font-bold mb-4">{service.price}</p>
              <p className="text-neutral-300">{service.description}</p>
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
            {serviceFAQs['packaging-design'].map((faq: { question: string; answer: string }, index: number) => (
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
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <RelatedServices
        currentService="Packaging Design"
        services={[
          { 
            href: '/pricing/graphic-design',
            anchor: 'Graphic Design',
            title: 'Graphic Design Services',
            description: 'Create stunning visuals for your brand with our professional graphic design services'
          },
          { 
            href: '/pricing/print-design',
            anchor: 'Print Design',
            title: 'Print Design Services',
            description: 'Get professional print designs for your marketing materials'
          },
          { 
            href: '/pricing/marketing-materials',
            anchor: 'Marketing Materials',
            title: 'Marketing Materials Services',
            description: 'Comprehensive marketing material solutions for your business'
          }
        ]}
      />

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Product Packaging?
          </h2>
          <p className="text-xl text-neutral-300 mb-8">
            Contact us for a free consultation and let's create packaging that sells
          </p>
          <GetInTouchButton variant="primary" text="Start Your Project" className="text-lg" />
        </div>
      </section>
    </div>
  );
};

export default PackagingDesignPage;
