/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { JOURNAL_ARTICLES } from '../constants';
import { JournalArticle } from '../types';

interface JournalProps {
  onArticleClick: (article: JournalArticle) => void;
}

const Journal: React.FC<JournalProps> = ({ onArticleClick }) => {
  return (
    <section id="journal" className="bg-[#F1F5F9] dark:bg-[#0F172A] py-24 px-6 md:px-12 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-16 border-b border-slate-300 dark:border-slate-700 pb-6">
            <div>
                <span className="font-mono text-xs text-[#00D4FF] uppercase tracking-widest">Field Notes</span>
                <h2 className="text-3xl md:text-4xl text-slate-900 dark:text-white mt-4 font-bold font-['Courier_Prime']">Insights</h2>
            </div>
             <div className="hidden md:block">
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Technical Briefs & Observation</span>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {JOURNAL_ARTICLES.map((article) => (
                <div key={article.id} className="group cursor-pointer flex flex-col text-left" onClick={() => onArticleClick(article)}>
                    <div className="w-full aspect-[4/3] overflow-hidden mb-6 bg-slate-200 dark:bg-[#1E3A5F] border border-slate-300 dark:border-slate-700 relative">
                        <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 dark:opacity-80"
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
      </div>
    </section>
  );
};

export default Journal;
