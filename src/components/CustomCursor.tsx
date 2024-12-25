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
    <>
      <div
        ref={cursorRef}
        className={`custom-cursor ${isHovering ? 'hover' : ''}`}
        style={{
          transform: 'translate(-100%, -100%)',
        }}
      />

      <style jsx>{`
        .custom-cursor {
          width: 20px;
          height: 20px;
          background: radial-gradient(circle, #FFD700 0%, rgba(255, 215, 0, 0.8) 50%, rgba(255, 215, 0, 0) 100%);
          border-radius: 50%;
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          mix-blend-mode: difference;
          transition: width 0.3s ease, height 0.3s ease, background 0.3s ease;
          filter: blur(1px);
        }

        .custom-cursor::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 6px;
          height: 6px;
          background: #FFD700;
          border-radius: 50%;
          box-shadow: 0 0 15px #FFD700;
          transition: all 0.3s ease;
        }

        .custom-cursor.hover {
          width: 40px;
          height: 40px;
          background: radial-gradient(circle, #FFA500 0%, rgba(255, 165, 0, 0.8) 50%, rgba(255, 165, 0, 0) 100%);
        }

        .custom-cursor.hover::after {
          width: 8px;
          height: 8px;
          box-shadow: 0 0 20px #FFA500;
          background: #FFA500;
        }
      `}</style>
    </>
  );
}
