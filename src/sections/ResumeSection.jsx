import React, { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import { FileText, Download, ExternalLink, ShieldCheck, ChevronUp, ChevronDown, Eye } from 'lucide-react';
import { ScrollRevealContainer, ScrollRevealItem } from '../components/ScrollReveal';

export default function ResumeSection({ onOpenModal }) {
  const [isMinimized, setIsMinimized] = useState(false);
  const resumeUrl = "/assets/Pandiyaraj_A_Resume.pdf";

  const resumeHighlights = [
    { label: "Degree Track", val: "MCA (2024–2026) · BCA (2021–2024)" },
    { label: "Internships", val: "Surfboard Payments & Edu Tantr" },
    { label: "Core Stack", val: "Python, JavaScript, React.js, Node.js" },
    { label: "Benchmark", val: "79.20% TCS NQT Percentile" }
  ];

  return (
    <section id="resume" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          badge="Candidate Resume"
          title="Official Curriculum Vitae & Qualifications"
          subtitle="Inspect Pandiyaraj's official 1-page resume directly below or download the PDF."
        />

        {/* 4 Staggered Highlights */}
        <ScrollRevealContainer className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6" stagger={0.06}>
          {resumeHighlights.map((h, idx) => (
            <ScrollRevealItem key={idx} className="glass-panel p-3.5 rounded-xl">
              <div className="text-[10px] font-mono text-[var(--text-dim)] uppercase">{h.label}</div>
              <div className="text-xs sm:text-sm font-bold text-[var(--text-main)] mt-0.5">{h.val}</div>
            </ScrollRevealItem>
          ))}
        </ScrollRevealContainer>

        {/* Embedded Interactive Resume Container */}
        <ScrollRevealContainer className="glass-panel rounded-2xl overflow-hidden shadow-2xl">
          {/* Top Frame Control Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border-b border-[var(--border-subtle)]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl glass-panel flex items-center justify-center text-indigo-400">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-[var(--text-main)] font-display">
                  Pandiyaraj_A_Resume.pdf
                </h3>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verified Document · 237 KB</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={resumeUrl}
                download="Pandiyaraj_A_Resume.pdf"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-md shadow-indigo-600/30 transition-all active:scale-95 border border-indigo-400/30"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </a>

              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-medium glass-panel text-[var(--text-main)] hover:text-indigo-400 transition-colors"
                title="Open in new tab"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Open</span>
              </a>

              {/* Minimize / Expand Button */}
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-medium glass-panel text-[var(--text-main)] hover:text-indigo-400 transition-colors"
                title={isMinimized ? "Expand Resume Preview" : "Minimize Resume Preview"}
                aria-expanded={!isMinimized}
              >
                {isMinimized ? (
                  <>
                    <ChevronDown className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Expand</span>
                  </>
                ) : (
                  <>
                    <ChevronUp className="w-3.5 h-3.5" />
                    <span>Minimize</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Embedded Viewer (iframe) */}
          <div
            className={`relative w-full transition-all duration-300 ease-in-out bg-slate-950/20 overflow-hidden ${
              isMinimized ? 'h-0' : 'h-[550px] sm:h-[700px]'
            }`}
          >
            <iframe
              src={`${resumeUrl}#toolbar=0&navpanes=0`}
              title="Pandiyaraj A Resume Embedded Preview"
              className="w-full h-full border-0"
            />
          </div>

          {/* Collapsed Notice when Minimized */}
          {isMinimized && (
            <div className="p-4 text-center border-t border-[var(--border-subtle)] bg-indigo-500/5">
              <button
                onClick={() => setIsMinimized(false)}
                className="inline-flex items-center gap-2 text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Resume preview is minimized. Click to expand preview.</span>
              </button>
            </div>
          )}
        </ScrollRevealContainer>
      </div>
    </section>
  );
}
