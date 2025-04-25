'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import LogoCarousel from './LogoCarousel';
import { usePathname } from 'next/navigation';
import bgVideo from '../../public/videos/hero-bg.mp4';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

export default function HeroSection({
  title = "Design",
  subtitle = "Agency",
  description = "South Africa's leading graphic design agency, delivering innovative visual solutions and creative excellence for businesses nationwide.",
}: HeroSectionProps) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setMounted(true);
    const video = videoRef.current;
    if (video) {
      const playVideo = async () => {
        try {
          await video.play();
        } catch (err) {
          console.log('Autoplay prevented');
        }
      };
      playVideo();
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
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        >
          <source src={bgVideo} type="video/mp4" />
        </video>
      </div>

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/30" />
      
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
              <span className="text-white/70 text-sm">South Africa</span>
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
                <span className="text-[#FFD700] block text-4xl sm:text-6xl md:text-7xl lg:text-[8.3rem]">
                  {title}
                </span>
                <span className="text-white block text-3xl sm:text-5xl md:text-6xl lg:text-[6.8rem] -mt-1 sm:-mt-2">
                  {subtitle}
                </span>
                <span className="sr-only"> - WL CreationX - Top Graphic Design Agency in South Africa</span>
              </h1>
            </div>
            <p className="font-space-grotesk text-base sm:text-lg md:text-xl text-neutral-200 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto mt-[5vh]">
              {description}
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mt-8"
          >
            <Link
              href="http://localhost:3001/get-in-touch-pretoria"
              className="inline-flex items-center justify-center px-8 py-3 bg-[#FFD700] text-black hover:bg-[#FFA500] rounded-full transition-all duration-300 font-medium"
            >
              Start Your Project
            </Link>
            <Link
              href="/project-showcase-pretoria"
              className="inline-flex items-center justify-center px-8 py-3 border border-white/20 text-white hover:border-[#FFD700] hover:text-[#FFD700] rounded-full transition-all duration-300"
            >
              View Portfolio
            </Link>
          </motion.div>

          {/* Logo Carousel */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12"
          >
            <LogoCarousel />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
