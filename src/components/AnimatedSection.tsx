'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  initial?: Record<string, number>;
  animate?: Record<string, number>;
  whileInView?: Record<string, number>;
  transition?: Record<string, number | string>;
}

const AnimatedSection = ({ 
  children, 
  className = "", 
  initial = { opacity: 0, y: 20 },
  animate,
  whileInView = { opacity: 1, y: 0 },
  transition = { duration: 0.6 }
}: AnimatedSectionProps) => {
  return (
    <motion.div
      initial={initial}
      animate={animate}
      whileInView={whileInView}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
