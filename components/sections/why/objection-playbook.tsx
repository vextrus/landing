import { Reveal } from '@/components/ui/reveal'

// Master spec Part 8.5 / Appendix E — address the underlying FEAR, not the
// surface statement. Each objection pairs the buyer's line with a calm counter.
// The in-house / DIY objection (8.6) is its own section, not in this grid.

type Objection = { fear: string; q: string; a: React.ReactNode }

const OBJECTIONS: Objection[] = [
  {
    fear: 'Loss of a trusted habit',
    q: '“Tally works fine.”',
    a: (
      <>
        Tally is a fine ledger — but it doesn&apos;t know Project 2 is 18% over on steel right now,
        that a subcontractor is unpaid 47 days and about to walk, or that 23% of buyer receivables
        are overdue. And it cannot turn a drawing into a priced BOQ. That&apos;s where companies
        lose money — and that is what the agents do.
      </>
    ),
  },
  {
    fear: 'Being burned again',
    q: '“We tried ERP and it failed.”',
    a: (
      <>
        Every BD ERP failure shares one cause: a generic product and a vendor who left after
        go-live. We do the opposite — land on one agent solving one problem on <em>your</em> data,
        prove recovered taka in weeks, then expand on trust.
      </>
    ),
  },
  {
    fear: 'Exposure and surveillance',
    q: '“I don’t want all my data in a computer.”',
    a: (
      <>
        Your data lives in your own isolated tenant, enforced in the database, never shared across
        clients; private deployment is possible. Compliance opens JV and bank-loan doors — it is not
        a surveillance tool.
      </>
    ),
  },
  {
    fear: 'AI that invents numbers',
    q: '“Isn’t this just AI making things up?”',
    a: (
      <>
        No number an agent shows you comes from the AI. The model reads the drawing or the invoice;
        a deterministic engine computes every taka, and nothing reaches your books until a named
        person approves the diff. You approve every taka.
      </>
    ),
  },
  {
    fear: 'The team won’t adopt it',
    q: '“My staff won’t learn it.”',
    a: (
      <>
        On-site training in Bangla, on your own data; the agents <em>remove</em> work rather than
        add it. Your accountant keeps their judgment and becomes the approver, not the casualty —
        included accountants become the biggest advocates.
      </>
    ),
  },
  {
    fear: 'The price feels large',
    q: '“Too expensive.”',
    a: (
      <>
        What did your last project overrun cost? The leakage one agent closes on a single project
        can exceed years of subscription. You pay monthly, no server to buy, and you can stop
        anytime.
      </>
    ),
  },
  {
    fear: 'Deferral, indefinitely',
    q: '“After this project.”',
    a: (
      <>
        NBR now audits firms over BDT 5 crore turnover for approved-software compliance. Better to
        be ready before the notice than after — and the audit trail an agent produces is more
        complete than a manual one.
      </>
    ),
  },
]

export function ObjectionPlaybook({ className = '' }: { className?: string }) {
  return (
    <div className={`grid gap-4 md:grid-cols-2 ${className}`}>
      {OBJECTIONS.map((o, i) => (
        <Reveal key={o.q} delay={(i % 2) * 0.06} className="h-full">
          <div
            className="vxtile h-full rounded-[14px] border border-line bg-raised p-6"
            style={{ ['--tile-accent' as string]: 'var(--color-accent)' }}
          >
            <div className="mb-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-accent">
              {o.fear}
            </div>
            <div className="mb-2.5 font-serif text-[19px] italic text-ink">{o.q}</div>
            <p className="m-0 text-[13.5px] leading-relaxed text-ink-soft">{o.a}</p>
          </div>
        </Reveal>
      ))}
    </div>
  )
}
