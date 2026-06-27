import type { Metadata } from 'next'
import { pageMeta } from '@/lib/site'
import { pillars, modulesByPillar } from '@/lib/modules'
import { Section } from '@/components/ui/section'
import { Overline } from '@/components/ui/overline'
import { Reveal } from '@/components/ui/reveal'
import { LinkArrow } from '@/components/ui/link-arrow'
import { Button } from '@/components/ui/button'
import { SystemCore } from '@/components/signature/system-core'

export const metadata: Metadata = pageMeta({
  title: 'The System — one system of record for everything you build',
  description:
    'The engine under VextrusAI: one connected system of record for the full construction and real-estate lifecycle — finance, projects, procurement, sales, people, safety — inside one tenant boundary. An agent is only as real as what it can write to. This is what it writes to.',
  path: '/system',
})

// Why one connected system is the AI moat (master spec Part 5.2).
const MOAT = [
  {
    t: 'System of record',
    d: 'The agent does not hand you a document to re-key. It produces a command against the live system — a journal in the GL, a BOQ in costing. The output is the record, not a note about it.',
  },
  {
    t: 'Event-driven write-back',
    d: 'When a journal posts, a bill is approved, a milestone slips, the right modules react. The agents plug into the same core, so an approved draft propagates exactly as a human entry would.',
  },
  {
    t: 'One source of truth',
    d: 'Every module posts to the same ledger inside the same tenant boundary. One place an agent writes, one audit trail, one human who approves. No reconciliation between an "AI system" and the real one.',
  },
]

// The threads that flow end-to-end through the engine (shipped module flows;
// the present tense is honest — these are the ERP, not roadmap agents).
const THREADS = [
  { t: 'One purchase', d: 'Requisition → PO → goods received → three-way-matched bill → a balanced journal in the GL. No line re-keyed between steps.' },
  { t: 'A flat, lead to keys', d: 'A sales lead → booking → instalment schedule → AIT-deducted receipts → handover, all on one customer record.' },
  { t: "A project's money", d: "The Estimator's BOQ → costing → RA bills with retention → the cost centre that opened with the project → the ledger." },
  { t: 'Month-end', d: 'Journals from every module → the close checklist → trial balance, P&L and balance sheet, traced to source.' },
]

export default function SystemPage() {
  return (
    <>
      {/* ── Hero ── */}
      <Section tone="canvas" className="pt-[clamp(3rem,6vw,5rem)]">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal className="max-w-[560px]">
            <Overline>The System · the engine</Overline>
            <h1 className="t-hero mt-4 text-ink">One system of record for everything you build.</h1>
            <p className="mt-5 text-[17.5px] leading-relaxed text-ink-soft">
              The full construction and real-estate lifecycle — finance, projects, procurement, sales,
              people, safety — connected inside one tenant boundary. An agent is only as real as what
              it can write to. This is what it writes to.
            </p>
            <LinkArrow href="/ai" className="mt-6 inline-flex">
              Meet the workforce on top
            </LinkArrow>
          </Reveal>
          <Reveal delay={0.06} className="flex justify-center">
            <SystemCore className="w-full max-w-[420px]" />
          </Reveal>
        </div>
      </Section>

      {/* ── Why one connected system is the moat — the dark voltage band ── */}
      <Section tone="deep">
        <Reveal className="max-w-[680px]">
          <Overline>Why it&apos;s the moat</Overline>
          <h2 className="t-section mt-3.5">A ChatGPT wrapper can read a drawing. It has nowhere to write.</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-ink-invert-soft">
            Vextrus agents act instead of advise because underneath them sits a complete system of
            record. Three properties make that real:
          </p>
        </Reveal>
        <Reveal className="mt-10 grid gap-4 md:grid-cols-3" delay={0.05}>
          {MOAT.map((m, i) => (
            <div
              key={m.t}
              className="rounded-[14px] p-6"
              style={{ border: '1px solid oklch(0.965 0.005 83 / 0.14)' }}
            >
              <div className="title-block" style={{ color: 'var(--color-accent-hi)' }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="mt-2 font-display text-[19px] font-semibold tracking-tight">{m.t}</div>
              <p className="mt-2 text-[14px] leading-snug text-ink-invert-soft">{m.d}</p>
            </div>
          ))}
        </Reveal>
      </Section>

      {/* ── The engine, by pillar — 20 modules in named groups ── */}
      <Section tone="canvas">
        <Reveal className="max-w-[680px]">
          <Overline>The engine</Overline>
          <h2 className="t-section mt-3.5">The floor each class of agents writes to.</h2>
          <p className="mt-4 max-w-[560px] text-[16px] leading-relaxed text-ink-soft">
            One balanced set of books, one tenant boundary around them all — grouped by the part of a
            construction and real-estate business they run.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-x-10 gap-y-12 lg:grid-cols-2">
          {pillars.map((p) => (
            <Reveal key={p}>
              <div className="title-block flex items-center gap-3">
                <span className="text-accent">{p}</span>
                <span className="h-px flex-1" style={{ background: 'var(--color-line)' }} />
              </div>
              <ul className="mt-4 space-y-3">
                {modulesByPillar(p).map((m) => (
                  <li key={m.id} className="draft-object rounded-[12px] p-4">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-display text-[16px] font-semibold tracking-tight text-ink">
                        {m.name}
                      </span>
                      <span className="font-mono text-[11px] text-ink-dim">{m.short}</span>
                    </div>
                    <p className="mt-1.5 text-[13.5px] leading-snug text-ink-soft">{m.achieve}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── The four threads ── */}
      <Section tone="warm">
        <Reveal className="max-w-[680px]">
          <Overline>It runs across the whole business</Overline>
          <h2 className="t-section mt-3.5">One action, end to end, with no double entry.</h2>
        </Reveal>
        <Reveal className="mt-10 grid gap-4 sm:grid-cols-2" delay={0.05}>
          {THREADS.map((t) => (
            <div key={t.t} className="draft-object rounded-[14px] p-6">
              <div className="font-display text-[18px] font-semibold tracking-tight text-ink">
                {t.t}
              </div>
              <p className="mt-2 text-[14.5px] leading-snug text-ink-soft">{t.d}</p>
            </div>
          ))}
        </Reveal>
      </Section>

      {/* ── CTA ── */}
      <Section tone="canvas" className="text-center">
        <Reveal className="mx-auto max-w-[680px]">
          <h2 className="t-display">The engine is real. So are the agents on it.</h2>
          <p className="mx-auto mt-5 max-w-[520px] text-[17px] leading-relaxed text-ink-soft">
            See the one agent that ships today writing to this system — and the roadmap it proves out.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3.5">
            <Button href="/proof" size="lg" icon="arrow-right" iconRight>
              See it work
            </Button>
            <Button href="/contact" size="lg" variant="ghost">
              Book a call
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  )
}
