import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { Workflow, ShieldCheck, MessageSquare, Cpu, Brain, Zap } from 'lucide-react';
import { StoryStep } from '../components/ScrollReveal';

export default function Strengths() {
  const strengths = [
    { title: "Problem Solving", desc: "Decomposing complex requirements into modular, deterministic workflows and resilient components.", icon: Workflow, color: "text-blue-500 dark:text-blue-400" },
    { title: "Full Ownership", desc: "Taking end-to-end responsibility from frontend UI to backend APIs and database consistency.", icon: ShieldCheck, color: "text-emerald-600 dark:text-emerald-400" },
    { title: "Clear Communication", desc: "Explaining technical choices clearly, writing clean documentation, and collaborating actively in reviews.", icon: MessageSquare, color: "text-cyan-500 dark:text-cyan-400" },
    { title: "Engineering Mindset", desc: "Prioritizing clean architectures, idempotent endpoints, error boundaries, and maintainability.", icon: Cpu, color: "text-indigo-500 dark:text-indigo-400" },
    { title: "AI-Assisted Velocity", desc: "Leveraging Generative AI and modern developer tools to build rapidly without sacrificing quality.", icon: Brain, color: "text-purple-600 dark:text-purple-400" },
    { title: "High Learning Agility", desc: "Demonstrated velocity mastering full-stack engineering, fintech workflows, and machine learning.", icon: Zap, color: "text-amber-500 dark:text-amber-400" }
  ];

  return (
    <section id="strengths" className="py-28 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <StoryStep className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel shadow-md mb-4 border border-[var(--border-subtle)]">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400">
              Professional Strengths
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-[var(--text-main)] mb-3">
            What I bring to your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400">team.</span>
          </h2>
          
          <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-xl mx-auto font-sans leading-relaxed">
            6 core engineering habits and human qualities that define how I write code and collaborate.
          </p>
        </StoryStep>

        {/* Story Step: Strengths Grid */}
        <StoryStep>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {strengths.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={idx}
                  className="glass-panel p-6 rounded-3xl border border-[var(--border-subtle)] hover:border-indigo-500/50 hover:scale-[1.02] transition-all duration-300 shadow-xl flex flex-col justify-between"
                >
                  <div>
                    <div className="p-3 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] w-fit mb-4 shadow-sm">
                      <Icon className={`w-5 h-5 ${s.color}`} />
                    </div>
                    <h3 className="text-base font-bold text-[var(--text-main)] font-display mb-2">
                      {s.title}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed font-sans">
                      {s.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </StoryStep>
      </div>
    </section>
  );
}
