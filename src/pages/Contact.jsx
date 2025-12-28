import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaEnvelope, FaUser, FaPaperPlane, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [isTechieMode, setIsTechieMode] = useState(false);
    const [searchParams] = useSearchParams();

    // Check if we're in techie mode
    useEffect(() => {
        const queryTheme = searchParams.get('theme');
        const savedMode = localStorage.getItem('techieMode');
        setIsTechieMode(queryTheme === 'tech' || (savedMode ? JSON.parse(savedMode) : false));
    }, [searchParams]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            // Replace with your actual form submission logic
            // This could be an API call, email service, etc.
            await new Promise(resolve => setTimeout(resolve, 1000));
            setSubmitStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('Form submission error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    // If in techie mode, render a more terminal-like form
    if (isTechieMode) {
        return (
            <div className="container mx-auto p-4 max-w-2xl font-['IBM_Plex_Mono']">
                <div className="bg-[#1A1A1A] rounded-t-md p-2 border border-[#333] border-b-0">
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="ml-2 text-sm text-gray-400">contact.sh</span>
                    </div>
                </div>
                
                <div className="bg-[#121212] p-6 rounded-b-md border border-[#333] mb-6">
                    {submitStatus === 'success' && (
                        <div className="mb-6 p-4 bg-[#0d2818] text-[#22C55E] rounded border border-[#22C55E]/30 font-mono">
                            <pre>$ send_message --success</pre>
                            <pre>Message sent successfully!</pre>
                            <pre>We'll get back to you soon.</pre>
                        </div>
                    )}
                    
                    {submitStatus === 'error' && (
                        <div className="mb-6 p-4 bg-[#2d0d0d] text-[#f87171] rounded border border-[#f87171]/30 font-mono">
                            <pre>$ send_message --error</pre>
                            <pre>Error: Message failed to send.</pre>
                            <pre>Please try again or contact directly.</pre>
                        </div>
                    )}
                
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-[#0EA5E9]">
                                <span className="text-gray-400">$ </span>userName=
                            </label>
                            <input 
                                type="text" 
                                id="name" 
                                name="name" 
                                value={formData.name}
                                onChange={handleChange}
                                required 
                                className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#333] rounded text-[#E5E7EB] focus:outline-none focus:border-[#0EA5E9] font-mono"
                            />
                        </div>
                        
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-[#0EA5E9]">
                                <span className="text-gray-400">$ </span>userEmail=
                            </label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                value={formData.email}
                                onChange={handleChange}
                                required 
                                className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#333] rounded text-[#E5E7EB] focus:outline-none focus:border-[#0EA5E9] font-mono"
                            />
                        </div>
                        
                        <div className="space-y-2">
                            <label htmlFor="message" className="block text-[#0EA5E9]">
                                <span className="text-gray-400">$ </span>cat &gt; message.txt
                            </label>
                            <textarea 
                                id="message" 
                                name="message" 
                                value={formData.message}
                                onChange={handleChange}
                                required 
                                rows="5"
                                className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#333] rounded text-[#E5E7EB] focus:outline-none focus:border-[#0EA5E9] font-mono"
                            ></textarea>
                        </div>
                        
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="shiny-button w-full font-mono flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? '$ sending...' : '$ ./send_message.sh'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // Normal mode contact form
    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 font-playFair text-text-light dark:text-text-dark">
                    Get In <span className="text-accent-primary">Touch</span>
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Have a project in mind or want to collaborate? I'd love to hear from you. Send me a message and I'll respond as soon as possible.
                </p>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="w-full lg:w-2/3 max-w-2xl mx-auto lg:mx-0">
                {submitStatus === 'success' && (
                    <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg border border-green-200 dark:border-green-500/30 flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-semibold">Message sent successfully!</p>
                            <p className="text-sm">Thank you for your message. I'll get back to you soon.</p>
                        </div>
                    </div>
                )}
                
                {submitStatus === 'error' && (
                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg border border-red-200 dark:border-red-500/30 flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-semibold">Something went wrong</p>
                            <p className="text-sm">Please try again or contact me directly via email.</p>
                        </div>
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="bg-primary-light dark:bg-primary-dark p-8 rounded-xl shadow-lg border border-gray-200 dark:border-indigo-500/30">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2">
                                <FaUser className="text-accent-primary" />
                                Name
                            </label>
                            <input 
                                type="text" 
                                id="name" 
                                name="name" 
                                value={formData.name}
                                onChange={handleChange}
                                required 
                                placeholder="Your name"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-indigo-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent dark:bg-gray-800 dark:text-white transition-all duration-200"
                            />
                        </div>
                        
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2">
                                <FaEnvelope className="text-accent-primary" />
                                Email
                            </label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                value={formData.email}
                                onChange={handleChange}
                                required 
                                placeholder="your.email@example.com"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-indigo-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent dark:bg-gray-800 dark:text-white transition-all duration-200"
                            />
                        </div>
                        
                        <div className="space-y-2">
                            <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2">
                                <FaPaperPlane className="text-accent-primary" />
                                Message
                            </label>
                            <textarea 
                                id="message" 
                                name="message" 
                                value={formData.message}
                                onChange={handleChange}
                                required 
                                rows="6"
                                placeholder="Tell me about your project or just say hello..."
                                className="w-full px-4 py-3 border border-gray-300 dark:border-indigo-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent dark:bg-gray-800 dark:text-white resize-none transition-all duration-200"
                            ></textarea>
                        </div>
                        
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="shiny-button w-full font-semibold flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed py-3 text-lg"
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <FaPaperPlane />
                                    Send Message
                                </>
                            )}
                        </button>
                    </div>
                </form>
                </div>

                {/* Vertical Contact Cards Sidebar */}
                <div className="w-full lg:w-1/3 lg:sticky lg:top-24 space-y-4">
                    <div className="bg-primary-light dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-indigo-500/30 hover:shadow-lg hover:border-accent-primary/50 dark:hover:border-indigo-500/50 transition-all duration-300 group animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <a 
                            href="mailto:akverma11aug2002@gmail.com"
                            className="flex items-center gap-4"
                        >
                            <div className="w-14 h-14 bg-accent-primary/10 dark:bg-indigo-500/20 rounded-xl flex items-center justify-center group-hover:bg-accent-primary/20 dark:group-hover:bg-indigo-500/30 group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                                <FaEnvelope className="text-accent-primary text-xl" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-lg mb-1 text-text-light dark:text-text-dark group-hover:text-accent-primary transition-colors">Email</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm truncate">akverma11aug2002@gmail.com</p>
                            </div>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <svg className="w-5 h-5 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </a>
                    </div>

                    <div className="bg-primary-light dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-indigo-500/30 hover:shadow-lg hover:border-accent-primary/50 dark:hover:border-indigo-500/50 transition-all duration-300 group animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <a 
                            href="https://www.linkedin.com/in/aman-kr-verma11/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4"
                        >
                            <div className="w-14 h-14 bg-accent-primary/10 dark:bg-indigo-500/20 rounded-xl flex items-center justify-center group-hover:bg-accent-primary/20 dark:group-hover:bg-indigo-500/30 group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                                <FaLinkedin className="text-accent-primary text-xl" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-lg mb-1 text-text-light dark:text-text-dark group-hover:text-accent-primary transition-colors">LinkedIn</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">Connect with me</p>
                            </div>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <svg className="w-5 h-5 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </a>
                    </div>

                    <div className="bg-primary-light dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-indigo-500/30 hover:shadow-lg hover:border-accent-primary/50 dark:hover:border-indigo-500/50 transition-all duration-300 group animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <a 
                            href="https://github.com/AmanKumarVerma11"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4"
                        >
                            <div className="w-14 h-14 bg-accent-primary/10 dark:bg-indigo-500/20 rounded-xl flex items-center justify-center group-hover:bg-accent-primary/20 dark:group-hover:bg-indigo-500/30 group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                                <FaGithub className="text-accent-primary text-xl" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-lg mb-1 text-text-light dark:text-text-dark group-hover:text-accent-primary transition-colors">GitHub</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">View my work</p>
                            </div>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <svg className="w-5 h-5 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;