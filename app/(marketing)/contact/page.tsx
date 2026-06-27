import type { Metadata } from 'next'
import { pageMeta, siteConfig } from '@/lib/site'
import { Section } from '@/components/ui/section'
import { Overline } from '@/components/ui/overline'
import { Reveal } from '@/components/ui/reveal'
import { Button } from '@/components/ui/button'
import { DemoForm } from '@/components/sections/contact/demo-form'
import { DrawingCue } from '@/components/sections/contact/drawing-cue'

export const metadata: Metadata = pageMeta({
  title: 'Book a call — bring a drawing, see it priced on your own project',
  description:
    'Bring a structural drawing. We price it on your own project and post it to the books on your approval — one clear act, gated by you, in lakh and crore. A founder replies within one business day.',
  path: '/contact',
})

const QUESTIONS: { q: string; a: string }[] = [
  {
    q: '“What exactly are we buying?”',
    a: 'An AI workforce that does the repetitive work — estimating today, more on the roadmap — and writes the result into your books once you approve.',
  },
  {
    q: '“How much, all-in?”',
    a: 'Measured against your own leakage and weeks to payback — not a per-seat price.',
  },
  {
    q: '“When do we get payback?”',
    a: 'We agree a baseline at onboarding, and the platform measures the recovery itself, transaction by transaction.',
  },
  {
    q: '“What if it doesn’t work?”',
    a: 'Start with one agent, prove recovered taka in the first 30–60 days, and keep in-region support after go-live.',
  },
  {
    q: '“What if we do nothing?”',
    a: 'The leakage keeps leaking, the deadline keeps slipping, the NBR notice still comes. Doing nothing has a price too.',
  },
]

export default function ContactPage() {
  return (
    <>
      {/* ── Hero + form ── */}
      <Section tone="canvas" id="demo" className="pt-[clamp(3rem,6vw,5rem)]">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <Overline>Book a call</Overline>
            <h1 className="t-hero mt-3.5 text-ink">Bring a drawing. See it priced on your own project.</h1>
            <p className="mt-5 max-w-[480px] text-[17px] leading-relaxed text-ink-soft">
              We run the demo on your kind of project — your flat names, your BOQ structure, your
              compliance forms — in lakh and crore. Not breadth. One clear act, gated by your
              approval.
            </p>

            <div className="mt-8">
              <DrawingCue />
            </div>

            <div className="mt-8 flex flex-col gap-3.5">
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 no-underline">
                <span
                  className="grid h-[34px] w-[34px] place-items-center rounded-[9px] font-mono text-[13px]"
                  style={{ background: 'oklch(0.62 0.13 50 / 0.12)', color: 'var(--color-accent)' }}
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
                  style={{ background: 'oklch(0.5 0.1 256 / 0.12)', color: 'var(--color-indigo)' }}
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

      {/* ── The five questions — the one dark voltage band ── */}
      <Section tone="deep">
        <Reveal className="mb-10 max-w-[680px]">
          <Overline>The five questions every buyer asks</Overline>
          <h2 className="t-section mt-3.5">Answered, in order.</h2>
        </Reveal>
        <div className="flex flex-col gap-3">
          {QUESTIONS.map((item, i) => (
            <Reveal key={item.q} delay={i * 0.05}>
              <div
                className="grid items-center gap-3 rounded-[14px] p-5 sm:grid-cols-[auto_1fr_1.4fr] sm:gap-6 sm:px-6"
                style={{ border: '1px solid oklch(0.965 0.005 83 / 0.14)' }}
              >
                <span className="font-mono text-[13px]" style={{ color: 'var(--color-accent-hi)' }}>
                  Q{i + 1}
                </span>
                <div className="font-display text-[16px] font-semibold">{item.q}</div>
                <p className="m-0 text-[13.5px] leading-normal text-ink-invert-soft">{item.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── Honesty / stage ── */}
      <Section tone="warm">
        <Reveal>
          <div className="draft-object grid items-center gap-10 rounded-[18px] p-8 sm:p-10 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <Overline>Where we are</Overline>
              <h2 className="mt-3 font-display text-[30px] font-bold leading-tight tracking-[-0.02em] text-ink">
                Pre-first-customer. The proof is the working product.
              </h2>
            </div>
            <p className="m-0 text-[14.5px] leading-relaxed text-ink-soft">
              The product is complete and demonstrable — the full construction lifecycle and the AI
              platform run end to end in a live environment. We lead with the{' '}
              <em className="text-ink">capability</em> and the write-back mechanism, shown live, not a
              logo wall we do not yet have.{' '}
              <span className="text-ink">
                Approving an AI draft runs a registered command that writes a real, balanced entry to
                your books — proven end to end on the Estimator and the bank reconciler.
              </span>
            </p>
          </div>
        </Reveal>
      </Section>

      {/* ── Closing ── */}
      <Section tone="canvas" className="text-center">
        <Reveal className="mx-auto max-w-[720px]">
          <h2 className="t-display">The most intelligent software you have ever used.</h2>
          <p className="mx-auto mt-5 max-w-[520px] text-[17px] leading-relaxed text-ink-soft">
            Built native to Bangladesh, to the bone. Bring a drawing — we will price it live.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3.5">
            <Button href="#demo" size="lg" icon="arrow-right" iconRight>
              Book a call
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
