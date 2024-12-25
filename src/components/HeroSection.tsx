'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import LogoCarousel from './LogoCarousel';
import dynamic from 'next/dynamic';

// Define custom event type
interface AudioStateChangeEvent extends CustomEvent {
  detail: {
    isPlaying: boolean;
  };
}

// Define props interface
interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
}

// Dynamically import ParticlesAnimation with no SSR and loading placeholder
const ParticlesAnimation = dynamic(() => import('./ParticlesAnimation'), {
  ssr: false,
  loading: () => null, // Empty placeholder during loading
});

export default function HeroSection({ title, subtitle, description }: HeroSectionProps) {
  const [mounted, setMounted] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setMounted(true);

    // Create audio element for monitoring
    const audio = document.querySelector('audio');
    if (audio) {
      audioRef.current = audio;
    }

    // Listen for custom event from AudioPlayer
    const handleAudioStateChange = (e: AudioStateChangeEvent) => {
      setIsAudioPlaying(e.detail.isPlaying);
    };

    // Listen for audio ending naturally
    const handleAudioEnded = () => {
      setIsAudioPlaying(false);
    };

    // Listen for audio paused
    const handleAudioPaused = () => {
      setIsAudioPlaying(false);
    };
    
    if (audioRef.current) {
      audioRef.current.addEventListener('ended', handleAudioEnded);
      audioRef.current.addEventListener('pause', handleAudioPaused);
    }
    
    window.addEventListener('audioStateChange', handleAudioStateChange as EventListener);
    
    return () => {
      window.removeEventListener('audioStateChange', handleAudioStateChange as EventListener);
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleAudioEnded);
        audioRef.current.removeEventListener('pause', handleAudioPaused);
      }
    };
  }, []);

  return (
    <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden">
      {/* Video Background */}
      {mounted && (
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'brightness(0.7)' }}
          >
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
          </video>
        </div>
      )}

      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-black/20">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black"></div>
      </div>

      {/* Particles Animation - only show when mounted, audio playing, and on homepage */}
      {mounted && isHomePage && isAudioPlaying && <ParticlesAnimation />}

      {/* Main content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center h-full">
        <div className="text-center w-full space-y-6 sm:space-y-8">
          {/* Location Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/20 rounded-full">
              PRETORIA, SA
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="relative">
              <h1 className="font-syne font-bold leading-[0.9] tracking-tight">
                <span className="text-[#FFD700] block mb-2 text-4xl sm:text-6xl md:text-7xl lg:text-[8.3rem]">{title}</span>
                <span className="text-white block text-3xl sm:text-5xl md:text-6xl lg:text-[6.8rem] -mt-1 sm:-mt-2 lg:-mt-4">{subtitle}</span>
              </h1>
            </div>
            <p className="text-base sm:text-lg md:text-xl text-neutral-400 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed mt-4 sm:mt-6 lg:mt-8 px-4">
              {description}
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
          >
            <Link
              href="/pricing"
              className="px-6 sm:px-8 py-2.5 sm:py-3 bg-[#FFD700] text-black rounded-md hover:bg-[#FFD700]/90 transition-colors duration-300 text-sm sm:text-base font-medium"
            >
              View Pricing
            </Link>
            <Link
              href="/contact"
              className="px-6 sm:px-8 py-2.5 sm:py-3 border border-[#FFD700] text-[#FFD700] rounded-md hover:bg-[#FFD700]/10 transition-colors duration-300 text-sm sm:text-base font-medium"
            >
              Contact Us
            </Link>
          </motion.div>

          {/* Client Logos Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 sm:mt-16"
          >
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6 px-4">
              <div className="h-[1px] w-16 sm:w-24 md:w-32 bg-gradient-to-r from-transparent via-[#FFD700]/30 to-transparent"></div>
              <h2 className="text-center whitespace-nowrap">
                <span className="text-[#FFD700]/60 text-sm sm:text-base md:text-lg font-medium">Trusted by Leading Brands</span>
              </h2>
              <div className="h-[1px] w-16 sm:w-24 md:w-32 bg-gradient-to-r from-transparent via-[#FFD700]/30 to-transparent"></div>
            </div>
            <LogoCarousel />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
