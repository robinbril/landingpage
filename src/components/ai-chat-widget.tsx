"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import Image from "next/image";

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}

const INITIAL_MESSAGES_NL: Message[] = [
  {
    id: "welcome",
    role: "assistant",
    content:
      "Hey! Vertel me welk proces te veel tijd of handjes kost. Ik bekijk of een AI-agent dat kan overnemen.",
    timestamp: new Date(),
  },
];

const INITIAL_MESSAGES_EN: Message[] = [
  {
    id: "welcome",
    role: "assistant",
    content:
      "Hey! Tell me which process is eating too much time or resources. I'll check if an AI agent can take it over.",
    timestamp: new Date(),
  },
];

const SUGGESTED_PROMPTS_NL = [
  "Onze klantenservice loopt vast",
  "We verwerken te veel orders handmatig",
  "Onze kennisbank is onvindbaar",
];

const SUGGESTED_PROMPTS_EN = [
  "Our customer service is overwhelmed",
  "We process too many orders manually",
  "Our knowledge base is impossible to search",
];

export default function AIChatWidget() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [messages, setMessages] = useState<Message[]>(
    language === "nl" ? INITIAL_MESSAGES_NL : INITIAL_MESSAGES_EN
  );
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Only show chat button after scrolling past the hero
  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const suggestedPrompts =
    language === "nl" ? SUGGESTED_PROMPTS_NL : SUGGESTED_PROMPTS_EN;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || submitted) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    await new Promise((r) => setTimeout(r, 1500));

    const responseNl = `Top, dat is precies het soort werk waar een AI-agent goed in is.\n\nLaat je WhatsApp-nummer of e-mail achter, dan bel of app ik je direct voor het maken van een afspraak.`;
    const responseEn = `Great, that's exactly the kind of work an AI agent excels at.\n\nLeave your WhatsApp number or email, and I'll call or message you directly to set up a meeting.`;

    const assistantMessage: Message = {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      content: language === "nl" ? responseNl : responseEn,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsTyping(false);
    setSubmitted(true);
  };

  const handleContactSubmit = async (contact: string) => {
    const contactMessage: Message = {
      id: `contact-${Date.now()}`,
      role: "user",
      content: contact,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, contactMessage]);
    setIsTyping(true);

    // Here you would POST to your webhook:
    // POST https://your-n8n-instance.com/webhook/intake
    // { messages, contact, timestamp: new Date() }

    await new Promise((r) => setTimeout(r, 1000));

    const confirmNl = `Ontvangen! Ik neem zo snel mogelijk contact met je op. Spreek je snel!`;
    const confirmEn = `Got it! I'll reach out to you as soon as possible. Talk soon!`;

    const confirmMessage: Message = {
      id: `confirm-${Date.now()}`,
      role: "assistant",
      content: language === "nl" ? confirmNl : confirmEn,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, confirmMessage]);
    setIsTyping(false);
    setContactSubmitted(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (submitted && !contactSubmitted) {
        if (input.trim()) {
          handleContactSubmit(input.trim());
          setInput("");
        }
      } else if (!submitted) {
        handleSend();
      }
    }
  };

  // Robin's avatar component
  const RobinAvatar = ({ size = "sm" }: { size?: "sm" | "lg" }) => (
    <div className={`${size === "lg" ? "w-10 h-10" : "w-6 h-6"} rounded-full overflow-hidden flex-shrink-0 border border-[#4a2c2a]/10`}>
      <Image
        src="/images/contact/robin.jpeg"
        alt="Robin Bril"
        width={size === "lg" ? 40 : 24}
        height={size === "lg" ? 40 : 24}
        className="object-cover w-full h-full"
      />
    </div>
  );

  return (
    <>
      {/* Chat Toggle Button - only visible after scrolling past hero */}
      <AnimatePresence>
        {!isOpen && showButton && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2"
          >
            {/* Floating speech bubble label */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative bg-white text-[#4a2c2a] text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg border border-[#4a2c2a]/8"
            >
              {language === "nl" ? "Even sparren?" : "Let's talk?"}
              {/* Speech bubble tail — points toward button (right side) */}
              <div className="absolute -bottom-1.5 right-5 w-3 h-3 bg-white border-r border-b border-[#4a2c2a]/8 rotate-45" />
            </motion.div>

            {/* Circular icon button */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsOpen(true)}
              className="w-14 h-14 rounded-full bg-[#4a2c2a] text-white shadow-2xl shadow-[#4a2c2a]/40 flex items-center justify-center hover:bg-[#3a1c1a] transition-colors duration-300"
              aria-label={language === "nl" ? "Chat met Robin" : "Chat with Robin"}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-50 w-full sm:w-[380px] sm:max-w-[calc(100vw-48px)] h-[85dvh] sm:h-[520px] sm:max-h-[calc(100dvh-100px)] bg-white border border-[#4a2c2a]/10 rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#4a2c2a]/5 bg-[#fdf2e9]">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <RobinAvatar size="lg" />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-[#fdf2e9]" />
                </div>
                <div>
                  <div className="font-bold text-sm text-[#4a2c2a]">
                    Robin Bril
                  </div>
                  <div className="text-xs text-[#8e6d6b]">
                    AI Engineer
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2.5 rounded-lg hover:bg-white/60 transition-colors"
                aria-label="Close chat"
              >
                <X className="h-4 w-4 text-[#4a2c2a]" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <div className="mt-1">
                      <RobinAvatar />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-[#4a2c2a] text-white"
                        : "bg-[#fdf2e9] text-[#4a2c2a]"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Suggested prompts */}
              {messages.length === 1 && !submitted && (
                <div className="space-y-2 pt-2">
                  {suggestedPrompts.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(prompt)}
                      className="block w-full text-left px-3 py-2 rounded-xl border border-[#4a2c2a]/10 text-sm text-[#8e6d6b] hover:border-[#e67e22]/50 hover:text-[#4a2c2a] transition-all"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex gap-2 items-center">
                  <div className="mt-1">
                    <RobinAvatar />
                  </div>
                  <div className="bg-[#fdf2e9] px-3 py-2 rounded-xl">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8e6d6b]/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8e6d6b]/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8e6d6b]/50 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-[#4a2c2a]/5 bg-white">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={contactSubmitted}
                  placeholder={
                    contactSubmitted
                      ? language === "nl"
                        ? "Ik neem contact op!"
                        : "I'll be in touch!"
                      : submitted
                      ? language === "nl"
                        ? "06-12345678 of je@email.nl"
                        : "+31612345678 or you@email.com"
                      : language === "nl"
                      ? "Beschrijf je uitdaging..."
                      : "Describe your challenge..."
                  }
                  className="flex-1 bg-[#fdf2e9]/60 rounded-xl px-4 py-3 sm:py-2.5 text-sm text-[#4a2c2a] placeholder:text-[#8e6d6b]/60 focus:outline-none focus:ring-2 focus:ring-[#e67e22]/30 disabled:opacity-50"
                />
                <button
                  onClick={() => {
                    if (submitted && !contactSubmitted && input.trim()) {
                      handleContactSubmit(input.trim());
                      setInput("");
                    } else if (!submitted) {
                      handleSend();
                    }
                  }}
                  disabled={!input.trim() || contactSubmitted}
                  className="p-2.5 rounded-xl bg-[#4a2c2a] text-white hover:bg-[#3a1c1a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <div className="text-[10px] text-[#8e6d6b]/40 text-center mt-2">
                Powered by Robin Bril
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
