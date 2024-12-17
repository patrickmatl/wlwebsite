'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface PackageCardProps {
  pkg: {
    name: string;
    price: string;
    features: string[];
  };
  index: number;
}

const PackageCard = ({ pkg, index }: PackageCardProps) => {
  return (
    <motion.div
      key={pkg.name}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-zinc-900 rounded-lg p-8 border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all duration-300"
    >
      <h3 className="text-2xl font-bold mb-4">{pkg.name}</h3>
      <div className="text-3xl font-bold text-[#FFD700] mb-6">{pkg.price}</div>
      <ul className="space-y-4 mb-8">
        {pkg.features.map((feature) => (
          <li key={feature} className="flex items-start">
            <svg className="w-6 h-6 text-[#FFD700] mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>
      <Link href="/contact" className="block">
        <button className="w-full py-3 px-6 bg-[#FFD700] text-black font-bold rounded-lg hover:bg-[#FFA500] transition-colors duration-300">
          Get Started
        </button>
      </Link>
    </motion.div>
  );
};

export default PackageCard;
