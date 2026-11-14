import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Victorian Dark Palette
        'abyss': '#0B0A0F',
        'void': '#13111A',
        'shadow': '#1A1722',
        'midnight': '#06050A',
        
        // Elegant Accents
        'candlelight': '#C9A86C',
        'gold': {
          DEFAULT: '#C9A86C',
          light: '#E0C589',
          dark: '#A88852',
        },
        'ghost-blue': '#6B8C9E',
        'blood': '#8B3A3A',
        
        // Text Colors
        'parchment': '#EDE8E0',
        'ash': '#A39E96',
        
        // Legacy colors for backward compatibility
        mist: '#3a3a4a',
        lavender: '#9575cd',
        purple: '#6a1b9a',
        crimson: '#dc143c',
        frost: '#b0c4de',
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        // Legacy
        serif: ['var(--font-display)', 'serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'widest-xl': '0.15em',
        'ultra-wide': '0.25em',
      },
      animation: {
        'flicker': 'flicker 4s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'float': 'float 8s ease-in-out infinite',
        'drift': 'drift 12s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      boxShadow: {
        'glow-gold': '0 0 20px rgba(201, 168, 108, 0.3), 0 0 40px rgba(201, 168, 108, 0.15)',
        'glow-blue': '0 0 20px rgba(107, 140, 158, 0.3), 0 0 40px rgba(107, 140, 158, 0.15)',
        'glow-subtle': '0 0 15px rgba(201, 168, 108, 0.2)',
      },
    },
  },
  plugins: [],
};

export default config;
