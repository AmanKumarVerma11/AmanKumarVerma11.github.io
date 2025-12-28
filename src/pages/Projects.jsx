const projects = [
    {
        title: 'Zeetax – Native Educational App',
        description: 'Built a native mobile app for exploring books, notes & digital learning content. Cross-platform UI with smooth navigation. Backend built with Next.js + PostgreSQL. Optimized performance and state management.',
        tech: 'React Native, Expo, Next.js, PostgreSQL, Prisma',
        link: 'https://zeetax.in/',
        github: null
    },
    {
        title: 'Tyos Sports – E-Commerce + Inventory System',
        description: 'Full-stack e-commerce platform with automated order & delivery workflows. Features admin dashboards, Razorpay payments, and Shiprocket logistics integration.',
        tech: 'Next.js, TypeScript, PostgreSQL, Prisma, Tailwind, Razorpay, Shiprocket',
        link: 'https://tyos.co.in/',
        github: null
    },
    {
        title: 'Twitter Trends Scraper',
        description: 'Scrapes & visualizes real-time Twitter trends. Features proxy rotation, automated scraping, and animated UI with Framer Motion.',
        tech: 'React, Node.js, Selenium, ProxyMesh, MongoDB, Framer Motion',
        link: null,
        github: 'https://github.com/AmanKumarVerma11/Twitter-Trends-Scraper'
    }
];

const Projects = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-8 text-center font-playFair text-text-light dark:text-text-dark">My Projects</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <div key={index} className="bg-primary-light dark:bg-primary-dark shadow-sm border border-gray-200 dark:border-indigo-500/30 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md hover:border-gray-300 dark:hover:border-indigo-500/50">
                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-2 text-text-light dark:text-text-dark">{project.title}</h2>
                            <p className="text-gray-700 dark:text-gray-300 mb-3 text-sm">{project.tech}</p>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>
                            <div className="flex gap-4">
                                {project.link && (
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-accent-primary hover:text-accent-primary-dark dark:hover:text-accent-primary-light transition-colors duration-300">
                                        View Project
                                    </a>
                                )}
                                {project.github && (
                                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-accent-primary hover:text-accent-primary-dark dark:hover:text-accent-primary-light transition-colors duration-300">
                                        GitHub
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Projects;