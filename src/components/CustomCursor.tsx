'use client';

import { useRef, useCallback, useEffect, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState<boolean>(false);
  const frameRef = useRef<number | null>(null);
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const moveCursor = useCallback((e: MouseEvent) => {
    if (cursorRef.current) {
      const { clientX, clientY } = e;
      
      // Cancel any pending animation frame
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }

      // Schedule new animation frame
      frameRef.current = requestAnimationFrame(() => {
        if (cursorRef.current) {
          // Add slight delay for smooth following effect
          const x = clientX;
          const y = clientY;
          cursorRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
        }
      });
    }
  }, []);

  const updateCursorStyle = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const isClickable = target.matches('a, button, [role="button"], input, textarea, select, a *, button *');
    setIsHovering(isClickable);
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
    <div
      ref={cursorRef}
      className={`custom-cursor ${isHovering ? 'hover' : ''}`}
    />
  );
}
