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
  Award,
  ArrowRight
} from 'lucide-react';
import { StoryStep } from '../components/ScrollReveal';
import TechIcon from '../components/TechIcon';

export default function SurfboardExperience() {
  return (
    <section id="experience" className="py-28 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <StoryStep className="text-center mb-24 min-h-[25vh] flex flex-col justify-center items-center">
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
        </StoryStep>

        {/* Alternating Vertical Timeline Container (Scroll-Driven Scenes) */}
        <div className="relative mb-36">
          {/* Glowing Central Trace Line */}
          <div className="absolute top-0 bottom-0 left-4 md:left-1/2 md:-translate-x-1/2 w-0.5 bg-gradient-to-b from-emerald-400 via-cyan-400 to-indigo-500 opacity-60 shadow-[0_0_12px_rgba(6,182,212,0.6)] pointer-events-none" />

          <div className="space-y-32 sm:space-y-44">
            {experiences.map((exp, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={exp.id} className="relative flex flex-col md:flex-row items-center min-h-[45vh] justify-center">
                  {/* Glowing Node Dot on Timeline */}
                  <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[var(--bg-base)] border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_16px_rgba(6,182,212,0.9)] z-20">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                  </div>

                  {/* One-by-One Story Step Card */}
                  <div className={`w-full md:w-1/2 pl-12 sm:pl-16 md:pl-0 ${isEven ? 'md:pr-14 md:mr-auto' : 'md:pl-14 md:ml-auto'}`}>
                    <StoryStep direction={isEven ? "left" : "right"}>
                      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[var(--border-subtle)] hover:border-indigo-500/60 transition-all duration-300 shadow-2xl group hover:shadow-cyan-500/10">
                        {/* Meta Row */}
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-[var(--border-subtle)]">
                          <div className="flex items-center gap-3 text-xs font-mono text-[var(--text-muted)]">
                            <span className="flex items-center gap-1.5 text-indigo-400 font-semibold">
                              <Calendar className="w-3.5 h-3.5" />
                              {exp.period}
                            </span>
                            <span className="text-[var(--text-dim)]">•</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                              {exp.location}
                            </span>
                          </div>

                          <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border bg-emerald-500/15 text-emerald-400 border-emerald-500/30 flex items-center gap-1">
                            <Award className="w-3 h-3" />
                            {exp.status}
                          </span>
                        </div>

                        {/* Role & Company Header */}
                        <div className="mb-4">
                          <div className="text-[11px] font-mono text-[var(--text-dim)] uppercase tracking-wider mb-1">
                            {exp.badge}
                          </div>
                          <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-main)] font-display group-hover:text-indigo-400 transition-colors leading-tight">
                            {exp.role}
                          </h3>
                          <div className="flex items-center gap-2 text-xs sm:text-sm font-mono font-bold text-blue-400 dark:text-cyan-300 mt-1.5">
                            <Briefcase className="w-4 h-4" />
                            <span>{exp.company}</span>
                          </div>
                        </div>

                        {/* Detailed Bullet Points */}
                        <div className="space-y-2.5 mb-6">
                          {exp.highlights.map((bullet, bIdx) => (
                            <div key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[var(--text-muted)] leading-relaxed font-sans">
                              <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                              <span>{bullet}</span>
                            </div>
                          ))}
                        </div>

                        {/* Tech Stack Pills with Official Brand Logos */}
                        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-[var(--border-subtle)]">
                          {exp.skills.map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-medium text-[var(--text-main)] bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg shadow-sm group-hover:border-indigo-400/40 transition-colors"
                            >
                              <TechIcon name={skill} className="w-3 h-3" />
                              <span>{skill}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </StoryStep>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 3 & 4: Visual Architecture Blueprint & Live Interactive Terminal Simulation */}
        <div className="space-y-24 sm:space-y-36">
          {/* Visual Fintech Architecture Image */}
          <StoryStep className="min-h-[45vh] flex flex-col justify-center">
            <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl border border-[var(--border-subtle)]">
              <div className="relative w-full h-56 sm:h-80 overflow-hidden bg-slate-950 border-b border-[var(--border-subtle)]">
                <img
                  src="/assets/surfboard-preview.jpg"
                  alt="Surfboard Payments Architecture Diagram"
                  width="1000"
                  height="450"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                
                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-cyan-300 bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-md border border-cyan-500/30">
                    Fintech Middleware Architecture & Terminal Flow
                  </span>
                </div>
              </div>
            </div>
          </StoryStep>

          {/* Streamlined Payment Flow Simulator */}
          <StoryStep className="min-h-[45vh] flex flex-col justify-center">
            <PaymentFlowVisualizer />
          </StoryStep>
        </div>
      </div>
    </section>
  );
}
