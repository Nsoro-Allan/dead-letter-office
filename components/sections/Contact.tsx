'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Send, CheckCircle2, Mail } from 'lucide-react';
import { personalInfo, socialLinks } from '@/lib/data';

export const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitStatus('success');
    setFormState({ name: '', email: '', message: '' });
    
    setTimeout(() => setSubmitStatus('idle'), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden bg-gradient-to-b from-void via-midnight to-abyss">
      
      {/* Atmospheric background glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-gradient-radial from-ghost-blue/8 to-transparent rounded-full blur-[130px] opacity-25" />
      
      <motion.div
        ref={ref}
        className="relative z-10 container mx-auto px-6 max-w-6xl"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        
        {/* Section header - Victorian elegance */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Ornamental badge */}
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-shadow/60 border border-candlelight/20 rounded-sm mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-candlelight animate-pulse-glow" />
              <span className="text-candlelight/80 text-sm font-body tracking-ultra-wide uppercase font-light">
                Get In Touch
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-candlelight animate-pulse-glow" style={{ animationDelay: '0.5s' }} />
            </div>
            
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-parchment mb-6 tracking-tight">
              Let's Work{' '}
              <span className="inline-block bg-gradient-to-r from-candlelight via-gold-light to-ghost-blue bg-clip-text text-transparent">
                Together
              </span>
            </h2>
            
            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-24 h-[1px] bg-gradient-to-r from-transparent to-candlelight/30" />
              <div className="w-2 h-2 rounded-full bg-candlelight/40" />
              <div className="w-24 h-[1px] bg-gradient-to-l from-transparent to-candlelight/30" />
            </div>
            
            <p className="text-xl text-ash/80 max-w-2xl mx-auto font-body font-light">
              Have a project in mind? Let's bring your ideas to life
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          
          {/* Contact form - takes 3 columns */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-3"
          >
            {/* Form container with corner ornaments */}
            <div className="relative p-8 bg-shadow/40 border border-candlelight/15 backdrop-blur-sm">
              {/* Corner ornaments */}
              <div className="absolute top-0 left-0 w-10 h-10 border-t border-l border-candlelight/20" />
              <div className="absolute top-0 right-0 w-10 h-10 border-t border-r border-candlelight/20" />
              <div className="absolute bottom-0 left-0 w-10 h-10 border-b border-l border-candlelight/20" />
              <div className="absolute bottom-0 right-0 w-10 h-10 border-b border-r border-candlelight/20" />
              
              <form onSubmit={handleSubmit} className="relative space-y-6">
                
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-ash/70 font-body text-xs tracking-widest uppercase mb-2 font-light">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-midnight/60 border border-candlelight/20 text-parchment font-body placeholder:text-ash/30 focus:outline-none focus:border-candlelight focus:shadow-glow-subtle transition-all duration-300"
                    placeholder="Your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-ash/70 font-body text-xs tracking-widest uppercase mb-2 font-light">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-midnight/60 border border-candlelight/20 text-parchment font-body placeholder:text-ash/30 focus:outline-none focus:border-candlelight focus:shadow-glow-subtle transition-all duration-300"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-ash/70 font-body text-xs tracking-widest uppercase mb-2 font-light">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-midnight/60 border border-candlelight/20 text-parchment font-body placeholder:text-ash/30 focus:outline-none focus:border-candlelight focus:shadow-glow-subtle transition-all duration-300 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                {/* Submit button - Victorian style matching Hero CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting || submitStatus === 'success'}
                  className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-shadow/60 border border-candlelight/30 font-body font-medium text-candlelight overflow-hidden transition-all duration-500 hover:border-candlelight hover:shadow-glow-gold hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {submitStatus === 'success' ? (
                    <>
                      <CheckCircle2 className="relative z-10 w-5 h-5" />
                      <span className="relative z-10 tracking-wide">Sent Successfully!</span>
                    </>
                  ) : isSubmitting ? (
                    <>
                      <div className="relative z-10 w-5 h-5 border-2 border-candlelight/20 border-t-candlelight rounded-full animate-spin" />
                      <span className="relative z-10 tracking-wide">Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="relative z-10 w-5 h-5" />
                      <span className="relative z-10 tracking-wide">Send Message</span>
                    </>
                  )}
                  
                  {/* Hover effects */}
                  <div className="absolute inset-0 bg-gradient-to-b from-candlelight/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-candlelight/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                </button>

              </form>
            </div>
          </motion.div>

          {/* Contact info - takes 2 columns */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="lg:col-span-2 space-y-8"
          >
            
            {/* Email */}
            <div className="relative p-6 bg-shadow/40 border border-candlelight/15 backdrop-blur-sm">
              {/* Corner ornaments */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-candlelight/20" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-candlelight/20" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-candlelight/20" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-candlelight/20" />
              
              <div className="relative flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-shadow border border-candlelight/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-candlelight" />
                </div>
                <h3 className="text-lg font-display font-semibold text-parchment">
                  Email
                </h3>
              </div>
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-ash/80 hover:text-candlelight transition-colors duration-300 font-body font-light"
              >
                {personalInfo.email}
              </a>
            </div>

            {/* Social links */}
            <div className="relative p-6 bg-shadow/40 border border-candlelight/15 backdrop-blur-sm">
              {/* Corner ornaments */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-candlelight/20" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-candlelight/20" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-candlelight/20" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-candlelight/20" />
              
              <h3 className="relative text-lg font-display font-semibold text-parchment mb-4">
                Connect
              </h3>
              <div className="relative flex flex-wrap gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center bg-shadow/40 border border-candlelight/15 hover:border-candlelight/50 hover:shadow-glow-subtle text-ash hover:text-candlelight transition-all duration-300"
                    aria-label={link.name}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="relative p-6 bg-shadow/40 border border-candlelight/20 backdrop-blur-sm">
              {/* Corner ornaments */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-candlelight/20" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-candlelight/20" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-candlelight/20" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-candlelight/20" />
              
              <div className="relative flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-parchment font-body font-semibold">Available for Work</span>
              </div>
              <p className="relative text-ash/70 text-sm font-body font-light">
                Open to new projects and collaborations
              </p>
            </div>

          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};
