import Link from 'next/link'
import { footerNav, siteConfig } from '@/lib/site'
import { BrandMark } from './brand-mark'

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-deep pb-10 pt-16">
      <div className="mx-auto w-full px-5 sm:px-8 lg:px-10" style={{ maxWidth: 'var(--maxw)' }}>
        <div className="flex flex-wrap justify-between gap-12">
          <div className="max-w-[300px]">
            <BrandMark size={26} />
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              Your AI workforce for construction &amp; real estate. Agents that do the work; you
              approve the exceptions.
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-[18px] inline-block font-mono text-[12.5px] text-ink-soft no-underline transition-colors hover:text-accent"
            >
              {siteConfig.email}
            </a>
          </div>

          <div className="flex flex-wrap gap-x-16 gap-y-8">
            {footerNav.map((col) => (
              <div key={col.heading}>
                <h2 className="m-0 mb-3.5 font-heading text-xs uppercase tracking-[0.12em] text-ink-soft">
                  {col.heading}
                </h2>
                {/* Tighter row gap + per-link block padding gives each stacked
                    link a ~44px mobile tap target without changing desktop rhythm. */}
                <ul className="m-0 flex list-none flex-col gap-0.5 p-0">
                  {col.links.map((l) =>
                    l.muted ? (
                      <li
                        key={l.label}
                        className="flex min-h-11 items-center text-sm text-ink-soft sm:min-h-0 sm:py-1"
                      >
                        {l.label}
                      </li>
                    ) : (
                      <li key={l.label}>
                        <Link
                          href={l.href}
                          className="flex min-h-11 items-center text-sm text-ink/85 no-underline transition-colors hover:text-accent sm:min-h-0 sm:py-1"
                        >
                          {l.label}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-[13px] text-ink-soft sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <span>© 2026 {siteConfig.legalName}. All rights reserved.</span>
          <span className="font-mono text-[11px] text-ink-dim">
            Map boundaries © geoBoundaries (CC BY 4.0) · Bangladesh Bureau of Statistics
          </span>
          <span className="font-mono">AI decides nothing. You decide everything.</span>
        </div>
      </div>
    </footer>
  )
}
