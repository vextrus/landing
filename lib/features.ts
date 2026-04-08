export interface FeatureCard {
  title: string
  features: string[]
  entityCount: number
}

export const edisonFeatures: FeatureCard[] = [
  {
    title: 'Land & Title',
    features: [
      'Khatian documents & title verification',
      'Ownership classification & valuations',
      'RAJUK/CDA compliance tracking',
    ],
    entityCount: 6,
  },
  {
    title: 'Property & Units',
    features: [
      '15 unit types, construction tracking',
      'GPS coordinates & virtual tours',
      'Parking inventory management',
    ],
    entityCount: 8,
  },
  {
    title: 'Sales Pipeline',
    features: [
      '16 lead sources, 8-stage funnel',
      'Lead scoring (Hot/Warm/Cold)',
      'Broker commission tracking',
    ],
    entityCount: 7,
  },
  {
    title: 'Collection',
    features: [
      '8 payment modes incl. bKash/Nagad',
      '6-tier auto-reminder system',
      'Bank loan & refund processing',
    ],
    entityCount: 8,
  },
  {
    title: 'Handover',
    features: [
      'Snag tracking & rectification',
      'Inspection checklists & certificates',
      'Utility connection management',
    ],
    entityCount: 6,
  },
  {
    title: 'Customer CRM',
    features: [
      'Portal access & communications',
      'Feedback & warranty management',
      'Support ticket tracking',
    ],
    entityCount: 7,
  },
]

export const techStack = [
  { layer: 'Runtime', tech: 'Node.js 22 LTS', reason: 'V8 performance, async I/O for real-time' },
  {
    layer: 'Backend',
    tech: 'NestJS 11 + CQRS',
    reason: 'Enterprise DDD, command/query separation',
  },
  { layer: 'API', tech: 'GraphQL', reason: '1,185 operations, type-safe, efficient fetching' },
  {
    layer: 'Database',
    tech: 'PostgreSQL 16 + pgvector',
    reason: 'ACID + vector embeddings for AI memory',
  },
  { layer: 'Cache', tech: 'Redis 7', reason: 'Sessions, notifications, job queues' },
  { layer: 'ORM', tech: 'Prisma 7', reason: 'Type-safe queries, multi-schema, migrations' },
  {
    layer: 'Frontend',
    tech: 'React 19 + React Router 7',
    reason: 'Server components, streaming, view transitions',
  },
  {
    layer: 'AI Models',
    tech: 'Gemini 2.5, Claude, GPT-4',
    reason: 'Multi-model, provider-agnostic architecture',
  },
  { layer: 'Deploy', tech: 'GCP Cloud Run', reason: 'Auto-scaling, Cloud SQL managed PostgreSQL' },
  {
    layer: 'Observability',
    tech: 'OpenTelemetry + Pino',
    reason: 'Distributed tracing, structured logging',
  },
  { layer: 'Validation', tech: 'Zod 4', reason: 'Runtime type safety at every boundary' },
  { layer: 'Monorepo', tech: 'Turborepo + pnpm', reason: '54 packages, incremental builds' },
] as const

export const complianceFeatures = [
  {
    title: 'VAT/TDS/AIT',
    detail: '15% standard VAT, 2-10% TDS by vendor category, 5% AIT on receipts > \u09F325,000',
  },
  {
    title: 'Mushak Forms',
    detail: '6.3, 6.5, 6.6, 6.10, 9.1, 2.3 \u2014 auto-generated from transactions',
  },
  {
    title: 'Fiscal Year',
    detail: 'July 1 \u2013 June 30. Monthly periods. Soft/hard close. Adjustment window.',
  },
  { title: 'Currency', detail: 'BDT native. Lakh/crore grouping (1,00,000 not 100,000).' },
  { title: 'Address', detail: '8 divisions, 64 districts. Mouza/dag/khatian for land records.' },
  { title: 'Payments', detail: '01[3-9]XX validation. bKash, Nagad, Rocket payment integration.' },
] as const

export const securityHighlights = [
  {
    title: 'Multi-Tenant Isolation',
    detail:
      'Row-Level Security at database level. tenant_id on every row. Even application bugs cannot leak data.',
  },
  {
    title: 'Audit Trail',
    detail:
      'Append-only log with monthly partitioning. 7-year retention. Every action traced to user + timestamp.',
  },
  {
    title: '901 Permissions',
    detail:
      'Granular resource:action RBAC. Department and project-scoped access. Server-side enforcement.',
  },
] as const
