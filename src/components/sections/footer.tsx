"use client";

import React from "react";
import { motion } from "framer-motion";
import { HashLink } from "@/components/hash-router/hash-router";
import { useLanguage } from "@/lib/i18n/language-context";
import { scrollToSection, navigateFromPolicyPage } from "@/lib/scroll-utils";

export default function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <a
                href="/"
                className="flex items-center hover:opacity-80 transition"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <span className="text-2xl font-black tracking-tight">
                  Robin Bril<span className="text-primary">.</span>
                </span>
              </a>
              <p className="text-sm sm:text-base text-muted-foreground max-w-md leading-relaxed">
                {language === 'nl'
                  ? 'AI-oplossingen op maat. Kennisbanken, AI Agents en Automatiseringen. Van idee tot live in 2 weken.'
                  : 'Custom AI solutions. Knowledge bases, AI Agents, and Automations. From idea to live in 2 weeks.'}
              </p>
            </motion.div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2">
              {[
                { name: t.nav.home, href: "#" },
                { name: t.nav.projects, href: "#projects" },
                { name: t.nav.about, href: "#about" },
                { name: t.nav.contact, href: "#contact" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href.startsWith('#') ? '/' + link.href : link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      const handledPolicyNavigation = navigateFromPolicyPage(
                        link.href
                      );
                      if (!handledPolicyNavigation) {
                        if (link.href === "#") {
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        } else {
                          const sectionId = link.href.replace("#", "");
                          scrollToSection(sectionId);
                        }
                      }
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">{t.footer.legal}</h4>
            <ul className="space-y-2">
              {[
                { name: t.footer.privacyPolicy, href: "/privacy-policy" },
                { name: t.footer.termsOfService, href: "/terms-of-service" },
                { name: t.footer.cookiePolicy, href: "/cookie-policy" },
                { name: t.footer.sitemap, href: "/sitemap.xml" },
              ].map((link) => (
                <li key={link.name}>
                  {link.name === t.footer.sitemap ? (
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <HashLink
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </HashLink>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8">
          <p className="text-sm text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} Robin Bril. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
