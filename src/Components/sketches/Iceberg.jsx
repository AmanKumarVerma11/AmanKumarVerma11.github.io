import { useEffect, useRef, useState } from 'react';
import rough from 'roughjs';

/**
 * Easter egg: roughjs-rendered iceberg.
 *
 * roughjs renders every path as 2–3 slightly offset overlapping
 * strokes with per-stroke jitter — the same optical quality as
 * a brush pen on paper. This is NOT a perfect SVG outline;
 * it looks genuinely hand-drawn.
 *
 * Entrance: fades in 2.5s after mount (after hero animations finish)
 * with a 2s ease-in. Like a signature that slowly becomes visible.
 *
 * Hidden meaning: small tip vs much larger structure below —
 * the demos vs the systems that make them work.
 */
export default function Iceberg({ className = '' }) {
  const svgRef   = useRef(null);
  const drawn    = useRef(false);
  const [revealed, setRevealed] = useState(false);

  // Draw once with roughjs (idempotent, seed = consistent output)
  useEffect(() => {
    if (drawn.current) return;
    drawn.current = true;

    const svg = svgRef.current;
    if (!svg) return;

    svg.innerHTML = '';
    const rc = rough.svg(svg);

    const base = {
      stroke: 'currentColor',
      roughness: 2.2,
      bowing: 1.3,
      seed: 42,
      disableMultiStroke: false,
    };

    // Iceberg outline — organic Q-bezier path, all curves, zero straight lines.
    // Shape: narrow visible tip above waterline (y≈96), wider underwater mass below.
    svg.appendChild(
      rc.path(
        `M 100 22
         Q 116 28 120 60
         Q 125 86 142 96
         Q 168 100 178 130
         Q 186 162 168 196
         Q 158 232 116 252
         Q 78  254  52 226
         Q 36  192  50 156
         Q 56  122  76 102
         Q 86   92  80  60
         Q 84   28 100  22 Z`,
        { ...base, strokeWidth: 2.5, fill: 'none' }
      )
    );

    // Wavy waterline — implied surface, subtle weight
    svg.appendChild(
      rc.path(
        'M 4 96 Q 50 92 100 98 T 196 96',
        { ...base, strokeWidth: 1.2, roughness: 1.8, seed: 17 }
      )
    );
  }, []);

  // Delayed reveal — hero entrance completes at ~1.5s, this starts at 2.5s
  // and fades over 2s. Feels like it materialised while you were reading.
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t = setTimeout(() => setRevealed(true), reduced ? 0 : 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`pointer-events-none select-none transition-opacity duration-[2000ms] ease-in ${
        revealed ? 'opacity-100' : 'opacity-0'
      } ${className}`}
      aria-hidden="true"
    >
      <svg
        ref={svgRef}
        viewBox="0 0 200 280"
        className="w-[120px] xl:w-[140px] h-auto text-dim"
        style={{ overflow: 'visible' }}
      />
      <span className="sr-only">
        An iceberg — small visible tip, much larger structure below.
        The systems behind the demos.
      </span>
    </div>
  );
}
