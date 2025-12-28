/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';

// Assessment questions with limited options + Other
const ASSESSMENT_STEPS = [
  {
    id: 1,
    question: "What best describes your business?",
    placeholder: "e.g., SaaS startup, law firm, restaurant chain...",
    options: [
      { label: "Professional Services", value: "services", score: 3 },
      { label: "Retail / E-commerce", value: "retail", score: 3 },
      { label: "Healthcare / Finance", value: "regulated", score: 4 },
      { label: "Manufacturing / Logistics", value: "manufacturing", score: 3 }
    ]
  },
  {
    id: 2,
    question: "What's eating up most of your time?",
    placeholder: "e.g., chasing invoices, answering same questions...",
    options: [
      { label: "Admin & paperwork", value: "admin", score: 4 },
      { label: "Customer communication", value: "customer", score: 4 },
      { label: "Content & marketing", value: "content", score: 3 },
      { label: "Data entry & reporting", value: "data", score: 4 }
    ]
  },
  {
    id: 3,
    question: "What's your current AI experience?",
    placeholder: "e.g., played with ChatGPT, built custom GPTs...",
    options: [
      { label: "Using AI daily", value: "active", score: 5 },
      { label: "Experimented a bit", value: "tried", score: 3 },
      { label: "Just getting started", value: "fresh", score: 2 }
    ]
  },
  {
    id: 4,
    question: "How big is your team?",
    placeholder: "e.g., 5 full-time + contractors...",
    options: [
      { label: "Solo / 1-2 people", value: "solo", score: 2 },
      { label: "3-15 people", value: "small", score: 3 },
      { label: "16-50 people", value: "medium", score: 4 },
      { label: "50+ people", value: "large", score: 5 }
    ]
  },
  {
    id: 5,
    question: "What would winning look like in 6 months?",
    placeholder: "e.g., handle 3x volume without hiring...",
    options: [
      { label: "Save 10+ hours/week", value: "time", score: 4 },
      { label: "Cut costs significantly", value: "cost", score: 4 },
      { label: "Better customer experience", value: "cx", score: 4 },
      { label: "Scale without hiring", value: "scale", score: 5 }
    ]
  }
];

// Tier classifications based on score
const getTier = (score: number) => {
  if (score >= 18) return {
    name: "AI Pioneer",
    color: "#00D4FF",
    description: "You're positioned for advanced AI integration",
    recommendation: "You're ready for autonomous agents and workflow automation. Let's talk about what's possible."
  };
  if (score >= 13) return {
    name: "AI Ready",
    color: "#22D3EE",
    description: "Strong foundation for AI adoption",
    recommendation: "Start with high-impact automations in your biggest time sinks, then expand."
  };
  if (score >= 8) return {
    name: "AI Curious",
    color: "#94A3B8",
    description: "Good starting point for exploration",
    recommendation: "Begin with simple AI tools for your most repetitive tasks. Build confidence first."
  };
  return {
    name: "AI Explorer",
    color: "#64748B",
    description: "Early in your AI journey",
    recommendation: "Let's identify one specific process where AI could save you time immediately."
  };
};

interface AssessmentAnswer {
  stepId: number;
  value: string;
  label: string;
  score: number;
  isCustom: boolean;
  customText?: string;
}

interface AssistantProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const Assistant: React.FC<AssistantProps> = ({ isOpen: controlledIsOpen, onOpenChange }) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);

  // Use controlled or uncontrolled state
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = (open: boolean) => {
    if (onOpenChange) {
      onOpenChange(open);
    } else {
      setInternalIsOpen(open);
    }
  };
  const [currentStep, setCurrentStep] = useState(0); // 0 = intro, 1-5 = questions, 6 = results
  const [answers, setAnswers] = useState<AssessmentAnswer[]>([]);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [promptDismissed, setPromptDismissed] = useState(false);
  const [otherText, setOtherText] = useState('');
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [loadingInsight, setLoadingInsight] = useState(false);
  const [showDetailedResults, setShowDetailedResults] = useState(false);

  // Show prompt after 3 seconds if not opened
  React.useEffect(() => {
    if (!isOpen && !promptDismissed) {
      const timer = setTimeout(() => setShowPrompt(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, promptDismissed]);

  // Hide prompt when opened
  React.useEffect(() => {
    if (isOpen) {
      setShowPrompt(false);
      setPromptDismissed(true);
    }
  }, [isOpen]);

  // Reset other input when step changes
  React.useEffect(() => {
    setShowOtherInput(false);
    setOtherText('');
  }, [currentStep]);

  const totalSteps = ASSESSMENT_STEPS.length;
  const totalScore = answers.reduce((sum, a) => sum + a.score, 0);
  const tier = getTier(totalScore);

  const handleOptionSelect = (option: { label: string; value: string; score: number }) => {
    const step = ASSESSMENT_STEPS[currentStep - 1];
    const newAnswer: AssessmentAnswer = {
      stepId: step.id,
      value: option.value,
      label: option.label,
      score: option.score,
      isCustom: false
    };

    setAnswers(prev => {
      const filtered = prev.filter(a => a.stepId !== step.id);
      return [...filtered, newAnswer];
    });

    // Auto-advance after selection
    setTimeout(() => {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        setCurrentStep(totalSteps + 1);
      }
    }, 300);
  };

  const handleOtherSubmit = () => {
    if (!otherText.trim()) return;

    const step = ASSESSMENT_STEPS[currentStep - 1];
    const newAnswer: AssessmentAnswer = {
      stepId: step.id,
      value: 'other',
      label: otherText.trim(),
      score: 3, // Neutral score for custom answers
      isCustom: true,
      customText: otherText.trim()
    };

    setAnswers(prev => {
      const filtered = prev.filter(a => a.stepId !== step.id);
      return [...filtered, newAnswer];
    });

    setOtherText('');
    setShowOtherInput(false);

    setTimeout(() => {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        setCurrentStep(totalSteps + 1);
      }
    }, 300);
  };

  const generateAIInsight = async () => {
    const apiKey = (typeof process !== 'undefined' && process.env?.ANTHROPIC_API_KEY) || '';

    if (!apiKey) {
      setAiInsight("Connect with us to get your personalized AI strategy based on your specific situation.");
      return;
    }

    setLoadingInsight(true);

    const customAnswers = answers.filter(a => a.isCustom);
    const standardAnswers = answers.filter(a => !a.isCustom);

    const contextSummary = answers.map(a => {
      const step = ASSESSMENT_STEPS.find(s => s.id === a.stepId);
      return `${step?.question}: ${a.label}${a.isCustom ? ' (custom response)' : ''}`;
    }).join('\n');

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
          model: 'claude-3-haiku-20240307',
          max_tokens: 300,
          messages: [{
            role: 'user',
            content: `You are an AI consultant for Softworks Trading Company. Based on this assessment, provide ONE specific, actionable AI recommendation in 2-3 sentences. Be direct and practical.

Assessment Results (Score: ${totalScore}/25 - ${tier.name}):
${contextSummary}

${customAnswers.length > 0 ? `Note: They provided custom answers showing specific context about their situation.` : ''}

Give a brief, specific recommendation for their biggest opportunity with AI. No fluff.`
          }]
        })
      });

      if (response.ok) {
        const data = await response.json();
        setAiInsight(data.content[0].text);
      } else {
        setAiInsight(tier.recommendation);
      }
    } catch {
      setAiInsight(tier.recommendation);
    }

    setLoadingInsight(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);

    const customAnswers = answers.filter(a => a.isCustom);
    const assessmentSummary = answers.map(a => {
      const step = ASSESSMENT_STEPS.find(s => s.id === a.stepId);
      return `${step?.question}: ${a.label}${a.isCustom ? ' (custom)' : ''}`;
    }).join('\n');

    const subject = encodeURIComponent(`AI Assessment: ${tier.name} (Score: ${totalScore})`);
    const body = encodeURIComponent(`
New AI Readiness Assessment Submission

SCORE: ${totalScore}/25 - ${tier.name}
EMAIL: ${email}
PHONE: ${phone || 'Not provided'}
TIME: ${new Date().toISOString()}
CUSTOM ANSWERS: ${customAnswers.length}

RESPONSES:
${assessmentSummary}

${aiInsight ? `AI INSIGHT GENERATED:\n${aiInsight}` : ''}

---
Ready for follow-up consultation.
    `);

    window.open(`mailto:agents@softworkstrading.com?subject=${subject}&body=${body}`, '_blank');

    setSubmitted(true);
    setIsSubmitting(false);
  };

  const resetAssessment = () => {
    setCurrentStep(0);
    setAnswers([]);
    setEmail('');
    setPhone('');
    setSubmitted(false);
    setAiInsight(null);
    setShowDetailedResults(false);
  };

  const renderContent = () => {
    // Intro screen
    if (currentStep === 0) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00D4FF] to-[#0891B2] flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
            AI Readiness Assessment
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 max-w-[280px]">
            5 quick questions to discover your AI potential. Get instant results—detailed insights available on request.
          </p>
          <button
            onClick={() => setCurrentStep(1)}
            className="bg-[#00D4FF] hover:bg-[#22D3EE] text-[#0A1628] font-semibold px-8 py-3 rounded-lg transition-colors text-sm uppercase tracking-wide"
          >
            Start Assessment
          </button>
          <p className="text-xs text-slate-400 mt-4">Free. Takes 2 minutes.</p>
        </div>
      );
    }

    // Results screen
    if (currentStep > totalSteps) {
      const hasCustomAnswers = answers.some(a => a.isCustom);

      return (
        <div className="flex-1 flex flex-col px-5 py-6 overflow-y-auto">
          {!showDetailedResults ? (
            <>
              {/* Basic Score Display */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-4 mb-4" style={{ borderColor: tier.color }}>
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">{totalScore}</span>
                </div>
                <h3 className="text-xl font-bold mb-1" style={{ color: tier.color }}>{tier.name}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">{tier.description}</p>
              </div>

              {/* Quick Summary */}
              <div className="bg-slate-100 dark:bg-[#1E3A5F] rounded-lg p-4 mb-6">
                <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Quick Take</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">{tier.recommendation}</p>
              </div>

              {/* CTA for detailed results */}
              <div className="bg-gradient-to-br from-[#1E3A5F] to-[#0F172A] p-5 rounded-xl border border-[#00D4FF]/30">
                <h4 className="text-white font-semibold mb-2">
                  {hasCustomAnswers ? 'Get Personalized Analysis' : 'Get Your AI Roadmap'}
                </h4>
                <p className="text-slate-400 text-xs mb-4">
                  {hasCustomAnswers
                    ? "You shared specific details—let us analyze your situation and send tailored recommendations."
                    : "Leave your email to receive a detailed breakdown and next steps."}
                </p>
                <button
                  onClick={() => {
                    setShowDetailedResults(true);
                    if (hasCustomAnswers) {
                      generateAIInsight();
                    }
                  }}
                  className="w-full bg-[#00D4FF] hover:bg-[#22D3EE] text-[#0A1628] font-semibold py-3 rounded-lg transition-colors text-sm"
                >
                  Get Detailed Results →
                </button>
              </div>

              <button
                onClick={resetAssessment}
                className="mt-4 text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 text-center"
              >
                Retake assessment
              </button>
            </>
          ) : !submitted ? (
            <>
              {/* Detailed Results with AI Insight */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center" style={{ borderColor: tier.color }}>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{totalScore}</span>
                  </div>
                  <div>
                    <h3 className="font-bold" style={{ color: tier.color }}>{tier.name}</h3>
                    <p className="text-xs text-slate-500">{tier.description}</p>
                  </div>
                </div>

                {/* AI Insight */}
                {loadingInsight ? (
                  <div className="bg-slate-100 dark:bg-[#1E3A5F] rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <div className="w-4 h-4 border-2 border-[#00D4FF] border-t-transparent rounded-full animate-spin"></div>
                      Analyzing your responses...
                    </div>
                  </div>
                ) : aiInsight ? (
                  <div className="bg-slate-100 dark:bg-[#1E3A5F] rounded-lg p-4 mb-4">
                    <h4 className="text-xs font-semibold text-[#00D4FF] uppercase tracking-wider mb-2">AI Analysis</h4>
                    <p className="text-sm text-slate-700 dark:text-slate-300">{aiInsight}</p>
                  </div>
                ) : null}

                {/* Response Summary */}
                <div className="bg-slate-50 dark:bg-[#0A1628] rounded-lg p-4">
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Your Responses</h4>
                  <div className="space-y-2">
                    {answers.map(a => (
                      <div key={a.stepId} className="flex items-start gap-2 text-xs">
                        <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${a.isCustom ? 'bg-[#00D4FF]' : 'bg-slate-400'}`}></div>
                        <span className={`${a.isCustom ? 'text-slate-700 dark:text-slate-300' : 'text-slate-500 dark:text-slate-400'}`}>
                          {a.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Email Capture for Full Report */}
              <div className="bg-gradient-to-br from-[#1E3A5F] to-[#0F172A] p-5 rounded-xl border border-[#00D4FF]/30">
                <h4 className="text-white font-semibold mb-2">Send Me the Full Report</h4>
                <p className="text-slate-400 text-xs mb-4">Get your complete analysis + actionable next steps delivered to your inbox.</p>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email *"
                    required
                    className="w-full bg-[#0F172A] border border-slate-600 focus:border-[#00D4FF] px-4 py-2.5 text-sm text-white placeholder-slate-500 rounded-lg outline-none transition-colors"
                  />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone (for scheduling call)"
                    className="w-full bg-[#0F172A] border border-slate-600 focus:border-[#00D4FF] px-4 py-2.5 text-sm text-white placeholder-slate-500 rounded-lg outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting || !email.trim()}
                    className="w-full bg-[#00D4FF] hover:bg-[#22D3EE] text-[#0A1628] font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 text-sm"
                  >
                    {isSubmitting ? 'Sending...' : 'Send My Report'}
                  </button>
                </form>
              </div>

              <button
                onClick={() => setShowDetailedResults(false)}
                className="mt-4 text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                ← Back to results
              </button>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">You're All Set!</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
                Your personalized AI roadmap will arrive within 24 hours.
              </p>
              <button
                onClick={resetAssessment}
                className="text-[#00D4FF] hover:underline text-sm"
              >
                Take another assessment
              </button>
            </div>
          )}
        </div>
      );
    }

    // Question screens
    const step = ASSESSMENT_STEPS[currentStep - 1];
    return (
      <div className="flex-1 flex flex-col px-5 py-6">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-xs text-slate-500">{Math.round((currentStep / totalSteps) * 100)}%</span>
          </div>
          <div className="h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#00D4FF] transition-all duration-500"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
          {step.question}
        </h3>

        {/* Options */}
        <div className="space-y-3 flex-1">
          {step.options.map((option) => {
            const isSelected = answers.find(a => a.stepId === step.id)?.value === option.value;
            return (
              <button
                key={option.value}
                onClick={() => handleOptionSelect(option)}
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

          {/* Other Option */}
          {!showOtherInput ? (
            <button
              onClick={() => setShowOtherInput(true)}
              className="w-full text-left px-4 py-3.5 rounded-lg border border-dashed border-slate-300 dark:border-slate-600 hover:border-[#00D4FF]/50 text-slate-500 dark:text-slate-400 transition-all"
            >
              <span className="text-sm">Something else...</span>
            </button>
          ) : (
            <div className="border border-[#00D4FF] rounded-lg p-3 bg-[#00D4FF]/5">
              <input
                type="text"
                value={otherText}
                onChange={(e) => setOtherText(e.target.value)}
                placeholder={step.placeholder}
                className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none mb-2"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && otherText.trim()) {
                    handleOtherSubmit();
                  }
                }}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleOtherSubmit}
                  disabled={!otherText.trim()}
                  className="flex-1 bg-[#00D4FF] text-[#0A1628] py-2 rounded text-xs font-semibold disabled:opacity-50 transition-colors"
                >
                  Continue
                </button>
                <button
                  onClick={() => {
                    setShowOtherInput(false);
                    setOtherText('');
                  }}
                  className="px-3 py-2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Back button */}
        {currentStep > 1 && (
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            className="mt-4 text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
          >
            ← Back
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {isOpen && (
        <div className="bg-white dark:bg-[#0F172A] shadow-2xl border border-slate-200 dark:border-slate-700 w-[95vw] sm:w-[380px] h-[580px] mb-4 flex flex-col overflow-hidden animate-fade-in-up rounded-xl">
          {/* Header */}
          <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-[#0A1628]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00D4FF] to-[#0891B2] flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm">AI Assessment</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {currentStep === 0 ? 'Start here' : currentStep > totalSteps ? (submitted ? 'Complete' : showDetailedResults ? 'Details' : 'Results') : `Question ${currentStep}/${totalSteps}`}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
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
            <p className="text-sm font-medium text-slate-900 dark:text-white">AI Readiness Check</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">2 min assessment</p>
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white dark:bg-[#1E3A5F] border-r border-b border-slate-200 dark:border-slate-700 transform rotate-45"></div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center ${
          isOpen
            ? 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default Assistant;
