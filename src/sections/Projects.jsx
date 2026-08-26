import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { projects } from '../data/projects';
import { Github, ExternalLink, Sparkles, Layers, ArrowUpRight, Code2 } from 'lucide-react';
import { ScrollRevealContainer, ScrollRevealItem } from '../components/ScrollReveal';
import TechIcon from '../components/TechIcon';

export default function Projects({ onSelectProject }) {
  // Show full-stack and fintech projects
  const topProjects = projects.filter(p => 
    p.id === 'serviconnect' || p.id === 'liquiflow' || p.id === 'paylink' || p.id === 'selfcook'
  );

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          badge="Featured Projects"
          title="What I have engineered & built."
          subtitle="End-to-end web applications demonstrating full-stack engineering, payment middleware, and automated pipelines."
        />

        {/* 4 Staggered Project Cards with Visual Previews */}
        <ScrollRevealContainer className="grid grid-cols-1 md:grid-cols-2 gap-6" stagger={0.09}>
          {topProjects.map((proj) => (
            <ScrollRevealItem
              key={proj.id}
              className="glass-panel rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-[var(--border-active)] transition-all duration-300 shadow-lg"
            >
              <div>
                {/* Visual UI Preview Image Banner */}
                {proj.image && (
                  <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-slate-950 border-b border-[var(--border-subtle)]">
                    <img
                      src={proj.image}
                      alt={`${proj.title} Preview`}
                      width="600"
                      height="340"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Floating Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-indigo-300 uppercase bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-indigo-500/30 shadow-md">
                        {proj.badge || "Production"}
                      </span>
                    </div>

                    <div className="absolute bottom-2.5 right-3">
                      <span className="text-[10px] font-mono font-semibold text-cyan-300 bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded-md border border-[var(--border-subtle)]">
                        {proj.category}
                      </span>
                    </div>
                  </div>
                )}

                {/* Content Container */}
                <div className="p-5 sm:p-6 pb-2">
                  <h3 className="text-lg font-bold text-[var(--text-main)] font-display mb-2 group-hover:text-indigo-400 transition-colors">
                    {proj.title}
                  </h3>

                  {/* 1-Line Description */}
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed font-sans mb-3 line-clamp-2">
                    {proj.tagline}
                  </p>

                  {/* Key Metric / Achievement Badge */}
                  <div className="flex items-start gap-2 text-xs text-[var(--text-main)] bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-2.5 rounded-xl mb-4 shadow-inner">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
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
                  {proj.tech.length > 5 && (
                    <span className="px-1.5 py-0.5 text-[10px] font-mono text-[var(--text-dim)] bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-md">
                      +{proj.tech.length - 5}
                    </span>
                  )}
                </div>

                <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between">
                  <button
                    onClick={() => onSelectProject(proj)}
                    className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
                  >
                    <span>Architecture Deep-Dive</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2">
                    {proj.github && (
                      <a
                        href={proj.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-indigo-500 transition-colors"
                        title="GitHub repository"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {proj.demo && (
                      <a
                        href={proj.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all active:scale-95 border border-indigo-400/30"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
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
