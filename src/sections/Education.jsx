import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { educationTimeline } from '../data/education';
import { GraduationCap, MapPin, CheckCircle2, Award } from 'lucide-react';
import { ScrollRevealContainer, ScrollRevealItem } from '../components/ScrollReveal';

export default function Education() {
  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          badge="Education & Foundation"
          title="Building deep fundamentals in Computer Science."
          subtitle="From algorithmic thinking during BCA to distributed systems and applied deep learning in MCA."
        />

        {/* 2 Staggered Timeline Cards */}
        <ScrollRevealContainer className="grid grid-cols-1 md:grid-cols-2 gap-5" stagger={0.1}>
          {educationTimeline.map((item) => (
            <ScrollRevealItem
              key={item.id}
              className="glass-panel p-6 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {item.period}
                  </span>
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" />
                    {item.status}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[var(--text-main)] font-display">
                  {item.degree}
                </h3>

                <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mt-1 mb-3 font-mono">
                  <span className="text-[var(--text-main)] font-semibold">{item.institution}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-500" /> {item.location}
                  </span>
                </div>

                <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              {/* Max 3-4 Concise Highlight Bullets */}
              <div className="space-y-1.5 pt-3 border-t border-[var(--border-subtle)]">
                {item.highlights.slice(0, 3).map((h, hIdx) => (
                  <div key={hIdx} className="flex items-start gap-2 text-xs text-[var(--text-muted)]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </ScrollRevealItem>
          ))}
        </ScrollRevealContainer>
      </div>
    </section>
  );
}
