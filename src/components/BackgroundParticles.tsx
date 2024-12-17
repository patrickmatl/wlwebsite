'use client';

import { useMemo, useEffect, useState } from 'react';

interface Particle {
  id: number;
  left: string;
  top: string;
  scale: string;
  duration: string;
}

export default function BackgroundParticles() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const particles = useMemo(() => {
    if (!isClient) return [];
    
    return Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      scale: `${0.3 + Math.random() * 1.7}`,
      duration: `${3 + Math.random() * 7}s`
    }));
  }, [isClient]);

  if (!isClient) {
    return (
      <div className="absolute inset-0 will-change-transform">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.1),transparent_40%)]" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 will-change-transform">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.1),transparent_40%)]" />
      
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full bg-[#FFD700] opacity-40"
          style={{
            left: particle.left,
            top: particle.top,
            transform: `scale(${particle.scale})`,
            animation: `float ${particle.duration} infinite`,
            willChange: 'transform'
          }}
        />
      ))}
    </div>
  );
}
