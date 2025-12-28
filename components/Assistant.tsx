/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { sendMessageToClaude, extractAssessmentContext } from '../services/claudeService';

const MAX_CONNECTION_ERRORS = 3;

const Assistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [connectionErrors, setConnectionErrors] = useState(0);
  const [sessionEnded, setSessionEnded] = useState(false);

  // Assessment capture state
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen, showEmailCapture]);

  useEffect(() => {
    if (isOpen && inputRef.current && !sessionEnded && !showEmailCapture) {
      inputRef.current.focus();
    }
  }, [isOpen, sessionEnded, showEmailCapture]);

  const endSession = (reason: 'connection' | 'scope') => {
    const finalMsg: ChatMessage = {
      role: 'model',
      text: reason === 'connection'
        ? "I'm having persistent connection issues. Please email agents@softworkstrading.com directly. Thanks for your patience!"
        : "For the best help with your specific situation, please email agents@softworkstrading.com. We'll get back to you promptly!",
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, finalMsg]);
    setSessionEnded(true);
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isThinking || sessionEnded || showEmailCapture) return;

    const userMsg: ChatMessage = { role: 'user', text: inputValue.trim(), timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsThinking(true);

    try {
      const history = messages.map(m => ({ role: m.role, text: m.text }));
      const response = await sendMessageToClaude(history, userMsg.text);

      // Check if it's a connection error
      const isConnectionError = response.text.includes("offline") ||
                                response.text.includes("trouble connecting") ||
                                response.text.includes("try again");

      if (isConnectionError) {
        const newErrorCount = connectionErrors + 1;
        setConnectionErrors(newErrorCount);

        if (newErrorCount >= MAX_CONNECTION_ERRORS) {
          const errorMsg: ChatMessage = { role: 'model', text: response.text, timestamp: Date.now() };
          setMessages(prev => [...prev, errorMsg]);
          setTimeout(() => endSession('connection'), 500);
          return;
        }
      } else {
        setConnectionErrors(0);
      }

      const aiMsg: ChatMessage = { role: 'model', text: response.text, timestamp: Date.now() };
      setMessages(prev => [...prev, aiMsg]);

      // Check if assessment is ready
      if (response.assessmentReady) {
        setTimeout(() => setShowEmailCapture(true), 1000);
      }

    } catch (error) {
      console.error(error);
      const newErrorCount = connectionErrors + 1;
      setConnectionErrors(newErrorCount);

      if (newErrorCount >= MAX_CONNECTION_ERRORS) {
        endSession('connection');
        return;
      }

      const errorMsg: ChatMessage = {
        role: 'model',
        text: `Connection issue (${newErrorCount}/${MAX_CONNECTION_ERRORS}). Please try again.`,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);

    // Extract conversation context
    const context = extractAssessmentContext(messages);

    // Prepare assessment data
    const assessmentData = {
      email: email.trim(),
      phone: phone.trim() || null,
      conversation: context.rawConversation,
      timestamp: new Date().toISOString(),
      source: 'website_chatbot'
    };

    try {
      // Send to email via mailto (fallback) or you can add a webhook here
      // For now, we'll create a mailto link with the data
      const subject = encodeURIComponent('New Assessment Request');
      const body = encodeURIComponent(`
New assessment request from website chatbot:

Email: ${assessmentData.email}
Phone: ${assessmentData.phone || 'Not provided'}
Time: ${assessmentData.timestamp}

Conversation:
${context.rawConversation.join('\n')}
      `);

      // Open mailto (this will be replaced with proper backend later)
      window.open(`mailto:agents@softworkstrading.com?subject=${subject}&body=${body}`, '_blank');

      setSubmitted(true);

      // Add confirmation message
      const confirmMsg: ChatMessage = {
        role: 'model',
        text: "Got it! We'll review your conversation and send you a personalized AI recommendation within 24-48 hours. Keep an eye on your inbox!",
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, confirmMsg]);

    } catch (error) {
      console.error('Failed to submit assessment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setConnectionErrors(0);
    setSessionEnded(false);
    setShowEmailCapture(false);
    setEmail('');
    setPhone('');
    setSubmitted(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {isOpen && (
        <div className="bg-white dark:bg-[#0F172A] shadow-2xl border border-slate-200 dark:border-slate-700 w-[95vw] sm:w-[420px] h-[600px] mb-4 flex flex-col overflow-hidden animate-fade-in-up rounded-xl">

          {/* Header */}
          <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-[#0A1628]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#1E3A5F] flex items-center justify-center overflow-hidden">
                <span className="text-[#00D4FF] font-bold text-sm">S</span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm">softworks</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {submitted ? (
                    <span className="text-green-500">Assessment submitted</span>
                  ) : sessionEnded ? (
                    <span className="text-amber-500">Session ended</span>
                  ) : (
                    <span>AI Assessment</span>
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={clearChat}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                title="New conversation"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6 bg-white dark:bg-[#0F172A]" ref={scrollRef}>
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center px-6">
                <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-[#1E3A5F] flex items-center justify-center mb-4 overflow-hidden">
                  <span className="text-[#00D4FF] font-bold text-lg">S</span>
                </div>
                <h4 className="text-slate-900 dark:text-white font-medium mb-2">Quick AI Assessment</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-[280px]">
                  Tell me about your AI goals. I'll put together a free, personalized recommendation.
                </p>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'model' && (
                  <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-[#1E3A5F] flex items-center justify-center mr-3 flex-shrink-0 mt-1 overflow-hidden">
                    <span className="text-[#00D4FF] font-bold text-xs">S</span>
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#00D4FF] text-white rounded-2xl rounded-br-md'
                      : 'bg-slate-100 dark:bg-[#1E3A5F] text-slate-800 dark:text-slate-200 rounded-2xl rounded-bl-md'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                </div>
              </div>
            ))}

            {isThinking && (
              <div className="flex justify-start">
                <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-[#1E3A5F] flex items-center justify-center mr-3 flex-shrink-0 overflow-hidden">
                  <span className="text-[#00D4FF] font-bold text-xs">S</span>
                </div>
                <div className="bg-slate-100 dark:bg-[#1E3A5F] px-4 py-3 rounded-2xl rounded-bl-md">
                  <div className="flex gap-1.5 items-center">
                    <div className="w-2 h-2 bg-[#00D4FF] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-[#00D4FF] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-[#00D4FF] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}

            {/* Email Capture Form */}
            {showEmailCapture && !submitted && (
              <div className="bg-gradient-to-br from-[#1E3A5F] to-[#0F172A] p-5 rounded-xl border border-[#00D4FF]/30">
                <h4 className="text-white font-medium mb-2">Get Your Free Assessment</h4>
                <p className="text-slate-400 text-sm mb-4">We'll send you a custom AI recommendation based on our chat.</p>

                <form onSubmit={handleEmailSubmit} className="space-y-3">
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
                    className="w-full bg-[#00D4FF] hover:bg-[#22D3EE] text-[#0A1628] font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending...' : 'Send My Assessment'}
                  </button>
                </form>

                <p className="text-slate-500 text-xs mt-3 text-center">
                  No spam. Just your personalized AI recommendation.
                </p>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-[#0A1628]">
            {sessionEnded || submitted ? (
              <div className="text-center py-2">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                  {submitted ? 'Assessment sent!' : 'Session ended'}
                </p>
                <button
                  onClick={clearChat}
                  className="text-sm text-[#00D4FF] hover:underline"
                >
                  Start new conversation
                </button>
              </div>
            ) : showEmailCapture ? (
              <p className="text-center text-sm text-slate-500 dark:text-slate-400 py-2">
                Fill out the form above to get your assessment
              </p>
            ) : (
              <div className="flex gap-3 items-end">
                <div className="flex-1 relative">
                  <textarea
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Tell me about your AI goals..."
                    rows={1}
                    className="w-full bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700 focus:border-[#00D4FF] dark:focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF]/20 px-4 py-3 text-sm outline-none transition-all placeholder-slate-400 text-slate-900 dark:text-white rounded-xl resize-none"
                    style={{ minHeight: '44px', maxHeight: '120px' }}
                  />
                </div>
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isThinking}
                  className="w-10 h-10 flex items-center justify-center bg-[#00D4FF] hover:bg-[#22D3EE] text-white rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#00D4FF] flex-shrink-0"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default Assistant;
