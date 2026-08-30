import { Helmet } from 'react-helmet-async';
import useReveal from '../hooks/useReveal';

const services = [
  {
    num: '01',
    title: 'Full-stack product, end to end',
    desc: 'Zero to production: schema design, backend, frontend, deployment. I own the whole stack, keep the surface area tight, and optimise for speed of iteration over architecture astronautics.',
    tags: ['Next.js', 'TypeScript', 'Node', 'PostgreSQL', 'React Native'],
  },
  {
    num: '02',
    title: 'AI agent systems',
    desc: 'Multi-agent pipelines that run in production, not just demos. Persistent memory, auto-resume on failure, structured handoffs between agents. Built to replace manual workflows, not assist them.',
    tags: ['LangGraph', 'LangChain', 'OpenAI', 'Gemini', 'RAG'],
  },
  {
    num: '03',
    title: 'Payments & commerce automation',
    desc: 'High-risk merchant dashboards, payment orchestration, and cross-border expansion: multi-currency pricing, geo-targeting, and BNPL logic. Cut per-merchant onboarding from hours to minutes at SellAbroad.',
    tags: ['Shopify APIs', 'Razorpay', 'Payments', 'Node.js'],
  },
  {
    num: '04',
    title: 'Forward-deployed / embedded engineer',
    desc: 'Drop into your team as the engineer who owns outcomes, not tickets. I sit close to your customers, make the architecture calls, and ship. Best fit for pre-seed to Series A teams moving fast.',
    tags: ['Full ownership', 'System design', 'Customer-facing'],
  },
];

const process = [
  { step: '01', title: 'Scope call', desc: 'One hour. You explain the problem, I ask the hard questions. Role or project, same starting point.' },
  { step: '02', title: 'Plan', desc: 'Within 48 hours: scope, approach, and a realistic timeline. No hand-waving.' },
  { step: '03', title: 'Build in the open', desc: 'Weekly updates. Code in your repo from day one. No black boxes.' },
  { step: '04', title: 'Ship & hand over', desc: 'Documentation, working CI/CD, and a walkthrough. You own everything.' },
];

const facts = [
  { label: 'Based',        value: 'Delhi, India · IST (UTC+5:30)' },
  { label: 'Open to',      value: 'Full-time roles and select engagements' },
  { label: 'Response',     value: 'Within 24 hours' },
  { label: 'Timezone fit', value: 'Works async with US and EU teams daily' },
  { label: 'Relocation',   value: 'Open, with visa and accommodation support' },
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
        <meta name="description" content="Work with Aman Kumar Verma, a forward-deployed product engineer. Full-stack, AI systems, and payments, from scope to production. Open to roles and engagements, remote or relocation." />
        <link rel="canonical" href="https://www.amankrverma.in/consulting" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Aman Kumar Verma" />
        <meta property="og:title" content="Work With Me — Aman Kumar Verma" />
        <meta property="og:description" content="Forward-deployed product engineer: full-stack, AI systems, and payments, from scope to production. Open to roles and engagements." />
        <meta property="og:url" content="https://www.amankrverma.in/consulting" />
        <meta property="og:image" content="https://www.amankrverma.in/og-image.png" />
        <meta property="og:image:alt" content="Aman Kumar Verma, Forward Deployed Engineer building full-stack and AI products." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@mai_amanhoon" />
        <meta name="twitter:title" content="Work With Me — Aman Kumar Verma" />
        <meta name="twitter:description" content="Forward-deployed product engineer: full-stack, AI systems, and payments, from scope to production. Open to roles and engagements." />
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
            I’m a forward-deployed product engineer: full-stack, AI, and the judgment to know what to
            actually build. I take the messy, high-stakes problems (the ones too complex for no-code
            and too core to hand to an agency) from scope to production, and I stay close to the people
            using the thing. Works as a role or an engagement.
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
