import useReveal from '../hooks/useReveal';

const stats = [
  { value: '2', suffix: '+',  label: 'Years building'      },
  { value: '6',  suffix: '',  label: 'Products shipped'    },
  { value: '100', suffix: '+', label: 'Countries automated' },
];

const currently = [
  'Architecting a 7-agent AI orchestration system at SellAbroad',
  'Open to founding-engineer roles at AI-native startups',
  'Based in Delhi, working with global teams remotely',
];

const experience = [
  {
    title: 'Full Stack Software Engineer',
    company: 'SellAbroad',
    period: 'Nov 2025 – Present',
    location: 'Remote',
    description:
      'Architected a 7-agent AI orchestration system that fully automates Shopify theme onboarding — covering live site analysis, DOM selector scouting, validation, code integration, and automated regression QA. Automated cross-border market expansion to 100+ countries with multi-currency pricing, geo-targeting logic, and a BNPL payment matrix — reducing per-merchant setup from hours to minutes. Built a persistent memory and state management layer for reliable multi-phase automation with automatic resume-on-failure.',
    tech: 'Medusa · Next.js · TypeScript · Shopify APIs · PostgreSQL · Redis · BullMQ · Node.js',
  },
  {
    title: 'Software Development Engineer',
    company: 'COOX',
    period: 'Apr 2025 – Oct 2025',
    location: 'Hybrid',
    description:
      'Engineered and shipped production features across web and mobile in a cross-functional team. Identified and eliminated performance bottlenecks — reduced unnecessary re-renders and optimized API call patterns. Diagnosed and resolved production incidents using Sentry in a Scrum-based Agile workflow.',
    tech: 'Next.js · React Native · TypeScript · Bootstrap · Sentry · Jira',
  },
];

const principles = [
  {
    num: '01',
    title: 'Ship beats perfect.',
    desc: 'A v1 in production teaches more than a v3 in staging.',
  },
  {
    num: '02',
    title: 'Systems over heroics.',
    desc: 'If it requires hero work to keep running, it needs a redesign.',
  },
  {
    num: '03',
    title: 'AI augments, never replaces.',
    desc: 'The best AI products amplify human judgment, not bypass it.',
  },
  {
    num: '04',
    title: 'Speed reveals quality.',
    desc: 'How fast you can iterate matters more than how clean the snapshot looks.',
  },
];

const skills = [
  { category: 'Frontend',        items: ['React.js', 'Next.js', 'React Native', 'TypeScript', 'Tailwind CSS'] },
  { category: 'Backend',         items: ['Node.js', 'Express.js', 'Medusa', 'BullMQ', 'Prisma ORM', 'REST APIs'] },
  { category: 'AI & Automation', items: ['Multi-Agent Orchestration', 'LLM Integration', 'RAG Systems', 'Vector Embeddings', 'Prompt Engineering'] },
  { category: 'Databases',       items: ['PostgreSQL', 'MongoDB (Vector Search)', 'Redis'] },
  { category: 'Tools',           items: ['Docker', 'Git', 'Sentry', 'Linear', 'Figma', 'Shopify Liquid'] },
  { category: 'Languages',       items: ['JavaScript', 'TypeScript', 'SQL', 'Python'] },
];

function StatBlock({ value, suffix, label }) {
  return (
    <div>
      <div
        className="text-[clamp(2.4rem,4vw,3.4rem)] leading-none text-ink"
        style={{ fontVariationSettings: "'wdth' 84, 'wght' 800" }}
      >
        {value}<span className="text-signal">{suffix}</span>
      </div>
      <div className="text-haze text-[10px] uppercase tracking-[0.18em] mt-3 font-semibold">
        {label}
      </div>
    </div>
  );
}

function ExperienceRow({ exp, delay }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal-item grid lg:grid-cols-[180px_1fr] gap-4 lg:gap-10 group${visible ? ' is-visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="space-y-1 pt-0.5">
        <p className="text-dim text-sm">{exp.period}</p>
        <p className="text-haze text-xs">{exp.location}</p>
      </div>
      <div className="space-y-3 border-t border-wire pt-5 lg:border-0 lg:pt-0">
        <div>
          <h3 className="text-ink font-semibold text-lg">{exp.title}</h3>
          <p className="text-ink text-sm mt-0.5 font-medium">
            <span className="inline-block w-1 h-1 rounded-full bg-signal mr-2 mb-[3px] align-middle" aria-hidden="true" />
            {exp.company}
          </p>
        </div>
        <p className="text-dim text-sm leading-relaxed max-w-[65ch]">
          {exp.description}
        </p>
        <p className="text-haze text-xs pt-3 border-t border-wire/50">
          {exp.tech}
        </p>
      </div>
    </div>
  );
}

function PrincipleBlock({ p, delay }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal-item group${visible ? ' is-visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className="text-haze text-xs tabular-nums tracking-widest group-hover:text-signal transition-colors duration-300">
        {p.num}
      </span>
      <h3
        className="text-ink text-xl mt-3 mb-2"
        style={{ fontVariationSettings: "'wdth' 90, 'wght' 700" }}
      >
        {p.title}
      </h3>
      <p className="text-dim text-sm leading-relaxed max-w-[40ch]">
        {p.desc}
      </p>
    </div>
  );
}

function About() {
  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-10 py-16 space-y-28">

      {/* ── Identity ──────────────────────────────────────────── */}
      <section className="space-y-10 max-w-4xl">
        <div className="flex items-center gap-3 animate-fade-up" style={{ animationDelay: '0.05s' }}>
          <span className="status-dot" aria-hidden="true" />
          <p className="text-haze text-xs font-semibold tracking-[0.18em] uppercase">
            Available for new projects
          </p>
        </div>

        <div className="-mt-2">
          <div className="overflow-hidden pb-1">
            <h1
              className="text-[clamp(3rem,7vw,6rem)] leading-[0.94] text-ink animate-line-reveal"
              style={{
                fontVariationSettings: "'wdth' 84, 'wght' 800",
                animationDelay: '0.2s',
              }}
            >
              Aman Kumar
            </h1>
          </div>
          <div className="overflow-hidden pb-1">
            <h1
              className="text-[clamp(3rem,7vw,6rem)] leading-[0.94] text-ink animate-line-reveal"
              style={{
                fontVariationSettings: "'wdth' 84, 'wght' 800",
                animationDelay: '0.32s',
              }}
            >
              Verma<span className="text-signal">.</span>
            </h1>
          </div>
        </div>

        <div className="space-y-5 animate-fade-up" style={{ animationDelay: '0.65s' }}>
          <p className="text-dim text-base leading-relaxed max-w-[60ch]">
            Full-Stack Software Engineer with 2+ years building scalable web
            applications, AI-integrated platforms, and production automation
            systems. I specialize in multi-agent AI orchestration, RAG pipelines,
            and LLM integrations — from AI-powered SaaS to cross-border e-commerce
            automation at scale.
          </p>
          <p className="text-dim text-base leading-relaxed max-w-[60ch]">
            Learn fast. Move with purpose. Deliver with clarity.
          </p>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────── */}
      <section className="grid grid-cols-3 gap-6 sm:gap-12 max-w-3xl border-t border-wire pt-12">
        {stats.map(s => (
          <StatBlock key={s.label} {...s} />
        ))}
      </section>

      {/* ── Currently ─────────────────────────────────────────── */}
      <section>
        <div className="flex items-center gap-3 mb-10">
          <span className="status-dot" aria-hidden="true" />
          <h2 className="text-haze text-xs font-semibold tracking-[0.18em] uppercase">
            Currently
          </h2>
        </div>
        <ul className="space-y-4">
          {currently.map((line, i) => (
            <li key={i} className="text-ink text-lg leading-relaxed max-w-[60ch] flex items-baseline gap-4">
              <span className="text-haze text-xs tabular-nums shrink-0">{String(i + 1).padStart(2, '0')}</span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Experience ────────────────────────────────────────── */}
      <section>
        <h2 className="text-haze text-xs font-semibold tracking-[0.18em] uppercase mb-10">
          Experience
        </h2>
        <div className="space-y-12">
          {experience.map((exp, i) => (
            <ExperienceRow key={i} exp={exp} delay={i * 80} />
          ))}
        </div>
      </section>

      {/* ── Principles ────────────────────────────────────────── */}
      <section>
        <h2 className="text-haze text-xs font-semibold tracking-[0.18em] uppercase mb-10">
          Principles
        </h2>
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-12 max-w-4xl">
          {principles.map((p, i) => (
            <PrincipleBlock key={p.num} p={p} delay={i * 60} />
          ))}
        </div>
      </section>

      {/* ── Skills ────────────────────────────────────────────── */}
      <section>
        <h2 className="text-haze text-xs font-semibold tracking-[0.18em] uppercase mb-10">
          Skills
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-10">
          {skills.map(({ category, items }) => (
            <div key={category}>
              <h3 className="text-ink text-sm font-semibold mb-3">{category}</h3>
              <ul className="space-y-1.5">
                {items.map(item => (
                  <li key={item} className="text-dim text-sm hover:text-ink transition-colors duration-200 cursor-default">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── Education ─────────────────────────────────────────── */}
      <section className="border-t border-wire pt-14">
        <h2 className="text-haze text-xs font-semibold tracking-[0.18em] uppercase mb-8">
          Education
        </h2>
        <div className="grid lg:grid-cols-[180px_1fr] gap-4 lg:gap-10">
          <p className="text-dim text-sm pt-0.5">2020 – 2024</p>
          <div className="border-t border-wire pt-5 lg:border-0 lg:pt-0">
            <h3 className="text-ink font-semibold">B.Tech in Information Technology</h3>
            <p className="text-dim text-sm mt-1">IPEC (AKTU) · CGPA 7.01 / 10</p>
          </div>
        </div>
      </section>

      {/* ── Contact CTA at end ────────────────────────────────── */}
      <section className="border-t border-wire pt-14">
        <p className="text-haze text-xs font-semibold tracking-[0.18em] uppercase mb-3">
          Want to work together?
        </p>
        <a
          href="mailto:akverma11aug2002@gmail.com"
          className="text-ink text-2xl link-grow hover:text-dim transition-colors duration-200"
          style={{ fontVariationSettings: "'wdth' 90, 'wght' 700" }}
        >
          akverma11aug2002@gmail.com →
        </a>
      </section>

    </div>
  );
}

export default About;
