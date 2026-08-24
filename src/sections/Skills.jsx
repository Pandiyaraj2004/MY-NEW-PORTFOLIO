import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { skillCategories } from '../data/skills';
import { Code2, Layout, Server, Database, Brain, Wrench } from 'lucide-react';
import { ScrollRevealContainer, ScrollRevealItem } from '../components/ScrollReveal';

export default function Skills() {
  const iconMap = {
    Code2,
    Layout,
    Server,
    Database,
    Brain,
    Wrench
  };

  const categoryColors = {
    programming: { badge: "bg-sky-500/10 text-sky-400 border-sky-500/20", dot: "bg-sky-400" },
    frontend: { badge: "bg-blue-500/10 text-blue-400 border-blue-500/20", dot: "bg-blue-400" },
    backend: { badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", dot: "bg-emerald-400" },
    databases: { badge: "bg-rose-500/10 text-rose-400 border-rose-500/20", dot: "bg-rose-400" },
    aiml: { badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20", dot: "bg-cyan-400" },
    tools: { badge: "bg-purple-500/10 text-purple-400 border-purple-500/20", dot: "bg-purple-400" }
  };

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          badge="Technical Skills"
          title="Technologies I build with daily."
          subtitle="A complete breakdown of my tools, frameworks, and databases grounded in real-world production use."
        />

        {/* 6 Staggered Domain Cards */}
        <ScrollRevealContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" stagger={0.08}>
          {skillCategories.map((category) => {
            const Icon = iconMap[category.icon] || Code2;
            const theme = categoryColors[category.id] || categoryColors.programming;

            return (
              <ScrollRevealItem
                key={category.id}
                className="glass-panel p-5 sm:p-6 rounded-2xl flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[var(--border-subtle)]">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl glass-panel text-indigo-400">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-base font-bold text-[var(--text-main)] font-display">
                        {category.name}
                      </h3>
                    </div>
                  </div>

                  {/* Concise Skill Badges with 1-Line Use Case */}
                  <div className="space-y-2.5">
                    {category.skills.map((skill, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl glass-panel"
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h4 className="text-xs font-bold text-[var(--text-main)] font-mono flex items-center gap-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${theme.dot}`} />
                            {skill.name}
                          </h4>
                          <span className="text-[9px] font-mono text-[var(--text-dim)]">
                            Applied
                          </span>
                        </div>
                        <p className="text-[11px] text-[var(--text-muted)] leading-snug font-sans line-clamp-2">
                          {skill.useCase}
                        </p>
                      </div>
                    ))}
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
