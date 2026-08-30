import { useEffect, useRef, useState } from 'react';
import useReveal from '../hooks/useReveal';

// A career history rendered as a GitLens-style commit graph. The employment
// line is `main`; the SellAbroad promotion is a `feat/fde` branch that carries
// the work that earned it and merges back into main as the FDE commit.
//
// Topology is derived from the `commits` prop, newest first (git-log order):
//   lane 0 = main, lane 1 = the promotion branch. A commit flagged `branch`
//   spawns lane 1; the commit flagged `merge` folds it back in.
//
// The graph gutter is decorative (aria-hidden) — every role, date, and note is
// real text in the rows, so the section reads fully without the SVG.

const GUTTER = 60;          // px width of the graph column
const LANE_X = [22, 44];    // x-centre of lane 0 (main) and lane 1 (branch)
const NODE_OFFSET = 15;     // node centre, measured down from a row's top
const R = 5;                // node radius

const CYAN = 'oklch(0.74 0.09 215)';   // main lane (matches --signal)
const AMBER = 'oklch(0.80 0.11 75)';   // promotion branch
const CANVAS = 'oklch(0.09 0 0)';      // node core, to punch through the line

const laneColor = lane => (lane === 1 ? AMBER : CYAN);

// Smooth vertical-tangent cubic through a top-to-bottom list of points — the
// curve shape GitLens uses where a branch peels off or merges back.
function smoothPath(points) {
  if (points.length < 2) return '';
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    const my = (a.y + b.y) / 2;
    d += ` C ${a.x} ${my}, ${b.x} ${my}, ${b.x} ${b.y}`;
  }
  return d;
}

function RefChip({ label }) {
  const isTag = label.startsWith('tag:');
  const isHead = label.includes('HEAD');
  const isRoot = label === 'root';
  const tone = isTag
    ? 'text-signal border-signal/40'
    : isHead
      ? 'text-ink border-wire'
      : isRoot
        ? 'text-haze border-wire'
        : 'text-signal/90 border-signal/30';
  return (
    <span className={`font-mono-sys text-[10px] leading-none tracking-[0.04em] px-1.5 py-1 rounded-sm border ${tone}`}>
      {label}
    </span>
  );
}

export default function CareerGraph({ commits }) {
  const wrapRef = useRef(null);
  const rowRefs = useRef([]);
  const [nodes, setNodes] = useState(null);   // [{x, y}] once measured
  const [height, setHeight] = useState(0);
  const [reveal, visible] = useReveal();

  // Measure node y-positions from the laid-out rows. Re-run on resize and once
  // the display font has loaded (both shift row heights).
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const measure = () => {
      const top = wrap.getBoundingClientRect().top;
      const pts = rowRefs.current.map((row, i) => {
        const r = row.getBoundingClientRect();
        return { x: LANE_X[commits[i].lane] ?? LANE_X[0], y: r.top - top + NODE_OFFSET };
      });
      setNodes(pts);
      setHeight(wrap.getBoundingClientRect().height);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    if (document.fonts?.ready) document.fonts.ready.then(measure).catch(() => {});
    return () => ro.disconnect();
  }, [commits]);

  // Derive the drawable geometry once we have measured node centres.
  let mainLine = '';
  let branchLine = '';
  if (nodes) {
    const main = commits.map((c, i) => ({ ...nodes[i], lane: c.lane })).filter(n => n.lane === 0);
    if (main.length) {
      const x = LANE_X[0];
      mainLine = `M ${x} ${main[0].y} L ${x} ${main[main.length - 1].y}`;
    }
    const mergeIdx = commits.findIndex(c => c.merge);
    const branchIdx = commits.findIndex(c => c.branch);
    if (mergeIdx !== -1 && branchIdx !== -1) {
      const between = commits
        .map((c, i) => ({ c, i }))
        .filter(({ c, i }) => c.lane === 1 && i > mergeIdx && i < branchIdx)
        .map(({ i }) => nodes[i]);
      // top -> bottom: merge node (on main), the branch commits, branch point (on main)
      branchLine = smoothPath([nodes[mergeIdx], ...between, nodes[branchIdx]]);
    }
  }

  return (
    <div ref={reveal} className={`reveal-item${visible ? ' is-visible' : ''}`}>
      <p className="font-mono-sys text-haze text-[11px] tracking-[0.06em] mb-6">
        <span className="text-signal">$</span> git log --graph --oneline
      </p>

      <div
        ref={wrapRef}
        className={`career-graph relative${visible ? ' animate' : ''}`}
      >
        {/* Graph gutter — decorative, drawn once rows are measured */}
        {nodes && (
          <svg
            className="absolute top-0 left-0 pointer-events-none"
            width={GUTTER}
            height={height}
            viewBox={`0 0 ${GUTTER} ${height}`}
            fill="none"
            aria-hidden="true"
          >
            {mainLine && (
              <path d={mainLine} stroke={CYAN} strokeOpacity="0.85" strokeWidth="2" strokeLinecap="round" pathLength="1" />
            )}
            {branchLine && (
              <path d={branchLine} stroke={AMBER} strokeOpacity="0.9" strokeWidth="2" strokeLinecap="round" pathLength="1" />
            )}
            {commits.map((c, i) => {
              const n = nodes[i];
              if (!n) return null;
              const color = laneColor(c.lane);
              const isHead = c.kind === 'head';
              const isRoot = c.kind === 'root';
              return (
                <g key={i} style={{ animationDelay: `${0.25 + i * 0.08}s` }}>
                  {isHead && <circle cx={n.x} cy={n.y} r={R + 4} fill={color} fillOpacity="0.18" />}
                  <circle cx={n.x} cy={n.y} r={R} fill={isRoot ? CANVAS : color} stroke={color} strokeWidth="2" />
                  {c.merge && <circle cx={n.x} cy={n.y} r={R - 2.5} fill={CANVAS} />}
                </g>
              );
            })}
          </svg>
        )}

        {/* Commit rows */}
        <ol className="m-0 list-none p-0">
          {commits.map((c, i) => (
            <li
              key={i}
              ref={el => (rowRefs.current[i] = el)}
              className="relative pb-9 last:pb-0"
              style={{ paddingLeft: GUTTER }}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <span
                  className="text-ink text-base"
                  style={{ fontVariationSettings: "'wdth' 90, 'wght' 600" }}
                >
                  {c.role}
                  {c.org && <span className="text-dim font-normal"> · {c.org}</span>}
                </span>
                <div className="flex items-center gap-3 shrink-0">
                  {c.location && (
                    <span className="font-mono-sys text-haze text-[10px] tracking-[0.1em] uppercase">{c.location}</span>
                  )}
                  <span className="font-mono-sys text-haze text-[11px] tracking-[0.1em]">{c.period}</span>
                </div>
              </div>

              {(c.refs?.length || c.hash) && (
                <div className="flex flex-wrap items-center gap-1.5 mt-2">
                  {c.refs?.map(r => <RefChip key={r} label={r} />)}
                  {c.hash && (
                    <span className="font-mono-sys text-haze text-[10px] tracking-[0.06em]">{c.hash}</span>
                  )}
                </div>
              )}

              {c.note && (
                <p className="text-dim text-sm leading-relaxed max-w-[62ch] mt-3">{c.note}</p>
              )}
              {c.tech && (
                <p className="font-mono-sys text-haze text-[10px] tracking-[0.08em] mt-3">{c.tech}</p>
              )}
            </li>
          ))}
        </ol>
      </div>

      <p className="font-mono-sys text-haze text-[11px] tracking-[0.04em] mt-8 pl-[60px]">
        <span style={{ color: AMBER }}>◇</span> parallel branch: Intrafy, an AI automation consultancy, running since 2024.
      </p>
    </div>
  );
}
