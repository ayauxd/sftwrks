/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

const Filter: React.FC = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-[#0A1628]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-mono uppercase tracking-[0.2em] text-[#00D4FF] mb-6">
            Working Together
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
            Finding the right fit
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Our approach is hands-on and personalized. Here's how to tell if we'd work well together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Great Fit */}
          <div className="relative group">
            {/* Animated border glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-br from-[#00D4FF]/30 to-[#00D4FF]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm" />
            <div className="absolute -inset-0.5 bg-gradient-to-br from-[#00D4FF]/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300" />

            <div className="relative p-8 bg-[#1E3A5F]/60 border border-[#00D4FF]/30 rounded-2xl h-full backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-[#00D4FF] flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5 text-[#0A1628]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">
                  Great fit when...
                </h3>
              </div>

              <ul className="space-y-4">
                <li className="flex items-start gap-4 p-3 -mx-3 rounded-xl hover:bg-[#00D4FF]/5 transition-all duration-200 cursor-default group/item">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#00D4FF]/20 to-[#00D4FF]/5 flex items-center justify-center flex-shrink-0 group-hover/item:from-[#00D4FF]/30 group-hover/item:to-[#00D4FF]/10 transition-all">
                    <svg className="w-4.5 h-4.5 text-[#00D4FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      You have a specific challenge
                    </p>
                    <p className="text-sm text-slate-400 mt-0.5">
                      A bottleneck you can point to, even if the root cause is unclear
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4 p-3 -mx-3 rounded-xl hover:bg-[#00D4FF]/5 transition-all duration-200 cursor-default group/item">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#00D4FF]/20 to-[#00D4FF]/5 flex items-center justify-center flex-shrink-0 group-hover/item:from-[#00D4FF]/30 group-hover/item:to-[#00D4FF]/10 transition-all">
                    <svg className="w-4.5 h-4.5 text-[#00D4FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      You want to own the solution
                    </p>
                    <p className="text-sm text-slate-400 mt-0.5">
                      We build systems you can run and improve yourself
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4 p-3 -mx-3 rounded-xl hover:bg-[#00D4FF]/5 transition-all duration-200 cursor-default group/item">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#00D4FF]/20 to-[#00D4FF]/5 flex items-center justify-center flex-shrink-0 group-hover/item:from-[#00D4FF]/30 group-hover/item:to-[#00D4FF]/10 transition-all">
                    <svg className="w-4.5 h-4.5 text-[#00D4FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      Results over presentations
                    </p>
                    <p className="text-sm text-slate-400 mt-0.5">
                      Working systems that solve real problems
                    </p>
                  </div>
                </li>
              </ul>

              {/* Support note */}
              <div className="mt-6 pt-5 border-t border-[#00D4FF]/20">
                <p className="text-sm text-slate-400">
                  <span className="text-[#00D4FF]">Extended support?</span> Available case-by-case after we assess the project scope.
                </p>
              </div>
            </div>
          </div>

          {/* Different Path */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-br from-slate-600/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300" />

            <div className="relative p-8 bg-[#0F172A] border border-slate-800 group-hover:border-slate-700 rounded-2xl h-full transition-all duration-300">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-300">
                  May not fit if...
                </h3>
              </div>

              <ul className="space-y-4">
                <li className="flex items-start gap-4 p-3 -mx-3 rounded-xl hover:bg-slate-800/40 transition-all duration-200 cursor-default group/item">
                  <div className="w-9 h-9 rounded-lg bg-slate-800/60 flex items-center justify-center flex-shrink-0 group-hover/item:bg-slate-800 transition-all">
                    <svg className="w-4.5 h-4.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-slate-300 font-medium">
                      You need full-time managed services
                    </p>
                    <p className="text-sm text-slate-500 mt-0.5">
                      We design for independence, but we know great teams who do ongoing ops
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4 p-3 -mx-3 rounded-xl hover:bg-slate-800/40 transition-all duration-200 cursor-default group/item">
                  <div className="w-9 h-9 rounded-lg bg-slate-800/60 flex items-center justify-center flex-shrink-0 group-hover/item:bg-slate-800 transition-all">
                    <svg className="w-4.5 h-4.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-slate-300 font-medium">
                      You want to build first, diagnose later
                    </p>
                    <p className="text-sm text-slate-500 mt-0.5">
                      We find the constraint before building. For speed over strategy, we can point you right
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4 p-3 -mx-3 rounded-xl hover:bg-slate-800/40 transition-all duration-200 cursor-default group/item">
                  <div className="w-9 h-9 rounded-lg bg-slate-800/60 flex items-center justify-center flex-shrink-0 group-hover/item:bg-slate-800 transition-all">
                    <svg className="w-4.5 h-4.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-slate-300 font-medium">
                      You're exploring AI broadly
                    </p>
                    <p className="text-sm text-slate-500 mt-0.5">
                      We solve specific problems. For exploration, we'll recommend consultants who do that well
                    </p>
                  </div>
                </li>
              </ul>

              {/* Referral note */}
              <div className="mt-6 pt-5 border-t border-slate-800">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#00D4FF] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-sm text-slate-400">
                    <span className="text-slate-300 font-medium">Not the right fit?</span> We'll connect you with trusted specialists from our network.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-slate-500 mb-4 text-sm">Not sure where you fall?</p>
          <a
            href="mailto:agents@sftwrks.com?subject=Quick%20Question"
            className="inline-flex items-center gap-2 bg-[#1E3A5F]/50 hover:bg-[#1E3A5F] border border-slate-700 hover:border-[#00D4FF]/50 text-slate-300 hover:text-white px-6 py-3 rounded-lg transition-all duration-300 text-sm group"
          >
            <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Let's chat, no commitment
          </a>
        </div>
      </div>
    </section>
  );
};

export default Filter;
