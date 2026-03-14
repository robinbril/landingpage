import { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/config";
import JsonLd from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/schema";
import Link from "next/link";
import { ArrowRight, Clock, Zap, Shield, Bot, CheckCircle, MessageCircle } from "lucide-react";

const faqData = {
  items: [
    {
      question: "Wat kost het om een AI agent te laten bouwen?",
      answer:
        "De kosten hangen af van de complexiteit. Een eenvoudige klantenservice-agent start vanaf €3.000. Complexere multi-agent systemen met integraties liggen tussen €5.000 en €15.000. Na een gratis intake krijg je een concrete offerte.",
    },
    {
      question: "Hoe lang duurt het om een AI agent te bouwen?",
      answer:
        "Gemiddeld 2 weken van intake tot live productie. Week 1: intake, data-analyse en prototype. Week 2: testen, finetunen en live zetten. Geen maandenlange trajecten.",
    },
    {
      question: "Welke systemen kan een AI agent integreren?",
      answer:
        "Vrijwel alles: CRM (HubSpot, Salesforce), ERP, e-mail, Slack, Teams, databases, API's, en meer. Via MCP-servers en custom integraties sluit de agent aan op je bestaande werkwijze.",
    },
    {
      question: "Wat is het verschil tussen een AI agent en een chatbot?",
      answer:
        "Een chatbot volgt vaste scripts en beantwoordt vooraf geprogrammeerde vragen. Een AI agent denkt zelfstandig mee, neemt beslissingen, voert acties uit in andere systemen, en leert van interacties. Het is het verschil tussen een FAQ-pagina en een slimme medewerker.",
    },
    {
      question: "Kan ik de AI agent eerst testen voordat ik betaal?",
      answer:
        "Ja. Na de gratis intake bouw ik een werkend prototype op jullie eigen data. Je ziet direct wat het oplevert voordat je beslist om door te gaan.",
    },
  ],
};

export const metadata: Metadata = generateMetadata({
  title: "AI Agent Laten Bouwen — Maatwerk AI Agents",
  description:
    "Laat een AI agent bouwen die zelfstandig werk overneemt. Van klantenservice tot order processing. Live in 2 weken. Gratis intake. Robin Bril — AI Engineer.",
  keywords:
    "AI agent laten bouwen, AI agent laten maken, AI agent bouwen, maatwerk AI agent, AI agent Nederland, AI agent Amsterdam, AI agent voor bedrijf",
  pathname: "/diensten/ai-agent-bouwen",
});

function scrollLink(href: string, label: string) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 bg-[#4a2c2a] hover:bg-[#3a1c1a] text-white rounded-full px-6 py-3 text-sm font-medium shadow-lg transition-all duration-300 hover:scale-[1.02] group"
    >
      {label}
      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
    </Link>
  );
}

export default function AIAgentBouwenPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqData)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "AI Agent Laten Bouwen",
          description:
            "Maatwerk AI agents die zelfstandig werk overnemen. Van klantenservice tot operations.",
          provider: {
            "@type": "Person",
            name: "Robin Bril",
            url: siteConfig.url,
          },
          areaServed: { "@type": "Country", name: "Netherlands" },
          url: `${siteConfig.url}/diensten/ai-agent-bouwen`,
        }}
      />

      <main className="min-h-screen bg-[#fdf2e9]">
        {/* Hero */}
        <section className="pt-24 pb-16 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/"
              className="text-sm text-[#e67e22] hover:text-[#4a2c2a] transition-colors mb-8 inline-block"
            >
              ← Terug naar home
            </Link>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#4a2c2a] leading-tight mb-6">
              AI Agent Laten Bouwen
            </h1>

            <p className="text-lg text-[#4a2c2a]/70 leading-relaxed mb-8 max-w-2xl">
              Een AI agent is geen chatbot. Het is een digitale medewerker die zelfstandig taken
              uitvoert, beslissingen neemt en acties onderneemt in je bestaande systemen. Ik bouw
              ze op maat — live in 2 weken.
            </p>

            {scrollLink("/#ready-to-start", "Gratis intake plannen")}
          </div>
        </section>

        {/* Wat doet een AI agent */}
        <section className="py-16 px-4 sm:px-6 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-[#4a2c2a] mb-8">
              Wat doet een AI agent precies?
            </h2>

            <p className="text-[#4a2c2a]/70 leading-relaxed mb-6">
              Een AI agent gaat verder dan automatisering. Waar een traditionele automatisering
              vaste stappen volgt, kan een AI agent context begrijpen, zelfstandig beslissingen
              nemen en complexe taken afhandelen — net als een menselijke medewerker.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                {
                  icon: MessageCircle,
                  title: "Klantenservice Agent",
                  desc: "Beantwoordt klantvragen, escaleert waar nodig, verwerkt retourzendingen en updates automatisch in je CRM.",
                },
                {
                  icon: Zap,
                  title: "Order Processing Agent",
                  desc: "Verwerkt bestellingen, checkt voorraad, stuurt bevestigingen en handelt uitzonderingen zelfstandig af.",
                },
                {
                  icon: Bot,
                  title: "Kennisbank Agent",
                  desc: "Doorzoekt al je documenten, handleidingen en wiki's. Geeft collega's direct het juiste antwoord.",
                },
                {
                  icon: Shield,
                  title: "Compliance Agent",
                  desc: "Controleert documenten op regelgeving, signaleert risico's en genereert audit-rapportages automatisch.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl border border-[#4a2c2a]/8 bg-[#fdf2e9]/40"
                >
                  <item.icon className="h-5 w-5 text-[#e67e22] mb-3" />
                  <h3 className="text-sm font-bold text-[#4a2c2a] mb-1">{item.title}</h3>
                  <p className="text-xs text-[#4a2c2a]/60 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <p className="text-[#4a2c2a]/70 leading-relaxed">
              Elke agent wordt gebouwd op jouw data, geïntegreerd met jouw systemen, en getraind
              op jouw processen. Geen generieke templates — maatwerk dat direct waarde levert.
            </p>
          </div>
        </section>

        {/* Hoe het werkt */}
        <section className="py-16 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-[#4a2c2a] mb-8">
              Hoe werkt het?
            </h2>

            <div className="space-y-6">
              {[
                {
                  icon: Clock,
                  step: "Week 0",
                  title: "Gratis intake & quick scan",
                  desc: "In een gesprek van 30 minuten brengen we je proces in kaart. Welk werk kost te veel tijd? Waar zitten de bottlenecks? Ik geef direct een eerlijk advies of een AI agent hier de juiste oplossing is.",
                },
                {
                  step: "Week 1",
                  title: "Prototype op jouw data",
                  desc: "Ik bouw een werkend prototype dat je eigen data gebruikt. Je ziet direct hoe de agent werkt, welke beslissingen hij neemt en hoe hij integreert met je systemen. Geen PowerPoint — een werkend product.",
                },
                {
                  step: "Week 2",
                  title: "Testen, finetunen, live",
                  desc: "We testen de agent met echte scenario's, finetunen de beslissingslogica en zetten hem live in productie. Inclusief monitoring dashboard zodat je ziet wat de agent doet.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-16 text-center">
                    <span className="text-xs font-bold text-[#e67e22]">{item.step}</span>
                  </div>
                  <div className="pb-6 border-l-2 border-[#e67e22]/20 pl-6">
                    <h3 className="text-base font-bold text-[#4a2c2a] mb-1">{item.title}</h3>
                    <p className="text-sm text-[#4a2c2a]/60 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Waarom Robin Bril */}
        <section className="py-16 px-4 sm:px-6 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-[#4a2c2a] mb-8">
              Waarom een AI agent laten bouwen door Robin Bril?
            </h2>

            <div className="space-y-4">
              {[
                "200+ productie deploys — geen experimenten, bewezen aanpak",
                "Ervaring bij Capgemini, Ministerie van Defensie en Fellowmind",
                "Van intake tot live in 2 weken, niet in maanden",
                "Maatwerk, geen templates — gebouwd op jouw data en processen",
                "Transparante communicatie, directe lijn met de bouwer",
                "Multi-agent systemen, RAG, MCP-servers — de nieuwste technologie",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-[#e67e22] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-[#4a2c2a]/80">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-[#4a2c2a] mb-8">
              Veelgestelde vragen
            </h2>

            <div className="space-y-4">
              {faqData.items.map((faq, i) => (
                <details
                  key={i}
                  className="group bg-white rounded-xl border border-[#4a2c2a]/8 overflow-hidden"
                >
                  <summary className="cursor-pointer px-5 py-4 text-sm font-bold text-[#4a2c2a] list-none flex items-center justify-between">
                    {faq.question}
                    <span className="text-[#e67e22] group-open:rotate-45 transition-transform text-lg">+</span>
                  </summary>
                  <div className="px-5 pb-4">
                    <p className="text-sm text-[#4a2c2a]/60 leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 sm:px-6 bg-[#4a2c2a]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">
              Klaar om een AI agent te laten bouwen?
            </h2>
            <p className="text-white/70 mb-8 max-w-lg mx-auto">
              Plan een gratis intake van 30 minuten. Ik bekijk of een AI agent het juiste is
              voor jouw situatie — eerlijk advies, geen verkooppraatje.
            </p>
            <Link
              href="/#ready-to-start"
              className="inline-flex items-center gap-2 bg-[#e67e22] hover:bg-[#d4711d] text-white rounded-full px-8 py-4 text-sm font-medium shadow-lg transition-all duration-300 hover:scale-[1.02] group"
            >
              Plan gratis intake
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
