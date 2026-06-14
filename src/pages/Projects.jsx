import { useRef, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return [ref, visible];
}

const projects = [
  {
    num: '01',
    title: 'EasySheets AI',
    subtitle: 'AI-Powered EdTech Platform',
    description:
      'Quiz and worksheet generation platform for Indian schools — educators produce curriculum-aligned assessments in seconds instead of hours. Designed the end-to-end product: content generation pipeline, educator-facing UI, and deployment.',
    tech: ['Next.js', 'TypeScript', 'OpenAI', 'Tailwind CSS'],
    link: 'https://easysheets-ai.com/',
    github: null,
  },
  {
    num: '02',
    title: 'Intrafy',
    subtitle: 'AI-Native Automation Consultancy',
    description:
      'Founded an AI-native agentic workflow automation consultancy. Entire site — design, SEO, and deployment — conceived, built, and operated via AI agents. Full technical SEO stack: JSON-LD schemas, Open Graph, Core Web Vitals, sitemap.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    link: 'https://intrafy.in/',
    github: null,
  },
  {
    num: '03',
    title: 'Portfolio Studio',
    subtitle: 'Designer-Locked Portfolio Builder',
    description:
      'A SaaS that turns one form into an art-directed personal site across four designer-locked themes, then exports a single self-contained HTML file you own forever. Built the full stack: PKCE + Google auth, private-bucket signed-URL media, ISR public pages, theme-native social cards, and an offline-capable export pipeline.',
    tech: ['Next.js', 'React 19', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    link: 'https://studio.amankrverma.in/',
    github: null,
  },
  {
    num: '04',
    title: 'Twitter Trends Scraper',
    subtitle: 'Real-Time Trend Visualizer',
    description:
      'Scrapes and visualizes real-time Twitter trends with proxy rotation, automated scraping pipeline, and animated UI.',
    tech: ['React', 'Node.js', 'Selenium', 'ProxyMesh', 'MongoDB', 'Framer Motion'],
    link: null,
    github: 'https://github.com/AmanKumarVerma11/Twitter-Trends-Scraper',
  },
  {
    num: '05',
    title: 'Traxsis',
    subtitle: 'AI-Powered Business Consulting Platform',
    description:
      'Full-stack AI SaaS that democratizes business consulting. Intelligent chat with Google Gemini, semantic search via vector embeddings, real-time analytics, goal tracking, and subscription management.',
    tech: ['Next.js', 'React 19', 'TypeScript', 'MongoDB', 'Gemini API', 'LangChain', 'Clerk', 'Prisma'],
    link: 'https://traxsis.com/',
    github: null,
  },
  {
    num: '06',
    title: 'Zeetax',
    subtitle: 'Native Educational App',
    description:
      'Native mobile app for exploring books, notes, and digital learning content. Cross-platform UI with smooth navigation. Backend on Next.js with PostgreSQL. Optimized performance and state management.',
    tech: ['React Native', 'Expo', 'Next.js', 'PostgreSQL', 'Prisma'],
    link: 'https://zeetax.in/',
    github: null,
  },
  {
    num: '07',
    title: 'Tyos Sports',
    subtitle: 'E-Commerce + Inventory System',
    description:
      'Full-stack e-commerce platform with automated order and delivery workflows. Admin dashboards, Razorpay payments, and Shiprocket logistics integration.',
    tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Razorpay', 'Shiprocket'],
    link: 'https://tyos.co.in/',
    github: null,
  },
];

function ProjectRow({ project, delay }) {
  const [ref, visible] = useReveal();

  return (
    <div
      ref={ref}
      className={`reveal-item first:border-t border-b border-dashed border-wire${visible ? ' is-visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="group py-8 hover:px-4 px-0 transition-all duration-300">
        <div className="flex items-start justify-between gap-6">
          <div className="flex items-start gap-6 min-w-0">

            {/* Number */}
            <span className="text-haze text-xs tabular-nums mt-[3px] shrink-0 w-5 group-hover:text-ink transition-colors duration-300">
              {project.num}
            </span>

            <div className="min-w-0 space-y-3">
              {/* Title + subtitle */}
              <div>
                <span className="project-title-text text-xl text-ink">
                  {project.title}
                </span>
                <span className="text-dim text-sm ml-3">{project.subtitle}</span>
              </div>

              {/* Description */}
              <p className="text-dim text-sm leading-relaxed max-w-[60ch]">
                {project.description}
              </p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2 pt-1">
                {project.tech.map(t => (
                  <span
                    key={t}
                    className="text-haze text-xs border border-wire/60 rounded-sm px-2 py-0.5"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="pt-1 flex gap-4">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-dim text-xs hover:text-ink hover:underline underline-offset-4 transition-colors duration-200"
                  >
                    Live site →
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-dim text-xs hover:text-ink hover:underline underline-offset-4 transition-colors duration-200"
                  >
                    GitHub →
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Arrow */}
          {(project.link || project.github) && (
            <svg
              className="w-4 h-4 text-haze group-hover:text-ink transition-all duration-200 shrink-0 mt-1 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          )}
        </div>
      </div>

    </div>
  );
}

function Projects() {
  return (
    <>
      <Helmet>
        <title>Projects — Aman Kumar Verma</title>
        <meta name="description" content="6 shipped products: a 7-agent AI orchestration system, EasySheets AI, Intrafy, Traxsis, Zeetax, and Tyos Sports. Full-stack AI to production e-commerce." />
        <link rel="canonical" href="https://www.amankrverma.in/projects" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Aman Kumar Verma" />
        <meta property="og:title" content="Projects — Aman Kumar Verma" />
        <meta property="og:description" content="6 shipped products: a 7-agent AI orchestration system, EasySheets AI, Intrafy, Traxsis, Zeetax, and Tyos Sports." />
        <meta property="og:url" content="https://www.amankrverma.in/projects" />
        <meta property="og:image" content="https://www.amankrverma.in/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@mai_amanhoon" />
        <meta name="twitter:title" content="Projects — Aman Kumar Verma" />
        <meta name="twitter:description" content="6 shipped products: a 7-agent AI orchestration system, EasySheets AI, Intrafy, Traxsis, Zeetax, and Tyos Sports." />
        <meta name="twitter:image" content="https://www.amankrverma.in/og-image.png" />
      </Helmet>
    <div className="max-w-6xl mx-auto px-6 lg:px-10 py-16">

      {/* Page header */}
      <div className="mb-16">
        <p
          className="text-haze text-xs font-semibold tracking-[0.18em] uppercase mb-4 animate-fade-up"
          style={{ animationDelay: '0.05s' }}
        >
          Work
        </p>
        <div className="overflow-hidden">
          <h1
            className="text-[clamp(1.8rem,5vw,5rem)] leading-[0.94] font-extrabold text-ink animate-line-reveal"
            style={{
              fontVariationSettings: "'wdth' 84, 'wght' 800",
              animationDelay: '0.15s',
            }}
          >
            Selected Projects
          </h1>
        </div>
        <p
          className="text-dim text-base mt-5 max-w-[50ch] animate-fade-up"
          style={{ animationDelay: '0.4s' }}
        >
          Things I have built — from AI pipelines to production e-commerce.
        </p>
      </div>

      {/* Project roster */}
      <div>
        {projects.map((project, i) => (
          <ProjectRow key={project.num} project={project} delay={i * 60} />
        ))}
      </div>

    </div>
    </>
  );
}

export default Projects;
