'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { skills } from '@/lib/data';

export const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const categories = {
    frontend: { name: 'Frontend', color: 'candlelight', hex: '#C9A86C' },
    backend: { name: 'Backend', color: 'ghost-blue', hex: '#6B8C9E' },
    tools: { name: 'Tools & DevOps', color: 'blood', hex: '#8B3A3A' },
    other: { name: 'Other', color: 'ash', hex: '#A39E96' },
  };

  return (
    <section id="skills" className="relative py-32 overflow-hidden bg-gradient-to-b from-abyss via-void to-midnight">
      
      {/* Atmospheric background glow */}
      <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] bg-gradient-radial from-ghost-blue/10 to-transparent rounded-full blur-[130px] opacity-30" />
      
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
                Technical Arsenal
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-candlelight animate-pulse-glow" style={{ animationDelay: '0.5s' }} />
            </div>
            
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-parchment mb-6 tracking-tight">
              Skills &{' '}
              <span className="inline-block bg-gradient-to-r from-candlelight via-gold-light to-ghost-blue bg-clip-text text-transparent">
                Expertise
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

        {/* Skills by category */}
        <div className="space-y-16">
          {Object.entries(categories).map(([key, category], catIndex) => {
            const categorySkills = skills.filter((skill) => skill.category === key);
            if (categorySkills.length === 0) return null;

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.3 + catIndex * 0.1 }}
              >
                {/* Category title with decorative line */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: category.hex }} />
                  <h3 className="text-2xl font-display font-semibold text-parchment">
                    {category.name}
                  </h3>
                  <div className="flex-1 h-[1px] bg-gradient-to-r from-candlelight/20 to-transparent" style={{ 
                    background: `linear-gradient(to right, ${category.hex}30, transparent)` 
                  }} />
                </div>

                {/* Skills grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categorySkills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.6, delay: 0.4 + catIndex * 0.1 + index * 0.05 }}
                      className="group relative"
                    >
                      <div className="relative p-5 bg-shadow/40 border border-candlelight/15 backdrop-blur-sm transition-all duration-500 hover:border-candlelight/40 hover:shadow-glow-gold hover:-translate-y-0.5">
                        
                        {/* Corner ornaments */}
                        <div className="absolute top-0 left-0 w-6 h-6 border-t border-l opacity-20 group-hover:opacity-50 transition-all duration-500" style={{ borderColor: category.hex }} />
                        <div className="absolute top-0 right-0 w-6 h-6 border-t border-r opacity-20 group-hover:opacity-50 transition-all duration-500" style={{ borderColor: category.hex }} />
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l opacity-20 group-hover:opacity-50 transition-all duration-500" style={{ borderColor: category.hex }} />
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r opacity-20 group-hover:opacity-50 transition-all duration-500" style={{ borderColor: category.hex }} />
                        
                        {/* Skill name and level */}
                        <div className="relative flex items-center justify-between mb-3">
                          <span className="text-parchment font-body font-medium text-sm">
                            {skill.name}
                          </span>
                          <span
                            className="text-sm font-body font-semibold"
                            style={{ color: category.hex }}
                          >
                            {skill.level}%
                          </span>
                        </div>

                        {/* Progress bar */}
                        <div className="relative h-1.5 bg-void border border-ash/10 overflow-hidden">
                          <motion.div
                            className="absolute inset-y-0 left-0"
                            style={{
                              background: `linear-gradient(90deg, ${category.hex}, ${category.hex}60)`,
                            }}
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                            transition={{
                              duration: 1,
                              delay: 0.5 + catIndex * 0.1 + index * 0.05,
                              ease: "easeOut",
                            }}
                          />
                        </div>

                        {/* Hover glow */}
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                          style={{
                            background: `radial-gradient(circle at center, ${category.hex}15, transparent 70%)`,
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};
