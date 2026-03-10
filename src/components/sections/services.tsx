"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useLanguage } from "@/lib/i18n/language-context";
import { scrollToSection } from "@/lib/scroll-utils";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";
import {
  Bot,
  Cog,
  TrendingUp,
  BarChart3,
  Rocket,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Brain,
  Zap,
  Clock,
  Shield,
  Users,
  Phone,
  Star,
  Check,
  Video,
  Mail,
  MessageCircle,
  Calendar
} from "lucide-react";

interface Service {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: any;
  features: string[];
  highlight: string;
  gradient: string;
}

const getServices = (language: string): Service[] => {
  return [
    {
      id: "klantenservice-agents",
      title: language === 'nl' ? 'Klantenservice Agents' : 'Customer Service Agents',
      tagline: language === 'nl' ? '80% van tickets opgelost zonder mens' : '80% of tickets resolved without humans',
      description: language === 'nl'
        ? 'Een volledig agentic team dat je klantenservice draait. Beantwoordt vragen, verwerkt retouren, escaleert alleen wanneer nodig. 24/7, in elke taal.'
        : 'A fully agentic team that runs your customer service. Answers questions, processes returns, escalates only when needed. 24/7, in any language.',
      icon: Users,
      features: [
        language === 'nl' ? 'WhatsApp, email en chat — allemaal afgedekt' : 'WhatsApp, email and chat — all covered',
        language === 'nl' ? 'Retentie-agent detecteert churn en start win-back' : 'Retention agent detects churn and starts win-back',
        language === 'nl' ? 'Review-agent verzamelt feedback na elke interactie' : 'Review agent collects feedback after every interaction'
      ],
      highlight: language === 'nl' ? 'Populair' : 'Popular',
      gradient: "from-orange-500 to-amber-500"
    },
    {
      id: "sales-agents",
      title: language === 'nl' ? 'Sales & Lead Agents' : 'Sales & Lead Agents',
      tagline: language === 'nl' ? 'Leads gekwalificeerd terwijl jij slaapt' : 'Leads qualified while you sleep',
      description: language === 'nl'
        ? 'Van inbound lead tot gepland gesprek — volledig automatisch. Kwalificeert, schrijft offertes, volgt op via mail en WhatsApp tot ze reageren.'
        : 'From inbound lead to scheduled call — fully automatic. Qualifies, writes proposals, follows up via email and WhatsApp until they respond.',
      icon: TrendingUp,
      features: [
        language === 'nl' ? 'Lead qualifying — scoort en plant meetings' : 'Lead qualifying — scores and schedules meetings',
        language === 'nl' ? 'Outbound agent — gepersonaliseerde outreach op schaal' : 'Outbound agent — personalized outreach at scale',
        language === 'nl' ? 'Offerte-agent — genereert proposals vanuit intake' : 'Proposal agent — generates proposals from intake'
      ],
      highlight: "",
      gradient: "from-amber-500 to-orange-600"
    },
    {
      id: "operations-agents",
      title: language === 'nl' ? 'Operations & Admin Agents' : 'Operations & Admin Agents',
      tagline: language === 'nl' ? 'Het werk dat niemand wil, gedaan door AI' : 'The work nobody wants, done by AI',
      description: language === 'nl'
        ? 'Order processing, facturatie, data-entry, meeting notes — alles wat je team vertraagt. AI agents die het 10x sneller en foutloos doen.'
        : 'Order processing, invoicing, data entry, meeting notes — everything slowing your team down. AI agents that do it 10x faster and error-free.',
      icon: Cog,
      features: [
        language === 'nl' ? 'Order processing — verwerkt, checkt voorraad, bevestigt' : 'Order processing — processes, checks stock, confirms',
        language === 'nl' ? 'Facturatie-agent — facturen, herinneringen, matching' : 'Invoicing agent — invoices, reminders, matching',
        language === 'nl' ? 'Data entry vanuit emails, PDFs en formulieren' : 'Data entry from emails, PDFs and forms'
      ],
      highlight: "",
      gradient: "from-orange-500 to-red-500"
    },
    {
      id: "kennisbank-agents",
      title: language === 'nl' ? 'Kennisbank & Intelligence' : 'Knowledge & Intelligence',
      tagline: language === 'nl' ? '10.000 documenten — antwoord in 3 seconden' : '10,000 documents — answer in 3 seconds',
      description: language === 'nl'
        ? 'Je hele kennisbank doorzoekbaar met AI. Compliance checks, rapportages, marktonderzoek — agents die je team slimmer maken.'
        : 'Your entire knowledge base searchable with AI. Compliance checks, reports, market research — agents that make your team smarter.',
      icon: Brain,
      features: [
        language === 'nl' ? 'Kennisbank-agent met bronvermelding, geen hallucinaties' : 'Knowledge agent with sources, no hallucinations',
        language === 'nl' ? 'Compliance-agent checkt documenten tegen regelgeving' : 'Compliance agent checks documents against regulations',
        language === 'nl' ? 'Rapportage-agent genereert wekelijkse rapporten' : 'Reporting agent generates weekly reports'
      ],
      highlight: "",
      gradient: "from-orange-600 to-amber-500"
    }
  ];
};

const Services = () => {
  const { language } = useLanguage();
  const controls = useAnimation();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const services = getServices(language);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#services') {
      const timer = setTimeout(() => {
        scrollToSection('services');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <section id="services" className="py-10 sm:py-16 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 px-4">
            {language === 'nl'
              ? <>Digitale medewerkers die <span className="text-orange-500 dark:text-orange-400">presteren</span></>
              : <>Digital employees that <span className="text-orange-500 dark:text-orange-400">perform</span></>
            }
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            {language === 'nl'
              ? '20+ agent-types beschikbaar. Dit zijn de meest gevraagde categorieën.'
              : '20+ agent types available. These are the most requested categories.'}
          </p>
        </motion.div>


        {/* Services Clean 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" ref={ref}>
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ServiceCard
                service={service}
                language={language}
                onClick={() => setSelectedService(service.id)}
                isSelected={selectedService === service.id}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Service Card Component
const ServiceCard = ({
  service,
  language,
  isLarge = false,
  isFullWidth = false,
  onClick,
  isSelected
}: {
  service: Service;
  language: string;
  isLarge?: boolean;
  isFullWidth?: boolean;
  onClick?: () => void;
  isSelected?: boolean;
}) => {
  const Icon = service.icon;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`
        relative group cursor-pointer h-full
        ${isFullWidth ? 'min-h-[280px]' : isLarge ? 'min-h-[420px]' : 'min-h-[400px]'}
      `}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background gradient - subtle */}
      <div className="absolute inset-0 rounded-2xl bg-[#e67e22]/5 group-hover:bg-[#e67e22]/10 transition-opacity duration-500" />

      {/* Card content */}
      <div className={`
        relative h-full p-5 sm:p-6 rounded-2xl border 
        ${isSelected ? 'border-primary bg-primary/5' : 'border-border/50 bg-card/50'}
        backdrop-blur-sm transition-all duration-300 hover:border-primary/50
        group-hover:border-primary/50 group-hover:shadow-xl
        ${isFullWidth ? 'flex flex-col lg:flex-row items-start gap-6 sm:gap-8' : 'flex flex-col'}
      `}>

        <div className={`${isFullWidth ? 'lg:w-1/3' : ''} flex-shrink-0`}>
          <div className="inline-flex p-3 rounded-xl mb-3">
            <Icon className="h-10 w-10 text-primary" />
          </div>

          <h3 className="text-xl sm:text-2xl font-bold mb-2 text-foreground">
            {service.title}
          </h3>

          <p className="text-sm text-primary dark:text-primary/90 font-semibold mb-3">
            {service.tagline}
          </p>

          <p className="text-foreground/80 dark:text-foreground/70 text-base leading-relaxed mb-5 min-h-[60px]">
            {service.description}
          </p>
        </div>

        <div className={`${isFullWidth ? 'lg:w-2/3' : ''} flex-grow flex flex-col justify-start`}>
          {isFullWidth && (
            <h4 className="font-semibold mb-4 text-lg text-foreground">
              {language === 'nl' ? 'Wat je krijgt' : 'What you get:'}
            </h4>
          )}
          <div className="space-y-3">
            {service.features.map((feature, idx) => (
              <motion.div
                key={idx}
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <div className="mt-0.5">
                  <Check className="h-4 w-4 text-[#e67e22]" />
                </div>
                <span className="text-sm text-foreground/70 dark:text-foreground/60">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Hover indicator */}
        <div className={`
          absolute bottom-6 ${isFullWidth ? 'right-8' : 'right-6'} 
          opacity-0 group-hover:opacity-100 transition-all duration-300
          transform group-hover:translate-x-1
        `}>
        </div>
      </div>
    </div>
  );
};

export default Services;