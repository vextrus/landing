import { Section } from '@/components/ui/section'
import { Overline } from '@/components/ui/overline'
import { Reveal } from '@/components/ui/reveal'
import { Icon } from '@/components/ui/icon'
import type { IconName } from '@/components/ui/icon'

// Built for trust — three plain proof cards (tenant isolation, audit trail,
// human approval), plus one honest forward line. Real server HTML (no client),
// so the text is in the DOM for SEO and reads with no layout shift. The Reveal
// wrappers carry the only motion, and it is purely a scroll-state change.

const PROOF: { icon: IconName; accent: string; title: string; body: string }[] = [
  {
    icon: 'lock',
    accent: 'oklch(0.55 0.13 285)',
    title: 'Your data is sealed off',
    body: "Your firm's data is sealed off from every other company on the platform.",
  },
  {
    icon: 'ledger',
    accent: 'oklch(0.55 0.10 200)',
    title: 'Every action is logged',
    body: 'Every AI action is logged — who, what, before and after.',
  },
  {
    icon: 'shield-check',
    accent: 'oklch(0.52 0.14 44)',
    title: 'You approve every write',
    body: 'No agent changes your books on its own. You approve every write.',
  },
]

export function TrustBand({ className = '' }: { className?: string }) {
  return (
    <Section tone="deep" className={className}>
      <Reveal className="mx-auto mb-12 max-w-[680px] text-center">
        <Overline>Built for trust</Overline>
        <h2 className="t-section mt-3.5">Three things stay true, every time.</h2>
      </Reveal>

      <div className="grid gap-4 md:grid-cols-3">
        {PROOF.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.06}>
            <article className="flex h-full flex-col rounded-[16px] border border-line bg-raised p-7">
              <span
                className="inline-grid h-11 w-11 place-items-center rounded-[12px]"
                style={{
                  background: `oklch(from ${p.accent} l c h / 0.16)`,
                  color: p.accent,
                }}
                aria-hidden="true"
              >
                <Icon name={p.icon} size={20} />
              </span>
              <h3 className="mt-4 font-heading text-[17px] font-semibold leading-tight">
                {p.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">{p.body}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-9 text-center" delay={0.05}>
        <p className="mx-auto max-w-[640px] text-[15px] leading-relaxed text-ink-soft">
          Built first for construction &amp; real estate — the same engine can serve other
          industries.
        </p>
      </Reveal>
    </Section>
  )
}
