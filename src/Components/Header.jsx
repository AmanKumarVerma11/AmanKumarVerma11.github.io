import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { to: '/',        label: 'Home'     },
  { to: '/about',   label: 'About'    },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact'  },
];

function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const resumeLink = import.meta.env.VITE_RESUME_LINK;

  return (
    <header className="sticky top-0 z-50 border-b border-wire bg-canvas/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">

        <Link
          to="/"
          className="text-ink font-bold text-base tracking-tight transition-colors duration-200"
          style={{ fontVariationSettings: "'wght' 700" }}
        >
          Aman<span className="text-signal">.</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map(({ to, label }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`text-sm transition-colors duration-200 ${
                  active ? 'text-ink' : 'text-dim hover:text-ink'
                }`}
              >
                {label}
              </Link>
            );
          })}
          {resumeLink && (
            <a
              href={resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-dim border border-wire rounded px-3 py-1.5 hover:text-ink hover:border-dim transition-all duration-200"
            >
              Resume
            </a>
          )}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-dim hover:text-ink transition-colors p-1"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="animate-slide-down lg:hidden border-t border-wire bg-surface px-6 py-5 space-y-1">
          {navItems.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={`block py-2 text-sm transition-colors duration-200 ${
                location.pathname === to
                  ? 'text-ink'
                  : 'text-dim hover:text-ink'
              }`}
            >
              {label}
            </Link>
          ))}
          {resumeLink && (
            <a
              href={resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block pt-3 text-sm text-dim hover:text-ink transition-colors duration-200"
            >
              Resume →
            </a>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
