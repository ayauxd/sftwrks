/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { CaseStudy } from '../types';

interface CaseStudyDetailProps {
  study: CaseStudy;
  onBack: () => void;
}

const CaseStudyDetail: React.FC<CaseStudyDetailProps> = ({ study, onBack }) => {
  return (
    <div className="min-h-screen bg-[#F1F5F9] dark:bg-[#0A1628] animate-fade-in-up pt-24 pb-24 font-sans text-slate-900 dark:text-white">
       <div className="max-w-4xl mx-auto px-6">

          <button
            onClick={onBack}
            className="group flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-[#00D4FF] transition-colors mb-12"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Return to Index
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-start">
             <div>
                 <div className="flex flex-col gap-2 mb-6">
                    <span className="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest">Client</span>
                    <span className="text-lg font-bold font-['Courier_Prime']">{study.client}</span>
                 </div>
                 <div className="flex flex-col gap-2 mb-6">
                    <span className="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest">Sector</span>
                    <span className="text-lg font-bold font-['Courier_Prime']">{study.sector}</span>
                 </div>
                 <div className="flex flex-col gap-2">
                    <span className="text-xs font-mono text-[#00D4FF] uppercase tracking-widest font-bold">Outcome</span>
                    <span className="text-xl font-bold font-['Courier_Prime'] leading-tight">{study.outcome}</span>
                 </div>
             </div>

             <div>
                <h1 className="text-4xl md:text-5xl font-bold font-['Courier_Prime'] text-slate-900 dark:text-white leading-tight mb-6">
                   {study.title}
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">{study.summary}</p>
             </div>
          </div>

          <div className="w-full aspect-[21/9] bg-slate-200 dark:bg-[#1E3A5F] mb-16 overflow-hidden border border-slate-300 dark:border-slate-700">
             <img
               src={study.imageUrl}
               alt={study.title}
               className="w-full h-full object-cover dark:opacity-80"
             />
          </div>

          <div className="max-w-2xl mx-auto">
             <div
                className="prose prose-slate dark:prose-invert prose-lg max-w-none font-sans font-light leading-relaxed text-slate-700 dark:text-slate-300 [&>h3]:font-['Courier_Prime'] [&>h3]:text-xl [&>h3]:font-bold [&>h3]:mt-12 [&>h3]:mb-4 [&>h3]:uppercase [&>h3]:tracking-wider [&>p]:mb-6 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-2 [&>ul]:mb-8"
                dangerouslySetInnerHTML={{ __html: study.content }}
              />
          </div>

          <div className="mt-16 pt-12 border-t border-slate-300 dark:border-slate-700 flex justify-between items-center">
             <span className="text-sm font-mono text-slate-400 uppercase tracking-widest">Case File Closed</span>
             <span className="text-lg font-bold font-mono text-[#00D4FF]">SOFTWORKS</span>
          </div>
       </div>
    </div>
  );
};

export default CaseStudyDetail;
