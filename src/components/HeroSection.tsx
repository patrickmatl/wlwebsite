'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useAudioPlayback } from './AudioContext';
import { GoogleRatingBadge } from './GoogleReviews';

// SSR enabled: the client-logo strip is real proof content and should exist in
// the server HTML (it previously shipped zero <img> elements to crawlers).
const LogoCarouselDyn = dynamic(() => import('./LogoCarousel'), { loading: () => null });
const HeroParticlesDyn = dynamic(() => import('./HeroParticles'), { ssr: false, loading: () => null });

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

export default function HeroSection({
  title = "Design",
  subtitle = "Agency",
  description = "A Pretoria graphic design studio crafting brands, websites and campaigns since 2013.",
}: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isPlaying } = useAudioPlayback();

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        /* autoplay prevented — poster stays, which is fine */
      });
    }
  }, []);

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-black">
      {/* Particles overlay when audio is playing */}
      {isPlaying && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <HeroParticlesDyn />
        </div>
      )}

      {/* Video background with poster so first paint never waits on the file */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/images/hero-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Cinematic overlay: vignette + bottom fade into the page ground */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 38%, rgba(255,215,0,0.07), transparent 65%)',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
        <div className="text-center w-full space-y-6 sm:space-y-8">
          {/* Location badge — decorative, safe to animate with JS */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center"
          >
            <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
              <span className="w-2 h-2 bg-[#FFD700] rounded-full animate-pulse" />
              <span className="text-white/70 text-sm tracking-wide">Pretoria · South Africa</span>
            </div>
          </motion.div>

          {/* Headline — the page's LCP element. Deliberately NOT wrapped in a
              framer-motion opacity gate: it must be visible in the server HTML
              and at first paint. Its entrance is a CSS transform-only
              animation (see .hero-rise in globals.css) that never hides it. */}
          <div className="space-y-1 hero-rise">
            <p className="font-syne font-bold leading-[0.85] tracking-tight">
              <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-[8.3rem] text-transparent bg-clip-text bg-gradient-to-b from-[#FFE55C] via-[#FFD700] to-[#C9A400]">
                {title}
              </span>
              <span className="text-white block text-3xl sm:text-5xl md:text-6xl lg:text-[6.8rem] -mt-1 sm:-mt-2">
                {subtitle}
              </span>
            </p>
            <p className="font-space-grotesk text-base sm:text-lg md:text-xl text-neutral-300 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto mt-[5vh]">
              {description}
            </p>
          </div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-8"
          >
            <Link
              href="/get-in-touch-pretoria"
              className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#FFD700] text-black rounded-full font-semibold transition-all duration-300 hover:bg-[#FFE44D] hover:shadow-[0_0_32px_rgba(255,215,0,0.35)]"
            >
              Start Your Project
              <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
            </Link>
            <Link
              href="/project-showcase-pretoria"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-white/20 bg-white/[0.03] backdrop-blur-sm text-white transition-all duration-300 hover:border-[#FFD700]/70 hover:text-[#FFD700] hover:bg-[#FFD700]/5"
            >
              View Portfolio
            </Link>
          </motion.div>

          {/* Verified Google rating — real social proof above the fold */}
          <div className="flex justify-center pt-2">
            <GoogleRatingBadge />
          </div>

          {/* Client logos — server-rendered proof band */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-12"
          >
            <LogoCarouselDyn />
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-white/40 pointer-events-none">
        <span className="text-[10px] tracking-[0.25em] uppercase">Scroll</span>
        <span className="block w-px h-8 bg-gradient-to-b from-[#FFD700]/70 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
