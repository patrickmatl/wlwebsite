'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaServer, FaShieldAlt, FaRocket, FaChartLine, FaBug, FaTools } from 'react-icons/fa';
import Breadcrumb from '@/components/Breadcrumb';
import RelatedServices from '@/components/RelatedServices';
import GetInTouchButton from '@/components/GetInTouchButton';
import { generateServiceSchema, generateFAQSchema } from '@/lib/schema';
import { serviceFAQs } from '@/lib/faqs';
import { FaCheck } from 'react-icons/fa';

const WebsiteMaintenancePage = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Website Maintenance', href: '/pricing/website-maintenance' }
  ];

  const maintenancePackages = [
    {
      title: 'Essential Care',
      price: 'R499/month',
      features: [
        'Monthly WordPress Updates',
        'Security Monitoring',
        'Weekly Backups',
        'Uptime Monitoring',
        'Basic SEO Maintenance',
        'Monthly Performance Report'
      ],
      recommended: false
    },
    {
      title: 'Professional Care',
      price: 'R999/month',
      features: [
        'Weekly WordPress Updates',
        'Advanced Security Suite',
        'Daily Backups',
        '24/7 Uptime Monitoring',
        'Monthly SEO Optimization',
        'Content Updates (2 hours)',
        'Monthly Performance Analysis',
        'Technical Support'
      ],
      recommended: true
    },
    {
      title: 'Enterprise Care',
      price: 'R1,999/month',
      features: [
        'Priority WordPress Updates',
        'Enterprise Security Protection',
        'Real-time Backups',
        'Proactive Monitoring',
        'Weekly SEO Optimization',
        'Content Updates (5 hours)',
        'Weekly Performance Analysis',
        'Priority Support',
        'Monthly Strategy Meeting'
      ],
      recommended: false
    }
  ];

  const additionalServices = [
    {
      title: 'SEO Audit',
      price: 'R1,500',
      description: 'A comprehensive SEO audit to identify areas for improvement and optimize your website for search engines.'
    },
    {
      title: 'Content Creation',
      price: 'R2,000',
      description: 'High-quality content creation services to help you establish your brand and attract your target audience.'
    },
    {
      title: 'Website Security',
      price: 'R1,000',
      description: 'Advanced website security measures to protect your website from malware, hacks, and other cyber threats.'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
      <Breadcrumb items={breadcrumbItems} />
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Website Maintenance Services</h1>
        <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
          Keep your website secure, up-to-date, and performing at its best with our professional maintenance services
        </p>
      </div>

      {/* Packages Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {maintenancePackages.map((pkg, index) => (
          <motion.div
            key={pkg.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`bg-zinc-900 rounded-lg p-8 border border-[#FFD700]/20 ${
              pkg.recommended ? 'relative overflow-hidden' : ''
            }`}
          >
            {pkg.recommended && (
              <div className="absolute top-4 right-4">
                <span className="bg-[#FFD700] text-black text-sm font-semibold px-3 py-1 rounded">
                  Recommended
                </span>
              </div>
            )}
            <h3 className="text-2xl font-bold text-[#FFD700] text-center mb-4">{pkg.title}</h3>
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
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-zinc-900 rounded-lg p-6 border border-[#FFD700]/20"
            >
              <h3 className="text-xl font-bold text-[#FFD700] mb-2">{service.title}</h3>
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
            {serviceFAQs['website-maintenance'].map((faq, index) => (
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
        currentService="Website Maintenance"
        services={[
          { 
            href: '/pricing/custom-development',
            anchor: 'Custom Development',
            title: 'Custom Development Services',
            description: 'Get tailored web solutions built specifically for your business needs'
          },
          { 
            href: '/pricing/ecommerce',
            anchor: 'E-commerce Solutions',
            title: 'E-commerce Solutions',
            description: 'Build and maintain your online store with our comprehensive e-commerce services'
          },
          { 
            href: '/pricing/google-ads',
            anchor: 'Google Ads',
            title: 'Google Ads Management',
            description: 'Drive targeted traffic to your website with professional Google Ads management'
          }
        ]}
      />

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Keep Your Website in Top Shape?
          </h2>
          <p className="text-xl text-neutral-300 mb-8">
            Contact us for a free consultation and let's discuss your maintenance needs
          </p>
          <GetInTouchButton variant="primary" text="Start Your Project" className="text-lg" />
        </div>
      </section>
    </div>
  );
};

export default WebsiteMaintenancePage;
