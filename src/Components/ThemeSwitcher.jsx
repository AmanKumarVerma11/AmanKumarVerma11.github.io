import { useState, useEffect } from 'react';
import { FaLaptopCode, FaUserTie } from 'react-icons/fa';

const ThemeSwitcher = ({ isTechieMode, onModeToggle }) => {
  // Animation states
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleToggle = () => {
    setIsAnimating(true);
    onModeToggle();
    // Reset animation state after transition completes
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <div className="relative inline-flex items-center">
      <span className="mr-3 text-sm font-medium text-gray-600 dark:text-gray-300 hidden sm:inline">
        {isTechieMode ? 'Techie' : 'Normal'}
      </span>
      <button 
        onClick={handleToggle}
        aria-label={isTechieMode ? "Switch to normal mode" : "Switch to techie mode"}
        className={`
          w-16 h-8 flex items-center rounded-full p-1 transition-all duration-300 focus:outline-none
          ${isTechieMode 
            ? 'bg-accent-primary border border-accent-primary-dark' 
            : 'bg-accent-primary-dark border border-accent-primary'}
          ${isAnimating ? 'animate-pulse' : ''}
        `}
      >
        <span 
          className={`
            w-6 h-6 rounded-full shadow-md flex items-center justify-center transition-transform duration-500 ease-in-out
            ${isTechieMode 
              ? 'transform translate-x-8 bg-black text-accent-primary' 
              : 'bg-white text-accent-primary-dark'}
          `}
        >
          {isTechieMode ? <FaLaptopCode /> : <FaUserTie />}
        </span>
      </button>
    </div>
  );
};

export default ThemeSwitcher;
