'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface PackageCardProps {
  name: string;
  price: string;
  period?: string;
  features: string[];
  popular?: boolean;
}

const PackageCard = ({ name, price, period, features, popular = false }: PackageCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-zinc-900/50 backdrop-blur-sm rounded-xl p-8 ${
        popular 
          ? 'border-2 border-[#FFD700] relative' 
          : 'border border-[#FFD700]/20 hover:border-[#FFD700]/40'
      } transition-all duration-300`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-[#FFD700] text-black text-sm font-bold py-1 px-4 rounded-full">
            Most Popular
          </span>
        </div>
      )}
      
      <h3 className="text-2xl font-bold mb-4 text-white">{name}</h3>
      <div className="text-3xl font-bold text-[#FFD700] mb-1">
        {price}
        {period && <span className="text-lg text-white/60">{period}</span>}
      </div>
      <div className="mb-8 h-1 w-12 bg-[#FFD700]/40"></div>
      <ul className="space-y-4 mb-8">
        {features.map((feature) => (
          <li key={feature} className="flex items-start">
            <svg className="w-6 h-6 text-[#FFD700] mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-white/80">{feature}</span>
          </li>
        ))}
      </ul>
      <Link href="/get-in-touch-pretoria" className="block">
        <button className="w-full py-3 px-6 bg-[#FFD700] text-black font-bold rounded-lg hover:bg-[#FFC000] transition-colors duration-300">
          {period ? 'Subscribe Now' : 'Get Started'}
        </button>
      </Link>
    </motion.div>
  );
};

export default PackageCard;
