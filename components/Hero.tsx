/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

interface HeroProps {
  isDark: boolean;
}

const Hero: React.FC<HeroProps> = ({ isDark }) => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      try {
        window.history.pushState(null, '', `#${targetId}`);
      } catch (err) {
        // Ignore SecurityError in restricted environments
      }
    }
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden">

      {/* Background - Theme responsive */}
      <div className="absolute inset-0 transition-colors duration-500">
        {/* Dark mode: Bridge/Earth image */}
        <img
          src="/assets/hero/bridge-metaphor.png"
          alt=""
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 ${
            isDark ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Light mode: Globe image with light background */}
        <div className={`absolute inset-0 bg-gradient-to-br from-sky-50 via-slate-50 to-cyan-50 transition-opacity duration-500 ${
          isDark ? 'opacity-0' : 'opacity-100'
        }`}>
          <div className="absolute inset-0 flex items-center justify-end pr-12 lg:pr-24">
            <img
              src="/assets/logos/softworks-globe-light.png"
              alt=""
              className="w-[500px] h-[500px] lg:w-[600px] lg:h-[600px] object-contain opacity-40"
            />
          </div>
        </div>

        {/* Dark mode overlays */}
        <div className={`absolute inset-0 bg-gradient-to-r from-[#0A1628]/95 via-[#0A1628]/80 to-[#0A1628]/40 transition-opacity duration-500 ${
          isDark ? 'opacity-100' : 'opacity-0'
        }`} />
        <div className={`absolute inset-0 bg-gradient-to-t from-[#0A1628] via-transparent to-[#0A1628]/60 transition-opacity duration-500 ${
          isDark ? 'opacity-100' : 'opacity-0'
        }`} />
      </div>

      {/* Circuit Grid Pattern Overlay - Very subtle, theme responsive */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isDark ? 'opacity-5' : 'opacity-[0.03]'}`}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: isDark
              ? `linear-gradient(to right, rgba(0, 212, 255, 0.3) 1px, transparent 1px),
                 linear-gradient(to bottom, rgba(0, 212, 255, 0.3) 1px, transparent 1px)`
              : `linear-gradient(to right, rgba(15, 23, 42, 0.2) 1px, transparent 1px),
                 linear-gradient(to bottom, rgba(15, 23, 42, 0.2) 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      {/* Subtle Glow Accents */}
      <div className={`absolute top-1/3 left-1/4 w-96 h-96 rounded-full blur-[200px] transition-all duration-500 ${
        isDark ? 'bg-[#00D4FF] opacity-10' : 'bg-cyan-400 opacity-20'
      }`} />

      {/* Content */}
      <div className="relative z-10 h-full min-h-screen flex items-center px-6 py-24">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-2xl">

            {/* Mono Label */}
            <span className={`animate-fade-in-up inline-block text-xs font-mono uppercase tracking-[0.3em] mb-8 border px-4 py-2 transition-colors duration-300 ${
              isDark
                ? 'text-[#00D4FF] border-[#00D4FF]/30'
                : 'text-cyan-600 border-cyan-600/30'
            }`}>
              AI Strategy & Integration Advisory
            </span>

            {/* Main Headline */}
            <h1 className="animate-fade-in-up text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6 leading-[1.1] transition-colors duration-300" style={{ animationDelay: '100ms' }}>
              <span className={isDark ? 'text-white' : 'text-slate-900'}>Making </span>
              <span className={isDark ? 'text-[#00D4FF]' : 'text-cyan-600'}>AI Work</span>
              <br />
              <span className={`font-light ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>for Your Business</span>
            </h1>

            {/* Subheadline */}
            <p className={`animate-fade-in-up max-w-xl text-lg md:text-xl font-light leading-relaxed mb-10 transition-colors duration-300 ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`} style={{ animationDelay: '200ms' }}>
              We help you go from AI confusion to real results.
              <br className="hidden md:block" />
              <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>Plan it. Protect it. Put it to work.</span>
            </p>

            {/* CTA Buttons */}
            <div className="animate-fade-in-up flex flex-col sm:flex-row gap-4" style={{ animationDelay: '300ms' }}>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, 'contact')}
                className={`group px-8 py-4 font-semibold uppercase tracking-wider text-sm transition-all duration-300 text-center ${
                  isDark
                    ? 'bg-[#00D4FF] text-[#0A1628] hover:bg-[#22D3EE] hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]'
                    : 'bg-cyan-600 text-white hover:bg-cyan-700 hover:shadow-lg'
                }`}
              >
                Start a Conversation
              </a>
              <a
                href="#work"
                onClick={(e) => handleNavClick(e, 'work')}
                className={`group px-8 py-4 border font-medium uppercase tracking-wider text-sm transition-all duration-300 text-center ${
                  isDark
                    ? 'border-slate-500 text-slate-300 hover:border-[#00D4FF] hover:text-[#00D4FF]'
                    : 'border-slate-400 text-slate-600 hover:border-cyan-600 hover:text-cyan-600'
                }`}
              >
                View Case Studies
              </a>
            </div>

            {/* Trust Indicators */}
            <div className={`animate-fade-in-up mt-16 pt-8 border-t transition-colors duration-300 ${
              isDark ? 'border-slate-700/50' : 'border-slate-300/50'
            }`} style={{ animationDelay: '400ms' }}>
              <p className={`text-xs font-mono uppercase tracking-[0.2em] mb-4 ${
                isDark ? 'text-slate-500' : 'text-slate-500'
              }`}>
                Trusted by forward-thinking organizations
              </p>
              <div className={`flex flex-wrap items-center gap-6 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                <span className="text-sm font-light">Mid-Market Enterprises</span>
                <span className={`hidden sm:block ${isDark ? 'text-slate-700' : 'text-slate-300'}`}>|</span>
                <span className="text-sm font-light">Growth-Stage Startups</span>
                <span className={`hidden sm:block ${isDark ? 'text-slate-700' : 'text-slate-300'}`}>|</span>
                <span className="text-sm font-light">Professional Services</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <div className="flex flex-col items-center gap-2">
          <span className={`text-xs font-mono uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>Explore</span>
          <svg className={`w-5 h-5 ${isDark ? 'text-[#00D4FF]' : 'text-cyan-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
