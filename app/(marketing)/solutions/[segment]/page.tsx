import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { pageMeta } from '@/lib/site'
import { segments, segmentById, solutionById } from '@/lib/solutions'
import { Section } from '@/components/ui/section'
import { Overline } from '@/components/ui/overline'
import { Reveal } from '@/components/ui/reveal'
import { LinkArrow } from '@/components/ui/link-arrow'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'

export function generateStaticParams() {
  return segments.map((s) => ({ segment: s.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ segment: string }>
}): Promise<Metadata> {
  const { segment } = await params
  const s = segmentById(segment)
  if (!s) return pageMeta({ title: 'Solutions', description: 'Solutions by segment.', path: '/solutions' })
  return pageMeta({
    title: `Vextrus for ${s.who} — ${s.headline}`,
    description: `${s.headline} The same system of record and the one shipped agent, narrated for ${s.who.toLowerCase()}. No agent changes your books on its own — you approve every taka.`,
    path: `/solutions/${s.id}`,
  })
}

export default async function SegmentPage({ params }: { params: Promise<{ segment: string }> }) {
  const { segment } = await params
  const s = segmentById(segment)
  if (!s) notFound()

  const leadBundles = s.lead.map((id) => solutionById(id)).filter((b) => b !== undefined)

  return (
    <>
      {/* ── Hero ── */}
      <Section tone="canvas" className="pt-[clamp(3rem,6vw,5rem)]">
        <Reveal className="max-w-[760px]">
          <div className="flex flex-wrap items-center gap-2">
            {segments.map((seg) => (
              <a
                key={seg.id}
                href={`/solutions/${seg.id}`}
                className={`rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-[0.08em] no-underline ${
                  seg.id === s.id ? 'text-accent' : 'text-ink-dim'
                }`}
                style={{
                  border: '1px solid var(--color-line-strong)',
                  background: seg.id === s.id ? 'var(--color-raised)' : 'transparent',
                }}
              >
                {seg.label}
              </a>
            ))}
          </div>
          <Overline className="mt-7">{s.who}</Overline>
          <h1 className="t-hero mt-3 text-ink">{s.headline}</h1>
          <p className="mt-5 max-w-[600px] text-[17.5px] leading-relaxed text-ink-soft">
            The same system of record, the same one shipped agent — described for the work you actually
            do. You approve every taka; nothing posts on its own.
          </p>
        </Reveal>
      </Section>

      {/* ── The pains ── */}
      <Section tone="warm">
        <Reveal className="max-w-[680px]">
          <Overline>What this costs you today</Overline>
          <h2 className="t-section mt-3.5">The leaks you live with.</h2>
        </Reveal>
        <Reveal className="mt-8 space-y-3" delay={0.05}>
          {s.pains.map((p) => (
            <div key={p} className="draft-object flex items-start gap-3 rounded-[12px] p-4">
              <Icon name="arrow-right" size={16} className="mt-0.5 shrink-0 text-accent" />
              <span className="text-[15.5px] leading-snug text-ink">{p}</span>
            </div>
          ))}
        </Reveal>
      </Section>

      {/* ── The bundles that land first ── */}
      <Section tone="canvas">
        <Reveal className="max-w-[680px]">
          <Overline>Where to start</Overline>
          <h2 className="t-section mt-3.5">The bundles that land first for you.</h2>
        </Reveal>
        <div className="mt-10 space-y-4">
          {leadBundles.map((b) => (
            <Reveal key={b.id}>
              <article className="draft-object rounded-[16px] p-6 sm:p-8">
                <div className="title-block text-accent">{b.kicker}</div>
                <h3 className="mt-2 font-display text-[22px] font-semibold tracking-tight text-ink">
                  {b.name}
                </h3>
                <p className="mt-2 max-w-[760px] text-[15px] italic leading-snug text-ink-dim">
                  &ldquo;{b.kills}&rdquo;
                </p>
                <p className="mt-3 max-w-[820px] text-[15px] leading-relaxed text-ink-soft">
                  {b.recovered}
                </p>
                {b.roadmapNote ? (
                  <p className="mt-3 text-[13px] leading-snug text-ink-dim">
                    <span className="font-semibold text-ink-soft">Honest status — </span>
                    {b.roadmapNote}
                  </p>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>
        <div className="mt-8">
          <LinkArrow href="/solutions">See all the bundles</LinkArrow>
        </div>
      </Section>

      {/* ── CTA ── */}
      <Section tone="warm" className="text-center">
        <Reveal className="mx-auto max-w-[680px]">
          <h2 className="t-display">Start on one undeniable result.</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3.5">
            <Button href="/contact" size="lg" icon="arrow-right" iconRight>
              Book a call
            </Button>
            <Button href="/proof" size="lg" variant="ghost">
              See it work
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  )
}
