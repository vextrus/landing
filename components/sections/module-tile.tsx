import type { CSSProperties } from 'react'
import { Icon, type IconName } from '../ui/icon'
import type { ModuleDef } from '@/lib/modules'

// Presentation map: module id → bespoke icon.
export const moduleIcon: Record<string, IconName> = {
  'general-ledger': 'ledger',
  'tax-management': 'percent',
  'accounts-payable': 'arrow-out',
  'accounts-receivable': 'arrow-in',
  'project-foundation': 'layers',
  'project-planning': 'layers',
  'project-costing': 'rebar',
  'project-execution': 'layers',
  procurement: 'cart',
  inventory: 'box',
  'subcontractor-equipment': 'users',
  'real-estate': 'building',
  'hr-payroll': 'users',
  'safety-compliance': 'shield',
  identity: 'key',
  tenancy: 'lock',
  organization: 'branch',
  workflow: 'branch',
  notification: 'bell',
  'ai-platform': 'spark',
}

export function ModuleTile({ module, className = '' }: { module: ModuleDef; className?: string }) {
  return (
    <div
      className={`vxtile rounded-[14px] border border-line bg-raised p-4 ${className}`}
      style={{ '--tile-accent': module.accent } as CSSProperties}
    >
      <span
        className="vxtile-ic mb-2.5 inline-grid h-7 w-7 place-items-center rounded-lg border border-line"
        style={{ color: module.accent }}
      >
        <Icon name={moduleIcon[module.id] ?? 'layers'} size={15} />
      </span>
      <h4 className="m-0 mb-1 font-heading text-sm font-semibold">{module.name}</h4>
      <p className="m-0 text-[11.5px] leading-snug text-ink-soft">{module.short}</p>
    </div>
  )
}
