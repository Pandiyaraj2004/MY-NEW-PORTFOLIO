import React, { useEffect, useRef, useState } from 'react';
import { Play, RotateCcw, CheckCircle2, Sparkles, Filter, Activity } from 'lucide-react';

export default function DataPipelineCanvas() {
  const canvasRef = useRef(null);
  const [activeStep, setActiveStep] = useState(1); // 1: Raw, 2: Cleaned, 3: Engineered, 4: Insights
  const [isPlaying, setIsPlaying] = useState(true);

  const steps = [
    { id: 1, name: "Raw Ingestion", subtitle: "10,000+ unformatted records & noisy values", color: "#f87171" },
    { id: 2, name: "Cleaning & Imputation", subtitle: "-30% inconsistencies, missing-value handling", color: "#fbbf24" },
    { id: 3, name: "Feature Engineering", subtitle: "Encoding, scaling & normalization vectors", color: "#38bdf8" },
    { id: 4, name: "ML Models & Insights", subtitle: "Classification boundary & Power BI KPIs", color: "#34d399" }
  ];

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setActiveStep((prev) => (prev % 4) + 1);
      }, 3500);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationId;
    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = 360);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 360;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes
    const particleCount = 140;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius: Math.random() * 2.5 + 1.5,
        baseX: Math.random() * width,
        baseY: Math.random() * height,
        cluster: Math.floor(Math.random() * 3),
        phase: Math.random() * Math.PI * 2
      });
    }

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Background subtle grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw active mode visual behavior
      const step = activeStep;

      // Draw pipeline connecting flow lines
      const midY = height / 2;

      particles.forEach((p, idx) => {
        let targetX = p.x;
        let targetY = p.y;
        let color = '#94a3b8';
        let glowColor = 'rgba(148, 163, 184, 0.2)';

        if (step === 1) {
          // 1. Raw Data: Random chaotic motion, jittery, reddish
          p.x += p.vx * 1.8 + Math.sin(time + p.phase) * 1.2;
          p.y += p.vy * 1.8 + Math.cos(time + p.phase) * 1.2;
          if (p.x < 10) p.x = width - 10;
          if (p.x > width - 10) p.x = 10;
          if (p.y < 10) p.y = height - 10;
          if (p.y > height - 10) p.y = 10;

          color = idx % 4 === 0 ? '#ef4444' : idx % 3 === 0 ? '#f97316' : '#94a3b8';
          glowColor = 'rgba(239, 68, 68, 0.3)';
        } else if (step === 2) {
          // 2. Cleaned: Streamlined horizontal pipeline flow with filter funnel
          const targetLane = (idx % 5) * (height / 6) + height / 6;
          p.x += (width * 0.15 + (idx / particleCount) * (width * 0.7) - p.x) * 0.05;
          p.y += (targetLane + Math.sin(time * 2 + idx) * 8 - p.y) * 0.05;
          color = '#fbbf24';
          glowColor = 'rgba(251, 191, 36, 0.4)';
        } else if (step === 3) {
          // 3. Feature Encoded: Organized into concentric matrix columns
          const col = idx % 8;
          const row = Math.floor(idx / 8);
          const colX = (width / 9) * (col + 1);
          const rowY = (height / 20) * (row + 2);
          p.x += (colX - p.x) * 0.08;
          p.y += (rowY - p.y) * 0.08;
          color = '#38bdf8';
          glowColor = 'rgba(56, 189, 248, 0.4)';
        } else if (step === 4) {
          // 4. ML Model Insights: 3 Distinct Clustered Decision Orbits
          const clusterCenters = [
            { x: width * 0.25, y: height * 0.5 },
            { x: width * 0.5, y: height * 0.35 },
            { x: width * 0.75, y: height * 0.6 }
          ];
          const center = clusterCenters[p.cluster];
          const angle = time * (p.cluster % 2 === 0 ? 0.8 : -0.8) + (idx * 0.2);
          const radius = 35 + (idx % 4) * 12;
          const cx = center.x + Math.cos(angle) * radius;
          const cy = center.y + Math.sin(angle) * (radius * 0.7);

          p.x += (cx - p.x) * 0.09;
          p.y += (cy - p.y) * 0.09;
          color = p.cluster === 0 ? '#10b981' : p.cluster === 1 ? '#6366f1' : '#06b6d4';
          glowColor = 'rgba(16, 185, 129, 0.4)';
        }

        // Draw connections between proximate particles
        for (let j = idx + 1; j < particles.length; j += (step === 4 ? 2 : 4)) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = step === 4 ? 65 : step === 3 ? 50 : 35;

          if (dist < maxDist) {
            ctx.strokeStyle = color;
            ctx.globalAlpha = (1 - dist / maxDist) * 0.35;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.globalAlpha = 1.0;
          }
        }

        // Draw particle
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = 8;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Step annotations overlay on canvas
      ctx.font = '600 12px Inter, sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.textAlign = 'right';
      ctx.fillText(`Pipeline Phase ${activeStep}/4 · 10,000+ Records Analyzed`, width - 20, 26);

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeStep]);

  return (
    <div className="w-full bg-slate-950/80 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden">
      {/* Top Header & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5 border-b border-slate-800/60 pb-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-1">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            Interactive Data Engineering Engine
          </div>
          <h3 className="text-lg font-bold text-slate-100 font-display">
            From Raw Enterprise Records to Predictive Models
          </h3>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/60 transition-colors"
          >
            <Play className={`w-3 h-3 ${isPlaying ? 'text-emerald-400' : 'text-slate-400'}`} />
            {isPlaying ? 'Auto-Cycle' : 'Play'}
          </button>
          <button
            onClick={() => setActiveStep(1)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        </div>
      </div>

      {/* Step Selector Pills */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-4">
        {steps.map((s) => {
          const isActive = activeStep === s.id;
          return (
            <button
              key={s.id}
              onClick={() => {
                setActiveStep(s.id);
                setIsPlaying(false);
              }}
              className={`p-3 rounded-xl text-left border transition-all relative overflow-hidden ${
                isActive
                  ? 'bg-slate-900/90 border-cyan-500/50 shadow-lg shadow-cyan-500/10'
                  : 'bg-slate-900/40 border-slate-800/60 hover:border-slate-700 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className="text-xs font-mono font-bold"
                  style={{ color: isActive ? s.color : '#64748b' }}
                >
                  0{s.id}
                </span>
                {isActive && (
                  <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: s.color }} />
                )}
              </div>
              <div className={`text-xs font-semibold ${isActive ? 'text-slate-100' : 'text-slate-300'}`}>
                {s.name}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1 leading-tight">
                {s.subtitle}
              </div>
            </button>
          );
        })}
      </div>

      {/* Canvas Area */}
      <div className="relative rounded-xl overflow-hidden bg-slate-950/90 border border-slate-800/50">
        <canvas ref={canvasRef} className="w-full block" />
        <div className="absolute bottom-3 left-4 flex items-center gap-2 text-[11px] text-slate-400 bg-slate-900/80 px-3 py-1 rounded-md border border-slate-800/60 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Real-time vector simulation representing <strong>Edu Tantr</strong> analytical workflows</span>
        </div>
      </div>
    </div>
  );
}
