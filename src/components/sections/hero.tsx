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
      {/* Animated particle background */}
      <AsciiHeroBg />

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
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase mb-2"
              style={{ background: "#f9731618", border: "1px solid #f9731635", color: "#c2410c" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              {language === 'nl' ? 'AI Agents voor operationele teams' : 'AI Agents for operational teams'}
            </div>

            {/* Main headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight max-w-4xl px-4 sm:px-0 leading-tight text-[#4a2c2a]">
              {language === 'nl' ? (
                <>
                  Handmatig werk in je ERP?{' '}
                  <em className="not-italic text-orange-400">Een agent doet het.</em>
                </>
              ) : (
                <>
                  Manual work in your ERP?{' '}
                  <em className="not-italic text-orange-400">An agent handles it.</em>
                </>
              )}
            </h1>

            {/* Sub-proposition */}
            <p className="text-base sm:text-lg md:text-xl text-[#7a4c3a] max-w-2xl mx-auto mt-4 leading-relaxed">
              {language === 'nl'
                ? 'AI agents die via API koppelen aan Dynamics, SAP, Amazon of elk ander systeem. Geen handmatige stappen meer. Live in 2 weken.'
                : 'AI agents that connect via API to Dynamics, SAP, Amazon or any other system. No more manual steps. Live in 2 weeks.'}
            </p>

          </motion.div>

          {/* Single Primary CTA */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-3"
          >
            <a
              href="#ready-to-start"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("ready-to-start");
              }}
              className="inline-flex items-center justify-center gap-2 bg-[#4a2c2a] hover:bg-[#3a1c1a] text-white rounded-full px-6 sm:px-8 py-4 sm:py-5 text-sm sm:text-base font-medium shadow-lg shadow-[#4a2c2a]/20 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group"
              aria-label={language === 'nl' ? "Plan gratis intake" : "Book free intake"}
            >
              {language === 'nl' ? 'Plan gratis intake' : 'Book free intake'}
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("services");
              }}
              className="inline-flex items-center justify-center gap-2 bg-white/80 hover:bg-white border border-[#4a2c2a]/15 text-[#4a2c2a] rounded-full px-6 sm:px-8 py-4 sm:py-5 text-sm sm:text-base font-medium backdrop-blur-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group"
            >
              {language === 'nl' ? 'Bekijk use cases' : 'See use cases'}
              <ChevronDown className="h-5 w-5 group-hover:translate-y-0.5 transition-transform" />
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