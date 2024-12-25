'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const ParticlesAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; size: number }>>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    setCanvasSize();

    // Initialize particles with deterministic positions
    const initParticles = () => {
      if (!canvas) return;
      const width = canvas.width;
      const height = canvas.height;
      const seed = 12345; // Constant seed for consistent initial positions

      const pseudoRandom = (n: number) => {
        const x = Math.sin(n + seed) * 10000;
        return x - Math.floor(x);
      };

      particlesRef.current = Array.from({ length: 100 }, (_, i) => ({
        x: pseudoRandom(i * 1) * width,
        y: pseudoRandom(i * 2) * height,
        vx: (pseudoRandom(i * 3) - 0.5) * 2,
        vy: (pseudoRandom(i * 4) - 0.5) * 2,
        size: pseudoRandom(i * 5) * 3 + 1,
      }));
    };
    initParticles();

    // Animation frame
    const animate = () => {
      if (!canvas || !ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particlesRef.current.forEach(particle => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off walls
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 215, 0, 0.3)';
        ctx.fill();
      });

      // Draw connections
      particlesRef.current.forEach((p1, i) => {
        particlesRef.current.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 215, 0, ${0.2 * (1 - distance / 100)})`;
            ctx.stroke();
          }
        });
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Handle window resize
    const handleResize = () => {
      setCanvasSize();
      initParticles();
    };
    window.addEventListener('resize', handleResize);

    // Start animation
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ width: '100%', height: '100%' }}
      className="absolute inset-0 z-10 pointer-events-none"
    />
  );
};

export default ParticlesAnimation;
