import type { Metadata, Viewport } from 'next'
import { fontVariables } from '@/lib/fonts'
import { siteConfig } from '@/lib/site'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `Vextrus — ${siteConfig.tagline}`,
    template: '%s · Vextrus',
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.legalName, url: siteConfig.url }],
  keywords: [
    'AI workforce',
    'construction ERP Bangladesh',
    'real estate ERP',
    'Bar Bending Schedule',
    'BOQ estimator',
    'NBR Mushak',
    'RAJUK',
    'AI agents',
    'VextrusAI',
  ],
  icons: {
    icon: '/vextrus-mark.svg',
    shortcut: '/vextrus-mark.svg',
  },
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    url: siteConfig.url,
    title: `Vextrus — ${siteConfig.tagline}`,
    description: siteConfig.description,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Vextrus — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
}

export const viewport: Viewport = {
  themeColor: '#0c0c12',
  width: 'device-width',
  initialScale: 1,
}

// JSON-LD — Organization (site-wide structured data)
const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.legalName,
  alternateName: 'Vextrus',
  url: siteConfig.url,
  email: siteConfig.email,
  description: siteConfig.description,
  logo: `${siteConfig.url}/vextrus-mark.svg`,
  slogan: siteConfig.subTagline,
  areaServed: 'BD',
  address: { '@type': 'PostalAddress', addressCountry: 'BD' },
}

// JSON-LD — SoftwareApplication (the product; honest, no offers/price/ratings)
const softwareJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: siteConfig.name,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: siteConfig.url,
  description:
    'An AI-native, multi-tenant ERP for Bangladesh construction & real estate. VextrusAI is an AI workforce of agents — led by a shipped Drawing Estimator that turns drawings into a Bill of Quantities and Bar Bending Schedule — running on a 20-module engine. Agents write to the books only through a 4-Eyes, approval-gated mechanism: an agent proposes a change via a registered command, and a named person approves before it is committed. Built for Bangladesh: NBR Mushak, RAJUK, BBS, the July–June fiscal year, and money in lakh and crore.',
  publisher: {
    '@type': 'Organization',
    name: siteConfig.legalName,
    url: siteConfig.url,
  },
  inLanguage: 'en',
  areaServed: 'BD',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="bg-canvas text-ink antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
        />
      </body>
    </html>
  )
}
