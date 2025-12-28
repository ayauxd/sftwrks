/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

const TEAM_MEMBERS = [
  {
    initials: 'FA',
    name: 'Frederick A.',
    role: 'Strategy & Integration',
    bio: 'Two decades in communications and user experience across banking, maritime, and tech—spanning West Africa, Europe, and North America. Based in the Pacific Northwest, leading AI integration projects.'
  },
  {
    initials: 'PO',
    name: 'Peter O.',
    role: 'Media & Motion',
    bio: 'Cinematographer and motion designer with an MFA in visual storytelling. Produces brand films and explainer content that makes technical concepts feel human.'
  },
  {
    initials: 'AK',
    name: 'Amara K.',
    role: 'Operations & Process',
    bio: 'Former operations lead at a Series B fintech. Specializes in mapping business processes and identifying where automation makes sense—and where it doesn\'t.'
  },
  {
    initials: 'DM',
    name: 'David M.',
    role: 'Technical Architecture',
    bio: 'Backend engineer turned AI systems consultant. Translates business requirements into technical specs that developers can actually execute.'
  },
  {
    initials: 'NR',
    name: 'Nina R.',
    role: 'Research & Analysis',
    bio: 'Economist by training, strategist by practice. Turns ambiguous business problems into clear, testable hypotheses.'
  }
];

const Team: React.FC = () => {
  return (
    <section id="team" className="py-24 px-6 lg:px-12 bg-[#F1F5F9] dark:bg-[#0F172A] border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-[#00D4FF] uppercase tracking-widest">
            The Team
          </span>
          <h2 className="text-3xl md:text-4xl text-slate-900 dark:text-white mt-4 font-bold">
            A small team that gets things done
          </h2>
          <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            We're a distributed collective of specialists who've spent careers making complex ideas work in the real world.
            When you work with us, you work with senior people who've actually built things.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.initials}
              className="bg-white dark:bg-[#1E3A5F] p-6 border border-slate-200 dark:border-slate-700 hover:border-[#00D4FF]/50 transition-colors"
            >
              {/* Avatar placeholder with initials */}
              <div className="w-12 h-12 bg-slate-100 dark:bg-[#0A1628] border border-slate-200 dark:border-slate-600 flex items-center justify-center mb-4">
                <span className="font-mono text-sm text-slate-500 dark:text-slate-400">
                  {member.initials}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {member.name}
              </h3>
              <p className="text-sm font-mono text-[#00D4FF] uppercase tracking-wider mb-3">
                {member.role}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {member.bio}
              </p>
            </div>
          ))}
        </div>

        {/* Philosophy note */}
        <div className="mt-16 text-center">
          <p className="text-slate-500 dark:text-slate-500 text-sm max-w-xl mx-auto">
            Our backgrounds span communications, user experience, AI systems, media production, and operations—across industries from financial services to healthcare.
            What we have in common: we'd rather build something that works than talk about building something that works.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Team;
