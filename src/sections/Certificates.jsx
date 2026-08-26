import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { certificates } from '../data/certificates';
import { ExternalLink, ShieldCheck, Award, Sparkles } from 'lucide-react';
import { ScrollRevealContainer, ScrollRevealItem } from '../components/ScrollReveal';

export default function Certificates({ onSelectCertificate }) {
  return (
    <section id="certificates" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          badge="Verified Credentials"
          title="Verifiable benchmarks & industry simulations."
          subtitle="From the 79.20% TCS NQT national benchmark to TCS iON Machine Learning and Deloitte / Tata simulations."
        />

        {/* Featured TCS NQT Benchmark Visual Card */}
        <ScrollRevealContainer className="glass-panel rounded-2xl overflow-hidden mb-8 border border-[var(--border-subtle)] shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 items-center">
            <div className="md:col-span-7 relative h-56 sm:h-64 overflow-hidden bg-slate-950 border-b md:border-b-0 md:border-r border-[var(--border-subtle)]">
              <img
                src="/assets/tcs-nqt-preview.jpg"
                alt="TCS NQT National Benchmark Certificate"
                width="700"
                height="380"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="md:col-span-5 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-mono font-bold text-amber-400 uppercase bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                    National Benchmark
                  </span>
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Score
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[var(--text-main)] font-display mb-1">
                  TCS NQT — 79.20% Percentile
                </h3>
                <p className="text-xs text-indigo-400 font-mono mb-3">
                  National Qualifier Test · Top Tier Ranking
                </p>

                <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">
                  Standardized competitive benchmark evaluating Advanced Coding, Algorithmic Thinking, Data Structures, and Cognitive Reasoning among thousands of candidates nationwide.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-[var(--border-subtle)]">
                <div className="text-[11px] font-mono text-[var(--text-dim)]">
                  Issued: October 2024
                </div>
              </div>
            </div>
          </div>
        </ScrollRevealContainer>

        {/* 8 Staggered Certificate Cards */}
        <ScrollRevealContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" stagger={0.06}>
          {certificates.map((cert) => (
            <ScrollRevealItem
              key={cert.id}
              className="glass-panel p-4 sm:p-5 rounded-2xl flex flex-col justify-between hover:border-[var(--border-active)] transition-colors shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="font-mono text-[11px] font-bold text-indigo-400 truncate">
                    {cert.issuer}
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[var(--bg-surface)] text-cyan-400 border border-[var(--border-subtle)]">
                    {cert.year}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-[var(--text-main)] font-display mb-1.5 line-clamp-2">
                  {cert.title}
                </h3>

                {cert.badge && (
                  <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-2">
                    {cert.badge}
                  </span>
                )}

                <p className="text-[11px] text-[var(--text-muted)] leading-relaxed font-sans line-clamp-2 mb-3">
                  {cert.description}
                </p>
              </div>

              <div className="pt-2.5 border-t border-[var(--border-subtle)] flex items-center justify-between">
                <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verified</span>
                </div>

                {cert.link ? (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    <span>Verify</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-[10px] text-[var(--text-dim)] font-mono">
                    Document
                  </span>
                )}
              </div>
            </ScrollRevealItem>
          ))}
        </ScrollRevealContainer>
      </div>
    </section>
  );
}
