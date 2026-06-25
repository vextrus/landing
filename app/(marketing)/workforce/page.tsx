import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import { pageMeta } from '@/lib/site'
import {
  agentsByTier,
  lanes,
  type AgentDef,
  type Feasibility,
  type RoadmapAgent,
} from '@/lib/agents'
import { Section } from '@/components/ui/section'
import { Overline } from '@/components/ui/overline'
import { Reveal } from '@/components/ui/reveal'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { LinkArrow } from '@/components/ui/link-arrow'
import { WorkforceRoster } from '@/components/signature/workforce-roster'
import { GlassBoxPipeline } from '@/components/signature/glass-box-pipeline'
import { ApprovalInbox } from '@/components/signature/approval-inbox'
import { ConfidenceFork } from '@/components/signature/confidence-fork'

export const metadata: Metadata = pageMeta({
  title: 'The Workforce — 23 agents that do the work',
  description:
    'One agent shipped, thirteen on the roadmap, nine advisory. A Vextrus agent reads a messy real input, a fixed engine computes every number, and on your approval it writes the result to your books. You approve every taka.',
  path: '/workforce',
})

/* ── Module → short tag + accent var, for the agent cards ── */
const MODULE_TAG: Record<string, { short: string; accent: string }> = {
  'project-costing': { short: 'COST', accent: 'var(--mod-costing)' },
  'accounts-payable': { short: 'AP', accent: 'var(--mod-ap)' },
  'accounts-receivable': { short: 'AR', accent: 'var(--mod-ar)' },
  'general-ledger': { short: 'GL', accent: 'var(--mod-gl)' },
  'real-estate': { short: 'RE', accent: 'var(--mod-realestate)' },
  'tax-management': { short: 'TAX', accent: 'var(--mod-tax)' },
  'project-execution': { short: 'EXEC', accent: 'var(--mod-execution)' },
  'project-foundation': { short: 'PROJ', accent: 'var(--mod-foundation)' },
  'project-planning': { short: 'PLAN', accent: 'var(--mod-planning)' },
}

function tagFor(module: string) {
  return MODULE_TAG[module] ?? { short: module.toUpperCase(), accent: 'var(--color-accent)' }
}

/* ── Three kinds of "AI" (master spec 2.1) — plain words ── */
const THREE_KINDS: { kind: string; verb: string; body: string; agent?: boolean }[] = [
  {
    kind: 'A CHATBOT',
    verb: 'Tells you.',
    body: 'You ask, it answers. It never touches your records, so it can never be held to a number.',
  },
  {
    kind: 'A COPILOT',
    verb: 'Drafts for you.',
    body: 'It writes something you then have to enter yourself, somewhere else. The work still is not done.',
  },
  {
    kind: 'A VEXTRUS AGENT',
    verb: 'Does the work — and writes the result back, once you approve.',
    body: 'Reads a real input, computes the outcome, shows the exact change, and on your approval writes it. Real BOQ lines. A balanced journal. An action logged.',
    agent: true,
  },
]

/* ── The 4-Eyes three choices (master spec 2.3) — plain words ── */
const REVIEW_CHOICES: { title: string; body: string; approve?: boolean }[] = [
  {
    title: 'Approve',
    body: 'The change is written to your books.',
    approve: true,
  },
  {
    title: 'Change it first',
    body: 'Edit or drop lines; only what you keep gets written.',
  },
  {
    title: 'Reject, with a reason',
    body: 'Nothing is written, and the reason is kept so the agent learns.',
  },
]

/* ── The custom-agents-per-client ladder — five plain steps ── */
const LADDER: { step: string; title: string; body: string; tag: string }[] = [
  {
    step: '1',
    title: 'One pattern, proven',
    tag: 'SHIPPED',
    body: 'The Estimator. The AI reads the input, a fixed engine computes every number, and one human approval writes it to your books. This is the pattern.',
  },
  {
    step: '2',
    title: 'Trained on your own projects',
    tag: 'PER-TENANT MEMORY',
    body: 'Every client gets agents that learn from their own jobs, rates and vendors. Your numbers, your patterns — never shared.',
  },
  {
    step: '3',
    title: 'Across every department',
    tag: 'WIDTH',
    body: 'The same pattern reaches estimation, finance, procurement, sales and site — one agent at a time, on the same boundary.',
  },
  {
    step: '4',
    title: 'A Flagship Custom Build',
    tag: 'BESPOKE',
    body: 'For a firm whose problem no bundle fits, we build one agent end to end — same pattern, your engine, your books. You still approve every taka.',
  },
  {
    step: '5',
    title: 'Beyond construction',
    tag: 'WHERE IT CAN GO',
    body: 'The same engine can run other record-keeping businesses. Not shipped — but the boundary is built to travel.',
  },
]

/* ── Feasibility → honest pill label + colour ── */
const FEAS_META: Record<Feasibility, { label: string; color: string }> = {
  shipped: { label: 'SHIPPED', color: 'var(--color-success)' },
  elevatable: { label: 'ROADMAP', color: 'var(--mod-ai)' },
  advisory: { label: 'ADVISORY', color: 'var(--color-credit)' },
  'build-ahead': { label: 'BUILD-AHEAD', color: 'var(--color-ink-soft)' },
}

/* ── An elevatable agent card ── */
function AgentCard({ agent }: { agent: AgentDef }) {
  const tag = tagFor(agent.module)
  return (
    <div
      className="vxtile flex h-full flex-col rounded-[13px] border border-line bg-raised p-[18px]"
      style={{ '--tile-accent': tag.accent } as CSSProperties}
    >
      <div className="mb-2 flex items-center gap-2.5">
        <span
          className="rounded-[5px] px-[7px] py-[3px] font-mono text-[10px] leading-none"
          style={{
            background: `oklch(from ${tag.accent} l c h / 0.16)`,
            color: tag.accent,
          }}
        >
          {tag.short}
        </span>
        <h4 className="m-0 font-heading text-[15px] font-semibold">{agent.name}</h4>
      </div>
      <p className="m-0 mb-3 text-[12.5px] leading-snug text-ink-soft">{agent.value}</p>
      {agent.command && (
        <Badge tone="outline" className="mt-auto self-start text-[10.5px]">
          {agent.command}
        </Badge>
      )}
    </div>
  )
}

/* ── An embedded (advisory) agent card — no write-back command ── */
function EmbeddedCard({ agent }: { agent: AgentDef }) {
  const tag = tagFor(agent.module)
  return (
    <div
      className="vxtile rounded-[13px] border border-line p-[18px]"
      style={
        {
          '--tile-accent': tag.accent,
          background: 'oklch(0.16 0.012 270 / 0.5)',
        } as CSSProperties
      }
    >
      <h4 className="m-0 mb-1.5 font-heading text-[14.5px] font-semibold">{agent.name}</h4>
      <p className="m-0 text-[12px] leading-snug text-ink-soft">{agent.value}</p>
    </div>
  )
}

export default function WorkforcePage() {
  const flagship = agentsByTier('flagship')[0]
  const elevatable = agentsByTier('elevatable')
  const embedded = agentsByTier('embedded')
  if (!flagship) return null // data invariant: exactly one flagship

  return (
    <>
      {/* ── Hero ── */}
      <Section tone="canvas">
        <div className="bg-atmosphere pointer-events-none absolute inset-0" aria-hidden="true" />
        <Reveal className="relative max-w-[820px]">
          <Overline>The construction AI workforce</Overline>
          <h1 className="t-hero mt-3.5 max-w-[18ch]">
            An agent doesn&apos;t tell you. It does the work, and writes the result back.
          </h1>
          <p className="mt-5 max-w-[620px] text-[18px] leading-relaxed text-ink-soft">
            You&apos;ll be shown three kinds of &ldquo;AI&rdquo; this year. Only one moves a
            business — and it&apos;s the one almost nobody can offer, because it needs a real system
            of record underneath to write to.
          </p>
        </Reveal>
      </Section>

      {/* ── Meet the workforce — the roster is the centrepiece ── */}
      <Section tone="deep">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 50% 50% at 50% 30%, oklch(0.55 0.1 285 / 0.12), transparent)',
          }}
          aria-hidden="true"
        />
        <div className="relative">
          <Reveal className="mb-10 max-w-[720px]">
            <Overline>Meet the workforce</Overline>
            <h2 className="t-section mt-3.5">Twenty-three agents, sorted by the work they do.</h2>
            <p className="mt-4 max-w-[640px] text-[16px] leading-relaxed text-ink-soft">
              Filter by department. Each card shows what the agent reads, what it does, and the real
              part of your books it writes to. One is shipped; the rest are on the roadmap or
              advisory — labelled honestly, never hidden.
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <WorkforceRoster defaultDepartment="all" />
          </Reveal>
        </div>
      </Section>

      {/* ── Three kinds of AI (warm structural break) ── */}
      <Section tone="warm">
        <Reveal className="max-w-[760px]">
          <Overline color="oklch(0.55 0.13 44)">Three kinds of &ldquo;AI&rdquo;</Overline>
          <h2 className="t-display mt-3 text-ink-dark">
            Only one <span className="italic">does the work.</span>
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-[18px] md:grid-cols-3">
          {THREE_KINDS.map((k, i) => (
            <Reveal key={k.kind} delay={i * 0.07} className="h-full">
              <div
                className="flex h-full flex-col rounded-[16px] p-[26px]"
                style={
                  k.agent
                    ? {
                        border: '1.6px solid var(--color-accent)',
                        background:
                          'linear-gradient(135deg, oklch(0.72 0.14 44 / 0.1), var(--color-warm-raised))',
                      }
                    : {
                        border: '1px solid var(--color-line-warm)',
                        background: 'var(--color-warm-raised)',
                      }
                }
              >
                <div
                  className="mb-3 font-mono text-[11px]"
                  style={{ color: k.agent ? 'oklch(0.5 0.13 44)' : 'var(--color-ink-dark-soft)' }}
                >
                  {k.kind}
                </div>
                <h3 className="m-0 mb-2 font-heading text-[19px] font-semibold text-ink-dark">
                  {k.verb}
                </h3>
                <p className="m-0 text-[14px] leading-normal text-ink-dark-soft">{k.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── The 23 agents, in three honest tiers ── */}
      <Section tone="canvas">
        <Reveal className="max-w-[700px]">
          <Overline>The catalogue · checked against the live platform</Overline>
          <h2 className="t-section mt-3.5">23 agents, in three honest tiers.</h2>
          <p className="mt-4 max-w-[680px] text-[16px] leading-relaxed text-ink-soft">
            The tier is set by what an agent is allowed to do to your records. We lead with what is
            shipped, present the rest as roadmap, and never headline an advisory agent.
          </p>
        </Reveal>

        {/* Flagship — prominent */}
        <Reveal className="mt-12">
          <div className="mb-4 flex items-center gap-3">
            <span className="font-mono text-[12px] text-accent">FLAGSHIP · 1</span>
            <span className="h-px flex-1 bg-line" />
            <span className="text-[12.5px] text-ink-soft">
              AI reads · engine computes · one approval writes back
            </span>
          </div>
          <div
            className="vxtile flex flex-col gap-5 rounded-[16px] p-[24px] sm:flex-row sm:items-center sm:gap-[18px]"
            style={
              {
                '--tile-accent': 'var(--mod-costing)',
                border: '1.4px solid oklch(from var(--mod-costing) l c h / 0.5)',
                background:
                  'linear-gradient(135deg, oklch(from var(--mod-costing) l c h / 0.1), var(--color-raised))',
              } as CSSProperties
            }
          >
            <span
              className="vxtile-ic grid h-[46px] w-[46px] shrink-0 place-items-center rounded-[12px] font-mono text-[20px] font-bold"
              style={{
                background: 'oklch(from var(--mod-costing) l c h / 0.18)',
                color: 'var(--mod-costing)',
              }}
              aria-hidden="true"
            >
              ▤
            </span>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <h3 className="m-0 font-heading text-[19px] font-semibold">{flagship.name}</h3>
                <Badge tone="accent" color="var(--color-success)" className="text-[9.5px]">
                  SHIPPED
                </Badge>
              </div>
              <p className="m-0 mt-1.5 text-[14px] leading-normal text-ink-soft">
                {flagship.value}
              </p>
            </div>
            {flagship.command && (
              <Badge
                tone="outline"
                color="var(--mod-costing)"
                className="shrink-0 self-start text-[11.5px] sm:self-center"
              >
                {flagship.command} →
              </Badge>
            )}
          </div>
        </Reveal>

        {/* Elevatable */}
        <Reveal className="mt-12">
          <div className="mb-4 flex items-center gap-3">
            <span className="font-mono text-[12px]" style={{ color: 'var(--mod-ai)' }}>
              ROADMAP · 13
            </span>
            <span className="h-px flex-1 bg-line" />
            <span className="hidden text-[12.5px] text-ink-soft sm:inline">
              the write-back boundary is already wired — flagship polish pending
            </span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {elevatable.map((a, i) => (
              <Reveal key={a.id} delay={(i % 3) * 0.05}>
                <AgentCard agent={a} />
              </Reveal>
            ))}
          </div>
        </Reveal>

        {/* Embedded */}
        <Reveal className="mt-12">
          <div className="mb-4 flex items-center gap-3">
            <span className="font-mono text-[12px]" style={{ color: 'var(--color-credit)' }}>
              ADVISORY · 9
            </span>
            <span className="h-px flex-1 bg-line" />
            <span className="hidden text-[12.5px] text-ink-soft sm:inline">
              advisory only — no write-back; they keep the platform alive and feed the agents&apos;
              learning
            </span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {embedded.map((a, i) => (
              <Reveal key={a.id} delay={(i % 3) * 0.05}>
                <EmbeddedCard agent={a} />
              </Reveal>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* ── Autonomy: the approvals inbox + the confidence fork ── */}
      <Section tone="deep">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <Reveal>
            <Overline>How much it does on its own</Overline>
            <h2 className="t-display mt-3.5 italic">A glass box, never a black box.</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">
              The AI works the whole pipeline. High-confidence work it can run itself; everything
              else lands in your approvals inbox. On the visible change, you have three choices —
              and two rules make it a real control, not a rubber stamp.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <span
                  className="mt-[7px] h-2 w-2 shrink-0 rounded-full"
                  style={{ background: 'var(--color-success)' }}
                />
                <p className="m-0 text-[14px] leading-normal text-ink-soft">
                  <strong className="text-ink">You can&apos;t approve your own work.</strong> A
                  person cannot approve a draft they triggered. The system enforces it, not a
                  policy.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span
                  className="mt-[7px] h-2 w-2 shrink-0 rounded-full"
                  style={{ background: 'var(--color-success)' }}
                />
                <p className="m-0 text-[14px] leading-normal text-ink-soft">
                  <strong className="text-ink">Every action is logged.</strong> Who, when, and
                  before-and-after — a cleaner trail than any manual one.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              {REVIEW_CHOICES.map((c) => (
                <div
                  key={c.title}
                  className="rounded-[14px] p-4"
                  style={
                    c.approve
                      ? {
                          border: '1px solid oklch(from var(--color-success) l c h / 0.35)',
                          background: 'oklch(from var(--color-success) l c h / 0.07)',
                        }
                      : { border: '1px solid var(--color-line)', background: 'var(--color-raised)' }
                  }
                >
                  <div
                    className="mb-0.5 font-heading text-[15px] font-semibold"
                    style={c.approve ? { color: 'var(--color-success)' } : undefined}
                  >
                    {c.title}
                  </div>
                  <p className="m-0 text-[13px] leading-snug text-ink-soft">{c.body}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08} className="flex flex-col gap-5">
            <ApprovalInbox />
            <ConfidenceFork />
          </Reveal>
        </div>

        {/* The pipeline — the agent's work, made visible */}
        <Reveal className="mt-14">
          <GlassBoxPipeline />
        </Reveal>
      </Section>

      {/* ── Custom agents per client — the ladder ── */}
      <Section tone="canvas">
        <Reveal className="max-w-[720px]">
          <Overline>Custom agents per client</Overline>
          <h2 className="t-section mt-3.5">One pattern. Then we build it for you.</h2>
          <p className="mt-4 max-w-[680px] text-[16px] leading-relaxed text-ink-soft">
            Every agent stands on the same boundary: the AI reads, a fixed engine computes the
            numbers, and one human approval writes the result. We grow that pattern toward your
            business, step by step — and you always approve every taka.
          </p>
        </Reveal>

        <ol className="mt-12 flex list-none flex-col gap-4 p-0">
          {LADDER.map((rung, i) => (
            <Reveal key={rung.step} delay={(i % 2) * 0.06} className="h-full">
              <li className="flex flex-col gap-4 rounded-[16px] border border-line bg-raised p-[24px] sm:flex-row sm:items-start sm:gap-6">
                <span
                  className="grid h-[44px] w-[44px] shrink-0 place-items-center rounded-[12px] font-mono text-[18px] font-bold"
                  style={{
                    background: 'oklch(from var(--color-accent) l c h / 0.16)',
                    color: 'var(--color-accent)',
                  }}
                  aria-hidden="true"
                >
                  {rung.step}
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="m-0 font-heading text-[18px] font-semibold">{rung.title}</h3>
                    <Badge tone="outline" className="text-[9.5px]">
                      {rung.tag}
                    </Badge>
                  </div>
                  <p className="m-0 mt-1.5 text-[14px] leading-normal text-ink-soft">{rung.body}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* ── The roadmap — four lanes ── */}
      <Section tone="deep">
        <Reveal className="max-w-[700px]">
          <Overline>The roadmap</Overline>
          <h2 className="t-section mt-3.5">Four lanes. We grow the pattern, lane by lane.</h2>
          <p className="mt-4 max-w-[680px] text-[16px] leading-relaxed text-ink-soft">
            We take the Estimator&apos;s pattern across the business. Each agent carries an honest
            label; a copper star marks the next three we build.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-[18px] md:grid-cols-2">
          {lanes.map((lane, li) => (
            <Reveal key={lane.id} delay={(li % 2) * 0.07} className="h-full">
              <div className="flex h-full flex-col rounded-[16px] border border-line bg-raised p-[26px]">
                <div className="mb-4 flex items-center gap-3">
                  <span className="font-mono text-[11px] text-accent">LANE {li + 1}</span>
                  <h3 className="m-0 font-heading text-[18px] font-semibold">{lane.name}</h3>
                </div>
                <div className="flex flex-col gap-3.5">
                  {lane.agents.map((a) => (
                    <RoadmapRow key={a.name} agent={a} />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── Final CTA ── */}
      <Section tone="canvas" className="text-center">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 70% at 50% 40%, oklch(0.55 0.1 275 / 0.12), transparent)',
          }}
          aria-hidden="true"
        />
        <Reveal className="relative mx-auto max-w-[700px]">
          <h2 className="t-section">Start with the one that&apos;s shipped.</h2>
          <p className="mx-auto mt-5 max-w-[540px] text-[17px] leading-relaxed text-ink-soft">
            Watch the Estimator turn a drawing into a priced BOQ — then see the rest of the
            workforce stand on the same boundary.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3.5">
            <Button href="/estimator" size="lg" icon="arrow-right" iconRight>
              See the Estimator
            </Button>
            <Button href="/solutions" size="lg" variant="ghost">
              How agents are packaged
            </Button>
          </div>
          <div className="mt-8">
            <LinkArrow href="/contact">Book a demo on your own drawing</LinkArrow>
          </div>
        </Reveal>
      </Section>
    </>
  )
}

/* ── A single roadmap agent row inside a lane ── */
function RoadmapRow({ agent }: { agent: RoadmapAgent }) {
  const feas = FEAS_META[agent.feasibility]
  return (
    <div
      className="rounded-[12px] p-4"
      style={
        agent.next
          ? {
              border: '1px solid oklch(from var(--color-accent) l c h / 0.45)',
              background: 'oklch(0.72 0.14 44 / 0.06)',
            }
          : { border: '1px solid var(--color-line)', background: 'oklch(0.16 0.012 270 / 0.5)' }
      }
    >
      <div className="flex flex-wrap items-center gap-2">
        {agent.next && (
          <span className="font-mono text-[12px] text-accent" aria-label="top three to build next">
            ★
          </span>
        )}
        <h4 className="m-0 font-heading text-[15px] font-semibold">{agent.name}</h4>
        <Badge tone="accent" color={feas.color} className="text-[9.5px]">
          {feas.label}
        </Badge>
      </div>
      <p className="m-0 mt-1.5 text-[13px] leading-snug text-ink-soft">{agent.outcome}</p>
      <p className="m-0 mt-2 text-[12px] leading-snug text-ink-dim">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.06em]">BD edge</span> ·{' '}
        {agent.bdEdge}
      </p>
    </div>
  )
}
