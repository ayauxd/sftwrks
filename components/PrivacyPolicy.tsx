/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#F1F5F9] dark:bg-[#0A1628] pt-24 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <a
          href="/"
          onClick={(e) => { e.preventDefault(); onBack(); }}
          className="group flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-[#00D4FF] transition-colors mb-12"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Home
        </a>

        <div className="border-b border-slate-300 dark:border-slate-700 pb-8 mb-8">
          <span className="px-2 py-1 bg-white dark:bg-[#1E3A5F] border border-slate-200 dark:border-slate-700 text-[10px] font-mono uppercase tracking-widest text-[#00D4FF] mb-4 inline-block">
            Legal
          </span>
          <h1 className="text-3xl md:text-4xl font-bold font-['Courier_Prime'] text-slate-900 dark:text-white leading-tight">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
            Last updated: January 2026
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none font-sans text-slate-700 dark:text-slate-300 [&>h2]:font-['Courier_Prime'] [&>h2]:text-xl [&>h2]:font-bold [&>h2]:mt-10 [&>h2]:mb-4 [&>p]:mb-4 [&>ul]:mb-4 [&>ul]:list-disc [&>ul]:pl-5">

          <h2>Information We Collect</h2>
          <p>
            Softworks Trading Company ("we", "us", "our") collects information you provide directly when you:
          </p>
          <ul>
            <li>Contact us via email or our website forms</li>
            <li>Use our AI Readiness Assessment tool</li>
            <li>Subscribe to our newsletter or insights</li>
            <li>Engage our consulting services</li>
          </ul>
          <p>
            This may include your name, email address, company name, job title, and any information you choose to share about your business needs.
          </p>

          <h2>How We Use Your Information</h2>
          <p>We use collected information to:</p>
          <ul>
            <li>Respond to your inquiries and provide requested services</li>
            <li>Customize and improve our AI assessments and recommendations</li>
            <li>Send relevant insights and updates (with your consent)</li>
            <li>Improve our website and services</li>
          </ul>

          <h2>Data Protection</h2>
          <p>
            We implement appropriate security measures to protect your personal information. We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties except as described in this policy.
          </p>

          <h2>Third-Party Services</h2>
          <p>
            Our website may use third-party services such as analytics providers and AI APIs (Anthropic Claude, Google Gemini) to provide our services. These services have their own privacy policies governing their use of information.
          </p>

          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Opt out of marketing communications</li>
          </ul>

          <h2>Cookies</h2>
          <p>
            Our website uses minimal cookies for essential functionality such as theme preferences. We do not use tracking cookies for advertising purposes.
          </p>

          <h2>Contact Us</h2>
          <p>
            For any privacy-related questions or requests, please contact us at{' '}
            <a href="mailto:privacy@sftwrks.com" className="text-[#00D4FF] hover:underline">
              privacy@sftwrks.com
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

export default PrivacyPolicy;
