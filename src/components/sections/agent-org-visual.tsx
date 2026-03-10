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
  Megaphone,
  Cog,
  Bot,
  X,
  ArrowRight,
  Zap,
} from "lucide-react";
import { scrollToSection } from "@/lib/scroll-utils";

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
  detailNL: string[];
  detailEN: string[];
  icon: React.ElementType;
  x: number;
  y: number;
  connects: string[];
}

// ─── Layout data ─────────────────────────────────────────────────────────────

const DEPARTMENTS: Department[] = [
  { id: "sales", labelNL: "Sales", labelEN: "Sales", icon: TrendingUp, x: 10, y: 15 },
  { id: "marketing", labelNL: "Marketing", labelEN: "Marketing", icon: Megaphone, x: 42, y: 5 },
  { id: "customer-service", labelNL: "Klantenservice", labelEN: "Customer Service", icon: HeadphonesIcon, x: 75, y: 15 },
  { id: "operations", labelNL: "Operations", labelEN: "Operations", icon: Cog, x: 8, y: 60 },
  { id: "hr", labelNL: "HR", labelEN: "HR", icon: Users, x: 42, y: 72 },
  { id: "management", labelNL: "Management", labelEN: "Management", icon: Briefcase, x: 75, y: 60 },
];

const AGENT_NODES: AgentNode[] = [
  {
    id: "lead-agent",
    labelNL: "Lead Qualifying",
    labelEN: "Lead Qualifying",
    descNL: "Kwalificeert leads uit marketing en plant meetings voor sales",
    descEN: "Qualifies leads from marketing and schedules meetings for sales",
    detailNL: ["Scoort leads op 40+ signalen", "Verrijkt bedrijfsdata automatisch", "Plant meetings direct in agenda"],
    detailEN: ["Scores leads on 40+ signals", "Enriches company data automatically", "Schedules meetings directly"],
    icon: TrendingUp,
    x: 25,
    y: 12,
    connects: ["sales", "marketing"],
  },
  {
    id: "klantenservice-agent",
    labelNL: "Klantenservice",
    labelEN: "Customer Service",
    descNL: "Beantwoordt tickets, escaleert naar operations bij complexe issues",
    descEN: "Answers tickets, escalates to operations for complex issues",
    detailNL: ["Multichannel: chat, e-mail, WhatsApp", "Leert van eerdere tickets", "Escaleert automatisch"],
    detailEN: ["Multichannel: chat, email, WhatsApp", "Learns from past tickets", "Escalates automatically"],
    icon: HeadphonesIcon,
    x: 58,
    y: 10,
    connects: ["customer-service", "marketing"],
  },
  {
    id: "content-agent",
    labelNL: "Content",
    labelEN: "Content",
    descNL: "Schrijft content vanuit sales insights en deelt via marketing kanalen",
    descEN: "Writes content from sales insights and shares via marketing channels",
    detailNL: ["Genereert blogs en social posts", "Gebaseerd op sales feedback", "Publiceert via je kanalen"],
    detailEN: ["Generates blogs and social posts", "Based on sales feedback", "Publishes via your channels"],
    icon: Mail,
    x: 25,
    y: 35,
    connects: ["sales", "marketing", "management"],
  },
  {
    id: "order-agent",
    labelNL: "Order Processing",
    labelEN: "Order Processing",
    descNL: "Verwerkt orders tussen sales en operations, informeert klantenservice",
    descEN: "Processes orders between sales and operations, informs customer service",
    detailNL: ["Verwerkt orders automatisch", "Checkt voorraad en beschikbaarheid", "Stuurt bevestigingen"],
    detailEN: ["Processes orders automatically", "Checks stock and availability", "Sends confirmations"],
    icon: ShoppingCart,
    x: 42,
    y: 38,
    connects: ["sales", "operations", "customer-service"],
  },
  {
    id: "rapportage-agent",
    labelNL: "Rapportage",
    labelEN: "Reporting",
    descNL: "Genereert rapporten vanuit alle afdelingen voor management",
    descEN: "Generates reports from all departments for management",
    detailNL: ["Real-time dashboards", "Automatische weekrapporten", "KPI tracking per afdeling"],
    detailEN: ["Real-time dashboards", "Automatic weekly reports", "KPI tracking per department"],
    icon: BarChart3,
    x: 60,
    y: 42,
    connects: ["management", "operations", "customer-service"],
  },
  {
    id: "hr-onboarding-agent",
    labelNL: "HR Onboarding",
    labelEN: "HR Onboarding",
    descNL: "Begeleidt nieuwe medewerkers, coördineert met alle afdelingen",
    descEN: "Guides new employees, coordinates with all departments",
    detailNL: ["Stap-voor-stap onboarding", "Documenten automatisch verzameld", "Check-ins met manager"],
    detailEN: ["Step-by-step onboarding", "Documents collected automatically", "Check-ins with manager"],
    icon: Users,
    x: 25,
    y: 62,
    connects: ["hr", "operations", "management"],
  },
  {
    id: "kennisbank-agent",
    labelNL: "Kennisbank",
    labelEN: "Knowledge Base",
    descNL: "Maakt kennis uit alle afdelingen doorzoekbaar voor iedereen",
    descEN: "Makes knowledge from all departments searchable for everyone",
    detailNL: ["Doorzoekt 10.000+ documenten", "Geeft direct antwoord", "Leert bij elke interactie"],
    detailEN: ["Searches 10,000+ documents", "Gives instant answers", "Learns from every interaction"],
    icon: Brain,
    x: 58,
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
  const deptOffset = 28;
  const agentOffset = 24;

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
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

function DeptNode({ dept, isHighlighted, language, delay }: {
  dept: Department; isHighlighted: boolean; language: string; delay: number;
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
      <div className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 ${
        isHighlighted
          ? "bg-[#4a2c2a] border-[#4a2c2a] shadow-lg shadow-[#4a2c2a]/30 scale-110"
          : "bg-white/80 border-[#4a2c2a]/20"
      }`}>
        <Icon className={`h-6 w-6 transition-colors ${isHighlighted ? "text-[#fdf2e9]" : "text-[#4a2c2a]"}`} />
      </div>
      <span className={`text-[11px] font-bold whitespace-nowrap transition-colors ${
        isHighlighted ? "text-[#4a2c2a]" : "text-[#8e6d6b]"
      }`}>
        {language === "nl" ? dept.labelNL : dept.labelEN}
      </span>
    </motion.div>
  );
}

// ─── Agent Node ──────────────────────────────────────────────────────────────

function AgentNodeComponent({ agent, isActive, onClick, language, delay }: {
  agent: AgentNode; isActive: boolean; onClick: () => void; language: string; delay: number;
}) {
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
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col items-center gap-1"
      >
        <div className={`relative ${isActive ? "scale-110" : ""} transition-transform`}>
          <div className={`absolute -inset-1.5 rounded-full bg-gradient-to-br from-[#e67e22] to-[#ff7f50] transition-opacity ${
            isActive ? "opacity-40 animate-pulse" : "opacity-0 group-hover:opacity-25"
          }`} />
          <div className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
            isActive
              ? "bg-gradient-to-br from-[#e67e22] to-[#ff7f50] shadow-xl shadow-[#e67e22]/40"
              : "bg-gradient-to-br from-[#e67e22] to-[#ff7f50] shadow-md shadow-[#e67e22]/20 group-hover:shadow-lg"
          }`}>
            <Bot className="h-5 w-5 text-white" />
          </div>
        </div>
        <span className="text-[10px] font-bold text-[#e67e22] whitespace-nowrap max-w-[100px] text-center leading-tight">
          {isNL ? agent.labelNL : agent.labelEN}
        </span>
      </motion.div>
    </motion.div>
  );
}

// ─── Detail Panel (Right Side) ──────────────────────────────────────────────

function DetailPanel({ agent, language, onClose }: {
  agent: AgentNode | null; language: string; onClose: () => void;
}) {
  const isNL = language === "nl";

  return (
    <AnimatePresence mode="wait">
      {agent ? (
        <motion.div
          key={agent.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.25 }}
          className="bg-white border border-[#4a2c2a]/10 rounded-2xl p-5 shadow-lg h-fit"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#e67e22] to-[#ff7f50] flex items-center justify-center flex-shrink-0">
                <agent.icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#4a2c2a]">
                  {isNL ? agent.labelNL : agent.labelEN} Agent
                </h4>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8e6d6b]">
                  {agent.connects.length} {isNL ? "afdelingen verbonden" : "departments connected"}
                </p>
              </div>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-[#fdf2e9] rounded-lg transition-colors">
              <X className="h-3.5 w-3.5 text-[#8e6d6b]" />
            </button>
          </div>

          <p className="text-sm text-[#4a2c2a]/70 mb-4 leading-relaxed">
            {isNL ? agent.descNL : agent.descEN}
          </p>

          <div className="space-y-2 mb-4">
            {(isNL ? agent.detailNL : agent.detailEN).map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-[#4a2c2a]/80">
                <Zap className="h-3 w-3 text-[#e67e22] flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => scrollToSection("ready-to-start")}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#4a2c2a] text-white text-xs font-medium hover:bg-[#3a1c1a] transition-colors"
          >
            {isNL ? "Plan afspraak" : "Book a call"}
            <ArrowRight className="h-3 w-3" />
          </button>
        </motion.div>
      ) : (
        <div className="h-fit min-h-[200px]" />
      )}
    </AnimatePresence>
  );
}

// ─── Animated Cursor Hint ────────────────────────────────────────────────────

function AnimatedCursorHint({
  containerWidth,
  containerHeight,
}: {
  containerWidth: number;
  containerHeight: number;
}) {
  // Target position: order-agent node at x:42, y:38
  const targetX = (42 / 100) * containerWidth;
  const targetY = (38 / 100) * containerHeight;

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: 0, top: 0, width: "100%", height: "100%" }}
    >
      <motion.svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute"
        style={{
          left: targetX,
          top: targetY,
          transform: "translate(-6px, -6px)",
        }}
        initial={{ opacity: 0, x: -100, y: -100 }}
        animate={{
          opacity: [1, 1, 0],
          x: [0, 0, 0],
          y: [0, 0, 0],
        }}
        transition={{
          duration: 3.5,
          times: [0, 0.7, 1],
          ease: "easeInOut",
        }}
      >
        {/* Standard pointer cursor arrow */}
        <path
          d="M3 3L10.5 17.5L13 12.5L19 13.5L3 3Z"
          fill="#e67e22"
          stroke="#ff7f50"
          strokeWidth="0.5"
        />
      </motion.svg>

      {/* Click pulse animation at target */}
      <motion.div
        className="absolute rounded-full border-2 border-[#e67e22]"
        style={{
          width: 40,
          height: 40,
          left: targetX - 20,
          top: targetY - 20,
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: [0.8, 1.2, 1.2],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 3.5,
          times: [0, 0.7, 1],
          ease: "easeOut",
        }}
      />
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

  const activeAgentData = activeAgent ? AGENT_NODES.find((a) => a.id === activeAgent) ?? null : null;

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 bg-[#fdf2e9] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-10"
        >
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-[#e67e22] mb-3">
            {isNL ? "Hoe het werkt" : "How it works"}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#4a2c2a] mb-4">
            {isNL ? (
              <>Agents die <span className="text-[#e67e22]">tussen</span> je team werken</>
            ) : (
              <>Agents that work <span className="text-[#e67e22]">between</span> your team</>
            )}
          </h2>
          <p className="text-base sm:text-lg text-[#8e6d6b] max-w-2xl mx-auto">
            {isNL
              ? "Digitale medewerkers zweven tussen afdelingen. Ze pakken werk op waar het ontstaat."
              : "Digital employees float between departments. They pick up work where it originates."}
          </p>
        </motion.div>

        {/* Grid: Network left, Detail panel right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 items-start mx-auto max-w-6xl">
          {/* Network visualization */}
          <div
            ref={containerRef}
            className="relative w-full"
            style={{ height: "clamp(340px, 42vw, 460px)" }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setActiveAgent(null);
            }}
          >
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `radial-gradient(circle, #4a2c2a 1px, transparent 1px)`,
                backgroundSize: "32px 32px",
              }}
            />

            <ConnectionLines
              agents={AGENT_NODES}
              departments={DEPARTMENTS}
              activeAgent={activeAgent}
              containerWidth={dims.w}
              containerHeight={dims.h}
            />

            {DEPARTMENTS.map((dept, i) => (
              <DeptNode
                key={dept.id}
                dept={dept}
                isHighlighted={highlightedDepts.includes(dept.id)}
                language={language}
                delay={0.1 * i}
              />
            ))}

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

            {/* Animated cursor hint */}
            <AnimatedCursorHint containerWidth={dims.w} containerHeight={dims.h} />
          </div>

          {/* Detail panel (right side, desktop only visible as panel, mobile below) */}
          <div className="hidden lg:block sticky top-24">
            <DetailPanel
              agent={activeAgentData}
              language={language}
              onClose={() => setActiveAgent(null)}
            />
          </div>
        </div>

        {/* Mobile: detail panel below the network */}
        <div className="lg:hidden mt-4">
          <DetailPanel
            agent={activeAgentData}
            language={language}
            onClose={() => setActiveAgent(null)}
          />
        </div>
      </div>
    </section>
  );
}
