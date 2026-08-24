import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { projects } from '../data/projects';
import { Brain, Sparkles, Network, Eye, MessageSquareCode, Github, ExternalLink, ArrowUpRight } from 'lucide-react';
import { ScrollRevealContainer, ScrollRevealItem } from '../components/ScrollReveal';

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
                <div className="p-2 rounded-lg glass-panel w-fit mb-2.5">
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

        {/* 2 Staggered AI Project Cards */}
        <ScrollRevealContainer className="grid grid-cols-1 md:grid-cols-2 gap-5" stagger={0.1}>
          {aiProjects.map((proj) => (
            <ScrollRevealItem
              key={proj.id}
              className="glass-panel p-6 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono font-bold text-violet-400 uppercase bg-violet-500/10 px-2 py-0.5 rounded border border-violet-500/20">
                    {proj.badge || "AI & Vision"}
                  </span>
                  <span className="text-[10px] font-mono text-[var(--text-dim)]">
                    {proj.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[var(--text-main)] font-display mb-2">
                  {proj.title}
                </h3>

                <p className="text-xs text-[var(--text-muted)] leading-relaxed font-sans mb-3 line-clamp-3">
                  {proj.tagline}
                </p>

                <div className="flex items-start gap-1.5 text-xs text-[var(--text-main)] glass-panel p-2.5 rounded-xl mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-violet-400 mt-0.5 flex-shrink-0" />
                  <span className="text-[11px] leading-tight"><strong>Impact:</strong> {proj.outcome}</span>
                </div>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {proj.tech.slice(0, 4).map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 text-[10px] font-mono text-[var(--text-main)] glass-panel rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between">
                  <button
                    onClick={() => onSelectProject(proj)}
                    className="text-xs font-semibold text-violet-400 hover:text-violet-300 flex items-center gap-1 transition-colors"
                  >
                    <span>Architecture</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2">
                    {proj.github && (
                      <a
                        href={proj.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-panel text-xs text-[var(--text-main)] hover:text-violet-400 border border-[var(--border-subtle)] transition-colors font-medium"
                        title="View Code on GitHub"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>View Code</span>
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
