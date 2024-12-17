'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface PortfolioItemProps {
  src: string;
  alt: string;
  category: string;
  onClick?: () => void;
}

const PortfolioItem = ({ src, alt, category, onClick }: PortfolioItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <Image
          src={src}
          alt={alt}
          width={1028}
          height={1024}
          className="object-cover transform transition-transform duration-500 group-hover:scale-110"
        />
        <div className={`absolute inset-0 bg-black/60 transition-opacity duration-300 flex items-center justify-center ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-center">
            <p className="text-[#FFD700] font-bold text-lg mb-2">{alt}</p>
            <p className="text-white/80 text-sm">{category}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioItem;
