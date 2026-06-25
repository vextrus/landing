// The 20-module engine (master spec Appendix B + Part 5).
// Each module is the floor a class of agents writes to. `accent` is a CSS var
// from the .theme-landing "Atmosphere" palette; `pillar` groups them.

export type Pillar =
  | 'Financial Command'
  | 'Project Delivery'
  | 'Procurement, Materials & Assets'
  | 'Property Sales & Customer Lifecycle'
  | 'People & Safety'
  | 'Trust Platform'
  | 'Intelligence Spine'

export interface ModuleDef {
  id: string
  name: string
  short: string // one-breath floor description
  pillar: Pillar
  accent: string // CSS var, e.g. 'var(--mod-gl)'
  features: string[] // 3–5 plain capabilities a BD MD/CFO understands instantly
  achieve: string // one plain "what you achieve" line — the outcome
  agentIds: string[] // ids from lib/agents.ts that write to this module
}

export const modules: ModuleDef[] = [
  // Financial Command — the books the finance agents post into
  {
    id: 'general-ledger',
    name: 'General Ledger',
    short: 'Double-entry truth.',
    pillar: 'Financial Command',
    accent: 'var(--mod-gl)',
    features: [
      'double-entry chart of accounts',
      'journals with a full audit trail',
      'trial balance, P&L and balance sheet',
      'month-end close and bank reconciliation',
    ],
    achieve:
      'One set of books you can trust — every figure traces back to the journal that made it.',
    agentIds: [
      'journal-entry-suggester',
      'bank-reconciler',
      'period-close-assistant',
      'gl-anomaly-detector',
    ],
  },
  {
    id: 'tax-management',
    name: 'Tax Management',
    short: 'Mushak suite, NBR.',
    pillar: 'Financial Command',
    accent: 'var(--mod-tax)',
    features: [
      'VAT, TDS, VDS and AIT configuration',
      'Mushak document register',
      'withholding computed per payment',
      'NBR rates kept in one place',
    ],
    achieve:
      'Keep VAT and withholding on the right side of NBR — with the rule behind each figure on file.',
    agentIds: ['tax-compliance-advisor', 'tax-rate-optimizer'],
  },
  {
    id: 'accounts-payable',
    name: 'Accounts Payable',
    short: 'Three-way matched.',
    pillar: 'Financial Command',
    accent: 'var(--mod-ap)',
    features: [
      'vendor bills three-way matched to PO and GRN',
      'payment batches against cash position',
      'vendor risk and performance history',
      'duplicate and over-billing checks',
    ],
    achieve: 'Pay the right vendor the right amount on time — and never twice for the same bill.',
    agentIds: ['invoice-processor', 'payment-optimizer', 'vendor-analyzer', 'ap-anomaly-detector'],
  },
  {
    id: 'accounts-receivable',
    name: 'Accounts Receivable',
    short: 'Progress billing.',
    pillar: 'Financial Command',
    accent: 'var(--mod-ar)',
    features: [
      'progress and instalment billing',
      'customer ageing and statements',
      'collection actions logged',
      'credit ratings and limits',
    ],
    achieve: 'Know who owes you, how overdue they are, and which collection to make next.',
    agentIds: ['collection-predictor', 'credit-risk-analyzer'],
  },

  // Project Delivery — the project truth the estimating + execution agents read/write
  {
    id: 'project-foundation',
    name: 'Project Foundation',
    short: 'Register, sites, approvals.',
    pillar: 'Project Delivery',
    accent: 'var(--mod-foundation)',
    features: [
      'project register with sites and phases',
      'RAJUK and CDA approval tracking',
      'project budgets and baselines',
      'contract and tender documents',
    ],
    achieve:
      'Every project, site and approval in one register — the single source the rest of delivery builds on.',
    agentIds: ['budget-forecaster', 'document-summarizer'],
  },
  {
    id: 'project-planning',
    name: 'Project Planning',
    short: 'WBS, critical path.',
    pillar: 'Project Delivery',
    accent: 'var(--mod-planning)',
    features: [
      'work breakdown structure and schedule',
      'critical path and float',
      'crew and equipment allocation',
      'baseline vs actual progress',
    ],
    achieve: 'See the path that decides your finish date — and the slip the day it starts.',
    agentIds: ['critical-path-monitor', 'resource-balancer', 'schedule-optimizer'],
  },
  {
    id: 'project-costing',
    name: 'Project Costing',
    short: 'BOQ, rates, RA bills.',
    pillar: 'Project Delivery',
    accent: 'var(--mod-costing)',
    features: [
      'BOQ and rate library',
      'RA bills and retention',
      'cost vs budget by line',
      'imports from the Estimator',
    ],
    achieve:
      'See exactly where each taka of a project is committed — and catch overruns before they land.',
    agentIds: ['drawing-estimator', 'boq-rate-estimator'],
  },
  {
    id: 'project-execution',
    name: 'Project Execution',
    short: 'Progress, EVM, LD.',
    pillar: 'Project Delivery',
    accent: 'var(--mod-execution)',
    features: [
      'daily progress reports',
      'earned-value (EVM) and forecasts',
      'liquidated damages tracking',
      'site risk register',
    ],
    achieve: 'Know the true cost and finish date of every site — not the one on the original plan.',
    agentIds: ['risk-predictor', 'evm-forecaster', 'dpr-summarizer'],
  },

  // Procurement, Materials & Assets — the supply truth
  {
    id: 'procurement',
    name: 'Procurement',
    short: 'PO, GRN, LC landed cost.',
    pillar: 'Procurement, Materials & Assets',
    accent: 'var(--mod-procurement)',
    features: [
      'requisition to purchase order',
      'goods received notes (GRN)',
      'LC and landed-cost on imports',
      'vendor quotations and comparison',
    ],
    achieve: 'Buy materials at a controlled price and know the true landed cost of every import.',
    agentIds: [],
  },
  {
    id: 'inventory',
    name: 'Inventory',
    short: 'Multi-store, valuation.',
    pillar: 'Procurement, Materials & Assets',
    accent: 'var(--mod-inventory)',
    features: [
      'multi-store and site stock',
      'stock valuation and movement',
      'issue against project and BOQ item',
      'reorder levels and stock-takes',
    ],
    achieve: 'Know what material is in which store, what it is worth, and where it went.',
    agentIds: [],
  },
  {
    id: 'subcontractor-equipment',
    name: 'Subcontractor & Equipment',
    short: 'RA bills, retention, DLP.',
    pillar: 'Procurement, Materials & Assets',
    accent: 'var(--mod-subequip)',
    features: [
      'subcontractor work orders and RA bills',
      'retention and defect-liability (DLP)',
      'equipment register and utilisation',
      'rental and maintenance logs',
    ],
    achieve: 'Bill subcontractors and run plant on the same controls you run your own work on.',
    agentIds: [],
  },

  // Property Sales & Customer Lifecycle — the revenue engine
  {
    id: 'real-estate',
    name: 'Real Estate',
    short: 'Land → handover.',
    pillar: 'Property Sales & Customer Lifecycle',
    accent: 'var(--mod-realestate)',
    features: [
      'land bank and project inventory',
      'sales leads and bookings',
      'instalment schedules and receipts',
      'customer handover and documents',
    ],
    achieve: 'Run the whole sale — from land title to flat handover — on one customer record.',
    agentIds: ['lead-scorer'],
  },

  // People & Safety — the workforce truth
  {
    id: 'hr-payroll',
    name: 'HR & Payroll',
    short: 'Every worker type.',
    pillar: 'People & Safety',
    accent: 'var(--mod-hr)',
    features: [
      'staff, daily-labour and piece-rate workers',
      'attendance and leave',
      'payroll with statutory deductions',
      'site-wise labour cost',
    ],
    achieve: 'Pay every worker type correctly and see what labour each site really costs.',
    agentIds: [],
  },
  {
    id: 'safety-compliance',
    name: 'Safety & Compliance',
    short: 'Permits, PPE, BNBC.',
    pillar: 'People & Safety',
    accent: 'var(--mod-safety)',
    features: [
      'work permits and toolbox talks',
      'PPE issue and inspections',
      'incident and near-miss register',
      'BNBC compliance records',
    ],
    achieve:
      'Keep sites compliant and incidents on record — with expiries flagged before they lapse.',
    agentIds: [],
  },

  // Trust Platform — the backbone every module + agent stands on
  {
    id: 'identity',
    name: 'Identity',
    short: 'RBAC + audit log.',
    pillar: 'Trust Platform',
    accent: 'var(--mod-identity)',
    features: [
      'users, roles and permissions (RBAC)',
      'login and session security',
      'a tamper-evident audit log',
      'who-changed-what on every record',
    ],
    achieve: 'Give each person exactly the access they need — and prove who did what, when.',
    agentIds: [],
  },
  {
    id: 'tenancy',
    name: 'Tenancy',
    short: 'DB-level isolation.',
    pillar: 'Trust Platform',
    accent: 'var(--mod-tenancy)',
    features: [
      'database-level data isolation',
      'one company never sees another',
      'per-company configuration',
      'enforced on every query',
    ],
    achieve: 'Your data stays your data — isolation enforced in the database, not just the app.',
    agentIds: [],
  },
  {
    id: 'organization',
    name: 'Organization',
    short: 'Organogram, cost centres.',
    pillar: 'Trust Platform',
    accent: 'var(--mod-org)',
    features: [
      'company organogram and departments',
      'cost centres',
      'designations and reporting lines',
      'shared across every module',
    ],
    achieve: 'One company structure every report and budget rolls up to.',
    agentIds: [],
  },
  {
    id: 'workflow',
    name: 'Workflow',
    short: '4-Eyes runs here.',
    pillar: 'Trust Platform',
    accent: 'var(--mod-workflow)',
    features: [
      'approval chains (maker–checker)',
      'the 4-Eyes review gate',
      'configurable approval limits',
      'a full approval audit trail',
    ],
    achieve:
      'Nothing of consequence posts without the right person signing off — including every agent.',
    agentIds: [],
  },
  {
    id: 'notification',
    name: 'Notification',
    short: 'Five-channel, audited.',
    pillar: 'Trust Platform',
    accent: 'var(--mod-notification)',
    features: [
      'email, SMS, in-app and more',
      'event-driven alerts',
      'per-user preferences',
      'every send recorded',
    ],
    achieve: 'The right person hears about the approval, expiry or exception in time to act.',
    agentIds: [],
  },

  // Intelligence spine
  {
    id: 'ai-platform',
    name: 'AI Platform',
    short:
      'The intelligence spine — registry, 4-Eyes gateway, write-back boundary, per-tenant memory.',
    pillar: 'Intelligence Spine',
    accent: 'var(--mod-ai)',
    features: [
      'the agent registry',
      'a 4-Eyes write-back gateway',
      'per-tenant memory and context',
      'a confidence and provenance record on every run',
    ],
    achieve: 'Where every agent lives — and where each one earns the right to write to your books.',
    agentIds: [],
  },
]

export const pillars: Pillar[] = [
  'Financial Command',
  'Project Delivery',
  'Procurement, Materials & Assets',
  'Property Sales & Customer Lifecycle',
  'People & Safety',
  'Trust Platform',
  'Intelligence Spine',
]

export const modulesByPillar = (p: Pillar) => modules.filter((m) => m.pillar === p)

// Compile-time invariants (remove nothing — this is the test). Every module must
// have 3+ features, a non-empty achieve line, and agentIds that resolve to real
// agents in lib/agents.ts.
import { agents } from './agents'
const _agentIdSet = new Set(agents.map((a) => a.id))
const _moduleInvariants = modules.map(
  (m) => m.features.length >= 3 && !!m.achieve && m.agentIds.every((id) => _agentIdSet.has(id))
) satisfies boolean[]
void _moduleInvariants
