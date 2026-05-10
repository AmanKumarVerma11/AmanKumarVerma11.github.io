import { Helmet } from 'react-helmet-async';
import useReveal from '../hooks/useReveal';

const services = [
  {
    num: '01',
    title: 'AI Agent Systems',
    desc: 'Design and ship multi-agent pipelines that run autonomously in production. Persistent memory, auto-resume on failure, structured handoffs between agents. Built to replace manual workflows, not assist them.',
    tags: ['LangGraph', 'LangChain', 'OpenAI', 'Gemini', 'BullMQ'],
  },
  {
    num: '02',
    title: 'Full-Stack AI Products',
    desc: 'End-to-end product builds — from schema design to deployment. React, Next.js, Node, Postgres. I own the whole stack and keep the surface area tight. Optimised for speed of iteration, not architecture astronautics.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Redis', 'Vercel'],
  },
  {
    num: '03',
    title: 'Shopify & E-Commerce Automation',
    desc: 'Automated cross-border market expansion, multi-currency pricing, geo-targeting logic, and BNPL payment matrices. Reduced per-merchant onboarding from hours to minutes at SellAbroad.',
    tags: ['Shopify APIs', 'Medusa', 'Node.js', 'TypeScript'],
  },
  {
    num: '04',
    title: 'Founding Engineer (Embedded)',
    desc: 'Join your team as a founding engineer — not as a contractor who disappears. I own the technical roadmap, make architecture decisions, and ship. Best fit for pre-seed to Series A AI-native startups.',
    tags: ['Full ownership', 'System design', 'Technical leadership'],
  },
];

const process = [
  { step: '01', title: 'Scope call', desc: 'One hour. You explain the problem, I ask hard questions. No NDA required upfront.' },
  { step: '02', title: 'Proposal', desc: 'Within 48 hours: scope, approach, timeline, and fixed or milestone-based pricing.' },
  { step: '03', title: 'Build', desc: 'Weekly updates. Code in your repo from day one. No black boxes.' },
  { step: '04', title: 'Ship & hand over', desc: 'Full documentation, working CI/CD, and a walkthrough. You own everything.' },
];

const facts = [
  { label: 'Based',        value: 'Delhi, India · IST (UTC+5:30)' },
  { label: 'Availability', value: 'Open to consulting — limited slots' },
  { label: 'Response',     value: 'Within 24 hours' },
  { label: 'Timezone fit', value: 'Works async with US/EU teams daily' },
  { label: 'Rate style',   value: 'Fixed-scope or milestone — no surprise invoices' },
  { label: 'Contact',      value: 'akverma11aug2002@gmail.com', href: 'mailto:akverma11aug2002@gmail.com' },
];

function ServiceRow({ service, delay }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal-item first:border-t border-b border-dashed border-wire py-8${visible ? ' is-visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="grid lg:grid-cols-[max-content_1fr] gap-0">
        <p className="font-mono-sys text-haze text-[11px] tracking-[0.1em] border-r border-dashed border-wire pr-8 py-1 hidden lg:block">
          {service.num}
        </p>
        <div className="lg:pl-8">
          <h3
            className="text-ink text-lg mb-2"
            style={{ fontVariationSettings: "'wdth' 90, 'wght' 700" }}
          >
            {service.title}
          </h3>
          <p className="text-dim text-sm leading-relaxed max-w-[60ch] mb-4">{service.desc}</p>
          <div className="flex flex-wrap gap-2">
            {service.tags.map(tag => (
              <span key={tag} className="font-mono-sys text-haze text-[10px] border border-dashed border-wire px-2.5 py-1 rounded-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Consulting() {
  return (
    <>
      <Helmet>
        <title>Work With Me — Aman Kumar Verma</title>
        <meta name="description" content="Hire an AI engineer based in India for founding-engineer roles, multi-agent AI systems, Shopify automation, and full-stack product builds. Open to remote engagements globally." />
        <link rel="canonical" href="https://www.amankrverma.in/consulting" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Aman Kumar Verma" />
        <meta property="og:title" content="Work With Me — Aman Kumar Verma" />
        <meta property="og:description" content="Hire an AI engineer for founding-engineer roles, multi-agent AI systems, Shopify automation, and full-stack product builds." />
        <meta property="og:url" content="https://www.amankrverma.in/consulting" />
        <meta property="og:image" content="https://www.amankrverma.in/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@mai_amanhoon" />
        <meta name="twitter:title" content="Work With Me — Aman Kumar Verma" />
        <meta name="twitter:description" content="Hire an AI engineer for founding-engineer roles, multi-agent AI systems, Shopify automation, and full-stack product builds." />
        <meta name="twitter:image" content="https://www.amankrverma.in/og-image.png" />
      </Helmet>

      <div className="max-w-5xl mx-auto px-6 lg:px-10 py-16 space-y-28">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="animate-fade-up" style={{ animationDelay: '0.05s' }}>
          <p className="font-mono-sys text-haze text-[11px] uppercase tracking-[0.18em] mb-6">
            Work with me
          </p>
          <h1
            className="text-[clamp(1.8rem,5vw,4.4rem)] leading-[1.02] text-ink max-w-[20ch]"
            style={{ fontVariationSettings: "'wdth' 88, 'wght' 700" }}
          >
            The systems that make your product work<span className="text-signal">.</span>
          </h1>
          <p className="text-dim text-base leading-relaxed max-w-[58ch] mt-6">
            I'm a full-stack engineer specialising in multi-agent AI systems and production automation.
            Based in Delhi, working with global teams. I build the things founders need that are too
            complex for no-code and too expensive to hand off to a big agency.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="mailto:akverma11aug2002@gmail.com"
              className="font-mono-sys text-[11px] uppercase tracking-[0.14em] text-ink border border-wire px-5 py-3 rounded-sm hover:border-ink/50 transition-colors duration-200"
            >
              Email me →
            </a>
            <a
              href="/contact"
              className="font-mono-sys text-[11px] uppercase tracking-[0.14em] text-dim border border-wire/50 px-5 py-3 rounded-sm hover:border-wire hover:text-ink transition-colors duration-200"
            >
              Use the form
            </a>
          </div>
        </section>

        {/* ── Services ─────────────────────────────────────────── */}
        <section>
          <h2 className="font-mono-sys text-haze text-[11px] uppercase tracking-[0.18em] mb-10">
            What I build
          </h2>
          <div>
            {services.map((s, i) => (
              <ServiceRow key={s.num} service={s} delay={i * 70} />
            ))}
          </div>
        </section>

        {/* ── How it works ─────────────────────────────────────── */}
        <section>
          <h2 className="font-mono-sys text-haze text-[11px] uppercase tracking-[0.18em] mb-10">
            How it works
          </h2>
          <div className="border border-dashed border-wire rounded-sm overflow-hidden max-w-3xl">
            <div className="grid md:grid-cols-2">
              {process.map((p, i) => (
                <div
                  key={p.step}
                  className={[
                    'p-7',
                    i % 2 === 0 ? 'md:border-r md:border-dashed md:border-wire' : '',
                    i < 2       ? 'border-b border-dashed border-wire'           : '',
                  ].filter(Boolean).join(' ')}
                >
                  <span className="font-mono-sys text-haze text-[11px] tracking-[0.1em]">{p.step}</span>
                  <h3
                    className="text-ink text-base mt-3 mb-2"
                    style={{ fontVariationSettings: "'wdth' 90, 'wght' 600" }}
                  >
                    {p.title}
                  </h3>
                  <p className="text-dim text-sm leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── The plain stuff ───────────────────────────────────── */}
        <section className="border-t border-wire pt-14">
          <h2 className="font-mono-sys text-haze text-[11px] uppercase tracking-[0.18em] mb-8">
            The plain stuff
          </h2>
          <dl className="space-y-3 max-w-2xl">
            {facts.map(item => (
              <div key={item.label} className="grid grid-cols-[100px_1fr] sm:grid-cols-[130px_1fr] gap-3 sm:gap-6 items-baseline">
                <dt className="font-mono-sys text-haze text-[11px] uppercase tracking-[0.14em]">
                  {item.label}
                </dt>
                <dd className="text-dim text-sm">
                  {item.href ? (
                    <a href={item.href} className="hover:text-ink transition-colors duration-200">
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

export default Consulting;
