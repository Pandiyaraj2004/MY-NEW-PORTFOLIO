import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const auraRef = useRef(null);

  useEffect(() => {
    // Only enable on desktop with fine pointer devices
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768) return;

    let mouseX = -100;
    let mouseY = -100;
    let auraX = -100;
    let auraY = -100;
    let isVisible = false;
    let isPointer = false;
    let rAFId = null;

    const render = () => {
      // Smooth lerp for aura follower
      auraX += (mouseX - auraX) * 0.2;
      auraY += (mouseY - auraY) * 0.2;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX - 3}px, ${mouseY - 3}px, 0)`;
        dotRef.current.style.opacity = isVisible ? '1' : '0';
      }

      if (auraRef.current) {
        auraRef.current.style.transform = `translate3d(${auraX - 16}px, ${auraY - 16}px, 0) scale(${isPointer ? 1.5 : 1})`;
        auraRef.current.style.opacity = isVisible ? '1' : '0';
        if (isPointer) {
          auraRef.current.style.borderColor = 'rgba(129, 140, 248, 0.8)';
          auraRef.current.style.backgroundColor = 'rgba(99, 102, 241, 0.12)';
        } else {
          auraRef.current.style.borderColor = 'rgba(129, 140, 248, 0.35)';
          auraRef.current.style.backgroundColor = 'transparent';
        }
      }

      rAFId = requestAnimationFrame(render);
    };

    rAFId = requestAnimationFrame(render);

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) isVisible = true;

      const target = e.target;
      const clickable = target && (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('clickable')
      );
      isPointer = !!clickable;
    };

    const handleMouseLeave = () => {
      isVisible = false;
    };

    const handleMouseEnter = () => {
      isVisible = true;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true });

    return () => {
      if (rAFId) cancelAnimationFrame(rAFId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <>
      {/* Small dot follower */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full bg-cyan-400 mix-blend-screen will-change-transform"
        style={{
          width: '6px',
          height: '6px',
          opacity: 0,
          transform: 'translate3d(-100px, -100px, 0)'
        }}
      />
      {/* Outer subtle aura */}
      <div
        ref={auraRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full border border-indigo-400/40 will-change-transform transition-colors duration-150 ease-out"
        style={{
          width: '32px',
          height: '32px',
          opacity: 0,
          transform: 'translate3d(-100px, -100px, 0)'
        }}
      />
    </>
  );
}
