/**
 * API Configuration for Softworks Asset Generation
 *
 * Environment Variables Required:
 *   GEMINI_API_KEY - Google AI Studio API key
 *   XAI_API_KEY    - xAI (Grok) API key
 *
 * To set up:
 *   1. Get Gemini key: https://aistudio.google.com/apikey
 *   2. Get Grok key: https://console.x.ai
 *   3. Create .env.local file with both keys
 */

export const API_CONFIG = {
  gemini: {
    endpoint: 'https://generativelanguage.googleapis.com',
    models: {
      flash: 'gemini-2.5-flash-preview-04-17',      // Fast image gen
      pro: 'gemini-2.5-pro-preview-06-05',          // Best quality
      imagen: 'imagen-3.0-generate-002',             // Dedicated image model
      tts: 'gemini-2.5-flash-preview-tts',          // Text-to-speech
    },
    pricing: {
      imagen: '$0.03/image',
      flash: 'Free tier available',
    }
  },

  grok: {
    endpoint: 'https://api.x.ai/v1',
    models: {
      fast: 'grok-4-1-fast',       // $0.20/$0.50 per 1M tokens
      standard: 'grok-4',           // $3/$15 per 1M tokens
      vision: 'grok-2-vision',      // Image understanding
      image: 'grok-2-image',        // Aurora image generation
    },
    tools: ['x_search', 'web_search', 'code_execution'],
    pricing: {
      search: '$25 per 1,000 sources',
      image: 'Token-based',
    }
  },

  // Recommended usage patterns
  patterns: {
    heroImage: {
      provider: 'gemini',
      model: 'imagen',
      reason: 'Best quality for hero visuals, supports 4K output'
    },
    socialInsights: {
      provider: 'grok',
      model: 'fast',
      tools: ['x_search'],
      reason: 'Only API with real-time X/Twitter access'
    },
    quickAssets: {
      provider: 'gemini',
      model: 'flash',
      reason: 'Fast, conversational, good for iteration'
    },
    audioNarration: {
      provider: 'gemini',
      model: 'tts',
      reason: 'Natural voice synthesis for video content'
    }
  }
};

/**
 * Check if API keys are configured
 */
export function checkApiKeys(): { gemini: boolean; grok: boolean } {
  return {
    gemini: !!process.env.GEMINI_API_KEY,
    grok: !!process.env.XAI_API_KEY,
  };
}

/**
 * Print setup instructions
 */
export function printSetupInstructions(): void {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║           SOFTWORKS API CONFIGURATION GUIDE                  ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  1. GEMINI API (Image & Audio Generation)                    ║
║     → Get key: https://aistudio.google.com/apikey            ║
║     → Set: export GEMINI_API_KEY=your-key                    ║
║                                                              ║
║  2. GROK API (X/Twitter Data & Aurora Images)                ║
║     → Get key: https://console.x.ai                          ║
║     → Set: export XAI_API_KEY=your-key                       ║
║                                                              ║
║  Or create .env.local file:                                  ║
║     GEMINI_API_KEY=your-gemini-key                           ║
║     XAI_API_KEY=your-grok-key                                ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
`);
}

export default API_CONFIG;
