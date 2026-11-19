import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useVelocity, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { 
  ArrowDown, 
  FileText, 
  Download, 
  Sparkles, 
  Code2, 
  Brain, 
  Layers, 
  ShieldCheck 
} from 'lucide-react';

/**
 * MagneticButton: Shifts smoothly toward cursor on hover with spring physics on desktop
 */
function MagneticButton({ children, onClick, href, download, className = "" }) {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  const handleMouseMove = (e) => {
    if (isTouch || !buttonRef.current) return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = (e.clientX - centerX) * 0.28;
    const distanceY = (e.clientY - centerY) * 0.28;
    setPosition({ x: distanceX, y: distanceY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 220, damping: 14, mass: 0.1 }}
      onClick={onClick}
      href={href}
      download={download}
      className={className}
    >
      {children}
    </Component>
  );
}

export default function Hero({ onOpenResume }) {
  // 1. Role Cycling Morph Ticker
  const roles = [
    "Full-Stack Developer",
    "AI & Machine Learning Engineer",
    "Fintech Middleware Builder",
    "Systems Thinker"
  ];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // 2. Scroll Velocity Distortion (Active on Desktop)
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 40, stiffness: 200 });
  const skewX = useTransform(smoothVelocity, [-1500, 0, 1500], [-3.5, 0, 3.5]);
  const letterSpacing = useTransform(smoothVelocity, [-1200, 0, 1200], ["0.04em", "0.01em", "0.04em"]);

  // 3. Staged Kinetic Entrance Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05
      }
    }
  };

  const nameLetters = "PANDIYARAJ".split("");

  const letterVariants = {
    hidden: { opacity: 0, y: 28, rotateX: 45 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 22, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const highlights = [
    { label: "6+ Built Projects", desc: "Full-Stack, Fintech & AI platforms", icon: Code2, color: "text-indigo-600 dark:text-indigo-400" },
    { label: "79.20% TCS NQT", desc: "National qualifier programming benchmark", icon: ShieldCheck, color: "text-cyan-600 dark:text-cyan-400" },
    { label: "AI & ML Systems", desc: "CNNs, RAG vector retrieval & Gemini APIs", icon: Brain, color: "text-emerald-600 dark:text-emerald-400" },
    { label: "Surfboard Payments", desc: "Production payment & webhook logic", icon: Layers, color: "text-purple-600 dark:text-purple-400" }
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden z-10"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto w-full flex flex-col items-center text-center"
      >
        {/* Step 1: Status Badge */}
        <motion.div variants={fadeUpVariant}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel shadow-lg mb-6 border border-[var(--border-subtle)] backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-ping" />
            <span className="text-[11px] sm:text-xs font-mono font-medium text-[var(--text-main)]">
              Engineering with logic · Scaling with intelligence
            </span>
          </div>
        </motion.div>

        {/* Step 2: Profile Portrait with Refractive Glass Halo */}
        <motion.div variants={fadeUpVariant} className="relative mb-6 group">
          <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-violet-500 opacity-45 blur-xl group-hover:opacity-75 transition-opacity duration-300 pointer-events-none transform translate-z-0" />

          <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full p-2 bg-gradient-to-b from-white/80 dark:from-white/30 to-white/40 dark:to-white/10 border-2 border-slate-300 dark:border-white/40 shadow-2xl overflow-hidden backdrop-blur-sm">
            <img
              src="/assets/pandiyaraj-profile.png"
              alt="Pandiyaraj A"
              width="240"
              height="240"
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover rounded-full filter contrast-105 group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-1 rounded-full glass-panel text-[11px] sm:text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 shadow-xl flex items-center gap-1.5 border border-indigo-500/50 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>MCA · Distinction</span>
          </div>
        </motion.div>

        {/* Step 3: Kinetic Velocity-Reactive Headline */}
        <motion.div
          style={{ skewX, letterSpacing }}
          className="space-y-3 max-w-3xl"
        >
          {/* Staggered Letter Reveal */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-display tracking-tight text-[var(--text-main)] leading-none inline-flex items-center justify-center flex-wrap gap-x-1">
            {nameLetters.map((char, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                className="inline-block transform-gpu"
              >
                {char}
              </motion.span>
            ))}
            <motion.span
              variants={letterVariants}
              className="inline-block ml-3 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 dark:from-indigo-400 via-cyan-500 dark:via-cyan-300 to-blue-600 dark:to-blue-400"
            >
              A
            </motion.span>
          </h1>

          {/* Morphing Role Cycling Ticker */}
          <div className="h-8 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentRoleIndex}
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -16, opacity: 0 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="text-xs sm:text-sm md:text-base font-mono font-bold text-cyan-600 dark:text-cyan-400 tracking-wide"
              >
                {roles[currentRoleIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.p
            variants={fadeUpVariant}
            className="text-xs sm:text-sm text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed font-sans pt-0.5"
          >
            Engineering resilient software at the intersection of modern React frontends, robust Node.js/Python microservices, and applied AI models.
          </motion.p>
        </motion.div>

        {/* Step 4: Magnetic Action Hub */}
        <motion.div variants={fadeUpVariant} className="flex flex-wrap items-center justify-center gap-3.5 mt-7">
          <MagneticButton
            onClick={onOpenResume}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-lg shadow-indigo-600/30 transition-all active:scale-95 border border-indigo-400/30 font-mono"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>View Full Resume</span>
          </MagneticButton>

          <MagneticButton
            href="/assets/Pandiyaraj_A_Resume.pdf"
            download="Pandiyaraj_A_Resume.pdf"
            className="flex items-center gap-2 px-4.5 py-2.5 rounded-xl text-xs font-semibold glass-panel text-[var(--text-main)] hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors font-mono backdrop-blur-md"
          >
            <Download className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Download PDF</span>
          </MagneticButton>

          <MagneticButton
            href="#about"
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-medium glass-panel text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors font-mono backdrop-blur-md"
          >
            <span>Scroll Journey</span>
            <ArrowDown className="w-3 h-3 text-indigo-600 dark:text-indigo-400 animate-bounce" />
          </MagneticButton>
        </motion.div>

        {/* Step 5: 4 Micro Proof Highlights */}
        <motion.div variants={fadeUpVariant} className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-9 w-full max-w-4xl text-left">
          {highlights.map((h, idx) => {
            const Icon = h.icon;
            return (
              <div key={idx} className="glass-panel p-4 rounded-2xl border border-[var(--border-subtle)] shadow-md backdrop-blur-md hover:border-indigo-500/50 transition-colors">
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
        </motion.div>
      </motion.div>
    </section>
  );
}
