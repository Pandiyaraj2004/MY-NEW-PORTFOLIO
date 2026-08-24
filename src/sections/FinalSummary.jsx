import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { 
  GraduationCap, 
  Code2, 
  Layers, 
  Brain, 
  Database, 
  CreditCard, 
  FolderGit2, 
  FileText, 
  Download,
  Sparkles
} from 'lucide-react';
import { ScrollRevealContainer, ScrollRevealItem } from '../components/ScrollReveal';

export default function FinalSummary({ onOpenResume }) {
  const recapPillars = [
    { label: "Education", value: "MCA Postgraduate", detail: "Alagappa University (2024–2026)", icon: GraduationCap, color: "text-blue-400" },
    { label: "Specialization", value: "Full-Stack Developer", detail: "Python, JavaScript & React", icon: Code2, color: "text-indigo-400" },
    { label: "Frameworks", value: "React.js & Node.js", detail: "Express, REST APIs, Tailwind", icon: Layers, color: "text-cyan-400" },
    { label: "Intelligence", value: "AI / ML & GenAI", detail: "Gemini API, RAG, CNN Vision", icon: Brain, color: "text-purple-400" },
    { label: "Data Science", value: "Data Science Intern", detail: "Edu Tantr (10k+ records, -30% noise)", icon: Database, color: "text-emerald-400" },
    { label: "Fintech Track", value: "Surfboard Payments", detail: "Payment workflows & webhooks", icon: CreditCard, color: "text-amber-400" },
    { label: "Built Products", value: "5+ Production Projects", detail: "Marketplaces, Middleware, AI Vision", icon: FolderGit2, color: "text-sky-400" },
    { label: "Benchmark", value: "79.20% TCS NQT", detail: "National Qualifier percentile", icon: Sparkles, color: "text-rose-400" }
  ];

  return (
    <section id="recap" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          badge="Executive Snapshot"
          title="The complete profile at a glance."
          subtitle="A quick recap matrix for recruiters and hiring managers before reviewing the official resume."
        />

        {/* 8 Staggered Recap Cards */}
        <ScrollRevealContainer className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-8" stagger={0.05}>
          {recapPillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <ScrollRevealItem
                key={idx}
                className="glass-panel p-4 rounded-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-[var(--text-dim)] uppercase">
                      {item.label}
                    </span>
                    <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[var(--text-main)] font-display">
                    {item.value}
                  </div>
                  <div className="text-[11px] text-[var(--text-muted)] mt-0.5 line-clamp-1">
                    {item.detail}
                  </div>
                </div>
              </ScrollRevealItem>
            );
          })}
        </ScrollRevealContainer>
      </div>
    </section>
  );
}
