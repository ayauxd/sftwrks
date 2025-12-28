/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { JournalArticle } from '../types';

interface JournalDetailProps {
  article: JournalArticle;
  onBack: () => void;
}

const JournalDetail: React.FC<JournalDetailProps> = ({ article, onBack }) => {
  return (
    <div className="min-h-screen bg-[#F1F5F9] dark:bg-[#0A1628] animate-fade-in-up pt-24 pb-24 font-sans text-slate-900 dark:text-white">
       <div className="max-w-3xl mx-auto px-6">

          <button
            onClick={onBack}
            className="group flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-[#00D4FF] transition-colors mb-12"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Return to Index
          </button>

          <div className="border-b border-slate-300 dark:border-slate-700 pb-8 mb-8">
             <div className="flex items-center gap-3 mb-4">
                 <span className="px-2 py-1 bg-white dark:bg-[#1E3A5F] border border-slate-200 dark:border-slate-700 text-[10px] font-mono uppercase tracking-widest text-[#00D4FF]">
                    Briefing
                 </span>
                 <span className="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest">{article.date}</span>
             </div>
             <h1 className="text-3xl md:text-5xl font-bold font-['Courier_Prime'] text-slate-900 dark:text-white leading-tight mb-4">
               {article.title}
             </h1>
             <p className="text-sm text-slate-500 dark:text-slate-400">
               By <span className="font-medium text-slate-700 dark:text-slate-300">{article.author}</span>
             </p>
          </div>

          <div className="w-full aspect-video bg-slate-200 dark:bg-[#1E3A5F] mb-12 overflow-hidden border border-slate-300 dark:border-slate-700">
             <img
               src={article.image}
               alt={article.title}
               className="w-full h-full object-cover dark:opacity-80"
             />
          </div>

          <div
            className="prose prose-slate dark:prose-invert prose-lg max-w-none font-sans font-light leading-relaxed text-slate-700 dark:text-slate-300 [&>p]:mb-6"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <div className="mt-16 pt-12 border-t border-slate-300 dark:border-slate-700 flex justify-between items-center">
             <span className="text-sm font-mono text-slate-400 uppercase tracking-widest">End of File</span>
             <span className="text-lg font-bold font-mono text-[#00D4FF]">SOFTWORKS</span>
          </div>
       </div>
    </div>
  );
};

export default JournalDetail;
