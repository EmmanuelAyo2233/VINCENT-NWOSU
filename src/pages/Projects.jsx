import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Volume2, Database, BookOpen } from 'lucide-react';
import { projectsData } from '../data/mockData';

// Dynamic background icons based on project index
const ProjectIcon = ({ idx, className }) => {
  if (idx === 0) return <Database className={className} />;
  if (idx === 1) return <Volume2 className={className} />;
  return <BookOpen className={className} />;
};

export default function Projects() {
  return (
    <div className="page-bg relative min-h-screen pt-32 pb-24 overflow-hidden bg-grid-pattern">
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-stone-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Page Header */}
        <motion.div 
          className="text-left mb-16 md:mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs uppercase tracking-[0.25em] text-stone-500 font-semibold mb-2 block">
            Research & Fieldwork
          </span>
          <h1 className="text-4xl md:text-6xl font-heading font-black tracking-tight text-black">
            Field Documentation
          </h1>
          <p className="text-stone-600 mt-3 text-base md:text-lg max-w-2xl leading-relaxed">
            A selection of empirical research efforts, language corpora collection, phonetic analysis, and speech documentation projects.
          </p>
        </motion.div>

        {/* Alternating Projects List */}
        <div className="space-y-24 md:space-y-32">
          {projectsData.map((project, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={project.id}
                className={`flex flex-col lg:flex-row items-center gap-10 md:gap-16 ${
                  isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                {/* Left/Right: Beautiful Image Placeholder Container */}
                <div className="flex-1 w-full relative group">
                  <div 
                    className="w-full aspect-[16/10] rounded-3xl overflow-hidden shadow-lg border border-stone-200 flex items-center justify-center relative cursor-pointer"
                    style={{ background: project.image }}
                  >
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500" />
                    
                    {/* Abstract Floating Graphic inside project image */}
                    <ProjectIcon 
                      idx={idx} 
                      className="w-20 h-20 text-white/95 drop-shadow-md group-hover:scale-105 group-hover:rotate-3 transition-all duration-500" 
                    />

                    {/* Faux browser header for premium software touch */}
                    <div className="absolute top-0 left-0 right-0 h-6 bg-black/20 backdrop-blur-xs flex items-center px-4 gap-1.5 border-b border-white/5">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                      <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                      <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                    </div>
                  </div>
                </div>

                {/* Left/Right: Text details */}
                <div className="flex-1 text-left flex flex-col gap-6">
                  <span className="text-[10px] tracking-widest font-mono uppercase text-stone-500 font-bold">
                    0{idx + 1} // Field Research
                  </span>
                  
                  <div>
                    <h2 className="text-3xl font-heading font-black tracking-tight text-black mb-2">
                      {project.title}
                    </h2>
                    <p className="text-sm font-medium text-stone-500 italic">
                      {project.tagline}
                    </p>
                  </div>

                  <p className="text-sm leading-relaxed text-stone-800">
                    {project.description}
                  </p>

                  {/* Results box */}
                  <div className="p-5 rounded-2xl bg-stone-100/50 border border-stone-200">
                    <h4 className="text-xs uppercase font-bold tracking-wider text-stone-900 mb-1">
                      Key Contribution
                    </h4>
                    <p className="text-xs text-stone-700 leading-normal">
                      {project.results}
                    </p>
                  </div>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-full text-xs font-mono bg-stone-100 text-stone-700 border border-stone-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* CTA link */}
                  <div className="pt-2">
                    <Link
                      to={`/projects/${project.id}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-black border-b border-black hover:text-stone-750 hover:border-stone-750 group cursor-pointer pb-0.5"
                    >
                      Read Case Study
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
