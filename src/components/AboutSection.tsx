'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const stats = [
  { id: 1, value: '100+', label: 'Projects Completed' },
  { id: 2, value: '50+', label: 'Happy Clients' },
  { id: 3, value: '5+', label: 'Years Experience' },
  { id: 4, value: '24/7', label: 'Support' },
];

export default function AboutSection() {
  return (
    <section className="py-20 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-syne font-bold text-white mb-6">
              Crafting Digital Excellence
            </h2>
            <p className="text-neutral-400 mb-8">
              At WL CreationX, we're more than just a design agency. We're your partners in digital transformation, committed to turning your vision into reality. Our team of experts combines creativity with technical expertise to deliver solutions that make an impact.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              {stats.map((stat) => (
                <div key={stat.id} className="text-center p-4 bg-white/5 rounded-xl">
                  <div className="text-[#FFD700] text-3xl font-bold mb-2">
                    {stat.value}
                  </div>
                  <div className="text-neutral-400 text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/about-graphic-design-company-pretoria"
              className="inline-flex items-center justify-center px-8 py-3 border border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black rounded-full transition-all duration-300"
            >
              Learn More About Us
            </Link>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image
                src="/images/about/team.jpg"
                alt="WL CreationX Team"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/50 to-transparent" />
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#FFD700]/10 rounded-full blur-xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#FFD700]/10 rounded-full blur-xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
