'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaPalette, FaCode, FaShoppingCart, FaSearchDollar, FaMobileAlt, FaBox } from 'react-icons/fa';

const services = [
  {
    title: 'Graphic Design',
    description: 'Professional graphic design services for all your visual communication needs.',
    icon: <FaPalette className="w-6 h-6" />,
    href: '/pricing/graphic-design-pretoria'
  },
  {
    title: 'Web Development',
    description: 'Custom website development using modern technologies and best practices.',
    icon: <FaCode className="w-6 h-6" />,
    href: '/pricing/website-design-pretoria'
  },
  {
    title: 'E-commerce',
    description: 'Complete e-commerce solutions to help you sell online effectively.',
    icon: <FaShoppingCart className="w-6 h-6" />,
    href: '/pricing/ecommerce'
  },
  {
    title: 'Google Ads',
    description: 'Strategic Google Ads management to boost your online visibility.',
    icon: <FaSearchDollar className="w-6 h-6" />,
    href: '/pricing/google-ads'
  },
  {
    title: 'Mobile Solutions',
    description: 'Mobile app development and responsive design solutions.',
    icon: <FaMobileAlt className="w-6 h-6" />,
    href: '/pricing/mobile-solutions'
  },
  {
    title: 'Packaging Design',
    description: 'Creative packaging design solutions that make your products stand out.',
    icon: <FaBox className="w-6 h-6" />,
    href: '/pricing/packaging-design'
  }
];

const ServicesSection = () => {
  return (
    <section className="py-20 bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-[#FFD700] mb-4">Our Services</h2>
          <p className="text-lg text-neutral-400">Comprehensive digital solutions for your business</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={service.href}>
                <div className="bg-neutral-800 rounded-lg p-6 h-full hover:bg-neutral-700 transition-colors duration-300">
                  <div className="text-[#FFD700] mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-neutral-400">{service.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
