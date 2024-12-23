'use client';

import { motion } from 'framer-motion';
import { FaRocket, FaChartLine, FaBuilding, FaCheck, FaGoogle, FaSearchDollar, FaStore } from 'react-icons/fa';
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

  const setupPackages = [
    {
      name: "Google Ads Account Setup",
      price: "From R4,500 Once-off",
      icon: <FaRocket className="w-8 h-8 text-[#FFD700]" />,
      description: "Professional Google Ads account setup with comprehensive campaign structure and targeting.",
      specifications: [
        "Setup Time: 5-7 Business Days",
        "Campaign Types: Search, Display, or Shopping",
        "Conversion Tracking Setup",
        "Analytics Integration"
      ],
      features: [
        "Account Structure Setup",
        "Campaign Strategy Development",
        "Keyword Research & Analysis",
        "Competitor Analysis",
        "Ad Copy Creation (3 Variations)",
        "Landing Page Recommendations",
        "Conversion Tracking Setup",
        "Google Analytics Integration",
        "Google Tag Manager Setup",
        "Audience Definition",
        "Bid Strategy Setup",
        "Quality Score Optimization"
      ],
      deliverables: [
        "Campaign Structure Document",
        "Keyword Research Report",
        "Competitor Analysis Report",
        "Setup Documentation",
        "Training Session",
        "30-Day Strategy Plan"
      ]
    }
  ];

  const monthlyPackages = [
    {
      name: "Starter Package",
      price: "R4,500/month",
      adSpend: "Recommended Ad Spend: R5,000 - R15,000/month",
      icon: <FaBuilding className="w-8 h-8 text-[#FFD700]" />,
      description: "Perfect for small businesses looking to start with Google Ads or manage a modest ad budget effectively.",
      specifications: [
        "Campaign Types: Search",
        "Ad Groups: Up to 10",
        "Keywords: Up to 250",
        "Monthly Report",
        "Response Time: 48 Hours"
      ],
      features: [
        "Campaign Management",
        "Keyword Optimization",
        "Bid Management",
        "Ad Copy Updates",
        "Basic A/B Testing",
        "Monthly Performance Report",
        "Basic Competitor Analysis",
        "Search Term Analysis",
        "Quality Score Monitoring",
        "Basic Landing Page Advice",
        "Monthly Strategy Call",
        "Email Support"
      ],
      deliverables: [
        "Monthly Performance Report",
        "Optimization Recommendations",
        "Strategy Updates",
        "Campaign Adjustments",
        "ROI Tracking"
      ],
      recommended: false
    },
    {
      name: "Professional Package",
      price: "R8,500/month",
      adSpend: "Recommended Ad Spend: R15,000 - R50,000/month",
      icon: <FaChartLine className="w-8 h-8 text-[#FFD700]" />,
      description: "Comprehensive Google Ads management for growing businesses seeking to scale their digital presence.",
      specifications: [
        "Campaign Types: Search, Display",
        "Ad Groups: Up to 25",
        "Keywords: Up to 1000",
        "Weekly Reports",
        "Response Time: 24 Hours"
      ],
      features: [
        "Advanced Campaign Management",
        "Extensive Keyword Optimization",
        "Smart Bidding Strategies",
        "Regular Ad Copy Testing",
        "Advanced A/B Testing",
        "Weekly Performance Reports",
        "Competitor Tracking",
        "In-Depth Search Term Analysis",
        "Landing Page Optimization",
        "Conversion Rate Optimization",
        "Bi-Weekly Strategy Calls",
        "Priority Support",
        "Remarketing Campaigns",
        "Display Campaign Management"
      ],
      deliverables: [
        "Weekly Performance Reports",
        "Monthly Strategy Document",
        "Competitor Analysis Updates",
        "Landing Page Recommendations",
        "ROI & ROAS Analysis"
      ],
      recommended: true
    },
    {
      name: "Enterprise Package",
      price: "R15,500/month",
      adSpend: "Recommended Ad Spend: R50,000+/month",
      icon: <FaBuilding className="w-8 h-8 text-[#FFD700]" />,
      description: "Elite Google Ads management for businesses requiring comprehensive coverage and maximum ROI.",
      specifications: [
        "Campaign Types: Search, Display, Shopping, Video",
        "Ad Groups: Unlimited",
        "Keywords: Unlimited",
        "Daily Monitoring",
        "Response Time: Priority"
      ],
      features: [
        "Full-Service Campaign Management",
        "Dynamic Search Ads",
        "Shopping Campaign Optimization",
        "Video Campaign Management",
        "Custom Audience Creation",
        "Advanced Bidding Strategies",
        "Continuous Ad Testing",
        "Cross-Channel Strategy",
        "Custom Dashboard Access",
        "Advanced Attribution Modeling",
        "Weekly Strategy Calls",
        "24/7 Priority Support",
        "Performance Max Campaigns",
        "Local Campaign Optimization"
      ],
      deliverables: [
        "Real-Time Dashboard Access",
        "Weekly Strategy Sessions",
        "Monthly Performance Review",
        "Custom Report Suite",
        "ROI Optimization Plan"
      ],
      recommended: false
    }
  ];

  const additionalServices = [
    {
      name: "Landing Page Optimization",
      price: "From R3,500",
      description: "CRO-focused landing page optimization"
    },
    {
      name: "Shopping Feed Optimization",
      price: "From R2,500/month",
      description: "Product feed management and optimization"
    }
  ];

  const relatedServices = [
    {
      title: 'SEO Services',
      description: 'Improve your organic search rankings and visibility.',
      href: '/pricing/seo',
      anchor: 'Explore SEO Services'
    },
    {
      title: 'Social Media Marketing',
      description: 'Expand your reach with social media advertising.',
      href: '/pricing/social-media',
      anchor: 'View Social Media Services'
    },
    {
      title: 'Analytics & Reporting',
      description: 'Get insights into your digital marketing performance.',
      href: '/pricing/analytics',
      anchor: 'Discover Analytics Services'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Google Ads Management</h1>
        <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
          Drive targeted traffic and increase conversions with our professional Google Ads management services
        </p>
      </div>

      {/* Setup Packages */}
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-[#FFD700] text-center mb-8">Setup Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {setupPackages.map((pkg, index) => (
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
              <p className="text-3xl font-bold text-center mb-4">{pkg.price}</p>
              <p className="text-neutral-300 text-center mb-6">{pkg.description}</p>
              <div className="space-y-4 mb-6">
                <h4 className="font-semibold text-[#FFD700]">Specifications:</h4>
                <ul className="space-y-2">
                  {pkg.specifications.map((spec, i) => (
                    <li key={i} className="flex items-start">
                      <FaCheck className="text-[#FFD700] mr-2 flex-shrink-0 mt-1" />
                      <span className="text-neutral-300">{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button className="w-full py-3 px-4 bg-[#FFD700] text-black font-semibold rounded hover:bg-[#FFE44D] transition-colors">
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Monthly Management */}
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-[#FFD700] text-center mb-8">Monthly Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {monthlyPackages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
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
              <div className="flex items-center justify-center mb-6">
                {pkg.icon}
              </div>
              <h3 className="text-2xl font-bold text-[#FFD700] text-center mb-4">{pkg.name}</h3>
              <p className="text-3xl font-bold text-center mb-4">{pkg.price}</p>
              <p className="text-neutral-300 text-center mb-6">{pkg.description}</p>
              <div className="space-y-4 mb-6">
                <h4 className="font-semibold text-[#FFD700]">Includes:</h4>
                <ul className="space-y-2">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <FaCheck className="text-[#FFD700] mr-2 flex-shrink-0 mt-1" />
                      <span className="text-neutral-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button className="w-full py-3 px-4 bg-[#FFD700] text-black font-semibold rounded hover:bg-[#FFE44D] transition-colors">
                Get Started
              </button>
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
            {serviceFAQs['google-ads'].map((faq: { question: string; answer: string }, index: number) => (
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
        currentService="Google Ads"
        services={[
          { 
            href: '/pricing/social-media',
            anchor: 'Social Media Management',
            title: 'Social Media Services',
            description: 'Complement your Google Ads with effective social media management'
          },
          { 
            href: '/pricing/website-maintenance',
            anchor: 'Website Maintenance',
            title: 'Website Maintenance Services',
            description: 'Keep your landing pages optimized for Google Ads campaigns'
          },
          { 
            href: '/pricing/ecommerce',
            anchor: 'E-commerce Solutions',
            title: 'E-commerce Development',
            description: 'Create high-converting e-commerce sites for your Google Ads'
          }
        ]}
      />

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Grow Your Business with Google Ads?
          </h2>
          <p className="text-xl text-neutral-300 mb-8">
            Contact us for a free consultation and let's create a winning Google Ads strategy
          </p>
          <GetInTouchButton variant="primary" text="Start Your Project" className="text-lg" />
        </div>
      </section>
    </div>
  );
};

export default GoogleAdsPage;
