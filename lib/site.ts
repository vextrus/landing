import type { Metadata } from 'next'

export const siteConfig = {
  name: 'Vextrus',
  legalName: 'Vextrus Limited',
  url: 'https://www.vextrus.com',
  email: 'ceo@vextrus.com',
  // The category line — lead with this everywhere (master spec, Appendix F)
  tagline: 'Your AI workforce for construction & real estate.',
  subTagline: 'Agents that do the work; you approve the exceptions.',
  description:
    'VextrusAI is your AI workforce for Bangladesh construction & real estate. Agents price drawings, catch leakage, and chase cash — writing to your books only when a named person approves. The most intelligent software you’ve ever used.',
  ogImage: '/opengraph-image',
} as const

export type NavLink = { label: string; href: string }

// Sticky-nav links (master spec routes). "Book a demo" is rendered as the CTA.
export const navLinks: NavLink[] = [
  { label: 'Workforce', href: '/workforce' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'The Engine', href: '/engine' },
  { label: 'Why Vextrus', href: '/why' },
  { label: 'Bangladesh', href: '/bangladesh' },
]

export const footerNav: {
  heading: string
  links: (NavLink & { external?: boolean; muted?: boolean })[]
}[] = [
  {
    heading: 'Product',
    links: [
      { label: 'The Workforce', href: '/workforce' },
      { label: 'Solutions', href: '/solutions' },
      { label: 'The Engine', href: '/engine' },
      { label: 'The Estimator', href: '/estimator' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Why Vextrus', href: '/why' },
      { label: 'Bangladesh-Native', href: '/bangladesh' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Surfaces',
    links: [
      { label: 'Book a demo', href: '/contact' },
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
