'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AudioPlayer from './AudioPlayer';

interface HeroSectionProps {
  itemScope?: boolean;
  itemType?: string;
  seoTitle?: string;
  seoDescription?: string;
}

const HeroSection = ({
  itemScope,
  itemType,
  seoTitle,
  seoDescription
}: HeroSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handlePlayStateChange = useCallback((playing: boolean) => {
    setIsPlaying(playing);
  }, []);

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center bg-[#0A0A0A]"
      itemScope={itemScope}
      itemType={itemType}
    >
      {/* Corner Border */}
      <div className="absolute top-8 left-8 w-32 h-32 border-l border-t border-[#FFD700] opacity-20" />

      {/* Main Content */}
      <div className="container mx-auto px-4 text-center">
        {/* Location Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-4">
            <div className="w-8 h-px bg-[#FFD700] opacity-30" />
            <span className="text-[#FFD700] opacity-80 text-sm tracking-[0.2em] uppercase">
              Pretoria, SA
            </span>
            <div className="w-8 h-px bg-[#FFD700] opacity-30" />
          </div>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-[#FFD700] font-syne text-7xl md:text-8xl lg:text-9xl font-bold mb-4">
            Design
          </h1>
          <h2 className="text-white/90 font-syne text-4xl md:text-5xl lg:text-6xl">
            Agency
          </h2>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-3xl mx-auto text-white/80 text-lg md:text-xl mb-12 leading-relaxed"
        >
          Transforming brands through creative excellence. Your trusted design partner in Pretoria, 
          delivering innovative graphic design, web development, and branding solutions.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link
            href="/packages"
            className="bg-[#FFD700] text-black px-8 py-3 rounded-lg font-medium min-w-[200px] 
              hover:bg-[#FFD700]/90 transition-all duration-300"
          >
            View Pricing
          </Link>
          <Link
            href="/contact"
            className="border border-[#FFD700] text-[#FFD700] px-8 py-3 rounded-lg font-medium min-w-[200px]
              hover:bg-[#FFD700]/10 transition-all duration-300"
          >
            Get in Touch
          </Link>
        </motion.div>

        {/* Audio Player */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="absolute bottom-12 right-12 text-[#FFD700]"
        >
          <AudioPlayer 
            audioSource={{
              mp3: '/audio/Website-Intro.mp3'
            }}
            onPlayStateChange={handlePlayStateChange}
            customButton={
              <div className="flex items-center gap-3">
                <span className="text-sm tracking-wider">Hear Our Story</span>
                <div 
                  className="w-12 h-12 rounded-lg border border-[#FFD700] flex items-center justify-center
                    hover:bg-[#FFD700]/10 transition-all duration-300"
                >
                  {isPlaying ? (
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="currentColor" 
                      className="w-6 h-6"
                    >
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                    </svg>
                  ) : (
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="currentColor" 
                      className="w-6 h-6"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </div>
              </div>
            }
          />
        </motion.div>
      </div>

      {/* Menu Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute top-8 right-8 text-[#FFD700] hover:text-[#FFD700]/80 transition-colors duration-300"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="currentColor" 
          className="w-8 h-8"
        >
          <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
        </svg>
      </motion.button>
    </section>
  );
};

export default HeroSection;
