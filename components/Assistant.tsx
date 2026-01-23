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
const SLACK_WEBHOOK_URL = import.meta.env.VITE_SLACK_WEBHOOK_URL;

// Default to USD
const DEFAULT_CURRENCY = CURRENCIES[0];

// Rate limiting configuration
const RATE_LIMIT = {
  maxSubmissions: 3,      // Max submissions per window
  windowHours: 24,        // Time window in hours
  cooldownSeconds: 60,    // Minimum seconds between submissions
};

// Client-side rate limiting
const checkSubmissionRateLimit = (): { allowed: boolean; reason?: string } => {
  const storageKey = 'sftwrks_calc_submissions';
  const cooldownKey = 'sftwrks_calc_last_submit';

  try {
    // Check cooldown
    const lastSubmit = localStorage.getItem(cooldownKey);
    if (lastSubmit) {
      const elapsed = (Date.now() - parseInt(lastSubmit, 10)) / 1000;
      if (elapsed < RATE_LIMIT.cooldownSeconds) {
        return { allowed: false, reason: `Please wait ${Math.ceil(RATE_LIMIT.cooldownSeconds - elapsed)} seconds before submitting again.` };
      }
    }

    // Check daily limit
    const submissions = JSON.parse(localStorage.getItem(storageKey) || '[]') as number[];
    const windowStart = Date.now() - (RATE_LIMIT.windowHours * 60 * 60 * 1000);
    const recentSubmissions = submissions.filter(ts => ts > windowStart);

    if (recentSubmissions.length >= RATE_LIMIT.maxSubmissions) {
      return { allowed: false, reason: 'You\'ve reached the submission limit. Please try again tomorrow.' };
    }

    return { allowed: true };
  } catch {
    // If localStorage fails, allow submission
    return { allowed: true };
  }
};

const recordSubmission = () => {
  const storageKey = 'sftwrks_calc_submissions';
  const cooldownKey = 'sftwrks_calc_last_submit';

  try {
    // Record cooldown
    localStorage.setItem(cooldownKey, Date.now().toString());

    // Record submission
    const submissions = JSON.parse(localStorage.getItem(storageKey) || '[]') as number[];
    submissions.push(Date.now());
    // Keep only recent submissions
    const windowStart = Date.now() - (RATE_LIMIT.windowHours * 60 * 60 * 1000);
    const recentSubmissions = submissions.filter(ts => ts > windowStart);
    localStorage.setItem(storageKey, JSON.stringify(recentSubmissions));
  } catch {
    // Silently fail if localStorage unavailable
  }
};

// Context quality thresholds and feedback
// Progress bar stays grey until 15 chars (minimum), then shows encouraging progress
const getContextQuality = (length: number): { level: string; percent: number; color: string; text: string } => {
  if (length < 15) {
    // Below minimum - grey
    const percent = Math.round((length / 15) * 20); // 0-20% while approaching minimum
    return { level: 'below-minimum', percent, color: 'bg-slate-400 dark:bg-slate-600', text: '' };
  }
  if (length < 50) {
    // Hit minimum - encourage more
    return { level: 'minimum', percent: 30, color: 'bg-amber-400', text: 'Good start — more detail sharpens our recommendations' };
  }
  if (length < 120) {
    return { level: 'good', percent: 60, color: 'bg-cyan-400', text: 'Helpful context — we can work with this' };
  }
  if (length < 200) {
    return { level: 'helpful', percent: 85, color: 'bg-emerald-400', text: 'Great detail — expect a sharp response' };
  }
  return { level: 'great', percent: 100, color: 'bg-emerald-500', text: 'Excellent — we have plenty to work with' };
};

// Simple check: can we send? Just needs 15+ trimmed chars
const canSendContext = (text: string): boolean => text.trim().length >= 15;

// Challenge-specific placeholder cues for context field
const getContextPlaceholders = (challenge: string): string[] => {
  const placeholders: Record<string, string[]> = {
    'admin': [
      "What's one task you wish you never had to do again?",
      "Walk us through your most repetitive weekly task...",
      "Which admin task frustrates you most?",
    ],
    'response': [
      "Describe a recent lead that went cold...",
      "What happens between inquiry and your first reply?",
      "Where do customer messages pile up?",
    ],
    'handoffs': [
      "What info gets lost between people?",
      "Describe a recent handoff that went wrong...",
      "What context do people always ask for twice?",
    ],
    'data': [
      "What question would you answer if you had perfect data?",
      "Which report takes the longest to pull together?",
      "Where does your data live right now?",
    ],
    'content': [
      "What's stuck in your head waiting to be published?",
      "Describe content you wish you had time to create...",
      "What gets in the way of hitting publish?",
    ],
  };
  return placeholders[challenge] || [
    "Tell us more about what's slowing you down...",
    "What would you fix if you had a magic wand?",
    "Describe the frustration in your own words...",
  ];
};

// Validate context input on submit - only catches obvious gibberish
// Character count (15 min) is handled separately by the button state
const isValidContext = (input: string): { valid: boolean; reason?: string } => {
  const trimmed = input.trim();

  // Length check is just a safety net - button should already be disabled below 15
  if (trimmed.length < 15) {
    return { valid: false, reason: 'Please write at least 15 characters.' };
  }

  // Check for nonsense single words that got padded with spaces
  const nonsenseWords = ['test', 'asdf', 'hello', 'hi', 'lol', 'idk', 'na', 'none', 'nothing', 'xxx'];
  const lowerTrimmed = trimmed.toLowerCase().replace(/\s+/g, '');
  if (nonsenseWords.some(w => lowerTrimmed === w || lowerTrimmed === w.repeat(2) || lowerTrimmed === w.repeat(3))) {
    return { valid: false, reason: 'Please describe your actual business challenge.' };
  }

  // Only catch obvious gibberish - keyboard mashing, repeated chars
  const obviousGibberish = [
    /^(.)\1{5,}/,              // Same char repeated 6+ times (aaaaaa)
    /asdf|qwer|zxcv/i,         // Keyboard patterns
    /(.{1,3})\1{4,}/,          // Short pattern repeated 5+ times (abcabcabcabc)
    /^[^aeiou\s]{8,}$/i,       // 8+ consonants with no vowels (very likely gibberish)
  ];

  for (const pattern of obviousGibberish) {
    if (pattern.test(trimmed)) {
      return { valid: false, reason: 'Please provide meaningful context about your challenge.' };
    }
  }

  return { valid: true };
};

// Calculate value range based on inputs - now uses challenge-specific recovery rates
const calculateValue = (data: CalculatorData): { conservative: number; potential: number } => {
  const baseCost = data.constraintCost || 0;
  const teamMultiplier = data.teamMultiplier || 1;

  // Get challenge-specific recovery rates
  const challenge = CHALLENGE_OPTIONS.find(c => c.value === data.challenge);
  const baseConservative = challenge?.recoveryRange?.conservative || 0.30;
  const basePotential = challenge?.recoveryRange?.potential || 0.60;

  // Team size provides a small additional boost (but smaller range than before)
  // teamMultiplier ranges: 1 (solo) → 3 (small) → 8 (medium) → 25 (large) → 50 (enterprise)
  const teamFactor = Math.min(teamMultiplier / 50, 1); // Normalize to 0-1
  const conservativeRate = baseConservative + (teamFactor * 0.05);
  const potentialRate = basePotential + (teamFactor * 0.05);

  const conservative = Math.round(baseCost * conservativeRate);
  const potential = Math.round(baseCost * potentialRate);

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
  const [additionalContext, setAdditionalContext] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [promptDismissed, setPromptDismissed] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [showOtherChallenge, setShowOtherChallenge] = useState(false);
  const [customChallenge, setCustomChallenge] = useState('');
  const [challengeError, setChallengeError] = useState<string | null>(null);
  const [contextError, setContextError] = useState<string | null>(null);

  // Cycle placeholder text every 4 seconds when context field is empty
  useEffect(() => {
    if (phase === 'email' && additionalContext.length === 0) {
      const placeholders = getContextPlaceholders(data.challenge);
      const interval = setInterval(() => {
        setPlaceholderIndex(prev => (prev + 1) % placeholders.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [phase, additionalContext.length, data.challenge]);

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

    // Validate context
    const contextValidation = isValidContext(additionalContext);
    if (!contextValidation.valid) {
      setContextError(contextValidation.reason || 'Please provide more context.');
      return;
    }
    setContextError(null);

    // Rate limit check
    const rateLimitCheck = checkSubmissionRateLimit();
    if (!rateLimitCheck.allowed) {
      setSubmissionError(rateLimitCheck.reason || 'Please try again later.');
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
      additionalContext: additionalContext.trim() || 'Not provided',
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
        recordSubmission(); // Track for rate limiting
        setSubmitted(true);
        setPhase('complete');

        // Also notify Slack if webhook is configured
        if (SLACK_WEBHOOK_URL) {
          fetch(SLACK_WEBHOOK_URL, {
            method: 'POST',
            body: JSON.stringify({
              text: `💰 New Time Value Calculator: ${formatCurrency(value.conservative, data.currency)} - ${formatCurrency(value.potential, data.currency)}/mo`,
              blocks: [
                {
                  type: "header",
                  text: {
                    type: "plain_text",
                    text: "💰 New Time Value Calculator Submission",
                    emoji: true
                  }
                },
                {
                  type: "section",
                  fields: [
                    {
                      type: "mrkdwn",
                      text: `*Name:*\n${data.name || 'Not provided'}`
                    },
                    {
                      type: "mrkdwn",
                      text: `*Email:*\n${email.trim()}`
                    }
                  ]
                },
                {
                  type: "section",
                  fields: [
                    {
                      type: "mrkdwn",
                      text: `*Challenge:*\n${data.challengeLabel}`
                    },
                    {
                      type: "mrkdwn",
                      text: `*Team Size:*\n${data.teamSize}`
                    }
                  ]
                },
                {
                  type: "section",
                  fields: [
                    {
                      type: "mrkdwn",
                      text: `*Monthly Cost:*\n${formatCurrency(data.constraintCost, data.currency)}`
                    },
                    {
                      type: "mrkdwn",
                      text: `*Success Goal:*\n${data.successGoal}`
                    }
                  ]
                },
                {
                  type: "divider"
                },
                {
                  type: "section",
                  text: {
                    type: "mrkdwn",
                    text: `*Potential Recovery:* ${formatCurrency(value.conservative, data.currency)} - ${formatCurrency(value.potential, data.currency)}/mo`
                  }
                },
                ...(additionalContext.trim() ? [{
                  type: "section",
                  text: {
                    type: "mrkdwn",
                    text: `*Additional Context:*\n>${additionalContext.trim().substring(0, 280)}`
                  }
                }] : []),
                {
                  type: "context",
                  elements: [
                    {
                      type: "mrkdwn",
                      text: `Region: ${data.region.toUpperCase()} | Currency: ${data.currency.code}`
                    }
                  ]
                }
              ]
            })
          }).catch(err => console.error('Slack notification failed:', err));
        }
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
    setAdditionalContext('');
    setPlaceholderIndex(0);
    setSubmitted(false);
    setSubmissionError(null);
    setShowOtherChallenge(false);
    setCustomChallenge('');
    setChallengeError(null);
    setContextError(null);
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
          <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-[#1E3A5F] border-2 border-slate-200 dark:border-[#00D4FF]/30 flex items-center justify-center mb-6 shadow-lg">
            <img src="/assets/logos/softworks-icon.png" alt="" className="w-11 h-11 object-contain dark:invert dark:brightness-200 dark:contrast-90" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
            Time Value Calculator
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 max-w-[280px]">
            Tell us about your slowest process. We'll calculate what it costs your business — and what fixing it saves.
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
        <div className="flex-1 flex flex-col px-5 py-6 overflow-hidden">
          <div className="mb-6 flex-shrink-0">
            <span className="text-xs font-mono text-[#00D4FF] uppercase tracking-wider">Step 2</span>
            <div className="h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mt-2">
              <div className="h-full bg-[#00D4FF] w-[28%] transition-all" />
            </div>
          </div>

          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 flex-shrink-0">
            {data.name ? `${data.name}, where` : 'Where'} are you based?
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 flex-shrink-0">
            This helps us show results in your local currency.
          </p>

          <div className="space-y-3 flex-1 overflow-y-auto min-h-0">
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
            className="mt-4 text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 flex-shrink-0"
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
        <div className="flex-1 flex flex-col px-5 py-6 overflow-hidden">
          <div className="mb-6 flex-shrink-0">
            <span className="text-xs font-mono text-[#00D4FF] uppercase tracking-wider">Step 3</span>
            <div className="h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mt-2">
              <div className="h-full bg-[#00D4FF] w-[42%] transition-all" />
            </div>
          </div>

          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 flex-shrink-0">
            What's your local currency?
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 flex-shrink-0">
            We'll show all values in this currency.
          </p>

          <div className="space-y-2 flex-1 overflow-y-auto min-h-0">
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
            className="mt-4 text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 flex-shrink-0"
          >
            ← Back
          </button>
        </div>
      );
    }

    // Challenge selection
    if (phase === 'challenge') {
      return (
        <div className="flex-1 flex flex-col px-5 py-6 overflow-hidden">
          <div className="mb-6 flex-shrink-0">
            <span className="text-xs font-mono text-[#00D4FF] uppercase tracking-wider">Step 4</span>
            <div className="h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mt-2">
              <div className="h-full bg-[#00D4FF] w-[56%] transition-all" />
            </div>
          </div>

          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 flex-shrink-0">
            What's the main challenge slowing you down?
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 flex-shrink-0">
            Pick the one that hurts most.
          </p>

          {!showOtherChallenge ? (
            <>
              <div className="space-y-2 flex-1 overflow-y-auto min-h-0 pb-2">
                {CHALLENGE_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSelectOption('challenge', option.value, 'team', { challengeLabel: option.label })}
                    className="w-full text-left px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-[#00D4FF]/50 text-slate-700 dark:text-slate-300 transition-all"
                  >
                    <span className="text-sm font-medium block">{option.label}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{option.description}</span>
                  </button>
                ))}

                {/* Other option */}
                <button
                  onClick={() => setShowOtherChallenge(true)}
                  className="w-full text-left px-4 py-3 rounded-lg border border-dashed border-slate-300 dark:border-slate-600 hover:border-[#00D4FF]/50 text-slate-500 dark:text-slate-400 transition-all"
                >
                  <span className="text-sm font-medium block">Something else</span>
                  <span className="text-xs">Describe your specific challenge</span>
                </button>
              </div>

              <button
                onClick={() => setPhase('currency')}
                className="mt-4 text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 flex-shrink-0"
              >
                ← Back
              </button>
            </>
          ) : (
            <div className="flex-1 flex flex-col">
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
                className="text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                ← Back to options
              </button>
            </div>
          )}
        </div>
      );
    }

    // Team size
    if (phase === 'team') {
      return (
        <div className="flex-1 flex flex-col px-5 py-6 overflow-hidden">
          <div className="mb-6 flex-shrink-0">
            <span className="text-xs font-mono text-[#00D4FF] uppercase tracking-wider">Step 5</span>
            <div className="h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mt-2">
              <div className="h-full bg-[#00D4FF] w-[70%] transition-all" />
            </div>
          </div>

          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 flex-shrink-0">
            How big is your team?
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 flex-shrink-0">
            People affected by this process.
          </p>

          <div className="space-y-3 flex-1 overflow-y-auto min-h-0">
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
            className="mt-4 text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 flex-shrink-0"
          >
            ← Back
          </button>
        </div>
      );
    }

    // Success goal
    if (phase === 'success') {
      return (
        <div className="flex-1 flex flex-col px-5 py-6 overflow-hidden">
          <div className="mb-6 flex-shrink-0">
            <span className="text-xs font-mono text-[#00D4FF] uppercase tracking-wider">Step 6</span>
            <div className="h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mt-2">
              <div className="h-full bg-[#00D4FF] w-[84%] transition-all" />
            </div>
          </div>

          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 flex-shrink-0">
            What would success look like in 3 months?
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 flex-shrink-0">
            Your primary goal.
          </p>

          <div className="space-y-3 flex-1 overflow-y-auto min-h-0">
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
            className="mt-4 text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 flex-shrink-0"
          >
            ← Back
          </button>
        </div>
      );
    }

    // Cost estimation helper content based on challenge type
    const getCostHelperText = (challenge: string) => {
      const helpers: Record<string, { example: string; formula: string }> = {
        'admin': {
          formula: 'Hours on admin/week × hourly rate × 4 weeks',
          example: 'e.g., 10 hrs/week × $50/hr = $2,000/month'
        },
        'response': {
          formula: 'Leads lost/month × average deal value',
          example: 'e.g., 5 cold leads × $1,000 deal = $5,000/month'
        },
        'handoffs': {
          formula: 'Time on handoffs × people involved × hourly rate',
          example: 'e.g., 2 hrs/week × 4 people × $40/hr = $1,280/month'
        },
        'data': {
          formula: 'Hours on reports × hourly rate × 4 weeks',
          example: 'e.g., 8 hrs/week × $60/hr = $1,920/month'
        },
        'content': {
          formula: 'Hours creating content × hourly rate × 4 weeks',
          example: 'e.g., 15 hrs/week × $50/hr = $3,000/month'
        },
      };
      return helpers[challenge] || {
        formula: 'Hours spent × hourly cost × 4 weeks',
        example: 'e.g., 10 hrs/week × $50/hr = $2,000/month'
      };
    };

    // Process cost input
    if (phase === 'constraint-cost') {
      const costHelper = getCostHelperText(data.challenge);

      return (
        <div className="flex-1 flex flex-col px-5 py-6 overflow-hidden">
          <div className="mb-6 flex-shrink-0">
            <span className="text-xs font-mono text-[#00D4FF] uppercase tracking-wider">Final Step</span>
            <div className="h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mt-2">
              <div className="h-full bg-[#00D4FF] w-full transition-all" />
            </div>
          </div>

          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 flex-shrink-0">
            Roughly, how much does "{data.challengeLabel.toLowerCase()}" cost you per month?
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 flex-shrink-0">
            A rough estimate is fine. Here's a quick way to think about it:
          </p>

          <div className="flex-1 overflow-y-auto min-h-0">
            {/* Cost estimation helper */}
            <div className="bg-slate-50 dark:bg-[#1E3A5F]/30 rounded-lg p-3 mb-4 border border-slate-200 dark:border-slate-700/50">
              <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {costHelper.formula}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {costHelper.example}
              </p>
            </div>

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
                Include: wasted time, missed opportunities, rework, delays
              </p>
            </div>

            <div className="bg-slate-100 dark:bg-[#1E3A5F]/50 rounded-lg p-3 mb-4">
              <p className="text-xs text-slate-600 dark:text-slate-400">
                <span className="text-[#00D4FF] font-semibold">No pressure:</span> This helps us give you a fair range estimate. Not a quote — just a conversation starter.
              </p>
            </div>
          </div>

          <button
            onClick={handleCostSubmit}
            disabled={data.constraintCost <= 0}
            className="w-full bg-[#00D4FF] hover:bg-[#22D3EE] text-[#0A1628] font-semibold py-3 rounded-lg transition-colors text-sm disabled:opacity-50 flex-shrink-0"
          >
            See My Value Estimate
          </button>

          <button
            onClick={() => setPhase('success')}
            className="mt-4 text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 flex-shrink-0"
          >
            ← Back
          </button>
        </div>
      );
    }

    // Get personalized insight based on success goal
    const getGoalInsight = (goal: string, potential: number) => {
      const insights: Record<string, { icon: string; message: string }> = {
        'Reclaim time each week': {
          icon: '⏱️',
          message: `At an average rate, that's potentially ${Math.round(potential / 50)} hours/month you could redirect to high-value work.`
        },
        'See what\'s actually possible': {
          icon: '📈',
          message: `This unlocked capacity often reveals opportunities you'd want to hire for.`
        },
        'Reduce errors & rework': {
          icon: '✓',
          message: `Fewer mistakes means less time fixing problems and more time moving forward.`
        },
        'Faster customer response': {
          icon: '⚡',
          message: `Faster responses mean warmer leads and better close rates.`
        },
      };
      return insights[goal] || { icon: '💡', message: 'Solving this could free up significant resources for your business.' };
    };

    // Get diagnostic insight for challenge
    const getDiagnosticInsight = (challengeValue: string) => {
      const challenge = CHALLENGE_OPTIONS.find(c => c.value === challengeValue);
      return challenge?.diagnosticInsight || null;
    };

    // Get quick win suggestion for challenge
    const getQuickWin = (challengeValue: string) => {
      const challenge = CHALLENGE_OPTIONS.find(c => c.value === challengeValue);
      return challenge?.quickWin || null;
    };

    // Get pattern insight based on challenge + team size combination
    const getPatternInsight = (challengeValue: string, teamSize: string): string | null => {
      const patterns: Record<string, Record<string, string>> = {
        'admin': {
          'Just me': "Solo operators with admin burden often find 60-80% of the work is the same 3-4 tasks repeated. One focused system handles most of it.",
          '2-5 people': "Small teams typically have one person carrying the admin load. Redistributing with the right tools often doubles their capacity.",
          '6-15 people': "At this size, admin overhead compounds. What works for 5 people breaks at 10. Process standardization pays off big.",
          '16-50 people': "Admin burden at this scale usually means you need systems, not more people. Automation ROI is highest here.",
          '50+ people': "Enterprise admin overhead is often process debt accumulated over years. Strategic cleanup yields massive returns."
        },
        'response': {
          'Just me': "Solo operators lose leads in the inbox-to-action gap. The fix is usually automatic triage and templated responses.",
          '2-5 people': "Small teams often have unclear ownership of incoming leads. Routing rules alone can cut response time in half.",
          '6-15 people': "This is where response time problems become visible. Leads bounce between people before landing.",
          '16-50 people': "At this scale, slow response is almost never about individual speed—it's about routing. Inquiries hit the wrong person first, then bounce.",
          '50+ people': "Response speed at scale requires systematic lead scoring and intelligent routing. The infrastructure investment pays quickly."
        },
        'handoffs': {
          'Just me': "Solo handoffs usually mean client-to-you transitions. Intake forms and automated follow-ups smooth these significantly.",
          '2-5 people': "Small team handoffs break down in verbal communication. Simple written protocols prevent most issues.",
          '6-15 people': "This is the size where handoff friction peaks. Too big for informal coordination, too small for formal systems. We see this pattern constantly.",
          '16-50 people': "Handoff problems at this scale indicate missing middle management layer or undefined processes. Both are fixable.",
          '50+ people': "Enterprise handoffs need systematic workflows. The cost of informal handoffs compounds exponentially."
        },
        'data': {
          'Just me': "Solo data problems usually mean too many tools storing different pieces. Consolidation is the first step.",
          '2-5 people': "Small teams often have 'the person who knows where everything is.' That's a single point of failure.",
          '6-15 people': "Medium teams typically have 3-4 data silos that grew organically. Integration usually reveals insights nobody expected.",
          '16-50 people': "Data problems at this scale are usually architectural. The fix is infrastructure, not workarounds.",
          '50+ people': "Enterprise data challenges require strategic data governance. The investment unlocks decision-making speed."
        },
        'content': {
          'Just me': "Solo content bottlenecks are usually starting-from-scratch syndrome. Templates and AI assistance change everything.",
          '2-5 people': "Small teams often have one person who 'does content.' Scaling their process matters more than scaling headcount.",
          '6-15 people': "Content at this scale needs a system, not just people. Workflow automation and asset libraries pay off quickly.",
          '16-50 people': "Medium-large content operations need content ops. Strategy, production, and distribution should be separate functions.",
          '50+ people': "Enterprise content requires governance. Brand consistency, approval workflows, and asset management at scale."
        }
      };

      return patterns[challengeValue]?.[teamSize] || null;
    };

    // Get goal + challenge intelligence
    const getGoalChallengeInsight = (goal: string, challengeValue: string): string | null => {
      const insights: Record<string, Record<string, string>> = {
        'See what\'s actually possible': {
          'admin': "When admin burden lifts, most owners discover they've been avoiding revenue-generating activities because they 'didn't have time.' You might be surprised what becomes possible.",
          'response': "Faster response doesn't just save deals—it reveals how many opportunities you were missing. The gap is usually bigger than expected.",
          'handoffs': "Clean handoffs expose capacity you didn't know you had. Teams often find they can take on 20-30% more work.",
          'data': "Consolidated data reveals patterns. Most businesses find opportunities hiding in their numbers within weeks.",
          'content': "Removing content bottlenecks often reveals pent-up demand. Your team has ideas they've been sitting on."
        },
        'Faster customer response': {
          'admin': "Admin burden and response speed are connected. Less time on paperwork = more time for customers.",
          'response': "Speed wins deals. We've seen close rates jump 20-40% just from responding within the hour vs. within the day. This is recoverable revenue, not just time saved.",
          'handoffs': "Slow handoffs = slow response. Customers don't care whose fault it is—they just want answers.",
          'data': "Response speed often depends on having the right information ready. Data accessibility is half the battle.",
          'content': "Pre-built responses and templates don't feel impersonal when they're fast and accurate."
        }
      };

      return insights[goal]?.[challengeValue] || null;
    };

    // Calculate compounding cost
    const getCompoundingCost = (monthlyCost: number, currency: Currency) => {
      return {
        threeMonth: formatCurrency(monthlyCost * 3, currency),
        sixMonth: formatCurrency(monthlyCost * 6, currency),
        twelveMonth: formatCurrency(monthlyCost * 12, currency)
      };
    };

    // Determine readiness/fit level
    const getReadinessSignal = (data: CalculatorData): { level: 'high' | 'medium' | 'low'; message: string } => {
      let score = 0;

      // Specific challenge (not "other")
      if (data.challenge !== 'other') score += 2;

      // Team size > solo
      if (data.teamSize !== 'Just me') score += 1;

      // Cost estimate provided and reasonable
      if (data.constraintCost > 0) score += 2;

      // Higher cost suggests more pain = more motivation
      if (data.constraintCost > 5000) score += 1;

      if (score >= 5) {
        return {
          level: 'high',
          message: "Based on your inputs, this looks like a good fit for a discovery call. We've solved this pattern before."
        };
      } else if (score >= 3) {
        return {
          level: 'medium',
          message: "A quick call can help us both figure out if there's a real opportunity here."
        };
      } else {
        return {
          level: 'low',
          message: "Want to explore this more? A discovery call can clarify whether we can help."
        };
      }
    };

    // Results screen
    if (phase === 'results') {
      const goalInsight = getGoalInsight(data.successGoal, value.potential);
      const diagnosticInsight = getDiagnosticInsight(data.challenge);
      const quickWin = getQuickWin(data.challenge);
      const patternInsight = getPatternInsight(data.challenge, data.teamSize);
      const goalChallengeInsight = getGoalChallengeInsight(data.successGoal, data.challenge);
      const compoundingCost = getCompoundingCost(data.constraintCost, data.currency);
      const readiness = getReadinessSignal(data);

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

          {/* Compounding Cost Display */}
          <div className="bg-slate-800/80 dark:bg-slate-900/50 rounded-lg p-4 mb-4 border border-slate-700/50">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">If this continues:</p>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-sm font-bold text-amber-400">{compoundingCost.threeMonth}</p>
                <p className="text-[10px] text-slate-500">3 months</p>
              </div>
              <div>
                <p className="text-sm font-bold text-orange-400">{compoundingCost.sixMonth}</p>
                <p className="text-[10px] text-slate-500">6 months</p>
              </div>
              <div>
                <p className="text-sm font-bold text-red-400">{compoundingCost.twelveMonth}</p>
                <p className="text-[10px] text-slate-500">12 months</p>
              </div>
            </div>
            <p className="text-[10px] text-slate-500 text-center mt-2">
              The sooner we find the fix, the sooner the bleeding stops.
            </p>
          </div>

          {/* Diagnostic Insight - "What we typically find" */}
          {diagnosticInsight && (
            <div className="bg-[#1E3A5F]/30 dark:bg-[#1E3A5F]/20 rounded-lg p-4 mb-4 border border-[#00D4FF]/10">
              <p className="text-xs font-semibold text-[#00D4FF] uppercase tracking-wider mb-2">What we typically find</p>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {diagnosticInsight}
              </p>
            </div>
          )}

          {/* Pattern Insight based on challenge + team size */}
          {patternInsight && (
            <div className="bg-slate-100 dark:bg-slate-800/30 rounded-lg p-4 mb-4 border border-slate-200 dark:border-slate-700/50">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Pattern we recognize</p>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {patternInsight}
              </p>
            </div>
          )}

          {/* Goal + Challenge insight if available */}
          {goalChallengeInsight && (
            <div className="bg-[#00D4FF]/10 dark:bg-[#00D4FF]/5 rounded-lg p-3 mb-4 border border-[#00D4FF]/20">
              <p className="text-sm text-slate-700 dark:text-slate-300">
                <span className="mr-2">{goalInsight.icon}</span>
                {goalChallengeInsight}
              </p>
            </div>
          )}

          {/* Fallback to standard goal insight if no combined insight */}
          {!goalChallengeInsight && (
            <div className="bg-[#00D4FF]/10 dark:bg-[#00D4FF]/5 rounded-lg p-3 mb-4 border border-[#00D4FF]/20">
              <p className="text-sm text-slate-700 dark:text-slate-300">
                <span className="mr-2">{goalInsight.icon}</span>
                {goalInsight.message}
              </p>
            </div>
          )}

          {/* Quick Win suggestion */}
          {quickWin && (
            <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-3 mb-4 border border-emerald-200 dark:border-emerald-800/30">
              <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">Quick win</p>
              <p className="text-sm text-emerald-700 dark:text-emerald-300">
                {quickWin}
              </p>
            </div>
          )}

          {/* Readiness Signal */}
          <div className={`rounded-lg p-3 mb-4 border ${
            readiness.level === 'high'
              ? 'bg-[#00D4FF]/5 border-[#00D4FF]/30'
              : 'bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-700/50'
          }`}>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {readiness.message}
            </p>
          </div>

          {/* Disclaimer */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 mb-6">
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              <span className="font-semibold">Fair range estimate, not a quote.</span> Real savings depend on your specific situation. We're not trying to impress you with big numbers — just give you a starting point for the conversation.
            </p>
          </div>

          {/* CTAs */}
          <button
            onClick={() => setPhase('email')}
            className="w-full bg-[#00D4FF] hover:bg-[#22D3EE] text-[#0A1628] font-semibold py-3 rounded-lg transition-colors text-sm mb-3"
          >
            Get Your Custom Diagnostic
          </button>

          <a
            href="mailto:agents@sftwrks.com?subject=Time%20Value%20Calculator%20-%20Discovery%20Call"
            className="block w-full text-center border border-[#00D4FF] text-[#00D4FF] hover:bg-[#00D4FF]/10 font-semibold py-3 rounded-lg transition-colors text-sm"
          >
            15-min Discovery Call — Free
          </a>
          <p className="text-[10px] text-slate-400 text-center mt-2">
            Walk us through your situation. We'll tell you exactly where to look and whether we can help. No pitch.
          </p>

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
      const placeholders = getContextPlaceholders(data.challenge);
      const currentPlaceholder = placeholders[placeholderIndex % placeholders.length];
      const contextQuality = getContextQuality(additionalContext.length);
      const canSend = canSendContext(additionalContext);
      const charsNeeded = 15 - additionalContext.trim().length;

      return (
        <div className="flex-1 flex flex-col px-5 py-6 overflow-y-auto">
          <div className="text-left mb-5">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Get Your Custom Diagnostic
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              We'll send you a personalized analysis based on what you've shared.
            </p>
          </div>

          <form onSubmit={handleEmailSubmit} className="space-y-4 flex-1 flex flex-col">
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

            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                Email *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                className="w-full bg-white dark:bg-[#0F172A] border-2 border-slate-300 dark:border-slate-600 focus:border-[#00D4FF] px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 rounded-lg outline-none transition-colors shadow-inner"
                autoFocus
              />
            </div>

            {/* Additional context field - REQUIRED */}
            <div className="flex-1 flex flex-col">
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                Tell us more about your situation <span className="text-slate-400 font-normal">(min 15 characters)</span>
              </label>
              <div className="relative flex-1">
                <textarea
                  value={additionalContext}
                  onChange={(e) => {
                    if (e.target.value.length <= 280) {
                      setAdditionalContext(e.target.value);
                      setContextError(null); // Clear error on type
                    }
                  }}
                  placeholder={currentPlaceholder}
                  className={`w-full h-full min-h-[100px] bg-white dark:bg-[#0F172A] border-2 shadow-inner ${
                    contextError
                      ? 'border-red-400 dark:border-red-500'
                      : 'border-slate-300 dark:border-slate-600 focus:border-[#00D4FF]'
                  } px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 rounded-lg outline-none transition-colors resize-none`}
                />
                {/* Character count */}
                <span className="absolute bottom-2 right-2 text-[10px] text-slate-400 font-mono">
                  {additionalContext.length}/280
                </span>
              </div>

              {/* Context quality indicator */}
              <div className="mt-2">
                <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${contextQuality.color} transition-all duration-300`}
                    style={{ width: `${contextQuality.percent}%` }}
                  />
                </div>
                {contextError ? (
                  <p className="text-[10px] text-red-500 dark:text-red-400 mt-1">
                    {contextError}
                  </p>
                ) : !canSend ? (
                  <p className="text-[10px] text-slate-400 mt-1">
                    {charsNeeded > 0 ? `${charsNeeded} more characters to unlock send` : 'Ready to send'}
                  </p>
                ) : contextQuality.text ? (
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                    {contextQuality.text}
                  </p>
                ) : null}
              </div>
            </div>

            {submissionError && (
              <p className="text-sm text-red-500 dark:text-red-400">{submissionError}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !email.trim() || !canSend}
              className="w-full bg-[#00D4FF] hover:bg-[#22D3EE] text-[#0A1628] font-semibold py-3 rounded-lg transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send My Diagnostic'}
            </button>
          </form>

          <button
            onClick={() => setPhase('results')}
            className="mt-4 text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 text-left"
          >
            ← Back to results
          </button>
        </div>
      );
    }

    // Complete - challenge-specific confirmation messages
    if (phase === 'complete') {
      const getCompletionMessage = (challenge: string): string => {
        const messages: Record<string, string> = {
          'admin': "Check your inbox. We've mapped out where to look for quick wins in your admin workflow.",
          'response': "Check your inbox. We've outlined exactly where leads are likely cooling off.",
          'handoffs': "Check your inbox. We've identified the handoff points that typically cause the most friction.",
          'data': "Check your inbox. We've sketched out where your data consolidation should start.",
          'content': "Check your inbox. We've laid out a path from stuck to published.",
        };
        return messages[challenge] || "Check your inbox. We've put together some thoughts based on what you shared.";
      };

      return (
        <div className="flex-1 flex flex-col px-5 py-6">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00D4FF]/20 to-[#0891B2]/20 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-[#00D4FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Sent!</h3>
          </div>

          <p className="text-slate-600 dark:text-slate-300 text-sm mb-6">
            {getCompletionMessage(data.challenge)}
          </p>

          <div className="bg-slate-50 dark:bg-slate-800/30 rounded-lg p-4 mb-6">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
              Want to go deeper?
            </p>
            <a
              href="mailto:agents@sftwrks.com?subject=Time%20Value%20Calculator%20-%20Discovery%20Call"
              className="w-full flex items-center justify-center gap-2 bg-[#00D4FF] hover:bg-[#22D3EE] text-[#0A1628] font-semibold py-3 px-4 rounded-lg transition-colors text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              15-min Discovery Call — Free
            </a>
            <p className="text-[10px] text-slate-400 text-center mt-2">
              No pitch. Just clarity on whether we can help.
            </p>
          </div>

          <button
            onClick={reset}
            className="text-slate-400 hover:text-[#00D4FF] text-xs font-mono transition-colors text-left"
          >
            ← Calculate again
          </button>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end font-sans">
      {isOpen && (
        <div className="bg-white dark:bg-[#0F172A] shadow-2xl border border-slate-200 dark:border-slate-700 w-screen sm:w-[400px] max-w-full h-[100dvh] sm:h-auto sm:max-h-[calc(100vh-6rem)] sm:min-h-[600px] mb-0 sm:mb-4 flex flex-col overflow-hidden animate-fade-in-up rounded-none sm:rounded-xl fixed inset-0 sm:inset-auto sm:bottom-20 sm:right-0">
          {/* Header */}
          <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-[#0A1628] safe-area-inset-top">
            <div className="flex items-center gap-3">
              <img
                src="/assets/logos/softworks-icon.png"
                alt=""
                className="w-8 h-8 object-contain dark:invert dark:brightness-200 dark:contrast-90"
              />
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
            <p className="text-sm font-medium text-slate-900 dark:text-white">Losing hours to work that should run itself?</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">See what that's costing you</p>
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white dark:bg-[#1E3A5F] border-r border-b border-slate-200 dark:border-slate-700 transform rotate-45"></div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center ${
          isOpen
            ? 'hidden sm:flex bg-slate-200 dark:bg-slate-700'
            : 'bg-gradient-to-br from-slate-50 to-slate-100 dark:from-[#1E3A5F] dark:to-[#0F172A] hover:scale-105 ring-2 ring-[#00D4FF]/60 shadow-[0_0_20px_rgba(0,212,255,0.4)]'
        }`}
      >
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-[#00D4FF] animate-ping opacity-30"></span>
        )}
        {isOpen ? (
          <svg className="w-6 h-6 relative z-10 text-slate-600 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        ) : (
          <img
            src="/assets/logos/softworks-icon.png"
            alt="Open Calculator"
            className="w-9 h-9 relative z-10 object-contain dark:invert dark:brightness-200 dark:contrast-90"
          />
        )}
      </button>
    </div>
  );
};

export default Assistant;
