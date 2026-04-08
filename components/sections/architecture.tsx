import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'
import { Overline } from '@/components/ui/overline'
import { techStack, securityHighlights } from '@/lib/features'
import { LucideIcon } from '@/components/ui/lucide-icon'

const dddLayers = [
  { name: 'Presentation', detail: 'GraphQL Resolvers', lightness: 0.35 },
  { name: 'Application', detail: 'Commands + Queries (CQRS)', lightness: 0.28 },
  { name: 'Domain', detail: 'Entities, Events, Value Objects', lightness: 0.22 },
  { name: 'Infrastructure', detail: 'Prisma, Redis, LLM Adapters', lightness: 0.16 },
]

const securityIcons: Record<string, string> = {
  'Multi-Tenant Isolation': 'Shield',
  'Audit Trail': 'FileText',
  '901 Permissions': 'Key',
}

const securityBorders: Record<string, string> = {
  'Multi-Tenant Isolation': 'oklch(0.55 0.14 275)',
  'Audit Trail': 'oklch(0.72 0.15 44)',
  '901 Permissions': 'oklch(0.60 0.12 260)',
}

const techLogos: Record<string, React.ReactNode> = {
  'Node.js 22 LTS': (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1L14 4.5V11.5L8 15L2 11.5V4.5L8 1Z" fill="oklch(0.55 0.14 145 / 0.8)" />
    </svg>
  ),
  'NestJS 11 + CQRS': (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" fill="oklch(0.55 0.14 15 / 0.8)" />
    </svg>
  ),
  GraphQL: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <polygon
        points="8,2 14,6 14,12 8,14 2,12 2,6"
        fill="none"
        stroke="oklch(0.60 0.14 330 / 0.8)"
        strokeWidth="1.5"
      />
    </svg>
  ),
  'PostgreSQL 16 + pgvector': (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <ellipse cx="8" cy="8" rx="5" ry="6" fill="oklch(0.55 0.10 245 / 0.8)" />
    </svg>
  ),
  'Redis 7': (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect
        x="3"
        y="3"
        width="10"
        height="10"
        rx="1"
        transform="rotate(45 8 8)"
        fill="oklch(0.55 0.14 25 / 0.8)"
      />
    </svg>
  ),
  'React 19 + React Router 7': (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="2" fill="oklch(0.60 0.12 220 / 0.8)" />
      <ellipse
        cx="8"
        cy="8"
        rx="6"
        ry="2.5"
        fill="none"
        stroke="oklch(0.60 0.12 220 / 0.5)"
        strokeWidth="0.8"
      />
    </svg>
  ),
}

export function ArchitectureSection() {
  return (
    <Section variant="dark" id="architecture">
      <Container>
        <Overline>Architecture</Overline>
        <h2 className="mt-4 font-heading text-section font-bold text-[var(--text-primary)]">
          Engineered, Not Assembled.
        </h2>

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          {/* Tech Stack — Definition List */}
          <div className="space-y-0">
            {techStack.map((row, i) => (
              <div
                key={row.layer}
                className={`px-4 py-3.5 ${i > 0 ? 'border-t border-[var(--border-subtle)]' : ''}`}
              >
                <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-tertiary)]">
                  {row.layer}
                </p>
                <div className="mt-0.5 flex items-center gap-2">
                  {techLogos[row.tech] && <span className="shrink-0">{techLogos[row.tech]}</span>}
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{row.tech}</p>
                </div>
                <p className="mt-0.5 text-xs text-[var(--text-secondary)]">{row.reason}</p>
              </div>
            ))}
          </div>

          {/* DDD Layers + Security */}
          <div className="space-y-6">
            {/* DDD Layered Diagram */}
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--canvas-raised)] p-6">
              <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-tertiary)]">
                Domain-Driven Design
              </p>
              <div className="mt-4 space-y-1.5">
                {dddLayers.map((layer, i) => (
                  <div key={layer.name}>
                    <div
                      className="rounded-lg px-4 py-2.5"
                      style={{
                        background: `linear-gradient(90deg, oklch(${layer.lightness} 0.04 275), oklch(${layer.lightness} 0.03 270))`,
                      }}
                    >
                      <p className="text-sm font-semibold text-[var(--text-primary)]">
                        {layer.name}
                      </p>
                      <p className="text-xs text-[var(--text-secondary)]">{layer.detail}</p>
                    </div>
                    {i < dddLayers.length - 1 && (
                      <div className="flex justify-center py-0.5">
                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                          <path
                            d="M6 0L6 6M6 6L3 3M6 6L9 3"
                            stroke="oklch(1 0 0 / 0.15)"
                            strokeWidth="1"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Security Cards */}
            {securityHighlights.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-[var(--border-subtle)] bg-[var(--canvas-raised)] p-5"
                style={{
                  borderLeftWidth: '4px',
                  borderLeftColor: securityBorders[item.title] || 'var(--accent)',
                }}
              >
                <div className="flex items-center gap-2.5">
                  <LucideIcon
                    name={securityIcons[item.title] || 'Shield'}
                    size={16}
                    className="text-[var(--text-secondary)]"
                    strokeWidth={1.8}
                  />
                  <h3 className="font-heading text-sm font-semibold text-[var(--text-primary)]">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
