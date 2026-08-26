import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { skillCategories } from '../data/skills';
import { 
  Code2, 
  Layout, 
  Server, 
  Database, 
  Brain, 
  Wrench, 
  ShieldCheck 
} from 'lucide-react';
import TechIcon from '../components/TechIcon';

export default function Skills() {
  const iconMap = {
    Code2,
    Layout,
    Server,
    Database,
    Brain,
    Wrench
  };

  const domainStyles = {
    programming: {
      accent: "text-sky-500 dark:text-sky-400",
      border: "border-sky-500/25 dark:border-sky-500/30 hover:border-sky-500/60",
      badge: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
      glow: "hover:shadow-sky-500/10"
    },
    frontend: {
      accent: "text-blue-500 dark:text-blue-400",
      border: "border-blue-500/25 dark:border-blue-500/30 hover:border-blue-500/60",
      badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
      glow: "hover:shadow-blue-500/10"
    },
    backend: {
      accent: "text-emerald-600 dark:text-emerald-400",
      border: "border-emerald-500/25 dark:border-emerald-500/30 hover:border-emerald-500/60",
      badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
      glow: "hover:shadow-emerald-500/10"
    },
    databases: {
      accent: "text-rose-500 dark:text-rose-400",
      border: "border-rose-500/25 dark:border-rose-500/30 hover:border-rose-500/60",
      badge: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
      glow: "hover:shadow-rose-500/10"
    },
    aiml: {
      accent: "text-cyan-500 dark:text-cyan-400",
      border: "border-cyan-500/25 dark:border-cyan-500/30 hover:border-cyan-500/60",
      badge: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
      glow: "hover:shadow-cyan-500/10"
    },
    tools: {
      accent: "text-purple-600 dark:text-purple-400",
      border: "border-purple-500/25 dark:border-purple-500/30 hover:border-purple-500/60",
      badge: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
      glow: "hover:shadow-purple-500/10"
    }
  };

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          badge="Technical Arsenal"
          title="Technologies I build with daily."
          subtitle="A complete, single-view ecosystem of my core programming languages, modern frameworks, applied AI models, and database infrastructure."
        />

        {/* Complete Single-View Bento Grid (All Categories at Once) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((category) => {
            const Icon = iconMap[category.icon] || Code2;
            const style = domainStyles[category.id] || domainStyles.programming;

            return (
              <div
                key={category.id}
                className={`glass-panel border ${style.border} p-5 sm:p-6 rounded-2xl flex flex-col justify-between transition-all duration-200 ${style.glow}`}
              >
                <div>
                  {/* Domain Card Header */}
                  <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[var(--border-subtle)]">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-center ${style.accent} shadow-sm`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-base font-bold text-[var(--text-main)] font-display leading-tight">
                          {category.name}
                        </h3>
                      </div>
                    </div>
                    
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border ${style.badge}`}>
                      {category.skills.length} Tools
                    </span>
                  </div>

                  {/* Clean Tech Pills Matrix (Adaptive Light/Dark styling) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {category.skills.map((skill, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2.5 p-2 rounded-xl bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-subtle)] hover:border-indigo-400/60 hover:scale-[1.02] transition-all duration-150 group shadow-sm"
                      >
                        <div className="w-6 h-6 rounded-lg bg-[var(--bg-surface)] p-1 flex items-center justify-center border border-[var(--border-subtle)] group-hover:scale-110 transition-transform flex-shrink-0 shadow-sm">
                          <TechIcon name={skill.name} className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-mono font-semibold text-[var(--text-main)] group-hover:text-indigo-500 dark:group-hover:text-indigo-300 transition-colors truncate">
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recruiter 4-Pillar Executive Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
          <div className="glass-panel p-3.5 rounded-xl border border-sky-500/20">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-sky-500 dark:text-sky-400 mb-1">
              <Code2 className="w-3.5 h-3.5" />
              <span>Full-Stack Core</span>
            </div>
            <div className="text-[11px] text-[var(--text-muted)]">
              React.js, Node.js, Express & Python
            </div>
          </div>

          <div className="glass-panel p-3.5 rounded-xl border border-cyan-500/20">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-500 dark:text-cyan-400 mb-1">
              <Brain className="w-3.5 h-3.5" />
              <span>Applied AI & Vision</span>
            </div>
            <div className="text-[11px] text-[var(--text-muted)]">
              Gemini API, RAG, CNNs & NLP
            </div>
          </div>

          <div className="glass-panel p-3.5 rounded-xl border border-emerald-500/20">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 mb-1">
              <Database className="w-3.5 h-3.5" />
              <span>Data Persistence</span>
            </div>
            <div className="text-[11px] text-[var(--text-muted)]">
              PostgreSQL, MySQL, Firebase & Supabase
            </div>
          </div>

          <div className="glass-panel p-3.5 rounded-xl border border-purple-500/20">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-purple-600 dark:text-purple-400 mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Production Fintech</span>
            </div>
            <div className="text-[11px] text-[var(--text-muted)]">
              Surfboard Payments & Webhooks
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
