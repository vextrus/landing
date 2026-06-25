import type { CSSProperties } from 'react'
import type { Metadata } from 'next'
import { pageMeta } from '@/lib/site'
import { Section } from '@/components/ui/section'
import { Overline } from '@/components/ui/overline'
import { Reveal } from '@/components/ui/reveal'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { LinkArrow } from '@/components/ui/link-arrow'
import { Icon, type IconName } from '@/components/ui/icon'
import { LiveEstimatorFlow } from '@/components/signature/live-estimator-flow'
import { OutcomeCounter } from '@/components/ui/outcome-counter'
import { WasteCounter } from '@/components/sections/estimator/waste-counter'

export const metadata: Metadata = pageMeta({
  title: 'The VextrusAI Estimator — drawing in, priced BOQ out',
  description:
    'The flagship: upload one RCC structural drawing and get a priced Bill of Quantities and a full Bar Bending Schedule in minutes — written to your costing books on your approval. The model reads the page; the engine does the maths. No number is guessed.',
  path: '/estimator',
})

// ── Section 3: sensor → executor → write-back ──
const HOW: {
  step: string
  label: string
  labelColor: string
  title: string
  body: React.ReactNode
  emphasis?: boolean
}[] = [
  {
    step: '01',
    label: 'MODEL READS',
    labelColor: 'oklch(0.66 0.11 285)',
    title: 'Read the drawing',
    body: 'The vision model returns measurements only — counts, lengths, breadths, depths in millimetres, a read-confidence per element, and a plain note on what it saw. It cannot produce a single billable number.',
  },
  {
    step: '02',
    label: 'ENGINE COMPUTES',
    labelColor: 'oklch(0.70 0.10 95)',
    title: 'Do the maths',
    body: 'Concrete volume from count × L × B × D. The Bar Bending Schedule from BS 8666 cutting lengths and d²/162 weights. The price from a dated schedule-of-rates row, with a clear material, labour, and equipment buildup.',
  },
  {
    step: '03',
    label: '4-EYES WRITE-BACK',
    labelColor: 'var(--color-accent)',
    title: 'Post on approval',
    emphasis: true,
    body: (
      <>
        A named reviewer approves the diff in front of them. Only then does{' '}
        <span className="font-mono text-accent">ImportEstimatedBoq</span> write the real BOQ lines
        into project costing. Nothing posts until that approval.
      </>
    ),
  },
]

// ── Section 4: what it returns ──
const RETURNS: { icon: IconName; accent: string; title: string; body: string }[] = [
  {
    icon: 'rebar',
    accent: 'var(--mod-costing)',
    title: 'A priced Bill of Quantities',
    body: 'Concrete volume the engine works out from the drawing’s dimensions, priced against a PWD / RHD / RAJUK schedule of rates with a clear material, labour, and equipment buildup.',
  },
  {
    icon: 'rebar-chart',
    accent: 'var(--color-accent)',
    title: 'A full Bar Bending Schedule',
    body: 'Every bar mark, diameter, and shape; cutting lengths to BS 8666; bar weights from d²/162; totals by diameter from 8 mm to 40 mm.',
  },
  {
    icon: 'gauge',
    accent: 'var(--color-success)',
    title: 'Less steel thrown away',
    body: 'The rebar is laid out on standard stock lengths to cut waste well below a one-bar-per-stock baseline — steel an estimator never normally gets back.',
  },
  {
    icon: 'layers',
    accent: 'oklch(0.66 0.11 285)',
    title: 'Side by side, every line scored',
    body: 'The drawing sits next to editable BOQ and BBS tables, a confidence chip on every line, low-confidence rows flagged for a second look. Edit or drop any line; export the lot to Excel.',
  },
  {
    icon: 'shield-check',
    accent: 'oklch(0.66 0.13 245)',
    title: 'Written back on approval only',
    body: 'Send it for approval, and on a named reviewer’s sign-off ImportEstimatedBoq writes the real BOQ lines into project costing. Until then the draft waits; nothing posts on its own.',
  },
  {
    icon: 'check',
    accent: 'var(--mod-realestate)',
    title: 'A number you can trust',
    body: 'The score on each line is the engine’s amount-weighted certainty, to one decimal — not a model’s guess. Every figure traces back to a source you can click through to.',
  },
]

// ── Section 5: the estimating moat ──
const MOAT: { tag: string; tagColor: string; title: string; body: string }[] = [
  {
    tag: 'BBS',
    tagColor: 'var(--mod-costing)',
    title: 'Bar Bending Schedule',
    body: 'The BD rebar cutting-and-bending convention, 8 mm to 40 mm.',
  },
  {
    tag: 'SOR',
    tagColor: 'var(--mod-procurement)',
    title: 'Schedule of Rates',
    body: 'PWD / RHD / RAJUK published rate books, with a transparent buildup.',
  },
  {
    tag: 'IPC',
    tagColor: 'var(--mod-ar)',
    title: 'IPC / RA-bill',
    body: 'The running-account bill format a BD QS and tender expect.',
  },
  {
    tag: 'Lean',
    tagColor: 'var(--mod-inventory)',
    title: 'Lean-concrete sheet',
    body: 'The measurement sheet for blinding and sub-base layers.',
  },
]

export default function EstimatorPage() {
  return (
    <>
      {/* ── Hero ── */}
      <Section tone="canvas">
        <div className="bg-atmosphere pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative">
          <Reveal className="mb-5 flex items-center gap-2.5 font-mono text-[12px] text-ink-soft">
            <span>The flagship</span>
            <span aria-hidden="true" className="opacity-40">
              /
            </span>
            <span className="text-accent">VextrusAI Estimator</span>
          </Reveal>

          <div className="grid items-end gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <Reveal>
              <Badge
                tone="accent"
                color="var(--color-success)"
                className="mb-6 uppercase tracking-[0.08em]"
              >
                <span
                  className="h-[7px] w-[7px] rounded-full"
                  style={{ background: 'var(--color-success)' }}
                />
                Shipped · the only fully-realized flagship
              </Badge>
              <h1 className="t-display">
                A week of an engineer’s work,
                <br />
                <span className="italic">priced in three minutes.</span>
              </h1>
              <p className="mt-6 max-w-[540px] text-[18px] leading-relaxed text-ink-soft">
                Upload one RCC structural drawing — a rebar-heavy pile cap, the hardest take-off an
                estimator does. In minutes, a tender-ready priced BOQ and Bar Bending Schedule,
                posted to your costing books on your approval.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="flex flex-col gap-3.5">
                <div className="grid grid-cols-2 gap-3.5">
                  <div className="rounded-[14px] border border-line bg-raised p-[18px]">
                    <div className="font-mono text-[28px] font-semibold leading-none text-ink">
                      ~3 min
                    </div>
                    <div className="mt-2 text-[12.5px] text-ink-soft">
                      vs 6–10 person-hours in Excel
                    </div>
                  </div>
                  <div className="rounded-[14px] border border-line bg-raised p-[18px]">
                    <div className="font-mono text-[28px] font-semibold leading-none text-ink">
                      BS 8666
                    </div>
                    <div className="mt-2 text-[12.5px] text-ink-soft">
                      BBS cutting lengths · d²/162
                    </div>
                  </div>
                </div>
                <Button href="/contact" size="lg" icon="arrow-right" iconRight className="w-full">
                  Price your own drawing, live
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ── The live demo (warm structural break) ── */}
      <Section tone="warm">
        <Reveal className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <Overline color="oklch(0.55 0.13 44)">A worked example · pile cap PC-3</Overline>
            <h2 className="t-display mt-2.5 text-ink-dark">
              The drawing, and what the engine <span className="italic">made of it.</span>
            </h2>
          </div>
          <span className="font-mono text-[12px] text-ink-dark-soft">
            side by side · confidence on every line
          </span>
        </Reveal>

        <Reveal className="mt-12" delay={0.05}>
          <LiveEstimatorFlow variant="full" />
        </Reveal>

        {/* Executor-authoritative trust line */}
        <Reveal
          className="mt-6 flex items-center gap-2.5 text-[13px] font-medium text-ink-dark"
          delay={0.07}
        >
          <span
            className="inline-grid h-[22px] w-[22px] shrink-0 place-items-center rounded-[7px]"
            style={{ background: 'oklch(0.50 0.12 275 / 0.1)', color: 'oklch(0.42 0.12 275)' }}
            aria-hidden="true"
          >
            <Icon name="shield-check" size={13} />
          </span>
          The model reads the page; the engine does the maths —{' '}
          <span className="italic">no number is guessed.</span>
        </Reveal>

        <Reveal
          className="mt-3 flex items-center gap-2.5 text-[12.5px] text-ink-dark-soft"
          delay={0.09}
        >
          <span
            className="inline-block h-[10px] w-[10px] rounded-[3px]"
            style={{
              background: 'oklch(0.75 0.14 75 / 0.25)',
              border: '1px solid oklch(0.55 0.14 75)',
            }}
            aria-hidden="true"
          />
          A low-confidence line is flagged for a second look — edit or drop it before approval.
          Approve, and the lines land in costing through{' '}
          <span className="font-mono text-ink-dark">ImportEstimatedBoq</span>.
        </Reveal>

        {/* Outcome counters — drawing-to-BOQ time + steel saved */}
        <Reveal className="mt-12" delay={0.11}>
          <div
            className="grid gap-6 rounded-[16px] border p-7 sm:grid-cols-2 sm:px-8"
            style={{ borderColor: 'var(--color-line-warm)', background: 'oklch(0.99 0.004 70)' }}
          >
            <OutcomeCounter value={8} suffix=" min" label="BOQ ready" was="~3 days" />
            <WasteCounter value={3.1} suffix="%" label="steel waste" was="~8%" />
          </div>
        </Reveal>
      </Section>

      {/* ── How it works: sensor → executor → write-back ── */}
      <Section tone="canvas">
        <Reveal className="mx-auto max-w-[680px] text-center">
          <Overline>How it works</Overline>
          <h2 className="t-section mt-3.5">The model reads the page. The engine does the maths.</h2>
          <p className="mx-auto mt-4 max-w-[560px] text-[16.5px] leading-relaxed text-ink-soft">
            The model only reads. The engine works out every taka — so no made-up number ever
            reaches your books.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-[18px] lg:grid-cols-3">
          {HOW.map((h, i) => (
            <Reveal key={h.step} delay={i * 0.07} className="h-full">
              <div
                className={`vxtile h-full rounded-[16px] border p-[26px] ${
                  h.emphasis ? 'border-accent' : 'border-line bg-raised'
                }`}
                style={
                  {
                    '--tile-accent': h.labelColor,
                    background: h.emphasis ? 'oklch(0.72 0.14 44 / 0.07)' : undefined,
                  } as CSSProperties
                }
              >
                <div className="mb-3.5 font-mono text-[11px]" style={{ color: h.labelColor }}>
                  {h.step} · {h.label}
                </div>
                <h3 className="m-0 mb-2 font-heading text-[18px] font-semibold">{h.title}</h3>
                <p className="m-0 text-[14px] leading-relaxed text-ink-soft">{h.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Provable by hand-calculation */}
        <Reveal className="mt-6" delay={0.1}>
          <div className="flex flex-wrap items-center gap-6 rounded-[16px] border border-line bg-raised p-[26px] sm:px-[30px]">
            <div className="min-w-[280px] flex-1">
              <div className="mb-2 font-mono text-[11px] text-ink-soft">CHECK IT BY HAND</div>
              <p className="m-0 text-[15px] leading-relaxed text-ink">
                If the model misreads a dimension, the worst case is a wrong <em>input</em> the
                reviewer can see and fix — never a made-up <em>output</em> that slips into the
                ledger.
              </p>
            </div>
            <code className="rounded-[10px] border border-line bg-[oklch(0.10_0.008_270)] px-[18px] py-3.5 font-mono text-[13px] leading-[1.7] text-ink-soft">
              V = count × (L/1000) × (B/1000) × (D/1000)
              <br />W = (d² / 162) × length
              <span style={{ color: 'oklch(0.55 0.02 270)' }}> // kg/m, per BS 8666</span>
            </code>
          </div>
        </Reveal>
      </Section>

      {/* ── What it returns ── */}
      <Section tone="deep">
        <div
          className="pointer-events-none absolute inset-0 bg-grid opacity-50"
          aria-hidden="true"
        />
        <div className="relative">
          <Reveal className="max-w-[680px]">
            <Overline>What it returns</Overline>
            <h2 className="t-section mt-3.5">A tender-ready estimate, posted to the books.</h2>
            <p className="mt-4 max-w-[600px] text-[16.5px] leading-relaxed text-ink-soft">
              Not a rough quantity. A priced BOQ, a full Bar Bending Schedule, and a cutting plan
              that saves steel — in the exact format a BD QS engineer and a BD tender expect.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
            {RETURNS.map((r, i) => (
              <Reveal key={r.title} delay={(i % 3) * 0.07} className="h-full">
                <div
                  className="vxtile h-full rounded-[16px] border border-line bg-raised p-[26px]"
                  style={{ '--tile-accent': r.accent } as CSSProperties}
                >
                  <span
                    className="vxtile-ic mb-4 inline-grid h-[42px] w-[42px] place-items-center rounded-[11px] border border-line"
                    style={{ color: r.accent }}
                  >
                    <Icon name={r.icon} size={20} />
                  </span>
                  <h3 className="m-0 mb-2 font-heading text-[17px] font-semibold">{r.title}</h3>
                  <p className="m-0 text-[13.5px] leading-relaxed text-ink-soft">{r.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ── The estimating moat ── */}
      <Section tone="canvas">
        <Reveal className="max-w-[680px]">
          <Overline>The estimating moat</Overline>
          <h2 className="t-section mt-3.5">The hardest thing here to copy.</h2>
          <p className="mt-4 text-[16.5px] leading-relaxed text-ink-soft">
            A foreign takeoff tool gives you a rough quantity. It does not know the BBS, the
            Schedule of Rates, or the IPC format — so it cannot post a tender-ready estimate to your
            books. These are not bolt-ons. They are what the engine works in, BD-native through and
            through.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MOAT.map((m, i) => (
            <Reveal key={m.tag} delay={i * 0.07} className="h-full">
              <div
                className="vxtile h-full rounded-[14px] border border-line bg-raised p-[22px]"
                style={{ '--tile-accent': m.tagColor } as CSSProperties}
              >
                <div className="mb-2.5 font-mono text-[13px]" style={{ color: m.tagColor }}>
                  {m.tag}
                </div>
                <h3 className="m-0 mb-1.5 font-heading text-[15px] font-semibold">{m.title}</h3>
                <p className="m-0 text-[13px] leading-normal text-ink-soft">{m.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── Recovered value (warm break) ── */}
      <Section tone="warm">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
          <Reveal>
            <Overline color="oklch(0.55 0.13 44)">Estimator-to-ERP · the land</Overline>
            <h2 className="t-display mt-3 text-ink-dark">
              A week of skilled QS time,
              <br />
              <span className="italic">collapsed to minutes.</span>
            </h2>
            <p className="mt-4 max-w-[480px] text-[16px] leading-relaxed text-ink-dark-soft">
              Typing errors on multi-crore lines go away; the priced quantities land straight in
              project costing with nothing re-keyed. The Bar Bending Schedule hands back steel that
              rough cutting throws away — money an estimator never normally gets back.
            </p>
            <p className="mt-4 max-w-[480px] text-[16px] leading-relaxed text-ink-dark-soft">
              It is the way in: the one piece of work you can show on the spot, and the cleanest
              first proof for a greenfield Bangladesh firm.
            </p>
            <LinkArrow href="/solutions" color="oklch(0.42 0.12 275)" className="mt-6 inline-flex">
              See the Estimator-to-ERP bundle
            </LinkArrow>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="grid gap-3.5 sm:grid-cols-2">
              {[
                { v: 'hours → minutes', l: 'per estimate' },
                { v: 'zero re-keying', l: 'drawing straight to costing' },
                { v: 'steel waste cut', l: 'nested to stock lengths' },
                { v: 'weeks to payback', l: 'measured against your own leakage' },
              ].map((c) => (
                <div
                  key={c.v}
                  className="rounded-[14px] border p-5"
                  style={{ borderColor: 'var(--color-line-warm)' }}
                >
                  <div className="font-heading text-[18px] font-semibold text-ink-dark">{c.v}</div>
                  <div className="mt-1.5 text-[12.5px] text-ink-dark-soft">{c.l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ── Final CTA ── */}
      <Section tone="canvas" className="text-center">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 70% at 50% 40%, oklch(0.55 0.1 275 / 0.2), transparent), radial-gradient(ellipse 50% 50% at 70% 80%, oklch(0.55 0.1 44 / 0.14), transparent)',
          }}
          aria-hidden="true"
        />
        <Reveal className="relative mx-auto max-w-[720px]">
          <h2 className="t-display italic">Bring a drawing. Watch it become money.</h2>
          <p className="mx-auto mt-6 max-w-[540px] text-[18px] leading-relaxed text-ink-soft">
            We’ll run the Estimator on your kind of project, in your format, in lakh and crore — and
            post it to the books on your approval.
          </p>
          <p className="mx-auto mt-3 max-w-[540px] text-[14px] leading-relaxed text-ink-dim">
            The model reads the page; the engine does the maths. No number is guessed.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3.5">
            <Button href="/contact" size="lg" icon="arrow-right" iconRight>
              Book a demo
            </Button>
            <Button href="/workforce" size="lg" variant="ghost">
              See the other 22 agents
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  )
}
