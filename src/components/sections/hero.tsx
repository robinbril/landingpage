"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronDown, ArrowRight } from "lucide-react";
import { scrollToSection } from "@/lib/scroll-utils";
import { useLanguage } from "@/lib/i18n/language-context";

const AsciiHeroBg = dynamic(() => import("@/components/ascii-hero-bg"), { ssr: false });
const ShaderHeroBg = dynamic(() => import("@/components/shader-hero-bg"), { ssr: false });

const BG_STORAGE_KEY = "hero-bg-mode";
type HeroBgMode = "ascii" | "shader";

function HeroContent() {
  const { t, language } = useLanguage();
  const [ref, inView] = useInView({ threshold: 0.1 });
  const controls = useAnimation();
  const [bgMode, setBgMode] = useState<HeroBgMode>("ascii");
  const isShader = bgMode === "shader";

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  useEffect(() => {
    try {
      if (localStorage.getItem(BG_STORAGE_KEY) === "shader") setBgMode("shader");
    } catch {
      // private mode: keuze geldt alleen deze sessie
    }
  }, []);

  // De navbar ligt over de hero heen en is bovenaan transparant; via dit
  // attribuut kleurt hij mee zonder dat de hero zijn state hoeft te delen.
  useEffect(() => {
    document.documentElement.setAttribute("data-hero-bg", bgMode);
    return () => document.documentElement.removeAttribute("data-hero-bg");
  }, [bgMode]);

  const toggleBg = () => {
    const next: HeroBgMode = isShader ? "ascii" : "shader";
    setBgMode(next);
    try {
      localStorage.setItem(BG_STORAGE_KEY, next);
    } catch {
      // private mode: keuze geldt alleen deze sessie
    }
  };

  // Modernized animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const handleScrollDown = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection("trusted-partners");
  };

  return (
    <section
      id="hero"
      ref={ref}
      className={`relative min-h-[100dvh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden py-8 sm:py-12 md:py-16 transition-colors duration-500 ${
        isShader ? "bg-black" : "bg-[#fdf2e9]"
      }`}
    >
      {isShader ? (
        <>
          <div className="absolute inset-0">
            <ShaderHeroBg />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_50%,rgba(0,0,0,0.7)_0%,rgba(0,0,0,0.35)_45%,transparent_80%)]" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 opacity-60">
            <AsciiHeroBg />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#fdf2e9]/30 via-[#fdf2e9]/20 to-[#fdf2e9]/60" />
        </>
      )}

      <button
        type="button"
        onClick={toggleBg}
        aria-pressed={isShader}
        aria-label={
          isShader
            ? language === "nl"
              ? "Schakel terug naar de ASCII-achtergrond"
              : "Switch back to the ASCII background"
            : language === "nl"
              ? "Schakel naar de shader-achtergrond"
              : "Switch to the shader background"
        }
        className={`absolute top-24 right-4 sm:right-6 lg:right-10 z-20 inline-flex items-center gap-2 rounded-full border px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] backdrop-blur-md transition-all duration-300 hover:-translate-y-px ${
          isShader
            ? "border-orange-400/40 bg-black/40 text-orange-50 hover:border-orange-400/70"
            : "border-[#4a2c2a]/15 bg-white/60 text-[#4a2c2a]/80 hover:border-[#4a2c2a]/35"
        }`}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
            isShader ? "bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.9)]" : "bg-[#4a2c2a]/30"
          }`}
        />
        {isShader ? "Shader" : "ASCII"}
      </button>

      <div className="container relative z-10 px-4 sm:px-6 w-full max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="flex flex-col items-center space-y-4 sm:space-y-6 md:space-y-8 text-center py-8 sm:py-12 px-6 sm:px-10 max-w-4xl mx-auto"
        >
          {/* Hero Content */}
          <motion.div
            variants={itemVariants}
            className="space-y-6 md:space-y-8"
          >
            {/* Role label */}
            <p className={`text-xs font-semibold tracking-widest uppercase mb-2 transition-colors duration-500 ${isShader ? "text-orange-300" : "text-orange-500"}`}>
              AI Developer
            </p>

            {/* Main headline */}
            <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight transition-colors duration-500 ${isShader ? "text-[#fdf2e9]" : "text-[#4a2c2a]"}`} style={{ hyphens: 'none' }}>
              {language === 'nl' ? (
                <>
                  Stop met<br />
                  <em className="not-italic text-orange-400">handmatig werken.</em>
                </>
              ) : (
                <>
                  Stop doing<br />
                  <em className="not-italic text-orange-400">things manually.</em>
                </>
              )}
            </h1>

            {/* One punchy line */}
            <p className={`text-lg sm:text-xl max-w-sm mx-auto mt-5 transition-colors duration-500 ${isShader ? "text-[#fdf2e9]/80" : "text-[#7a4c3a]"}`}>
              {language === 'nl'
                ? 'Ik bouw een agent op maat. Gekoppeld aan jouw software via API.'
                : 'I build a custom agent. Connected to your software via API.'}
            </p>

            {/* Trust signals */}
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              <span className={`text-xs font-medium px-3 py-1 rounded-full border transition-colors duration-500 ${isShader ? "bg-orange-400/10 text-orange-200 border-orange-300/30" : "bg-orange-100 text-orange-700 border-orange-200"}`}>
                {language === 'nl' ? 'Via API aan elk systeem' : 'Via API to any system'}
              </span>
            </div>

          </motion.div>

          {/* Single Primary CTA */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center"
          >
            <a
              href="#ready-to-start"
              onClick={(e) => { e.preventDefault(); scrollToSection("ready-to-start"); }}
              className={`inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group ${
                isShader
                  ? "bg-[#fdf2e9] hover:bg-white text-[#3a1c1a] shadow-black/40"
                  : "bg-[#4a2c2a] hover:bg-[#3a1c1a] text-white shadow-[#4a2c2a]/20"
              }`}
            >
              {language === 'nl' ? 'Plan een gratis gesprek' : 'Book a free call'}
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Modernized loading state
function HeroLoading() {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-[100dvh] sm:min-h-[90vh] flex items-center justify-center bg-[#fdf2e9]">
      <div className="container px-4 sm:px-6 text-center w-full max-w-7xl mx-auto">
        <div className="space-y-8">
          <div className="space-y-4 md:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#4a2c2a]/90 max-w-5xl mx-auto px-2 sm:px-0 leading-tight">
              {t.hero.title}
            </h1>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 px-2 sm:px-0 max-w-2xl mx-auto">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-6 sm:h-8 w-16 sm:w-20 rounded-full bg-[#e67e22]/20 animate-pulse" />
              ))}
            </div>
          </div>
          <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-[#8e6d6b]/80 font-normal px-4 sm:px-0 text-center">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="h-11 w-36 rounded-md bg-orange-500 animate-pulse" />
            <div className="h-11 w-36 rounded-md border-2 border-[#e67e22]/30 animate-pulse" />
          </div>
          {/* Scroll indicator placeholder */}
          <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20 flex justify-center">
            <div className="h-14 w-14 rounded-full bg-[#e67e22]/20 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Hero() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? <HeroContent /> : <HeroLoading />;
}