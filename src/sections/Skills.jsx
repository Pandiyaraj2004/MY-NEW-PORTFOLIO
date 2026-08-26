import React, { useState, useMemo } from 'react';
import SectionHeader from '../components/SectionHeader';
import { skillCategories } from '../data/skills';
import { 
  Code2, 
  Layout, 
  Server, 
  Database, 
  Brain, 
  Wrench, 
  Search, 
  Sparkles, 
  Terminal, 
  ShieldCheck, 
  Layers,
  Cpu
} from 'lucide-react';
import { ScrollRevealContainer, ScrollRevealItem } from '../components/ScrollReveal';
import TechIcon from '../components/TechIcon';

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

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
      accent: "text-sky-400",
      border: "border-sky-500/30 hover:border-sky-500/60",
      badge: "bg-sky-500/10 text-sky-400 border-sky-500/20",
      glow: "hover:shadow-sky-500/10",
      cardBg: "from-sky-950/20 via-slate-900/40 to-slate-950/60"
    },
    frontend: {
      accent: "text-blue-400",
      border: "border-blue-500/30 hover:border-blue-500/60",
      badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      glow: "hover:shadow-blue-500/10",
      cardBg: "from-blue-950/20 via-slate-900/40 to-slate-950/60"
    },
    backend: {
      accent: "text-emerald-400",
      border: "border-emerald-500/30 hover:border-emerald-500/60",
      badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      glow: "hover:shadow-emerald-500/10",
      cardBg: "from-emerald-950/20 via-slate-900/40 to-slate-950/60"
    },
    databases: {
      accent: "text-rose-400",
      border: "border-rose-500/30 hover:border-rose-500/60",
      badge: "bg-rose-500/10 text-rose-400 border-rose-500/20",
      glow: "hover:shadow-rose-500/10",
      cardBg: "from-rose-950/20 via-slate-900/40 to-slate-950/60"
    },
    aiml: {
      accent: "text-cyan-400",
      border: "border-cyan-500/30 hover:border-cyan-500/60",
      badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      glow: "hover:shadow-cyan-500/10",
      cardBg: "from-cyan-950/20 via-slate-900/40 to-slate-950/60"
    },
    tools: {
      accent: "text-purple-400",
      border: "border-purple-500/30 hover:border-purple-500/60",
      badge: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      glow: "hover:shadow-purple-500/10",
      cardBg: "from-purple-950/20 via-slate-900/40 to-slate-950/60"
    }
  };

  // Filter skills based on selected category & search query
  const displayedCategories = useMemo(() => {
    return skillCategories
      .filter((cat) => selectedCategory === 'all' || cat.id === selectedCategory)
      .map((cat) => {
        if (!searchQuery.trim()) return cat;
        const matchingSkills = cat.skills.filter((s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
        );
        return { ...cat, skills: matchingSkills };
      })
      .filter((cat) => cat.skills.length > 0);
  }, [selectedCategory, searchQuery]);

  const totalSkillsCount = skillCategories.reduce((acc, c) => acc + c.skills.length, 0);

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          badge="Technical Arsenal"
          title="Technologies I build with daily."
          subtitle="A complete, single-view matrix of my core languages, frameworks, AI models, and database infrastructure."
        />

        {/* Recruiter Quick Control & Search Strip */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 mb-8 p-3 rounded-2xl glass-panel">
          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 w-full md:w-auto scrollbar-none">
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card-hover)]'
              }`}
            >
              All Tech ({totalSkillsCount})
            </button>

            {skillCategories.map((cat) => {
              const Icon = iconMap[cat.icon] || Code2;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => { setSelectedCategory(cat.id); setSearchQuery(''); }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all whitespace-nowrap ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card-hover)]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.name.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Skill Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-dim)]" />
            <input
              type="text"
              placeholder="Search skill (e.g. React, Python)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/90 border border-[var(--border-subtle)] focus:border-indigo-500 rounded-xl pl-8 pr-3 py-1.5 text-xs text-[var(--text-main)] placeholder-[var(--text-dim)] outline-none transition-colors"
            />
          </div>
        </div>

        {/* Complete Single-View Bento Grid (All Categories at Once) */}
        {displayedCategories.length === 0 ? (
          <div className="text-center py-12 glass-panel rounded-2xl p-6">
            <p className="text-xs text-[var(--text-muted)] font-mono">No matching technologies found for "{searchQuery}"</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="mt-3 px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-mono"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayedCategories.map((category) => {
              const Icon = iconMap[category.icon] || Code2;
              const style = domainStyles[category.id] || domainStyles.programming;

              return (
                <div
                  key={category.id}
                  className={`glass-panel bg-gradient-to-br ${style.cardBg} border ${style.border} p-5 sm:p-6 rounded-2xl flex flex-col justify-between transition-all duration-200 ${style.glow}`}
                >
                  <div>
                    {/* Domain Card Header */}
                    <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[var(--border-subtle)]">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-xl bg-slate-900/90 border border-[var(--border-subtle)] flex items-center justify-center ${style.accent} shadow-sm`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-sm sm:text-base font-bold text-[var(--text-main)] font-display leading-tight">
                            {category.name}
                          </h3>
                        </div>
                      </div>
                      
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${style.badge}`}>
                        {category.skills.length} Tools
                      </span>
                    </div>

                    {/* Clean Tech Pills Matrix (Logo + Tech Name) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {category.skills.map((skill, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2.5 p-2.5 rounded-xl glass-panel bg-slate-900/80 hover:bg-slate-850 border border-[var(--border-subtle)] hover:border-indigo-400/60 hover:scale-[1.02] transition-all duration-150 group shadow-sm"
                        >
                          <div className="w-6 h-6 rounded-lg bg-slate-950 p-1 flex items-center justify-center border border-[var(--border-subtle)] group-hover:scale-110 transition-transform flex-shrink-0">
                            <TechIcon name={skill.name} className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-mono font-semibold text-[var(--text-main)] group-hover:text-indigo-300 transition-colors truncate">
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
        )}

        {/* Recruiter 4-Pillar Executive Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
          <div className="glass-panel p-3.5 rounded-xl border border-sky-500/20">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-sky-400 mb-1">
              <Code2 className="w-3.5 h-3.5" />
              <span>Full-Stack Core</span>
            </div>
            <div className="text-[11px] text-[var(--text-muted)]">
              React.js, Node.js, Express & Python
            </div>
          </div>

          <div className="glass-panel p-3.5 rounded-xl border border-cyan-500/20">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400 mb-1">
              <Brain className="w-3.5 h-3.5" />
              <span>Applied AI & Vision</span>
            </div>
            <div className="text-[11px] text-[var(--text-muted)]">
              Gemini API, RAG, CNNs & NLP
            </div>
          </div>

          <div className="glass-panel p-3.5 rounded-xl border border-emerald-500/20">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 mb-1">
              <Database className="w-3.5 h-3.5" />
              <span>Data Persistence</span>
            </div>
            <div className="text-[11px] text-[var(--text-muted)]">
              PostgreSQL, MySQL, Firebase & Supabase
            </div>
          </div>

          <div className="glass-panel p-3.5 rounded-xl border border-purple-500/20">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-purple-400 mb-1">
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
