import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';

const researchInterests = [
  {
    id: 'tone-prosody',
    category: 'Phonetics & Phonology',
    title: 'Tone & Prosody',
    description: 'I investigate the phonetic realization of tone and prosodic structure in Igbo and other Niger-Congo languages, with a focus on the phonetics–phonology interface. My work examines how tonal and prosodic patterns are encoded in the acoustic signal and how they interact with other levels of linguistic structure.',
    iconName: 'Volume2'
  },
  {
    id: 'acoustics-verbal-arts',
    category: 'Phonetics & Phonology',
    title: 'Acoustics of Verbal Arts',
    description: "I study the acoustic properties of Igbo verbal arts — including storytelling, ritual chants (mbem), and children's songs — using laboratory phonology methods. This work brings experimental phonetics to bear on oral literary traditions, revealing how performers manipulate prosody, voice quality, and rhythm to create meaning.",
    iconName: 'Mic'
  },
  {
    id: 'co-speech-gestures',
    category: 'Multimodal Communication',
    title: 'Co-Speech Gestures',
    description: 'I examine the temporal relationship between speech and gesture, particularly how prosodic and tonal structure predicts the timing of co-speech gestures in Igbo. This work contributes to our understanding of the multimodal nature of human communication and the grammatical basis of gestural timing.',
    iconName: 'Move'
  },
  {
    id: 'child-directed-speech',
    category: 'Development',
    title: 'Child-Directed Speech',
    description: 'I investigate how tonal and prosodic properties of speech are adapted when Igbo speakers address young children, exploring the intersection of phonetics, language acquisition, and caregiver communication.',
    iconName: 'Heart'
  },
  {
    id: 'language-documentation',
    category: 'Documentation',
    title: 'Language Documentation',
    description: 'I am committed to the documentation and typological study of endangered and understudied African languages, with active projects on Igbo and Ika, an endangered Igboid language of Nigeria.',
    iconName: 'BookOpen'
  }
];

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

        {/* Grid of Cards (2 Columns on Desktop) */}
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
                className={`glass-panel rounded-3xl p-6 md:p-8 text-left shadow-sm hover:shadow-md transition-shadow group flex flex-col gap-4 relative overflow-hidden border border-stone-200 ${
                  activeFilter === 'All' && interest.id === 'language-documentation' ? 'md:col-span-2' : ''
                }`}
              >
                <div className="relative z-10 flex flex-col gap-4">
                  {/* Card Icon */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-900 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform border border-stone-200/50">
                      <ResearchIcon name={interest.iconName} className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Desc */}
                  <div>
                    <h3 className="text-xl font-heading font-bold text-stone-900 mb-3 group-hover:text-stone-750 transition-colors">
                      {interest.title}
                    </h3>
                    <p className="text-sm md:text-base text-stone-600 leading-relaxed font-body">
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
