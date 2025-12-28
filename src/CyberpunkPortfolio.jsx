import { useState, useEffect, useRef } from 'react';

export default function CyberpunkPortfolio({ onExit }) {
  const [glitchText, setGlitchText] = useState('');
  const glitchRef = useRef(null);

  useEffect(() => {
    const text = 'Welcome to Cyberpunk Mode';
    let index = 0;

    const glitchInterval = setInterval(() => {
      setGlitchText(
        text
          .split('')
          .map((char, i) =>
            i === index ? `<span class="glitch">${char}</span>` : char
          )
          .join('')
      );
      index = (index + 1) % text.length;
    }, 100);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-4 overflow-x-hidden">
      <div className="text-center mt-10">
        <h1
          ref={glitchRef}
          className="text-4xl font-bold glitch-text"
          dangerouslySetInnerHTML={{ __html: glitchText }}
        ></h1>
      </div>
      <button
        onClick={onExit}
        className="fixed top-4 right-4 z-50 px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-blue-500 text-white font-bold shadow hover:from-blue-500 hover:to-red-500 transition-all duration-300"
      >
        Exit Cyberpunk Mode
      </button>
      <div className="mt-20">
        <p className="text-lg text-center">
          Explore the futuristic design and immerse yourself in the cyberpunk
          experience.
        </p>
      </div>
    </div>
  );
}