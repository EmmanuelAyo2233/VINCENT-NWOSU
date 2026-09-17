import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Providers
import { AuthProvider } from './context/AuthContext';
import { PortfolioDataProvider } from './context/PortfolioDataContext';

// Component layout imports
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Public Pages imports
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

// Admin CMS Page import
import AdminPage from './pages/admin/AdminPage';

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <AuthProvider>
      <PortfolioDataProvider>
        <div className="page-bg flex flex-col min-h-screen">
          {/* Sticky/Floating Navigation (shown on public portfolio) */}
          {!isAdmin && <Navbar />}

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

              {/* Protected Admin CMS Route */}
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </main>

          {/* Premium Footer (shown on public portfolio) */}
          {!isAdmin && <Footer />}
        </div>
      </PortfolioDataProvider>
    </AuthProvider>
  );
}
