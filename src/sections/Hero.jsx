import React from 'react';
import { ArrowDown, FileText, Download, Sparkles, MapPin, Code2, Brain, Database, ShieldCheck } from 'lucide-react';
import { ScrollRevealContainer, ScrollRevealItem } from '../components/ScrollReveal';

export default function Hero({ onOpenResume }) {
  const highlights = [
    { label: "5+ Built Projects", desc: "Full-Stack, Fintech & AI platforms", icon: Code2, color: "text-indigo-400" },
    { label: "79.20% TCS NQT", desc: "National qualifier programming benchmark", icon: ShieldCheck, color: "text-cyan-400" },
    { label: "AI & ML Systems", desc: "CNNs, RAG vector retrieval & Gemini APIs", icon: Brain, color: "text-emerald-400" },
    { label: "Surfboard Payments", desc: "Production payment & webhook logic", icon: Database, color: "text-purple-400" }
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden z-10"
    >
      <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center">
        {/* Status / Motto Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel shadow-md mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-[11px] font-mono font-medium text-[var(--text-main)]">
            Engineering with logic · Scaling with intelligence
          </span>
        </div>

        {/* Profile Portrait & 3D Depth Aura (Optimized Scale) */}
        <div className="relative mb-6 group">
          <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-violet-500 opacity-55 blur-lg group-hover:opacity-80 transition-opacity duration-300 pointer-events-none transform translate-z-0" />

          <div className="relative w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full p-2 bg-gradient-to-b from-white/30 to-white/10 border-2 border-white/40 shadow-xl overflow-hidden">
            <img
              src="/assets/pandiyaraj-profile.png"
              alt="Pandiyaraj A"
              width="240"
              height="240"
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover rounded-full filter contrast-105 group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap px-3.5 py-1 rounded-full glass-panel text-[11px] sm:text-xs font-mono font-bold text-indigo-400 shadow-xl flex items-center gap-1.5 border border-indigo-500/60">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>MCA · Full-Stack & AI</span>
          </div>
        </div>

        {/* Headline */}
        <div className="space-y-2 max-w-2xl">
          <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-[var(--text-main)] leading-tight">
            PANDIYARAJ <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-blue-400">A</span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base font-mono font-semibold text-cyan-400">
            Full-Stack Developer | Python & JavaScript | AI-Powered Applications
          </p>

          <p className="text-xs md:text-[13px] text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed pt-0.5">
            Engineering resilient software at the intersection of modern React frontends, robust Node.js/Python microservices, and applied AI models.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-5">
          <button
            onClick={onOpenResume}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-md shadow-indigo-600/30 transition-all active:scale-95 border border-indigo-400/30"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>View Resume</span>
          </button>

          <a
            href="/assets/Pandiyaraj_A_Resume.pdf"
            download="Pandiyaraj_A_Resume.pdf"
            className="flex items-center gap-2 px-4.5 py-2.5 rounded-xl text-xs font-semibold glass-panel text-[var(--text-main)] transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Download PDF</span>
          </a>

          <a
            href="#about"
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-medium glass-panel text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
          >
            <span>Scroll Journey</span>
            <ArrowDown className="w-3 h-3 text-indigo-400 animate-bounce" />
          </a>
        </div>

        {/* 4 Micro Proof Highlights (Staggered) */}
        <ScrollRevealContainer className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mt-7 w-full max-w-4xl text-left" stagger={0.08}>
          {highlights.map((h, idx) => {
            const Icon = h.icon;
            return (
              <ScrollRevealItem key={idx} className="glass-panel p-3.5 rounded-xl">
                <div className={`flex items-center gap-1.5 text-xs font-mono font-bold ${h.color} mb-1`}>
                  <Icon className="w-3.5 h-3.5" />
                  <span className="truncate">{h.label}</span>
                </div>
                <div className="text-[11px] text-[var(--text-muted)] line-clamp-2">
                  {h.desc}
                </div>
              </ScrollRevealItem>
            );
          })}
        </ScrollRevealContainer>
      </div>
    </section>
  );
}
