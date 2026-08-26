import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { Sparkles, ArrowRight, Compass } from 'lucide-react';
import { StoryStep } from '../components/ScrollReveal';

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
    <section id="career-direction" className="py-28 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <StoryStep className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel shadow-md mb-4 border border-[var(--border-subtle)]">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400">
              Career Trajectory
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-[var(--text-main)] mb-3">
            Where I am directing my <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400">energy.</span>
          </h2>
          
          <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-xl mx-auto font-sans leading-relaxed">
            Actively seeking software engineering roles where I can build scalable products, integrate AI models, and deliver measurable impact.
          </p>
        </StoryStep>

        {/* 3 Staggered Trajectory Cards (Scroll-Driven Scene) */}
        <StoryStep>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trajectory.map((step, idx) => (
              <div
                key={idx}
                className="glass-panel p-6 sm:p-7 rounded-3xl border border-[var(--border-subtle)] hover:border-indigo-500/50 hover:scale-[1.02] transition-all duration-300 shadow-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-mono font-black px-3 py-1 rounded-md bg-gradient-to-r ${step.accent} text-white shadow-md`}>
                      {step.phase}
                    </span>
                    <span className="text-[11px] font-mono text-[var(--text-dim)]">
                      {step.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--text-main)] font-display mb-2.5">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-[13px] text-[var(--text-muted)] leading-relaxed mb-5 font-sans">
                    {step.description}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-[var(--border-subtle)]">
                    {step.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </StoryStep>
      </div>
    </section>
  );
}
