import { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import Link from "next/link";

export const metadata: Metadata = generateMetadata({
  title: "Blog — AI Agents, Automatisering & Digitale Medewerkers | Robin Bril",
  description:
    "Artikelen over AI agents, digitale medewerkers en AI automatisering voor MKB. Praktische inzichten van AI engineer Robin Bril.",
  keywords:
    "AI blog, AI agents Nederland, digitale medewerkers blog, AI automatisering artikelen, Robin Bril blog",
  pathname: "/blog",
});

// Mock blog posts data
const blogPosts = [
  {
    id: 1,
    slug: "ai-in-ecommerce",
    title: "The Future of AI in E-commerce",
    excerpt:
      "Discover how artificial intelligence is transforming the e-commerce landscape and what it means for your business.",
    date: "2025-03-15",
  },
  {
    id: 2,
    slug: "saas-development-best-practices",
    title: "Best Practices in SaaS Development",
    excerpt:
      "Learn about the most effective strategies and methodologies for building scalable SaaS applications.",
    date: "2025-03-01",
  },
  {
    id: 3,
    slug: "kyc-integration-guide",
    title: "A Comprehensive Guide to KYC Integration",
    excerpt:
      "Everything you need to know about implementing secure and efficient KYC processes in your platform.",
    date: "2025-02-15",
  },
  {
    id: 4,
    slug: "ai-agent-vs-digitale-medewerker",
    title: "AI Agent vs Digitale Medewerker: Welke Automatisering Past bij Jouw Bedrijf?",
    excerpt:
      "Ontdek het verschil tussen AI agents en digitale medewerkers en bepaal welke automatiseringsoplossing het beste bij jouw bedrijf past.",
    date: "2026-03-15",
  },
  {
    id: 5,
    slug: "ai-readiness-check-mkb",
    title: "Is Jouw Bedrijf Klaar voor AI? De Eerlijke AI-Readiness Check",
    excerpt:
      "Ontdek of jouw MKB echt klaar is voor AI. Sluit je aan bij de groeiende beweging van Nederlandse ondernemers die AI succesvol implementeren.",
    date: "2026-03-15",
  },
  {
    id: 6,
    slug: "administratie-automatiseren-ai",
    title: "Administratie Automatiseren met AI: Zo Bespaar Je 10-20 Uur per Week",
    excerpt:
      "Ontdek hoe Nederlandse MKB's administratieve bottlenecks aanpakken met AI en 10-20 uur per week besparen. Praktische voorbeelden uit logistiek, e-commerce en financiële diensten.",
    date: "2026-03-15",
  },
  {
    id: 7,
    slug: "wat-kost-ai-agent",
    title: "Wat Kost een AI Agent? Eerlijk Kostenoverzicht voor MKB",
    excerpt:
      "Ontdek de werkelijke kosten van AI-automatisering voor MKB'en. Transparante kostenoverzichten, concrete voorbeelden, WBSO-subsidies en ROI-berekeningen.",
    date: "2026-03-15",
  },
];

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="border rounded-lg overflow-hidden shadow-md"
            >
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                <h2 className="text-xl font-semibold mb-2">
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-700">{post.excerpt}</p>
                <div className="mt-4">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-blue-600 hover:underline"
                  >
                    Read more →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
