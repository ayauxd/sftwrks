/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onNavClick: (targetId: string) => void;
  isDark: boolean;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavClick, isDark, toggleTheme }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLink = (id: string) => {
    setMobileMenuOpen(false);
    onNavClick(id);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled
            ? 'bg-[#F1F5F9]/95 dark:bg-[#0A1628]/95 backdrop-blur-sm border-slate-300 dark:border-slate-800 py-3 shadow-sm'
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Brand Logo + Text */}
          <button
            onClick={() => handleLink('top')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img
              src="/assets/logos/logo-icon.png"
              alt="Softworks"
              className="w-10 h-10 md:w-12 md:h-12 object-contain"
            />
            <div className="flex flex-col items-end">
              <span className={`font-sans font-bold text-lg md:text-xl tracking-wide transition-colors ${
                scrolled
                  ? 'text-slate-900 dark:text-white'
                  : isDark ? 'text-white' : 'text-slate-900'
              }`}>
                SOFTWORKS
              </span>
              <span className={`font-sans font-medium text-[8px] md:text-[10px] tracking-[0.47em] uppercase transition-colors ${
                scrolled
                  ? 'text-slate-500 dark:text-slate-400'
                  : isDark ? 'text-slate-300' : 'text-slate-500'
              }`}>
                Trading Company
              </span>
            </div>
          </button>

          {/* Desktop Links */}
          <div className={`hidden md:flex items-center gap-8 text-xs md:text-sm font-medium font-sans tracking-wide transition-colors ${
            scrolled
              ? 'text-slate-600 dark:text-slate-400'
              : isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            <button onClick={() => handleLink('about')} className="hover:text-cyan-500 dark:hover:text-[#00D4FF] transition-colors uppercase">How We Help</button>
            <button onClick={() => handleLink('team')} className="hover:text-cyan-500 dark:hover:text-[#00D4FF] transition-colors uppercase">Team</button>
            <button onClick={() => handleLink('work')} className="hover:text-cyan-500 dark:hover:text-[#00D4FF] transition-colors uppercase">Results</button>
            <button onClick={() => handleLink('journal')} className="hover:text-cyan-500 dark:hover:text-[#00D4FF] transition-colors uppercase">Articles</button>
            <button
              onClick={() => handleLink('contact')}
              className="ml-2 px-4 py-2 border border-[#00D4FF] text-[#00D4FF] hover:bg-[#00D4FF] hover:text-[#0A1628] transition-all duration-200 uppercase text-xs tracking-wider"
            >
              Contact
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`ml-2 p-2 rounded-full transition-colors ${
                scrolled
                  ? 'hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  : isDark
                    ? 'hover:bg-slate-800 text-slate-300'
                    : 'hover:bg-slate-200 text-slate-700'
              }`}
              aria-label="Toggle Dark Mode"
            >
              {isDark ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className={`flex items-center gap-4 md:hidden ${
            scrolled
              ? 'text-slate-700 dark:text-slate-300'
              : isDark ? 'text-slate-300' : 'text-slate-700'
          }`}>
            <button
                onClick={toggleTheme}
                className="p-1"
            >
                {isDark ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                  </svg>
                )}
            </button>
            <button
              className=""
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
               {mobileMenuOpen ? (
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
               ) : (
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
               )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-0 bg-[#F1F5F9] dark:bg-[#0A1628] z-40 p-6 flex flex-col justify-center items-center gap-8 font-['Courier_Prime'] text-xl text-slate-900 dark:text-slate-100 animate-fade-in-up">
            {/* Mobile Brand */}
            <div className="flex items-center gap-4 mb-8">
              <img
                src="/assets/logos/logo-icon.png"
                alt="Softworks"
                className="w-16 h-16 object-contain"
              />
              <div className="flex flex-col items-end">
                <span className="font-sans text-slate-900 dark:text-white font-bold text-2xl tracking-wide">SOFTWORKS</span>
                <span className="font-sans text-slate-500 dark:text-slate-400 font-medium text-xs tracking-[0.47em] uppercase">Trading Company</span>
              </div>
            </div>
            <button onClick={() => handleLink('about')} className="hover:text-[#00D4FF] transition-colors">HOW WE HELP</button>
            <button onClick={() => handleLink('team')} className="hover:text-[#00D4FF] transition-colors">TEAM</button>
            <button onClick={() => handleLink('work')} className="hover:text-[#00D4FF] transition-colors">RESULTS</button>
            <button onClick={() => handleLink('journal')} className="hover:text-[#00D4FF] transition-colors">ARTICLES</button>
            <button onClick={() => handleLink('contact')} className="hover:text-[#00D4FF] transition-colors">CONTACT</button>
            <button onClick={() => setMobileMenuOpen(false)} className="mt-8 text-sm font-sans text-slate-500 uppercase tracking-widest hover:text-[#00D4FF]">Close</button>
        </div>
      )}
    </>
  );
};

export default Navbar;
