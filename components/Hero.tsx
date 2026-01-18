/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { useParallaxScroll } from '../hooks/useScrollAnimation';

interface HeroProps {
  isDark: boolean;
  onOpenAssessment?: () => void;
}

// Featured video URL - set to your YouTube or Vimeo embed URL
const FEATURED_VIDEO_URL = ''; // e.g., 'https://www.youtube.com/embed/VIDEO_ID'

const Hero: React.FC<HeroProps> = ({ isDark, onOpenAssessment }) => {
  const [showVideo, setShowVideo] = useState(false);

  // Enable parallax scrolling effect
  useParallaxScroll();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, targetId: string) => {
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

  const scrollToNextSection = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden">

      {/* Background - Same image for both modes with different overlays */}
      <div className="absolute inset-0 hero-parallax">
        {/* Hero image - visible in both modes */}
        <img
          src="/assets/hero/hero-friendly.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Dark mode overlay */}
        <div className={`absolute inset-0 transition-opacity duration-500 ${
          isDark ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/95 via-[#0A1628]/80 to-[#0A1628]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-transparent to-[#0A1628]/60" />
        </div>

        {/* Light mode overlay - lighter, more transparent */}
        <div className={`absolute inset-0 transition-opacity duration-500 ${
          isDark ? 'opacity-0' : 'opacity-100'
        }`}>
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-white/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-white/60" />
        </div>
      </div>

      {/* Circuit Grid Pattern Overlay - Very subtle, theme responsive, with floating animation */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 animate-float ${isDark ? 'opacity-5' : 'opacity-[0.03]'}`}>
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

      {/* Subtle Glow Accents - with breathing pulse animation */}
      <div className={`absolute top-1/3 left-1/4 w-96 h-96 rounded-full blur-[200px] transition-all duration-500 animate-glow-pulse ${
        isDark ? 'bg-[#00D4FF] opacity-10' : 'bg-cyan-400 opacity-20'
      }`} />

      {/* Content */}
      <div className="relative z-10 h-full min-h-screen flex items-center px-6 py-24">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-2xl">

            {/* Empathy Hook */}
            <p className={`animate-fade-in-up text-sm md:text-base mb-6 transition-colors duration-300 ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              AI doesn't have to be complicated.
            </p>

            {/* Main Headline - Outcome Focused */}
            <h1 className="animate-fade-in-up text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6 leading-[1.1] transition-colors duration-300" style={{ animationDelay: '100ms' }}>
              <span className={isDark ? 'text-white' : 'text-slate-900'}>Get AI Working</span>
              <br />
              <span className={isDark ? 'text-[#00D4FF]' : 'text-cyan-600'}>in Weeks, Not Months</span>
            </h1>

            {/* Subheadline - How */}
            <p className={`animate-fade-in-up max-w-xl text-lg md:text-xl font-light leading-relaxed mb-10 transition-colors duration-300 ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`} style={{ animationDelay: '200ms' }}>
              We handle the strategy, setup, and support—you get results.
            </p>

            {/* CTA Buttons - Single clear action */}
            <div className="animate-fade-in-up flex flex-col sm:flex-row gap-4 items-center sm:items-start" style={{ animationDelay: '300ms' }}>
              <button
                onClick={onOpenAssessment}
                className={`group px-10 py-4 font-semibold uppercase tracking-wider text-sm transition-all duration-300 text-center w-full sm:w-auto ${
                  isDark
                    ? 'bg-[#00D4FF] text-[#0A1628] hover:bg-[#22D3EE] hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]'
                    : 'bg-cyan-600 text-white hover:bg-cyan-700 hover:shadow-lg'
                }`}
              >
                See How It Works
              </button>
              <a
                href="#work"
                onClick={(e) => handleNavClick(e, 'work')}
                className={`group px-6 py-4 font-medium text-sm transition-all duration-300 text-center flex items-center gap-2 ${
                  isDark
                    ? 'text-slate-400 hover:text-[#00D4FF]'
                    : 'text-slate-500 hover:text-cyan-600'
                }`}
              >
                or view our work
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              {FEATURED_VIDEO_URL && (
                <button
                  onClick={() => setShowVideo(true)}
                  className={`group px-8 py-4 font-medium uppercase tracking-wider text-sm transition-all duration-300 text-center flex items-center justify-center gap-3 ${
                    isDark
                      ? 'text-slate-300 hover:text-[#00D4FF]'
                      : 'text-slate-600 hover:text-cyan-600'
                  }`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Watch Video
                </button>
              )}
            </div>

            {/* Trust Indicators - Specific social proof */}
            <div className={`animate-fade-in-up mt-12 transition-colors duration-300`} style={{ animationDelay: '350ms' }}>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                <span className={`font-semibold ${isDark ? 'text-[#00D4FF]' : 'text-cyan-600'}`}>50+ teams</span> have shipped AI that actually works
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Scroll Indicator - Clickable */}
      <button
        onClick={scrollToNextSection}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 group cursor-pointer focus:outline-none"
        aria-label="Scroll to next section"
      >
        <div className="flex flex-col items-center gap-2 animate-bounce group-hover:animate-none">
          <span className={`text-xs font-mono uppercase tracking-widest transition-colors ${isDark ? 'text-slate-500 group-hover:text-[#00D4FF]' : 'text-slate-500 group-hover:text-cyan-600'}`}>
            Explore
          </span>
          <svg className={`w-6 h-6 transition-transform group-hover:translate-y-1 ${isDark ? 'text-[#00D4FF]' : 'text-cyan-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </button>

      {/* Video Modal */}
      {showVideo && FEATURED_VIDEO_URL && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setShowVideo(false)}
        >
          <div className="relative w-full max-w-4xl mx-4">
            {/* Close Button */}
            <button
              onClick={() => setShowVideo(false)}
              className="absolute -top-12 right-0 text-white hover:text-[#00D4FF] transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* Video Embed */}
            <div className="aspect-video bg-[#0A1628] rounded-lg overflow-hidden border border-slate-700">
              <iframe
                src={FEATURED_VIDEO_URL}
                title="Featured Video"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
