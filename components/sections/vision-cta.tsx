import { Container } from '@/components/ui/container'
import { Overline } from '@/components/ui/overline'
import { siteConfig } from '@/lib/metadata'

export function VisionCtaSection() {
  return (
    <section
      className="bg-atmospheric-intense noise-overlay relative flex min-h-svh items-center py-[var(--section-py)]"
      id="contact"
    >
      <Container className="relative z-10 text-center">
        <Overline>The Vision</Overline>

        <h2 className="mx-auto mt-8 max-w-4xl font-display text-[clamp(2rem,1.5rem+2.5vw,4rem)] leading-[1.15] tracking-tight text-[var(--text-primary)]">
          Vextrus is not an ERP&nbsp;tool.
          <br />
          <span className="mt-2 block">It is the operating system for</span>
          <span className="block">the next generation of Bangladesh</span>
          <span className="block">construction and real&nbsp;estate.</span>
        </h2>

        <div className="mt-12">
          <a
            href={`${siteConfig.appUrl}/login`}
            className="cta-shimmer inline-flex items-center gap-2 rounded-[10px] bg-[var(--accent)] px-12 py-4 font-heading text-lg font-semibold text-[oklch(0.15_0.03_44)] transition-all duration-200 hover:bg-[var(--accent-hover)] active:scale-[0.97]"
          >
            Experience the Future &rarr;
          </a>
        </div>

        <p className="mt-8 text-sm text-[var(--text-secondary)]">
          {siteConfig.url.replace('https://', '')} &middot;{' '}
          {siteConfig.appUrl.replace('https://', '')}
        </p>
      </Container>
    </section>
  )
}
