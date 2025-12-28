import { FaGithub, FaLinkedin, FaTwitterSquare, FaFigma } from 'react-icons/fa';

function Footer({ isTechieMode }) {
  return (
    <div className={`${isTechieMode ? 'font-["IBM_Plex_Mono"]' : 'font-lato'} py-4 relative`}>
      {/* Line above footer - full width */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gray-200 dark:bg-indigo-500/30"></div>
      
      {/* Social Icons with theme-specific styling */}
      <div className="flex gap-6 items-center justify-center mb-3">
        <a 
          href="https://github.com/AmanKumarVerma11" 
          target="_blank" 
          rel="noopener noreferrer"
          className={`group relative ${
            isTechieMode 
              ? 'text-gray-400 hover:text-accent-primary transition-colors duration-300 transform hover:scale-110' 
              : 'text-slate-600 dark:text-slate-300 hover:text-accent-primary dark:hover:text-accent-primary hover:font-semibold'
          }`}
        >
          <FaGithub className={isTechieMode ? 'w-6 h-6' : 'w-5 h-5'} />
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 dark:bg-gray-800 text-white text-xs font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:-translate-y-1 whitespace-nowrap shadow-lg border border-gray-700/50 dark:border-indigo-500/30 backdrop-blur-sm z-10">
            GitHub
            <span className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-800 border-r border-b border-gray-700/50 dark:border-indigo-500/30 rotate-45 -mt-1"></span>
          </span>
        </a>
        
        <a 
          href="https://www.linkedin.com/in/aman-kr-verma11/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={`group relative ${
            isTechieMode 
              ? 'text-gray-400 hover:text-accent-primary transition-colors duration-300 transform hover:scale-110' 
              : 'text-slate-600 dark:text-slate-300 hover:text-accent-primary dark:hover:text-accent-primary hover:font-semibold'
          }`}
        >
          <FaLinkedin className={isTechieMode ? 'w-6 h-6' : 'w-5 h-5'} />
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 dark:bg-gray-800 text-white text-xs font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:-translate-y-1 whitespace-nowrap shadow-lg border border-gray-700/50 dark:border-indigo-500/30 backdrop-blur-sm z-10">
            LinkedIn
            <span className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-800 border-r border-b border-gray-700/50 dark:border-indigo-500/30 rotate-45 -mt-1"></span>
          </span>
        </a>
        
        <a 
          href="https://www.figma.com/@akv" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={`group relative ${
            isTechieMode 
              ? 'text-gray-400 hover:text-accent-primary transition-colors duration-300 transform hover:scale-110' 
              : 'text-slate-600 dark:text-slate-300 hover:text-accent-primary dark:hover:text-accent-primary hover:font-semibold'
          }`}
        >
          <FaFigma className={isTechieMode ? 'w-6 h-6' : 'w-5 h-5'} />
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 dark:bg-gray-800 text-white text-xs font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:-translate-y-1 whitespace-nowrap shadow-lg border border-gray-700/50 dark:border-indigo-500/30 backdrop-blur-sm z-10">
            Figma
            <span className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-800 border-r border-b border-gray-700/50 dark:border-indigo-500/30 rotate-45 -mt-1"></span>
          </span>
        </a>
        
        <a 
          href="https://x.com/mai_amanhoon" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={`group relative ${
            isTechieMode 
              ? 'text-gray-400 hover:text-accent-primary transition-colors duration-300 transform hover:scale-110' 
              : 'text-slate-600 dark:text-slate-300 hover:text-accent-primary dark:hover:text-accent-primary hover:font-semibold'
          }`}
        >
          <FaTwitterSquare className={isTechieMode ? 'w-6 h-6' : 'w-5 h-5'} />
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 dark:bg-gray-800 text-white text-xs font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:-translate-y-1 whitespace-nowrap shadow-lg border border-gray-700/50 dark:border-indigo-500/30 backdrop-blur-sm z-10">
            Twitter
            <span className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-800 border-r border-b border-gray-700/50 dark:border-indigo-500/30 rotate-45 -mt-1"></span>
          </span>
        </a>
      </div>
      
      <div>
        <p className={`text-center ${isTechieMode ? 'text-gray-500 text-xs font-mono' : 'text-gray-500 dark:text-gray-400 text-sm'}`}>
          © 2024 All rights reserved {isTechieMode && '| <Aman.Kumar.Verma />'}
        </p>
      </div>
    </div>
  );
}

export default Footer;