// Mock database for Vincent Nwosu - Academic Linguist & Phonologist

export const profileInfo = {
  name: "Vincent Nwosu",
  title: "Linguist & Phonologist",
  bio: "Vincent Nwosu is a PhD candidate in Linguistics at the University of Calgary, supervised by Darin Flynn and co-supervised by Kathryn Franich (Harvard University). He is broadly interested in phonological theory and laboratory phonetics, with a current focus on the phonetics–phonology interface as it relates to tone and the typology of prosodic systems. His research examines tone, prosody, and speech acoustics across typologically diverse languages, including Igbo, and more recently English. He has conducted extensive fieldwork in Nigeria and in Cameroon, where he ran experiments with speakers of Kejom and Medʉmba. His work also extends to child-directed speech and the acoustic study of how caregivers adapt their speech to young children. Alongside his experimental work, Vincent is committed to the documentation and typology of endangered and understudied African languages, with an ongoing project on Ika, an endangered Igboid language of Nigeria.",
  email: "vincent.nwosu@ucalgary.ca",
  phone: "+1 (647) 719-5367",
  location: "Calgary, AB, Canada",
  socials: {
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com"
  }
};

// Academic Affiliations & Collaborators (for Infinite Marquee)
export const trustedOrganizations = [
  { name: "University of Calgary", logoText: "University of Calgary" },
  { name: "University of Delaware", logoText: "University of Delaware" },
  { name: "Harvard Phonetics Lab", logoText: "Harvard Phonetics Lab" },
  { name: "Ahmadu Bello University", logoText: "Ahmadu Bello University" },
  { name: "SSHRC Canada", logoText: "SSHRC Canada" },
  { name: "Linguistic Society of America", logoText: "LSA" },
  { name: "Canadian Linguistic Association", logoText: "CLA" }
];

// Education & Career timeline
export const aboutTimeline = [
  {
    year: "2016",
    title: "B.A. in English and Literary Studies",
    description: "Ahmadu Bello University, Zaria, Nigeria. Awarded Best Graduating Student in the English Department."
  },
  {
    year: "2019",
    title: "M.A. in English Language and Philosophy",
    description: "Ahmadu Bello University, Zaria, Nigeria. Conducted a stylo-linguistic analysis of contemporary prose."
  },
  {
    year: "2023",
    title: "M.A. in Linguistics and Cognitive Science",
    description: "University of Delaware, USA. Thesis: Acoustic Analysis of Implosives in Igbo under advisor Kathryn Franich."
  },
  {
    year: "Expected 2026",
    title: "Ph.D. Candidate in Linguistics",
    description: "University of Calgary, Canada. Dissertation: The LabPhon Study of the Igbo Verbal Arts under advisor Darin Flynn."
  }
];

// Research interests
export const researchInterests = [
  {
    id: "phonology-acoustics",
    category: "Phonetics & Phonology",
    title: "Acoustics & Tone Systems",
    description: "Investigating the phonetic realization of downstep, incomplete neutralization of implosives, and tonal adaptation in Niger-Congo languages.",
    iconName: "Volume2"
  },
  {
    id: "speech-gestures",
    category: "Multimodal Communication",
    title: "Co-Speech Gestures",
    description: "Analyzing the timing and coordination between physical gestures and metrical prominence or tonal melodies in Niger-Congo languages.",
    iconName: "Move"
  },
  {
    id: "child-directed",
    category: "Development",
    title: "Child-Directed Speech",
    description: "Studying how pitch, voice quality, and rhythmic constraints adjust in child-directed singing and storytelling in Igbo.",
    iconName: "Music"
  },
  {
    id: "field-doc",
    category: "Documentation",
    title: "Language Documentation",
    description: "Conducting field research and archiving endangered verbal arts, narrative structures, and linguistic variables in West Africa.",
    iconName: "BookOpen"
  }
];

// Fieldwork and Research Projects
export const projectsData = [
  {
    id: "project-1",
    title: "Igbo Language & Verbal Arts Documentation",
    tagline: "Archiving 57+ hours of high-fidelity audiovisual storytelling and chants.",
    description: "This project aims to document endangered oral traditions, mbem chants, folktales, and child-directed speech across various Igbo-speaking regions in Nigeria. The resulting audiovisual corpus serves both language preservation efforts and research on narrative rhythmic and acoustic patterns.",
    image: "url('/project-igbo-doc.png') center/cover no-repeat",
    tech: ["Praat", "ELAN", "Fieldwork", "Audio Engineering", "Linguistic Archiving"],
    results: "Collected and annotated over 57 hours of audiovisual recordings with bilingual transcripts.",
    challenge: "Accessing remote regional communities and ensuring audio fidelity during spontaneous storytelling performances, particularly preserving subtle tone modulations and gestures in local performance contexts.",
    researchProcess: "We conducted active field trips, trained local assistants on ELAN tools, established rigorous consent protocols, and archived high-definition audio datasets for downstep analysis.",
    wireframes: "",
    designProcess: "Annotating tone and gesture timing alignment using specialized software packages like ELAN to create microsecond-level synchronization plots.",
    gallery: [
      "url('/project-igbo-doc.png') center/cover no-repeat",
      "url('/project-cameroon-timing.png') center/cover no-repeat"
    ],
    testimonial: {
      quote: "Vincent's extensive documentation work on Igbo verbal arts captures phonetic variations and oral traditions that might otherwise be lost.",
      author: "Dr. Kathryn Franich, Harvard University / University of Delaware"
    }
  },
  {
    id: "project-2",
    title: "Cameroon Multimodal Speech Timing Study",
    tagline: "Analyzing the synchronization of speech prominence and physical co-speech gestures.",
    description: "Investigated how acoustic pitch cues, syllable prominence, and co-speech gestures align in Cameroon languages including Kejom and Medʉmba. This study challenges current theories of timing by showing dialect-specific gesture-speech coordination rules.",
    image: "url('/project-cameroon-timing.png') center/cover no-repeat",
    tech: ["Praat", "ELAN", "Acoustic Phonetics", "Motion Tracking", "Statistical Analysis"],
    results: "Ran controlled experiments with 65 research subjects across Yaoundé and Bamileke, Cameroon.",
    challenge: "Isolating precise physical hand/body movement offsets from high-speed videography and matching them precisely to micro-acoustic features in raw field recordings.",
    researchProcess: "Utilized frame-by-frame analysis combined with automated Praat pitch-tracking algorithms to compare gesture shifts with vocal markers.",
    wireframes: "",
    designProcess: "Statistical modeling using R to map predicted alignments of gestures with high-pitch pitch target regions.",
    gallery: [
      "url('/project-cameroon-timing.png') center/cover no-repeat",
      "url('/project-ika-doc.png') center/cover no-repeat"
    ],
    testimonial: {
      quote: "The findings from the Cameroon timing project have significant implications for understanding the universal versus language-specific aspects of human communication.",
      author: "Linguistics Research Lab, SLLLC, University of Calgary"
    }
  },
  {
    id: "project-3",
    title: "Ika Language Documentation Project",
    tagline: "Systematically documenting the phonology and oral narratives of Ika.",
    description: "A long-term project documenting grammatical structure, phonological rules (such as vowel coalescence and tone spreading), and community narratives of the under-studied Ika language in southern Nigeria.",
    image: "url('/project-ika-doc.png') center/cover no-repeat",
    tech: ["Fieldwork Methods", "ELAN Annotation", "Lexicography", "Grammar Analysis"],
    results: "Developed training workshops for student research assistants on ELAN software and fieldwork protocols.",
    challenge: "Documenting complex tonal shifts and morpho-phonological processes that occur in quick conversational speech.",
    researchProcess: "Conducted field interviews, built wordlists, analyzed conversational texts, and cataloged phonetic variables in different dialect zones.",
    wireframes: "",
    designProcess: "Building lexical databases and digital mapping of acoustic parameters for local vowel coalescence patterns.",
    gallery: [
      "url('/project-ika-doc.png') center/cover no-repeat",
      "url('/project-igbo-doc.png') center/cover no-repeat"
    ],
    testimonial: {
      quote: "Vincent's dedication to documentation provides a vital foundation for both theoretical analysis and language revitalization.",
      author: "Collaborative Research Network on African Linguistics"
    }
  }
];

// Experience data
export const experienceData = [
  {
    organization: "Faculty of Arts, University of Calgary",
    position: "Research Impact Coordinator",
    duration: "September 2025 - Present",
    description: "Coordinating research outputs and documenting impacts of humanities and linguistics projects across the faculty.",
    skills: ["Research Coordination", "Project Impact Evaluation", "Academic Writing"]
  },
  {
    organization: "University of Calgary",
    position: "Graduate Research & Teaching Assistant",
    duration: "September 2023 - Present",
    description: "Conducting phonetic and phonological analysis of child-directed speech and verbal arts. Assisting in teaching courses on Linguistics.",
    skills: ["Praat", "ELAN", "Course Instruction", "Phonetic Analysis", "Acoustics"]
  },
  {
    organization: "Harvard Phonetics Lab, Harvard University",
    position: "Affiliate Member / Researcher",
    duration: "August 2023 - Present",
    description: "Collaborating on research projects investigating the timing of co-speech gestures in Niger-Congo languages.",
    skills: ["Multimodal Communication", "Speech Timing", "Phonetics", "Cross-linguistic Analysis"]
  },
  {
    organization: "University of Delaware",
    position: "Graduate Research & Teaching Assistant",
    duration: "August 2021 - August 2023",
    description: "Conducted fieldwork on speech timing in Cameroon. Ran phonetic experiments with 65 subjects in Yaoundé and Bamileke.",
    skills: ["Fieldwork Protocols", "Experimental Design", "Data Annotation", "Linguistic Analysis"]
  },
  {
    organization: "Titsall High School, Abuja, Nigeria",
    position: "Principal",
    duration: "January 2019 - June 2021",
    description: "Managed academic administration, curriculum design, and teacher training for a leading secondary school in Abuja.",
    skills: ["Educational Leadership", "Curriculum Development", "Administration"]
  },
  {
    organization: "Federal College of Education, Zaria, Nigeria",
    position: "Lecturer (Sandwich Program)",
    duration: "May 2017 - June 2018",
    description: "Instructed courses in English language, literature, and general studies to prospective educators.",
    skills: ["Lecture Delivery", "Student Advising", "Academic Assessment"]
  }
];

// Publications data
export const publicationsData = [
  {
    id: "pub-1",
    title: "Automatic and Non-Automatic Downstep in Igbo Are Not Realized the Same",
    journal: "Proceedings of Speech Prosody 2026",
    year: "2026",
    authors: "Vincent Nwosu",
    abstract: "This study investigates the phonetic realization of automatic (automatic pitch lowering) and non-automatic downstep in Igbo. Using acoustic measurements of fundamental frequency (F0), we show that these two types of downstep exhibit distinct realization characteristics in natural speech, suggesting that they are governed by different prosodic mechanisms.",
    pdfLink: "/Vincent_Nwosu_CV.pdf",
    category: "Peer-reviewed Article"
  },
  {
    id: "pub-2",
    title: "Singing to Children in Igbo: An Acoustic Analysis of Pitch and Voice Quality",
    journal: "Proceedings of Speech Prosody 2026",
    year: "2026",
    authors: "Vincent Nwosu",
    abstract: "Examines the acoustic properties of Igbo child-directed singing. We analyze how parameters of pitch range, pitch variability, and voice quality features adjust during maternal singing compared to adult-directed talk. Results reveal significant prosodic adjustments aimed at enhancing communication.",
    pdfLink: "/Vincent_Nwosu_CV.pdf",
    category: "Peer-reviewed Article"
  },
  {
    id: "pub-3",
    title: "Prosody and Predictability in the Timing of Co-Speech Gestures: Evidence from Igbo 'Gesture Shift'",
    journal: "Laboratory Phonology",
    year: "2026",
    authors: "Kathryn Franich & Vincent Nwosu",
    abstract: "Investigates how linguistic prosody (pitch accents, tone melody) and semantic predictability influence the temporal alignment of co-speech hand gestures in Igbo storytelling. We observe systematic gesture shifts that suggest a strong link between linguistic structure and bodily motion.",
    pdfLink: "/Vincent_Nwosu_CV.pdf",
    category: "Peer-reviewed Article"
  },
  {
    id: "pub-4",
    title: "The timing of speech and gesture in two Niger-Congo languages: Implications for word-level prominence",
    journal: "Glossa",
    year: "2025",
    authors: "Kathryn Franich, H. Keupdjio, & Vincent Nwosu",
    abstract: "An analysis comparing speech-gesture timing coordination across two different Niger-Congo languages. The study addresses the theoretical implications of multimodal synchronization for determining word-level phonetic prominence in languages lacking standard lexical stress.",
    pdfLink: "/Vincent_Nwosu_CV.pdf",
    category: "Peer-reviewed Article"
  },
  {
    id: "pub-5",
    title: "The Acoustic Analysis of Implosives in the Igbo Language",
    journal: "Studies in Phonetics and Phonology, University of Toronto Press",
    year: "In Press",
    authors: "Vincent Nwosu & Kathryn Franich",
    abstract: "Provides a detailed phonetic and acoustic description of implosive consonants in Igbo. We map out differences in voice onset time, closure duration, and formant transitions across dialects.",
    pdfLink: "/Vincent_Nwosu_CV.pdf",
    category: "Book Chapter"
  },
  {
    id: "pub-6",
    title: "'The owl never cries in vain': An acoustic study of vocal expressions in mbem chants",
    journal: "Frontiers in Communication",
    year: "Under Review",
    authors: "Vincent Nwosu",
    abstract: "An acoustic investigation of vocal expressions, pitch ranges, and rhythmic configurations in Igbo mbem oral narrative chants, highlighting the intersection between speech melody and musical performance.",
    pdfLink: "/Vincent_Nwosu_CV.pdf",
    category: "Under Review"
  }
];

// Blog posts - academic essays on linguistics
export const blogPostsData = [
  {
    id: "blog-1",
    slug: "preserving-verbal-arts-in-the-digital-age",
    title: "Preserving Endangered Verbal Arts in the Digital Age",
    date: "June 2026",
    readingTime: "6 min read",
    category: "Documentation",
    image: "url('/blog-verbal-arts.png') center/cover no-repeat",
    excerpt: "Why documenting spoken language involves capturing the musicality, performance context, and co-speech gestures of oral traditions.",
    content: `
# Preserving Endangered Verbal Arts in the Digital Age

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

By treating speech as a multimodal performance, we create rich datasets that benefit researchers, educators, and community members working to revitalize their heritage languages.
    `,
    toc: [
      { text: "The Limits of Written Text", id: "the-limits-of-written-text" },
      { text: "Multimodal Archiving in Practice", id: "multimodal-archiving-in-practice" }
    ]
  },
  {
    id: "blog-2",
    slug: "what-is-tone-tune-correspondence",
    title: "What is Tone-Tune Correspondence?",
    date: "April 2026",
    readingTime: "5 min read",
    category: "Phonology",
    image: "url('/blog-tone-tune.png') center/cover no-repeat",
    excerpt: "Exploring the phonology of singing in tone languages where pitch changes can conflict with lexical meaning.",
    content: `
# What is Tone-Tune Correspondence?

In non-tonal languages like English, the pitch of a song's melody is independent of word choice. A singer can sing the word 'hello' on any pitch pattern. In tonal languages, however, pitch is lexical: changing the pitch changes the meaning of the word.

How do speakers of tone languages sing without losing semantic clarity? This is the study of **Tone-Tune Correspondence**.

## The Pitch Conflict

For example, in Igbo, 'éwú' (High-High) means 'goat' and 'èwù' (Low-Low) means 'fame'. If a musical melody requires a low-to-high step, singing 'éwú' might sound like another word or obscure the meaning entirely.

Linguists examine the 'rules' singers use to navigate these conflicts:
- **Melodic Matching**: Singing the melody so it roughly follows the natural lexical tone movement.
- **Vocal Adjustments**: Slight shifts in syllable timing or intensity to highlight tonal differences.
- **Contextual Semantics**: Relying on the surrounding lyrics and song structure so listeners infer the correct words even if the acoustic pitch shifts.

By studying these patterns, we gain deep insights into human phonology, cognitive processing, and the intersection between speech and music.
    `,
    toc: [
      { text: "The Pitch Conflict", id: "the-pitch-conflict" },
      { text: "Melodic Matching & Vocal Adjustments", id: "melodic-matching--vocal-adjustments" }
    ]
  }
];
