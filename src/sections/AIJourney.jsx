import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { projects } from '../data/projects';
import { Brain, Sparkles, Network, Eye, MessageSquareCode, Github, ExternalLink, ArrowUpRight } from 'lucide-react';
import { ScrollRevealContainer, ScrollRevealItem } from '../components/ScrollReveal';
import TechIcon from '../components/TechIcon';

export default function AIJourney({ onSelectProject }) {
  const aiProjects = projects.filter(p => 
    p.id === 'crop-disease' || p.id === 'nlp-chatbot'
  );

  const aiPillars = [
    { title: "Generative AI & Gemini API", desc: "Automated document verification and anomaly detection.", icon: Sparkles, color: "text-cyan-400" },
    { title: "RAG & Vector Retrieval", desc: "Context-grounded semantic search without factual hallucinations.", icon: Network, color: "text-violet-400" },
    { title: "Deep Learning & Vision", desc: "MobileNetV2 CNNs achieving ~85% accuracy across 38 crop disease classes.", icon: Eye, color: "text-amber-400" },
    { title: "Natural Language Processing", desc: "Intent classification and session-aware conversational agents.", icon: MessageSquareCode, color: "text-emerald-400" }
  ];

  return (
    <section id="ai-journey" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          badge="Applied AI & Machine Learning"
          title="Connecting full-stack software with intelligent models."
          subtitle="Embedding deep learning computer vision, RAG retrieval pipelines, and Generative AI APIs into practical production tools."
        />

        {/* 4 Staggered AI Pillars */}
        <ScrollRevealContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-8" stagger={0.07}>
          {aiPillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <ScrollRevealItem key={idx} className="glass-panel p-4 rounded-xl">
                <div className="p-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] w-fit mb-2.5 shadow-sm">
                  <Icon className={`w-4 h-4 ${p.color}`} />
                </div>
                <h4 className="text-xs font-bold text-[var(--text-main)] mb-1">
                  {p.title}
                </h4>
                <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                  {p.desc}
                </p>
              </ScrollRevealItem>
            );
          })}
        </ScrollRevealContainer>

        {/* 2 Staggered AI Project Cards with Visual AI Previews */}
        <ScrollRevealContainer className="grid grid-cols-1 md:grid-cols-2 gap-6" stagger={0.1}>
          {aiProjects.map((proj) => (
            <ScrollRevealItem
              key={proj.id}
              className="glass-panel rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-[var(--border-active)] transition-all duration-300 shadow-lg"
            >
              <div>
                {/* Visual AI Preview Banner */}
                {proj.image && (
                  <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-slate-950 border-b border-[var(--border-subtle)]">
                    <img
                      src={proj.image}
                      alt={`${proj.title} AI Preview`}
                      width="600"
                      height="340"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                    
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-violet-300 uppercase bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-violet-500/30 shadow-md">
                        {proj.badge || "AI & Vision"}
                      </span>
                    </div>

                    <div className="absolute bottom-2.5 right-3">
                      <span className="text-[10px] font-mono font-semibold text-emerald-300 bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded-md border border-[var(--border-subtle)]">
                        {proj.category}
                      </span>
                    </div>
                  </div>
                )}

                {/* Content Container */}
                <div className="p-5 sm:p-6 pb-2">
                  <h3 className="text-lg font-bold text-[var(--text-main)] font-display mb-2 group-hover:text-violet-400 transition-colors">
                    {proj.title}
                  </h3>

                  <p className="text-xs text-[var(--text-muted)] leading-relaxed font-sans mb-3 line-clamp-2">
                    {proj.tagline}
                  </p>

                  <div className="flex items-start gap-2 text-xs text-[var(--text-main)] bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-2.5 rounded-xl mb-4 shadow-inner">
                    <Sparkles className="w-3.5 h-3.5 text-violet-400 mt-0.5 flex-shrink-0" />
                    <span className="text-[11px] leading-tight"><strong>Impact:</strong> {proj.outcome}</span>
                  </div>
                </div>
              </div>

              {/* Stack & Direct Links */}
              <div className="px-5 sm:px-6 pb-5">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {proj.tech.slice(0, 5).map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono text-[var(--text-main)] bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-md"
                    >
                      <TechIcon name={t} className="w-2.5 h-2.5" />
                      <span>{t}</span>
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between">
                  <button
                    onClick={() => onSelectProject(proj)}
                    className="text-xs font-semibold text-violet-400 hover:text-violet-300 flex items-center gap-1 transition-colors"
                  >
                    <span>Model Architecture</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2">
                    {proj.github && (
                      <a
                        href={proj.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs text-[var(--text-main)] hover:text-violet-400 hover:border-violet-500 transition-colors font-medium"
                        title="View Code on GitHub"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Source Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </ScrollRevealItem>
          ))}
        </ScrollRevealContainer>
      </div>
    </section>
  );
}
