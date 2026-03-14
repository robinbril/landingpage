import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { LanguageProvider } from "@/lib/i18n/language-context";
import BackgroundEffect from "@/components/layout/background";
import JsonLd from "@/components/seo/json-ld";
import { organizationSchema, websiteSchema, personSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/config";
import dynamic from 'next/dynamic';
import GoogleAnalytics from "@/components/seo/google-analytics";

// Using Inter font with configuration to mimic Apple's typography
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

// Import client components with no SSR
const ClientPolicyRoutes = dynamic(
  () => import('@/components/hash-router/client-policy-routes'),
  { ssr: false }
);


const ClientCookieConsent = dynamic(
  () => import('@/components/ui/client-cookie-consent').then(mod => mod.ClientCookieConsent),
  { ssr: false }
);

export const viewport: Viewport = {
  themeColor: "#fdf2e9",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
};

export const metadata: Metadata = {
  title: {
    default: "Robin Bril — AI Engineer | Digitale Medewerkers & AI Agents",
    template: "%s | Robin Bril"
  },
  description:
    "Robin Bril bouwt digitale medewerkers. AI agents die tussen je team werken — van klantenservice tot operations. 200+ productie deploys. Amsterdam.",
  keywords: siteConfig.keywords.join(", "),
  authors: [{ name: "Robin Bril" }],
  creator: "Robin Bril",
  publisher: "Robin Bril",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: siteConfig.url,
    languages: {
      "nl-NL": siteConfig.url,
      "en-US": `${siteConfig.url}/en`,
    },
  },
  verification: {
    google: "OoR4F5J0KosTWrpE-QjWBy1hU4_EoQB4-HjTi0a-xFk",
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    alternateLocale: ["en_US"],
    url: siteConfig.url,
    siteName: "Robin Bril — AI Engineer",
    title: "Robin Bril — AI Engineer | Digitale Medewerkers & AI Agents",
    description:
      "Robin Bril bouwt digitale medewerkers. AI agents die tussen je team werken. 200+ productie deploys. Van intake tot live in 2 weken.",
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
    title: "Robin Bril — AI Engineer | Digitale Medewerkers",
    description: "AI agents die tussen je team werken. 200+ productie deploys. Van intake tot live in 2 weken.",
    site: "@robinbril",
    creator: "@robinbril",
    images: [`${siteConfig.url}/og-image.jpg`],
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
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon-57x57.png", sizes: "57x57", type: "image/png" },
      { url: "/apple-icon-60x60.png", sizes: "60x60", type: "image/png" },
      { url: "/apple-icon-72x72.png", sizes: "72x72", type: "image/png" },
      { url: "/apple-icon-76x76.png", sizes: "76x76", type: "image/png" },
      { url: "/apple-icon-114x114.png", sizes: "114x114", type: "image/png" },
      { url: "/apple-icon-120x120.png", sizes: "120x120", type: "image/png" },
      { url: "/apple-icon-144x144.png", sizes: "144x144", type: "image/png" },
      { url: "/apple-icon-152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/apple-icon-180x180.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "icon",
        url: "/android-icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      { rel: "manifest", url: "/manifest.json" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Robin Bril",
  },
  other: {
    "msapplication-TileColor": "#fdf2e9",
    "msapplication-TileImage": "/ms-icon-144x144.png",
    "mobile-web-app-capable": "yes",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <JsonLd data={personSchema()} />
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        <GoogleAnalytics />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <LanguageProvider>
            <BackgroundEffect />
            {children}
            {/* Hash routing for policy pages */}
            <ClientPolicyRoutes />

            {/* Cookie consent banner */}
            <ClientCookieConsent />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
