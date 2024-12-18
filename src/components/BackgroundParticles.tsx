'use client';

import { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Particles to avoid SSR issues
const Particles = dynamic(() => import('react-tsparticles'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-transparent" />,
});

import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";

const BackgroundParticles = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  if (!mounted) {
    return <div className="w-full h-full bg-transparent" />;
  }

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: {
          enable: false,
          zIndex: 1
        },
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 120,
        particles: {
          color: {
            value: ["#FFD700", "#ffffff", "#FF5733"],
          },
          links: {
            color: "#FFD700",
            distance: 150,
            enable: true,
            opacity: 0.2,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
      }}
      className="absolute inset-0 pointer-events-none"
    />
  );
};

export default BackgroundParticles;
