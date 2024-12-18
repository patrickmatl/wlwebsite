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
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black to-black z-10" />
      
      <div 
        className={`relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 transition-opacity duration-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 
            className="font-syne font-bold text-4xl md:text-6xl lg:text-7xl mb-6 text-white"
            data-lcp="true"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] to-[#FFA500]">
              {seoTitle}
            </span>
          </h1>
          
          <p 
            className="mt-6 font-space-grotesk text-lg md:text-xl text-neutral-200 max-w-xl mx-auto leading-relaxed"
            itemProp="description"
            data-lcp="true"
          >
            {seoDescription}
          </p>

          {/* Audio Player */}
          <div className="mt-2">
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
