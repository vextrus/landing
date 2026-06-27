import type { Metadata } from 'next'
import Link from 'next/link'
import { pageMeta } from '@/lib/site'
import { solutions, customBuild, segments } from '@/lib/solutions'
import { Section } from '@/components/ui/section'
import { Overline } from '@/components/ui/overline'
import { Reveal } from '@/components/ui/reveal'
import { LinkArrow } from '@/components/ui/link-arrow'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'

export const metadata: Metadata = pageMeta({
  title: 'Solutions — buy the end of a problem, not a seat',
  description:
    'Named bundles, each one ending a single expensive problem from start to finish, with the system of record underneath. Routed by what you build — developer, contractor, or both. Priced to the money it recovers; payback in weeks. No seat count, no public price.',
  path: '/solutions',
})

const OUTCOMES = [
  { icon: 'rebar-chart', outcome: 'Never lose money on a wrong estimate', tag: 'Estimator' },
  { icon: 'layers', outcome: 'Know your real project cost today', tag: 'Costing + GL' },
  { icon: 'file-check', outcome: 'Pay subcontractors and stay NBR-compliant', tag: 'Sub-eq + Tax' },
  { icon: 'shield-check', outcome: 'Close the month without chasing site managers', tag: 'GL + Execution' },
] as const

export default function SolutionsPage() {
  return (
    <>
      {/* ── Hero ── */}
      <Section tone="canvas" className="pt-[clamp(3rem,6vw,5rem)]">
        <Reveal className="max-w-[760px]">
          <Overline>Solutions</Overline>
          <h1 className="t-hero mt-4 text-ink">You don&apos;t buy agents. You buy the end of a problem.</h1>
          <p className="mt-5 max-w-[600px] text-[17.5px] leading-relaxed text-ink-soft">
            Each bundle kills one expensive problem end-to-end, with the system of record underneath
            and the price framed by the money it recovers — never a seat count.
          </p>
        </Reveal>
      </Section>

      {/* ── Route by buyer ── */}
      <Section tone="warm">
        <Reveal className="max-w-[680px]">
          <Overline>Start with what you build</Overline>
          <h2 className="t-section mt-3.5">The same system, in your language.</h2>
        </Reveal>
        <Reveal className="mt-10 grid gap-4 md:grid-cols-3" delay={0.05}>
          {segments.map((s) => (
            <Link
              key={s.id}
              href={`/solutions/${s.id}`}
              className="draft-object vxtile group block rounded-[14px] p-6 no-underline"
            >
              <div className="title-block text-accent">{s.who}</div>
              <div className="mt-2 font-display text-[21px] font-semibold tracking-tight text-ink">
                {s.label}
              </div>
              <p className="mt-2 text-[14.5px] leading-snug text-ink-soft">{s.headline}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-accent">
                See the {s.label.toLowerCase()} path
                <Icon name="arrow-right" size={14} />
              </span>
            </Link>
          ))}
        </Reveal>
      </Section>

      {/* ── The bundles ── */}
      <Section tone="canvas">
        <Reveal className="max-w-[680px]">
          <Overline>The bundles</Overline>
          <h2 className="t-section mt-3.5">Five ways in. One system underneath.</h2>
        </Reveal>
        <div className="mt-12 space-y-4">
          {solutions.map((b) => (
            <Reveal key={b.id}>
              <article className="draft-object rounded-[16px] p-6 sm:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <div className="title-block text-accent">{b.kicker}</div>
                  <div className="title-block">{b.agents.join(' · ')}</div>
                </div>
                <h3 className="mt-3 font-display text-[24px] font-semibold tracking-tight text-ink">
                  {b.name}
                </h3>
                <p className="mt-2 max-w-[760px] text-[15px] italic leading-snug text-ink-dim">
                  &ldquo;{b.kills}&rdquo;
                </p>
                <p className="mt-3 max-w-[820px] text-[15px] leading-relaxed text-ink-soft">
                  {b.recovered}
                </p>
                {b.roadmapNote ? (
                  <p
                    className="mt-3 max-w-[820px] rounded-[10px] px-3.5 py-2.5 text-[13px] leading-snug text-ink-soft"
                    style={{ border: '1px solid var(--color-line)', background: 'var(--color-warm)' }}
                  >
                    <span className="font-semibold text-ink">Honest status — </span>
                    {b.roadmapNote}
                  </p>
                ) : null}
              </article>
            </Reveal>
          ))}

          {/* The custom-build upsell */}
          <Reveal>
            <article className="draft-cut rounded-[16px] p-6 sm:p-8">
              <div className="title-block text-accent">{customBuild.kicker}</div>
              <h3 className="mt-3 font-display text-[24px] font-semibold tracking-tight text-ink">
                {customBuild.name}
              </h3>
              <p className="mt-3 max-w-[820px] text-[15px] leading-relaxed text-ink-soft">
                {customBuild.body}
              </p>
            </article>
          </Reveal>
        </div>
      </Section>

      {/* ── Outcome cards ── */}
      <Section tone="warm">
        <Reveal className="max-w-[680px]">
          <Overline>So what?</Overline>
          <h2 className="t-section mt-3.5">What each one changes, in plain terms.</h2>
        </Reveal>
        <Reveal className="mt-10 grid gap-4 sm:grid-cols-2" delay={0.05}>
          {OUTCOMES.map((o) => (
            <div key={o.outcome} className="draft-object flex items-center gap-4 rounded-[14px] p-5">
              <span
                className="inline-grid h-[40px] w-[40px] shrink-0 place-items-center rounded-[10px] border text-accent"
                style={{ borderColor: 'var(--color-line-strong)' }}
              >
                <Icon name={o.icon} size={18} />
              </span>
              <div>
                <div className="font-display text-[16.5px] font-semibold leading-tight tracking-tight text-ink">
                  {o.outcome}
                </div>
                <div className="title-block mt-1">{o.tag}</div>
              </div>
            </div>
          ))}
        </Reveal>
        <p className="mx-auto mt-8 max-w-[640px] text-center text-[13px] leading-normal text-ink-dim">
          Priced to the money it recovers; payback in weeks. We agree a starting baseline at
          onboarding, and the system shows — transaction by transaction — what it caught or accelerated.
        </p>
        <div className="mt-7 text-center">
          <LinkArrow href="/proof">See the proof behind the claims</LinkArrow>
        </div>
      </Section>

      {/* ── CTA ── */}
      <Section tone="canvas" className="text-center">
        <Reveal className="mx-auto max-w-[680px]">
          <h2 className="t-display">Start on one undeniable result.</h2>
          <p className="mx-auto mt-5 max-w-[520px] text-[17px] leading-relaxed text-ink-soft">
            Land on the Estimator, prove the recovered value, then open the account to the bundles
            next door.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3.5">
            <Button href="/contact" size="lg" icon="arrow-right" iconRight>
              Book a call
            </Button>
            <Button href="/ai" size="lg" variant="ghost">
              Meet VextrusAI
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  )
}
