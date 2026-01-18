/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

interface TermsOfServiceProps {
  onBack: () => void;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#F1F5F9] dark:bg-[#0A1628] pt-24 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <button
          onClick={onBack}
          className="group flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-[#00D4FF] transition-colors mb-12"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Home
        </button>

        <div className="border-b border-slate-300 dark:border-slate-700 pb-8 mb-8">
          <span className="px-2 py-1 bg-white dark:bg-[#1E3A5F] border border-slate-200 dark:border-slate-700 text-[10px] font-mono uppercase tracking-widest text-[#00D4FF] mb-4 inline-block">
            Legal
          </span>
          <h1 className="text-3xl md:text-4xl font-bold font-['Courier_Prime'] text-slate-900 dark:text-white leading-tight">
            Terms of Service
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
            Last updated: January 2026
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none font-sans text-slate-700 dark:text-slate-300 [&>h2]:font-['Courier_Prime'] [&>h2]:text-xl [&>h2]:font-bold [&>h2]:mt-10 [&>h2]:mb-4 [&>p]:mb-4 [&>ul]:mb-4 [&>ul]:list-disc [&>ul]:pl-5">

          <h2>Agreement to Terms</h2>
          <p>
            By accessing or using the Softworks Trading Company website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>

          <h2>Services Description</h2>
          <p>
            Softworks Trading Company provides AI consulting services including strategy development, governance design, and integration advisory. Our website also offers informational content, case studies, and an AI Readiness Assessment tool.
          </p>

          <h2>Use of Services</h2>
          <p>You agree to use our services only for lawful purposes and in accordance with these terms. You agree not to:</p>
          <ul>
            <li>Use our services in any way that violates applicable laws or regulations</li>
            <li>Attempt to gain unauthorized access to our systems or networks</li>
            <li>Use our services to transmit harmful or malicious content</li>
            <li>Misrepresent your identity or affiliation</li>
          </ul>

          <h2>AI Assessment Tool</h2>
          <p>
            Our AI Readiness Assessment tool provides general guidance based on the information you provide. The results are informational only and do not constitute professional advice. Actual implementation outcomes may vary based on numerous factors specific to your organization.
          </p>

          <h2>Intellectual Property</h2>
          <p>
            All content on this website, including text, graphics, logos, and software, is the property of Softworks Trading Company or its content suppliers and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.
          </p>

          <h2>Consulting Engagements</h2>
          <p>
            Formal consulting engagements are governed by separate service agreements. These Terms of Service apply to website usage and initial communications only.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            Softworks Trading Company shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our website or services. Our total liability shall not exceed the amount paid by you, if any, for accessing our services.
          </p>

          <h2>Disclaimer of Warranties</h2>
          <p>
            Our services are provided "as is" without warranties of any kind, either express or implied. We do not warrant that our services will be uninterrupted, error-free, or completely secure.
          </p>

          <h2>Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the modified terms.
          </p>

          <h2>Governing Law</h2>
          <p>
            These terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.
          </p>

          <h2>Contact</h2>
          <p>
            For questions about these Terms of Service, please contact us at{' '}
            <a href="mailto:legal@sftwrks.com" className="text-[#00D4FF] hover:underline">
              legal@sftwrks.com
            </a>
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-300 dark:border-slate-700 flex justify-between items-center">
          <span className="text-sm font-mono text-slate-400 uppercase tracking-widest">End of Document</span>
          <span className="text-lg font-bold font-mono text-[#00D4FF]">SOFTWORKS</span>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
