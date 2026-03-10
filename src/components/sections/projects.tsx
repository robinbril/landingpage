"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLanguage } from "@/lib/i18n/language-context";
import Image from "next/image";
import {
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Quote,
  Linkedin,
} from "lucide-react";

// ─── Experience Data ──────────────────────────────────────────────────────────

interface ExperienceEntry {
  company: string;
  role: { nl: string; en: string };
  period: string;
  highlights: { nl: string; en: string }[];
  tags?: string[];
  current?: boolean;
}

const EXPERIENCE: ExperienceEntry[] = [
  {
    company: "Fellowmind",
    role: {
      nl: "Senior AI Engineer",
      en: "Senior AI Engineer",
    },
    period: "2026 – heden",
    highlights: [],
    tags: ["AI Engineering", "Enterprise AI"],
  },
  {
    company: "Virelio",
    role: {
      nl: "AI Engineer & Oprichter",
      en: "AI Engineer & Founder",
    },
    period: "2024 – heden",
    highlights: [],
    tags: ["Multi-agent AI", "RAG", "MCP"],
  },
  {
    company: "Capgemini × Min. van Defensie",
    role: {
      nl: "AI Consultant",
      en: "AI Consultant",
    },
    period: "2024 – 2026",
    highlights: [],
    tags: ["Multi-agent AI", "MCP-servers", "On-premise"],
  },
  {
    company: "ROAD (eFlux)",
    role: {
      nl: "Data & AI Analyst",
      en: "Data & AI Analyst",
    },
    period: "2022 – 2024",
    highlights: [],
    tags: ["BigQuery", "Google Cloud"],
  },
  {
    company: "Quotum",
    role: {
      nl: "Oprichter & Full-stack AI Developer",
      en: "Founder & Full-stack AI Developer",
    },
    period: "2020 – 2024",
    highlights: [],
    tags: ["Full-stack Dev", "Data Engineering"],
  },
];

const SKILLS = [
  "Python", "TypeScript", "Multi-agent Systems", "RAG",
  "LLM Integration", "MCP Servers", "TensorFlow", "Azure AI-102",
  "Google Cloud", "Power BI", "SQL", "Docker", "Next.js",
  "Lean Six Sigma MBB",
];

const STATS = [
  { value: "5+", label: { nl: "jaar ervaring", en: "years experience" } },
  { value: "17+", label: { nl: "AI tools gebouwd", en: "AI tools built" } },
  { value: "200+", label: { nl: "productie deploys", en: "production deploys" } },
];

const TESTIMONIALS = [
  {
    quote: {
      nl: "Zeer gedreven collega die anderen weet te inspireren over AI. Robin is een onmisbare AI-steunpilaar zowel binnen als buiten ons project.",
      en: "Very driven colleague who inspires others about AI. Robin is an indispensable AI support pillar both within and outside our project.",
    },
    author: "Mark Vervuurt",
    role: "Lead AI Engineer, Capgemini",
  },
  {
    quote: {
      nl: "Robin is een uitzonderlijk vakbekwame professional. Zijn analytisch vermogen is van topniveau en levert consequent inzichten die zakelijke beslissingen sturen.",
      en: "Robin is an exceptionally skilled professional. His analytical capabilities are top-notch, consistently delivering insights that drive informed business decisions.",
    },
    author: "Giulio Piccolo",
    role: "Lead Data Engineer, Capgemini",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function Projects() {
  const { language } = useLanguage();
  const isNL = language === "nl";
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="projects"
      ref={ref}
      className="py-14 sm:py-20 bg-[#fdf2e9] overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-block text-[11px] font-bold tracking-[0.2em] uppercase text-[#e67e22] mb-3">
            {isNL ? "Over Robin" : "About Robin"}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#4a2c2a] mb-3 leading-tight">
            {isNL ? (
              <>
                Ervaring die{" "}
                <span className="text-[#e67e22]">resultaat</span> levert
              </>
            ) : (
              <>
                Experience that delivers{" "}
                <span className="text-[#e67e22]">results</span>
              </>
            )}
          </h2>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="bg-white rounded-3xl border border-[#4a2c2a]/8 shadow-lg shadow-[#4a2c2a]/5 overflow-hidden"
        >
          {/* Profile Header */}
          <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-5 border-b border-[#4a2c2a]/5">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5">
              {/* Photo */}
              <div className="relative flex-shrink-0">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-lg">
                  <Image
                    src="/images/contact/robin.jpeg"
                    alt="Robin Bril"
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-[2px] border-white flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              </div>

              {/* Info */}
              <div className="text-center sm:text-left flex-1">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div>
                    <h3 className="text-2xl font-bold text-[#4a2c2a] tracking-tight">
                      Robin Bril
                    </h3>
                    <p className="text-base text-[#8e6d6b] font-medium">
                      Senior AI Engineer
                    </p>
                  </div>
                  <a
                    href="https://www.linkedin.com/in/robin-bril/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#4a2c2a]/10 text-[#8e6d6b] bg-[#fdf2e9]/60 text-xs font-medium hover:bg-[#fdf2e9] transition-colors self-start"
                  >
                    <Linkedin className="h-3.5 w-3.5" />
                    LinkedIn
                  </a>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-1.5 text-[#8e6d6b]">
                  <MapPin className="h-3.5 w-3.5" />
                  <span className="text-sm">Amsterdam, Nederland</span>
                </div>

                {/* Stats as pills */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3">
                  {STATS.map((stat, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-[#4a2c2a]/8 text-[10px] text-[#4a2c2a]/70 bg-white/60">
                      <span className="font-bold text-[#4a2c2a]">{stat.value}</span>
                      {isNL ? stat.label.nl : stat.label.en}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Experience Timeline - compact */}
          <div className="px-6 sm:px-8 py-5">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="h-3.5 w-3.5 text-[#e67e22]" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#4a2c2a]">
                {isNL ? "Ervaring" : "Experience"}
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {EXPERIENCE.map((exp, index) => (
                <motion.div
                  key={exp.company + exp.role.en}
                  initial={{ opacity: 0, x: -12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
                >
                  {/* Content */}
                  <div className="p-3 rounded-xl bg-[#fdf2e9]/50 border border-[#4a2c2a]/5">
                    <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
                      <span className="font-bold text-[#4a2c2a] text-sm">
                        {exp.company}
                      </span>
                    </div>
                    <p className="text-xs text-[#8e6d6b] mb-1.5">
                      {isNL ? exp.role.nl : exp.role.en} · {exp.period}
                    </p>
                    {exp.highlights.length > 0 && (
                      <ul className="space-y-0.5">
                        {exp.highlights.map((h, hi) => (
                          <li
                            key={hi}
                            className="text-xs text-[#4a2c2a]/75 leading-relaxed flex gap-1.5"
                          >
                            <span className="text-[#e67e22] mt-1 flex-shrink-0 text-[8px]">●</span>
                            <span>{isNL ? h.nl : h.en}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {exp.tags && (
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {exp.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] px-2 py-0.5 rounded-full bg-[#e67e22]/8 text-[#e67e22] font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Skills & Education row - compact */}
          <div className="px-6 sm:px-8 pb-6 sm:pb-8">
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-6">
              {/* Skills */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="h-3.5 w-3.5 text-[#e67e22]" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#4a2c2a]">
                    {isNL ? "Skills" : "Skills"}
                  </h4>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {SKILLS.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] px-2.5 py-1 rounded-full border border-[#4a2c2a]/8 text-[#4a2c2a]/65 bg-[#fdf2e9]/60 font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="sm:w-56 flex-shrink-0">
                <div className="flex items-center gap-2 mb-3">
                  <GraduationCap className="h-3.5 w-3.5 text-[#e67e22]" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#4a2c2a]">
                    {isNL ? "Opleiding" : "Education"}
                  </h4>
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs font-semibold text-[#4a2c2a]">BSc Bedrijfskunde (cum laude)</p>
                    <p className="text-[10px] text-[#8e6d6b]">Hogeschool van Amsterdam</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#4a2c2a]">Azure AI Engineer (AI-102)</p>
                    <p className="text-[10px] text-[#8e6d6b]">Microsoft</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#4a2c2a]">Deep Learning Specialization</p>
                    <p className="text-[10px] text-[#8e6d6b]">Stanford University</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials - compact */}
          <div className="px-6 sm:px-8 pb-6 sm:pb-8 border-t border-[#4a2c2a]/5 pt-5">
            <div className="grid sm:grid-cols-2 gap-4">
              {TESTIMONIALS.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                  className="bg-[#fdf2e9]/50 rounded-xl p-4"
                >
                  <Quote className="h-3.5 w-3.5 text-[#e67e22]/40 mb-2" />
                  <p className="text-xs text-[#4a2c2a]/80 leading-relaxed mb-3 italic">
                    "{isNL ? t.quote.nl : t.quote.en}"
                  </p>
                  <div>
                    <p className="text-xs font-bold text-[#4a2c2a]">{t.author}</p>
                    <p className="text-[10px] text-[#8e6d6b]">{t.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
