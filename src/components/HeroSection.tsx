'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { FaPlay } from 'react-icons/fa';
import RotatingText from './RotatingText';

const AudioPlayer = dynamic(() => import('./AudioPlayer'), {
  ssr: false,
  loading: () => (
    <button className="relative group flex flex-col items-center">
      <div className="relative w-16 h-16 flex items-center justify-center bg-gold-500/10 rounded-full backdrop-blur-sm transform transition-all duration-500 animate-pulse-gold">
        <FaPlay className="w-6 h-6 text-gold-500 ml-2" />
      </div>
    </button>
  )
});

// Audio source configuration
const audioSource = {
  mp3: '/audio/Website-Intro.mp3',
};

interface HeroSectionProps {
  itemScope?: boolean;
  itemType?: string;
  seoTitle?: string;
  seoDescription?: string;
}

const HeroSection = ({
  itemScope,
  itemType,
  seoTitle = "Design",
  seoDescription = "Transforming ideas into digital reality"
}: HeroSectionProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      itemScope={itemScope}
      itemType={itemType}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Premium gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#FFD700]/10 via-transparent to-transparent opacity-30" />
      </div>

      {/* Subtle decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-8 left-8 w-32 h-32 border-l-2 border-t-2 border-[#FFD700]/20" />
        <div className="absolute bottom-8 right-8 w-32 h-32 border-r-2 border-b-2 border-[#FFD700]/20" />
      </div>

      <div 
        className={`relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 transition-opacity duration-700 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Location indicator */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="w-8 h-px bg-[#FFD700]/30" />
            <span className="text-[#FFD700]/80 text-sm tracking-[0.2em] uppercase">Pretoria, SA</span>
            <div className="w-8 h-px bg-[#FFD700]/30" />
          </div>

          {/* Main heading with premium styling */}
          <h1 
            className="font-syne font-bold text-4xl md:text-6xl lg:text-7xl mb-6"
            data-lcp="true"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] via-[#FFC000] to-[#FFB000]">
              {seoTitle}
            </span>
          </h1>
          
          <p 
            className="mt-6 font-space-grotesk text-lg md:text-xl text-neutral-200/90 max-w-xl mx-auto leading-relaxed"
            itemProp="description"
            data-lcp="true"
          >
            {seoDescription}
          </p>

          {/* Audio player with premium styling */}
          <div className="mt-12 flex justify-center">
            <AudioPlayer
              audioSource={audioSource}
              onPlayStateChange={(playing) => {
                setIsPlaying(playing);
                if (playing) {
                  // You can trigger additional animations here
                }
              }}
            />
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-6 mt-8">
            <Link 
              href="/packages" 
              className="px-8 py-3 bg-gold-500 text-black font-syne font-bold transform -skew-x-12 hover:skew-x-0 transition-all duration-300"
            >
              View Pricing
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-3 border border-gold-500/50 text-gold-500 font-syne font-bold transform -skew-x-12 hover:skew-x-0 transition-all duration-300 hover:border-gold-500 relative group"
            >
              <span className="relative z-10">Get in Touch</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: 'rgba(255,215,0,0.3)',
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
