import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { projects } from '../data/projects';
import { Github, ExternalLink, Sparkles, Layers, ArrowUpRight } from 'lucide-react';
import { ScrollRevealContainer, ScrollRevealItem } from '../components/ScrollReveal';

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
          subtitle="End-to-end applications demonstrating full-stack engineering, payment middleware, and automated pipelines."
        />

        {/* 4 Staggered Project Cards */}
        <ScrollRevealContainer className="grid grid-cols-1 md:grid-cols-2 gap-5" stagger={0.09}>
          {topProjects.map((proj) => (
            <ScrollRevealItem
              key={proj.id}
              className="glass-panel p-6 rounded-2xl flex flex-col justify-between"
            >
              <div>
                {/* Header & Meta */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                    {proj.badge || "Production"}
                  </span>
                  <span className="text-[10px] font-mono text-[var(--text-dim)]">
                    {proj.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[var(--text-main)] font-display mb-2">
                  {proj.title}
                </h3>

                {/* 1-Line Description */}
                <p className="text-xs text-[var(--text-muted)] leading-relaxed font-sans mb-3 line-clamp-3">
                  {proj.tagline}
                </p>

                {/* Key Metric / Achievement Badge */}
                <div className="flex items-start gap-1.5 text-xs text-[var(--text-main)] glass-panel p-2.5 rounded-xl mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span className="text-[11px] leading-tight"><strong>Impact:</strong> {proj.outcome}</span>
                </div>
              </div>

              {/* Stack & Direct Links */}
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
                  {proj.tech.length > 4 && (
                    <span className="px-1.5 py-0.5 text-[10px] font-mono text-[var(--text-dim)]">
                      +{proj.tech.length - 4}
                    </span>
                  )}
                </div>

                <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between">
                  <button
                    onClick={() => onSelectProject(proj)}
                    className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
                  >
                    <span>Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2">
                    {proj.github && (
                      <a
                        href={proj.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg glass-panel text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
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
                        className="p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
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
