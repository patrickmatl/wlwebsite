'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import LogoCarousel from './LogoCarousel';
import { usePathname } from 'next/navigation';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

export default function HeroSection({
  title = "Design",
  subtitle = "Agency",
  description = "We specialize in creating stunning digital experiences that captivate audiences and drive results. Let's bring your vision to life.",
}: HeroSectionProps) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setMounted(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay failed, handle it silently
      });
    }
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <section className="relative h-[100vh] w-full overflow-hidden bg-black">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black/60" />
      
      {/* Grain effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[#000000] mix-blend-multiply" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
               opacity: '0.4'
             }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
        <div className="text-center w-full space-y-6 sm:space-y-8">
          {/* Location Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
              <span className="w-2 h-2 bg-[#FFD700] rounded-full animate-pulse" />
              <span className="text-white/70 text-sm">Pretoria, South Africa</span>
            </div>
          </motion.div>

          {/* Main Title and Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-1"
          >
            <div className="relative">
              <h1 className="font-syne font-bold leading-[0.85] tracking-tight">
                <span className="text-[#FFD700] block text-4xl sm:text-6xl md:text-7xl lg:text-[8.3rem]">{title}</span>
                <span className="text-white block text-3xl sm:text-5xl md:text-6xl lg:text-[6.8rem] -mt-1 sm:-mt-2">{subtitle}</span>
              </h1>
            </div>
            <p className="font-space-grotesk text-base sm:text-lg md:text-xl text-neutral-200 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto mt-[5vh]">
              {description}
            </p>
          </motion.div>

          {/* Buttons and Logo Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 flex flex-col items-center space-y-6"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                href="/pricing"
                className="bg-[#FFD700] text-black px-8 py-3 rounded-full font-medium hover:bg-[#FFE55C] transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/contact"
                className="border border-white/20 text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-colors"
              >
                Get Started
              </Link>
            </div>

            {/* Client Logos Title */}
            <div className="flex items-center justify-center space-x-4 mt-6 mb-4">
              <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent via-[#FFD700]/30 to-transparent"></div>
              <span className="text-[#FFD700]/70 text-sm sm:text-base font-syne">Trusted by Leading Brands</span>
              <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent via-[#FFD700]/30 to-transparent"></div>
            </div>

            <LogoCarousel />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
