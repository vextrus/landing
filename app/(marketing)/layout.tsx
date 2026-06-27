import type { ReactNode } from 'react'
import { LazyMotion, domAnimation } from 'motion/react'
import { SiteNav } from '@/components/layout/site-nav'
import { SiteFooter } from '@/components/layout/site-footer'
import { ScrollProgress } from '@/components/layout/scroll-progress'

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="theme-landing min-h-screen [overflow-x:clip]">
      <a
        href="#main"
        className="sr-only z-[70] rounded-md bg-accent px-4 py-2 font-heading text-sm font-semibold text-[oklch(0.18_0.03_44)] focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <LazyMotion features={domAnimation}>
        <ScrollProgress />
        <SiteNav />
        <main id="main">{children}</main>
        <SiteFooter />
      </LazyMotion>
    </div>
  )
}
