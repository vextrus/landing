'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { VextrusLogo } from '@/components/ui/vextrus-logo'
import { siteConfig } from '@/lib/metadata'

const navItems = [
  { label: 'The Reality', href: '#reality' },
  { label: 'Modules', href: '#system' },
  { label: 'AI Engine', href: '#ai' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'Contact', href: '#contact' },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass-header-scrolled' : 'glass-header'
        }`}
      >
        <div className="flex h-[var(--header-height)] items-center justify-between px-[var(--grid-gutter)]">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5">
            <VextrusLogo size={28} />
            <span className="font-heading text-base font-semibold tracking-tight text-[var(--text-primary)]">
              Vextrus
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-[var(--text-secondary)] transition-colors duration-150 hover:text-[var(--text-primary)]"
              >
                {item.label}
              </a>
            ))}
            <a
              href={`${siteConfig.appUrl}/login`}
              className="text-sm font-semibold text-[var(--accent)] transition-colors duration-150 hover:text-[var(--accent-hover)]"
            >
              Log In &rarr;
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-[var(--text-secondary)] md:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Scroll progress bar */}
        <div className="scroll-progress" aria-hidden="true" />
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 top-[var(--header-height)] z-40 flex flex-col gap-6 bg-[var(--canvas)] p-8 md:hidden">
          {navItems.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="font-heading text-2xl font-semibold text-[var(--text-primary)]"
              style={{
                opacity: 0,
                animation: `fadeSlideIn 200ms var(--ease-out-expo) ${i * 50}ms forwards`,
              }}
            >
              {item.label}
            </a>
          ))}
          <a
            href={`${siteConfig.appUrl}/login`}
            className="mt-4 font-heading text-lg font-semibold text-[var(--accent)]"
            style={{
              opacity: 0,
              animation: `fadeSlideIn 200ms var(--ease-out-expo) ${navItems.length * 50}ms forwards`,
            }}
          >
            Log In &rarr;
          </a>
        </div>
      )}
    </>
  )
}
