'use client'

import { useMemo, useState, useTransition } from 'react'
import type { CSSProperties } from 'react'
import { LazyMotion, domAnimation, m, useReducedMotion } from 'motion/react'
import type { Variants } from 'motion/react'
import { agents, agentsByDepartment, DEPARTMENTS, tierMeta } from '@/lib/agents'
import type { AgentDef, Department, Tier } from '@/lib/agents'
import { modules } from '@/lib/modules'

// WorkforceRoster — the primary "AI workforce" visualization (replaces the old
// agent constellation). A filter chip row narrows a responsive grid of
// role-titled agent cards. Each card reads as a member of an AI workforce and
// shows the differentiator: the real ERP module the agent writes to.
//
// The Calm System: cards are real server-renderable HTML text (SEO); only the
// filter interactivity + the entrance/re-filter animation need the client.
// Motion is transform/opacity only and is fully skipped under reduced-motion.

// ── Honest tier mapping (master spec guardrail) ──────────────────────────────
//   flagship  → Shipped   (one 4-Eyes write-back, demo-leading)
//   elevatable→ Roadmap   (a registered write-back command is wired)
//   embedded  → Advisory   (no write-back)
const TIER_LABEL: Record<Tier, string> = {
  flagship: 'Shipped',
  elevatable: 'Roadmap',
  embedded: 'Advisory',
}

// ── Module id → human label + accent var (from the 20-module engine) ─────────
const MODULE_META: Record<string, { label: string; accent: string }> = Object.fromEntries(
  modules.map((mod) => [mod.id, { label: mod.name, accent: mod.accent }])
)

function moduleAccent(moduleId: string): string {
  return MODULE_META[moduleId]?.accent ?? 'var(--color-accent)'
}

const departmentLabel: Record<Department, string> = Object.fromEntries(
  DEPARTMENTS.map((d) => [d.id, d.label])
) as Record<Department, string>

type Selection = Department | 'all'

// Only departments that actually have ≥1 agent get a chip (People/HR has 0).
const ACTIVE_DEPARTMENTS = DEPARTMENTS.filter((d) => agentsByDepartment(d.id).length > 0)

// ── Entrance / re-filter motion (transform + opacity only) ───────────────────
function makeContainer(reduce: boolean): Variants {
  return {
    hidden: {},
    show: { transition: reduce ? {} : { staggerChildren: 0.04, delayChildren: 0.02 } },
  }
}
const cardRise: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
}

// ── Tier badge — translucent accent pill, mirrors the existing card style ────
function TierBadge({ tier }: { tier: Tier }) {
  const accent = tierMeta[tier].accent
  return (
    <span
      className="shrink-0 rounded-md px-2 py-1 font-mono text-[10px] font-semibold uppercase leading-none tracking-[0.07em]"
      style={{ background: `oklch(from ${accent} l c h / 0.16)`, color: accent }}
    >
      {TIER_LABEL[tier]}
    </span>
  )
}

// ── One agent card — pure presentational, server-renderable text ─────────────
function AgentCard({ agent }: { agent: AgentDef }) {
  const accent = moduleAccent(agent.module)
  const dept = departmentLabel[agent.department]
  return (
    <article
      className="vxtile flex h-full flex-col rounded-[14px] border border-line bg-raised p-5 focus-within:border-[var(--tile-accent)]"
      style={{ '--tile-accent': accent } as CSSProperties}
      tabIndex={0}
      aria-label={`${agent.name} — ${dept} — ${TIER_LABEL[agent.tier]}`}
    >
      <header className="mb-2 flex items-start justify-between gap-3">
        <h3 className="m-0 font-heading text-[15.5px] font-semibold leading-tight">{agent.name}</h3>
        <TierBadge tier={agent.tier} />
      </header>

      <span className="mb-3.5 inline-block self-start font-mono text-[10.5px] uppercase tracking-[0.06em] text-ink-soft">
        {dept}
      </span>

      <ol className="m-0 mt-auto flex list-none flex-col gap-2 p-0">
        <li className="text-[12.5px] leading-snug text-ink-soft">
          <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-ink-dim">
            Reads
          </span>{' '}
          {agent.reads}
        </li>
        <li className="text-[12.5px] leading-snug text-ink-soft">
          <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-ink-dim">
            Does
          </span>{' '}
          {agent.does}
        </li>
        <li className="text-[12.5px] leading-snug text-ink-soft">
          <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-ink-dim">
            Writes to
          </span>{' '}
          {agent.writesTo ? (
            // The differentiator — the real module the agent posts into.
            <span
              className="inline-flex items-center rounded-md px-2 py-[3px] font-mono text-[11px] font-semibold leading-none align-middle"
              style={{ background: `oklch(from ${accent} l c h / 0.16)`, color: accent }}
            >
              {agent.writesTo}
            </span>
          ) : (
            <span className="italic text-ink-dim">advisory — no write-back</span>
          )}
        </li>
      </ol>
    </article>
  )
}

// ── A single filter chip — a real, keyboard-operable button ──────────────────
function FilterChip({
  active,
  label,
  count,
  onSelect,
}: {
  active: boolean
  label: string
  count: number
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onSelect}
      className={`vxchip inline-flex min-h-[44px] items-center gap-2 rounded-full border px-4 py-2.5 text-[13px] font-medium leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-canvas)] ${
        active
          ? 'border-accent bg-[oklch(from_var(--color-accent)_l_c_h_/_0.14)] text-accent'
          : 'border-line bg-raised text-ink-soft hover:border-line-strong hover:text-ink'
      }`}
    >
      {label}
      <span
        className={`font-mono text-[11px] tabular-nums ${active ? 'text-accent' : 'text-ink-dim'}`}
      >
        {count}
      </span>
    </button>
  )
}

export interface WorkforceRosterProps {
  defaultDepartment?: Selection
  className?: string
}

export function WorkforceRoster({
  defaultDepartment = 'all',
  className = '',
}: WorkforceRosterProps) {
  const reduce = useReducedMotion()
  const [selected, setSelected] = useState<Selection>(defaultDepartment)
  const [, startTransition] = useTransition()

  const visible = useMemo(
    () => (selected === 'all' ? agents : agentsByDepartment(selected)),
    [selected]
  )

  const select = (next: Selection) => startTransition(() => setSelected(next))

  return (
    <div className={className}>
      {/* Filter chip row — All + one chip per department that has ≥1 agent. */}
      <div
        role="group"
        aria-label="Filter the workforce by department"
        className="mb-7 flex flex-wrap gap-2.5"
      >
        <FilterChip
          active={selected === 'all'}
          label="All"
          count={agents.length}
          onSelect={() => select('all')}
        />
        {ACTIVE_DEPARTMENTS.map((d) => (
          <FilterChip
            key={d.id}
            active={selected === d.id}
            label={d.label}
            count={agentsByDepartment(d.id).length}
            onSelect={() => select(d.id)}
          />
        ))}
      </div>

      {/* The roster grid — re-keyed on selection so the entrance plays per filter. */}
      <LazyMotion features={domAnimation}>
        <m.ul
          key={selected}
          role="list"
          className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3"
          variants={makeContainer(!!reduce)}
          initial={reduce ? false : 'hidden'}
          animate="show"
        >
          {visible.map((agent) => (
            <m.li key={agent.id} variants={reduce ? undefined : cardRise} className="h-full">
              <AgentCard agent={agent} />
            </m.li>
          ))}
        </m.ul>
      </LazyMotion>
    </div>
  )
}
