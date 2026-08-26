import React from 'react';
import { educationTimeline } from '../data/education';
import { 
  GraduationCap, 
  MapPin, 
  CheckCircle2, 
  Award, 
  Calendar, 
  BookOpen, 
  Sparkles,
  ArrowDown
} from 'lucide-react';
import { StoryStep } from '../components/ScrollReveal';

export default function Education() {
  return (
    <section id="education" className="py-28 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <StoryStep className="text-center mb-24 min-h-[25vh] flex flex-col justify-center items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel shadow-md mb-4 border border-[var(--border-subtle)]">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400">
              Education & Degrees
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-[var(--text-main)] mb-3">
            Where I've been <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-blue-400">studying.</span>
          </h2>
          
          <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-xl mx-auto font-sans leading-relaxed">
            Academic foundations, computational rigor, and modern distributed system architectures.
          </p>
        </StoryStep>

        {/* Scroll-Driven One-by-One Timeline Scenes */}
        <div className="relative">
          {/* Glowing Central Trace Line */}
          <div className="absolute top-0 bottom-0 left-4 md:left-1/2 md:-translate-x-1/2 w-0.5 bg-gradient-to-b from-indigo-500 via-cyan-400 to-blue-500 opacity-60 shadow-[0_0_12px_rgba(99,102,241,0.6)] pointer-events-none" />

          <div className="space-y-32 sm:space-y-44">
            {educationTimeline.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={item.id} className="relative flex flex-col md:flex-row items-center min-h-[45vh] justify-center">
                  {/* Glowing Node Dot on Timeline */}
                  <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[var(--bg-base)] border-2 border-indigo-400 flex items-center justify-center shadow-[0_0_16px_rgba(99,102,241,0.9)] z-20">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse" />
                  </div>

                  {/* One-by-One Story Step Card */}
                  <div className={`w-full md:w-1/2 pl-12 sm:pl-16 md:pl-0 ${isEven ? 'md:pr-14 md:mr-auto' : 'md:pl-14 md:ml-auto'}`}>
                    <StoryStep direction={isEven ? "left" : "right"}>
                      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[var(--border-subtle)] hover:border-indigo-500/60 transition-all duration-300 shadow-2xl group hover:shadow-indigo-500/10">
                        {/* Meta Row */}
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-[var(--border-subtle)]">
                          <div className="flex items-center gap-3 text-xs font-mono text-[var(--text-muted)]">
                            <span className="flex items-center gap-1.5 text-indigo-400 font-semibold">
                              <Calendar className="w-3.5 h-3.5" />
                              {item.period}
                            </span>
                            <span className="text-[var(--text-dim)]">•</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                              {item.location}
                            </span>
                          </div>

                          <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border bg-cyan-500/15 text-cyan-400 border-cyan-500/30 flex items-center gap-1">
                            <Award className="w-3 h-3" />
                            {item.status}
                          </span>
                        </div>

                        {/* Degree & Institution Header */}
                        <div className="mb-4">
                          <div className="text-[11px] font-mono text-[var(--text-dim)] uppercase tracking-wider mb-1">
                            {item.badge}
                          </div>
                          <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-main)] font-display group-hover:text-indigo-400 transition-colors leading-tight">
                            {item.degree}
                          </h3>
                          <div className="flex items-center gap-2 text-xs sm:text-sm font-mono font-bold text-indigo-400 dark:text-cyan-300 mt-1.5">
                            <GraduationCap className="w-4 h-4" />
                            <span>{item.institution}</span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed font-sans mb-5">
                          {item.description}
                        </p>

                        {/* Highlight Bullets */}
                        <div className="space-y-2 pt-4 border-t border-[var(--border-subtle)]">
                          <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-dim)] mb-2">
                            Curriculum Specialization & Computational Focus:
                          </div>
                          {item.highlights.map((h, hIdx) => (
                            <div key={hIdx} className="flex items-start gap-2.5 text-xs text-[var(--text-muted)] leading-relaxed">
                              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                              <span>{h}</span>
                            </div>
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
      </div>
    </section>
  );
}
