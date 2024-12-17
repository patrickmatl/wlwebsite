import { memo } from 'react';
import Link from 'next/link';

interface HeroSectionProps {
  itemScope?: boolean;
  itemType?: string;
  seoTitle?: string;
  seoDescription?: string;
}

const HeroSection = ({ 
  itemScope,
  itemType,
  seoTitle = 'Premier Graphic Design Agency in Pretoria',
  seoDescription = 'Creating digital experiences that push boundaries and define trends'
}: HeroSectionProps) => {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black to-neutral-900"
      {...(itemScope ? { itemScope: true } : {})}
      {...(itemType ? { itemType } : {})}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Gradient Orb */}
        <div 
          className="absolute top-1/3 left-1/3 w-[500px] h-[500px] opacity-40"
          style={{
            background: 'radial-gradient(circle at center, rgba(255,215,0,0.15), transparent 70%)',
            animation: 'float-slow 15s ease-in-out infinite'
          }}
        />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: 'rgba(255,215,0,0.3)',
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Background accents */}
      <div className="absolute inset-0">
        <div className="absolute top-8 left-8 w-24 h-24 border-l-2 border-t-2 border-gold-500 opacity-50" />
        <div className="absolute bottom-8 right-8 w-24 h-24 border-r-2 border-b-2 border-gold-500 opacity-50" />
      </div>

      {/* Company name watermark */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        <h2 className="font-syne text-[200px] font-bold text-white opacity-[0.02] whitespace-nowrap">
          WL CREATIONX
        </h2>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4">
        <div className="space-y-6">
          {/* Location tag */}
          <div className="flex items-center justify-center space-x-4 text-gold-500">
            <div className="w-8 h-px bg-gold-500" />
            <span className="font-space-grotesk uppercase tracking-widest text-sm">Pretoria, SA</span>
            <div className="w-8 h-px bg-gold-500" />
          </div>

          {/* Main headline - Enhanced with SEO */}
          <div itemProp="headline">
            <h1 className="font-syne text-7xl md:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400 transform hover:scale-105 transition-transform duration-500">
              DESIGN
              <br />
              AGENCY
            </h1>
            {/* Hidden SEO-optimized title */}
            <span className="sr-only">{seoTitle}</span>
          </div>

          {/* Subheadline - Enhanced with SEO */}
          <p 
            className="font-space-grotesk text-xl md:text-2xl text-neutral-400 max-w-2xl mx-auto"
            itemProp="description"
          >
            {seoDescription}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6 mt-8">
            <Link href="/portfolio" className="px-8 py-3 bg-gold-500 text-black font-syne font-bold transform skew-x-12 hover:skew-x-0 transition-transform duration-300">
              View Our Work
            </Link>
            <Link href="/contact" className="px-8 py-3 border border-gold-500 text-gold-500 font-syne font-bold transform -skew-x-12 hover:skew-x-0 transition-transform duration-300">
              Get in Touch
            </Link>
          </div>
        </div>
      </div>

      {/* Small company name in corner */}
      <div className="absolute bottom-8 left-8 z-10">
        <p className="font-space-grotesk text-sm tracking-widest text-gold-500 opacity-50">
          WL CREATIONX
        </p>
      </div>
    </section>
  )
}

export default memo(HeroSection);
