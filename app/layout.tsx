import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import OrbitalNavigation from '@/components/layout/OrbitalNavigation'
import OrbitalFooter from '@/components/layout/OrbitalFooter'
import { Providers } from './providers'
import '@/styles/globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://vextrus.ai'),
  title: 'Vextrus - AI-Powered ERP for Bangladesh Real Estate Construction',
  description: 'Transform your real estate construction business with Bangladesh\'s first AI-native ERP system. Reduce project delays by 45% and increase profitability by 20%.',
  keywords: ['ERP', 'Construction', 'Bangladesh', 'Real Estate', 'AI', 'Project Management', 'PropTech'],
  authors: [{ name: 'Vextrus Team' }],
  openGraph: {
    title: 'Vextrus - AI-Powered Construction ERP',
    description: 'Bangladesh\'s first AI-native ERP for real estate construction',
    type: 'website',
    locale: 'en_US',
    url: 'https://vextrus.ai',
    siteName: 'Vextrus',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Vextrus ERP Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vextrus - AI-Powered Construction ERP',
    description: 'Transform your construction business with AI',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
}

export const viewport = {
  themeColor: '#0F172A',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`} suppressHydrationWarning>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <Providers>
          <OrbitalNavigation />
          {children}
          <OrbitalFooter />
        </Providers>
      </body>
    </html>
  )
}