import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 400); // Small delay after 100% before transition
          return 100;
        }
        const diff = Math.random() * 15;
        return Math.min(oldProgress + diff, 100);
      });
    }, 150);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-stone-950 flex flex-col items-center justify-center z-50 text-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="w-full max-w-xs flex flex-col items-center">
        {/* Animated Initials Logo */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-white">
            VN.
          </h1>
        </motion.div>

        {/* Brand Name Text Reveal */}
        <motion.div
          className="overflow-hidden mb-6 h-6 flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <span className="text-xs uppercase tracking-[0.25em] text-stone-400">
            Vincent Nwosu
          </span>
        </motion.div>

        {/* Progress Bar Container */}
        <div className="w-full h-[2px] bg-stone-800 rounded-full overflow-hidden relative">
          <motion.div
            className="absolute top-0 left-0 h-full bg-white"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut' }}
          />
        </div>

        {/* Progress Percentage */}
        <motion.span
          className="mt-3 text-xs font-mono text-stone-500 tracking-wider"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          {Math.floor(progress)}%
        </motion.span>
      </div>
    </motion.div>
  );
}
