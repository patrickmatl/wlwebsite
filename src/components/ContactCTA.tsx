'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BUSINESS } from '@/data/business';

export default function ContactCTA() {
  return (
    <section className="py-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/20 to-transparent opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-syne font-bold text-white mb-6">
            Ready to Transform Your Digital Presence?
          </h2>
          <p className="text-neutral-300 text-lg mb-8">
            Let's discuss how we can help your business grow with our tailored digital solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              href="/get-in-touch-pretoria"
              className="inline-flex items-center justify-center px-8 py-3 bg-[#FFD700] text-black hover:bg-[#FFA500] rounded-full transition-all duration-300 font-medium"
            >
              Get Started
            </Link>
            <Link
              href="/project-showcase-pretoria"
              className="inline-flex items-center justify-center px-8 py-3 border border-white/20 text-white hover:border-[#FFD700] hover:text-[#FFD700] rounded-full transition-all duration-300"
            >
              View Our Work
            </Link>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
        >
          {/* Email */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/5 mb-4">
              <svg className="w-6 h-6 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-white font-syne font-bold mb-2">Email Us</h3>
            <a href="mailto:info@wlcreationx.co.za" className="text-neutral-400 hover:text-[#FFD700] transition-colors duration-300">
              info@wlcreationx.co.za
            </a>
          </div>

          {/* Phone */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/5 mb-4">
              <svg className="w-6 h-6 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-white font-syne font-bold mb-2">Call Us</h3>
            <a href={`tel:${BUSINESS.phoneE164}`} className="text-neutral-400 hover:text-[#FFD700] transition-colors duration-300">
              {BUSINESS.phoneDisplay}
            </a>
          </div>

          {/* Location */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/5 mb-4">
              <svg className="w-6 h-6 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-white font-syne font-bold mb-2">Visit Us</h3>
            <p className="text-neutral-400">
              South Africa
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
