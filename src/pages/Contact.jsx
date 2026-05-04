import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to send');
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    'w-full bg-surface text-ink text-sm px-4 py-3 rounded-sm border border-wire placeholder:text-haze focus:outline-none focus:border-ink/50 focus:ring-1 focus:ring-ink/15 transition-all duration-200';

  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-10 py-16">

      <div className="max-w-xl">
        {/* Header */}
        <p className="text-haze text-xs font-semibold tracking-[0.18em] uppercase mb-3">
          Contact
        </p>
        <h1
          className="text-[clamp(2.4rem,5vw,4rem)] leading-[0.96] font-extrabold text-ink mb-5"
          style={{ fontVariationSettings: "'wdth' 84, 'wght' 800" }}
        >
          Let's talk<span className="text-signal">.</span>
        </h1>
        <p className="text-dim text-base mb-12">
          Have a project, a role, or just want to say hello. I read every message.
        </p>

        {/* Status messages */}
        {submitStatus === 'success' && (
          <div className="animate-fade-up mb-8 py-3 px-4 bg-surface border border-wire rounded-sm text-sm text-dim">
            Message sent. I'll get back to you soon.
          </div>
        )}
        {submitStatus === 'error' && (
          <div className="animate-fade-up mb-8 py-3 px-4 bg-surface border border-wire rounded-sm text-sm text-dim">
            Something went wrong. Email me directly at{' '}
            <a href="mailto:akverma11aug2002@gmail.com" className="text-ink hover:underline underline-offset-4">
              akverma11aug2002@gmail.com
            </a>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-dim text-xs mb-2 tracking-wide">
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
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-dim text-xs mb-2 tracking-wide">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-dim text-xs mb-2 tracking-wide">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              placeholder="Tell me about your project..."
              className={`${inputClass} resize-none`}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full text-sm font-medium text-dim border border-wire rounded-sm py-3 hover:border-ink/40 hover:text-ink disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Sending...
              </>
            ) : 'Send message'}
          </button>
        </form>

        {/* Direct links */}
        <div className="mt-12 pt-10 border-t border-wire flex flex-wrap gap-x-8 gap-y-3 text-sm text-haze">
          <a href="mailto:akverma11aug2002@gmail.com" className="hover:text-ink transition-colors duration-200">
            akverma11aug2002@gmail.com
          </a>
          <a href="https://www.linkedin.com/in/aman-kr-verma11/" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors duration-200">
            LinkedIn →
          </a>
          <a href="https://github.com/AmanKumarVerma11" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors duration-200">
            GitHub →
          </a>
        </div>
      </div>

    </div>
  );
};

export default Contact;
