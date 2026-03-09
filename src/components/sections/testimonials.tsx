"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/language-context";

interface Testimonial {
  id: number;
  name: string;
  role: {
    en: string;
    nl: string;
  };
  image: string;
  content: {
    en: string;
    nl: string;
  };
}

export default function Testimonials() {
  const { language } = useLanguage();

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Giulio Piccolo",
      role: {
        en: "Lead Engineer @ Suit Supply",
        nl: "Lead Engineer @ Suit Supply",
      },
      image: "/images/references/giulio.jpeg",
      content: {
        en: "Robin worked as a data consultant in our team and stood out for his rapid development and strong foundation in AI. He independently tackled complex topics and delivered valuable insights.",
        nl: "Robin werkte als data consultant mee in ons team en viel op door zijn snelle ontwikkeling en sterke basis in AI. Hij pakte zelfstandig complexe onderwerpen op en leverde waardevolle inzichten.",
      },
    },
    {
      id: 2,
      name: "Oeds de Meer",
      role: {
        en: "Process & Information Manager @ SBB",
        nl: "Proces- & informatiemanager @ SBB",
      },
      image: "https://media.licdn.com/dms/image/v2/C4D03AQH9Ry0bTSuBUw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1631524405789?e=1749081600&v=beta&t=mDsXjGK-Ji14bo5JFSlLtKWxkOxQAYlpFDJSw-NR2gs",
      content: {
        en: "Robin consistently delivered sharp analyses and worked with tools like Excel, SQL, and Looker. He recognizes patterns in data, thinks analytically, and provides visual insights.",
        nl: "Robin leverde continu scherpe analyses en werkte met tools als Excel, SQL en Looker. Hij herkent patronen in data, denkt analytisch en levert visuele inzichten.",
      },
    },
    {
      id: 3,
      name: "Laura Britton",
      role: {
        en: "Project Manager Medical Affairs @ Sedgwick",
        nl: "Projectmanager Medische Zaken @ Sedgwick",
      },
      image: "https://media.licdn.com/dms/image/v2/C4D03AQGkJk6PNly4Mw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1571232961900?e=1749081600&v=beta&t=ez7LJ5uCSvPdfxyUH_9hjOktsjDkfI8cvQHTTAdUNYI",
      content: {
        en: "Dedicated, helpful and reliable.",
        nl: "Toegewijd, behulpzaam en betrouwbaar.",
      },
    },
  ];

  return (
    <section className="py-10 sm:py-16 bg-background overflow-hidden" id="testimonials">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 px-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {language === 'nl' ? 'Aanbevelingen' : 'Testimonials'}
            </motion.h2>

            <motion.p
              className="text-base sm:text-lg text-muted-foreground px-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {language === 'nl'
                ? "Wat klanten en collega's over Robin zeggen"
                : "What clients and colleagues say about Robin"}
            </motion.p>
          </div>

          {/* Simple Grid Layout */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 sm:p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-lg relative overflow-hidden"
              >
                {/* Subtle accent border */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/50 to-primary/20" />

                {/* Quote */}
                <blockquote className="text-base sm:text-lg text-foreground leading-relaxed mb-6 pl-4">
                  "{language === 'nl' ? testimonial.content.nl : testimonial.content.en}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4 pt-4 border-t border-border/50 pl-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Ccircle cx='24' cy='24' r='24' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%236b7280' font-family='Arial' font-size='20' font-weight='bold'%3E${testimonial.name.charAt(0)}%3C/text%3E%3C/svg%3E`;
                    }}
                  />
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {language === 'nl' ? testimonial.role.nl : testimonial.role.en}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
