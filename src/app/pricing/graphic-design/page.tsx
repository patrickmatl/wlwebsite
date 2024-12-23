'use client';

import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';
import Breadcrumb from '@/components/Breadcrumb';
import RelatedServices from '@/components/RelatedServices';
import GetInTouchButton from '@/components/GetInTouchButton';
import FAQAccordion from '@/components/FAQ/FAQAccordion';
import { serviceFAQs } from '@/data/serviceFAQs';

const GraphicDesignPage = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Graphic Design', href: '/pricing/graphic-design' }
  ];

  const features = [
    'Logo Design',
    'Brand Identity',
    'Marketing Materials',
    'Social Media Graphics',
    'Print Design',
    'Packaging Design'
  ];

  const relatedServicesList = [
    {
      title: 'Website Design',
      href: '/pricing/website-design',
      description: 'Professional website design services',
      anchor: 'Website Design'
    },
    {
      title: 'Marketing Materials',
      href: '/pricing/marketing-materials',
      description: 'Professional marketing material design',
      anchor: 'Marketing Materials'
    },
    {
      title: 'Packaging Design',
      href: '/pricing/packaging-design',
      description: 'Custom packaging design solutions',
      anchor: 'Packaging Design'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
      <Breadcrumb items={breadcrumbItems} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mt-12 mb-16"
      >
        <h1 className="text-4xl font-bold mb-4">Graphic Design Services</h1>
        <p className="text-xl text-gray-400">Professional graphic design solutions for your brand</p>
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
        <section className="py-20 bg-neutral-800">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {serviceFAQs['graphic-design']?.map((faq, index) => (
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
      </div>

      <div className="mt-20">
        <RelatedServices 
          currentService="graphic-design"
          services={relatedServicesList}
        />
      </div>
    </div>
  );
};

export default GraphicDesignPage;