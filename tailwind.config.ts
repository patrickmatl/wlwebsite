import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'syne': ['var(--font-syne)'],
        'space-grotesk': ['var(--font-space-grotesk)'],
      },
      colors: {
        gold: {
          '50': '#fff9eb',
          '100': '#fef0c7',
          '200': '#fde08a',
          '300': '#fbc83d',
          '400': '#fab320',
          '500': '#ef8a10',
          '600': '#db6308',
          '700': '#b54309',
          '800': '#93350f',
          '900': '#792e0f',
          '950': '#451604',
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
      },
      animation: {
        'pulse-gold': 'pulse-gold 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-slower': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-gold': {
          '0%, 100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '.9',
            transform: 'scale(1.05)',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
