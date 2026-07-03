import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, GraduationCap, Award, Database, Volume2, PenTool } from 'lucide-react';
import { profileInfo, aboutTimeline } from '../data/mockData';

export default function About() {
  return (
    <div className="page-bg relative min-h-screen pt-32 pb-24 overflow-hidden bg-grid-pattern">
      {/* Background radial lights */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-stone-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Header Title */}
        <motion.div 
          className="text-left mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs uppercase tracking-[0.25em] text-stone-500 font-semibold mb-2 block">
            Biography
          </span>
          <h1 className="text-4xl md:text-6xl font-heading font-black tracking-tight text-black">
            About Myself
          </h1>
        </motion.div>

        {/* Split Biography Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-28">
          
          {/* Left: Narrative Bio */}
          <motion.div 
            className="lg:col-span-7 text-left space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h3 className="text-2xl font-heading font-bold text-black leading-snug">
              Investigating the structural properties of language through acoustics, phonetics, and multimodal gestures.
            </h3>
            <p className="text-stone-600 leading-relaxed text-base">
              My academic research centers on phonological and phonetic analysis of Niger-Congo languages, with a particular focus on the Igbo language. I study how speech timing interacts with co-speech gestures, child-directed speech, and tone-tune correspondence in liturgical and storytelling contexts.
            </p>
            <p className="text-stone-600 leading-relaxed text-base">
              I hold M.A. degrees in Linguistics and Cognitive Science from the University of Delaware and English Language/Philosophy from Ahmadu Bello University. I am currently completing my doctoral research at the University of Calgary, and work to document and preserve endangered oral narratives.
            </p>
            
            {/* Core Competencies List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-stone-800 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading font-bold text-sm text-stone-900">Acoustic Analysis</h4>
                  <p className="text-xs text-stone-500 mt-0.5">Praat pitch-tracking, F0 downstep models, and voice quality mapping.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-stone-800 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading font-bold text-sm text-stone-900">Multimodal Alignment</h4>
                  <p className="text-xs text-stone-500 mt-0.5">ELAN microsecond-level synchronization of co-speech hand gestures.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Monochrome Infographic */}
          <motion.div 
            className="lg:col-span-5 w-full flex justify-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-full max-w-sm aspect-square bg-stone-50 rounded-3xl p-6 border border-stone-200 flex items-center justify-center overflow-hidden group">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-stone-100 blur-2xl group-hover:scale-105 transition-transform duration-700" />
              
              {/* Graphic Element: Research Stack */}
              <div className="relative w-full h-full flex flex-col justify-between p-4 z-10">
                <div className="flex justify-between items-center text-stone-400">
                  <GraduationCap className="w-7 h-7 text-stone-800" />
                  <span className="text-[9px] font-mono tracking-widest font-bold">RESEARCH METRICS</span>
                </div>
                
                {/* Academic Stack Layers */}
                <div className="flex flex-col gap-2.5 my-6">
                  <div className="w-full h-6 rounded-lg bg-stone-950 text-stone-100 text-[10px] font-mono flex items-center px-3 border border-white/5 shadow-md">
                    <Database className="w-3.5 h-3.5 mr-2" />
                    ELAN: ANNOTATION LAYER
                  </div>
                  <div className="w-11/12 h-6 rounded-lg bg-stone-800 text-stone-100 text-[10px] font-mono flex items-center px-3 shadow-md self-center">
                    <Volume2 className="w-3.5 h-3.5 mr-2" />
                    PRAAT: ACOUSTIC TARGETS
                  </div>
                  <div className="w-10/12 h-6 rounded-lg bg-stone-200 text-stone-700 text-[10px] font-mono flex items-center px-3 border border-stone-300 shadow-sm self-center">
                    <PenTool className="w-3.5 h-3.5 mr-2" />
                    R / PYTHON: STATISTICAL RUNS
                  </div>
                </div>

                <div className="flex justify-between items-center text-stone-400">
                  <span className="text-[9px] font-mono tracking-widest font-bold">LABPHON METHODOLOGY</span>
                  <Award className="w-7 h-7 text-stone-800" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Professional timeline */}
        <div className="mt-12 text-left max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-black tracking-tight text-black">
              Education & Career Journey
            </h2>
            <p className="text-sm text-stone-500 mt-2">Milestones and research contributions over time</p>
          </div>

          <div className="relative pl-6 sm:pl-8 border-l border-stone-200 space-y-12">
            {aboutTimeline.map((item, index) => (
              <motion.div 
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Timeline node dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-stone-900 ring-4 ring-white shadow-sm" />
                
                {/* Year Badge */}
                <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold bg-stone-100 text-stone-850 mb-2">
                  {item.year}
                </span>

                {/* Timeline Details */}
                <h3 className="text-lg font-heading font-bold text-black">
                  {item.title}
                </h3>
                <p className="text-sm text-stone-500 mt-1 max-w-2xl leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
