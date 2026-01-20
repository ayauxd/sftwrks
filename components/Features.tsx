/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef } from 'react';

interface FeaturesProps {
  onOpenCalculator?: () => void;
}

const Features: React.FC<FeaturesProps> = ({ onOpenCalculator }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const findItSteps = [
    {
      number: '01',
      title: 'Map',
      description: 'Walk your operations. Find the real bottleneck.',
      image: '/assets/sections/step-01-map.webp?v=2',
    },
    {
      number: '02',
      title: 'Value',
      description: 'Calculate what fixing it is worth to you.',
      image: '/assets/sections/step-02-value.webp?v=2',
    },
  ];

  const fixItSteps = [
    {
      number: '03',
      title: 'Scope',
      description: 'Fixed price. Clear deliverable. No surprises.',
      image: '/assets/sections/step-03-scope.webp?v=2',
    },
    {
      number: '04',
      title: 'Build',
      description: 'One system at a time. Weekly progress.',
      image: '/assets/sections/step-04-build.webp?v=2',
    },
    {
      number: '05',
      title: 'Hand Over',
      description: 'You own it. We train, document, then exit.',
      image: '/assets/sections/step-05-handover.webp?v=2',
    },
  ];

  return (
    <section
      id="process"
      ref={sectionRef}
      className="bg-[#0F172A] dark:bg-[#0A1628] py-24 px-6 md:px-12"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block text-xs font-mono uppercase tracking-[0.2em] text-[#00D4FF] mb-6">
            The Path
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
            Five steps to a working system.
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-400 font-light">
            No multi-year transformation programs. Find the constraint, agree on value, build the fix, hand it over.
          </p>
        </div>

        {/* Timeline Flow */}
        <div className="relative">
          {/* SVG Connecting Path - Desktop */}
          <svg
            className="hidden md:block absolute top-[52px] left-0 w-full h-8 overflow-visible pointer-events-none"
            preserveAspectRatio="none"
          >
            {/* Main connecting line */}
            <line
              x1="10%"
              y1="50%"
              x2="90%"
              y2="50%"
              className={`path-line ${isVisible ? 'animate' : ''}`}
              stroke="#00D4FF"
              strokeWidth="2"
              strokeOpacity="0.3"
            />
            {/* Dots at each step position */}
            {[10, 30, 50, 70, 90].map((x, i) => (
              <circle
                key={i}
                cx={`${x}%`}
                cy="50%"
                r="6"
                fill="#00D4FF"
                fillOpacity={isVisible ? 1 : 0}
                style={{
                  transition: 'fill-opacity 0.3s ease-out',
                  transitionDelay: `${0.3 + i * 0.15}s`,
                }}
              />
            ))}
            {/* Phase divider - dotted vertical line between step 2 and 3 */}
            <line
              x1="40%"
              y1="-20"
              x2="40%"
              y2="40"
              stroke="#00D4FF"
              strokeWidth="1"
              strokeOpacity="0.2"
              strokeDasharray="4 4"
            />
          </svg>

          {/* Two-Phase Layout - Desktop */}
          <div className="hidden md:grid md:grid-cols-5 gap-4">
            {/* Phase 1: Find It - Steps 1-2 */}
            <div className="col-span-2 space-y-4">
              <span
                className={`phase-label text-xs font-mono uppercase tracking-widest text-slate-500 block ${isVisible ? 'visible' : ''}`}
              >
                Find It
              </span>
              <div className="grid grid-cols-2 gap-4">
                {findItSteps.map((step, index) => (
                  <div
                    key={step.number}
                    className={`step-card group ${isVisible ? 'visible' : ''}`}
                    style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                  >
                    <div className="bg-[#1E3A5F]/50 border border-slate-700 group-hover:border-[#00D4FF]/50 rounded-xl overflow-hidden transition-all duration-300 h-full">
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={step.image}
                          alt={step.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-[#00D4FF] rounded-lg flex items-center justify-center text-[#0A1628] font-mono font-bold text-xs">
                            {step.number}
                          </div>
                          <h3 className="text-lg font-bold text-white">{step.title}</h3>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Phase 2: Fix It - Steps 3-5 */}
            <div className="col-span-3 space-y-4">
              <span
                className={`phase-label text-xs font-mono uppercase tracking-widest text-slate-500 block ${isVisible ? 'visible' : ''}`}
                style={{ animationDelay: '0.3s' }}
              >
                Fix It
              </span>
              <div className="grid grid-cols-3 gap-4">
                {fixItSteps.map((step, index) => (
                  <div
                    key={step.number}
                    className={`step-card group ${isVisible ? 'visible' : ''}`}
                    style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                  >
                    <div className="bg-[#1E3A5F]/50 border border-slate-700 group-hover:border-[#00D4FF]/50 rounded-xl overflow-hidden transition-all duration-300 h-full">
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={step.image}
                          alt={step.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-[#00D4FF] rounded-lg flex items-center justify-center text-[#0A1628] font-mono font-bold text-xs">
                            {step.number}
                          </div>
                          <h3 className="text-lg font-bold text-white">{step.title}</h3>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Layout - Vertical Timeline */}
          <div className="md:hidden space-y-2">
            {/* Phase 1: Find It */}
            <span
              className={`phase-label text-xs font-mono uppercase tracking-widest text-slate-500 block mb-4 ${isVisible ? 'visible' : ''}`}
            >
              Find It
            </span>

            {findItSteps.map((step, index) => (
              <div key={step.number}>
                <div
                  className={`step-card group ${isVisible ? 'visible' : ''}`}
                  style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                >
                  <div className="bg-[#1E3A5F]/50 border border-slate-700 group-hover:border-[#00D4FF]/50 rounded-xl overflow-hidden transition-all duration-300">
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-[#00D4FF] rounded-lg flex items-center justify-center text-[#0A1628] font-mono font-bold text-xs">
                          {step.number}
                        </div>
                        <h3 className="text-lg font-bold text-white">{step.title}</h3>
                      </div>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Arrow connector */}
                <div className="flex justify-center py-3">
                  <svg className="w-5 h-5 text-[#00D4FF]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </div>
            ))}

            {/* Phase divider */}
            <div className="flex items-center gap-4 py-4">
              <div className="flex-1 h-px bg-[#00D4FF]/20" />
              <span className="text-xs font-mono text-[#00D4FF]/50">•</span>
              <div className="flex-1 h-px bg-[#00D4FF]/20" />
            </div>

            {/* Phase 2: Fix It */}
            <span
              className={`phase-label text-xs font-mono uppercase tracking-widest text-slate-500 block mb-4 ${isVisible ? 'visible' : ''}`}
              style={{ animationDelay: '0.3s' }}
            >
              Fix It
            </span>

            {fixItSteps.map((step, index) => (
              <div key={step.number}>
                <div
                  className={`step-card group ${isVisible ? 'visible' : ''}`}
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                >
                  <div className="bg-[#1E3A5F]/50 border border-slate-700 group-hover:border-[#00D4FF]/50 rounded-xl overflow-hidden transition-all duration-300">
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-[#00D4FF] rounded-lg flex items-center justify-center text-[#0A1628] font-mono font-bold text-xs">
                          {step.number}
                        </div>
                        <h3 className="text-lg font-bold text-white">{step.title}</h3>
                      </div>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Arrow connector - except for last item */}
                {index < fixItSteps.length - 1 && (
                  <div className="flex justify-center py-3">
                    <svg className="w-5 h-5 text-[#00D4FF]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Value Metrics - Highlighted */}
          <div className="mt-16 bg-gradient-to-r from-[#00D4FF]/10 via-[#00D4FF]/5 to-[#00D4FF]/10 border border-[#00D4FF]/20 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-white mb-2">Pricing tied to value, not hours.</h3>
                <p className="text-slate-400 max-w-md">
                  We calculate what the fix is worth to you. No long-term contracts. No vendor lock-in.
                </p>
              </div>

              {/* Metric chips */}
              <div className="flex flex-wrap justify-center gap-3">
                <span className="px-4 py-2 bg-[#0A1628] border border-[#00D4FF]/30 rounded-full text-sm font-mono text-[#00D4FF]">
                  Time saved
                </span>
                <span className="px-4 py-2 bg-[#0A1628] border border-[#00D4FF]/30 rounded-full text-sm font-mono text-[#00D4FF]">
                  Revenue recovered
                </span>
                <span className="px-4 py-2 bg-[#0A1628] border border-[#00D4FF]/30 rounded-full text-sm font-mono text-[#00D4FF]">
                  Errors eliminated
                </span>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenCalculator}
              className="inline-flex items-center gap-2 bg-[#00D4FF] text-[#0A1628] px-8 py-4 font-semibold hover:bg-[#22D3EE] transition-all text-sm uppercase tracking-wider rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Calculate Your Value
            </button>
            <a
              href="mailto:agents@sftwrks.com?subject=Discovery%20Call%20Request"
              className="inline-flex items-center gap-2 border border-slate-600 text-slate-300 px-8 py-4 font-semibold hover:border-[#00D4FF] hover:text-[#00D4FF] transition-all text-sm uppercase tracking-wider rounded-lg"
            >
              Book a Call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
