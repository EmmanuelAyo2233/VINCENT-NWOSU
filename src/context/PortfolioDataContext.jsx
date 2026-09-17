import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import {
  profileInfo as fallbackProfile,
  aboutTimeline as fallbackTimeline,
  researchInterests as fallbackInterests,
  projectsData as fallbackProjects,
  experienceData as fallbackExperiences,
  publicationsData as fallbackPublications,
  blogPostsData as fallbackBlogPosts,
} from '../data/mockData';

const PortfolioDataContext = createContext(null);

export function PortfolioDataProvider({ children }) {
  const [profile, setProfile] = useState(fallbackProfile);
  const [aboutTimeline, setAboutTimeline] = useState(fallbackTimeline);
  const [researchInterests, setResearchInterests] = useState(fallbackInterests);
  const [projects, setProjects] = useState(fallbackProjects);
  const [experiences, setExperiences] = useState(fallbackExperiences);
  const [publications, setPublications] = useState(fallbackPublications);
  const [blogPosts, setBlogPosts] = useState(fallbackBlogPosts);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [isLive, setIsLive] = useState(false);

  const fetchAllData = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    try {
      // 1. Fetch Profile
      const { data: profileData, error: profileErr } = await supabase
        .from('profiles')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!profileErr && profileData) {
        setProfile({
          id: profileData.id,
          name: profileData.name || fallbackProfile.name,
          title: profileData.title || fallbackProfile.title,
          bio: profileData.bio || fallbackProfile.bio,
          aboutHeadline: profileData.about_headline,
          aboutNarrative1: profileData.about_narrative_1,
          aboutNarrative2: profileData.about_narrative_2,
          email: profileData.email || fallbackProfile.email,
          location: profileData.location || fallbackProfile.location,
          department: profileData.department,
          institution: profileData.institution,
          address: profileData.address,
          avatarUrl: profileData.avatar_url || '/vin-photo.jpg',
          cvUrl: profileData.cv_url || '/Vincent_Nwosu_CV.pdf',
          socials: {
            linkedin: profileData.social_linkedin || fallbackProfile.socials.linkedin,
            twitter: profileData.social_twitter || fallbackProfile.socials.twitter,
            github: profileData.social_github || fallbackProfile.socials.github,
          },
        });
      }

      // 2. Fetch Experiences
      const { data: expData, error: expErr } = await supabase
        .from('experiences')
        .select('*')
        .order('sort_order', { ascending: true });

      if (!expErr && expData && expData.length > 0) {
        setExperiences(
          expData.map((e) => ({
            id: e.id,
            organization: e.organization,
            position: e.position,
            duration: e.duration,
            description: e.description,
            skills: Array.isArray(e.skills) ? e.skills : [],
            sortOrder: e.sort_order,
          }))
        );
      }

      // 3. Fetch Projects
      const { data: projData, error: projErr } = await supabase
        .from('projects')
        .select('*')
        .order('sort_order', { ascending: true });

      if (!projErr && projData && projData.length > 0) {
        setProjects(
          projData.map((p) => ({
            id: p.id,
            title: p.title,
            tagline: p.tagline || '',
            description: p.description || '',
            image: p.image?.startsWith('http') || p.image?.startsWith('url(') ? p.image : `url('${p.image}') center/cover no-repeat`,
            rawImageUrl: p.image,
            tech: Array.isArray(p.tech) ? p.tech : [],
            results: p.results || '',
            challenge: p.challenge || '',
            researchProcess: p.research_process || '',
            designProcess: p.design_process || '',
            gallery: Array.isArray(p.gallery) ? p.gallery : [],
            featured: p.featured ?? true,
            sortOrder: p.sort_order,
            testimonial: {
              quote: p.testimonial_quote || '',
              author: p.testimonial_author || '',
            },
          }))
        );
      }

      // 4. Fetch Research Interests
      const { data: resData, error: resErr } = await supabase
        .from('research_interests')
        .select('*')
        .order('sort_order', { ascending: true });

      if (!resErr && resData && resData.length > 0) {
        setResearchInterests(
          resData.map((r) => ({
            id: r.id,
            category: r.category,
            title: r.title,
            description: r.description,
            iconName: r.icon_name || 'BookOpen',
            sortOrder: r.sort_order,
          }))
        );
      }

      // 5. Fetch Education Timeline
      const { data: timeData, error: timeErr } = await supabase
        .from('education_timeline')
        .select('*')
        .order('sort_order', { ascending: true });

      if (!timeErr && timeData && timeData.length > 0) {
        setAboutTimeline(
          timeData.map((t) => ({
            id: t.id,
            year: t.year,
            title: t.title,
            description: t.description,
            sortOrder: t.sort_order,
          }))
        );
      }

      // 6. Fetch Publications
      const { data: pubData, error: pubErr } = await supabase
        .from('publications')
        .select('*')
        .order('sort_order', { ascending: true });

      if (!pubErr && pubData && pubData.length > 0) {
        setPublications(
          pubData.map((pb) => ({
            id: pb.id,
            title: pb.title,
            journal: pb.journal,
            year: pb.year,
            authors: pb.authors,
            abstract: pb.abstract,
            pdfLink: pb.pdf_link || '/Vincent_Nwosu_CV.pdf',
            category: pb.category,
            sortOrder: pb.sort_order,
          }))
        );
      }

      // 7. Fetch Blog Posts
      const { data: blogData, error: blogErr } = await supabase
        .from('blog_posts')
        .select('*')
        .order('sort_order', { ascending: true });

      if (!blogErr && blogData && blogData.length > 0) {
        setBlogPosts(
          blogData.map((b) => ({
            id: b.id,
            slug: b.slug,
            title: b.title,
            date: b.date,
            readingTime: b.reading_time,
            category: b.category,
            image: b.image?.startsWith('http') || b.image?.startsWith('url(') ? b.image : `url('${b.image}') center/cover no-repeat`,
            rawImageUrl: b.image,
            excerpt: b.excerpt,
            content: b.content,
            sortOrder: b.sort_order,
            toc: extractTocFromMarkdown(b.content),
          }))
        );
      }

      setIsLive(true);
    } catch (err) {
      console.warn('[PortfolioDataProvider] Could not load live data from Supabase. Falling back to local data.', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  return (
    <PortfolioDataContext.Provider
      value={{
        profile,
        aboutTimeline,
        researchInterests,
        projects,
        experiences,
        publications,
        blogPosts,
        loading,
        isLive,
        refreshData: fetchAllData,
      }}
    >
      {children}
    </PortfolioDataContext.Provider>
  );
}

// Helper to extract table of contents from markdown headings
function extractTocFromMarkdown(content) {
  if (!content) return [];
  const lines = content.split('\n');
  const headings = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('## ')) {
      const text = trimmed.replace('## ', '').trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      headings.push({ text, id });
    }
  }
  return headings;
}

export function usePortfolioData() {
  const context = useContext(PortfolioDataContext);
  if (!context) {
    // Graceful fallback if called outside provider
    return {
      profile: fallbackProfile,
      aboutTimeline: fallbackTimeline,
      researchInterests: fallbackInterests,
      projects: fallbackProjects,
      experiences: fallbackExperiences,
      publications: fallbackPublications,
      blogPosts: fallbackBlogPosts,
      loading: false,
      isLive: false,
      refreshData: () => {},
    };
  }
  return context;
}
