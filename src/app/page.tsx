import { Metadata } from "next";
import dynamic from "next/dynamic";
import Navbar from "@/components/sections/navbar";
import Hero from "@/components/sections/hero";
import CompanySlider from "@/components/sections/company-slider";
import Footer from "@/components/sections/footer";
import IntakeExplanationSection from "@/components/sections/intake-explanation-section";
import GuaranteeSection from "@/components/sections/guarantee-section";
import { generateMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/config";
import JsonLd from "@/components/seo/json-ld";
import { faqSchema, testimonialsSchema, servicesSchema, workshopSchema } from "@/lib/schema";

// Dynamic imports for below-the-fold components
const AgentOrgVisual = dynamic(() => import("@/components/sections/agent-org-visual"), {
  loading: () => <div className="min-h-[400px]" />,
});
const Services = dynamic(() => import("@/components/sections/services"), {
  loading: () => <div className="min-h-[400px]" />,
});
const Projects = dynamic(() => import("@/components/sections/projects"), {
  loading: () => <div className="min-h-[400px]" />,
});
const AIChatWidget = dynamic(() => import("@/components/ai-chat-widget"), {
  ssr: false,
});

// FAQ data aligned with actual offerings
const faqData = {
  items: [
    {
      question: "Wat doet Robin Bril?",
      answer:
        "Robin Bril bouwt digitale medewerkers: AI agents die zelfstandig werk overnemen. Van klantenservice teams tot order processing, sales agents en kennisbanken. Live in 2 weken.",
    },
    {
      question: "Hoe snel kan ik resultaat verwachten?",
      answer:
        "Na een gratis intake en quick scan lever ik binnen 2 weken een werkend prototype op jullie eigen data. Geen maandenlange trajecten. Je ziet direct wat het oplevert.",
    },
    {
      question: "Waar is Robin Bril gevestigd?",
      answer:
        "Robin Bril is gevestigd in Amstelveen en werkt met klanten door heel Nederland.",
    },
  ],
};

// Testimonials data for structured data - real references only
const testimonialsData = {
  items: [
    {
      author: "Giulio Piccolo",
      role: "Lead Engineer @ Suit Supply",
      text: "Robin werkte als data consultant mee in ons team en viel op door zijn snelle ontwikkeling en sterke basis in AI. Hij pakte zelfstandig complexe onderwerpen op en leverde waardevolle inzichten.",
    },
    {
      author: "Oeds de Meer",
      role: "Proces- & informatiemanager @ SBB",
      text: "Robin leverde continu scherpe analyses en werkte met tools als Excel, SQL en Looker. Hij herkent patronen in data, denkt analytisch en levert visuele inzichten.",
    },
    {
      author: "Laura Britton",
      role: "Project Manager Medical Affairs @ Sedgwick",
      text: "Toegewijd, behulpzaam en betrouwbaar.",
    },
  ],
};

export const metadata: Metadata = generateMetadata({
  title: "Robin Bril | Digitale Medewerkers & AI Agents voor bedrijven",
  description:
    "Robin Bril bouwt digitale medewerkers: AI agents die zelfstandig werk overnemen. Klantenservice, order processing, sales, kennisbanken. Live in 2 weken.",
  keywords:
    "digitale medewerkers, AI agents, klantenservice agent, order processing, sales agent, AI kennisbank, Robin Bril, AI oplossingen Nederland",
  pathname: "/",
});

export default function Home() {
  return (
    <>
      {/* Adding structured data for better SEO */}
      <JsonLd data={faqSchema(faqData)} />
      {/* <JsonLd data={testimonialsSchema(testimonialsData)} /> */}
      <JsonLd data={servicesSchema()} />
      <JsonLd data={workshopSchema()} />

      <main className="min-h-screen">
        <Navbar />
        <Hero />
        <CompanySlider />
        <GuaranteeSection />
        <AgentOrgVisual />
        <div id={siteConfig.sections.services.substring(1)}>
          <Services />
        </div>
        <div id={siteConfig.sections.projects.substring(1)}>
          <Projects />
        </div>
        <IntakeExplanationSection />
        <Footer />
        <AIChatWidget />
      </main>
    </>
  );
}
