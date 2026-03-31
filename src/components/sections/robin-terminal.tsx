"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Terminal lines that type out one by one
const TERMINAL_LINES = [
  { text: "$ robin start --agents 3 --voice", delay: 0, color: "text-orange-300" },
  { text: "🦞 Robin v1.0 — Unfettered AI Partner", delay: 600, color: "text-orange-400 font-bold" },
  { text: "  ✓ Voice mode enabled", delay: 1200, color: "text-green-400" },
  { text: "  ✓ Agent team spawned (3 agents)", delay: 1700, color: "text-green-400" },
  { text: "  ✓ All 56 features unlocked", delay: 2200, color: "text-green-400" },
  { text: "  ✓ Connected to OpenRouter API", delay: 2700, color: "text-green-400" },
  { text: "", delay: 3200, color: "" },
  { text: "◆ Waiting for task...", delay: 3400, color: "text-orange-200" },
  { text: "> Refactor auth module, add OAuth2, write tests", delay: 4000, color: "text-white" },
  { text: "", delay: 4400, color: "" },
  { text: "◆ Dispatching to agent team...", delay: 4600, color: "text-orange-300" },
];

// Agent chat messages
const AGENT_MESSAGES = [
  { agent: "Architect", color: "#f97316", icon: "🏗", msg: "Analysing auth module structure...", delay: 5200 },
  { agent: "Developer", color: "#fb923c", icon: "💻", msg: "Found 3 auth patterns. Proposing OAuth2 flow.", delay: 6000 },
  { agent: "Tester", color: "#fdba74", icon: "🧪", msg: "Generating test suite for new flows.", delay: 6800 },
  { agent: "Architect", color: "#f97316", icon: "🏗", msg: "Auth module refactored. 847 lines → 312 lines.", delay: 7800 },
  { agent: "Developer", color: "#fb923c", icon: "💻", msg: "OAuth2 + refresh tokens implemented ✓", delay: 8600 },
  { agent: "Tester", color: "#fdba74", icon: "🧪", msg: "42 tests passing. Coverage: 97% ✓", delay: 9400 },
  { agent: "Robin", color: "#ea580c", icon: "🦞", msg: "Done. Task complete in 38 seconds.", delay: 10200 },
];

function TypingLine({ text, color, startTyping }: { text: string; color: string; startTyping: boolean }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!startTyping || text === "") {
      if (text === "") setDisplayed("");
      return;
    }
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 22);
    return () => clearInterval(interval);
  }, [startTyping, text]);

  if (text === "") return <div className="h-3" />;

  return (
    <div className={`font-mono text-xs sm:text-sm leading-relaxed ${color}`}>
      {displayed}
      {startTyping && displayed.length < text.length && (
        <span className="inline-block w-1.5 h-3.5 bg-orange-400 ml-0.5 animate-pulse" />
      )}
    </div>
  );
}

function Terminal() {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [started, setStarted] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (terminalRef.current) observer.observe(terminalRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    TERMINAL_LINES.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, i]);
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      }, line.delay);
    });
  }, [started]);

  return (
    <div className="rounded-xl overflow-hidden shadow-2xl border border-orange-900/30" style={{ background: "#1a0f08" }}>
      {/* Window chrome */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-orange-900/30" style={{ background: "#120b05" }}>
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-3 text-xs text-orange-700 font-mono">robin — terminal</span>
      </div>
      {/* Content */}
      <div
        ref={terminalRef}
        className="p-4 sm:p-5 space-y-1 overflow-y-auto"
        style={{ minHeight: "260px", maxHeight: "320px" }}
      >
        {TERMINAL_LINES.map((line, i) => (
          <TypingLine
            key={i}
            text={line.text}
            color={line.color}
            startTyping={visibleLines.includes(i)}
          />
        ))}
      </div>
    </div>
  );
}

function AgentChat({ started }: { started: boolean }) {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!started) return;
    AGENT_MESSAGES.forEach((msg, i) => {
      setTimeout(() => {
        setVisibleMessages(prev => [...prev, i]);
        if (chatRef.current) {
          chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
      }, msg.delay);
    });
  }, [started]);

  return (
    <div className="rounded-xl overflow-hidden shadow-2xl border border-orange-900/30" style={{ background: "#1a0f08" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-orange-900/30" style={{ background: "#120b05" }}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-orange-400 font-mono font-semibold">Agent Team — Live</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-orange-700 font-mono">3 agents active</span>
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500/60" />
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500/30" />
        </div>
      </div>
      {/* Messages */}
      <div
        ref={chatRef}
        className="p-4 space-y-3 overflow-y-auto"
        style={{ minHeight: "260px", maxHeight: "320px" }}
      >
        <AnimatePresence>
          {AGENT_MESSAGES.map((msg, i) =>
            visibleMessages.includes(i) ? (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-start gap-3"
              >
                {/* Agent avatar */}
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-sm flex-shrink-0 mt-0.5"
                  style={{ background: msg.color + "22", border: `1px solid ${msg.color}44` }}
                >
                  {msg.icon}
                </div>
                {/* Bubble */}
                <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                  <span className="text-xs font-semibold font-mono" style={{ color: msg.color }}>
                    {msg.agent}
                  </span>
                  <div
                    className="rounded-lg rounded-tl-none px-3 py-2 text-xs sm:text-sm text-orange-100/90 leading-relaxed"
                    style={{ background: msg.color + "15", border: `1px solid ${msg.color}25` }}
                  >
                    {msg.msg}
                  </div>
                </div>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>

        {visibleMessages.length === 0 && (
          <div className="flex items-center gap-2 text-orange-800 text-xs font-mono pt-8 justify-center">
            <span className="animate-pulse">●</span>
            <span>Wachten op taak...</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function RobinTerminalSection() {
  const [started, setStarted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="robin-demo"
      className="relative py-20 sm:py-28 overflow-hidden"
      style={{ background: "#fdf2e9" }}
    >
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #f9731620 0%, transparent 50%),
                            radial-gradient(circle at 80% 50%, #ea580c15 0%, transparent 50%)`
        }}
      />

      <div className="container relative z-10 px-4 sm:px-6 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-mono mb-5"
            style={{ background: "#f9731620", border: "1px solid #f9731640", color: "#ea580c" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            Live demo
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#4a2c2a] mb-4">
            Kijk hoe Robin{" "}
            <em className="not-italic text-orange-400">werkt</em>.
          </h2>
          <p className="text-[#7a4c3a] text-lg max-w-xl mx-auto">
            Een team van agents pakt je taak op. Parallel. Asynchroon. Terwijl jij verder bouwt.
          </p>
        </motion.div>

        {/* Two-panel layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="text-xs font-mono text-orange-600 mb-2 ml-1 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
              Terminal
            </div>
            <Terminal />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="text-xs font-mono text-orange-600 mb-2 ml-1 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Agent team
            </div>
            <AgentChat started={started} />
          </motion.div>
        </div>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-3 gap-4 mt-10 max-w-lg mx-auto text-center"
        >
          {[
            { num: "3–5×", label: "sneller" },
            { num: "56", label: "features" },
            { num: "∞", label: "agents" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-black text-orange-400">{stat.num}</span>
              <span className="text-xs text-[#7a4c3a] font-mono mt-0.5">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
