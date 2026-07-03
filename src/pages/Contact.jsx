import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, ArrowRight, Github, Linkedin, Twitter } from 'lucide-react';
import { profileInfo } from '../data/mockData';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1800);
  };

  return (
    <div className="page-bg relative min-h-screen pt-32 pb-24 overflow-hidden bg-dot-pattern">
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-stone-550/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Details */}
          <div className="lg:col-span-5 text-left space-y-8">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-stone-500 font-semibold mb-2 block">
                Get In Touch
              </span>
              <h1 className="text-4xl md:text-6xl font-heading font-black tracking-tight text-stone-900">
                Let's Talk
              </h1>
              <p className="text-stone-605 mt-4 text-sm leading-relaxed max-w-sm">
                Have a collaborative research proposal, seminar invite, or linguistics panel inquiry? Send a message to connect.
              </p>
            </div>

            {/* Direct Channels */}
            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-xl bg-stone-100 text-stone-900 flex items-center justify-center border border-stone-200 shadow-inner group-hover:scale-105 transition-transform">
                  <Mail className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase font-bold tracking-widest text-stone-400">
                    Direct Email
                  </h4>
                  <a href={`mailto:${profileInfo.email}`} className="text-sm font-semibold hover:text-stone-600 transition-colors">
                    {profileInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-xl bg-stone-100 text-stone-900 flex items-center justify-center border border-stone-200 shadow-inner group-hover:scale-105 transition-transform">
                  <Phone className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase font-bold tracking-widest text-stone-400">
                    Direct Call
                  </h4>
                  <a href={`tel:${profileInfo.phone}`} className="text-sm font-semibold hover:text-stone-600 transition-colors">
                    {profileInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-xl bg-stone-100 text-stone-900 flex items-center justify-center border border-stone-200 shadow-inner group-hover:scale-105 transition-transform">
                  <MapPin className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase font-bold tracking-widest text-stone-400">
                    Linguistics Department
                  </h4>
                  <span className="text-sm font-semibold text-stone-850">
                    {profileInfo.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Social Coordinates */}
            <div className="pt-4 border-t border-stone-200 max-w-sm">
              <h4 className="text-[10px] uppercase font-bold tracking-widest text-stone-400 mb-4">
                Social Networks
              </h4>
              <div className="flex items-center gap-3">
                <a
                  href={profileInfo.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full border border-stone-300 bg-white hover:bg-stone-100 transition-colors text-stone-600"
                >
                  <Linkedin className="w-4.5 h-4.5" />
                </a>
                <a
                  href={profileInfo.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full border border-stone-300 bg-white hover:bg-stone-100 transition-colors text-stone-600"
                >
                  <Github className="w-4.5 h-4.5" />
                </a>
                <a
                  href={profileInfo.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full border border-stone-300 bg-white hover:bg-stone-100 transition-colors text-stone-600"
                >
                  <Twitter className="w-4.5 h-4.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Glass Form */}
          <div className="lg:col-span-7 w-full">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="contact-form"
                  onSubmit={handleSubmit}
                  className="glass-panel rounded-[2rem] p-8 md:p-10 space-y-6 shadow-sm text-left relative overflow-hidden border border-stone-200"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-stone-500">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-stone-250 bg-white text-stone-900 text-sm focus:outline-none focus:border-stone-900 transition-colors"
                      />
                    </div>
                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-stone-500">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-stone-250 bg-white text-stone-900 text-sm focus:outline-none focus:border-stone-900 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-stone-500">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-stone-250 bg-white text-stone-900 text-sm focus:outline-none focus:border-stone-900 transition-colors"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-stone-500">
                      Message
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-stone-250 bg-white text-stone-900 text-sm focus:outline-none focus:border-stone-900 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm transition-colors shadow-sm cursor-pointer border border-transparent"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      ) : (
                        <>
                          Send Message
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="success-screen"
                  className="glass-panel rounded-[2rem] p-12 text-center shadow-sm flex flex-col items-center justify-center gap-6 relative overflow-hidden border border-stone-200"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="w-16 h-16 rounded-full bg-stone-100 text-stone-900 border border-stone-200 flex items-center justify-center shadow-inner"
                  >
                    <CheckCircle className="w-8 h-8" />
                  </motion.div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-heading font-black tracking-tight text-stone-900">
                      Message Dispatched!
                    </h3>
                    <p className="text-sm text-stone-500 max-w-xs mx-auto leading-relaxed">
                      Thank you for connecting. I have received your request and will follow up within 24 hours.
                    </p>
                  </div>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-850 hover:text-stone-500 cursor-pointer border-b border-stone-800 pb-0.5"
                  >
                    Submit Another Message
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
}
