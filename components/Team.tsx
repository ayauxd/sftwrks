/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

const Team: React.FC = () => {
  return (
    <section id="team" className="py-24 px-6 lg:px-12 bg-[#F1F5F9] dark:bg-[#0F172A] border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="font-mono text-xs text-[#00D4FF] uppercase tracking-widest">
            The Team
          </span>
          <h2 className="text-3xl md:text-4xl text-slate-900 dark:text-white mt-4 font-bold">
            Human expertise, amplified by AI
          </h2>
        </div>

        {/* Team Photo */}
        <div className="relative mb-12 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
          <div className="aspect-[21/9] bg-gradient-to-br from-slate-100 to-slate-200 dark:from-[#1E3A5F] dark:to-[#0A1628]">
            <img
              src="/assets/team/team-light.jpg"
              alt="Softworks collective reviewing agentic workflow"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Collective Write-up */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
              High-agency professionals
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              We look for one thing first: people who take ownership and deliver. Our growing collective spans three continents—senior specialists who've actually built things.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
              AI-assisted, human-verified
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              We use AI agents to move faster. But every deliverable gets human review before it reaches you. AI extends our capabilities; it doesn't replace our judgment.
            </p>
          </div>
        </div>

        {/* Closing note */}
        <div className="mt-12 text-center">
          <p className="text-slate-500 dark:text-slate-500 text-sm max-w-2xl mx-auto italic">
            "We'd rather build something that works than talk about building something that works."
          </p>
        </div>
      </div>
    </section>
  );
};

export default Team;
