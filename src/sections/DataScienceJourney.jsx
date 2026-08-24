import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { Building, Calendar, MapPin, CheckCircle2, LineChart, Database, Terminal, Cpu } from 'lucide-react';
import { ScrollRevealContainer, ScrollRevealItem } from '../components/ScrollReveal';

export default function DataScienceJourney() {
  const bullets = [
    "Cleaned, preprocessed, and analyzed 10,000+ records using Pandas/NumPy, cutting noise 30%.",
    "Constructed feature scaling, encoding, and missing-value imputation pipelines.",
    "Tuned and evaluated supervised machine learning classification models.",
    "Authored multi-table SQL queries and designed interactive Power BI KPI dashboards."
  ];

  const tools = ["Python", "Pandas", "NumPy", "Scikit-Learn", "SQL", "Power BI", "EDA"];

  return (
    <section id="data-science" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          badge="Data Science Internship"
          title="Extracting business signals from raw data."
          subtitle="Before building full-stack products, I learned how to clean noise, engineer features, and extract predictive patterns."
        />

        {/* Staggered Internship Card */}
        <ScrollRevealContainer className="glass-panel p-6 sm:p-8 rounded-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-[var(--border-subtle)]">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase mb-1">
                <Building className="w-3.5 h-3.5" />
                Data Science Internship
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-main)] font-display">
                Edu Tantr · Bengaluru, Karnataka
              </h3>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
              <span className="px-3 py-1 rounded-lg glass-panel text-cyan-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Apr 2025 – Jul 2025
              </span>
            </div>
          </div>

          {/* 4 Concise Achievement Bullets */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-6">
            {bullets.map((b, idx) => (
              <div key={idx} className="flex items-start gap-2.5 glass-panel p-3.5 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">{b}</span>
              </div>
            ))}
          </div>

          {/* Stack Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[var(--border-subtle)]">
            <span className="text-xs font-mono text-[var(--text-dim)] uppercase mr-1">Toolkit:</span>
            {tools.map((t, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 text-xs font-mono text-[var(--text-main)] glass-panel rounded-md"
              >
                {t}
              </span>
            ))}
          </div>
        </ScrollRevealContainer>
      </div>
    </section>
  );
}
