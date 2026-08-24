import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on non-touch devices with fine pointers
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      const isClickable = target && (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('clickable')
      );
      setIsPointer(!!isClickable);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Small dot follower */}
      <div
        className="fixed pointer-events-none z-50 rounded-full bg-cyan-400 mix-blend-screen transition-transform duration-75 ease-out"
        style={{
          width: '6px',
          height: '6px',
          transform: `translate3d(${position.x - 3}px, ${position.y - 3}px, 0)`,
        }}
      />
      {/* Outer subtle aura */}
      <div
        className={`fixed pointer-events-none z-50 rounded-full border border-indigo-400/40 transition-all duration-300 ease-out ${
          isPointer ? 'scale-150 bg-indigo-500/10 border-indigo-400' : 'scale-100'
        }`}
        style={{
          width: '32px',
          height: '32px',
          transform: `translate3d(${position.x - 16}px, ${position.y - 16}px, 0)`,
        }}
      />
    </>
  );
}
