import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Mail, Github, Linkedin, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="border-t border-stone-200 bg-stone-50">

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand/Identity */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-stone-900 flex items-center justify-center text-white font-heading font-extrabold text-sm shadow-sm">
                VN
              </span>
              <span className="font-heading font-bold text-lg tracking-tight text-stone-900">
                Vincent Nwosu
              </span>
            </Link>
            <p className="text-sm text-stone-600 max-w-xs leading-relaxed">
              Ph.D. candidate in Linguistics at the University of Calgary. Researcher in phonetics, phonology, and endangered language documentation.
            </p>
            <div className="flex items-center gap-3 mt-2">
              {[
                { href: 'https://linkedin.com', label: 'LinkedIn', Icon: Linkedin },
                { href: 'https://github.com', label: 'GitHub', Icon: Github },
                { href: 'https://twitter.com', label: 'Twitter', Icon: Twitter },
              ].map(({ href, label, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="p-2 rounded-full border border-stone-300 bg-white hover:bg-stone-100 transition-colors text-stone-600"
                  aria-label={label}>
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-sm tracking-wider uppercase mb-6 text-stone-800">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3 text-sm">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About & Biography' },
                { to: '/projects', label: 'Field Documentation' },
                { to: '/publications', label: 'Publications & Papers' },
                { to: '/cv', label: 'Curriculum Vitae' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-stone-600 hover:text-stone-900 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Research Areas */}
          <div>
            <h4 className="font-heading font-semibold text-sm tracking-wider uppercase mb-6 text-stone-800">
              Research Areas
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-stone-600">
              <li>Acoustic Phonetics & LabPhon</li>
              <li>Co-Speech Gesture Timing</li>
              <li>Child-Directed Speech</li>
              <li>Tone-Tune Correspondence</li>
              <li>Language Documentation</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-4">
            <h4 className="font-heading font-semibold text-sm tracking-wider uppercase text-stone-800">
              Subscribe to Updates
            </h4>
            <p className="text-sm text-stone-600 leading-relaxed">
              Get research summaries, fieldwork notes, and publication updates. No spam.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 mt-2">
              <div className="relative flex-grow">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="w-full pl-9 pr-4 py-2.5 rounded-full border border-stone-300 bg-white text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:border-stone-900 transition-colors"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full bg-stone-900 hover:bg-stone-700 text-white text-sm font-semibold transition-colors cursor-pointer shadow-sm">
                Join
              </button>
            </form>
            {subscribed && (
              <motion.span
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-stone-700 mt-1 font-semibold">
                ✓ You've successfully subscribed!
              </motion.span>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-stone-200 mt-8 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
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
