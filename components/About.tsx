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
            <p className="text-lg text-slate-700 dark:text-slate-400 font-light leading-relaxed mb-6">
              AI promises to save time and money, but 70% of projects don't pay off. The problem isn't the technology—it's how you set it up.
            </p>
            <p className="text-lg text-slate-700 dark:text-slate-400 font-light leading-relaxed">
              Without a clear plan and the right setup, AI becomes a money pit instead of a game-changer.
            </p>
          </div>

          {/* Visual: Challenge Section Illustration */}
          <div className="relative">
            <div className="aspect-square rounded-lg overflow-hidden shadow-2xl border border-slate-700/50">
              {/* Noir-themed Illustration */}
              <img
                src="/assets/sections/challenge-noir.webp"
                alt="AI transformation challenge - abstract visualization of disconnected systems"
                className="w-full h-full object-cover"
              />

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
            <p className="max-w-2xl mx-auto text-lg text-slate-300 font-light">
              We give you the plan, the guardrails, and the step-by-step path to make AI actually work for your business.
            </p>
          </div>

          {/* Three Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Strategy */}
            <div className="bg-[#1E3A5F] border border-slate-700 hover:border-[#00D4FF] transition-colors group overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/assets/sections/strategy-card.webp"
                  alt="AI Strategy - illuminating the path forward"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">Strategy</h3>
                <p className="text-slate-300 font-light leading-relaxed text-sm">
                  Figure out where AI can actually help your business—then build a plan to get there.
                </p>
              </div>
            </div>

            {/* Governance */}
            <div className="bg-[#1E3A5F] border border-slate-700 hover:border-[#00D4FF] transition-colors group overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/assets/sections/governance-card.webp"
                  alt="AI Governance - protected framework"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">Governance</h3>
                <p className="text-slate-300 font-light leading-relaxed text-sm">
                  Set up the rules and safeguards so AI works the way you want—safely, responsibly, and within regulations.
                </p>
              </div>
            </div>

            {/* Integration */}
            <div className="bg-[#1E3A5F] border border-slate-700 hover:border-[#00D4FF] transition-colors group overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/assets/sections/integration-card.webp"
                  alt="AI Integration - seamless connection"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">Integration</h3>
                <p className="text-slate-300 font-light leading-relaxed text-sm">
                  Connect AI to how your team already works—so it helps instead of getting in the way.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
