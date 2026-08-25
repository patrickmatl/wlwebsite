'use client';

import { useEffect, useRef } from 'react';

/**
 * Gold dust — a purpose-built canvas particle field.
 *
 * Replaces the react-tsparticles + tsparticles + tsparticles-engine stack
 * (~400KB of JS loaded via loadFull) that previously rendered this one
 * decorative effect. This implementation is ~2KB, DPR-aware, pauses when the
 * tab is hidden, and respects prefers-reduced-motion.
 */

type Mote = {
  x: number;
  y: number;
  r: number;
  vy: number;
  sway: number;
  phase: number;
  alpha: number;
  twinkle: number;
};

export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let running = true;
    let w = 0;
    let h = 0;
    let motes: Mote[] = [];

    const spawn = (randomY: boolean): Mote => ({
      x: Math.random() * w,
      y: randomY ? Math.random() * h : h + 8,
      r: 0.8 + Math.random() * 1.8,
      vy: 0.15 + Math.random() * 0.45,
      sway: 0.2 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
      alpha: 0.25 + Math.random() * 0.5,
      twinkle: 0.5 + Math.random() * 1.5,
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(70, Math.round((w * h) / 22000));
      motes = Array.from({ length: count }, () => spawn(true));
    };

    let t = 0;
    const frame = () => {
      if (!running) return;
      t += 0.016;
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < motes.length; i++) {
        const m = motes[i];
        m.y -= m.vy;
        m.x += Math.sin(t * m.twinkle + m.phase) * m.sway * 0.3;
        if (m.y < -8) motes[i] = spawn(false);
        const a = m.alpha * (0.7 + 0.3 * Math.sin(t * m.twinkle + m.phase));
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 215, 0, ${a.toFixed(3)})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    };

    const onVisibility = () => {
      running = document.visibilityState === 'visible';
      if (running) raf = requestAnimationFrame(frame);
      else cancelAnimationFrame(raf);
    };

    resize();
    raf = requestAnimationFrame(frame);
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      aria-hidden="true"
    />
  );
}
