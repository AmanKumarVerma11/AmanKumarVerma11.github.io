import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import useMagnetic from '../hooks/useMagnetic';
import FlowField from '../Components/FlowField';
import { featuredProjects, displayNum, projectCount } from '../data/projects';

// Surfaced on the home page so the story reads without reaching /about — which
// matters most on mobile, where the nav is hidden behind the burger menu.
const claims = [
  { n: '01', t: 'I own features end to end.', d: 'Design, build, ship, and the parts that keep it alive. From the schema to production.' },
  { n: '02', t: 'I build AI systems that run themselves.', d: 'Multi-agent pipelines with persistent memory and recovery, live in production, not just demos.' },
  { n: '03', t: 'I ship from zero to production.', d: `${projectCount} products across 100+ countries, from AI systems to a payments dashboard I built solo.` },
  { n: '04', t: 'Range is the skill.', d: 'Deep where it counts, and quick to pick up whatever the next problem needs.' },
];

const shipped = [
  { t: 'A payments dashboard for high-risk merchants', d: 'Built and shipped solo, design to production. It moves real money for merchants other processors turn away.' },
  { t: 'A multi-agent system that onboards Shopify stores', d: 'DOM analysis, code injection, validation, and QA, end to end. Hours of manual setup per merchant, gone.' },
  { t: 'Cross-border commerce to 100+ countries', d: 'Multi-currency pricing, geo-targeting, and a BNPL matrix, live at SellAbroad.' },
];

function Home() {
  const heroRef = useRef(null);
  const ctaRef = useMagnetic(0.18);
  const [isDesktop, setIsDesktop] = useState(false);

  // Desktop gets the interactive flow field (cursor, hidden notes, "akv"
  // monogram); mobile gets a calm ambient version behind the hero.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

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
  // The loop parks itself once both axes settle and is woken by input, so an
  // idle or touch-only visitor is not paying for a permanent rAF.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;

    const nodes = Array.from(document.querySelectorAll('.hero-name'));
    if (!nodes.length) return;

    const BASE_WGHT = 720;
    const PEAK_WGHT = 820;
    const BASE_WDTH = 86;
    const PEAK_WDTH = 100;

    let energy = 0;
    let wght = BASE_WGHT;
    let wdth = BASE_WDTH;
    let lastX = 0, lastY = 0, lastT = 0;
    let raf = null;

    const tick = () => {
      energy *= 0.92;
      const targetWght = BASE_WGHT + (energy / 100) * (PEAK_WGHT - BASE_WGHT);

      const vh = window.innerHeight || 1;
      const progress = Math.min(window.scrollY / vh, 1);
      const targetWdth = BASE_WDTH + progress * (PEAK_WDTH - BASE_WDTH);

      wght += (targetWght - wght) * 0.18;
      wdth += (targetWdth - wdth) * 0.14;

      const fvs = `'wdth' ${wdth.toFixed(2)}, 'wght' ${wght.toFixed(1)}`;
      for (const el of nodes) el.style.fontVariationSettings = fvs;

      // Park once there is nothing left to animate towards.
      const settled =
        energy < 0.05 &&
        Math.abs(targetWght - wght) < 0.05 &&
        Math.abs(targetWdth - wdth) < 0.01;

      raf = settled ? null : requestAnimationFrame(tick);
    };

    const wake = () => { if (raf === null) raf = requestAnimationFrame(tick); };

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
      wake();
    };

    if (!isTouch) {
      window.addEventListener('mousemove', onMove, { passive: true });
    }
    // Scroll drives the width axis on every device, touch included.
    window.addEventListener('scroll', wake, { passive: true });
    wake();

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', wake);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  const heroLineClass =
    'hero-name block text-[clamp(2.2rem,9.5vw,9rem)] leading-[0.90] tracking-tight text-ink animate-line-reveal';

  return (
    <>
      <Helmet>
        <title>Aman Kumar Verma — Product Engineer (Full-Stack + AI)</title>
        <meta name="description" content={`Forward Deployed Engineer at SellAbroad. I take product from zero to shipped: full-stack, AI systems, and payments across 100+ countries. ${projectCount} products shipped. Delhi, open to roles worldwide.`} />
        <link rel="canonical" href="https://www.amankrverma.in/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Aman Kumar Verma" />
        <meta property="og:title" content="Aman Kumar Verma — Product Engineer (Full-Stack + AI)" />
        <meta property="og:description" content={`Forward Deployed Engineer at SellAbroad. Product from zero to shipped: full-stack, AI systems, and payments across 100+ countries. ${projectCount} products shipped.`} />
        <meta property="og:url" content="https://www.amankrverma.in/" />
        <meta property="og:image" content="https://www.amankrverma.in/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Aman Kumar Verma, Forward Deployed Engineer building full-stack and AI products." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@mai_amanhoon" />
        <meta name="twitter:title" content="Aman Kumar Verma — Product Engineer (Full-Stack + AI)" />
        <meta name="twitter:description" content={`Forward Deployed Engineer at SellAbroad. Product from zero to shipped: full-stack, AI systems, and payments across 100+ countries. ${projectCount} products shipped.`} />
        <meta name="twitter:image" content="https://www.amankrverma.in/og-image.png" />
      </Helmet>
      {/* ── Hero — full-bleed background, content on the grid ─── */}
      <section
        ref={heroRef}
        className="spotlight overflow-hidden flex items-center py-20 lg:py-16 lg:min-h-[calc(100svh-4rem)]"
      >
        {/* Flow field behind the hero. Desktop: interactive (cursor, hidden
            notes, "akv" monogram). Mobile: a calm ambient backdrop. */}
        <FlowField
          ambient={!isDesktop}
          className={`absolute inset-0 w-full h-full z-0 pointer-events-none ${
            isDesktop ? 'hero-flow-mask' : 'hero-flow-mask-mobile'
          }`}
        />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-10">
          <div className="max-w-5xl space-y-10">

          <p
            className="text-haze text-xs font-semibold tracking-[0.18em] uppercase animate-fade-up"
            style={{ animationDelay: '0.05s' }}
          >
            Forward Deployed Engineer &nbsp;·&nbsp; Full-Stack + AI
          </p>

          {/* Name — line-mask reveal + live font instrumentation */}
          <h1 className="space-y-0 -mt-2">
            <span className="block overflow-hidden pb-1">
              <span
                className={heroLineClass}
                style={{ animationDelay: '0.2s', fontVariationSettings: "'wdth' 86, 'wght' 720" }}
              >
                Aman Kumar
              </span>
            </span>
            {/* Keeps the accessible name "Aman Kumar Verma." rather than
                "Aman KumarVerma." — collapses to nothing visually. */}
            {' '}
            <span className="block overflow-hidden pb-1">
              <span
                className={heroLineClass}
                style={{ animationDelay: '0.35s', fontVariationSettings: "'wdth' 86, 'wght' 720" }}
              >
                Verma<span className="text-signal">.</span>
              </span>
            </span>
          </h1>

          <p
            className="text-dim text-lg leading-relaxed max-w-[50ch] animate-fade-up"
            style={{ animationDelay: '0.7s' }}
          >
            I take problems from zero to shipped. Full-stack product, AI systems,
            and everything the demo needs to survive production. Deep where it
            counts, fast on the rest.
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
        </div>
      </section>

      {/* ── What I do (surfaces the story for mobile, where nav is hidden) ─ */}
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
      <section className="border-t border-wire pt-14 pb-2">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-haze text-xs font-semibold tracking-[0.18em] uppercase">
            What I do
          </h2>
          <Link
            to="/about"
            className="text-dim text-xs hover:text-ink transition-colors duration-200 link-grow"
          >
            The full story →
          </Link>
        </div>
        <p className="text-dim text-base leading-relaxed max-w-[56ch] mb-10">
          Forward Deployed Engineer at SellAbroad, owning customer-facing product
          from problem to production. In practice:
        </p>
        <ul className="space-y-8 max-w-3xl">
          {claims.map(c => (
            <li key={c.n} className="flex gap-5 sm:gap-8">
              <span className="font-mono-sys text-haze text-[11px] tabular-nums mt-[6px] shrink-0">
                {c.n}
              </span>
              <div>
                <p
                  className="text-ink text-lg sm:text-xl leading-snug"
                  style={{ fontVariationSettings: "'wdth' 92, 'wght' 620" }}
                >
                  {c.t}
                </p>
                <p className="text-dim text-sm leading-relaxed mt-1.5 max-w-[54ch]">
                  {c.d}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Shipped (concrete proof, esp. for mobile) ────────── */}
      <section className="border-t border-wire pt-14 pb-2">
        <h2 className="text-haze text-xs font-semibold tracking-[0.18em] uppercase mb-8">
          Shipped
        </h2>
        <ul className="max-w-3xl">
          {shipped.map((s, i) => (
            <li key={i} className="first:border-t border-b border-dashed border-wire py-5">
              <p
                className="text-ink text-base sm:text-lg"
                style={{ fontVariationSettings: "'wdth' 92, 'wght' 600" }}
              >
                {s.t}
              </p>
              <p className="text-dim text-sm leading-relaxed mt-1.5 max-w-[60ch]">
                {s.d}
              </p>
            </li>
          ))}
        </ul>
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
          {featuredProjects.map((project, i) => (
            <a
              key={project.id}
              href={project.link ?? project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between py-5 px-0 hover:px-3 transition-all duration-300"
            >
              <div className="flex items-baseline gap-5 min-w-0">
                <span className="text-haze text-xs tabular-nums shrink-0 group-hover:text-ink transition-colors duration-300">
                  {displayNum(i)}
                </span>
                <div className="min-w-0">
                  <span className="project-title-text text-lg text-ink">
                    {project.title}
                  </span>
                  <span className="text-dim text-sm ml-4 hidden sm:inline truncate">
                    {project.subtitle}
                  </span>
                </div>
              </div>
              <svg
                className="w-4 h-4 text-haze group-hover:text-ink transition-all duration-200 shrink-0 ml-4 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          ))}
        </div>
      </section>
      </div>
    </>
  );
}

export default Home;
