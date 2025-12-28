/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

const SOFTWORKS_SYSTEM_PROMPT = `You are the Softworks Assessment Assistant. Your job is to have a brief, focused conversation to understand a visitor's AI needs so we can help them.

## YOUR STYLE
- Concise: 1-3 sentences max per response
- Warm but efficient: Friendly, not robotic, but respect their time
- Curious: Ask one clear question at a time
- No fluff: Skip the corporate speak

## YOUR GOAL
Gather enough context in 3-5 exchanges to understand:
1. What they do (industry/role)
2. Their AI challenge or goal
3. What they've tried or considered
4. Timeline/urgency

## CONVERSATION FLOW

**Exchange 1:** Warm greeting + ask what brings them here
Example: "Hey! What's on your mind regarding AI?"

**Exchange 2-3:** Dig into their situation with follow-up questions
- "What industry are you in?"
- "What's the main thing you're hoping AI could help with?"
- "Have you tried any AI tools yet, or starting fresh?"

**Exchange 4-5:** Clarify and summarize
- "So you're looking to [summary]. Did I get that right?"

**After 4-5 good exchanges:** Signal readiness for next step
Include this EXACT phrase when appropriate: "ASSESSMENT_READY"
Then say something like: "I've got a good picture. We can put together a custom AI recommendation for your situation—free, no strings. Want me to send it to your email?"

## WHAT SOFTWORKS DOES (for context)
- AI Strategy: Figure out where AI actually helps your business
- Governance: Set up rules so AI works safely
- Integration: Connect AI to your existing tools
- Workflow Automation: Automate the repetitive stuff

## BOUNDARIES
- Stay focused on AI/business topics
- If they ask about pricing: "Depends on scope. We can cover that in the assessment."
- If way off topic: Gently redirect. "That's outside my zone—but back to your AI situation..."
- Emergencies: "Please contact emergency services. I'm just an AI assistant."

## REMEMBER
- One question at a time
- Short responses
- Build toward the assessment offer naturally
- Use "ASSESSMENT_READY" marker when you've gathered enough context`;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface AssessmentContext {
  industry?: string;
  role?: string;
  challenge?: string;
  currentTools?: string;
  timeline?: string;
  rawConversation: string[];
}

export const sendMessageToClaude = async (
  history: { role: string; text: string }[],
  newMessage: string
): Promise<{ text: string; assessmentReady: boolean }> => {
  try {
    // Try both variable names for flexibility
    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY ||
                   (typeof process !== 'undefined' && process.env?.ANTHROPIC_API_KEY);

    if (!apiKey) {
      return {
        text: "I'm currently offline. Please email agents@softworkstrading.com for assistance.",
        assessmentReady: false
      };
    }

    // Convert history to Claude format
    const messages: ChatMessage[] = history.map((h) => ({
      role: h.role === "user" ? "user" : "assistant",
      content: h.text,
    }));

    // Add the new message
    messages.push({ role: "user", content: newMessage });

    // Call Claude API via fetch (browser-compatible)
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true",
      },
      body: JSON.stringify({
        model: "claude-3-5-haiku-latest",
        max_tokens: 300,
        system: SOFTWORKS_SYSTEM_PROMPT,
        messages: messages,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Claude API Error:", error);
      return {
        text: "I'm having trouble connecting right now. Please email agents@softworkstrading.com or try again in a moment.",
        assessmentReady: false
      };
    }

    const data = await response.json();

    if (data.content && data.content[0] && data.content[0].text) {
      let responseText = data.content[0].text;
      const assessmentReady = responseText.includes("ASSESSMENT_READY");

      // Remove the marker from visible text
      responseText = responseText.replace("ASSESSMENT_READY", "").trim();

      return {
        text: responseText,
        assessmentReady
      };
    }

    return {
      text: "I couldn't process that. Please try again or email agents@softworkstrading.com.",
      assessmentReady: false
    };
  } catch (error) {
    console.error("Claude API Error:", error);
    return {
      text: "I'm having trouble connecting right now. Please email agents@softworkstrading.com or try again in a moment.",
      assessmentReady: false
    };
  }
};

// Extract context from conversation for the assessment
export const extractAssessmentContext = (messages: { role: string; text: string }[]): AssessmentContext => {
  const rawConversation = messages.map(m => `${m.role}: ${m.text}`);

  // Basic extraction - the human reviewer will do detailed analysis
  const userMessages = messages.filter(m => m.role === 'user').map(m => m.text.toLowerCase());
  const allUserText = userMessages.join(' ');

  return {
    industry: undefined, // Human will extract
    role: undefined,
    challenge: undefined,
    currentTools: undefined,
    timeline: undefined,
    rawConversation
  };
};
