/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import Footer from './components/Footer';
import Assistant from './components/Assistant';
import Journal from './components/Journal';
import JournalDetail from './components/JournalDetail';
import CaseStudyDetail from './components/CaseStudyDetail';
import { INITIATIVES, CASE_STUDIES } from './constants';
import { JournalArticle, CaseStudy } from './types';

function App() {
  // Theme Management
  const [isDark, setIsDark] = useState(true); // Default to dark for navy theme
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);

  useEffect(() => {
    // Check initial preference - default to dark for brand aesthetic
    if (localStorage.theme === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    } else {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  const scrollToSection = (targetId: string) => {
    const closeAndScroll = () => {
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        } else if (targetId === 'top') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    };

    if (selectedArticle) {
        setSelectedArticle(null);
        closeAndScroll();
        return;
    }

    if (selectedCaseStudy) {
        setSelectedCaseStudy(null);
        closeAndScroll();
        return;
    }

    if (targetId === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    scrollToSection(targetId);
  };

  if (selectedArticle) {
    return (
        <div className="min-h-screen font-sans selection:bg-cyan-200 selection:text-cyan-900 bg-[#F1F5F9] dark:bg-[#0A1628] transition-colors duration-300">
           <Navbar onNavClick={scrollToSection} isDark={isDark} toggleTheme={toggleTheme} />
           <JournalDetail article={selectedArticle} onBack={() => {
               setSelectedArticle(null);
               setTimeout(() => scrollToSection('journal'), 100);
           }} />
           <Assistant />
        </div>
    );
  }

  if (selectedCaseStudy) {
    return (
        <div className="min-h-screen font-sans selection:bg-cyan-200 selection:text-cyan-900 bg-[#F1F5F9] dark:bg-[#0A1628] transition-colors duration-300">
           <Navbar onNavClick={scrollToSection} isDark={isDark} toggleTheme={toggleTheme} />
           <CaseStudyDetail study={selectedCaseStudy} onBack={() => {
               setSelectedCaseStudy(null);
               setTimeout(() => scrollToSection('work'), 100);
           }} />
           <Assistant />
        </div>
    );
  }

  return (
    <div className="min-h-screen font-sans selection:bg-cyan-200 selection:text-cyan-900 bg-[#F1F5F9] dark:bg-[#0A1628] transition-colors duration-300">
      <Navbar onNavClick={scrollToSection} isDark={isDark} toggleTheme={toggleTheme} />

      <main className="relative">
        {/* Circuit Grid Background - Very subtle */}
        <div className="fixed inset-0 bg-grid-pattern opacity-10 pointer-events-none z-0"></div>

        {/* HERO */}
        <Hero isDark={isDark} />

        {/* ABOUT - Problem & Solution */}
        <About />

        {/* CASE STUDIES */}
        <section id="work" className="py-24 px-6 lg:px-12 bg-[#F1F5F9] dark:bg-[#0F172A] relative z-10 border-b border-slate-200 dark:border-slate-800">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-end mb-16 border-b border-slate-300 dark:border-slate-700 pb-6">
                    <div>
                        <span className="font-mono text-xs text-[#00D4FF] uppercase tracking-widest">Our Work</span>
                        <h2 className="text-3xl md:text-4xl text-slate-900 dark:text-white mt-4 font-bold font-['Courier_Prime']">Case Studies</h2>
                    </div>
                    <div className="hidden md:block">
                        <a href="#contact" onClick={(e) => handleLinkClick(e, 'contact')} className="text-xs font-mono underline underline-offset-4 text-slate-500 dark:text-slate-400 hover:text-[#00D4FF]">See More Work &rarr;</a>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {CASE_STUDIES.map((study) => (
                        <div key={study.id} className="group cursor-pointer" onClick={() => setSelectedCaseStudy(study)}>
                            {/* Card Image */}
                            <div className="aspect-[4/3] bg-slate-200 dark:bg-[#1E3A5F] mb-6 overflow-hidden border border-slate-300 dark:border-slate-700 relative">
                                <img
                                    src={study.imageUrl}
                                    alt={study.title}
                                    className="w-full h-full object-cover dark:opacity-80 group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-[#0F172A]/10 group-hover:bg-transparent transition-colors"></div>
                                <div className="absolute top-3 left-3 bg-white dark:bg-[#0A1628] px-2 py-1 text-[10px] font-mono border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-300 uppercase">
                                    {study.sector}
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="pr-4">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 font-['Courier_Prime'] leading-tight group-hover:text-[#00D4FF] transition-colors">
                                    {study.title}
                                </h3>
                                <p className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">Client: {study.client}</p>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-3 leading-relaxed">
                                    {study.summary}
                                </p>
                                <div className="pl-3 border-l-2 border-slate-300 dark:border-slate-700 group-hover:border-[#00D4FF] transition-colors">
                                    <p className="text-xs font-bold text-slate-900 dark:text-white font-['Courier_Prime']">Outcome: {study.outcome}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* PROCESS / SERVICES */}
        <Features />

        {/* THE ECOLOGY */}
        <section id="ecology" className="py-24 px-6 lg:px-12 bg-[#F1F5F9] dark:bg-[#0F172A] relative z-10 border-b border-slate-200 dark:border-slate-800">
           <div className="max-w-6xl mx-auto">
               <div className="flex flex-col md:flex-row md:items-end gap-6 mb-16">
                   <div className="flex-1">
                       <span className="font-mono text-xs text-[#00D4FF] uppercase tracking-widest border border-[#00D4FF]/30 px-3 py-1 inline-block mb-4">Our Network</span>
                       <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white font-['Courier_Prime']">The Softworks Family</h2>
                   </div>
                   <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md font-sans leading-relaxed md:text-right">
                     We work with a group of specialized companies, each focused on solving specific problems.
                   </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {INITIATIVES.map((init) => (
                       <a
                         href={init.link}
                         key={init.id}
                         className="p-8 flex flex-col min-h-[280px] transition-all group bg-white dark:bg-[#1E3A5F] border border-slate-200 dark:border-slate-700 hover:border-[#00D4FF] dark:hover:border-[#00D4FF] relative overflow-hidden hover:shadow-[0_0_24px_rgba(0,212,255,0.1)]"
                       >
                           {/* Background Watermark */}
                           <div className="absolute top-0 right-0 p-4 opacity-5 font-mono text-6xl font-bold text-slate-900 dark:text-white select-none pointer-events-none">
                               {init.id.substring(0,2).toUpperCase()}
                           </div>

                           <div className="flex justify-between items-start mb-6 relative z-10">
                               <div className="flex items-center gap-3">
                                   <div className={`w-3 h-3 ${
                                       init.status === 'Active' ? 'bg-[#00D4FF]' :
                                       init.status === 'Experimental' ? 'bg-cyan-600' : 'bg-slate-400'
                                   }`}></div>
                                   <h3 className="text-xl font-bold text-slate-900 dark:text-white font-['Courier_Prime'] group-hover:text-[#00D4FF] transition-colors">{init.name}</h3>
                               </div>
                               <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest border border-slate-200 dark:border-slate-600 px-2 py-1 bg-slate-50 dark:bg-[#0A1628]">{init.role}</span>
                           </div>

                           <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-sans mb-8 max-w-md flex-grow">
                               {init.description}
                           </p>

                           <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center relative z-10">
                               <span className="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest">{init.status} Status</span>
                               <span className="text-xs font-mono text-slate-900 dark:text-white group-hover:translate-x-1 transition-transform group-hover:text-[#00D4FF]">Learn More &rarr;</span>
                           </div>
                       </a>
                   ))}
               </div>
           </div>
        </section>

        {/* JOURNAL / INSIGHTS */}
        <Journal onArticleClick={setSelectedArticle} />

        {/* CONTACT */}
        <section id="contact" className="py-32 px-6 lg:px-12 bg-[#0F172A] dark:bg-[#0A1628] relative z-10">
           <div className="max-w-3xl mx-auto text-center">
               <span className="font-mono text-xs text-[#00D4FF] uppercase tracking-widest px-3 py-1 border border-[#00D4FF]/30 mb-8 inline-block">Working Together</span>
               <h2 className="text-4xl md:text-5xl text-white mb-8 font-bold leading-tight">How Engagements Start</h2>
               <p className="text-xl text-slate-400 mb-12 font-light font-sans">
                 We start with a simple conversation about what you need and how we can help.
               </p>

               <div className="w-24 h-px bg-slate-700 mx-auto mb-12"></div>

               <div className="space-y-4 mb-12">
                <p className="text-2xl text-slate-300 font-['Courier_Prime'] italic">AI doesn't need to be confusing.</p>
                <p className="text-2xl text-white font-bold font-['Courier_Prime']">It needs to be <span className="text-[#00D4FF]">well designed.</span></p>
               </div>

               <a href="mailto:agents@softworkstrading.com" className="inline-block bg-[#00D4FF] text-[#0A1628] px-10 py-4 font-semibold hover:bg-[#22D3EE] hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] transition-all text-sm uppercase tracking-widest font-mono">
                   Get in Touch
               </a>
           </div>
        </section>

        {/* FOOTER */}
        <Footer onLinkClick={handleLinkClick} />

      </main>

      <Assistant />
    </div>
  );
}

export default App;
