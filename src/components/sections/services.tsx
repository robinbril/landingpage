"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n/language-context";
import { useInView } from "react-intersection-observer";
import {
  X,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Complexity = "low" | "medium" | "high" | "enterprise";

interface Agent {
  id: string;
  titleNL: string;
  titleEN: string;
  descNL: string;
  descEN: string;
  complexity: Complexity;
  priceRange: [number, number];
  avgTimeSavedHoursWeek: number;
  avgROIPercent: number;
  toolsNL: string;
  toolsEN: string;
}

interface Category {
  id: string;
  titleNL: string;
  titleEN: string;
  subtitleNL: string;
  subtitleEN: string;
  agents: Agent[];
}

// ─── Data ────────────────────────────────────────────────────────────────────

const CATEGORIES: Category[] = [
  {
    id: "customer",
    titleNL: "Klantenservice",
    titleEN: "Customer Service",
    subtitleNL: "Tickets, onboarding, reviews, chat",
    subtitleEN: "Tickets, onboarding, reviews, chat",
    agents: [
      { id: "klantenservice", titleNL: "Klantenservice Agent", titleEN: "Customer Service Agent", descNL: "Beantwoordt 80% van tickets zelfstandig, escaleert de rest", descEN: "Resolves 80% of tickets independently, escalates the rest", complexity: "medium", priceRange: [5000, 10000], avgTimeSavedHoursWeek: 30, avgROIPercent: 340, toolsNL: "Zendesk, Intercom, WhatsApp Business API, Slack", toolsEN: "Zendesk, Intercom, WhatsApp Business API, Slack" },
      { id: "onboarding-klant", titleNL: "Onboarding Agent", titleEN: "Onboarding Agent", descNL: "Begeleidt nieuwe klanten stap-voor-stap door setup", descEN: "Guides new customers step-by-step through setup", complexity: "medium", priceRange: [5000, 10000], avgTimeSavedHoursWeek: 15, avgROIPercent: 280, toolsNL: "HubSpot, Intercom, Calendly, Notion", toolsEN: "HubSpot, Intercom, Calendly, Notion" },
      { id: "whatsapp-chat", titleNL: "WhatsApp/Chat Agent", titleEN: "WhatsApp/Chat Agent", descNL: "24/7 beschikbaar op alle kanalen", descEN: "Available 24/7 on all channels", complexity: "medium", priceRange: [5000, 12000], avgTimeSavedHoursWeek: 25, avgROIPercent: 380, toolsNL: "WhatsApp Business API, Twilio, Zendesk", toolsEN: "WhatsApp Business API, Twilio, Zendesk" },
      { id: "retentie", titleNL: "Retentie Agent", titleEN: "Retention Agent", descNL: "Detecteert churn-signalen en start win-back flows", descEN: "Detects churn signals and starts win-back flows", complexity: "high", priceRange: [10000, 20000], avgTimeSavedHoursWeek: 10, avgROIPercent: 420, toolsNL: "HubSpot, ActiveCampaign, Mixpanel", toolsEN: "HubSpot, ActiveCampaign, Mixpanel" },
      { id: "review", titleNL: "Review Agent", titleEN: "Review Agent", descNL: "Verzamelt reviews, reageert op negatieve reviews", descEN: "Collects reviews, responds to negative reviews", complexity: "low", priceRange: [2500, 5000], avgTimeSavedHoursWeek: 8, avgROIPercent: 260, toolsNL: "Google Business, Trustpilot, Slack", toolsEN: "Google Business, Trustpilot, Slack" },
    ],
  },
  {
    id: "sales",
    titleNL: "Sales & Marketing",
    titleEN: "Sales & Marketing",
    subtitleNL: "Leads, outreach, offertes, content",
    subtitleEN: "Leads, outreach, proposals, content",
    agents: [
      { id: "lead-qualifying", titleNL: "Lead Qualifying Agent", titleEN: "Lead Qualifying Agent", descNL: "Scoort en kwalificeert inbound leads, plant meetings", descEN: "Scores and qualifies inbound leads, schedules meetings", complexity: "medium", priceRange: [5000, 10000], avgTimeSavedHoursWeek: 20, avgROIPercent: 450, toolsNL: "HubSpot, Salesforce, LinkedIn API, Calendly", toolsEN: "HubSpot, Salesforce, LinkedIn API, Calendly" },
      { id: "outbound", titleNL: "Outbound Agent", titleEN: "Outbound Agent", descNL: "Gepersonaliseerde outreach op schaal", descEN: "Personalized outreach at scale", complexity: "medium", priceRange: [5000, 12000], avgTimeSavedHoursWeek: 15, avgROIPercent: 320, toolsNL: "Apollo.io, LinkedIn API, Gmail API, HubSpot", toolsEN: "Apollo.io, LinkedIn API, Gmail API, HubSpot" },
      { id: "offerte", titleNL: "Offerte Agent", titleEN: "Proposal Agent", descNL: "Genereert offertes op basis van klantgesprek", descEN: "Generates proposals based on client conversations", complexity: "high", priceRange: [8000, 15000], avgTimeSavedHoursWeek: 12, avgROIPercent: 290, toolsNL: "Google Docs API, HubSpot, PandaDoc", toolsEN: "Google Docs API, HubSpot, PandaDoc" },
      { id: "follow-up", titleNL: "Follow-up Agent", titleEN: "Follow-up Agent", descNL: "Volgt prospects op tot ze reageren", descEN: "Follows up with prospects until they respond", complexity: "low", priceRange: [2500, 5000], avgTimeSavedHoursWeek: 10, avgROIPercent: 380, toolsNL: "HubSpot, Gmail API, Calendly", toolsEN: "HubSpot, Gmail API, Calendly" },
      { id: "content", titleNL: "Content Agent", titleEN: "Content Agent", descNL: "Blog posts, social, newsletters vanuit je kennisbank", descEN: "Blog posts, social, newsletters from your knowledge base", complexity: "medium", priceRange: [5000, 10000], avgTimeSavedHoursWeek: 12, avgROIPercent: 250, toolsNL: "OpenAI API, WordPress, LinkedIn API, Mailchimp", toolsEN: "OpenAI API, WordPress, LinkedIn API, Mailchimp" },
    ],
  },
  {
    id: "operations",
    titleNL: "Operations",
    titleEN: "Operations",
    subtitleNL: "Orders, facturen, HR, meetings, data",
    subtitleEN: "Orders, invoices, HR, meetings, data",
    agents: [
      { id: "order-processing", titleNL: "Order Processing Agent", titleEN: "Order Processing Agent", descNL: "Verwerkt orders, checkt voorraad, stuurt bevestigingen", descEN: "Processes orders, checks stock, sends confirmations", complexity: "high", priceRange: [10000, 20000], avgTimeSavedHoursWeek: 25, avgROIPercent: 360, toolsNL: "Shopify API, Exact Online, Picqer, Sendcloud", toolsEN: "Shopify API, Exact Online, Picqer, Sendcloud" },
      { id: "facturatie", titleNL: "Facturatie Agent", titleEN: "Invoicing Agent", descNL: "Facturen, herinneringen, betalingen matchen", descEN: "Invoices, reminders, payment matching", complexity: "medium", priceRange: [5000, 10000], avgTimeSavedHoursWeek: 15, avgROIPercent: 310, toolsNL: "Exact Online, Mollie, Twinfield, Moneybird", toolsEN: "Exact Online, Mollie, Twinfield, Moneybird" },
      { id: "hr-onboarding", titleNL: "HR Onboarding Agent", titleEN: "HR Onboarding Agent", descNL: "Begeleidt nieuwe medewerkers door documenten en accounts", descEN: "Guides new employees through documents and accounts", complexity: "medium", priceRange: [5000, 12000], avgTimeSavedHoursWeek: 10, avgROIPercent: 240, toolsNL: "Personio, Notion, Slack, Google Workspace", toolsEN: "Personio, Notion, Slack, Google Workspace" },
      { id: "meeting-notes", titleNL: "Meeting Notes Agent", titleEN: "Meeting Notes Agent", descNL: "Samenvattingen, actiepunten, follow-ups", descEN: "Summaries, action items, follow-ups", complexity: "low", priceRange: [2500, 5000], avgTimeSavedHoursWeek: 8, avgROIPercent: 350, toolsNL: "Microsoft Teams API, Google Meet, Notion, Slack", toolsEN: "Microsoft Teams API, Google Meet, Notion, Slack" },
      { id: "data-entry", titleNL: "Data Entry Agent", titleEN: "Data Entry Agent", descNL: "Vult systemen in vanuit emails, PDFs, formulieren", descEN: "Fills systems from emails, PDFs, forms", complexity: "medium", priceRange: [5000, 10000], avgTimeSavedHoursWeek: 20, avgROIPercent: 400, toolsNL: "Google Sheets, Airtable, Make (Integromat), Zapier", toolsEN: "Google Sheets, Airtable, Make (Integromat), Zapier" },
    ],
  },
  {
    id: "knowledge",
    titleNL: "Kennisbank & Intelligence",
    titleEN: "Knowledge & Intelligence",
    subtitleNL: "Zoeken, compliance, rapportage, research",
    subtitleEN: "Search, compliance, reporting, research",
    agents: [
      { id: "kennisbank", titleNL: "Kennisbank Agent", titleEN: "Knowledge Base Agent", descNL: "Doorzoekt 10.000+ documenten, geeft antwoord met bronnen", descEN: "Searches 10,000+ documents, gives answers with sources", complexity: "medium", priceRange: [5000, 12000], avgTimeSavedHoursWeek: 15, avgROIPercent: 320, toolsNL: "Pinecone, OpenAI API, SharePoint, Notion", toolsEN: "Pinecone, OpenAI API, SharePoint, Notion" },
      { id: "compliance", titleNL: "Compliance Agent", titleEN: "Compliance Agent", descNL: "Checkt documenten tegen regelgeving, signaleert risico's", descEN: "Checks documents against regulations, flags risks", complexity: "high", priceRange: [10000, 20000], avgTimeSavedHoursWeek: 12, avgROIPercent: 280, toolsNL: "SharePoint, OpenAI API, Power Automate", toolsEN: "SharePoint, OpenAI API, Power Automate" },
      { id: "rapportage", titleNL: "Rapportage Agent", titleEN: "Reporting Agent", descNL: "Genereert wekelijkse en maandelijkse rapporten", descEN: "Generates weekly and monthly reports", complexity: "medium", priceRange: [5000, 10000], avgTimeSavedHoursWeek: 10, avgROIPercent: 290, toolsNL: "Power BI, Google Sheets, Slack, BigQuery", toolsEN: "Power BI, Google Sheets, Slack, BigQuery" },
      { id: "marktonderzoek", titleNL: "Marktonderzoek Agent", titleEN: "Market Research Agent", descNL: "Monitort concurrenten, prijzen, trends", descEN: "Monitors competitors, prices, trends", complexity: "high", priceRange: [8000, 15000], avgTimeSavedHoursWeek: 8, avgROIPercent: 260, toolsNL: "Web Scraping API, OpenAI API, Google Sheets", toolsEN: "Web Scraping API, OpenAI API, Google Sheets" },
      { id: "kwaliteitscontrole", titleNL: "Kwaliteitscontrole Agent", titleEN: "Quality Control Agent", descNL: "Reviewt output van andere agents en medewerkers", descEN: "Reviews output from other agents and employees", complexity: "high", priceRange: [10000, 18000], avgTimeSavedHoursWeek: 10, avgROIPercent: 300, toolsNL: "OpenAI API, Jira, Slack, GitHub API", toolsEN: "OpenAI API, Jira, Slack, GitHub API" },
    ],
  },
];

// ─── ROI Scanner Modal ───────────────────────────────────────────────────────

function ROIScanner({
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
  const [ftes, setFtes] = useState(2);
  const [hoursPerWeek, setHoursPerWeek] = useState(agent.avgTimeSavedHoursWeek);
  const [hourlyRate, setHourlyRate] = useState(45);

  // Investment is deliberately low so gauge jumps to lucrative fast
  const basePrice = (agent.priceRange[0] + agent.priceRange[1]) / 2;
  const totalHoursWeek = ftes * hoursPerWeek;
  const weeklySaving = totalHoursWeek * hourlyRate;
  const annualSaving = weeklySaving * 52;
  const paybackWeeks = weeklySaving > 0 ? basePrice / weeklySaving : 999;

  // Gauge: 0-100 scale. Lucrative threshold at ~25%. Anything above 12 weeks payback = 0, below 2 weeks = 100
  const gaugeValue = Math.min(100, Math.max(0, ((12 - paybackWeeks) / 10) * 100));
  const isLucrative = paybackWeeks <= 8;
  const isVeryLucrative = paybackWeeks <= 3;

  const gaugeColor = isVeryLucrative
    ? "#22c55e"
    : isLucrative
    ? "#84cc16"
    : paybackWeeks <= 12
    ? "#eab308"
    : "#ef4444";

  // Format payback time in human-readable form
  const formatPayback = (weeks: number): string => {
    if (weeks < 1) return isNL ? "Terugverdientijd: <1 week" : "Payback: <1 week";
    if (weeks <= 4) return isNL ? `Terugverdientijd: ${Math.ceil(weeks)} weken` : `Payback: ${Math.ceil(weeks)} weeks`;
    if (weeks <= 52) {
      const months = Math.ceil(weeks / 4.33);
      return isNL ? `Terugverdientijd: ${months} maand${months > 1 ? "en" : ""}` : `Payback: ${months} month${months > 1 ? "s" : ""}`;
    }
    const years = (weeks / 52).toFixed(1);
    return isNL ? `Terugverdientijd: ${years} jaar` : `Payback: ${years} year${Number(years) > 1 ? "s" : ""}`;
  };

  const gaugeLabel = isVeryLucrative
    ? (isNL ? "Zeer lucratief" : "Very lucrative")
    : isLucrative
    ? (isNL ? "Lucratief" : "Lucrative")
    : paybackWeeks <= 12
    ? formatPayback(paybackWeeks)
    : formatPayback(paybackWeeks);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white border border-[#4a2c2a]/10 rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-[#4a2c2a]/5 px-6 py-5 flex items-center justify-between rounded-t-3xl">
                <div>
                  <h3 className="text-lg font-bold text-[#4a2c2a]">
                    {isNL ? agent.titleNL : agent.titleEN}
                  </h3>
                  <p className="text-xs text-[#8e6d6b]">{isNL ? "Lucratief Scanner" : "ROI Scanner"}</p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-[#fdf2e9] rounded-xl transition-colors">
                  <X className="h-5 w-5 text-[#4a2c2a]" />
                </button>
              </div>

              <div className="p-6 space-y-5">
                {/* Gauge */}
                <div className="text-center py-4">
                  <div className="relative w-full h-6 bg-gradient-to-r from-red-200 via-yellow-200 to-green-200 rounded-full overflow-hidden mb-3">
                    <motion.div
                      className="absolute top-0 bottom-0 left-0"
                      style={{ backgroundColor: gaugeColor, borderRadius: "9999px 0 0 9999px" }}
                      initial={{ width: "0%" }}
                      animate={{ width: `${gaugeValue}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                    <motion.div
                      className="absolute top-[-4px] w-3 h-8 bg-white border-2 rounded-sm shadow-md"
                      style={{ borderColor: gaugeColor }}
                      initial={{ left: "0%" }}
                      animate={{ left: `${Math.min(gaugeValue, 97)}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-[#8e6d6b] px-1">
                    <span>{isNL ? "Lange terugverdientijd" : "Long payback"}</span>
                    <span>{isNL ? "Zeer lucratief" : "Very lucrative"}</span>
                  </div>
                  <motion.div
                    key={gaugeLabel}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-3"
                  >
                    <span
                      className="inline-block px-4 py-1.5 rounded-full text-sm font-bold text-white"
                      style={{ backgroundColor: gaugeColor }}
                    >
                      {gaugeLabel}
                    </span>
                  </motion.div>
                </div>

                {/* Inputs */}
                <div>
                  <label className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-[#4a2c2a]">
                      {isNL ? "Uurtarief medewerker" : "Employee hourly rate"}
                    </span>
                    <span className="text-lg font-black text-[#e67e22]">&euro;{hourlyRate}</span>
                  </label>
                  <input type="range" min={15} max={150} step={5} value={hourlyRate} onChange={(e) => setHourlyRate(Number(e.target.value))} className="w-full h-2 rounded-full appearance-none cursor-pointer accent-[#e67e22] bg-[#e67e22]/15" />
                </div>

                <div>
                  <label className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-[#4a2c2a]">
                      {isNL ? "Aantal FTE's op deze taak" : "FTEs on this task"}
                    </span>
                    <span className="text-lg font-black text-[#e67e22]">{ftes}</span>
                  </label>
                  <input type="range" min={1} max={10} value={ftes} onChange={(e) => setFtes(Number(e.target.value))} className="w-full h-2 rounded-full appearance-none cursor-pointer accent-[#e67e22] bg-[#e67e22]/15" />
                </div>

                <div>
                  <label className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-[#4a2c2a]">
                      {isNL ? "Uren per week per FTE" : "Hours per week per FTE"}
                    </span>
                    <span className="text-lg font-black text-[#e67e22]">{hoursPerWeek}h</span>
                  </label>
                  <input type="range" min={1} max={40} value={hoursPerWeek} onChange={(e) => setHoursPerWeek(Number(e.target.value))} className="w-full h-2 rounded-full appearance-none cursor-pointer accent-[#e67e22] bg-[#e67e22]/15" />
                </div>

                <div className="h-px bg-[#4a2c2a]/8" />

                {/* Results - compact */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-[#fdf2e9] rounded-xl p-3 text-center">
                    <div className="text-[9px] uppercase tracking-wider text-[#8e6d6b] font-semibold mb-0.5">{isNL ? "Investering" : "Investment"}</div>
                    <div className="text-base font-black text-[#4a2c2a]">&euro;{basePrice.toLocaleString("nl-NL")}</div>
                  </div>
                  <div className="bg-[#fdf2e9] rounded-xl p-3 text-center">
                    <div className="text-[9px] uppercase tracking-wider text-[#8e6d6b] font-semibold mb-0.5">{isNL ? "Besparing/mnd" : "Saving/mo"}</div>
                    <div className="text-base font-black text-[#4a2c2a]">&euro;{Math.round(weeklySaving * 4.33).toLocaleString("nl-NL")}</div>
                  </div>
                  <div className="bg-[#fdf2e9] rounded-xl p-3 text-center">
                    <div className="text-[9px] uppercase tracking-wider text-[#8e6d6b] font-semibold mb-0.5">{isNL ? "Terugverdientijd" : "Payback"}</div>
                    <div className="text-base font-black text-[#4a2c2a]">{paybackWeeks < 1 ? "<1" : Math.ceil(paybackWeeks)} wk</div>
                  </div>
                </div>

                <a
                  href="https://wa.me/31640446732"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-[#4a2c2a] hover:bg-[#3a1c1a] text-[#fdf2e9] font-bold py-4 rounded-2xl transition-colors"
                >
                  {isNL ? "Gratis intake aanvragen" : "Request free intake"}
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

// ─── Category Card ───────────────────────────────────────────────────────────

function CategoryCard({
  category,
  language,
  index,
}: {
  category: Category;
  language: string;
  index: number;
}) {
  const isNL = language === "nl";
  const [expanded, setExpanded] = useState(false);
  const [calcAgent, setCalcAgent] = useState<Agent | null>(null);

  const visibleAgents = expanded ? category.agents : category.agents.slice(0, 3);
  const hasMore = category.agents.length > 3;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="bg-white rounded-2xl border border-[#4a2c2a]/6 shadow-sm hover:shadow-md transition-shadow"
      >
        {/* Category header */}
        <div className="px-6 pt-6 pb-4">
          <h3 className="text-lg font-bold text-[#4a2c2a]">
            {isNL ? category.titleNL : category.titleEN}
          </h3>
          <p className="text-sm text-[#8e6d6b] mt-0.5">
            {isNL ? category.subtitleNL : category.subtitleEN}
          </p>
        </div>

        {/* Agent list */}
        <div className="px-6 pb-2">
          {visibleAgents.map((agent) => (
            <button
              key={agent.id}
              onClick={() => setCalcAgent(agent)}
              className="w-full text-left group flex items-center justify-between py-3 border-t border-[#4a2c2a]/5 first:border-t-0 hover:bg-[#fdf2e9]/60 -mx-2 px-2 rounded-lg transition-colors"
            >
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold text-[#4a2c2a] group-hover:text-[#e67e22] transition-colors">
                  {isNL ? agent.titleNL : agent.titleEN}
                </div>
                <div className="text-xs text-[#8e6d6b] truncate">
                  {isNL ? agent.descNL : agent.descEN}
                </div>
                <div className="text-[10px] text-[#e67e22]/70 truncate mt-0.5">
                  {isNL ? agent.toolsNL : agent.toolsEN}
                </div>
              </div>
              <div className="flex-shrink-0 ml-3 flex items-center gap-2">
                <span className="text-xs font-semibold text-[#4a2c2a]/60">
                  &euro;{agent.priceRange[0].toLocaleString("nl-NL")}+
                </span>
                <ChevronRight className="h-3.5 w-3.5 text-[#8e6d6b] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          ))}
        </div>

        {/* Show more */}
        {hasMore && (
          <div className="px-6 pb-5">
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 text-xs font-semibold text-[#e67e22] hover:text-[#d35400] transition-colors"
            >
              {expanded
                ? (isNL ? "Minder tonen" : "Show less")
                : (isNL ? `+${category.agents.length - 3} meer` : `+${category.agents.length - 3} more`)}
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${expanded ? "rotate-180" : ""}`} />
            </button>
          </div>
        )}
      </motion.div>

      {calcAgent && (
        <ROIScanner
          agent={calcAgent}
          isOpen={!!calcAgent}
          onClose={() => setCalcAgent(null)}
          language={language}
        />
      )}
    </>
  );
}

// ─── Main Section ────────────────────────────────────────────────────────────

export default function Services() {
  const { language } = useLanguage();
  const isNL = language === "nl";
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-20 sm:py-28 bg-[#fdf2e9]" ref={ref}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-[11px] font-bold tracking-[0.2em] uppercase text-[#e67e22] mb-4">
            {isNL ? "20 digitale medewerkers" : "20 digital employees"}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#4a2c2a] mb-5 leading-tight">
            {isNL ? (
              <>
                Welke digitale medewerker past{" "}
                <span className="text-[#e67e22]">bij jou</span>?
              </>
            ) : (
              <>
                Which digital employee{" "}
                <span className="text-[#e67e22]">fits you</span>?
              </>
            )}
          </h2>
          <p className="text-base sm:text-lg text-[#8e6d6b] max-w-2xl mx-auto">
            {isNL
              ? "Klik op een medewerker om je besparing te berekenen. Prijs na gratis intake."
              : "Click any employee to calculate your savings. Price after free intake."}
          </p>
        </motion.div>

        {/* Category grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {CATEGORIES.map((cat, i) => (
            <CategoryCard key={cat.id} category={cat} language={language} index={i} />
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-[#8e6d6b] mt-10"
        >
          {isNL
            ? "Alle prijzen zijn indicatief. De exacte prijs bepalen we samen na een gratis intake."
            : "All prices are indicative. We determine the exact price together after a free intake."}
        </motion.p>
      </div>
    </section>
  );
}
