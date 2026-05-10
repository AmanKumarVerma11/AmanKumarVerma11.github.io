import { useEffect, useState } from 'react';
import useReveal from '../hooks/useReveal';

// Signal blue variants — matches site's oklch color system
const LEVEL_COLORS = [
  'oklch(0.14 0 0)',        // 0 — empty
  'oklch(0.28 0.05 215)',   // 1 — low
  'oklch(0.43 0.07 215)',   // 2 — medium
  'oklch(0.59 0.08 215)',   // 3 — high
  'oklch(0.74 0.09 215)',   // 4 — max (= signal)
];

const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];
const CELL = 10;
const GAP = 2;
const STEP = CELL + GAP;
const DAY_COL = 28;

function groupIntoWeeks(days) {
  if (!days.length) return [];
  const weeks = [];
  let week = [];

  const firstDow = new Date(days[0].date + 'T00:00:00').getDay();
  for (let i = 0; i < firstDow; i++) week.push(null);

  for (const day of days) {
    week.push(day);
    if (week.length === 7) { weeks.push(week); week = []; }
  }
  if (week.length) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }
  return weeks;
}

function getMonthLabels(weeks) {
  const labels = [];
  let lastMonth = -1;
  weeks.forEach((week, col) => {
    const first = week.find(Boolean);
    if (!first) return;
    const d = new Date(first.date + 'T00:00:00');
    const m = d.getMonth();
    if (m !== lastMonth) {
      labels.push({ col, label: d.toLocaleString('en-US', { month: 'short' }) });
      lastMonth = m;
    }
  });
  return labels;
}

export default function GitHubContributions() {
  const [weeks, setWeeks] = useState([]);
  const [monthLabels, setMonthLabels] = useState([]);
  const [total, setTotal] = useState(null);
  const [status, setStatus] = useState('loading');
  const [ref, visible] = useReveal();

  useEffect(() => {
    fetch('/api/github-contributions')
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(data => {
        const w = groupIntoWeeks(data.contributions ?? []);
        setWeeks(w);
        setMonthLabels(getMonthLabels(w));
        const t = Object.values(data.total ?? {}).reduce((a, b) => a + b, 0);
        setTotal(t);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  if (status === 'loading') {
    return (
      <p className="font-mono-sys text-haze text-[11px] tracking-[0.1em] uppercase">
        Loading contributions…
      </p>
    );
  }

  if (status === 'error') return null;

  const gridWidth = DAY_COL + weeks.length * STEP;

  return (
    <div ref={ref} className={`reveal-item${visible ? ' is-visible' : ''}`}>
      <div className="overflow-x-auto">
        <div style={{ position: 'relative', width: gridWidth, paddingTop: '18px' }}>

          {/* Month labels */}
          {monthLabels.map(({ col, label }) => (
            <span
              key={`${col}-${label}`}
              className="font-mono-sys text-haze"
              style={{
                position: 'absolute',
                top: 0,
                left: DAY_COL + col * STEP,
                fontSize: '10px',
                letterSpacing: '0.06em',
                lineHeight: 1,
              }}
            >
              {label}
            </span>
          ))}

          {/* Grid body */}
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>

            {/* Day labels */}
            <div style={{
              display: 'grid',
              gridTemplateRows: `repeat(7, ${CELL}px)`,
              gap: GAP,
              width: DAY_COL,
              flexShrink: 0,
            }}>
              {DAY_LABELS.map((label, i) => (
                <span
                  key={i}
                  className="font-mono-sys text-haze"
                  style={{
                    fontSize: '10px',
                    lineHeight: `${CELL}px`,
                    textAlign: 'right',
                    paddingRight: 5,
                    visibility: label ? 'visible' : 'hidden',
                  }}
                >
                  {label}
                </span>
              ))}
            </div>

            {/* Weeks */}
            <div style={{ display: 'flex', gap: GAP }}>
              {weeks.map((week, wi) => (
                <div
                  key={wi}
                  style={{
                    display: 'grid',
                    gridTemplateRows: `repeat(7, ${CELL}px)`,
                    gap: GAP,
                  }}
                >
                  {week.map((day, di) => (
                    <div
                      key={di}
                      title={day ? `${day.date} · ${day.count} contribution${day.count !== 1 ? 's' : ''}` : undefined}
                      style={{
                        width: CELL,
                        height: CELL,
                        borderRadius: 2,
                        backgroundColor: day ? LEVEL_COLORS[day.level] : LEVEL_COLORS[0],
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer row */}
      <div className="flex items-center justify-between mt-3 flex-wrap gap-4">
        {total !== null && (
          <p className="font-mono-sys text-haze text-[11px] tracking-[0.08em]">
            {total.toLocaleString()} contributions in the last year
          </p>
        )}
        <div className="flex items-center gap-1.5">
          <span className="font-mono-sys text-haze text-[10px] tracking-[0.06em]">Less</span>
          {LEVEL_COLORS.map((color, i) => (
            <div
              key={i}
              style={{ width: CELL, height: CELL, borderRadius: 2, backgroundColor: color }}
            />
          ))}
          <span className="font-mono-sys text-haze text-[10px] tracking-[0.06em]">More</span>
        </div>
      </div>
    </div>
  );
}
