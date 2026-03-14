import { Metadata } from "next";
import VoiceAIPage from "@/components/voice-ai/VoiceAIPage";

export const metadata: Metadata = {
  title: "AI Spraakassistent voor Bedrijven | 24/7 Klantgesprekken Automatiseren | Robin Bril",
  description: "Automatiseer 87% van klantgesprekken met onze Nederlandse AI spraakassistent. Beantwoordt binnen 2 beltonen, 24/7 bereikbaar. Geen opstartkosten. Voor MKB en enterprise. Start gratis proef.",
  keywords: "spraakassistent, stem AI, voice AI, AI telefonie, virtuele assistent, zakelijke telefonie, klantgesprekken automatiseren, AI klantenservice, voice bot, spraaktechnologie, telefoon automatisering, Nederlandse AI, zakelijke spraakassistent, 24/7 bereikbaarheid, AI receptionist, automatische telefooncentrale, conversational AI, natural language processing, NLP Nederlands, speech recognition, spraakherkenning, telefoonbot, virtuele receptionist, AI callcenter, voice automation, stem automatisering, digitale assistent, kunstmatige intelligentie telefoon, AI voor bedrijven, MKB automatisering, enterprise voice AI, SaaS telefonie, cloud telefonie, VoIP AI, telecommunicatie AI, customer service automation, klantenservice automatisering, AI oplossingen Nederland, Nederlandse spraaktechnologie, Robin Bril, Amsterdam AI bedrijf",
  authors: [{ name: "Robin Bril", url: "https://robinbril.com" }],
  creator: "Robin Bril",
  publisher: "Robin Bril",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://robinbril.com'),
  verification: {
    google: 'verification_token',
  },
  alternates: {
    canonical: "https://robinbril.com/spraakassistent",
    languages: {
      nl: "/spraakassistent",
      en: "/voiceassistant",
    },
  },
  openGraph: {
    title: "AI Spraakassistent voor Bedrijven | 24/7 Automatisering | Robin Bril",
    description: "Automatiseer 87% van klantgesprekken. Nederlandse AI spraakassistent die binnen 2 beltonen opneemt, 24/7. Geen opstartkosten. Start vandaag.",
    url: "https://robinbril.com/spraakassistent",
    siteName: "Robin Bril - AI Solutions",
    locale: "nl_NL",
    type: "website",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Robin Bril AI Spraakassistent - Automatiseer klantgesprekken",
      },
    ],
    videos: [
      {
        url: "https://robinbril.com/voice-ai/demo.mp4",
        width: 1920,
        height: 1080,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Spraakassistent | 24/7 Klantgesprekken | Robin Bril",
    description: "Automatiseer 87% van klantgesprekken met Nederlandse AI. Binnen 2 beltonen, 24/7 bereikbaar. Start gratis.",
    images: ["/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: 'technology',
};

export default function SpraakassistentPage() {
  return <VoiceAIPage lang="nl" />;
}