// Single source of truth for the project roster.
//
// The Projects page, the Home page's "Selected Work" strip, and the FAQ /
// meta-description copy on About all derive from this list — so adding a
// project here updates the page, the social copy, and the structured data
// together. Do not hardcode a project count anywhere else.

export const projects = [
  {
    id: 'intrafy',
    title: 'Intrafy',
    subtitle: 'AI-Native Automation Consultancy',
    description:
      'Founded an AI-native agentic workflow automation consultancy. The entire site (design, SEO, and deployment) was conceived, built, and operated via AI agents. Full technical SEO stack: JSON-LD schemas, Open Graph, Core Web Vitals, sitemap.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    link: 'https://intrafy.in/',
    github: null,
  },
  {
    id: 'portfolio-studio',
    title: 'Portfolio Studio',
    subtitle: 'Designer-Locked Portfolio Builder',
    description:
      'A SaaS that turns one form into an art-directed personal site across four designer-locked themes, then exports a single self-contained HTML file you own forever. Built the full stack: PKCE + Google auth, private-bucket signed-URL media, ISR public pages, theme-native social cards, and an offline-capable export pipeline.',
    tech: ['Next.js', 'React 19', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    link: 'https://studio.amankrverma.in/',
    github: null,
  },
  {
    id: 'wanderlore',
    title: 'Wanderlore',
    subtitle: 'AI Cultural Trip Planner',
    description:
      'An AI travel planner that builds day-by-day cultural itineraries: hidden gems, heritage, and local festivals, not just the tourist checklist. Every Gemini suggestion is grounded in real OpenStreetMap locations and Wikipedia, so the plan is geographically verified, not hallucinated.',
    tech: ['Next.js', 'TypeScript', 'Gemini API', 'Leaflet', 'OpenStreetMap', 'Supabase'],
    link: 'https://wanderlore.amankrverma.in/',
    github: 'https://github.com/AmanKumarVerma11/wanderlore',
  },
  {
    id: 'twitter-trends',
    title: 'Twitter Trends Scraper',
    subtitle: 'Real-Time Trend Visualizer',
    description:
      'Scrapes and visualizes real-time Twitter trends with proxy rotation, automated scraping pipeline, and animated UI.',
    tech: ['React', 'Node.js', 'Selenium', 'ProxyMesh', 'MongoDB', 'Framer Motion'],
    link: null,
    github: 'https://github.com/AmanKumarVerma11/Twitter-Trends-Scraper',
  },
  {
    id: 'traxsis',
    title: 'Traxsis',
    subtitle: 'AI-Powered Business Consulting Platform',
    description:
      'Full-stack AI SaaS that democratizes business consulting. Intelligent chat with Google Gemini, semantic search via vector embeddings, real-time analytics, goal tracking, and subscription management.',
    tech: ['Next.js', 'React 19', 'TypeScript', 'MongoDB', 'Gemini API', 'LangChain', 'Clerk', 'Prisma'],
    link: 'https://traxsis.com/',
    github: null,
  },
  {
    id: 'zeetax',
    title: 'Zeetax',
    subtitle: 'Native Educational App',
    description:
      'Native mobile app for exploring books, notes, and digital learning content. Cross-platform UI with smooth navigation. Backend on Next.js with PostgreSQL. Optimized performance and state management.',
    tech: ['React Native', 'Expo', 'Next.js', 'PostgreSQL', 'Prisma'],
    link: 'https://zeetax.in/',
    github: null,
  },
  {
    id: 'tyos',
    title: 'Tyos Sports',
    subtitle: 'E-Commerce + Inventory System',
    description:
      'Full-stack e-commerce platform with automated order and delivery workflows. Admin dashboards, Razorpay payments, and Shiprocket logistics integration.',
    tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Razorpay', 'Shiprocket'],
    link: 'https://tyos.co.in/',
    github: null,
  },
  {
    id: 'claude-career-journal',
    title: 'Claude Career Journal',
    subtitle: 'Open-Source Claude Code Skills',
    description:
      "A set of Claude Code skills that keep a developer's career journal current and hand back profile-ready copy for resumes, LinkedIn, and portfolios. Public repo with an MIT license, templates, and privacy-safe defaults.",
    tech: ['Claude Code', 'Agent Skills', 'Node.js', 'Open Source'],
    link: null,
    github: 'https://github.com/AmanKumarVerma11/claude-career-journal',
  },
  {
    id: 'easysheets',
    title: 'EasySheets AI',
    subtitle: 'AI-Powered EdTech Platform',
    description:
      'Quiz and worksheet generation platform for Indian schools. Educators produce curriculum-aligned assessments in seconds instead of hours. Designed the end-to-end product: content generation pipeline, educator-facing UI, and deployment.',
    tech: ['Next.js', 'TypeScript', 'OpenAI', 'Tailwind CSS'],
    link: null,
    github: null,
  },
];

/** Ids surfaced in the Home page's "Selected Work" strip, in display order. */
export const FEATURED_IDS = ['portfolio-studio', 'wanderlore', 'traxsis'];

export const featuredProjects = FEATURED_IDS.map(id =>
  projects.find(p => p.id === id)
).filter(Boolean);

export const projectCount = projects.length;

function sentenceList(items) {
  if (items.length < 2) return items[0] ?? '';
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
}

/** "EasySheets AI, Intrafy, … and Tyos Sports" — bare names, for meta descriptions. */
export const projectListSentence = sentenceList(projects.map(p => p.title));

/**
 * "EasySheets AI (AI-Powered EdTech Platform), … and Tyos Sports (…)" — for the
 * FAQ structured data, where there is no length budget and the extra context is
 * what search results can surface.
 */
export const projectListDetailed = sentenceList(
  projects.map(p => `${p.title} (${p.subtitle})`)
);

/** Zero-padded display number for a project's position in the roster. */
export const displayNum = i => String(i + 1).padStart(2, '0');
