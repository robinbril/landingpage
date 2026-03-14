import { Metadata } from "next";
import Navbar from "@/components/sections/navbar";
import Hero from "@/components/sections/hero";
import CompanySlider from "@/components/sections/company-slider";
import Projects from "@/components/sections/projects";
import Services from "@/components/sections/services";
import Footer from "@/components/sections/footer";
import IntakeExplanationSection from "@/components/sections/intake-explanation-section";
import GuaranteeSection from "@/components/sections/guarantee-section";
import { generateMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/config";
import JsonLd from "@/components/seo/json-ld";
import { faqSchema, servicesSchema, workshopSchema } from "@/lib/schema";

const faqData = {
  items: [
    {
      question: "What does Robin Bril do?",
      answer:
        "Robin Bril builds digital employees: AI agents that autonomously take over work. From customer service to order processing, sales agents and knowledge bases. Live in 2 weeks.",
    },
    {
      question: "How fast can I expect results?",
      answer:
        "After a free intake and quick scan, I deliver a working prototype on your own data within 2 weeks. No months-long projects. You see the results immediately.",
    },
    {
      question: "Where is Robin Bril based?",
      answer:
        "Robin Bril is based in Amstelveen, Netherlands, and works with clients across the Netherlands and internationally.",
    },
  ],
};

export const metadata: Metadata = generateMetadata({
  title: "Robin Bril — AI Engineer | Digital Employees & AI Agents",
  description:
    "Robin Bril builds digital employees: AI agents that autonomously handle work. Customer service, order processing, sales, knowledge bases. Live in 2 weeks.",
  keywords:
    "digital employees, AI agents, customer service agent, order processing, sales agent, AI knowledge base, Robin Bril, AI solutions Netherlands",
  pathname: "/en",
  locale: "en",
});

export default function EnglishHome() {
  return (
    <>
      <JsonLd data={faqSchema(faqData)} />
      <JsonLd data={servicesSchema()} />
      <JsonLd data={workshopSchema()} />

      <main className="min-h-screen">
        <Navbar />
        <Hero />
        <CompanySlider />
        <GuaranteeSection />
        <div id={siteConfig.sections.services.substring(1)}>
          <Services />
        </div>
        <div id={siteConfig.sections.projects.substring(1)}>
          <Projects />
        </div>
        <IntakeExplanationSection />
        <Footer />
      </main>
    </>
  );
}
