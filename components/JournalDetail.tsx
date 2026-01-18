/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { JournalArticle } from '../types';
import { JOURNAL_ARTICLES } from '../constants';

interface JournalDetailProps {
  article: JournalArticle;
  onBack: () => void;
  onNavigate?: (article: JournalArticle) => void;
}

// Parse "MMM YYYY" date format to sortable value (e.g., "JAN 2026" -> "2026-01")
const parseArticleDate = (dateStr: string): string => {
  const months: Record<string, string> = {
    'JAN': '01', 'FEB': '02', 'MAR': '03', 'APR': '04',
    'MAY': '05', 'JUN': '06', 'JUL': '07', 'AUG': '08',
    'SEP': '09', 'OCT': '10', 'NOV': '11', 'DEC': '12'
  };
  const [month, year] = dateStr.split(' ');
  return `${year}-${months[month] || '01'}`;
};

const JournalDetail: React.FC<JournalDetailProps> = ({ article, onBack, onNavigate }) => {
  // Sort articles by date (newest first) for navigation
  const sortedArticles = [...JOURNAL_ARTICLES].sort((a, b) =>
    parseArticleDate(b.date).localeCompare(parseArticleDate(a.date))
  );
  const currentIndex = sortedArticles.findIndex(a => a.id === article.id);
  const prevArticle = currentIndex > 0 ? sortedArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < sortedArticles.length - 1 ? sortedArticles[currentIndex + 1] : null;

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

          {/* Navigation to other articles */}
          {onNavigate && (prevArticle || nextArticle) && (
            <div className="mt-16 pt-12 border-t border-slate-300 dark:border-slate-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Previous */}
                {prevArticle ? (
                  <button
                    onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); onNavigate(prevArticle); }}
                    className="group text-left p-4 bg-slate-100 dark:bg-[#1E3A5F]/50 border border-slate-200 dark:border-slate-700 hover:border-[#00D4FF] transition-colors"
                  >
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1 mb-2">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Previous
                    </span>
                    <h4 className="font-bold font-['Courier_Prime'] text-slate-900 dark:text-white group-hover:text-[#00D4FF] transition-colors line-clamp-1 text-sm">
                      {prevArticle.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{prevArticle.date}</p>
                  </button>
                ) : <div />}

                {/* Next */}
                {nextArticle ? (
                  <button
                    onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); onNavigate(nextArticle); }}
                    className="group text-right p-4 bg-slate-100 dark:bg-[#1E3A5F]/50 border border-slate-200 dark:border-slate-700 hover:border-[#00D4FF] transition-colors"
                  >
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest flex items-center justify-end gap-1 mb-2">
                      Next
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                    <h4 className="font-bold font-['Courier_Prime'] text-slate-900 dark:text-white group-hover:text-[#00D4FF] transition-colors line-clamp-1 text-sm">
                      {nextArticle.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{nextArticle.date}</p>
                  </button>
                ) : <div />}
              </div>
            </div>
          )}

          <div className="mt-8 pt-8 border-t border-slate-300 dark:border-slate-700 flex justify-between items-center">
             <span className="text-sm font-mono text-slate-400 uppercase tracking-widest">End of File</span>
             <span className="text-lg font-bold font-mono text-[#00D4FF]">SOFTWORKS</span>
          </div>
       </div>
    </div>
  );
};

export default JournalDetail;
