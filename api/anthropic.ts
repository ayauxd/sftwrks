/**
 * Vercel Serverless Function - Anthropic API Proxy
 *
 * This keeps the API key server-side and prevents client-side exposure.
 * Supports validation and insight generation for the AI assessment.
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';

// Rate limiting: simple in-memory store (resets on cold start)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 20; // requests per window
const RATE_WINDOW = 60 * 1000; // 1 minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return false;
  }

  if (record.count >= RATE_LIMIT) {
    return true;
  }

  record.count++;
  return false;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get client IP for rate limiting
  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
             req.socket?.remoteAddress ||
             'unknown';

  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY not configured');
    return res.status(500).json({ error: 'API not configured' });
  }

  const { action, input, question, assessmentData } = req.body;

  if (!action) {
    return res.status(400).json({ error: 'Missing action parameter' });
  }

  try {
    let prompt: string;
    let maxTokens: number;

    if (action === 'validate') {
      // Validate custom user input
      if (!input || !question) {
        return res.status(400).json({ error: 'Missing input or question' });
      }

      // Sanitize input (basic protection)
      const sanitizedInput = String(input).slice(0, 500).trim();
      const sanitizedQuestion = String(question).slice(0, 200).trim();

      prompt = `You are validating user input for a business AI readiness assessment.

Question: "${sanitizedQuestion}"
User's answer: "${sanitizedInput}"

Is this a sensible, relevant answer to the question? Consider:
- Does it actually answer the question asked?
- Is it a real business type, pain point, goal, or team size?
- Is it gibberish, random characters, or clearly nonsensical?

Respond with ONLY one of these formats:
- If valid: VALID
- If invalid: INVALID: [brief friendly suggestion for what they should enter]

Examples:
- "Tech startup" for "What describes your business?" → VALID
- "Ggg" for any question → INVALID: Please describe your actual situation
- "asdfgh" → INVALID: Please enter a meaningful response
- "customer support takes too long" for pain point → VALID`;

      maxTokens = 100;

    } else if (action === 'insight') {
      // Generate AI insight for assessment results
      if (!assessmentData) {
        return res.status(400).json({ error: 'Missing assessmentData' });
      }

      const { score, tier, contextSummary, hasCustomAnswers } = assessmentData;

      prompt = `You are an AI consultant for Softworks. Based on this assessment, provide ONE specific, actionable AI recommendation in 2-3 sentences. Be direct and practical.

Assessment Results (Score: ${score}/25 - ${tier}):
${contextSummary}

${hasCustomAnswers ? 'Note: They provided custom answers showing specific context about their situation.' : ''}

Give a brief, specific recommendation for their biggest opportunity with AI. No fluff.`;

      maxTokens = 300;

    } else {
      return res.status(400).json({ error: 'Invalid action' });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: maxTokens,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Anthropic API error:', response.status, errorText);
      return res.status(response.status).json({ error: 'AI service error' });
    }

    const data = await response.json();
    const result = data.content?.[0]?.text || '';

    return res.status(200).json({ result });

  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
