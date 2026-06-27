import type { Metadata } from 'next'
import { pageMeta } from '@/lib/site'
import { agentsByTier, tierMeta, type Tier } from '@/lib/agents'
import { Section } from '@/components/ui/section'
import { Overline } from '@/components/ui/overline'
import { Reveal } from '@/components/ui/reveal'
import { LinkArrow } from '@/components/ui/link-arrow'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { SystemProof } from '@/components/system-proof'

export const metadata: Metadata = pageMeta({
  title: 'VextrusAI — the AI workforce for construction & real estate',
  description:
    'One AI workforce, built on one system of record. The Estimator ships today — a drawing becomes a priced BOQ posted to your books with one approval. Every agent is labelled by what it can actually do, and no agent changes your books on its own.',
  path: '/ai',
})

const flagship = agentsByTier('flagship')
const elevatable = agentsByTier('elevatable')
const embedded = agentsByTier('embedded')

const HOW = [
  { k: '01', t: 'Read', d: 'The agent reads the messy real input — a drawing, a bill, a statement.' },
  { k: '02', t: 'Compute', d: 'A deterministic engine works out the exact change — the LLM is a sensor, never the maths.' },
  { k: '03', t: 'Review', d: 'You confirm, modify or reject on a visible diff. Self-approval is blocked in the domain.' },
  { k: '04', t: 'Write', d: 'A registered command posts it. Identity, time, before-and-after — logged.' },
]

export default function AiPage() {
  return (
    <>
      {/* ── Hero ── */}
      <Section tone="canvas" className="pt-[clamp(3rem,6vw,5rem)]">
        <Reveal className="max-w-[760px]">
          <Overline>VextrusAI · the workforce</Overline>
          <h1 className="t-hero mt-4 text-ink">Your AI workforce, built on one system.</h1>
          <p className="mt-5 max-w-[600px] text-[17.5px] leading-relaxed text-ink-soft">
            Not a chatbot bolted on the side. A workforce that reads your real documents, computes the
            exact change, and — on your approval — writes it to the same books your team already uses.
            One ships today; the rest are labelled honestly.
          </p>
          <p className="mt-5 flex items-start gap-2.5 text-[14px] leading-snug text-ink">
            <Icon name="shield-check" size={17} className="mt-0.5 shrink-0 text-accent" />
            <span>
              The LLM is a sensor. The engine computes every taka — and{' '}
              <span className="font-semibold">you approve every write.</span>
            </span>
          </p>
        </Reveal>
      </Section>

      {/* ── The flagship — Available now ── */}
      <Section tone="warm">
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <span
              className="inline-block rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-accent"
              style={{ border: '1px solid var(--color-line-strong)' }}
            >
              {tierMeta.flagship.publicLabel}
            </span>
            <h2 className="t-section mt-4">{flagship[0]?.name}</h2>
            <p className="mt-4 max-w-[480px] text-[16.5px] leading-relaxed text-ink-soft">
              Upload an RCC structural drawing. Vision extracts the dimensions; the executor computes a
              priced Bill of Quantities and a full, waste-minimised Bar Bending Schedule. One 4-Eyes
              approval posts the real BOQ lines to your costing books. Shipped, demo-leading, and
              proven end-to-end.
            </p>
            <dl className="mt-6 grid max-w-[460px] grid-cols-2 gap-x-6 gap-y-4">
              {[
                ['Reads', 'tender drawings (DWG)'],
                ['Writes to', 'Project Costing'],
                ['Boundary', 'one registered command'],
                ['Control', '4-Eyes, self-approval locked'],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="title-block">{k}</dt>
                  <dd className="mt-1 text-[14px] text-ink">{v}</dd>
                </div>
              ))}
            </dl>
            <LinkArrow href="/proof" className="mt-6 inline-flex">
              See the full walkthrough
            </LinkArrow>
          </Reveal>
          <Reveal delay={0.06} className="draft-frame">
            <SystemProof
              poster="/media/estimator/c1-estimator-draft-100pct.webp"
              width={1280}
              height={720}
              status="live"
              frame={{ url: '/ai/drafts/019edff9' }}
              alt="The VextrusAI Estimator draft at 100% confidence — priced BOQ and Bar Bending Schedule, ready for 4-Eyes approval."
              caption="Real Estimator output — Pile Cap PC4, 14.70 m³, priced BOQ + 4-Eyes draft."
            />
          </Reveal>
        </div>
      </Section>

      {/* ── The honest roster — asymmetric by what each can do ── */}
      <Section tone="canvas">
        <Reveal className="max-w-[720px]">
          <Overline>The roster</Overline>
          <h2 className="t-section mt-3.5">Every agent, labelled by what it can actually do.</h2>
          <p className="mt-4 max-w-[580px] text-[16px] leading-relaxed text-ink-soft">
            All built on the same system. The size of each card tells the truth: one shipped flagship,
            a row in development, and a wider roadmap — never a wall of equals pretending to be live.
          </p>
        </Reveal>

        {/* In development — the elevatable row */}
        <Reveal className="mt-12">
          <RosterBand tier="elevatable" />
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {elevatable.map((a) => (
              <div key={a.id} className="draft-object rounded-[12px] p-4">
                <div className="font-display text-[16px] font-semibold tracking-tight text-ink">
                  {a.name}
                </div>
                <p className="mt-1.5 text-[13px] leading-snug text-ink-soft">{a.does}.</p>
                <div className="title-block mt-2.5">→ {a.writesTo}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* On the roadmap — the muted embedded grid */}
        <Reveal className="mt-12" delay={0.05}>
          <RosterBand tier="embedded" />
          <div className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {embedded.map((a) => (
              <div
                key={a.id}
                className="rounded-[10px] border px-4 py-3"
                style={{ borderColor: 'var(--color-line)', background: 'transparent' }}
              >
                <div className="text-[14px] font-medium text-ink-soft">{a.name}</div>
                <p className="mt-1 text-[12.5px] leading-snug text-ink-dim">{a.does}.</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* ── How the work happens — numberless 4-Eyes mechanism ── */}
      <Section tone="warm">
        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="max-w-[460px]">
            <Overline>The glass box</Overline>
            <h2 className="t-section mt-3.5">AI decides nothing. You decide everything.</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">
              Every agent action runs the same loop, on a visible diff, through one approval gate. The
              reasoning is shown — the confidence, the factors behind it, in plain words — so you
              approve with your eyes open.
            </p>
            <div className="mt-6 draft-frame">
              <SystemProof
                poster="/media/glass-box/c5-ai-runs-dashboard.webp"
                width={1280}
                height={720}
                status="live"
                frame={{ url: '/ai/runs' }}
                alt="The VextrusAI runs and accuracy dashboard — the glass-box confidence factors behind each draft."
                caption="Real runs dashboard — how VextrusAI has performed across the ERP, with the reasoning shown."
              />
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <ol className="grid gap-4 sm:grid-cols-2">
              {HOW.map((s) => (
                <li key={s.k} className="draft-object rounded-[14px] p-5">
                  <div className="title-block">{s.k}</div>
                  <div className="mt-2 font-display text-[19px] font-semibold tracking-tight text-ink">
                    {s.t}
                  </div>
                  <p className="mt-1.5 text-[14px] leading-snug text-ink-soft">{s.d}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Section>

      {/* ── CTA ── */}
      <Section tone="canvas" className="text-center">
        <Reveal className="mx-auto max-w-[680px]">
          <h2 className="t-display">See the one that ships today.</h2>
          <p className="mx-auto mt-5 max-w-[520px] text-[17px] leading-relaxed text-ink-soft">
            Bring a structural drawing. We&apos;ll price it on your own project and post it to the
            books once you approve.
          </p>
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

function RosterBand({ tier }: { tier: Tier }) {
  const meta = tierMeta[tier]
  return (
    <div className="flex items-center gap-3">
      <span
        className="inline-block rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-ink-soft"
        style={{ border: '1px solid var(--color-line-strong)' }}
      >
        {meta.publicLabel}
      </span>
      <span className="h-px flex-1" style={{ background: 'var(--color-line)' }} />
    </div>
  )
}
