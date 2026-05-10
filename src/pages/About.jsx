import { Helmet } from 'react-helmet-async';
import useReveal from '../hooks/useReveal';
import GitHubContributions from '../Components/GitHubContributions';

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is multi-agent AI orchestration?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Multi-agent AI orchestration is a system design where multiple specialised AI agents work in sequence or in parallel to complete complex tasks autonomously. Each agent handles a specific sub-task — such as DOM analysis, code injection, or regression QA — and passes results to the next, enabling reliable end-to-end automation without human intervention.',
      },
    },
    {
      '@type': 'Question',
      name: 'What has Aman Kumar Verma built?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Aman Kumar Verma has built 6 shipped products including a 7-agent AI orchestration system for Shopify theme onboarding at SellAbroad, EasySheets AI (curriculum-aligned assessment generation for Indian schools), Intrafy (an AI-native automation consultancy), Traxsis (AI-assisted consulting platform), Zeetax (React Native educational app), and Tyos Sports (e-commerce + inventory management).',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Aman Kumar Verma available for hire?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Aman is open to founding-engineer roles at AI-native startups and AI consulting engagements. He is based in Delhi, India and works remotely with global clients. Response time is typically within 24 hours.',
      },
    },
    {
      '@type': 'Question',
      name: 'What tech stack does Aman Kumar Verma use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Aman works across React, Next.js, TypeScript, Node.js, PostgreSQL, Redis, BullMQ, Python, LangChain, LangGraph, and LLM APIs including OpenAI and Gemini. For infrastructure he uses Vercel, Docker, and Shopify APIs.',
      },
    },
  ],
};

const stamp = ['Delhi', 'Open globally', 'Currently shipping 7-agent orchestration'];

const rightNow = [
  'Full Stack SWE at SellAbroad — shipping AI systems that automate Shopify merchant onboarding at scale',
  'Running Intrafy alongside — AI-native consultancy, multi-agent pipelines for clients end-to-end',
  'Open to founding-engineer roles at AI-native startups',
  'Deepening expertise in LangGraph, agent memory architectures, and eval pipelines',
];

const experience = [
  {
    role: 'Full Stack Software Engineer',
    company: 'SellAbroad',
    period: 'Jan 2026 – Present',
    location: 'Remote',
    note: 'Architected the 7-agent AI orchestration system that automates Shopify theme onboarding end-to-end. Automated cross-border expansion to 100+ countries — multi-currency pricing, geo-targeting, BNPL matrix. Built the persistent memory layer that makes multi-phase automation reliable.',
    tech: 'Next.js · TypeScript · Shopify APIs · PostgreSQL · Redis · BullMQ · Medusa',
  },
  {
    role: 'Software Development Engineer',
    company: 'COOX',
    period: 'Apr 2025 – Oct 2025',
    location: 'Hybrid',
    note: 'Shipped production features across web and mobile in a cross-functional team. Eliminated re-render bottlenecks and optimised API call patterns. Owned incident resolution via Sentry in a Scrum workflow.',
    tech: 'Next.js · React Native · TypeScript · Sentry · Jira',
  },
  {
    role: 'Builder',
    company: 'Intrafy',
    period: '2024 – Present',
    location: 'Remote',
    note: 'AI-native automation consultancy. Design and deploy multi-agent pipelines for clients — from requirement to production.',
    tech: 'Next.js · TypeScript · LangChain · LLMs',
  },
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
      className={`bio-row reveal-item first:border-t border-b border-dashed border-wire px-0 py-5${visible ? ' is-visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <p className="bio-annotation border-r border-dashed border-wire pr-8">[ {item.annotation} ]</p>
      <p
        className="text-ink text-xl lg:text-[1.6rem] leading-snug pl-8"
        style={{ fontVariationSettings: "'wdth' 90, 'wght' 600" }}
      >
        {item.claim}
      </p>
    </div>
  );
}

function ExperienceRow({ item, delay }) {
  return (
    <div
      className="border-t border-wire pt-5 pb-5 animate-fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 mb-1">
        <span
          className="text-ink text-base"
          style={{ fontVariationSettings: "'wdth' 90, 'wght' 600" }}
        >
          {item.role}
          <span className="text-dim font-normal"> — {item.company}</span>
        </span>
        <div className="flex items-center gap-3">
          {item.location && (
            <span className="font-mono-sys text-haze text-[10px] tracking-[0.1em] uppercase">{item.location}</span>
          )}
          <span className="font-mono-sys text-haze text-[11px] tracking-[0.1em]">{item.period}</span>
        </div>
      </div>
      <p className="text-dim text-sm leading-relaxed max-w-[64ch] mt-2">{item.note}</p>
      {item.tech && (
        <p className="font-mono-sys text-haze text-[10px] tracking-[0.08em] mt-3">{item.tech}</p>
      )}
    </div>
  );
}

function PrincipleBlock({ p, delay, extraClass }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal-item p-7 ${extraClass ?? ''}${visible ? ' is-visible' : ''}`}
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
    <>
      <Helmet>
        <title>About — Aman Kumar Verma</title>
        <meta name="description" content="23, Delhi. Full stack engineer specialising in multi-agent AI systems. Currently at SellAbroad and running Intrafy. Open to founding-engineer roles." />
        <link rel="canonical" href="https://www.amankrverma.in/about" />
        <meta property="og:title" content="About — Aman Kumar Verma" />
        <meta property="og:description" content="23, Delhi. Full stack engineer specialising in multi-agent AI systems. Currently at SellAbroad and running Intrafy." />
        <meta property="og:url" content="https://www.amankrverma.in/about" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
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
        <p className="text-dim text-base leading-relaxed max-w-[60ch] mt-8">
          23, Delhi. Started building for the web at 18, went full-stack at 21, and pivoted to AI systems
          when I realised the real leverage was in the orchestration layer — not the models.
          Today I run Intrafy, ship agents for clients, and stay close to the engineering across every layer I touch.
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

      {/* ── 4. Experience ─────────────────────────────────────── */}
      <section>
        <h2 className="font-mono-sys text-haze text-[11px] uppercase tracking-[0.18em] mb-8">
          Experience
        </h2>
        <div className="space-y-0 max-w-3xl">
          {experience.map((item, i) => (
            <ExperienceRow key={i} item={item} delay={i * 80} />
          ))}
          <div className="border-t border-wire" />
        </div>
      </section>

      {/* ── 5. Annotated bio (the centerpiece) ───────────────── */}
      <section>
        <h2 className="font-mono-sys text-haze text-[11px] uppercase tracking-[0.18em] mb-10">
          About
        </h2>
        <div>
          {bio.map((item, i) => (
            <BioRow key={i} item={item} delay={i * 70} />
          ))}
        </div>
      </section>

      {/* ── 6. Shipped ────────────────────────────────────────── */}
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
          View all projects →
        </a>
      </section>

      {/* ── 7. Principles ─────────────────────────────────────── */}
      <section>
        <h2 className="font-mono-sys text-haze text-[11px] uppercase tracking-[0.18em] mb-10">
          Principles
        </h2>
        <div className="max-w-4xl">
          <div className="grid md:grid-cols-2">
          {principles.map((p, i) => (
            <PrincipleBlock
              key={p.num}
              p={p}
              delay={i * 60}
              extraClass={[
                i < 2       ? 'border-b border-dashed border-wire'           : '',
                i % 2 === 0 ? 'md:border-r md:border-dashed md:border-wire'  : '',
              ].filter(Boolean).join(' ')}
            />
          ))}
          </div>
        </div>
      </section>

      {/* ── 8. GitHub Contributions ──────────────────────────── */}
      <section>
        <h2 className="font-mono-sys text-haze text-[11px] uppercase tracking-[0.18em] mb-8">
          Activity
        </h2>
        <GitHubContributions />
      </section>

      {/* ── 9. Plain footer block ─────────────────────────────── */}
      <section>
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
    </>
  );
}

export default About;
