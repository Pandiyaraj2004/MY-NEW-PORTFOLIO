import React from 'react';
import { ArrowDown, FileText, Download, Sparkles, MapPin, Code2, Brain, Database, ShieldCheck } from 'lucide-react';
import { ScrollRevealContainer, ScrollRevealItem } from '../components/ScrollReveal';

export default function Hero({ onOpenResume }) {
  const highlights = [
    { label: "5+ Built Projects", desc: "Full-Stack, Fintech & AI platforms", icon: Code2, color: "text-indigo-400" },
    { label: "79.20% TCS NQT", desc: "National programming benchmark", icon: ShieldCheck, color: "text-cyan-400" },
    { label: "AI & ML Systems", desc: "CNNs, RAG vector search & Gemini", icon: Brain, color: "text-emerald-400" },
    { label: "Surfboard Payments", desc: "Payment engineering & webhooks", icon: Database, color: "text-purple-400" }
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden z-10"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column: Typography, Larger Profile & Action CTAs (6 Cols on desktop) */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start text-left space-y-6">
            
            {/* Status Pill & Location */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel shadow-sm border border-[var(--border-subtle)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-mono font-medium text-[var(--text-main)]">
                Available for Full-Stack & AI Engineering Roles
              </span>
              <span className="text-[var(--text-dim)]">|</span>
              <span className="text-xs font-mono text-cyan-400 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Tamil Nadu, India
              </span>
            </div>

            {/* Profile Avatar (Enlarged) + Name Identity Row */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <div className="relative group flex-shrink-0">
                <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-violet-500 opacity-60 blur-lg group-hover:opacity-90 transition-opacity duration-300" />
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full p-1.5 bg-gradient-to-b from-white/30 to-white/10 border-2 border-white/30 shadow-2xl overflow-hidden backdrop-blur-md">
                  <img
                    src="/assets/pandiyaraj-profile.png"
                    alt="Pandiyaraj A"
                    className="w-full h-full object-cover rounded-full filter contrast-105 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider bg-indigo-500/10 px-2.5 py-0.5 rounded border border-indigo-500/20">
                    MCA Candidate
                  </span>
                  <span className="text-xs text-[var(--text-muted)] font-mono">
                    2024–2026
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-[var(--text-main)] leading-none">
                  PANDIYARAJ <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-blue-400">A</span>
                </h1>
                <p className="text-xs sm:text-sm font-mono font-semibold text-cyan-400 pt-0.5">
                  Full-Stack Developer | AI Applications
                </p>
              </div>
            </div>

            {/* Subtitle & Professional Focus */}
            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed font-sans max-w-xl">
              Engineering resilient software at the intersection of modern React frontends, robust Node.js/Python microservices, payment gateways, and applied AI models.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={onOpenResume}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-lg shadow-indigo-600/30 transition-all active:scale-95 border border-indigo-400/30"
              >
                <FileText className="w-4 h-4" />
                <span>View Resume</span>
              </button>

              <a
                href="/assets/Pandiyaraj_A_Resume.pdf"
                download="Pandiyaraj_A_Resume.pdf"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold glass-panel text-[var(--text-main)] hover:text-cyan-400 transition-colors"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Download PDF</span>
              </a>

              <a
                href="#about"
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium glass-panel text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
              >
                <span>Scroll Journey</span>
                <ArrowDown className="w-3.5 h-3.5 text-indigo-400 animate-bounce" />
              </a>
            </div>

            {/* 4 Micro Proof Highlight Cards (2x2 Grid) */}
            <ScrollRevealContainer className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full pt-1" stagger={0.07}>
              {highlights.map((h, idx) => {
                const Icon = h.icon;
                return (
                  <ScrollRevealItem key={idx} className="glass-panel p-3 rounded-xl border border-[var(--border-subtle)]">
                    <div className={`flex items-center gap-2 text-xs font-mono font-bold ${h.color} mb-0.5`}>
                      <Icon className="w-3.5 h-3.5" />
                      <span className="truncate">{h.label}</span>
                    </div>
                    <div className="text-[11px] text-[var(--text-muted)] line-clamp-1 font-sans">
                      {h.desc}
                    </div>
                  </ScrollRevealItem>
                );
              })}
            </ScrollRevealContainer>
          </div>

          {/* Right Column: Spacious dedicated zone for the 3D Geodesic Sphere on desktop */}
          <div className="hidden lg:flex lg:col-span-6 xl:col-span-6 h-[520px] pointer-events-none items-center justify-center relative">
            {/* Ambient circular halo giving contrast to 3D sphere */}
            <div className="w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-cyan-500/15 via-indigo-500/15 to-transparent blur-3xl" />
          </div>

        </div>
      </div>
    </section>
  );
}
