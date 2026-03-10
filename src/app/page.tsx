import { Metadata } from "next";
import Navbar from "@/components/sections/navbar";
import Hero from "@/components/sections/hero";
import CompanySlider from "@/components/sections/company-slider";
import Projects from "@/components/sections/projects";
import Services from "@/components/sections/services";
// import Testimonials from "@/components/sections/testimonials";
import AgentOrgVisual from "@/components/sections/agent-org-visual";
import Footer from "@/components/sections/footer";
import AIChatWidget from "@/components/ai-chat-widget";
import IntakeExplanationSection from "@/components/sections/intake-explanation-section";
// import GuaranteeSection from "@/components/sections/guarantee-section";
import { generateMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/config";
import JsonLd from "@/components/seo/json-ld";
import { faqSchema, testimonialsSchema, servicesSchema, workshopSchema } from "@/lib/schema";

// FAQ data aligned with actual offerings
const faqData = {
  items: [
    {
      question: "Wat doet Robin Bril / Virelio?",
      answer:
        "Robin Bril bouwt digitale medewerkers: AI agents die zelfstandig werk overnemen. Van klantenservice teams tot order processing, sales agents en kennisbanken. Live in 2 weken.",
    },
    {
      question: "Hoe snel kan ik resultaat verwachten?",
      answer:
        "Na een gratis intake en quick scan lever ik binnen 2 weken een werkend prototype op jullie eigen data. Geen maandenlange trajecten — je ziet direct wat het oplevert.",
    },
    {
      question: "Waar is Virelio gevestigd?",
      answer:
        "Virelio is gevestigd in Amstelveen en werkt met klanten door heel Nederland.",
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
    "digitale medewerkers, AI agents, klantenservice agent, order processing, sales agent, AI kennisbank, Robin Bril, Virelio, AI oplossingen Nederland",
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
        {/* GuaranteeSection removed */}
        <AgentOrgVisual />
        <div id={siteConfig.sections.services.substring(1)}>
          <Services />
        </div>
        <div id={siteConfig.sections.projects.substring(1)}>
          <Projects />
        </div>
        {/* Testimonials section removed */}
        <IntakeExplanationSection />


        <Footer />
        <AIChatWidget />
      </main>
    </>
  );
}
