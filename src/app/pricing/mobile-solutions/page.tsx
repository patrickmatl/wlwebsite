'use client';

import { motion } from 'framer-motion';
import { FaMobileAlt, FaTabletAlt, FaGlobe, FaRocket, FaCheck } from 'react-icons/fa';
import Breadcrumb from '@/components/Breadcrumb';
import RelatedServices from '@/components/RelatedServices';
import GetInTouchButton from '@/components/GetInTouchButton';
import { generateServiceSchema, generateFAQSchema } from '@/lib/schema';
import { serviceFAQs } from '@/data/serviceFAQs';

const MobileSolutionsPage = () => {
  const packages = [
    {
      name: "Mobile-First Website",
      price: "R16,780.00",
      icon: <FaMobileAlt className="w-8 h-8 text-[#FFD700]" />,
      description: "Our mobile-first website package includes a responsive design, fast loading speed, and basic SEO setup.",
      features: [
        "Mobile-Optimized Design",
        "Responsive Layouts",
        "Fast Loading Speed",
        "Touch-Friendly Interface",
        "Cross-Browser Compatible",
        "Basic SEO Setup",
        "Contact Forms",
        "Social Media Integration",
        "3 Months Support"
      ]
    },
    {
      name: "Progressive Web App (PWA)",
      price: "R23,890.00",
      icon: <FaGlobe className="w-8 h-8 text-[#FFD700]" />,
      description: "Our PWA package includes offline functionality, push notifications, and home screen installation.",
      features: [
        "Offline Functionality",
        "App-Like Experience",
        "Push Notifications",
        "Home Screen Installation",
        "Fast Performance",
        "Cross-Platform Support",
        "Automatic Updates",
        "Analytics Integration",
        "6 Months Support"
      ]
    },
    {
      name: "Custom Mobile Solution",
      price: "R32,980.00",
      icon: <FaRocket className="w-8 h-8 text-[#FFD700]" />,
      description: "Our custom mobile solution package includes custom functionality, advanced features, and API integration.",
      features: [
        "Custom Functionality",
        "Advanced Features",
        "API Integration",
        "Database Integration",
        "User Authentication",
        "Admin Dashboard",
        "Advanced Analytics",
        "Performance Optimization",
        "12 Months Support"
      ]
    }
  ];

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Mobile Solutions', href: '/pricing/mobile-solutions' }
  ];

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
      <Breadcrumb items={breadcrumbItems} />
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Mobile Solutions</h1>
        <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
          Create powerful mobile experiences for your users with our expert development services
        </p>
      </div>

      {/* Service Packages */}
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-[#FFD700] text-center mb-8">Development Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              <p className="text-3xl font-bold text-center mb-4">{pkg.price}</p>
              <p className="text-neutral-300 text-center mb-6">{pkg.description}</p>
              <div className="space-y-4 mb-6">
                <h4 className="font-semibold text-[#FFD700]">Features:</h4>
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

      {/* FAQs */}
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-[#FFD700] text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {serviceFAQs['mobile-solutions'].map((faq: { question: string; answer: string }, index: number) => (
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

      {/* Related Services */}
      <RelatedServices
        currentService="Mobile Solutions"
        services={[
          { 
            href: '/pricing/custom-development',
            anchor: 'Custom Development',
            title: 'Custom Development Services',
            description: 'Build custom web applications that integrate with your mobile solutions'
          },
          { 
            href: '/pricing/website-maintenance',
            anchor: 'Website Maintenance',
            title: 'Website Maintenance Services',
            description: 'Keep your mobile and web applications running smoothly'
          },
          { 
            href: '/pricing/ecommerce',
            anchor: 'E-commerce Solutions',
            title: 'E-commerce Development',
            description: 'Create mobile-friendly e-commerce solutions for your business'
          }
        ]}
      />

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Build Your Mobile Solution?
          </h2>
          <p className="text-xl text-neutral-300 mb-8">
            Contact us for a free consultation and let's bring your mobile vision to life
          </p>
          <GetInTouchButton variant="primary" text="Start Your Project" className="text-lg" />
        </div>
      </section>
    </div>
  );
};

export default MobileSolutionsPage;
