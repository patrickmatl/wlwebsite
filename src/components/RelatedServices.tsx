'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface RelatedService {
  title: string;
  description: string;
  href: string;
  anchor: string;
}

interface RelatedServicesProps {
  currentService: string;
  services: RelatedService[];
}

const RelatedServices = ({ currentService, services }: RelatedServicesProps) => {
  return (
    <section className="py-16 bg-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Related Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services
            .filter(service => service.title !== currentService)
            .map((service, index) => (
              <motion.div
                key={service.title}
                className="bg-neutral-900 rounded-lg p-6 hover:bg-neutral-700 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-bold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-neutral-400 mb-4">
                  {service.description}
                </p>
                <Link
                  href={service.href}
                  className="text-gold-500 hover:text-gold-400 font-semibold inline-flex items-center"
                >
                  {service.anchor} →
                </Link>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedServices;
