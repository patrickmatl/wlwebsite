'use client';

import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';
import Breadcrumb from '@/components/Breadcrumb';
import RelatedServices from '@/components/RelatedServices';
import GetInTouchButton from '@/components/GetInTouchButton';
import FAQAccordion from '@/components/FAQ/FAQAccordion';
import { serviceFAQs } from '@/data/serviceFAQs';

const GoogleAdsPage = () => {
  const breadcrumbItems = [
    { label: 'Pricing', href: '/pricing' },
    { label: 'Google Ads', href: '/pricing/google-ads' }
  ];

  const features = [
    'Campaign Strategy Development',
    'Keyword Research & Analysis',
    'Ad Copy Creation',
    'Landing Page Optimization',
    'Conversion Tracking Setup',
    'Monthly Performance Reports'
  ];

  const relatedServicesList = [
    {
      title: 'Social Media Marketing',
      href: '/pricing/social-media',
      description: 'Comprehensive social media marketing solutions',
      anchor: 'Social Media'
    },
    {
      title: 'Website Design',
      href: '/pricing/website-design',
      description: 'Professional website design services',
      anchor: 'Website Design'
    },
    {
      title: 'E-commerce Solutions',
      href: '/pricing/ecommerce',
      description: 'Complete e-commerce development services',
      anchor: 'E-commerce'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={breadcrumbItems} />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mt-12 mb-16"
        >
          <h1 className="text-4xl font-bold mb-4">Google Ads Management</h1>
          <p className="text-xl text-gray-400">Drive targeted traffic and increase conversions with professional Google Ads management</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-zinc-900 p-6 rounded-lg"
            >
              <div className="flex items-center text-[#FFD700] mb-4">
                <FaCheck className="mr-2" />
                <h3 className="text-lg font-semibold">{feature}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        <GetInTouchButton />

        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <FAQAccordion faqs={serviceFAQs['google-ads']} />
        </div>

        <div className="mt-20">
          <RelatedServices 
            currentService="google-ads"
            services={relatedServicesList}
          />
        </div>
      </div>
    </div>
  );
};

export default GoogleAdsPage;
