import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'
import { Overline } from '@/components/ui/overline'
import { NumberCounter } from '@/components/interactive/number-counter'

const primaryStats = [
  { value: 19, suffix: '', label: 'modules', sublabel: 'interconnected system' },
  { value: 269, suffix: '', label: 'database models', sublabel: 'Prisma + PostgreSQL' },
  { value: 1185, suffix: '', label: 'GraphQL operations', sublabel: 'type-safe API' },
]

const secondaryStats = [
  { value: 901, suffix: '', label: 'permissions', sublabel: 'granular RBAC' },
  { value: 20, suffix: '+', label: 'AI agents', sublabel: '40+ by Q4 2026' },
  { value: 550, suffix: '+', label: 'frontend routes', sublabel: 'React Router 7' },
  { value: 366, suffix: '', label: 'GraphQL resolvers', sublabel: 'NestJS + CQRS' },
  { value: 12, suffix: 'K+', label: 'TypeScript files', sublabel: '0 type errors' },
  { value: 31, suffix: '', label: 'workspace packages', sublabel: 'Turborepo monorepo' },
]

export function TheNumbersSection() {
  return (
    <Section variant="warm" id="numbers">
      <Container>
        <Overline dark>By the Numbers</Overline>

        <h2 className="mt-4 font-heading text-section font-bold text-[var(--text-dark)]">
          Scale That Speaks for Itself.
        </h2>

        {/* Primary stats — large */}
        <div className="mt-10 grid grid-cols-1 gap-8 border-b border-[oklch(0.72_0.15_44_/_0.2)] pb-10 sm:grid-cols-3">
          {primaryStats.map((stat) => (
            <div key={stat.label}>
              <NumberCounter
                value={stat.value}
                suffix={stat.suffix}
                className="font-mono text-[clamp(3rem,2.5rem+2vw,4.5rem)] font-bold leading-none tracking-tighter text-[var(--text-dark)]"
              />
              <p className="mt-2 text-sm font-medium text-[var(--text-dark-secondary)]">
                {stat.label}
              </p>
              <p className="text-xs text-[var(--text-dark-secondary)] opacity-60">
                {stat.sublabel}
              </p>
            </div>
          ))}
        </div>

        {/* Secondary stats — compact grid */}
        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {secondaryStats.map((stat) => (
            <div key={stat.label}>
              <NumberCounter
                value={stat.value}
                suffix={stat.suffix}
                className="font-mono text-2xl font-semibold tracking-tight text-[var(--text-dark)]"
              />
              <p className="mt-1 text-xs font-medium text-[var(--text-dark-secondary)]">
                {stat.label}
              </p>
              <p className="text-[10px] text-[var(--text-dark-secondary)] opacity-50">
                {stat.sublabel}
              </p>
            </div>
          ))}
        </div>

        {/* AI development narrative */}
        <div className="mt-12 rounded-xl border border-[var(--border-warm)] bg-[var(--canvas-warm-raised)] p-6">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[oklch(0.72_0.15_44_/_0.12)]">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1L14 4.5V11.5L8 15L2 11.5V4.5L8 1Z" fill="oklch(0.50 0.10 44)" />
              </svg>
            </span>
            <div>
              <p className="text-sm font-semibold text-[var(--text-dark)]">
                Built with AI, for AI-native enterprise.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-dark-secondary)]">
                90% of the Vextrus codebase is contributed by Claude Opus — making it one of the
                largest AI-authored production enterprise systems. We develop with a fully
                customized multi-agent orchestration workflow built on Claude Code: dedicated agents
                for backend, frontend, database, code review, and verification. This isn&apos;t just
                AI-integrated software — it&apos;s software that was itself built by AI,
                continuously upgraded across 19 modules through automated development sessions.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
