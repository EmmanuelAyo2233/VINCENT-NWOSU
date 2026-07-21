import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { profileInfo } from '../data/mockData';

const footerNav = [
  { name: 'Home', path: '/' },
  { name: 'Research', path: '/research' },
  { name: 'Publications', path: '/publications' },
  { name: 'Projects', path: '/projects' },
  { name: 'CV', path: '/cv' },
  { name: 'Contact', path: '/contact' },
  { name: 'News', path: '/news' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-stone-200 bg-stone-50 text-stone-800">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-12 flex flex-col items-center text-center">
        
        {/* Brand Logo & Name */}
        <Link to="/" className="inline-flex items-center gap-2.5 mb-3 group">
          <span className="w-9 h-9 rounded-full bg-stone-900 flex items-center justify-center text-white font-heading font-extrabold text-sm shadow-sm group-hover:scale-105 transition-transform">
            VN
          </span>
          <span className="font-heading font-bold text-xl tracking-tight text-stone-900 group-hover:text-stone-700 transition-colors">
            Vincent Nwosu
          </span>
        </Link>

        {/* Short Subtitle */}
        <p className="text-sm text-stone-600 max-w-lg mb-6 leading-relaxed">
          Ph.D. Candidate in Linguistics at the University of Calgary • Researcher in Phonetics, Phonology & Language Documentation
        </p>

        {/* Quick Nav Links */}
        <nav className="flex flex-wrap justify-center items-center gap-6 mb-8 text-sm font-medium text-stone-600">
          {footerNav.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="hover:text-stone-950 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Social Links Row */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <a
            href={profileInfo.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full border border-stone-300 bg-white hover:bg-stone-900 hover:text-white transition-all text-stone-700 shadow-sm"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={profileInfo.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full border border-stone-300 bg-white hover:bg-stone-900 hover:text-white transition-all text-stone-700 shadow-sm"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={profileInfo.socials.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full border border-stone-300 bg-white hover:bg-stone-900 hover:text-white transition-all text-stone-700 shadow-sm"
            aria-label="Twitter"
          >
            <Twitter className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${profileInfo.email}`}
            className="p-2.5 rounded-full border border-stone-300 bg-white hover:bg-stone-900 hover:text-white transition-all text-stone-700 shadow-sm"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-stone-200 mb-8" />

        {/* Bottom Bar: Centered Copyright & Back to top button */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 relative">
          <div className="hidden sm:block w-24" /> {/* Spacer for balance */}

          {/* Perfectly Centered Copyright */}
          <p className="text-xs text-stone-500 font-medium text-center">
            © {new Date().getFullYear()} Vincent Nwosu. All rights reserved.
          </p>

          {/* Back to Top */}
          <div className="sm:w-24 flex justify-center sm:justify-end">
            <button
              onClick={scrollToTop}
              className="group inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
            >
              Back to Top
              <span className="w-7 h-7 rounded-full border border-stone-300 bg-white flex items-center justify-center group-hover:-translate-y-1 transition-transform text-stone-700 shadow-xs">
                <ArrowUp className="w-3.5 h-3.5" />
              </span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
