'use client'

import { useId, useMemo, useState } from 'react'
import type { CSSProperties } from 'react'
import { LazyMotion, domAnimation, m, useReducedMotion } from 'motion/react'
import { modules, pillars, modulesByPillar, type ModuleDef, type Pillar } from '@/lib/modules'
import { agents, tierMeta, type AgentDef, type Tier } from '@/lib/agents'
import { Icon } from '../ui/icon'
import { moduleIcon } from '../sections/module-tile'

// ModuleExplorer — the interactive engine-modules component (replaces the static
// module-tile grid on /engine). A pillar-grouped selector rail picks one of the
// 20 modules; a detail panel shows that module's features, the plain "What you
// achieve" outcome, and the agents that WRITE to it (linking the workforce to
// the floor it stands on).
//
// The Calm System: every label is real, server-renderable DOM text (SEO + a11y);
// only the selection state needs the client. The single motion is a panel
// crossfade on a state change — transform/opacity only, fully skipped under
// reduced-motion (instant swap, no animation).

// ── Honest tier mapping (master spec guardrail; mirrors WorkforceRoster) ──────
//   flagship  → Shipped  · elevatable → Roadmap · embedded → Advisory
const TIER_LABEL: Record<Tier, string> = {
  flagship: 'Shipped',
  elevatable: 'Roadmap',
  embedded: 'Advisory',
}

// id → agent, so a module's agentIds resolve to real names + tiers.
const AGENT_BY_ID: Record<string, AgentDef> = Object.fromEntries(agents.map((a) => [a.id, a]))

const DEFAULT_MODULE_ID = 'project-costing'

// ── A single agent chip — the resolved name + a small tier marker ─────────────
function AgentChip({ agent, accent }: { agent: AgentDef; accent: string }) {
  const tierAccent = tierMeta[agent.tier].accent
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[12.5px] font-medium leading-none"
      style={{
        borderColor: `oklch(from ${accent} l c h / 0.4)`,
        background: `oklch(from ${accent} l c h / 0.08)`,
        color: 'var(--color-ink)',
      }}
    >
      {agent.name}
      <span
        className="rounded-[5px] px-1.5 py-[3px] font-mono text-[9.5px] font-semibold uppercase leading-none tracking-[0.07em]"
        style={{ background: `oklch(from ${tierAccent} l c h / 0.18)`, color: tierAccent }}
      >
        {TIER_LABEL[agent.tier]}
      </span>
    </span>
  )
}

// ── The detail panel for the selected module ─────────────────────────────────
function ModulePanel({ module }: { module: ModuleDef }) {
  const writingAgents = module.agentIds
    .map((id) => AGENT_BY_ID[id])
    .filter((a): a is AgentDef => Boolean(a))

  return (
    <div
      className="vxtile flex h-full flex-col rounded-[18px] border p-6 sm:p-7"
      style={
        {
          '--tile-accent': module.accent,
          borderColor: `oklch(from ${module.accent} l c h / 0.4)`,
          background: `linear-gradient(135deg, oklch(from ${module.accent} l c h / 0.08), var(--color-raised))`,
        } as CSSProperties
      }
    >
      {/* header — icon + name + pillar */}
      <header className="mb-5 flex items-start gap-3.5">
        <span
          className="vxtile-ic inline-grid h-11 w-11 shrink-0 place-items-center rounded-[12px]"
          style={{
            background: `oklch(from ${module.accent} l c h / 0.16)`,
            color: module.accent,
          }}
          aria-hidden="true"
        >
          <Icon name={moduleIcon[module.id] ?? 'layers'} size={22} />
        </span>
        <div className="min-w-0">
          <h3 className="m-0 font-heading text-[20px] font-semibold leading-tight">
            {module.name}
          </h3>
          <span
            className="mt-1 inline-block font-mono text-[11px] uppercase tracking-[0.08em]"
            style={{ color: module.accent }}
          >
            {module.pillar}
          </span>
        </div>
      </header>

      {/* "What you achieve" — the outcome, emphasized */}
      <div
        className="mb-6 rounded-[12px] border-l-2 py-1 pl-4"
        style={{ borderColor: module.accent }}
      >
        <div className="mb-1 font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-dim">
          What you achieve
        </div>
        <p className="m-0 text-[15.5px] font-medium leading-snug text-ink">{module.achieve}</p>
      </div>

      {/* features checklist */}
      <div className="mb-6">
        <div className="mb-2.5 font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-dim">
          What it does
        </div>
        <ul className="m-0 flex list-none flex-col gap-2 p-0">
          {module.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-[13.5px] leading-snug">
              <span
                className="mt-[1px] shrink-0"
                style={{ color: module.accent }}
                aria-hidden="true"
              >
                <Icon name="check" size={15} strokeWidth={2.2} />
              </span>
              <span className="text-ink-soft">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* agents that write here */}
      <div className="mt-auto border-t border-line pt-5">
        <div className="mb-2.5 font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-dim">
          Agents that write here
        </div>
        {writingAgents.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {writingAgents.map((agent) => (
              <AgentChip key={agent.id} agent={agent} accent={module.accent} />
            ))}
          </div>
        ) : (
          <p className="m-0 text-[13px] italic leading-snug text-ink-soft">
            No agents write here yet — this module is part of the engine the others write to.
          </p>
        )}
      </div>
    </div>
  )
}

// ── A single module selector button — keyboard-operable, aria-current on active ─
function ModuleButton({
  module,
  active,
  onSelect,
}: {
  module: ModuleDef
  active: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      aria-current={active ? 'true' : undefined}
      aria-pressed={active}
      onClick={onSelect}
      className={`group flex w-full items-center gap-3 rounded-[11px] border px-3.5 py-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-canvas)] ${
        active
          ? 'border-[var(--row-accent)] bg-[oklch(from_var(--row-accent)_l_c_h_/_0.1)]'
          : 'border-line bg-raised hover:border-line-strong'
      }`}
      style={{ '--row-accent': module.accent } as CSSProperties}
    >
      <span
        className="inline-grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-line transition-colors"
        style={active ? { color: module.accent, borderColor: module.accent } : undefined}
      >
        <Icon name={moduleIcon[module.id] ?? 'layers'} size={15} />
      </span>
      <span
        className={`min-w-0 truncate font-heading text-[13.5px] font-medium leading-tight ${
          active ? 'text-ink' : 'text-ink-soft group-hover:text-ink'
        }`}
      >
        {module.name}
      </span>
    </button>
  )
}

export interface ModuleExplorerProps {
  /** Module id to select on mount. Defaults to Project Costing. */
  defaultModuleId?: string
  className?: string
}

export function ModuleExplorer({
  defaultModuleId = DEFAULT_MODULE_ID,
  className = '',
}: ModuleExplorerProps) {
  const reduce = useReducedMotion() ?? false
  const groupLabelId = useId()
  const [selectedId, setSelectedId] = useState<string>(() =>
    modules.some((m) => m.id === defaultModuleId) ? defaultModuleId : modules[0].id
  )

  const selected = useMemo(
    () => modules.find((m) => m.id === selectedId) ?? modules[0],
    [selectedId]
  )

  // Pillars that actually have ≥1 module (all do, but stay defensive).
  const groupedPillars = useMemo(
    () => pillars.filter((p): p is Pillar => modulesByPillar(p).length > 0),
    []
  )

  return (
    <div className={`grid gap-6 lg:grid-cols-[300px_1fr] ${className}`}>
      {/* ── Selector rail — modules grouped by pillar ── */}
      <nav aria-labelledby={groupLabelId} className="flex flex-col gap-6">
        <h3 id={groupLabelId} className="sr-only">
          Choose a module to explore
        </h3>
        {groupedPillars.map((pillar) => (
          <div key={pillar}>
            <div className="mb-2 flex items-center gap-2.5">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-soft">
                {pillar}
              </span>
              <span className="h-px flex-1 bg-line" aria-hidden="true" />
            </div>
            <div className="flex flex-col gap-1.5">
              {modulesByPillar(pillar).map((module) => (
                <ModuleButton
                  key={module.id}
                  module={module}
                  active={module.id === selectedId}
                  onSelect={() => setSelectedId(module.id)}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* ── Detail panel — crossfades on selection (transform/opacity only) ── */}
      <LazyMotion features={domAnimation}>
        {reduce ? (
          // Reduced motion → instant swap, no animation.
          <div role="region" aria-live="polite" className="min-w-0">
            <ModulePanel module={selected} />
          </div>
        ) : (
          <m.div
            key={selected.id}
            role="region"
            aria-live="polite"
            className="min-w-0"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <ModulePanel module={selected} />
          </m.div>
        )}
      </LazyMotion>
    </div>
  )
}
