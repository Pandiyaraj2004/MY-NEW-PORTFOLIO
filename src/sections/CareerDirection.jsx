import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { Sparkles, ArrowRight } from 'lucide-react';
import { ScrollRevealContainer, ScrollRevealItem } from '../components/ScrollReveal';

export default function CareerDirection() {
  const trajectory = [
    {
      phase: "NOW",
      title: "Full-Stack & Applied AI",
      badge: "Current Focus",
      accent: "from-blue-500 to-indigo-500",
      description: "Engineering practical full-stack apps with React, Node.js, Python, and integrating LLMs/Vision models for real-world utility.",
      items: [
        "Full-Stack Web Engineering (React/Node)",
        "Generative AI & Gemini API Integrations",
        "Payment & Transaction Workflow Logic"
      ]
    },
    {
      phase: "NEXT",
      title: "AI Systems & Scale",
      badge: "Immediate Trajectory",
      accent: "from-indigo-500 to-cyan-500",
      description: "Building production RAG pipelines, low-latency microservices, and scaling distributed backend architectures.",
      items: [
        "Agentic RAG & Fine-Tuned Models",
        "High-Throughput Microservice APIs",
        "Distributed Databases & Cloud Reliability"
      ]
    },
    {
      phase: "FUTURE",
      title: "Intelligent Autonomous Systems",
      badge: "Long-term Horizon",
      accent: "from-cyan-500 to-emerald-500",
      description: "Leading the architecture of resilient, intelligent software systems solving complex real-world challenges.",
      items: [
        "Domain-Specific Autonomous Workflows",
        "Mission-Critical System Reliability",
        "High-Impact Engineering Leadership"
      ]
    }
  ];

  return (
    <section id="career-direction" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          badge="Career Trajectory"
          title="Where I am directing my energy."
          subtitle="Actively seeking software engineering roles where I can build scalable products, integrate AI models, and deliver measurable impact."
        />

        {/* 3 Staggered Trajectory Cards */}
        <ScrollRevealContainer className="grid grid-cols-1 md:grid-cols-3 gap-5" stagger={0.09}>
          {trajectory.map((step, idx) => (
            <ScrollRevealItem
              key={idx}
              className="glass-panel p-6 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-mono font-black px-2.5 py-0.5 rounded-md bg-gradient-to-r ${step.accent} text-white shadow`}>
                    {step.phase}
                  </span>
                  <span className="text-[10px] font-mono text-[var(--text-dim)]">
                    {step.badge}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[var(--text-main)] font-display mb-2">
                  {step.title}
                </h3>

                <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4 font-sans">
                  {step.description}
                </p>

                <div className="space-y-1.5 pt-3 border-t border-[var(--border-subtle)]">
                  {step.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollRevealItem>
          ))}
        </ScrollRevealContainer>
      </div>
    </section>
  );
}
