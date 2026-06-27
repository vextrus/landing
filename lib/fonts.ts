import { Archivo, Plus_Jakarta_Sans, JetBrains_Mono, Noto_Sans_Bengali } from 'next/font/google'

// v3 — three type roles (spec §6.2): a distinctive technical DISPLAY grotesque
// (deliberately NOT an editorial serif — that's the #1 AI-cluster default), a
// humanist BODY sans, and JetBrains MONO as the annotation/data voice. Bengali
// for the native register. next/font writes each to a `--ff-*` var on <html>;
// the Tailwind @theme maps `--font-*` onto these.

// Display — Archivo: a grotesque with engineering/architectural character; tight
// and large in the hero, the technical-authority voice without the serif cliché.
const archivo = Archivo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--ff-display',
  weight: ['400', '500', '600', '700', '800', '900'],
  fallback: ['system-ui', 'sans-serif'],
})

// Body — Plus Jakarta Sans (clean humanist; 17px/1.5, skip the ramp middle)
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--ff-body',
  fallback: ['system-ui', 'sans-serif'],
})

// Mono / technical — JetBrains Mono: annotation voice only (dimensions, datums,
// sheet numbers, money/tabular-nums, agent metadata, eyebrows).
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

// All four families, ready to spread onto <html className>.
export const fontVariables = [
  archivo.variable,
  plusJakarta.variable,
  jetbrainsMono.variable,
  notoBengali.variable,
].join(' ')
