import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import { pageMeta } from '@/lib/site'
import { customBuild } from '@/lib/solutions'
import { Section } from '@/components/ui/section'
import { Overline } from '@/components/ui/overline'
import { Reveal } from '@/components/ui/reveal'
import { Button } from '@/components/ui/button'
import { Icon, type IconName } from '@/components/ui/icon'
import { SolutionsGrid } from '@/components/sections/solutions-grid'
import { ApprovalInbox } from '@/components/signature/approval-inbox'
import { ConfidenceFork } from '@/components/signature/confidence-fork'

export const metadata: Metadata = pageMeta({
  title: 'Solutions — buy the end of a problem, not a seat',
  description:
    'Four named bundles, each one ending a single expensive problem from start to finish. Priced to the money it recovers, never a seat count. The 20-module engine ships underneath every one.',
  path: '/solutions',
})

// ── Two principles (Part 4 preamble + 9.1) ──────────────────────────────
const PRINCIPLES: { tag: string; title: string; body: React.ReactNode }[] = [
  {
    tag: 'PRINCIPLE 01',
    title: 'Priced to recovered value',
    body: (
      <>
        Each bundle is priced to the money it returns. Payback reads in{' '}
        <strong className="text-ink">weeks, not months.</strong> The question changes from
        &ldquo;how many users?&rdquo; to &ldquo;how many drawings priced, how many bills caught, how
        much cash recovered?&rdquo;
      </>
    ),
  },
  {
    tag: 'PRINCIPLE 02',
    title: 'The platform is its own meter',
    body: (
      <>
        Every agent action ends in a logged command — so the audit log and the write-backs{' '}
        <em>are</em> the proof. At onboarding we agree a{' '}
        <strong className="text-ink">Leakage Baseline</strong>, then show, line by line, what was
        caught, recovered, or sped up.
      </>
    ),
  },
]

// ── Recovered-value pricing anchors (9.2) ───────────────────────────────
const PRICING: { icon: IconName; accent: string; title: string; body: string }[] = [
  {
    icon: 'percent',
    accent: 'var(--mod-costing)',
    title: 'Margin recovered',
    body: 'Most Bangladesh contractors work inside an 8–12% margin. One BOQ variance caught two months earlier can be worth more than a full year of subscription. We name that margin and the leak that threatens it.',
  },
  {
    icon: 'shield-alert',
    accent: 'var(--mod-ap)',
    title: 'Leakage stopped',
    body: 'Three-way matching stops over-billing; retention and advance recovery stop subcontractor leakage — which runs at roughly 10–15% of a project budget today. The recovered taka is the price story.',
  },
  {
    icon: 'gauge',
    accent: 'var(--mod-ar)',
    title: 'Time returned',
    body: 'Roughly 80% less payroll and tax paperwork; same-day month-end; the gap between an RA bill and an invoice closed. A week of a QS engineer’s estimating work comes back as minutes.',
  },
]

// ── Land-and-expand ladder (9.4) ────────────────────────────────────────
const LADDER: { n: string; title: string; body: string }[] = [
  {
    n: '01',
    title: 'Land',
    body: 'One agent, one outcome — on the firm’s own BOQ format, flat numbering, and vendor list.',
  },
  {
    n: '02',
    title: 'Prove',
    body: 'In 30–60 days the Leakage Baseline shows recovered taka, measured by the system itself.',
  },
  {
    n: '03',
    title: 'Add a bundle',
    body: 'Adjacent bundles move into a now-trusting account — Estimator opens into Bill-to-Cash; Shield into Compliance.',
  },
  {
    n: '04',
    title: 'Custom build',
    body: 'Larger and hybrid firms graduate to a bespoke agent tuned to their exact workflow.',
  },
  {
    n: '05',
    title: 'Expand, not logos',
    body: 'The metric is growth inside trusting accounts — revenue kept and grown, not new-logo count.',
  },
]

export default function SolutionsPage() {
  return (
    <>
      {/* ── Hero ── */}
      <Section tone="canvas">
        <div className="bg-atmosphere pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative">
          <Reveal className="max-w-[820px]">
            <Overline>The solutions</Overline>
            <h1 className="t-hero mt-3.5 max-w-[15ch]">
              You don&apos;t buy agents. You buy the end of a problem.
            </h1>
            <p className="mt-6 max-w-[620px] text-[18px] leading-relaxed text-ink-soft">
              Four named bundles. Each one ends a single expensive problem from start to finish,
              with the 20-module engine included underneath — priced to the money it recovers, never
              a seat count.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-[18px] md:grid-cols-2">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.tag} delay={i * 0.07} className="h-full">
                <div className="h-full rounded-[16px] border border-line bg-raised p-7">
                  <div className="mb-3 font-mono text-[11px] text-accent">{p.tag}</div>
                  <h3 className="m-0 mb-2 font-heading text-[21px] font-semibold">{p.title}</h3>
                  <p className="m-0 text-[14.5px] leading-relaxed text-ink-soft">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ── The four bundles ── */}
      <Section tone="deep">
        <Reveal className="mb-10 max-w-[680px]">
          <Overline>The bundles</Overline>
          <h2 className="t-section mt-3.5">Four bundles. One ladder up.</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">
            Each bundle pairs the right agents for one job with its recovered value, its
            land-and-expand path, and — where it matters — the honest line on what ships today
            versus what is on the roadmap.
          </p>
        </Reveal>
        <SolutionsGrid detailed />
      </Section>

      {/* ── Human-in-the-loop: how every bundle behaves ── */}
      <Section tone="canvas">
        <Reveal className="mb-10 max-w-[700px]">
          <Overline>Same trust in every bundle</Overline>
          <h2 className="t-section mt-3.5">The agent proposes. You approve.</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">
            Every bundle works the same way. The AI does the work across the pipeline;
            high-confidence actions run on their own, and the rest come to you to approve. No agent
            changes your books without a person signing off.
          </p>
        </Reveal>

        <div className="grid items-start gap-8 lg:grid-cols-2">
          <Reveal>
            <ConfidenceFork />
          </Reveal>
          <Reveal delay={0.08}>
            <ApprovalInbox tagline="Whatever bundle you land on, only the exceptions reach you." />
          </Reveal>
        </div>
      </Section>

      {/* ── Flagship Custom Build (warm break) ── */}
      <Section tone="warm">
        <Reveal>
          <div
            className="grid items-center gap-10 rounded-[20px] border p-8 sm:p-10 lg:grid-cols-[1.25fr_1fr] lg:gap-12"
            style={{
              borderColor: 'oklch(0.72 0.14 44 / 0.4)',
              background:
                'linear-gradient(135deg, oklch(0.72 0.14 44 / 0.1), var(--color-warm-raised))',
            }}
          >
            <div>
              <span
                className="inline-flex items-center rounded-[7px] px-2.5 py-1 font-mono text-[11px]"
                style={{ background: 'oklch(0.72 0.14 44 / 0.18)', color: 'oklch(0.5 0.14 44)' }}
              >
                {customBuild.kicker} · top of the ladder
              </span>
              <h2 className="mt-3.5 font-heading text-[28px] font-bold leading-tight tracking-[-0.02em] text-ink-dark">
                {customBuild.name}
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-dark-soft">
                {customBuild.body}
              </p>
            </div>
            <div className="border-l pl-7" style={{ borderColor: 'var(--color-line-warm)' }}>
              <div className="font-mono text-[11px] text-accent">WHERE IT FITS</div>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink-dark-soft">
                {customBuild.expand}
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ── Recovered-value pricing + the Leakage Baseline ── */}
      <Section tone="canvas">
        <Reveal className="mb-10 max-w-[700px]">
          <Overline>Recovered-value pricing</Overline>
          <h2 className="t-section mt-3.5">No taka on the order form. A meter instead.</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">
            Vextrus is priced to the money it returns, against your own numbers — never a rate card,
            never a customer we do not yet have. The rule in every conversation:{' '}
            <strong className="text-ink">make doing nothing the costed option.</strong>
          </p>
        </Reveal>

        <div className="grid gap-[18px] md:grid-cols-3">
          {PRICING.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.07} className="h-full">
              <div
                className="vxtile flex h-full flex-col rounded-[16px] border border-line bg-raised p-7"
                style={{ '--tile-accent': p.accent } as CSSProperties}
              >
                <span
                  className="vxtile-ic mb-3.5 inline-grid h-[38px] w-[38px] place-items-center rounded-[11px] border border-line"
                  style={{ color: p.accent }}
                >
                  <Icon name={p.icon} size={20} />
                </span>
                <h3 className="m-0 mb-2 font-heading text-[19px] font-semibold">{p.title}</h3>
                <p className="m-0 text-[13.5px] leading-relaxed text-ink-soft">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-[18px]" delay={0.05}>
          <div className="grid items-center gap-8 rounded-[18px] border border-line bg-raised p-8 sm:p-10 lg:grid-cols-[auto_1fr] lg:gap-10">
            <span
              className="inline-grid h-[52px] w-[52px] place-items-center rounded-[14px]"
              style={{ background: 'oklch(0.72 0.14 44 / 0.14)', color: 'var(--color-accent)' }}
            >
              <Icon name="gauge" size={26} />
            </span>
            <div>
              <h3 className="m-0 font-heading text-[22px] font-semibold">
                The Leakage Baseline — the platform is its own meter
              </h3>
              <p className="m-0 mt-2.5 max-w-[760px] text-[14.5px] leading-relaxed text-ink-soft">
                Every AI action ends in an immutable audit entry and, where it applies, a registered
                write-back to the ledger — so the system records exactly what it caught, recovered,
                or sped up, in taka, with the entry number attached. At onboarding we agree a
                starting position: current over-billing rate, current days-sales-outstanding,
                current estimate turnaround. From day one the platform measures the change against
                it.{' '}
                <span className="text-ink">
                  This is what turns &ldquo;trust us&rdquo; into &ldquo;here is the diff.&rdquo;
                </span>
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ── Land and expand ── */}
      <Section tone="deep">
        <Reveal className="mx-auto mb-12 max-w-[700px] text-center">
          <Overline>Land and expand</Overline>
          <h2 className="t-section mt-3.5">Start narrow. Grow on proof.</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">
            Every BD ERP that failed did so because a generic product was dropped in and the vendor
            left. Vextrus does the opposite, and the motion is built into the product. The Tenancy
            module already gates access per entitlement and meters AI usage per tenant, so a firm
            starts on one solution and adds more without re-platforming.
          </p>
        </Reveal>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {LADDER.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.06} className="h-full">
              <div className="flex h-full flex-col rounded-[14px] border border-line bg-raised p-5">
                <div className="mb-2.5 font-mono text-[11px] text-accent">{step.n}</div>
                <h4 className="m-0 mb-1.5 font-heading text-[15px] font-semibold">{step.title}</h4>
                <p className="m-0 text-[12.5px] leading-normal text-ink-soft">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-[18px]" delay={0.05}>
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-[16px] border border-line bg-raised p-7 sm:px-9">
            <p className="m-0 max-w-[660px] text-[16px] leading-relaxed text-ink">
              Onboarding runs in <strong>weeks, not quarters</strong> — the opposite of every
              failure story in this market: <em>we stay after go-live.</em>
            </p>
            <Button href="/contact" size="md" icon="arrow-right" iconRight>
              Talk through your leakage
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* ── Final CTA ── */}
      <Section tone="canvas" className="text-center">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 70% at 50% 40%, oklch(0.55 0.1 275 / 0.18), transparent), radial-gradient(ellipse 50% 50% at 70% 80%, oklch(0.55 0.1 44 / 0.12), transparent)',
          }}
          aria-hidden="true"
        />
        <Reveal className="relative mx-auto max-w-[740px]">
          <h2 className="t-display">
            Pick the problem you want gone.
            <br />
            <span className="italic text-gradient">
              We&apos;ll price the recovery, not the seats.
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-[560px] text-[18px] leading-relaxed text-ink-soft">
            Bring your own leakage. We agree a baseline, land on one bundle, and let the platform
            meter what it recovers — line by line.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3.5">
            <Button href="/contact" size="lg" icon="arrow-right" iconRight>
              Book a demo
            </Button>
            <Button href="/workforce" size="lg" variant="ghost">
              See the full workforce
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  )
}
