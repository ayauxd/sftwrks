/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';

// Value calculation pillars
const VALUE_PILLARS = [
  {
    id: 'time',
    name: 'Time Recapture',
    question: 'How many hours per week does your team spend on repetitive tasks that could be automated?',
    description: 'Data entry, report generation, email responses, scheduling, etc.',
    options: [
      { label: '1-5 hours', value: 5, hourlyValue: 3 },
      { label: '5-15 hours', value: 15, hourlyValue: 10 },
      { label: '15-30 hours', value: 30, hourlyValue: 22 },
      { label: '30+ hours', value: 45, hourlyValue: 38 }
    ]
  },
  {
    id: 'opportunity',
    name: 'Opportunity Cost',
    question: 'How many qualified leads or opportunities slip through because of slow follow-up?',
    description: 'Leads that went cold, RFPs you couldn\'t respond to in time, deals lost to faster competitors.',
    options: [
      { label: 'Rarely happens', value: 0, dollarValue: 0 },
      { label: '1-3 per month', value: 2, dollarValue: 5000 },
      { label: '3-10 per month', value: 6, dollarValue: 15000 },
      { label: 'More than 10', value: 15, dollarValue: 40000 }
    ]
  },
  {
    id: 'friction',
    name: 'Operational Friction',
    question: 'How much time does your team waste on handoffs, searching for info, or waiting for approvals?',
    description: 'Time spent in Slack asking "where is X?", hunting through folders, waiting for sign-off.',
    options: [
      { label: 'Minimal', value: 2, hourlyValue: 2 },
      { label: 'A few hours weekly', value: 5, hourlyValue: 4 },
      { label: 'Significant', value: 10, hourlyValue: 8 },
      { label: 'Major bottleneck', value: 20, hourlyValue: 15 }
    ]
  },
  {
    id: 'errors',
    name: 'Error & Rework',
    question: 'How often do manual errors lead to rework, customer complaints, or compliance issues?',
    description: 'Data entry mistakes, missed details, inconsistent outputs that need fixing.',
    options: [
      { label: 'Rarely', value: 500, dollarValue: 500 },
      { label: 'Monthly', value: 2000, dollarValue: 2000 },
      { label: 'Weekly', value: 8000, dollarValue: 8000 },
      { label: 'Constant issue', value: 20000, dollarValue: 20000 }
    ]
  },
  {
    id: 'tech',
    name: 'Tech Overhead',
    question: 'How much are you spending on tools that overlap, underdeliver, or require manual workarounds?',
    description: 'Software subscriptions, integrations that don\'t work, manual data sync between systems.',
    options: [
      { label: 'Under $500/mo', value: 300, dollarValue: 300 },
      { label: '$500-2K/mo', value: 1200, dollarValue: 1200 },
      { label: '$2K-5K/mo', value: 3500, dollarValue: 3500 },
      { label: 'Over $5K/mo', value: 7000, dollarValue: 7000 }
    ]
  }
];

interface ValueCalculatorProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface Answer {
  pillarId: string;
  optionIndex: number;
  timestamp: number;
}

const ValueCalculator: React.FC<ValueCalculatorProps> = ({ isOpen: controlledIsOpen, onOpenChange }) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = (open: boolean) => {
    if (onOpenChange) {
      onOpenChange(open);
    } else {
      setInternalIsOpen(open);
    }
  };

  const [currentStep, setCurrentStep] = useState(0); // 0 = intro, 1-5 = questions, 6 = email, 7 = results
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [showSpeedWarning, setShowSpeedWarning] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);
  const [promptDismissed, setPromptDismissed] = useState(false);

  const totalSteps = VALUE_PILLARS.length;
  const HOURLY_RATE = 75; // Assumed hourly value of employee time

  // Show prompt after 5 seconds if not opened
  useEffect(() => {
    if (!isOpen && !promptDismissed) {
      const timer = setTimeout(() => setShowPrompt(true), 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, promptDismissed]);

  useEffect(() => {
    if (isOpen) {
      setShowPrompt(false);
      setPromptDismissed(true);
    }
  }, [isOpen]);

  // Start timer when beginning assessment
  useEffect(() => {
    if (currentStep === 1 && !startTime) {
      setStartTime(Date.now());
    }
  }, [currentStep, startTime]);

  // Calculate total value
  const calculateValue = () => {
    let monthlyValue = 0;

    answers.forEach(answer => {
      const pillar = VALUE_PILLARS.find(p => p.id === answer.pillarId);
      if (!pillar) return;
      const option = pillar.options[answer.optionIndex];
      if (!option) return;

      if ('hourlyValue' in option) {
        // Convert weekly hours to monthly dollar value
        monthlyValue += option.hourlyValue * 4 * HOURLY_RATE;
      } else if ('dollarValue' in option) {
        monthlyValue += option.dollarValue;
      }
    });

    return {
      monthly: monthlyValue,
      annual: monthlyValue * 12,
      conservative: Math.round(monthlyValue * 0.5), // 50% capture rate
      aggressive: Math.round(monthlyValue * 0.8) // 80% capture rate
    };
  };

  const handleOptionSelect = (optionIndex: number) => {
    const pillar = VALUE_PILLARS[currentStep - 1];
    const newAnswer: Answer = {
      pillarId: pillar.id,
      optionIndex,
      timestamp: Date.now()
    };

    setAnswers(prev => {
      const filtered = prev.filter(a => a.pillarId !== pillar.id);
      return [...filtered, newAnswer];
    });

    // Auto-advance
    setTimeout(() => {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        // Check completion time
        const totalTime = startTime ? (Date.now() - startTime) / 1000 : 0;
        if (totalTime < 30) {
          setShowSpeedWarning(true);
        }
        setCurrentStep(totalSteps + 1); // Go to email capture
      }
    }, 200);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    // Honeypot check
    if (honeypot) {
      setSubmitted(true);
      return;
    }

    setIsSubmitting(true);

    const value = calculateValue();
    const payload = {
      source: 'value_calculator',
      timestamp: new Date().toISOString(),
      email: email.trim(),
      totalMonthlyValue: value.monthly,
      totalAnnualValue: value.annual,
      conservativeMonthly: value.conservative,
      responses: answers.map(a => {
        const pillar = VALUE_PILLARS.find(p => p.id === a.pillarId);
        const option = pillar?.options[a.optionIndex];
        return {
          pillar: pillar?.name,
          answer: option?.label
        };
      }),
      completionTime: startTime ? Math.round((Date.now() - startTime) / 1000) : null
    };

    try {
      const response = await fetch('https://formspree.io/f/maqqognb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `Value Calculator: $${value.monthly.toLocaleString()}/mo potential`,
          ...payload
        })
      });

      if (response.ok) {
        setSubmitted(true);
        setCurrentStep(totalSteps + 2); // Show results
      }
    } catch (error) {
      console.error('Submission error:', error);
    }

    setIsSubmitting(false);
  };

  const reset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setEmail('');
    setSubmitted(false);
    setStartTime(null);
    setShowSpeedWarning(false);
  };

  const renderContent = () => {
    // Intro screen
    if (currentStep === 0) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00D4FF] to-[#0891B2] flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
            Value Calculator
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 max-w-[280px]">
            5 questions to estimate how much you're leaving on the table. Real numbers, not hype.
          </p>
          <div className="bg-slate-100 dark:bg-[#1E3A5F]/50 rounded-lg px-4 py-3 mb-6 max-w-[280px]">
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <span className="text-[#00D4FF] font-semibold">Your results reflect your inputs.</span> Take your time for accurate numbers.
            </p>
          </div>
          <button
            onClick={() => setCurrentStep(1)}
            className="bg-[#00D4FF] hover:bg-[#22D3EE] text-[#0A1628] font-semibold px-8 py-3 rounded-lg transition-colors text-sm uppercase tracking-wide"
          >
            Calculate My Value
          </button>
          <p className="text-xs text-slate-400 mt-4">Free. Takes 2 minutes.</p>
        </div>
      );
    }

    // Email capture (after questions, before results)
    if (currentStep === totalSteps + 1 && !submitted) {
      const value = calculateValue();
      return (
        <div className="flex-1 flex flex-col px-5 py-6">
          {showSpeedWarning && (
            <div className="mb-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <p className="text-xs text-amber-700 dark:text-amber-300">
                  Quick answers can mean inaccurate estimates. Consider going back if you rushed through.
                </p>
              </div>
            </div>
          )}

          <div className="text-center mb-6">
            <p className="text-xs font-mono text-[#00D4FF] uppercase tracking-wider mb-2">Preliminary Estimate</p>
            <p className="text-4xl font-bold text-slate-900 dark:text-white mb-1">
              ${value.conservative.toLocaleString()}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              potential monthly recovery
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#1E3A5F] to-[#0F172A] p-5 rounded-xl border border-[#00D4FF]/30 mb-6">
            <h4 className="text-white font-semibold mb-2">See Your Full Breakdown</h4>
            <p className="text-slate-400 text-xs mb-4">
              Enter your email to see the detailed analysis by category, plus specific recommendations for your situation.
            </p>

            <form onSubmit={handleEmailSubmit} className="space-y-3">
              {/* Honeypot */}
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] opacity-0 h-0 w-0 pointer-events-none"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email *"
                required
                className="w-full bg-[#0F172A] border border-slate-600 focus:border-[#00D4FF] px-4 py-2.5 text-sm text-white placeholder-slate-500 rounded-lg outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={isSubmitting || !email.trim()}
                className="w-full bg-[#00D4FF] hover:bg-[#22D3EE] text-[#0A1628] font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 text-sm"
              >
                {isSubmitting ? 'Sending...' : 'Show My Results'}
              </button>
            </form>
          </div>

          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            className="text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
          >
            &larr; Back to refine answers
          </button>
        </div>
      );
    }

    // Results screen (after email submitted)
    if (currentStep === totalSteps + 2 || (currentStep > totalSteps && submitted)) {
      const value = calculateValue();
      return (
        <div className="flex-1 flex flex-col px-5 py-6 overflow-y-auto">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#00D4FF]/20 to-[#0891B2]/20 mb-4">
              <svg className="w-8 h-8 text-[#00D4FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Your Value Analysis</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Based on your responses</p>
          </div>

          {/* Value Summary */}
          <div className="bg-slate-100 dark:bg-[#1E3A5F] rounded-lg p-4 mb-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Conservative</p>
                <p className="text-2xl font-bold text-[#00D4FF]">${value.conservative.toLocaleString()}</p>
                <p className="text-xs text-slate-500">/month</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Potential</p>
                <p className="text-2xl font-bold text-slate-700 dark:text-slate-300">${value.monthly.toLocaleString()}</p>
                <p className="text-xs text-slate-500">/month</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-600 text-center">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Annual Opportunity</p>
              <p className="text-lg font-bold text-slate-900 dark:text-white">${value.annual.toLocaleString()}</p>
            </div>
          </div>

          {/* Breakdown by Pillar */}
          <div className="bg-slate-50 dark:bg-[#0A1628] rounded-lg p-4 mb-4">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">By Category</h4>
            <div className="space-y-3">
              {answers.map(answer => {
                const pillar = VALUE_PILLARS.find(p => p.id === answer.pillarId);
                const option = pillar?.options[answer.optionIndex];
                if (!pillar || !option) return null;

                let displayValue = '';
                if ('hourlyValue' in option) {
                  displayValue = `$${(option.hourlyValue * 4 * HOURLY_RATE).toLocaleString()}/mo`;
                } else if ('dollarValue' in option) {
                  displayValue = `$${option.dollarValue.toLocaleString()}/mo`;
                }

                return (
                  <div key={pillar.id} className="flex justify-between items-center">
                    <span className="text-sm text-slate-600 dark:text-slate-400">{pillar.name}</span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">{displayValue}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-br from-[#1E3A5F] to-[#0F172A] p-4 rounded-xl border border-[#00D4FF]/30 mb-4">
            <h4 className="text-white font-semibold mb-2">Want to capture this value?</h4>
            <p className="text-slate-400 text-xs mb-3">
              Book a call to discuss which constraint to tackle first and what it would actually cost to fix.
            </p>
            <a
              href="mailto:agents@sftwrks.com?subject=Value%20Calculator%20-%20Ready%20to%20Discuss"
              className="block w-full bg-[#00D4FF] hover:bg-[#22D3EE] text-[#0A1628] font-semibold py-3 rounded-lg transition-colors text-sm text-center"
            >
              Describe Your Constraint
            </a>
          </div>

          <button
            onClick={reset}
            className="text-xs text-slate-400 hover:text-[#00D4FF] transition-colors text-center"
          >
            Recalculate
          </button>
        </div>
      );
    }

    // Question screens
    const pillar = VALUE_PILLARS[currentStep - 1];
    return (
      <div className="flex-1 flex flex-col px-5 py-6">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              {pillar.name}
            </span>
            <span className="text-xs text-slate-500">{currentStep} of {totalSteps}</span>
          </div>
          <div className="h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#00D4FF] transition-all duration-500"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
          {pillar.question}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
          {pillar.description}
        </p>

        {/* Options */}
        <div className="space-y-3 flex-1">
          {pillar.options.map((option, idx) => {
            const isSelected = answers.find(a => a.pillarId === pillar.id)?.optionIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => handleOptionSelect(idx)}
                className={`w-full text-left px-4 py-3.5 rounded-lg border transition-all ${
                  isSelected
                    ? 'border-[#00D4FF] bg-[#00D4FF]/10 text-[#00D4FF]'
                    : 'border-slate-200 dark:border-slate-700 hover:border-[#00D4FF]/50 text-slate-700 dark:text-slate-300'
                }`}
              >
                <span className="text-sm font-medium">{option.label}</span>
              </button>
            );
          })}
        </div>

        {/* Back button */}
        {currentStep > 1 && (
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            className="mt-4 text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
          >
            &larr; Back
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end font-sans">
      {isOpen && (
        <div className="bg-white dark:bg-[#0F172A] shadow-2xl border border-slate-200 dark:border-slate-700 w-full sm:w-[400px] h-[100dvh] sm:h-auto sm:max-h-[calc(100vh-6rem)] sm:min-h-[600px] mb-0 sm:mb-4 flex flex-col overflow-hidden animate-fade-in-up rounded-none sm:rounded-xl fixed inset-0 sm:inset-auto sm:bottom-20 sm:right-0">
          {/* Header */}
          <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-[#0A1628]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00D4FF] to-[#0891B2] flex items-center justify-center">
                <span className="text-white font-bold text-sm">$</span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Value Calculator</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {currentStep === 0 ? 'Start here' :
                   currentStep > totalSteps + 1 ? 'Your results' :
                   currentStep > totalSteps ? 'Almost there' :
                   `Question ${currentStep}/${totalSteps}`}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2.5 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700"
              aria-label="Close calculator"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          {renderContent()}
        </div>
      )}

      {/* Prompt Bubble */}
      {showPrompt && !isOpen && (
        <div className="animate-fade-in-up mb-3 flex items-center gap-2">
          <div className="bg-white dark:bg-[#1E3A5F] shadow-lg rounded-xl px-4 py-3 border border-slate-200 dark:border-slate-700 relative">
            <button
              onClick={() => setPromptDismissed(true)}
              className="absolute -top-2 -right-2 w-5 h-5 bg-slate-200 dark:bg-slate-600 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <p className="text-sm font-medium text-slate-900 dark:text-white">Calculate Your Value</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">2 min estimate</p>
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white dark:bg-[#1E3A5F] border-r border-b border-slate-200 dark:border-slate-700 transform rotate-45"></div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center ${
          isOpen
            ? 'hidden sm:flex bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
            : 'bg-gradient-to-br from-[#00D4FF] to-[#0891B2] text-white hover:scale-105'
        }`}
      >
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-[#00D4FF] animate-ping opacity-30"></span>
        )}
        {isOpen ? (
          <svg className="w-6 h-6 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        ) : (
          <svg className="w-6 h-6 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default ValueCalculator;
