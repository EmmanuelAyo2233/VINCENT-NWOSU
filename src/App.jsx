import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Component layout imports
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';

// Pages imports
import Home from './pages/Home';
import About from './pages/About';
import Experience from './pages/Experience';
import Research from './pages/Research';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import Publications from './pages/Publications';
import CV from './pages/CV';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* Global Loading Screen */}
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Main Website Wrapper */}
      {!loading && (
        <div className="page-bg flex flex-col min-h-screen">
          {/* Sticky/Floating Navigation */}
          <Navbar />

          {/* Centralized Page Routing Views */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/research" element={<Research />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectDetails />} />
              <Route path="/publications" element={<Publications />} />
              <Route path="/cv" element={<CV />} />
              <Route path="/news" element={<Blog />} />
              <Route path="/news/:slug" element={<BlogPost />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>

          {/* Premium Footer */}
          <Footer />
        </div>
      )}
    </>
  );
}
