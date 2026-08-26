import React, { useEffect, useRef } from 'react';

export default function ScrollProgressBar() {
  const barRef = useRef(null);

  useEffect(() => {
    let rAFId = null;

    const updateProgress = () => {
      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop || 0;
      const windowHeight = (document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight;
      
      if (windowHeight > 0 && barRef.current) {
        const progress = Math.min(Math.max(totalScroll / windowHeight, 0), 1);
        barRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    const handleScroll = () => {
      if (rAFId) return;
      rAFId = requestAnimationFrame(() => {
        updateProgress();
        rAFId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateProgress();

    return () => {
      if (rAFId) cancelAnimationFrame(rAFId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-slate-900/40 z-50 pointer-events-none">
      <div
        ref={barRef}
        className="h-full w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 will-change-transform"
        style={{
          transform: 'scaleX(0)',
          transformOrigin: 'left'
        }}
      />
    </div>
  );
}
