/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import Filter from './components/Filter';
import Footer from './components/Footer';
import { CaseStudy, JournalArticle } from './types';

// Lazy load non-critical components (code splitting)
const Team = lazy(() => import('./components/Team'));
const CaseStudyDetail = lazy(() => import('./components/CaseStudyDetail'));
const JournalDetail = lazy(() => import('./components/JournalDetail'));
const InsightsList = lazy(() => import('./components/InsightsList'));
const CaseStudiesList = lazy(() => import('./components/CaseStudiesList'));
const Media = lazy(() => import('./components/Media'));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./components/TermsOfService'));
// Assistant (Time Value Calculator) NOT lazy loaded - causes React hooks error when lazy
import Assistant from './components/Assistant';

// Lazy load data - only fetch when needed
const loadConstants = () => import('./constants').then(m => ({
  CASE_STUDIES: m.CASE_STUDIES,
  JOURNAL_ARTICLES: m.JOURNAL_ARTICLES
}));

// Loading fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

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

  // Lazy loaded data
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [journalArticles, setJournalArticles] = useState<JournalArticle[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Load constants on demand (after initial render)
  useEffect(() => {
    // Delay loading data until after hero is visible
    const timer = setTimeout(() => {
      loadConstants().then(data => {
        setCaseStudies(data.CASE_STUDIES);
        setJournalArticles(data.JOURNAL_ARTICLES);
        setDataLoaded(true);
      });
    }, 100); // Small delay to prioritize hero render
    return () => clearTimeout(timer);
  }, []);

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

  // Preview sorted by date (newest first), limited to 1 for homepage
  const previewArticles = [...journalArticles]
    .sort((a, b) => parseArticleDate(b.date).localeCompare(parseArticleDate(a.date)))
    .slice(0, 1);
  const previewCaseStudies = [...caseStudies]
    .sort((a, b) => b.completedDate.localeCompare(a.completedDate))
    .slice(0, 1);

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
           <Suspense fallback={<LoadingFallback />}>
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
           </Suspense>
        </div>
    );
  }

  if (showInsightsList) {
    return (
        <div className="min-h-screen font-sans selection:bg-cyan-200 selection:text-cyan-900 bg-[#F1F5F9] dark:bg-[#0A1628] transition-colors duration-300">
           <Navbar onNavClick={scrollToSection} isDark={isDark} toggleTheme={toggleTheme} />
           <Suspense fallback={<LoadingFallback />}>
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
           </Suspense>
           <Footer onLinkClick={handleLinkClick} onOpenDiscovery={() => setIsAssessmentOpen(true)} onShowPrivacy={() => navigateTo('/privacy')} onShowTerms={() => navigateTo('/terms')} />
           <Suspense fallback={null}><Assistant isOpen={isAssessmentOpen} onOpenChange={setIsAssessmentOpen} /></Suspense>
        </div>
    );
  }

  if (selectedCaseStudy) {
    return (
        <div className="min-h-screen font-sans selection:bg-cyan-200 selection:text-cyan-900 bg-[#F1F5F9] dark:bg-[#0A1628] transition-colors duration-300">
           <Navbar onNavClick={scrollToSection} isDark={isDark} toggleTheme={toggleTheme} />
           <Suspense fallback={<LoadingFallback />}>
             <CaseStudyDetail
               study={selectedCaseStudy}
               onBack={() => {
                 setSelectedCaseStudy(null);
                 setTimeout(() => scrollToSection('work'), 100);
               }}
               onNavigate={(study) => setSelectedCaseStudy(study)}
             />
             <Assistant isOpen={isAssessmentOpen} onOpenChange={setIsAssessmentOpen} />
           </Suspense>
        </div>
    );
  }

  if (showCaseStudiesList) {
    return (
        <div className="min-h-screen font-sans selection:bg-cyan-200 selection:text-cyan-900 bg-[#F1F5F9] dark:bg-[#0A1628] transition-colors duration-300">
           <Navbar onNavClick={scrollToSection} isDark={isDark} toggleTheme={toggleTheme} />
           <Suspense fallback={<LoadingFallback />}>
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
           </Suspense>
           <Footer onLinkClick={handleLinkClick} onOpenDiscovery={() => setIsAssessmentOpen(true)} onShowPrivacy={() => navigateTo('/privacy')} onShowTerms={() => navigateTo('/terms')} />
           <Suspense fallback={null}><Assistant isOpen={isAssessmentOpen} onOpenChange={setIsAssessmentOpen} /></Suspense>
        </div>
    );
  }

  if (showMedia) {
    return (
        <div className="min-h-screen font-sans selection:bg-cyan-200 selection:text-cyan-900 bg-[#F1F5F9] dark:bg-[#0A1628] transition-colors duration-300">
           <Navbar onNavClick={scrollToSection} isDark={isDark} toggleTheme={toggleTheme} />
           <Suspense fallback={<LoadingFallback />}>
             <Media onBack={() => {
                 setShowMedia(false);
                 setTimeout(() => scrollToSection('top'), 100);
             }} />
           </Suspense>
           <Footer onLinkClick={handleLinkClick} onOpenDiscovery={() => setIsAssessmentOpen(true)} onShowPrivacy={() => navigateTo('/privacy')} onShowTerms={() => navigateTo('/terms')} />
           <Suspense fallback={null}><Assistant isOpen={isAssessmentOpen} onOpenChange={setIsAssessmentOpen} /></Suspense>
        </div>
    );
  }

  if (showPrivacyPolicy) {
    return (
        <div className="min-h-screen font-sans selection:bg-cyan-200 selection:text-cyan-900 bg-[#F1F5F9] dark:bg-[#0A1628] transition-colors duration-300">
           <Navbar onNavClick={scrollToSection} isDark={isDark} toggleTheme={toggleTheme} />
           <Suspense fallback={<LoadingFallback />}>
             <PrivacyPolicy onBack={() => navigateTo('/')} />
             <Assistant isOpen={isAssessmentOpen} onOpenChange={setIsAssessmentOpen} />
           </Suspense>
        </div>
    );
  }

  if (showTermsOfService) {
    return (
        <div className="min-h-screen font-sans selection:bg-cyan-200 selection:text-cyan-900 bg-[#F1F5F9] dark:bg-[#0A1628] transition-colors duration-300">
           <Navbar onNavClick={scrollToSection} isDark={isDark} toggleTheme={toggleTheme} />
           <Suspense fallback={<LoadingFallback />}>
             <TermsOfService onBack={() => navigateTo('/')} />
             <Assistant isOpen={isAssessmentOpen} onOpenChange={setIsAssessmentOpen} />
           </Suspense>
        </div>
    );
  }

  return (
    <div className="min-h-screen font-sans selection:bg-cyan-200 selection:text-cyan-900 bg-[#F1F5F9] dark:bg-[#0A1628] transition-colors duration-300 overflow-x-hidden">
      <Navbar onNavClick={scrollToSection} isDark={isDark} toggleTheme={toggleTheme} />

      <main className="relative overflow-x-hidden">
        {/* Circuit Grid Background - Very subtle */}
        <div className="fixed inset-0 bg-grid-pattern opacity-10 pointer-events-none z-0"></div>

        {/* HERO */}
        <Hero isDark={isDark} onOpenAssessment={() => setIsAssessmentOpen(true)} />

        {/* ABOUT - Problem & Solution */}
        <About />

        {/* FEATURES - The Path & Value Philosophy */}
        <Features onOpenCalculator={() => setIsAssessmentOpen(true)} />

        {/* TEAM - lazy loaded */}
        <Suspense fallback={<div className="py-24" />}>
          <Team />
        </Suspense>

        {/* FILTER - Is This Right For You? */}
        <Filter />

        {/* WORK & INSIGHTS - Combined section with side-by-side layout */}
        <section id="work" className="py-24 px-6 lg:px-12 bg-[#0F172A] dark:bg-[#0A1628] relative z-10 border-b border-slate-800">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="font-mono text-xs text-[#00D4FF] uppercase tracking-widest">Latest</span>
                    <h2 className="text-3xl md:text-4xl text-white mt-4 font-bold font-['Courier_Prime']">Case Studies & Journal</h2>
                </div>

                {/* Side-by-side layout on desktop, stacked on mobile */}
                <div id="journal" className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

                    {/* Case Study Preview */}
                    {previewCaseStudies[0] && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center border-b border-slate-700 pb-4">
                                <span className="font-mono text-xs text-slate-400 uppercase tracking-widest">Case Studies</span>
                                <button
                                    onClick={() => { setShowCaseStudiesList(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                    className="text-xs font-mono text-[#00D4FF] hover:underline transition-colors"
                                >
                                    View All &rarr;
                                </button>
                            </div>

                            <div
                                className="group cursor-pointer"
                                onClick={() => { setSelectedCaseStudy(previewCaseStudies[0]); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                            >
                                <div className="aspect-[16/10] bg-[#1E3A5F] mb-5 overflow-hidden border border-slate-700 relative">
                                    <img
                                        src={`${previewCaseStudies[0].imageUrl}?v=2`}
                                        alt={previewCaseStudies[0].title}
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                                    />
                                    <div className="absolute top-3 left-3 bg-[#0A1628] px-2 py-1 text-[10px] font-mono border border-slate-700 text-slate-300 uppercase">
                                        {previewCaseStudies[0].sector}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2 font-['Courier_Prime'] leading-tight group-hover:text-[#00D4FF] transition-colors">
                                    {previewCaseStudies[0].title}
                                </h3>
                                <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">
                                    {previewCaseStudies[0].client}
                                </p>
                                <p className="text-sm text-slate-400 mb-4 line-clamp-2 leading-relaxed">
                                    {previewCaseStudies[0].summary}
                                </p>
                                <div className="pl-3 border-l-2 border-slate-700 group-hover:border-[#00D4FF] transition-colors">
                                    <p className="text-xs font-bold text-white font-['Courier_Prime']">
                                        Outcome: {previewCaseStudies[0].outcome}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Insight Preview */}
                    {previewArticles[0] && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center border-b border-slate-700 pb-4">
                                <span className="font-mono text-xs text-slate-400 uppercase tracking-widest">Journal</span>
                                <button
                                    onClick={() => { setShowInsightsList(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                    className="text-xs font-mono text-[#00D4FF] hover:underline transition-colors"
                                >
                                    View All &rarr;
                                </button>
                            </div>

                            <article
                                className="group cursor-pointer"
                                onClick={() => { setSelectedArticle(previewArticles[0]); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                            >
                                <div className="aspect-[16/10] bg-[#1E3A5F] mb-5 overflow-hidden border border-slate-700 relative">
                                    <img
                                        src={`${previewArticles[0].image}?v=2`}
                                        alt={previewArticles[0].title}
                                        className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                                    />
                                    <div className="absolute top-3 left-3 bg-[#0A1628] px-2 py-1 text-[10px] font-mono border border-slate-700 text-[#00D4FF] uppercase">
                                        {previewArticles[0].date}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2 font-['Courier_Prime'] group-hover:text-[#00D4FF] transition-colors">
                                    {previewArticles[0].title}
                                </h3>
                                <p className="text-xs text-slate-500 mb-3">By {previewArticles[0].author}</p>
                                <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
                                    {previewArticles[0].excerpt}
                                </p>
                                <span className="inline-block mt-4 text-xs font-mono text-[#00D4FF] group-hover:translate-x-1 transition-transform">
                                    Read more &rarr;
                                </span>
                            </article>
                        </div>
                    )}
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

      <Suspense fallback={null}>
        <Assistant isOpen={isAssessmentOpen} onOpenChange={setIsAssessmentOpen} />
      </Suspense>
    </div>
  );
}

export default App;
