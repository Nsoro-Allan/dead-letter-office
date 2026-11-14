'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, X, ArrowUpRight } from 'lucide-react';
import { projects } from '@/lib/data';
import { Project } from '@/lib/types';

export const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-32 overflow-hidden bg-gradient-to-b from-midnight via-void to-abyss">
      
      {/* Atmospheric background glow */}
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-gradient-radial from-ghost-blue/10 to-transparent rounded-full blur-[140px] opacity-40" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-gradient-radial from-candlelight/8 to-transparent rounded-full blur-[130px] opacity-30" />
      
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
                Portfolio
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-candlelight animate-pulse-glow" style={{ animationDelay: '0.5s' }} />
            </div>
            
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-parchment mb-6 tracking-tight">
              Featured{' '}
              <span className="inline-block bg-gradient-to-r from-candlelight via-gold-light to-ghost-blue bg-clip-text text-transparent">
                Creations
              </span>
            </h2>
            
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-24 h-[1px] bg-gradient-to-r from-transparent to-candlelight/30" />
              <div className="w-2 h-2 rounded-full bg-candlelight/40" />
              <div className="w-24 h-[1px] bg-gradient-to-l from-transparent to-candlelight/30" />
            </div>
            
            <p className="text-lg text-ash max-w-2xl mx-auto leading-relaxed font-body font-light">
              A curated collection of digital experiences, each crafted with meticulous attention to detail and atmospheric elegance
            </p>
          </motion.div>
        </div>

        {/* Projects grid - mysterious artifacts */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className="group relative cursor-pointer"
            >
              {/* Artifact card */}
              <div className="relative h-full p-8 bg-shadow/40 border border-candlelight/15 backdrop-blur-sm transition-all duration-500 hover:border-candlelight/40 hover:shadow-glow-gold hover:-translate-y-1">
                
                {/* Corner ornaments */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-candlelight/20 group-hover:border-candlelight/50 transition-colors duration-500" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-candlelight/20 group-hover:border-candlelight/50 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-candlelight/20 group-hover:border-candlelight/50 transition-colors duration-500" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-candlelight/20 group-hover:border-candlelight/50 transition-colors duration-500" />
                
                {/* Category badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1.5 bg-candlelight/5 border border-candlelight/25 text-candlelight/80 text-xs font-body uppercase tracking-widest font-light">
                    {project.category}
                  </span>
                  <ArrowUpRight className="w-5 h-5 text-candlelight opacity-0 -translate-y-2 translate-x-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-500" />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-parchment group-hover:text-candlelight transition-colors duration-500 leading-tight">
                    {project.title}
                  </h3>
                  
                  <p className="text-ash/80 leading-relaxed line-clamp-3 font-body font-light">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 pt-4">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-void/60 border border-candlelight/10 text-ash/70 text-xs font-body rounded-sm"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="px-3 py-1 text-candlelight/60 text-xs font-body">
                        +{project.techStack.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Subtle hover glow overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-candlelight/0 via-candlelight/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Modal - Victorian elegance */}
      {selectedProject && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight/95 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            className="relative max-w-4xl w-full bg-gradient-to-br from-void via-shadow to-void border border-candlelight/30 p-10 md:p-12 max-h-[90vh] overflow-y-auto shadow-glow-gold"
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-candlelight/50" />
            <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-candlelight/50" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-candlelight/50" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-candlelight/50" />
            
            {/* Close button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center border border-candlelight/30 hover:border-candlelight bg-shadow/50 hover:bg-shadow text-candlelight transition-all duration-300 hover:shadow-glow-subtle"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="space-y-8">
              {/* Header */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-candlelight animate-shimmer" />
                  <span className="px-4 py-1.5 bg-candlelight/5 border border-candlelight/25 text-candlelight/80 text-xs font-body uppercase tracking-ultra-wide font-light">
                    {selectedProject.category}
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-candlelight animate-shimmer" style={{ animationDelay: '0.7s' }} />
                </div>
                
                <h3 className="text-4xl md:text-5xl font-display font-bold text-parchment mb-6 leading-tight">
                  {selectedProject.title}
                </h3>
                
                <div className="flex items-center gap-3">
                  <div className="w-16 h-[1px] bg-gradient-to-r from-candlelight/50 to-transparent" />
                  <div className="w-1 h-1 rounded-full bg-candlelight/50" />
                </div>
              </div>

              {/* Description */}
              <p className="text-lg text-ash/90 leading-relaxed font-body font-light">
                {selectedProject.longDescription || selectedProject.description}
              </p>

              {/* Tech stack */}
              <div>
                <h4 className="text-xl font-display font-semibold text-parchment mb-4 tracking-wide">
                  Technologies Employed
                </h4>
                <div className="flex flex-wrap gap-3">
                  {selectedProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2.5 bg-void/80 border border-candlelight/20 text-ash hover:text-parchment hover:border-candlelight/40 font-body transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-4 pt-6 border-t border-candlelight/10">
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-shadow/60 border border-candlelight/30 text-candlelight font-body font-medium hover:border-candlelight hover:shadow-glow-gold transition-all duration-500 hover:scale-[1.02] group"
                  >
                    <ExternalLink className="w-4 h-4 transition-transform group-hover:rotate-45 duration-300" />
                    <span className="tracking-wide">View Live Site</span>
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-void/50 border border-ghost-blue/30 text-ghost-blue hover:text-parchment hover:border-ghost-blue font-body font-medium transition-all duration-500 hover:scale-[1.02] group"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span className="tracking-wide">Source Code</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};
