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
      },
      build: {
        // Target modern browsers for smaller bundles
        target: 'es2020',
        // Minification
        minify: 'esbuild',
        // Generate source maps for debugging (disable in prod if needed)
        sourcemap: false,
        // Chunk splitting for better caching
        rollupOptions: {
          output: {
            // Manual chunk splitting for optimal loading
            manualChunks: {
              // React core - loaded first, cached long-term
              'vendor-react': ['react', 'react-dom'],
              // Data/content - separate chunk, lazy loaded
              'data': ['./constants.ts'],
              // Components that are lazy loaded together
              'pages': [
                './components/CaseStudyDetail.tsx',
                './components/JournalDetail.tsx',
                './components/InsightsList.tsx',
                './components/CaseStudiesList.tsx',
                './components/Media.tsx',
                './components/PrivacyPolicy.tsx',
                './components/TermsOfService.tsx'
              ],
              // Assistant (chat widget) - loaded after page
              'assistant': ['./components/Assistant.tsx']
            },
            // Ensure chunks have consistent names for caching
            chunkFileNames: 'assets/[name]-[hash].js',
            entryFileNames: 'assets/[name]-[hash].js',
            assetFileNames: 'assets/[name]-[hash].[ext]'
          }
        },
        // Warn on large chunks
        chunkSizeWarningLimit: 200,
        // CSS code splitting
        cssCodeSplit: true
      }
    };
});
