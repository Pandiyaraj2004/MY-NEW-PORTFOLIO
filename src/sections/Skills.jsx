import React, { useState, useEffect } from 'react';
import SectionHeader from '../components/SectionHeader';
import { skillCategories } from '../data/skills';
import { 
  Code2, 
  Layout, 
  Server, 
  Database, 
  Brain, 
  Wrench, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Grid3X3, 
  Layers, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { ScrollRevealContainer, ScrollRevealItem } from '../components/ScrollReveal';
import TechIcon from '../components/TechIcon';

export default function Skills() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [viewMode, setViewMode] = useState('carousel'); // 'carousel' | 'grid'
  const [selectedFilter, setSelectedFilter] = useState('all'); // for grid view

  const iconMap = {
    Code2,
    Layout,
    Server,
    Database,
    Brain,
    Wrench
  };

  const domainThemes = {
    programming: { 
      accent: "text-sky-400", 
      border: "border-sky-500/40", 
      bg: "bg-sky-500/10",
      gradient: "from-sky-500/20 to-blue-500/5"
    },
    frontend: { 
      accent: "text-blue-400", 
      border: "border-blue-500/40", 
      bg: "bg-blue-500/10",
      gradient: "from-blue-500/20 to-indigo-500/5"
    },
    backend: { 
      accent: "text-emerald-400", 
      border: "border-emerald-500/40", 
      bg: "bg-emerald-500/10",
      gradient: "from-emerald-500/20 to-teal-500/5"
    },
    databases: { 
      accent: "text-rose-400", 
      border: "border-rose-500/40", 
      bg: "bg-rose-500/10",
      gradient: "from-rose-500/20 to-pink-500/5"
    },
    aiml: { 
      accent: "text-cyan-400", 
      border: "border-cyan-500/40", 
      bg: "bg-cyan-500/10",
      gradient: "from-cyan-500/20 to-indigo-500/5"
    },
    tools: { 
      accent: "text-purple-400", 
      border: "border-purple-500/40", 
      bg: "bg-purple-500/10",
      gradient: "from-purple-500/20 to-violet-500/5"
    }
  };

  // Auto-advance slideshow
  useEffect(() => {
    let timer;
    if (isAutoPlay && viewMode === 'carousel') {
      timer = setInterval(() => {
        if (document.visibilityState === 'visible') {
          setActiveSlide((prev) => (prev + 1) % skillCategories.length);
        }
      }, 3500);
    }
    return () => clearInterval(timer);
  }, [isAutoPlay, viewMode]);

  const currentCategory = skillCategories[activeSlide];
  const Icon = iconMap[currentCategory.icon] || Code2;
  const currentTheme = domainThemes[currentCategory.id] || domainThemes.programming;

  // Collect all skills for marquee / all filter
  const allSkillsList = skillCategories.flatMap(c => c.skills);

  const filteredCategories = selectedFilter === 'all' 
    ? skillCategories 
    : skillCategories.filter(c => c.id === selectedFilter);

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          badge="Technical Arsenal"
          title="Technologies I build with daily."
          subtitle="A clean, recruiter-friendly showcase of my technical skills, frameworks, and developer tools."
        />

        {/* View Mode & Slideshow Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 p-2 rounded-2xl glass-panel">
          {/* Quick Domain Pills / Slide Jump */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none w-full sm:w-auto">
            {skillCategories.map((cat, idx) => {
              const isActive = viewMode === 'carousel' ? activeSlide === idx : selectedFilter === cat.id;
              const CatIcon = iconMap[cat.icon] || Code2;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    if (viewMode === 'carousel') {
                      setActiveSlide(idx);
                      setIsAutoPlay(false);
                    } else {
                      setSelectedFilter(cat.id);
                    }
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card-hover)]'
                  }`}
                >
                  <CatIcon className="w-3.5 h-3.5" />
                  <span>{cat.name.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Toggle View & Carousel Controls */}
          <div className="flex items-center gap-2 ml-auto">
            {viewMode === 'carousel' && (
              <>
                <button
                  onClick={() => setIsAutoPlay(!isAutoPlay)}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-mono glass-panel text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
                  title={isAutoPlay ? "Pause Slideshow" : "Play Slideshow"}
                >
                  {isAutoPlay ? <Pause className="w-3 h-3 text-amber-400" /> : <Play className="w-3 h-3 text-emerald-400" />}
                  <span className="hidden sm:inline">{isAutoPlay ? "Pause" : "Auto"}</span>
                </button>

                <button
                  onClick={() => {
                    setActiveSlide((prev) => (prev === 0 ? skillCategories.length - 1 : prev - 1));
                    setIsAutoPlay(false);
                  }}
                  className="p-1.5 rounded-xl glass-panel text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
                  aria-label="Previous domain slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    setActiveSlide((prev) => (prev + 1) % skillCategories.length);
                    setIsAutoPlay(false);
                  }}
                  className="p-1.5 rounded-xl glass-panel text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
                  aria-label="Next domain slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}

            <button
              onClick={() => {
                setViewMode(viewMode === 'carousel' ? 'grid' : 'carousel');
                setSelectedFilter('all');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold bg-slate-900 border border-[var(--border-subtle)] text-[var(--text-main)] hover:border-indigo-500 transition-colors"
            >
              {viewMode === 'carousel' ? (
                <>
                  <Grid3X3 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>View All Grid</span>
                </>
              ) : (
                <>
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Slideshow View</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 1. SLIDESHOW VIEW MODE */}
        {viewMode === 'carousel' ? (
          <div className="relative">
            <div className={`p-6 sm:p-8 rounded-3xl glass-panel bg-gradient-to-br ${currentTheme.gradient} border ${currentTheme.border} shadow-2xl transition-all duration-300`}>
              {/* Slide Domain Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[var(--border-subtle)]">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-2xl ${currentTheme.bg} ${currentTheme.accent} border border-[var(--border-subtle)] shadow-inner`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${currentTheme.accent}`}>
                        {currentCategory.badge}
                      </span>
                      <span className="text-[10px] font-mono text-[var(--text-dim)]">
                        Domain 0{activeSlide + 1} / 0{skillCategories.length}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-main)] font-display">
                      {currentCategory.name}
                    </h3>
                  </div>
                </div>

                {/* Progress Indicators */}
                <div className="flex items-center gap-1.5">
                  {skillCategories.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      onClick={() => {
                        setActiveSlide(dotIdx);
                        setIsAutoPlay(false);
                      }}
                      className={`h-2 rounded-full transition-all ${
                        activeSlide === dotIdx 
                          ? 'w-6 bg-indigo-500' 
                          : 'w-2 bg-slate-700 hover:bg-slate-500'
                      }`}
                      aria-label={`Go to slide ${dotIdx + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Technologies Pills Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
                {currentCategory.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-4 rounded-2xl glass-panel flex flex-col items-center justify-center text-center gap-2.5 hover:border-indigo-500/80 hover:scale-105 transition-all duration-200 group shadow-md"
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-900/80 border border-[var(--border-subtle)] p-2 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <TechIcon name={skill.name} className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold text-[var(--text-main)] group-hover:text-indigo-300 transition-colors text-center leading-snug">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* 2. RECRUITER MATRIX (ALL / FILTERED GRID VIEW) */
          <div className="space-y-6 animate-in fade-in duration-200">
            {filteredCategories.map((category) => {
              const CatIcon = iconMap[category.icon] || Code2;
              const theme = domainThemes[category.id] || domainThemes.programming;

              return (
                <div key={category.id} className="glass-panel p-5 sm:p-6 rounded-2xl">
                  <div className="flex items-center gap-2.5 mb-4 pb-2.5 border-b border-[var(--border-subtle)]">
                    <div className={`p-2 rounded-xl ${theme.bg} ${theme.accent}`}>
                      <CatIcon className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-[var(--text-main)] font-display">
                      {category.name}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {category.skills.map((skill, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 px-3.5 py-2 rounded-xl glass-panel text-xs font-mono font-semibold text-[var(--text-main)] hover:border-indigo-500 hover:scale-105 transition-all shadow-sm group"
                      >
                        <div className="w-5 h-5 rounded-lg bg-slate-900/70 flex items-center justify-center p-0.5 border border-[var(--border-subtle)]">
                          <TechIcon name={skill.name} className="w-3.5 h-3.5" />
                        </div>
                        <span className="group-hover:text-indigo-300 transition-colors">
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Dynamic Continuous Marquee Banner */}
        <div className="mt-8 pt-6 border-t border-[var(--border-subtle)] overflow-hidden relative">
          <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--text-dim)] mb-3 text-center">
            Complete Production Toolkit · 28+ Verified Technologies
          </div>
          
          <div className="flex overflow-hidden relative [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
            <div className="flex items-center gap-3 animate-marquee whitespace-nowrap">
              {allSkillsList.concat(allSkillsList).map((skill, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl glass-panel text-xs font-mono text-[var(--text-muted)]"
                >
                  <TechIcon name={skill.name} className="w-3.5 h-3.5" />
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
