import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import TechiePortfolio from "./Components/TechiePortfolio";
import { useSearchParams } from "react-router-dom";
import VirtualCompanion from "./Components/VirtualCompanion";

function App() {
  const [searchParams] = useSearchParams();

  const [isTechieMode, setIsTechieMode] = useState(() => {
    const queryTheme = searchParams.get('theme');
    if (queryTheme === 'tech') return true;

    const savedMode = localStorage.getItem('techieMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      return savedMode === 'true';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem('techieMode', JSON.stringify(isTechieMode));

    if (isTechieMode) {
      document.documentElement.classList.add('techie-mode');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('techie-mode');
    }
  }, [isTechieMode]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  if (isTechieMode) {
    return (
      <TechiePortfolio onModeToggle={() => setIsTechieMode(false)} />
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD] dark:bg-[#0F1012] text-text-light dark:text-text-dark transition-colors duration-200 relative font-roboto">
      <Header onModeToggle={() => setIsTechieMode(true)} isTechieMode={isTechieMode} />
      <main className="flex-grow w-full">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
      <Footer isTechieMode={isTechieMode} />
      {!isTechieMode && <VirtualCompanion />}
    </div>
  );
}

export default App;