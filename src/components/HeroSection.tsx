'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

const HeroSection = ({ 
  title = "Design",
  subtitle = "Agency",
  description = "Transforming brands through creative excellence. Your trusted design partner in Pretoria, delivering innovative graphic design, web development, and branding solutions."
}: HeroSectionProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden px-4">
      {/* Video Background - Only rendered on client side */}
      {isClient && (
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute w-full h-full object-cover opacity-50"
            poster="/images/video-poster.jpg"
          >
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
          </video>
          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-60" />
        </div>
      )}

      {/* Location tag */}
      <div className="relative z-10 mb-16">
        <span className="px-6 py-2 rounded-full border border-gold-light/20 text-gold-light/80 text-sm uppercase tracking-wider">
          Pretoria, SA
        </span>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto">
        <div className="flex flex-col items-center">
          {/* Title text */}
          <h1 className="font-syne text-[2.75rem] md:text-[5.5rem] xl:text-[7.7rem] font-bold leading-none text-gold-light">
            {title}
          </h1>
          
          {/* Subtitle text */}
          <h1 className="font-syne text-2xl md:text-[3.5rem] xl:text-[4.2rem] font-bold text-white mt-4">
            {subtitle}
          </h1>

          {/* Description */}
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl mt-12 leading-relaxed">
            {description}
          </p>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 mt-12">
            <Link 
              href="/pricing"
              className="px-8 py-3 bg-gold-light text-black font-bold rounded-full text-lg hover:bg-gold-light/90 transition-all duration-300"
            >
              View Pricing
            </Link>
            
            <Link 
              href="/contact"
              className="px-8 py-3 border-2 border-gold-light/30 text-white rounded-full hover:bg-gold-light/10 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
