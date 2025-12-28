/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';

// Assessment questions - structured, not open-ended
const ASSESSMENT_STEPS = [
  {
    id: 1,
    question: "What best describes your business?",
    options: [
      { label: "Professional Services", value: "services", score: 3 },
      { label: "Retail / E-commerce", value: "retail", score: 3 },
      { label: "Healthcare / Medical", value: "healthcare", score: 4 },
      { label: "Finance / Insurance", value: "finance", score: 4 },
      { label: "Manufacturing / Logistics", value: "manufacturing", score: 3 },
      { label: "Other", value: "other", score: 2 }
    ]
  },
  {
    id: 2,
    question: "What's your biggest time sink right now?",
    options: [
      { label: "Admin & paperwork", value: "admin", score: 4 },
      { label: "Customer communication", value: "customer", score: 4 },
      { label: "Content & marketing", value: "content", score: 3 },
      { label: "Data entry & reporting", value: "data", score: 4 },
      { label: "Scheduling & coordination", value: "scheduling", score: 3 },
      { label: "Not sure yet", value: "unsure", score: 1 }
    ]
  },
  {
    id: 3,
    question: "Are you currently using any AI tools?",
    options: [
      { label: "Yes, actively", value: "active", score: 5 },
      { label: "Tried a few things", value: "tried", score: 3 },
      { label: "Just researching", value: "research", score: 2 },
      { label: "No, starting fresh", value: "fresh", score: 2 }
    ]
  },
  {
    id: 4,
    question: "What's your team size?",
    options: [
      { label: "Just me", value: "solo", score: 2 },
      { label: "2-10 people", value: "small", score: 3 },
      { label: "11-50 people", value: "medium", score: 4 },
      { label: "50+ people", value: "large", score: 5 }
    ]
  },
  {
    id: 5,
    question: "What would success look like in 6 months?",
    options: [
      { label: "Save 10+ hours/week", value: "time", score: 4 },
      { label: "Reduce costs significantly", value: "cost", score: 4 },
      { label: "Better customer experience", value: "cx", score: 4 },
      { label: "Scale without hiring", value: "scale", score: 5 },
      { label: "Just want to explore", value: "explore", score: 1 }
    ]
  }
];

// Tier classifications based on score
const getTier = (score: number) => {
  if (score >= 20) return { name: "AI Pioneer", color: "#00D4FF", description: "You're ready for advanced AI integration" };
  if (score >= 15) return { name: "AI Ready", color: "#22D3EE", description: "Strong foundation for AI adoption" };
  if (score >= 10) return { name: "AI Curious", color: "#94A3B8", description: "Good starting point for AI exploration" };
  return { name: "AI Explorer", color: "#64748B", description: "Let's find the right entry point for you" };
};

interface AssessmentAnswer {
  stepId: number;
  value: string;
  label: string;
  score: number;
}

const Assistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0); // 0 = intro, 1-5 = questions, 6 = results
  const [answers, setAnswers] = useState<AssessmentAnswer[]>([]);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = ASSESSMENT_STEPS.length;
  const totalScore = answers.reduce((sum, a) => sum + a.score, 0);
  const tier = getTier(totalScore);

  const handleOptionSelect = (option: { label: string; value: string; score: number }) => {
    const step = ASSESSMENT_STEPS[currentStep - 1];
    const newAnswer: AssessmentAnswer = {
      stepId: step.id,
      value: option.value,
      label: option.label,
      score: option.score
    };

    // Replace existing answer for this step or add new
    setAnswers(prev => {
      const filtered = prev.filter(a => a.stepId !== step.id);
      return [...filtered, newAnswer];
    });

    // Auto-advance after selection
    setTimeout(() => {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        setCurrentStep(totalSteps + 1); // Go to results
      }
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);

    // Prepare assessment data
    const assessmentSummary = answers.map(a => {
      const step = ASSESSMENT_STEPS.find(s => s.id === a.stepId);
      return `${step?.question}: ${a.label}`;
    }).join('\n');

    const subject = encodeURIComponent(`AI Assessment: ${tier.name} (Score: ${totalScore})`);
    const body = encodeURIComponent(`
New AI Readiness Assessment Submission

SCORE: ${totalScore}/25 - ${tier.name}
EMAIL: ${email}
PHONE: ${phone || 'Not provided'}
TIME: ${new Date().toISOString()}

RESPONSES:
${assessmentSummary}

---
Ready for personalized AI recommendation.
    `);

    // Open mailto
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
            5 quick questions to discover your AI potential. Get a personalized recommendation in under 2 minutes.
          </p>
          <button
            onClick={() => setCurrentStep(1)}
            className="bg-[#00D4FF] hover:bg-[#22D3EE] text-[#0A1628] font-semibold px-8 py-3 rounded-lg transition-colors text-sm uppercase tracking-wide"
          >
            Start Assessment
          </button>
          <p className="text-xs text-slate-400 mt-4">Free. No account required.</p>
        </div>
      );
    }

    // Results screen
    if (currentStep > totalSteps) {
      return (
        <div className="flex-1 flex flex-col px-5 py-6 overflow-y-auto">
          {!submitted ? (
            <>
              {/* Score Display */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-4 mb-4" style={{ borderColor: tier.color }}>
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">{totalScore}</span>
                </div>
                <h3 className="text-xl font-bold mb-1" style={{ color: tier.color }}>{tier.name}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">{tier.description}</p>
              </div>

              {/* Summary */}
              <div className="bg-slate-100 dark:bg-[#1E3A5F] rounded-lg p-4 mb-6">
                <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Your Profile</h4>
                <div className="space-y-2">
                  {answers.slice(0, 3).map(a => (
                    <div key={a.stepId} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]"></div>
                      {a.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Email Capture */}
              <div className="bg-gradient-to-br from-[#1E3A5F] to-[#0F172A] p-5 rounded-xl border border-[#00D4FF]/30">
                <h4 className="text-white font-semibold mb-2">Get Your Custom AI Roadmap</h4>
                <p className="text-slate-400 text-xs mb-4">We'll send a personalized recommendation based on your assessment.</p>

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
                    placeholder="Phone (optional)"
                    className="w-full bg-[#0F172A] border border-slate-600 focus:border-[#00D4FF] px-4 py-2.5 text-sm text-white placeholder-slate-500 rounded-lg outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting || !email.trim()}
                    className="w-full bg-[#00D4FF] hover:bg-[#22D3EE] text-[#0A1628] font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 text-sm"
                  >
                    {isSubmitting ? 'Sending...' : 'Get My Roadmap'}
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Assessment Submitted!</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
                Check your inbox for your personalized AI roadmap within 24-48 hours.
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
        <div className="bg-white dark:bg-[#0F172A] shadow-2xl border border-slate-200 dark:border-slate-700 w-[95vw] sm:w-[380px] h-[560px] mb-4 flex flex-col overflow-hidden animate-fade-in-up rounded-xl">
          {/* Header */}
          <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-[#0A1628]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00D4FF] to-[#0891B2] flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm">AI Assessment</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {currentStep === 0 ? 'Start here' : currentStep > totalSteps ? (submitted ? 'Complete' : 'Results') : `Question ${currentStep}/${totalSteps}`}
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

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center ${
          isOpen
            ? 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
            : 'bg-gradient-to-br from-[#00D4FF] to-[#0891B2] text-white hover:scale-105'
        }`}
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default Assistant;
