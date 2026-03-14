import { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/config";
import JsonLd from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/schema";
import Link from "next/link";
import { ArrowRight, Users, TrendingUp, Clock, Brain, CheckCircle, BarChart3 } from "lucide-react";

const faqData = {
  items: [
    {
      question: "Wat is een digitale medewerker?",
      answer:
        "Een digitale medewerker is een AI agent die dezelfde taken uitvoert als een menselijke collega — maar dan 24/7, foutloos en schaalbaar. Denk aan e-mails beantwoorden, orders verwerken, documenten analyseren of klanten helpen. Het verschil met een chatbot: een digitale medewerker handelt zelfstandig af, in plaats van alleen vragen beantwoorden.",
    },
    {
      question: "Vervangt een digitale medewerker mijn team?",
      answer:
        "Nee. Een digitale medewerker neemt repetitief werk over zodat je team zich kan focussen op werk dat er echt toe doet: complexe problemen, klantrelaties, strategie. Het is een versterking, geen vervanging.",
    },
    {
      question: "Wat kost een digitale medewerker?",
      answer:
        "Een digitale medewerker kost een fractie van een FTE. Geen salariskosten, geen vakantiedagen, geen ziekteverzuim. De investering start vanaf €3.000 voor een basisagent. De ROI is vaak binnen 1-2 maanden terugverdiend.",
    },
    {
      question: "Hoe leert een digitale medewerker mijn processen?",
      answer:
        "Ik train de agent op jouw eigen data: handleidingen, e-mails, tickets, documenten. De agent leert jouw werkwijze, jouw toon en jouw regels. Daarna monitoren we samen de prestaties en finetunen waar nodig.",
    },
    {
      question: "Kan ik een digitale medewerker eerst proberen?",
      answer:
        "Ja. Na een gratis intake bouw ik een werkend prototype op jouw data. Je ervaart direct hoe het werkt, welke taken hij overneemt en wat het oplevert. Pas daarna beslis je.",
    },
  ],
};

export const metadata: Metadata = generateMetadata({
  title: "Digitale Medewerker — AI die Werkt als een Collega",
  description:
    "Een digitale medewerker die 24/7 werkt, foutloos schaalt en je team versterkt. Gebouwd op jouw data en processen. Live in 2 weken. Robin Bril — AI Engineer.",
  keywords:
    "digitale medewerker, digitale medewerker AI, AI medewerker, virtuele medewerker, AI werknemer, digitale collega, AI voor bedrijf, Robin Bril",
  pathname: "/diensten/digitale-medewerker",
});

export default function DigitaleMedewerkerPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqData)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Digitale Medewerker",
          description:
            "AI agents die werken als een collega — 24/7, foutloos, schaalbaar. Gebouwd op jouw data.",
          provider: {
            "@type": "Person",
            name: "Robin Bril",
            url: siteConfig.url,
          },
          areaServed: { "@type": "Country", name: "Netherlands" },
          url: `${siteConfig.url}/diensten/digitale-medewerker`,
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
              Digitale Medewerker
            </h1>

            <p className="text-lg text-[#4a2c2a]/70 leading-relaxed mb-8 max-w-2xl">
              Stel je voor: een medewerker die nooit ziek is, geen vakantie nodig heeft, en 24/7
              foutloos werk aflevert. Dat is een digitale medewerker — een AI agent die écht
              meewerkt in je team.
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

        {/* Vergelijking */}
        <section className="py-16 px-4 sm:px-6 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-[#4a2c2a] mb-8">
              Digitale medewerker vs. traditionele oplossingen
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#4a2c2a]/10">
                    <th className="text-left py-3 pr-4 text-[#4a2c2a]/50 font-medium" />
                    <th className="text-left py-3 px-4 text-[#4a2c2a] font-bold">Digitale medewerker</th>
                    <th className="text-left py-3 px-4 text-[#4a2c2a]/50 font-medium">Chatbot</th>
                    <th className="text-left py-3 px-4 text-[#4a2c2a]/50 font-medium">Extra FTE</th>
                  </tr>
                </thead>
                <tbody className="text-[#4a2c2a]/70">
                  {[
                    ["Zelfstandig beslissingen nemen", "✓", "✗", "✓"],
                    ["24/7 beschikbaar", "✓", "✓", "✗"],
                    ["Schaalt zonder extra kosten", "✓", "±", "✗"],
                    ["Integreert met bestaande systemen", "✓", "±", "✓"],
                    ["Leert van jouw data", "✓", "✗", "✓"],
                    ["Maandkosten", "Laag", "Laag", "€3.000-6.000+"],
                    ["Live in", "2 weken", "1 week", "3-6 maanden"],
                  ].map(([label, dm, cb, fte], i) => (
                    <tr key={i} className="border-b border-[#4a2c2a]/5">
                      <td className="py-2.5 pr-4 text-xs text-[#4a2c2a]/80 font-medium">{label}</td>
                      <td className="py-2.5 px-4 text-xs font-bold text-[#e67e22]">{dm}</td>
                      <td className="py-2.5 px-4 text-xs">{cb}</td>
                      <td className="py-2.5 px-4 text-xs">{fte}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Toepassingen */}
        <section className="py-16 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-[#4a2c2a] mb-8">
              Waar zet je een digitale medewerker in?
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  icon: Users,
                  title: "Klantenservice",
                  desc: "Beantwoordt vragen, verwerkt klachten, escaleert complexe cases. Consistent en 24/7.",
                },
                {
                  icon: BarChart3,
                  title: "Sales & Lead Qualification",
                  desc: "Kwalificeert leads, beantwoordt productvragen, plant afspraken in je CRM.",
                },
                {
                  icon: Brain,
                  title: "Kennismanagement",
                  desc: "Maakt je interne kennis doorzoekbaar. Collega's krijgen direct het juiste antwoord.",
                },
                {
                  icon: TrendingUp,
                  title: "Operations & Logistiek",
                  desc: "Verwerkt orders, checkt voorraad, stuurt updates. Handelt uitzonderingen zelfstandig af.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl border border-[#4a2c2a]/8 bg-white"
                >
                  <item.icon className="h-5 w-5 text-[#e67e22] mb-3" />
                  <h3 className="text-sm font-bold text-[#4a2c2a] mb-1">{item.title}</h3>
                  <p className="text-xs text-[#4a2c2a]/60 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ROI */}
        <section className="py-16 px-4 sm:px-6 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-[#4a2c2a] mb-8">
              De business case
            </h2>

            <p className="text-[#4a2c2a]/70 leading-relaxed mb-6">
              Een gemiddelde klantenservice-medewerker kost €35.000-€45.000 per jaar inclusief
              werkgeverslasten. Een digitale medewerker die 60-80% van het repetitieve werk
              overneemt, kost een fractie daarvan. De ROI is meetbaar vanaf dag één.
            </p>

            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { value: "60-80%", label: "minder repetitief werk" },
                { value: "<2 weken", label: "van intake tot live" },
                { value: "24/7", label: "beschikbaar" },
              ].map((stat, i) => (
                <div key={i} className="text-center p-4 rounded-xl bg-[#fdf2e9]">
                  <div className="text-xl font-black text-[#e67e22]">{stat.value}</div>
                  <div className="text-[10px] text-[#4a2c2a]/60 mt-1">{stat.label}</div>
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
              Je eerste digitale medewerker in 2 weken
            </h2>
            <p className="text-white/70 mb-8 max-w-lg mx-auto">
              Plan een gratis intake. Ik bekijk welk proces het meeste oplevert als digitale
              medewerker — eerlijk advies, geen verkooppraatje.
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
