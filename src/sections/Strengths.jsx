import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { Workflow, ShieldCheck, MessageSquare, Cpu, Brain, Zap, Sparkles } from 'lucide-react';
import { ScrollRevealContainer, ScrollRevealItem } from '../components/ScrollReveal';

export default function Strengths() {
  const strengths = [
    { title: "Problem Solving", desc: "Decomposing complex requirements into modular, deterministic workflows and resilient components.", icon: Workflow, color: "text-blue-400" },
    { title: "Full Ownership", desc: "Taking end-to-end responsibility from frontend UI to backend APIs and database consistency.", icon: ShieldCheck, color: "text-emerald-400" },
    { title: "Clear Communication", desc: "Explaining technical choices clearly, writing clean documentation, and collaborating actively in reviews.", icon: MessageSquare, color: "text-cyan-400" },
    { title: "Engineering Mindset", desc: "Prioritizing clean architectures, idempotent endpoints, error boundaries, and maintainability.", icon: Cpu, color: "text-indigo-400" },
    { title: "AI-Assisted Velocity", desc: "Leveraging Generative AI and modern developer tools to build rapidly without sacrificing quality.", icon: Brain, color: "text-purple-400" },
    { title: "High Learning Agility", desc: "Demonstrated velocity mastering full-stack engineering, fintech workflows, and machine learning.", icon: Zap, color: "text-amber-400" }
  ];

  return (
    <section id="strengths" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          badge="Professional Strengths"
          title="What I bring to your engineering team."
          subtitle="6 core engineering habits and human qualities that define how I write code and collaborate."
        />

        {/* 6 Staggered Strengths Cards */}
        <ScrollRevealContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" stagger={0.07}>
          {strengths.map((s, idx) => {
            const Icon = s.icon;
            return (
              <ScrollRevealItem
                key={idx}
                className="glass-panel p-5 rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="p-2 rounded-xl glass-panel w-fit mb-3">
                    <Icon className={`w-4 h-4 ${s.color}`} />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[var(--text-main)] font-display mb-1.5">
                    {s.title}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed font-sans">
                    {s.desc}
                  </p>
                </div>
              </ScrollRevealItem>
            );
          })}
        </ScrollRevealContainer>
      </div>
    </section>
  );
}
