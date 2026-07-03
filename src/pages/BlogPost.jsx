import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Share2, Twitter, Linkedin, Copy, Check } from 'lucide-react';
import { blogPostsData } from '../data/mockData';

export default function BlogPost() {
  const { slug } = useParams();
  const [copied, setCopied] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Framer Motion scroll progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const post = blogPostsData.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-6">
        <h2 className="text-2xl font-heading font-bold mb-4 font-heading">Essay Not Found</h2>
        <p className="text-stone-500 mb-8">The requested article could not be retrieved from our repository.</p>
        <Link to="/blog" className="px-6 py-3 rounded-full bg-stone-900 text-white font-semibold">
          Back to Blog
        </Link>
      </div>
    );
  }

  // Related posts (excluding current)
  const relatedPosts = blogPostsData.filter((p) => p.slug !== slug).slice(0, 2);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="page-bg relative min-h-screen pt-32 pb-24 overflow-hidden bg-dot-pattern">
      {/* Scroll Progress Bar at the very top of screen */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-stone-900 z-50 origin-left"
        style={{ scaleX }}
      />

      <div className="absolute top-1/4 right-0 w-80 h-80 bg-stone-900/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Back Link */}
        <div className="text-left mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-500 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to essays
          </Link>
        </div>

        {/* Essay Header Info */}
        <div className="text-left mb-12 max-w-3xl">
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-stone-400 mb-4">
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

          <h1 className="text-3xl sm:text-5xl font-heading font-black tracking-tight text-black mb-6 leading-tight">
            {post.title}
          </h1>
        </div>

        {/* Banner Graphics */}
        <div
          className="w-full aspect-[21/9] rounded-[2rem] shadow-md border border-stone-250/20 flex items-center justify-center mb-16 overflow-hidden"
          style={{ background: post.image }}
        >
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Split Article stream */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Share & Table of Contents */}
          <div className="lg:col-span-3 hidden lg:block text-left">
            <div className="sticky top-28 space-y-8">
              {/* Share utilities */}
              <div>
                <h4 className="text-[10px] uppercase font-bold tracking-widest text-stone-400 mb-3.5">
                  Share Essay
                </h4>
                <div className="flex items-center gap-2">
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full border border-stone-200 hover:bg-stone-100 transition-colors text-stone-600"
                    aria-label="Share on X"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full border border-stone-200 hover:bg-stone-100 transition-colors text-stone-600"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <button
                    onClick={handleCopyLink}
                    className="p-2.5 rounded-full border border-stone-200 hover:bg-stone-100 transition-colors text-stone-600 cursor-pointer"
                    aria-label="Copy page link"
                  >
                    {copied ? <Check className="w-4 h-4 text-stone-800" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Table of Contents */}
              {post.toc && (
                <div>
                  <h4 className="text-[10px] uppercase font-bold tracking-widest text-stone-400 mb-3.5">
                    Structure
                  </h4>
                  <nav className="flex flex-col gap-2.5 text-xs text-stone-450 font-semibold">
                    {post.toc.map((node) => (
                      <a
                        key={node.id}
                        href={`#${node.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById(node.id)?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="hover:text-black transition-colors"
                      >
                        {node.text}
                      </a>
                    ))}
                  </nav>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Article Text */}
          <div className="lg:col-span-9 text-left">
            <article className="prose prose-stone max-w-none text-stone-600 space-y-6 text-base leading-relaxed">
              {post.content.split('\n\n').map((para, pIdx) => {
                const trimmed = para.trim();
                if (!trimmed) return null;

                // Handle main titles
                if (trimmed.startsWith('# ')) {
                  return null; // Skip main title because we render it separately
                }

                // Handle subtitles (H2)
                if (trimmed.startsWith('## ')) {
                  const titleText = trimmed.replace('## ', '');
                  const headingId = titleText.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                  return (
                    <h2
                      key={pIdx}
                      id={headingId}
                      className="text-2xl font-heading font-black tracking-tight text-black mt-10 mb-4 border-b border-stone-200/50 pb-2"
                    >
                      {titleText}
                    </h2>
                  );
                }

                // Handle list items
                if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
                  const items = trimmed.split('\n');
                  return (
                    <ul key={pIdx} className="list-disc pl-6 space-y-1.5 my-4">
                      {items.map((item, iIdx) => (
                        <li key={iIdx} className="text-sm">
                          {item.replace(/^[-*]\s+/, '')}
                        </li>
                      ))}
                    </ul>
                  );
                }

                // Handle numbered lists
                if (/^\d+\.\s+/.test(trimmed)) {
                  const items = trimmed.split('\n');
                  return (
                    <ol key={pIdx} className="list-decimal pl-6 space-y-1.5 my-4">
                      {items.map((item, iIdx) => (
                        <li key={iIdx} className="text-sm">
                          {item.replace(/^\d+\.\s+/, '')}
                        </li>
                      ))}
                    </ol>
                  );
                }

                // Handle standard paragraph text with emphasis formatting
                return (
                  <p key={pIdx} className="text-sm sm:text-base font-normal leading-relaxed text-stone-550">
                    {trimmed.split('**').map((chunk, cIdx) => {
                      if (cIdx % 2 === 1) {
                        return <strong key={cIdx} className="font-bold text-black">{chunk}</strong>;
                      }
                      return chunk.split('*').map((subchunk, sIdx) => {
                        if (sIdx % 2 === 1) {
                          return <em key={sIdx} className="italic text-stone-800">{subchunk}</em>;
                        }
                        return subchunk;
                      });
                    })}
                  </p>
                );
              })}
            </article>



            {/* Related Articles Footer */}
            {relatedPosts.length > 0 && (
              <div className="border-t border-stone-200 mt-16 pt-12">
                <h3 className="text-xl font-heading font-bold text-black mb-8">
                  Related Essays
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {relatedPosts.map((relPost) => (
                    <Link
                      key={relPost.id}
                      to={`/blog/${relPost.slug}`}
                      className="glass-panel rounded-2xl p-6 text-left hover:-translate-y-1 transition-all hover:shadow-md block group cursor-pointer"
                    >
                      <span className="text-[10px] font-mono text-stone-400 block mb-2 uppercase">
                        {relPost.category} // {relPost.readingTime}
                      </span>
                      <h4 className="font-heading font-bold text-black group-hover:text-stone-700 transition-colors">
                        {relPost.title}
                      </h4>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}

