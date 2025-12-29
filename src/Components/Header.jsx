// filepath: /C:/Users/akver/Desktop/amanPortfolio/src/Components/Header.jsx
import { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaMoon, FaSun } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher';

function Header({ onModeToggle, isTechieMode }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage first
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      return savedMode === 'true';
    }
    // Default to light mode
    return false;
  });
  const resumeLink = import.meta.env.VITE_RESUME_LINK;

  // Apply dark mode on initial render and when it changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Save preference to localStorage
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const menuItems = [
    { href: "/", text: "Home" },
    { href: "/about", text: "About" },
    { href: "/projects", text: "Projects" },
    { href: "/contact", text: "Contact" },
  ];

  return (
    <div className="sticky top-0 z-50 w-full font-playFair transition-all duration-300">
      {/* Glassmorphism background - different for light and dark modes */}
      <div className="absolute inset-0 bg-white/70 dark:bg-[#09090b]/80 backdrop-blur-md transition-all duration-300"></div>
      
      <div className="relative max-w-[1300px] mx-auto">
        {/* Navbar Container */}
        <div className="w-full px-4 sm:px-6 lg:px-8">
          {/* Actual Navbar - with interactive border effects */}
          <div className="relative flex items-center justify-between h-[75px] lg:h-[85px] z-50">
            <div className='flex items-center justify-center gap-3 lg:gap-5'>
              <Link to="/">
                <h1 className="font-bold text-text-light dark:text-text-dark text-2xl lg:text-3xl">
                  Aman<span className='text-accent-primary hover:text-accent-primary-dark dark:hover:text-accent-primary-light font-cursive'>.tech</span>
                </h1>
              </Link>
              {location.pathname !== '/' && (
                <a href={resumeLink} target="_blank" rel="noopener noreferrer">
                  <button type="button" className='shiny-button font-lato font-semibold px-3 py-1.5 lg:text-sm lg:px-4'>
                    Resume
                  </button>
                </a>
              )}
            </div>
            
            <nav className="hidden lg:flex justify-between items-center font-lato gap-6 text-lg text-gray-600 dark:text-gray-300">
              {menuItems.map((item, index) => (
                <Link 
                  key={index} 
                  to={item.href} 
                  className="relative hover:text-accent-primary dark:hover:text-accent-primary active:text-accent-primary-dark dark:active:text-accent-primary-light before:absolute before:bottom-[-4px] before:left-0 before:w-0 before:h-[1.5px] before:bg-accent-primary dark:before:bg-accent-primary before:transition-all before:duration-300 before:ease-in-out hover:before:w-full"
                >
                  {item.text}
                </Link>
              ))}
            </nav>

            <div className='flex items-center gap-4'>
              <ThemeSwitcher isTechieMode={isTechieMode} onModeToggle={onModeToggle} />
              
              <button 
                onClick={toggleDarkMode} 
                className='text-xl transition-transform duration-300 hover:scale-110 hover:text-accent-primary dark:hover:text-accent-primary'
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDarkMode ? <FaSun className="text-accent-primary" /> : <FaMoon className="text-text-light dark:text-text-dark" />}
              </button>
              
              <button 
                className='lg:hidden z-50 text-xl hover:text-accent-primary dark:hover:text-accent-primary active:text-accent-primary-dark dark:active:text-accent-primary-light transition-colors duration-200' 
                onClick={toggleMenu} 
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <FaTimes className="text-white" /> : <FaBars className="text-text-light dark:text-text-dark" />}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Line under navigation - full width */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gray-200 dark:bg-indigo-500/30"></div>

      {/* Mobile Menu with Glassmorphism - also enhanced with interactive effects */}
      <nav className={`fixed top-0 right-0 bottom-0 flex flex-col justify-center bg-gradient-to-b from-accent-primary/90 to-black/90 dark:from-accent-primary/80 dark:to-white/80 backdrop-blur-md w-64 p-6 text-white dark:text-black border-l border-white/20 hover:border-white/50 dark:hover:border-white/40 transition-all duration-300 ease-in-out z-40 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {menuItems.map((item, index) => (
          <Link 
            key={index} 
            to={item.href} 
            className="py-2 text-lg font-lato transition-colors duration-200 relative hover:text-white dark:hover:text-black active:text-white dark:active:text-black before:absolute before:bottom-[-4px] before:left-0 before:w-0 before:h-[1.5px] before:bg-white dark:before:bg-black before:transition-all before:duration-300 before:ease-in-out hover:before:w-full active:before:bg-white dark:active:before:bg-black" 
            onClick={toggleMenu}
          >
            {item.text}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default Header;