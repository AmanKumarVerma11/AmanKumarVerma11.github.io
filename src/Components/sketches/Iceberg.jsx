import { useEffect, useRef, useState } from 'react';
import rough from 'roughjs';

/**
 * Crystalline iceberg — chalk-on-dark style, matching the reference.
 *
 * Technique: white-on-dark, NOT currentColor.
 *   • Outer shape = single rough polygon per section (tip + underwater)
 *   • Internal facet lines = rough lines inside each section
 *   • Hachure fill (parallel white strokes at ~5px gap) = chalk texture
 *   • Varying hachure density per zone creates 3-D shading illusion
 *
 * Geometry:
 *   Tip (above y=182): multi-faceted mountain peak, 200px wide at base
 *   Underwater (below y=182): inverted diamond, 360px wide at mid-depth,
 *     tapering to a point at y=548. 3.6× wider than the tip.
 *
 * Text:
 *   Tip   → "FULL-STACK SOFTWARE ENGINEER" (what the world sees)
 *   Below → "HIDDEN SKILLS & RESPONSIBILITIES" + depth labels
 */
export default function Iceberg({ className = '' }) {
  const svgRef    = useRef(null);
  const roughGRef = useRef(null);
  const drawn     = useRef(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const g   = roughGRef.current;
    const svg = svgRef.current;
    if (!g || !svg || drawn.current) return;
    drawn.current = true;

    const rc = rough.svg(svg);

    // Outer polygon — organic roughness gives natural edge wobble
    const poly = (seed, fillWeight, gap, angle) => ({
      roughness: 2.2,
      bowing: 1.1,
      seed,
      stroke: 'rgba(255,255,255,0.82)',
      strokeWidth: 1.4,
      fill: 'white',
      fillStyle: 'hachure',
      fillWeight,
      hachureGap: gap,
      hachureAngle: angle,
    });

    // Sharp crease: low roughness = defined crystalline edge
    const sharp = (seed, opacity) => ({
      roughness: 1.0, bowing: 0.3, seed,
      stroke: `rgba(255,255,255,${opacity})`,
      strokeWidth: 0.9,
    });

    // Rough crease: high roughness = unpolished, sketchy edge
    const rough2 = (seed, opacity) => ({
      roughness: 3.2, bowing: 1.5, seed,
      stroke: `rgba(255,255,255,${opacity})`,
      strokeWidth: 0.55,
    });

    // ── TIP — asymmetric peak, natural lopsided mountain ─────────
    // Peak tilts slightly left; right shoulder is lower & further out;
    // left side has a more aggressive jut — not mirrored
    g.appendChild(rc.polygon(
      [
        [182,  14], // peak — offset left of center
        [118,  50], // left sub-peak — aggressive
        [ 92, 108], // left shoulder — juts out
        [ 80, 148], // left lower — very far left
        [ 88, 184], // waterline left
        [148, 178], // waterline inner-left — dips down
        [194, 183], // waterline center
        [252, 180], // waterline inner-right
        [296, 186], // waterline right — extends further right
        [290, 138], // right lower
        [268, 105], // right shoulder — closer to center than left
        [238,  62], // right sub-peak — lower than left sub-peak
      ],
      poly(1, 0.55, 5.2, -45)
    ));

    // Mix of sharp + rough creases inside the tip
    g.appendChild(rc.line(182, 14,  92,108, sharp(2, 0.65)));  // peak → left shoulder (sharp ridge)
    g.appendChild(rc.line(182, 14, 268,105, sharp(3, 0.58)));  // peak → right shoulder (sharp)
    g.appendChild(rc.line( 92,108, 268,105, rough2(4, 0.50))); // horizontal mid (rough)
    g.appendChild(rc.line(118, 50,  88,184, rough2(5, 0.42))); // far-left down (rough)
    g.appendChild(rc.line(238, 62, 296,186, rough2(6, 0.40))); // far-right down (rough)
    g.appendChild(rc.line(182, 14, 118, 50, sharp(7, 0.72)));  // peak left (sharp — bright ridge line)
    g.appendChild(rc.line(182, 14, 238, 62, sharp(8, 0.62)));  // peak right (sharp)
    g.appendChild(rc.line( 80,148, 252,180, rough2(9, 0.38))); // near-waterline cross (rough)

    // ── WATERLINE ────────────────────────────────────────────────
    g.appendChild(rc.line(8, 183, 372, 183, {
      roughness: 1.8, bowing: 1.5, seed: 10,
      stroke: 'rgba(255,255,255,0.72)',
      strokeWidth: 1.1,
    }));

    // ── UNDERWATER — intentionally asymmetric, left side wider ───
    // Left juts further than right; max-width points at different y;
    // some vertices have unexpected sharp corners (extra jutting vertices)
    g.appendChild(rc.polygon(
      [
        [ 88, 184], // waterline left
        [ 28, 252], // left expand — aggressive
        [  5, 338], // left max — very wide, lower y
        [ 22, 428], // left lower
        [ 95, 504], // bottom-left
        [185, 548], // deepest point — slightly left of center
        [278, 510], // bottom-right — lower than left
        [340, 440], // right lower — higher y than left equivalent
        [368, 352], // right max — slightly less wide than left, higher y
        [348, 262], // right expand
        [296, 186], // waterline right
      ],
      poly(11, 0.48, 5.0, -55) // different hachure angle than tip
    ));

    // Mix of sharp and rough underwater creases
    g.appendChild(rc.line(148,183, 185,548, sharp(12, 0.42)));  // inner-left → deep (sharp)
    g.appendChild(rc.line(248,183, 185,548, rough2(13, 0.38))); // inner-right → deep (rough)
    g.appendChild(rc.line( 88,183,  22,428, sharp(14, 0.48)));  // far-left edge (sharp — defined facet)
    g.appendChild(rc.line(296,183, 340,440, rough2(15, 0.42))); // far-right edge (rough)
    g.appendChild(rc.line( 28,252, 185,548, rough2(16, 0.36))); // upper-left → bottom (rough)
    g.appendChild(rc.line(348,262, 185,548, rough2(17, 0.34))); // upper-right → bottom (rough)
    // Mid horizontal — slightly diagonal (not perfectly flat = more natural)
    g.appendChild(rc.line(  8,338, 366,352, sharp(18, 0.50)));  // mid cross (sharp)
    g.appendChild(rc.line( 25,428, 340,440, rough2(19, 0.40))); // lower cross (rough)
    // X-pattern cross-creases — different on each side
    g.appendChild(rc.line( 28,252, 368,352, rough2(20, 0.35))); // left-to-right diagonal
    g.appendChild(rc.line(348,262,   5,338, sharp(21, 0.38)));  // right-to-left (sharp)
    g.appendChild(rc.line( 22,428, 340,352, rough2(22, 0.32))); // lower X
    g.appendChild(rc.line(340,440,  22,338, rough2(23, 0.30))); // lower X other way
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t = setTimeout(() => setRevealed(true), reduced ? 0 : 2600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`pointer-events-none select-none transition-opacity duration-[2200ms] ease-in ${
        revealed ? 'opacity-100' : 'opacity-0'
      } ${className}`}
      aria-hidden="true"
    >
      <svg
        ref={svgRef}
        viewBox="0 0 380 560"
        className="w-[200px] xl:w-[240px] h-auto"
        style={{ overflow: 'visible' }}
      >
        {/* roughjs polygons + lines appended here by useEffect */}
        <g ref={roughGRef} />

        {/* Text — rendered on top of the iceberg body */}
        <g
          fontFamily="'Bricolage Grotesque', ui-monospace, system-ui, sans-serif"
          textAnchor="middle"
          fill="white"
        >
          {/* Above waterline — the visible title */}
          <text x="192" y="108" fontSize="14" fontWeight="700"
                letterSpacing="0.08em" opacity="0.94">FULL-STACK</text>
          <text x="192" y="126" fontSize="14" fontWeight="700"
                letterSpacing="0.08em" opacity="0.94">SOFTWARE</text>
          <text x="192" y="144" fontSize="14" fontWeight="700"
                letterSpacing="0.08em" opacity="0.94">ENGINEER</text>

          {/* Below waterline — hidden skills header */}
          <text x="192" y="276" fontSize="9.5" fontWeight="700"
                letterSpacing="0.04em" opacity="0.72">HIDDEN SKILLS</text>
          <text x="192" y="291" fontSize="9.5" fontWeight="700"
                letterSpacing="0.04em" opacity="0.72">&amp; RESPONSIBILITIES</text>

          {/* Depth labels — smaller and fainter going deeper */}
          <text x="192" y="326" fontSize="8.5" opacity="0.60"
                fontFamily="ui-monospace, monospace" letterSpacing="0.05em">multi-agent AI</text>
          <text x="192" y="350" fontSize="8"   opacity="0.55"
                fontFamily="ui-monospace, monospace" letterSpacing="0.05em">system architecture</text>
          <text x="192" y="374" fontSize="7.5" opacity="0.50"
                fontFamily="ui-monospace, monospace" letterSpacing="0.05em">production debugging</text>
          <text x="192" y="398" fontSize="7.5" opacity="0.46"
                fontFamily="ui-monospace, monospace" letterSpacing="0.05em">performance engineering</text>
          <text x="192" y="420" fontSize="7"   opacity="0.42"
                fontFamily="ui-monospace, monospace" letterSpacing="0.05em">api design</text>
          <text x="192" y="442" fontSize="7"   opacity="0.39"
                fontFamily="ui-monospace, monospace" letterSpacing="0.05em">security &amp; infra</text>
          <text x="192" y="463" fontSize="6.5" opacity="0.35"
                fontFamily="ui-monospace, monospace" letterSpacing="0.05em">technical debt</text>
        </g>
      </svg>

      <span className="sr-only">
        Iceberg diagram: Full-Stack Software Engineer above the waterline.
        Below: multi-agent AI, system architecture, production debugging,
        performance engineering, api design, security and infra, technical debt.
      </span>
    </div>
  );
}
