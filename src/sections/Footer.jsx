import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Heart, Sparkles } from 'lucide-react';

export default function Footer({ onOpenResume }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 px-4 sm:px-6 lg:px-8 border-t border-[var(--border-subtle)] glass-panel z-10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand & Tagline */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center text-white font-bold text-xs shadow-md">
            PJ
          </div>
          <div>
            <div className="text-xs font-bold text-[var(--text-main)] font-display tracking-wider">
              PANDIYARAJ A
            </div>
            <div className="text-[10px] text-[var(--text-dim)] font-mono">
              Full-Stack Developer | Python & JavaScript | AI Applications
            </div>
          </div>
        </div>

        {/* Quick Footer Links */}
        <div className="flex items-center gap-4 text-xs text-[var(--text-muted)] font-mono">
          <a href="#about" className="hover:text-[var(--text-main)] transition-colors">Identity</a>
          <a href="#skills" className="hover:text-[var(--text-main)] transition-colors">Skills</a>
          <a href="#experience" className="hover:text-[var(--text-main)] transition-colors">Experience</a>
          <a href="#projects" className="hover:text-[var(--text-main)] transition-colors">Projects</a>
          <button onClick={onOpenResume} className="hover:text-indigo-400 transition-colors">Resume</button>
        </div>

        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-panel text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
          title="Back to Top"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[var(--text-dim)] gap-2 text-center sm:text-left">
        <div>
          © {new Date().getFullYear()} Pandiyaraj A · MCA, Alagappa University · All Rights Reserved
        </div>
        <div className="flex items-center gap-1">
          <span>Engineered with React, Three.js & Tailwind</span>
        </div>
      </div>
    </footer>
  );
}
