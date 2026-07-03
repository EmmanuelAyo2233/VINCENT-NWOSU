import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, GraduationCap, Award, BookOpen, Shield, Code, Globe, Users, FileText, CheckCircle, Gift } from 'lucide-react';
import { profileInfo, experienceData, publicationsData } from '../data/mockData';

const cvSections = [
  { id: 'profile', label: 'Profile', icon: Users },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'experience', label: 'Experience', icon: Shield },
  { id: 'grants', label: 'Grants & Fellowships', icon: Gift },
  { id: 'awards', label: 'Honors & Awards', icon: Award },
  { id: 'teaching', label: 'Teaching', icon: BookOpen },
  { id: 'languages', label: 'Languages', icon: Globe },
  { id: 'skills', label: 'Skills & Tools', icon: Code },
  { id: 'publications', label: 'Publications', icon: FileText }
];

const skillsList = [
  { name: 'Acoustic Phonetics (Praat)', level: 95 },
  { name: 'Multimodal Corpus Annotation (ELAN)', level: 90 },
  { name: 'Experimental Design (PsychoPy)', level: 85 },
  { name: 'Quantitative Methods (R / RStudio)', level: 80 },
  { name: 'Programming (Python, JavaScript)', level: 75 },
  { name: 'Fieldwork Data Archiving', level: 90 }
];

export default function CV() {
  const [activeSection, setActiveSection] = useState('profile');

  // Track scroll position to update sticky sidebar highlight
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 160;
      for (const section of cvSections) {
        const element = document.getElementById(section.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="page-bg relative min-h-screen pt-32 pb-24 overflow-hidden bg-grid-pattern">
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-stone-550/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* CV Hero Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200 pb-8 mb-16 text-left">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-stone-500 font-semibold mb-2 block">
              Curriculum Vitae
            </span>
            <h1 className="text-4xl md:text-6xl font-heading font-black tracking-tight text-stone-900">
              Academic Résumé
            </h1>
            <p className="text-stone-605 mt-2 text-sm leading-relaxed max-w-xl">
              Vincent Nwosu — Academic credentials, SSHRC doctoral achievements, fieldwork publications, and phonetic research methodologies.
            </p>
          </div>
          
          {/* Print/Download CV Trigger */}
          <a
            href="/Vincent_Nwosu_CV.pdf"
            download="Vincent_Nwosu_CV.pdf"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-stone-900 text-stone-50 hover:bg-stone-800 text-sm font-semibold transition-all shadow-md cursor-pointer self-start md:self-auto shrink-0"
          >
            <Download className="w-4 h-4" />
            Download CV (PDF)
          </a>
        </div>

        {/* Sidebar + Content Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Sticky Left Sidebar Navigation */}
          <div className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-28 flex flex-col gap-1 border-l border-stone-250 pl-4 text-left">
              <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400 mb-4 block">
                CV Index
              </span>
              {cvSections.map((sec) => {
                const SecIcon = sec.icon;
                return (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(sec.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className={`flex items-center gap-3 py-2 text-sm font-semibold tracking-wide border-r-2 transition-all relative ${
                      activeSection === sec.id
                        ? 'text-stone-900 border-stone-900 font-bold'
                        : 'text-stone-400 hover:text-stone-800 border-transparent'
                    }`}
                  >
                    <SecIcon className="w-4 h-4 shrink-0" />
                    {sec.label}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right Content Stream */}
          <div className="lg:col-span-9 space-y-16 text-left print:col-span-12">
            
            {/* Section: Profile */}
            <section id="profile" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-heading font-black tracking-tight text-stone-900 flex items-center gap-2 pb-2 border-b border-stone-100">
                <Users className="w-5 h-5 text-stone-800" />
                Profile Summary
              </h2>
              <p className="text-sm leading-relaxed text-stone-550">
                Linguistics scholar and Ph.D. candidate at the University of Calgary. Extensive fieldwork and language documentation background, specializing in LabPhon methods, acoustic measurements, co-speech gestures, child-directed storytelling, and Endangered African languages (Igbo, Ika, Kejom, Medʉmba).
              </p>
            </section>

            {/* Section: Education */}
            <section id="education" className="scroll-mt-28 space-y-6">
              <h2 className="text-2xl font-heading font-black tracking-tight text-stone-900 flex items-center gap-2 pb-2 border-b border-stone-100">
                <GraduationCap className="w-5 h-5 text-stone-800" />
                Education
              </h2>
              
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-l border-stone-300 pl-4">
                  <div>
                    <h3 className="text-base font-bold text-stone-900">
                      Ph.D. Candidate in Linguistics
                    </h3>
                    <p className="text-xs text-stone-550 mt-0.5">
                      University of Calgary, Canada // expected 2026
                    </p>
                    <p className="text-xs text-stone-400 italic mt-0.5">
                      Dissertation: The LabPhon Study of the Igbo Verbal Arts
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold bg-stone-100 text-stone-700 px-3 py-1 rounded-full self-start sm:self-center shrink-0">
                    2023 - Present
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-l border-stone-300 pl-4">
                  <div>
                    <h3 className="text-base font-bold text-stone-900">
                      M.A. in Linguistics and Cognitive Science
                    </h3>
                    <p className="text-xs text-stone-550 mt-0.5">
                      University of Delaware, USA // 2023
                    </p>
                    <p className="text-xs text-stone-400 italic mt-0.5">
                      Thesis: Acoustic Analysis of Implosives in Igbo
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold bg-stone-100 text-stone-700 px-3 py-1 rounded-full self-start sm:self-center shrink-0">
                    2021 - 2023
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-l border-stone-300 pl-4">
                  <div>
                    <h3 className="text-base font-bold text-stone-900">
                      M.A. in English Language and Philosophy
                    </h3>
                    <p className="text-xs text-stone-550 mt-0.5">
                      Ahmadu Bello University, Zaria, Nigeria // 2019
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold bg-stone-100 text-stone-700 px-3 py-1 rounded-full self-start sm:self-center shrink-0">
                    2017 - 2019
                  </span>
                </div>
              </div>
            </section>

            {/* Section: Experience */}
            <section id="experience" className="scroll-mt-28 space-y-6">
              <h2 className="text-2xl font-heading font-black tracking-tight text-stone-900 flex items-center gap-2 pb-2 border-b border-stone-100">
                <Shield className="w-5 h-5 text-stone-800" />
                Research Experience
              </h2>
              
              <div className="space-y-6">
                {experienceData.map((exp, index) => (
                  <div key={index} className="flex flex-col sm:flex-row justify-between gap-2 border-l border-stone-300 pl-4">
                    <div>
                      <h3 className="text-base font-bold text-stone-900">
                        {exp.position} — <span className="font-medium text-stone-500">{exp.organization}</span>
                      </h3>
                      <p className="text-xs text-stone-550 mt-1.5 leading-relaxed max-w-xl">
                        {exp.description}
                      </p>
                    </div>
                    <span className="text-xs font-mono font-bold text-stone-400 shrink-0 self-start sm:text-right mt-0.5">
                      {exp.duration}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Section: Grants & Fellowships */}
            <section id="grants" className="scroll-mt-28 space-y-6">
              <h2 className="text-2xl font-heading font-black tracking-tight text-stone-900 flex items-center gap-2 pb-2 border-b border-stone-100">
                <Gift className="w-5 h-5 text-stone-800" />
                Grants & Fellowships
              </h2>
              
              <div className="space-y-4">
                {[
                  { name: "SSHRC Doctoral Award", details: "$120,000 CAD // Social Sciences and Humanities Research Council of Canada", year: "2026" },
                  { name: "Flight 302 Legacy Award", details: "$10,000 CAD", year: "2026" },
                  { name: "Public Humanities Fellowship, CIH", details: "7,500 CAD // Calgary Institute for the Humanities", year: "2026" },
                  { name: "Alberta Graduate Excellence Scholarship", details: "$11,000 CAD", year: "2025" },
                  { name: "Chosun HK Global Fellowship", details: "$4,500 CAD // South Korea", year: "2025" }
                ].map((grant, idx) => (
                  <div key={idx} className="flex justify-between items-start gap-4 border-l border-stone-300 pl-4">
                    <div>
                      <h4 className="text-sm font-bold text-stone-900">{grant.name}</h4>
                      <p className="text-xs text-stone-550">{grant.details}</p>
                    </div>
                    <span className="text-xs font-mono text-stone-400 shrink-0">{grant.year}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Section: Awards */}
            <section id="awards" className="scroll-mt-28 space-y-6">
              <h2 className="text-2xl font-heading font-black tracking-tight text-stone-900 flex items-center gap-2 pb-2 border-b border-stone-100">
                <Award className="w-5 h-5 text-stone-800" />
                Honors & Awards
              </h2>
              
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm">
                  <CheckCircle className="w-5 h-5 text-stone-800 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-stone-900">Impact Award in Connection, Culture and Community</h4>
                    <p className="text-xs text-stone-550 mt-0.5">Faculty of Arts, University of Calgary, 2026.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <CheckCircle className="w-5 h-5 text-stone-800 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-stone-900">Award for the Best Graduating Student</h4>
                    <p className="text-xs text-stone-550 mt-0.5">Department of English, Ahmadu Bello University, Zaria, 2016.</p>
                  </div>
                </li>
              </ul>
            </section>

            {/* Section: Teaching */}
            <section id="teaching" className="scroll-mt-28 space-y-6">
              <h2 className="text-2xl font-heading font-black tracking-tight text-stone-900 flex items-center gap-2 pb-2 border-b border-stone-100">
                <BookOpen className="w-5 h-5 text-stone-800" />
                Teaching Experience
              </h2>
              
              <div className="space-y-6">
                <div className="border-l border-stone-300 pl-4">
                  <h3 className="text-base font-bold text-stone-900">
                    Graduate Teaching Assistant // University of Calgary
                  </h3>
                  <p className="text-xs text-stone-550 mt-1">
                    Instructors: Darin Flynn, Elizabeth Ritter, Dennis Storoshenko. Leading tutorials and grading linguistic coursework.
                  </p>
                </div>
                <div className="border-l border-stone-300 pl-4">
                  <h3 className="text-base font-bold text-stone-900">
                    Graduate Assistant // University of Delaware
                  </h3>
                  <p className="text-xs text-stone-550 mt-1">
                    Instructors: Kathryn Franich, Nadia Pincus.
                  </p>
                </div>
              </div>
            </section>

            {/* Section: Languages */}
            <section id="languages" className="scroll-mt-28 space-y-6">
              <h2 className="text-2xl font-heading font-black tracking-tight text-stone-900 flex items-center gap-2 pb-2 border-b border-stone-100">
                <Globe className="w-5 h-5 text-stone-800" />
                Languages & Fieldwork Knowledge
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "Igbo / Ika", level: "Native Proficiency" },
                  { name: "English", level: "Near-native Proficiency" },
                  { name: "Latin / Hausa", level: "Intermediate Proficiency" },
                  { name: "French / Arabic", level: "Elementary Proficiency (CEFR A1)" },
                  { name: "Kejom / Medʉmba", level: "Fieldwork Knowledge (Cameroon)" }
                ].map((lang, idx) => (
                  <div key={idx} className="flex justify-between text-sm py-1.5 border-b border-stone-100">
                    <span className="font-semibold text-stone-850">{lang.name}</span>
                    <span className="text-stone-400 font-mono text-xs">{lang.level}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Section: Skills & Tools */}
            <section id="skills" className="scroll-mt-28 space-y-6">
              <h2 className="text-2xl font-heading font-black tracking-tight text-stone-900 flex items-center gap-2 pb-2 border-b border-stone-100">
                <Code className="w-5 h-5 text-stone-800" />
                Technical Competence
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                {skillsList.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-stone-800">{skill.name}</span>
                      <span className="text-stone-400 font-mono">{skill.level}%</span>
                    </div>
                    
                    <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-stone-900"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section: Publications */}
            <section id="publications" className="scroll-mt-28 space-y-6">
              <h2 className="text-2xl font-heading font-black tracking-tight text-stone-900 flex items-center gap-2 pb-2 border-b border-stone-100">
                <FileText className="w-5 h-5 text-stone-800" />
                Featured Publications
              </h2>
              
              <div className="space-y-6">
                {publicationsData.map((pub, idx) => (
                  <div key={idx} className="border-l border-stone-300 pl-4">
                    <h4 className="text-sm font-bold text-stone-900 leading-normal">
                      {pub.title}
                    </h4>
                    <p className="text-xs text-stone-500 mt-1 leading-normal font-mono">
                      {pub.authors} // {pub.journal} ({pub.year})
                    </p>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>

      </div>
    </div>
  );
}
