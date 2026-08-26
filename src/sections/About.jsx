import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { GraduationCap, Layers, Brain, ShieldCheck } from 'lucide-react';
import { StoryStep } from '../components/ScrollReveal';

export default function About() {
  const pillars = [
    {
      title: "MCA Postgraduate · Distinction",
      desc: "Completed MCA at Alagappa University (2024–2026) with BCA foundation. Strong grounding in algorithms and computational systems.",
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
    <section id="about" className="py-28 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <StoryStep className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel shadow-md mb-4 border border-[var(--border-subtle)]">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400">
              Identity & Architecture
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-[var(--text-main)] mb-3">
            A builder who learns by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400">creating.</span>
          </h2>
          
          <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-xl mx-auto font-sans leading-relaxed">
            I approach software as a unified system—combining clean frontend design, resilient backend APIs, and applied AI.
          </p>
        </StoryStep>

        {/* Step 1: 4 Engineering Pillars */}
        <StoryStep className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {pillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="glass-panel p-6 sm:p-7 rounded-3xl border border-[var(--border-subtle)] hover:border-indigo-500/50 transition-all duration-300 shadow-xl flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="p-3 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-sm">
                        <Icon className={`w-5 h-5 ${p.color}`} />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-[var(--text-muted)] uppercase bg-[var(--bg-surface)] border border-[var(--border-subtle)] px-2.5 py-1 rounded-full">
                        {p.badge}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-[var(--text-main)] font-display mb-2">
                      {p.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed font-sans">
                      {p.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </StoryStep>

        {/* Step 2: Visual Full-Stack Architecture Blueprint Banner */}
        <StoryStep>
          <div className="glass-panel rounded-3xl overflow-hidden border border-[var(--border-subtle)] shadow-2xl">
            <div className="relative w-full h-56 sm:h-72 md:h-96 overflow-hidden bg-slate-950">
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
              
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-indigo-300 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-indigo-500/30 shadow-md">
                  End-to-End System Architecture Blueprint
                </span>
                <span className="hidden sm:inline-block text-[11px] font-mono text-cyan-300 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-lg border border-[var(--border-subtle)]">
                  React • Node.js/Flask • PostgreSQL • AI Models
                </span>
              </div>
            </div>
          </div>
        </StoryStep>
      </div>
    </section>
  );
}
