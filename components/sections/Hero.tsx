'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { personalInfo } from '@/lib/data';

export const Hero = () => {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Elegant dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-abyss via-void to-midnight" />
      
      {/* Deep vignette for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(6,5,10,0.6)_100%)]" />
      
      {/* Soft atmospheric glow orbs - very subtle */}
      <motion.div
        className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full blur-[140px] opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(201, 168, 108, 0.25) 0%, transparent 70%)' }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15],
          x: [0, 30, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div
        className="absolute bottom-1/3 right-0 w-[450px] h-[450px] rounded-full blur-[130px] opacity-15"
        style={{ background: 'radial-gradient(circle, rgba(107, 140, 158, 0.3) 0%, transparent 70%)' }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.12, 0.2, 0.12],
          x: [0, -20, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="relative z-10 container mx-auto px-6 max-w-6xl">
        <div className="text-center space-y-10">
          
          {/* Elegant intro text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex items-center justify-center gap-6"
          >
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-candlelight/40 to-candlelight/60" />
            <span className="text-candlelight/70 font-body text-sm tracking-widest-xl uppercase font-light">
              Enter the Manor
            </span>
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent via-candlelight/40 to-candlelight/60" />
          </motion.div>

          {/* Main title - luxurious and elegant */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative"
          >
            <span className="block font-display text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-bold leading-[0.95] tracking-tight">
              <span className="inline-block bg-gradient-to-b from-parchment via-candlelight to-parchment bg-clip-text text-transparent glow-text-gold">
                {personalInfo.name}
              </span>
            </span>
          </motion.h1>

          {/* Subtitle with elegant styling */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="text-2xl md:text-3xl lg:text-4xl font-display italic text-ash tracking-wide"
          >
            {personalInfo.title}
          </motion.p>

          {/* Decorative divider with candle glow */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.9 }}
            className="flex items-center justify-center gap-3"
          >
            <div className="w-2 h-2 rounded-full bg-candlelight/60 animate-pulse-glow" />
            <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-candlelight/50 to-transparent" />
            <div className="w-2 h-2 rounded-full bg-candlelight/60 animate-pulse-glow" style={{ animationDelay: '0.5s' }} />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="text-lg md:text-xl text-ash/90 max-w-2xl mx-auto leading-relaxed font-body font-light"
          >
            {personalInfo.tagline}
          </motion.p>

          {/* Refined CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.3 }}
            className="pt-12"
          >
            <button
              onClick={scrollToAbout}
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-shadow/50 border border-candlelight/30 rounded-sm font-body font-medium text-candlelight overflow-hidden transition-all duration-500 hover:border-candlelight hover:shadow-glow-gold hover:scale-[1.02]"
            >
              <span className="relative z-10 tracking-wide">Explore the Collection</span>
              <ChevronDown className="relative z-10 w-5 h-5 transition-transform duration-500 group-hover:translate-y-1" />
              
              {/* Subtle hover glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-candlelight/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Elegant shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-candlelight/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
            </button>
          </motion.div>

        </div>
      </div>

      {/* Minimal scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3 text-candlelight/40"
        >
          <span className="text-xs font-body tracking-widest uppercase font-light">Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-candlelight/40 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
};
