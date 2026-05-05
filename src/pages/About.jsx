import useReveal from '../hooks/useReveal';

const stamp = ['Delhi', 'Open globally', 'Currently shipping 7-agent orchestration'];

const rightNow = [
  'Architecting a 7-agent AI orchestration system — full automation from DOM analysis to regression QA',
  'Running Intrafy — AI-native automation consultancy',
  'Open to founding-engineer roles at AI-native startups',
];

const bio = [
  {
    annotation: '7 agents · live in production',
    claim: 'I architect multi-agent AI systems.',
  },
  {
    annotation: '6 products · 100+ countries',
    claim: 'I ship products from zero to production.',
  },
  {
    annotation: 'Persistent memory · auto-resume',
    claim: 'I build systems that recover themselves.',
  },
  {
    annotation: 'Next · Node · Postgres · LLMs',
    claim: 'I own what I build — frontend to deployment.',
  },
];

const shipped = [
  'A 7-agent AI orchestration that automates Shopify theme onboarding — DOM analysis, code injection, validation, and regression QA — replacing 4+ hours of per-merchant manual setup.',
  'EasySheets AI — curriculum-aligned assessment generation for Indian schools, hours of teacher work compressed into seconds.',
  'Intrafy — an AI-native automation consultancy where agents run client engagements end-to-end.',
];

const principles = [
  { num: '01', title: 'Ship beats perfect.',         desc: 'A v1 in production teaches more than a v3 in staging.' },
  { num: '02', title: 'Systems over heroics.',       desc: 'If it requires hero work to keep running, it needs a redesign.' },
  { num: '03', title: 'AI augments, never replaces.',desc: 'The best AI products amplify human judgment, not bypass it.' },
  { num: '04', title: 'Speed reveals quality.',      desc: 'How fast you can iterate matters more than how clean the snapshot looks.' },
];

const plain = [
  { label: 'Location',  value: 'Delhi, India · Open globally' },
  { label: 'Education', value: 'B.Tech IT, IPEC AKTU · 2024' },
  { label: 'Stack',     value: 'React · Next.js · TypeScript · Node · Postgres · Redis · Python · LLMs · LangChain' },
  { label: 'Email',     value: 'akverma11aug2002@gmail.com', href: 'mailto:akverma11aug2002@gmail.com' },
  { label: 'GitHub',    value: 'github.com/AmanKumarVerma11', href: 'https://github.com/AmanKumarVerma11' },
  { label: 'LinkedIn',  value: 'linkedin.com/in/aman-kr-verma11', href: 'https://www.linkedin.com/in/aman-kr-verma11/' },
];

function BioRow({ item, delay }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`bio-row reveal-item${visible ? ' is-visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <p className="bio-annotation">[ {item.annotation} ]</p>
      <p
        className="text-ink text-xl lg:text-[1.6rem] leading-snug"
        style={{ fontVariationSettings: "'wdth' 90, 'wght' 600" }}
      >
        {item.claim}
      </p>
    </div>
  );
}

function PrincipleBlock({ p, delay }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal-item${visible ? ' is-visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className="font-mono-sys text-haze text-[11px] tracking-[0.1em]">
        {p.num}
      </span>
      <h3
        className="text-ink text-lg mt-3 mb-2"
        style={{ fontVariationSettings: "'wdth' 92, 'wght' 700" }}
      >
        {p.title}
      </h3>
      <p className="text-dim text-sm leading-relaxed max-w-[42ch]">
        {p.desc}
      </p>
    </div>
  );
}

function About() {
  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-10 py-16 space-y-28">

      {/* ── 1. Metadata stamp ─────────────────────────────────── */}
      <section
        className="font-mono-sys text-haze text-[11px] uppercase tracking-[0.16em] flex flex-wrap items-center gap-x-3 gap-y-2 animate-fade-up"
        style={{ animationDelay: '0.05s' }}
      >
        {stamp.map((s, i) => (
          <span key={i} className="flex items-center gap-3">
            <span>{s}</span>
            {i < stamp.length - 1 && <span className="text-wire">/</span>}
          </span>
        ))}
      </section>

      {/* ── 2. Manifesto ──────────────────────────────────────── */}
      <section className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
        <h1
          className="text-[clamp(1.6rem,5vw,4.4rem)] leading-[1.05] text-ink max-w-[22ch]"
          style={{ fontVariationSettings: "'wdth' 92, 'wght' 600" }}
        >
          I build the systems that make&nbsp;the&nbsp;demos&nbsp;work<span className="text-signal">.</span>
        </h1>
        <p className="font-mono-sys text-dim text-sm mt-6 tracking-wide">
          Multi-agent AI &nbsp;·&nbsp; persistent memory &nbsp;·&nbsp; recovery built-in.
        </p>
      </section>

      {/* ── 3. Right Now ──────────────────────────────────────── */}
      <section>
        <h2 className="font-mono-sys text-haze text-[11px] uppercase tracking-[0.18em] mb-8">
          Right Now
        </h2>
        <ul className="space-y-3 max-w-[60ch]">
          {rightNow.map((line, i) => (
            <li key={i} className="text-ink text-base lg:text-lg flex items-baseline gap-5">
              <span className="font-mono-sys text-haze text-[11px] tabular-nums shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── 4. Annotated bio (the centerpiece) ───────────────── */}
      <section>
        <h2 className="font-mono-sys text-haze text-[11px] uppercase tracking-[0.18em] mb-10">
          About
        </h2>
        <div className="space-y-7">
          {bio.map((item, i) => (
            <BioRow key={i} item={item} delay={i * 70} />
          ))}
        </div>
      </section>

      {/* ── 5. Shipped ────────────────────────────────────────── */}
      <section>
        <h2 className="font-mono-sys text-haze text-[11px] uppercase tracking-[0.18em] mb-8">
          Shipped
        </h2>
        <ul className="space-y-5 max-w-[68ch]">
          {shipped.map((line, i) => (
            <li key={i} className="text-ink text-base lg:text-lg leading-relaxed flex items-baseline gap-5">
              <span className="font-mono-sys text-haze text-[11px] tabular-nums shrink-0 mt-1">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
        <a
          href="/projects"
          className="font-mono-sys inline-block text-dim text-[11px] uppercase tracking-[0.16em] mt-8 link-grow hover:text-ink transition-colors duration-200"
        >
          View all six projects →
        </a>
      </section>

      {/* ── 6. Principles ─────────────────────────────────────── */}
      <section>
        <h2 className="font-mono-sys text-haze text-[11px] uppercase tracking-[0.18em] mb-10">
          Principles
        </h2>
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 max-w-4xl">
          {principles.map((p, i) => (
            <PrincipleBlock key={p.num} p={p} delay={i * 60} />
          ))}
        </div>
      </section>

      {/* ── 7. Plain footer block ─────────────────────────────── */}
      <section className="border-t border-wire pt-14">
        <h2 className="font-mono-sys text-haze text-[11px] uppercase tracking-[0.18em] mb-8">
          The Plain Stuff
        </h2>
        <dl className="space-y-3 max-w-3xl">
          {plain.map(item => (
            <div key={item.label} className="grid grid-cols-[80px_1fr] sm:grid-cols-[110px_1fr] gap-3 sm:gap-6 items-baseline">
              <dt className="font-mono-sys text-haze text-[11px] uppercase tracking-[0.14em]">
                {item.label}
              </dt>
              <dd className="text-dim text-sm">
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="hover:text-ink transition-colors duration-200 link-grow"
                  >
                    {item.value}
                  </a>
                ) : item.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

    </div>
  );
}

export default About;
