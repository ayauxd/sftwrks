/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { CASE_STUDIES } from '../constants';
import { CaseStudy } from '../types';

interface CaseStudiesListProps {
  onStudyClick: (study: CaseStudy) => void;
  onBack: () => void;
}

const CaseStudiesList: React.FC<CaseStudiesListProps> = ({ onStudyClick, onBack }) => {
  return (
    <div className="min-h-screen bg-[#F1F5F9] dark:bg-[#0A1628] animate-fade-in-up pt-24 pb-24">
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        <button
          onClick={onBack}
          className="group flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-[#00D4FF] transition-colors mb-12"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Home
        </button>

        {/* Header with intro */}
        <div className="border-b border-slate-300 dark:border-slate-700 pb-12 mb-16">
          <span className="font-mono text-xs text-[#00D4FF] uppercase tracking-widest">Our Work</span>
          <h1 className="text-4xl md:text-5xl text-slate-900 dark:text-white mt-4 mb-8 font-bold font-['Courier_Prime']">
            Case Studies
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            Real results from real businesses. Each case study documents our approach, the challenges faced,
            and the measurable outcomes achieved. We believe in transparency—these are the stories of
            how AI implementation actually works in practice.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {CASE_STUDIES.map((study) => (
            <div
              key={study.id}
              className="group cursor-pointer flex flex-col text-left"
              onClick={() => onStudyClick(study)}
            >
              <div className="w-full aspect-[4/3] overflow-hidden mb-6 bg-slate-200 dark:bg-[#1E3A5F] border border-slate-300 dark:border-slate-700 relative">
                <img
                  src={study.imageUrl}
                  alt={study.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 dark:opacity-80"
                />
                <div className="absolute inset-0 bg-[#0F172A]/10 group-hover:bg-transparent transition-colors"></div>
                <div className="absolute top-3 left-3 bg-white dark:bg-[#0A1628] px-2 py-1 text-[10px] font-mono border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-300 uppercase">
                  {study.sector}
                </div>
              </div>
              <div className="flex flex-col flex-1 text-left">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-px w-4 bg-[#00D4FF]"></div>
                  <span className="text-xs font-mono font-medium uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    {study.client}
                  </span>
                </div>
                <h3 className="text-xl font-bold font-['Courier_Prime'] text-slate-900 dark:text-white mb-3 leading-tight group-hover:text-[#00D4FF] transition-colors">
                  {study.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 font-sans leading-relaxed text-sm line-clamp-3 mb-4">
                  {study.summary}
                </p>
                <div className="mt-auto pl-3 border-l-2 border-slate-300 dark:border-slate-700 group-hover:border-[#00D4FF] transition-colors">
                  <p className="text-xs font-bold text-slate-900 dark:text-white font-['Courier_Prime']">
                    Outcome: {study.outcome}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-24 pt-12 border-t border-slate-300 dark:border-slate-700 text-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm font-mono mb-4">
            Ready to become our next success story?
          </p>
          <a
            href="mailto:agents@sftwrks.com?subject=Case%20Study%20Inquiry"
            className="inline-block bg-[#00D4FF] text-[#0A1628] px-8 py-3 font-semibold hover:bg-[#22D3EE] transition-colors text-sm uppercase tracking-widest font-mono"
          >
            Start a Conversation
          </a>
        </div>
      </div>
    </div>
  );
};

export default CaseStudiesList;
