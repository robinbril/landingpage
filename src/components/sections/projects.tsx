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
} from "lucide-react";

// ─── Experience Data ──────────────────────────────────────────────────────────

interface ExperienceEntry {
  company: string;
  role: { nl: string; en: string };
  period: string;
  logo?: string;
  highlights: { nl: string; en: string }[];
  tags?: string[];
  current?: boolean;
}

const EXPERIENCE: ExperienceEntry[] = [
  {
    company: "Virelio",
    role: {
      nl: "AI Developer & Oprichter",
      en: "AI Developer & Founder",
    },
    period: "2024 – heden",
    highlights: [
      {
        nl: "AI-tools en honderden productieklare automatiseringen voor scale-ups en corporates",
        en: "AI tools and hundreds of production-ready automations for scale-ups and corporates",
      },
      {
        nl: "Privacy-first AI-assistent voor grote interne documentcollecties via Slack, Teams en WebRTC",
        en: "Privacy-first AI assistant for large internal document collections via Slack, Teams and WebRTC",
      },
      {
        nl: "On-premise multi-agent systemen met RAG-knowledge bases, wekelijks uren handmatig werk bespaard per klant",
        en: "On-premise multi-agent systems with RAG knowledge bases, saving hours of manual work weekly per client",
      },
    ],
    tags: ["Python", "Multi-agent AI", "RAG", "WebRTC"],
    current: true,
  },
  {
    company: "Capgemini",
    role: {
      nl: "Dataconsultant & AI Developer",
      en: "Data Consultant & AI Developer",
    },
    period: "2024 – heden",
    logo: "/images/companies/capgemini.webp",
    highlights: [
      {
        nl: "Lead developer van DefGPT Pro voor het Ministerie van Defensie: eerste volledig private on-premise AI-platform voor een enterprise-organisatie",
        en: "Lead developer of DefGPT Pro for the Ministry of Defence: first fully private on-premise AI platform for an enterprise organisation",
      },
      {
        nl: "Multi-agent LLM-architectuur met MCP-servers en enterprise knowledge base integratie",
        en: "Multi-agent LLM architecture with MCP servers and enterprise knowledge base integration",
      },
      {
        nl: "Power BI en SAP-dashboards voor militair-strategisch inzicht, inclusief datacleansing en validatie",
        en: "Power BI and SAP dashboards for military-strategic insights, including data cleansing and validation",
      },
    ],
    tags: ["Multi-agent AI", "MCP-servers", "Power BI", "SAP"],
    current: true,
  },
  {
    company: "ROAD (eFlux)",
    role: {
      nl: "Data-analist",
      en: "Data Analyst",
    },
    period: "2022 – 2024",
    logo: "/images/companies/e-flux.jpeg",
    highlights: [
      {
        nl: "Looker- en BigQuery-dashboards voor meerdere afdelingen binnen het Google-ecosysteem",
        en: "Looker and BigQuery dashboards for multiple departments across the Google ecosystem",
      },
      {
        nl: "Markttrend-, KPI- en concurrentieanalyses op bestuursniveau",
        en: "Market trend, KPI and competitive analyses at board level",
      },
    ],
    tags: ["Looker", "BigQuery", "Google Cloud"],
  },
  {
    company: "Quotum Consultancy",
    role: {
      nl: "Oprichter",
      en: "Founder",
    },
    period: "2021 – 2024",
    highlights: [
      {
        nl: "Full-stack financieel dataplatform met on-chain, derivaten- en macrodata",
        en: "Full-stack financial data platform combining on-chain, derivatives and macro data",
      },
      {
        nl: "Gegroeid naar internationale betalende abonnees door continue doorontwikkeling",
        en: "Grew to international paying subscribers through continuous development",
      },
    ],
    tags: ["Full-stack Dev", "CI/CD"],
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
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
          {/* Profile Header - compact */}
          <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-5 border-b border-[#4a2c2a]/5">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
              {/* Photo */}
              <div className="relative flex-shrink-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-[3px] border-[#e67e22]/20 shadow-md">
                  <Image
                    src="/images/contact/robin.jpeg"
                    alt="Robin Bril"
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-[2px] border-white flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              </div>

              {/* Info */}
              <div className="text-center sm:text-left flex-1">
                <h3 className="text-xl sm:text-2xl font-black text-[#4a2c2a]">
                  Robin Bril
                </h3>
                <p className="text-sm sm:text-base text-[#e67e22] font-semibold mt-0.5">
                  Senior AI Specialist
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-1.5 text-[#8e6d6b]">
                  <MapPin className="h-3 w-3" />
                  <span className="text-xs">Amsterdam, Nederland</span>
                </div>

                {/* Stats row */}
                <div className="flex items-center justify-center sm:justify-start gap-5 mt-4">
                  {STATS.map((stat, i) => (
                    <div key={i} className="text-center sm:text-left">
                      <div className="text-lg sm:text-xl font-black text-[#4a2c2a]">
                        {stat.value}
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-[#8e6d6b]">
                        {isNL ? stat.label.nl : stat.label.en}
                      </div>
                    </div>
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

            <div className="space-y-4">
              {EXPERIENCE.map((exp, index) => (
                <motion.div
                  key={exp.company + exp.role.en}
                  initial={{ opacity: 0, x: -12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
                  className="flex gap-3"
                >
                  {/* Timeline dot */}
                  <div className="flex flex-col items-center pt-1.5">
                    <div
                      className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                        exp.current
                          ? "bg-[#e67e22] shadow-sm shadow-[#e67e22]/30"
                          : "bg-[#8e6d6b]/25"
                      }`}
                    />
                    {index < EXPERIENCE.length - 1 && (
                      <div className="w-px flex-1 bg-[#4a2c2a]/6 mt-1.5" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pb-1 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
                      {exp.logo && (
                        <Image
                          src={exp.logo}
                          alt={exp.company}
                          width={18}
                          height={18}
                          className="rounded-sm object-contain"
                        />
                      )}
                      <span className="font-bold text-[#4a2c2a] text-sm">
                        {exp.company}
                      </span>
                      {exp.current && (
                        <span className="text-[9px] font-bold uppercase tracking-wider text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">
                          {isNL ? "Actief" : "Active"}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#8e6d6b] mb-1.5">
                      {isNL ? exp.role.nl : exp.role.en} · {exp.period}
                    </p>
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
            <div className="flex flex-col sm:flex-row gap-6">
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
