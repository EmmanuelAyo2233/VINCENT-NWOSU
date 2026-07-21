import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';

export default function CV() {
  return (
    <div className="page-bg relative min-h-screen pt-32 pb-24 overflow-hidden bg-grid-pattern flex flex-col justify-center items-center">
      {/* Soft background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-stone-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-xl mx-auto px-6 md:px-8 relative z-10 text-center flex flex-col items-center">
        
        {/* Animated Icon Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-20 h-20 rounded-3xl bg-stone-900 text-white flex items-center justify-center shadow-lg border border-stone-850 mb-8"
        >
          <FileText className="w-10 h-10" />
        </motion.div>

        {/* Text Area */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4 mb-8"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-stone-500 font-semibold block">
            Academic Credentials
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-black tracking-tight text-stone-900">
            Curriculum Vitae
          </h1>
          <p className="text-stone-605 text-sm md:text-base leading-relaxed max-w-md">
            Click below to download the complete CV PDF detailing Vincent Nwosu's academic background, research experience, publications, and grants.
          </p>
        </motion.div>

        {/* Download Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <a
            href="/Vincent_Nwosu_CV.pdf"
            download="Vincent_Nwosu_CV.pdf"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-stone-900 text-stone-50 hover:bg-stone-800 text-base font-semibold transition-all hover:-translate-y-[2px] shadow-lg hover:shadow-xl cursor-pointer"
          >
            <Download className="w-5 h-5" />
            Download CV (PDF)
          </a>
        </motion.div>

      </div>
    </div>
  );
}
