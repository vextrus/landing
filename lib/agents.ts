// The 23 agents (master spec Appendix A, verified 2026-06-18: 1 flagship /
// 13 elevatable / 9 embedded). Tier is defined by what the agent is allowed
// to do to your records. Honesty guardrail: ONLY the Estimator is a shipped
// flagship; elevatable = a registered write-back command exists (roadmap);
// embedded = advisory only (no write-back).

export type Tier = 'flagship' | 'elevatable' | 'embedded'

// Department groupings for the Workforce Roster — which part of a BD
// construction/real-estate business the agent works for.
export type Department = 'estimation' | 'finance' | 'procurement' | 'sales' | 'site' | 'hr'

export const DEPARTMENTS = [
  { id: 'estimation', label: 'Estimation' },
  { id: 'finance', label: 'Finance' },
  { id: 'procurement', label: 'Procurement' },
  { id: 'sales', label: 'Sales' },
  { id: 'site', label: 'Site' },
  { id: 'hr', label: 'People' },
] as const satisfies readonly { id: Department; label: string }[]

// Confidence-meter data (kept in a server-safe module so it can be imported by
// server components — values from 'use client' modules become client refs).
export interface ConfidenceFactor {
  name: string
  score: number // 0–1
  weight: number // 0–1
}

// The home/keystone default — the Bank Reconciler NPSB draft (master spec 2.6).
export const npsbConfidence: { score: number; sentence: string; factors: ConfidenceFactor[] } = {
  score: 93.4,
  sentence: 'Strong signals — safe to apply with a quick glance.',
  factors: [
    { name: 'Vendor & amount matched to PO', score: 0.92, weight: 0.85 },
    { name: 'GL account from posting history', score: 0.84, weight: 0.6 },
    { name: 'Charge pattern recognised (NPSB)', score: 0.71, weight: 0.45 },
  ],
}

export interface AgentDef {
  id: string
  name: string
  module: string
  tier: Tier
  value: string // one-line outcome
  command?: string // registered write-back command (flagship + elevatable)
  department: Department // which part of the business it works for
  reads: string // plain words: what it watches/reads (a noun phrase)
  does: string // plain words: the action it performs (a verb phrase)
  writesTo: string | null // human module label it posts to, or null for advisory (embedded)
}

export const tierMeta: Record<
  Tier,
  { label: string; count: number; accent: string; blurb: string }
> = {
  flagship: {
    label: 'Flagship',
    count: 1,
    accent: 'var(--color-accent)',
    blurb:
      'Reads input → the engine computes → one 4-Eyes write-back. Shipped, demo-leading, customizable.',
  },
  elevatable: {
    label: 'Elevatable',
    count: 13,
    accent: 'var(--mod-ai)',
    blurb:
      'A registered write-back command is wired — the security boundary — with flagship polish pending. The near-term roadmap.',
  },
  embedded: {
    label: 'Embedded',
    count: 9,
    accent: 'var(--color-credit)',
    blurb:
      'Advisory only — no write-back. Included intelligence that makes the platform feel alive and feeds the agents’ learning.',
  },
}

export const agents: AgentDef[] = [
  // ── Flagship (1) ──
  {
    id: 'drawing-estimator',
    name: 'VextrusAI Estimator',
    module: 'project-costing',
    tier: 'flagship',
    value:
      'Upload an RCC structural drawing → vision extracts dimensions only, the executor computes a priced BOQ + full Bar Bending Schedule (waste-minimised cutting-stock) → one 4-Eyes write-back posts the real BOQ lines.',
    command: 'ImportEstimatedBoq',
    department: 'estimation',
    reads: 'tender drawings (DWG)',
    does: 'extracts quantities and prices a full BOQ and Bar Bending Schedule',
    writesTo: 'Project Costing',
  },

  // ── Elevatable (13) — registered write-back command exists ──
  {
    id: 'invoice-processor',
    name: 'Invoice Processor',
    module: 'accounts-payable',
    tier: 'elevatable',
    value: 'OCR-extracts vendor, amounts, line items, and dates from uploaded invoices.',
    command: 'CreateInvoice',
    department: 'procurement',
    reads: 'supplier bills',
    does: 'reads off the vendor, amounts and line items and three-way matches them against PO and GRN',
    writesTo: 'Accounts Payable',
  },
  {
    id: 'payment-optimizer',
    name: 'Payment Optimizer',
    module: 'accounts-payable',
    tier: 'elevatable',
    value: 'Optimizes the payment schedule against cash position; captures early-pay discounts.',
    command: 'ProcessPaymentBatch',
    department: 'procurement',
    reads: 'due bills and your cash position',
    does: 'plans which bills to pay when to keep cash safe and grab early-pay discounts',
    writesTo: 'Accounts Payable',
  },
  {
    id: 'vendor-analyzer',
    name: 'Vendor Analyzer',
    module: 'accounts-payable',
    tier: 'elevatable',
    value: 'Scores vendor risk and performance from transaction, delivery, and price history.',
    command: 'UpdateVendorRiskAssessment',
    department: 'procurement',
    reads: 'each vendor’s payment, delivery and price history',
    does: 'rates every vendor on risk and reliability',
    writesTo: 'Accounts Payable',
  },
  {
    id: 'ap-anomaly-detector',
    name: 'AP Anomaly Detector',
    module: 'accounts-payable',
    tier: 'elevatable',
    value:
      'Real-time fraud/anomaly detection on invoices and payments — outliers, duplicates, timing.',
    command: 'FlagTransactionAnomaly',
    department: 'procurement',
    reads: 'every payable line',
    does: 'flags over-billing and duplicate bills before you pay',
    writesTo: 'Accounts Payable',
  },
  {
    id: 'collection-predictor',
    name: 'Collection Predictor',
    module: 'accounts-receivable',
    tier: 'elevatable',
    value: 'Predicts payment likelihood on overdue invoices; recommends a collection strategy.',
    command: 'LogCollectionAction',
    department: 'sales',
    reads: 'receivables and past payment history',
    does: 'predicts who will pay late and what to do about it',
    writesTo: 'Accounts Receivable',
  },
  {
    id: 'credit-risk-analyzer',
    name: 'Credit-Risk Analyzer',
    module: 'accounts-receivable',
    tier: 'elevatable',
    value:
      'Assesses customer credit-worthiness; recommends rating and limit on the BD banking scale.',
    command: 'UpdateCreditRating',
    department: 'sales',
    reads: 'a customer’s payment record and exposure',
    does: 'rates credit-worthiness and sets a safe credit limit',
    writesTo: 'Accounts Receivable',
  },
  {
    id: 'journal-entry-suggester',
    name: 'Journal Entry Suggester',
    module: 'general-ledger',
    tier: 'elevatable',
    value: 'Drafts balanced double-entry journals from source documents.',
    command: 'CreateJournalEntry',
    department: 'finance',
    reads: 'source documents like bills and receipts',
    does: 'drafts a balanced journal entry, ready to post',
    writesTo: 'General Ledger',
  },
  {
    id: 'bank-reconciler',
    name: 'Bank Reconciler',
    module: 'general-ledger',
    tier: 'elevatable',
    value:
      'Matches bank transactions to ledger entries; emits a balanced journal for a bank charge.',
    command: 'CreateJournalEntry',
    department: 'finance',
    reads: 'bank statement lines against the ledger',
    does: 'matches each transaction and drafts the journal for bank charges',
    writesTo: 'General Ledger',
  },
  {
    id: 'period-close-assistant',
    name: 'Period-Close Assistant',
    module: 'general-ledger',
    tier: 'elevatable',
    value: 'Generates the close checklist, verifies balances, drafts closing entries.',
    command: 'RecordPeriodCloseAdvisory',
    department: 'finance',
    reads: 'the books at month-end',
    does: 'runs the close checklist, checks balances and drafts closing entries',
    writesTo: 'General Ledger',
  },
  {
    id: 'boq-rate-estimator',
    name: 'BOQ Rate Estimator',
    module: 'project-costing',
    tier: 'elevatable',
    value:
      'Suggests BOQ item rates from history, material prices, and the PWD schedule, with a cost buildup.',
    command: 'ApplyRateToItem',
    department: 'estimation',
    reads: 'your rate history, material prices and the PWD schedule',
    does: 'suggests a fair rate for each BOQ item with the cost buildup',
    writesTo: 'Project Costing',
  },
  {
    id: 'lead-scorer',
    name: 'Lead Scorer',
    module: 'real-estate',
    tier: 'elevatable',
    value:
      'Scores sales leads Hot/Warm/Cold (0–100) on BD heuristics — source, budget tier, engagement.',
    command: 'UpdateLeadScore',
    department: 'sales',
    reads: 'incoming sales leads — source, budget and engagement',
    does: 'scores each lead Hot, Warm or Cold so the team works the best ones first',
    writesTo: 'Real Estate',
  },
  {
    id: 'tax-compliance-advisor',
    name: 'Tax Compliance Advisor',
    module: 'tax-management',
    tier: 'elevatable',
    value:
      'Analyzes VAT/TDS/VDS/AIT transactions for NBR compliance; cites the regulation section.',
    command: 'UpdateVatConfiguration',
    department: 'finance',
    reads: 'your VAT, TDS, VDS and AIT transactions',
    does: 'checks each one against NBR rules and cites the exact section',
    writesTo: 'Tax Management',
  },
  {
    id: 'tax-rate-optimizer',
    name: 'Tax Rate Optimizer',
    module: 'tax-management',
    tier: 'elevatable',
    value:
      'Analyzes vendor TDS categories for rate-optimization and reclassification opportunities.',
    command: 'ReviewTaxOptimization',
    department: 'finance',
    reads: 'how each vendor is classified for TDS',
    does: 'finds wrong categories and the right TDS rate to save tax',
    writesTo: 'Tax Management',
  },

  // ── Embedded (9) — advisory only, no write-back ──
  {
    id: 'gl-anomaly-detector',
    name: 'GL Anomaly Detector',
    module: 'general-ledger',
    tier: 'embedded',
    value: 'Flags unusual GL patterns — outliers, duplicates, sequence gaps, control imbalance.',
    department: 'finance',
    reads: 'posted journals',
    does: 'surfaces unusual entries — outliers, duplicates and gaps',
    writesTo: null,
  },
  {
    id: 'risk-predictor',
    name: 'Risk Predictor',
    module: 'project-execution',
    tier: 'embedded',
    value: 'Predicts emerging project risks from progress, EVM, and BD monsoon context.',
    department: 'site',
    reads: 'site progress, cost trends and the monsoon calendar',
    does: 'warns about risks before they hit the schedule',
    writesTo: null,
  },
  {
    id: 'evm-forecaster',
    name: 'EVM Forecaster',
    module: 'project-execution',
    tier: 'embedded',
    value: 'AI-enhanced EAC/ETC forecasts beyond CPI/SPI — trend, seasonal, and risk adjustments.',
    department: 'site',
    reads: 'earned-value numbers and spending trends',
    does: 'forecasts the real final cost and finish date',
    writesTo: null,
  },
  {
    id: 'dpr-summarizer',
    name: 'DPR Summarizer',
    module: 'project-execution',
    tier: 'embedded',
    value: 'Auto-writes Daily Progress Report narratives from structured child entries.',
    department: 'site',
    reads: 'the day’s site entries',
    does: 'writes the Daily Progress Report narrative for you',
    writesTo: null,
  },
  {
    id: 'budget-forecaster',
    name: 'Budget Forecaster',
    module: 'project-foundation',
    tier: 'embedded',
    value: 'Projects final spend from actuals plus % complete; classifies variance risk.',
    department: 'finance',
    reads: 'spend so far against percent complete',
    does: 'projects the final cost and flags budget risk',
    writesTo: null,
  },
  {
    id: 'document-summarizer',
    name: 'Document Summarizer',
    module: 'project-foundation',
    tier: 'embedded',
    value: 'Summarizes contracts and tenders; surfaces key points and flagged clauses.',
    department: 'site',
    reads: 'long contracts and tender documents',
    does: 'pulls out the key points and risky clauses',
    writesTo: null,
  },
  {
    id: 'critical-path-monitor',
    name: 'Critical-Path Monitor',
    module: 'project-planning',
    tier: 'embedded',
    value: 'Real-time critical-path and float-consumption alerts, BD calendar-aware.',
    department: 'site',
    reads: 'the live schedule and its float',
    does: 'alerts you the moment the critical path slips',
    writesTo: null,
  },
  {
    id: 'resource-balancer',
    name: 'Resource Balancer',
    module: 'project-planning',
    tier: 'embedded',
    value: 'Detects resource over-allocation; recommends rebalancing.',
    department: 'site',
    reads: 'how crews and equipment are assigned',
    does: 'spots over-loaded resources and suggests how to rebalance',
    writesTo: null,
  },
  {
    id: 'schedule-optimizer',
    name: 'Schedule Optimizer',
    module: 'project-planning',
    tier: 'embedded',
    value: 'Suggests schedule optimizations — fast-track, crash, parallel.',
    department: 'site',
    reads: 'the project schedule',
    does: 'suggests ways to finish sooner — fast-track, crash or run in parallel',
    writesTo: null,
  },
]

export const agentsByTier = (t: Tier) => agents.filter((a) => a.tier === t)

export function agentsByDepartment(dep: Department): AgentDef[] {
  return agents.filter((a) => a.department === dep)
}

// Compile-time invariants (remove nothing — this is the test).
const _agentInvariants = agents.map((a) => {
  const dep: Department = a.department // every agent must declare a department
  // elevatable + flagship must name the module they write to; embedded must be null
  const wb: string | null = a.tier === 'embedded' ? (a.writesTo ?? null) : a.writesTo
  return Boolean(dep) && Boolean(a.reads) && a.does !== undefined && wb !== undefined
}) satisfies boolean[]
void _agentInvariants

// The flagship roadmap — four lanes (master spec Part 3.3). ★ marks the
// top-three to build next. Status is honest: shipped / elevatable / advisory.
export type Feasibility = 'shipped' | 'elevatable' | 'advisory' | 'build-ahead'

export interface RoadmapAgent {
  name: string
  outcome: string
  feasibility: Feasibility
  bdEdge: string
  next?: boolean // top-3 to build next
}

export interface Lane {
  id: string
  name: string
  agents: RoadmapAgent[]
}

export const lanes: Lane[] = [
  {
    id: 'tendering',
    name: 'Tendering & Estimation',
    agents: [
      {
        name: 'Drawing Estimator',
        outcome: 'Drawing in, priced BOQ + Bar Bending Schedule out in minutes, posted to costing.',
        feasibility: 'shipped',
        bdEdge:
          'BBS rebar, lean-concrete sheets, IPC/RA-bill format, PWD/RHD/RAJUK schedule of rates.',
        next: true,
      },
      {
        name: 'BOQ Rate Estimator',
        outcome: 'Every line item rate-checked against your real rate history.',
        feasibility: 'elevatable',
        bdEdge: 'A BD material/labour rate corpus plus the government schedule of rates.',
        next: true,
      },
      {
        name: 'Tender Margin Guard',
        outcome: 'Bid / no-bid and a margin-risk score per tender.',
        feasibility: 'build-ahead',
        bdEdge: 'Government-contractor retention, liquidated damages, price-escalation clauses.',
      },
    ],
  },
  {
    id: 'procurement',
    name: 'Procurement & Cost Control',
    agents: [
      {
        name: 'Leakage Detector',
        outcome: 'Catches over-billing, duplicates, and off-budget spend before you pay.',
        feasibility: 'elevatable',
        bdEdge: 'Vendor and subcontractor over-claim patterns.',
        next: true,
      },
      {
        name: 'Budget Overrun Sentinel',
        outcome: 'A project cost-overrun forecast with the cause named.',
        feasibility: 'advisory',
        bdEdge: 'BD escalation and the delayed-IPC cash-flow reality.',
      },
    ],
  },
  {
    id: 'compliance',
    name: 'NBR Compliance & Tax',
    agents: [
      {
        name: 'Mushak Autopilot',
        outcome:
          'NBR-compliant Mushak 9.1 entries assembled from real transactions, audit-defensible.',
        feasibility: 'advisory',
        bdEdge: 'The regulatory moat — foreign systems are not even NBR-enlisted.',
      },
      {
        name: 'TDS/VDS Deduction Agent',
        outcome: 'The correct withholding computed and posted per payment.',
        feasibility: 'advisory',
        bdEdge: 'The depth of the BD TDS/VDS/AIT schedule.',
      },
    ],
  },
  {
    id: 'collections',
    name: 'Sales & Collections (Real Estate)',
    agents: [
      {
        name: 'Bill-to-Cash Accelerator',
        outcome: 'Who will pay late, what to do about it, action logged.',
        feasibility: 'elevatable',
        bdEdge: 'The developer-instalment and IPC-retention collection rhythm.',
      },
      {
        name: 'Lead Scorer',
        outcome: 'Score and prioritize real-estate leads.',
        feasibility: 'elevatable',
        bdEdge: 'The BD developer sales funnel.',
      },
    ],
  },
]
