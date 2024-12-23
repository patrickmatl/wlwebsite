'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface GetInTouchButtonProps {
  className?: string;
  text?: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

const GetInTouchButton = ({ 
  className = '', 
  text = 'Get in Touch',
  variant = 'primary'
}: GetInTouchButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center px-6 py-3 rounded font-semibold transition-all duration-300';
  
  const variantStyles = {
    primary: 'bg-[#FFD700] text-black hover:bg-[#FFE44D]',
    secondary: 'bg-black text-[#FFD700] hover:bg-neutral-900',
    outline: 'border-2 border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black'
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link 
        href="/contact" 
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      >
        {text}
      </Link>
    </motion.div>
  );
};

export default GetInTouchButton;
