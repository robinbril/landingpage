import { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/config";
import JsonLd from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/schema";
import Link from "next/link";
import { ArrowRight, CheckCircle, Calculator, Clock, Workflow, FileText, Mail, ShoppingCart } from "lucide-react";

const faqData = {
  items: [
    {
      question: "Is AI automatisering geschikt voor mijn MKB-bedrijf?",
      answer:
        "Waarschijnlijk wel. Als je team tijd besteedt aan repetitieve taken — e-mails beantwoorden, orders verwerken, gegevens invoeren, rapportages maken — dan kan AI dat werk overnemen. Tijdens de gratis intake kijken we samen waar de meeste winst zit.",
    },
    {
      question: "Wat kost AI automatisering voor een MKB-bedrijf?",
      answer:
        "Een basisautomatisering start vanaf €2.000. Complexere oplossingen met meerdere AI agents en integraties liggen tussen €5.000 en €15.000. De ROI is doorgaans binnen 1-3 maanden terugverdiend — afhankelijk van het proces dat je automatiseert.",
    },
    {
      question: "Heb ik technische kennis nodig?",
      answer:
        "Nee. Ik bouw alles, train de AI, en integreer met je bestaande systemen. Je team hoeft alleen te weten hoe ze de resultaten gebruiken — net als het inwerken van een nieuwe collega.",
    },
    {
      question: "Wat als de AI fouten maakt?",
      answer:
        "Elke AI agent heeft een escalatieprotocol. Bij twijfel escaleert de agent naar een mens. We stellen samen de drempels in: welke beslissingen mag de AI zelfstandig nemen, en waar is menselijke goedkeuring nodig.",
    },
    {
      question: "Kan ik klein beginnen?",
      answer:
        "Absoluut. De beste aanpak is één proces automatiseren, resultaten meten, en dan uitbreiden. Start met het proces dat het meeste tijd kost en het minst complex is. Dat levert het snelste bewijs.",
    },
  ],
};

export const metadata: Metadata = generateMetadata({
  title: "AI Automatisering voor MKB — Processen Slimmer Maken",
  description:
    "AI automatisering voor MKB-bedrijven. Bespaar 10-20 uur per week op repetitief werk. Van e-mail tot orderverwerking. Live in 2 weken. Gratis intake.",
  keywords:
    "AI automatisering MKB, AI voor MKB, AI automatisering bedrijf, procesautomatisering AI, AI voor kleine bedrijven, MKB automatisering, Robin Bril",
  pathname: "/diensten/ai-automatisering-mkb",
});

export default function AIAutomatiseringMKBPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqData)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "AI Automatisering voor MKB",
          description:
            "Procesautomatisering met AI voor MKB-bedrijven. Bespaar uren per week op repetitief werk.",
          provider: {
            "@type": "Person",
            name: "Robin Bril",
            url: siteConfig.url,
          },
          areaServed: { "@type": "Country", name: "Netherlands" },
          url: `${siteConfig.url}/diensten/ai-automatisering-mkb`,
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
              AI Automatisering voor MKB
            </h1>

            <p className="text-lg text-[#4a2c2a]/70 leading-relaxed mb-8 max-w-2xl">
              Je team besteedt uren per dag aan werk dat een AI in seconden kan doen. E-mails
              sorteren, orders verwerken, rapportages maken, klanten antwoorden. Laat AI het
              repetitieve werk overnemen zodat je team kan focussen op groei.
            </p>

            <Link
              href="/#ready-to-start"
              className="inline-flex items-center gap-2 bg-[#4a2c2a] hover:bg-[#3a1c1a] text-white rounded-full px-6 py-3 text-sm font-medium shadow-lg transition-all duration-300 hover:scale-[1.02] group"
            >
              Gratis intake plannen
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>

        {/* Processen die je kunt automatiseren */}
        <section className="py-16 px-4 sm:px-6 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-[#4a2c2a] mb-4">
              Welke processen kun je automatiseren?
            </h2>
            <p className="text-[#4a2c2a]/60 mb-8">
              De meeste MKB-bedrijven hebben 3-5 processen die direct geschikt zijn voor AI
              automatisering. Hier zijn de meest voorkomende:
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  icon: Mail,
                  title: "E-mail & klantvragen",
                  desc: "AI leest, categoriseert en beantwoordt e-mails. Complexe vragen worden automatisch geëscaleerd. Bespaart 2-4 uur per dag.",
                  saving: "2-4 uur/dag",
                },
                {
                  icon: ShoppingCart,
                  title: "Order processing",
                  desc: "Bestellingen automatisch verwerken, voorraad checken, bevestigingen sturen. Van ontvangst tot verwerking in seconden.",
                  saving: "3-5 uur/dag",
                },
                {
                  icon: FileText,
                  title: "Document verwerking",
                  desc: "Facturen, offertes en contracten automatisch uitlezen, categoriseren en verwerken in je administratie.",
                  saving: "1-3 uur/dag",
                },
                {
                  icon: Workflow,
                  title: "Rapportages & analyses",
                  desc: "Automatische dagelijkse, wekelijkse of maandelijkse rapportages uit je data. Geen handmatig Excel-werk meer.",
                  saving: "3-5 uur/week",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl border border-[#4a2c2a]/8 bg-[#fdf2e9]/40"
                >
                  <div className="flex items-center justify-between mb-3">
                    <item.icon className="h-5 w-5 text-[#e67e22]" />
                    <span className="text-[10px] font-bold text-[#e67e22] bg-[#e67e22]/10 px-2 py-0.5 rounded-full">
                      Besparing: {item.saving}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-[#4a2c2a] mb-1">{item.title}</h3>
                  <p className="text-xs text-[#4a2c2a]/60 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Aanpak */}
        <section className="py-16 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-[#4a2c2a] mb-8">
              Hoe ik AI automatisering aanpak voor MKB
            </h2>

            <div className="space-y-6">
              {[
                {
                  step: "1",
                  title: "Gratis intake: waar zit de meeste winst?",
                  desc: "In 30 minuten brengen we je processen in kaart. Welk werk kost de meeste tijd? Waar zitten fouten? Ik identificeer de top 3 processen met de hoogste ROI.",
                },
                {
                  step: "2",
                  title: "Quick win eerst",
                  desc: "We starten met het proces dat het meest oplevert en het minst risicovol is. Binnen 2 weken draait een werkend prototype op je eigen data.",
                },
                {
                  step: "3",
                  title: "Meten en uitbreiden",
                  desc: "We meten de resultaten: hoeveel uur bespaard, hoeveel fouten voorkomen, wat is de ROI? Op basis daarvan breiden we uit naar de volgende processen.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#e67e22] text-white flex items-center justify-center text-sm font-bold">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#4a2c2a] mb-1">{item.title}</h3>
                    <p className="text-sm text-[#4a2c2a]/60 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ROI Calculator teaser */}
        <section className="py-16 px-4 sm:px-6 bg-white">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-start gap-4 p-6 rounded-2xl border border-[#e67e22]/20 bg-[#e67e22]/5">
              <Calculator className="h-8 w-8 text-[#e67e22] flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-[#4a2c2a] mb-2">
                  Bereken je besparing
                </h3>
                <p className="text-sm text-[#4a2c2a]/60 mb-4">
                  Op de homepage vind je de ROI Scanner — vul je teamgrootte en uurtarief in en
                  zie direct hoeveel een AI automatisering je oplevert per maand.
                </p>
                <Link
                  href="/#services"
                  className="text-sm font-medium text-[#e67e22] hover:text-[#4a2c2a] transition-colors inline-flex items-center gap-1"
                >
                  Naar de ROI Scanner
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
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

        {/* Gerelateerd */}
        <section className="py-12 px-4 sm:px-6 bg-[#fdf2e9]/50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-lg font-bold text-[#4a2c2a] mb-4">Gerelateerde artikelen</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link href="/blog/wat-kost-ai-agent" className="block p-4 bg-white rounded-xl border border-[#4a2c2a]/8 hover:border-[#e67e22]/40 transition-colors">
                <p className="text-sm font-bold text-[#4a2c2a]">Wat Kost een AI Agent?</p>
                <p className="text-xs text-[#4a2c2a]/60 mt-1">Eerlijk kostenoverzicht voor MKB</p>
              </Link>
              <Link href="/blog/ai-readiness-check-mkb" className="block p-4 bg-white rounded-xl border border-[#4a2c2a]/8 hover:border-[#e67e22]/40 transition-colors">
                <p className="text-sm font-bold text-[#4a2c2a]">Is Jouw Bedrijf Klaar voor AI?</p>
                <p className="text-xs text-[#4a2c2a]/60 mt-1">De eerlijke AI-readiness check</p>
              </Link>
            </div>
            <div className="mt-4 flex gap-4 text-xs">
              <Link href="/diensten/ai-agent-bouwen" className="text-[#e67e22] hover:underline">AI Agent Bouwen →</Link>
              <Link href="/diensten/digitale-medewerker" className="text-[#e67e22] hover:underline">Digitale Medewerker →</Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 sm:px-6 bg-[#4a2c2a]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">
              Start met AI automatisering
            </h2>
            <p className="text-white/70 mb-8 max-w-lg mx-auto">
              Plan een gratis intake van 30 minuten. Ik breng je processen in kaart en geef
              eerlijk advies over waar AI het meeste oplevert voor jouw bedrijf.
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
