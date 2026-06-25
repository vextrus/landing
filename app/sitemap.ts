import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site'

const ROUTES = [
  '',
  '/workforce',
  '/solutions',
  '/engine',
  '/why',
  '/bangladesh',
  '/estimator',
  '/contact',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return ROUTES.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: path === '' ? 1 : 0.8,
  }))
}
