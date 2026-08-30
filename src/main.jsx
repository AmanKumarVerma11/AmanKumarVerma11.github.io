import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { routes } from './routes.jsx'
import './index.css'

const container = document.getElementById('root');

const app = (
  <StrictMode>
    <HelmetProvider>
      <Router>
        <Routes>{routes}</Routes>
      </Router>
    </HelmetProvider>
  </StrictMode>
);

// Hydrate if the page was pre-rendered (has server HTML), otherwise do a fresh render
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
