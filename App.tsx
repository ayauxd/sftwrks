/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Team from './components/Team';
import Footer from './components/Footer';
import CaseStudyDetail from './components/CaseStudyDetail';
import JournalDetail from './components/JournalDetail';
import InsightsList from './components/InsightsList';
import CaseStudiesList from './components/CaseStudiesList';
import Media from './components/Media';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import Assistant from './components/Assistant';
import { CASE_STUDIES, JOURNAL_ARTICLES } from './constants';
import { CaseStudy, JournalArticle } from './types';

function App() {
  // Theme Management
  const [isDark, setIsDark] = useState(false); // Default to light mode
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);
  const [showMedia, setShowMedia] = useState(false);
  const [showInsightsList, setShowInsightsList] = useState(false);
  const [showCaseStudiesList, setShowCaseStudiesList] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTermsOfService, setShowTermsOfService] = useState(false);
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);

  // Parse article date "MMM YYYY" to sortable format
  const parseArticleDate = (dateStr: string): string => {
    const months: Record<string, string> = {
      'JAN': '01', 'FEB': '02', 'MAR': '03', 'APR': '04',
      'MAY': '05', 'JUN': '06', 'JUL': '07', 'AUG': '08',
      'SEP': '09', 'OCT': '10', 'NOV': '11', 'DEC': '12'
    };
    const [month, year] = dateStr.split(' ');
    return `${year}-${months[month] || '01'}`;
  };

  // Preview sorted by date (newest first), limited to 3
  const previewArticles = [...JOURNAL_ARTICLES]
    .sort((a, b) => parseArticleDate(b.date).localeCompare(parseArticleDate(a.date)))
    .slice(0, 3);
  const previewCaseStudies = [...CASE_STUDIES]
    .sort((a, b) => b.completedDate.localeCompare(a.completedDate))
    .slice(0, 3);

  // Reset all page states to home
  const resetToHome = () => {
    setSelectedCaseStudy(null);
    setSelectedArticle(null);
    setShowMedia(false);
    setShowInsightsList(false);
    setShowCaseStudiesList(false);
    setShowPrivacyPolicy(false);
    setShowTermsOfService(false);
  };

  // Navigate to a route and update browser history
  const navigateTo = (path: string, state?: { skipHistory?: boolean }) => {
    resetToHome();

    if (path === '/privacy') {
      setShowPrivacyPolicy(true);
    } else if (path === '/terms') {
      setShowTermsOfService(true);
    } else if (path === '/insights') {
      setShowInsightsList(true);
    } else if (path === '/case-studies') {
      setShowCaseStudiesList(true);
    } else if (path === '/media') {
      setShowMedia(true);
    }
    // For '/' (home), all states are already reset

    // Update URL without reload (unless skipHistory is true for popstate handling)
    if (!state?.skipHistory) {
      window.history.pushState({ path }, '', path);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle initial URL path on mount
  useEffect(() => {
    const path = window.location.pathname;
    if (path !== '/') {
      navigateTo(path, { skipHistory: true });
    }
  }, []);

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      navigateTo(path, { skipHistory: true });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    // Check initial preference - default to light mode
    if (localStorage.theme === 'dark') {
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
    // Handle Media page navigation
    if (targetId === 'media') {
      setShowMedia(true);
      setSelectedArticle(null);
      setSelectedCaseStudy(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

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

    if (showMedia) {
        setShowMedia(false);
        closeAndScroll();
        return;
    }

    if (showInsightsList) {
        setShowInsightsList(false);
        closeAndScroll();
        return;
    }

    if (showCaseStudiesList) {
        setShowCaseStudiesList(false);
        closeAndScroll();
        return;
    }

    if (showPrivacyPolicy) {
        setShowPrivacyPolicy(false);
        closeAndScroll();
        return;
    }

    if (showTermsOfService) {
        setShowTermsOfService(false);
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
           <JournalDetail
             article={selectedArticle}
             onBack={() => {
               setSelectedArticle(null);
               if (showInsightsList) {
                 // Stay on insights list
               } else {
                 setTimeout(() => scrollToSection('journal'), 100);
               }
             }}
             onNavigate={(article) => setSelectedArticle(article)}
           />
           <Assistant isOpen={isAssessmentOpen} onOpenChange={setIsAssessmentOpen} />
        </div>
    );
  }

  if (showInsightsList) {
    return (
        <div className="min-h-screen font-sans selection:bg-cyan-200 selection:text-cyan-900 bg-[#F1F5F9] dark:bg-[#0A1628] transition-colors duration-300">
           <Navbar onNavClick={scrollToSection} isDark={isDark} toggleTheme={toggleTheme} />
           <InsightsList
             onArticleClick={(article) => {
               setSelectedArticle(article);
               window.scrollTo({ top: 0, behavior: 'smooth' });
             }}
             onBack={() => {
               setShowInsightsList(false);
               setTimeout(() => scrollToSection('journal'), 100);
             }}
           />
           <Footer onLinkClick={handleLinkClick} onOpenDiscovery={() => setIsAssessmentOpen(true)} onShowPrivacy={() => navigateTo('/privacy')} onShowTerms={() => navigateTo('/terms')} />
           <Assistant isOpen={isAssessmentOpen} onOpenChange={setIsAssessmentOpen} />
        </div>
    );
  }

  if (selectedCaseStudy) {
    return (
        <div className="min-h-screen font-sans selection:bg-cyan-200 selection:text-cyan-900 bg-[#F1F5F9] dark:bg-[#0A1628] transition-colors duration-300">
           <Navbar onNavClick={scrollToSection} isDark={isDark} toggleTheme={toggleTheme} />
           <CaseStudyDetail
             study={selectedCaseStudy}
             onBack={() => {
               setSelectedCaseStudy(null);
               setTimeout(() => scrollToSection('work'), 100);
             }}
             onNavigate={(study) => setSelectedCaseStudy(study)}
           />
           <Assistant isOpen={isAssessmentOpen} onOpenChange={setIsAssessmentOpen} />
        </div>
    );
  }

  if (showCaseStudiesList) {
    return (
        <div className="min-h-screen font-sans selection:bg-cyan-200 selection:text-cyan-900 bg-[#F1F5F9] dark:bg-[#0A1628] transition-colors duration-300">
           <Navbar onNavClick={scrollToSection} isDark={isDark} toggleTheme={toggleTheme} />
           <CaseStudiesList
             onStudyClick={(study) => {
               setSelectedCaseStudy(study);
               window.scrollTo({ top: 0, behavior: 'smooth' });
             }}
             onBack={() => {
               setShowCaseStudiesList(false);
               setTimeout(() => scrollToSection('work'), 100);
             }}
           />
           <Footer onLinkClick={handleLinkClick} onOpenDiscovery={() => setIsAssessmentOpen(true)} onShowPrivacy={() => navigateTo('/privacy')} onShowTerms={() => navigateTo('/terms')} />
           <Assistant isOpen={isAssessmentOpen} onOpenChange={setIsAssessmentOpen} />
        </div>
    );
  }

  if (showMedia) {
    return (
        <div className="min-h-screen font-sans selection:bg-cyan-200 selection:text-cyan-900 bg-[#F1F5F9] dark:bg-[#0A1628] transition-colors duration-300">
           <Navbar onNavClick={scrollToSection} isDark={isDark} toggleTheme={toggleTheme} />
           <Media onBack={() => {
               setShowMedia(false);
               setTimeout(() => scrollToSection('top'), 100);
           }} />
           <Footer onLinkClick={handleLinkClick} onOpenDiscovery={() => setIsAssessmentOpen(true)} onShowPrivacy={() => navigateTo('/privacy')} onShowTerms={() => navigateTo('/terms')} />
           <Assistant isOpen={isAssessmentOpen} onOpenChange={setIsAssessmentOpen} />
        </div>
    );
  }

  if (showPrivacyPolicy) {
    return (
        <div className="min-h-screen font-sans selection:bg-cyan-200 selection:text-cyan-900 bg-[#F1F5F9] dark:bg-[#0A1628] transition-colors duration-300">
           <Navbar onNavClick={scrollToSection} isDark={isDark} toggleTheme={toggleTheme} />
           <PrivacyPolicy onBack={() => navigateTo('/')} />
           <Assistant isOpen={isAssessmentOpen} onOpenChange={setIsAssessmentOpen} />
        </div>
    );
  }

  if (showTermsOfService) {
    return (
        <div className="min-h-screen font-sans selection:bg-cyan-200 selection:text-cyan-900 bg-[#F1F5F9] dark:bg-[#0A1628] transition-colors duration-300">
           <Navbar onNavClick={scrollToSection} isDark={isDark} toggleTheme={toggleTheme} />
           <TermsOfService onBack={() => navigateTo('/')} />
           <Assistant isOpen={isAssessmentOpen} onOpenChange={setIsAssessmentOpen} />
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
        <Hero isDark={isDark} onOpenAssessment={() => setIsAssessmentOpen(true)} />

        {/* ABOUT - Problem & Solution */}
        <About />

        {/* TEAM */}
        <Team />

        {/* CASE STUDIES */}
        <section id="work" className="py-24 px-6 lg:px-12 bg-[#F1F5F9] dark:bg-[#0F172A] relative z-10 border-b border-slate-200 dark:border-slate-800">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-end mb-16 border-b border-slate-300 dark:border-slate-700 pb-6">
                    <div>
                        <span className="font-mono text-xs text-[#00D4FF] uppercase tracking-widest">Our Work</span>
                        <h2 className="text-3xl md:text-4xl text-slate-900 dark:text-white mt-4 font-bold font-['Courier_Prime']">Case Studies</h2>
                    </div>
                    <div className="hidden md:block">
                        <button
                          onClick={() => { setShowCaseStudiesList(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                          className="text-xs font-mono underline underline-offset-4 text-slate-500 dark:text-slate-400 hover:text-[#00D4FF] transition-colors"
                        >
                          View All Case Studies &rarr;
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {previewCaseStudies.map((study) => (
                        <div key={study.id} className="group cursor-pointer" onClick={() => { setSelectedCaseStudy(study); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
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
                                <div className="absolute top-3 right-3 bg-white dark:bg-[#0A1628] px-2 py-1 text-[10px] font-mono border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-300 uppercase">
                                    {study.date}
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

                {/* Mobile View All Button */}
                <div className="mt-12 text-center md:hidden">
                    <button
                      onClick={() => { setShowCaseStudiesList(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="inline-flex items-center gap-2 bg-slate-100 dark:bg-[#1E3A5F] text-slate-700 dark:text-slate-300 px-6 py-3 rounded-lg font-mono text-sm hover:bg-[#00D4FF] hover:text-[#0A1628] transition-colors"
                    >
                      View All Case Studies
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                </div>
            </div>
        </section>

        {/* JOURNAL / INSIGHTS - Preview of 3 articles */}
        <section id="journal" className="py-24 px-6 lg:px-12 bg-[#0F172A] dark:bg-[#0A1628] relative z-10 border-b border-slate-800">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-end mb-16 border-b border-slate-700 pb-6">
                    <div>
                        <span className="font-mono text-xs text-[#00D4FF] uppercase tracking-widest">Monthly Analysis</span>
                        <h2 className="text-3xl md:text-4xl text-white mt-4 font-bold font-['Courier_Prime']">Industry Insights</h2>
                    </div>
                    <div className="hidden md:block">
                        <button
                          onClick={() => { setShowInsightsList(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                          className="text-xs font-mono underline underline-offset-4 text-slate-400 hover:text-[#00D4FF] transition-colors"
                        >
                          View All Insights &rarr;
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {previewArticles.map((article) => (
                        <article
                            key={article.id}
                            className="group cursor-pointer"
                            onClick={() => { setSelectedArticle(article); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        >
                            <div className="aspect-[16/10] bg-[#1E3A5F] mb-6 overflow-hidden border border-slate-700 relative">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                                />
                                <div className="absolute top-3 left-3 bg-[#0A1628] px-2 py-1 text-[10px] font-mono border border-slate-700 text-[#00D4FF] uppercase">
                                    {article.date}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2 font-['Courier_Prime'] group-hover:text-[#00D4FF] transition-colors">
                                {article.title}
                            </h3>
                            <p className="text-xs text-slate-500 mb-3">By {article.author}</p>
                            <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
                                {article.excerpt}
                            </p>
                            <span className="inline-block mt-4 text-xs font-mono text-[#00D4FF] group-hover:translate-x-1 transition-transform">
                                Read more &rarr;
                            </span>
                        </article>
                    ))}
                </div>

                {/* Mobile View All Button */}
                <div className="mt-12 text-center md:hidden">
                    <button
                      onClick={() => { setShowInsightsList(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="inline-flex items-center gap-2 bg-[#1E3A5F] text-slate-300 px-6 py-3 rounded-lg font-mono text-sm hover:bg-[#00D4FF] hover:text-[#0A1628] transition-colors"
                    >
                      View All Insights
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                </div>
            </div>
        </section>

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

               <a href="mailto:agents@sftwrks.com" className="inline-block bg-[#00D4FF] text-[#0A1628] px-10 py-4 font-semibold hover:bg-[#22D3EE] hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] transition-all text-sm uppercase tracking-widest font-mono">
                   Get in Touch
               </a>
           </div>
        </section>

        {/* FOOTER */}
        <Footer onLinkClick={handleLinkClick} onOpenDiscovery={() => setIsAssessmentOpen(true)} onShowPrivacy={() => navigateTo('/privacy')} onShowTerms={() => navigateTo('/terms')} />

      </main>

      <Assistant isOpen={isAssessmentOpen} onOpenChange={setIsAssessmentOpen} />
    </div>
  );
}

export default App;
