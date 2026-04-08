import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'
import { Overline } from '@/components/ui/overline'
import { modules, moduleDomains } from '@/lib/modules'
import { edisonFeatures } from '@/lib/features'
import { ModuleGrid } from '@/components/interactive/module-grid'
import { LucideIcon } from '@/components/ui/lucide-icon'

const lifecycleSteps = [
  'Land Acquisition',
  'Property Development',
  'Sales & Booking',
  'Collection',
  'Handover',
  'CRM',
]

const cardIcons: Record<string, string> = {
  'Land & Title': 'MapPin',
  'Property & Units': 'Building2',
  'Sales Pipeline': 'Target',
  Collection: 'Banknote',
  Handover: 'CheckCircle2',
  'Customer CRM': 'Users',
}

export function TheSystemSection() {
  return (
    <>
      {/* Part A: Module Grid */}
      <Section variant="dark" id="system">
        <Container>
          <Overline>The System</Overline>
          <h2 className="mt-4 max-w-3xl font-heading text-section font-bold text-[var(--text-primary)]">
            19 Modules. One Nervous System.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--text-secondary)]">
            Every module shares the same authentication, workflow engine, notification bus, and AI
            platform. Change one, and the system adapts.
          </p>

          <ModuleGrid modules={modules} domains={moduleDomains} />
        </Container>
      </Section>

      {/* Part B: Real Estate Deep Dive */}
      <section
        className="bg-[var(--canvas-warm)] py-[var(--section-py)] text-[var(--text-dark)]"
        id="real-estate"
      >
        <Container>
          <Overline dark>For Real Estate</Overline>
          <h2 className="mt-4 font-heading text-section font-bold text-[var(--text-dark)]">
            Land to Handover. Every Step.
          </h2>

          {/* Timeline */}
          <div className="mt-10 overflow-hidden">
            <div className="relative flex items-center justify-between">
              <div className="absolute inset-x-0 top-1/2 h-px bg-[oklch(0.72_0.15_44_/_0.3)]" />
              {lifecycleSteps.map((step) => (
                <div key={step} className="relative z-10 flex flex-col items-center">
                  <div className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-[var(--accent)] bg-[var(--canvas-warm)]">
                    <div className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  </div>
                  <span className="mt-2 hidden text-center text-[10px] font-medium text-[var(--text-dark-secondary)] sm:block">
                    {step}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 sm:hidden">
              {lifecycleSteps.map((step) => (
                <span key={step} className="text-[10px] text-[var(--text-dark-secondary)]">
                  {step}
                </span>
              ))}
            </div>
          </div>

          {/* Feature cards */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {edisonFeatures.map((card) => (
              <div
                key={card.title}
                className="rounded-xl border border-[var(--border-warm)] bg-[var(--canvas-warm-raised)] p-6"
                style={{
                  borderLeftWidth: '4px',
                  borderLeftColor: 'oklch(0.72 0.15 44)',
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <LucideIcon
                      name={cardIcons[card.title] || 'Box'}
                      size={16}
                      className="text-[oklch(0.50_0.10_44)]"
                      strokeWidth={1.8}
                    />
                    <h3 className="font-heading text-base font-semibold text-[var(--text-dark)]">
                      {card.title}
                    </h3>
                  </div>
                  <span className="rounded-full bg-[oklch(0.72_0.15_44_/_0.12)] px-2 py-0.5 text-xs font-medium text-[oklch(0.50_0.10_44)]">
                    {card.entityCount} entities
                  </span>
                </div>
                <ul className="mt-3 space-y-1.5">
                  {card.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm text-[var(--text-dark-secondary)]"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
