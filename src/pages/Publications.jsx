import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Search, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { publicationsData } from '../data/mockData';

export default function Publications() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [expandedPub, setExpandedPub] = useState(null);

  // Extract years and categories
  const categories = ['All', ...new Set(publicationsData.map(pub => pub.category))];
  const years = ['All', ...new Set(publicationsData.map(pub => pub.year))].sort((a, b) => b - a);

  // Filter logic
  const filteredPublications = publicationsData.filter((pub) => {
    const matchesSearch = pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pub.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pub.abstract.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || pub.category === selectedCategory;
    const matchesYear = selectedYear === 'All' || pub.year === selectedYear;

    return matchesSearch && matchesCategory && matchesYear;
  });

  const toggleAbstract = (id) => {
    if (expandedPub === id) {
      setExpandedPub(null);
    } else {
      setExpandedPub(id);
    }
  };

  return (
    <div className="page-bg relative min-h-screen pt-32 pb-24 overflow-hidden bg-dot-pattern">
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-stone-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Page Header */}
        <motion.div 
          className="text-left mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs uppercase tracking-[0.25em] text-stone-500 font-semibold mb-2 block">
            Academic Works
          </span>
          <h1 className="text-4xl md:text-6xl font-heading font-black tracking-tight text-stone-900">
            Publications
          </h1>
          <p className="text-stone-605 mt-3 text-base md:text-lg max-w-2xl leading-relaxed">
            A list of scholarly papers published in peer-reviewed journals, book chapters, and research preprints.
          </p>
        </motion.div>

        {/* Filter Controls Bar */}
        <div className="glass-panel rounded-3xl p-6 mb-12 flex flex-col md:flex-row items-center gap-4 shadow-sm border border-stone-200">
          {/* Search bar */}
          <div className="relative w-full md:flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, author, abstract..."
              className="w-full pl-9 pr-4 py-2.5 rounded-2xl border border-stone-200 bg-white text-stone-900 text-sm focus:outline-none focus:border-stone-900 transition-colors"
            />
          </div>

          {/* Category Dropdown */}
          <div className="flex w-full md:w-auto items-center gap-2">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider hidden sm:inline">Type:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-2xl border border-stone-200 bg-white text-stone-900 text-sm focus:outline-none focus:border-stone-900 transition-colors cursor-pointer"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Year Dropdown */}
          <div className="flex w-full md:w-auto items-center gap-2">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider hidden sm:inline">Year:</span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-2xl border border-stone-200 bg-white text-stone-900 text-sm focus:outline-none focus:border-stone-900 transition-colors cursor-pointer"
            >
              {years.map(yr => (
                <option key={yr} value={yr}>{yr}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Publications Grid */}
        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredPublications.length > 0 ? (
              filteredPublications.map((pub) => {
                const isExpanded = expandedPub === pub.id;
                return (
                  <motion.div
                    key={pub.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="glass-panel rounded-3xl p-6 md:p-8 text-left shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group border border-stone-200"
                  >
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-4">
                      <div className="space-y-2">
                        {/* Tags */}
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-stone-100 text-stone-700 border border-stone-200">
                            {pub.category}
                          </span>
                          <span className="flex items-center gap-1 text-[10px] font-mono text-stone-400">
                            <Calendar className="w-3.5 h-3.5" />
                            {pub.year}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg md:text-xl font-heading font-bold text-stone-900 group-hover:text-stone-600 transition-colors leading-snug">
                          {pub.title}
                        </h3>
                        
                        {/* Authors */}
                        <p className="text-xs text-stone-500 font-medium">
                          {pub.authors}
                        </p>
                      </div>

                      {/* Download PDF CTA */}
                      <a
                        href={pub.pdfLink}
                        download="Vincent_Nwosu_CV.pdf"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-950 hover:text-white text-stone-950 text-xs font-semibold tracking-wide transition-all shrink-0 cursor-pointer self-start sm:self-center shadow-xs"
                      >
                        <Download className="w-3.5 h-3.5" />
                        PDF
                      </a>
                    </div>

                    {/* Collapsible Abstract */}
                    <div className="border-t border-stone-200 pt-4 mt-4">
                      <button
                        onClick={() => toggleAbstract(pub.id)}
                        className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-stone-800 hover:text-stone-500 cursor-pointer border-b border-stone-800 pb-0.5"
                      >
                        {isExpanded ? (
                          <>
                            Hide Abstract
                            <ChevronUp className="w-4 h-4" />
                          </>
                        ) : (
                          <>
                            Read Abstract
                            <ChevronDown className="w-4 h-4" />
                          </>
                        )}
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className="text-xs text-stone-600 leading-relaxed mt-3 pt-1 border-l-2 border-stone-300 pl-4 font-normal">
                              {pub.abstract}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="text-center py-12">
                <p className="text-stone-500">No publications match your active filter criteria.</p>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
