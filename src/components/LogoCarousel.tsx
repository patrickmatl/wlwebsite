'use client';

import OptimizedImage from './OptimizedImage';

const LogoCarousel = () => {
  // Create base logos array
  const baseLogos = Array.from({ length: 18 }, (_, index) => ({
    src: `/images/clients/Client${index + 1}.webp`,
    alt: `Client ${index + 1} - WL CreationX Portfolio`,
    id: `client-${index + 1}`
  }));

  // Create a triple set of logos for smoother infinite scroll
  const tripleLogos = [...baseLogos, ...baseLogos, ...baseLogos];

  return (
    <div className="relative overflow-hidden w-full">
      <div className="flex justify-center items-center h-32">
        {/* Gradient overlays for smooth fade effect */}
        <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-black to-transparent z-10" />
        
        <div className="flex animate-scroll">
          {/* Triple set of logos for smoother scrolling */}
          <div className="flex gap-12 min-w-max">
            {tripleLogos.map((logo, index) => (
              <div
                key={`${logo.id}-${index}`}
                className="flex-shrink-0 w-32 h-32 relative"
              >
                <OptimizedImage
                  src={logo.src}
                  alt={logo.alt}
                  width={128}
                  height={128}
                  className="w-full h-full object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
                  priority={index < baseLogos.length} // Only prioritize loading first set
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoCarousel;
