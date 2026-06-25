import type { Metadata } from 'next'
import { pageMeta } from '@/lib/site'
import { Section } from '@/components/ui/section'
import { Overline } from '@/components/ui/overline'
import { Reveal } from '@/components/ui/reveal'
import { Button } from '@/components/ui/button'
import { LinkArrow } from '@/components/ui/link-arrow'
import { Icon } from '@/components/ui/icon'
import { CapabilityMatrix } from '@/components/signature/capability-matrix'
import { ObjectionPlaybook } from '@/components/sections/why/objection-playbook'
import { TimeToValue } from '@/components/sections/why/time-to-value'

export const metadata: Metadata = pageMeta({
  title: 'Why Vextrus — acts, local, and live in weeks',
  description:
    'AI that does the work, a full ERP, built for Bangladesh, governed by approval, and live in weeks. Put every option on five plain criteria and only Vextrus meets all five.',
  path: '/why',
})

export default function WhyPage() {
  return (
    <>
      {/* ── Hero + the 5×5 capability matrix (centerpiece) ── */}
      <Section tone="canvas">
        <div className="bg-atmosphere pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative">
          <Reveal className="mx-auto max-w-[700px] text-center">
            <Overline>Why Vextrus</Overline>
            <h1 className="t-hero mt-3.5">
              The only one that <span className="text-accent">acts</span>, is{' '}
              <span style={{ color: 'oklch(0.70 0.12 275)' }}>local</span>, and lands in weeks.
            </h1>
            <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
              Five plain questions decide it. Does it do the work, not just chat? Is it a full ERP?
              Is it built for Bangladesh? Is every action approved and logged? And can you be live
              in weeks? Put every option on the grid — only one row is green all the way across.
            </p>
          </Reveal>

          <Reveal className="mx-auto mt-12 max-w-[980px]" delay={0.05}>
            <CapabilityMatrix />
          </Reveal>

          <Reveal className="mt-12 text-center" delay={0.08}>
            <p className="mx-auto max-w-[780px] font-serif text-[25px] italic leading-tight">
              A drawing becomes a priced BOQ in your ledger.{' '}
              <span className="text-accent">No ERP in Bangladesh can show you that.</span>
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ── Time-to-value: the real competitor is manual process, not SAP ── */}
      <Section tone="deep">
        <Reveal className="mb-9 max-w-[760px]">
          <Overline>Time to value</Overline>
          <h2 className="t-section mt-3.5 leading-tight">
            For most firms the rival is not SAP. It is Excel, WhatsApp, and doing it by hand.
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">
            A greenfield Tier-2 or Tier-3 builder has no ERP to replace. So we do not sell a
            two-year rollout. We land on one painful job, prove the recovered taka, and grow from
            there.
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <TimeToValue />
        </Reveal>
      </Section>

      {/* ── The objection playbook ── */}
      <Section tone="deep">
        <Reveal className="mb-10 max-w-[700px]">
          <Overline>The objection playbook</Overline>
          <h2 className="t-section mt-3.5 leading-tight">
            Answer the fear behind the words, not the words.
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">
            Every hesitation is a fear in disguise. Name the fear, answer it plainly, and the
            objection goes away.
          </p>
        </Reveal>
        <ObjectionPlaybook />
      </Section>

      {/* ── The in-house / DIY competitor (warm structural break) ── */}
      <Section tone="warm">
        <Reveal>
          <div className="grid items-center gap-10 md:grid-cols-[0.92fr_1.08fr] md:gap-14">
            <div>
              <Overline color="oklch(0.55 0.13 44)">Build or buy</Overline>
              <h2 className="t-display mt-3.5 text-ink-dark">
                “We build our own software <span className="italic">in-house.</span>”
              </h2>
              <p className="mt-4 max-w-[420px] text-[15px] leading-relaxed text-ink-dark-soft">
                A few large, vertically-integrated groups build through a sister company. We answer
                that honestly — and it is exactly why our first market is somewhere else.
              </p>
            </div>

            <ul className="m-0 flex list-none flex-col gap-5 p-0">
              {[
                {
                  t: 'A captive team is a cost centre, not a product company.',
                  b: 'It builds for one company today, carries the upkeep forever, and feels no pressure to stay at the AI frontier. Its roadmap fights the core business for money and attention.',
                },
                {
                  t: 'A real estimating agent takes years to build.',
                  b: 'A model that reads drawings, a deterministic BBS-and-rate engine, and approval-gated write-back is not something a captive team ships between releases.',
                },
                {
                  t: 'Vextrus improves for everyone, all the time.',
                  b: 'Every Bangladesh-specific fix benefits every customer, at a fraction of the cost of a permanent dev team — and the agents learn each tenant’s own projects over time.',
                },
                {
                  t: 'So these groups are not our first market.',
                  b: 'Our market is the large majority of Tier-2 and Tier-3 firms with no system at all — where one agent solving one problem lands cleanest.',
                },
              ].map((item, i) => (
                <li key={item.t} className="flex gap-3.5">
                  <span
                    className="mt-0.5 inline-grid h-[26px] w-[26px] shrink-0 place-items-center rounded-[8px] border"
                    style={{
                      borderColor: 'var(--color-line-warm)',
                      color: i === 3 ? 'oklch(0.55 0.13 44)' : 'oklch(0.42 0.04 44)',
                    }}
                    aria-hidden="true"
                  >
                    <Icon name={i === 3 ? 'pin' : 'check'} size={14} strokeWidth={2.2} />
                  </span>
                  <div>
                    <div className="text-[15px] font-semibold leading-snug text-ink-dark">
                      {item.t}
                    </div>
                    <p className="mt-1 text-[13.5px] leading-relaxed text-ink-dark-soft">
                      {item.b}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
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
        <Reveal className="relative mx-auto max-w-[700px]">
          <h2 className="t-display italic">Put a price on doing nothing.</h2>
          <p className="mx-auto mt-5 max-w-[520px] text-[17px] leading-relaxed text-ink-soft">
            The leakage we&apos;d close on one of your own projects can beat a year of subscription.
            Let us measure it on your real numbers.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3.5">
            <Button href="/contact" size="lg" icon="arrow-right" iconRight>
              Book a demo
            </Button>
            <Button href="/bangladesh" size="lg" variant="ghost">
              The Bangladesh moat
            </Button>
          </div>
          <div className="mt-8">
            <LinkArrow href="/solutions">See the solution bundles</LinkArrow>
          </div>
        </Reveal>
      </Section>
    </>
  )
}
