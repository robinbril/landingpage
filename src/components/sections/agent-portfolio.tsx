"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FileText, Headphones, TrendingUp, Calculator, UserCheck,
    ChevronDown, ChevronUp, Zap, ArrowRight, Bot, Layers
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/lib/scroll-utils";

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

export default function AgentPortfolio() {
    const { language } = useLanguage();
    const [expandedAgent, setExpandedAgent] = useState<number | null>(null);
    const [showAllTools, setShowAllTools] = useState(false);

    const agents = [
        {
            icon: FileText,
            name: { nl: "Factuurverwerking Agent", en: "Invoice Processing Agent" },
            tagline: { nl: "Verwerkt facturen sneller dan je ze kunt openen", en: "Processes invoices faster than you can open them" },
            description: {
                nl: "Herkent, classificeert en boekt inkomende facturen automatisch. Van PDF-extractie tot ERP-boeking — geen menselijke tussenkomst nodig.",
                en: "Automatically recognizes, classifies and books incoming invoices. From PDF extraction to ERP booking — no human intervention needed."
            },
            fte: "1-2",
            saving: "€50K-€120K",
            bullets: {
                nl: ["OCR + AI extractie van elke factuurindeling", "Automatische matching met inkooporders", "Direct boeken in Exact, Twinfield of AFAS", "Afwijkingen flaggen voor review"],
                en: ["OCR + AI extraction from any invoice format", "Automatic matching with purchase orders", "Direct booking in Exact, Twinfield or AFAS", "Flag anomalies for review"]
            },
            proof: { nl: "Gemiddeld 94% straight-through processing na 2 weken", en: "Average 94% straight-through processing after 2 weeks" },
            integrations: ["Exact Online", "Twinfield", "AFAS", "Google Drive", "Outlook"]
        },
        {
            icon: Headphones,
            name: { nl: "Klantenservice Agent", en: "Customer Service Agent" },
            tagline: { nl: "24/7 support zonder wachttijden", en: "24/7 support without wait times" },
            description: {
                nl: "Beantwoordt klantvragen via chat, e-mail en telefoon. Escaleert complexe cases automatisch naar de juiste medewerker.",
                en: "Answers customer questions via chat, email and phone. Automatically escalates complex cases to the right employee."
            },
            fte: "1.5-2",
            saving: "€75K-€120K",
            bullets: {
                nl: ["Multichannel: chat, e-mail, telefoon, WhatsApp", "Leert van je kennisbank en eerdere tickets", "Automatische sentimentanalyse en prioritering", "Naadloze overdracht naar menselijke agent"],
                en: ["Multichannel: chat, email, phone, WhatsApp", "Learns from your knowledge base and past tickets", "Automatic sentiment analysis and prioritization", "Seamless handoff to human agent"]
            },
            proof: { nl: "Tot 73% van tickets volledig automatisch afgehandeld", en: "Up to 73% of tickets fully automatically resolved" },
            integrations: ["Zendesk", "Intercom", "WhatsApp Business", "Slack", "Freshsales"]
        },
        {
            icon: TrendingUp,
            name: { nl: "Sales Kwalificatie Agent", en: "Sales Qualification Agent" },
            tagline: { nl: "Elk lead beoordeeld in seconden, niet dagen", en: "Every lead scored in seconds, not days" },
            description: {
                nl: "Kwalificeert inkomende leads automatisch op basis van je ICP. Verrijkt bedrijfsdata, scoort urgentie en plant direct meetings met je sales team.",
                en: "Automatically qualifies incoming leads based on your ICP. Enriches company data, scores urgency and directly schedules meetings with your sales team."
            },
            fte: "1-1.5",
            saving: "€50K-€90K",
            bullets: {
                nl: ["Automatische lead scoring op basis van 40+ signalen", "Bedrijfsverrijking via KvK, LinkedIn en web scraping", "Gepersonaliseerde outreach sequences", "Direct meetings plannen via Calendly/agenda"],
                en: ["Automatic lead scoring based on 40+ signals", "Company enrichment via LinkedIn and web scraping", "Personalized outreach sequences", "Direct meeting scheduling via Calendly/calendar"]
            },
            proof: { nl: "Sales teams rapporteren 3x meer gekwalificeerde gesprekken", en: "Sales teams report 3x more qualified conversations" },
            integrations: ["HubSpot", "Salesforce", "LinkedIn Recruiter", "ActiveCampaign", "Pipedrive"]
        },
        {
            icon: Calculator,
            name: { nl: "Finance & Reconciliatie Agent", en: "Finance & Reconciliation Agent" },
            tagline: { nl: "Maandafsluiting in uren, niet weken", en: "Month-end close in hours, not weeks" },
            description: {
                nl: "Automatiseert bank reconciliatie, expense categorisatie en rapportage. Pakt discrepanties op voordat ze problemen worden.",
                en: "Automates bank reconciliation, expense categorization and reporting. Catches discrepancies before they become problems."
            },
            fte: "1-1.5",
            saving: "€50K-€90K",
            bullets: {
                nl: ["Automatische bank-naar-boekhouding reconciliatie", "Slimme categorisatie van uitgaven", "Real-time cashflow dashboards", "Compliance checks en audit trails"],
                en: ["Automatic bank-to-accounting reconciliation", "Smart expense categorization", "Real-time cashflow dashboards", "Compliance checks and audit trails"]
            },
            proof: { nl: "Maandafsluiting teruggebracht van 5 dagen naar 4 uur", en: "Month-end close reduced from 5 days to 4 hours" },
            integrations: ["Stripe", "Mollie", "QuickBooks", "Xero", "Moneybird"]
        },
        {
            icon: UserCheck,
            name: { nl: "HR & Recruitment Agent", en: "HR & Recruitment Agent" },
            tagline: { nl: "De beste kandidaten, automatisch gefilterd", en: "The best candidates, automatically filtered" },
            description: {
                nl: "Screent CV's, plant interviews en houdt kandidaten warm. Van vacature tot shortlist zonder handmatig werk.",
                en: "Screens CVs, schedules interviews and keeps candidates engaged. From job posting to shortlist without manual work."
            },
            fte: "1",
            saving: "€50K-€60K",
            bullets: {
                nl: ["AI-screening van CV's tegen functie-eisen", "Automatische interview scheduling", "Kandidaat-communicatie via e-mail en WhatsApp", "Hiring pipeline dashboards"],
                en: ["AI screening of CVs against job requirements", "Automatic interview scheduling", "Candidate communication via email and WhatsApp", "Hiring pipeline dashboards"]
            },
            proof: { nl: "Time-to-hire gemiddeld met 60% verkort", en: "Time-to-hire reduced by 60% on average" },
            integrations: ["Greenhouse", "Recruitee", "LinkedIn Recruiter", "Personio", "Homerun"]
        }
    ];

    const totalTools = integrationCategories.reduce((acc, cat) => acc + cat.tools.length, 0);

    return (
        <section className="py-16 sm:py-20 bg-background relative overflow-hidden" id="services">
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <motion.div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <Bot className="h-4 w-4" />
                            {language === 'nl' ? '5 agents die direct impact maken' : '5 agents that make immediate impact'}
                        </motion.div>

                        <motion.h2
                            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 px-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            {language === 'nl'
                                ? 'Onze AI Agents vervangen repetitief werk'
                                : 'Our AI Agents replace repetitive work'}
                        </motion.h2>

                        <motion.p
                            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4"
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

                    {/* Agent Cards */}
                    <div className="space-y-4 mb-16">
                        {agents.map((agent, index) => {
                            const Icon = agent.icon;
                            const isExpanded = expandedAgent === index;
                            return (
                                <motion.div
                                    key={index}
                                    className="bg-card border border-border rounded-xl overflow-hidden transition-all duration-300"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.05 * index }}
                                >
                                    {/* Collapsed Header */}
                                    <button
                                        onClick={() => setExpandedAgent(isExpanded ? null : index)}
                                        className="w-full flex items-center gap-4 p-5 sm:p-6 text-left hover:bg-muted/30 transition-colors"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <Icon className="h-6 w-6 text-primary" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-lg truncate">
                                                {agent.name[language]}
                                            </h3>
                                            <p className="text-sm text-muted-foreground truncate">
                                                {agent.tagline[language]}
                                            </p>
                                        </div>
                                        <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
                                            <span className="text-xs font-medium px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 whitespace-nowrap">
                                                {agent.fte} FTE
                                            </span>
                                            <span className="text-xs font-medium px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 whitespace-nowrap">
                                                {agent.saving}/jr
                                            </span>
                                        </div>
                                        {isExpanded ? (
                                            <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                                        ) : (
                                            <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                                        )}
                                    </button>

                                    {/* Expanded Content */}
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-border">
                                                    {/* Mobile badges */}
                                                    <div className="flex gap-2 mb-4 sm:hidden">
                                                        <span className="text-xs font-medium px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400">
                                                            {agent.fte} FTE
                                                        </span>
                                                        <span className="text-xs font-medium px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400">
                                                            {agent.saving}/jr
                                                        </span>
                                                    </div>

                                                    <p className="text-muted-foreground mb-4">
                                                        {agent.description[language]}
                                                    </p>

                                                    <ul className="space-y-2 mb-4">
                                                        {agent.bullets[language].map((bullet, i) => (
                                                            <li key={i} className="flex items-start gap-2 text-sm">
                                                                <Zap className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                                                                <span>{bullet}</span>
                                                            </li>
                                                        ))}
                                                    </ul>

                                                    <div className="bg-primary/5 rounded-lg p-3 mb-4">
                                                        <p className="text-sm font-medium text-primary">
                                                            {agent.proof[language]}
                                                        </p>
                                                    </div>

                                                    {/* Agent-specific integrations */}
                                                    <div className="flex flex-wrap gap-2">
                                                        {agent.integrations.map((tool, i) => (
                                                            <span
                                                                key={i}
                                                                className="tech-badge text-xs"
                                                            >
                                                                {tool}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Summary Bar */}
                    <motion.div
                        className="bg-card border border-border rounded-xl p-6 sm:p-8 mb-20"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                            <div>
                                <p className="text-2xl sm:text-3xl font-bold text-primary">5</p>
                                <p className="text-sm text-muted-foreground">{language === 'nl' ? 'Agents' : 'Agents'}</p>
                            </div>
                            <div>
                                <p className="text-2xl sm:text-3xl font-bold text-foreground">5.5-8</p>
                                <p className="text-sm text-muted-foreground">FTE {language === 'nl' ? 'besparing' : 'saved'}</p>
                            </div>
                            <div>
                                <p className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400">€280K-€425K</p>
                                <p className="text-sm text-muted-foreground">{language === 'nl' ? 'jaarlijkse besparing' : 'annual savings'}</p>
                            </div>
                            <div>
                                <p className="text-2xl sm:text-3xl font-bold text-foreground">2</p>
                                <p className="text-sm text-muted-foreground">{language === 'nl' ? 'weken live' : 'weeks to live'}</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Integrations Showcase */}
                    <div className="mb-12">
                        <div className="text-center mb-10">
                            <motion.div
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <Layers className="h-4 w-4" />
                                {totalTools}+ {language === 'nl' ? 'integraties' : 'integrations'}
                            </motion.div>

                            <motion.h2
                                className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 px-4"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                {language === 'nl'
                                    ? 'Werkt met je bestaande tools'
                                    : 'Works with your existing tools'}
                            </motion.h2>

                            <motion.p
                                className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4"
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
                                        className="bg-card border border-border rounded-xl p-5"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.05 * catIndex }}
                                    >
                                        <h4 className="font-semibold text-sm text-foreground mb-3 uppercase tracking-wider">
                                            {cat.category[language]}
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {cat.tools.map((tool, toolIndex) => (
                                                <span
                                                    key={toolIndex}
                                                    className="tech-badge text-xs"
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
                                    className="text-sm font-medium text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
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
                            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 sm:px-12 py-5 sm:py-6 text-base sm:text-lg rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
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
