'use client';

import { useCallback, useEffect, useState } from 'react';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";

const HeroParticles = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  if (!isMounted) return null;

  return (
    <Particles
      id="heroParticles"
      init={particlesInit}
      options={{
        fullScreen: {
          enable: false,
          zIndex: 0
        },
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 120,
        particles: {
          groups: {
            design: {
              color: {
                value: "#FFD700"
              },
              shape: {
                type: ["circle", "triangle"]
              },
              size: {
                value: { min: 2, max: 4 }
              },
              number: {
                value: 20
              },
              opacity: {
                value: 0.8
              },
              move: {
                direction: "none",
                enable: true,
                speed: 1,
                random: true,
                straight: false,
                outModes: "bounce"
              }
            },
            dots: {
              color: {
                value: "#ffffff"
              },
              shape: {
                type: "circle"
              },
              size: {
                value: { min: 0.5, max: 1.5 }
              },
              number: {
                value: 40
              },
              opacity: {
                value: 0.3,
                animation: {
                  enable: true,
                  speed: 0.5,
                  minimumValue: 0.1,
                  sync: false
                }
              },
              move: {
                enable: true,
                speed: 0.5,
                direction: "none",
                random: true,
                straight: false,
                outModes: "bounce"
              }
            }
          },
          number: {
            value: 60,
            density: {
              enable: true,
              area: 800
            }
          },
          color: {
            value: ["#FFD700", "#ffffff"]
          },
          shape: {
            type: ["circle", "triangle"]
          },
          opacity: {
            value: 0.5,
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0.1
            }
          },
          size: {
            value: { min: 1, max: 3 }
          },
          links: {
            enable: true,
            distance: 150,
            color: "#FFD700",
            opacity: 0.2,
            width: 1
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: true,
            straight: false,
            outModes: "bounce",
            attract: {
              enable: true,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: ["grab", "bubble"]
            },
            onClick: {
              enable: true,
              mode: "push"
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 140,
              links: {
                opacity: 0.5
              }
            },
            bubble: {
              distance: 200,
              size: 6,
              duration: 0.3,
              opacity: 0.8
            },
            push: {
              quantity: 4
            }
          }
        },
        detectRetina: true
      }}
      className="absolute inset-0 pointer-events-none"
    />
  );
};

export default HeroParticles;
