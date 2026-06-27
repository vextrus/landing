'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import { navLinks } from '@/lib/site'
import { BrandMark } from './brand-mark'
import { Button } from '../ui/button'
import { Icon } from '../ui/icon'

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function SiteNav() {
  const pathname = usePathname() || '/'
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const reduce = useReducedMotion()

  // Intensify glass after a little scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll + Esc-to-close while the drawer is open.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  // Close on route change.
  useEffect(() => setOpen(false), [pathname])

  return (
    <header
      className="glass-nav sticky top-0 z-50 flex items-center"
      style={{
        height: 'var(--nav-h)',
        boxShadow: scrolled ? '0 8px 30px -12px rgba(0,0,0,0.5)' : 'none',
        transition: 'box-shadow .3s',
      }}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex w-full items-center px-5 sm:px-8 lg:px-10"
        style={{ maxWidth: 'var(--maxw)' }}
      >
        <BrandMark size={28} />

        {/* Desktop links */}
        <div className="ml-auto hidden items-center gap-7 lg:flex">
          {navLinks.map((l) => {
            const active = isActive(pathname, l.href)
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? 'page' : undefined}
                className={`group relative text-sm no-underline transition-colors ${
                  active ? 'font-semibold text-ink' : 'font-medium text-ink-soft hover:text-ink'
                }`}
              >
                {l.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-px bg-accent transition-[width] duration-300 ease-quart ${
                    active ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            )
          })}
          <Button href="/contact" size="sm" icon="demo">
            Book a call
          </Button>
        </div>

        {/* Mobile trigger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="ml-auto inline-grid h-11 w-11 place-items-center rounded-[10px] border border-line text-ink lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <Icon name={open ? 'close' : 'menu'} size={20} />
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <m.div
              className="fixed inset-0 top-[var(--nav-h)] z-40 bg-[oklch(0.08_0.008_270/0.6)] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.2 }}
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <m.div
              id="mobile-menu"
              className="glass-nav fixed inset-x-0 top-[var(--nav-h)] z-40 border-t border-line lg:hidden"
              initial={{ opacity: 0, y: reduce ? 0 : -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduce ? 0 : -12 }}
              transition={{ duration: reduce ? 0 : 0.26, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex flex-col gap-1 px-5 py-5 sm:px-8">
                {navLinks.map((l) => {
                  const active = isActive(pathname, l.href)
                  return (
                    <Link
                      key={l.href}
                      href={l.href}
                      aria-current={active ? 'page' : undefined}
                      className={`flex min-h-[44px] items-center rounded-[10px] px-3 text-base no-underline ${
                        active ? 'bg-[oklch(1_0_0/0.05)] font-semibold text-ink' : 'text-ink-soft'
                      }`}
                    >
                      {l.label}
                    </Link>
                  )
                })}
                <Button href="/contact" size="md" icon="demo" className="mt-3 w-full">
                  Book a demo
                </Button>
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
