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
  ChevronDown,
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
    descNL: "Scoort en verrijkt inkomende leads automatisch en plant gekwalificeerde meetings in voor sales.",
    descEN: "Automatically scores and enriches inbound leads, then schedules qualified meetings for sales.",
    detailNL: ["Scoort op 40+ signalen via je CRM", "Verrijkt bedrijfsdata vanuit KvK & LinkedIn", "Koppelt met HubSpot, Salesforce, Pipedrive"],
    detailEN: ["Scores on 40+ signals via your CRM", "Enriches company data from registries & LinkedIn", "Integrates with HubSpot, Salesforce, Pipedrive"],
    icon: TrendingUp,
    x: 25,
    y: 12,
    connects: ["sales", "marketing"],
  },
  {
    id: "klantenservice-agent",
    labelNL: "Klantenservice",
    labelEN: "Customer Service",
    descNL: "Beantwoordt klantvragen over alle kanalen en escaleert automatisch bij complexe cases.",
    descEN: "Resolves customer queries across all channels and auto-escalates complex cases.",
    detailNL: ["Multichannel: chat, e-mail, WhatsApp", "Leert van historische tickets", "Koppelt met Zendesk, Freshdesk, Intercom"],
    detailEN: ["Multichannel: chat, email, WhatsApp", "Learns from historical tickets", "Integrates with Zendesk, Freshdesk, Intercom"],
    icon: HeadphonesIcon,
    x: 58,
    y: 10,
    connects: ["customer-service", "marketing"],
  },
  {
    id: "content-agent",
    labelNL: "Content",
    labelEN: "Content",
    descNL: "Genereert on-brand content op basis van sales insights en publiceert via je bestaande kanalen.",
    descEN: "Generates on-brand content from sales insights and publishes through your existing channels.",
    detailNL: ["Schrijft blogs, social posts & e-mails", "Tone-of-voice consistent met je merk", "Koppelt met WordPress, Mailchimp, LinkedIn"],
    detailEN: ["Writes blogs, social posts & emails", "Tone-of-voice consistent with your brand", "Integrates with WordPress, Mailchimp, LinkedIn"],
    icon: Mail,
    x: 25,
    y: 35,
    connects: ["sales", "marketing", "management"],
  },
  {
    id: "order-agent",
    labelNL: "Order Processing",
    labelEN: "Order Processing",
    descNL: "Verwerkt bestellingen end-to-end: van intake tot bevestiging, met real-time voorraadcheck.",
    descEN: "Processes orders end-to-end: from intake to confirmation, with real-time stock checks.",
    detailNL: ["Automatische ordervalidatie & invoer", "Real-time voorraad & levertijdcheck", "Koppelt met Exact, WooCommerce, Shopify"],
    detailEN: ["Automatic order validation & entry", "Real-time stock & delivery time checks", "Integrates with Exact, WooCommerce, Shopify"],
    icon: ShoppingCart,
    x: 42,
    y: 38,
    connects: ["sales", "operations", "customer-service"],
  },
  {
    id: "rapportage-agent",
    labelNL: "Rapportage",
    labelEN: "Reporting",
    descNL: "Verzamelt data uit alle afdelingen en genereert actionable rapporten voor management.",
    descEN: "Collects data from all departments and generates actionable reports for management.",
    detailNL: ["Automatische week- en maandrapporten", "KPI dashboards per afdeling", "Koppelt met Power BI, Google Sheets, Notion"],
    detailEN: ["Automatic weekly & monthly reports", "KPI dashboards per department", "Integrates with Power BI, Google Sheets, Notion"],
    icon: BarChart3,
    x: 60,
    y: 42,
    connects: ["management", "operations", "customer-service"],
  },
  {
    id: "hr-onboarding-agent",
    labelNL: "HR Onboarding",
    labelEN: "HR Onboarding",
    descNL: "Begeleidt nieuwe medewerkers stap-voor-stap en coördineert automatisch met alle betrokken afdelingen.",
    descEN: "Guides new employees step-by-step and automatically coordinates with all involved departments.",
    detailNL: ["Gepersonaliseerd onboardingtraject", "Documenten automatisch verzameld & verstuurd", "Koppelt met BambooHR, Personio, Slack"],
    detailEN: ["Personalized onboarding journey", "Documents automatically collected & sent", "Integrates with BambooHR, Personio, Slack"],
    icon: Users,
    x: 25,
    y: 62,
    connects: ["hr", "operations", "management"],
  },
  {
    id: "kennisbank-agent",
    labelNL: "Kennisbank",
    labelEN: "Knowledge Base",
    descNL: "Maakt al je bedrijfskennis direct doorzoekbaar — van documenten tot Slack-berichten.",
    descEN: "Makes all your company knowledge instantly searchable — from documents to Slack messages.",
    detailNL: ["Doorzoekt 10.000+ documenten in seconden", "Geeft direct onderbouwde antwoorden", "Koppelt met SharePoint, Confluence, Google Drive"],
    detailEN: ["Searches 10,000+ documents in seconds", "Gives instantly sourced answers", "Integrates with SharePoint, Confluence, Google Drive"],
    icon: Brain,
    x: 58,
    y: 65,
    connects: ["hr", "management", "operations", "customer-service"],
  },
];

// ─── SVG Connection Lines (desktop only) ────────────────────────────────────

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

// ─── Department Node (desktop network) ──────────────────────────────────────

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
      <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl border-2 flex items-center justify-center transition-all duration-300 ${
        isHighlighted
          ? "bg-[#4a2c2a] border-[#4a2c2a] shadow-lg shadow-[#4a2c2a]/30 scale-110"
          : "bg-white/80 border-[#4a2c2a]/20"
      }`}>
        <Icon className={`h-5 w-5 lg:h-6 lg:w-6 transition-colors ${isHighlighted ? "text-[#fdf2e9]" : "text-[#4a2c2a]"}`} />
      </div>
      <span className={`text-[10px] lg:text-[11px] font-bold whitespace-nowrap transition-colors ${
        isHighlighted ? "text-[#4a2c2a]" : "text-[#8e6d6b]"
      }`}>
        {language === "nl" ? dept.labelNL : dept.labelEN}
      </span>
    </motion.div>
  );
}

// ─── Agent Node (desktop network) ───────────────────────────────────────────

function AgentNodeDesktop({ agent, isActive, onClick, language, delay }: {
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
      <div
        className="flex flex-col items-center gap-1 animate-float"
        style={{ animationDelay: `${delay * 1000}ms`, animationDuration: `${3 + (delay * 2)}s` }}
      >
        <div className={`relative ${isActive ? "scale-110" : ""} transition-transform`}>
          <div className={`absolute -inset-1.5 rounded-full bg-gradient-to-br from-[#e67e22] to-[#ff7f50] transition-opacity ${
            isActive ? "opacity-40 animate-pulse" : "opacity-0 group-hover:opacity-25"
          }`} />
          <div className={`relative w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
            isActive
              ? "bg-gradient-to-br from-[#e67e22] to-[#ff7f50] shadow-xl shadow-[#e67e22]/40"
              : "bg-gradient-to-br from-[#e67e22] to-[#ff7f50] shadow-md shadow-[#e67e22]/20 group-hover:shadow-lg"
          }`}>
            <Bot className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
          </div>
        </div>
        <span className="text-[11px] lg:text-xs font-bold text-[#4a2c2a] whitespace-nowrap max-w-[100px] lg:max-w-[120px] text-center leading-tight">
          {isNL ? agent.labelNL : agent.labelEN}
        </span>
      </div>
    </motion.div>
  );
}

// ─── Detail Panel ───────────────────────────────────────────────────────────

function DetailPanel({ agent, language, onClose }: {
  agent: AgentNode | null; language: string; onClose: () => void;
}) {
  const isNL = language === "nl";
  const deptMap = Object.fromEntries(DEPARTMENTS.map((d) => [d.id, d]));

  return (
    <AnimatePresence mode="wait">
      {agent ? (
        <motion.div
          key={agent.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.25 }}
          className="bg-white border border-[#4a2c2a]/10 rounded-2xl p-5 shadow-lg"
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
                <div className="flex flex-wrap gap-1 mt-1">
                  {agent.connects.map((deptId) => {
                    const dept = deptMap[deptId];
                    if (!dept) return null;
                    return (
                      <span key={deptId} className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#4a2c2a]/5 text-[#8e6d6b] font-medium">
                        {isNL ? dept.labelNL : dept.labelEN}
                      </span>
                    );
                  })}
                </div>
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
      ) : null}
    </AnimatePresence>
  );
}

// ─── Mobile Agent Card ──────────────────────────────────────────────────────

function MobileAgentCard({ agent, isActive, onClick, language }: {
  agent: AgentNode; isActive: boolean; onClick: () => void; language: string;
}) {
  const isNL = language === "nl";
  const deptMap = Object.fromEntries(DEPARTMENTS.map((d) => [d.id, d]));
  const Icon = agent.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full"
    >
      <button
        onClick={onClick}
        className={`w-full text-left rounded-xl border transition-all duration-200 ${
          isActive
            ? "bg-white border-[#e67e22]/30 shadow-md"
            : "bg-white/60 border-[#4a2c2a]/8 hover:border-[#e67e22]/20"
        }`}
      >
        <div className="flex items-center gap-3 p-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
            isActive
              ? "bg-gradient-to-br from-[#e67e22] to-[#ff7f50] shadow-md shadow-[#e67e22]/30"
              : "bg-gradient-to-br from-[#e67e22]/80 to-[#ff7f50]/80"
          }`}>
            <Bot className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold text-[#4a2c2a] truncate">
              {isNL ? agent.labelNL : agent.labelEN}
            </div>
            <div className="text-xs text-[#8e6d6b] truncate">
              {agent.connects.length} {isNL ? "afdelingen" : "departments"}
            </div>
          </div>
          <ChevronDown className={`h-4 w-4 text-[#8e6d6b] flex-shrink-0 transition-transform duration-200 ${isActive ? "rotate-180" : ""}`} />
        </div>
      </button>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 pt-1">
              <div className="bg-white rounded-xl border border-[#4a2c2a]/5 p-3.5">
                <p className="text-sm text-[#4a2c2a]/70 mb-3 leading-relaxed">
                  {isNL ? agent.descNL : agent.descEN}
                </p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {agent.connects.map((deptId) => {
                    const dept = deptMap[deptId];
                    if (!dept) return null;
                    const DeptIcon = dept.icon;
                    return (
                      <span key={deptId} className="inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded-full bg-[#4a2c2a]/5 text-[#8e6d6b] font-medium">
                        <DeptIcon className="h-3 w-3" />
                        {isNL ? dept.labelNL : dept.labelEN}
                      </span>
                    );
                  })}
                </div>

                <div className="space-y-1.5 mb-3">
                  {(isNL ? agent.detailNL : agent.detailEN).map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#4a2c2a]/80">
                      <Zap className="h-3 w-3 text-[#e67e22] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => scrollToSection("ready-to-start")}
                  className="w-full flex items-center justify-center gap-1.5 min-h-[44px] px-3 py-2.5 rounded-xl bg-[#4a2c2a] text-white text-xs font-medium hover:bg-[#3a1c1a] transition-colors"
                >
                  {isNL ? "Plan afspraak" : "Book a call"}
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
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
  // Desktop: default open, Mobile: all collapsed
  const [activeAgent, setActiveAgent] = useState<string | null>(null);
  const [hasSetDesktopDefault, setHasSetDesktopDefault] = useState(false);

  useEffect(() => {
    if (!hasSetDesktopDefault && typeof window !== "undefined" && window.innerWidth >= 768) {
      setActiveAgent("order-agent");
      setHasSetDesktopDefault(true);
    }
  }, [hasSetDesktopDefault]);
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

        {/* ── Desktop: Network left + Detail panel right ── */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 max-w-6xl mx-auto">
          {/* Network visualization — takes remaining space */}
          <div className="flex-1 min-w-0">
            <div
              ref={containerRef}
              className="relative w-full"
              style={{ height: "clamp(380px, 40vw, 460px)" }}
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
                <AgentNodeDesktop
                  key={agent.id}
                  agent={agent}
                  isActive={activeAgent === agent.id}
                  onClick={() => handleAgentClick(agent.id)}
                  language={language}
                  delay={0.3 + 0.08 * i}
                />
              ))}
            </div>
          </div>

          {/* Detail panel — fixed width on right, vertically centered */}
          <div className="w-[300px] lg:w-[340px] flex-shrink-0">
            <DetailPanel
              agent={activeAgentData}
              language={language}
              onClose={() => setActiveAgent(null)}
            />
          </div>
        </div>

        {/* ── Mobile: Accordion list of agents ── */}
        <div className="md:hidden space-y-2">
          {AGENT_NODES.map((agent) => (
            <MobileAgentCard
              key={agent.id}
              agent={agent}
              isActive={activeAgent === agent.id}
              onClick={() => handleAgentClick(agent.id)}
              language={language}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
