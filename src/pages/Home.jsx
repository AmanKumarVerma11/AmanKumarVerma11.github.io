import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useMagnetic from '../hooks/useMagnetic';

const selectedWork = [
  {
    num: '01',
    title: 'EasySheets AI',
    desc: 'AI-Powered EdTech Platform',
    link: 'https://easysheets-ai.com/',
  },
  {
    num: '02',
    title: 'Intrafy',
    desc: 'AI-Native Automation Consultancy',
    link: 'https://intrafy.io/',
  },
  {
    num: '03',
    title: 'Traxsis',
    desc: 'AI-Powered Business Consulting Platform',
    link: 'https://traxsis.com/',
  },
];

function Home() {
  const heroRef = useRef(null);
  const ctaRef = useMagnetic(0.18);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

    const onMove = e => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty('--mx', `${x}%`);
      el.style.setProperty('--my', `${y}%`);
    };

    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-10">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="spotlight min-h-[calc(100svh-4rem)] flex items-center py-16"
      >
        <div className="w-full max-w-5xl space-y-10">

          <div className="flex items-center gap-3 animate-fade-up" style={{ animationDelay: '0.05s' }}>
            <span className="status-dot" aria-hidden="true" />
            <p className="text-haze text-xs font-semibold tracking-[0.18em] uppercase">
              Full Stack Engineer &amp; AI Systems Builder
            </p>
          </div>

          {/* Name — each line reveals upward from a mask */}
          <div className="space-y-0 -mt-2">
            <div className="overflow-hidden pb-1">
              <div
                className="text-[clamp(3.6rem,9.5vw,9rem)] leading-[0.90] tracking-tight text-ink animate-line-reveal"
                style={{
                  fontVariationSettings: "'wdth' 84, 'wght' 800",
                  animationDelay: '0.2s',
                }}
              >
                Aman Kumar
              </div>
            </div>
            <div className="overflow-hidden pb-1">
              <div
                className="text-[clamp(3.6rem,9.5vw,9rem)] leading-[0.90] tracking-tight text-ink animate-line-reveal"
                style={{
                  fontVariationSettings: "'wdth' 84, 'wght' 800",
                  animationDelay: '0.35s',
                }}
              >
                Verma<span className="text-signal">.</span>
              </div>
            </div>
          </div>

          {/* Bio */}
          <p
            className="text-dim text-lg leading-relaxed max-w-[50ch] animate-fade-up"
            style={{ animationDelay: '0.7s' }}
          >
            I build AI-native systems, multi-agent pipelines, and full-stack
            products — from zero to shipped.
          </p>

          {/* CTAs */}
          <div
            className="flex items-center gap-6 animate-fade-up"
            style={{ animationDelay: '0.85s' }}
          >
            <Link
              ref={ctaRef}
              to="/projects"
              className="btn-fill magnetic text-sm font-medium text-ink border border-wire rounded-sm px-5 py-2.5"
            >
              View work
            </Link>
            <Link
              to="/contact"
              className="text-sm text-dim hover:text-ink transition-colors duration-200 link-grow"
            >
              Get in touch →
            </Link>
          </div>

        </div>
      </section>

      {/* ── Selected work ────────────────────────────────────── */}
      <section className="border-t border-wire pt-14 pb-24">
        <div className="flex items-baseline justify-between mb-10">
          <h2 className="text-haze text-xs font-semibold tracking-[0.18em] uppercase">
            Selected Work
          </h2>
          <Link
            to="/projects"
            className="text-dim text-xs hover:text-ink transition-colors duration-200 link-grow"
          >
            All projects →
          </Link>
        </div>

        <div className="divide-y divide-wire">
          {selectedWork.map(({ num, title, desc, link }) => (
            <a
              key={num}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between py-5 px-0 hover:px-3 transition-all duration-300"
            >
              <div className="flex items-baseline gap-5 min-w-0">
                <span className="text-haze text-xs tabular-nums shrink-0 group-hover:text-ink transition-colors duration-300">
                  {num}
                </span>
                <div className="min-w-0">
                  <span className="project-title-text text-lg text-ink">
                    {title}
                  </span>
                  <span className="text-dim text-sm ml-4 hidden sm:inline truncate">
                    {desc}
                  </span>
                </div>
              </div>
              <svg
                className="w-4 h-4 text-haze group-hover:text-ink transition-all duration-200 shrink-0 ml-4 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          ))}
        </div>
      </section>

    </div>
  );
}

export default Home;
