import type { Metadata } from 'next'
import { pageMeta, siteConfig } from '@/lib/site'
import { Section } from '@/components/ui/section'
import { Overline } from '@/components/ui/overline'
import { Reveal } from '@/components/ui/reveal'
import { Button } from '@/components/ui/button'
import { LinkArrow } from '@/components/ui/link-arrow'
import { Icon, type IconName } from '@/components/ui/icon'
import { DemoForm } from '@/components/sections/contact/demo-form'
import { DrawingCue } from '@/components/sections/contact/drawing-cue'
import { LiveEstimatorFlow } from '@/components/signature/live-estimator-flow'
import { ConfidenceFork } from '@/components/signature/confidence-fork'
import { ApprovalInbox } from '@/components/signature/approval-inbox'

export const metadata: Metadata = pageMeta({
  title: 'Book a demo',
  description:
    'Bring a structural drawing. Watch an agent do a week of work in three minutes, on your own project — priced and posted to the books on your approval. A founder replies within one business day.',
  path: '/contact',
})

const SEATS: { tag: string; icon: IconName; accent: string; title: string; body: string }[] = [
  {
    tag: 'FOR THE MD / CHAIRMAN',
    icon: 'building',
    accent: 'var(--mod-costing)',
    title: 'Drawing to money',
    body: 'Upload an RCC structural drawing and watch the Estimator return a priced BOQ and a full Bar Bending Schedule. Approve the draft and the lines land in costing — proof an MD can feel in a way no module list can reach.',
  },
  {
    tag: 'FOR THE CFO / CONTROLLER',
    icon: 'shield-check',
    accent: 'var(--color-accent)',
    title: 'You approve every taka',
    body: 'Watch an agent draft a balanced journal, then approve the diff you can see. The 4-Eyes glass box, the self-approval block, and the cost meter are built for this seat.',
  },
  {
    tag: 'FOR THE QS / VP CONSTRUCTION',
    icon: 'layers',
    accent: 'var(--mod-project)',
    title: 'A real 500-line BOQ',
    body: 'The Estimator and the BOQ Rate Estimator on a real bill — rate sanity in seconds, cost-to-complete, RA-bill billing in the format a BD tender expects.',
  },
]

const QUESTIONS: { q: string; a: string }[] = [
  {
    q: '“What exactly are we buying?”',
    a: 'An AI workforce that does the repetitive work — estimating, bookkeeping, compliance, collections — and writes the result into your books once you approve.',
  },
  {
    q: '“How much, all-in?”',
    a: 'Measured against your own leakage and weeks to payback — not a per-seat price.',
  },
  {
    q: '“When do we get payback?”',
    a: 'The platform measures the recovery itself, transaction by transaction, against your own leakage.',
  },
  {
    q: '“What if it doesn’t work?”',
    a: 'Start with one agent, prove recovered taka in 30–60 days, and keep in-region support after go-live.',
  },
  {
    q: '“What if we do nothing?”',
    a: 'The leakage keeps leaking, the deadline keeps slipping, the NBR notice still comes. Doing nothing has a price too.',
  },
]

export default function ContactPage() {
  return (
    <>
      {/* Hero + form */}
      <Section tone="canvas" id="demo">
        <div className="bg-atmosphere pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative grid items-start gap-12 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <Overline>Book a demo</Overline>
            <h1 className="t-section mt-3.5">
              Bring a drawing. Watch an agent do a week of work in three minutes.
            </h1>
            <p className="mt-5 max-w-[480px] text-[17px] leading-relaxed text-ink-soft">
              We run the demo on your kind of project — your flat names, your BOQ structure, your
              compliance forms — in lakh and crore. Not breadth. One clear act, gated by your
              approval.
            </p>

            <Reveal delay={0.06} className="mt-8">
              <DrawingCue />
            </Reveal>

            <div className="mt-8 flex flex-col gap-3.5">
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 no-underline"
              >
                <span
                  className="grid h-[34px] w-[34px] place-items-center rounded-[9px] font-mono text-[13px]"
                  style={{ background: 'oklch(0.72 0.14 44 / 0.14)', color: 'var(--color-accent)' }}
                >
                  @
                </span>
                <span>
                  <span className="block text-[12px] text-ink-soft">Founder, direct</span>
                  <span className="font-mono text-[15px] text-ink">{siteConfig.email}</span>
                </span>
              </a>
              <div className="flex items-center gap-3">
                <span
                  className="grid h-[34px] w-[34px] place-items-center rounded-[9px] font-mono text-[13px]"
                  style={{
                    background: 'oklch(0.55 0.14 275 / 0.16)',
                    color: 'oklch(0.70 0.12 275)',
                  }}
                >
                  ⌘
                </span>
                <span>
                  <span className="block text-[12px] text-ink-soft">The surfaces</span>
                  <span className="font-mono text-[15px] text-ink">
                    www.vextrus.com · app.vextrus.com
                  </span>
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <DemoForm />
          </Reveal>
        </div>
      </Section>

      {/* The live act — what the demo opens with (warm break) */}
      <Section tone="warm">
        <Reveal className="mx-auto max-w-[720px] text-center">
          <Overline color="oklch(0.55 0.13 44)">What the call opens with</Overline>
          <h2 className="t-display mt-3.5 text-ink-dark">
            Your drawing, <span className="italic">priced in three minutes.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-[17px] leading-relaxed text-ink-dark-soft">
            This is the act we run live on your own drawing. The model reads the dimensions; the
            engine computes every taka — a priced BOQ and a full Bar Bending Schedule, written to
            your books on your approval.
          </p>
        </Reveal>
        <Reveal className="mt-12" delay={0.05}>
          <LiveEstimatorFlow variant="full" />
        </Reveal>
        <div className="mt-10 text-center">
          <LinkArrow href="/estimator" color="oklch(0.42 0.12 275)">
            See the full Estimator walkthrough
          </LinkArrow>
        </div>
      </Section>

      {/* The demo, mapped to the seat */}
      <Section tone="deep">
        <Reveal className="mb-10 max-w-[680px]">
          <Overline>The demo that changes the conversation</Overline>
          <h2 className="t-section mt-3.5">Mapped to the seat in the room.</h2>
        </Reveal>
        <div className="grid gap-[18px] md:grid-cols-3">
          {SEATS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.07} className="h-full">
              <div className="h-full rounded-[16px] border border-line bg-raised p-[26px]">
                <div className="mb-3 font-mono text-[11px] text-accent">{s.tag}</div>
                <div className="mb-2 flex items-center gap-2.5">
                  <span
                    className="inline-grid h-[30px] w-[30px] place-items-center rounded-[9px] border border-line"
                    style={{ color: s.accent }}
                  >
                    <Icon name={s.icon} size={16} />
                  </span>
                  <h3 className="m-0 font-heading text-[18px] font-semibold">{s.title}</h3>
                </div>
                <p className="m-0 text-[13.5px] leading-normal text-ink-soft">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* You approve every taka — the evolved review system */}
      <Section tone="canvas">
        <div
          className="bg-atmosphere-soft pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <div className="relative">
          <Reveal className="mx-auto mb-10 max-w-[700px] text-center">
            <Overline>How the agents stay safe</Overline>
            <h2 className="t-section mt-3.5">The AI does the work. You clear the exceptions.</h2>
            <p className="mx-auto mt-4 max-w-[600px] text-[16px] leading-relaxed text-ink-soft">
              No agent touches your books on its own. High-confidence work runs itself; the rest
              comes to you to approve. You will see this control on the call.
            </p>
          </Reveal>
          <div className="grid items-start gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <Reveal>
              <ConfidenceFork />
            </Reveal>
            <Reveal delay={0.08}>
              <ApprovalInbox />
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Five questions */}
      <Section tone="deep">
        <Reveal className="mb-10 max-w-[680px]">
          <Overline>The five questions every buyer asks</Overline>
          <h2 className="t-section mt-3.5">Answered, in order.</h2>
        </Reveal>
        <div className="flex flex-col gap-3">
          {QUESTIONS.map((item, i) => (
            <Reveal key={item.q} delay={i * 0.05}>
              <div className="grid items-center gap-3 rounded-[14px] border border-line bg-raised p-5 sm:grid-cols-[auto_1fr_1.4fr] sm:gap-6 sm:px-6">
                <span className="font-mono text-[13px] text-accent">Q{i + 1}</span>
                <div className="font-heading text-[16px] font-semibold">{item.q}</div>
                <p className="m-0 text-[13.5px] leading-normal text-ink-soft">{item.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Honesty / stage */}
      <Section tone="canvas">
        <Reveal>
          <div className="grid items-center gap-10 rounded-[18px] border border-line bg-raised p-8 sm:p-10 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <Overline>Where we are</Overline>
              <h2 className="mt-3 font-heading text-[30px] font-bold leading-tight tracking-[-0.02em]">
                Pre-first-customer. The proof is the working product.
              </h2>
            </div>
            <p className="m-0 text-[14.5px] leading-relaxed text-ink-soft">
              The product is complete and demonstrable — all 20 modules and the AI platform run end
              to end in a live environment. We lead with the{' '}
              <em className="text-ink">capability</em> and the write-back mechanism, shown live, not
              a logo wall we do not yet have.{' '}
              <span className="text-ink">
                Approving an AI draft runs a registered command that writes a real, balanced entry
                to your books — proven end to end on the Estimator and the bank reconciler.
              </span>
            </p>
          </div>
        </Reveal>
      </Section>

      {/* Closing */}
      <Section tone="deep" className="text-center">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 70% at 50% 40%, oklch(0.55 0.1 275 / 0.18), transparent), radial-gradient(ellipse 50% 50% at 70% 80%, oklch(0.55 0.1 44 / 0.12), transparent)',
          }}
          aria-hidden="true"
        />
        <Reveal className="relative mx-auto max-w-[720px]">
          <h2 className="t-display italic">The most intelligent software you have ever used.</h2>
          <p className="mx-auto mt-5 max-w-[520px] text-[17px] leading-relaxed text-ink-soft">
            Built native to Bangladesh, to the bone. Bring a drawing — we will price it live.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3.5">
            <Button href="#demo" size="lg" icon="arrow-right" iconRight>
              Book a demo
            </Button>
            <Button href={`mailto:${siteConfig.email}`} size="lg" variant="ghost" external>
              Email the founder
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  )
}
