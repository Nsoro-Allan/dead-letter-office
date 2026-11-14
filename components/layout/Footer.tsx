'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { socialLinks, personalInfo } from '@/lib/data';
import { useEffect, useState } from 'react';

export const Footer = () => {
  const [currentYear, setCurrentYear] = useState(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="relative py-20 overflow-hidden bg-gradient-to-t from-midnight via-abyss to-void">
      
      {/* Elegant top border with ornament */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-candlelight/30 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-candlelight/60 animate-pulse-glow" />
          <div className="w-8 h-[1px] bg-candlelight/30" />
          <div className="w-2 h-2 rotate-45 border border-candlelight/40 bg-abyss" />
          <div className="w-8 h-[1px] bg-candlelight/30" />
          <div className="w-1.5 h-1.5 rounded-full bg-candlelight/60 animate-pulse-glow" style={{ animationDelay: '0.5s' }} />
        </div>
      </div>

      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-gradient-radial from-candlelight/5 to-transparent blur-3xl" />

      <div className="relative z-10 container mx-auto px-6 max-w-7xl">
        
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          
          {/* Brand - elegant monogram */}
          <div>
            <h3 className="text-3xl font-display font-bold tracking-tight mb-4">
              <span className="bg-gradient-to-br from-parchment via-candlelight to-parchment bg-clip-text text-transparent">
                {personalInfo.name.split(' ').map(n => n[0]).join('')}
              </span>
            </h3>
            <p className="text-ash/80 leading-relaxed font-body font-light">
              Summoning elegant code from the void, one line at a time.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <div className="w-12 h-[1px] bg-gradient-to-r from-candlelight/40 to-transparent" />
              <div className="w-1 h-1 rounded-full bg-candlelight/40" />
            </div>
          </div>

          {/* Quick Links - refined navigation */}
          <div>
            <h4 className="text-parchment font-display font-semibold mb-6 tracking-wide">Navigate</h4>
            <nav className="space-y-3">
              {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block text-ash hover:text-candlelight transition-all duration-300 font-body group flex items-center gap-2"
                >
                  <div className="w-0 h-[1px] bg-candlelight/60 group-hover:w-4 transition-all duration-300" />
                  <span>{item}</span>
                </a>
              ))}
            </nav>
          </div>

          {/* Social - elegant connection */}
          <div>
            <h4 className="text-parchment font-display font-semibold mb-6 tracking-wide">Connect</h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 flex items-center justify-center bg-shadow/40 border border-candlelight/20 hover:border-candlelight text-ash hover:text-candlelight transition-all duration-300 hover:shadow-glow-subtle group"
                  aria-label={link.name}
                >
                  <span className="transform group-hover:scale-110 transition-transform duration-300">
                    {link.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar - Victorian elegance */}
        <div className="pt-8 border-t border-candlelight/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Copyright */}
            <p className="text-ash/70 text-sm font-body font-light tracking-wide">
              © {currentYear} {personalInfo.name.split(' ')[0]}. All rights reserved.
            </p>
            
            {/* Decorative center element */}
            <div className="hidden md:flex items-center gap-2 opacity-40">
              <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-candlelight/30" />
              <div className="w-1 h-1 rounded-full bg-candlelight/50 animate-shimmer" />
              <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-candlelight/30" />
            </div>
            
            {/* Made with love */}
            <p className="flex items-center gap-2 text-ash/70 text-sm font-body font-light">
              <span>Crafted with</span>
              <Heart className="w-4 h-4 text-blood fill-blood/80 animate-pulse" />
              <span className="tracking-wide">and candlelight</span>
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};
