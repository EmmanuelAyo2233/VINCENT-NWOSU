import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Linkedin, Mail } from 'lucide-react';
import { usePortfolioData } from '../context/PortfolioDataContext';

const XIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function Home() {
  const { profile } = usePortfolioData();

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
            {profile.name}
          </h1>
          <p className="text-base font-body text-stone-600 mb-6 leading-relaxed max-w-xl">
            {profile.bio}
          </p>

          {/* Institutional Coordinates */}
          <div className="mb-8 p-5 rounded-2xl border border-stone-200 bg-stone-50/60 max-w-xl text-sm text-stone-600 space-y-2.5 font-body shadow-xs">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-stone-500" />
              <a href={`mailto:${profile.email}`} className="hover:text-stone-950 font-semibold transition-colors">
                {profile.email}
              </a>
            </div>
            <div className="pt-2.5 border-t border-stone-200/60 text-xs md:text-sm space-y-0.5">
              <p className="font-semibold text-stone-900">{profile.department || 'School of Languages, Linguistics, Literatures and Cultures'}</p>
              <p className="text-stone-700">{profile.institution || 'University of Calgary'}</p>
              <p className="text-stone-400 font-mono text-[11px]">{profile.address || '2500 University Drive NW, Calgary, AB T2N 1N4'}</p>
            </div>
          </div>

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
            {profile.socials?.linkedin && (
              <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer"
                className="hover:text-stone-950 transition-colors p-2.5 rounded-full border border-stone-200 bg-white hover:bg-stone-50"
                aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            {profile.socials?.twitter && (
              <a href={profile.socials.twitter} target="_blank" rel="noopener noreferrer"
                className="hover:text-stone-950 transition-colors p-2.5 rounded-full border border-stone-200 bg-white hover:bg-stone-50"
                aria-label="X (formerly Twitter)">
                <XIcon className="w-5 h-5" />
              </a>
            )}
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
              src={profile.avatarUrl || '/vin-photo.jpg'}
              alt={profile.name}
              className="w-full h-full object-cover object-top"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
