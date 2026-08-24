import React from 'react';
import SectionHeader from '../components/SectionHeader';
import TechConstellation from '../scenes/TechConstellation';

export default function EngineeringEvolution() {
  return (
    <section id="evolution" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-950 relative">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          chapter="04 — EVOLUTION"
          badge="Transition to Software Engineering"
          title="Learning became building."
          subtitle="Understanding data opened the door to systems thinking. I moved from standalone scripts to full-stack web applications, resilient backend microservices, and connected cloud databases."
        />

        {/* Interactive Constellation Scene */}
        <TechConstellation />
      </div>
    </section>
  );
}
