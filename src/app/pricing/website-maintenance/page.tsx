'use client';

import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';
import Breadcrumb from '@/components/Breadcrumb';
import RelatedServices from '@/components/RelatedServices';
import GetInTouchButton from '@/components/GetInTouchButton';
import { serviceFAQs } from '@/data/serviceFAQs';

const WebsiteMaintenancePage = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Website Maintenance', href: '/pricing/website-maintenance' }
  ];

  const maintenancePackages = [
    {
      name: "Essential Maintenance",
      price: "R850/month",
      description: "Basic maintenance for small websites",
      features: [
        "Monthly Software Updates",
        "Basic Security Monitoring",
        "Weekly Backups",
        "Basic Performance Checks",
        "Up to 2 Content Updates",
        "Email Support",
        "Monthly Reports",
        "Response Time: 48 Hours"
      ],
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />
    },
    {
      name: "Professional Maintenance",
      price: "R1,850/month",
      description: "Comprehensive care for business websites",
      features: [
        "Weekly Software Updates",
        "Advanced Security Monitoring",
        "Daily Backups",
        "Performance Optimization",
        "Up to 5 Content Updates",
        "Priority Email & Phone Support",
        "Weekly Reports",
        "Response Time: 24 Hours",
        "SSL Certificate Management",
        "Monthly SEO Check",
        "Uptime Monitoring",
        "Database Optimization"
      ],
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />
    },
    {
      name: "Enterprise Maintenance",
      price: "R3,850/month",
      description: "Premium support for high-traffic websites",
      features: [
        "Real-time Software Updates",
        "24/7 Security Monitoring",
        "Hourly Backups",
        "Advanced Performance Optimization",
        "Unlimited Content Updates",
        "24/7 Priority Support",
        "Real-time Reports",
        "Response Time: 2 Hours",
        "Premium SSL Management",
        "Weekly SEO Optimization",
        "CDN Management",
        "Load Balancing",
        "DDoS Protection",
        "Emergency Support"
      ],
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />
    }
  ];

  const relatedServices = [
    {
      title: 'Website Design',
      href: '/pricing/website-design',
      description: 'Custom website design services',
      anchor: 'Website Design'
    },
    {
      title: 'SEO Services',
      href: '/pricing/seo',
      description: 'Search engine optimization services',
      anchor: 'SEO'
    },
    {
      title: 'Website Security',
      href: '/pricing/website-security',
      description: 'Website security and protection services',
      anchor: 'Security'
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
          <h1 className="text-4xl font-bold mb-4">Website Maintenance Services</h1>
          <p className="text-xl text-gray-400">Keep your website running smoothly with our professional maintenance services</p>
        </motion.div>

        {/* Maintenance Packages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {maintenancePackages.map((pkg, index) => (
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

        {/* FAQ Section */}
        <section className="py-20 bg-neutral-800 rounded-lg">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {serviceFAQs['website-maintenance']?.map((faq, index) => (
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
            currentService="website-maintenance"
            services={relatedServices}
          />
        </div>
      </div>
    </div>
  );
};

export default WebsiteMaintenancePage;
