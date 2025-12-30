/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary Navy/Steel palette
        navy: {
          DEFAULT: '#0F172A',
          dark: '#0A1628',
          mid: '#0F172A',
        },
        steel: {
          DEFAULT: '#1E3A5F',
          blue: '#1E3A5F',
        },
        // Cyan accent palette
        cyan: {
          glow: '#00D4FF',
          hover: '#22D3EE',
          muted: '#0891B2',
        },
        // Light mode colors
        ice: {
          blue: '#E0F2FE',
        },
        // Legacy stone overrides for dark mode
        stone: {
          850: '#1E293B',
          950: '#0A1628',
        }
      },
      boxShadow: {
        'card': '0 4px 24px rgba(0, 212, 255, 0.08)',
        'elevated': '0 8px 32px rgba(10, 22, 40, 0.24)',
        'glow': '0 0 24px rgba(0, 212, 255, 0.3)',
        'glow-sm': '0 0 12px rgba(0, 212, 255, 0.2)',
      }
    }
  },
  plugins: [],
}
