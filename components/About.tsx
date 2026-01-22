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
              The Real Problem
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight mb-8">
              Most AI projects
              <br />
              <span className="text-slate-500 dark:text-slate-400">automate the wrong thing.</span>
            </h2>
            <p className="text-lg text-slate-700 dark:text-slate-400 font-light leading-relaxed mb-6">
              You speed up a broken process. Now it breaks faster. You add AI to a workflow that shouldn't exist. Now you're paying to maintain both.
            </p>
            <p className="text-lg text-slate-700 dark:text-slate-400 font-light leading-relaxed">
              The constraint isn't the technology. It's knowing where your problem actually lives before you start building.
            </p>
          </div>

          {/* Visual: Challenge Section Illustration */}
          <div className="relative">
            <div className="aspect-square rounded-lg overflow-hidden shadow-2xl border border-slate-700/50">
              {/* Noir-themed Illustration */}
              <img
                src="/assets/sections/challenge-noir.webp?v=2"
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
              How We Work
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
              <span className="text-[#00D4FF]">Diagnose.</span> Build.
              <br />
              <span className="text-[#00D4FF]">Hand Over.</span>
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-slate-300 font-light">
              We find the problem, build one system to fix it, then hand you the keys. Works without us after that.
            </p>
          </div>

          {/* Three Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Find the Constraint */}
            <div className="bg-[#1E3A5F] border border-slate-700 hover:border-[#00D4FF] transition-colors group overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/assets/sections/strategy-card.webp?v=2"
                  alt="Find the Constraint - diagnostic session"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">Find the Constraint</h3>
                <p className="text-slate-300 font-light leading-relaxed text-sm">
                  A working session to map your operations and find where the actual bottleneck lives. Not where you think it is.
                </p>
              </div>
            </div>

            {/* Build the System */}
            <div className="bg-[#1E3A5F] border border-slate-700 hover:border-[#00D4FF] transition-colors group overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/assets/sections/governance-card.webp?v=2"
                  alt="Build the System - focused implementation"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">Build the System</h3>
                <p className="text-slate-300 font-light leading-relaxed text-sm">
                  One system that solves one problem completely. We scope it, build it, and make sure it works before you pay.
                </p>
              </div>
            </div>

            {/* Hand It Over */}
            <div className="bg-[#1E3A5F] border border-slate-700 hover:border-[#00D4FF] transition-colors group overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/assets/sections/integration-card.webp?v=2"
                  alt="Hand It Over - complete ownership transfer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">Hand It Over</h3>
                <p className="text-slate-300 font-light leading-relaxed text-sm">
                  Documentation, training, and 30-day support included. After that, it runs without us.
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
