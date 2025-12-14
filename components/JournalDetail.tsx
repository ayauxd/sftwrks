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
    <div className="min-h-screen bg-[#F5F5F4] dark:bg-[#0c0a09] animate-fade-in-up pt-24 pb-24 font-sans text-stone-900 dark:text-stone-100">
       <div className="max-w-3xl mx-auto px-6">
          
          <button 
            onClick={onBack}
            className="group flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-stone-500 dark:text-stone-400 hover:text-orange-600 dark:hover:text-orange-500 transition-colors mb-12"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Return to Index
          </button>

          <div className="border-b border-stone-300 dark:border-stone-700 pb-8 mb-8">
             <div className="flex items-center gap-3 mb-4">
                 <span className="px-2 py-1 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-[10px] font-mono uppercase tracking-widest text-stone-500 dark:text-stone-400">
                    Briefing
                 </span>
                 <span className="text-xs font-mono text-stone-400 dark:text-stone-500 uppercase tracking-widest">{article.date}</span>
             </div>
             <h1 className="text-3xl md:text-5xl font-bold font-['Courier_Prime'] text-stone-900 dark:text-stone-100 leading-tight">
               {article.title}
             </h1>
          </div>

          <div className="w-full aspect-video bg-stone-200 dark:bg-stone-800 mb-12 overflow-hidden border border-stone-300 dark:border-stone-700">
             <img 
               src={article.image} 
               alt={article.title} 
               className="w-full h-full object-cover grayscale contrast-125 dark:opacity-80"
             />
          </div>

          <div 
            className="prose prose-stone dark:prose-invert prose-lg max-w-none font-sans font-light leading-relaxed text-stone-700 dark:text-stone-300 [&>p]:mb-6"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <div className="mt-16 pt-12 border-t border-stone-300 dark:border-stone-700 flex justify-between items-center">
             <span className="text-sm font-mono text-stone-400 uppercase tracking-widest">End of File</span>
             <span className="text-lg font-bold font-['Courier_Prime'] text-stone-900 dark:text-stone-100">Softworks</span>
          </div>
       </div>
    </div>
  );
};

export default JournalDetail;