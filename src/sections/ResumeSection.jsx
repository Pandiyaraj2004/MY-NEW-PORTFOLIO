import React, { useState, useEffect } from 'react';
import SectionHeader from '../components/SectionHeader';
import { 
  FileText, 
  Download, 
  ExternalLink, 
  ShieldCheck, 
  ChevronUp, 
  ChevronDown, 
  Eye, 
  Briefcase, 
  GraduationCap, 
  Code2, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { StoryStep } from '../components/ScrollReveal';

export default function ResumeSection({ onOpenModal }) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileIframe, setShowMobileIframe] = useState(false);
  const resumeUrl = "/assets/Pandiyaraj_A_Resume.pdf";

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const resumeHighlights = [
    { label: "Degree Track", val: "MCA (Distinction) · BCA (Distinction)" },
    { label: "Internships", val: "Surfboard Payments & Edu Tantr" },
    { label: "Core Stack", val: "Python, JavaScript, React.js, Node.js" },
    { label: "Benchmark", val: "79.20% TCS NQT Percentile" }
  ];

  return (
    <section id="resume" className="py-28 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <StoryStep className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel shadow-md mb-4 border border-[var(--border-subtle)]">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400">
              Verified Qualifications
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-[var(--text-main)] mb-3">
            Engineering Background & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400">Credentials.</span>
          </h2>
          
          <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-xl mx-auto font-sans leading-relaxed">
            Explore Pandiyaraj's technical proficiencies, production experience, and official qualifications directly below or download the PDF.
          </p>
        </StoryStep>

        {/* Step 1: 4 Staggered Highlights */}
        <StoryStep className="mb-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
            {resumeHighlights.map((h, idx) => (
              <div key={idx} className="glass-panel p-4 rounded-2xl border border-[var(--border-subtle)] shadow-sm">
                <div className="text-[10px] font-mono text-[var(--text-dim)] uppercase tracking-wider">{h.label}</div>
                <div className="text-xs sm:text-sm font-bold text-[var(--text-main)] mt-1">{h.val}</div>
              </div>
            ))}
          </div>
        </StoryStep>

        {/* Step 2: Resume Showcase Container */}
        <StoryStep>
          <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl border border-[var(--border-subtle)]">
            {/* Top Frame Control Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 border-b border-[var(--border-subtle)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-center text-indigo-400 shadow-sm">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-[var(--text-main)] font-display">
                    Pandiyaraj_A_Resume.pdf
                  </h3>
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified Document · 287 KB</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={resumeUrl}
                  download="Pandiyaraj_A_Resume.pdf"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-md shadow-indigo-600/30 transition-all active:scale-95 border border-indigo-400/30 font-mono"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </a>

                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-medium glass-panel text-[var(--text-main)] hover:text-indigo-400 transition-colors font-mono"
                  title="Open in new tab"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Open</span>
                </a>

                {!isMobile && (
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-medium glass-panel text-[var(--text-main)] hover:text-indigo-400 transition-colors font-mono"
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
                )}
              </div>
            </div>

            {/* Desktop PDF Viewer vs Mobile Interactive Native Resume Card */}
            {isMobile && !showMobileIframe ? (
              <div className="p-5 sm:p-6 space-y-4">
                <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-[var(--text-main)] leading-relaxed">
                  <div className="font-bold text-indigo-400 flex items-center gap-1.5 mb-1 text-sm font-display">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    Quick Executive Profile Snapshot
                  </div>
                  <p className="text-[var(--text-muted)]">
                    MCA Postgraduate (Graduated with Distinction) from Alagappa University with hands-on production fintech internship at <strong>Surfboard Payments</strong> and data science internship at <strong>Edu Tantr</strong>. 79.20% TCS NQT national benchmark.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="glass-panel p-4 rounded-2xl border border-[var(--border-subtle)]">
                    <div className="text-xs font-bold text-indigo-400 flex items-center gap-1.5 mb-2 font-mono">
                      <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                      Core Engineering Stack
                    </div>
                    <div className="text-xs text-[var(--text-muted)] space-y-1">
                      <div>• <strong>Languages:</strong> Python, JavaScript (ES6+), SQL, C++</div>
                      <div>• <strong>Frontend:</strong> React.js, Tailwind CSS, HTML5/CSS3</div>
                      <div>• <strong>Backend:</strong> Node.js, Express.js, REST APIs</div>
                      <div>• <strong>AI/ML:</strong> Gemini APIs, MobileNetV2 CNN, RAG</div>
                    </div>
                  </div>

                  <div className="glass-panel p-4 rounded-2xl border border-[var(--border-subtle)]">
                    <div className="text-xs font-bold text-cyan-400 flex items-center gap-1.5 mb-2 font-mono">
                      <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
                      Verified Experience
                    </div>
                    <div className="text-xs text-[var(--text-muted)] space-y-1">
                      <div>• <strong>Surfboard Payments:</strong> Full-stack fintech & webhooks (Completed)</div>
                      <div>• <strong>Edu Tantr:</strong> Data science & ML pipelines (Completed)</div>
                      <div>• <strong>Projects:</strong> ServiConnect, LiquiFlow, Crop AI</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition-all active:scale-95 font-mono"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open Full PDF in New Tab</span>
                  </a>

                  <button
                    onClick={() => setShowMobileIframe(true)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-medium glass-panel text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors font-mono"
                  >
                    <Eye className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Load Embedded PDF Viewer</span>
                  </button>
                </div>
              </div>
            ) : (
              <div
                className={`relative w-full transition-all duration-300 ease-in-out bg-slate-950/20 overflow-hidden ${
                  isMinimized ? 'h-0' : 'h-[550px] sm:h-[700px]'
                }`}
              >
                <iframe
                  src={`${resumeUrl}#toolbar=0&navpanes=0`}
                  title="Pandiyaraj A Resume Embedded Preview"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
            )}

            {/* Collapsed Notice when Minimized */}
            {isMinimized && !isMobile && (
              <div className="p-4 text-center border-t border-[var(--border-subtle)] bg-indigo-500/5">
                <button
                  onClick={() => setIsMinimized(false)}
                  className="inline-flex items-center gap-2 text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors font-mono"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Resume preview is minimized. Click to expand preview.</span>
                </button>
              </div>
            )}
          </div>
        </StoryStep>
      </div>
    </section>
  );
}
