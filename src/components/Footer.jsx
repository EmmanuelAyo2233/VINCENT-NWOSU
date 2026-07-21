import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { profileInfo } from '../data/mockData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-stone-200 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Brand & Bio Identity */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-stone-900 flex items-center justify-center text-white font-heading font-extrabold text-sm shadow-sm">
                VN
              </span>
              <span className="font-heading font-bold text-lg tracking-tight text-stone-900">
                Vincent Nwosu
              </span>
            </Link>
            <p className="text-sm text-stone-600 max-w-md leading-relaxed">
              Ph.D. candidate in Linguistics at the University of Calgary. Researcher specializing in acoustic phonetics, phonology, child-directed speech, and endangered language documentation.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-2">
              <a href={profileInfo.socials.linkedin} target="_blank" rel="noopener noreferrer"
                className="p-2.5 rounded-full border border-stone-300 bg-white hover:bg-stone-100 transition-colors text-stone-700"
                aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href={profileInfo.socials.github} target="_blank" rel="noopener noreferrer"
                className="p-2.5 rounded-full border border-stone-300 bg-white hover:bg-stone-100 transition-colors text-stone-700"
                aria-label="GitHub">
                <Github className="w-4 h-4" />
              </a>
              <a href={profileInfo.socials.twitter} target="_blank" rel="noopener noreferrer"
                className="p-2.5 rounded-full border border-stone-300 bg-white hover:bg-stone-100 transition-colors text-stone-700"
                aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href={`mailto:${profileInfo.email}`}
                className="p-2.5 rounded-full border border-stone-300 bg-white hover:bg-stone-100 transition-colors text-stone-700"
                aria-label="Email">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Research Areas */}
          <div className="md:justify-self-end">
            <h4 className="font-heading font-semibold text-xs tracking-widest uppercase mb-4 text-stone-800">
              Core Research Focus
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-stone-600">
              <li>• Acoustic Phonetics & Laboratory Phonology</li>
              <li>• Co-Speech Gesture Timing & Multimodality</li>
              <li>• Child-Directed Speech & Acquisition</li>
              <li>• Tone-Tune Correspondence in African Languages</li>
              <li>• Language Documentation (Igbo & Ika)</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-stone-200 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-500">
            © {new Date().getFullYear()} Vincent Nwosu. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-600 hover:text-stone-900 transition-colors cursor-pointer">
            Back to Top
            <span className="w-8 h-8 rounded-full border border-stone-300 bg-white flex items-center justify-center group-hover:-translate-y-1 transition-transform text-stone-700">
              <ArrowUp className="w-4 h-4" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
