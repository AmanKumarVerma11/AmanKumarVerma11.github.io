import { build } from 'vite';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const SITE = 'https://www.amankrverma.in';

// Sitemap weighting per route. Routes come from src/routes.jsx so a new page
// cannot be pre-rendered without also appearing in the sitemap.
const SITEMAP_META = {
  '/':           { priority: '1.0', changefreq: 'monthly' },
  '/projects':   { priority: '0.9', changefreq: 'monthly' },
  '/about':      { priority: '0.8', changefreq: 'monthly' },
  '/consulting': { priority: '0.8', changefreq: 'monthly' },
  '/contact':    { priority: '0.7', changefreq: 'yearly'  },
};

function buildSitemap(routes, lastmod) {
  const entries = routes.map(url => {
    const { priority = '0.5', changefreq = 'monthly' } = SITEMAP_META[url] ?? {};
    return [
      '  <url>',
      `    <loc>${SITE}${url === '/' ? '/' : url}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      `    <changefreq>${changefreq}</changefreq>`,
      `    <priority>${priority}</priority>`,
      '  </url>',
    ].join('\n');
  });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries,
    '</urlset>',
    '',
  ].join('\n');
}

async function prerender() {
  // 1. Build the SSR bundle from entry-server.jsx
  console.log('\nBuilding SSR bundle...');
  await build({
    root,
    logLevel: 'warn',
    build: {
      ssr: 'src/entry-server.jsx',
      outDir: 'dist/server',
      rollupOptions: { output: { format: 'esm' } },
    },
    ssr: {
      noExternal: ['react-helmet-async', 'react-router-dom', 'react-router'],
    },
  });

  // 2. Read the client-built index.html
  const template = readFileSync(resolve(root, 'dist/index.html'), 'utf-8');

  // 3. Import the SSR render function and the shared route list
  const serverEntry = pathToFileURL(resolve(root, 'dist/server/entry-server.js')).href;
  const { render, routePaths } = await import(serverEntry);

  // 4. Render each route and write static HTML
  console.log('\nPre-rendering routes...');
  for (const url of routePaths) {
    const { appHtml, helmet } = render(url);

    const headTags = helmet
      ? [
          helmet.title?.toString()  ?? '',
          helmet.meta?.toString()   ?? '',
          helmet.link?.toString()   ?? '',
          helmet.script?.toString() ?? '',
        ]
        .map(s => s.trim())
        .filter(Boolean)
        .join('\n    ')
      : '';

    const html = template
      .replace('<!--ssr-head-->', headTags)
      .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

    const outDir =
      url === '/'
        ? resolve(root, 'dist')
        : resolve(root, 'dist', url.slice(1));

    mkdirSync(outDir, { recursive: true });
    writeFileSync(resolve(outDir, 'index.html'), html);
    console.log(`  ✓ ${url}`);
  }

  // 5. Generate the sitemap from the same route list, dated today
  const lastmod = new Date().toISOString().slice(0, 10);
  writeFileSync(resolve(root, 'dist/sitemap.xml'), buildSitemap(routePaths, lastmod));
  console.log(`\n  ✓ sitemap.xml (${routePaths.length} routes, lastmod ${lastmod})`);

  console.log('\nPre-rendering complete.\n');
}

prerender().catch(err => {
  console.error('\nPre-rendering failed:', err);
  process.exit(1);
});
