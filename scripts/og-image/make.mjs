// Regenerates public/og-image.png — the card LinkedIn, X and Slack show when
// the site is shared.  Run with: npm run og:image
//
// Text is converted to outlines using the committed Bricolage Grotesque
// variable font, at the same axis settings the site's hero uses (wdth 86,
// wght 720).  Outlines mean the render does not depend on any font being
// installed, so the output is identical on any machine.
//
// Rasterising uses macOS `qlmanage` + `sips`.  qlmanage always renders onto a
// square canvas, so the 630-tall design is centred in a 1200 square and then
// centre-cropped back to 1200x630.

import * as fontkit from 'fontkit';
import { execFileSync } from 'child_process';
import { writeFileSync, unlinkSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '../..');

const font = fontkit.openSync(resolve(here, 'BricolageGrotesque-VF.ttf'));

// Palette — sRGB equivalents of the OKLCH tokens in tailwind.config.js
const INK = '#f2f2f2', HAZE = '#424242', DIM = '#7a7a7a', SIGNAL = '#61b9ce',
      WIRE = '#161616', CANVAS = '#020202';

const WIDTH = 1200, HEIGHT = 630;
const OFFSET = (WIDTH - HEIGHT) / 2;   // centre the design band in the square

/**
 * Lay a string out as SVG path data.
 * Returns { d, width } so runs can be chained (e.g. the signal-coloured dot).
 */
function run(text, { size, wght, wdth = 100, opsz, tracking = 0, x = 0, y = 0 }) {
  const inst = font.getVariation({
    wght, wdth,
    opsz: opsz ?? Math.min(96, Math.max(12, size)),
  });
  const scale = size / inst.unitsPerEm;
  const layout = inst.layout(text);

  let cursor = 0;
  const parts = [];
  layout.glyphs.forEach((glyph, i) => {
    const d = glyph.path.scale(scale, -scale).translate(x + cursor, y).toSVG();
    if (d) parts.push(d);
    cursor += layout.positions[i].xAdvance * scale + tracking;
  });
  return { d: parts.join(' '), width: cursor - tracking };
}

const path = (d, fill) => `    <path fill="${fill}" d="${d}"/>`;

function buildSvg() {
  const out = [];

  out.push(path(run('FULL STACK ENGINEER · AI SYSTEMS BUILDER',
    { size: 16, wght: 600, opsz: 14, tracking: 3.6, x: 104, y: 140 }).d, HAZE));

  // The hero's exact axis settings, so the card and the page agree
  const NAME = { size: 118, wght: 720, wdth: 86, opsz: 96, tracking: -1.5 };
  out.push(path(run('Aman Kumar', { ...NAME, x: 100, y: 296 }).d, INK));

  const verma = run('Verma', { ...NAME, x: 100, y: 404 });
  out.push(path(verma.d, INK));
  out.push(path(run('.', { ...NAME, x: 100 + verma.width, y: 404 }).d, SIGNAL));

  out.push(path(run('Multi-agent AI systems · persistent memory · recovery built-in',
    { size: 20, wght: 500, opsz: 18, x: 104, y: 516 }).d, DIM));

  const site = { size: 20, wght: 600, opsz: 18, tracking: 1 };
  const siteWidth = run('amankrverma.in', { ...site }).width;
  out.push(path(run('amankrverma.in', { ...site, x: 1096 - siteWidth, y: 516 }).d, HAZE));

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${WIDTH}" viewBox="0 0 ${WIDTH} ${WIDTH}">
  <rect width="${WIDTH}" height="${WIDTH}" fill="${CANVAS}"/>
  <g transform="translate(0,${OFFSET})">
    <rect x="64" y="56" width="1072" height="518" fill="none" stroke="${WIRE}" stroke-width="1"/>
    <line x1="104" y1="466" x2="1096" y2="466" stroke="${WIRE}" stroke-width="1"/>
${out.join('\n')}
  </g>
</svg>
`;
}

if (process.platform !== 'darwin') {
  console.error('This script rasterises via macOS qlmanage/sips. On other platforms,\n' +
                'render the emitted SVG with rsvg-convert or resvg instead.');
}

const svgPath = resolve(here, 'og-image.svg');
const squarePath = resolve(here, 'og-image.svg.png');
const outPath = resolve(root, 'public/og-image.png');

writeFileSync(svgPath, buildSvg());
execFileSync('qlmanage', ['-t', '-s', String(WIDTH), '-o', here, svgPath], { stdio: 'ignore' });
execFileSync('sips', ['-c', String(HEIGHT), String(WIDTH), squarePath, '--out', outPath], { stdio: 'ignore' });

for (const f of [svgPath, squarePath]) if (existsSync(f)) unlinkSync(f);

const dims = execFileSync('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', outPath]).toString();
const w = +dims.match(/pixelWidth: (\d+)/)[1];
const h = +dims.match(/pixelHeight: (\d+)/)[1];
if (w !== WIDTH || h !== HEIGHT) {
  console.error(`✗ expected ${WIDTH}x${HEIGHT}, got ${w}x${h}`);
  process.exit(1);
}
console.log(`✓ public/og-image.png — ${w}x${h}`);
