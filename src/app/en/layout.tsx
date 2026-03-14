import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Robin Bril — AI Engineer | Digital Employees & AI Agents",
  description:
    "Robin Bril builds digital employees — AI agents that work between your teams. 200+ production deploys. From intake to live in 2 weeks.",
  keywords:
    "AI agents, digital employees, AI automation, Robin Bril, AI engineer Netherlands",
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: `${siteConfig.url}/en`,
    languages: {
      nl: siteConfig.url,
      en: `${siteConfig.url}/en`,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteConfig.url}/en`,
    siteName: "Robin Bril — AI Engineer",
    title: "Robin Bril — AI Engineer | Digital Employees & AI Agents",
    description:
      "AI agents that work between your teams. 200+ production deploys. From intake to live in 2 weeks.",
    images: [
      {
        url: `${siteConfig.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Robin Bril — AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Robin Bril — AI Engineer | Digital Employees",
    description: "AI agents that work between your teams. 200+ production deploys.",
    site: "@robinbril",
    creator: "@robinbril",
  },
};

export default function EnglishLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
