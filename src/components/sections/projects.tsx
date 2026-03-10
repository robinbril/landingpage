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
} from "lucide-react";

// ─── Experience Data ──────────────────────────────────────────────────────────

interface ExperienceEntry {
  company: string;
  role: { nl: string; en: string };
  period: string;
  logo?: string;
  highlights: { nl: string; en: string }[];
  current?: boolean;
}

const EXPERIENCE: ExperienceEntry[] = [
  {
    company: "Virelio",
    role: {
      nl: "AI Developer & Oprichter",
      en: "AI Developer & Founder",
    },
    period: "2024 - heden",
    highlights: [
      {
        nl: "Privacy-first AI assistenten voor interne documentcollecties via Slack, Teams en WebRTC",
        en: "Privacy-first AI assistants for internal document collections via Slack, Teams and WebRTC",
      },
      {
        nl: "On-premise multi-agent systemen met RAG kennisbanken voor meerdere klanten",
        en: "On-premise multi-agent systems with RAG knowledge bases for multiple clients",
      },
      {
        nl: "AI tools en productie-automatiseringen voor scale-ups en enterprises",
        en: "AI tools and production automations for scale-ups and enterprises",
      },
    ],
    current: true,
  },
  {
    company: "Capgemini",
    role: {
      nl: "Dataconsultant & AI Developer",
      en: "Data Consultant & AI Developer",
    },
    period: "2024 - heden",
    logo: "/images/companies/capgemini.webp",
    highlights: [
      {
        nl: "Lead developer van DefGPT Pro voor het Ministerie van Defensie",
        en: "Lead developer of DefGPT Pro for the Ministry of Defence",
      },
      {
        nl: "Multi-agent LLM architectuur met MCP-servers",
        en: "Multi-agent LLM architecture with MCP servers",
      },
      {
        nl: "Power BI en SAP dashboards voor militair-strategische inzichten",
        en: "Power BI and SAP dashboards for military-strategic insights",
      },
    ],
    current: true,
  },
  {
    company: "eFlux",
    role: {
      nl: "Data Scientist",
      en: "Data Scientist",
    },
    period: "2022 - 2024",
    logo: "/images/companies/e-flux.jpeg",
    highlights: [
      {
        nl: "Custom Looker en BigQuery dashboards in het Google Cloud ecosysteem",
        en: "Custom Looker and BigQuery dashboards across Google Cloud ecosystem",
      },
      {
        nl: "Markttrend- en concurrentieanalyses",
        en: "Market trend and competitive performance analyses",
      },
    ],
  },
  {
    company: "Ministerie van Defensie",
    role: {
      nl: "Engineering via Capgemini",
      en: "Engineering via Capgemini",
    },
    period: "2024 - heden",
    logo: "/images/companies/ministerie.png",
    highlights: [
      {
        nl: "Requirements workshops met senior stakeholders",
        en: "Requirements workshops with senior stakeholders",
      },
      {
        nl: "Strategische partnerships en Core AI Team",
        en: "Strategic partnerships and Core AI Team",
      },
    ],
    current: true,
  },
];

const SKILLS = [
  "Python",
  "TypeScript",
  "Multi-agent Systems",
  "RAG",
  "LLM Integration",
  "MCP Servers",
  "TensorFlow",
  "Azure AI-102",
  "Google Cloud",
  "Power BI",
  "SQL",
  "Docker",
  "Next.js",
  "Lean Six Sigma",
];

const STATS = [
  { value: "5+", label: { nl: "jaar ervaring", en: "years experience" } },
  { value: "17", label: { nl: "AI tools gebouwd", en: "AI tools built" } },
  { value: "18+", label: { nl: "bedrijven geholpen", en: "companies helped" } },
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
      className="py-20 sm:py-28 bg-[#fdf2e9] overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-[11px] font-bold tracking-[0.2em] uppercase text-[#e67e22] mb-4">
            {isNL ? "Over Robin" : "About Robin"}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#4a2c2a] mb-5 leading-tight">
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
          <div className="px-6 sm:px-10 pt-8 sm:pt-10 pb-6 border-b border-[#4a2c2a]/5">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-8">
              {/* Photo */}
              <div className="relative flex-shrink-0">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-[3px] border-[#e67e22]/20 shadow-md">
                  <Image
                    src="/images/contact/robin.jpeg"
                    alt="Robin Bril"
                    width={112}
                    height={112}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 rounded-full border-[3px] border-white flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              </div>

              {/* Info */}
              <div className="text-center sm:text-left flex-1">
                <h3 className="text-2xl sm:text-3xl font-black text-[#4a2c2a]">
                  Robin Bril
                </h3>
                <p className="text-base sm:text-lg text-[#e67e22] font-semibold mt-1">
                  {isNL
                    ? "AI Developer & Digitale Medewerkers Specialist"
                    : "AI Developer & Digital Employee Specialist"}
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-2 text-[#8e6d6b]">
                  <MapPin className="h-3.5 w-3.5" />
                  <span className="text-sm">Amstelveen, Nederland</span>
                </div>

                {/* Stats row */}
                <div className="flex items-center justify-center sm:justify-start gap-6 mt-5">
                  {STATS.map((stat, i) => (
                    <div key={i} className="text-center sm:text-left">
                      <div className="text-xl sm:text-2xl font-black text-[#4a2c2a]">
                        {stat.value}
                      </div>
                      <div className="text-[11px] sm:text-xs text-[#8e6d6b]">
                        {isNL ? stat.label.nl : stat.label.en}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Experience Timeline */}
          <div className="px-6 sm:px-10 py-8">
            <div className="flex items-center gap-2 mb-6">
              <Briefcase className="h-4 w-4 text-[#e67e22]" />
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#4a2c2a]">
                {isNL ? "Ervaring" : "Experience"}
              </h4>
            </div>

            <div className="space-y-6">
              {EXPERIENCE.map((exp, index) => (
                <motion.div
                  key={exp.company + exp.role.en}
                  initial={{ opacity: 0, x: -12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex gap-4"
                >
                  {/* Timeline dot */}
                  <div className="flex flex-col items-center pt-1.5">
                    <div
                      className={`w-3 h-3 rounded-full flex-shrink-0 ${
                        exp.current
                          ? "bg-[#e67e22] shadow-sm shadow-[#e67e22]/30"
                          : "bg-[#8e6d6b]/30"
                      }`}
                    />
                    {index < EXPERIENCE.length - 1 && (
                      <div className="w-px flex-1 bg-[#4a2c2a]/8 mt-2" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pb-2 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      {exp.logo && (
                        <Image
                          src={exp.logo}
                          alt={exp.company}
                          width={20}
                          height={20}
                          className="rounded-sm object-contain"
                        />
                      )}
                      <span className="font-bold text-[#4a2c2a] text-[15px]">
                        {exp.company}
                      </span>
                      {exp.current && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                          {isNL ? "Actief" : "Active"}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[#8e6d6b] mb-2">
                      {isNL ? exp.role.nl : exp.role.en} · {exp.period}
                    </p>
                    <ul className="space-y-1">
                      {exp.highlights.map((h, hi) => (
                        <li
                          key={hi}
                          className="text-sm text-[#4a2c2a]/80 leading-relaxed flex gap-2"
                        >
                          <span className="text-[#e67e22] mt-1.5 flex-shrink-0">
                            ·
                          </span>
                          <span>{isNL ? h.nl : h.en}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Skills & Certifications */}
          <div className="px-6 sm:px-10 pb-8 sm:pb-10">
            <div className="flex flex-col sm:flex-row gap-8">
              {/* Skills */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="h-4 w-4 text-[#e67e22]" />
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[#4a2c2a]">
                    {isNL ? "Technische vaardigheden" : "Technical Skills"}
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {SKILLS.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-3 py-1.5 rounded-full border border-[#4a2c2a]/10 text-[#4a2c2a]/70 bg-[#fdf2e9]/60 font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="sm:w-64 flex-shrink-0">
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap className="h-4 w-4 text-[#e67e22]" />
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[#4a2c2a]">
                    {isNL ? "Opleiding" : "Education"}
                  </h4>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-[#4a2c2a]">
                      BSc Business Administration
                    </p>
                    <p className="text-xs text-[#8e6d6b]">
                      Hogeschool van Amsterdam, cum laude
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#4a2c2a]">
                      Azure AI Engineer (AI-102)
                    </p>
                    <p className="text-xs text-[#8e6d6b]">Microsoft</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#4a2c2a]">
                      Deep Learning Specialization
                    </p>
                    <p className="text-xs text-[#8e6d6b]">Stanford</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
