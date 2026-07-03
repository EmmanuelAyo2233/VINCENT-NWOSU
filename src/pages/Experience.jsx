import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Building, Calendar } from 'lucide-react';
import { experienceData } from '../data/mockData';

export default function Experience() {
  return (
    <div className="page-bg relative min-h-screen pt-32 pb-24 overflow-hidden bg-dot-pattern">
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-stone-550/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Page Header */}
        <motion.div 
          className="text-left mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs uppercase tracking-[0.25em] text-stone-500 font-semibold mb-2 block">
            Academic & Research Roles
          </span>
          <h1 className="text-4xl md:text-6xl font-heading font-black tracking-tight text-stone-900">
            Work Experience
          </h1>
          <p className="text-stone-605 mt-3 text-base md:text-lg max-w-xl leading-relaxed">
            Coordinating research impact projects, conducting phonetic analyses, and leading undergraduate seminars in Linguistics.
          </p>
        </motion.div>

        {/* Vertical Timeline Lists */}
        <div className="relative pl-6 md:pl-8 border-l border-stone-200 space-y-12">
          {experienceData.map((exp, idx) => (
            <motion.div
              key={idx}
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
            >
              {/* Timeline marker icon wrapper */}
              <div className="absolute -left-[39px] md:-left-[47px] top-1.5 w-8 h-8 rounded-full bg-stone-100 border border-stone-300 flex items-center justify-center text-stone-900 ring-4 ring-white shadow-xs">
                <Briefcase className="w-4 h-4" />
              </div>

              {/* Experience Card */}
              <div className="glass-panel rounded-3xl p-6 md:p-8 text-left shadow-sm hover:shadow-md transition-all duration-300 border border-stone-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-heading font-bold text-stone-900">
                      {exp.position}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-stone-500 mt-1">
                      <Building className="w-4 h-4 shrink-0" />
                      <span>{exp.organization}</span>
                    </div>
                  </div>
                  
                  {/* Duration Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-stone-100 text-stone-750 self-start sm:self-center shrink-0 border border-stone-200">
                    <Calendar className="w-3.5 h-3.5" />
                    {exp.duration}
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-stone-605 mb-6">
                  {exp.description}
                </p>

                {/* Skills tags inside Card */}
                <div className="border-t border-stone-200 pt-4">
                  <h4 className="text-[10px] uppercase font-bold tracking-wider text-stone-450 mb-2">
                    Key competencies applied
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-stone-100 text-stone-600 border border-stone-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
