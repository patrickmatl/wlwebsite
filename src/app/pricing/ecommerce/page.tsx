'use client';

import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';
import Breadcrumb from '@/components/Breadcrumb';
import RelatedServices from '@/components/RelatedServices';
import GetInTouchButton from '@/components/GetInTouchButton';
import { serviceFAQs } from '@/data/serviceFAQs';

const EcommercePage = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'E-Commerce Solutions', href: '/pricing/ecommerce' }
  ];

  const packages = [
    {
      name: "Basic E-Commerce Package",
      price: "R19,780.00",
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />,
      features: [
        "Up to 50 Products",
        "Basic Payment Gateway Integration",
        "Mobile Responsive Design",
        "Product Categories",
        "Basic Search Function",
        "Order Management",
        "Customer Accounts",
        "Basic Analytics",
        "3 Months Support"
      ]
    },
    {
      name: "Advanced E-Commerce Package",
      price: "R23,690.00",
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />,
      features: [
        "Unlimited Products",
        "Multiple Payment Gateways",
        "Advanced Search & Filtering",
        "Inventory Management",
        "Customer Reviews & Ratings",
        "Discount & Coupon System",
        "Advanced Analytics",
        "Order Tracking",
        "6 Months Support"
      ]
    },
    {
      name: "Premium E-Commerce Package",
      price: "R27,980.00",
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />,
      features: [
        "Unlimited Products",
        "Multi-Currency Support",
        "Advanced Security Features",
        "Custom Checkout Process",
        "Automated Email Marketing",
        "Loyalty Program",
        "Advanced Analytics Suite",
        "API Integration",
        "12 Months Support"
      ]
    }
  ];

  const additionalFeatures = [
    {
      name: "Payment Gateway Integration",
      price: "R2,580.00",
      description: "Additional payment gateway integration (per gateway)",
      icon: <FaCheck className="w-6 h-6 text-[#FFD700]" />
    },
    {
      name: "Inventory Management System",
      price: "R4,890.00",
      description: "Advanced inventory tracking and management system",
      icon: <FaCheck className="w-6 h-6 text-[#FFD700]" />
    },
    {
      name: "Custom Features",
      price: "Starting at R3,500.00",
      description: "Custom functionality based on your specific needs",
      icon: <FaCheck className="w-6 h-6 text-[#FFD700]" />
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
      <Breadcrumb items={breadcrumbItems} />
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">E-Commerce Solutions</h1>
        <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
          Build a powerful online store with our professional e-commerce solutions
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

      {/* Additional Features */}
      <div className="max-w-7xl mx-auto mb-16">
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
              <p className="text-neutral-300">{feature.description}</p>
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
            {serviceFAQs['ecommerce']?.map((faq, index) => (
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
        currentService="E-commerce"
        services={[
          { 
            href: '/pricing/website-maintenance',
            anchor: 'Website Maintenance',
            title: 'Website Maintenance Services',
            description: 'Keep your e-commerce site running smoothly with our maintenance services'
          },
          { 
            href: '/pricing/custom-development',
            anchor: 'Custom Development',
            title: 'Custom Development Services',
            description: 'Get custom features and integrations for your e-commerce platform'
          },
          { 
            href: '/pricing/google-ads',
            anchor: 'Google Ads',
            title: 'Google Ads Management',
            description: 'Drive sales with targeted Google Ads campaigns for your e-commerce store'
          }
        ]}
      />

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Launch Your Online Store?
          </h2>
          <p className="text-xl text-neutral-300 mb-8">
            Contact us for a free consultation and let's create your perfect e-commerce solution
          </p>
          <GetInTouchButton variant="primary" text="Start Your Project" className="text-lg" />
        </div>
      </section>
    </div>
  );
};

export default EcommercePage;
