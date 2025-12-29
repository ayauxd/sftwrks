import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');

    // Get env vars - prioritize process.env (Vercel) over .env files
    const geminiKey = process.env.GEMINI_API_KEY || env.GEMINI_API_KEY || '';
    const anthropicKey = process.env.ANTHROPIC_API_KEY || env.ANTHROPIC_API_KEY || '';

    console.log('Build config - Anthropic key present:', !!anthropicKey);

    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(geminiKey),
        'process.env.GEMINI_API_KEY': JSON.stringify(geminiKey),
        'process.env.ANTHROPIC_API_KEY': JSON.stringify(anthropicKey),
        'import.meta.env.VITE_ANTHROPIC_API_KEY': JSON.stringify(anthropicKey)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
