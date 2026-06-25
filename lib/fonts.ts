import {
  Instrument_Serif,
  Syne,
  Outfit,
  Plus_Jakarta_Sans,
  JetBrains_Mono,
  Noto_Sans_Bengali,
} from 'next/font/google'

// next/font writes each family to a `--ff-*` CSS variable on <html>.
// The Tailwind v4 @theme (globals.css) maps `font-*` utilities onto these,
// kept in a separate namespace so they never collide with Tailwind's --font-* keys.

// Editorial hero display — Instrument Serif (400, italic for emphasis spans)
const instrumentSerif = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--ff-serif',
})

// Geometric section headings — Syne 400–800
const syne = Syne({
  subsets: ['latin'],
  display: 'swap',
  variable: '--ff-heading',
  weight: ['400', '500', '600', '700', '800'],
  fallback: ['system-ui', 'sans-serif'],
})

// The lowercase "vextrus" wordmark — Outfit 800
const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--ff-wordmark',
  weight: ['400', '500', '600', '700', '800'],
  fallback: ['Avenir Next', 'Segoe UI', 'sans-serif'],
})

// Body — Plus Jakarta Sans
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--ff-body',
  fallback: ['system-ui', 'sans-serif'],
})

// Data / figures — JetBrains Mono (tabular numerals)
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--ff-mono',
  fallback: ['Consolas', 'monospace'],
})

// Bengali accents — Noto Sans Bengali
const notoBengali = Noto_Sans_Bengali({
  subsets: ['bengali'],
  display: 'swap',
  variable: '--ff-bengali',
  weight: ['400', '500', '600', '700'],
  fallback: ['Hind Siliguri', 'sans-serif'],
})

// All six families, ready to spread onto <html className>.
export const fontVariables = [
  instrumentSerif.variable,
  syne.variable,
  outfit.variable,
  plusJakarta.variable,
  jetbrainsMono.variable,
  notoBengali.variable,
].join(' ')
