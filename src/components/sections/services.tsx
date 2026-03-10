"use client";

import React, { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n/language-context";
import { useInView } from "react-intersection-observer";
import {
  Bot,
  Cog,
  TrendingUp,
  Rocket,
  Brain,
  Zap,
  Clock,
  Shield,
  Users,
  Phone,
  Mail,
  MessageCircle,
  Calendar,
  FileText,
  Search,
  BarChart3,
  ShoppingCart,
  ClipboardList,
  HeadphonesIcon,
  Star,
  X,
  Calculator,
  Euro,
  Timer,
  ChevronRight,
  Sparkles,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Complexity = "low" | "medium" | "high" | "enterprise";

interface Agent {
  id: string;
  icon: React.ElementType;
  titleNL: string;
  titleEN: string;
  descNL: string;
  descEN: string;
  category: "customer" | "sales" | "operations" | "knowledge";
  complexity: Complexity;
  priceRange: [number, number];
  avgTimeSavedHoursWeek: number;
  avgROIPercent: number;
  gradient: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const AGENTS: Agent[] = [
  // Customer-facing
  {
    id: "klantenservice",
    icon: HeadphonesIcon,
    titleNL: "Klantenservice Agent",
    titleEN: "Customer Service Agent",
    descNL: "Beantwoordt 80% van tickets zelfstandig, escaleert de rest",
    descEN: "Resolves 80% of tickets independently, escalates the rest",
    category: "customer",
    complexity: "medium",
    priceRange: [5000, 10000],
    avgTimeSavedHoursWeek: 30,
    avgROIPercent: 340,
    gradient: "from-orange-500 to-amber-400",
  },
  {
    id: "onboarding-klant",
    icon: Users,
    titleNL: "Onboarding Agent",
    titleEN: "Onboarding Agent",
    descNL: "Begeleidt nieuwe klanten stap-voor-stap door setup",
    descEN: "Guides new customers step-by-step through setup",
    category: "customer",
    complexity: "medium",
    priceRange: [5000, 10000],
    avgTimeSavedHoursWeek: 15,
    avgROIPercent: 280,
    gradient: "from-amber-500 to-orange-400",
  },
  {
    id: "retentie",
    icon: Shield,
    titleNL: "Retentie Agent",
    titleEN: "Retention Agent",
    descNL: "Detecteert churn-signalen en start automatisch win-back flows",
    descEN: "Detects churn signals and automatically starts win-back flows",
    category: "customer",
    complexity: "high",
    priceRange: [10000, 20000],
    avgTimeSavedHoursWeek: 10,
    avgROIPercent: 420,
    gradient: "from-orange-600 to-red-400",
  },
  {
    id: "review",
    icon: Star,
    titleNL: "Review Agent",
    titleEN: "Review Agent",
    descNL: "Verzamelt reviews na aankoop, reageert op negatieve reviews",
    descEN: "Collects reviews after purchase, responds to negative reviews",
    category: "customer",
    complexity: "low",
    priceRange: [2500, 5000],
    avgTimeSavedHoursWeek: 8,
    avgROIPercent: 260,
    gradient: "from-amber-400 to-yellow-400",
  },
  {
    id: "whatsapp-chat",
    icon: MessageCircle,
    titleNL: "WhatsApp/Chat Agent",
    titleEN: "WhatsApp/Chat Agent",
    descNL: "24/7 beschikbaar op alle kanalen, spreekt de taal van je klant",
    descEN: "Available 24/7 on all channels, speaks your customer's language",
    category: "customer",
    complexity: "medium",
    priceRange: [5000, 12000],
    avgTimeSavedHoursWeek: 25,
    avgROIPercent: 380,
    gradient: "from-orange-500 to-amber-500",
  },
  // Sales & Marketing
  {
    id: "lead-qualifying",
    icon: TrendingUp,
    titleNL: "Lead Qualifying Agent",
    titleEN: "Lead Qualifying Agent",
    descNL: "Scoort en kwalificeert inbound leads, plant meetings",
    descEN: "Scores and qualifies inbound leads, schedules meetings",
    category: "sales",
    complexity: "medium",
    priceRange: [5000, 10000],
    avgTimeSavedHoursWeek: 20,
    avgROIPercent: 450,
    gradient: "from-orange-500 to-red-400",
  },
  {
    id: "outbound",
    icon: Rocket,
    titleNL: "Outbound Agent",
    titleEN: "Outbound Agent",
    descNL: "Schrijft en verstuurt gepersonaliseerde outreach op schaal",
    descEN: "Writes and sends personalized outreach at scale",
    category: "sales",
    complexity: "medium",
    priceRange: [5000, 12000],
    avgTimeSavedHoursWeek: 15,
    avgROIPercent: 320,
    gradient: "from-red-400 to-orange-500",
  },
  {
    id: "offerte",
    icon: FileText,
    titleNL: "Offerte Agent",
    titleEN: "Proposal Agent",
    descNL: "Genereert offertes op basis van klantgesprek of intake",
    descEN: "Generates proposals based on client conversations or intake",
    category: "sales",
    complexity: "high",
    priceRange: [8000, 15000],
    avgTimeSavedHoursWeek: 12,
    avgROIPercent: 290,
    gradient: "from-orange-600 to-amber-500",
  },
  {
    id: "follow-up",
    icon: Mail,
    titleNL: "Follow-up Agent",
    titleEN: "Follow-up Agent",
    descNL: "Volgt prospects op via mail/WhatsApp tot ze reageren",
    descEN: "Follows up with prospects via email/WhatsApp until they respond",
    category: "sales",
    complexity: "low",
    priceRange: [2500, 5000],
    avgTimeSavedHoursWeek: 10,
    avgROIPercent: 380,
    gradient: "from-amber-500 to-orange-400",
  },
  {
    id: "content",
    icon: Sparkles,
    titleNL: "Content Agent",
    titleEN: "Content Agent",
    descNL: "Schrijft blog posts, social posts, newsletters vanuit je kennisbank",
    descEN: "Writes blog posts, social posts, newsletters from your knowledge base",
    category: "sales",
    complexity: "medium",
    priceRange: [5000, 10000],
    avgTimeSavedHoursWeek: 12,
    avgROIPercent: 250,
    gradient: "from-orange-400 to-amber-400",
  },
  // Operations & Admin
  {
    id: "order-processing",
    icon: ShoppingCart,
    titleNL: "Order Processing Agent",
    titleEN: "Order Processing Agent",
    descNL: "Verwerkt orders, checkt voorraad, stuurt bevestigingen",
    descEN: "Processes orders, checks stock, sends confirmations",
    category: "operations",
    complexity: "high",
    priceRange: [10000, 20000],
    avgTimeSavedHoursWeek: 25,
    avgROIPercent: 360,
    gradient: "from-orange-500 to-red-500",
  },
  {
    id: "facturatie",
    icon: Euro,
    titleNL: "Facturatie Agent",
    titleEN: "Invoicing Agent",
    descNL: "Maakt facturen, verstuurt herinneringen, matcht betalingen",
    descEN: "Creates invoices, sends reminders, matches payments",
    category: "operations",
    complexity: "medium",
    priceRange: [5000, 10000],
    avgTimeSavedHoursWeek: 15,
    avgROIPercent: 310,
    gradient: "from-amber-500 to-orange-500",
  },
  {
    id: "hr-onboarding",
    icon: ClipboardList,
    titleNL: "HR Onboarding Agent",
    titleEN: "HR Onboarding Agent",
    descNL: "Begeleidt nieuwe medewerkers: documenten, accounts, planning",
    descEN: "Guides new employees: documents, accounts, scheduling",
    category: "operations",
    complexity: "medium",
    priceRange: [5000, 12000],
    avgTimeSavedHoursWeek: 10,
    avgROIPercent: 240,
    gradient: "from-orange-400 to-amber-500",
  },
  {
    id: "meeting-notes",
    icon: Calendar,
    titleNL: "Meeting Notes Agent",
    titleEN: "Meeting Notes Agent",
    descNL: "Vat meetings samen, extraheert actiepunten, stuurt follow-ups",
    descEN: "Summarizes meetings, extracts action items, sends follow-ups",
    category: "operations",
    complexity: "low",
    priceRange: [2500, 5000],
    avgTimeSavedHoursWeek: 8,
    avgROIPercent: 350,
    gradient: "from-amber-400 to-orange-400",
  },
  {
    id: "data-entry",
    icon: Cog,
    titleNL: "Data Entry Agent",
    titleEN: "Data Entry Agent",
    descNL: "Vult systemen in vanuit emails, PDFs, formulieren",
    descEN: "Fills systems from emails, PDFs, forms",
    category: "operations",
    complexity: "medium",
    priceRange: [5000, 10000],
    avgTimeSavedHoursWeek: 20,
    avgROIPercent: 400,
    gradient: "from-orange-500 to-amber-400",
  },
  // Knowledge & Intelligence
  {
    id: "kennisbank",
    icon: Brain,
    titleNL: "Kennisbank Agent",
    titleEN: "Knowledge Base Agent",
    descNL: "Doorzoekt 10.000+ documenten, geeft antwoord met bronnen",
    descEN: "Searches 10,000+ documents, gives answers with sources",
    category: "knowledge",
    complexity: "medium",
    priceRange: [5000, 12000],
    avgTimeSavedHoursWeek: 15,
    avgROIPercent: 320,
    gradient: "from-orange-500 to-amber-500",
  },
  {
    id: "compliance",
    icon: Shield,
    titleNL: "Compliance Agent",
    titleEN: "Compliance Agent",
    descNL: "Checkt documenten tegen regelgeving, signaleert risico's",
    descEN: "Checks documents against regulations, flags risks",
    category: "knowledge",
    complexity: "high",
    priceRange: [10000, 20000],
    avgTimeSavedHoursWeek: 12,
    avgROIPercent: 280,
    gradient: "from-red-400 to-orange-500",
  },
  {
    id: "rapportage",
    icon: BarChart3,
    titleNL: "Rapportage Agent",
    titleEN: "Reporting Agent",
    descNL: "Genereert wekelijkse/maandelijkse rapporten automatisch",
    descEN: "Generates weekly/monthly reports automatically",
    category: "knowledge",
    complexity: "medium",
    priceRange: [5000, 10000],
    avgTimeSavedHoursWeek: 10,
    avgROIPercent: 290,
    gradient: "from-amber-500 to-orange-500",
  },
  {
    id: "marktonderzoek",
    icon: Search,
    titleNL: "Marktonderzoek Agent",
    titleEN: "Market Research Agent",
    descNL: "Monitort concurrenten, prijzen, trends en geeft alerts",
    descEN: "Monitors competitors, prices, trends and gives alerts",
    category: "knowledge",
    complexity: "high",
    priceRange: [8000, 15000],
    avgTimeSavedHoursWeek: 8,
    avgROIPercent: 260,
    gradient: "from-orange-600 to-red-400",
  },
  {
    id: "kwaliteitscontrole",
    icon: Zap,
    titleNL: "Kwaliteitscontrole Agent",
    titleEN: "Quality Control Agent",
    descNL: "Reviewt output van andere agents en medewerkers",
    descEN: "Reviews output from other agents and employees",
    category: "knowledge",
    complexity: "high",
    priceRange: [10000, 18000],
    avgTimeSavedHoursWeek: 10,
    avgROIPercent: 300,
    gradient: "from-orange-500 to-red-500",
  },
];

const CATEGORIES = [
  { id: "all" as const, labelNL: "Alle Agents", labelEN: "All Agents" },
  { id: "customer" as const, labelNL: "Klantenservice", labelEN: "Customer Service" },
  { id: "sales" as const, labelNL: "Sales & Marketing", labelEN: "Sales & Marketing" },
  { id: "operations" as const, labelNL: "Operations", labelEN: "Operations" },
  { id: "knowledge" as const, labelNL: "Kennisbank", labelEN: "Knowledge" },
];

const COMPLEXITY_META: Record<Complexity, { labelNL: string; labelEN: string; color: string; multiplier: number }> = {
  low: { labelNL: "Eenvoudig", labelEN: "Simple", color: "bg-green-500", multiplier: 0.7 },
  medium: { labelNL: "Gemiddeld", labelEN: "Medium", color: "bg-amber-500", multiplier: 1.0 },
  high: { labelNL: "Complex", labelEN: "Complex", color: "bg-orange-500", multiplier: 1.4 },
  enterprise: { labelNL: "Enterprise", labelEN: "Enterprise", color: "bg-red-500", multiplier: 2.0 },
};

// ─── ROI Calculator Modal ────────────────────────────────────────────────────

function ROICalculator({
  agent,
  isOpen,
  onClose,
  language,
}: {
  agent: Agent;
  isOpen: boolean;
  onClose: () => void;
  language: string;
}) {
  const isNL = language === "nl";
  const [hoursPerWeek, setHoursPerWeek] = useState(agent.avgTimeSavedHoursWeek);
  const [hourlyRate, setHourlyRate] = useState(35);
  const [complexity, setComplexity] = useState<Complexity>(agent.complexity);

  const meta = COMPLEXITY_META[complexity];

  // Price calculation based on complexity
  const basePrice = (agent.priceRange[0] + agent.priceRange[1]) / 2;
  const adjustedPrice = Math.round(basePrice * meta.multiplier / 100) * 100;
  const monthlyMaintenance = Math.round(adjustedPrice * 0.1 / 10) * 10; // ~10% annual = monthly

  // ROI calculation
  const weeklySaving = hoursPerWeek * hourlyRate;
  const monthlySaving = weeklySaving * 4.33;
  const annualSaving = weeklySaving * 52;
  const paybackWeeks = adjustedPrice / weeklySaving;
  const yearOneROI = ((annualSaving - adjustedPrice - monthlyMaintenance * 12) / adjustedPrice) * 100;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[#fdf2e9] border border-[#e67e22]/20 rounded-3xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-[#fdf2e9] border-b border-[#e67e22]/10 px-6 py-5 flex items-center justify-between rounded-t-3xl">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${agent.gradient} flex items-center justify-center`}>
                    <agent.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#4a2c2a]">
                      {isNL ? agent.titleNL : agent.titleEN}
                    </h3>
                    <p className="text-xs text-[#8e6d6b]">
                      ROI Calculator
                    </p>
                  </div>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-[#e67e22]/10 rounded-xl transition-colors">
                  <X className="h-5 w-5 text-[#4a2c2a]" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Input: Hours per week */}
                <div>
                  <label className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-[#4a2c2a] flex items-center gap-2">
                      <Timer className="h-4 w-4 text-[#e67e22]" />
                      {isNL ? "Uren per week op deze taak" : "Hours per week on this task"}
                    </span>
                    <span className="text-lg font-black text-[#e67e22]">{hoursPerWeek}h</span>
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={60}
                    value={hoursPerWeek}
                    onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer accent-[#e67e22] bg-[#e67e22]/20"
                  />
                  <div className="flex justify-between text-[10px] text-[#8e6d6b] mt-1">
                    <span>1h</span>
                    <span>60h</span>
                  </div>
                </div>

                {/* Input: Hourly rate */}
                <div>
                  <label className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-[#4a2c2a] flex items-center gap-2">
                      <Euro className="h-4 w-4 text-[#e67e22]" />
                      {isNL ? "Uurtarief nu betaald voor deze taak" : "Hourly rate currently paid"}
                    </span>
                    <span className="text-lg font-black text-[#e67e22]">&euro;{hourlyRate}</span>
                  </label>
                  <input
                    type="range"
                    min={15}
                    max={150}
                    step={5}
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer accent-[#e67e22] bg-[#e67e22]/20"
                  />
                  <div className="flex justify-between text-[10px] text-[#8e6d6b] mt-1">
                    <span>&euro;15</span>
                    <span>&euro;150</span>
                  </div>
                </div>

                {/* Complexity selector */}
                <div>
                  <span className="text-sm font-semibold text-[#4a2c2a] flex items-center gap-2 mb-3">
                    <Cog className="h-4 w-4 text-[#e67e22]" />
                    {isNL ? "Verwachte complexiteit" : "Expected complexity"}
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    {(Object.entries(COMPLEXITY_META) as [Complexity, typeof COMPLEXITY_META["low"]][]).map(([key, val]) => (
                      <button
                        key={key}
                        onClick={() => setComplexity(key)}
                        className={`px-3 py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                          complexity === key
                            ? "bg-[#e67e22] text-white border-[#e67e22] shadow-lg shadow-[#e67e22]/30"
                            : "bg-white/60 text-[#4a2c2a] border-[#e67e22]/15 hover:border-[#e67e22]/40"
                        }`}
                      >
                        {isNL ? val.labelNL : val.labelEN}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-[#e67e22]/30 to-transparent" />

                {/* Results */}
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-[#4a2c2a] flex items-center gap-2">
                    <Calculator className="h-4 w-4 text-[#e67e22]" />
                    {isNL ? "Jouw berekening" : "Your calculation"}
                  </h4>

                  {/* Price card */}
                  <div className="bg-gradient-to-br from-[#e67e22] to-[#ff7f50] rounded-2xl p-5 text-white">
                    <div className="text-xs font-medium opacity-80 mb-1">
                      {isNL ? "Eenmalige investering" : "One-time investment"}
                    </div>
                    <div className="text-3xl font-black">
                      &euro;{adjustedPrice.toLocaleString("nl-NL")}
                    </div>
                    <div className="text-xs opacity-70 mt-1">
                      + &euro;{monthlyMaintenance}/mo {isNL ? "onderhoud" : "maintenance"}
                    </div>
                  </div>

                  {/* Savings grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/70 rounded-xl p-4 border border-[#e67e22]/10">
                      <div className="text-[10px] uppercase tracking-wider text-[#8e6d6b] font-semibold mb-1">
                        {isNL ? "Besparing / maand" : "Saving / month"}
                      </div>
                      <div className="text-xl font-black text-[#4a2c2a]">
                        &euro;{Math.round(monthlySaving).toLocaleString("nl-NL")}
                      </div>
                    </div>
                    <div className="bg-white/70 rounded-xl p-4 border border-[#e67e22]/10">
                      <div className="text-[10px] uppercase tracking-wider text-[#8e6d6b] font-semibold mb-1">
                        {isNL ? "Besparing / jaar" : "Saving / year"}
                      </div>
                      <div className="text-xl font-black text-[#4a2c2a]">
                        &euro;{Math.round(annualSaving).toLocaleString("nl-NL")}
                      </div>
                    </div>
                    <div className="bg-white/70 rounded-xl p-4 border border-[#e67e22]/10">
                      <div className="text-[10px] uppercase tracking-wider text-[#8e6d6b] font-semibold mb-1">
                        {isNL ? "Terugverdientijd" : "Payback period"}
                      </div>
                      <div className="text-xl font-black text-[#4a2c2a]">
                        {paybackWeeks < 1 ? "<1" : Math.ceil(paybackWeeks)} {isNL ? "weken" : "weeks"}
                      </div>
                    </div>
                    <div className="bg-white/70 rounded-xl p-4 border border-[#e67e22]/10">
                      <div className="text-[10px] uppercase tracking-wider text-[#8e6d6b] font-semibold mb-1">
                        ROI {isNL ? "jaar 1" : "year 1"}
                      </div>
                      <div className={`text-xl font-black ${yearOneROI > 0 ? "text-green-600" : "text-red-500"}`}>
                        {yearOneROI > 0 ? "+" : ""}{Math.round(yearOneROI)}%
                      </div>
                    </div>
                  </div>

                  {/* Visual bar */}
                  <div className="bg-white/70 rounded-xl p-4 border border-[#e67e22]/10">
                    <div className="flex items-center justify-between text-xs text-[#8e6d6b] mb-2">
                      <span>{isNL ? "Investering vs besparing jaar 1" : "Investment vs saving year 1"}</span>
                    </div>
                    <div className="relative h-6 rounded-full bg-[#e67e22]/10 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((annualSaving / (annualSaving + adjustedPrice)) * 100, 100)}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#e67e22] to-[#ff7f50]"
                      />
                      <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-[#4a2c2a]">
                        &euro;{Math.round(annualSaving).toLocaleString("nl-NL")} {isNL ? "bespaard" : "saved"} vs &euro;{adjustedPrice.toLocaleString("nl-NL")} {isNL ? "investering" : "investment"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <a
                  href="https://wa.me/31640446732"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-[#4a2c2a] hover:bg-[#3a1c1a] text-[#fdf2e9] font-bold py-4 rounded-2xl transition-all hover:shadow-xl hover:shadow-[#4a2c2a]/20"
                >
                  {isNL
                    ? `Gratis intake voor ${agent.titleNL}`
                    : `Free intake for ${agent.titleEN}`}
                  <ChevronRight className="inline h-4 w-4 ml-1" />
                </a>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Agent Card ──────────────────────────────────────────────────────────────

function AgentCard({ agent, language, index }: { agent: Agent; language: string; index: number }) {
  const [showCalc, setShowCalc] = useState(false);
  const isNL = language === "nl";
  const meta = COMPLEXITY_META[agent.complexity];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.04 }}
        onClick={() => setShowCalc(true)}
        className="group relative bg-white/60 hover:bg-white/90 backdrop-blur-sm border border-[#e67e22]/10 hover:border-[#e67e22]/30 rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-[#e67e22]/10 hover:-translate-y-1"
      >
        {/* Top row: icon + complexity badge */}
        <div className="flex items-start justify-between mb-3">
          <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${agent.gradient} flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform`}>
            <agent.icon className="h-5 w-5 text-white" />
          </div>
          <span className={`${meta.color} text-white text-[10px] font-bold px-2.5 py-1 rounded-full`}>
            {isNL ? meta.labelNL : meta.labelEN}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-[15px] font-bold text-[#4a2c2a] mb-1.5 group-hover:text-[#e67e22] transition-colors">
          {isNL ? agent.titleNL : agent.titleEN}
        </h3>

        {/* Description */}
        <p className="text-xs text-[#8e6d6b] leading-relaxed mb-4">
          {isNL ? agent.descNL : agent.descEN}
        </p>

        {/* Stats row */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1 text-[11px] text-[#4a2c2a]">
            <Clock className="h-3.5 w-3.5 text-[#e67e22]" />
            <span className="font-semibold">-{agent.avgTimeSavedHoursWeek}h</span>
            <span className="text-[#8e6d6b]">/wk</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-[#4a2c2a]">
            <TrendingUp className="h-3.5 w-3.5 text-green-500" />
            <span className="font-semibold text-green-600">+{agent.avgROIPercent}%</span>
            <span className="text-[#8e6d6b]">ROI</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="text-sm font-black text-[#4a2c2a]">
            &euro;{agent.priceRange[0].toLocaleString("nl-NL")} – {agent.priceRange[1].toLocaleString("nl-NL")}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-[#e67e22] opacity-0 group-hover:opacity-100 transition-opacity">
            <Calculator className="h-3.5 w-3.5" />
            {isNL ? "Bereken ROI" : "Calculate ROI"}
          </div>
        </div>
      </motion.div>

      <ROICalculator
        agent={agent}
        isOpen={showCalc}
        onClose={() => setShowCalc(false)}
        language={language}
      />
    </>
  );
}

// ─── Main Section ────────────────────────────────────────────────────────────

export default function Services() {
  const { language } = useLanguage();
  const isNL = language === "nl";
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const filtered = useMemo(
    () => activeCategory === "all" ? AGENTS : AGENTS.filter((a) => a.category === activeCategory),
    [activeCategory]
  );

  return (
    <section className="py-16 sm:py-24 bg-[#fdf2e9]" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-[#e67e22] mb-3">
              {isNL ? "20 agent types" : "20 agent types"}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#4a2c2a] mb-4">
              {isNL ? (
                <>Digitale medewerkers die <span className="text-[#e67e22]">presteren</span></>
              ) : (
                <>Digital employees that <span className="text-[#e67e22]">perform</span></>
              )}
            </h2>
            <p className="text-base sm:text-lg text-[#8e6d6b] max-w-2xl mx-auto">
              {isNL
                ? "Klik op een agent om je ROI te berekenen. Prijs gebaseerd op complexiteit."
                : "Click any agent to calculate your ROI. Price based on complexity."}
            </p>
          </motion.div>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeCategory === cat.id
                  ? "bg-[#e67e22] text-white shadow-lg shadow-[#e67e22]/30"
                  : "bg-white/60 text-[#4a2c2a] border border-[#e67e22]/15 hover:border-[#e67e22]/40 hover:bg-white/80"
              }`}
            >
              {isNL ? cat.labelNL : cat.labelEN}
            </button>
          ))}
        </div>

        {/* Agent grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((agent, i) => (
              <AgentCard key={agent.id} agent={agent} language={language} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs text-[#8e6d6b] mt-8"
        >
          {isNL
            ? "Prijzen zijn indicatief. Exacte prijs na gratis intake gesprek op basis van jouw situatie."
            : "Prices are indicative. Exact price after free intake call based on your situation."}
        </motion.p>
      </div>
    </section>
  );
}
