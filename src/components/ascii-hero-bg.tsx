"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";

const ASCII_CHARS = " .,:;i1tfLCG08@#";
const CHAR_SIZE = 14;
const FONT = "12px monospace";

export default function AsciiHeroBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const resize = useCallback(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    setDimensions({ width: w, height: h });
  }, []);

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [resize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const cols = Math.ceil(dimensions.width / (CHAR_SIZE * 0.6));
    const rows = Math.ceil(dimensions.height / CHAR_SIZE);

    // Simplex-like noise using sin combinations
    function noise(x: number, y: number, t: number): number {
      const n1 = Math.sin(x * 0.03 + t * 0.4) * Math.cos(y * 0.04 - t * 0.3);
      const n2 = Math.sin(x * 0.07 - t * 0.2) * Math.sin(y * 0.06 + t * 0.5);
      const n3 = Math.cos(x * 0.05 + y * 0.05 + t * 0.15);
      const n4 = Math.sin((x + y) * 0.02 + t * 0.25);
      return (n1 + n2 + n3 + n4) / 4;
    }

    // Wave displacement
    function displacement(x: number, y: number, t: number): number {
      const wave1 = Math.sin(x * 0.015 + t * 0.6) * 0.5;
      const wave2 = Math.cos(y * 0.02 - t * 0.4) * 0.3;
      const ripple = Math.sin(Math.sqrt(x * x + y * y) * 0.01 - t * 0.8) * 0.2;
      return wave1 + wave2 + ripple;
    }

    function render(timestamp: number) {
      if (!ctx || !canvas) return;
      const t = timestamp * 0.001;
      timeRef.current = t;

      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = FONT;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * CHAR_SIZE * 0.6;
          const y = row * CHAR_SIZE;

          // Combine noise layers
          const n = noise(col, row, t);
          const d = displacement(col, row, t);
          const combined = (n + d) * 0.5 + 0.5; // normalize to 0-1

          // Map to character
          const charIndex = Math.floor(
            Math.max(0, Math.min(1, combined)) * (ASCII_CHARS.length - 1)
          );
          const char = ASCII_CHARS[charIndex];

          // Color: dark blue-ish with slight variation
          const brightness = combined * 0.35;
          const r = Math.floor(brightness * 80);
          const g = Math.floor(brightness * 140);
          const b = Math.floor(brightness * 255);

          ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
          ctx.fillText(char, x, y);
        }
      }

      // Radial gradient overlay: fade edges to black, keep center visible
      const gradient = ctx.createRadialGradient(
        canvas.width * 0.5,
        canvas.height * 0.4,
        canvas.width * 0.15,
        canvas.width * 0.5,
        canvas.height * 0.4,
        canvas.width * 0.6
      );
      gradient.addColorStop(0, "rgba(0,0,0,0)");
      gradient.addColorStop(0.5, "rgba(0,0,0,0.3)");
      gradient.addColorStop(1, "rgba(0,0,0,0.85)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animFrameRef.current = requestAnimationFrame(render);
    }

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [dimensions]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.6 }}
    />
  );
}
