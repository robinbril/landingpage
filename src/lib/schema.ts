import { siteConfig } from "./config";

type OrganizationProps = {
  name?: string;
  url?: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
};

type WebsiteProps = {
  url?: string;
  name?: string;
  description?: string;
  language?: string;
};

type BreadcrumbItemProps = {
  position: number;
  name: string;
  item: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItemProps[];
};

type BlogPostProps = {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  authorName: string;
  authorUrl?: string;
  image?: string;
  url: string;
};

type ProductProps = {
  name: string;
  description: string;
  image: string;
  url: string;
  price?: string;
  priceCurrency?: string;
  availability?: "InStock" | "OutOfStock" | "PreOrder";
  sku?: string;
  brand?: string;
  reviewCount?: number;
  reviewRating?: number;
};

type FAQItemProps = {
  question: string;
  answer: string;
};

type FAQProps = {
  items: FAQItemProps[];
};

type TestimonialProps = {
  author: string;
  role: string;
  text: string;
  organization?: string;
};

type TestimonialsProps = {
  items: TestimonialProps[];
};

type AutomationAchievementProps = {
  totalAutomations: number;
  aiAutomationPercentage: number;
  industriesServed: number;
  uptime: number;
};

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteConfig.url}/#person`,
    name: "Robin Bril",
    jobTitle: "Senior AI Engineer",
    description: siteConfig.description,
    url: siteConfig.url,
    image: `${siteConfig.url}/images/contact/robin.jpeg`,
    sameAs: [
      siteConfig.socials.linkedin,
      siteConfig.socials.github,
      siteConfig.socials.twitter,
    ],
    worksFor: {
      "@type": "Organization",
      name: "Fellowmind",
    },
    knowsAbout: [
      "AI Agents",
      "Multi-agent Systems",
      "RAG",
      "LLM Integration",
      "MCP Servers",
      "Process Automation",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Amstelveen",
      addressCountry: "NL",
    },
  };
}

export const servicesSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "Service",
        name: "AI Agent Development",
        description:
          "Custom AI agents that work between your team — automating operations, customer service, and knowledge management.",
        provider: {
          "@type": "Person",
          name: "Robin Bril",
          url: siteConfig.url,
        },
      },
      {
        "@type": "Service",
        name: "Process Automation",
        description:
          "End-to-end automation of business processes using multi-agent AI systems and MCP integrations.",
        provider: {
          "@type": "Person",
          name: "Robin Bril",
          url: siteConfig.url,
        },
      },
      {
        "@type": "Service",
        name: "RAG & Knowledge Systems",
        description:
          "Retrieval-augmented generation systems that make your company knowledge searchable and actionable.",
        provider: {
          "@type": "Person",
          name: "Robin Bril",
          url: siteConfig.url,
        },
      },
    ],
  };
};

export function videoSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": "AI Agent Demo",
    "description": "Watch an intelligent AI agent in action — one of many solutions that can be customized for your specific business needs.",
    "thumbnailUrl": `${siteConfig.url}/demo-vid-thumbnail.jpg`,
    "uploadDate": "2024-05-01T08:00:00+08:00",
    "duration": "PT1M",
    "contentUrl": `${siteConfig.url}/demo-vid.mp4`,
    "embedUrl": `${siteConfig.url}/#demo`,
    "potentialAction": {
      "@type": "SeekToAction",
      "target": `${siteConfig.url}/#demo{seek_to_second_number}`,
      "startOffset-input": "required name=seek_to_second_number"
    },
    "publisher": {
      "@type": "Person",
      "name": "Robin Bril",
      "url": siteConfig.url,
    }
  };
}

export function organizationSchema({
  name = siteConfig.name,
  url = siteConfig.url,
  logo = `${siteConfig.url}${siteConfig.logoUrl}`,
  description = siteConfig.description,
  sameAs = [
    siteConfig.socials.twitter,
    siteConfig.socials.linkedin,
    siteConfig.socials.github,
  ],
}: OrganizationProps = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo,
    description,
    sameAs,
  };
}

export function websiteSchema({
  url = siteConfig.url,
  name = siteConfig.name,
  description = siteConfig.description,
  language = `${siteConfig.locale}-NL`,
}: WebsiteProps = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url,
    name,
    description,
    inLanguage: language,
  };
}

export function breadcrumbSchema({ items }: BreadcrumbProps) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(({ position, name, item }) => ({
      "@type": "ListItem",
      position,
      name,
      item,
    })),
  };
}

export function blogPostSchema({
  title,
  description,
  publishedAt,
  updatedAt,
  authorName,
  authorUrl = siteConfig.url,
  image = `${siteConfig.url}/og-image.jpg`,
  url,
}: BlogPostProps) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    image,
    url,
    datePublished: publishedAt,
    dateModified: updatedAt || publishedAt,
    author: {
      "@type": "Person",
      name: authorName,
      url: authorUrl,
    },
    publisher: {
      "@type": "Person",
      name: "Robin Bril",
      url: siteConfig.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}

export function productSchema({
  name,
  description,
  image,
  url,
  price,
  priceCurrency = "EUR",
  availability = "InStock",
  sku,
  brand = "Robin Bril",
  reviewCount,
  reviewRating,
}: ProductProps) {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image,
    sku,
    brand: {
      "@type": "Brand",
      name: brand,
    },
    offers: {
      "@type": "Offer",
      url,
      availability: `https://schema.org/${availability}`,
      priceCurrency,
    },
  };

  if (price) {
    schema.offers.price = price;
  }

  if (reviewCount && reviewRating) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: reviewRating,
      reviewCount,
    };
  }

  return schema;
}

export function faqSchema({ items }: FAQProps) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
}

export function testimonialsSchema({ items }: TestimonialsProps) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: item.author,
          jobTitle: item.role,
        },
        reviewBody: item.text,
        itemReviewed: {
          "@type": "Person",
          name: siteConfig.name,
          url: siteConfig.url,
          description: "AI Engineer — Digitale medewerkers die je team versterken",
        },
        reviewRating: {
          "@type": "Rating",
          bestRating: "5",
          ratingValue: "5",
          worstRating: "1",
        },
        datePublished: new Date().toISOString(),
      },
    })),
  };
}

export function workshopSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalEvent",
    name: "AI Agent Workshop by Robin Bril",
    description: "Hands-on workshop over AI agents, multi-agent systemen, en procesautomatisering. Leer hoe je digitale medewerkers bouwt voor je organisatie.",
    url: `${siteConfig.url}${siteConfig.sections.workshop}`,
    organizer: {
      "@type": "Person",
      name: "Robin Bril",
      url: siteConfig.url,
    },
    location: {
      "@type": "Place",
      name: "Online & Amsterdam",
      address: {
        "@type": "PostalAddress",
        addressCountry: "NL",
        addressLocality: "Amsterdam",
      },
    },
    eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      validFrom: new Date().toISOString(),
    },
    about: [
      { "@type": "Thing", name: "AI Agents" },
      { "@type": "Thing", name: "Process Automation" },
      { "@type": "Thing", name: "Multi-agent Systems" },
    ],
  };
}

export function voiceAIServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.url}/spraakassistent#service`,
    name: "AI Spraakassistent voor Bedrijven",
    alternateName: ["Voice AI", "Spraakassistent", "AI Telefonie", "Voice Assistant"],
    description: "24/7 AI spraakassistent die klantgesprekken automatiseert. Beantwoordt binnen 2 beltonen, vermindert gesprekvolume met 87%, en integreert met bestaande systemen.",
    url: `${siteConfig.url}/spraakassistent`,
    image: `${siteConfig.url}/images/logo.png`,
    serviceType: "AI Voice Automation",
    provider: {
      "@type": "Person",
      "@id": `${siteConfig.url}/#person`,
      name: "Robin Bril",
      url: siteConfig.url,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Amstelveen",
        addressCountry: "NL"
      },
    },
    areaServed: {
      "@type": "Country",
      name: "Netherlands"
    },
  };
}
