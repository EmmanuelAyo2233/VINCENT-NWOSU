import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Experience', path: '/experience' },
  { name: 'Research', path: '/research' },
  { name: 'Projects', path: '/projects' },
  { name: 'Publications', path: '/publications' },
  { name: 'CV', path: '/cv' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-40 transition-all duration-500 flex justify-center pointer-events-none ${
          scrolled ? 'top-4 px-4' : 'top-0 px-0'
        }`}
      >
        <div
          className={`w-full max-w-7xl flex items-center justify-between transition-all duration-500 px-6 md:px-8 py-3 pointer-events-auto ${
            scrolled
              ? 'glass-navbar rounded-full shadow-lg max-w-6xl'
              : 'bg-transparent py-5'
          }`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="w-8 h-8 rounded-full bg-stone-900 flex items-center justify-center text-white font-heading font-extrabold text-sm shadow-sm group-hover:scale-105 transition-transform">
              VN
            </span>
            <span className="font-heading font-bold text-lg tracking-tight text-stone-900 group-hover:text-stone-600 transition-colors">
              Vincent Nwosu
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `relative px-4 py-2 text-sm font-medium tracking-wide transition-colors ${
                      isActive
                        ? 'text-stone-900 font-semibold'
                        : 'text-stone-500 hover:text-stone-900'
                    }`
                  }
                >
                  <span className="relative z-10">{item.name}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activeTab"
                      className="absolute inset-0 bg-stone-100 rounded-full z-0"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-1 px-5 py-2.5 rounded-full bg-stone-900 text-white hover:bg-stone-700 text-sm font-semibold transition-all hover:-translate-y-[1px] shadow-sm"
            >
              Get in Touch
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full border border-stone-300 bg-white hover:bg-stone-100 transition-colors text-stone-700"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10, pointerEvents: 'none' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-white flex flex-col justify-center px-8 md:px-16 lg:hidden"
          >
            <nav className="flex flex-col gap-6 text-3xl font-heading font-bold">
              {navItems.map((item, idx) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: idx * 0.05, duration: 0.3 }}
                >
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `transition-colors inline-block ${
                        isActive
                          ? 'text-stone-900'
                          : 'text-stone-400 hover:text-stone-900'
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: navItems.length * 0.05 + 0.1, duration: 0.4 }}
                className="mt-8"
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-stone-900 text-white hover:bg-stone-700 text-lg font-medium transition-all shadow-sm"
                >
                  Get in Touch
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
