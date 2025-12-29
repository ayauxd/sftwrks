/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

interface FooterProps {
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
  onOpenDiscovery?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onLinkClick, onOpenDiscovery }) => {
  return (
    <footer className="bg-[#0A1628] pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">

        {/* Brand Column */}
        <div className="md:col-span-4">
          <div className="flex flex-col mb-4">
            <span className="font-sans text-white font-bold text-lg tracking-wide">SOFTWORKS</span>
            <span className="font-sans text-slate-400 font-medium text-[8px] tracking-[0.52em] uppercase">Trading Company</span>
          </div>
          <p className="max-w-xs text-slate-400 font-light leading-relaxed mb-6">
            We help businesses make AI work. Strategy, setup, and support to get real results.
          </p>
          <a
            href="mailto:agents@softworkstrading.com"
            className="inline-flex items-center gap-2 text-[#00D4FF] hover:text-[#22D3EE] transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            agents@softworkstrading.com
          </a>
        </div>

        {/* Services Column */}
        <div className="md:col-span-2">
          <h4 className="font-medium text-white mb-6 tracking-wide text-xs uppercase">Services</h4>
          <ul className="space-y-4 text-slate-400 font-light text-sm">
            <li>
              <a href="#about" onClick={(e) => onLinkClick(e, 'about')} className="hover:text-[#00D4FF] transition-colors">
                AI Strategy
              </a>
            </li>
            <li>
              <a href="#about" onClick={(e) => onLinkClick(e, 'about')} className="hover:text-[#00D4FF] transition-colors">
                Governance Design
              </a>
            </li>
            <li>
              <a href="#process" onClick={(e) => onLinkClick(e, 'process')} className="hover:text-[#00D4FF] transition-colors">
                Integration Advisory
              </a>
            </li>
            <li>
              <a href="#process" onClick={(e) => onLinkClick(e, 'process')} className="hover:text-[#00D4FF] transition-colors">
                Workflow Automation
              </a>
            </li>
          </ul>
        </div>

        {/* Company Column */}
        <div className="md:col-span-2">
          <h4 className="font-medium text-white mb-6 tracking-wide text-xs uppercase">Company</h4>
          <ul className="space-y-4 text-slate-400 font-light text-sm">
            <li>
              <a href="#about" onClick={(e) => onLinkClick(e, 'about')} className="hover:text-[#00D4FF] transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a href="#work" onClick={(e) => onLinkClick(e, 'work')} className="hover:text-[#00D4FF] transition-colors">
                Case Studies
              </a>
            </li>
            <li>
              <a href="#journal" onClick={(e) => onLinkClick(e, 'journal')} className="hover:text-[#00D4FF] transition-colors">
                Insights
              </a>
            </li>
            <li>
              <a href="#contact" onClick={(e) => onLinkClick(e, 'contact')} className="hover:text-[#00D4FF] transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* CTA Column */}
        <div className="md:col-span-4">
          <h4 className="font-medium text-white mb-6 tracking-wide text-xs uppercase">Start a Conversation</h4>
          <p className="text-slate-400 font-light text-sm mb-6 leading-relaxed">
            Ready to make AI work for your business? Let's talk about what you need.
          </p>
          <button
            onClick={onOpenDiscovery}
            className="inline-block px-6 py-3 bg-[#00D4FF] text-[#0A1628] font-semibold uppercase tracking-wider text-xs hover:bg-[#22D3EE] hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-all"
          >
            Schedule Discovery Call
          </button>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-slate-500 font-mono uppercase tracking-wider">
          Softworks Trading Company
        </p>
        <div className="flex items-center gap-6 text-xs text-slate-500">
          <a href="mailto:agents@softworkstrading.com?subject=Privacy%20Policy%20Request" className="hover:text-[#00D4FF] transition-colors cursor-pointer">Privacy Policy</a>
          <a href="mailto:agents@softworkstrading.com?subject=Terms%20of%20Service%20Request" className="hover:text-[#00D4FF] transition-colors cursor-pointer">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
