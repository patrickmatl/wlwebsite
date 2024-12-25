'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

// Define logos outside component to avoid hydration mismatch
const LOGO_COUNT = 18; // Updated to match actual number of images
const LOGOS = Array.from({ length: LOGO_COUNT }, (_, i) => ({
  path: `/images/clients/Client${i + 1}.webp`,
  alt: `Client Logo ${i + 1}`
}));

const LogoCarousel = () => {
  const [isLoaded, setIsLoaded] = useState<{ [key: string]: boolean }>({});
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleImageLoad = (logoPath: string) => {
    setIsLoaded(prev => ({ ...prev, [logoPath]: true }));
  };

  // Server-side and initial client render
  if (!isMounted) {
    return (
      <div className="w-full py-8">
        <div className="flex justify-center">
          <div className="h-32 w-32 bg-black/20 animate-pulse rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden py-8">
      {/* Gradient overlays for smooth fade effect */}
      <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-black via-black/80 to-transparent z-10" />
      
      <div className="flex animate-scroll">
        {/* First set of logos */}
        {LOGOS.map((logo, index) => (
          <div
            key={`first-${index}`}
            className="relative w-32 h-32 mx-6 flex-shrink-0"
          >
            <div className="relative w-full h-full">
              {!isLoaded[logo.path] && (
                <div className="absolute inset-0 bg-black/20 animate-pulse rounded-lg" />
              )}
              <Image
                src={logo.path}
                alt={logo.alt}
                fill
                sizes="(max-width: 768px) 80px, 128px"
                className={`object-contain transition-opacity duration-300 ${
                  isLoaded[logo.path] ? 'opacity-60 hover:opacity-100' : 'opacity-0'
                }`}
                onLoad={() => handleImageLoad(logo.path)}
                loading="lazy"
                quality={75}
              />
            </div>
          </div>
        ))}
        {/* Duplicate set for infinite scroll */}
        {LOGOS.map((logo, index) => (
          <div
            key={`second-${index}`}
            className="relative w-32 h-32 mx-6 flex-shrink-0"
          >
            <div className="relative w-full h-full">
              {!isLoaded[logo.path] && (
                <div className="absolute inset-0 bg-black/20 animate-pulse rounded-lg" />
              )}
              <Image
                src={logo.path}
                alt={logo.alt}
                fill
                sizes="(max-width: 768px) 80px, 128px"
                className={`object-contain transition-opacity duration-300 ${
                  isLoaded[logo.path] ? 'opacity-60 hover:opacity-100' : 'opacity-0'
                }`}
                onLoad={() => handleImageLoad(logo.path)}
                loading="lazy"
                quality={75}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoCarousel;
