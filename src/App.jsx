import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import ScrollProgressBar from './components/ScrollProgressBar';
import Global3DCanvas from './scenes/Global3DCanvas';
import ProjectModal from './components/ProjectModal';
import CertificateModal from './components/CertificateModal';
import ResumeModal from './components/ResumeModal';

// Streamlined Story Sections
import Hero from './sections/Hero';
import About from './sections/About';
import Education from './sections/Education';
import Skills from './sections/Skills';
import DataScienceJourney from './sections/DataScienceJourney';
import SurfboardExperience from './sections/SurfboardExperience';
import Projects from './sections/Projects';
import AIJourney from './sections/AIJourney';
import Strengths from './sections/Strengths';
import Certificates from './sections/Certificates';
import CareerDirection from './sections/CareerDirection';
import FinalSummary from './sections/FinalSummary';
import ResumeSection from './sections/ResumeSection';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'dark';
  });

  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  useEffect(() => {
    // Attach theme attribute to html
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white font-mono p-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center shadow-xl shadow-indigo-500/30 animate-pulse mb-4">
          <span className="text-xl font-black font-display text-white">PJ</span>
        </div>
        <div className="text-xs font-bold tracking-widest text-slate-200 uppercase mb-2">
          PANDIYARAJ A · DEVELOPER STORY
        </div>
        <div className="w-36 h-1 bg-slate-900 rounded-full overflow-hidden mb-2 border border-slate-800">
          <div className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 animate-shimmer" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative text-[var(--text-main)] font-sans antialiased overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      {/* 1. Single Persistent Global 3D WebGL Background */}
      <Global3DCanvas theme={theme} />

      {/* Subtle Custom Cursor for Desktop */}
      <CustomCursor />

      {/* Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Dynamic Floating Navbar with Theme Toggle */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenResume={() => setResumeModalOpen(true)}
      />

      {/* Main Content Layer (Scrollable DOM sitting over fixed 3D canvas) */}
      <main className="relative z-10">
        {/* 01. Hero — Where the Journey Begins */}
        <Hero onOpenResume={() => setResumeModalOpen(true)} />

        {/* 02. Identity & Who I Am */}
        <About />

        {/* 03. Education — Academic Milestones (BCA -> MCA) */}
        <Education />

        {/* 04. The Toolbox / Skills (6 Domains with practical use cases) */}
        <Skills />

        {/* 05. Production Experience — Surfboard Payments & Edu Tantr Timeline */}
        <SurfboardExperience />

        {/* 07. Full-Stack Projects — ServiConnect, LiquiFlow, SelfCook */}
        <Projects onSelectProject={setSelectedProject} />

        {/* 08. Applied AI & Machine Learning — Vision CNN & NLP Bot */}
        <AIJourney onSelectProject={setSelectedProject} />

        {/* 09. Value & Mindset — 6 Engineering Strengths */}
        <Strengths />

        {/* 10. Achievements & Certifications — 8 Verified Records */}
        <Certificates onSelectCertificate={setSelectedCertificate} />

        {/* 11. The Horizon — NOW -> NEXT -> FUTURE Roadmap */}
        <CareerDirection />

        {/* 12. Executive Recruiter Snapshot — 10-Second Summary */}
        <FinalSummary onOpenResume={() => setResumeModalOpen(true)} />

        {/* 13. The Resume — Dedicated In-Page Showcase & Action Hub */}
        <ResumeSection onOpenModal={() => setResumeModalOpen(true)} />

        {/* 14. Connect — Direct Channels & Email Dispatcher */}
        <Contact onOpenResume={() => setResumeModalOpen(true)} />
      </main>

      {/* Footer */}
      <Footer onOpenResume={() => setResumeModalOpen(true)} />

      {/* Optional Deep-Dive Modals */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {selectedCertificate && (
        <CertificateModal
          certificate={selectedCertificate}
          onClose={() => setSelectedCertificate(null)}
        />
      )}

      {resumeModalOpen && (
        <ResumeModal
          isOpen={resumeModalOpen}
          onClose={() => setResumeModalOpen(false)}
        />
      )}
    </div>
  );
}
