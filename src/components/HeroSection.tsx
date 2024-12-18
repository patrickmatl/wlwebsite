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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Array of hero images
  const heroImages = [
    '/images/hero/hero1.webp',
    '/images/hero/hero3.webp',
    '/images/hero/hero5.webp',
    '/images/hero/hero9.webp',
    '/images/hero/hero11.webp'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section 
      className="relative min-h-screen flex items-center bg-gradient-to-br from-black to-neutral-900"
      {...(itemScope ? { itemScope: true } : {})}
      {...(itemType ? { itemType } : {})}
    >
      {/* Animated Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
        <div className="orb orb-5" />
        
        {/* Pulsing rings around the center orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {[150, 200, 250].map((size, index) => (
            <div
              key={size}
              className="pulse-ring"
              style={{
                width: size,
                height: size,
                animationDelay: `${index * 1.2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Background Images */}
      <div className="absolute inset-0 overflow-hidden">
        {heroImages.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={src}
              alt={`Hero image ${index + 1}`}
              fill
              quality={75}
              priority={index === 0}
              loading={index === 0 ? 'eager' : 'lazy'}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Polka dot overlay */}
      <div className="absolute inset-0 bg-polka mix-blend-multiply" />

      {/* Dark gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />

      {/* Decorative corner frames */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-8 left-8 w-24 h-24 border-l-2 border-t-2 border-gold-500 opacity-50" />
        <div className="absolute bottom-8 right-8 w-24 h-24 border-r-2 border-b-2 border-gold-500 opacity-50" />
      </div>

      {/* Main Content */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start space-y-8">
          {/* Location tag */}
          <div className="flex items-center space-x-4 text-gold-500">
            <div className="w-8 h-px bg-gold-500" />
            <span className="font-space-grotesk uppercase tracking-[0.2em] text-sm">Pretoria, SA</span>
            <div className="w-8 h-px bg-gold-500" />
          </div>

          {/* Main headline */}
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-syne font-black text-white leading-none" itemProp="name">
              {seoTitle}
              <br />
              <RotatingText />
            </h1>
            <p className="mt-6 font-space-grotesk text-lg md:text-xl text-neutral-200 max-w-xl leading-relaxed" itemProp="description">
              {seoDescription}
            </p>
          </div>

          {/* Audio Player */}
          <div className="mt-2">
            <AudioPlayer
              audioUrl="/audio/Website-Intro.wav"
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
