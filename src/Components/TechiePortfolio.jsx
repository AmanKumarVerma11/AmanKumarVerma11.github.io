import { useState, useEffect, useRef } from 'react';
import { FaTerminal, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import ThemeSwitcher from './ThemeSwitcher';
import { Link } from 'react-router-dom';

const TechiePortfolio = ({ onModeToggle }) => {
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [outputHistory, setOutputHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);
  
  // Available commands
  const commands = {
    help: () => [
      "Available commands:",
      "-------------------",
      "about        - Display information about me",
      "skills       - List my technical skills",
      "projects     - View my projects",
      "contact      - Show contact information",
      "blog         - Read my latest blog posts",
      "clear        - Clear the terminal screen",
      "theme        - Switch to normal mode UI",
      "social       - Show social media links",
      "exit         - Close terminal (switch to normal mode)"
    ],
    about: () => [
      "Aman Kumar Verma",
      "==================",
      "Full-Stack Developer",
      "",
      "Hi, I'm Aman Kumar Verma — a Full-Stack Developer who learns by building.",
      "I specialize in creating fast, scalable, and reliable applications across",
      "web and mobile platforms. I've worked with Next.js, React Native, TypeScript,",
      "Prisma, PostgreSQL, and Node.js to build real-world products used at scale.",
      "",
      "I've learned that you don't need to know everything to begin — you just",
      "need to start, adapt, and grow. As Mark Zuckerberg said:",
      "\"Ideas don't come fully formed… no one does when they begin.\"",
      "",
      "That mindset drives my work. I'm quick to pick up new technologies,",
      "curious about how systems fit together, and comfortable diving deep into",
      "unfamiliar territory until things click."
    ],
    skills: () => [
      "Technical Skills",
      "===============",
      "",
      "Frontend:",
      "  - React.js, Next.js, React Native, Expo",
      "  - TypeScript, JavaScript",
      "  - Tailwind CSS, Bootstrap",
      "",
      "Backend:",
      "  - Node.js, Express.js, REST APIs",
      "  - Prisma ORM, Authentication, Authorization, KYC",
      "  - Schema Design",
      "",
      "Databases:",
      "  - PostgreSQL, MongoDB",
      "  - Prisma ORM, Redis (basic)",
      "",
      "Tools & DevOps:",
      "  - Docker, Git, GitHub, Bitbucket",
      "  - Postman, Sentry, Jira, VS Code",
      "  - Figma, Adobe XD",
      "",
      "Languages:",
      "  - C/C++, JavaScript, TypeScript",
      "  - SQL, NoSQL, Python (basic), Java (basic)"
    ],
    projects: () => [
      "Projects",
      "========",
      "",
      "1. Zeetax – Native Educational App",
      "   Tech: React Native, Expo, Next.js, PostgreSQL, Prisma",
      "   Description: Built a native mobile app for exploring books, notes & digital",
      "   learning content. Cross-platform UI with smooth navigation. Backend built",
      "   with Next.js + PostgreSQL. Optimized performance and state management.",
      "   Link: https://zeetax.in/",
      "",
      "2. Tyos Sports – E-Commerce + Inventory System",
      "   Tech: Next.js, TypeScript, PostgreSQL, Prisma, Tailwind, Razorpay, Shiprocket",
      "   Description: Full-stack e-commerce platform with automated order & delivery",
      "   workflows. Features admin dashboards, Razorpay payments, and Shiprocket",
      "   logistics integration.",
      "   Link: https://tyos.co.in/",
      "",
      "3. Twitter Trends Scraper",
      "   Tech: React, Node.js, Selenium, ProxyMesh, MongoDB, Framer Motion",
      "   Description: Scrapes & visualizes real-time Twitter trends. Features proxy",
      "   rotation, automated scraping, and animated UI with Framer Motion.",
      "   GitHub: https://github.com/AmanKumarVerma11/Twitter-Trends-Scraper"
    ],
    contact: () => [
      "Contact Information",
      "==================",
      "",
      "Email: akverma11aug2002@gmail.com",
      "LinkedIn: linkedin.com/in/aman-kr-verma11",
      "GitHub: github.com/AmanKumarVerma11",
      "",
      "Feel free to reach out!"
    ],
    blog: () => [
      "Latest Blog Posts",
      "===============",
      "",
      "[2023-11-15] Optimizing React Performance",
      "$ cat blog/react-optimization.md",
      "",
      "[2023-10-22] Building Scalable APIs with Node.js",
      "$ cat blog/node-apis.md",
      "",
      "[2023-09-08] Docker for Development Environments",
      "$ cat blog/docker-dev.md"
    ],
    clear: () => {
      setOutputHistory([]);
      return [];
    },
    theme: () => {
      setTimeout(() => onModeToggle(), 500);
      return ["Switching to normal mode..."];
    },
    exit: () => {
      setTimeout(() => onModeToggle(), 500);
      return ["Exiting terminal..."];
    },
    social: () => [
      "Social Media",
      "============",
      "",
      "GitHub: github.com/AmanKumarVerma11",
      "LinkedIn: linkedin.com/in/aman-kr-verma11",
      "Twitter: twitter.com/mai_amanhoon",
      "Figma: figma.com/@akv"
    ],
    cat: (args) => {
      if (!args.length) return ["Error: Missing file name"];
      
      if (args[0] === "blog/react-optimization.md") {
        return [
          "# Optimizing React Performance",
          "",
          "One of the most common challenges in React applications is ensuring optimal performance...",
          "",
          "[Content continues]"
        ];
      }
      
      return [`Error: File '${args[0]}' not found`];
    },
    ls: () => [
      "about.txt  blog/  contact.txt  projects.json  skills.md  resume.pdf"
    ],
    open: (args) => {
      if (!args.length) return ["Error: Specify what to open"];
      
      if (args[0] === "resume.pdf") {
        window.open(import.meta.env.VITE_RESUME_LINK || "#", "_blank");
        return ["Opening resume in new tab..."];
      }
      
      return [`Error: Cannot open '${args[0]}'`];
    }
  };

  // Process terminal commands
  const processCommand = (commandStr) => {
    const parts = commandStr.trim().split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);
    
    if (!cmd) return [];
    
    const command = commands[cmd];
    if (command) {
      return command(args);
    }
    
    return [`Unknown command: ${cmd}. Type 'help' for available commands.`];
  };

  // Handle form submission (command execution)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add command to history
    const newCommand = { type: 'command', content: input };
    setCommandHistory([...commandHistory, input]);
    setHistoryIndex(commandHistory.length + 1);
    
    // Process command and get output
    const output = processCommand(input);
    const newOutput = { type: 'output', content: output };
    
    // Update terminal output
    setOutputHistory([...outputHistory, newCommand, newOutput]);
    setInput('');
    
    // Scroll to bottom
    setTimeout(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }, 10);
  };

  // Handle keyboard navigation through command history
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex] || '');
      } else {
        setHistoryIndex(commandHistory.length);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Simple command completion
      const availableCommands = Object.keys(commands);
      const matchedCommands = availableCommands.filter(cmd => cmd.startsWith(input));
      if (matchedCommands.length === 1) {
        setInput(matchedCommands[0] + ' ');
      }
    }
  };

  // Focus input field when clicking anywhere in terminal
  useEffect(() => {
    const handleTerminalClick = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };
    
    const terminal = terminalRef.current;
    if (terminal) {
      terminal.addEventListener('click', handleTerminalClick);
    }
    
    return () => {
      if (terminal) {
        terminal.removeEventListener('click', handleTerminalClick);
      }
    };
  }, []);

  // Display welcome message when component mounts
  useEffect(() => {
    const welcomeMessage = [
      "╔═══════════════════════════════════════════════════════════╗",
      "║  AMAN KUMAR VERMA  │  🚀 Full-Stack Developer 🚀         ║",
      "╚═══════════════════════════════════════════════════════════╝",
      "",
      "Welcome to my interactive portfolio terminal!",
      "",
      "Quick Commands:",
      "  help     - Show all commands",
      "  about    - About me",
      "  skills   - Technical skills",
      "  projects - My projects",
      "  contact  - Contact info",
      "  theme    - Switch to normal UI",
      "",
      "Tips: Use Tab for completion, ↑/↓ for history, 'clear' to reset"
    ];
    
    setOutputHistory([{ type: 'output', content: welcomeMessage }]);
  }, []);

  return (
    <div className="h-screen bg-[#121212] text-[#E5E7EB] font-['IBM_Plex_Mono'] flex flex-col overflow-hidden">
      {/* Terminal Header */}
      <div className="bg-[#1A1A1A] p-3 flex items-center justify-between border-b border-[#333]">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-[#0EA5E9] ml-3 font-bold">aman@portfolio:~</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <ThemeSwitcher isTechieMode={true} onModeToggle={onModeToggle} />
        </div>
      </div>
      
      {/* Terminal Body */}
      <div 
        ref={terminalRef}
        className="flex-grow px-4 pt-4 pb-1 overflow-auto bg-[#121212] font-mono relative"
        style={{
          backgroundImage: 'linear-gradient(rgba(18, 18, 18, 0.99), rgba(18, 18, 18, 0.99)), url("data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' viewBox=\'0 0 6 6\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23222222\' fill-opacity=\'0.4\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M5 0h1L0 5v1H0V0h5z\'/%3E%3C/g%3E%3C/svg%3E")',
          lineHeight: '1.5'
        }}
      >
        {outputHistory.map((item, index) => (
          <div key={index} className="mb-1">
            {item.type === 'command' ? (
              <div className="flex">
                <span className="text-[#0EA5E9] mr-2">$</span>
                <span className="text-[#22C55E]">{item.content}</span>
              </div>
            ) : (
              <div className="text-[#E5E7EB] ml-3 whitespace-pre-line text-sm">
                {item.content.map((line, i) => (
                  <div key={i} className="leading-relaxed">{line}</div>
                ))}
              </div>
            )}
          </div>
        ))}
        
        {/* Command Input */}
        <form onSubmit={handleSubmit} className="flex items-center mt-1">
          <span className="text-[#0EA5E9] mr-2">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow bg-transparent border-none outline-none text-[#22C55E] caret-[#22C55E]"
            autoFocus
            spellCheck="false"
          />
        </form>
      </div>
      
      {/* Terminal Footer */}
      <div className="bg-[#1A1A1A] px-3 py-1 border-t border-[#333] flex justify-between items-center text-xs flex-shrink-0">
        <div className="text-gray-500">v1.0.0</div>
        <div className="flex space-x-4">
          <a href="https://github.com/AmanKumarVerma11" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0EA5E9]">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/aman-kr-verma11" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0EA5E9]">
            <FaLinkedin />
          </a>
          <a href="https://twitter.com/mai_amanhoon" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0EA5E9]">
            <FaTwitter />
          </a>
        </div>
        <div className="text-gray-500">Type &apos;help&apos; for commands</div>
      </div>
    </div>
  );
};

export default TechiePortfolio;
