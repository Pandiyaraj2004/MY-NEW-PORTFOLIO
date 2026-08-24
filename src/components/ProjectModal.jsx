import React, { useEffect } from 'react';
import { X, Github, ExternalLink, CheckCircle, Layers, Cpu, ShieldAlert, Sparkles } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-y-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header Banner */}
        <div className="sticky top-0 z-20 flex items-center justify-between p-6 bg-slate-900/95 border-b border-slate-800 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              CASE STUDY
            </span>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              {project.category}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors focus:outline-none"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Title & Tagline */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
              {project.title}
            </h3>
            <p className="mt-2 text-base text-slate-300 leading-relaxed font-sans">
              {project.tagline}
            </p>
          </div>

          {/* Quick Metrics Bar */}
          {project.stats && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {project.stats.map((s, idx) => (
                <div key={idx} className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-xl">
                  <div className="text-[11px] text-slate-400 font-mono">{s.label}</div>
                  <div className="text-sm sm:text-base font-bold text-indigo-300 mt-0.5">{s.value}</div>
                </div>
              ))}
            </div>
          )}

          {/* Tech Stack Pills */}
          <div>
            <div className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
              Technologies & Infrastructure
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-xs font-medium bg-slate-950 border border-slate-800 text-slate-300 rounded-lg"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Problem & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-slate-950/60 border border-slate-800/80 p-5 rounded-xl">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold uppercase mb-2">
                <ShieldAlert className="w-4 h-4" />
                Problem Statement
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="bg-slate-950/60 border border-slate-800/80 p-5 rounded-xl">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold uppercase mb-2">
                <Sparkles className="w-4 h-4" />
                Engineering Solution
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Architecture Breakdown */}
          {project.architecture && (
            <div className="bg-slate-950/70 border border-slate-800/90 p-5 sm:p-6 rounded-xl">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono font-bold uppercase mb-4">
                <Layers className="w-4 h-4" />
                Architectural Breakdown
              </div>
              <div className="space-y-2.5">
                {project.architecture.map((arch, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 flex-shrink-0" />
                    <span>{arch}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Contributions */}
          <div>
            <div className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Key Contributions & Engineering Impact
            </div>
            <div className="space-y-2.5">
              {project.keyContributions.map((contrib, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-slate-950/40 border border-slate-800/60 p-3 rounded-xl">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-slate-300">{contrib}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Outcome Statement */}
          <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-800/40 text-xs sm:text-sm text-indigo-200">
            <strong>Outcome:</strong> {project.outcome}
          </div>
        </div>

        {/* Modal Footer Links */}
        <div className="p-6 bg-slate-900 border-t border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition-colors border border-slate-700"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repository</span>
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Project Demo</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
