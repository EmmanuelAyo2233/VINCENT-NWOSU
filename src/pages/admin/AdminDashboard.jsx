import React, { useState } from 'react';
import {
  Save,
  Plus,
  Trash2,
  Edit2,
  AlertTriangle,
  Loader2,
  Lock,
  Mail,
  KeyRound,
  Eye,
  EyeOff,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import ImageUpload from '../../components/admin/ImageUpload';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import { useAuth } from '../../context/AuthContext';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { getCleanImageUrl } from '../../lib/imageUtils';

export default function AdminDashboard() {
  const {
    profile,
    aboutTimeline,
    researchInterests,
    projects,
    experiences,
    publications,
    blogPosts,
    refreshData,
  } = usePortfolioData();

  const [activeTab, setActiveTab] = useState('profile');
  const [toast, setToast] = useState(null);
  const [saving, setSaving] = useState(false);

  // Profile Form State
  const [profileForm, setProfileForm] = useState({
    name: profile.name || '',
    title: profile.title || '',
    bio: profile.bio || '',
    aboutHeadline: profile.aboutHeadline || 'Investigating the structural properties of language through acoustics, phonetics, and multimodal gestures.',
    aboutNarrative1: profile.aboutNarrative1 || 'My academic research centers on phonological and phonetic analysis of Niger-Congo languages, with a particular focus on the Igbo language. I study how speech timing interacts with co-speech gestures, child-directed speech, and tone-tune correspondence in liturgical and storytelling contexts.',
    aboutNarrative2: profile.aboutNarrative2 || 'I hold M.A. degrees in Linguistics and Cognitive Science from the University of Delaware and English Language/Philosophy from Ahmadu Bello University. I am currently completing my doctoral research at the University of Calgary, and work to document and preserve endangered oral narratives.',
    email: profile.email || '',
    location: profile.location || '',
    department: profile.department || 'School of Languages, Linguistics, Literatures and Cultures',
    institution: profile.institution || 'University of Calgary',
    address: profile.address || '2500 University Drive NW, Calgary, AB T2N 1N4',
    avatarUrl: profile.avatarUrl || '/vin-photo.jpg',
    cvUrl: profile.cvUrl || '/Vincent_Nwosu_CV.pdf',
    linkedin: profile.socials?.linkedin || '',
    twitter: profile.socials?.twitter || '',
    github: profile.socials?.github || '',
  });

  // Modal / Editing states for collections
  const [editingItem, setEditingItem] = useState(null);
  const [modalType, setModalType] = useState(null); // 'experience' | 'project' | 'publication' | 'research' | 'timeline' | 'blog'
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // ----------------------------------------------------------------------------
  // SAVE PROFILE
  // ----------------------------------------------------------------------------
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);

    if (!isSupabaseConfigured) {
      showToast('Supabase is not yet configured. Please add credentials to .env to save persistently.', 'error');
      setSaving(false);
      return;
    }

    try {
      const payload = {
        name: profileForm.name,
        title: profileForm.title,
        bio: profileForm.bio,
        about_headline: profileForm.aboutHeadline,
        about_narrative_1: profileForm.aboutNarrative1,
        about_narrative_2: profileForm.aboutNarrative2,
        email: profileForm.email,
        location: profileForm.location,
        department: profileForm.department,
        institution: profileForm.institution,
        address: profileForm.address,
        avatar_url: profileForm.avatarUrl,
        cv_url: profileForm.cvUrl,
        social_linkedin: profileForm.linkedin,
        social_twitter: profileForm.twitter,
        social_github: profileForm.github,
        updated_at: new Date().toISOString(),
      };

      let result;
      if (profile.id) {
        result = await supabase.from('profiles').update(payload).eq('id', profile.id);
      } else {
        result = await supabase.from('profiles').insert([payload]);
      }

      if (result.error) throw result.error;

      await refreshData();
      showToast('Profile information successfully saved to Supabase!');
    } catch (err) {
      console.error('Error saving profile:', err);
      showToast(err.message || 'Failed to save profile', 'error');
    } finally {
      setSaving(false);
    }
  };

  // ----------------------------------------------------------------------------
  // GENERIC DELETE HANDLER
  // ----------------------------------------------------------------------------
  const handleDelete = async (table, id) => {
    if (!isSupabaseConfigured) {
      showToast('Supabase is not configured yet. Cannot delete.', 'error');
      setDeleteConfirm(null);
      return;
    }

    try {
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (error) throw error;

      await refreshData();
      showToast('Item deleted successfully.');
      setDeleteConfirm(null);
    } catch (err) {
      console.error(`Error deleting from ${table}:`, err);
      showToast(err.message || 'Failed to delete item', 'error');
    }
  };

  // ----------------------------------------------------------------------------
  // MODAL SAVE HANDLER (Experience, Project, Pub, Research, Timeline, Blog)
  // ----------------------------------------------------------------------------
  const handleSaveItem = async (e) => {
    e.preventDefault();
    setSaving(true);

    if (!isSupabaseConfigured) {
      showToast('Supabase is not configured. Add credentials to save.', 'error');
      setSaving(false);
      return;
    }

    try {
      let table = '';
      let payload = {};

      if (modalType === 'experience') {
        table = 'experiences';
        payload = {
          position: editingItem.position,
          organization: editingItem.organization,
          duration: editingItem.duration,
          description: editingItem.description,
          skills: typeof editingItem.skills === 'string'
            ? editingItem.skills.split(',').map((s) => s.trim()).filter(Boolean)
            : editingItem.skills,
          sort_order: Number(editingItem.sortOrder || 0),
        };
      } else if (modalType === 'project') {
        table = 'projects';
        payload = {
          id: editingItem.id || `project-${Date.now()}`,
          title: editingItem.title,
          tagline: editingItem.tagline,
          description: editingItem.description,
          image: editingItem.image || '',
          tech: typeof editingItem.tech === 'string'
            ? editingItem.tech.split(',').map((t) => t.trim()).filter(Boolean)
            : editingItem.tech,
          results: editingItem.results,
          challenge: editingItem.challenge,
          research_process: editingItem.researchProcess,
          design_process: editingItem.designProcess,
          testimonial_quote: editingItem.testimonial?.quote || '',
          testimonial_author: editingItem.testimonial?.author || '',
          featured: editingItem.featured ?? true,
          sort_order: Number(editingItem.sortOrder || 0),
        };
      } else if (modalType === 'publication') {
        table = 'publications';
        payload = {
          id: editingItem.id || `pub-${Date.now()}`,
          title: editingItem.title,
          journal: editingItem.journal,
          year: editingItem.year,
          authors: editingItem.authors,
          abstract: editingItem.abstract,
          pdf_link: editingItem.pdfLink || '/Vincent_Nwosu_CV.pdf',
          category: editingItem.category || 'Peer-reviewed Article',
          sort_order: Number(editingItem.sortOrder || 0),
        };
      } else if (modalType === 'research') {
        table = 'research_interests';
        payload = {
          id: editingItem.id || `research-${Date.now()}`,
          category: editingItem.category,
          title: editingItem.title,
          description: editingItem.description,
          icon_name: editingItem.iconName || 'BookOpen',
          sort_order: Number(editingItem.sortOrder || 0),
        };
      } else if (modalType === 'timeline') {
        table = 'education_timeline';
        payload = {
          year: editingItem.year,
          title: editingItem.title,
          description: editingItem.description,
          sort_order: Number(editingItem.sortOrder || 0),
        };
      } else if (modalType === 'blog') {
        table = 'blog_posts';
        payload = {
          id: editingItem.id || `blog-${Date.now()}`,
          slug: editingItem.slug || editingItem.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          title: editingItem.title,
          date: editingItem.date,
          reading_time: editingItem.readingTime || '5 min read',
          category: editingItem.category || 'Documentation',
          image: editingItem.image || '',
          excerpt: editingItem.excerpt,
          content: editingItem.content,
          sort_order: Number(editingItem.sortOrder || 0),
        };
      }

      let res;
      if (editingItem.id && editingItem._isExisting) {
        res = await supabase.from(table).update(payload).eq('id', editingItem.id);
      } else {
        res = await supabase.from(table).upsert([payload]);
      }

      if (res.error) throw res.error;

      await refreshData();
      showToast(`${modalType} saved successfully!`);
      setModalType(null);
      setEditingItem(null);
    } catch (err) {
      console.error(`Error saving ${modalType}:`, err);
      showToast(err.message || 'Failed to save item', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout activeTab={activeTab} onTabChange={setActiveTab} toast={toast}>
      
      {/* ------------------------------------------------------------------------ */}
      {/* TAB 1: PROFILE & SOCIALS                                                 */}
      {/* ------------------------------------------------------------------------ */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-xs text-left space-y-8">
          <div className="border-b border-stone-100 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-heading font-black text-stone-900">Personal & Academic Profile</h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">Manage your headline, hero biography, institutional coordinates, avatar, and CV.</p>
            </div>
            <button
              onClick={handleSaveProfile}
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold shadow-xs cursor-pointer disabled:opacity-50 self-start sm:self-center"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Save Profile</span>
            </button>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-8">
            {/* Visual Identity / Media */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ImageUpload
                label="Profile Portrait"
                helperText="Upload official headshot (JPG, PNG, WebP)"
                folder="avatars"
                value={profileForm.avatarUrl}
                onChange={(url) => setProfileForm((prev) => ({ ...prev, avatarUrl: url }))}
              />
              <ImageUpload
                label="Curriculum Vitae (PDF)"
                helperText="Upload complete academic CV (PDF document)"
                accept="application/pdf"
                folder="documents"
                maxSizeMB={10}
                value={profileForm.cvUrl}
                onChange={(url) => setProfileForm((prev) => ({ ...prev, cvUrl: url }))}
              />
            </div>

            {/* Names & Titles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-600">Full Name</label>
                <input
                  type="text"
                  required
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-250 bg-stone-50/50 text-sm focus:outline-none focus:border-stone-900 focus:bg-white"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-600">Professional Title</label>
                <input
                  type="text"
                  required
                  value={profileForm.title}
                  onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-250 bg-stone-50/50 text-sm focus:outline-none focus:border-stone-900 focus:bg-white"
                />
              </div>
            </div>

            {/* Home Hero Bio */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-600">Home Hero Bio</label>
              <textarea
                rows={4}
                required
                value={profileForm.bio}
                onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-250 bg-stone-50/50 text-sm focus:outline-none focus:border-stone-900 focus:bg-white resize-y"
              />
              <p className="text-[11px] text-stone-400">Featured directly on the homepage hero section.</p>
            </div>

            {/* About Page Details */}
            <div className="border-t border-stone-100 pt-6 space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-800">About Page Narrative</h3>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-600">About Headline</label>
                <input
                  type="text"
                  value={profileForm.aboutHeadline}
                  onChange={(e) => setProfileForm({ ...profileForm, aboutHeadline: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-250 bg-stone-50/50 text-sm focus:outline-none focus:border-stone-900 focus:bg-white"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-600">Biography Paragraph 1</label>
                <textarea
                  rows={3}
                  value={profileForm.aboutNarrative1}
                  onChange={(e) => setProfileForm({ ...profileForm, aboutNarrative1: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-250 bg-stone-50/50 text-sm focus:outline-none focus:border-stone-900 focus:bg-white resize-y"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-600">Biography Paragraph 2</label>
                <textarea
                  rows={3}
                  value={profileForm.aboutNarrative2}
                  onChange={(e) => setProfileForm({ ...profileForm, aboutNarrative2: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-250 bg-stone-50/50 text-sm focus:outline-none focus:border-stone-900 focus:bg-white resize-y"
                />
              </div>
            </div>

            {/* Institutional Coordinates & Contact */}
            <div className="border-t border-stone-100 pt-6 space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-800">Coordinates & Contact</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-600">Official Email</label>
                  <input
                    type="email"
                    required
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-250 bg-stone-50/50 text-sm focus:outline-none focus:border-stone-900 focus:bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-600">Location</label>
                  <input
                    type="text"
                    required
                    value={profileForm.location}
                    onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-250 bg-stone-50/50 text-sm focus:outline-none focus:border-stone-900 focus:bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-600">Department</label>
                  <input
                    type="text"
                    value={profileForm.department}
                    onChange={(e) => setProfileForm({ ...profileForm, department: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-250 bg-stone-50/50 text-sm focus:outline-none focus:border-stone-900 focus:bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-600">Institution</label>
                  <input
                    type="text"
                    value={profileForm.institution}
                    onChange={(e) => setProfileForm({ ...profileForm, institution: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-250 bg-stone-50/50 text-sm focus:outline-none focus:border-stone-900 focus:bg-white"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-600">Postal / Office Address</label>
                <input
                  type="text"
                  value={profileForm.address}
                  onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-250 bg-stone-50/50 text-sm focus:outline-none focus:border-stone-900 focus:bg-white"
                />
              </div>
            </div>

            {/* Social Links */}
            <div className="border-t border-stone-100 pt-6 space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-800">Social & Academic Profiles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-600">LinkedIn URL</label>
                  <input
                    type="url"
                    value={profileForm.linkedin}
                    onChange={(e) => setProfileForm({ ...profileForm, linkedin: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-250 bg-stone-50/50 text-sm focus:outline-none focus:border-stone-900 focus:bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-600">Twitter / X URL</label>
                  <input
                    type="url"
                    value={profileForm.twitter}
                    onChange={(e) => setProfileForm({ ...profileForm, twitter: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-250 bg-stone-50/50 text-sm focus:outline-none focus:border-stone-900 focus:bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-600">GitHub URL</label>
                  <input
                    type="url"
                    value={profileForm.github}
                    onChange={(e) => setProfileForm({ ...profileForm, github: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-250 bg-stone-50/50 text-sm focus:outline-none focus:border-stone-900 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-sm font-semibold shadow-md cursor-pointer disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>Save All Profile Changes</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ------------------------------------------------------------------------ */}
      {/* TAB 2: EXPERIENCE                                                        */}
      {/* ------------------------------------------------------------------------ */}
      {activeTab === 'experiences' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-xs text-left space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5">
            <div>
              <h2 className="text-2xl font-heading font-black text-stone-900">Work & Academic Experience</h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">Manage positions, assistantships, research roles, and competencies.</p>
            </div>
            <button
              onClick={() => {
                setModalType('experience');
                setEditingItem({
                  position: '',
                  organization: '',
                  duration: '',
                  description: '',
                  skills: '',
                  sortOrder: experiences.length + 1,
                  _isExisting: false,
                });
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold shadow-xs cursor-pointer self-start sm:self-center"
            >
              <Plus className="w-4 h-4" />
              <span>Add Experience</span>
            </button>
          </div>

          {/* Experience List */}
          <div className="space-y-4">
            {experiences.map((exp, idx) => (
              <div key={exp.id || idx} className="p-5 rounded-2xl border border-stone-200 bg-stone-50/50 hover:bg-stone-50 transition-colors flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="space-y-1.5 flex-grow">
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-bold text-stone-900 text-base">{exp.position}</h3>
                    <span className="text-xs font-mono text-stone-500">({exp.duration})</span>
                  </div>
                  <p className="text-xs font-medium text-stone-600">{exp.organization}</p>
                  <p className="text-xs text-stone-500 leading-relaxed max-w-2xl mt-1">{exp.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {exp.skills?.map((s, sIdx) => (
                      <span key={sIdx} className="px-2 py-0.5 rounded text-[10px] font-mono bg-stone-200/70 text-stone-700">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => {
                      setModalType('experience');
                      setEditingItem({
                        ...exp,
                        skills: exp.skills?.join(', ') || '',
                        _isExisting: true,
                      });
                    }}
                    className="p-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-100 text-stone-700 transition-colors cursor-pointer"
                    title="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm({ table: 'experiences', id: exp.id, title: exp.position })}
                    className="p-2 rounded-xl border border-stone-300 bg-white hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-stone-400 transition-colors cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------------ */}
      {/* TAB 3: PROJECTS                                                          */}
      {/* ------------------------------------------------------------------------ */}
      {activeTab === 'projects' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-xs text-left space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5">
            <div>
              <h2 className="text-2xl font-heading font-black text-stone-900">Fieldwork & Research Projects</h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">Manage extensive case studies, fieldwork methodologies, audiovisual archives, and images.</p>
            </div>
            <button
              onClick={() => {
                setModalType('project');
                setEditingItem({
                  id: `project-${Date.now()}`,
                  title: '',
                  tagline: '',
                  description: '',
                  image: '',
                  tech: '',
                  results: '',
                  challenge: '',
                  researchProcess: '',
                  designProcess: '',
                  testimonial: { quote: '', author: '' },
                  featured: true,
                  sortOrder: projects.length + 1,
                  _isExisting: false,
                });
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold shadow-xs cursor-pointer self-start sm:self-center"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Project</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((proj, idx) => (
              <div key={proj.id || idx} className="rounded-2xl border border-stone-200 bg-stone-50/40 p-5 flex flex-col justify-between gap-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 font-bold">
                      {proj.id}
                    </span>
                    {proj.featured && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-stone-900 text-white font-bold">
                        Featured
                      </span>
                    )}
                  </div>

                  <h3 className="font-heading font-black text-stone-900 text-lg leading-snug">{proj.title}</h3>
                  <p className="text-xs font-medium text-stone-500 italic">{proj.tagline}</p>
                  <p className="text-xs text-stone-605 leading-relaxed line-clamp-3">{proj.description}</p>
                  
                  <div className="flex flex-wrap gap-1 pt-1">
                    {proj.tech?.map((t, tIdx) => (
                      <span key={tIdx} className="px-2 py-0.5 rounded text-[10px] font-mono bg-stone-200/60 text-stone-700">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-stone-200/60 pt-3 mt-2">
                  <span className="text-[11px] text-stone-400 font-mono">Order: #{proj.sortOrder || idx + 1}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setModalType('project');
                        setEditingItem({
                          ...proj,
                          // Use the raw clean URL for editing, not the CSS background-image string
                          image: getCleanImageUrl(proj.rawImageUrl || proj.image),
                          tech: proj.tech?.join(', ') || '',
                          _isExisting: true,
                        });
                      }}
                      className="p-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-100 text-stone-700 transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm({ table: 'projects', id: proj.id, title: proj.title })}
                      className="p-2 rounded-xl border border-stone-300 bg-white hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-stone-400 transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------------ */}
      {/* TAB 4: PUBLICATIONS                                                      */}
      {/* ------------------------------------------------------------------------ */}
      {activeTab === 'publications' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-xs text-left space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5">
            <div>
              <h2 className="text-2xl font-heading font-black text-stone-900">Academic Publications</h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">Manage journal articles, book chapters, conference proceedings, and PDF preprints.</p>
            </div>
            <button
              onClick={() => {
                setModalType('publication');
                setEditingItem({
                  id: `pub-${Date.now()}`,
                  title: '',
                  journal: '',
                  year: new Date().getFullYear().toString(),
                  authors: 'Vincent Nwosu',
                  abstract: '',
                  pdfLink: '/Vincent_Nwosu_CV.pdf',
                  category: 'Peer-reviewed Article',
                  sortOrder: publications.length + 1,
                  _isExisting: false,
                });
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold shadow-xs cursor-pointer self-start sm:self-center"
            >
              <Plus className="w-4 h-4" />
              <span>Add Publication</span>
            </button>
          </div>

          <div className="space-y-4">
            {publications.map((pub, idx) => (
              <div key={pub.id || idx} className="p-5 rounded-2xl border border-stone-200 bg-stone-50/50 flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="space-y-1.5 flex-grow">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-stone-200 text-stone-800">
                      {pub.category}
                    </span>
                    <span className="text-xs font-mono text-stone-500">{pub.year}</span>
                  </div>
                  <h3 className="font-heading font-bold text-stone-900 text-base leading-snug">{pub.title}</h3>
                  <p className="text-xs text-stone-500 font-medium">{pub.authors} — <span className="italic">{pub.journal}</span></p>
                  <p className="text-xs text-stone-600 leading-relaxed max-w-3xl line-clamp-2 mt-2">{pub.abstract}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => {
                      setModalType('publication');
                      setEditingItem({ ...pub, _isExisting: true });
                    }}
                    className="p-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-100 text-stone-700 transition-colors cursor-pointer"
                    title="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm({ table: 'publications', id: pub.id, title: pub.title })}
                    className="p-2 rounded-xl border border-stone-300 bg-white hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-stone-400 transition-colors cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------------ */}
      {/* TAB 5: RESEARCH AREAS                                                    */}
      {/* ------------------------------------------------------------------------ */}
      {activeTab === 'research' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-xs text-left space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5">
            <div>
              <h2 className="text-2xl font-heading font-black text-stone-900">Research Focus Areas</h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">Manage cards featured on your Research page (Phonetics, Gestures, Child Speech, etc.).</p>
            </div>
            <button
              onClick={() => {
                setModalType('research');
                setEditingItem({
                  id: `research-${Date.now()}`,
                  category: 'Phonetics & Phonology',
                  title: '',
                  description: '',
                  iconName: 'Volume2',
                  sortOrder: researchInterests.length + 1,
                  _isExisting: false,
                });
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold shadow-xs cursor-pointer self-start sm:self-center"
            >
              <Plus className="w-4 h-4" />
              <span>Add Research Area</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {researchInterests.map((r, idx) => (
              <div key={r.id || idx} className="p-5 rounded-2xl border border-stone-200 bg-stone-50/50 flex flex-col justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-stone-200 text-stone-800">
                      {r.category}
                    </span>
                    <span className="text-[10px] font-mono text-stone-400">Icon: {r.iconName}</span>
                  </div>
                  <h3 className="font-heading font-bold text-stone-900 text-base">{r.title}</h3>
                  <p className="text-xs text-stone-600 leading-relaxed">{r.description}</p>
                </div>

                <div className="flex justify-end gap-2 border-t border-stone-200/60 pt-3">
                  <button
                    onClick={() => {
                      setModalType('research');
                      setEditingItem({ ...r, _isExisting: true });
                    }}
                    className="p-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-100 text-stone-700 transition-colors cursor-pointer"
                    title="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm({ table: 'research_interests', id: r.id, title: r.title })}
                    className="p-2 rounded-xl border border-stone-300 bg-white hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-stone-400 transition-colors cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------------ */}
      {/* TAB 6: EDUCATION TIMELINE                                                */}
      {/* ------------------------------------------------------------------------ */}
      {activeTab === 'education' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-xs text-left space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5">
            <div>
              <h2 className="text-2xl font-heading font-black text-stone-900">Education & Career Journey</h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">Manage degrees and chronological milestones shown on the About page.</p>
            </div>
            <button
              onClick={() => {
                setModalType('timeline');
                setEditingItem({
                  year: new Date().getFullYear().toString(),
                  title: '',
                  description: '',
                  sortOrder: aboutTimeline.length + 1,
                  _isExisting: false,
                });
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold shadow-xs cursor-pointer self-start sm:self-center"
            >
              <Plus className="w-4 h-4" />
              <span>Add Milestone</span>
            </button>
          </div>

          <div className="space-y-4">
            {aboutTimeline.map((item, idx) => (
              <div key={item.id || idx} className="p-5 rounded-2xl border border-stone-200 bg-stone-50/50 flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="space-y-1">
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-stone-100 text-stone-900 border border-stone-200 inline-block mb-1">
                    {item.year}
                  </span>
                  <h3 className="font-heading font-bold text-stone-900 text-base">{item.title}</h3>
                  <p className="text-xs text-stone-500 max-w-2xl leading-relaxed">{item.description}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => {
                      setModalType('timeline');
                      setEditingItem({ ...item, _isExisting: true });
                    }}
                    className="p-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-100 text-stone-700 transition-colors cursor-pointer"
                    title="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm({ table: 'education_timeline', id: item.id, title: item.title })}
                    className="p-2 rounded-xl border border-stone-300 bg-white hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-stone-400 transition-colors cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------------ */}
      {/* TAB 7: NEWS & ESSAYS (BLOG)                                              */}
      {/* ------------------------------------------------------------------------ */}
      {activeTab === 'blog' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-xs text-left space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5">
            <div>
              <h2 className="text-2xl font-heading font-black text-stone-900">Academic Essays & News</h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">Manage blog essays, reading times, featured images, and markdown content.</p>
            </div>
            <button
              onClick={() => {
                setModalType('blog');
                setEditingItem({
                  id: `blog-${Date.now()}`,
                  slug: '',
                  title: '',
                  date: 'June 2026',
                  readingTime: '5 min read',
                  category: 'Documentation',
                  image: '',
                  excerpt: '',
                  content: '',
                  sortOrder: blogPosts.length + 1,
                  _isExisting: false,
                });
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold shadow-xs cursor-pointer self-start sm:self-center"
            >
              <Plus className="w-4 h-4" />
              <span>Write New Essay</span>
            </button>
          </div>

          <div className="space-y-4">
            {blogPosts.map((post, idx) => (
              <div key={post.id || idx} className="p-5 rounded-2xl border border-stone-200 bg-stone-50/50 flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="space-y-1.5 flex-grow">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-stone-200 text-stone-800">
                      {post.category}
                    </span>
                    <span className="text-xs font-mono text-stone-400">{post.date} · {post.readingTime}</span>
                  </div>
                  <h3 className="font-heading font-bold text-stone-900 text-base leading-snug">{post.title}</h3>
                  <p className="text-xs text-stone-500 font-mono">/blog/{post.slug}</p>
                  <p className="text-xs text-stone-605 leading-relaxed max-w-3xl mt-1">{post.excerpt}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => {
                      setModalType('blog');
                      setEditingItem({
                        ...post,
                        // Use the raw clean URL for editing, not the CSS background-image string
                        image: getCleanImageUrl(post.rawImageUrl || post.image),
                        _isExisting: true,
                      });
                    }}
                    className="p-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-100 text-stone-700 transition-colors cursor-pointer"
                    title="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm({ table: 'blog_posts', id: post.id, title: post.title })}
                    className="p-2 rounded-xl border border-stone-300 bg-white hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-stone-400 transition-colors cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------------ */}
      {/* TAB 8: ACCOUNT & SECURITY (SETTINGS)                                    */}
      {/* ------------------------------------------------------------------------ */}
      {activeTab === 'settings' && <SettingsTab />}

      {/* ------------------------------------------------------------------------ */}
      {/* EDIT / CREATE MODAL                                                      */}
      {/* ------------------------------------------------------------------------ */}
      {modalType && editingItem && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-stone-200 shadow-2xl my-8 text-left space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <h3 className="text-xl font-heading font-black text-stone-900 capitalize">
                {editingItem._isExisting ? `Edit ${modalType}` : `Add New ${modalType}`}
              </h3>
              <button
                onClick={() => {
                  setModalType(null);
                  setEditingItem(null);
                }}
                className="text-stone-400 hover:text-stone-700 font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveItem} className="space-y-4">
              {/* Experience Form Fields */}
              {modalType === 'experience' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-600">Role / Position</label>
                      <input
                        type="text"
                        required
                        value={editingItem.position || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, position: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-stone-250 text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-600">Organization</label>
                      <input
                        type="text"
                        required
                        value={editingItem.organization || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, organization: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-stone-250 text-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-600">Duration (e.g. September 2025 - Present)</label>
                    <input
                      type="text"
                      required
                      value={editingItem.duration || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, duration: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-stone-250 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-600">Description</label>
                    <textarea
                      rows={3}
                      required
                      value={editingItem.description || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-stone-250 text-sm resize-y"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-600">Key Competencies / Skills (comma separated)</label>
                    <input
                      type="text"
                      value={editingItem.skills || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, skills: e.target.value })}
                      placeholder="Praat, ELAN, Phonetics, Fieldwork"
                      className="w-full px-3 py-2 rounded-xl border border-stone-250 text-sm"
                    />
                  </div>
                </>
              )}

              {/* Project Form Fields */}
              {modalType === 'project' && (
                <>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-600">Project Title</label>
                    <input
                      type="text"
                      required
                      value={editingItem.title || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-stone-250 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-600">Tagline</label>
                    <input
                      type="text"
                      value={editingItem.tagline || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, tagline: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-stone-250 text-sm"
                    />
                  </div>
                  <ImageUpload
                    label="Project Banner Image"
                    folder="projects"
                    value={editingItem.image || ''}
                    onChange={(url) => setEditingItem({ ...editingItem, image: url })}
                  />
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-600">Overview Description</label>
                    <textarea
                      rows={3}
                      required
                      value={editingItem.description || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-stone-250 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-600">Technologies & Tools (comma separated)</label>
                    <input
                      type="text"
                      value={editingItem.tech || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, tech: e.target.value })}
                      placeholder="Praat, ELAN, R, Fieldwork"
                      className="w-full px-3 py-2 rounded-xl border border-stone-250 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-600">Key Contribution / Results</label>
                    <textarea
                      rows={2}
                      value={editingItem.results || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, results: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-stone-250 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-600">The Challenge</label>
                    <textarea
                      rows={2}
                      value={editingItem.challenge || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, challenge: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-stone-250 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-600">Research Methodology</label>
                    <textarea
                      rows={2}
                      value={editingItem.researchProcess || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, researchProcess: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-stone-250 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-600">Analysis & Insights</label>
                    <textarea
                      rows={2}
                      value={editingItem.designProcess || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, designProcess: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-stone-250 text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-600">Testimonial Quote</label>
                      <input
                        type="text"
                        value={editingItem.testimonial?.quote || ''}
                        onChange={(e) => setEditingItem({
                          ...editingItem,
                          testimonial: { ...(editingItem.testimonial || {}), quote: e.target.value },
                        })}
                        className="w-full px-3 py-2 rounded-xl border border-stone-250 text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-600">Testimonial Author</label>
                      <input
                        type="text"
                        value={editingItem.testimonial?.author || ''}
                        onChange={(e) => setEditingItem({
                          ...editingItem,
                          testimonial: { ...(editingItem.testimonial || {}), author: e.target.value },
                        })}
                        className="w-full px-3 py-2 rounded-xl border border-stone-250 text-sm"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Publication Form Fields */}
              {modalType === 'publication' && (
                <>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-600">Title</label>
                    <input
                      type="text"
                      required
                      value={editingItem.title || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-stone-250 text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-600">Journal / Conference</label>
                      <input
                        type="text"
                        required
                        value={editingItem.journal || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, journal: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-stone-250 text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-600">Year</label>
                      <input
                        type="text"
                        required
                        value={editingItem.year || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, year: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-stone-250 text-sm"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-600">Authors</label>
                      <input
                        type="text"
                        required
                        value={editingItem.authors || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, authors: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-stone-250 text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-600">Category</label>
                      <select
                        value={editingItem.category || 'Peer-reviewed Article'}
                        onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-stone-250 text-sm"
                      >
                        <option value="Peer-reviewed Article">Peer-reviewed Article</option>
                        <option value="Book Chapter">Book Chapter</option>
                        <option value="Conference Proceedings">Conference Proceedings</option>
                        <option value="Under Review">Under Review</option>
                      </select>
                    </div>
                  </div>
                  <ImageUpload
                    label="Publication PDF Document"
                    folder="publications"
                    accept="application/pdf"
                    value={editingItem.pdfLink || ''}
                    onChange={(url) => setEditingItem({ ...editingItem, pdfLink: url })}
                  />
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-600">Abstract</label>
                    <textarea
                      rows={4}
                      required
                      value={editingItem.abstract || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, abstract: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-stone-250 text-sm resize-y"
                    />
                  </div>
                </>
              )}

              {/* Research Focus Fields */}
              {modalType === 'research' && (
                <>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-600">Research Focus Title</label>
                    <input
                      type="text"
                      required
                      value={editingItem.title || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-stone-250 text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-600">Category</label>
                      <input
                        type="text"
                        required
                        value={editingItem.category || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-stone-250 text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-600">Lucide Icon Name</label>
                      <select
                        value={editingItem.iconName || 'Volume2'}
                        onChange={(e) => setEditingItem({ ...editingItem, iconName: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-stone-250 text-sm"
                      >
                        <option value="Volume2">Volume2 (Acoustics)</option>
                        <option value="Mic">Mic (Verbal Arts)</option>
                        <option value="Move">Move (Gestures)</option>
                        <option value="Heart">Heart (Child-Directed)</option>
                        <option value="BookOpen">BookOpen (Documentation)</option>
                        <option value="Music">Music (Pitch/Tones)</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-600">Description</label>
                    <textarea
                      rows={4}
                      required
                      value={editingItem.description || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-stone-250 text-sm resize-y"
                    />
                  </div>
                </>
              )}

              {/* Education Timeline Fields */}
              {modalType === 'timeline' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-600">Year / Date</label>
                      <input
                        type="text"
                        required
                        value={editingItem.year || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, year: e.target.value })}
                        placeholder="2023 or Expected 2026"
                        className="w-full px-3 py-2 rounded-xl border border-stone-250 text-sm"
                      />
                    </div>
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-600">Degree / Milestone</label>
                      <input
                        type="text"
                        required
                        value={editingItem.title || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-stone-250 text-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-600">Institution & Description</label>
                    <textarea
                      rows={3}
                      required
                      value={editingItem.description || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-stone-250 text-sm resize-y"
                    />
                  </div>
                </>
              )}

              {/* Blog Post Fields */}
              {modalType === 'blog' && (
                <>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-600">Essay Title</label>
                    <input
                      type="text"
                      required
                      value={editingItem.title || ''}
                      onChange={(e) => {
                        const title = e.target.value;
                        setEditingItem({
                          ...editingItem,
                          title,
                          slug: editingItem._isExisting ? editingItem.slug : title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                        });
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-stone-250 text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-600">URL Slug</label>
                      <input
                        type="text"
                        required
                        value={editingItem.slug || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, slug: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-stone-250 text-sm font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-600">Reading Time</label>
                      <input
                        type="text"
                        value={editingItem.readingTime || '5 min read'}
                        onChange={(e) => setEditingItem({ ...editingItem, readingTime: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-stone-250 text-sm"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-600">Date (e.g. June 2026)</label>
                      <input
                        type="text"
                        required
                        value={editingItem.date || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-stone-250 text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-600">Category</label>
                      <input
                        type="text"
                        required
                        value={editingItem.category || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-stone-250 text-sm"
                      />
                    </div>
                  </div>
                  <ImageUpload
                    label="Header Banner Image"
                    folder="blog"
                    value={editingItem.image || ''}
                    onChange={(url) => setEditingItem({ ...editingItem, image: url })}
                  />
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-600">Excerpt</label>
                    <textarea
                      rows={2}
                      required
                      value={editingItem.excerpt || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, excerpt: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-stone-250 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-600">Full Content (Markdown supported)</label>
                    <textarea
                      rows={8}
                      required
                      value={editingItem.content || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, content: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-stone-250 text-sm font-mono resize-y"
                    />
                  </div>
                </>
              )}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => {
                    setModalType(null);
                    setEditingItem(null);
                  }}
                  className="px-5 py-2.5 rounded-full border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-full bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------------ */}
      {/* DELETE CONFIRMATION MODAL                                                */}
      {/* ------------------------------------------------------------------------ */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-stone-200 shadow-2xl text-left space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-heading font-bold text-stone-900">Confirm Deletion</h3>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Are you sure you want to permanently delete <strong className="text-stone-900">"{deleteConfirm.title}"</strong>? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 rounded-full border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm.table, deleteConfirm.id)}
                className="px-5 py-2 rounded-full bg-red-600 text-white text-xs font-semibold hover:bg-red-700 cursor-pointer"
              >
                Delete Record
              </button>
            </div>
          </div>
        </div>
      )}

    </AdminLayout>
  );
}

// ============================================================================
// SETTINGS TAB — Account & Security
// ============================================================================
function SettingsTab() {
  const { user, updateEmail, updatePassword } = useAuth();

  // Email change state
  const [newEmail, setNewEmail] = useState('');
  const [emailSaving, setEmailSaving] = useState(false);
  const [emailStatus, setEmailStatus] = useState(null); // { type: 'success'|'error', msg }

  // Password change state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState(null);

  const handleEmailChange = async (e) => {
    e.preventDefault();
    setEmailSaving(true);
    setEmailStatus(null);
    try {
      const { error } = await updateEmail(newEmail);
      if (error) {
        setEmailStatus({ type: 'error', msg: error.message });
      } else {
        setEmailStatus({
          type: 'success',
          msg: 'Confirmation email sent! Check your new inbox to confirm the change.',
        });
        setNewEmail('');
      }
    } catch (err) {
      setEmailStatus({ type: 'error', msg: err.message || 'Failed to update email.' });
    } finally {
      setEmailSaving(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordStatus({ type: 'error', msg: 'Passwords do not match. Please re-enter.' });
      return;
    }
    if (newPassword.length < 8) {
      setPasswordStatus({ type: 'error', msg: 'Password must be at least 8 characters long.' });
      return;
    }
    setPasswordSaving(true);
    setPasswordStatus(null);
    try {
      const { error } = await updatePassword(newPassword);
      if (error) {
        setPasswordStatus({ type: 'error', msg: error.message });
      } else {
        setPasswordStatus({ type: 'success', msg: 'Password updated successfully!' });
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (err) {
      setPasswordStatus({ type: 'error', msg: err.message || 'Failed to update password.' });
    } finally {
      setPasswordSaving(false);
    }
  };

  const StatusBanner = ({ status }) => {
    if (!status) return null;
    const isError = status.type === 'error';
    return (
      <div
        className={`flex items-start gap-3 p-4 rounded-2xl text-xs font-medium border ${
          isError
            ? 'bg-red-50 border-red-200 text-red-800'
            : 'bg-emerald-50 border-emerald-200 text-emerald-800'
        }`}
      >
        {isError ? (
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
        ) : (
          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
        )}
        <span>{status.msg}</span>
      </div>
    );
  };

  return (
    <div className="space-y-6 text-left">
      {/* Current Account Info */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-xs space-y-4">
        <div className="border-b border-stone-100 pb-5">
          <h2 className="text-2xl font-heading font-black text-stone-900">Account &amp; Security</h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Manage your admin login email address and password.
          </p>
        </div>

        <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-stone-50 border border-stone-200">
          <div className="w-9 h-9 rounded-xl bg-stone-900 text-white flex items-center justify-center shrink-0 text-sm font-black font-heading">
            {user?.email?.[0]?.toUpperCase() || 'A'}
          </div>
          <div>
            <p className="text-xs font-bold text-stone-900">{user?.email || '—'}</p>
            <p className="text-[11px] text-stone-400 font-mono">Authenticated admin account</p>
          </div>
        </div>
      </div>

      {/* Change Email */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-xs space-y-6">
        <div className="border-b border-stone-100 pb-5">
          <h3 className="text-lg font-heading font-black text-stone-900 flex items-center gap-2">
            <Mail className="w-5 h-5 text-stone-500" />
            Change Email Address
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            A confirmation link will be sent to your new email before the change takes effect.
          </p>
        </div>

        <form onSubmit={handleEmailChange} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-600">
              New Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                required
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="new@email.com"
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-stone-250 bg-stone-50/50 text-stone-900 text-sm focus:outline-none focus:border-stone-900 focus:bg-white transition-colors"
              />
            </div>
          </div>

          <StatusBanner status={emailStatus} />

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={emailSaving || !newEmail}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold shadow-xs cursor-pointer disabled:opacity-50"
            >
              {emailSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
              <span>Update Email</span>
            </button>
          </div>
        </form>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-xs space-y-6">
        <div className="border-b border-stone-100 pb-5">
          <h3 className="text-lg font-heading font-black text-stone-900 flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-stone-500" />
            Change Password
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            Use a strong password of at least 8 characters with a mix of letters, numbers, and symbols.
          </p>
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* New Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-600">
                New Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showNewPwd ? 'text' : 'password'}
                  required
                  minLength={8}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  className="w-full pl-10 pr-11 py-3 rounded-2xl border border-stone-250 bg-stone-50/50 text-stone-900 text-sm focus:outline-none focus:border-stone-900 focus:bg-white transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPwd(!showNewPwd)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1"
                >
                  {showNewPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-600">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showConfirmPwd ? 'text' : 'password'}
                  required
                  minLength={8}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat password"
                  className={`w-full pl-10 pr-11 py-3 rounded-2xl border bg-stone-50/50 text-stone-900 text-sm focus:outline-none focus:bg-white transition-colors ${
                    confirmPassword && newPassword !== confirmPassword
                      ? 'border-red-400 focus:border-red-500'
                      : 'border-stone-250 focus:border-stone-900'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPwd(!showConfirmPwd)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1"
                >
                  {showConfirmPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {confirmPassword && newPassword !== confirmPassword && (
                <p className="text-[11px] text-red-500 font-medium">Passwords do not match</p>
              )}
            </div>
          </div>

          {/* Password strength indicator */}
          {newPassword.length > 0 && (
            <div className="space-y-1">
              <div className="flex gap-1">
                {[...Array(4)].map((_, i) => {
                  const strength =
                    (newPassword.length >= 8 ? 1 : 0) +
                    (/[A-Z]/.test(newPassword) ? 1 : 0) +
                    (/[0-9]/.test(newPassword) ? 1 : 0) +
                    (/[^A-Za-z0-9]/.test(newPassword) ? 1 : 0);
                  return (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        i < strength
                          ? strength <= 1
                            ? 'bg-red-400'
                            : strength <= 2
                            ? 'bg-amber-400'
                            : strength <= 3
                            ? 'bg-blue-400'
                            : 'bg-emerald-500'
                          : 'bg-stone-200'
                      }`}
                    />
                  );
                })}
              </div>
              <p className="text-[11px] text-stone-400">
                {(() => {
                  const s =
                    (newPassword.length >= 8 ? 1 : 0) +
                    (/[A-Z]/.test(newPassword) ? 1 : 0) +
                    (/[0-9]/.test(newPassword) ? 1 : 0) +
                    (/[^A-Za-z0-9]/.test(newPassword) ? 1 : 0);
                  return s <= 1 ? 'Weak' : s === 2 ? 'Fair' : s === 3 ? 'Good' : 'Strong';
                })()}
                {' '}— add uppercase, numbers, and symbols to strengthen
              </p>
            </div>
          )}

          <StatusBanner status={passwordStatus} />

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={passwordSaving || !newPassword || !confirmPassword}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold shadow-xs cursor-pointer disabled:opacity-50"
            >
              {passwordSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
              <span>Update Password</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
