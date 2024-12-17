'use client';

import { useRef, useCallback, useEffect } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  const moveCursor = useCallback((e: MouseEvent) => {
    if (cursorRef.current && cursorDotRef.current) {
      const { clientX, clientY } = e;
      requestAnimationFrame(() => {
        if (cursorRef.current && cursorDotRef.current) {
          cursorRef.current.style.left = `${clientX}px`;
          cursorRef.current.style.top = `${clientY}px`;
          cursorDotRef.current.style.left = `${clientX}px`;
          cursorDotRef.current.style.top = `${clientY}px`;
          
          cursorRef.current.style.transform = `translate(-50%, -50%)`;
          cursorDotRef.current.style.transform = `translate(-50%, -50%)`;
        }
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.hover-trigger')) {
        requestAnimationFrame(() => {
          cursorRef.current?.classList.add('cursor-hover');
          cursorDotRef.current?.classList.add('cursor-dot-hover');
        });
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.hover-trigger')) {
        requestAnimationFrame(() => {
          cursorRef.current?.classList.remove('cursor-hover');
          cursorDotRef.current?.classList.remove('cursor-dot-hover');
        });
      }
    };

    // Add event listeners to the document
    document.addEventListener('mousemove', moveCursor, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });

    // Hide default cursor
    document.documentElement.style.cursor = 'none';
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      
      // Restore default cursor
      document.documentElement.style.cursor = '';
      document.body.style.cursor = '';
    };
  }, [moveCursor]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] mix-blend-difference">
      <div 
        ref={cursorRef} 
        className="fixed w-8 h-8 transition-[width,height] duration-300"
        style={{ 
          left: '-100px', 
          top: '-100px',
          willChange: 'transform, width, height'
        }}
      >
        <div className="w-full h-full relative">
          <div className="absolute inset-0 border-2 border-[#FFD700] rounded-full animate-spin-slow" />
          <div className="absolute inset-0 border-2 border-[#FFD700] rounded-full animate-reverse-spin" style={{ animationDelay: '-2s' }} />
        </div>
      </div>
      <div 
        ref={cursorDotRef} 
        className="fixed w-2 h-2 bg-[#FFD700] rounded-full transition-transform duration-75"
        style={{ 
          left: '-100px', 
          top: '-100px',
          willChange: 'transform'
        }}
      />
    </div>
  );
}
