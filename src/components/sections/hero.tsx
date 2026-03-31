"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronDown, ArrowRight } from "lucide-react";
import { scrollToSection } from "@/lib/scroll-utils";
import { useLanguage } from "@/lib/i18n/language-context";

const AsciiHeroBg = dynamic(() => import("@/components/ascii-hero-bg"), { ssr: false });

function HeroContent() {
  const { t, language } = useLanguage();
  const [ref, inView] = useInView({ threshold: 0.1 });
  const controls = useAnimation();
  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

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
      className="relative min-h-[100dvh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden py-8 sm:py-12 md:py-16 bg-[#fdf2e9]"
    >
      {/* Subtle gradient background only */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-50/60 to-[#fdf2e9]" />

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
            {/* Name + role */}
            <p className="text-sm font-semibold tracking-widest uppercase text-orange-500 mb-2">
              Robin Bril — AI Developer
            </p>

            {/* Main headline — short & punchy */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-[#4a2c2a]">
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
            <p className="text-lg sm:text-xl text-[#7a4c3a] max-w-sm mx-auto mt-5">
              {language === 'nl'
                ? 'Ik bouw een agent op maat — gekoppeld aan jouw software, live in 2 weken.'
                : 'I build a custom agent — connected to your software, live in 2 weeks.'}
            </p>

            {/* 3 trust signals */}
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              {['5× sneller', 'Elke software via API', 'Live in 2 weken'].map((tag) => (
                <span key={tag} className="text-xs font-medium px-3 py-1 rounded-full bg-orange-100 text-orange-700 border border-orange-200">
                  {tag}
                </span>
              ))}
            </div>

          </motion.div>

          {/* Single Primary CTA */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <a
              href="#ready-to-start"
              onClick={(e) => { e.preventDefault(); scrollToSection("ready-to-start"); }}
              className="inline-flex items-center justify-center gap-2 bg-[#4a2c2a] hover:bg-[#3a1c1a] text-white rounded-full px-8 py-4 text-base font-semibold shadow-lg shadow-[#4a2c2a]/20 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group"
            >
              {language === 'nl' ? 'Plan een gratis gesprek' : 'Book a free call'}
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#services"
              onClick={(e) => { e.preventDefault(); scrollToSection("services"); }}
              className="text-sm font-medium text-[#7a4c3a] hover:text-orange-500 transition-colors underline underline-offset-4"
            >
              {language === 'nl' ? 'Bekijk de agentlijst' : 'Browse agent list'}
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