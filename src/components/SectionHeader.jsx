import React from 'react';

export default function SectionHeader({
  badge,
  title,
  subtitle,
  centered = false
}) {
  return (
    <div className={`mb-10 ${centered ? 'text-center max-w-3xl mx-auto' : 'max-w-3xl'}`}>
      {/* Clean Modern Badge */}
      {badge && (
        <div className={`flex items-center gap-2 mb-3 ${centered ? 'justify-center' : ''}`}>
          <span className="font-mono text-xs font-bold tracking-wider text-indigo-400 uppercase bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 shadow-sm">
            {badge}
          </span>
        </div>
      )}

      {/* Main Title */}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--text-main)] font-display tracking-tight leading-tight">
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="mt-2 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed font-sans">
          {subtitle}
        </p>
      )}
    </div>
  );
}
