import React, { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../lib/gpu';

/**
 * The hero backdrop: a measuring field. A fine lattice that is only fully
 * visible where the cursor is, so the page reads as graph paper being lit
 * rather than as decoration sitting behind the type.
 *
 * Pure CSS — no WebGL, no canvas, no per-frame React work. Pointer moves are
 * coalesced into one rAF and written straight to two custom properties.
 */
const HeroField = () => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    if (window.matchMedia?.('(pointer: coarse)').matches) return;

    let raf = 0;
    let x = 50;
    let y = 38;

    const write = () => {
      raf = 0;
      el.style.setProperty('--mx', `${x}%`);
      el.style.setProperty('--my', `${y}%`);
    };

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      if (rect.height === 0) return;
      x = ((e.clientX - rect.left) / rect.width) * 100;
      y = ((e.clientY - rect.top) / rect.height) * 100;
      if (!raf) raf = requestAnimationFrame(write);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden bg-background"
      style={{ '--mx': '50%', '--my': '38%' }}
    >
      {/* Base lattice, barely there across the whole field. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--lattice) 1px, transparent 1px), linear-gradient(to bottom, var(--lattice) 1px, transparent 1px)',
          backgroundSize: '84px 84px'
        }}
      />

      {/* The same lattice again, but only where the cursor is. */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--lattice-lit) 1px, transparent 1px), linear-gradient(to bottom, var(--lattice-lit) 1px, transparent 1px)',
          backgroundSize: '84px 84px',
          maskImage:
            'radial-gradient(260px 260px at var(--mx) var(--my), #000 0%, rgba(0,0,0,0.35) 45%, transparent 72%)',
          WebkitMaskImage:
            'radial-gradient(260px 260px at var(--mx) var(--my), #000 0%, rgba(0,0,0,0.35) 45%, transparent 72%)'
        }}
      />

      {/* A single wash of the accent under the cursor. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(520px 420px at var(--mx) var(--my), hsl(var(--primary) / 0.07) 0%, transparent 68%)'
        }}
      />

      {/* Settle the edges so the type always has a quiet ground. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 100% at 50% 40%, transparent 30%, hsl(var(--background) / 0.6) 100%)'
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-background/70 to-transparent" />
    </div>
  );
};

export default HeroField;
