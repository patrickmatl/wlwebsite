'use client';

import { useEffect, useRef } from 'react';

/**
 * Custom cursor, rebuilt for zero perceived latency.
 *
 * The previous version felt laggy for three compounding reasons:
 *  1. globals.css put `transition: transform 0.2s ease` on the cursor, so the
 *     dot permanently eased 200ms behind the real pointer.
 *  2. `filter: blur(1px)` + `mix-blend-mode: difference` forced expensive
 *     per-frame compositing over the hero video.
 *  3. Hover state lived in React state (re-render per hover change) and the
 *     hover scale was applied via a class `transform` that the inline
 *     translate silently overrode — so it never worked.
 *
 * New model:
 *  - A small DOT tracks the pointer 1:1 (no easing — easing on the primary
 *    pointer reads as lag, never as polish).
 *  - A RING follows with critically-damped lerp inside one rAF loop, giving
 *    the "premium" trailing feel without delaying the pointer itself.
 *  - No React state after mount: direct style/class writes on refs.
 *  - Scale lives on inner children, so it can never fight the translate.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add('custom-cursor-active');

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let ringX = targetX;
    let ringY = targetY;
    let visible = false;
    let raf = 0;

    const show = () => {
      if (!visible) {
        visible = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }
    };
    const hide = () => {
      visible = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      // Dot is written synchronously with the event — true 1:1 tracking.
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      show();
    };

    const onOver = (e: PointerEvent) => {
      const t = e.target as Element | null;
      const interactive = !!t?.closest?.(
        'a, button, [role="button"], input, textarea, select, label, summary'
      );
      dot.classList.toggle('is-hover', interactive);
      ring.classList.toggle('is-hover', interactive);
    };

    const onDown = () => { ring.classList.add('is-down'); };
    const onUp = () => { ring.classList.remove('is-down'); };
    const onLeave = () => hide();

    // Ring follow loop — lerp factor tuned so the ring settles in ~120ms.
    const loop = () => {
      ringX += (targetX - ringX) * 0.22;
      ringY += (targetY - ringY) * 0.22;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true">
        <span className="cursor-ring-inner" />
      </div>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true">
        <span className="cursor-dot-inner" />
      </div>
    </>
  );
}
