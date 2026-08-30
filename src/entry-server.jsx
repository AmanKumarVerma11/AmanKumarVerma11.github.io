import { renderToString } from 'react-dom/server';
import { StaticRouter, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { routes } from './routes.jsx';

// Re-exported so scripts/prerender.mjs reads the route list from the same
// module the app renders from.
export { routePaths } from './routes.jsx';

export function render(url) {
  const helmetContext = {};

  const appHtml = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <Routes>{routes}</Routes>
      </StaticRouter>
    </HelmetProvider>
  );

  const { helmet } = helmetContext;
  return { appHtml, helmet };
}
