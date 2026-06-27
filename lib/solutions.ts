// The named automation bundles (master spec Part 4 + 9.1). Each kills one
// expensive business problem end-to-end. No customer-facing price — priced to
// recovered value, payback in weeks. The 4 productized bundles + the custom upsell.

export interface SolutionDef {
  id: string
  name: string
  kicker: string // short category tag, e.g. "THE LAND"
  accent: string // CSS var
  iconId: string // maps to Icon set
  kills: string // the problem it kills (quote)
  agents: string[] // agent names inside
  recovered: string // recovered-value framing
  expand: string // land-and-expand note
  roadmapNote?: string // honesty flag where applicable
}

export const solutions: SolutionDef[] = [
  {
    id: 'estimator-to-erp',
    name: 'Estimator-to-ERP',
    kicker: 'THE LAND',
    accent: 'var(--mod-costing)',
    iconId: 'rebar',
    kills:
      'Turning drawings into a priced BOQ takes us a week, and then it has to be re-typed into our accounts.',
    agents: ['Drawing Estimator', 'BOQ Rate Estimator'],
    recovered:
      'A week of skilled QS time per estimate collapses to minutes; transcription errors on multi-crore lines disappear; priced quantities land in project costing with nothing re-keyed, and the waste-minimised Bar Bending Schedule hands back steel naive cutting throws away.',
    expand:
      'The entry bundle — the single most demonstrable piece of work and the cleanest first proof for a greenfield Tier-2/3 firm. Lands on one undeniable result, then opens the account to the adjacent bundles.',
  },
  {
    id: 'leakage-shield',
    name: 'Leakage Shield',
    kicker: 'SPEND CONTROL',
    accent: 'var(--mod-ap)',
    iconId: 'shield-alert',
    kills: 'Money leaks out in procurement before we ever see it.',
    agents: ['Leakage Detector', 'Budget Overrun Sentinel'],
    recovered:
      'Over-billing, duplicate invoices, and off-budget spend caught before payment — not at audit; projects flagged for overrun months early, with the cause named. The bundle that speaks straight to a control-minded owner’s first fear.',
    expand:
      'The natural second bundle after the Estimator land — or an alternative first land for a firm whose pain is spend control. Proves recovered taka fast, earning the right to cross-sell.',
    roadmapNote:
      'The AP/GL engine three-way-matches and flags anomalies today; the Leakage Detector agent is on the near-term roadmap. Sold as in development on a working boundary, never as finished automation.',
  },
  {
    id: 'bill-to-cash',
    name: 'Bill-to-Cash Accelerator',
    kicker: 'CASH',
    accent: 'var(--mod-ar)',
    iconId: 'coins-stack',
    kills:
      'Our cash is stuck in receivables and IPC retention, and chasing it depends on someone remembering.',
    agents: ['Collection Predictor', 'Credit-Risk Analyzer', 'Lead Scorer'],
    recovered:
      'The team learns which overdue accounts will pay and which need escalation, and acts on the ones that move the cash; credit exposure is scored before more is extended; sales effort concentrates on the leads that close. Cash arrives sooner without a relationship-dependent chase.',
    expand:
      'The receivables-side expansion into an account already trusting the platform on the cost side. Strongest for developers and hybrid firms carrying instalment and retention balances.',
    roadmapNote:
      'AR runs progress billing, ageing and logged collections today; the Collection Predictor and Credit-Risk agents are in development. Sold honestly as a near roadmap on a live receivables engine.',
  },
  {
    id: 'compliance-autopilot',
    name: 'NBR & RAJUK Compliance Autopilot',
    kicker: 'COMPLIANCE',
    accent: 'var(--mod-tax)',
    iconId: 'file-check',
    kills: 'VAT and TDS are manual, and every month-end is an audit risk.',
    agents: ['Mushak Autopilot', 'TDS/VDS Deduction Agent'],
    recovered:
      'The correct withholding computed and posted per payment; the Mushak return assembled from real transactions, audit-ready. The downside removed here is an NBR penalty — so this bundle is compliance-priced, not outcome-priced.',
    expand:
      'The regulatory moat is the reason a foreign system cannot follow into this account at all; this bundle deepens the relationship into the compliance function and the CFO’s office.',
    roadmapNote:
      'The tax engine already posts real journals and computes every deduction; the compliance agents are on the roadmap (Mushak Autopilot is advisory today). Sold as BD-native and on a near roadmap — never as finished auto-filing.',
  },
]

export const customBuild = {
  name: 'Flagship Custom Build',
  kicker: 'THE UPSELL',
  accent: 'var(--mod-ai)',
  kills: 'A problem specific to one firm that no productized bundle quite fits.',
  body: 'Any agent, built bespoke on the proven flagship pattern — LLM-as-sensor + deterministic engine + 4-Eyes write-back — trained on that firm’s own projects through per-tenant learning. The same trust architecture applies: the bespoke agent still proposes, the firm still approves every taka, and every action is still logged.',
  expand:
    'The top of the expansion ladder, reserved for firms — especially hybrid developer-contractors — whose scale and discipline justify an agent tuned to their exact workflow.',
} as const

// `/solutions` routes by BUYER (the job axis); modules live under `/system` (the
// object axis). Each segment re-narrates the same system in that buyer's language.
export type SegmentId = 'developer' | 'contractor' | 'hybrid'

export interface SegmentDef {
  id: SegmentId
  label: string
  who: string
  headline: string
  pains: string[]
  lead: string[] // solution ids that land first for this buyer
}

export const segments: SegmentDef[] = [
  {
    id: 'developer',
    label: 'Developer',
    who: 'Real-estate developers',
    headline: 'Price the land right, then get the cash in.',
    pains: [
      'estimates that take a week and get re-typed into the books',
      'cash stuck in instalments and IPC retention',
      'leads worked on gut feel, not on who will actually buy',
    ],
    lead: ['estimator-to-erp', 'bill-to-cash'],
  },
  {
    id: 'contractor',
    label: 'Contractor',
    who: 'Construction contractors',
    headline: 'Win the tender on the right number, keep the margin.',
    pains: [
      'tender BOQs priced by hand under deadline',
      'money leaking in procurement before anyone sees it',
      'subcontractor RA bills and retention tracked off-system',
    ],
    lead: ['estimator-to-erp', 'leakage-shield'],
  },
  {
    id: 'hybrid',
    label: 'Hybrid',
    who: 'Developer + government contractor',
    headline: 'One system for both sides of the business.',
    pains: [
      'developer cash flow and contractor cost control in two different tools',
      'government-tender compliance on top of NBR and RAJUK',
      'no single source of truth across projects and the books',
    ],
    lead: ['estimator-to-erp', 'leakage-shield', 'bill-to-cash'],
  },
]

export const segmentById = (id: string) => segments.find((s) => s.id === id)
export const solutionById = (id: string) => solutions.find((s) => s.id === id)
