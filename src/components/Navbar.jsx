import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, Download, ChevronRight, Sun, Moon } from 'lucide-react';

export default function Navbar({ theme = 'dark', onToggleTheme, onOpenResume }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { name: "Journey", href: "#hero" },
    { name: "Identity", href: "#about" },
    { name: "Education", href: "#education" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "AI", href: "#ai-journey" },
    { name: "Strengths", href: "#strengths" },
    { name: "Credentials", href: "#certificates" },
    { name: "Horizon", href: "#career-direction" },
    { name: "Resume", href: "#resume" },
    { name: "Contact", href: "#contact" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Section spy
      const sections = navLinks.map(l => l.href.substring(1));
      const scrollPos = window.scrollY + 250;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass-nav py-2.5 shadow-xl'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Name */}
          <a
            href="#hero"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden border border-[var(--border-subtle)] group-hover:border-indigo-500/80 transition-colors shadow-md">
              <img
                src="/assets/pandiyaraj-profile.png"
                alt="Pandiyaraj A"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-indigo-500/10 pointer-events-none" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-xs sm:text-sm text-[var(--text-main)] tracking-wider group-hover:text-indigo-400 transition-colors">
                PANDIYARAJ A
              </span>
              <span className="text-[9px] text-[var(--text-muted)] font-mono tracking-tight hidden sm:block">
                Full-Stack & AI Engineer
              </span>
            </div>
          </a>

          {/* Desktop Nav Links (Scroll Spy Bar) */}
          <nav className="hidden xl:flex items-center gap-0.5 glass-panel rounded-full px-2.5 py-1 shadow-inner">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-2.5 py-1 text-[11px] font-medium rounded-full transition-all duration-150 ${
                    isActive
                      ? 'bg-indigo-600/30 text-indigo-400 border border-indigo-500/40 shadow-sm font-semibold'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card-hover)]'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right Controls: Theme Toggle + Resume CTA + Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              className="p-2 rounded-xl glass-panel text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors focus:outline-none active:scale-95"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 transition-transform rotate-0 hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600 transition-transform rotate-0 hover:-rotate-12" />
              )}
            </button>

            {/* Resume Button */}
            <a
              href="#resume"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-md shadow-indigo-600/25 transition-all active:scale-95 border border-indigo-400/30"
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Resume</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl glass-panel text-[var(--text-muted)] hover:text-[var(--text-main)] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[var(--bg-base)]/95 backdrop-blur-2xl xl:hidden flex flex-col justify-between pt-20 pb-8 px-6">
          <div className="space-y-1 overflow-y-auto">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2.5 px-4 rounded-xl text-sm font-semibold text-[var(--text-main)] hover:bg-[var(--bg-card-hover)] border border-transparent hover:border-[var(--border-subtle)] transition-colors"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-[var(--text-dim)]" />
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-[var(--border-subtle)] space-y-2.5">
            <button
              onClick={() => {
                onToggleTheme();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold glass-panel text-[var(--text-main)]"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
              <span>Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
            </button>

            <a
              href="#resume"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
            >
              <FileText className="w-4 h-4" />
              <span>Jump to Resume</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
