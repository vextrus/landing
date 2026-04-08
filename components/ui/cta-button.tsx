import { type ReactNode } from 'react'

export function PrimaryCTA({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-[10px] bg-[var(--accent)] px-8 py-3 font-heading text-[15px] font-semibold text-[oklch(0.15_0.03_44)] transition-colors duration-200 hover:bg-[var(--accent-hover)] active:scale-[0.97]"
    >
      {children}
    </a>
  )
}

export function SecondaryCTA({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-[10px] border border-[var(--border-subtle)] px-8 py-3 font-heading text-[15px] font-semibold text-[var(--text-secondary)] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--text-primary)]"
    >
      {children}
    </a>
  )
}
