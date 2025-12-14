/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Assistant from './components/Assistant';
import Journal from './components/Journal';
import JournalDetail from './components/JournalDetail';
import CaseStudyDetail from './components/CaseStudyDetail';
import { INITIATIVES, CASE_STUDIES } from './constants';
import { JournalArticle, CaseStudy } from './types';

function App() {
  // Theme Management
  const [isDark, setIsDark] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);

  useEffect(() => {
    // Check initial preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
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
    // Logic to close active details before scrolling
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

  if (selectedArticle) {
    return (
        <div className="min-h-screen font-sans selection:bg-orange-200 selection:text-orange-900 bg-[#F5F5F4] dark:bg-[#0c0a09] transition-colors duration-300">
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
        <div className="min-h-screen font-sans selection:bg-orange-200 selection:text-orange-900 bg-[#F5F5F4] dark:bg-[#0c0a09] transition-colors duration-300">
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
    <div className="min-h-screen font-sans selection:bg-orange-200 selection:text-orange-900 bg-[#F5F5F4] dark:bg-[#0c0a09] transition-colors duration-300">
      <Navbar onNavClick={scrollToSection} isDark={isDark} toggleTheme={toggleTheme} />
      
      <main className="relative pt-20">
        <div className="fixed inset-0 bg-grid-pattern opacity-60 pointer-events-none z-0"></div>
        
        {/* HERO */}
        <section id="top" className="relative min-h-[90vh] flex flex-col justify-center px-6 lg:px-12 z-10 border-b border-stone-200 dark:border-stone-800 overflow-hidden">
           <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             
             {/* Text Side */}
             <div className="animate-fade-in-up order-2 lg:order-1">
                <span className="inline-block py-1 px-3 border border-stone-300 dark:border-stone-700 bg-white/50 dark:bg-stone-900/50 backdrop-blur-sm rounded-sm text-xs font-mono text-stone-500 dark:text-stone-400 uppercase tracking-widest mb-8">
                  Consulting & Advisory
                </span>
                <h1 className="text-4xl md:text-6xl lg:text-7xl text-stone-900 dark:text-stone-100 mb-8 leading-[1.15] font-bold tracking-tight">
                   Making AI Clear <br/>
                   <span className="text-stone-400 dark:text-stone-600 font-normal italic">Enough to Use.</span>
                </h1>
                <div className="max-w-xl border-l-2 border-orange-600 pl-6 md:pl-8 py-2 mb-12">
                  <p className="text-lg md:text-xl text-stone-600 dark:text-stone-400 font-sans font-light leading-relaxed">
                     Softworks Trading Company helps high-agency operators turn artificial intelligence into clear workflows, dependable tools, and systems that actually work.
                  </p>
                </div>
                
                <div className="paper-card p-6 md:p-8 max-w-lg bg-white/80 dark:bg-stone-900/80">
                   <div className="flex items-center gap-2 mb-3">
                     <div className="w-2 h-2 bg-orange-600 rounded-full animate-pulse"></div>
                     <p className="font-mono text-xs text-stone-500 dark:text-stone-400 uppercase tracking-widest">Our Mandate</p>
                   </div>
                   <p className="text-stone-800 dark:text-stone-200 font-medium text-lg font-['Courier_Prime']">
                     "We focus on the part of AI that determines whether it works or fails: how it fits into real work."
                   </p>
                </div>
             </div>

             {/* Image Side - Abstract/Technical */}
             <div className="order-1 lg:order-2 relative h-[400px] lg:h-[600px] w-full animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                <div className="absolute inset-0 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)] transform rotate-2">
                   <div className="w-full h-full relative overflow-hidden grayscale contrast-125 dark:opacity-80">
                      <img 
                        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000" 
                        alt="Network Topology" 
                        className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-[2s]"
                      />
                      <div className="absolute inset-0 bg-stone-200/20 mix-blend-multiply pointer-events-none"></div>
                   </div>
                   <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-stone-900/90 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-stone-800 dark:text-stone-300 border border-stone-200 dark:border-stone-700 shadow-sm">
                      Fig 1.1: System Architecture
                   </div>
                </div>
             </div>
           </div>
        </section>

        {/* THE PROBLEM */}
        <section id="about" className="py-24 px-6 lg:px-12 relative z-10 border-b border-stone-200 dark:border-stone-800">
           <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
                  <div className="md:col-span-4 sticky top-32">
                     <span className="font-mono text-xs text-stone-500 dark:text-stone-400 uppercase tracking-widest border border-stone-300 dark:border-stone-700 px-3 py-1 bg-white dark:bg-stone-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.05)]">The Problem</span>
                  </div>
                  <div className="md:col-span-8 space-y-8">
                     <h2 className="text-3xl md:text-4xl text-stone-900 dark:text-stone-100 leading-tight font-bold">AI Breaks Where Work Begins</h2>
                     <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed font-sans">
                       Most organizations don’t struggle to access AI. They struggle to govern it and use it consistently. The issue isn't intelligence. It's design.
                     </p>
                     
                     <div className="paper-card p-8 md:p-10 relative bg-stone-50 dark:bg-stone-900">
                        <h3 className="font-mono text-xs text-red-800 dark:text-red-400 mb-6 uppercase tracking-widest border-b border-red-200 dark:border-red-900/50 pb-2 inline-block">Common Failure Modes</h3>
                        <ul className="space-y-4">
                           {['Too many tools, no governance', 'Outputs that cannot be verified', 'Automation that creates confusion', 'Systems no one can explain'].map((item, i) => (
                             <li key={i} className="flex gap-4 items-start text-stone-700 dark:text-stone-300 font-['Courier_Prime']">
                               <span className="font-mono text-stone-400 dark:text-stone-600 text-sm mt-1">0{i+1}</span>
                               <span>{item}</span>
                             </li>
                           ))}
                        </ul>
                     </div>
                  </div>
              </div>
           </div>
        </section>

        {/* CASE STUDIES */}
        <section id="work" className="py-24 px-6 lg:px-12 bg-white dark:bg-[#111] relative z-10 border-b border-stone-200 dark:border-stone-800">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-end mb-16 border-b border-stone-200 dark:border-stone-800 pb-6">
                    <div>
                        <span className="font-mono text-xs text-stone-500 dark:text-stone-400 uppercase tracking-widest">Evidence of Work</span>
                        <h2 className="text-3xl md:text-4xl text-stone-900 dark:text-stone-100 mt-4 font-bold font-['Courier_Prime']">Case Studies</h2>
                    </div>
                    <div className="hidden md:block">
                        <a href="#contact" className="text-xs font-mono underline underline-offset-4 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200">Request Full Dossier &rarr;</a>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {CASE_STUDIES.map((study) => (
                        <div key={study.id} className="group cursor-pointer" onClick={() => setSelectedCaseStudy(study)}>
                            {/* Card Image */}
                            <div className="aspect-[4/3] bg-stone-200 dark:bg-stone-800 mb-6 overflow-hidden border border-stone-300 dark:border-stone-700 relative">
                                <img 
                                    src={study.imageUrl} 
                                    alt={study.title} 
                                    className="w-full h-full object-cover grayscale contrast-125 dark:opacity-80 group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors"></div>
                                <div className="absolute top-3 left-3 bg-white dark:bg-stone-900 px-2 py-1 text-[10px] font-mono border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-300 uppercase">
                                    {study.sector}
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="pr-4">
                                <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-2 font-['Courier_Prime'] leading-tight group-hover:underline decoration-1 underline-offset-4 decoration-orange-500">
                                    {study.title}
                                </h3>
                                <p className="text-xs font-mono text-stone-500 dark:text-stone-400 uppercase tracking-widest mb-3">Client: {study.client}</p>
                                <p className="text-sm text-stone-600 dark:text-stone-400 mb-4 line-clamp-3 leading-relaxed">
                                    {study.summary}
                                </p>
                                <div className="pl-3 border-l-2 border-stone-300 dark:border-stone-700 group-hover:border-orange-500 transition-colors">
                                    <p className="text-xs font-bold text-stone-900 dark:text-stone-200 font-['Courier_Prime']">Outcome: {study.outcome}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* PROCESS */}
        <section id="process" className="py-24 px-6 lg:px-12 relative z-10 bg-[#F5F5F4] dark:bg-[#0c0a09] border-b border-stone-200 dark:border-stone-800">
           <div className="max-w-5xl mx-auto">
              <div className="mb-16 border-b border-stone-300 dark:border-stone-800 pb-8 flex justify-between items-end">
                 <div>
                   <span className="font-mono text-xs text-stone-500 dark:text-stone-400 uppercase tracking-widest">Methodology</span>
                   <h2 className="text-3xl md:text-4xl text-stone-900 dark:text-stone-100 mt-4 font-bold">A Structured Process</h2>
                 </div>
                 <div className="hidden md:block font-mono text-xs text-stone-400 dark:text-stone-500 bg-white dark:bg-stone-900 px-2 py-1 border border-stone-200 dark:border-stone-700">EST. 2025</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {[
                   { title: 'Get Clear', desc: 'We define the problem, constraints, and decisions AI is meant to support.' },
                   { title: 'Build the System', desc: 'We design workflows, prompts, and documentation that make the logic visible and usable.' },
                   { title: 'Deliver What Matters', desc: 'You receive concrete assets—SOPs, prompt systems, research packets, and operational guides.' }
                 ].map((step, idx) => (
                   <div key={idx} className="paper-card p-8 group hover:-translate-y-1 transition-transform duration-300 bg-white dark:bg-stone-900">
                      <span className="font-mono text-stone-300 dark:text-stone-600 text-3xl block mb-6 font-bold group-hover:text-orange-500 transition-colors">0{idx + 1}</span>
                      <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-4 font-['Courier_Prime']">{step.title}</h3>
                      <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed font-sans">{step.desc}</p>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* THE ECOLOGY */}
        <section id="ecology" className="py-24 px-6 lg:px-12 bg-white dark:bg-[#111] relative z-10 border-b border-stone-200 dark:border-stone-800">
           <div className="max-w-6xl mx-auto">
               <div className="flex flex-col md:flex-row md:items-end gap-6 mb-16">
                   <div className="flex-1">
                       <span className="font-mono text-xs text-stone-500 dark:text-stone-400 uppercase tracking-widest border border-stone-300 dark:border-stone-700 px-3 py-1 bg-stone-50 dark:bg-stone-900 inline-block mb-4">The Operating Network</span>
                       <h2 className="text-3xl md:text-5xl font-bold text-stone-900 dark:text-stone-100 font-['Courier_Prime']">The Softworks Ecology</h2>
                   </div>
                   <p className="text-stone-500 dark:text-stone-400 text-sm max-w-md font-sans leading-relaxed md:text-right">
                     Softworks is the central node in a network of specialized entities, each built to solve specific problems in distinct domains.
                   </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {INITIATIVES.map((init) => (
                       <a 
                         href={init.link} 
                         key={init.id}
                         className="paper-card p-8 flex flex-col min-h-[280px] hover:shadow-md transition-all group bg-stone-50 dark:bg-stone-900 hover:bg-white dark:hover:bg-stone-800 relative overflow-hidden"
                       >
                           {/* Background Watermark/Texture */}
                           <div className="absolute top-0 right-0 p-4 opacity-10 font-mono text-6xl font-bold text-stone-900 dark:text-stone-100 select-none pointer-events-none">
                               {init.id.substring(0,2).toUpperCase()}
                           </div>

                           <div className="flex justify-between items-start mb-6 relative z-10">
                               <div className="flex items-center gap-3">
                                   <div className={`w-3 h-3 border ${
                                       init.status === 'Active' ? 'bg-green-500 border-green-500' : 
                                       init.status === 'Experimental' ? 'bg-orange-500 border-orange-500' : 'bg-stone-300 dark:bg-stone-600 border-stone-300 dark:border-stone-600'
                                   }`}></div>
                                   <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 font-['Courier_Prime'] group-hover:underline decoration-1 underline-offset-4 decoration-orange-500">{init.name}</h3>
                               </div>
                               <span className="font-mono text-[10px] text-stone-500 dark:text-stone-400 uppercase tracking-widest border border-stone-200 dark:border-stone-700 px-2 py-1 bg-white dark:bg-stone-950">{init.role}</span>
                           </div>
                           
                           <p className="text-stone-700 dark:text-stone-300 leading-relaxed font-sans mb-8 max-w-md flex-grow">
                               {init.description}
                           </p>

                           <div className="pt-4 border-t border-stone-200 dark:border-stone-700 flex justify-between items-center relative z-10">
                               <span className="text-xs font-mono text-stone-400 dark:text-stone-500 uppercase tracking-widest">{init.status} Status</span>
                               <span className="text-xs font-mono text-stone-900 dark:text-stone-200 group-hover:translate-x-1 transition-transform group-hover:text-orange-600 dark:group-hover:text-orange-500">Access Node &rarr;</span>
                           </div>
                       </a>
                   ))}
               </div>
           </div>
        </section>

        {/* JOURNAL / INSIGHTS */}
        <Journal onArticleClick={setSelectedArticle} />

        {/* CONTACT */}
        <section id="contact" className="py-32 px-6 lg:px-12 bg-[#F5F5F4] dark:bg-[#0c0a09] relative z-10">
           <div className="max-w-3xl mx-auto text-center">
               <span className="font-mono text-xs text-stone-500 dark:text-stone-400 uppercase tracking-widest px-2 py-1 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 mb-8 inline-block shadow-[2px_2px_0px_0px_rgba(0,0,0,0.05)]">Working Together</span>
               <h2 className="text-4xl md:text-5xl text-stone-900 dark:text-stone-100 mb-8 font-bold leading-tight">How Engagements Start</h2>
               <p className="text-xl text-stone-600 dark:text-stone-400 mb-12 font-light font-sans">
                 Most engagements begin with a focused conversation to define what matters, what doesn’t, and what success looks like.
               </p>
               
               <div className="w-24 h-px bg-stone-300 dark:bg-stone-700 mx-auto mb-12"></div>
               
               <div className="space-y-4 mb-12">
                <p className="text-2xl text-stone-900 dark:text-stone-100 font-['Courier_Prime'] italic">AI doesn’t need to be confusing.</p>
                <p className="text-2xl text-stone-900 dark:text-stone-100 font-bold font-['Courier_Prime']">It needs to be well designed.</p>
               </div>
               
               <a href="mailto:hello@softworks.trade" className="inline-block bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 px-10 py-4 font-medium hover:bg-orange-600 dark:hover:bg-orange-500 hover:text-white dark:hover:text-stone-900 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] hover:translate-x-[2px] hover:translate-y-[2px] text-sm uppercase tracking-widest font-mono">
                   Contact Advisory Team
               </a>
           </div>
        </section>
        
        {/* FOOTER */}
        <footer className="border-t border-stone-300 dark:border-stone-800 py-12 px-6 bg-[#E7E5E4] dark:bg-[#1f1c1a]">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center text-stone-500 dark:text-stone-400 text-xs font-mono gap-6">
                <div>
                    <p className="font-bold text-stone-900 dark:text-stone-200 mb-1 uppercase tracking-wider">Softworks Trading Company</p>
                    <p>Consulting / Strategy / Systems Integration</p>
                </div>
                <div className="flex gap-8">
                    <a href="#" className="hover:text-stone-900 dark:hover:text-stone-100">Privacy Policy</a>
                    <a href="#" className="hover:text-stone-900 dark:hover:text-stone-100">Terms of Engagement</a>
                    <a href="#" className="hover:text-stone-900 dark:hover:text-stone-100">Client Portal</a>
                </div>
                <p>© 2025 ALL RIGHTS RESERVED</p>
            </div>
        </footer>

      </main>

      <Assistant />
    </div>
  );
}

export default App;