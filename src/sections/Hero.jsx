import React from 'react';
import { 
  ArrowDown, 
  FileText, 
  Download, 
  Sparkles, 
  ShieldCheck, 
  Briefcase, 
  GraduationCap, 
  Code2, 
  Brain, 
  Layers, 
  CheckCircle2,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import TechIcon from '../components/TechIcon';

export default function Hero({ onOpenResume }) {
  const coreTech = [
    "React.js", "Node.js", "Python", "PostgreSQL", 
    "Gemini AI", "Express.js", "Tailwind CSS", "Flask"
  ];

  const highlights = [
    { label: "6+ Built Projects", desc: "Full-Stack, Fintech & AI platforms", icon: Code2, color: "text-indigo-400" },
    { label: "79.20% TCS NQT", desc: "National qualifier benchmark", icon: ShieldCheck, color: "text-cyan-400" },
    { label: "AI & ML Systems", desc: "CNNs, RAG vector retrieval & Gemini APIs", icon: Brain, color: "text-emerald-400" },
    { label: "Surfboard Payments", desc: "Production payment & webhook logic", icon: Layers, color: "text-purple-400" }
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden z-10"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* World-Class 3-Column Bento Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* ======================================================== */}
          {/* LEFT WING: Verified Production Experience & Benchmarks   */}
          {/* ======================================================== */}
          <div className="hidden lg:flex lg:col-span-3.5 flex-col space-y-4">
            {/* Widget 1: Production Experience */}
            <div className="glass-panel p-5 rounded-3xl border border-[var(--border-subtle)] hover:border-indigo-500/50 transition-all duration-300 shadow-xl group">
              <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-[var(--border-subtle)]">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Work History</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  Verified
                </span>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
                  <div className="flex items-center justify-between text-xs font-bold text-[var(--text-main)] mb-1">
                    <span className="group-hover:text-indigo-400 transition-colors">Surfboard Payments</span>
                    <span className="text-[10px] font-mono text-emerald-400 font-semibold">Completed</span>
                  </div>
                  <div className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                    Software Engineering Intern · Fintech middleware, Webhook APIs, & PostgreSQL
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
                  <div className="flex items-center justify-between text-xs font-bold text-[var(--text-main)] mb-1">
                    <span className="group-hover:text-cyan-400 transition-colors">Edu Tantr</span>
                    <span className="text-[10px] font-mono text-cyan-400 font-semibold">Completed</span>
                  </div>
                  <div className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                    Data Science & ML Intern · 10,000+ Record ETL & Power BI KPI dashboards
                  </div>
                </div>
              </div>
            </div>

            {/* Widget 2: Benchmark & Degree Distinction */}
            <div className="glass-panel p-5 rounded-3xl border border-[var(--border-subtle)] hover:border-cyan-500/50 transition-all duration-300 shadow-xl">
              <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-[var(--border-subtle)]">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  <GraduationCap className="w-4 h-4" />
                  <span>Academic Rank</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                  National Benchmark
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5 text-center">
                <div className="p-3 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
                  <div className="text-xl font-black text-amber-400 font-display">79.20%</div>
                  <div className="text-[10px] font-mono text-[var(--text-dim)] mt-0.5">TCS NQT Percentile</div>
                </div>
                <div className="p-3 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
                  <div className="text-lg font-black text-indigo-400 font-display">MCA & BCA</div>
                  <div className="text-[10px] font-mono text-[var(--text-dim)] mt-0.5">With Distinction</div>
                </div>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* CENTER STAGE: Profile, Name & Call-To-Action             */}
          {/* ======================================================== */}
          <div className="lg:col-span-5 flex flex-col items-center text-center">
            {/* Status / Motto Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel shadow-md mb-5 border border-[var(--border-subtle)]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-xs font-mono font-medium text-[var(--text-main)]">
                Engineering with logic · Scaling with intelligence
              </span>
            </div>

            {/* Profile Portrait & Glowing Halo */}
            <div className="relative mb-5 group">
              <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-violet-500 opacity-40 blur-xl group-hover:opacity-75 transition-opacity duration-300 pointer-events-none" />

              <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-52 md:h-52 rounded-full p-2 bg-gradient-to-b from-white/30 to-white/10 border-2 border-white/40 shadow-2xl overflow-hidden">
                <img
                  src="/assets/pandiyaraj-profile.png"
                  alt="Pandiyaraj A"
                  width="220"
                  height="220"
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover rounded-full filter contrast-105 group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-3.5 py-1 rounded-full glass-panel text-[11px] font-mono font-bold text-indigo-400 shadow-xl flex items-center gap-1.5 border border-indigo-500/60">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>MCA · Distinction</span>
              </div>
            </div>

            {/* Headline & Value Proposition */}
            <div className="space-y-2 max-w-xl">
              <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-[var(--text-main)] leading-tight">
                PANDIYARAJ <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-blue-400">A</span>
              </h1>

              <p className="text-xs sm:text-sm font-mono font-semibold text-cyan-400">
                Full-Stack Developer | Python & JavaScript | AI-Powered Applications
              </p>

              <p className="text-xs sm:text-[13px] text-[var(--text-muted)] max-w-md mx-auto leading-relaxed pt-1 font-sans">
                Engineering resilient software at the intersection of modern React frontends, robust Node.js/Python microservices, and applied AI models.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 mt-5">
              <button
                onClick={onOpenResume}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-lg shadow-indigo-600/30 transition-all active:scale-95 border border-indigo-400/30 font-mono"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View Full Resume</span>
              </button>

              <a
                href="/assets/Pandiyaraj_A_Resume.pdf"
                download="Pandiyaraj_A_Resume.pdf"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold glass-panel text-[var(--text-main)] hover:text-cyan-400 transition-colors font-mono"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                <span>Download PDF</span>
              </a>

              <a
                href="#about"
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-medium glass-panel text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors font-mono"
              >
                <span>Scroll Journey</span>
                <ArrowDown className="w-3 h-3 text-indigo-400 animate-bounce" />
              </a>
            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT WING: Core Tech Arsenal & Featured Architectures   */}
          {/* ======================================================== */}
          <div className="hidden lg:flex lg:col-span-3.5 flex-col space-y-4">
            {/* Widget 1: Core Stack Matrix */}
            <div className="glass-panel p-5 rounded-3xl border border-[var(--border-subtle)] hover:border-indigo-500/50 transition-all duration-300 shadow-xl">
              <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-[var(--border-subtle)]">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
                  <Code2 className="w-4 h-4" />
                  <span>Core Tech Stack</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
                  Full-Stack
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {coreTech.map((tech, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[11px] font-mono font-medium text-[var(--text-main)] hover:border-indigo-400/40 transition-colors shadow-sm"
                  >
                    <TechIcon name={tech} className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="truncate">{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Widget 2: Featured Project Blueprints */}
            <div className="glass-panel p-5 rounded-3xl border border-[var(--border-subtle)] hover:border-purple-500/50 transition-all duration-300 shadow-xl">
              <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-[var(--border-subtle)]">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Key Platforms</span>
                </div>
                <a href="#projects" className="text-[10px] font-mono text-indigo-400 hover:text-indigo-300 flex items-center gap-0.5">
                  <span>Explore</span>
                  <ChevronRight className="w-3 h-3" />
                </a>
              </div>

              <div className="space-y-2">
                <a href="#projects" className="block p-2.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-indigo-500/50 transition-colors">
                  <div className="flex items-center justify-between text-xs font-bold text-[var(--text-main)] mb-0.5">
                    <span>ServiConnect</span>
                    <span className="text-[10px] font-mono text-indigo-400">AI Marketplace</span>
                  </div>
                  <div className="text-[11px] text-[var(--text-muted)]">13+ Service Categories · Gemini Verification</div>
                </a>

                <a href="#projects" className="block p-2.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-cyan-500/50 transition-colors">
                  <div className="flex items-center justify-between text-xs font-bold text-[var(--text-main)] mb-0.5">
                    <span>LiquiFlow</span>
                    <span className="text-[10px] font-mono text-cyan-400">Fintech</span>
                  </div>
                  <div className="text-[11px] text-[var(--text-muted)]">Post-Auth Treasury Middleware & Reconciliation</div>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Mobile-Only Summary Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-8 lg:hidden">
          {highlights.map((h, idx) => {
            const Icon = h.icon;
            return (
              <div key={idx} className="glass-panel p-3.5 rounded-2xl border border-[var(--border-subtle)] text-left shadow-sm">
                <div className={`flex items-center gap-1.5 text-xs font-mono font-bold ${h.color} mb-1`}>
                  <Icon className="w-3.5 h-3.5" />
                  <span className="truncate">{h.label}</span>
                </div>
                <div className="text-[11px] text-[var(--text-muted)] line-clamp-2">
                  {h.desc}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
