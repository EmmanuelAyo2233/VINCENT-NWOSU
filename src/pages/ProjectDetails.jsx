import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Quote, BookOpen, Compass, Clipboard } from 'lucide-react';
import { projectsData } from '../data/mockData';

export default function ProjectDetails() {
  const { id } = useParams();

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const projectIndex = projectsData.findIndex((p) => p.id === id);
  const project = projectsData[projectIndex];

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 page-bg">
        <h2 className="text-2xl font-heading font-bold mb-4">Case Study Not Found</h2>
        <p className="text-stone-500 mb-8">The requested project ID does not exist in our records.</p>
        <Link to="/projects" className="px-6 py-3 rounded-full bg-stone-900 text-white font-semibold">
          Back to Projects
        </Link>
      </div>
    );
  }

  // Find next project in circular fashion
  const nextProject = projectsData[(projectIndex + 1) % projectsData.length];

  return (
    <div className="page-bg relative min-h-screen pt-32 pb-24 overflow-hidden bg-dot-pattern">
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-stone-550/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Back Link */}
        <div className="text-left mb-8">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-500 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to projects
          </Link>
        </div>

        {/* Project Header Banner */}
        <motion.div
          className="w-full aspect-[16/7] rounded-[2rem] shadow-xl border border-stone-200 flex items-center justify-center relative overflow-hidden mb-12"
          style={{ background: project.image }}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <h1 className="relative text-white font-heading font-black text-3xl sm:text-5xl md:text-6xl text-center px-6 drop-shadow-md tracking-tight">
            {project.title}
          </h1>
        </motion.div>

        {/* Split Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left mb-16">
          {/* Metadata Sidebar */}
          <div className="md:col-span-1 border-b md:border-b-0 md:border-r border-stone-200 pb-8 md:pb-0 md:pr-8 flex flex-col gap-6">
            <div>
              <h4 className="text-xs uppercase font-bold tracking-widest text-stone-400 mb-1">
                Methods & Tools
              </h4>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-stone-100 text-stone-600 border border-stone-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs uppercase font-bold tracking-widest text-stone-400 mb-1">
                Key Contribution
              </h4>
              <p className="text-xs text-stone-550 leading-normal mt-1">
                {project.results}
              </p>
            </div>
          </div>

          {/* Overview text */}
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-2xl font-heading font-bold text-black">
              Project Overview
            </h2>
            <p className="text-stone-600 leading-relaxed text-sm">
              {project.description}
            </p>
          </div>
        </div>

        {/* Detailed Sections (Structured case study) */}
        <div className="space-y-16 text-left border-t border-stone-200 pt-16">
          
          {/* Challenge Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-stone-100 text-black flex items-center justify-center">
                <Clipboard className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-heading font-black tracking-tight text-black">
                The Challenge
              </h3>
            </div>
            <div className="md:col-span-8">
              <p className="text-stone-600 text-sm leading-relaxed">
                {project.challenge}
              </p>
            </div>
          </div>

          {/* Research Process Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-stone-100 text-black flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-heading font-black tracking-tight text-black">
                Research Methodology
              </h3>
            </div>
            <div className="md:col-span-8">
              <p className="text-stone-600 text-sm leading-relaxed">
                {project.researchProcess}
              </p>
            </div>
          </div>

          {/* Design/Analysis Process Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-stone-100 text-black flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-heading font-black tracking-tight text-black">
                Analysis & Insights
              </h3>
            </div>
            <div className="md:col-span-8">
              <p className="text-stone-600 text-sm leading-relaxed">
                {project.designProcess}
              </p>
            </div>
          </div>

          {/* Gallery representation (Minimal monochrome) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {project.gallery.map((gradientVal, idx) => (
              <div
                key={idx}
                className="w-full aspect-[16/9] rounded-2xl border border-stone-200 flex items-center justify-center relative overflow-hidden"
                style={{ background: gradientVal }}
              >
                <span className="text-[10px] font-mono text-white/40 absolute top-3 left-4">
                  0{idx + 1} // Data node
                </span>
              </div>
            ))}
          </div>

          {/* Testimonial Quote */}
          {project.testimonial && (
            <div className="glass-panel rounded-3xl p-8 md:p-12 relative overflow-hidden">
              <Quote className="absolute -top-6 -right-6 w-32 h-32 text-stone-200/20" />
              <p className="text-base sm:text-lg italic text-stone-800 leading-relaxed font-heading relative z-10 mb-6 max-w-3xl">
                "{project.testimonial.quote}"
              </p>
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-8 h-[1px] bg-stone-900" />
                <span className="text-xs uppercase font-bold tracking-wider text-stone-500">
                  {project.testimonial.author}
                </span>
              </div>
            </div>
          )}

        </div>

        {/* Next Project Footer Navigation Link */}
        <div className="border-t border-stone-200 mt-16 pt-16 flex justify-between items-center">
          <div className="text-left">
            <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400">
              Up Next
            </span>
            <h4 className="text-xl font-heading font-black text-black mt-1">
              {nextProject.title}
            </h4>
          </div>
          <Link
            to={`/projects/${nextProject.id}`}
            className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-900 hover:text-white transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </div>
    </div>
  );
}
