import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ArrowRight, Linkedin, Twitter, Github, Mail, ArrowDown } from 'lucide-react';
import { profileInfo, trustedOrganizations } from '../data/mockData';

export default function Home() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) - 0.5;
      const y = (e.clientY / innerHeight) - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const graphicX = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);
  const graphicY = useTransform(mouseY, [-0.5, 0.5], [-8, 8]);

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-hidden page-bg">
      {/* Background Subtle Textures */}
      <div className="absolute inset-0 bg-dot-pattern z-0 pointer-events-none opacity-60" />

      {/* Hero Section Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 w-full flex-grow flex flex-col lg:flex-row items-center justify-between gap-12 py-28 lg:py-36 pt-32">
        
        {/* ===== LEFT SIDE INFO ===== */}
        <motion.div 
          className="flex-1 text-left"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <span className="text-xs uppercase tracking-[0.25em] text-stone-500 font-semibold mb-4 block">
            Linguistics & Phonology Researcher
          </span>
          <h1 className="text-5xl md:text-7xl font-heading font-black tracking-tight mb-4 text-black leading-none">
            {profileInfo.name}
          </h1>
          <p className="text-sm md:text-base font-body text-stone-600 mb-6 leading-relaxed max-w-xl">
            {profileInfo.bio}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <Link
              to="/publications"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-stone-900 hover:bg-stone-850 text-white text-sm font-semibold transition-all hover:-translate-y-[1px] shadow-sm"
            >
              Publications & Papers
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-stone-300 bg-transparent text-stone-900 hover:bg-stone-50 text-sm font-semibold transition-all hover:-translate-y-[1px]"
            >
              Contact Me
            </Link>
          </div>

          {/* Social Icons Row */}
          <div className="flex items-center gap-5 text-stone-550">
            <a href={profileInfo.socials.linkedin} target="_blank" rel="noopener noreferrer"
              className="hover:text-stone-950 transition-colors p-2 rounded-full hover:bg-stone-100">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href={profileInfo.socials.github} target="_blank" rel="noopener noreferrer"
              className="hover:text-stone-950 transition-colors p-2 rounded-full hover:bg-stone-100">
              <Github className="w-5 h-5" />
            </a>
            <a href={profileInfo.socials.twitter} target="_blank" rel="noopener noreferrer"
              className="hover:text-stone-950 transition-colors p-2 rounded-full hover:bg-stone-100">
              <Twitter className="w-5 h-5" />
            </a>
            <a href={`mailto:${profileInfo.email}`}
              className="hover:text-stone-950 transition-colors p-2 rounded-full hover:bg-stone-100">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </motion.div>

        {/* ===== RIGHT SIDE PORTRAIT ===== */}
        <motion.div
          className="flex-1 w-full flex justify-center relative select-none"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
        >
          <motion.div
            className="relative"
            style={{ x: graphicX, y: graphicY }}
          >
            {/* Minimal Monochrome Double border blob */}
            <div className="relative w-72 h-80 sm:w-80 sm:h-96 md:w-96 md:h-[28rem] overflow-hidden bg-stone-100 shadow-xl"
              style={{
                borderRadius: '60% 40% 55% 45% / 50% 60% 40% 50%',
                border: '2px solid rgba(0, 0, 0, 0.15)',
              }}
            >
              <img
                src="/vin-photo.jpg"
                alt="Vincent Nwosu"
                className="w-full h-full object-cover object-top hover:scale-102 transition-transform duration-700 filter grayscale contrast-110"
              />
            </div>

            {/* Floating badge - top right */}
            <motion.div
              className="absolute -top-4 -right-4 glass-panel rounded-2xl px-4 py-2.5 shadow-md border border-stone-200"
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            >
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500 block">
                Doctoral Candidate
              </span>
              <span className="text-xs font-heading font-black text-black">
                ✦ expected 2026
              </span>
            </motion.div>

            {/* Floating badge - bottom left */}
            <motion.div
              className="absolute -bottom-4 -left-4 glass-panel rounded-2xl px-4 py-2.5 shadow-md border border-stone-200"
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 0.5 }}
            >
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500 block">
                Research Focus
              </span>
              <span className="text-xs font-heading font-black text-black">
                ✦ Tone & Phonology
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 w-full flex justify-center pb-10">
        <motion.div
          className="flex flex-col items-center gap-2 text-stone-400"
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        >
          <span className="text-[10px] uppercase tracking-widest font-semibold">Scroll to Explore</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </div>

      {/* ===== TRUSTED BY SECTION (Infinite Marquee) ===== */}
      <section className="relative z-10 py-8 bg-stone-50/50 border-t border-stone-200 backdrop-blur-sm select-none">
        <div className="max-w-7xl mx-auto px-6 md:px-8 mb-4">
          <p className="text-[10px] text-center uppercase tracking-[0.25em] font-bold text-stone-400">
            Academic Affiliations & Research Collaborators
          </p>
        </div>
        <div className="relative w-full overflow-hidden flex">
          <div className="animate-marquee flex items-center gap-16 py-2">
            {trustedOrganizations.map((org, index) => (
              <span
                key={`org-${index}`}
                className="font-heading font-black text-lg md:text-xl text-stone-400 hover:text-stone-750 transition-colors cursor-default"
              >
                {org.logoText}
              </span>
            ))}
          </div>
          <div className="animate-marquee flex items-center gap-16 py-2" aria-hidden="true">
            {trustedOrganizations.map((org, index) => (
              <span
                key={`org-dup-${index}`}
                className="font-heading font-black text-lg md:text-xl text-stone-400 hover:text-stone-750 transition-colors cursor-default"
              >
                {org.logoText}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
