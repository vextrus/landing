import { Container } from '@/components/ui/container'
import { Overline } from '@/components/ui/overline'
import { LearningLoopFlow } from '@/components/interactive/learning-loop-flow'
import { LucideIcon } from '@/components/ui/lucide-icon'
import { ScrollReveal } from '@/components/interactive/scroll-reveal'

const agentTypes = [
  {
    icon: 'Zap',
    title: 'Embedded',
    desc: 'AI suggests GL account as you type the journal entry description. Instant, inline.',
  },
  {
    icon: 'ChartBar',
    title: 'Batch',
    desc: 'Nightly: scan all overdue invoices, prioritize collection cases, draft reminders.',
  },
  {
    icon: 'Link2',
    title: 'Cross-Module',
    desc: 'Construction milestone triggers progress billing, GL posting, and client notification.',
  },
  {
    icon: 'MessageSquare',
    title: 'Conversational',
    desc: '"Which vendors exceeded budget this quarter?" — instant answer from your data.',
  },
]

export function AiEngineSection() {
  return (
    <section
      className="bg-atmospheric-intense noise-overlay relative py-[var(--section-py)]"
      id="ai"
    >
      <Container className="relative z-10">
        <Overline>AI With Accountability</Overline>
        <h2 className="mt-4 max-w-3xl font-heading text-section font-bold text-[var(--text-primary)]">
          20 AI Agents. 4-Eyes Principle. Agent Memory.
        </h2>
        <p className="mt-2 text-base text-[var(--text-secondary)]">
          <span className="text-[var(--accent)]">40+ agents coming soon</span> — every module gets
          dedicated intelligence.
        </p>

        <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--text-secondary)]">
          Every agent has memory. With every confirmed or rejected suggestion, they learn your
          patterns. Confidence grows from 70% to 95%+ over weeks of real usage. No AI action
          executes without human approval.
        </p>

        {/* The 4-Eyes Principle — Learning Loop Flow */}
        <div className="mt-10">
          <h3 className="font-heading text-subsection font-bold text-[var(--text-primary)]">
            The 4-Eyes Principle
          </h3>
          <p className="mt-2 max-w-lg text-sm text-[var(--text-secondary)]">
            AI suggests. You decide. The system learns. Nothing executes without human approval.
          </p>
        </div>
        <LearningLoopFlow />

        {/* Cycle statement — prominent */}
        <p className="mt-10 text-center font-display text-[clamp(1.25rem,1rem+1.2vw,1.75rem)] italic leading-snug text-[var(--text-secondary)]">
          Every cycle makes the next suggestion better.
        </p>

        {/* Brand statement */}
        <p className="mt-6 text-center font-mono text-xs tracking-wide text-[var(--text-tertiary)]">
          Every AI action is logged. Every decision is auditable. Every pattern is learned.
        </p>

        {/* Architecture positioning */}
        <div className="mx-auto mt-12 max-w-3xl rounded-xl border border-[var(--border-subtle)] bg-[var(--canvas-raised)] p-6">
          <p className="text-[14px] leading-relaxed text-[var(--text-secondary)]">
            Global ERP vendors bolt AI onto decades-old architecture. Vextrus was born with AI in
            every layer — from the database{' '}
            <span className="font-mono text-[var(--text-primary)]">(pgvector embeddings)</span> to
            the API{' '}
            <span className="font-mono text-[var(--text-primary)]">
              (1,185 type-safe operations)
            </span>{' '}
            to the UI{' '}
            <span className="font-mono text-[var(--text-primary)]">(inline agent suggestions)</span>
            . This isn&apos;t a feature. It&apos;s the architecture.
          </p>
        </div>

        {/* Agent Types */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {agentTypes.map((a) => (
            <ScrollReveal key={a.title}>
              <div
                className="rounded-xl border border-[var(--border-subtle)] bg-[var(--canvas-raised)] p-5"
                style={{
                  borderLeftWidth: '4px',
                  borderLeftColor: 'var(--accent)',
                }}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent-muted)]">
                  <LucideIcon
                    name={a.icon}
                    size={18}
                    className="text-[var(--accent)]"
                    strokeWidth={1.8}
                  />
                </div>
                <h3 className="mt-3 font-heading text-sm font-semibold text-[var(--text-primary)]">
                  {a.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {a.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
