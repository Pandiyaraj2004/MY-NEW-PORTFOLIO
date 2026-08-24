import React from 'react';
import SectionHeader from '../components/SectionHeader';
import PaymentFlowVisualizer from '../scenes/PaymentFlowVisualizer';
import { Building, Calendar, MapPin, CheckCircle2, CreditCard, Webhook, Layout, GitPullRequest } from 'lucide-react';
import { ScrollRevealContainer, ScrollRevealItem } from '../components/ScrollReveal';

export default function SurfboardExperience() {
  const bullets = [
    "Engineered full-stack modules for payment authorization, checkout tokenization, and digital receipts.",
    "Implemented idempotent Node.js/Express webhook listeners with HMAC cryptographic validation.",
    "Integrated Figma UI prototypes into responsive React.js components with unified error boundaries.",
    "Collaborated on Git/GitHub pull requests, code reviews, and API contract validation."
  ];

  const tech = ["React.js", "Node.js", "Express.js", "REST APIs", "Payment Webhooks", "Git / GitHub", "Figma"];

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          badge="Software Development Internship"
          title="Payment engineering & production workflows."
          subtitle="Working on real-world fintech architecture in Chennai: order tokenization, webhook dispatching, and merchant interfaces."
        />

        {/* Company Card */}
        <ScrollRevealContainer className="glass-panel p-6 sm:p-8 rounded-2xl mb-8">
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
              <span className="px-3 py-1 rounded-lg glass-panel text-indigo-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> May 2026 – Jul 2026
              </span>
            </div>
          </div>

          {/* 4 Concise Bullets */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-6">
            {bullets.map((b, idx) => (
              <div key={idx} className="flex items-start gap-2.5 glass-panel p-3.5 rounded-xl">
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
                className="px-2.5 py-0.5 text-xs font-mono text-[var(--text-main)] glass-panel rounded-md"
              >
                {t}
              </span>
            ))}
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
