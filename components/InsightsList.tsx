/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { JOURNAL_ARTICLES } from '../constants';
import { JournalArticle } from '../types';

interface InsightsListProps {
  onArticleClick: (article: JournalArticle) => void;
  onBack: () => void;
}

const InsightsList: React.FC<InsightsListProps> = ({ onArticleClick, onBack }) => {
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
          <span className="font-mono text-xs text-[#00D4FF] uppercase tracking-widest">Field Notes</span>
          <h1 className="text-4xl md:text-5xl text-slate-900 dark:text-white mt-4 mb-8 font-bold font-['Courier_Prime']">
            Monthly Insights
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            Every month, we provide a comprehensive wrap-up of the AI industry's most significant developments.
            Our analysis is backed by authoritative sources—research papers, earnings calls, product launches,
            and regulatory updates—filtered through our perspective as practitioners who implement these
            technologies daily for real businesses.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {JOURNAL_ARTICLES.map((article) => (
            <div
              key={article.id}
              className="group cursor-pointer flex flex-col text-left"
              onClick={() => onArticleClick(article)}
            >
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
                  <span className="text-xs font-mono font-medium uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    {article.date}
                  </span>
                </div>
                <h3 className="text-xl font-bold font-['Courier_Prime'] text-slate-900 dark:text-white mb-3 leading-tight group-hover:text-[#00D4FF] transition-colors">
                  {article.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 font-sans leading-relaxed text-sm line-clamp-2 mb-3">
                  {article.excerpt}
                </p>
                <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                  By {article.author}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-24 pt-12 border-t border-slate-300 dark:border-slate-700 text-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm font-mono">
            Subscribe to receive monthly insights directly in your inbox
          </p>
          <a
            href="mailto:agents@sftwrks.com?subject=Subscribe%20to%20Monthly%20Insights"
            className="inline-block mt-6 text-[#00D4FF] hover:underline font-mono text-sm"
          >
            agents@sftwrks.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default InsightsList;
