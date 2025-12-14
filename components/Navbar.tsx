/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState, useEffect } from 'react';
import { BRAND_NAME } from '../constants';

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
            ? 'bg-[#F5F5F4]/95 dark:bg-[#0c0a09]/95 backdrop-blur-sm border-stone-300 dark:border-stone-800 py-3 shadow-sm' 
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Brand */}
          <button 
            onClick={() => handleLink('top')}
            className="text-base md:text-lg font-bold tracking-tight text-stone-900 dark:text-stone-100 uppercase font-['Courier_Prime'] hover:text-orange-600 dark:hover:text-orange-500 transition-colors"
          >
            {BRAND_NAME}
          </button>
          
          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 text-xs md:text-sm font-medium text-stone-600 dark:text-stone-400 font-sans tracking-wide">
            <button onClick={() => handleLink('about')} className="hover:text-orange-600 dark:hover:text-orange-500 transition-colors uppercase">What We Do</button>
            <button onClick={() => handleLink('process')} className="hover:text-orange-600 dark:hover:text-orange-500 transition-colors uppercase">Approach</button>
            <button onClick={() => handleLink('work')} className="hover:text-orange-600 dark:hover:text-orange-500 transition-colors uppercase">Case Studies</button>
            <button onClick={() => handleLink('journal')} className="hover:text-orange-600 dark:hover:text-orange-500 transition-colors uppercase">Insights</button>
            <button onClick={() => handleLink('contact')} className="hover:text-orange-600 dark:hover:text-orange-500 transition-colors uppercase">Contact</button>
            
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme} 
              className="ml-4 p-2 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors text-stone-900 dark:text-stone-100"
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
          <div className="flex items-center gap-4 md:hidden">
            <button 
                onClick={toggleTheme} 
                className="p-1 text-stone-900 dark:text-stone-100"
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
              className="text-stone-900 dark:text-stone-100"
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
        <div className="fixed inset-0 top-0 bg-[#F5F5F4] dark:bg-[#0c0a09] z-40 p-6 flex flex-col justify-center items-center gap-8 font-['Courier_Prime'] text-xl text-stone-900 dark:text-stone-100 animate-fade-in-up">
            <button onClick={() => handleLink('about')} className="hover:text-orange-600 dark:hover:text-orange-500">WHAT WE DO</button>
            <button onClick={() => handleLink('process')} className="hover:text-orange-600 dark:hover:text-orange-500">APPROACH</button>
            <button onClick={() => handleLink('work')} className="hover:text-orange-600 dark:hover:text-orange-500">CASE STUDIES</button>
            <button onClick={() => handleLink('journal')} className="hover:text-orange-600 dark:hover:text-orange-500">INSIGHTS</button>
            <button onClick={() => handleLink('contact')} className="hover:text-orange-600 dark:hover:text-orange-500">CONTACT</button>
            <button onClick={() => setMobileMenuOpen(false)} className="mt-8 text-sm font-sans text-stone-500 dark:text-stone-500 uppercase tracking-widest hover:text-orange-600">Close</button>
        </div>
      )}
    </>
  );
};

export default Navbar;