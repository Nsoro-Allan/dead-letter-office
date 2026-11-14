'use client';

import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { personalInfo } from '@/lib/data';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.replace('#', ''));
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-abyss/95 backdrop-blur-xl border-b border-candlelight/10 shadow-lg shadow-black/50' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo - elegant monogram */}
          <motion.a
            href="#home"
            className="relative group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-2xl md:text-3xl font-display font-bold tracking-tight bg-gradient-to-br from-parchment via-candlelight to-parchment bg-clip-text text-transparent">
              {personalInfo.name.split(' ').map(n => n[0]).join('')}
            </span>
            {/* Subtle underline glow on hover */}
            <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-candlelight/60 to-ghost-blue/40 group-hover:w-full transition-all duration-500 shadow-glow-subtle" />
          </motion.a>

          {/* Desktop Navigation - refined and minimal */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="relative px-5 py-2 text-sm font-body tracking-wide transition-colors group"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <span className={`relative z-10 transition-colors duration-300 ${
                    isActive 
                      ? 'text-candlelight' 
                      : 'text-ash group-hover:text-parchment'
                  }`}>
                    {item.name}
                  </span>
                  
                  {/* Active indicator - elegant gold underline */}
                  {isActive && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-candlelight shadow-glow-gold"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-candlelight/0 via-candlelight/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded" />
                </motion.a>
              );
            })}
          </div>

          {/* Mobile Menu Button - refined design */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded bg-shadow/50 border border-candlelight/20 text-candlelight hover:border-candlelight hover:shadow-glow-subtle transition-all duration-300"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation - elegant dropdown */}
        <motion.div
          className="md:hidden overflow-hidden"
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: isOpen ? 'auto' : 0,
            opacity: isOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="py-6 space-y-1 border-t border-candlelight/10">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`block px-4 py-3 font-body rounded transition-all duration-300 ${
                    isActive
                      ? 'text-candlelight bg-shadow/80 border-l-2 border-candlelight'
                      : 'text-ash hover:text-parchment hover:bg-shadow/40 border-l-2 border-transparent'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};
