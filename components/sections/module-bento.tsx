import type { CSSProperties } from 'react'
import { modules, type ModuleDef } from '@/lib/modules'
import { ModuleTile } from './module-tile'
import { Icon } from '../ui/icon'
import { LinkArrow } from '../ui/link-arrow'

// Home "nervous system" bento — AI Platform featured (2×2), a representative
// strip of modules, and a link out to the full engine (all 20).
const SHOWN = [
  'general-ledger',
  'tax-management',
  'accounts-payable',
  'accounts-receivable',
  'project-costing',
  'procurement',
  'real-estate',
  'hr-payroll',
  'safety-compliance',
  'workflow',
]

const byId = (id: string): ModuleDef => {
  const m = modules.find((mod) => mod.id === id)
  if (!m) throw new Error(`Unknown module id: ${id}`)
  return m
}

export function ModuleBento({ className = '' }: { className?: string }) {
  const ai = byId('ai-platform')
  return (
    <div className={`grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 ${className}`}>
      {/* Featured — AI Platform */}
      <div
        className="vxtile col-span-2 row-span-2 flex flex-col rounded-[16px] border border-line p-6"
        style={
          {
            '--tile-accent': ai.accent,
            background:
              'linear-gradient(135deg, oklch(from var(--mod-ai) l c h / 0.12), var(--color-raised))',
          } as CSSProperties
        }
      >
        <span
          className="vxtile-ic mb-3.5 inline-grid h-10 w-10 place-items-center rounded-[11px]"
          style={{ background: 'oklch(from var(--mod-ai) l c h / 0.18)', color: ai.accent }}
        >
          <Icon name="spark" size={22} />
        </span>
        <h3 className="m-0 mb-2 font-heading text-[19px] font-semibold">AI Platform</h3>
        <p className="m-0 mb-auto text-[13px] leading-normal text-ink-soft">
          The intelligence spine — the agent registry, the 4-Eyes gateway, the registered-command
          write-back boundary, and per-tenant semantic memory.
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {['23 agents', 'pgvector'].map((t) => (
            <span
              key={t}
              className="rounded-md bg-canvas px-2 py-1 font-mono text-[10.5px] text-ink-soft"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {SHOWN.map((id) => (
        <ModuleTile key={id} module={byId(id)} />
      ))}

      {/* link-out tile */}
      <div className="vxtile flex items-center justify-center rounded-[14px] border border-line bg-raised p-4">
        <LinkArrow href="/engine" className="text-[13px]">
          All 20
        </LinkArrow>
      </div>
    </div>
  )
}
