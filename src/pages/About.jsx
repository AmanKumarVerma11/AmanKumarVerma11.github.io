import { useState, useEffect } from 'react';
import { FaCode, FaLaptopCode, FaPalette, FaServer, FaUserGraduate, FaBriefcase, FaRegLightbulb, FaDatabase, FaDocker, FaReact, FaNodeJs, FaSearchengin, FaJava, FaPython } from 'react-icons/fa';
import { SiTailwindcss, SiFigma, SiMongodb, SiPostgresql, SiPostman, SiExpress } from 'react-icons/si';
import Portrait from '../assets/fries.jpg';

function About() {
  const [activeTab, setActiveTab] = useState('skills');
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('.animate-section');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const skills = [
    { name: 'Backend Development', level: 92, icon: <FaServer /> },
    { name: 'Frontend Development', level: 90, icon: <FaLaptopCode /> },
    { name: 'UI/UX Design', level: 85, icon: <FaPalette /> },
    { name: 'Database Management', level: 88, icon: <FaDatabase /> },
  ];

  const techStacks = {
    frontend: ['React.js', 'Next.js', 'React Native', 'Expo', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Bootstrap'],
    backend: ['Node.js', 'Express.js', 'REST APIs', 'Prisma ORM', 'Authentication', 'Authorization', 'KYC', 'Schema Design'],
    database: ['PostgreSQL', 'MongoDB', 'Prisma ORM', 'Redis (basic)'],
    tools: ['Docker', 'Git', 'GitHub', 'Bitbucket', 'Postman', 'Sentry', 'Jira', 'VS Code', 'Figma', 'Adobe XD'],
    languages: ['C/C++', 'JavaScript', 'TypeScript', 'SQL', 'NoSQL', 'Python (basic)', 'Java (basic)']
  };

  const strengths = [
    { title: 'Fast Learner', description: 'Quick to pick up new technologies and adapt to changing requirements.', icon: <FaCode /> },
    { title: 'Adaptable Across Stacks', description: 'Comfortable working with different technologies and frameworks, from frontend to backend.', icon: <FaRegLightbulb /> },
    { title: 'Strong Problem Solver', description: 'Approaches challenges systematically, finding efficient and elegant solutions.', icon: <FaSearchengin /> },
    { title: 'Systems Thinker', description: 'Understands how components fit together and how to build scalable architectures.', icon: <FaServer /> },
    { title: 'Calm & Reliable Under Pressure', description: 'Maintains composure and delivers quality work even in challenging situations.', icon: <FaBriefcase /> },
    { title: 'Ownership Mindset', description: 'Takes full responsibility for projects from conception to deployment and beyond.', icon: <FaLaptopCode /> }
  ];


  const experiences = [
    // {
    //   title: 'Full-Stack Developer',
    //   company: 'Adyime Solutions',
    //   period: 'Nov 2025 – Present',
    //   location: 'Delhi',
    //   description: 'Works on web & mobile features using React, React Native, and Next.js. Enhances UI/UX, improves performance, and collaborates across product teams.'
    // },
    {
      title: 'Software Development Engineer',
      company: 'COOX',
      period: 'Apr 2025 – Oct 2025',
      location: 'Noida',
      description: 'Improved cross-platform experiences using Next.js, React Native & Expo. Refactored legacy components, reduced load times, resolved issues using Sentry, and built reusable shared components.'
    },
    {
      title: 'Backend Developer Intern',
      company: 'Rablo.in',
      period: 'Jan 2025 – Apr 2025',
      location: 'Remote',
      description: 'Built REST APIs using Node.js, Express, MongoDB. Implemented auth, KYC, Google API integration. Improved schema reliability and performance.'
    }
  ];

  const education = [
    {
      degree: 'B.Tech in Information Technology',
      school: 'IPEC (AKTU)',
      period: '2024',
      description: 'CGPA: 7.01/10'
    }
  ];

  return (
    <div className="py-12">
      <div 
        id="hero-section" 
        className={`animate-section mb-16 transition-opacity duration-1000 ${
          isVisible['hero-section'] ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex flex-col lg:flex-row items-stretch gap-8">
          <div className="lg:w-3/5 lg:pr-8 mb-8 lg:mb-0">
            <h1 className="text-4xl font-bold mb-4 font-playFair text-text-light dark:text-text-dark">
              About <span className="text-accent-primary">Me</span>
            </h1>
            <p className="text-lg text-text-light dark:text-text-dark mb-6 font-lato">
              Hi, I&#39;m <span className="font-semibold">Aman Kumar Verma</span> — a Full-Stack Developer who learns by building. I specialize in creating fast, scalable, and reliable applications across web and mobile platforms. I&#39;ve worked with Next.js, React Native, TypeScript, Prisma, PostgreSQL, and Node.js to build real-world products used at scale.
            </p>
            <p className="text-lg text-text-light dark:text-text-dark mb-6 font-lato">
              I&#39;ve learned that you don&#39;t need to know everything to begin — you just need to start, adapt, and grow. As Mark Zuckerberg said: &#34;Ideas don&#39;t come fully formed… no one does when they begin.&#34;
            </p>
            <p className="text-lg text-text-light dark:text-text-dark mb-6 font-lato">
              That mindset drives my work. I&#39;m quick to pick up new technologies, curious about how systems fit together, and comfortable diving deep into unfamiliar territory until things click.
            </p>
            <p className="text-lg text-text-light dark:text-text-dark mb-6 font-lato">
              I enjoy building smooth user experiences, optimizing systems, and crafting solutions that feel clean — inside the code and on the screen. Whether it&#39;s APIs, databases, or cross-platform apps, my approach stays the same: learn fast, move with purpose, and deliver with clarity.
            </p>
            <div className="bg-gradient-to-r from-accent-primary to-black dark:from-accent-primary dark:to-white p-0.5 rounded-lg">
              <div className="bg-primary-light dark:bg-primary-dark p-5 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-text-light dark:text-text-dark">Personal Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3">
                  <div className="font-lato">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">Name:</span>
                    <span className="ml-2 text-gray-600 dark:text-gray-400">Aman Kumar Verma</span>
                  </div>
                  <div className="font-lato">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">Email:</span>
                    <span className="ml-2 text-gray-600 dark:text-gray-400">akverma11aug2002@gmail.com</span>
                  </div>
                  <div className="font-lato">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">Location:</span>
                    <span className="ml-2 text-gray-600 dark:text-gray-400">Delhi, India</span>
                  </div>
                  <div className="font-lato">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">Education:</span>
                    <span className="ml-2 text-gray-600 dark:text-gray-400">B.Tech (IT)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-2/5 relative flex justify-center items-center lg:pl-4">
            <div className="w-full max-w-sm lg:max-w-md relative">
              <div className="relative z-10 rounded-xl shadow-lg overflow-hidden group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl aspect-[3/4]">
                  <img 
                    src={Portrait} 
                    alt="Aman Kumar Verma - Full-Stack Developer" 
                    className="w-full h-full object-cover rounded-xl transition-all duration-500 ease-out group-hover:scale-105 grayscale group-hover:grayscale-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="quote-section"
        className={`animate-section mb-16 transition-opacity duration-1000 ${
          isVisible['quote-section'] ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="bg-gradient-to-r from-blue-50/50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 border border-gray-200/50 dark:border-indigo-500/30 p-8 rounded-lg text-center backdrop-blur-sm">
          <blockquote className="text-xl italic font-semibold text-gray-700 dark:text-gray-300">
            &#34;Ideas don&#39;t come fully formed… no one does when they begin.&#34;
            <footer className="text-sm mt-2 text-gray-500 dark:text-gray-400">— Mark Zuckerberg</footer>
          </blockquote>
        </div>
      </div>

      <div
        id="strengths-section"
        className={`animate-section mb-16 transition-opacity duration-1000 ${
          isVisible['strengths-section'] ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <h2 className="text-2xl font-bold mb-6 text-center font-playFair dark:text-white">
          Personal <span className="text-blue-600">Strengths</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {strengths.map((strength, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-indigo-500/30 overflow-hidden transition-all duration-300 hover:shadow-md hover:border-gray-200 dark:hover:border-indigo-500/50 hover:-translate-y-0.5"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="text-2xl text-blue-500 mr-3">
                    {strength.icon}
                  </div>
                  <h3 className="text-xl font-semibold dark:text-white">{strength.title}</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{strength.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-10">
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab('skills')}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
              activeTab === 'skills'
                ? 'shiny-button'
                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Skills
          </button>
          <button
            onClick={() => setActiveTab('experience')}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
              activeTab === 'experience'
                ? 'shiny-button'
                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Experience
          </button>
          <button
            onClick={() => setActiveTab('education')}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
              activeTab === 'education'
                ? 'shiny-button'
                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Education
          </button>
        </div>

        <div 
          id="skills-section"
          className={`animate-section transition-all duration-500 ${
            activeTab === 'skills' ? 'opacity-100 block' : 'opacity-0 hidden'
          }`}
        >
          <h2 className="text-2xl font-bold mb-8 text-center font-playFair dark:text-white">
            Technical <span className="text-blue-600">Skillset</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-indigo-500/30 overflow-hidden transition-all duration-300 hover:shadow-md hover:border-gray-200 dark:hover:border-indigo-500/50 hover:-translate-y-0.5"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="text-2xl text-blue-500 mr-3">
                      {skill.icon}
                    </div>
                    <h3 className="text-xl font-semibold dark:text-white">{skill.name}</h3>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-teal-400 h-2.5 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                  <div className="text-right text-sm text-gray-600 dark:text-gray-400">
                    {skill.level}%
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 space-y-6">
            <div className="bg-gradient-to-r from-blue-50/50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 border border-gray-200/50 dark:border-indigo-500/30 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4 dark:text-white flex items-center">
                <FaReact className="mr-2 text-blue-500" /> Frontend
              </h3>
              <div className="flex flex-wrap gap-3">
                {techStacks.frontend.map((tech, index) => {
                  let icon;
                  if (tech.includes('React')) icon = <FaReact className="mr-1" />;
                  else if (tech.includes('Tailwind')) icon = <SiTailwindcss className="mr-1" />;
                  else icon = <FaLaptopCode className="mr-1" />;
                  
                  return (
                    <span 
                      key={index} 
                      className="bg-white dark:bg-gray-700 px-3 py-1 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm flex items-center"
                    >
                      {icon} {tech}
                    </span>
                  );
                })}
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50/50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 border border-gray-200/50 dark:border-indigo-500/30 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4 dark:text-white flex items-center">
                <FaServer className="mr-2 text-blue-500" /> Backend
              </h3>
              <div className="flex flex-wrap gap-3">
                {techStacks.backend.map((tech, index) => {
                  let icon;
                  if (tech.includes('Node')) icon = <FaNodeJs className="mr-1" />;
                  else if (tech.includes('Express')) icon = <SiExpress className="mr-1" />;
                  else icon = <FaCode className="mr-1" />;
                  
                  return (
                    <span 
                      key={index} 
                      className="bg-white dark:bg-gray-700 px-3 py-1 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm flex items-center"
                    >
                      {icon} {tech}
                    </span>
                  );
                })}
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50/50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 border border-gray-200/50 dark:border-indigo-500/30 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4 dark:text-white flex items-center">
                <FaDatabase className="mr-2 text-blue-500" /> Databases
              </h3>
              <div className="flex flex-wrap gap-3">
                {techStacks.database.map((tech, index) => {
                  let icon;
                  if (tech.includes('Mongo')) icon = <SiMongodb className="mr-1" />;
                  else if (tech.includes('Postgres')) icon = <SiPostgresql className="mr-1" />;
                  else icon = <FaDatabase className="mr-1" />;
                  
                  return (
                    <span 
                      key={index} 
                      className="bg-white dark:bg-gray-700 px-3 py-1 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm flex items-center"
                    >
                      {icon} {tech}
                    </span>
                  );
                })}
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50/50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 border border-gray-200/50 dark:border-indigo-500/30 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4 dark:text-white flex items-center">
                <FaCode className="mr-2 text-blue-500" /> Tools & DevOps
              </h3>
              <div className="flex flex-wrap gap-3">
                {techStacks.tools.map((tech, index) => {
                  let icon;
                  if (tech.includes('Docker')) icon = <FaDocker className="mr-1" />;
                  else if (tech.includes('Postman')) icon = <SiPostman className="mr-1" />;
                  else if (tech.includes('Figma')) icon = <SiFigma className="mr-1" />;
                  else if (tech.includes('Git')) icon = <FaCode className="mr-1" />;
                  else icon = <FaCode className="mr-1" />;
                  
                  return (
                    <span 
                      key={index} 
                      className="bg-white dark:bg-gray-700 px-3 py-1 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm flex items-center"
                    >
                      {icon} {tech}
                    </span>
                  );
                })}
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50/50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 border border-gray-200/50 dark:border-indigo-500/30 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4 dark:text-white flex items-center">
                <FaCode className="mr-2 text-blue-500" /> Languages
              </h3>
              <div className="flex flex-wrap gap-3">
                {techStacks.languages.map((tech, index) => {
                  let icon;
                  if (tech.includes('Python')) icon = <FaPython className="mr-1" />;
                  else if (tech.includes('Java')) icon = <FaJava className="mr-1" />;
                  else icon = <FaCode className="mr-1" />;
                  
                  return (
                    <span 
                      key={index} 
                      className="bg-white dark:bg-gray-700 px-3 py-1 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm flex items-center"
                    >
                      {icon} {tech}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div 
          id="experience-section"
          className={`animate-section transition-all duration-500 ${
            activeTab === 'experience' ? 'opacity-100 block' : 'opacity-0 hidden'
          }`}
        >
          <h2 className="text-2xl font-bold mb-8 text-center font-playFair dark:text-white">
            <span className="text-blue-600">Experience</span>
          </h2>
          <div className="relative border-l-2 border-accent-primary pl-8 ml-4">
            {experiences.map((exp, index) => (
              <div 
                key={index} 
                className="mb-10 relative"
              >
                <div className="absolute -left-10 w-6 h-6 bg-accent-primary rounded-full flex items-center justify-center ring-2 ring-accent-primary/20 dark:ring-accent-primary/30">
                  <div className="w-3 h-3 bg-white dark:bg-gray-800 rounded-full"></div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-indigo-500/30 p-6 transition-all duration-300 hover:shadow-md hover:border-gray-200 dark:hover:border-indigo-500/50">
                  <div className="flex flex-wrap justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold text-text-light dark:text-text-dark">{exp.title}</h3>
                    <span className="text-sm font-medium bg-accent-primary/10 text-accent-primary dark:bg-accent-primary/20 dark:text-accent-primary py-1 px-3 rounded-full">{exp.period}</span>
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium mb-1">{exp.company}</div>
                  {exp.location && <div className="text-gray-500 dark:text-gray-500 text-sm mb-3">{exp.location}</div>}
                  <p className="text-gray-700 dark:text-gray-300">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div 
          id="education-section"
          className={`animate-section transition-all duration-500 ${
            activeTab === 'education' ? 'opacity-100 block' : 'opacity-0 hidden'
          }`}
        >
          <h2 className="text-2xl font-bold mb-8 text-center font-playFair dark:text-white">
            <span className="text-blue-600">Education</span> & Qualifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.map((edu, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-md hover:border-gray-200 dark:hover:border-gray-600"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold dark:text-white">{edu.degree}</h3>
                    <FaUserGraduate className="text-accent-primary text-2xl" />
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">{edu.school}</span>
                    <span className="text-sm bg-accent-primary/10 text-accent-primary dark:bg-accent-primary/20 dark:text-accent-primary px-3 py-1 rounded-full font-medium">{edu.period}</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{edu.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div 
        id="vision-section" 
        className={`animate-section mt-16 transition-opacity duration-1000 ${
          isVisible['vision-section'] ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <h2 className="text-2xl font-bold mb-8 text-center font-playFair dark:text-white">
          Vision & <span className="text-blue-600">Philosophy</span>
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <p className="text-gray-700 dark:text-gray-300 mb-6 text-center">
            I build systems that feel fast, intuitive, and clean. I believe great developers aren&#39;t the ones who know everything — they&#39;re the ones who can learn anything. I thrive in fast-moving teams, love solving real problems, and push myself with every project. I build, iterate, and learn — always ready for what&#39;s next.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-8">
            <a 
              href="https://github.com/AmanKumarVerma11" 
              target="_blank" 
              rel="noopener noreferrer"
              className="shiny-button flex items-center gap-2"
            >
              <FaCode /> View GitHub
            </a>
            <a 
              href="https://www.linkedin.com/in/aman-kr-verma11/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="shiny-button flex items-center gap-2"
            >
              <FaBriefcase /> Let&#39;s Connect
            </a>
            <a 
              href="mailto:akverma11aug2002@gmail.com" 
              className="shiny-button flex items-center gap-2"
            >
              <FaRegLightbulb /> Contact Me
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;