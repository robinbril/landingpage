"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";

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
      "Hey! Ik ben de Virelio AI-assistent. Vertel me wat je zoekt — automatisering, een AI-agent, of iets anders — en ik plan direct een intake voor je in.",
    timestamp: new Date(),
  },
];

const INITIAL_MESSAGES_EN: Message[] = [
  {
    id: "welcome",
    role: "assistant",
    content:
      "Hey! I'm the Virelio AI assistant. Tell me what you're looking for — automation, an AI agent, or something else — and I'll schedule an intake for you right away.",
    timestamp: new Date(),
  },
];

const SUGGESTED_PROMPTS_NL = [
  "Ik wil mijn facturatie automatiseren",
  "We hebben een klantenservice agent nodig",
  "Ik zoek een AI-oplossing voor mijn team",
];

const SUGGESTED_PROMPTS_EN = [
  "I want to automate my invoicing",
  "We need a customer service agent",
  "I'm looking for an AI solution for my team",
];

export default function AIChatWidget() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(
    language === "nl" ? INITIAL_MESSAGES_NL : INITIAL_MESSAGES_EN
  );
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

    // Simulate AI processing delay
    await new Promise((r) => setTimeout(r, 1500));

    // Generate contextual response based on the message
    const responseNl = `Goed dat je dit aangeeft! Ik stuur je aanvraag door naar Robin. Hij neemt binnen 4 uur contact met je op om een gratis intake in te plannen.\n\nWat je beschreef:\n"${messageText}"\n\nVul hieronder je e-mail in zodat Robin je kan bereiken:`;
    const responseEn = `Great that you're reaching out! I'm forwarding your request to Robin. He'll get back to you within 4 hours to schedule a free intake.\n\nWhat you described:\n"${messageText}"\n\nEnter your email below so Robin can reach you:`;

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

  const handleEmailSubmit = async (email: string) => {
    const emailMessage: Message = {
      id: `email-${Date.now()}`,
      role: "user",
      content: email,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, emailMessage]);
    setIsTyping(true);

    // Here you would POST to your OpenClaw/n8n webhook:
    // POST https://your-n8n-instance.com/webhook/intake
    // { message: messages, email, timestamp: new Date() }

    await new Promise((r) => setTimeout(r, 1000));

    const confirmNl = `Verzonden! Robin ontvangt nu je aanvraag en e-mail (${email}). Je krijgt binnen 4 uur een bevestiging met een link om een moment te kiezen.`;
    const confirmEn = `Sent! Robin now has your request and email (${email}). You'll receive a confirmation within 4 hours with a link to pick a time.`;

    const confirmMessage: Message = {
      id: `confirm-${Date.now()}`,
      role: "assistant",
      content: language === "nl" ? confirmNl : confirmEn,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, confirmMessage]);
    setIsTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (submitted) {
        // If submitted, this is the email input
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(input)) {
          handleEmailSubmit(input);
          setInput("");
        }
      } else {
        handleSend();
      }
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-2xl flex items-center justify-center hover:bg-primary/90 transition-colors"
            aria-label={language === "nl" ? "Open AI chat" : "Open AI chat"}
          >
            <Bot className="h-6 w-6" />
          </motion.button>
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
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[520px] max-h-[calc(100vh-100px)] bg-background border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-foreground">
                    Virelio AI
                  </div>
                  <div className="text-xs text-green-500 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                    {language === "nl" ? "Online" : "Online"}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                aria-label="Close chat"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="h-3 w-3 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
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
                      className="block w-full text-left px-3 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:border-primary/50 hover:text-foreground transition-all"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex gap-2 items-center">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="h-3 w-3 text-primary" />
                  </div>
                  <div className="bg-muted px-3 py-2 rounded-xl">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-border bg-card">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type={submitted ? "email" : "text"}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    submitted
                      ? language === "nl"
                        ? "je@email.nl"
                        : "you@email.com"
                      : language === "nl"
                      ? "Beschrijf wat je zoekt..."
                      : "Describe what you're looking for..."
                  }
                  className="flex-1 bg-muted rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button
                  onClick={() => {
                    if (submitted) {
                      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                      if (emailRegex.test(input)) {
                        handleEmailSubmit(input);
                        setInput("");
                      }
                    } else {
                      handleSend();
                    }
                  }}
                  disabled={!input.trim()}
                  className="p-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <div className="text-[10px] text-muted-foreground/50 text-center mt-2">
                {language === "nl"
                  ? "Powered by Virelio AI"
                  : "Powered by Virelio AI"}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
