'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OptimizedImage from './OptimizedImage';

const LogoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const clientLogos = Array.from({ length: 18 }, (_, index) => ({
    src: `/images/clients/Client${index + 1}.webp`,
    alt: `Client ${index + 1} - WL CreationX Portfolio - Trusted Web Design Agency in Pretoria, South Africa`,
    id: `client-${index + 1}`
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % clientLogos.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [clientLogos.length]);

  // Calculate visible logos with wrapping
  const getVisibleLogos = () => {
    const visibleCount = 5; // Show 5 logos at a time
    const halfCount = Math.floor(visibleCount / 2);
    const logos = [];

    for (let i = -halfCount; i <= halfCount; i++) {
      let index = currentIndex + i;
      // Wrap around for infinite effect
      while (index < 0) index += clientLogos.length;
      index = index % clientLogos.length;
      logos.push({ ...clientLogos[index], position: i });
    }

    return logos;
  };

  return (
    <section 
      className="w-full bg-gradient-to-r from-black via-gray-900 to-black py-16 overflow-hidden"
      aria-label="Client Testimonials and Brand Showcase"
    >
      <div className="container mx-auto px-4">
        <h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-white"
          id="trusted-brands"
        >
          Trusted by Leading Brands
        </h2>
        
        <div className="relative max-w-7xl mx-auto">
          {/* Gradient overlays */}
          <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-black to-transparent z-10" />
          
          <div className="relative overflow-hidden py-8">
            <div className="flex justify-center items-center min-h-[240px]">
              <AnimatePresence mode="wait">
                {getVisibleLogos().map((logo) => {
                  const isCentered = logo.position === 0;
                  const xOffset = logo.position * 180; // Spacing between logos
                  
                  return (
                    <motion.div
                      key={`${logo.id}-${logo.position}`}
                      className="absolute"
                      initial={{ opacity: 0, x: xOffset + 200 }}
                      animate={{
                        opacity: isCentered ? 1 : 0.4,
                        scale: isCentered ? 1 : 0.7,
                        x: xOffset,
                        zIndex: isCentered ? 10 : 0,
                      }}
                      exit={{ opacity: 0, x: xOffset - 200 }}
                      transition={{
                        duration: 0.5,
                        ease: "easeInOut"
                      }}
                    >
                      <div 
                        className={`p-4 bg-zinc-900/30 backdrop-blur-sm rounded-xl transition-all duration-300 ${
                          isCentered ? 'ring-2 ring-[#FFD700]/30' : ''
                        }`}
                        style={{
                          width: isCentered ? '220px' : '160px',
                          height: isCentered ? '220px' : '160px',
                        }}
                      >
                        <OptimizedImage
                          src={logo.src}
                          alt={logo.alt}
                          width={isCentered ? 220 : 160}
                          height={isCentered ? 220 : 160}
                          className="w-full h-full object-contain"
                          priority={isCentered}
                          quality={isCentered ? 90 : 75}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoCarousel;
