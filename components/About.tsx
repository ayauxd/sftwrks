/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="bg-[#F1F5F9] dark:bg-[#0F172A]">

      {/* Problem Statement */}
      <div className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block text-xs font-mono uppercase tracking-[0.2em] text-[#00D4FF] mb-6">
              The Challenge
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight mb-8">
              AI is transforming industries.
              <br />
              <span className="text-slate-500 dark:text-slate-400">Most organizations aren't ready.</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-light leading-relaxed mb-6">
              AI promises to save time and money, but 70% of projects don't pay off. The problem isn't the technology—it's how you set it up.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-light leading-relaxed">
              Without a clear plan and the right setup, AI becomes a money pit instead of a game-changer.
            </p>
          </div>

          {/* Visual: Softworks Brand Video */}
          <div className="relative">
            <div className="aspect-square rounded-lg overflow-hidden shadow-2xl border border-slate-700/50">
              {/* Video Loop */}
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                poster="/assets/sections/softworks-brand-logo.png"
              >
                <source src="/assets/sections/softworks-logo-loop.mp4" type="video/mp4" />
              </video>

              {/* Subtle vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/40 via-transparent to-[#0A1628]/20 pointer-events-none" />

              {/* Corner accent frame */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#00D4FF]/40" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#00D4FF]/40" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#00D4FF]/40" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#00D4FF]/40" />
            </div>
          </div>
        </div>
      </div>

      {/* Solution Statement */}
      <div className="py-24 px-6 md:px-12 bg-[#0F172A] dark:bg-[#0A1628]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-mono uppercase tracking-[0.2em] text-[#00D4FF] mb-6">
              Our Approach
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
              We help you go from
              <br />
              <span className="text-[#00D4FF]">"now what?" to "this works."</span>
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-slate-400 font-light">
              We give you the plan, the guardrails, and the step-by-step path to make AI actually work for your business.
            </p>
          </div>

          {/* Three Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Strategy */}
            <div className="p-8 bg-[#1E3A5F] border border-slate-700 hover:border-[#00D4FF] transition-colors group">
              <div className="w-12 h-12 mb-6 border border-[#00D4FF]/50 flex items-center justify-center group-hover:bg-[#00D4FF]/10 transition-colors">
                <svg className="w-6 h-6 text-[#00D4FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Strategy</h3>
              <p className="text-slate-400 font-light leading-relaxed">
                Figure out where AI can actually help your business—then build a plan to get there.
              </p>
            </div>

            {/* Governance */}
            <div className="p-8 bg-[#1E3A5F] border border-slate-700 hover:border-[#00D4FF] transition-colors group">
              <div className="w-12 h-12 mb-6 border border-[#00D4FF]/50 flex items-center justify-center group-hover:bg-[#00D4FF]/10 transition-colors">
                <svg className="w-6 h-6 text-[#00D4FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Governance</h3>
              <p className="text-slate-400 font-light leading-relaxed">
                Set up the rules and safeguards so AI works the way you want—safely, responsibly, and within regulations.
              </p>
            </div>

            {/* Integration */}
            <div className="p-8 bg-[#1E3A5F] border border-slate-700 hover:border-[#00D4FF] transition-colors group">
              <div className="w-12 h-12 mb-6 border border-[#00D4FF]/50 flex items-center justify-center group-hover:bg-[#00D4FF]/10 transition-colors">
                <svg className="w-6 h-6 text-[#00D4FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Integration</h3>
              <p className="text-slate-400 font-light leading-relaxed">
                Connect AI to how your team already works—so it helps instead of getting in the way.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
