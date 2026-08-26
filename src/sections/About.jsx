import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { GraduationCap, Layers, Brain, ShieldCheck, Cpu, Database } from 'lucide-react';
import { ScrollRevealContainer, ScrollRevealItem } from '../components/ScrollReveal';

export default function About() {
  const pillars = [
    {
      title: "MCA Postgraduate Candidate",
      desc: "Final-year MCA at Alagappa University (2024–2026) with BCA foundation. Strong grounding in algorithms and system architecture.",
      icon: GraduationCap,
      badge: "Education",
      color: "text-blue-500 dark:text-blue-400"
    },
    {
      title: "Full-Stack Web Engineering",
      desc: "Building responsive React.js frontends, scalable Node.js/Express REST APIs, and structured SQL/NoSQL databases.",
      icon: Layers,
      badge: "Full-Stack",
      color: "text-indigo-500 dark:text-indigo-400"
    },
    {
      title: "Applied AI & Machine Learning",
      desc: "Integrating Gemini LLM APIs, building RAG knowledge systems, and training MobileNetV2 CNNs for computer vision.",
      icon: Brain,
      badge: "AI / ML",
      color: "text-cyan-500 dark:text-cyan-400"
    },
    {
      title: "Payment & Data Production",
      desc: "Real-world experience at Surfboard Payments modeling transaction lifecycles and Edu Tantr delivering ETL classification pipelines.",
      icon: ShieldCheck,
      badge: "Experience",
      color: "text-emerald-600 dark:text-emerald-400"
    }
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          badge="About Me"
          title="A builder who learns by creating."
          subtitle="I approach software as a unified system—combining clean frontend design, resilient backend APIs, and applied AI."
        />

        {/* 4 Staggered Cards */}
        <ScrollRevealContainer className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8" stagger={0.09}>
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <ScrollRevealItem
                key={idx}
                className="glass-panel p-5 sm:p-6 rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="p-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-sm">
                      <Icon className={`w-5 h-5 ${p.color}`} />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-[var(--text-muted)] uppercase bg-[var(--bg-surface)] border border-[var(--border-subtle)] px-2 py-0.5 rounded">
                      {p.badge}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[var(--text-main)] font-display mb-1.5">
                    {p.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed font-sans">
                    {p.desc}
                  </p>
                </div>
              </ScrollRevealItem>
            );
          })}
        </ScrollRevealContainer>

        {/* Visual Full-Stack Architecture Blueprint Banner */}
        <ScrollRevealContainer className="glass-panel rounded-2xl overflow-hidden border border-[var(--border-subtle)] shadow-xl">
          <div className="relative w-full h-56 sm:h-72 md:h-80 overflow-hidden bg-slate-950">
            <img
              src="/assets/architecture-preview.jpg"
              alt="Full-Stack System Architecture Blueprint"
              width="1000"
              height="500"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
            
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-indigo-300 bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-lg border border-indigo-500/30">
                End-to-End System Architecture Blueprint
              </span>
              <span className="hidden sm:inline-block text-[11px] font-mono text-cyan-300 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-[var(--border-subtle)]">
                React • Node.js/Flask • PostgreSQL • AI Models
              </span>
            </div>
          </div>
        </ScrollRevealContainer>
      </div>
    </section>
  );
}
