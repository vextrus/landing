import type { Metadata } from 'next'
import { pageMeta } from '@/lib/site'
import { npsbConfidence } from '@/lib/agents'
import { Section } from '@/components/ui/section'
import { Overline } from '@/components/ui/overline'
import { Reveal } from '@/components/ui/reveal'
import { LinkArrow } from '@/components/ui/link-arrow'
import { Icon } from '@/components/ui/icon'
import { Button } from '@/components/ui/button'
import { Hero } from '@/components/sections/home/hero'
import { TrustBand } from '@/components/sections/home/trust-band'
import { ShiftCards } from '@/components/sections/shift-cards'
import { SolutionsGrid } from '@/components/sections/solutions-grid'
import { ModuleBento } from '@/components/sections/module-bento'
import { GlassBoxPipeline } from '@/components/signature/glass-box-pipeline'
import { ConfidenceMeter } from '@/components/signature/confidence-meter'
import { ApprovalInbox } from '@/components/signature/approval-inbox'
import { ConfidenceFork } from '@/components/signature/confidence-fork'
import { WorkforceRoster } from '@/components/signature/workforce-roster'
import { CapabilityMatrix } from '@/components/signature/capability-matrix'
import { LiveEstimatorFlow } from '@/components/signature/live-estimator-flow'
import { BangladeshMap } from '@/components/signature/bangladesh-map'

export const metadata: Metadata = pageMeta({
  title: 'VextrusAI — your AI workforce for construction & real estate',
  description:
    'Agents that price drawings, catch waste, and chase cash — across one Bangladesh-native system of record. No agent changes your books on its own. You approve every taka.',
  path: '/',
})

const COMPLIANCE = [
  {
    icon: 'file-check',
    color: 'oklch(0.50 0.10 310)',
    title: 'Mushak 6.3 → 9.1',
    sub: 'NBR VAT suite',
  },
  { icon: 'building-min', color: 'oklch(0.50 0.10 200)', title: 'RAJUK · BNBC', sub: 'FAR, ECPS' },
  {
    icon: 'rebar-chart',
    color: 'oklch(0.52 0.14 44)',
    title: 'BBS · SOR · IPC',
    sub: 'the estimating moat',
  },
] as const

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* ── The shift ── */}
      <Section tone="canvas">
        <Reveal className="max-w-[780px]">
          <Overline>The shift</Overline>
          <h2 className="t-section mt-4">
            From software you operate, to a workforce that does the work.
          </h2>
        </Reveal>
        <ShiftCards className="mt-12" />
      </Section>

      {/* ── Flagship Estimator (warm break) ── */}
      <Section tone="warm">
        <Reveal className="mx-auto max-w-[730px] text-center">
          <Overline color="oklch(0.55 0.13 44)">The flagship · VextrusAI Estimator</Overline>
          <h2 className="t-display mt-3.5 text-ink-dark">
            A week of an engineer&apos;s work,
            <br />
            <span className="italic">priced in three minutes.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-[17px] leading-relaxed text-ink-dark-soft">
            The model reads the dimensions. A fixed-rule engine works out every taka — a priced BOQ
            and a full Bar Bending Schedule, written to your costing books once you approve.
          </p>
        </Reveal>
        <Reveal className="mt-14" delay={0.05}>
          <LiveEstimatorFlow variant="full" />
        </Reveal>
        <div className="mt-10 text-center">
          <LinkArrow href="/estimator" color="oklch(0.42 0.12 275)">
            See the full Estimator walkthrough
          </LinkArrow>
        </div>
      </Section>

      {/* ── 4-Eyes glass box ── */}
      <Section tone="canvas">
        <div
          className="bg-atmosphere-soft pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <div className="relative">
          <Reveal className="mx-auto max-w-[720px] text-center">
            <Overline>AI with accountability</Overline>
            <h2 className="t-display mt-3.5 italic">AI decides nothing. You decide everything.</h2>
          </Reveal>

          <Reveal className="mt-12" delay={0.05}>
            <GlassBoxPipeline />
          </Reveal>

          {/* The fork (high → auto, low → you) beside the human-in-the-loop inbox. */}
          <div className="mt-9 grid items-stretch gap-6 lg:grid-cols-2">
            <Reveal>
              <ConfidenceFork className="h-full" />
            </Reveal>
            <Reveal delay={0.08}>
              <ApprovalInbox className="h-full" />
            </Reveal>
          </div>

          <Reveal className="mt-9" delay={0.05}>
            <ConfidenceMeter
              score={npsbConfidence.score}
              factors={npsbConfidence.factors}
              sentence={npsbConfidence.sentence}
            />
            <p className="mx-0.5 mt-4 max-w-[680px] text-[13px] leading-normal text-ink-soft">
              The confidence number is the <em>engine&apos;s</em> certainty — shown to one decimal,
              never rounded — with the reasons behind it in plain words.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ── Agent constellation ── */}
      <Section tone="deep">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 50% 50% at 50% 45%, oklch(0.55 0.1 285 / 0.12), transparent)',
          }}
          aria-hidden="true"
        />
        <div className="relative">
          <Reveal className="mx-auto mb-10 max-w-[680px] text-center">
            <Overline>The workforce</Overline>
            <h2 className="t-section mt-3.5">
              23 agents. One shipped today, the rest a clear roadmap.
            </h2>
          </Reveal>
          <Reveal>
            <WorkforceRoster defaultDepartment="all" />
          </Reveal>
          <Reveal className="mt-9 text-center" delay={0.05}>
            <LinkArrow href="/workforce" className="inline-flex">
              Explore all 23 agents
            </LinkArrow>
          </Reveal>
        </div>
      </Section>

      {/* ── Capability matrix (the white space) ── */}
      <Section tone="canvas">
        <Reveal className="mx-auto mb-12 max-w-[680px] text-center">
          <Overline>Why Vextrus — the white space</Overline>
          <h2 className="t-section mt-3.5">
            The only one that <span className="text-accent">acts</span> and is{' '}
            <span style={{ color: 'oklch(0.70 0.12 275)' }}>built for Bangladesh</span>.
          </h2>
        </Reveal>
        <Reveal>
          <CapabilityMatrix />
        </Reveal>
        <Reveal className="mt-9 text-center" delay={0.05}>
          <p className="mx-auto max-w-[780px] font-serif text-[24px] italic">
            Drawing → priced BOQ → your ledger.{' '}
            <span className="text-accent">No ERP in Bangladesh can show you that.</span>
          </p>
          <div className="mt-5">
            <LinkArrow href="/why">See the full competitive picture</LinkArrow>
          </div>
        </Reveal>
      </Section>

      {/* ── Solutions ── */}
      <Section tone="deep">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div className="max-w-[640px]">
              <Overline>The solutions</Overline>
              <h2 className="t-section mt-3.5">
                You don&apos;t buy agents. You buy the end of a problem.
              </h2>
            </div>
            <LinkArrow href="/solutions" className="pb-1.5">
              All solutions
            </LinkArrow>
          </div>
        </Reveal>
        <SolutionsGrid className="mt-12" />
      </Section>

      {/* ── Engine nervous system ── */}
      <Section tone="canvas">
        <Reveal className="mx-auto mb-12 max-w-[680px] text-center">
          <Overline>The engine underneath</Overline>
          <h2 className="t-section mt-3.5">20 modules. One nervous system.</h2>
          <p className="mt-4 text-[16.5px] leading-relaxed text-ink-soft">
            An agent is only as real as what it can write to. This is what it writes to — one
            balanced ledger, one tenant boundary.
          </p>
        </Reveal>
        <Reveal>
          <ModuleBento />
        </Reveal>
      </Section>

      {/* ── Bangladesh-native (warm break) ── */}
      <Section tone="warm">
        <div className="grid items-center gap-13 md:grid-cols-2">
          <Reveal>
            <Overline color="oklch(0.55 0.13 44)">Built for Bangladesh</Overline>
            <h2 className="t-display mt-3 text-ink-dark">
              Not localized. <span className="italic">Native.</span>
            </h2>
            <p
              className="mt-3.5 font-bengali text-[20px] font-medium"
              style={{ color: 'oklch(0.42 0.04 44)' }}
            >
              বাংলাদেশের জন্য তৈরি — গোড়া থেকে।
            </p>
            <p className="mt-4 max-w-[460px] text-[16px] leading-relaxed text-ink-dark-soft">
              A foreign agent can be clever, but it cannot be Bangladeshi. The Mushak, the Schedule
              of Rates, the Bar Bending Schedule, the cadastral hierarchy — these are what the
              agents reason over.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {COMPLIANCE.map((c) => (
                <div key={c.title} className="flex items-center gap-2.5">
                  <span
                    className="inline-grid h-[30px] w-[30px] place-items-center rounded-[9px] border"
                    style={{ borderColor: 'var(--color-line-warm)', color: c.color }}
                  >
                    <Icon name={c.icon} size={16} />
                  </span>
                  <div>
                    <div className="text-[13px] font-semibold text-ink-dark">{c.title}</div>
                    <div className="text-[11px] text-ink-dark-soft">{c.sub}</div>
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-2.5">
                <span
                  className="font-bengali inline-grid h-[30px] w-[30px] place-items-center rounded-[9px] border text-[14px] font-bold"
                  style={{ borderColor: 'var(--color-line-warm)', color: 'oklch(0.42 0.12 275)' }}
                >
                  ৳
                </span>
                <div>
                  <div className="text-[13px] font-semibold text-ink-dark">Lakh · Crore</div>
                  <div className="text-[11px] text-ink-dark-soft">Jul–Jun fiscal year</div>
                </div>
              </div>
            </div>
            <LinkArrow href="/bangladesh" color="oklch(0.42 0.12 275)" className="mt-6 inline-flex">
              The full Bangladesh moat
            </LinkArrow>
          </Reveal>

          <Reveal delay={0.08} className="flex justify-center">
            <BangladeshMap variant="warm" />
          </Reveal>
        </div>

        <Reveal className="mt-14 flex flex-wrap justify-center gap-2" delay={0.05}>
          {[
            'RAJUK · CDA · KDA · RDA',
            'BNBC 2020',
            'NBR Mushak',
            'BLA 2006',
            'bKash · Nagad',
            'BEFTN · RTGS',
            'Khatian · Namjari',
          ].map((t) => (
            <span
              key={t}
              className="rounded-lg border px-3 py-1.5 font-mono text-[11.5px] text-ink-dark-soft"
              style={{ borderColor: 'var(--color-line-warm)' }}
            >
              {t}
            </span>
          ))}
        </Reveal>
      </Section>

      {/* ── Built for trust ── */}
      <TrustBand />

      {/* ── Final CTA ── */}
      <Section tone="canvas" className="text-center">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 70% at 50% 40%, oklch(0.55 0.1 275 / 0.2), transparent), radial-gradient(ellipse 50% 50% at 70% 80%, oklch(0.55 0.1 44 / 0.14), transparent)',
          }}
          aria-hidden="true"
        />
        <Reveal className="relative mx-auto max-w-[760px]">
          <h2 className="t-display">
            Watch an agent do a week of work
            <br />
            <span className="italic text-gradient">in three minutes — on your own project.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[560px] text-[18px] leading-relaxed text-ink-soft">
            Bring a structural drawing. We&apos;ll price it live and post it to the books once you
            approve. See it work on your own project.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3.5">
            <Button href="/contact" size="lg" icon="arrow-right" iconRight>
              Book a demo
            </Button>
            <Button href="/estimator" size="lg" variant="ghost">
              See the Estimator
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  )
}
