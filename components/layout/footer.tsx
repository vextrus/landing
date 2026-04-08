import { VextrusLogo } from '@/components/ui/vextrus-logo'

const footerLinks = [
  {
    title: 'Product',
    links: [
      { label: 'Modules', href: '#system' },
      { label: 'AI Engine', href: '#ai' },
      { label: 'For Real Estate', href: '#real-estate' },
      { label: 'Architecture', href: '#architecture' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Bangladesh', href: '#bangladesh' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-grid-lines-subtle border-t border-[var(--border-subtle)] bg-[oklch(0.09_0.008_270)] py-16">
      <div className="mx-auto max-w-content px-[var(--grid-gutter)]">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5">
              <VextrusLogo size={24} />
              <span className="font-heading text-sm font-semibold text-[var(--text-primary)]">
                Vextrus
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
              AI-native ERP for Bangladesh construction and real estate. The intelligence platform
              for the next generation.
            </p>
          </div>

          {/* Link Columns */}
          <div className="flex flex-wrap gap-12 sm:gap-16">
            {footerLinks.map((col) => (
              <div key={col.title}>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
                  {col.title}
                </p>
                <ul className="mt-3 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-[var(--text-secondary)] transition-colors duration-150 hover:text-[var(--text-primary)]"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="section-divider mt-12" />
        <div className="flex items-center justify-between pt-8">
          <p className="text-xs text-[var(--text-tertiary)]">
            &copy; {new Date().getFullYear()} Vextrus. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="text-[var(--text-tertiary)] transition-colors duration-150 hover:text-[var(--text-primary)]"
              aria-label="LinkedIn"
            >
              <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
