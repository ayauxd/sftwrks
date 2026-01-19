/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

interface FeaturesProps {
  onOpenCalculator?: () => void;
}

const Features: React.FC<FeaturesProps> = ({ onOpenCalculator }) => {
  return (
    <section id="process" className="bg-[#0F172A] dark:bg-[#0A1628] py-24 px-6 md:px-12">
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
          {/* Connecting line - desktop */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#00D4FF]/30 to-transparent" />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4">
            {/* Step 1: Map */}
            <div className="relative group">
              <div className="bg-[#1E3A5F]/50 border border-slate-700 group-hover:border-[#00D4FF]/50 rounded-xl p-6 transition-all duration-300 h-full">
                <div className="w-10 h-10 bg-[#00D4FF] rounded-lg flex items-center justify-center text-[#0A1628] font-mono font-bold text-sm mb-4">
                  01
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Map</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Walk your operations. Find the real bottleneck.
                </p>
              </div>
              {/* Arrow - mobile */}
              <div className="md:hidden flex justify-center py-3">
                <svg className="w-5 h-5 text-[#00D4FF]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>

            {/* Step 2: Value */}
            <div className="relative group">
              <div className="bg-[#1E3A5F]/50 border border-slate-700 group-hover:border-[#00D4FF]/50 rounded-xl p-6 transition-all duration-300 h-full">
                <div className="w-10 h-10 bg-[#00D4FF] rounded-lg flex items-center justify-center text-[#0A1628] font-mono font-bold text-sm mb-4">
                  02
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Value</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Calculate what fixing it is worth to you.
                </p>
              </div>
              <div className="md:hidden flex justify-center py-3">
                <svg className="w-5 h-5 text-[#00D4FF]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>

            {/* Step 3: Scope */}
            <div className="relative group">
              <div className="bg-[#1E3A5F]/50 border border-slate-700 group-hover:border-[#00D4FF]/50 rounded-xl p-6 transition-all duration-300 h-full">
                <div className="w-10 h-10 bg-[#00D4FF] rounded-lg flex items-center justify-center text-[#0A1628] font-mono font-bold text-sm mb-4">
                  03
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Scope</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Fixed price. Clear deliverable. No surprises.
                </p>
              </div>
              <div className="md:hidden flex justify-center py-3">
                <svg className="w-5 h-5 text-[#00D4FF]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>

            {/* Step 4: Build */}
            <div className="relative group">
              <div className="bg-[#1E3A5F]/50 border border-slate-700 group-hover:border-[#00D4FF]/50 rounded-xl p-6 transition-all duration-300 h-full">
                <div className="w-10 h-10 bg-[#00D4FF] rounded-lg flex items-center justify-center text-[#0A1628] font-mono font-bold text-sm mb-4">
                  04
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Build</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  One system at a time. Weekly progress.
                </p>
              </div>
              <div className="md:hidden flex justify-center py-3">
                <svg className="w-5 h-5 text-[#00D4FF]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>

            {/* Step 5: Hand Over */}
            <div className="relative group">
              <div className="bg-[#1E3A5F]/50 border border-slate-700 group-hover:border-[#00D4FF]/50 rounded-xl p-6 transition-all duration-300 h-full">
                <div className="w-10 h-10 bg-[#00D4FF] rounded-lg flex items-center justify-center text-[#0A1628] font-mono font-bold text-sm mb-4">
                  05
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Hand Over</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  You own it. We train, document, then exit.
                </p>
              </div>
            </div>
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
