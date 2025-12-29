/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface TeamProps {
  isDark?: boolean;
}

const EXPERTISE_AREAS = [
  { label: 'AI Strategy & Integration', icon: '◈' },
  { label: 'Process Automation', icon: '◇' },
  { label: 'Media & Communications', icon: '◆' },
  { label: 'Technical Architecture', icon: '◈' },
  { label: 'Research & Analysis', icon: '◇' }
];

const Team: React.FC<TeamProps> = ({ isDark = true }) => {
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
              src={isDark ? "/assets/team/team-dark.jpg" : "/assets/team/team-light.jpg"}
              alt="Softworks team collaborating around a display"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Collective Write-up */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Left: Our Approach */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              A collective, not a factory
            </h3>
            <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>
                We're five specialists who've spent careers making complex ideas work in the real world—across banking, maritime logistics, healthcare, media production, and enterprise tech. When you work with us, you work directly with senior people who've actually built things.
              </p>
              <p>
                Our backgrounds span three continents: West Africa, Europe, and North America. We've led communications at multinational corporations, designed AI systems for startups, produced content for global brands, and mapped operations for high-growth companies.
              </p>
            </div>
          </div>

          {/* Right: Human-in-the-Loop Philosophy */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              AI-assisted, human-verified
            </h3>
            <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>
                Yes, we use specialized AI agents throughout our work. They help us research faster, prototype solutions, analyze data, and automate repetitive tasks. That's how a small team delivers enterprise-quality results.
              </p>
              <p>
                But here's our code of conduct: <span className="text-slate-900 dark:text-white font-medium">human review happens at every critical touchpoint</span>. Before any deliverable reaches you, a real person—someone accountable for the outcome—has verified the work. AI extends our capabilities; it doesn't replace our judgment.
              </p>
            </div>
          </div>
        </div>

        {/* Expertise Areas */}
        <div className="bg-white dark:bg-[#1E3A5F] border border-slate-200 dark:border-slate-700 p-8 rounded-lg">
          <h4 className="text-sm font-mono text-[#00D4FF] uppercase tracking-widest mb-6 text-center">
            Combined Expertise
          </h4>
          <div className="flex flex-wrap justify-center gap-4">
            {EXPERTISE_AREAS.map((area) => (
              <div
                key={area.label}
                className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-[#0A1628] border border-slate-200 dark:border-slate-600 rounded-full"
              >
                <span className="text-[#00D4FF] text-sm">{area.icon}</span>
                <span className="text-sm text-slate-700 dark:text-slate-300">{area.label}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-8 pt-8 border-t border-slate-200 dark:border-slate-600">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900 dark:text-white">60+</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1">Combined Years</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900 dark:text-white">3</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1">Continents</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900 dark:text-white">∞</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1">Human Touchpoints</div>
            </div>
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
