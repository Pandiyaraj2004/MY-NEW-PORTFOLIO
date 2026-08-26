import React from 'react';
import SectionHeader from '../components/SectionHeader';
import PaymentFlowVisualizer from '../scenes/PaymentFlowVisualizer';
import { Building, Calendar, MapPin, CheckCircle2, CreditCard, Webhook, Layout, GitPullRequest, ArrowRight } from 'lucide-react';
import { ScrollRevealContainer, ScrollRevealItem } from '../components/ScrollReveal';
import TechIcon from '../components/TechIcon';

export default function SurfboardExperience() {
  const bullets = [
    "Engineered full-stack modules for payment authorization, checkout tokenization, and digital receipts.",
    "Implemented idempotent Node.js/Express webhook listeners with HMAC-SHA256 cryptographic validation.",
    "Integrated Figma UI prototypes into responsive React.js components with unified error boundaries.",
    "Collaborated on Git/GitHub pull requests, code reviews, and API contract validation."
  ];

  const tech = ["React.js", "Node.js", "Express.js", "REST APIs", "Payment Webhooks", "Git & GitHub", "Figma"];

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          badge="Software Development Internship"
          title="Payment engineering & production workflows."
          subtitle="Working on real-world fintech architecture in Chennai: order tokenization, webhook dispatching, and merchant interfaces."
        />

        {/* Company Card with Visual Architecture Banner */}
        <ScrollRevealContainer className="glass-panel rounded-2xl overflow-hidden mb-8 shadow-xl border border-[var(--border-subtle)]">
          {/* Visual Fintech Architecture Image */}
          <div className="relative w-full h-48 sm:h-64 overflow-hidden bg-slate-950 border-b border-[var(--border-subtle)]">
            <img
              src="/assets/surfboard-preview.jpg"
              alt="Surfboard Payments Architecture Diagram"
              width="1000"
              height="400"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
            
            <div className="absolute bottom-3 left-4 flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold text-cyan-300 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-cyan-500/30">
                Fintech Middleware & Terminal Pipeline
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-[var(--border-subtle)]">
              <div>
                <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono font-bold uppercase mb-1">
                  <Building className="w-3.5 h-3.5" />
                  Software Development Internship
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-main)] font-display">
                  Surfboard Payments · Chennai, Tamil Nadu
                </h3>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
                <span className="px-3 py-1 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-indigo-400 flex items-center gap-1.5 shadow-sm">
                  <Calendar className="w-3.5 h-3.5" /> May 2026 – Jul 2026
                </span>
              </div>
            </div>

            {/* 4 Concise Bullets */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-6">
              {bullets.map((b, idx) => (
                <div key={idx} className="flex items-start gap-2.5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-3.5 rounded-xl shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">{b}</span>
                </div>
              ))}
            </div>

            {/* Stack Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[var(--border-subtle)]">
              <span className="text-xs font-mono text-[var(--text-dim)] uppercase mr-1">Stack:</span>
              {tech.map((t, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-[var(--text-main)] bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg shadow-sm"
                >
                  <TechIcon name={t} className="w-3 h-3" />
                  <span>{t}</span>
                </span>
              ))}
            </div>
          </div>
        </ScrollRevealContainer>

        {/* Streamlined Payment Flow Simulator */}
        <ScrollRevealContainer>
          <PaymentFlowVisualizer />
        </ScrollRevealContainer>
      </div>
    </section>
  );
}
