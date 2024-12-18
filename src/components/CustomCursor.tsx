'use client';

import { useRef, useCallback, useEffect, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState<boolean>(false);
  const frameRef = useRef<number | null>(null);

  const moveCursor = useCallback((e: MouseEvent) => {
    if (cursorRef.current && cursorDotRef.current) {
      const { clientX, clientY } = e;
      
      // Cancel any pending animation frame
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }

      // Schedule new animation frame
      frameRef.current = requestAnimationFrame(() => {
        if (cursorRef.current && cursorDotRef.current) {
          // Use transform instead of left/top for better performance
          const transform = `translate(${clientX}px, ${clientY}px) translate(-50%, -50%)`;
          cursorRef.current.style.transform = transform;
          cursorDotRef.current.style.transform = transform;
        }
      });
    }
  }, []);

  const updateCursorStyle = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (cursorRef.current && cursorDotRef.current) {
      // Optimize hover check
      const isClickable = target.matches('a, button, [role="button"], a *, button *');

      cursorRef.current.classList.toggle('cursor-hover', isClickable);
      cursorDotRef.current.classList.toggle('cursor-dot-hover', isClickable);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    document.addEventListener('mousemove', moveCursor, { passive: true });
    document.addEventListener('mouseover', updateCursorStyle, { passive: true });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', updateCursorStyle);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [moveCursor, updateCursorStyle]);

  if (!mounted) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-50 w-8 h-8 border-2 border-[#FFD700] rounded-full will-change-transform custom-cursor"
        style={{
          mixBlendMode: 'difference',
          transform: 'translate(-100%, -100%)',
        }}
      />
      <div
        ref={cursorDotRef}
        className="fixed pointer-events-none z-50 w-1 h-1 bg-[#FFD700] rounded-full will-change-transform custom-cursor"
        style={{
          mixBlendMode: 'difference',
          transform: 'translate(-100%, -100%)',
        }}
      />

      <style jsx>{`
        .cursor-hover {
          width: 48px !important;
          height: 48px !important;
          background-color: rgba(255, 215, 0, 0.1) !important;
          border-color: rgba(255, 215, 0, 0.5) !important;
        }
        
        .cursor-dot-hover {
          width: 6px !important;
          height: 6px !important;
          background-color: #FFD700 !important;
        }
      `}</style>
    </>
  );
}
