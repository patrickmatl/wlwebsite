'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

const AudioPlayer = dynamic(() => import('./AudioPlayer').then(mod => mod.default), {
  ssr: false,
  loading: () => (
    <div className="flex items-center gap-3 text-[#FFD700] opacity-50">
      <span className="text-sm tracking-wider">Loading audio...</span>
      <div className="w-12 h-12 rounded-full border border-[#FFD700]/30 flex items-center justify-center">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#FFD700]"></div>
      </div>
    </div>
  ),
});

interface HeroSectionProps {
  itemScope?: boolean;
  itemType?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export default function HeroSection({
  itemScope,
  itemType,
  seoTitle,
  seoDescription
}: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    
    if (typeof window !== 'undefined') {
      const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const handlePlayStateChange = useCallback((playing: boolean) => {
    setIsPlaying(playing);
  }, []);

  return (
    <section 
      className="relative min-h-[100svh] overflow-hidden bg-gradient-to-br from-[#0A0A0A] via-[#141414] to-[#0A0A0A]"
      itemScope={itemScope}
      itemType={itemType}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Circle that follows mouse - disabled on mobile for performance */}
        {typeof window !== 'undefined' && window.innerWidth > 768 && (
          <motion.div
            animate={{
              x: mousePosition.x * 0.05,
              y: mousePosition.y * 0.05,
            }}
            className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-r from-[#FFFD7C] via-[#FFD700] to-[#FFFD7C] opacity-[0.15] blur-[80px] -top-[400px] -right-[400px]"
            transition={{ type: "spring", stiffness: 50 }}
          />
        )}
        
        {/* Static Grid Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,215,0,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(255,215,0,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        {/* Grid Intersection Orbs */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1],
              y: [0, -20, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
            className="absolute w-2 h-2 bg-[#FFD700]/30 rounded-full"
            style={{
              left: `${(i % 5) * 25}%`,
              top: `${Math.floor(i / 5) * 25}%`,
              filter: 'blur(1px)'
            }}
          />
        ))}

        {/* Larger Floating Orbs */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`large-orb-${i}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.5, 1],
              x: [0, Math.random() * 40 - 20, 0],
              y: [0, Math.random() * 40 - 20, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut"
            }}
            className="absolute w-24 h-24 bg-[#FFD700]/10 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
              filter: 'blur(20px)'
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="relative container mx-auto px-4 h-screen flex flex-col justify-center items-center">
        {/* Location Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-[#FFD700]/10 backdrop-blur-sm px-6 py-2 rounded-full border border-[#FFD700]/20"
          >
            <span className="text-[#FFD700] text-sm tracking-[0.2em] uppercase">
              Pretoria, SA
            </span>
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <div className="text-center max-w-5xl mx-auto relative">
          {/* Animated Decorative Lines */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute left-0 top-1/2 w-[20vw] h-px bg-gradient-to-r from-transparent via-[#FFD700]/30 to-transparent"
          />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute right-0 top-1/2 w-[20vw] h-px bg-gradient-to-l from-transparent via-[#FFD700]/30 to-transparent"
          />

          {/* Headings with Split Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <motion.h1 
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: 0.4 
              }}
              className="text-8xl md:text-9xl font-syne font-bold mb-4 bg-gradient-to-r from-[#FFD700] via-[#FDB900] to-[#FFD700] text-transparent bg-clip-text"
            >
              Design
            </motion.h1>
            <motion.h2 
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: 0.5 
              }}
              className="text-5xl md:text-6xl font-syne text-white/90 relative z-10"
            >
              Agency
            </motion.h2>
          </motion.div>

          {/* Description with Character Animation */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 mb-12 text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed"
          >
            {["Transforming brands through creative excellence. ",
              "Your trusted design partner in Pretoria, delivering innovative graphic design, web development, and branding solutions."
            ].map((text, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              >
                {text}
              </motion.span>
            ))}
          </motion.p>

          {/* Interactive CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/packages"
                className="group relative px-8 py-3 min-w-[200px] overflow-hidden rounded-lg bg-gradient-to-r from-[#FFD700] to-[#FDB900] transition-all duration-300"
              >
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
                <span className="relative text-black font-medium">View Pricing</span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className="group relative px-8 py-3 min-w-[200px] overflow-hidden rounded-lg border border-[#FFD700]/30 hover:border-[#FFD700] transition-all duration-300"
              >
                <div className="absolute inset-0 bg-[#FFD700]/0 group-hover:bg-[#FFD700]/5 transition-colors duration-300" />
                <span className="relative text-[#FFD700] font-medium">Contact Us</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Audio Player */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="fixed bottom-12 right-12 z-50"
      >
        <div className="relative group">
          <AudioPlayer
            audioSource={{ mp3: '/audio/Website-Intro.mp3' }}
            onPlayStateChange={handlePlayStateChange}
            customButton={
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 text-[#FFD700] cursor-pointer"
              >
                <span className="text-sm tracking-wider">Experience Our Story</span>
                <div className="w-12 h-12 rounded-full border border-[#FFD700]/30 flex items-center justify-center group-hover:border-[#FFD700] transition-all duration-300">
                  <AnimatePresence mode="wait">
                    {isPlaying ? (
                      <motion.div
                        key="pause"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                        </svg>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="play"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            }
          />
        </div>
      </motion.div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
    </section>
  );
}
