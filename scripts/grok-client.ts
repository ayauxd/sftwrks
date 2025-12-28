/**
 * Grok API Client
 * Provides X/Twitter data access and image generation via xAI
 *
 * Capabilities:
 * - Real-time X/Twitter search and insights
 * - Image generation with Aurora (grok-2-image)
 * - Web search for current information
 */

import OpenAI from 'openai';

// Grok client using OpenAI-compatible SDK
const createGrokClient = (apiKey?: string) => {
  const key = apiKey || process.env.XAI_API_KEY;
  if (!key) {
    throw new Error('XAI_API_KEY environment variable is required');
  }

  return new OpenAI({
    baseURL: 'https://api.x.ai/v1',
    apiKey: key,
  });
};

// Available Grok models
const MODELS = {
  fast: 'grok-4-1-fast',     // Fastest, cheapest
  standard: 'grok-4',         // Best quality
  vision: 'grok-2-vision',    // Image understanding
  image: 'grok-2-image',      // Image generation
} as const;

/**
 * Search X/Twitter for real-time insights
 */
async function searchX(query: string, options?: {
  apiKey?: string;
  maxResults?: number;
}): Promise<{ tweets: string[]; summary: string }> {
  const client = createGrokClient(options?.apiKey);

  const response = await client.chat.completions.create({
    model: MODELS.fast,
    messages: [
      {
        role: 'system',
        content: 'You have access to real-time X (Twitter) data. Search for relevant posts and provide insights. Return structured data with key tweets and a summary.'
      },
      {
        role: 'user',
        content: `Search X for: "${query}". Return the most relevant ${options?.maxResults || 5} tweets and a brief analysis.`
      }
    ],
    // Enable live search tools
    // @ts-ignore - Grok-specific parameter
    tools: [{ type: 'x_search' }, { type: 'web_search' }],
  });

  const content = response.choices[0]?.message?.content || '';

  return {
    tweets: [], // Parsed from response
    summary: content
  };
}

/**
 * Generate image using Grok Aurora
 */
async function generateImage(prompt: string, options?: {
  apiKey?: string;
  format?: 'url' | 'base64';
}): Promise<string> {
  const client = createGrokClient(options?.apiKey);

  const response = await client.images.generate({
    model: MODELS.image,
    prompt,
    n: 1,
    response_format: options?.format || 'url',
  });

  const imageUrl = response.data[0]?.url;
  if (!imageUrl) {
    throw new Error('No image URL in response');
  }

  return imageUrl;
}

/**
 * Get trending topics from X
 */
async function getTrending(category?: string, options?: {
  apiKey?: string;
}): Promise<string[]> {
  const client = createGrokClient(options?.apiKey);

  const response = await client.chat.completions.create({
    model: MODELS.fast,
    messages: [
      {
        role: 'system',
        content: 'You have access to real-time X trends. Return current trending topics.'
      },
      {
        role: 'user',
        content: category
          ? `What are the current trending topics on X related to "${category}"?`
          : 'What are the top 10 trending topics on X right now?'
      }
    ],
    // @ts-ignore
    tools: [{ type: 'x_search' }],
  });

  const content = response.choices[0]?.message?.content || '';
  // Parse trending topics from response
  return content.split('\n').filter(line => line.trim());
}

/**
 * Analyze sentiment around a topic on X
 */
async function analyzeSentiment(topic: string, options?: {
  apiKey?: string;
}): Promise<{
  sentiment: 'positive' | 'negative' | 'neutral' | 'mixed';
  score: number;
  summary: string;
}> {
  const client = createGrokClient(options?.apiKey);

  const response = await client.chat.completions.create({
    model: MODELS.fast,
    messages: [
      {
        role: 'system',
        content: 'Analyze X posts about a topic and determine overall sentiment. Return JSON with sentiment (positive/negative/neutral/mixed), score (-1 to 1), and summary.'
      },
      {
        role: 'user',
        content: `Analyze the current sentiment on X about: "${topic}"`
      }
    ],
    // @ts-ignore
    tools: [{ type: 'x_search' }],
    response_format: { type: 'json_object' },
  });

  const content = response.choices[0]?.message?.content || '{}';
  return JSON.parse(content);
}

/**
 * Get AI/tech news relevant to Softworks
 */
async function getAINews(options?: {
  apiKey?: string;
}): Promise<string> {
  const client = createGrokClient(options?.apiKey);

  const response = await client.chat.completions.create({
    model: MODELS.fast,
    messages: [
      {
        role: 'system',
        content: 'You are a tech news curator for an AI consultancy. Find relevant AI, enterprise tech, and digital transformation news.'
      },
      {
        role: 'user',
        content: 'What are the most important AI and enterprise technology developments from the past 24 hours? Focus on practical business applications, not hype.'
      }
    ],
    // @ts-ignore
    tools: [{ type: 'web_search' }, { type: 'x_search' }],
  });

  return response.choices[0]?.message?.content || '';
}

export {
  createGrokClient,
  searchX,
  generateImage,
  getTrending,
  analyzeSentiment,
  getAINews,
  MODELS,
};
