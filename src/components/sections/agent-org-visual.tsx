"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLanguage } from "@/lib/i18n/language-context";
import {
  HeadphonesIcon,
  TrendingUp,
  ShoppingCart,
  Brain,
  Mail,
  BarChart3,
  Users,
  Briefcase,
  Megaphone,
  Cog,
  Zap,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface AgentConnection {
  id: string;
  labelNL: string;
  labelEN: string;
  descNL: string;
  descEN: string;
  icon: React.ElementType;
  fromNL: string;
  fromEN: string;
  toNL: string;
  toEN: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const AGENTS: AgentConnection[] = [
  {
    id: "lead-agent",
    labelNL: "Lead Qualifying",
    labelEN: "Lead Qualifying",
    descNL: "Kwalificeert leads en plant meetings voor sales",
    descEN: "Qualifies leads and schedules meetings for sales",
    icon: TrendingUp,
    fromNL: "Marketing",
    fromEN: "Marketing",
    toNL: "Sales",
    toEN: "Sales",
  },
  {
    id: "klantenservice-agent",
    labelNL: "Klantenservice",
    labelEN: "Customer Service",
    descNL: "Beantwoordt tickets, escaleert bij complexe vragen",
    descEN: "Answers tickets, escalates complex questions",
    icon: HeadphonesIcon,
    fromNL: "Klanten",
    fromEN: "Customers",
    toNL: "Support team",
    toEN: "Support team",
  },
  {
    id: "order-agent",
    labelNL: "Order Processing",
    labelEN: "Order Processing",
    descNL: "Verwerkt orders en stuurt bevestigingen",
    descEN: "Processes orders and sends confirmations",
    icon: ShoppingCart,
    fromNL: "Sales",
    fromEN: "Sales",
    toNL: "Operations",
    toEN: "Operations",
  },
  {
    id: "content-agent",
    labelNL: "Content",
    labelEN: "Content",
    descNL: "Schrijft content vanuit sales insights",
    descEN: "Writes content from sales insights",
    icon: Mail,
    fromNL: "Sales data",
    fromEN: "Sales data",
    toNL: "Marketing",
    toEN: "Marketing",
  },
  {
    id: "rapportage-agent",
    labelNL: "Rapportage",
    labelEN: "Reporting",
    descNL: "Genereert rapporten uit alle afdelingen",
    descEN: "Generates reports from all departments",
    icon: BarChart3,
    fromNL: "Alle data",
    fromEN: "All data",
    toNL: "Management",
    toEN: "Management",
  },
  {
    id: "kennisbank-agent",
    labelNL: "Kennisbank",
    labelEN: "Knowledge Base",
    descNL: "Maakt alle kennis doorzoekbaar voor iedereen",
    descEN: "Makes all knowledge searchable for everyone",
    icon: Brain,
    fromNL: "Documenten",
    fromEN: "Documents",
    toNL: "Iedereen",
    toEN: "Everyone",
  },
];

// ─── Single Agent Row ────────────────────────────────────────────────────────

function AgentRow({
  agent,
  language,
  index,
  isExpanded,
  onToggle,
}: {
  agent: AgentConnection;
  language: string;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const isNL = language === "nl";
  const Icon = agent.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <div
        onClick={onToggle}
        className={`group cursor-pointer rounded-2xl border transition-all duration-300 ${
          isExpanded
            ? "bg-white shadow-lg shadow-[#e67e22]/8 border-[#e67e22]/20"
            : "bg-white/60 hover:bg-white border-[#4a2c2a]/5 hover:border-[#e67e22]/15 hover:shadow-md"
        }`}
      >
        {/* Main row: from → agent → to */}
        <div className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 sm:py-5">
          {/* From label */}
          <div className="hidden sm:block w-24 text-right">
            <span className="text-xs font-medium text-[#8e6d6b]">
              {isNL ? agent.fromNL : agent.fromEN}
            </span>
          </div>

          {/* Arrow in */}
          <div className="hidden sm:block">
            <svg width="32" height="12" viewBox="0 0 32 12" fill="none">
              <path
                d="M0 6h28m0 0l-4-4m4 4l-4 4"
                stroke={isExpanded ? "#e67e22" : "#d4a574"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-colors"
              />
            </svg>
          </div>

          {/* Agent circle */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div
              className={`flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                isExpanded
                  ? "bg-gradient-to-br from-[#e67e22] to-[#d35400] shadow-md shadow-[#e67e22]/25 scale-105"
                  : "bg-gradient-to-br from-[#e67e22] to-[#f39c12] shadow-sm group-hover:shadow-md group-hover:shadow-[#e67e22]/15"
              }`}
            >
              <Icon className="h-5 w-5 text-white" />
            </div>

            <div className="min-w-0">
              <h3 className="text-sm sm:text-[15px] font-bold text-[#4a2c2a] truncate">
                {isNL ? agent.labelNL : agent.labelEN}
              </h3>
              <p className="text-[11px] sm:text-xs text-[#8e6d6b] truncate sm:hidden">
                {isNL ? agent.fromNL : agent.fromEN} → {isNL ? agent.toNL : agent.toEN}
              </p>
            </div>
          </div>

          {/* Arrow out */}
          <div className="hidden sm:block">
            <svg width="32" height="12" viewBox="0 0 32 12" fill="none">
              <path
                d="M0 6h28m0 0l-4-4m4 4l-4 4"
                stroke={isExpanded ? "#e67e22" : "#d4a574"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-colors"
              />
            </svg>
          </div>

          {/* To label */}
          <div className="hidden sm:block w-24">
            <span className="text-xs font-medium text-[#8e6d6b]">
              {isNL ? agent.toNL : agent.toEN}
            </span>
          </div>

          {/* Expand indicator */}
          <div className={`flex-shrink-0 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M4 6l4 4 4-4"
                stroke="#8e6d6b"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Expanded description */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-4 sm:px-6 pb-4 sm:pb-5 pt-0">
                <div className="pl-14 sm:pl-0 sm:text-center">
                  <p className="text-sm text-[#8e6d6b] leading-relaxed">
                    {isNL ? agent.descNL : agent.descEN}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── Main Section ────────────────────────────────────────────────────────────

export default function AgentOrgVisual() {
  const { language } = useLanguage();
  const isNL = language === "nl";
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-20 sm:py-28 bg-[#fdf2e9] overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <span className="inline-block text-[11px] font-bold tracking-[0.2em] uppercase text-[#e67e22] mb-4">
            {isNL ? "Hoe het werkt" : "How it works"}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#4a2c2a] mb-5 leading-tight">
            {isNL ? (
              <>
                Agents die je team{" "}
                <span className="text-[#e67e22]">aanvullen</span>
              </>
            ) : (
              <>
                Agents that{" "}
                <span className="text-[#e67e22]">complement</span>{" "}
                your team
              </>
            )}
          </h2>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-center mb-12 space-y-2"
        >
          <p className="text-base sm:text-lg text-[#8e6d6b]">
            {isNL
              ? "Ze pakken tijdsrovende, repetitieve taken over en lossen bottlenecks op."
              : "They take over time-consuming, repetitive tasks and solve bottlenecks."}
          </p>
          <p className="text-base sm:text-lg text-[#4a2c2a] font-semibold">
            {isNL
              ? "Daarna heb je agents die razendsnel kansen benutten."
              : "Then you have agents that seize opportunities at lightning speed."}
          </p>
        </motion.div>

        {/* Agent rows */}
        <div className="space-y-3">
          {AGENTS.map((agent, i) => (
            <AgentRow
              key={agent.id}
              agent={agent}
              language={language}
              index={i}
              isExpanded={expandedAgent === agent.id}
              onToggle={() =>
                setExpandedAgent((prev) => (prev === agent.id ? null : agent.id))
              }
            />
          ))}
        </div>

        {/* Bottom summary */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center text-xs text-[#8e6d6b] mt-8"
        >
          {isNL
            ? "Elke agent werkt zelfstandig tussen afdelingen. Klik om meer te lezen."
            : "Each agent works independently between departments. Click to learn more."}
        </motion.p>
      </div>
    </section>
  );
}
