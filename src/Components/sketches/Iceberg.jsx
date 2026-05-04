import { useEffect, useRef } from 'react';

/**
 * Easter egg: hand-drawn iceberg.
 * Small tip above water, much larger structure below.
 * Hidden meaning: the demos vs the systems that make them work.
 *
 * Drawing logic:
 *   Scroll progress 0.00 → 0.85   draws the iceberg outline.
 *   Scroll progress 0.65 → 1.00   reveals the dashed waterline.
 *
 * Filter: feTurbulence + feDisplacementMap gives subtle ink wobble
 * so the line doesn't look digitally perfect.
 */
export default function Iceberg() {
  const wrapperRef = useRef(null);
  const outlineRef = useRef(null);
  const waterRef   = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const outline = outlineRef.current;
    const water   = waterRef.current;
    if (!wrapper || !outline) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const outlineLen = outline.getTotalLength();
    const waterLen   = water ? water.getTotalLength() : 0;

    // Static state for reduced motion: just show fully drawn.
    if (reduced) {
      outline.style.strokeDasharray  = `${outlineLen}`;
      outline.style.strokeDashoffset = '0';
      if (water) {
        water.style.strokeDasharray  = `${waterLen}`;
        water.style.strokeDashoffset = '0';
      }
      return;
    }

    // Initial state: nothing drawn.
    outline.style.strokeDasharray  = `${outlineLen}`;
    outline.style.strokeDashoffset = `${outlineLen}`;
    if (water) {
      water.style.strokeDasharray  = `${waterLen}`;
      water.style.strokeDashoffset = `${waterLen}`;
    }

    let raf = 0;
    let visible = false;

    const obs = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting; },
      { threshold: 0, rootMargin: '120px 0px' }
    );
    obs.observe(wrapper);

    const tick = () => {
      if (visible) {
        const rect = wrapper.getBoundingClientRect();
        const wh   = window.innerHeight;

        // Progress 0 when wrapper's top first enters viewport.
        // Progress 1 when wrapper's bottom has scrolled 20% past viewport top.
        const start = wh;
        const end   = -rect.height * 0.2;
        const range = start - end;
        const value = start - rect.top;
        const p = Math.max(0, Math.min(1, value / range));

        // Outline draws over 0 → 0.85.
        const outlineP = Math.max(0, Math.min(1, p / 0.85));
        outline.style.strokeDashoffset = `${outlineLen * (1 - outlineP)}`;

        // Waterline draws over 0.65 → 1.0 (slightly overlapping the iceberg's later strokes).
        if (water) {
          const waterP = Math.max(0, Math.min(1, (p - 0.65) / 0.35));
          water.style.strokeDashoffset = `${waterLen * (1 - waterP)}`;
        }
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      obs.disconnect();
    };
  }, []);

  return (
    <div ref={wrapperRef} className="text-haze relative select-none" aria-hidden="true">
      <svg
        viewBox="0 0 280 380"
        className="w-[180px] sm:w-[220px] md:w-[260px] h-auto"
        fill="none"
        stroke="currentColor"
      >
        <defs>
          <filter id="iceberg-ink" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="2" seed="7" />
            <feDisplacementMap in="SourceGraphic" scale="1.5" />
          </filter>
        </defs>

        <g filter="url(#iceberg-ink)" strokeLinecap="round" strokeLinejoin="round">
          {/* Implied waterline — gentle wave */}
          <path
            ref={waterRef}
            d="M 4 132 Q 50 130 100 133 T 200 132 T 276 132"
            strokeWidth="0.7"
            opacity="0.55"
          />

          {/* Iceberg outline — single continuous stroke, clockwise from top tip */}
          <path
            ref={outlineRef}
            d="M 130 55 L 168 72 L 150 88 L 175 105 L 198 130 L 222 142 L 205 165 L 240 195 L 218 230 L 245 265 L 215 305 L 175 335 L 142 348 L 108 333 L 78 305 L 102 268 L 68 232 L 95 195 L 70 162 L 100 142 L 92 130 L 115 108 L 90 90 L 118 75 Z"
            strokeWidth="1.2"
          />
        </g>
      </svg>

      <span className="sr-only">
        An iceberg, drawn rough — small tip above water, much larger structure below.
        The systems behind the demos.
      </span>
    </div>
  );
}
