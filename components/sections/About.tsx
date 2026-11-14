'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Sparkles, Zap } from 'lucide-react';
import { personalInfo } from '@/lib/data';

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: Code2,
      title: "Clean Architecture",
      description: "Building scalable, maintainable solutions with modern best practices"
    },
    {
      icon: Sparkles,
      title: "Design Excellence",
      description: "Transforming visions into pixel-perfect, immersive experiences"
    },
    {
      icon: Zap,
      title: "Performance First",
      description: "Optimizing every millisecond for lightning-fast interactions"
    }
  ];

  return (
    <section id="about" className="relative py-32 overflow-hidden bg-gradient-to-b from-midnight via-void to-abyss">
      
      {/* Atmospheric background glow */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-gradient-radial from-candlelight/8 to-transparent rounded-full blur-[130px] opacity-30" />
      
      <motion.div
        ref={ref}
        className="relative z-10 container mx-auto px-6 max-w-7xl"
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
                About Me
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-candlelight animate-pulse-glow" style={{ animationDelay: '0.5s' }} />
            </div>
            
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-parchment mb-6 tracking-tight">
              Crafting Digital{' '}
              <span className="inline-block bg-gradient-to-r from-candlelight via-gold-light to-ghost-blue bg-clip-text text-transparent">
                Experiences
              </span>
            </h2>
            
            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-24 h-[1px] bg-gradient-to-r from-transparent to-candlelight/30" />
              <div className="w-2 h-2 rounded-full bg-candlelight/40" />
              <div className="w-24 h-[1px] bg-gradient-to-l from-transparent to-candlelight/30" />
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left: Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="relative p-8 bg-shadow/40 border border-candlelight/15 backdrop-blur-sm transition-all duration-500">
              {/* Corner ornaments */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-candlelight/20" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-candlelight/20" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-candlelight/20" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-candlelight/20" />
              
              <p className="relative text-xl leading-relaxed text-ash/90 font-body font-light">
                {personalInfo.bio}
              </p>
              
              <div className="relative flex items-center gap-3 mt-8 pt-6 border-t border-candlelight/10">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-candlelight animate-pulse-glow" />
                  <span className="text-ash/80 font-body text-sm">Available for projects</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Features */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                className="group relative"
              >
                <div className="relative p-6 bg-shadow/40 border border-candlelight/15 backdrop-blur-sm transition-all duration-500 hover:border-candlelight/40 hover:shadow-glow-gold hover:-translate-y-0.5">
                  
                  {/* Corner ornaments */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-candlelight/20 group-hover:border-candlelight/50 transition-colors duration-500" />
                  <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-candlelight/20 group-hover:border-candlelight/50 transition-colors duration-500" />
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-candlelight/20 group-hover:border-candlelight/50 transition-colors duration-500" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-candlelight/20 group-hover:border-candlelight/50 transition-colors duration-500" />
                  
                  {/* Icon and content */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-shadow border border-candlelight/20 flex items-center justify-center">
                      <feature.icon className={`w-6 h-6 ${index === 1 ? 'text-ghost-blue' : 'text-candlelight'}`} />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-display font-semibold text-parchment mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-ash/80 font-body leading-relaxed font-light">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-b from-candlelight/0 via-candlelight/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};
