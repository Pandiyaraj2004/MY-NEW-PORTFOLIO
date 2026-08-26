import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { projects } from '../data/projects';
import { Github, ExternalLink, Sparkles, Layers, ArrowUpRight, Code2 } from 'lucide-react';
import { StoryStep } from '../components/ScrollReveal';
import TechIcon from '../components/TechIcon';

export default function Projects({ onSelectProject }) {
  const topProjects = projects.filter(p => 
    p.id === 'serviconnect' || p.id === 'liquiflow' || p.id === 'paylink' || p.id === 'selfcook'
  );

  return (
    <section id="projects" className="py-28 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <StoryStep className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel shadow-md mb-4 border border-[var(--border-subtle)]">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400">
              Featured Projects
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-[var(--text-main)] mb-3">
            What I have <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400">engineered.</span>
          </h2>
          
          <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-xl mx-auto font-sans leading-relaxed">
            End-to-end web applications demonstrating full-stack engineering, payment middleware, and automated pipelines.
          </p>
        </StoryStep>

        {/* Scroll-Driven One-by-One Project Scenes */}
        <div className="space-y-20 sm:space-y-28">
          {topProjects.map((proj, idx) => (
            <StoryStep key={proj.id} direction={idx % 2 === 0 ? "left" : "right"}>
              <div className="glass-panel rounded-3xl overflow-hidden border border-[var(--border-subtle)] hover:border-indigo-500/60 transition-all duration-300 shadow-2xl group hover:shadow-cyan-500/10">
                <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                  {/* High-Res UI Preview Banner */}
                  {proj.image && (
                    <div className="lg:col-span-6 relative h-64 sm:h-80 overflow-hidden bg-slate-950 border-b lg:border-b-0 lg:border-r border-[var(--border-subtle)]">
                      <img
                        src={proj.image}
                        alt={`${proj.title} Preview`}
                        width="700"
                        height="400"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                      
                      <div className="absolute top-3 left-3">
                        <span className="text-[10px] font-mono font-bold text-indigo-300 uppercase bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-indigo-500/30 shadow-md">
                          {proj.badge || "Production"}
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3">
                        <span className="text-[10px] font-mono font-semibold text-cyan-300 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-[var(--border-subtle)]">
                          {proj.category}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Project Details */}
                  <div className={`p-6 sm:p-8 flex flex-col justify-between ${proj.image ? 'lg:col-span-6' : 'lg:col-span-12'}`}>
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-mono font-bold text-indigo-400">
                          Project {proj.number}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-main)] font-display mb-3 group-hover:text-indigo-400 transition-colors">
                        {proj.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed font-sans mb-4">
                        {proj.tagline}
                      </p>

                      {/* Key Impact Metric */}
                      <div className="flex items-start gap-2.5 text-xs text-[var(--text-main)] bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-3 rounded-xl mb-5 shadow-inner">
                        <Sparkles className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <span className="text-xs leading-relaxed"><strong>Impact:</strong> {proj.outcome}</span>
                      </div>
                    </div>

                    {/* Stack & Actions */}
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
                          className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 transition-colors font-mono"
                        >
                          <span>Architecture Case Study</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>

                        <div className="flex items-center gap-2.5">
                          {proj.github && (
                            <a
                              href={proj.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-indigo-500 transition-colors"
                              title="GitHub repository"
                            >
                              <Github className="w-4 h-4" />
                            </a>
                          )}
                          {proj.demo && (
                            <a
                              href={proj.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all active:scale-95 border border-indigo-400/30"
                              title="Live Demo"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>Live App</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </StoryStep>
          ))}
        </div>
      </div>
    </section>
  );
}
