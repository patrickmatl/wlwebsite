'use client';

import { useState, useEffect } from 'react';

const words = [
  'Starter Package',
  'Growth Package',
  'Premium Package',
  'Custom Solutions'
];

export default function RotatingText() {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setIsAnimating(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return <span className="text-gold-500 inline-block">Starter Package</span>;
  }

  return (
    <span 
      className={`text-gold-500 inline-block transition-all duration-500 will-change-transform ${
        isAnimating ? 'opacity-0 transform -translate-y-4' : 'opacity-100 transform translate-y-0'
      }`}
      style={{ contentVisibility: 'auto' }}
    >
      {words[currentIndex]}
    </span>
  );
}
