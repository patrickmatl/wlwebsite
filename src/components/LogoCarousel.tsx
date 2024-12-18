'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const LogoCarousel = () => {
  const [centerIndex, setCenterIndex] = useState(0);

  const clientLogos = [
    { name: 'Professional Website Design Pretoria', industry: 'Custom Web Development' },
    { name: 'E-commerce Website Design', industry: 'Online Store Development' },
    { name: 'Responsive Web Design', industry: 'Mobile-Friendly Websites' },
    { name: 'WordPress Website Design', industry: 'CMS Development' },
    { name: 'Business Website Design', industry: 'Corporate Web Solutions' },
    { name: 'Custom Website Development', industry: 'Professional Web Design' },
    { name: 'SEO Optimized Web Design', industry: 'Search Engine Friendly' },
    { name: 'Modern Website Design', industry: 'Contemporary Development' },
    { name: 'Professional Web Development', industry: 'Custom Solutions' },
    { name: 'E-commerce Solutions', industry: 'Online Store Design' }
  ].map((logo, index) => ({
    src: `/images/clients/Client${index + 1}.webp`,
    alt: `${logo.name} in ${logo.industry} | WL Creations Portfolio - Trusted Web Design Agency in Pretoria, South Africa`,
    id: `client-${index + 1}`
  }));

  const duplicatedLogos = [...clientLogos, ...clientLogos, ...clientLogos];

  useEffect(() => {
    const interval = setInterval(() => {
      setCenterIndex((prev) => (prev + 1) % clientLogos.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [clientLogos.length]);

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
        
        <div 
          className="relative"
          role="region"
          aria-labelledby="trusted-brands"
        >
          {/* Gradient overlays */}
          <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-black via-black/90 to-transparent z-20" />
          <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-black via-black/90 to-transparent z-20" />
          
          <div className="relative overflow-hidden">
            <motion.div
              animate={{
                x: [-220, -clientLogos.length * 220]
              }}
              transition={{
                x: {
                  duration: 45,
                  ease: "linear",
                  repeat: Infinity,
                }
              }}
              className="flex gap-8 items-center"
            >
              {duplicatedLogos.map((logo, index) => {
                const isCenter = index % clientLogos.length === centerIndex;
                
                return (
                  <motion.div
                    key={`${logo.id}-${index}`}
                    className="flex-shrink-0 w-[180px]"
                    animate={{
                      scale: isCenter ? 1.5 : 1,
                      opacity: isCenter ? 1 : 0.6,
                      zIndex: isCenter ? 10 : 0
                    }}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut"
                    }}
                  >
                    <div 
                      className="bg-white/5 backdrop-blur-sm rounded-lg p-6 transition-all duration-300"
                      role="img"
                      aria-label={logo.alt}
                    >
                      <div className="relative w-full aspect-square">
                        <Image
                          src={logo.src}
                          alt={logo.alt}
                          width={150}
                          height={150}
                          className="w-full h-full object-contain"
                          priority={index < 6}
                          loading={index < 6 ? "eager" : "lazy"}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          quality={85}
                          unoptimized
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoCarousel;
