/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Time Value Calculator - Conversational widget that discovers context
 * before estimating value. Supports international currencies.
 */

import React, { useState, useEffect } from 'react';
import CurrencyInput from 'react-currency-input-field';
import {
  CURRENCIES,
  Currency,
  REGIONS,
  CHALLENGE_OPTIONS,
  TEAM_SIZE_OPTIONS,
  SUCCESS_OPTIONS
} from '../constants';

// Phase definitions
type Phase = 'intro' | 'name' | 'region' | 'currency' | 'challenge' | 'team' | 'success' | 'constraint-cost' | 'results' | 'email' | 'complete';

interface CalculatorData {
  name: string;
  region: string;
  currency: Currency;
  challenge: string;
  challengeLabel: string;
  teamSize: string;
  teamMultiplier: number;
  successGoal: string;
  constraintCost: number;
}

interface AssistantProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/maqqognb';

// Default to USD
const DEFAULT_CURRENCY = CURRENCIES[0];

// Calculate value range based on inputs
const calculateValue = (data: CalculatorData): { conservative: number; potential: number } => {
  const baseCost = data.constraintCost || 0;

  // Conservative: 35% of stated constraint cost (realistic recovery)
  // Potential: 70% of stated constraint cost (best case recovery)
  // Cannot exceed the constraint cost itself
  const conservative = Math.round(baseCost * 0.35);
  const potential = Math.round(baseCost * 0.7);

  return { conservative, potential };
};

// Format currency value - always use comma as thousands separator for clarity
const formatCurrency = (value: number, currency: Currency): string => {
  // Always use comma as thousands separator regardless of locale
  const formatted = value.toLocaleString('en-US');
  return `${currency.symbol}${formatted}`;
};

// Convert number to words for large amounts
const numberToWords = (num: number): string => {
  if (num >= 1000000000) {
    const billions = num / 1000000000;
    return `${billions.toFixed(1).replace(/\.0$/, '')} billion`;
  }
  if (num >= 1000000) {
    const millions = num / 1000000;
    return `${millions.toFixed(1).replace(/\.0$/, '')} million`;
  }
  if (num >= 1000) {
    const thousands = num / 1000;
    return `${thousands.toFixed(0)}k`;
  }
  return num.toString();
};

// Validate custom challenge input - must be business-relevant
const isValidChallenge = (input: string): boolean => {
  const trimmed = input.trim().toLowerCase();
  if (trimmed.length < 5) return false;

  // List of invalid/nonsense keywords
  const invalidKeywords = [
    'car', 'food', 'pizza', 'burger', 'dog', 'cat', 'movie', 'game',
    'hello', 'hi', 'test', 'asdf', 'qwerty', 'abc', '123', 'xxx',
    'lol', 'haha', 'none', 'nothing', 'idk', 'na', 'n/a'
  ];

  if (invalidKeywords.some(kw => trimmed === kw || trimmed.includes(kw))) {
    return false;
  }

  // Must contain at least some business-relevant words or be descriptive
  const businessWords = [
    'time', 'slow', 'manual', 'process', 'team', 'customer', 'client',
    'sales', 'report', 'data', 'email', 'communication', 'workflow',
    'delay', 'error', 'mistake', 'cost', 'revenue', 'profit', 'loss',
    'staff', 'employee', 'project', 'deadline', 'quality', 'delivery',
    'invoice', 'payment', 'order', 'inventory', 'support', 'service',
    'marketing', 'lead', 'conversion', 'tracking', 'scheduling', 'booking',
    'onboarding', 'training', 'document', 'approval', 'compliance'
  ];

  // Either contains business words or is long enough to be descriptive
  const hasBusinessWord = businessWords.some(word => trimmed.includes(word));
  const isDescriptive = trimmed.split(' ').length >= 2 && trimmed.length >= 10;

  return hasBusinessWord || isDescriptive;
};

const Assistant: React.FC<AssistantProps> = ({ isOpen: controlledIsOpen, onOpenChange }) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = (open: boolean) => {
    if (onOpenChange) {
      onOpenChange(open);
    } else {
      setInternalIsOpen(open);
    }
  };

  const [phase, setPhase] = useState<Phase>('intro');
  const [data, setData] = useState<CalculatorData>({
    name: '',
    region: '',
    currency: DEFAULT_CURRENCY,
    challenge: '',
    challengeLabel: '',
    teamSize: '',
    teamMultiplier: 1,
    successGoal: '',
    constraintCost: 0,
  });
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [promptDismissed, setPromptDismissed] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [showOtherChallenge, setShowOtherChallenge] = useState(false);
  const [customChallenge, setCustomChallenge] = useState('');
  const [challengeError, setChallengeError] = useState<string | null>(null);

  // Show prompt after 4 seconds if not opened
  useEffect(() => {
    if (!isOpen && !promptDismissed) {
      const timer = setTimeout(() => setShowPrompt(true), 4000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, promptDismissed]);

  useEffect(() => {
    if (isOpen) {
      setShowPrompt(false);
      setPromptDismissed(true);
    }
  }, [isOpen]);

  const handleNext = (nextPhase: Phase) => {
    setPhase(nextPhase);
  };

  const handleSelectOption = (
    field: keyof CalculatorData,
    value: string,
    nextPhase: Phase,
    extra?: Partial<CalculatorData>
  ) => {
    setData(prev => ({ ...prev, [field]: value, ...extra }));
    setTimeout(() => setPhase(nextPhase), 200);
  };

  const handleSelectCurrency = (currency: Currency) => {
    setData(prev => ({ ...prev, currency }));
    setTimeout(() => setPhase('challenge'), 200);
  };

  const handleCostSubmit = () => {
    if (data.constraintCost > 0) {
      setPhase('results');
    }
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
    setSubmissionError(null);

    const value = calculateValue(data);
    const payload = {
      source: 'time_value_calculator',
      timestamp: new Date().toISOString(),
      email: email.trim(),
      name: data.name || 'Not provided',
      region: data.region,
      currency: data.currency.code,
      challenge: data.challengeLabel,
      teamSize: data.teamSize,
      successGoal: data.successGoal,
      constraintCost: formatCurrency(data.constraintCost, data.currency),
      estimatedConservative: formatCurrency(value.conservative, data.currency),
      estimatedPotential: formatCurrency(value.potential, data.currency),
    };

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `Time Value Calculator: ${formatCurrency(value.conservative, data.currency)} - ${formatCurrency(value.potential, data.currency)}/mo`,
          ...payload
        })
      });

      if (response.ok) {
        setSubmitted(true);
        setPhase('complete');
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('Formspree error:', response.status, errorData);
        setSubmissionError('Submission failed. Please try again or email us directly.');
      }
    } catch (error) {
      console.error('Network error:', error);
      setSubmissionError('Network error. Please check your connection and try again.');
    }

    setIsSubmitting(false);
  };

  const reset = () => {
    setPhase('intro');
    setData({
      name: '',
      region: '',
      currency: DEFAULT_CURRENCY,
      challenge: '',
      challengeLabel: '',
      teamSize: '',
      teamMultiplier: 1,
      successGoal: '',
      constraintCost: 0,
    });
    setEmail('');
    setSubmitted(false);
    setSubmissionError(null);
    setShowOtherChallenge(false);
    setCustomChallenge('');
    setChallengeError(null);
  };

  const handleCustomChallengeSubmit = () => {
    if (!isValidChallenge(customChallenge)) {
      setChallengeError('Please describe a specific business challenge (e.g., "slow customer response time", "manual data entry")');
      return;
    }
    setChallengeError(null);
    setData(prev => ({ ...prev, challenge: 'other', challengeLabel: customChallenge.trim() }));
    setTimeout(() => setPhase('team'), 200);
  };

  const renderContent = () => {
    const value = calculateValue(data);

    // Intro screen
    if (phase === 'intro') {
      return (
        <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00D4FF] to-[#0891B2] flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
            Time Value Calculator
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 max-w-[280px]">
            Find out what your biggest constraint costs you, and what solving it could save.
          </p>
          <div className="bg-slate-100 dark:bg-[#1E3A5F]/50 rounded-lg px-4 py-3 mb-6 max-w-[280px]">
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <span className="text-[#00D4FF] font-semibold">Quick and honest:</span> A few questions about your situation. No generic assumptions.
            </p>
          </div>
          <button
            onClick={() => handleNext('name')}
            className="bg-[#00D4FF] hover:bg-[#22D3EE] text-[#0A1628] font-semibold px-8 py-3 rounded-lg transition-colors text-sm uppercase tracking-wide"
          >
            Let's Start
          </button>
          <p className="text-xs text-slate-400 mt-4">2 minutes. No email required to see results.</p>
        </div>
      );
    }

    // Name (optional)
    if (phase === 'name') {
      return (
        <div className="flex-1 flex flex-col px-5 py-6">
          <div className="mb-6">
            <span className="text-xs font-mono text-[#00D4FF] uppercase tracking-wider">Step 1</span>
            <div className="h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mt-2">
              <div className="h-full bg-[#00D4FF] w-[14%] transition-all" />
            </div>
          </div>

          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
            What should I call you?
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            Just for personalizing results. Skip if you prefer.
          </p>

          <input
            type="text"
            value={data.name}
            onChange={(e) => setData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Your first name"
            className="w-full bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700 focus:border-[#00D4FF] px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 rounded-lg outline-none transition-colors mb-4"
            autoFocus
          />

          <div className="flex gap-3">
            <button
              onClick={() => handleNext('region')}
              className="flex-1 bg-[#00D4FF] hover:bg-[#22D3EE] text-[#0A1628] font-semibold py-3 rounded-lg transition-colors text-sm"
            >
              {data.name ? 'Continue' : 'Skip'}
            </button>
          </div>
        </div>
      );
    }

    // Region selection
    if (phase === 'region') {
      return (
        <div className="flex-1 flex flex-col px-5 py-6">
          <div className="mb-6">
            <span className="text-xs font-mono text-[#00D4FF] uppercase tracking-wider">Step 2</span>
            <div className="h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mt-2">
              <div className="h-full bg-[#00D4FF] w-[28%] transition-all" />
            </div>
          </div>

          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
            {data.name ? `${data.name}, where` : 'Where'} are you based?
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            This helps us show results in your local currency.
          </p>

          <div className="space-y-3 flex-1">
            {REGIONS.map((region) => (
              <button
                key={region.value}
                onClick={() => handleSelectOption('region', region.value, 'currency')}
                className="w-full text-left px-4 py-3.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-[#00D4FF]/50 text-slate-700 dark:text-slate-300 transition-all"
              >
                <span className="text-sm font-medium">{region.label}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => setPhase('name')}
            className="mt-4 text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
          >
            ← Back
          </button>
        </div>
      );
    }

    // Currency selection
    if (phase === 'currency') {
      // Filter currencies based on region
      const regionCurrencies: Record<string, string[]> = {
        'na': ['USD', 'CAD'],
        'eu': ['EUR', 'GBP'],
        'af': ['NGN', 'ZAR', 'KES', 'GHS'],
        'apac': ['INR', 'SGD', 'AUD'],
        'me': ['AED', 'EUR'],
        'latam': ['USD'],
      };

      const suggestedCodes = regionCurrencies[data.region] || ['USD'];
      const suggestedCurrencies = CURRENCIES.filter(c => suggestedCodes.includes(c.code));
      const otherCurrencies = CURRENCIES.filter(c => !suggestedCodes.includes(c.code));

      return (
        <div className="flex-1 flex flex-col px-5 py-6">
          <div className="mb-6">
            <span className="text-xs font-mono text-[#00D4FF] uppercase tracking-wider">Step 3</span>
            <div className="h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mt-2">
              <div className="h-full bg-[#00D4FF] w-[42%] transition-all" />
            </div>
          </div>

          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
            What's your local currency?
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            We'll show all values in this currency.
          </p>

          <div className="space-y-2 flex-1 overflow-y-auto">
            {suggestedCurrencies.map((currency) => (
              <button
                key={currency.code}
                onClick={() => handleSelectCurrency(currency)}
                className="w-full text-left px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-[#00D4FF] hover:bg-[#00D4FF]/5 transition-all flex items-center justify-between"
              >
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{currency.name}</span>
                <span className="text-sm font-mono text-[#00D4FF]">{currency.symbol}</span>
              </button>
            ))}

            {otherCurrencies.length > 0 && (
              <>
                <div className="pt-2 pb-1">
                  <span className="text-xs text-slate-400 uppercase tracking-wider">Other currencies</span>
                </div>
                {otherCurrencies.map((currency) => (
                  <button
                    key={currency.code}
                    onClick={() => handleSelectCurrency(currency)}
                    className="w-full text-left px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-[#00D4FF]/50 transition-all flex items-center justify-between"
                  >
                    <span className="text-sm text-slate-600 dark:text-slate-400">{currency.name}</span>
                    <span className="text-sm font-mono text-slate-400">{currency.symbol}</span>
                  </button>
                ))}
              </>
            )}
          </div>

          <button
            onClick={() => setPhase('region')}
            className="mt-4 text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
          >
            ← Back
          </button>
        </div>
      );
    }

    // Challenge selection
    if (phase === 'challenge') {
      return (
        <div className="flex-1 flex flex-col px-5 py-6">
          <div className="mb-6">
            <span className="text-xs font-mono text-[#00D4FF] uppercase tracking-wider">Step 4</span>
            <div className="h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mt-2">
              <div className="h-full bg-[#00D4FF] w-[56%] transition-all" />
            </div>
          </div>

          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
            What's the main challenge slowing you down?
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            Pick the one that hurts most.
          </p>

          {!showOtherChallenge ? (
            <div className="space-y-3 flex-1 overflow-y-auto">
              {CHALLENGE_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelectOption('challenge', option.value, 'team', { challengeLabel: option.label })}
                  className="w-full text-left px-4 py-3.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-[#00D4FF]/50 text-slate-700 dark:text-slate-300 transition-all"
                >
                  <span className="text-sm font-medium block">{option.label}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{option.description}</span>
                </button>
              ))}

              {/* Other option */}
              <button
                onClick={() => setShowOtherChallenge(true)}
                className="w-full text-left px-4 py-3.5 rounded-lg border border-dashed border-slate-300 dark:border-slate-600 hover:border-[#00D4FF]/50 text-slate-500 dark:text-slate-400 transition-all"
              >
                <span className="text-sm font-medium block">Something else</span>
                <span className="text-xs">Describe your specific challenge</span>
              </button>
            </div>
          ) : (
            <div className="flex-1">
              <div className="mb-4">
                <textarea
                  value={customChallenge}
                  onChange={(e) => {
                    setCustomChallenge(e.target.value);
                    setChallengeError(null);
                  }}
                  placeholder="Describe your business challenge (e.g., 'Spending too much time on manual invoicing')"
                  className="w-full bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700 focus:border-[#00D4FF] px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 rounded-lg outline-none transition-colors resize-none h-24"
                  autoFocus
                />
                {challengeError && (
                  <p className="text-xs text-red-500 mt-2">{challengeError}</p>
                )}
                <p className="text-xs text-slate-400 mt-2">
                  Be specific about what's costing you time or money
                </p>
              </div>

              <button
                onClick={handleCustomChallengeSubmit}
                disabled={customChallenge.trim().length < 5}
                className="w-full bg-[#00D4FF] hover:bg-[#22D3EE] text-[#0A1628] font-semibold py-3 rounded-lg transition-colors text-sm disabled:opacity-50 mb-3"
              >
                Continue
              </button>

              <button
                onClick={() => {
                  setShowOtherChallenge(false);
                  setCustomChallenge('');
                  setChallengeError(null);
                }}
                className="w-full text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                ← Back to options
              </button>
            </div>
          )}

          {!showOtherChallenge && (
            <button
              onClick={() => setPhase('currency')}
              className="mt-4 text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              ← Back
            </button>
          )}
        </div>
      );
    }

    // Team size
    if (phase === 'team') {
      return (
        <div className="flex-1 flex flex-col px-5 py-6">
          <div className="mb-6">
            <span className="text-xs font-mono text-[#00D4FF] uppercase tracking-wider">Step 5</span>
            <div className="h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mt-2">
              <div className="h-full bg-[#00D4FF] w-[70%] transition-all" />
            </div>
          </div>

          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
            How big is your team?
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            People affected by this constraint.
          </p>

          <div className="space-y-3 flex-1">
            {TEAM_SIZE_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelectOption('teamSize', option.label, 'success', { teamMultiplier: option.multiplier })}
                className="w-full text-left px-4 py-3.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-[#00D4FF]/50 text-slate-700 dark:text-slate-300 transition-all"
              >
                <span className="text-sm font-medium">{option.label}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => setPhase('challenge')}
            className="mt-4 text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
          >
            ← Back
          </button>
        </div>
      );
    }

    // Success goal
    if (phase === 'success') {
      return (
        <div className="flex-1 flex flex-col px-5 py-6">
          <div className="mb-6">
            <span className="text-xs font-mono text-[#00D4FF] uppercase tracking-wider">Step 6</span>
            <div className="h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mt-2">
              <div className="h-full bg-[#00D4FF] w-[84%] transition-all" />
            </div>
          </div>

          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
            What would success look like in 3 months?
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            Your primary goal.
          </p>

          <div className="space-y-3 flex-1">
            {SUCCESS_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelectOption('successGoal', option.label, 'constraint-cost')}
                className="w-full text-left px-4 py-3.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-[#00D4FF]/50 text-slate-700 dark:text-slate-300 transition-all"
              >
                <span className="text-sm font-medium block">{option.label}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">{option.description}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => setPhase('team')}
            className="mt-4 text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
          >
            ← Back
          </button>
        </div>
      );
    }

    // Constraint cost input
    if (phase === 'constraint-cost') {
      return (
        <div className="flex-1 flex flex-col px-5 py-6">
          <div className="mb-6">
            <span className="text-xs font-mono text-[#00D4FF] uppercase tracking-wider">Final Step</span>
            <div className="h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mt-2">
              <div className="h-full bg-[#00D4FF] w-full transition-all" />
            </div>
          </div>

          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
            Roughly, how much does "{data.challengeLabel.toLowerCase()}" cost you per month?
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            Think: lost time, missed opportunities, rework, delays. A rough estimate is fine.
          </p>

          <div className="mb-4">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-mono">
                {data.currency.symbol}
              </span>
              <CurrencyInput
                className="w-full bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700 focus:border-[#00D4FF] pl-10 pr-4 py-4 text-lg text-slate-900 dark:text-white placeholder-slate-400 rounded-lg outline-none transition-colors"
                placeholder="5,000"
                decimalsLimit={0}
                onValueChange={(value) => setData(prev => ({ ...prev, constraintCost: parseInt(value || '0', 10) }))}
                autoFocus
              />
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Include: wasted hours × team cost, lost deals, error fixes, delays
            </p>
          </div>

          <div className="bg-slate-100 dark:bg-[#1E3A5F]/50 rounded-lg p-3 mb-6">
            <p className="text-xs text-slate-600 dark:text-slate-400">
              <span className="text-[#00D4FF] font-semibold">No pressure:</span> This helps us give you a fair range estimate. Not a quote -just a conversation starter.
            </p>
          </div>

          <button
            onClick={handleCostSubmit}
            disabled={data.constraintCost <= 0}
            className="w-full bg-[#00D4FF] hover:bg-[#22D3EE] text-[#0A1628] font-semibold py-3 rounded-lg transition-colors text-sm disabled:opacity-50"
          >
            See My Value Estimate
          </button>

          <button
            onClick={() => setPhase('success')}
            className="mt-4 text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
          >
            ← Back
          </button>
        </div>
      );
    }

    // Results screen
    if (phase === 'results') {
      return (
        <div className="flex-1 flex flex-col px-5 py-6 overflow-y-auto">
          <div className="text-center mb-6">
            <p className="text-xs font-mono text-[#00D4FF] uppercase tracking-wider mb-2">Your Value Estimate</p>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
              {data.name ? `${data.name}, here's` : "Here's"} what we found
            </h3>
          </div>

          {/* Value Range */}
          <div className="bg-gradient-to-br from-[#1E3A5F] to-[#0F172A] rounded-xl p-5 mb-4 border border-[#00D4FF]/20">
            <div className="text-center mb-4">
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Potential Monthly Recovery</p>
              <div className="flex items-baseline justify-center gap-3">
                <span className="text-2xl font-bold text-[#00D4FF]">
                  {formatCurrency(value.conservative, data.currency)}
                </span>
                <span className="text-slate-400">to</span>
                <span className="text-2xl font-bold text-white">
                  {formatCurrency(value.potential, data.currency)}
                </span>
              </div>
              {/* Show in words for large amounts */}
              {(value.conservative >= 10000 || value.potential >= 10000) && (
                <p className="text-xs text-slate-500 mt-1">
                  ({numberToWords(value.conservative)} to {numberToWords(value.potential)})
                </p>
              )}
            </div>

            <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-2">
              <div className="h-full bg-gradient-to-r from-[#00D4FF] to-[#22D3EE] w-[65%]" />
            </div>
            <p className="text-[10px] text-slate-400 text-center">
              Conservative estimate → Full potential
            </p>
          </div>

          {/* Breakdown */}
          <div className="bg-slate-100 dark:bg-[#0A1628] rounded-lg p-4 mb-4">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Based on your inputs</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Challenge:</span>
                <span className="text-slate-900 dark:text-white font-medium">{data.challengeLabel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Team size:</span>
                <span className="text-slate-900 dark:text-white font-medium">{data.teamSize}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Estimated constraint cost:</span>
                <span className="text-slate-900 dark:text-white font-medium">{formatCurrency(data.constraintCost, data.currency)}/mo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Goal:</span>
                <span className="text-slate-900 dark:text-white font-medium">{data.successGoal}</span>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 mb-6">
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              <span className="font-semibold">Fair range estimate, not a quote.</span> Real savings depend on your specific situation. We're not trying to impress you with big numbers -just give you a starting point for the conversation.
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={() => setPhase('email')}
            className="w-full bg-[#00D4FF] hover:bg-[#22D3EE] text-[#0A1628] font-semibold py-3 rounded-lg transition-colors text-sm mb-3"
          >
            Email Me a Detailed Breakdown
          </button>

          <a
            href="mailto:agents@sftwrks.com?subject=Time%20Value%20Calculator%20-%20Let%27s%20Talk"
            className="block w-full text-center border border-[#00D4FF] text-[#00D4FF] hover:bg-[#00D4FF]/10 font-semibold py-3 rounded-lg transition-colors text-sm"
          >
            Book a Call Instead
          </a>

          <button
            onClick={reset}
            className="mt-4 text-xs text-slate-400 hover:text-[#00D4FF] transition-colors text-center"
          >
            Start over
          </button>
        </div>
      );
    }

    // Email capture
    if (phase === 'email') {
      return (
        <div className="flex-1 flex flex-col px-5 py-6">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-full bg-[#00D4FF]/20 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-[#00D4FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Get Your Breakdown
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              We'll email you a detailed breakdown with recommendations tailored to your challenge.
            </p>
          </div>

          <form onSubmit={handleEmailSubmit} className="space-y-4">
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
              className="w-full bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700 focus:border-[#00D4FF] px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 rounded-lg outline-none transition-colors"
              autoFocus
            />

            {submissionError && (
              <p className="text-sm text-red-500 dark:text-red-400">{submissionError}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !email.trim()}
              className="w-full bg-[#00D4FF] hover:bg-[#22D3EE] text-[#0A1628] font-semibold py-3 rounded-lg transition-colors text-sm disabled:opacity-50"
            >
              {isSubmitting ? 'Sending...' : 'Send My Breakdown'}
            </button>
          </form>

          <button
            onClick={() => setPhase('results')}
            className="mt-4 text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
          >
            ← Back to results
          </button>
        </div>
      );
    }

    // Complete
    if (phase === 'complete') {
      return (
        <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00D4FF]/20 to-[#0891B2]/20 flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-[#00D4FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Sent!</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 max-w-[280px]">
            Check your inbox for your personalized breakdown. We'll include specific recommendations for "{data.challengeLabel.toLowerCase()}".
          </p>

          <div className="w-full space-y-3 mb-8">
            <a
              href="mailto:agents@sftwrks.com?subject=Time%20Value%20Calculator%20-%20Let%27s%20Talk"
              className="w-full flex items-center justify-center gap-2 bg-[#00D4FF] hover:bg-[#22D3EE] text-[#0A1628] font-semibold py-3 px-4 rounded-lg transition-colors text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book a Discovery Call
            </a>
          </div>

          <button
            onClick={reset}
            className="text-slate-400 hover:text-[#00D4FF] text-xs font-mono transition-colors"
          >
            Calculate again
          </button>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end font-sans">
      {isOpen && (
        <div className="bg-white dark:bg-[#0F172A] shadow-2xl border border-slate-200 dark:border-slate-700 w-full sm:w-[400px] h-[100dvh] sm:h-auto sm:max-h-[calc(100vh-6rem)] sm:min-h-[600px] mb-0 sm:mb-4 flex flex-col overflow-hidden animate-fade-in-up rounded-none sm:rounded-xl fixed inset-0 sm:inset-auto sm:bottom-20 sm:right-0">
          {/* Header */}
          <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-[#0A1628] safe-area-inset-top">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00D4FF] to-[#0891B2] flex items-center justify-center">
                <span className="text-white font-bold text-sm">{data.currency.symbol}</span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Time Value Calculator</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {phase === 'intro' ? 'Start here' :
                   phase === 'results' ? 'Your estimate' :
                   phase === 'complete' ? 'Complete' :
                   phase === 'email' ? 'Get details' :
                   'A few questions'}
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
            <p className="text-sm font-medium text-slate-900 dark:text-white">What's your constraint costing?</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Quick value estimate</p>
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default Assistant;
