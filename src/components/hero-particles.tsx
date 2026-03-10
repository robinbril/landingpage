"use client";

import React, { useMemo } from "react";

interface Particle {
  id: number;
  delay: number;
  angle: number;
  duration: number;
}

export default function HeroParticles() {
  // Generate particle configuration
  const particles: Particle[] = useMemo(() => {
    const particleCount = typeof window !== "undefined" && window.innerWidth < 768 ? 4 : 8;
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      delay: Math.random() * 3,
      angle: 160 + Math.random() * 40, // Angle range 160-200 degrees (shooting left-upward to left-downward)
      duration: 2 + Math.random() * 1.5, // 2-3.5 seconds
    }));
  }, []);

  const colorVariants = ["#fb923c", "#f97316", "#fbbf24"];

  return (
    <>
      <style>{`
        @keyframes particle-shoot {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
          85% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translate(var(--tx), var(--ty)) scale(0.3);
          }
        }

        @keyframes particle-trail {
          0% {
            box-shadow: 0 0 0 rgba(251, 146, 60, 0.6);
          }
          50% {
            box-shadow:
              0 -4px 8px rgba(249, 115, 22, 0.4),
              0 -8px 12px rgba(251, 191, 36, 0.2);
          }
          100% {
            box-shadow:
              0 -8px 16px rgba(249, 115, 22, 0.2),
              0 -12px 20px rgba(251, 191, 36, 0.1);
          }
        }

        .hero-particle {
          position: absolute;
          right: 15%;
          top: 50%;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          pointer-events: none;
        }

        @media (max-width: 768px) {
          .hero-particle {
            right: 10%;
            width: 2px;
            height: 2px;
          }
        }
      `}</style>

      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        {particles.map((particle) => {
          const radians = (particle.angle * Math.PI) / 180;
          const distance = typeof window !== "undefined" && window.innerWidth < 768 ? 280 : 450;
          const tx = Math.cos(radians) * distance;
          const ty = Math.sin(radians) * distance;
          const color = colorVariants[particle.id % colorVariants.length];

          return (
            <div
              key={particle.id}
              className="hero-particle"
              style={{
                backgroundColor: color,
                "--tx": `${tx}px`,
                "--ty": `${ty}px`,
                animation: `particle-shoot ${particle.duration}s ease-out ${particle.delay}s infinite`,
                animationTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              } as React.CSSProperties & { "--tx": string; "--ty": string }}
            />
          );
        })}
      </div>
    </>
  );
}
