import type { Metadata } from 'next'
import { pageMeta } from '@/lib/site'
import { Section } from '@/components/ui/section'
import { Overline } from '@/components/ui/overline'
import { Reveal } from '@/components/ui/reveal'
import { LinkArrow } from '@/components/ui/link-arrow'
import { Icon } from '@/components/ui/icon'
import { Button } from '@/components/ui/button'
import { Hero } from '@/components/sections/home/hero'
import { SystemProof } from '@/components/system-proof'
import { SystemCore } from '@/components/signature/system-core'

export const metadata: Metadata = pageMeta({
  title: 'Vextrus — the AI-native ERP for Bangladesh construction & real estate',
  description:
    'One system of record for everything you build, with an AI workforce that does the work on it. Starting with the Estimator: a structural drawing becomes a priced BOQ posted to your books with one approval. No agent changes your books on its own — you approve every taka.',
  path: '/',
})

// The honest 3-tier roster vocabulary — the asymmetric roster IS the honesty.
const TIERS = [
  {
    badge: 'Available now',
    live: true,
    title: 'The Estimator',
    body: 'A structural drawing becomes a priced BOQ and a waste-minimised Bar Bending Schedule, posted to your costing books on one approval. Shipped, and proven end-to-end.',
  },
  {
    badge: 'In development',
    live: false,
    title: 'The next flagships',
    body: 'Leakage Detector, BOQ Rate Estimator and more — each built on the same write-back boundary. Coming, with the same 4-Eyes control.',
  },
  {
    badge: 'On the roadmap',
    live: false,
    title: 'The wider workforce',
    body: 'Advisory agents across finance, projects and compliance — direction the system is built toward, labelled honestly as not yet available.',
  },
] as const

// The BD jobs — outcome first, capability second, mechanism as proof (spec §5).
const OUTCOMES = [
  {
    icon: 'rebar-chart',
    outcome: 'Never lose money on a wrong estimate',
    how: 'A drawing is priced in minutes, not a week — and the quantities land in costing with nothing re-keyed.',
    tag: 'Estimator',
  },
  {
    icon: 'layers',
    outcome: 'Know your real project cost today',
    how: 'Costing and the ledger move together, so the number you see is the number on the books.',
    tag: 'Costing + GL',
  },
  {
    icon: 'file-check',
    outcome: 'Pay subcontractors and stay NBR-compliant',
    how: 'The right TDS/VDS computed and posted per payment; the Mushak return assembled from real transactions.',
    tag: 'Sub-eq + Tax',
  },
  {
    icon: 'shield-check',
    outcome: 'Close the month without chasing site managers',
    how: 'Approvals, progress and journals flow through one connected system of record.',
    tag: 'GL + Execution',
  },
] as const

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* ── The Estimator credibility pivot — the real capture, larger ── */}
      <Section tone="canvas">
        <Reveal className="mx-auto max-w-[760px] text-center">
          <Overline>The proof</Overline>
          <h2 className="t-section mt-3.5">This isn&apos;t a mockup. One agent does this today.</h2>
          <p className="mx-auto mt-4 max-w-[600px] text-[17px] leading-relaxed text-ink-soft">
            The model reads the dimensions from your drawing. A fixed-rule engine works out every
            taka — a priced Bill of Quantities and a full Bar Bending Schedule — and writes it to
            your costing books the moment you approve.
          </p>
        </Reveal>
        <Reveal className="mx-auto mt-12 max-w-[860px]" delay={0.05}>
          <div className="draft-frame">
            <SystemProof
              poster="/media/estimator/c1-estimator-draft-100pct.webp"
              width={1280}
              height={720}
              status="live"
              frame={{ url: '/ai/drafts/019edff9' }}
              alt="A real VextrusAI Estimator draft at 100% confidence — pile-cap takeoff, priced BOQ and Bar Bending Schedule, ready for 4-Eyes approval."
              caption="Real output — Pile Cap PC4, 14.70 m³ concrete, priced BOQ + 4-Eyes draft. Nothing here is simulated."
            />
          </div>
        </Reveal>
        <div className="mt-9 text-center">
          <LinkArrow href="/proof">See the full Estimator walkthrough</LinkArrow>
        </div>
      </Section>

      {/* ── The System — the ONE dark voltage band (the engine/AI reveal) ── */}
      <Section tone="deep">
        <div className="grid items-center gap-12 md:grid-cols-[1fr_0.9fr]">
          <Reveal className="max-w-[540px]">
            <Overline>The System</Overline>
            <h2 className="t-section mt-3.5">One system of record. The engine the agents write to.</h2>
            <p className="mt-4 text-[16.5px] leading-relaxed text-ink-invert-soft">
              An agent is only as real as what it can write to. Underneath every Vextrus agent sits a
              complete construction-and-real-estate system of record — the books, the projects, the
              vendors, the sites, the taxes. When an agent acts, a registered command writes to that
              system, and a named person approves it first. Nothing posts on its own.
            </p>
            <LinkArrow href="/system" className="mt-6 inline-flex">
              How the engine works
            </LinkArrow>
          </Reveal>
          <Reveal delay={0.08} className="flex justify-center">
            <SystemCore className="w-full max-w-[420px]" />
          </Reveal>
        </div>
      </Section>

      {/* ── How it works — abstract, numberless mechanism ── */}
      <Section tone="warm">
        <Reveal className="mx-auto max-w-[720px] text-center">
          <Overline>How it works</Overline>
          <h2 className="t-section mt-3.5">Four steps, one approval.</h2>
        </Reveal>
        <Reveal className="mt-12" delay={0.05}>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { k: '01', t: 'Read', d: 'The agent reads the messy real input — a drawing, a bill.' },
              { k: '02', t: 'Compute', d: 'A deterministic engine works out the exact change + a confidence score.' },
              { k: '03', t: 'Review', d: 'You confirm, modify or reject on a visible diff. Self-approval is blocked.' },
              { k: '04', t: 'Write', d: 'A registered command posts it. Identity, time, before-and-after — logged.' },
            ].map((s) => (
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
      </Section>

      {/* ── The workforce, honestly — the 3-tier asymmetric roster ── */}
      <Section tone="canvas">
        <Reveal className="mx-auto max-w-[720px] text-center">
          <Overline>The workforce</Overline>
          <h2 className="t-section mt-3.5">
            One ships today, and proves what the rest will do.
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-[16px] leading-relaxed text-ink-soft">
            All built on the same system. We label every agent by what it can actually do — and only
            one is a shipped flagship.
          </p>
        </Reveal>
        <Reveal className="mt-12 grid items-stretch gap-4 lg:grid-cols-3" delay={0.05}>
          {TIERS.map((t) => (
            <div
              key={t.title}
              className={`rounded-[14px] p-6 ${t.live ? 'draft-cut' : 'draft-object'}`}
            >
              <span
                className="inline-block rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.08em]"
                style={{
                  color: t.live ? 'var(--color-accent)' : 'var(--color-ink-dim)',
                  border: '1px solid var(--color-line-strong)',
                }}
              >
                {t.badge}
              </span>
              <div className="mt-4 font-display text-[22px] font-semibold tracking-tight text-ink">
                {t.title}
              </div>
              <p className="mt-2 text-[14.5px] leading-snug text-ink-soft">{t.body}</p>
            </div>
          ))}
        </Reveal>
        <div className="mt-9 text-center">
          <LinkArrow href="/ai">Meet VextrusAI</LinkArrow>
        </div>
      </Section>

      {/* ── Outcome cards — the BD jobs ── */}
      <Section tone="warm">
        <Reveal className="mx-auto max-w-[720px] text-center">
          <Overline>What it changes</Overline>
          <h2 className="t-section mt-3.5">You don&apos;t buy agents. You buy the end of a problem.</h2>
        </Reveal>
        <Reveal className="mt-12 grid gap-4 sm:grid-cols-2" delay={0.05}>
          {OUTCOMES.map((o) => (
            <div key={o.outcome} className="draft-object rounded-[14px] p-6">
              <span
                className="inline-grid h-[34px] w-[34px] place-items-center rounded-[9px] border text-accent"
                style={{ borderColor: 'var(--color-line-strong)' }}
              >
                <Icon name={o.icon} size={17} />
              </span>
              <div className="mt-3.5 font-display text-[19px] font-semibold leading-tight tracking-tight text-ink">
                {o.outcome}
              </div>
              <p className="mt-2 text-[14.5px] leading-snug text-ink-soft">{o.how}</p>
              <div className="title-block mt-3">{o.tag}</div>
            </div>
          ))}
        </Reveal>
        <p className="mx-auto mt-8 max-w-[640px] text-center text-[13px] leading-normal text-ink-dim">
          Priced to the money it recovers; payback in weeks. No customer-facing price list — the
          conversation is about what each solution returns.
        </p>
      </Section>

      {/* ── Final CTA ── */}
      <Section tone="canvas" className="text-center">
        <Reveal className="relative mx-auto max-w-[760px]">
          <h2 className="t-display">Bring a structural drawing.</h2>
          <p className="mx-auto mt-5 max-w-[560px] text-[18px] leading-relaxed text-ink-soft">
            We&apos;ll price it on your own project and post it to the books once you approve. See the
            one agent that ships today — and the system it&apos;s built on.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3.5">
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
