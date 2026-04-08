import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        heading: ['var(--font-heading)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'Consolas', 'monospace'],
      },
      colors: {
        canvas: {
          DEFAULT: 'oklch(0.12 0.01 270)',
          raised: 'oklch(0.16 0.012 270)',
          warm: 'oklch(0.96 0.008 70)',
          'warm-raised': 'oklch(0.99 0.004 70)',
        },
        accent: {
          DEFAULT: 'oklch(0.72 0.15 44)',
          hover: 'oklch(0.78 0.16 44)',
          glow: 'oklch(0.72 0.15 44 / 0.25)',
        },
        indigo: {
          DEFAULT: 'oklch(0.55 0.14 275)',
          glow: 'oklch(0.55 0.14 275 / 0.20)',
        },
      },
      fontSize: {
        hero: ['clamp(3.5rem, 3rem + 3vw, 6rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        section: [
          'clamp(2rem, 1.5rem + 2vw, 3.5rem)',
          { lineHeight: '1.1', letterSpacing: '-0.02em' },
        ],
        subsection: [
          'clamp(1.25rem, 1rem + 0.8vw, 1.75rem)',
          { lineHeight: '1.2', letterSpacing: '-0.01em' },
        ],
        stat: ['clamp(2.5rem, 2rem + 2vw, 4.5rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
      },
      maxWidth: {
        content: '1200px',
        page: '1440px',
      },
      borderRadius: {
        section: '16px',
      },
    },
  },
  plugins: [],
}

export default config
