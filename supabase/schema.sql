-- ==============================================================================
-- VINCENT NWOSU PORTFOLIO - SUPABASE DATABASE SCHEMA, STORAGE & RLS POLICIES
-- ==============================================================================
-- Run this entire file once in your Supabase SQL Editor.
-- It creates all tables, enables Row Level Security (RLS), configures the
-- storage bucket for image/file uploads, and seeds your current portfolio data.

-- ------------------------------------------------------------------------------
-- 1. EXTENSIONS
-- ------------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 2. TABLES
-- ------------------------------------------------------------------------------

-- Profile & Contact Information
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL DEFAULT 'Vincent Nwosu',
  title TEXT NOT NULL DEFAULT 'Linguist & Phonologist',
  bio TEXT NOT NULL,
  about_headline TEXT,
  about_narrative_1 TEXT,
  about_narrative_2 TEXT,
  email TEXT NOT NULL,
  location TEXT NOT NULL,
  department TEXT,
  institution TEXT,
  address TEXT,
  avatar_url TEXT DEFAULT '/vin-photo.jpg',
  cv_url TEXT DEFAULT '/Vincent_Nwosu_CV.pdf',
  social_linkedin TEXT,
  social_twitter TEXT,
  social_github TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Work & Academic Experience
CREATE TABLE IF NOT EXISTS public.experiences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization TEXT NOT NULL,
  position TEXT NOT NULL,
  duration TEXT NOT NULL,
  description TEXT NOT NULL,
  skills TEXT[] DEFAULT '{}',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Fieldwork & Research Projects
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  tagline TEXT,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  tech TEXT[] DEFAULT '{}',
  results TEXT,
  challenge TEXT,
  research_process TEXT,
  design_process TEXT,
  gallery TEXT[] DEFAULT '{}',
  testimonial_quote TEXT,
  testimonial_author TEXT,
  featured BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Research Interests & Focus Areas
CREATE TABLE IF NOT EXISTS public.research_interests (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT DEFAULT 'BookOpen',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Education & Academic Timeline
CREATE TABLE IF NOT EXISTS public.education_timeline (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  year TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Academic Publications
CREATE TABLE IF NOT EXISTS public.publications (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  journal TEXT NOT NULL,
  year TEXT NOT NULL,
  authors TEXT NOT NULL,
  abstract TEXT NOT NULL,
  pdf_link TEXT DEFAULT '/Vincent_Nwosu_CV.pdf',
  category TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Essays & Blog Posts
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  reading_time TEXT DEFAULT '5 min read',
  category TEXT NOT NULL,
  image TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- 3. ROW LEVEL SECURITY (RLS)
-- ------------------------------------------------------------------------------

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education_timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Anonymous public read policies (for public portfolio visitors)
DROP POLICY IF EXISTS "Public can view profiles" ON public.profiles;
CREATE POLICY "Public can view profiles" ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view experiences" ON public.experiences;
CREATE POLICY "Public can view experiences" ON public.experiences FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view projects" ON public.projects;
CREATE POLICY "Public can view projects" ON public.projects FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view research_interests" ON public.research_interests;
CREATE POLICY "Public can view research_interests" ON public.research_interests FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view education_timeline" ON public.education_timeline;
CREATE POLICY "Public can view education_timeline" ON public.education_timeline FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view publications" ON public.publications;
CREATE POLICY "Public can view publications" ON public.publications FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view blog_posts" ON public.blog_posts;
CREATE POLICY "Public can view blog_posts" ON public.blog_posts FOR SELECT USING (true);

-- Authenticated write policies (Only admin can INSERT, UPDATE, DELETE)
DROP POLICY IF EXISTS "Admin can modify profiles" ON public.profiles;
CREATE POLICY "Admin can modify profiles" ON public.profiles FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin can modify experiences" ON public.experiences;
CREATE POLICY "Admin can modify experiences" ON public.experiences FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin can modify projects" ON public.projects;
CREATE POLICY "Admin can modify projects" ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin can modify research_interests" ON public.research_interests;
CREATE POLICY "Admin can modify research_interests" ON public.research_interests FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin can modify education_timeline" ON public.education_timeline;
CREATE POLICY "Admin can modify education_timeline" ON public.education_timeline FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin can modify publications" ON public.publications;
CREATE POLICY "Admin can modify publications" ON public.publications FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin can modify blog_posts" ON public.blog_posts;
CREATE POLICY "Admin can modify blog_posts" ON public.blog_posts FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ------------------------------------------------------------------------------
-- 4. STORAGE BUCKET FOR PORTFOLIO ASSETS
-- ------------------------------------------------------------------------------

-- Insert bucket if not exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-assets', 'portfolio-assets', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Public can read assets from portfolio-assets bucket
DROP POLICY IF EXISTS "Public read access for portfolio-assets" ON storage.objects;
CREATE POLICY "Public read access for portfolio-assets" ON storage.objects
  FOR SELECT USING (bucket_id = 'portfolio-assets');

-- Authenticated users can upload assets
DROP POLICY IF EXISTS "Admin upload access for portfolio-assets" ON storage.objects;
CREATE POLICY "Admin upload access for portfolio-assets" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'portfolio-assets');

-- Authenticated users can update assets
DROP POLICY IF EXISTS "Admin update access for portfolio-assets" ON storage.objects;
CREATE POLICY "Admin update access for portfolio-assets" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'portfolio-assets');

-- Authenticated users can delete assets
DROP POLICY IF EXISTS "Admin delete access for portfolio-assets" ON storage.objects;
CREATE POLICY "Admin delete access for portfolio-assets" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'portfolio-assets');

-- ------------------------------------------------------------------------------
-- 5. INITIAL DATA SEEDING (FROM EXISTING PORTFOLIO CONTENT)
-- ------------------------------------------------------------------------------

-- Profile
INSERT INTO public.profiles (
  id,
  name,
  title,
  bio,
  about_headline,
  about_narrative_1,
  about_narrative_2,
  email,
  location,
  department,
  institution,
  address,
  avatar_url,
  cv_url,
  social_linkedin,
  social_twitter,
  social_github
) VALUES (
  '00000000-0000-0000-0000-000000000001'::uuid,
  'Vincent Nwosu',
  'Linguist & Phonologist',
  'I am a PhD candidate in the Department of Linguistics at the University of Calgary, supervised by Darin Flynn and co-supervised by Kathryn Franich. I am also an affiliate member of the Harvard Phonetics Lab.

My dissertation, The LabPhon Study of the Igbo Verbal Arts, examines the prosodic and phonetic structure of Igbo storytelling, ritual chants, and children’s songs. My broader research interests include tonal phonology, acoustic phonetics, speech–gesture timing, child-directed speech, and the documentation of endangered languages.',
  'Investigating the structural properties of language through acoustics, phonetics, and multimodal gestures.',
  'My academic research centers on phonological and phonetic analysis of Niger-Congo languages, with a particular focus on the Igbo language. I study how speech timing interacts with co-speech gestures, child-directed speech, and tone-tune correspondence in liturgical and storytelling contexts.',
  'I hold M.A. degrees in Linguistics and Cognitive Science from the University of Delaware and English Language/Philosophy from Ahmadu Bello University. I am currently completing my doctoral research at the University of Calgary, and work to document and preserve endangered oral narratives.',
  'vincent.nwosu@ucalgary.ca',
  'Calgary, AB, Canada',
  'School of Languages, Linguistics, Literatures and Cultures',
  'University of Calgary',
  '2500 University Drive NW, Calgary, AB T2N 1N4',
  '/vin-photo.jpg',
  '/Vincent_Nwosu_CV.pdf',
  'https://www.linkedin.com/in/vincentnwosu?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
  'https://x.com/nwosuvincent?s=11',
  'https://github.com/vincentnwosu'
) ON CONFLICT (id) DO NOTHING;

-- Experiences
INSERT INTO public.experiences (organization, position, duration, description, skills, sort_order) VALUES
('Faculty of Arts, University of Calgary', 'Research Impact Coordinator', 'September 2025 - Present', 'Coordinating research outputs and documenting impacts of humanities and linguistics projects across the faculty.', ARRAY['Research Coordination', 'Project Impact Evaluation', 'Academic Writing'], 1),
('University of Calgary', 'Graduate Research & Teaching Assistant', 'September 2023 - Present', 'Conducting phonetic and phonological analysis of child-directed speech and verbal arts. Assisting in teaching courses on Linguistics.', ARRAY['Praat', 'ELAN', 'Course Instruction', 'Phonetic Analysis', 'Acoustics'], 2),
('Harvard Phonetics Lab, Harvard University', 'Affiliate Member / Researcher', 'August 2023 - Present', 'Collaborating on research projects investigating the timing of co-speech gestures in Niger-Congo languages.', ARRAY['Multimodal Communication', 'Speech Timing', 'Phonetics', 'Cross-linguistic Analysis'], 3),
('University of Delaware', 'Graduate Research & Teaching Assistant', 'August 2021 - August 2023', 'Conducted fieldwork on speech timing in Cameroon. Ran phonetic experiments with 65 subjects in Yaoundé and Bamileke.', ARRAY['Fieldwork Protocols', 'Experimental Design', 'Data Annotation', 'Linguistic Analysis'], 4),
('Titsall High School, Abuja, Nigeria', 'Principal', 'January 2019 - June 2021', 'Managed academic administration, curriculum design, and teacher training for a leading secondary school in Abuja.', ARRAY['Educational Leadership', 'Curriculum Development', 'Administration'], 5),
('Federal College of Education, Zaria, Nigeria', 'Lecturer (Sandwich Program)', 'May 2017 - June 2018', 'Instructed courses in English language, literature, and general studies to prospective educators.', ARRAY['Lecture Delivery', 'Student Advising', 'Academic Assessment'], 6)
ON CONFLICT DO NOTHING;

-- Projects
INSERT INTO public.projects (id, title, tagline, description, image, tech, results, challenge, research_process, design_process, gallery, testimonial_quote, testimonial_author, featured, sort_order) VALUES
(
  'project-1',
  'Igbo Language & Verbal Arts Documentation',
  'Archiving 57+ hours of high-fidelity audiovisual storytelling and chants.',
  'This project aims to document endangered oral traditions, mbem chants, folktales, and child-directed speech across various Igbo-speaking regions in Nigeria. The resulting audiovisual corpus serves both language preservation efforts and research on narrative rhythmic and acoustic patterns.',
  'url(''/igbo img.jpeg'') center/cover no-repeat',
  ARRAY['Praat', 'ELAN', 'Fieldwork', 'Audio Engineering', 'Linguistic Archiving'],
  'Collected and annotated over 57 hours of audiovisual recordings with bilingual transcripts.',
  'Accessing remote regional communities and ensuring audio fidelity during spontaneous storytelling performances, particularly preserving subtle tone modulations and gestures in local performance contexts.',
  'We conducted active field trips, trained local assistants on ELAN tools, established rigorous consent protocols, and archived high-definition audio datasets for downstep analysis.',
  'Annotating tone and gesture timing alignment using specialized software packages like ELAN to create microsecond-level synchronization plots.',
  ARRAY['url(''/igbo img.jpeg'') center/cover no-repeat', 'url(''/cameroon img.jpeg'') center/cover no-repeat'],
  'Vincent''s extensive documentation work on Igbo verbal arts captures phonetic variations and oral traditions that might otherwise be lost.',
  'Dr. Kathryn Franich, Harvard University / University of Delaware',
  true,
  1
),
(
  'project-2',
  'Cameroon Multimodal Speech Timing Study',
  'Analyzing the synchronization of speech prominence and physical co-speech gestures.',
  'Investigated how acoustic pitch cues, syllable prominence, and co-speech gestures align in Cameroon languages including Kejom and Medʉmba. This study challenges current theories of timing by showing dialect-specific gesture-speech coordination rules.',
  'url(''/cameroon img.jpeg'') center/cover no-repeat',
  ARRAY['Praat', 'ELAN', 'Acoustic Phonetics', 'Motion Tracking', 'Statistical Analysis'],
  'Ran controlled experiments with 65 research subjects across Yaoundé and Bamileke, Cameroon.',
  'Isolating precise physical hand/body movement offsets from high-speed videography and matching them precisely to micro-acoustic features in raw field recordings.',
  'Utilized frame-by-frame analysis combined with automated Praat pitch-tracking algorithms to compare gesture shifts with vocal markers.',
  'Statistical modeling using R to map predicted alignments of gestures with high-pitch pitch target regions.',
  ARRAY['url(''/cameroon img.jpeg'') center/cover no-repeat', 'url(''/project-ika-doc.png'') center/cover no-repeat'],
  'The findings from the Cameroon timing project have significant implications for understanding the universal versus language-specific aspects of human communication.',
  'Linguistics Research Lab, SLLLC, University of Calgary',
  true,
  2
),
(
  'project-3',
  'Ika Language Documentation Project',
  'Systematically documenting the phonology and oral narratives of Ika.',
  'A long-term project documenting grammatical structure, phonological rules (such as vowel coalescence and tone spreading), and community narratives of the under-studied Ika language in southern Nigeria.',
  'url(''/project-ika-doc.png'') center/cover no-repeat',
  ARRAY['Fieldwork Methods', 'ELAN Annotation', 'Lexicography', 'Grammar Analysis'],
  'Developed training workshops for student research assistants on ELAN software and fieldwork protocols.',
  'Documenting complex tonal shifts and morpho-phonological processes that occur in quick conversational speech.',
  'Conducted field interviews, built wordlists, analyzed conversational texts, and cataloged phonetic variables in different dialect zones.',
  'Building lexical databases and digital mapping of acoustic parameters for local vowel coalescence patterns.',
  ARRAY['url(''/project-ika-doc.png'') center/cover no-repeat', 'url(''/project-igbo-doc.png'') center/cover no-repeat'],
  'Vincent''s dedication to documentation provides a vital foundation for both theoretical analysis and language revitalization.',
  'Collaborative Research Network on African Linguistics',
  true,
  3
) ON CONFLICT (id) DO NOTHING;

-- Research Interests
INSERT INTO public.research_interests (id, category, title, description, icon_name, sort_order) VALUES
('tone-prosody', 'Phonetics & Phonology', 'Tone & Prosody', 'I investigate the phonetic realization of tone and prosodic structure in Igbo and other Niger-Congo languages, with a focus on the phonetics–phonology interface. My work examines how tonal and prosodic patterns are encoded in the acoustic signal and how they interact with other levels of linguistic structure.', 'Volume2', 1),
('acoustics-verbal-arts', 'Phonetics & Phonology', 'Acoustics of Verbal Arts', 'I study the acoustic properties of Igbo verbal arts — including storytelling, ritual chants (mbem), and children’s songs — using laboratory phonology methods. This work brings experimental phonetics to bear on oral literary traditions, revealing how performers manipulate prosody, voice quality, and rhythm to create meaning.', 'Mic', 2),
('co-speech-gestures', 'Multimodal Communication', 'Co-Speech Gestures', 'I examine the temporal relationship between speech and gesture, particularly how prosodic and tonal structure predicts the timing of co-speech gestures in Igbo. This work contributes to our understanding of the multimodal nature of human communication and the grammatical basis of gestural timing.', 'Move', 3),
('child-directed-speech', 'Development', 'Child-Directed Speech', 'I investigate how tonal and prosodic properties of speech are adapted when Igbo speakers address young children, exploring the intersection of phonetics, language acquisition, and caregiver communication.', 'Heart', 4),
('language-documentation', 'Documentation', 'Language Documentation', 'I am committed to the documentation and typological study of endangered and understudied African languages, with active projects on Igbo and Ika, an endangered Igboid language of Nigeria.', 'BookOpen', 5)
ON CONFLICT (id) DO NOTHING;

-- Education Timeline
INSERT INTO public.education_timeline (year, title, description, sort_order) VALUES
('2016', 'B.A. in English and Literary Studies', 'Ahmadu Bello University, Zaria, Nigeria. Awarded Best Graduating Student in the English Department.', 1),
('2019', 'M.A. in English Language and Philosophy', 'Ahmadu Bello University, Zaria, Nigeria. Conducted a stylo-linguistic analysis of contemporary prose.', 2),
('2023', 'M.A. in Linguistics and Cognitive Science', 'University of Delaware, USA. Thesis: Acoustic Analysis of Implosives in Igbo under advisor Kathryn Franich.', 3),
('Expected 2026', 'Ph.D. Candidate in Linguistics', 'University of Calgary, Canada. Dissertation: The LabPhon Study of the Igbo Verbal Arts under advisor Darin Flynn.', 4)
ON CONFLICT DO NOTHING;

-- Publications
INSERT INTO public.publications (id, title, journal, year, authors, abstract, pdf_link, category, sort_order) VALUES
(
  'pub-1',
  'Automatic and Non-Automatic Downstep in Igbo Are Not Realized the Same',
  'Proceedings of Speech Prosody 2026',
  '2026',
  'Vincent Nwosu',
  'This study investigates the phonetic realization of automatic (automatic pitch lowering) and non-automatic downstep in Igbo. Using acoustic measurements of fundamental frequency (F0), we show that these two types of downstep exhibit distinct realization characteristics in natural speech, suggesting that they are governed by different prosodic mechanisms.',
  '/Vincent_Nwosu_CV.pdf',
  'Peer-reviewed Article',
  1
),
(
  'pub-2',
  'Singing to Children in Igbo: An Acoustic Analysis of Pitch and Voice Quality',
  'Proceedings of Speech Prosody 2026',
  '2026',
  'Vincent Nwosu',
  'Examines the acoustic properties of Igbo child-directed singing. We analyze how parameters of pitch range, pitch variability, and voice quality features adjust during maternal singing compared to adult-directed talk. Results reveal significant prosodic adjustments aimed at enhancing communication.',
  '/Vincent_Nwosu_CV.pdf',
  'Peer-reviewed Article',
  2
),
(
  'pub-3',
  'Prosody and Predictability in the Timing of Co-Speech Gestures: Evidence from Igbo ''Gesture Shift''',
  'Laboratory Phonology',
  '2026',
  'Kathryn Franich & Vincent Nwosu',
  'Investigates how linguistic prosody (pitch accents, tone melody) and semantic predictability influence the temporal alignment of co-speech hand gestures in Igbo storytelling. We observe systematic gesture shifts that suggest a strong link between linguistic structure and bodily motion.',
  '/Vincent_Nwosu_CV.pdf',
  'Peer-reviewed Article',
  3
),
(
  'pub-4',
  'The timing of speech and gesture in two Niger-Congo languages: Implications for word-level prominence',
  'Glossa',
  '2025',
  'Kathryn Franich, H. Keupdjio, & Vincent Nwosu',
  'An analysis comparing speech-gesture timing coordination across two different Niger-Congo languages. The study addresses the theoretical implications of multimodal synchronization for determining word-level phonetic prominence in languages lacking standard lexical stress.',
  '/Vincent_Nwosu_CV.pdf',
  'Peer-reviewed Article',
  4
),
(
  'pub-5',
  'The Acoustic Analysis of Implosives in the Igbo Language',
  'Studies in Phonetics and Phonology, University of Toronto Press',
  'In Press',
  'Vincent Nwosu & Kathryn Franich',
  'Provides a detailed phonetic and acoustic description of implosive consonants in Igbo. We map out differences in voice onset time, closure duration, and formant transitions across dialects.',
  '/Vincent_Nwosu_CV.pdf',
  'Book Chapter',
  5
),
(
  'pub-6',
  '''The owl never cries in vain'': An acoustic study of vocal expressions in mbem chants',
  'Frontiers in Communication',
  'Under Review',
  'Vincent Nwosu',
  'An acoustic investigation of vocal expressions, pitch ranges, and rhythmic configurations in Igbo mbem oral narrative chants, highlighting the intersection between speech melody and musical performance.',
  '/Vincent_Nwosu_CV.pdf',
  'Under Review',
  6
) ON CONFLICT (id) DO NOTHING;

-- Blog Posts
INSERT INTO public.blog_posts (id, slug, title, date, reading_time, category, image, excerpt, content, sort_order) VALUES
(
  'blog-1',
  'preserving-verbal-arts-in-the-digital-age',
  'Preserving Endangered Verbal Arts in the Digital Age',
  'June 2026',
  '6 min read',
  'Documentation',
  'url(''/blog-verbal-arts.png'') center/cover no-repeat',
  'Why documenting spoken language involves capturing the musicality, performance context, and co-speech gestures of oral traditions.',
  '# Preserving Endangered Verbal Arts in the Digital Age

Linguistic documentation has traditionally focused on compiling word lists, writing dictionaries, and parsing grammatical rules. While these are critical components, they often omit the living performance of language: storytelling, ritual chants, and song. 

In this essay, we look at the importance of archiving oral narratives and how multimodal recording changes our understanding of linguistic structure.

## The Limits of Written Text

When an oral narrative is written down, it loses its dynamic dimensions:
- **Pitch Modulation**: In tone languages like Igbo, pitch distinguishes word meanings and guides sentence grammar.
- **Rhythmic Timing**: Chants and stories have internal meters that align with breathing and structural beats.
- **Co-speech Gestures**: Hands, eyes, and posture form an integrated communication system with speech.

## Multimodal Archiving in Practice

Using modern annotation software like ELAN, we can align acoustic waveforms with video transcripts frame-by-frame. This allows us to measure precisely:
1. **Gesture-Speech Synchrony**: Do gestures precede the spoken prominence, or do they align with tone changes?
2. **Dynamic Pitch Trajectories**: Tracking pitch curves in folk stories reveals how narrators project emotion and structure paragraphs.
3. **Dialectical Variations**: Preserving phonetic nuances across geographical clusters.

By treating speech as a multimodal performance, we create rich datasets that benefit researchers, educators, and community members working to revitalize their heritage languages.',
  1
),
(
  'blog-2',
  'what-is-tone-tune-correspondence',
  'What is Tone-Tune Correspondence?',
  'April 2026',
  '5 min read',
  'Phonology',
  'url(''/blog-tone-tune.png'') center/cover no-repeat',
  'Exploring the phonology of singing in tone languages where pitch changes can conflict with lexical meaning.',
  '# What is Tone-Tune Correspondence?

In non-tonal languages like English, the pitch of a song''s melody is independent of word choice. A singer can sing the word ''hello'' on any pitch pattern. In tonal languages, however, pitch is lexical: changing the pitch changes the meaning of the word.

How do speakers of tone languages sing without losing semantic clarity? This is the study of **Tone-Tune Correspondence**.

## The Pitch Conflict

For example, in Igbo, ''éwú'' (High-High) means ''goat'' and ''èwù'' (Low-Low) means ''fame''. If a musical melody requires a low-to-high step, singing ''éwú'' might sound like another word or obscure the meaning entirely.

Linguists examine the ''rules'' singers use to navigate these conflicts:
- **Melodic Matching**: Singing the melody so it roughly follows the natural lexical tone movement.
- **Vocal Adjustments**: Slight shifts in syllable timing or intensity to highlight tonal differences.
- **Contextual Semantics**: Relying on the surrounding lyrics and song structure so listeners infer the correct words even if the acoustic pitch shifts.

By studying these patterns, we gain deep insights into human phonology, cognitive processing, and the intersection between speech and music.',
  2
) ON CONFLICT (id) DO NOTHING;
