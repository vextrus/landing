import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'
import { Overline } from '@/components/ui/overline'
import { complianceFeatures } from '@/lib/features'
import { LucideIcon } from '@/components/ui/lucide-icon'

const badges = [
  { label: 'RAJUK', icon: 'Building' },
  { label: 'BNBC 2020', icon: 'ShieldCheck' },
  { label: 'NBR Mushak', icon: 'Calculator' },
  { label: 'BLA 2006', icon: 'Scale' },
  { label: 'e-TIN Ready', icon: 'FileCheck' },
  { label: 'DIFE', icon: 'HardHat' },
]

export function BangladeshSection() {
  return (
    <Section variant="warm" id="bangladesh" className="pt-[calc(var(--section-py)+2rem)]">
      <Container>
        <Overline dark>Built For Bangladesh</Overline>

        <h2 className="mt-4 font-display text-[clamp(2.5rem,2rem+2.5vw,4rem)] leading-[1.05] tracking-tight text-[var(--text-dark)]">
          <em>Not Localized. Native.</em>
        </h2>

        {/* Blockquote — moved above badges for emotional impact */}
        <blockquote className="mt-8 max-w-2xl border-l-[6px] border-[var(--accent)] py-2 pl-6">
          <p className="font-display text-subsection italic text-[var(--text-dark-secondary)]">
            &ldquo;Every global ERP vendor asks Bangladesh to adapt. Vextrus asks Bangladesh what it
            needs.&rdquo;
          </p>
        </blockquote>

        {/* Compliance Stamps */}
        <div className="mt-10 flex flex-wrap gap-3">
          {badges.map((b) => (
            <span
              key={b.label}
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-warm)] bg-[oklch(0.93_0.01_70)] px-3.5 py-2 text-xs font-semibold text-[var(--text-dark-secondary)]"
            >
              <LucideIcon
                name={b.icon}
                size={13}
                strokeWidth={1.8}
                className="text-[oklch(0.50_0.10_44)]"
              />
              {b.label}
            </span>
          ))}
        </div>

        {/* Feature grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {complianceFeatures.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-[var(--border-warm)] bg-[var(--canvas-warm-raised)] p-5"
            >
              <h3 className="font-heading text-sm font-semibold text-[var(--text-dark)]">
                {f.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-dark-secondary)]">
                {f.detail}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
