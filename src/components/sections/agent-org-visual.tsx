"use client";

import React, { useState, useRef, useEffect } from "react";
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
  Building2,
  Megaphone,
  Cog,
  BookOpen,
  Bot,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Department {
  id: string;
  labelNL: string;
  labelEN: string;
  icon: React.ElementType;
  x: number;
  y: number;
}

interface AgentNode {
  id: string;
  labelNL: string;
  labelEN: string;
  descNL: string;
  descEN: string;
  icon: React.ElementType;
  x: number;
  y: number;
  connects: string[]; // department ids
}

// ─── Layout data ─────────────────────────────────────────────────────────────
// Positions are percentages (0-100) of the container

const DEPARTMENTS: Department[] = [
  { id: "sales", labelNL: "Sales", labelEN: "Sales", icon: TrendingUp, x: 10, y: 15 },
  { id: "marketing", labelNL: "Marketing", labelEN: "Marketing", icon: Megaphone, x: 42, y: 5 },
  { id: "customer-service", labelNL: "Klantenservice", labelEN: "Customer Service", icon: HeadphonesIcon, x: 78, y: 15 },
  { id: "operations", labelNL: "Operations", labelEN: "Operations", icon: Cog, x: 8, y: 60 },
  { id: "hr", labelNL: "HR", labelEN: "HR", icon: Users, x: 42, y: 72 },
  { id: "management", labelNL: "Management", labelEN: "Management", icon: Briefcase, x: 78, y: 60 },
];

const AGENT_NODES: AgentNode[] = [
  {
    id: "lead-agent",
    labelNL: "Lead Qualifying Agent",
    labelEN: "Lead Qualifying Agent",
    descNL: "Kwalificeert leads uit marketing en plant meetings voor sales",
    descEN: "Qualifies leads from marketing and schedules meetings for sales",
    icon: TrendingUp,
    x: 25,
    y: 12,
    connects: ["sales", "marketing"],
  },
  {
    id: "klantenservice-agent",
    labelNL: "Klantenservice Agent",
    labelEN: "Customer Service Agent",
    descNL: "Beantwoordt tickets, escaleert naar operations bij complexe issues",
    descEN: "Answers tickets, escalates to operations for complex issues",
    icon: HeadphonesIcon,
    x: 60,
    y: 10,
    connects: ["customer-service", "marketing"],
  },
  {
    id: "content-agent",
    labelNL: "Content Agent",
    labelEN: "Content Agent",
    descNL: "Schrijft content vanuit sales insights en deelt via marketing kanalen",
    descEN: "Writes content from sales insights and shares via marketing channels",
    icon: Mail,
    x: 25,
    y: 35,
    connects: ["sales", "marketing", "management"],
  },
  {
    id: "order-agent",
    labelNL: "Order Processing Agent",
    labelEN: "Order Processing Agent",
    descNL: "Verwerkt orders tussen sales en operations, informeert klantenservice",
    descEN: "Processes orders between sales and operations, informs customer service",
    icon: ShoppingCart,
    x: 42,
    y: 38,
    connects: ["sales", "operations", "customer-service"],
  },
  {
    id: "rapportage-agent",
    labelNL: "Rapportage Agent",
    labelEN: "Reporting Agent",
    descNL: "Genereert rapporten vanuit alle afdelingen voor management",
    descEN: "Generates reports from all departments for management",
    icon: BarChart3,
    x: 62,
    y: 42,
    connects: ["management", "operations", "customer-service"],
  },
  {
    id: "hr-onboarding-agent",
    labelNL: "HR Onboarding Agent",
    labelEN: "HR Onboarding Agent",
    descNL: "Begeleidt nieuwe medewerkers, coördineert met alle afdelingen",
    descEN: "Guides new employees, coordinates with all departments",
    icon: Users,
    x: 25,
    y: 62,
    connects: ["hr", "operations", "management"],
  },
  {
    id: "kennisbank-agent",
    labelNL: "Kennisbank Agent",
    labelEN: "Knowledge Base Agent",
    descNL: "Maakt kennis uit alle afdelingen doorzoekbaar voor iedereen",
    descEN: "Makes knowledge from all departments searchable for everyone",
    icon: Brain,
    x: 60,
    y: 65,
    connects: ["hr", "management", "operations", "customer-service"],
  },
];

// ─── SVG Connection Lines ────────────────────────────────────────────────────

function ConnectionLines({
  agents,
  departments,
  activeAgent,
  containerWidth,
  containerHeight,
}: {
  agents: AgentNode[];
  departments: Department[];
  activeAgent: string | null;
  containerWidth: number;
  containerHeight: number;
}) {
  const deptMap = Object.fromEntries(departments.map((d) => [d.id, d]));

  // Center offsets for nodes (dept nodes are ~56px, agent nodes are ~48px)
  const deptOffset = 28;
  const agentOffset = 24;

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    >
      <defs>
        <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e67e22" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ff7f50" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="line-active" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e67e22" stopOpacity="1" />
          <stop offset="100%" stopColor="#ff7f50" stopOpacity="1" />
        </linearGradient>
      </defs>
      {agents.map((agent) =>
        agent.connects.map((deptId) => {
          const dept = deptMap[deptId];
          if (!dept) return null;

          const ax = (agent.x / 100) * containerWidth + agentOffset;
          const ay = (agent.y / 100) * containerHeight + agentOffset;
          const dx = (dept.x / 100) * containerWidth + deptOffset;
          const dy = (dept.y / 100) * containerHeight + deptOffset;

          const isActive = activeAgent === agent.id;
          const isVisible = !activeAgent || activeAgent === agent.id;

          // Curved path
          const midX = (ax + dx) / 2;
          const midY = (ay + dy) / 2;
          const ctrlOffsetX = (dy - ay) * 0.15;
          const ctrlOffsetY = (ax - dx) * 0.15;

          return (
            <motion.path
              key={`${agent.id}-${deptId}`}
              d={`M ${ax} ${ay} Q ${midX + ctrlOffsetX} ${midY + ctrlOffsetY} ${dx} ${dy}`}
              fill="none"
              stroke={isActive ? "url(#line-active)" : "url(#line-gradient)"}
              strokeWidth={isActive ? 2.5 : 1.5}
              strokeDasharray={isActive ? "none" : "6 4"}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: isVisible ? (isActive ? 1 : 0.4) : 0.08,
              }}
              transition={{ duration: 1.2, delay: 0.3 }}
            />
          );
        })
      )}
    </svg>
  );
}

// ─── Department Node ─────────────────────────────────────────────────────────

function DeptNode({
  dept,
  isHighlighted,
  language,
  delay,
}: {
  dept: Department;
  isHighlighted: boolean;
  language: string;
  delay: number;
}) {
  const Icon = dept.icon;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="absolute flex flex-col items-center gap-1.5"
      style={{ left: `${dept.x}%`, top: `${dept.y}%`, zIndex: 2 }}
    >
      <div
        className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 ${
          isHighlighted
            ? "bg-[#4a2c2a] border-[#4a2c2a] shadow-lg shadow-[#4a2c2a]/30 scale-110"
            : "bg-white/80 border-[#4a2c2a]/20"
        }`}
      >
        <Icon className={`h-6 w-6 transition-colors ${isHighlighted ? "text-[#fdf2e9]" : "text-[#4a2c2a]"}`} />
      </div>
      <span
        className={`text-[11px] font-bold whitespace-nowrap transition-colors ${
          isHighlighted ? "text-[#4a2c2a]" : "text-[#8e6d6b]"
        }`}
      >
        {language === "nl" ? dept.labelNL : dept.labelEN}
      </span>
    </motion.div>
  );
}

// ─── Agent Node (floating) ───────────────────────────────────────────────────

function AgentNodeComponent({
  agent,
  isActive,
  onClick,
  language,
  delay,
}: {
  agent: AgentNode;
  isActive: boolean;
  onClick: () => void;
  language: string;
  delay: number;
}) {
  const Icon = agent.icon;
  const isNL = language === "nl";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, type: "spring", stiffness: 200 }}
      onClick={onClick}
      className="absolute cursor-pointer group"
      style={{ left: `${agent.x}%`, top: `${agent.y}%`, zIndex: 10 }}
    >
      {/* Floating animation wrapper */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col items-center gap-1"
      >
        {/* Glow ring */}
        <div className={`relative ${isActive ? "scale-110" : ""} transition-transform`}>
          <div
            className={`absolute -inset-1.5 rounded-full bg-gradient-to-br from-[#e67e22] to-[#ff7f50] transition-opacity ${
              isActive ? "opacity-40 animate-pulse" : "opacity-0 group-hover:opacity-25"
            }`}
          />
          <div
            className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
              isActive
                ? "bg-gradient-to-br from-[#e67e22] to-[#ff7f50] shadow-xl shadow-[#e67e22]/40"
                : "bg-gradient-to-br from-[#e67e22] to-[#ff7f50] shadow-md shadow-[#e67e22]/20 group-hover:shadow-lg group-hover:shadow-[#e67e22]/30"
            }`}
          >
            <Bot className="h-5 w-5 text-white" />
          </div>
        </div>
        <span className="text-[10px] font-bold text-[#e67e22] whitespace-nowrap max-w-[100px] text-center leading-tight">
          {isNL ? agent.labelNL.replace(" Agent", "") : agent.labelEN.replace(" Agent", "")}
        </span>
      </motion.div>

      {/* Tooltip on hover/active */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.9 }}
            className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-[#4a2c2a] text-[#fdf2e9] rounded-xl px-4 py-3 shadow-2xl min-w-[200px] max-w-[240px] z-50"
          >
            <div className="text-xs font-bold mb-1 flex items-center gap-1.5">
              <Icon className="h-3.5 w-3.5 text-[#e67e22]" />
              {isNL ? agent.labelNL : agent.labelEN}
            </div>
            <div className="text-[11px] text-[#fdf2e9]/70 leading-relaxed">
              {isNL ? agent.descNL : agent.descEN}
            </div>
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#4a2c2a] rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main Section ────────────────────────────────────────────────────────────

export default function AgentOrgVisual() {
  const { language } = useLanguage();
  const isNL = language === "nl";
  const [activeAgent, setActiveAgent] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 900, h: 500 });
  const { ref: sectionRef, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setDims({
          w: containerRef.current.offsetWidth,
          h: containerRef.current.offsetHeight,
        });
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const handleAgentClick = (id: string) => {
    setActiveAgent((prev) => (prev === id ? null : id));
  };

  const highlightedDepts = activeAgent
    ? AGENT_NODES.find((a) => a.id === activeAgent)?.connects ?? []
    : [];

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 bg-[#fdf2e9] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-6"
        >
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-[#e67e22] mb-3">
            {isNL ? "Hoe het werkt" : "How it works"}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#4a2c2a] mb-4">
            {isNL ? (
              <>
                Agents die <span className="text-[#e67e22]">tussen</span> je team werken
              </>
            ) : (
              <>
                Agents that work <span className="text-[#e67e22]">between</span> your team
              </>
            )}
          </h2>
          <p className="text-base sm:text-lg text-[#8e6d6b] max-w-2xl mx-auto">
            {isNL
              ? "Digitale medewerkers zweven tussen afdelingen. Ze pakken werk op waar het ontstaat , niet waar het toevallig belandt."
              : "Digital employees float between departments. They pick up work where it originates , not where it happens to land."}
          </p>
        </motion.div>

        {/* Instruction */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-[#8e6d6b] mb-8"
        >
          {isNL ? "Klik op een agent om connecties te zien" : "Click an agent to see connections"}
        </motion.p>

        {/* Visual container */}
        <div
          ref={containerRef}
          className="relative w-full mx-auto"
          style={{ height: "clamp(340px, 42vw, 460px)" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveAgent(null);
          }}
        >
          {/* Background grid dots */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `radial-gradient(circle, #4a2c2a 1px, transparent 1px)`,
              backgroundSize: "32px 32px",
            }}
          />

          {/* Connection lines SVG */}
          <ConnectionLines
            agents={AGENT_NODES}
            departments={DEPARTMENTS}
            activeAgent={activeAgent}
            containerWidth={dims.w}
            containerHeight={dims.h}
          />

          {/* Department nodes */}
          {DEPARTMENTS.map((dept, i) => (
            <DeptNode
              key={dept.id}
              dept={dept}
              isHighlighted={highlightedDepts.includes(dept.id)}
              language={language}
              delay={0.1 * i}
            />
          ))}

          {/* Agent nodes (floating) */}
          {AGENT_NODES.map((agent, i) => (
            <AgentNodeComponent
              key={agent.id}
              agent={agent}
              isActive={activeAgent === agent.id}
              onClick={() => handleAgentClick(agent.id)}
              language={language}
              delay={0.3 + 0.08 * i}
            />
          ))}

          {/* Legend */}
          <div className="absolute bottom-2 left-2 flex items-center gap-4 text-[10px] text-[#8e6d6b]">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-lg bg-white/80 border-2 border-[#4a2c2a]/20" />
              <span>{isNL ? "Afdeling" : "Department"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#e67e22] to-[#ff7f50]" />
              <span>{isNL ? "Digitale medewerker" : "Digital employee"}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
