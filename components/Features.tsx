/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

const Features: React.FC = () => {
  return (
    <section id="process" className="bg-[#F1F5F9] dark:bg-[#0F172A]">

      {/* Process Overview */}
      <div className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-mono uppercase tracking-[0.2em] text-[#00D4FF] mb-6">
            How We Work
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight mb-6">
            A clear path to
            <br />
            <span className="text-[#00D4FF]">AI that works.</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400 font-light">
            We follow a simple four-step process to get AI working for you.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Step 1 */}
          <div className="relative">
            <div className="absolute top-0 left-0 w-8 h-8 bg-[#00D4FF] flex items-center justify-center text-[#0A1628] font-mono font-bold text-sm">
              01
            </div>
            <div className="pt-12">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Discovery</h3>
              <p className="text-slate-600 dark:text-slate-400 font-light text-sm leading-relaxed">
                We learn about your business, your challenges, and your goals. We figure out where you stand with AI today.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative">
            <div className="absolute top-0 left-0 w-8 h-8 bg-[#00D4FF] flex items-center justify-center text-[#0A1628] font-mono font-bold text-sm">
              02
            </div>
            <div className="pt-12">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Planning</h3>
              <p className="text-slate-600 dark:text-slate-400 font-light text-sm leading-relaxed">
                We create a custom plan for how AI will fit into your business—what tools, what rules, what steps to take.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative">
            <div className="absolute top-0 left-0 w-8 h-8 bg-[#00D4FF] flex items-center justify-center text-[#0A1628] font-mono font-bold text-sm">
              03
            </div>
            <div className="pt-12">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Setup</h3>
              <p className="text-slate-600 dark:text-slate-400 font-light text-sm leading-relaxed">
                We help you test, choose the right tools, and roll them out. We're with you every step of the way.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="relative">
            <div className="absolute top-0 left-0 w-8 h-8 bg-[#00D4FF] flex items-center justify-center text-[#0A1628] font-mono font-bold text-sm">
              04
            </div>
            <div className="pt-12">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Improvement</h3>
              <p className="text-slate-600 dark:text-slate-400 font-light text-sm leading-relaxed">
                Once things are running, we help you get better over time—tracking what works and training your team.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Service Tiers */}
      <div className="py-24 px-6 md:px-12 bg-[#0F172A] dark:bg-[#0A1628]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-mono uppercase tracking-[0.2em] text-[#00D4FF] mb-6">
              Ways to Work Together
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
              Flexible partnerships for
              <br />
              <span className="text-slate-400">every stage of growth.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tier 1: Setup Support */}
            <div className="p-8 bg-[#1E3A5F]/50 border border-slate-700 hover:border-[#00D4FF]/50 transition-all">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-4 block">Foundation</span>
              <h3 className="text-2xl font-bold text-white mb-4">AI Setup Support</h3>
              <p className="text-slate-400 font-light leading-relaxed mb-6">
                Hands-on implementation help for Google Workspace + AI tools. Perfect for teams ready to get started.
              </p>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#00D4FF] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Tool configuration & setup
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#00D4FF] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Workflow automation basics
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#00D4FF] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Team onboarding sessions
                </li>
              </ul>
            </div>

            {/* Tier 2: Workflow Coaching */}
            <div className="p-8 bg-[#1E3A5F] border-2 border-[#00D4FF] relative">
              <div className="absolute -top-3 left-8 px-3 py-1 bg-[#00D4FF] text-[#0A1628] text-xs font-mono uppercase tracking-wider">
                Most Popular
              </div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#00D4FF] mb-4 block">Growth</span>
              <h3 className="text-2xl font-bold text-white mb-4">Workflow Coaching</h3>
              <p className="text-slate-300 font-light leading-relaxed mb-6">
                Ongoing guidance for founders and small business owners who want to use AI throughout their business.
              </p>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#00D4FF] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Custom AI game plan
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#00D4FF] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Process automation design
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#00D4FF] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Ongoing advisory support
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#00D4FF] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Custom agent development
                </li>
              </ul>
            </div>

            {/* Tier 3: Enterprise Strategy */}
            <div className="p-8 bg-[#1E3A5F]/50 border border-slate-700 hover:border-[#00D4FF]/50 transition-all">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-4 block">Enterprise</span>
              <h3 className="text-2xl font-bold text-white mb-4">AI Strategy Consultation</h3>
              <p className="text-slate-400 font-light leading-relaxed mb-6">
                AI planning for larger organizations. Full policy setup, system design, and team training included.
              </p>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#00D4FF] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Leadership workshops
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#00D4FF] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Policy and rules setup
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#00D4FF] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Help choosing AI tools
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#00D4FF] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Long-term partnership
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
