/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { JOURNAL_ARTICLES } from '../constants';
import { JournalArticle } from '../types';

interface JournalProps {
  onArticleClick: (article: JournalArticle) => void;
  onViewAllClick?: () => void;
}

const Journal: React.FC<JournalProps> = ({ onArticleClick, onViewAllClick }) => {
  // Show only the first 3 articles as preview
  const previewArticles = JOURNAL_ARTICLES.slice(0, 3);

  return (
    <section id="journal" className="bg-[#F1F5F9] dark:bg-[#0F172A] py-24 px-6 md:px-12 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-16 border-b border-slate-300 dark:border-slate-700 pb-6">
            <div>
                <span className="font-mono text-xs text-[#00D4FF] uppercase tracking-widest">Field Notes</span>
                <h2 className="text-3xl md:text-4xl text-slate-900 dark:text-white mt-4 font-bold font-['Courier_Prime']">Insights</h2>
            </div>
             <div className="hidden md:block">
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Monthly AI Industry Analysis</span>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {previewArticles.map((article) => (
                <div key={article.id} className="group cursor-pointer flex flex-col text-left" onClick={() => onArticleClick(article)}>
                    <div className="w-full aspect-[4/3] overflow-hidden mb-6 bg-slate-200 dark:bg-[#1E3A5F] border border-slate-300 dark:border-slate-700 relative">
                        <img
                            src={`${article.image}?v=3`}
                            alt={article.title}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 dark:opacity-80"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-[#0F172A]/10 group-hover:bg-transparent transition-colors"></div>
                    </div>
                    <div className="flex flex-col flex-1 text-left">
                        <div className="flex items-center gap-2 mb-3">
                           <div className="h-px w-4 bg-[#00D4FF]"></div>
                           <span className="text-xs font-mono font-medium uppercase tracking-widest text-slate-500 dark:text-slate-400">{article.date}</span>
                        </div>
                        <h3 className="text-2xl font-bold font-['Courier_Prime'] text-slate-900 dark:text-white mb-4 leading-tight group-hover:text-[#00D4FF] transition-colors">{article.title}</h3>
                        <p className="text-slate-600 dark:text-slate-400 font-sans leading-relaxed text-sm line-clamp-3">{article.excerpt}</p>
                    </div>
                </div>
            ))}
        </div>

        {/* CTA for more insights */}
        <div className="mt-16 pt-12 border-t border-slate-300 dark:border-slate-700 text-center">
          <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto">
            We publish monthly analysis of AI industry developments, backed by authoritative sources and filtered through our hands-on implementation experience.
          </p>
          <button
            onClick={onViewAllClick}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-[#0A1628] dark:bg-[#1E3A5F] text-white font-mono text-sm uppercase tracking-widest hover:bg-[#00D4FF] hover:text-[#0A1628] transition-all duration-300 border border-transparent hover:border-[#00D4FF]"
          >
            View All Insights
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Journal;
