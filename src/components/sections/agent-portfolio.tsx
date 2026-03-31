"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X, Zap, ArrowRight, Bot, Layers, ChevronDown, ChevronUp
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/lib/scroll-utils";
import Image from "next/image";

// 50 tools organized by category
const integrationCategories = [
    {
        category: { nl: "CRM & Sales", en: "CRM & Sales" },
        tools: ["Salesforce", "HubSpot", "Pipedrive", "ActiveCampaign", "Zoho CRM", "Monday Sales", "Close.io", "Freshsales"]
    },
    {
        category: { nl: "Communicatie", en: "Communication" },
        tools: ["Slack", "Microsoft Teams", "Gmail", "Outlook", "WhatsApp Business", "Intercom", "Zendesk", "Twilio"]
    },
    {
        category: { nl: "Finance & Boekhouding", en: "Finance & Accounting" },
        tools: ["Exact Online", "Twinfield", "QuickBooks", "Xero", "Stripe", "Mollie", "Moneybird", "AFAS"]
    },
    {
        category: { nl: "Projectmanagement", en: "Project Management" },
        tools: ["Asana", "Jira", "Notion", "Monday.com", "ClickUp", "Trello", "Linear", "Basecamp"]
    },
    {
        category: { nl: "Documenten & Data", en: "Documents & Data" },
        tools: ["Google Drive", "SharePoint", "Dropbox", "OneDrive", "Airtable", "Google Sheets", "Excel Online", "DocuSign"]
    },
    {
        category: { nl: "HR & Recruitment", en: "HR & Recruitment" },
        tools: ["LinkedIn Recruiter", "Greenhouse", "BambooHR", "Personio", "Recruitee", "Homerun", "Lever", "Indeed"]
    },
    {
        category: { nl: "Marketing & Automatisering", en: "Marketing & Automation" },
        tools: ["Mailchimp", "Make (Integromat)", "Zapier", "n8n", "Google Analytics", "Meta Ads"]
    },
];

type Agent = {
    humanName: string;
    avatar: string;
    department: { nl: string; en: string };
    name: { nl: string; en: string };
    tagline: { nl: string; en: string };
    description: { nl: string; en: string };
    fte: string;
    bullets: { nl: string[]; en: string[] };
    proof: { nl: string; en: string };
    integrations: string[];
    accentColor: string;
};

const agents: Agent[] = [
    {
        humanName: "Lisa",
        avatar: "https://i.pravatar.cc/300?img=5",
        department: { nl: "Finance", en: "Finance" },
        accentColor: "#EAD083",
        name: { nl: "Factuurverwerking", en: "Invoice Processing" },
        tagline: { nl: "Verwerkt facturen sneller dan je ze kunt openen", en: "Processes invoices faster than you can open them" },
        description: {
            nl: "Herkent, classificeert en boekt inkomende facturen automatisch. Van PDF-extractie tot ERP-boeking, geen menselijke tussenkomst nodig.",
            en: "Automatically recognizes, classifies and books incoming invoices. From PDF extraction to ERP booking, no human intervention needed."
        },
        fte: "1-2",
        bullets: {
            nl: ["OCR + AI extractie van elke factuurindeling", "Automatische matching met inkooporders", "Direct boeken in Exact, Twinfield of AFAS", "Afwijkingen flaggen voor review"],
            en: ["OCR + AI extraction from any invoice format", "Automatic matching with purchase orders", "Direct booking in Exact, Twinfield or AFAS", "Flag anomalies for review"]
        },
        proof: { nl: "94% straight-through processing ", en: "94% straight-through processing after 2 weeks" },
        integrations: ["Exact Online", "Twinfield", "AFAS", "Google Drive", "Outlook"]
    },
    {
        humanName: "Mark",
        avatar: "https://i.pravatar.cc/300?img=12",
        department: { nl: "Klantenservice", en: "Customer Service" },
        accentColor: "#C5DFE8",
        name: { nl: "Klantenservice", en: "Customer Service" },
        tagline: { nl: "24/7 support zonder wachttijden", en: "24/7 support without wait times" },
        description: {
            nl: "Beantwoordt klantvragen via chat, e-mail en telefoon. Escaleert complexe cases automatisch naar de juiste medewerker.",
            en: "Answers customer questions via chat, email and phone. Automatically escalates complex cases to the right employee."
        },
        fte: "1.5-2",
        bullets: {
            nl: ["Multichannel: chat, e-mail, telefoon, WhatsApp", "Leert van je kennisbank en eerdere tickets", "Automatische sentimentanalyse en prioritering", "Naadloze overdracht naar menselijke agent"],
            en: ["Multichannel: chat, email, phone, WhatsApp", "Learns from your knowledge base and past tickets", "Automatic sentiment analysis and prioritization", "Seamless handoff to human agent"]
        },
        proof: { nl: "73% van tickets volledig automatisch afgehandeld", en: "73% of tickets fully automatically resolved" },
        integrations: ["Zendesk", "Intercom", "WhatsApp Business", "Slack", "Freshsales"]
    },
    {
        humanName: "Sophie",
        avatar: "https://i.pravatar.cc/300?img=9",
        department: { nl: "Sales", en: "Sales" },
        accentColor: "#F0C4CC",
        name: { nl: "Sales Kwalificatie", en: "Sales Qualification" },
        tagline: { nl: "Elk lead beoordeeld in seconden, niet dagen", en: "Every lead scored in seconds, not days" },
        description: {
            nl: "Kwalificeert inkomende leads automatisch op basis van je ICP. Verrijkt bedrijfsdata, scoort urgentie en plant direct meetings met je sales team.",
            en: "Automatically qualifies incoming leads based on your ICP. Enriches company data, scores urgency and directly schedules meetings with your sales team."
        },
        fte: "1-1.5",
        bullets: {
            nl: ["Automatische lead scoring op basis van 40+ signalen", "Bedrijfsverrijking via KvK, LinkedIn en web scraping", "Gepersonaliseerde outreach sequences", "Direct meetings plannen via Calendly/agenda"],
            en: ["Automatic lead scoring based on 40+ signals", "Company enrichment via LinkedIn and web scraping", "Personalized outreach sequences", "Direct meeting scheduling via Calendly/calendar"]
        },
        proof: { nl: "3x meer gekwalificeerde gesprekken", en: "3x more qualified conversations" },
        integrations: ["HubSpot", "Salesforce", "LinkedIn Recruiter", "ActiveCampaign", "Pipedrive"]
    },
    {
        humanName: "Thomas",
        avatar: "https://i.pravatar.cc/300?img=14",
        department: { nl: "Finance", en: "Finance" },
        accentColor: "#A3C9A6",
        name: { nl: "Finance & Reconciliatie", en: "Finance & Reconciliation" },
        tagline: { nl: "Maandafsluiting in uren", en: "Month-end close in hours" },
        description: {
            nl: "Automatiseert bank reconciliatie, expense categorisatie en rapportage. Pakt discrepanties op voordat ze problemen worden.",
            en: "Automates bank reconciliation, expense categorization and reporting. Catches discrepancies before they become problems."
        },
        fte: "1-1.5",
        bullets: {
            nl: ["Automatische bank-naar-boekhouding reconciliatie", "Slimme categorisatie van uitgaven", "Real-time cashflow dashboards", "Compliance checks en audit trails"],
            en: ["Automatic bank-to-accounting reconciliation", "Smart expense categorization", "Real-time cashflow dashboards", "Compliance checks and audit trails"]
        },
        proof: { nl: "Maandafsluiting van 5 dagen naar 4 uur", en: "Month-end close from 5 days to 4 hours" },
        integrations: ["Stripe", "Mollie", "QuickBooks", "Xero", "Moneybird"]
    },
    {
        humanName: "Emma",
        avatar: "https://i.pravatar.cc/300?img=25",
        department: { nl: "HR", en: "HR" },
        accentColor: "#E8C5DF",
        name: { nl: "HR & Recruitment", en: "HR & Recruitment" },
        tagline: { nl: "De beste kandidaten, automatisch gefilterd", en: "The best candidates, automatically filtered" },
        description: {
            nl: "Screent CV's, plant interviews en houdt kandidaten warm. Van vacature tot shortlist zonder handmatig werk.",
            en: "Screens CVs, schedules interviews and keeps candidates engaged. From job posting to shortlist without manual work."
        },
        fte: "1",
        bullets: {
            nl: ["AI-screening van CV's tegen functie-eisen", "Automatische interview scheduling", "Kandidaat-communicatie via e-mail en WhatsApp", "Hiring pipeline dashboards"],
            en: ["AI screening of CVs against job requirements", "Automatic interview scheduling", "Candidate communication via email and WhatsApp", "Hiring pipeline dashboards"]
        },
        proof: { nl: "Time-to-hire gemiddeld met 60% verkort", en: "Time-to-hire reduced by 60% on average" },
        integrations: ["Greenhouse", "Recruitee", "LinkedIn Recruiter", "Personio", "Homerun"]
    }
];

function AgentCard({ agent, index, onClick }: { agent: Agent; index: number; onClick: () => void }) {
    const { language } = useLanguage();

    return (
        <motion.article
            className="bg-[#fdf2e9] flex flex-col cursor-pointer group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 * index }}
            onClick={onClick}
        >
            {/* Avatar area */}
            <div
                className="aspect-square relative overflow-hidden flex items-center justify-center"
                style={{ backgroundColor: agent.accentColor }}
            >
                <Image
                    src={agent.avatar}
                    alt={agent.humanName}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover mix-blend-multiply opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    loading="lazy"
                />
                {/* Department pill overlay */}
                <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-sm text-[10px] font-semibold uppercase tracking-wider text-[#4a2c2a]">
                        {agent.department[language]}
                    </span>
                </div>
            </div>

            {/* Card info */}
            <div className="border-t border-[#4a2c2a]/10 p-4 flex flex-col justify-between flex-grow gap-3">
                <div>
                    <h3 className="text-lg font-semibold text-[#4a2c2a] leading-tight group-hover:underline decoration-1 underline-offset-4">
                        {agent.humanName}
                    </h3>
                    <p className="text-sm text-[#8e6d6b] mt-0.5">
                        {agent.name[language]}
                    </p>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-[10px] font-semibold uppercase tracking-wider">
                        <span className="text-[#4a2c2a]/60">{language === 'nl' ? 'Vervangt' : 'Replaces'}</span>
                        <span className="text-[#8e6d6b]">{agent.fte} FTE</span>
                    </div>
                    <div className="flex justify-between text-[10px] font-semibold uppercase tracking-wider">
                        <span className="text-[#4a2c2a]/60">Status</span>
                        <span className="text-green-600">{language === 'nl' ? 'Beschikbaar' : 'Available'}</span>
                    </div>
                </div>
            </div>
        </motion.article>
    );
}

function AgentModal({ agent, onClose }: { agent: Agent | null; onClose: () => void }) {
    const { language } = useLanguage();
    if (!agent) return null;

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-[#4a2c2a]/60 backdrop-blur-sm" />

            {/* Modal */}
            <motion.div
                className="relative bg-[#fdf2e9] border border-[#4a2c2a]/20 rounded-xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl"
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal header */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-[#4a2c2a]/10">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-[#8e6d6b]">
                        Agent Detail
                    </span>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-lg hover:bg-[#4a2c2a]/5 transition-colors"
                    >
                        <X className="h-4 w-4 text-[#4a2c2a]" />
                    </button>
                </div>

                {/* Avatar */}
                <div
                    className="aspect-[16/9] relative overflow-hidden flex items-center justify-center"
                    style={{ backgroundColor: agent.accentColor }}
                >
                    <Image
                        src={agent.avatar}
                        alt={agent.humanName}
                        width={600}
                        height={340}
                        className="w-full h-full object-cover mix-blend-multiply opacity-80"
                        loading="lazy"
                    />
                </div>

                {/* Content */}
                <div className="p-5 space-y-5">
                    <div>
                        <h2 className="text-2xl font-bold text-[#4a2c2a]">
                            {agent.humanName}
                        </h2>
                        <p className="text-base text-[#8e6d6b] font-medium">
                            {agent.name[language]}
                        </p>
                        <p className="text-sm text-[#8e6d6b]/80 mt-1 italic">
                            &ldquo;{agent.tagline[language]}&rdquo;
                        </p>
                    </div>

                    {/* Meta */}
                    <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between text-[11px] font-semibold uppercase tracking-wider">
                            <span className="text-[#4a2c2a]/60">{language === 'nl' ? 'Afdeling' : 'Department'}</span>
                            <span className="text-[#4a2c2a]">{agent.department[language]}</span>
                        </div>
                        <div className="flex justify-between text-[11px] font-semibold uppercase tracking-wider">
                            <span className="text-[#4a2c2a]/60">{language === 'nl' ? 'Vervangt' : 'Replaces'}</span>
                            <span className="text-[#4a2c2a]">{agent.fte} FTE</span>
                        </div>
                        <div className="flex justify-between text-[11px] font-semibold uppercase tracking-wider">
                            <span className="text-[#4a2c2a]/60">Status</span>
                            <span className="text-green-600">{language === 'nl' ? 'Beschikbaar' : 'Available'}</span>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-[#4a2c2a]/80 leading-relaxed">
                        {agent.description[language]}
                    </p>

                    {/* Capabilities */}
                    <ul className="space-y-2">
                        {agent.bullets[language].map((bullet, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-[#4a2c2a]/80">
                                <Zap className="h-3.5 w-3.5 text-orange-500 flex-shrink-0 mt-0.5" />
                                <span>{bullet}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Proof */}
                    <div className="bg-orange-500/8 border border-orange-500/15 rounded-lg p-3">
                        <p className="text-sm font-medium text-orange-600">
                            {agent.proof[language]}
                        </p>
                    </div>

                    {/* Integrations */}
                    <div className="flex flex-wrap gap-1.5">
                        {agent.integrations.map((tool, i) => (
                            <span
                                key={i}
                                className="px-2.5 py-1 rounded-full border border-[#4a2c2a]/10 text-[11px] font-medium text-[#4a2c2a]/70 bg-white/60"
                            >
                                {tool}
                            </span>
                        ))}
                    </div>

                    {/* CTA */}
                    <Button
                        size="sm"
                        onClick={() => {
                            onClose();
                            scrollToSection('ready-to-start');
                        }}
                        className="w-full bg-orange-500 hover:bg-orange-400 text-white"
                    >
                        {language === 'nl' ? 'Plan afspraak met Robin' : 'Book a call with Robin'}
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function AgentPortfolio() {
    const { language } = useLanguage();
    const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
    const [showAllTools, setShowAllTools] = useState(false);

    const totalTools = integrationCategories.reduce((acc, cat) => acc + cat.tools.length, 0);

    return (
        <section className="py-16 sm:py-20 bg-[#fdf2e9] relative overflow-hidden" id="services">
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <motion.div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 text-orange-600 text-sm font-medium mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <Bot className="h-4 w-4" />
                            {language === 'nl' ? 'Maak kennis met het team' : 'Meet the team'}
                        </motion.div>

                        <motion.h2
                            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 px-4 text-[#4a2c2a]"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            {language === 'nl'
                                ? 'Jouw digitale medewerkers'
                                : 'Your digital employees'}
                        </motion.h2>

                        <motion.p
                            className="text-base sm:text-lg text-[#8e6d6b] max-w-2xl mx-auto px-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            {language === 'nl'
                                ? 'Elke agent vervangt 1-2 FTE aan handmatig werk. Gebouwd op maat, draaiend binnen 2 weken.'
                                : 'Each agent replaces 1-2 FTE of manual work. Custom-built, running within 2 weeks.'}
                        </motion.p>
                    </div>

                    {/* Gallery Grid */}
                    <div className="border border-[#4a2c2a]/10 rounded-xl overflow-hidden mb-16">
                        <div
                            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
                            style={{ gap: '1px', backgroundColor: 'rgba(74, 44, 42, 0.08)' }}
                        >
                            {agents.map((agent, index) => (
                                <AgentCard
                                    key={index}
                                    agent={agent}
                                    index={index}
                                    onClick={() => setSelectedAgent(agent)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Modal */}
                    <AnimatePresence>
                        {selectedAgent && (
                            <AgentModal agent={selectedAgent} onClose={() => setSelectedAgent(null)} />
                        )}
                    </AnimatePresence>

                    {/* Integrations Showcase */}
                    <div className="mb-12">
                        <div className="text-center mb-10">
                            <motion.div
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 text-orange-600 text-sm font-medium mb-6"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <Layers className="h-4 w-4" />
                                {totalTools}+ {language === 'nl' ? 'integraties' : 'integrations'}
                            </motion.div>

                            <motion.h2
                                className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 px-4 text-[#4a2c2a]"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                {language === 'nl'
                                    ? 'Werkt met je bestaande tools'
                                    : 'Works with your existing tools'}
                            </motion.h2>

                            <motion.p
                                className="text-base sm:text-lg text-[#8e6d6b] max-w-2xl mx-auto px-4"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                            >
                                {language === 'nl'
                                    ? 'Onze agents koppelen direct met de software die je al gebruikt. Geen migratie, geen gedoe.'
                                    : 'Our agents connect directly with the software you already use. No migration, no hassle.'}
                            </motion.p>
                        </div>

                        {/* Tool Grid by Category */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {integrationCategories.map((cat, catIndex) => {
                                const isHidden = !showAllTools && catIndex >= 4;
                                if (isHidden) return null;

                                return (
                                    <motion.div
                                        key={catIndex}
                                        className="bg-white/50 border border-[#4a2c2a]/8 rounded-xl p-5"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.05 * catIndex }}
                                    >
                                        <h4 className="font-semibold text-sm text-[#4a2c2a] mb-3 uppercase tracking-wider">
                                            {cat.category[language]}
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {cat.tools.map((tool, toolIndex) => (
                                                <span
                                                    key={toolIndex}
                                                    className="px-2.5 py-1 rounded-full border border-[#4a2c2a]/10 text-xs font-medium text-[#4a2c2a]/70 bg-white/60"
                                                >
                                                    {tool}
                                                </span>
                                            ))}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Show More/Less */}
                        {integrationCategories.length > 4 && (
                            <div className="text-center mt-6">
                                <button
                                    onClick={() => setShowAllTools(!showAllTools)}
                                    className="text-sm font-medium text-orange-600 hover:text-orange-500 transition-colors inline-flex items-center gap-1"
                                >
                                    {showAllTools
                                        ? (language === 'nl' ? 'Toon minder' : 'Show less')
                                        : (language === 'nl' ? `Toon alle ${integrationCategories.length} categorieën` : `Show all ${integrationCategories.length} categories`)}
                                    {showAllTools ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* CTA */}
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Button
                            size="lg"
                            onClick={() => scrollToSection('ready-to-start')}
                            className="bg-orange-500 hover:bg-orange-400 text-white px-8 sm:px-12 py-5 sm:py-6 text-base sm:text-lg rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                        >
                            {language === 'nl' ? 'Plan een gratis intake' : 'Schedule a free intake'}
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
