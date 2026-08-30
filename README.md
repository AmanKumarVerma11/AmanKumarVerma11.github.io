# amankrverma.in

Personal site and portfolio for Aman Kumar Verma. React + Vite, statically
pre-rendered, deployed on Vercel.

Live: **[www.amankrverma.in](https://www.amankrverma.in)**

## Stack

| | |
|---|---|
| UI | React 18, React Router 7, Tailwind CSS 3 |
| Build | Vite 5 + a custom pre-render step (see below) |
| Head / SEO | `react-helmet-async`, JSON-LD (`Person`, `FAQPage`) |
| Serverless | Vercel functions in [`api/`](api/) — Resend for mail |
| Type | Bricolage Grotesque (variable: `wdth`, `wght`) |

## Running locally

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # vite dev server, host-exposed
```

`npm run dev` proxies `/api/github-contributions` straight to the upstream API
(see [`vite.config.js`](vite.config.js)), so the contributions heatmap works
without running the serverless function. The contact form does **not** — use
`vercel dev` if you need to exercise `api/send-email.js` end to end.

| Script | What it does |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run build` | Client build, then pre-render (below) |
| `npm run preview` | Serve the built `dist/` |
| `npm run lint` | ESLint over the repo |
| `npm run og:image` | Regenerate the social card (macOS only — see below) |

## How the pre-rendering works

The site is a client-side SPA that ships as static HTML, so crawlers and social
scrapers get real content rather than an empty `<div id="root">`.

`npm run build` runs two passes:

1. **`vite build`** — the normal client bundle into `dist/`.
2. **[`scripts/prerender.mjs`](scripts/prerender.mjs)** — builds a second, SSR
   bundle from [`src/entry-server.jsx`](src/entry-server.jsx), calls
   `renderToString` for every route, and splices the markup plus the Helmet head
   tags into `dist/index.html` at the `<!--ssr-head-->` marker. Each route is
   written to its own `dist/<route>/index.html`. The same pass generates
   `dist/sitemap.xml`.

On the client, [`src/main.jsx`](src/main.jsx) checks whether `#root` already has
children and calls `hydrateRoot` or `createRoot` accordingly.

### Adding a route

Add it to [`src/routes.jsx`](src/routes.jsx) only. Both entries and the
pre-render step read that one file, and `routePaths` in the same module drives
which pages get static HTML and sitemap entries.

### Adding a project

Add it to [`src/data/projects.js`](src/data/projects.js) only. The Projects page,
the Home page's "Selected Work" strip, and the counts in the meta descriptions
and FAQ structured data all derive from that array. Do not hardcode a project
count anywhere.

## The social card

[`public/og-image.png`](public/og-image.png) is what LinkedIn, X and Slack render
when the site is shared. Regenerate it with `npm run og:image` after editing
[`scripts/og-image/make.mjs`](scripts/og-image/make.mjs).

The generator converts text to **outlines** using the committed Bricolage
Grotesque variable font, at the same axis settings the hero uses (`wdth 86`,
`wght 720`), so the output is byte-identical on any machine and does not depend
on the font being installed. Rasterising uses macOS `qlmanage` + `sips`; on
other platforms render the emitted SVG with `rsvg-convert` or `resvg`.

The font is committed under
[`scripts/og-image/`](scripts/og-image/) and is licensed OFL — see
[`OFL.txt`](scripts/og-image/OFL.txt). It is build-time only and is never served
to visitors; the site loads Bricolage Grotesque from Google Fonts at runtime.

> After deploying a change to the card, re-scrape the URL with LinkedIn's Post
> Inspector and X's Card Validator — both cache aggressively and will otherwise
> keep serving the old image.

## Environment variables

See [`.env.example`](.env.example). `RESEND_API_KEY` is server-only;
`VITE_RESUME_LINK` is inlined into the client bundle, so never put a secret
behind a `VITE_` prefix.

## Deployment notes

[`vercel.json`](vercel.json) carries three things worth knowing about:

- A SPA rewrite sending every non-`/api/` path to `/index.html`. **This means a
  missing static asset returns 200 with an HTML body rather than a 404** — worth
  remembering when an image appears to load "fine" but renders blank.
- Security headers (CSP, `X-Frame-Options`, `Referrer-Policy`, …) on
  `/(.*)`. Note that `/:path*` does *not* match the bare root on Vercel, which
  silently left the homepage unprotected until it was changed.
- A one-year immutable cache on `/assets/*`, which is safe because Vite
  content-hashes those filenames.

## Licence

Code is MIT. Written content, imagery, and the design itself are not — please
don't redeploy this as your own portfolio.
