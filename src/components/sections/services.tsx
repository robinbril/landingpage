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
    id: "erp-finance",
    titleNL: "ERP & Finance Operaties",
    titleEN: "ERP & Finance Operations",
    subtitleNL: "Dynamics F&O, SAP, Oracle — handmatig werk weg",
    subtitleEN: "Dynamics F&O, SAP, Oracle — eliminate manual work",
    agents: [
      { id: "po-matching", titleNL: "Purchase Order Matching Agent", titleEN: "Purchase Order Matching Agent", descNL: "Matcht inkooporders, pakbonnen en facturen automatisch in Dynamics F&O of SAP. Signaleert afwijkingen, stuurt goedkeuringsflow.", descEN: "Automatically matches POs, delivery notes and invoices in Dynamics F&O or SAP. Flags discrepancies, triggers approval flow.", complexity: "high", priceRange: [12000, 25000], avgTimeSavedHoursWeek: 35, avgROIPercent: 420, toolsNL: "Microsoft Dynamics F&O, SAP S/4HANA, Power Automate", toolsEN: "Microsoft Dynamics F&O, SAP S/4HANA, Power Automate" },
      { id: "journaalposten", titleNL: "Journaalposten Agent", titleEN: "Journal Entry Agent", descNL: "Verwerkt boekingsregels vanuit Excel/CSV/email direct naar Dynamics of SAP. Controleert grootboek, markeert uitzonderingen voor review.", descEN: "Posts journal entries from Excel/CSV/email directly into Dynamics or SAP. Validates GL accounts, flags exceptions for review.", complexity: "high", priceRange: [10000, 20000], avgTimeSavedHoursWeek: 25, avgROIPercent: 380, toolsNL: "Dynamics 365 F&O, SAP BAPI, Power Automate, Excel API", toolsEN: "Dynamics 365 F&O, SAP BAPI, Power Automate, Excel API" },
      { id: "afsluiting", titleNL: "Maandafsluiting Agent", titleEN: "Period Close Agent", descNL: "Begeleidt de maandafsluiting: checkt openstaande posten, triggert accruals, verzendt statusupdates naar het finance team.", descEN: "Guides the month-end close: checks open items, triggers accruals, sends status updates to the finance team.", complexity: "enterprise", priceRange: [20000, 40000], avgTimeSavedHoursWeek: 40, avgROIPercent: 350, toolsNL: "Dynamics F&O, SAP, Power BI, Teams", toolsEN: "Dynamics F&O, SAP, Power BI, Teams" },
      { id: "crediteuren", titleNL: "Crediteuren Agent", titleEN: "Accounts Payable Agent", descNL: "Leest inkomende facturen (PDF/email), extraheert regels, boekt in ERP, stuurt betaalopdrachten klaar voor autorisatie.", descEN: "Reads incoming invoices (PDF/email), extracts line items, books in ERP, prepares payment runs for authorisation.", complexity: "high", priceRange: [12000, 22000], avgTimeSavedHoursWeek: 30, avgROIPercent: 400, toolsNL: "Dynamics F&O, SAP, Azure Document Intelligence, Teams", toolsEN: "Dynamics F&O, SAP, Azure Document Intelligence, Teams" },
    ],
  },
  {
    id: "supply-chain",
    titleNL: "Supply Chain & Logistiek",
    titleEN: "Supply Chain & Logistics",
    subtitleNL: "Voorraad, inkoop, Amazon/WMS — minder handmatig",
    subtitleEN: "Inventory, procurement, Amazon/WMS — less manual work",
    agents: [
      { id: "demand-planning", titleNL: "Vraagplanning Agent", titleEN: "Demand Planning Agent", descNL: "Analyseert verkoophistorie en seizoenspatronen, genereert inkoopvoorstellen en updatet min/max-voorraden in het ERP of WMS.", descEN: "Analyses sales history and seasonality, generates purchase proposals and updates min/max stock levels in ERP or WMS.", complexity: "high", priceRange: [15000, 30000], avgTimeSavedHoursWeek: 30, avgROIPercent: 390, toolsNL: "Dynamics F&O, SAP MM, Amazon Seller Central, Power BI", toolsEN: "Dynamics F&O, SAP MM, Amazon Seller Central, Power BI" },
      { id: "order-routing", titleNL: "Order Routing Agent", titleEN: "Order Routing Agent", descNL: "Routeert inkomende orders naar het juiste warehouse, picking-locatie of externe fulfillment partner op basis van voorraad en SLA.", descEN: "Routes incoming orders to the right warehouse, picking location or external fulfilment partner based on stock and SLA.", complexity: "high", priceRange: [12000, 24000], avgTimeSavedHoursWeek: 28, avgROIPercent: 360, toolsNL: "Amazon SP-API, Dynamics F&O, Picqer, Sendcloud, Shopify", toolsEN: "Amazon SP-API, Dynamics F&O, Picqer, Sendcloud, Shopify" },
      { id: "leverancier-opvolging", titleNL: "Leverancier Opvolging Agent", titleEN: "Supplier Follow-up Agent", descNL: "Monitort openstaande inkooporders, stuurt automatisch herinneringen bij vertraging en werkt levertijden bij in het ERP.", descEN: "Monitors open purchase orders, automatically sends reminders on delays and updates lead times in the ERP.", complexity: "medium", priceRange: [8000, 15000], avgTimeSavedHoursWeek: 18, avgROIPercent: 310, toolsNL: "Dynamics F&O, SAP, Outlook API, Teams", toolsEN: "Dynamics F&O, SAP, Outlook API, Teams" },
      { id: "retourverwerking", titleNL: "Retourverwerking Agent", titleEN: "Returns Processing Agent", descNL: "Verwerkt retourmeldingen, controleert RMA-status, boekt creditnota's en past voorraad bij — zonder menselijke tussenkomst.", descEN: "Processes return notifications, checks RMA status, books credit notes and adjusts stock — without human intervention.", complexity: "high", priceRange: [10000, 20000], avgTimeSavedHoursWeek: 22, avgROIPercent: 340, toolsNL: "Amazon SP-API, Dynamics F&O, Exact, Picqer", toolsEN: "Amazon SP-API, Dynamics F&O, Exact, Picqer" },
    ],
  },
  {
    id: "document-data",
    titleNL: "Document- & Dataverwerkig",
    titleEN: "Document & Data Processing",
    subtitleNL: "PDFs, emails, Excel naar ERP — zonder copy-paste",
    subtitleEN: "PDFs, emails, Excel into ERP — no copy-paste",
    agents: [
      { id: "document-extractie", titleNL: "Document Extractie Agent", titleEN: "Document Extraction Agent", descNL: "Leest ongestructureerde documenten (offertes, contracten, pakbonnen) en schrijft gestructureerde data direct naar Dynamics, SAP of SharePoint.", descEN: "Reads unstructured documents (quotes, contracts, delivery notes) and writes structured data directly to Dynamics, SAP or SharePoint.", complexity: "high", priceRange: [12000, 22000], avgTimeSavedHoursWeek: 32, avgROIPercent: 430, toolsNL: "Azure Document Intelligence, Dynamics F&O, SharePoint, Power Automate", toolsEN: "Azure Document Intelligence, Dynamics F&O, SharePoint, Power Automate" },
      { id: "email-verwerking", titleNL: "Email Verwerkingsagent", titleEN: "Email Processing Agent", descNL: "Herkent orderbevestigingen, klachten en aanvragen in de mailbox en verwerkt ze direct in het juiste systeem zonder handmatige actie.", descEN: "Recognises order confirmations, complaints and requests in the mailbox and processes them directly into the right system without manual action.", complexity: "medium", priceRange: [8000, 16000], avgTimeSavedHoursWeek: 25, avgROIPercent: 400, toolsNL: "Microsoft Graph API (Outlook), Dynamics F&O, SAP, Power Automate", toolsEN: "Microsoft Graph API (Outlook), Dynamics F&O, SAP, Power Automate" },
      { id: "excel-import", titleNL: "Excel/CSV Import Agent", titleEN: "Excel/CSV Import Agent", descNL: "Valideert, transformeert en importeert Excel- of CSV-bestanden naar ERP-stamdata of transacties — inclusief foutrapportage.", descEN: "Validates, transforms and imports Excel or CSV files into ERP master data or transactions — including error reporting.", complexity: "medium", priceRange: [6000, 12000], avgTimeSavedHoursWeek: 20, avgROIPercent: 370, toolsNL: "Dynamics F&O, SAP BAPI, Excel API, SharePoint", toolsEN: "Dynamics F&O, SAP BAPI, Excel API, SharePoint" },
      { id: "stamdata-beheer", titleNL: "Stamdata Beheer Agent", titleEN: "Master Data Agent", descNL: "Detecteert duplicaten en inconsistenties in klant-, leverancier- en artikelstamdata. Stelt correcties voor en legt wijzigingen vast.", descEN: "Detects duplicates and inconsistencies in customer, vendor and item master data. Proposes corrections and logs changes.", complexity: "enterprise", priceRange: [18000, 35000], avgTimeSavedHoursWeek: 20, avgROIPercent: 290, toolsNL: "Dynamics F&O, SAP MDG, Azure Data Factory, Power BI", toolsEN: "Dynamics F&O, SAP MDG, Azure Data Factory, Power BI" },
    ],
  },
  {
    id: "systeem-integratie",
    titleNL: "Systeem Integratie & Operationele KPI's",
    titleEN: "System Integration & Operational KPIs",
    subtitleNL: "Dynamics, Amazon, Shopify, WMS — data stroomt automatisch",
    subtitleEN: "Dynamics, Amazon, Shopify, WMS — data flows automatically",
    agents: [
      { id: "erp-sync", titleNL: "ERP Synchronisatie Agent", titleEN: "ERP Sync Agent", descNL: "Synchroniseert artikelen, prijzen en voorraden real-time tussen Dynamics F&O, Amazon Seller Central en Shopify. Geen handmatige exports meer.", descEN: "Syncs items, prices and stock levels in real time between Dynamics F&O, Amazon Seller Central and Shopify. No more manual exports.", complexity: "high", priceRange: [12000, 25000], avgTimeSavedHoursWeek: 30, avgROIPercent: 410, toolsNL: "Dynamics F&O, Amazon SP-API, Shopify API, Azure Service Bus", toolsEN: "Dynamics F&O, Amazon SP-API, Shopify API, Azure Service Bus" },
      { id: "operationele-kpis", titleNL: "Operationele KPI Agent", titleEN: "Operational KPI Agent", descNL: "Haalt dagelijks data op uit ERP, WMS en verkoop, berekent doorlooptijden, fill rates en backorders, en stuurt het overzicht naar de operationeel manager.", descEN: "Pulls daily data from ERP, WMS and sales, calculates lead times, fill rates and backorders, and sends the overview to the operations manager.", complexity: "medium", priceRange: [8000, 16000], avgTimeSavedHoursWeek: 12, avgROIPercent: 290, toolsNL: "Dynamics F&O, Power BI, Teams, Excel API", toolsEN: "Dynamics F&O, Power BI, Teams, Excel API" },
      { id: "wms-koppeling", titleNL: "WMS Koppeling Agent", titleEN: "WMS Integration Agent", descNL: "Vertaalt inkomende orders naar pick-instructies in het WMS, verwerkt scan-bevestigingen terug naar het ERP en houdt voorraadlocaties synchroon.", descEN: "Translates incoming orders into pick instructions in the WMS, processes scan confirmations back to the ERP and keeps stock locations in sync.", complexity: "enterprise", priceRange: [18000, 35000], avgTimeSavedHoursWeek: 35, avgROIPercent: 380, toolsNL: "Dynamics F&O, Warehouse Management System API, Azure Service Bus", toolsEN: "Dynamics F&O, Warehouse Management System API, Azure Service Bus" },
      { id: "escalatie-monitor", titleNL: "Escalatie Monitor Agent", titleEN: "Escalation Monitor Agent", descNL: "Bewaakt open taken, te laat verwerkte orders en vastgelopen goedkeuringsflows in het ERP. Stuurt automatisch een melding naar de juiste persoon.", descEN: "Monitors open tasks, late-processed orders and stuck approval flows in the ERP. Automatically notifies the right person.", complexity: "medium", priceRange: [7000, 14000], avgTimeSavedHoursWeek: 15, avgROIPercent: 330, toolsNL: "Dynamics F&O, SAP, Teams, Outlook API", toolsEN: "Dynamics F&O, SAP, Teams, Outlook API" },
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
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4" role="dialog" aria-label={isNL ? "ROI Scanner" : "ROI Scanner"}>
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
                  <input type="range" min={15} max={150} step={5} value={hourlyRate} onChange={(e) => setHourlyRate(Number(e.target.value))} aria-label={isNL ? "Uurtarief medewerker" : "Employee hourly rate"} className="w-full h-2 rounded-full appearance-none cursor-pointer accent-[#e67e22] bg-[#e67e22]/15" />
                </div>

                <div>
                  <label className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-[#4a2c2a]">
                      {isNL ? "Aantal FTE's op deze taak" : "FTEs on this task"}
                    </span>
                    <span className="text-lg font-black text-[#e67e22]">{ftes}</span>
                  </label>
                  <input type="range" min={1} max={10} value={ftes} onChange={(e) => setFtes(Number(e.target.value))} aria-label={isNL ? "Aantal FTE's" : "Number of FTEs"} className="w-full h-2 rounded-full appearance-none cursor-pointer accent-[#e67e22] bg-[#e67e22]/15" />
                </div>

                <div>
                  <label className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-[#4a2c2a]">
                      {isNL ? "Uren per week per FTE" : "Hours per week per FTE"}
                    </span>
                    <span className="text-lg font-black text-[#e67e22]">{hoursPerWeek}h</span>
                  </label>
                  <input type="range" min={1} max={40} value={hoursPerWeek} onChange={(e) => setHoursPerWeek(Number(e.target.value))} aria-label={isNL ? "Uren per week per FTE" : "Hours per week per FTE"} className="w-full h-2 rounded-full appearance-none cursor-pointer accent-[#e67e22] bg-[#e67e22]/15" />
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
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
  const [calcAgent, setCalcAgent] = useState<Agent | null>(null);

  const current = CATEGORIES.find((c) => c.id === activeCategory)!;

  return (
    <section className="py-20 sm:py-28 bg-[#fdf2e9]" ref={ref}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#4a2c2a] mb-4 leading-tight">
            {isNL ? (
              <>Nieuwsgierig? <span className="text-[#e67e22]">Kies een agent uit de lijst.</span></>
            ) : (
              <>Curious? <span className="text-[#e67e22]">Pick an agent from the list.</span></>
            )}
          </h2>
          <p className="text-base text-[#8e6d6b] max-w-xl mx-auto">
            {isNL
              ? "Voorbeelden van wat ik bouw. Samen kijken we welke agent jouw grootste bottleneck aanpakt. Klik voor de terugverdientijd."
              : "Examples of what I build. Together we figure out which agent tackles your biggest bottleneck. Click to see the payback."}
          </p>
        </motion.div>

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap gap-2 mb-8 justify-center"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                activeCategory === cat.id
                  ? "bg-[#4a2c2a] text-[#fdf2e9] border-[#4a2c2a] shadow-sm"
                  : "bg-white text-[#4a2c2a] border-[#4a2c2a]/15 hover:border-[#e67e22]/40 hover:text-[#e67e22]"
              }`}
            >
              {isNL ? cat.titleNL : cat.titleEN}
            </button>
          ))}
        </motion.div>

        {/* Agent list */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-2xl border border-[#4a2c2a]/8 shadow-sm overflow-hidden"
          >
            {/* Category subtitle */}
            <div className="px-6 py-4 border-b border-[#4a2c2a]/6">
              <p className="text-xs text-[#8e6d6b] font-medium">
                {isNL ? current.subtitleNL : current.subtitleEN}
              </p>
            </div>

            {/* Agents */}
            {current.agents.map((agent, i) => (
              <button
                key={agent.id}
                onClick={() => setCalcAgent(agent)}
                className={`w-full text-left group flex items-start justify-between px-6 py-4 transition-colors hover:bg-[#fdf2e9]/70 ${
                  i < current.agents.length - 1 ? "border-b border-[#4a2c2a]/5" : ""
                }`}
              >
                <div className="min-w-0 flex-1 pr-4">
                  <div className="text-sm font-bold text-[#4a2c2a] group-hover:text-[#e67e22] transition-colors mb-0.5">
                    {isNL ? agent.titleNL : agent.titleEN}
                  </div>
                  <div className="text-xs text-[#8e6d6b] leading-relaxed">
                    {isNL ? agent.descNL : agent.descEN}
                  </div>
                  <div className="text-[10px] text-[#e67e22]/60 mt-1.5 font-mono">
                    {isNL ? agent.toolsNL : agent.toolsEN}
                  </div>
                </div>
                <div className="flex-shrink-0 flex flex-col items-end gap-1 pt-0.5">
                  <span className="text-xs font-bold text-[#4a2c2a]/70">
                    €{agent.priceRange[0].toLocaleString("nl-NL")}+
                  </span>
                  <span className="text-[10px] text-[#8e6d6b]">
                    ~{agent.avgTimeSavedHoursWeek}h/wk
                  </span>
                  <ChevronRight className="h-3.5 w-3.5 text-[#e67e22] opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
                </div>
              </button>
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-xs text-[#8e6d6b] mt-6"
        >
          {isNL
            ? "Prijzen zijn indicatief. Exacte prijs na gratis intake."
            : "Prices are indicative. Exact price after free intake."}
        </motion.p>
      </div>

      {calcAgent && (
        <ROIScanner
          agent={calcAgent}
          isOpen={!!calcAgent}
          onClose={() => setCalcAgent(null)}
          language={language}
        />
      )}
    </section>
  );
}
