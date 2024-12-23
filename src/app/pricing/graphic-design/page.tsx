'use client';

import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';
import Breadcrumb from '@/components/Breadcrumb';
import RelatedServices from '@/components/RelatedServices';
import GetInTouchButton from '@/components/GetInTouchButton';
import { serviceFAQs } from '@/data/serviceFAQs';

const GraphicDesignPage = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Graphic Design', href: '/pricing/graphic-design' }
  ];

  const designPackages = [
    {
      name: "Essential Design Package",
      price: "From R3,850",
      description: "Perfect for startups and small businesses",
      features: [
        "Logo Design (2 Concepts)",
        "Business Card Design",
        "Social Media Profile Kit",
        "Basic Brand Guidelines",
        "2 Revision Rounds",
        "Source Files Included",
        "5-7 Day Delivery",
        "Email Support"
      ],
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />
    },
    {
      name: "Professional Design Package",
      price: "From R7,850",
      description: "Comprehensive design solutions for growing businesses",
      features: [
        "Logo Design (4 Concepts)",
        "Complete Stationery Design",
        "Social Media Kit (5 Templates)",
        "Brochure/Flyer Design",
        "Comprehensive Brand Guidelines",
        "Email Signature Design",
        "3 Revision Rounds",
        "Source Files Included",
        "Priority Support",
        "3-5 Day Delivery",
        "1 Month Free Design Support"
      ],
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />
    },
    {
      name: "Enterprise Design Package",
      price: "From R15,850",
      description: "Premium design solutions for established brands",
      features: [
        "Logo Design (6 Concepts)",
        "Complete Brand Identity",
        "Social Media Kit (10 Templates)",
        "Marketing Collateral Design",
        "Packaging Design",
        "Website Graphics",
        "Advanced Brand Guidelines",
        "Unlimited Revisions",
        "Source Files Included",
        "24/7 Priority Support",
        "2-3 Day Delivery",
        "3 Months Free Design Support"
      ],
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />
    }
  ];

  const additionalServices = [
    {
      name: "Logo Design",
      price: "From R2,850",
      features: ["3 Concepts", "3 Revisions", "Source Files", "Brand Guidelines"]
    },
    {
      name: "Social Media Graphics",
      price: "From R1,850/month",
      features: ["10 Posts/Month", "2 Revisions/Post", "Custom Templates", "Content Calendar"]
    },
    {
      name: "Print Design",
      price: "From R950",
      features: ["Business Cards", "Flyers", "Brochures", "Print-Ready Files"]
    },
    {
      name: "Packaging Design",
      price: "From R4,850",
      features: ["3D Mockups", "Print-Ready Files", "Technical Specifications", "Production Support"]
    }
  ];

  const relatedServices = [
    {
      title: 'Brand Identity',
      href: '/pricing/brand-identity',
      description: 'Complete brand identity solutions',
      anchor: 'Brand Identity'
    },
    {
      title: 'Marketing Materials',
      href: '/pricing/marketing-materials',
      description: 'Professional marketing collateral design',
      anchor: 'Marketing'
    },
    {
      title: 'Website Design',
      href: '/pricing/website-design',
      description: 'Custom website design services',
      anchor: 'Web Design'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Breadcrumb items={breadcrumbItems} />
        
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mt-12 mb-16"
        >
          <h1 className="text-4xl font-bold mb-4">Graphic Design Services</h1>
          <p className="text-xl text-gray-400">Professional graphic design solutions for your brand</p>
        </motion.div>

        {/* Design Packages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {designPackages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-zinc-900 rounded-lg p-8 border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-colors"
            >
              <div className="flex items-center justify-center mb-6">
                {pkg.icon}
              </div>
              <h3 className="text-2xl font-bold text-[#FFD700] text-center mb-4">{pkg.name}</h3>
              <p className="text-3xl font-bold text-center mb-4">{pkg.price}</p>
              <p className="text-neutral-300 text-center mb-6">{pkg.description}</p>
              <div className="space-y-4">
                <ul className="space-y-2">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <FaCheck className="text-[#FFD700] mr-2 flex-shrink-0 mt-1" />
                      <span className="text-neutral-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8">
                <GetInTouchButton 
                  variant="primary" 
                  text="Get Started" 
                  className="w-full py-3 px-4 bg-[#FFD700] text-black font-semibold rounded hover:bg-[#FFE44D] transition-colors"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Services */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">Additional Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <FaCheck className="text-[#FFD700] mr-2 flex-shrink-0 mt-1" />
                      <span className="text-neutral-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <section className="py-20 bg-neutral-800 rounded-lg mt-20">
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

        {/* Related Services */}
        <div className="mt-20">
          <RelatedServices 
            currentService="graphic-design"
            services={relatedServices}
          />
        </div>
      </div>
    </div>
  );
};

export default GraphicDesignPage;