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
const getTier = (score: number, answers: AssessmentAnswer[]) => {
  // Find key answers for personalized messaging
  const painPoint = answers.find(a => a.stepId === 2)?.label || "operations";
  const painPointValue = answers.find(a => a.stepId === 2)?.value || "admin";
  const goal = answers.find(a => a.stepId === 5)?.label || "efficiency";
  const experience = answers.find(a => a.stepId === 3)?.value || "tried";
  const industry = answers.find(a => a.stepId === 1)?.label || "your industry";
  const teamSize = answers.find(a => a.stepId === 4)?.label || "your team";

  // Get specific workflow suggestions based on pain point
  const workflowSuggestions: Record<string, string[]> = {
    admin: ["Document classification & routing", "Invoice processing automation", "Meeting notes & action items"],
    customer: ["24/7 AI chat support", "Email response drafting", "FAQ knowledge base"],
    content: ["Social media scheduling", "Blog post drafts", "Video script generation"],
    data: ["Report generation automation", "Data entry from documents", "Dashboard updates"]
  };

  const suggestions = workflowSuggestions[painPointValue] || workflowSuggestions.admin;

  if (score >= 18) return {
    name: "AI Pioneer",
    color: "#00D4FF",
    description: "High readiness for advanced AI integration",
    headline: "You're ready for autonomous AI workflows",
    recommendation: `Your ${industry.toLowerCase()} experience combined with daily AI usage positions you perfectly for advanced automation. You can move beyond simple chatbots to AI agents that handle end-to-end workflows autonomously.`,
    keyInsight: `Focus on "${painPoint.toLowerCase()}" automation first—this is where ${industry.toLowerCase()} businesses see 60-80% time savings within 90 days.`,
    opportunities: suggestions,
    nextStep: "Get Your 90-Day Implementation Plan",
    ctaSubtext: "Detailed workflow mapping + ROI projections for your specific situation"
  };
  if (score >= 13) return {
    name: "AI Ready",
    color: "#22D3EE",
    description: "Strong foundation for AI adoption",
    headline: "Strong foundation—time to build on it",
    recommendation: `With ${teamSize.toLowerCase()} and a clear goal to "${goal.toLowerCase()}", you're in the sweet spot for AI implementation. Your team size means changes can move fast without enterprise bureaucracy.`,
    keyInsight: `The ${painPoint.toLowerCase()} bottleneck you identified is solvable—similar businesses typically automate 40-60% of this work within the first month.`,
    opportunities: suggestions,
    nextStep: "Get Your Implementation Roadmap",
    ctaSubtext: "Step-by-step guide tailored to your workflow priorities"
  };
  if (score >= 8) return {
    name: "AI Curious",
    color: "#94A3B8",
    description: "Good starting point for exploration",
    headline: "Good instincts—let's channel them",
    recommendation: `Starting with "${painPoint.toLowerCase()}" is smart—it's where most ${industry.toLowerCase()} businesses see their first quick wins. You don't need to transform everything at once.`,
    keyInsight: `With limited AI experience, the key is starting small: one workflow, one tool, visible results in weeks. That builds momentum for bigger changes.`,
    opportunities: suggestions,
    nextStep: "Get Your Quick-Win Starter Guide",
    ctaSubtext: "Low-risk first projects matched to your specific situation"
  };
  return {
    name: "AI Explorer",
    color: "#64748B",
    description: "Early in your AI journey",
    headline: "Everyone starts somewhere",
    recommendation: `The ${painPoint.toLowerCase()} challenges you mentioned are exactly where AI shines—even without technical experience. Modern tools are designed for business users, not developers.`,
    keyInsight: `Small teams like yours actually adapt faster to AI than enterprises. No committees, no bureaucracy—you can test something this week and see if it works.`,
    opportunities: suggestions,
    nextStep: "Book Your Intro Consultation",
    ctaSubtext: "15-minute call to identify your best first project"
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
  const [submissionMethod, setSubmissionMethod] = useState<'webhook' | 'mailto' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [promptDismissed, setPromptDismissed] = useState(false);
  const [otherText, setOtherText] = useState('');
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [loadingInsight, setLoadingInsight] = useState(false);
  const [showDetailedResults, setShowDetailedResults] = useState(false);
  const [validatingInput, setValidatingInput] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState(''); // Anti-spam honeypot field

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
    setValidationError(null);
  }, [currentStep]);

  // Validate custom input via serverless proxy
  const validateCustomInput = async (input: string, question: string): Promise<{ valid: boolean; message?: string }> => {
    try {
      const response = await fetch('/api/anthropic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'validate',
          input,
          question
        })
      });

      if (response.ok) {
        const data = await response.json();
        const result = (data.result || '').trim();

        if (result.startsWith('VALID')) {
          return { valid: true };
        } else if (result.startsWith('INVALID:')) {
          return { valid: false, message: result.replace('INVALID:', '').trim() };
        }
        return { valid: true };
      }

      // Rate limited or server error - allow input to not block user
      if (response.status === 429) {
        console.warn('Rate limited - allowing input');
        return { valid: true };
      }
    } catch (error) {
      console.error('Validation error:', error);
    }

    // On error, allow the input
    return { valid: true };
  };

  const totalSteps = ASSESSMENT_STEPS.length;
  const totalScore = answers.reduce((sum, a) => sum + a.score, 0);
  const maxScore = ASSESSMENT_STEPS.reduce((sum, step) => sum + Math.max(...step.options.map(o => o.score)), 0);
  const tier = getTier(totalScore, answers);

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

  const handleOtherSubmit = async () => {
    if (!otherText.trim()) return;

    const step = ASSESSMENT_STEPS[currentStep - 1];

    // Validate the custom input with Haiku
    setValidatingInput(true);
    setValidationError(null);

    const validation = await validateCustomInput(otherText.trim(), step.question);

    setValidatingInput(false);

    if (!validation.valid) {
      setValidationError(validation.message || "Please enter a relevant response to the question.");
      return;
    }

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
    setValidationError(null);

    setTimeout(() => {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        setCurrentStep(totalSteps + 1);
      }
    }, 300);
  };

  const generateAIInsight = async () => {
    setLoadingInsight(true);

    const customAnswers = answers.filter(a => a.isCustom);

    const contextSummary = answers.map(a => {
      const step = ASSESSMENT_STEPS.find(s => s.id === a.stepId);
      return `${step?.question}: ${a.label}${a.isCustom ? ' (custom response)' : ''}`;
    }).join('\n');

    try {
      const response = await fetch('/api/anthropic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'insight',
          assessmentData: {
            score: totalScore,
            tier: tier.name,
            contextSummary,
            hasCustomAnswers: customAnswers.length > 0
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        setAiInsight(data.result || tier.recommendation);
      } else {
        setAiInsight(tier.recommendation);
      }
    } catch {
      setAiInsight(tier.recommendation);
    }

    setLoadingInsight(false);
  };

  // Send assessment to n8n webhook for persistent storage and automation
  const sendToWebhook = async (payload: {
    source: string;
    timestamp: string;
    score: number;
    tier: string;
    email: string;
    phone?: string;
    responses: Array<{ question: string; answer: string; isCustom: boolean }>;
    aiInsight?: string;
  }) => {
    const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;

    if (!webhookUrl) {
      console.warn('No webhook URL configured - skipping webhook submission');
      return { success: false, error: 'No webhook URL' };
    }

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Assessment submitted to n8n:', data);
        return { success: true, data };
      } else {
        console.error('Webhook submission failed:', response.status);
        return { success: false, error: `HTTP ${response.status}` };
      }
    } catch (error) {
      console.error('Webhook submission error:', error);
      return { success: false, error: String(error) };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    // Honeypot check - if filled, silently "succeed" without submitting
    if (honeypot) {
      console.warn('Honeypot triggered - blocking spam submission');
      setSubmitted(true);
      setSubmissionMethod('webhook'); // Fake success
      return;
    }

    setIsSubmitting(true);

    // Build structured payload for webhook
    const webhookPayload = {
      source: 'website_assessment',
      timestamp: new Date().toISOString(),
      score: totalScore,
      tier: tier.name,
      email: email.trim(),
      phone: phone.trim() || undefined,
      responses: answers.map(a => {
        const step = ASSESSMENT_STEPS.find(s => s.id === a.stepId);
        return {
          question: step?.question || `Step ${a.stepId}`,
          answer: a.label,
          isCustom: a.isCustom
        };
      }),
      aiInsight: aiInsight || undefined
    };

    // Try n8n webhook first (primary method)
    const webhookResult = await sendToWebhook(webhookPayload);

    if (webhookResult.success) {
      // Webhook succeeded - no need for mailto fallback
      console.log('Assessment submitted via n8n:', webhookResult.data);
      setSubmissionMethod('webhook');
      setSubmitted(true);
      setIsSubmitting(false);
      return;
    }

    // Fallback: Only use mailto if webhook fails
    console.warn('Webhook failed, falling back to mailto:', webhookResult.error);
    setSubmissionMethod('mailto');
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

    window.open(`mailto:agents@sftwrks.com?subject=${subject}&body=${body}`, '_blank');

    setSubmitted(true);
    setIsSubmitting(false);
  };

  const resetAssessment = () => {
    setCurrentStep(0);
    setAnswers([]);
    setEmail('');
    setPhone('');
    setHoneypot('');
    setSubmitted(false);
    setSubmissionMethod(null);
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
      const tierData = tier as {
        name: string;
        color: string;
        description: string;
        headline: string;
        recommendation: string;
        keyInsight: string;
        opportunities: string[];
        nextStep: string;
        ctaSubtext: string;
      };

      return (
        <div className="flex-1 flex flex-col px-5 py-6 pb-safe overflow-y-auto" style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}>
          {!showDetailedResults ? (
            <>
              {/* Score Display with Context */}
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-4 mb-2 relative" style={{ borderColor: tierData.color }}>
                  <span className="text-xl font-bold text-slate-900 dark:text-white">{totalScore}</span>
                  <span className="absolute -bottom-1 text-[10px] text-slate-400">/{maxScore}</span>
                </div>
                <h3 className="text-lg font-bold mb-1" style={{ color: tierData.color }}>{tierData.name}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs">{tierData.description}</p>
              </div>

              {/* Headline Insight */}
              <div className="bg-gradient-to-r from-[#00D4FF]/10 to-transparent border-l-2 border-[#00D4FF] pl-3 py-2 mb-4">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{tierData.headline}</p>
              </div>

              {/* Visual Score Breakdown with Labels */}
              <div className="bg-slate-50 dark:bg-[#0A1628] rounded-lg p-3 mb-3">
                <h4 className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Your Profile</h4>
                <div className="space-y-1.5">
                  {answers.map(a => {
                    const step = ASSESSMENT_STEPS.find(s => s.id === a.stepId);
                    const maxStepScore = step ? Math.max(...step.options.map(o => o.score)) : 5;
                    const percentage = (a.score / maxStepScore) * 100;
                    const categoryLabels: Record<number, string> = {
                      1: 'Industry',
                      2: 'Pain Point',
                      3: 'Experience',
                      4: 'Team Size',
                      5: 'Goal'
                    };
                    return (
                      <div key={a.stepId} className="flex items-center gap-2">
                        <span className="text-[9px] text-slate-400 w-14 shrink-0">{categoryLabels[a.stepId]}</span>
                        <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{ width: `${percentage}%`, backgroundColor: tierData.color }}
                          />
                        </div>
                        <span className="text-[9px] text-slate-500 dark:text-slate-400 w-20 truncate text-right">{a.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Personalized Analysis */}
              <div className="bg-slate-100 dark:bg-[#1E3A5F] rounded-lg p-3 mb-3">
                <h4 className="text-[10px] font-semibold text-[#00D4FF] uppercase tracking-wider mb-1.5">Analysis</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-2">{tierData.recommendation}</p>
                <div className="bg-slate-200/50 dark:bg-[#0A1628]/50 rounded p-2">
                  <p className="text-[11px] text-slate-700 dark:text-slate-300 italic">"{tierData.keyInsight}"</p>
                </div>
              </div>

              {/* Opportunity Areas */}
              <div className="mb-3">
                <h4 className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Quick Win Opportunities</h4>
                <div className="flex flex-wrap gap-1.5">
                  {tierData.opportunities.map((opp, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 text-[10px] bg-[#00D4FF]/10 text-[#00D4FF] px-2 py-1 rounded-full">
                      <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                      {opp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Prominent CTA for Full Report */}
              <div className="bg-gradient-to-br from-[#1E3A5F] to-[#0F172A] p-4 rounded-xl border border-[#00D4FF]/30 relative overflow-hidden mb-6 sm:mb-0">
                <div className="absolute top-0 right-0 bg-[#00D4FF] text-[#0A1628] text-[9px] font-bold px-2 py-0.5 rounded-bl">
                  FREE
                </div>
                <h4 className="text-white font-semibold text-sm mb-1">
                  Ready for the Full Picture?
                </h4>
                <p className="text-slate-400 text-[11px] mb-3">
                  {tierData.ctaSubtext}
                </p>
                <button
                  onClick={() => {
                    setShowDetailedResults(true);
                    generateAIInsight();
                  }}
                  className="w-full bg-[#00D4FF] hover:bg-[#22D3EE] text-[#0A1628] font-bold py-3 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
                >
                  {tierData.nextStep}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>

              <button
                onClick={resetAssessment}
                className="mt-2 text-[10px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 text-center"
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
              <div className="bg-gradient-to-br from-[#1E3A5F] to-[#0F172A] p-5 rounded-xl border border-[#00D4FF]/30 mb-6 sm:mb-0">
                <h4 className="text-white font-semibold mb-2">Send Me the Full Report</h4>
                <p className="text-slate-400 text-xs mb-4">Get your complete analysis + actionable next steps delivered to your inbox.</p>

                <form onSubmit={handleSubmit} className="space-y-3">
                  {/* Honeypot field - hidden from users, catches bots */}
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
            <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
              {submissionMethod === 'webhook' ? (
                <>
                  {/* Success via n8n webhook */}
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00D4FF]/20 to-[#0891B2]/20 flex items-center justify-center mb-6">
                    <svg className="w-10 h-10 text-[#00D4FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Sent!</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 max-w-[280px]">
                    Your assessment has been received. We'll send your personalized AI roadmap within 24 hours.
                  </p>

                  {/* Next Steps */}
                  <div className="w-full space-y-3 mb-8">
                    <a
                      href="mailto:agents@sftwrks.com?subject=Schedule%20AI%20Strategy%20Call"
                      className="w-full flex items-center justify-center gap-2 bg-[#00D4FF] hover:bg-[#22D3EE] text-[#0A1628] font-semibold py-3 px-4 rounded-lg transition-colors text-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Schedule Strategy Call
                    </a>
                  </div>
                </>
              ) : (
                <>
                  {/* Fallback via mailto */}
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center mb-6">
                    <svg className="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Almost There!</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 max-w-[280px]">
                    Please send the email that just opened to complete your submission.
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mb-8 max-w-[280px]">
                    Email not open? Click below to try again.
                  </p>

                  {/* Retry email */}
                  <div className="w-full space-y-3 mb-8">
                    <a
                      href={`mailto:agents@sftwrks.com?subject=${encodeURIComponent(`AI Assessment: ${tier.name} (Score: ${totalScore})`)}`}
                      className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Open Email Again
                    </a>
                  </div>
                </>
              )}

              <button
                onClick={resetAssessment}
                className="text-slate-400 hover:text-[#00D4FF] text-xs font-mono transition-colors"
              >
                Retake quick assessment
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
            <div className={`border rounded-lg p-3 ${validationError ? 'border-red-400 bg-red-50 dark:bg-red-900/20' : 'border-[#00D4FF] bg-[#00D4FF]/5'}`}>
              <input
                type="text"
                value={otherText}
                onChange={(e) => {
                  setOtherText(e.target.value);
                  setValidationError(null); // Clear error when typing
                }}
                placeholder={step.placeholder}
                className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none mb-2"
                autoFocus
                disabled={validatingInput}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && otherText.trim() && !validatingInput) {
                    handleOtherSubmit();
                  }
                }}
              />
              {/* Validation Error */}
              {validationError && (
                <p className="text-xs text-red-500 dark:text-red-400 mb-2 flex items-start gap-1">
                  <svg className="w-3 h-3 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                  </svg>
                  {validationError}
                </p>
              )}
              <div className="flex gap-2">
                <button
                  onClick={handleOtherSubmit}
                  disabled={!otherText.trim() || validatingInput}
                  className="flex-1 bg-[#00D4FF] text-[#0A1628] py-2 rounded text-xs font-semibold disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                >
                  {validatingInput ? (
                    <>
                      <div className="w-3 h-3 border-2 border-[#0A1628] border-t-transparent rounded-full animate-spin"></div>
                      Checking...
                    </>
                  ) : (
                    'Continue'
                  )}
                </button>
                <button
                  onClick={() => {
                    setShowOtherInput(false);
                    setOtherText('');
                    setValidationError(null);
                  }}
                  disabled={validatingInput}
                  className="px-3 py-2 text-slate-400 hover:text-slate-600 text-xs disabled:opacity-50"
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
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end font-sans">
      {isOpen && (
        <div className="bg-white dark:bg-[#0F172A] shadow-2xl border border-slate-200 dark:border-slate-700 w-full sm:w-[400px] h-[100dvh] sm:h-auto sm:max-h-[calc(100vh-6rem)] sm:min-h-[600px] mb-0 sm:mb-4 flex flex-col overflow-hidden animate-fade-in-up rounded-none sm:rounded-xl fixed inset-0 sm:inset-auto sm:bottom-20 sm:right-0">
          {/* Header */}
          <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-[#0A1628] safe-area-inset-top">
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
              className="p-2.5 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700"
              aria-label="Close assessment"
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
            <p className="text-sm font-medium text-slate-900 dark:text-white">AI Readiness Check</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">2 min assessment</p>
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white dark:bg-[#1E3A5F] border-r border-b border-slate-200 dark:border-slate-700 transform rotate-45"></div>
          </div>
        </div>
      )}

      {/* Toggle Button - Hidden on mobile when open */}
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default Assistant;
