import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { projects } from '../data/projects';
import { Brain, Sparkles, Network, Eye, MessageSquareCode, Github, ExternalLink, ArrowUpRight } from 'lucide-react';
import { StoryStep } from '../components/ScrollReveal';
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
    <section id="ai-journey" className="py-28 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <StoryStep className="text-center mb-24 min-h-[25vh] flex flex-col justify-center items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel shadow-md mb-4 border border-[var(--border-subtle)]">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-violet-400">
              Applied AI & Machine Learning
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-[var(--text-main)] mb-3">
            Connecting code with <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-cyan-400">intelligence.</span>
          </h2>
          
          <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-xl mx-auto font-sans leading-relaxed">
            Embedding deep learning computer vision, RAG retrieval pipelines, and Generative AI APIs into practical production tools.
          </p>
        </StoryStep>

        {/* 4 Staggered AI Pillars Scene */}
        <StoryStep className="mb-32 min-h-[40vh] flex flex-col justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {aiPillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div key={idx} className="glass-panel p-5 sm:p-6 rounded-3xl border border-[var(--border-subtle)] hover:border-violet-500/50 transition-colors shadow-sm">
                  <div className="p-3 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] w-fit mb-3.5 shadow-sm">
                    <Icon className={`w-5 h-5 ${p.color}`} />
                  </div>
                  <h4 className="text-sm font-bold text-[var(--text-main)] mb-1.5">
                    {p.title}
                  </h4>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </StoryStep>

        {/* Scroll-Driven One-by-One AI Project Scenes */}
        <div className="space-y-32 sm:space-y-44">
          {aiProjects.map((proj, idx) => (
            <div key={proj.id} className="min-h-[55vh] flex flex-col justify-center">
              <StoryStep direction={idx % 2 === 0 ? "left" : "right"}>
                <div className="glass-panel rounded-3xl overflow-hidden border border-[var(--border-subtle)] hover:border-violet-500/60 transition-all duration-300 shadow-2xl group hover:shadow-violet-500/10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                    {/* Visual AI Preview Banner */}
                    {proj.image && (
                      <div className="lg:col-span-6 relative h-64 sm:h-96 overflow-hidden bg-slate-950 border-b lg:border-b-0 lg:border-r border-[var(--border-subtle)]">
                        <img
                          src={proj.image}
                          alt={`${proj.title} AI Preview`}
                          width="700"
                          height="450"
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                        
                        <div className="absolute top-3 left-3">
                          <span className="text-[10px] font-mono font-bold text-violet-300 uppercase bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-violet-500/30 shadow-md">
                            {proj.badge || "AI & Vision"}
                          </span>
                        </div>

                        <div className="absolute bottom-3 left-3">
                          <span className="text-[10px] font-mono font-semibold text-emerald-300 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-[var(--border-subtle)]">
                            {proj.category}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Details */}
                    <div className={`p-6 sm:p-8 flex flex-col justify-between ${proj.image ? 'lg:col-span-6' : 'lg:col-span-12'}`}>
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-xs font-mono font-bold text-violet-400">
                            AI Model {proj.number}
                          </span>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-main)] font-display mb-3 group-hover:text-violet-400 transition-colors">
                          {proj.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed font-sans mb-4">
                          {proj.tagline}
                        </p>

                        <div className="flex items-start gap-2.5 text-xs text-[var(--text-main)] bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-3 rounded-xl mb-5 shadow-inner">
                          <Sparkles className="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" />
                          <span className="text-xs leading-relaxed"><strong>Impact:</strong> {proj.outcome}</span>
                        </div>
                      </div>

                      <div>
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {proj.tech.map((t, tIdx) => (
                            <span
                              key={tIdx}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono text-[var(--text-main)] bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg shadow-sm"
                            >
                              <TechIcon name={t} className="w-3 h-3" />
                              <span>{t}</span>
                            </span>
                          ))}
                        </div>

                        <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
                          <button
                            onClick={() => onSelectProject(proj)}
                            className="text-xs font-semibold text-violet-400 hover:text-violet-300 flex items-center gap-1.5 transition-colors font-mono"
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
                                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs text-[var(--text-main)] hover:text-violet-400 hover:border-violet-500 transition-colors font-medium shadow-sm"
                                title="View Code on GitHub"
                              >
                                <Github className="w-4 h-4" />
                                <span>Source Code</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </StoryStep>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
