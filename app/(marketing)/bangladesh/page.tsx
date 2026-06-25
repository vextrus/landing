import type { CSSProperties } from 'react'
import type { Metadata } from 'next'
import { pageMeta } from '@/lib/site'
import { Section } from '@/components/ui/section'
import { Overline } from '@/components/ui/overline'
import { Reveal } from '@/components/ui/reveal'
import { Badge } from '@/components/ui/badge'
import { Icon, type IconName } from '@/components/ui/icon'
import { Button } from '@/components/ui/button'
import { LinkArrow } from '@/components/ui/link-arrow'
import { BangladeshMap } from '@/components/signature/bangladesh-map'

export const metadata: Metadata = pageMeta({
  title: 'Built for Bangladesh — native, not localized',
  description:
    'The Mushak suite, RAJUK/CDA/KDA/RDA permitting, the Bar Bending Schedule, the land record hierarchy, lakh/crore, July–June. Not add-ons bolted onto a foreign system — the facts the agents work from.',
  path: '/bangladesh',
})

// The permitting authorities radiating from Dhaka (Part 6, approvals paragraph).
const AUTHORITIES: { code: string; city: string }[] = [
  { code: 'RAJUK', city: 'Dhaka' },
  { code: 'CDA', city: 'Chittagong' },
  { code: 'KDA', city: 'Khulna' },
  { code: 'RDA', city: 'Rajshahi' },
]

// The eight moat categories — the BD facts the agents reason over (Part 6).
const MOAT: {
  eyebrow: string
  icon: IconName
  accent: string
  title: string
  body: string
  pills: { label: string; bengali?: boolean }[]
}[] = [
  {
    eyebrow: 'NBR TAXATION',
    icon: 'percent',
    accent: 'oklch(0.50 0.10 310)',
    title: 'The tax moat',
    body: 'VAT at every tier — 15% standard, 10% on construction services, flat 2–4.5% on real-estate sales. The full Mushak suite (6.3, 6.5, 6.6, 6.10, 9.1) in the official NBR format. TDS by category, VDS per SRO 182-Law/2025, AIT at 5% with the 15-day NBR deposit deadline tracked, and BIN/TIN checks.',
    pills: [{ label: 'Mushak 6.3 → 9.1' }, { label: 'BIN · TIN' }, { label: 'VDS · AIT' }],
  },
  {
    eyebrow: 'APPROVALS & BUILDING CODE',
    icon: 'building-min',
    accent: 'oklch(0.50 0.10 200)',
    title: 'RAJUK, BNBC, and the permit pipeline',
    body: 'RAJUK (Dhaka), CDA, KDA and RDA approval tracking with FAR calculations; the ECPS online permit system; BNBC 2020 inspection standards; Fire Service NOC support. The 45+ day pipeline is exactly the deadline-driven work the Compliance-Monitor agent checks every day for a permit or NOC about to expire.',
    pills: [{ label: 'FAR · DAP' }, { label: 'ECPS' }, { label: 'BNBC 2020' }],
  },
  {
    eyebrow: 'THE ESTIMATING MOAT',
    icon: 'rebar-chart',
    accent: 'oklch(0.55 0.13 44)',
    title: 'What foreign takeoff tools cannot copy',
    body: 'The Bar Bending Schedule (the BD way of cutting and bending rebar), the lean-concrete measurement sheet, the IPC / RA-bill format, and the PWD / RHD / RAJUK Schedule of Rates — what lets the Estimator turn a drawing into a tender-ready estimate, tied to the ledger, in the form a BD QS engineer expects.',
    pills: [{ label: 'BBS' }, { label: 'IPC · RA-bill' }, { label: 'PWD · RHD · RAJUK SOR' }],
  },
  {
    eyebrow: 'LABOUR',
    icon: 'users',
    accent: 'oklch(0.50 0.10 170)',
    title: 'The labour rules the agents enforce',
    body: 'Bangladesh Labour Act 2006 leave rules, the 2-hour/day overtime cap at 1.5×, and the Chapter VIII incident-reporting duties, including the 24-hour fatality notice. Payroll handles every worker type — permanent, contract, daily-wage muster roll, consultant — against the BD income-tax slabs.',
    pills: [{ label: 'BLA 2006' }, { label: 'Overtime cap 1.5×' }, { label: 'Chapter VIII' }],
  },
  {
    eyebrow: 'MONEY · CALENDAR',
    icon: 'coin',
    accent: 'oklch(0.55 0.11 70)',
    title: 'The unit the agents count in',
    body: 'BDT everywhere in lakh/crore (1,00,000 = 1 lakh; 1,00,00,000 = 1 crore), never Western K/M. The July 1 – June 30 fiscal year as the default in every period, report, certificate and aging bucket — and NBR rate changes always land on 1 July.',
    pills: [{ label: '৳ লাখ / কোটি', bengali: true }, { label: 'Jul–Jun FY' }],
  },
  {
    eyebrow: 'PAYMENTS',
    icon: 'coins-stack',
    accent: 'oklch(0.50 0.10 260)',
    title: 'The rails the AP, AR and collection agents settle over',
    body: 'BEFTN and RTGS bank transfers plus bKash, Nagad and Rocket mobile money — the full set of Bangladesh payment methods, paying and receiving. The Payment Optimiser picks the order to pay across these rails; the collection flow records receipts on all of them.',
    pills: [{ label: 'BEFTN · RTGS' }, { label: 'bKash · Nagad · Rocket' }],
  },
  {
    eyebrow: 'LAND & PROPERTY',
    icon: 'pin',
    accent: 'oklch(0.50 0.12 275)',
    title: 'The land record hierarchy',
    body: 'Division → District → Upazila → Mouza → Dag → Khatian (CS/RS/SA/BS); land area in all four units (square feet, decimal, bigha, chattak); and the legal papers — Porcha, Namjari, DCR, Baina, Heba, Mutation Khatian. A foreign property agent has no idea what a Khatian or a Namjari is.',
    pills: [{ label: 'Mouza · Dag' }, { label: 'Namjari · Heba' }, { label: 'bigha · chattak' }],
  },
  {
    eyebrow: 'LANGUAGE & ORG',
    icon: 'globe',
    accent: 'oklch(0.52 0.10 145)',
    title: 'Who actually uses it',
    body: 'A Bangla interface for field staff, with clear English for bilingual executives. 45 construction and 38 real-estate roles, plus department templates built from how Dhaka and Chittagong firms actually organise themselves — including the combined developer-contractor model.',
    pills: [{ label: 'বাংলা ইন্টারফেস', bengali: true }, { label: '45 + 38 roles' }],
  },
]

const WARM_OVERLINE = 'oklch(0.55 0.13 44)'
const WARM_PILL_BORDER = 'var(--color-line-warm)'

export default function BangladeshPage() {
  return (
    <>
      {/* ── Hero ── */}
      <Section tone="canvas">
        <div className="bg-atmosphere pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
          <Reveal>
            <Overline>Built for Bangladesh</Overline>
            <h1 className="t-display mt-3.5">
              Not localized. <span className="italic text-gradient">Native.</span>
            </h1>
            <p
              className="mt-4 font-bengali text-[22px] font-medium leading-snug"
              style={{ color: 'var(--color-accent)' }}
            >
              বাংলাদেশের জন্য তৈরি — গোড়া থেকে।
            </p>
            <p className="mt-5 max-w-[560px] text-[17px] leading-relaxed text-ink-soft">
              A foreign system can be smart, but it does not know Bangladesh. The Mushak forms, the
              Schedule of Rates, the Bar Bending Schedule, the land records — these are not extras
              bolted onto a foreign system.{' '}
              <span className="text-ink">They are the facts the agents work from.</span>
            </p>
          </Reveal>

          <Reveal delay={0.08} className="flex justify-center">
            <BangladeshMap variant="dark" />
          </Reveal>
        </div>
      </Section>

      {/* ── The permitting authorities ── */}
      <Section tone="deep">
        <Reveal className="max-w-[680px]">
          <Overline>Four authorities, one platform</Overline>
          <h2 className="t-section mt-3.5">The permit map a foreign system has never seen.</h2>
          <p className="mt-4 text-[16.5px] leading-relaxed text-ink-soft">
            RAJUK in Dhaka, CDA in Chittagong, KDA in Khulna, RDA in Rajshahi — each with its own
            FAR rules and the ECPS online permit system. The project, document and notification
            modules track the 45+ day pipeline against BNBC 2020 inspection standards. The
            Compliance-Monitor agent checks it every day for a permit or NOC about to expire.
          </p>
        </Reveal>

        <Reveal className="mt-10" delay={0.05}>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {AUTHORITIES.map((a) => (
              <div
                key={a.code}
                className="vxtile rounded-[14px] border border-line bg-raised p-5"
                style={{ '--tile-accent': 'oklch(0.74 0.14 44)' } as CSSProperties}
              >
                <span
                  className="vxtile-ic inline-grid h-[34px] w-[34px] place-items-center rounded-[10px] border border-line"
                  style={{ color: 'oklch(0.74 0.14 44)' }}
                >
                  <Icon name="building-min" size={17} />
                </span>
                <div className="mt-3 font-heading text-[19px] font-semibold">{a.code}</div>
                <div className="mt-0.5 text-[13px] text-ink-soft">{a.city}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-7 flex flex-wrap gap-2" delay={0.1}>
          {['BNBC 2020', 'ECPS digital permitting', 'FAR · DAP', 'Fire Service NOC'].map((t) => (
            <Badge key={t} tone="outline">
              {t}
            </Badge>
          ))}
        </Reveal>
      </Section>

      {/* ── The moat in detail (warm structural break) ── */}
      <Section tone="warm">
        <Reveal className="max-w-[680px]">
          <Overline color={WARM_OVERLINE}>The moat, in full</Overline>
          <h2 className="t-display mt-2.5 italic text-ink-dark">
            What lets a Vextrus agent do real Bangladeshi work.
          </h2>
        </Reveal>

        <div className="mt-11 grid gap-[18px] md:grid-cols-2">
          {MOAT.map((m, i) => (
            <Reveal key={m.eyebrow} delay={(i % 2) * 0.07} className="h-full">
              <div
                className="vxtile flex h-full flex-col rounded-[16px] border p-[26px]"
                style={
                  {
                    borderColor: WARM_PILL_BORDER,
                    background: 'oklch(0.99 0.004 70)',
                    '--tile-accent': m.accent,
                  } as CSSProperties
                }
              >
                <div className="mb-3 flex items-center gap-2.5">
                  <span
                    className="vxtile-ic inline-grid h-[34px] w-[34px] place-items-center rounded-[10px] border"
                    style={{ borderColor: WARM_PILL_BORDER, color: m.accent }}
                  >
                    <Icon name={m.icon} size={17} />
                  </span>
                  <span className="font-mono text-[11px]" style={{ color: m.accent }}>
                    {m.eyebrow}
                  </span>
                </div>
                <h3 className="m-0 font-heading text-[18px] font-semibold text-ink-dark">
                  {m.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-ink-dark-soft">{m.body}</p>
                <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
                  {m.pills.map((p) => (
                    <span
                      key={p.label}
                      className={`rounded-md border px-2 py-1 font-mono text-[10.5px] text-ink-dark-soft ${
                        p.bengali ? 'font-bengali text-[11px]' : ''
                      }`}
                      style={{ borderColor: WARM_PILL_BORDER }}
                    >
                      {p.label}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-9" delay={0.05}>
          <LinkArrow href="/estimator" color="oklch(0.42 0.12 275)">
            See how the Estimator turns a drawing into a priced BOQ
          </LinkArrow>
        </Reveal>
      </Section>

      {/* ── Closing line + final CTA ── */}
      <Section tone="canvas" className="text-center">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 70% at 50% 40%, oklch(0.55 0.1 44 / 0.16), transparent), radial-gradient(ellipse 50% 50% at 30% 80%, oklch(0.55 0.1 275 / 0.12), transparent)',
          }}
          aria-hidden="true"
        />
        <Reveal className="relative mx-auto max-w-[760px]">
          <h2 className="t-display italic">
            A foreign system can be smart, but it does not know Bangladesh.
          </h2>
          <p className="mx-auto mt-6 max-w-[600px] text-[18px] leading-relaxed text-ink-soft">
            The rules, the forms, the rebar, the land, the rails, the calendar — this is the work a
            global system will not do for the firms we serve.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3.5">
            <Button href="/contact" size="lg" icon="arrow-right" iconRight>
              Book a demo
            </Button>
            <Button href="/engine" size="lg" variant="ghost">
              The engine underneath
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  )
}
