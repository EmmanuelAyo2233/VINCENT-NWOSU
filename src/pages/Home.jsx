import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Linkedin, Twitter, Mail, ArrowDown } from 'lucide-react';
import { profileInfo } from '../data/mockData';

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-hidden page-bg">
      {/* Background Subtle Textures */}
      <div className="absolute inset-0 bg-dot-pattern z-0 pointer-events-none opacity-40" />

      {/* Hero Section Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 w-full flex-grow flex flex-col lg:flex-row items-center justify-between gap-12 py-24 lg:py-32 pt-32">

        {/* ===== LEFT SIDE INFO ===== */}
        <motion.div
          className="flex-1 text-left mt-10 lg:mt-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h1 className="text-5xl md:text-7xl font-heading font-black tracking-tight mb-4 text-black leading-none">
            {profileInfo.name}
          </h1>
          <p className="text-base font-body text-stone-600 mb-8 leading-relaxed max-w-xl">
            {profileInfo.bio}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-stone-300 bg-transparent text-stone-900 hover:bg-stone-100 text-sm font-semibold transition-all"
            >
              Contact Me
            </Link>
          </div>

          {/* Social Icons Row */}
          <div className="flex items-center gap-4 text-stone-600">
            <a href={profileInfo.socials.linkedin} target="_blank" rel="noopener noreferrer"
              className="hover:text-stone-950 transition-colors p-2.5 rounded-full border border-stone-200 bg-white hover:bg-stone-50"
              aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href={profileInfo.socials.twitter} target="_blank" rel="noopener noreferrer"
              className="hover:text-stone-950 transition-colors p-2.5 rounded-full border border-stone-200 bg-white hover:bg-stone-50"
              aria-label="Twitter">
              <Twitter className="w-5 h-5" />
            </a>
            <a href={`mailto:${profileInfo.email}`}
              className="hover:text-stone-950 transition-colors p-2.5 rounded-full border border-stone-200 bg-white hover:bg-stone-50"
              aria-label="Email">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </motion.div>

        {/* ===== RIGHT SIDE PORTRAIT ===== */}
        <motion.div
          className="flex-1 w-full flex justify-center items-center relative select-none"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        >
          {/* Round Profile Picture Container */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-stone-200 shadow-xl bg-stone-100">
            <img
              src="/vin-photo.jpg"
              alt="Vincent Nwosu"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
