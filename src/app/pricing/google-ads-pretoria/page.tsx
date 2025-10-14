'use client';

import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';
import RelatedServices from '@/components/RelatedServices';
import GetInTouchButton from '@/components/GetInTouchButton';
import { serviceFAQs } from '@/data/serviceFAQs';
import Link from 'next/link';

const GoogleAdsPage = () => {
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
      href: '/pricing/website-design-pretoria',
      description: 'Custom website design services',
      anchor: 'Web Design'
    },
    {
      title: 'Contact Us',
      description: 'Get in touch for Google Ads management.',
      href: '/get-in-touch-pretoria',
      anchor: 'Contact Us'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* BEGIN: Visually Hidden SEO Headings H1-H5 for Google Ads Pretoria */}
      <section style={{position:'absolute',left:'-9999px',top:'auto',width:'1px',height:'1px',overflow:'hidden'}} aria-hidden="true">
        <h1>Google Ads Management in Pretoria | WL CreationX</h1>
        <p>WL CreationX is Pretoria’s trusted Google Ads agency, driving targeted traffic and conversions with expertly managed PPC campaigns for local businesses.</p>
        <h2>Pretoria’s Leading Google Ads Agency</h2>
        <p>Our Pretoria-based team creates, manages, and optimizes Google Ads campaigns for maximum ROI. We help Pretoria companies grow with data-driven SEM strategies.</p>
        <h3>PPC & SEM Services for Pretoria Businesses</h3>
        <p>From search to display and shopping ads, we deliver measurable results for Pretoria clients using advanced targeting, creative ad copy, and conversion tracking.</p>
        <h4>Affordable Google Ads Packages in Pretoria</h4>
        <p>Choose from starter to enterprise packages with transparent pricing and expert support for Pretoria SMEs and corporates.</p>
        <h5>Why Choose WL CreationX for Google Ads in Pretoria?</h5>
        <p>Local expertise, certified professionals, and a proven track record. WL CreationX is Pretoria’s go-to partner for Google Ads success.</p>
      </section>
      {/* END: Visually Hidden SEO Headings H1-H5 for Google Ads Pretoria */}
      {/* BEGIN: Visually Hidden Google Ads FAQ for Pretoria */}
      <section style={{position:'absolute',left:'-9999px',top:'auto',width:'1px',height:'1px',overflow:'hidden'}} aria-hidden="true">
        <h2>Frequently Asked Questions about Google Ads in Pretoria</h2>
        <div><h3>What is Google Ads management?</h3><p>Google Ads management is the process of creating, optimizing, and monitoring paid search campaigns to drive targeted traffic and leads for Pretoria businesses.</p></div>
        <div><h3>How much does Google Ads management cost in Pretoria?</h3><p>WL CreationX offers Google Ads packages starting from R4,850/month, plus recommended ad spend. Pricing depends on package and campaign complexity.</p></div>
        <div><h3>What types of Google Ads do you manage?</h3><p>We manage search, display, shopping, and remarketing campaigns for Pretoria businesses across all industries.</p></div>
        <div><h3>Is Google Ads effective for Pretoria businesses?</h3><p>Yes! Google Ads delivers instant visibility and qualified leads for Pretoria companies looking to grow online.</p></div>
        <div><h3>Do you provide landing page design?</h3><p>Yes, we design high-converting landing pages tailored to your Pretoria campaigns for better results.</p></div>
        <div><h3>Can you track conversions?</h3><p>Absolutely. We set up conversion tracking and provide detailed monthly reports for Pretoria clients.</p></div>
        <div><h3>Do you manage shopping campaigns?</h3><p>Yes, we set up and optimize Google Shopping campaigns for Pretoria e-commerce businesses.</p></div>
        <div><h3>How soon will I see results?</h3><p>Most Pretoria clients see initial results within the first month, with ongoing optimization improving performance over time.</p></div>
        <div><h3>Do you offer support?</h3><p>All packages include email or priority support for Pretoria clients, plus regular strategy calls or meetings.</p></div>
        <div><h3>Which areas of Pretoria do you serve?</h3><p>We serve all of Pretoria and nearby regions, including Centurion, Hatfield, Brooklyn, Pretoria East, and more.</p></div>
      </section>
      {/* END: Visually Hidden Google Ads FAQ for Pretoria */}
      {/* BEGIN: FAQPage Structured Data for Google Ads Pretoria */}
      <script type="application/ld+json" suppressHydrationWarning>
        {`
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is Google Ads management?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Google Ads management is the process of creating, optimizing, and monitoring paid search campaigns to drive targeted traffic and leads for Pretoria businesses."
              }
            },
            {
              "@type": "Question",
              "name": "How much does Google Ads management cost in Pretoria?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "WL CreationX offers Google Ads packages starting from R4,850/month, plus recommended ad spend. Pricing depends on package and campaign complexity."
              }
            },
            {
              "@type": "Question",
              "name": "What types of Google Ads do you manage?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We manage search, display, shopping, and remarketing campaigns for Pretoria businesses across all industries."
              }
            },
            {
              "@type": "Question",
              "name": "Is Google Ads effective for Pretoria businesses?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Google Ads delivers instant visibility and qualified leads for Pretoria companies looking to grow online."
              }
            },
            {
              "@type": "Question",
              "name": "Do you provide landing page design?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, we design high-converting landing pages tailored to your Pretoria campaigns for better results."
              }
            },
            {
              "@type": "Question",
              "name": "Can you track conversions?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Absolutely. We set up conversion tracking and provide detailed monthly reports for Pretoria clients."
              }
            },
            {
              "@type": "Question",
              "name": "Do you manage shopping campaigns?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, we set up and optimize Google Shopping campaigns for Pretoria e-commerce businesses."
              }
            },
            {
              "@type": "Question",
              "name": "How soon will I see results?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Most Pretoria clients see initial results within the first month, with ongoing optimization improving performance over time."
              }
            },
            {
              "@type": "Question",
              "name": "Do you offer support?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "All packages include email or priority support for Pretoria clients, plus regular strategy calls or meetings."
              }
            },
            {
              "@type": "Question",
              "name": "Which areas of Pretoria do you serve?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We serve all of Pretoria and nearby regions, including Centurion, Hatfield, Brooklyn, Pretoria East, and more."
              }
            }
          ]
        }
        `}
      </script>
      {/* END: FAQPage Structured Data for Google Ads Pretoria */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
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
        {/* Contextual link to homepage with varied phrasing */}
        <div className="mt-10 text-center">
          <p className="text-neutral-400 text-sm">
            Learn about our <Link href="/" className="text-[#FFD700] hover:underline">graphic design agency Pretoria</Link> on the homepage.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GoogleAdsPage;
