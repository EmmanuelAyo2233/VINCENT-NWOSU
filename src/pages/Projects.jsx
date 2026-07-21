import React from 'react';
import { motion } from 'framer-motion';
import { Volume2, Database, BookOpen } from 'lucide-react';
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
        
        {/* Alternating Projects List */}
        <div className="space-y-20 md:space-y-24">
          {projectsData.map((project, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={project.id}
                className="flex flex-col lg:flex-row items-center gap-10 md:gap-16 lg:flex-row"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                {/* Left/Right: Beautiful Image Container */}
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
                <div className="flex-1 text-left flex flex-col gap-4">
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

                  <p className="text-sm md:text-base leading-relaxed text-stone-605 font-body">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
