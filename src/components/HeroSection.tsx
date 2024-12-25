'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { PlayIcon, PauseIcon } from './icons'; // Assuming the icons are in the same directory

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

// Lazy load components
const LogoCarousel = dynamic(() => import('./LogoCarousel'), {
  loading: () => <div className="h-20 bg-black/20 animate-pulse rounded-lg" />,
  ssr: true
});

const ParticlesAnimation = dynamic(() => import('./ParticlesAnimation'), {
  ssr: false,
  loading: () => null,
});

export default function HeroSection({ title, subtitle, description }: HeroSectionProps) {
  const [mounted, setMounted] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setMounted(true);

    // Create audio element for monitoring
    const audio = document.querySelector('audio');
    if (audio) {
      audioRef.current = audio;
      
      // Add event listeners
      const handleAudioEnded = () => setIsAudioPlaying(false);
      const handleAudioPaused = () => setIsAudioPlaying(false);
      
      audio.addEventListener('ended', handleAudioEnded);
      audio.addEventListener('pause', handleAudioPaused);
      
      return () => {
        audio.removeEventListener('ended', handleAudioEnded);
        audio.removeEventListener('pause', handleAudioPaused);
      };
    }
  }, []);

  useEffect(() => {
    // Listen for custom event from AudioPlayer
    const handleAudioStateChange = (e: AudioStateChangeEvent) => {
      setIsAudioPlaying(e.detail.isPlaying);
    };
    
    window.addEventListener('audioStateChange', handleAudioStateChange as EventListener);
    
    return () => {
      window.removeEventListener('audioStateChange', handleAudioStateChange as EventListener);
    };
  }, []);

  // Preload video when component mounts
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, []);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  // Server-side render or initial client render
  if (!mounted) {
    return (
      <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden bg-black">
        <div className="absolute inset-0 bg-black animate-pulse" />
        <div className="relative z-10 text-center">
          <div className="w-32 h-8 bg-[#FFD700]/10 animate-pulse rounded-full mx-auto mb-8" />
          <div className="w-64 h-16 bg-[#FFD700]/10 animate-pulse rounded-lg mx-auto" />
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden">
      {/* Video Background with loading state */}
      <div className="absolute inset-0 w-full h-full bg-black">
        {!isVideoLoaded && (
          <div className="absolute inset-0 bg-black" />
        )}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={handleVideoLoad}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ filter: 'brightness(0.7)' }}
        >
          <source 
            src="/videos/hero-bg.mp4" 
            type="video/mp4"
          />
        </video>
      </div>

      {/* Background with gradient overlay - Always visible */}
      <div className="absolute inset-0 bg-black/20">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black"></div>
      </div>

      {/* Main content with fixed dimensions */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center min-h-screen mt-[10vh]">
        <div className="text-center w-full space-y-6 sm:space-y-8">
          {/* Location Badge with fixed height */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="h-10"
          >
            <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/20 rounded-full">
              PRETORIA, SA
            </span>
          </motion.div>

          {/* Main Title with fixed dimensions */}
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
            <p className="font-space-grotesk text-base sm:text-lg md:text-xl text-neutral-200 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto mt-6">
              {description}
            </p>
          </motion.div>

          {/* Buttons */}
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
            <div className="flex items-center justify-center space-x-4 mt-10 mb-6">
              <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent via-[#FFD700]/30 to-transparent"></div>
              <span className="text-[#FFD700]/70 text-sm sm:text-base font-syne">Trusted by Leading Brands</span>
              <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent via-[#FFD700]/30 to-transparent"></div>
            </div>

            <LogoCarousel />
          </motion.div>

          {/* Particles Animation */}
          {mounted && isHomePage && isAudioPlaying && <ParticlesAnimation />}
        </div>
      </div>
    </section>
  );
}
