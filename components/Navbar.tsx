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
            className="hover:opacity-80 transition-opacity flex items-center gap-2 md:gap-2.5"
          >
            <img
              src="/assets/logos/softworks-icon.png"
              alt=""
              className="h-12 md:h-14 w-auto dark:hidden"
            />
            <img
              src="/assets/logos/softworks-icon-light.png"
              alt=""
              className="h-12 md:h-14 w-auto hidden dark:block"
            />
            <span className={`font-['Nunito'] font-black text-xl md:text-2xl tracking-tight transition-colors ${
              scrolled
                ? 'text-slate-900 dark:text-white'
                : isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Softworks
            </span>
          </button>

          {/* Desktop Links */}
          <div className={`hidden md:flex items-center gap-8 text-xs md:text-sm font-medium font-sans tracking-wide transition-colors ${
            scrolled
              ? 'text-slate-700 dark:text-slate-400'
              : isDark ? 'text-slate-300' : 'text-slate-700'
          }`}>
            <button onClick={() => handleLink('about')} className="hover:text-cyan-500 dark:hover:text-[#00D4FF] transition-colors uppercase">How We Work</button>
            <button onClick={() => handleLink('work')} className="hover:text-cyan-500 dark:hover:text-[#00D4FF] transition-colors uppercase">Results</button>
            <button onClick={() => handleLink('journal')} className="hover:text-cyan-500 dark:hover:text-[#00D4FF] transition-colors uppercase">Journal</button>
            <button
              onClick={() => handleLink('contact')}
              className="ml-2 px-4 py-2 border border-[#00D4FF] text-[#00D4FF] hover:bg-[#00D4FF] hover:text-[#0A1628] transition-all duration-200 uppercase text-xs tracking-wider"
            >
              Start
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
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
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
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
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

      {/* Mobile Menu - Dark theme with visual interest */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 overflow-hidden">
          {/* Background with gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] via-[#0F172A] to-[#0A1628]" />

          {/* Subtle grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(to right, #00D4FF 1px, transparent 1px),
                               linear-gradient(to bottom, #00D4FF 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
          />

          {/* Ambient glow effects */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-[#00D4FF]/5 blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-[200px] h-[200px] rounded-full bg-[#00D4FF]/3 blur-2xl" />

          {/* Close button - top right */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-6 right-6 z-50 p-3 text-slate-400 hover:text-[#00D4FF] transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Menu content */}
          <div className="relative min-h-full p-8 pt-24 pb-12 flex flex-col justify-center items-center overflow-y-auto">
            {/* Brand */}
            <div className="mb-12 flex flex-col items-center">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/logos/softworks-icon-light.png"
                  alt=""
                  className="h-12 w-auto"
                />
                <span className="font-['Nunito'] text-white font-black text-3xl tracking-tight">Softworks</span>
              </div>
              <div className="h-0.5 w-16 bg-gradient-to-r from-[#00D4FF] to-transparent mt-4" />
            </div>

            {/* Nav links */}
            <nav className="flex flex-col items-center gap-2 w-full max-w-xs">
              <button
                onClick={() => handleLink('about')}
                className="w-full py-4 px-6 text-lg font-['Courier_Prime'] text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 border border-transparent hover:border-[#00D4FF]/20"
              >
                HOW WE WORK
              </button>
              <button
                onClick={() => handleLink('work')}
                className="w-full py-4 px-6 text-lg font-['Courier_Prime'] text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 border border-transparent hover:border-[#00D4FF]/20"
              >
                RESULTS
              </button>
              <button
                onClick={() => handleLink('journal')}
                className="w-full py-4 px-6 text-lg font-['Courier_Prime'] text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 border border-transparent hover:border-[#00D4FF]/20"
              >
                JOURNAL
              </button>

              {/* CTA Button */}
              <button
                onClick={() => handleLink('contact')}
                className="w-full mt-6 py-4 px-6 text-lg font-['Courier_Prime'] text-[#0A1628] bg-[#00D4FF] hover:bg-[#22D3EE] rounded-lg transition-all duration-200 font-semibold"
              >
                START A PROJECT
              </button>
            </nav>

            {/* Footer info */}
            <div className="mt-auto pt-12 text-center">
              <p className="text-xs font-mono text-slate-600 tracking-wider">AI CONSULTING</p>
              <p className="text-xs text-slate-700 mt-2">agents@sftwrks.com</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
