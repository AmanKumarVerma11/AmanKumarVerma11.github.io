import { useState, useEffect } from 'react';
import { FaArrowRight } from "react-icons/fa";
import Hero from "../assets/Hero.png";
import Triangles from "../assets/triangles.png";
import Waves from "../assets/Waves.png";
import Circles from "../assets/circles.png";

function Home() {
  
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const resumeLink = import.meta.env.VITE_RESUME_LINK;

  useEffect(() => {
    const words = ["Developer.", "Problem Solver.", "System Architect.", "Fast Learner."];
    const currentWord = words[currentWordIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    const typingEffect = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(currentWord.slice(0, displayedText.length + 1));
        if (displayedText.length === currentWord.length) {
          setTimeout(() => setIsDeleting(true), 1000);
        }
      } else {
        setDisplayedText(currentWord.slice(0, displayedText.length - 1));
        if (displayedText === "") {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(typingEffect);
  }, [displayedText, isDeleting, currentWordIndex]);

  return (
    <div className="container mx-auto px-4 py-16 lg:py-20 relative overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center justify-center lg:space-x-16 space-y-16 lg:space-y-0">
        <div className="lg:w-1/2 flex justify-center lg:order-last relative">
          <img src={Hero} alt="profile" className="w-60 h-60 lg:w-80 lg:h-80 object-cover z-10" />
          <img src={Triangles} alt="triangles" className="absolute bottom-14 -right-10 lg:right-14 w-10 h-10 -translate-x-1/2 -translate-y-1/2 animate-float" />
          <img src={Waves} alt="waves" className="absolute top-0 -left-9 lg:left-16 w-10 h-10 translate-x-10 translate-y-1/4 animate-float" />
          <img src={Circles} alt="circles" className="absolute top-5 right-0 lg:right-28 w-8 h-8 -translate-x-1/2 -translate-y-1/2 animate-float" />
        </div>
        <div className="lg:w-1/2 flex flex-col items-center lg:items-start space-y-6">
          <h1 className="text-3xl text-center lg:text-left font-bold font-playFair md:text-4xl lg:text-5xl text-text-light dark:text-text-dark">
            I am a <span className="font-cursive text-accent-primary">Full Stack Web Developer</span> and 
            <span className="font-lato block"> {displayedText}
              <span className='text-accent-primary font-extrabold'>|</span>
            </span>
          </h1>
          <p className="text-center lg:text-left font-lato text-gray-700 dark:text-gray-300 italic lg:text-xl">
            Passionate about coding, learning new technologies, and solving problems.
          </p>
          <a href={resumeLink} target='_blank' className="inline-flex items-center justify-center gap-2 text-sm font-mono px-4 py-2 rounded-full border border-text-light dark:border-text-dark hover:border-2 hover:border-accent-primary hover:text-accent-primary lg:text-base transition duration-300">
            <button type="button" className="hover:italic">Resume</button>
            <FaArrowRight />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;