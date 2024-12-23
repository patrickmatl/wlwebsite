'use client';

import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';
import Breadcrumb from '@/components/Breadcrumb';
import RelatedServices from '@/components/RelatedServices';
import GetInTouchButton from '@/components/GetInTouchButton';
import { serviceFAQs } from '@/data/serviceFAQs';

const GoogleAdsPage = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Google Ads', href: '/pricing/google-ads' }
  ];

  const adPackages = [
    {
      name: "Starter Ads Package",
      price: "R4,850/month",
      description: "Perfect for small businesses starting with Google Ads",
      adSpend: "R5,000 - R15,000",
      features: [
        "Campaign Strategy Development",
        "Keyword Research & Analysis",
        "Ad Copy Creation (2 Variations)",
        "Basic Landing Page Optimization",
        "Conversion Tracking Setup",
        "Monthly Performance Reports",
        "Basic Competitor Analysis",
        "Weekly Campaign Optimization",
        "Email Support",
        "Monthly Strategy Call"
      ],
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />
    },
    {
      name: "Growth Ads Package",
      price: "R8,850/month",
      description: "For businesses ready to scale their Google Ads",
      adSpend: "R15,000 - R50,000",
      features: [
        "Advanced Campaign Strategy",
        "Comprehensive Keyword Research",
        "Ad Copy Creation (4 Variations)",
        "A/B Testing",
        "Advanced Landing Page Optimization",
        "Enhanced Conversion Tracking",
        "Bi-Weekly Performance Reports",
        "Competitor Strategy Analysis",
        "Remarketing Campaigns",
        "Shopping Campaigns (if applicable)",
        "Priority Support",
        "Bi-Weekly Strategy Calls"
      ],
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />
    },
    {
      name: "Enterprise Ads Package",
      price: "R15,850/month",
      description: "Full-service management for large ad budgets",
      adSpend: "R50,000+",
      features: [
        "Custom Campaign Strategy",
        "Advanced Keyword & Market Analysis",
        "Dynamic Ad Copy Testing",
        "Conversion Rate Optimization",
        "Custom Landing Page Development",
        "Advanced Analytics Integration",
        "Weekly Performance Reports",
        "Cross-Channel Strategy",
        "Automated Bid Management",
        "Custom Audience Creation",
        "24/7 Priority Support",
        "Weekly Strategy Meetings",
        "Dedicated Account Manager"
      ],
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />
    }
  ];

  const additionalServices = [
    {
      name: "Landing Page Design",
      price: "From R4,850",
      features: [
        "Custom Design",
        "Mobile Optimization",
        "A/B Testing Setup",
        "Conversion Tracking"
      ]
    },
    {
      name: "Display Advertising",
      price: "From R3,850/month",
      features: [
        "Banner Design",
        "Audience Targeting",
        "Remarketing Setup",
        "Performance Tracking"
      ]
    },
    {
      name: "Shopping Campaigns",
      price: "From R5,850/month",
      features: [
        "Product Feed Optimization",
        "Campaign Setup",
        "Bid Management",
        "Performance Tracking"
      ]
    }
  ];

  const relatedServices = [
    {
      title: 'SEO Services',
      href: '/pricing/seo',
      description: 'Search engine optimization services',
      anchor: 'SEO'
    },
    {
      title: 'Social Media Marketing',
      href: '/pricing/social-media',
      description: 'Social media marketing and management',
      anchor: 'Social Media'
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
          <h1 className="text-4xl font-bold mb-4">Google Ads Management</h1>
          <p className="text-xl text-gray-400">Drive targeted traffic and increase conversions with professional Google Ads management</p>
        </motion.div>

        {/* Ad Packages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {adPackages.map((pkg, index) => (
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
              <p className="text-neutral-300 text-center mb-2">{pkg.description}</p>
              <p className="text-sm text-[#FFD700] text-center mb-6">Recommended Ad Spend: {pkg.adSpend}</p>
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
              {serviceFAQs['google-ads']?.map((faq, index) => (
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
            currentService="google-ads"
            services={relatedServices}
          />
        </div>
      </div>
    </div>
  );
};

export default GoogleAdsPage;
