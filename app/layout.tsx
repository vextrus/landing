import type { Metadata, Viewport } from 'next'
import { instrumentSerif, syne, plusJakarta, jetbrainsMono } from '@/lib/fonts'
import { siteConfig } from '@/lib/metadata'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  openGraph: {
    title: 'Vextrus — The Future of Construction is Already Here',
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
}

export const viewport: Viewport = {
  themeColor: '#0D0D14',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${syne.variable} ${plusJakarta.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-canvas text-[var(--text-primary)] antialiased">{children}</body>
    </html>
  )
}
