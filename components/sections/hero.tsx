import { Container } from '@/components/ui/container'
import { PrimaryCTA, SecondaryCTA } from '@/components/ui/cta-button'
import { ProductUIMockup } from '@/components/interactive/product-ui-mockup'
import { ScrollIndicator } from '@/components/interactive/scroll-indicator'
import { siteConfig } from '@/lib/metadata'

export function HeroSection() {
  return (
    <section
      className="bg-hero noise-overlay relative flex min-h-svh items-center bg-grid-lines pt-[var(--header-height)]"
      id="hero"
    >
      <Container className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-12">
          {/* Left: Data + Headline */}
          <div>
            {/* Source overline */}
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--accent)]">
              Anthropic Economic Index &middot; March 2026
            </p>

            {/* Stat cascade */}
            <div className="mt-6">
              <div className="flex items-baseline gap-2">
                <span className="text-gradient-accent font-mono text-[clamp(3rem,2.5rem+2.5vw,3.75rem)] font-medium leading-none tracking-tighter">
                  94%
                </span>
              </div>
              <p className="mt-1 text-[13px] text-[var(--text-secondary)]">
                of knowledge work tasks are theoretically AI-capable
              </p>
            </div>

            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-mono text-[clamp(1.75rem,1.5rem+1vw,2rem)] font-medium tracking-tight text-[var(--accent)]">
                ~0%
              </span>
              <span className="text-[12px] text-[var(--text-tertiary)]">
                used in Bangladesh construction
              </span>
            </div>

            {/* Headline */}
            <h1 className="mt-6 max-w-lg font-display text-[clamp(2rem,1.5rem+2.5vw,2.5rem)] leading-[1.1] tracking-tight text-[var(--text-primary)]">
              The era of Excel and
              <br />
              WhatsApp is <em className="text-[var(--accent)]">ending.</em>
            </h1>

            {/* Subtext */}
            <p className="mt-4 max-w-md text-[14px] leading-relaxed text-[var(--text-secondary)]">
              AI-native ERP built from the ground up for Bangladesh construction and real estate.
              19&nbsp;modules. 20&nbsp;AI&nbsp;agents. Every&nbsp;decision, intelligently augmented.
            </p>

            {/* Source citation */}
            <p className="mt-3 font-mono text-[9px] text-[var(--text-tertiary)]">
              Source: Anthropic Research, March 2026 &middot; Vextrus Platform v1.0
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryCTA href={`${siteConfig.appUrl}/login`}>Experience Vextrus &rarr;</PrimaryCTA>
              <SecondaryCTA href="#system">Explore Modules</SecondaryCTA>
            </div>
          </div>

          {/* Right: Product UI Mockup */}
          <div className="hidden lg:block">
            <ProductUIMockup />
          </div>
        </div>

        {/* Mobile product UI */}
        <div className="mt-12 lg:hidden">
          <ProductUIMockup />
        </div>
      </Container>

      {/* Scroll indicator */}
      <ScrollIndicator />

      {/* Section divider */}
      <div className="section-divider absolute inset-x-0 bottom-0" />
    </section>
  )
}
