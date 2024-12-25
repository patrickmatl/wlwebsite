'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

// Lazy load AudioPlayer with loading state
const AudioPlayer = dynamic(() => import('./AudioPlayer'), {
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

function throttle<T extends (...args: unknown[]) => void>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle = false;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
}

export default function HeroSection({
  title,
  subtitle,
  description
}: HeroSectionProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Memoize the throttled mouse move handler
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const throttledSet = throttle(() => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }, 50);
    throttledSet();
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [handleMouseMove]);

  const handlePlayStateChange = useCallback((playing: boolean) => {
    // We can use this callback for analytics or other side effects
    console.log('Audio playing state:', playing);
  }, []);

  return (
    <section 
      className="relative min-h-[100svh] overflow-hidden bg-gradient-to-br from-[#0A0A0A] via-[#141414] to-[#0A0A0A]"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Circle that follows mouse - only on desktop and after hydration */}
        {typeof window !== 'undefined' && window.innerWidth > 768 && (
          <motion.div
            initial={false}
            animate={{
              x: mousePosition.x * 0.05,
              y: mousePosition.y * 0.05,
            }}
            className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-r from-[#FFFD7C] via-[#FFD700] to-[#FFFD7C] opacity-[0.15] blur-[80px] -top-[400px] -right-[400px]"
            transition={{ type: "tween", ease: "linear" }}
          />
        )}
        
        {/* Static Grid Pattern - Reduced complexity */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,215,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,0.03) 1px, transparent 1px)',
            backgroundSize: '4rem 4rem'
          }}
        />

        {/* Reduced number of grid intersection orbs */}
        {typeof window !== 'undefined' && Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
            className="absolute w-2 h-2 bg-[#FFD700]/30 rounded-full"
            style={{
              left: `${(i % 4) * 33}%`,
              top: `${Math.floor(i / 4) * 33}%`,
              filter: 'blur(1px)'
            }}
          />
        ))}

        {/* Reduced number of larger floating orbs */}
        {typeof window !== 'undefined' && Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={`large-orb-${i}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
              x: [0, 30, 0],
              y: [0, -30, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: i * 2,
              ease: "easeInOut"
            }}
            className="absolute w-32 h-32 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,215,0,0.1) 0%, rgba(255,215,0,0) 70%)',
              left: `${25 + (i * 25)}%`,
              top: `${30 + (i * 20)}%`,
              filter: 'blur(8px)'
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 min-h-[100svh] flex flex-col justify-center items-center text-center">
        <motion.h1 
          className="text-8xl md:text-9xl font-syne font-bold mb-4 bg-gradient-to-r from-[#FFD700] via-[#FFF5CC] to-[#FFD700] text-transparent bg-clip-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h1>

        <motion.h2 
          className="text-2xl md:text-3xl font-space-grotesk mb-6 text-white/80"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {subtitle}
        </motion.h2>

        <motion.p 
          className="max-w-2xl text-lg text-white/60 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {description}
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link 
            href="/contact"
            className="px-8 py-3 bg-[#FFD700] text-black rounded-lg font-bold hover:bg-[#FFE44D] transition-colors duration-300"
          >
            Get Started
          </Link>

          <AudioPlayer 
            audioSource={{ mp3: '/audio/Website-Intro.mp3' }}
            onPlayStateChange={handlePlayStateChange} 
          />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="w-6 h-10 border-2 border-[#FFD700]/30 rounded-full flex justify-center">
          <motion.div 
            className="w-1 h-2 bg-[#FFD700] rounded-full mt-2"
            animate={{ 
              y: [0, 16, 0],
              opacity: [0.6, 0.2, 0.6]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
