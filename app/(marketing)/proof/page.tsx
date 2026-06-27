import type { Metadata } from 'next'
import { pageMeta } from '@/lib/site'
import { lanes, type Feasibility } from '@/lib/agents'
import { Section, Container } from '@/components/ui/section'
import { Overline } from '@/components/ui/overline'
import { Reveal } from '@/components/ui/reveal'
import { LinkArrow } from '@/components/ui/link-arrow'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { PinnedPipeline } from '@/components/signature/pinned-pipeline'

export const metadata: Metadata = pageMeta({
  title: 'Proof — see it work, and the roadmap behind it',
  description:
    'The Estimator works end-to-end today: a drawing becomes a priced BOQ and Bar Bending Schedule posted to your books on one approval. Tenant-isolated, audit-logged, NBR/RAJUK/BNBC-native. One agent ships now and proves what the rest will do.',
  path: '/proof',
})

// Honest 3-tier mapping of the roadmap (no live present tense for what isn't shipped).
const FEAS_LABEL: Record<Feasibility, string> = {
  shipped: 'Available now',
  elevatable: 'In development',
  advisory: 'On the roadmap',
  'build-ahead': 'On the roadmap',
}

const SECURITY = [
  { icon: 'shield-check', t: 'Tenant-isolated at the database', d: 'Row-level security in Postgres — one company never sees another, enforced on every query, not just the app.' },
  { icon: 'file-check', t: 'A registered-command write-back', d: 'An agent can only post through a named command a person approves. It can never exceed the permissions of whoever configured it.' },
  { icon: 'layers', t: 'An immutable audit trail', d: 'Identity, timestamp, and the before-and-after of every write — agent or human — recorded and tamper-evident.' },
] as const

const COMPLIANCE = [
  { t: 'NBR', d: 'The Mushak 6.3 → 9.1 suite, VAT/TDS/VDS/AIT computed per payment, with the rule on file.' },
  { t: 'RAJUK · CDA · BNBC', d: 'Approval tracking, FAR, and building-code records built into project foundation.' },
  { t: 'BBS · SOR · IPC', d: 'Bar Bending Schedules, government schedules of rates, and RA/IPC bill formats — the estimating moat.' },
  { t: 'Lakh · Crore · Jul–Jun', d: 'BD money notation and the July–June fiscal year, everywhere, by default.' },
]

export default function ProofPage() {
  return (
    <>
      {/* ── Hero: the walkthrough ── */}
      <Section tone="canvas" className="pt-[clamp(3rem,6vw,5rem)]">
        <Reveal className="mx-auto max-w-[760px] text-center">
          <Overline>Proof</Overline>
          <h1 className="t-hero mt-4 text-ink">See it work. Then see the roadmap.</h1>
          <p className="mx-auto mt-5 max-w-[600px] text-[17.5px] leading-relaxed text-ink-soft">
            One agent ships today — the Estimator. A structural drawing becomes a priced Bill of
            Quantities and a full Bar Bending Schedule, posted to your costing books on one approval.
            This is the real output, not a mockup.
          </p>
        </Reveal>
      </Section>

      {/* ── The pinned state-to-state walkthrough — the one signature interaction ── */}
      <section className="relative bg-canvas pb-[clamp(2rem,5vw,4rem)]">
        <Container>
          <PinnedPipeline />
        </Container>
      </section>

      {/* ── The security story ── */}
      <Section tone="warm">
        <Reveal className="max-w-[680px]">
          <Overline>Why you can trust it to write</Overline>
          <h2 className="t-section mt-3.5">The same controls a careful CFO would demand.</h2>
        </Reveal>
        <Reveal className="mt-10 grid gap-4 md:grid-cols-3" delay={0.05}>
          {SECURITY.map((s) => (
            <div key={s.t} className="draft-object rounded-[14px] p-6">
              <span
                className="inline-grid h-[34px] w-[34px] place-items-center rounded-[9px] border text-accent"
                style={{ borderColor: 'var(--color-line-strong)' }}
              >
                <Icon name={s.icon} size={17} />
              </span>
              <div className="mt-3.5 font-display text-[17px] font-semibold leading-tight tracking-tight text-ink">
                {s.t}
              </div>
              <p className="mt-2 text-[14px] leading-snug text-ink-soft">{s.d}</p>
            </div>
          ))}
        </Reveal>
      </Section>

      {/* ── Built for Bangladesh ── */}
      <Section tone="canvas">
        <Reveal className="max-w-[680px]">
          <Overline>Built for Bangladesh, not localized</Overline>
          <h2 className="t-section mt-3.5">A foreign agent can be clever. It cannot be Bangladeshi.</h2>
        </Reveal>
        <Reveal className="mt-10 grid gap-4 sm:grid-cols-2" delay={0.05}>
          {COMPLIANCE.map((c) => (
            <div key={c.t} className="draft-object rounded-[14px] p-5">
              <div className="title-block text-accent">{c.t}</div>
              <p className="mt-2 text-[14.5px] leading-snug text-ink">{c.d}</p>
            </div>
          ))}
        </Reveal>
        <div className="mt-7">
          <LinkArrow href="/bangladesh">The full Bangladesh moat</LinkArrow>
        </div>
      </Section>

      {/* ── The empty intersection — the 2×2 ── */}
      <Section tone="warm">
        <Reveal className="mx-auto max-w-[680px] text-center">
          <Overline>The white space</Overline>
          <h2 className="t-section mt-3.5">The only one that acts, and is built for Bangladesh.</h2>
        </Reveal>
        <Reveal className="mx-auto mt-10 max-w-[560px]" delay={0.05}>
          <div className="draft-object grid grid-cols-2 overflow-hidden rounded-[14px]">
            {[
              { label: 'Foreign ERP', sub: 'acts, not BD-native', cls: '' },
              { label: 'Vextrus', sub: 'acts · BD-native', cls: 'draft-cut', live: true },
              { label: 'Spreadsheets', sub: 'neither', cls: '' },
              { label: 'Local accounting', sub: 'BD-native, advises only', cls: '' },
            ].map((q, i) => (
              <div
                key={q.label}
                className={`p-6 ${q.live ? 'draft-cut' : ''}`}
                style={{
                  borderTop: i >= 2 ? '1px solid var(--color-line-strong)' : undefined,
                  borderLeft: i % 2 === 1 ? '1px solid var(--color-line-strong)' : undefined,
                }}
              >
                <div
                  className="font-display text-[18px] font-semibold tracking-tight"
                  style={{ color: q.live ? 'var(--color-accent)' : 'var(--color-ink)' }}
                >
                  {q.label}
                </div>
                <div className="title-block mt-1.5">{q.sub}</div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center font-mono text-[12px] text-ink-dim">
            Drawing → priced BOQ → your ledger. No ERP in Bangladesh can show you that.
          </p>
        </Reveal>
      </Section>

      {/* ── The honest Now / Next / Later roadmap ── */}
      <Section tone="canvas">
        <Reveal className="max-w-[680px]">
          <Overline>The roadmap, honestly</Overline>
          <h2 className="t-section mt-3.5">One ships today, and proves what the rest will do.</h2>
          <p className="mt-4 max-w-[560px] text-[16px] leading-relaxed text-ink-soft">
            Direction, not a promise that everything is live. Each agent is labelled by what it can
            actually do today.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-x-8 gap-y-10 lg:grid-cols-2">
          {lanes.map((lane) => (
            <Reveal key={lane.id}>
              <div className="title-block flex items-center gap-3">
                <span className="text-accent">{lane.name}</span>
                <span className="h-px flex-1" style={{ background: 'var(--color-line)' }} />
              </div>
              <ul className="mt-4 space-y-3">
                {lane.agents.map((a) => (
                  <li
                    key={a.name}
                    className={`rounded-[12px] p-4 ${a.feasibility === 'shipped' ? 'draft-cut' : 'draft-object'}`}
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-display text-[15.5px] font-semibold tracking-tight text-ink">
                        {a.name}
                      </span>
                      <span
                        className="shrink-0 font-mono text-[10px] uppercase tracking-[0.06em]"
                        style={{
                          color:
                            a.feasibility === 'shipped'
                              ? 'var(--color-accent)'
                              : 'var(--color-ink-dim)',
                        }}
                      >
                        {FEAS_LABEL[a.feasibility]}
                      </span>
                    </div>
                    <p className="mt-1.5 text-[13.5px] leading-snug text-ink-soft">{a.outcome}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── CTA ── */}
      <Section tone="warm" className="text-center">
        <Reveal className="mx-auto max-w-[680px]">
          <h2 className="t-display">Bring a drawing. See it priced on your own project.</h2>
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
