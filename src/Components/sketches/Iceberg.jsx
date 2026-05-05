import { useEffect, useRef, useState } from 'react';
import rough from 'roughjs';

/**
 * Iceberg — crystalline, multi-facet, light/shadow contrast.
 *
 * Each section is split into distinct polygon zones with different
 * hachure densities to simulate a 3-D crystal surface:
 *   VERY BRIGHT  fillWeight 2.8  gap 2.2  → near-solid white (direct light)
 *   BRIGHT       fillWeight 1.6  gap 3.5  → dense chalk
 *   MEDIUM       fillWeight 1.0  gap 5.5  → standard hachure
 *   DARK         fillWeight 0.25 gap 14   → sparse, nearly transparent
 *
 * Tip   → 3 zones: peak highlight, right face, left shadow
 * Icewater → 4 quadrants: UL dark / UR bright / LL medium / LR medium-bright
 *
 * No text inside underground. The iceberg says it all.
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

    // Facet: polygon with controlled hachure shading
    const F = (seed, weight, gap, angle, sOp = 0.82, roughness = 1.8) => ({
      roughness, bowing: 0.7, seed,
      stroke: `rgba(255,255,255,${sOp})`,
      strokeWidth: 1.2,
      fill: 'white',
      fillStyle: 'hachure',
      fillWeight: weight,
      hachureGap: gap,
      hachureAngle: angle,
    });

    // Crease line styles
    const ridge = (seed, op) => ({           // sharp primary facet edge
      roughness: 1.0, bowing: 0.3, seed,
      stroke: `rgba(255,255,255,${op})`, strokeWidth: 1.0,
    });
    const crease = (seed, op, r = 1.8) => ({ // secondary facet detail
      roughness: r, bowing: 0.6, seed,
      stroke: `rgba(255,255,255,${op})`, strokeWidth: 0.65,
    });
    const fine = (seed, op) => ({             // fine texture line
      roughness: 3.0, bowing: 1.2, seed,
      stroke: `rgba(255,255,255,${op})`, strokeWidth: 0.45,
    });

    // ══ TIP — 3 lighting zones ════════════════════════════════════
    // Vertices: P(186,25) A(130,46) B(209,50) C(121,76) D(233,66)
    //   E(110,123) F(244,92) G(104,157) H(252,124) I(107,182)
    //   J(257,159) K(260,182)   WL-center M=(184,182)

    // Zone 1 — LEFT HALF (shadow face, darkest)
    g.appendChild(rc.polygon(
      [[186,25],[184,182],[107,182],[104,157],[110,123],[121,76],[130,46]],
      F(1, 0.55, 9, -26, 0.70)
    ));

    // Zone 2 — RIGHT HALF (illuminated face)
    g.appendChild(rc.polygon(
      [[186,25],[209,50],[233,66],[244,92],[252,124],[257,159],[260,182],[184,182]],
      F(2, 1.5, 3.8, -55, 0.86)
    ));

    // Zone 3 — PEAK CROWN (direct light, very bright highlight)
    g.appendChild(rc.polygon(
      [[186,25],[209,50],[130,46]],
      F(3, 3.0, 2.0, -44, 0.94, 1.4)
    ));

    // TIP crease lines — mix of sharp ridges and fine detail
    g.appendChild(rc.line(186,25,  184,182, ridge(4,  0.70)));  // centre spine
    g.appendChild(rc.line(186,25,  209, 50, ridge(5,  0.75)));  // peak → right sub
    g.appendChild(rc.line(186,25,  130, 46, ridge(6,  0.68)));  // peak → left sub
    g.appendChild(rc.line(186,25,  233, 66, crease(7, 0.58)));  // right outer ridge
    g.appendChild(rc.line(186,25,  110,123, crease(8, 0.50)));  // left inner
    g.appendChild(rc.line(130, 46, 233, 66, crease(9, 0.46))); // peak cross
    g.appendChild(rc.line(110,123, 252,124, fine(10,  0.42))); // shoulder band
    g.appendChild(rc.line(121, 76, 244, 92, fine(11,  0.38))); // mid-tip band
    g.appendChild(rc.line(104,157, 257,159, fine(12,  0.34))); // near-WL band
    g.appendChild(rc.line(130, 46, 107,182, fine(13,  0.30))); // far-left slope
    g.appendChild(rc.line(233, 66, 260,182, crease(14,0.44))); // right jut slope
    g.appendChild(rc.line(209, 50, 252,124, fine(15,  0.36))); // right detail
    g.appendChild(rc.line(121, 76, 110,123, crease(16,0.40))); // left sub detail

    // ══ WATERLINE ════════════════════════════════════════════════
    g.appendChild(rc.line(5, 182, 375, 182, {
      roughness: 1.8, bowing: 1.5, seed: 17,
      stroke: 'rgba(255,255,255,0.80)', strokeWidth: 1.3,
    }));
    // Second reflected wave
    g.appendChild(rc.line(25, 189, 355, 191, {
      roughness: 2.2, bowing: 2.0, seed: 18,
      stroke: 'rgba(255,255,255,0.32)', strokeWidth: 0.65,
    }));

    // ══ UNDERGROUND — 4 lighting quadrants ═══════════════════════
    // Split: x=184 (centre), y=317 (jut level)
    // Interior pivot: (184, 317)

    // Q1 — Upper-Left (deep shadow, barely lit)
    g.appendChild(rc.polygon(
      [[107,182],[78,238],[53,317],[184,317],[184,182]],
      F(19, 0.20, 16, -18, 0.65)
    ));

    // Q2 — Upper-Right (primary light)
    g.appendChild(rc.polygon(
      [[184,182],[184,317],[327,317],[308,238],[260,182]],
      F(20, 1.20, 4.2, -54, 0.88)
    ));

    // Q3 — Lower-Left (mid shadow)
    g.appendChild(rc.polygon(
      [[53,317],[89,388],[121,451],[149,502],[187,544],[184,317]],
      F(21, 0.55, 8, -32, 0.72)
    ));

    // Q4 — Lower-Right (secondary highlight)
    g.appendChild(rc.polygon(
      [[184,317],[187,544],[233,502],[264,453],[294,388],[327,317]],
      F(22, 1.05, 5.0, -58, 0.82)
    ));

    // UNDERGROUND crease lines — structural ridges + fine detail
    // Primary ridges (bold)
    g.appendChild(rc.line(107,182,  53,317, ridge(23, 0.58)));  // WL-L → left jut
    g.appendChild(rc.line(260,182, 327,317, ridge(24, 0.55)));  // WL-R → right jut
    g.appendChild(rc.line( 53,317, 187,544, ridge(25, 0.54)));  // left jut → deep
    g.appendChild(rc.line(327,317, 187,544, ridge(26, 0.52)));  // right jut → deep
    g.appendChild(rc.line(184,182, 184,317, ridge(27, 0.48)));  // centre divider (top)
    g.appendChild(rc.line(184,317, 187,544, crease(28,0.42))); // centre (bottom)

    // Horizontal layers
    g.appendChild(rc.line( 53,317, 327,317, ridge(29, 0.55)));  // jut level
    g.appendChild(rc.line( 78,238, 308,238, crease(30,0.46))); // upper band
    g.appendChild(rc.line( 89,388, 294,388, crease(31,0.42))); // mid-low band
    g.appendChild(rc.line(121,451, 264,453, fine(32,  0.36))); // lower band
    g.appendChild(rc.line(149,502, 233,502, fine(33,  0.30))); // bottom band

    // Cross diagonals — inner crystal faces
    g.appendChild(rc.line(107,182, 327,317, fine(34,  0.36))); // WL-L → jut-R
    g.appendChild(rc.line(260,182,  53,317, fine(35,  0.34))); // WL-R → jut-L
    g.appendChild(rc.line( 78,238, 294,388, crease(36,0.34))); // UL → LR
    g.appendChild(rc.line(308,238,  89,388, crease(37,0.32))); // UR → LL
    g.appendChild(rc.line( 53,317, 264,453, fine(38,  0.30))); // jut-L → BR
    g.appendChild(rc.line(327,317, 121,451, fine(39,  0.30))); // jut-R → BL
    g.appendChild(rc.line( 78,238,  53,317, crease(40,0.44))); // UL inner edge
    g.appendChild(rc.line(308,238, 327,317, crease(41,0.48))); // UR inner edge

    // Fine texture within bright zones (Q2 — upper right)
    g.appendChild(rc.line(260,182, 184,317, fine(42,  0.32)));
    g.appendChild(rc.line(308,238, 184,317, fine(43,  0.28)));
    g.appendChild(rc.line(260,182, 294,388, fine(44,  0.30)));
    // Fine texture within Q4 — lower right
    g.appendChild(rc.line(327,317, 233,502, fine(45,  0.28)));
    g.appendChild(rc.line(294,388, 187,544, fine(46,  0.26)));
    // Extra darkness detail in Q1
    g.appendChild(rc.line( 78,238, 184,317, fine(47,  0.22)));
    g.appendChild(rc.line(107,182, 184,317, fine(48,  0.20)));
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
        className="w-[220px] xl:w-[260px] h-auto"
        style={{ overflow: 'visible' }}
      >
        <g ref={roughGRef} />

        {/* Tip title */}
        <g fill="white" fontFamily="'Bricolage Grotesque', system-ui, sans-serif"
           textAnchor="middle">
          <text x="184" y="112" fontSize="15" fontWeight="800"
                letterSpacing="0.10em" opacity="0.97">FULL-STACK</text>
          <text x="184" y="132" fontSize="14" fontWeight="800"
                letterSpacing="0.09em" opacity="0.97">SOFTWARE ENGINEER</text>
        </g>

        {/* Depth labels — scattered, large, fully opaque so they read clearly */}
        <g fill="white" fontFamily="ui-monospace, Menlo, monospace"
           fontSize="10.5" letterSpacing="0.04em">
          <text x="218" y="222" textAnchor="middle" opacity="0.94">multi-agent AI</text>
          <text x="148" y="255" textAnchor="middle" opacity="0.90">system architecture</text>
          <text x="212" y="300" textAnchor="middle" opacity="0.87">production debugging</text>
          <text x="152" y="338" textAnchor="middle" opacity="0.83">perf. engineering</text>
          <text x="216" y="376" textAnchor="middle" opacity="0.79">api design</text>
          <text x="154" y="416" textAnchor="middle" opacity="0.74">security &amp; infra</text>
          <text x="184" y="460" textAnchor="middle" opacity="0.68">technical debt</text>
        </g>
      </svg>

      <span className="sr-only">
        Iceberg diagram: Full-Stack Software Engineer visible above the waterline;
        below, all the hidden technical depth that makes the role work.
      </span>
    </div>
  );
}
