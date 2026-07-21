import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, Clock, ArrowRight } from 'lucide-react';
import { blogPostsData } from '../data/mockData';

export default function Blog() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Extract unique categories
  const categories = ['All', ...new Set(blogPostsData.map(post => post.category))];

  // Filtering
  const filteredPosts = blogPostsData.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  // Pick first article as featured (if matches category and query, otherwise first matching is featured)
  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const recentPosts = filteredPosts.slice(1);

  return (
    <div className="page-bg relative min-h-screen pt-32 pb-24 overflow-hidden bg-dot-pattern">
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-stone-550/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        


        {/* Filter controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12 border-b border-stone-200 pb-6">
          {/* Categories Tab list */}
          <div className="flex flex-wrap items-center gap-1.5 self-start md:self-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-black text-white shadow-xs'
                    : 'text-stone-550 hover:bg-stone-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-9 pr-4 py-2.5 rounded-full border border-stone-200 bg-white text-black text-sm focus:outline-none focus:border-black transition-colors"
            />
          </div>
        </div>

        {/* Blog layout streams */}
        <AnimatePresence mode="popLayout">
          {filteredPosts.length > 0 ? (
            <div className="space-y-8 flex flex-col">
              {filteredPosts.map((post) => (
                <motion.div
                  layout
                  key={post.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-panel rounded-[2rem] overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col lg:flex-row text-left group border border-stone-200"
                >
                  <div
                    className="flex-grow lg:w-1/2 min-h-[250px] lg:min-h-[320px] flex items-center justify-center relative cursor-pointer"
                    style={{ background: post.image }}
                    onClick={() => navigate(`/blog/${post.slug}`)}
                  >
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                  </div>
                  
                  <div className="flex-grow lg:w-1/2 p-8 md:p-10 flex flex-col justify-between gap-6">
                    <div className="space-y-4">
                      {/* Meta information */}
                      <div className="flex items-center gap-4 text-xs font-mono text-stone-400">
                        <span className="px-2.5 py-1 rounded-md bg-stone-100 text-stone-700 font-bold border border-stone-200">
                          {post.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {post.readingTime}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-2xl md:text-3xl font-heading font-black tracking-tight text-black group-hover:text-stone-700 transition-colors leading-snug">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-sm leading-relaxed text-stone-700 font-normal">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => navigate(`/blog/${post.slug}`)}
                        className="inline-flex items-center gap-2 text-sm font-bold text-black border-b border-black hover:text-stone-750 hover:border-stone-750 group cursor-pointer pb-0.5 bg-transparent border-none p-0 outline-none"
                      >
                        Read Essay
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-stone-500">No blog posts match your active filter search.</p>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
