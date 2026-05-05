import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useMagnetic from '../hooks/useMagnetic';
import Iceberg from '../Components/sketches/Iceberg';

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
    link: 'https://intrafy.in/',
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
  const nameRef = useRef(null);
  const ctaRef = useMagnetic(0.18);

  // Cursor-spotlight position
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

  // Live instrumentation: cursor velocity → wght, scroll → wdth.
  // Idle drifts both axes back to baseline.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;

    const BASE_WGHT = 720;
    const PEAK_WGHT = 820;
    const BASE_WDTH = 86;
    const PEAK_WDTH = 100;

    let energy = 0;
    let wght = BASE_WGHT;
    let wdth = BASE_WDTH;
    let lastX = 0, lastY = 0, lastT = 0;
    let raf;

    const onMove = e => {
      const now = performance.now();
      if (lastT) {
        const dt = Math.max(now - lastT, 1);
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        const speed = Math.hypot(dx, dy) / dt;
        energy = Math.min(energy + speed * 22, 100);
      }
      lastX = e.clientX;
      lastY = e.clientY;
      lastT = now;
    };

    const tick = () => {
      energy *= 0.92;
      const targetWght = BASE_WGHT + (energy / 100) * (PEAK_WGHT - BASE_WGHT);

      const vh = window.innerHeight || 1;
      const progress = Math.min(window.scrollY / vh, 1);
      const targetWdth = BASE_WDTH + progress * (PEAK_WDTH - BASE_WDTH);

      wght += (targetWght - wght) * 0.18;
      wdth += (targetWdth - wdth) * 0.14;

      const fvs = `'wdth' ${wdth.toFixed(2)}, 'wght' ${wght.toFixed(1)}`;
      document.querySelectorAll('.hero-name').forEach(el => {
        el.style.fontVariationSettings = fvs;
      });

      raf = requestAnimationFrame(tick);
    };

    if (!isTouch) {
      window.addEventListener('mousemove', onMove, { passive: true });
    }
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-10">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="spotlight min-h-[calc(100svh-4rem)] flex items-center py-16"
      >
        {/* Easter-egg sketch in the right empty margin */}
        <Iceberg className="absolute right-2 xl:right-6 top-[18%] hidden lg:block" />

        <div className="w-full max-w-5xl space-y-10">

          <p
            className="text-haze text-xs font-semibold tracking-[0.18em] uppercase animate-fade-up"
            style={{ animationDelay: '0.05s' }}
          >
            Full Stack Engineer &amp; AI Systems Builder
          </p>

          {/* Name — line-mask reveal + live font instrumentation */}
          <div ref={nameRef} className="space-y-0 -mt-2">
            <div className="overflow-hidden pb-1">
              <div
                className="hero-name text-[clamp(2.2rem,9.5vw,9rem)] leading-[0.90] tracking-tight text-ink animate-line-reveal"
                style={{ animationDelay: '0.2s', fontVariationSettings: "'wdth' 86, 'wght' 720" }}
              >
                Aman Kumar
              </div>
            </div>
            <div className="overflow-hidden pb-1">
              <div
                className="hero-name text-[clamp(2.2rem,9.5vw,9rem)] leading-[0.90] tracking-tight text-ink animate-line-reveal"
                style={{ animationDelay: '0.35s', fontVariationSettings: "'wdth' 86, 'wght' 720" }}
              >
                Verma<span className="text-signal">.</span>
              </div>
            </div>
          </div>

          <p
            className="text-dim text-lg leading-relaxed max-w-[50ch] animate-fade-up"
            style={{ animationDelay: '0.7s' }}
          >
            I build AI-native systems, multi-agent pipelines, and full-stack
            products — from zero to shipped.
          </p>

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
