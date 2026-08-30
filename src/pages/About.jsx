import { Helmet } from 'react-helmet-async';
import useReveal from '../hooks/useReveal';
import GitHubContributions from '../Components/GitHubContributions';
import CareerGraph from '../Components/CareerGraph';
import { projectCount, projectListDetailed } from '../data/projects';

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is multi-agent AI orchestration?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Multi-agent AI orchestration is a system design where multiple specialised AI agents work in sequence or in parallel to complete complex tasks autonomously. Each agent handles a specific sub-task, such as DOM analysis, code injection, or regression QA, and passes results to the next, enabling reliable end-to-end automation without human intervention.',
      },
    },
    {
      '@type': 'Question',
      name: 'What has Aman Kumar Verma built?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Aman Kumar Verma has shipped ${projectCount} products, including ${projectListDetailed}. At SellAbroad he built a high-risk merchant and payment dashboard solo, from design to production, and architected a multi-agent system that automates Shopify onboarding end to end across 100+ countries.`,
      },
    },
    {
      '@type': 'Question',
      name: 'Is Aman Kumar Verma available for hire?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Aman is open to product-engineering, forward-deployed, and software-engineering roles, plus select AI engagements. He is based in Delhi, India, works remotely, and is open to relocation. Response time is typically within 24 hours.',
      },
    },
    {
      '@type': 'Question',
      name: 'What tech stack does Aman Kumar Verma use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Aman works across React, React Native, Next.js, TypeScript, Node.js, PostgreSQL, MongoDB, Redis, and Python. On the AI side he builds with LangChain, LangGraph, RAG pipelines, and LLM APIs including OpenAI and Gemini. He also ships payments and commerce integrations across Shopify, Razorpay, and Shiprocket, deployed on Vercel, AWS, and Docker.',
      },
    },
  ],
};

const stamp = ['Delhi, India', 'Forward Deployed Engineer', 'Open to roles worldwide'];

const rightNow = [
  'Forward Deployed Engineer at SellAbroad, owning customer-facing product from problem to production',
  'Shipping AI systems and payments infrastructure that move real money across 100+ countries',
  'Open to product-engineering, FDE, and software-engineering roles, remote or relocation',
  'Going deeper on agent architectures, evals, and the reliability work that makes AI actually ship',
];

// Career history as a git graph. Newest first (git-log order); lane 0 is main,
// lane 1 is the SellAbroad promotion branch. `branch` spawns lane 1 and `merge`
// folds it back in. Rendered by <CareerGraph>.
const career = [
  {
    lane: 0,
    kind: 'head',
    merge: true,
    refs: ['HEAD → main', 'tag: fde'],
    hash: 'a1f9c2e',
    role: 'Forward Deployed Engineer',
    org: 'SellAbroad',
    period: 'Aug 2026 – Present',
    location: 'Remote',
    note: 'Promoted into the forward-deployed seat: everything technical between the customer and production. I run discovery, build, and rollout for the accounts I own, and keep the AI and payments systems underneath them healthy.',
    tech: 'Customer-facing · Full-stack · AI systems · Payments',
  },
  {
    lane: 1,
    refs: ['feat/fde'],
    hash: '7d3b0aa',
    role: 'Built the merchant + payments surface',
    org: 'SellAbroad',
    period: '2026',
    note: 'The work that earned the move. Designed and shipped a high-risk merchant and payment dashboard solo, from blank page to production, for merchants other processors turn away. Owned payment orchestration and covered technical support when the team ran short.',
    tech: 'React · Node · PostgreSQL · Payments',
  },
  {
    lane: 0,
    branch: true,
    hash: '4e8c115',
    role: 'Full-Stack Software Engineer',
    org: 'SellAbroad',
    period: 'Jan 2026 – Aug 2026',
    location: 'Remote',
    note: 'Joined to build AI-native commerce. Architected a multi-agent pipeline that automates Shopify onboarding end to end (DOM analysis, code injection, validation, QA) and shipped cross-border expansion to 100+ countries: multi-currency pricing, geo-targeting, and a BNPL matrix.',
    tech: 'Next.js · TypeScript · Shopify APIs · PostgreSQL · Redis · BullMQ',
  },
  {
    lane: 0,
    hash: 'c02f9d1',
    role: 'Software Development Engineer',
    org: 'COOX',
    period: 'Apr 2025 – Oct 2025',
    location: 'Noida · Hybrid',
    note: "Shipped web and mobile features for India's on-demand chefs platform, 5 lakh+ users across 15+ cities. Killed re-render bottlenecks, tightened API call patterns, and owned incident resolution through Sentry in a Scrum team.",
    tech: 'Next.js · React Native · Expo · TypeScript · Sentry',
  },
  {
    lane: 0,
    hash: 'b6710e3',
    role: 'Backend Engineer, Intern',
    org: 'Rablo',
    period: 'Jan 2025 – Apr 2025',
    location: 'Remote',
    note: 'Built REST APIs and KYC verification flows on a Node, Express, and MongoDB stack.',
    tech: 'Node.js · Express · MongoDB · REST',
  },
  {
    lane: 0,
    kind: 'root',
    refs: ['root'],
    hash: '0000000',
    role: 'B.Tech, Information Technology',
    org: 'IPEC, AKTU',
    period: '2020 – 2024',
    location: 'Ghaziabad',
    note: 'Where it started. CS fundamentals, my first sites at 18, and the habit that stuck: ship it, then make it good.',
    tech: '',
  },
];

const bio = [
  {
    annotation: 'solo · design to prod',
    claim: 'I own features end to end.',
  },
  {
    annotation: 'multi-agent · in production',
    claim: 'I architect AI systems that run themselves.',
  },
  {
    annotation: `${projectCount} products · 100+ countries`,
    claim: 'I ship from zero to production.',
  },
  {
    annotation: 'new stack? one day',
    claim: 'Range is the skill. I close the gaps fast.',
  },
];

const shipped = [
  'A high-risk merchant and payment dashboard, built and shipped solo from design to production, moving real money for merchants other processors turn away.',
  'A multi-agent system that automates Shopify onboarding end to end: DOM analysis, code injection, validation, and QA, replacing hours of manual setup per merchant.',
  'EasySheets AI, curriculum-aligned assessment generation for Indian schools, compressing hours of teacher work into seconds.',
  'Intrafy, an AI automation consultancy I run on the side, where agent pipelines run client engagements end to end.',
];

const principles = [
  { num: '01', title: 'Ship beats perfect.',         desc: 'A v1 in production teaches more than a v3 in staging.' },
  { num: '02', title: 'Systems over heroics.',       desc: 'If it requires hero work to keep running, it needs a redesign.' },
  { num: '03', title: 'AI augments, never replaces.',desc: 'The best AI products amplify human judgment, not bypass it.' },
  { num: '04', title: 'Speed reveals quality.',      desc: 'How fast you can iterate matters more than how clean the snapshot looks.' },
];

const plain = [
  { label: 'Location',  value: 'Delhi, India · Open to remote + relocation' },
  { label: 'Education', value: 'B.Tech Information Technology, IPEC (AKTU) · 2024' },
  { label: 'Stack',     value: 'React · Next.js · TypeScript · Node · Postgres · React Native · Python · LLMs · RAG · AWS' },
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
        <meta name="description" content="Forward Deployed Engineer at SellAbroad. Full-stack and AI, product from zero to production. I own features end to end, from a solo-shipped payments dashboard to multi-agent systems. Delhi, open to roles worldwide." />
        <link rel="canonical" href="https://www.amankrverma.in/about" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Aman Kumar Verma" />
        <meta property="og:title" content="About — Aman Kumar Verma" />
        <meta property="og:description" content="Forward Deployed Engineer at SellAbroad. Full-stack and AI, product shipped end to end. Delhi, open to roles worldwide." />
        <meta property="og:url" content="https://www.amankrverma.in/about" />
        <meta property="og:image" content="https://www.amankrverma.in/og-image.png" />
        <meta property="og:image:alt" content="Aman Kumar Verma, Forward Deployed Engineer building full-stack and AI products." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@mai_amanhoon" />
        <meta name="twitter:title" content="About — Aman Kumar Verma" />
        <meta name="twitter:description" content="Forward Deployed Engineer at SellAbroad. Full-stack and AI, product shipped end to end. Delhi, open to roles worldwide." />
        <meta name="twitter:image" content="https://www.amankrverma.in/og-image.png" />
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
          Full-stack product &nbsp;·&nbsp; AI systems &nbsp;·&nbsp; shipped end to end.
        </p>
        <p className="text-dim text-base leading-relaxed max-w-[60ch] mt-8">
          24, Delhi. Started building for the web at 18, went full-stack by 21, and now sit in the
          forward-deployed seat: the engineer between the customer and production. I own features
          end to end, from the schema to the ship, and reach for AI where it earns its place.
          Deep where it counts, and quick to pick up whatever the next problem needs.
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

      {/* ── 4. Experience (career as a git graph) ─────────────── */}
      <section>
        <h2 className="font-mono-sys text-haze text-[11px] uppercase tracking-[0.18em] mb-8">
          Experience
        </h2>
        <div className="max-w-3xl">
          <CareerGraph commits={career} />
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
