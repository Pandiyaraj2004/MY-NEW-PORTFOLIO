import React from 'react';
import { experiences } from '../data/experience';
import PaymentFlowVisualizer from '../scenes/PaymentFlowVisualizer';
import { 
  Building, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Briefcase, 
  Sparkles, 
  Layers 
} from 'lucide-react';
import { ScrollRevealContainer, ScrollRevealItem } from '../components/ScrollReveal';
import TechIcon from '../components/TechIcon';

export default function SurfboardExperience() {
  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header Matching Reference Style */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel shadow-md mb-4 border border-[var(--border-subtle)]">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400">
              Experience
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-[var(--text-main)] mb-3">
            Where I've been <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400">building.</span>
          </h2>
          
          <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-xl mx-auto font-sans leading-relaxed">
            Real teams, real deadlines, real production systems.
          </p>
        </div>

        {/* Alternating Vertical Timeline Container */}
        <div className="relative mb-16">
          {/* Glowing Central Trace Line */}
          <div className="absolute top-0 bottom-0 left-4 md:left-1/2 md:-translate-x-1/2 w-0.5 bg-gradient-to-b from-emerald-400 via-cyan-400 to-indigo-500 opacity-60 shadow-[0_0_12px_rgba(6,182,212,0.6)] pointer-events-none" />

          <div className="space-y-12 md:space-y-16">
            {experiences.map((exp, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={exp.id} className="relative flex flex-col md:flex-row items-center">
                  {/* Glowing Node Dot on Timeline */}
                  <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[var(--bg-base)] border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_12px_rgba(6,182,212,0.8)] z-20">
                    <span className={`w-2 h-2 rounded-full ${exp.isCurrent ? 'bg-emerald-400 animate-ping' : 'bg-cyan-400'}`} />
                    <span className={`absolute w-2 h-2 rounded-full ${exp.isCurrent ? 'bg-emerald-400' : 'bg-cyan-400'}`} />
                  </div>

                  {/* Staggered Timeline Card */}
                  <div className={`w-full md:w-1/2 pl-10 sm:pl-14 md:pl-0 ${isEven ? 'md:pr-12 md:mr-auto' : 'md:pl-12 md:ml-auto'}`}>
                    <ScrollRevealItem className="glass-panel p-6 sm:p-7 rounded-2xl border border-[var(--border-subtle)] hover:border-indigo-500/60 transition-all duration-300 shadow-xl group hover:shadow-cyan-500/10">
                      {/* Meta Row */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2.5 border-b border-[var(--border-subtle)]">
                        <div className="flex items-center gap-3 text-xs font-mono text-[var(--text-muted)]">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                            {exp.period}
                          </span>
                          <span className="text-[var(--text-dim)]">•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                            {exp.location}
                          </span>
                        </div>

                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                          exp.isCurrent 
                            ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' 
                            : 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30'
                        }`}>
                          {exp.status}
                        </span>
                      </div>

                      {/* Role & Company Header */}
                      <div className="mb-4">
                        <h3 className="text-lg sm:text-xl font-bold text-[var(--text-main)] font-display group-hover:text-indigo-400 transition-colors">
                          {exp.role}
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-mono font-bold text-blue-400 dark:text-cyan-300 mt-1">
                          <Briefcase className="w-3.5 h-3.5" />
                          <span>{exp.company}</span>
                        </div>
                      </div>

                      {/* Detailed Bullet Points */}
                      <div className="space-y-2.5 mb-5">
                        {exp.highlights.map((bullet, bIdx) => (
                          <div key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[var(--text-muted)] leading-relaxed font-sans">
                            <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                            <span>{bullet}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Stack Pills with Official Brand Logos */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-[var(--border-subtle)]">
                        {exp.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono font-medium text-[var(--text-main)] bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg shadow-sm group-hover:border-indigo-400/40 transition-colors"
                          >
                            <TechIcon name={skill} className="w-3 h-3" />
                            <span>{skill}</span>
                          </span>
                        ))}
                      </div>
                    </ScrollRevealItem>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Visual Architecture Blueprint & Live Interactive Terminal Simulation */}
        <div className="space-y-8">
          {/* Visual Fintech Architecture Image */}
          <ScrollRevealContainer className="glass-panel rounded-2xl overflow-hidden shadow-xl border border-[var(--border-subtle)]">
            <div className="relative w-full h-48 sm:h-64 overflow-hidden bg-slate-950 border-b border-[var(--border-subtle)]">
              <img
                src="/assets/surfboard-preview.jpg"
                alt="Surfboard Payments Architecture Diagram"
                width="1000"
                height="400"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-3 left-4 flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-cyan-300 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-cyan-500/30">
                  Fintech Middleware & Terminal Pipeline
                </span>
              </div>
            </div>
          </ScrollRevealContainer>

          {/* Streamlined Payment Flow Simulator */}
          <ScrollRevealContainer>
            <PaymentFlowVisualizer />
          </ScrollRevealContainer>
        </div>
      </div>
    </section>
  );
}
