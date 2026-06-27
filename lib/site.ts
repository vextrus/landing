import type { Metadata } from 'next'

export const siteConfig = {
  name: 'Vextrus',
  legalName: 'Vextrus Limited',
  url: 'https://www.vextrus.com',
  email: 'ceo@vextrus.com',
  // The category line — the v3 spine (plain BD-owner English).
  tagline: 'The AI-native ERP for Bangladesh construction & real estate.',
  subTagline: 'One system of record, with an AI workforce that does the work on it.',
  description:
    'Vextrus is the AI-native ERP for Bangladesh construction & real estate — one system of record, with an AI workforce that does the work on it. Starting with the Estimator: a structural drawing becomes a priced BOQ posted to your books with one approval. No agent changes your books on its own — you approve every taka.',
  ogImage: '/opengraph-image',
} as const

export type NavLink = { label: string; href: string }

// Sticky-nav links — the "Engine + Workforce" two-tier IA (spec §3).
// "Book a call" is rendered separately as the CTA.
export const navLinks: NavLink[] = [
  { label: 'The System', href: '/system' },
  { label: 'VextrusAI', href: '/ai' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Bangladesh', href: '/bangladesh' },
  { label: 'Proof', href: '/proof' },
]

export const footerNav: {
  heading: string
  links: (NavLink & { external?: boolean; muted?: boolean })[]
}[] = [
  {
    heading: 'Product',
    links: [
      { label: 'The System', href: '/system' },
      { label: 'VextrusAI', href: '/ai' },
      { label: 'Solutions', href: '/solutions' },
      { label: 'Proof', href: '/proof' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Bangladesh-Native', href: '/bangladesh' },
      { label: 'Book a call', href: '/contact' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Surfaces',
    links: [
      { label: 'Book a call', href: '/contact' },
      { label: 'app.vextrus.com', href: '#', muted: true },
      { label: 'www.vextrus.com', href: '#', muted: true },
    ],
  },
]

/** Per-route metadata helper — sets title, description, canonical, OG/Twitter. */
export function pageMeta(opts: { title: string; description: string; path: string }): Metadata {
  const url = opts.path === '/' ? siteConfig.url : `${siteConfig.url}${opts.path}`
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: opts.path },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: siteConfig.name,
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: opts.title,
      description: opts.description,
    },
  }
}
