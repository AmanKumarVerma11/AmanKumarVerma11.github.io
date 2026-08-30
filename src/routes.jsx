import { Route } from 'react-router-dom';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Projects from './pages/Projects.jsx';
import Contact from './pages/Contact.jsx';
import Consulting from './pages/Consulting.jsx';

/** Paths the pre-render step writes static HTML for. Keep in sync with <routes>. */
export const routePaths = ['/', '/about', '/projects', '/contact', '/consulting'];

/**
 * Shared route tree — rendered by both the browser entry (main.jsx) and the
 * SSG entry (entry-server.jsx) so a new route cannot land in one and not the
 * other.
 */
export const routes = (
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="projects" element={<Projects />} />
    <Route path="contact" element={<Contact />} />
    <Route path="consulting" element={<Consulting />} />
  </Route>
);
