import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { certificates } from '../data/certificates';
import { ExternalLink, ShieldCheck, Award, Sparkles } from 'lucide-react';
import { StoryStep } from '../components/ScrollReveal';

export default function Certificates({ onSelectCertificate }) {
  return (
    <section id="certificates" className="py-28 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <StoryStep className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel shadow-md mb-4 border border-[var(--border-subtle)]">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400">
              Verified Credentials
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-[var(--text-main)] mb-3">
            Verifiable benchmarks & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-indigo-400">credentials.</span>
          </h2>
          
          <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-xl mx-auto font-sans leading-relaxed">
            From the 79.20% TCS NQT national benchmark to TCS iON Machine Learning and Deloitte / Tata simulations.
          </p>
        </StoryStep>

        {/* Step 1: Featured TCS NQT Benchmark Visual Card */}
        <StoryStep className="mb-20">
          <div className="glass-panel rounded-3xl overflow-hidden border border-[var(--border-subtle)] hover:border-amber-500/50 transition-all duration-300 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-12 items-center">
              <div className="md:col-span-7 relative h-64 sm:h-80 overflow-hidden bg-slate-950 border-b md:border-b-0 md:border-r border-[var(--border-subtle)]">
                <img
                  src="/assets/tcs-nqt-preview.jpg"
                  alt="TCS NQT National Benchmark Certificate"
                  width="700"
                  height="400"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
              </div>

              <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-mono font-bold text-amber-400 uppercase bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                      National Benchmark
                    </span>
                    <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Verified Score
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-[var(--text-main)] font-display mb-1.5">
                    TCS NQT — 79.20% Percentile
                  </h3>
                  <p className="text-xs text-indigo-400 font-mono mb-4">
                    National Qualifier Test · Top Tier Ranking
                  </p>

                  <p className="text-xs sm:text-[13px] text-[var(--text-muted)] leading-relaxed mb-6 font-sans">
                    Standardized competitive benchmark evaluating Advanced Coding, Algorithmic Thinking, Data Structures, and Cognitive Reasoning among thousands of candidates nationwide.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
                  <div className="text-[11px] font-mono text-[var(--text-dim)]">
                    Issued: October 2024
                  </div>
                  <div className="text-[11px] font-mono font-bold text-emerald-400">
                    Validated Score
                  </div>
                </div>
              </div>
            </div>
          </div>
        </StoryStep>

        {/* Step 2: 8 Staggered Certificate Cards */}
        <StoryStep>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="glass-panel p-5 rounded-2xl flex flex-col justify-between hover:border-indigo-500/50 hover:scale-[1.02] transition-all duration-200 shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2.5">
                    <span className="font-mono text-[11px] font-bold text-indigo-400 truncate">
                      {cert.issuer}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[var(--bg-surface)] text-cyan-400 border border-[var(--border-subtle)]">
                      {cert.year}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[var(--text-main)] font-display mb-2 line-clamp-2 leading-snug">
                    {cert.title}
                  </h3>

                  {cert.badge && (
                    <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-2.5">
                      {cert.badge}
                    </span>
                  )}

                  <p className="text-[11px] text-[var(--text-muted)] leading-relaxed font-sans line-clamp-2 mb-4">
                    {cert.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Verified</span>
                  </div>

                  {cert.link ? (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors font-mono"
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
              </div>
            ))}
          </div>
        </StoryStep>
      </div>
    </section>
  );
}
