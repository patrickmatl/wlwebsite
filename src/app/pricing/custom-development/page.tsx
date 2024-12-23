'use client';

import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';
import Breadcrumb from '@/components/Breadcrumb';
import RelatedServices from '@/components/RelatedServices';
import GetInTouchButton from '@/components/GetInTouchButton';
import { serviceFAQs } from '@/data/serviceFAQs';

const CustomDevelopmentPage = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Custom Development', href: '/pricing/custom-development' }
  ];

  const packages = [
    {
      name: "Custom Web Application",
      price: "Starting at R27,980.00",
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />,
      description: "Custom web application development",
      features: [
        "Custom UI/UX Design",
        "Secure Authentication",
        "Database Integration",
        "API Development",
        "Custom Business Logic",
        "Performance Optimization",
        "Testing & QA",
        "Documentation",
        "6 Months Support"
      ]
    },
    {
      name: "Enterprise System",
      price: "Starting at R45,890.00",
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />,
      description: "Enterprise system development",
      features: [
        "Complex Business Logic",
        "Multiple User Roles",
        "Advanced Security",
        "Data Analytics",
        "Third-party Integrations",
        "Scalable Architecture",
        "Comprehensive Testing",
        "Full Documentation",
        "12 Months Support"
      ]
    },
    {
      name: "API & Integration",
      price: "Starting at R18,780.00",
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />,
      description: "API and integration development",
      features: [
        "RESTful API Design",
        "Authentication & Security",
        "Third-party Integration",
        "Data Transformation",
        "Performance Optimization",
        "API Documentation",
        "Testing Suite",
        "Monitoring Setup",
        "6 Months Support"
      ]
    }
  ];

  const technologies = [
    {
      name: "React",
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />
    },
    {
      name: "Node.js",
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />
    },
    {
      name: "MongoDB",
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />
    },
    {
      name: "AWS",
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
      <Breadcrumb items={breadcrumbItems} />
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Custom Development Solutions</h1>
        <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
          Transform your ideas into reality with our expert custom development services
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

      {/* Technologies */}
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-[#FFD700] text-center mb-8">Technologies We Use</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-zinc-900 rounded-lg p-6 text-center border border-[#FFD700]/20"
            >
              <div className="flex items-center justify-center mb-4">
                {tech.icon}
              </div>
              <h3 className="text-lg font-bold text-[#FFD700]">{tech.name}</h3>
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
            {serviceFAQs['custom-development']?.map((faq, index) => (
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
        currentService="Custom Development"
        services={[
          { 
            href: '/pricing/website-maintenance',
            anchor: 'Website Maintenance',
            title: 'Website Maintenance Services',
            description: 'Keep your custom-built solutions running smoothly with our maintenance services'
          },
          { 
            href: '/pricing/mobile-solutions',
            anchor: 'Mobile Solutions',
            title: 'Mobile Development Services',
            description: 'Extend your web applications with custom mobile solutions'
          },
          { 
            href: '/pricing/ecommerce',
            anchor: 'E-commerce Solutions',
            title: 'E-commerce Development',
            description: 'Build custom e-commerce solutions tailored to your business needs'
          }
        ]}
      />

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Build Your Custom Solution?
          </h2>
          <p className="text-xl text-neutral-300 mb-8">
            Contact us for a free consultation and let's bring your vision to life
          </p>
          <GetInTouchButton variant="primary" text="Start Your Project" className="text-lg" />
        </div>
      </section>
    </div>
  );
};

export default CustomDevelopmentPage;
