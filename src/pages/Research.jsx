import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import { researchInterests } from '../data/mockData';

// Helper to render icons dynamically
const ResearchIcon = ({ name, className }) => {
  const IconComponent = Icons[name] || Icons.BookOpen;
  return <IconComponent className={className} />;
};

export default function Research() {
  const [activeFilter, setActiveFilter] = useState('All');

  // Extract unique categories
  const categories = ['All', ...new Set(researchInterests.map(item => item.category))];

  // Filter items
  const filteredInterests = activeFilter === 'All' 
    ? researchInterests 
    : researchInterests.filter(item => item.category === activeFilter);

  return (
    <div className="page-bg relative min-h-screen pt-32 pb-24 overflow-hidden bg-dot-pattern">
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-stone-550/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Page Header */}
        <motion.div 
          className="text-left mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs uppercase tracking-[0.25em] text-stone-500 font-semibold mb-2 block">
            Academic Fields
          </span>
          <h1 className="text-4xl md:text-6xl font-heading font-black tracking-tight text-stone-900">
            Research Interests
          </h1>
          <p className="text-stone-605 mt-3 text-base md:text-lg max-w-2xl leading-relaxed">
            Investigating foundational questions in acoustic phonology, prosodic structures, child-directed speech, and multimodal language documentation.
          </p>
        </motion.div>

        {/* Filter Bar */}
        <motion.div 
          className="flex flex-wrap items-center gap-2 mb-12 border-b border-stone-200 pb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 relative cursor-pointer ${
                activeFilter === cat
                  ? 'text-white font-bold'
                  : 'text-stone-500 hover:text-stone-850'
              }`}
            >
              <span className="relative z-10">{cat}</span>
              {activeFilter === cat && (
                <motion.span
                  layoutId="activeFilterBg"
                  className="absolute inset-0 bg-stone-900 rounded-full z-0 shadow-sm"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Grid of Cards */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredInterests.map((interest) => (
              <motion.div
                layout
                key={interest.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="glass-panel rounded-3xl p-6 md:p-8 text-left shadow-sm hover:shadow-md transition-shadow group flex flex-col gap-4 relative overflow-hidden border border-stone-200"
              >
                <div className="relative z-10 flex flex-col gap-4">
                  {/* Card Icon & Category */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-900 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform border border-stone-200/50">
                      <ResearchIcon name={interest.iconName} className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400">
                      {interest.category}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <div>
                    <h3 className="text-xl font-heading font-bold text-stone-900 mb-3 group-hover:text-stone-605 transition-colors">
                      {interest.title}
                    </h3>
                    <p className="text-sm text-stone-600 leading-relaxed">
                      {interest.description}
                    </p>
                  </div>
                </div>

                {/* Monochrome bottom accent line */}
                <div className="w-full h-[2px] bg-stone-900 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 absolute bottom-0 left-0" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
}
