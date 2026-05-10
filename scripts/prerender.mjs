import { build } from 'vite';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const routes = ['/', '/about', '/projects', '/contact', '/consulting'];

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

  // 3. Import the SSR render function
  const { render } = await import(pathToFileURL(resolve(root, 'dist/server/entry-server.js')).href);

  // 4. Render each route and write static HTML
  console.log('\nPre-rendering routes...');
  for (const url of routes) {
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

  console.log('\nPre-rendering complete.\n');
}

prerender().catch(err => {
  console.error('\nPre-rendering failed:', err);
  process.exit(1);
});
