import type { CSSProperties } from 'react'
import { Reveal } from '../../ui/reveal'
import { Icon, type IconName } from '../../ui/icon'

// Part 5.3 — the four threads. Each is one action flowing end to end with no
// double entry, with the agent callout line that closes it. Accents borrow the
// module-Atmosphere palette so each thread reads as a different part of the
// business.
type Thread = {
  tag: string
  icon: IconName
  accent: string
  title: string
  body: string
  agentLine: string
}

const THREADS: Thread[] = [
  {
    tag: 'THREAD 1 · ONE PURCHASE',
    icon: 'cart',
    accent: 'var(--mod-ap)',
    title: 'Requisition to paid, no re-keying',
    body: 'Requisition → approval → RFQ scored → PO hits the budget → GRN updates stock and accrues → invoice three-way-matched → TDS and VDS calculated → payable posts → BEFTN payment with dual authorisation → cash-flow updates → the cost lands on the WBS line.',
    agentLine:
      'The Invoice Processor reads the bill; the AP and GL anomaly agents watch the spend; one human action sets the whole chain moving.',
  },
  {
    tag: 'THREAD 2 · LEAD TO KEYS',
    icon: 'building',
    accent: 'var(--mod-realestate)',
    title: 'A flat, from walk-in to handover',
    body: 'A lead is scored Hot/Warm/Cold → a unit is reserved on a 48-hour hold → a booking generates the full instalment schedule → each payment deducts AIT and posts → an overdue instalment auto-escalates → completion activates the warranties → the customer enters 360° after-sales care.',
    agentLine:
      'The Lead Scorer prioritises the funnel; the Collection Predictor and Credit-Risk agents act on the receivable — all on one screen the MD reads.',
  },
  {
    tag: "THREAD 3 · A PROJECT'S MONEY",
    icon: 'rebar',
    accent: 'var(--mod-costing)',
    title: 'Drawing to Earned Value',
    body: 'A project is approved → its GL cost centre opens → the BOQ becomes the cost baseline → site measurement is certified → an RA bill is generated and the invoice and cost journal post → procurement, inventory, subcontractor, equipment and payroll all tag the same project → Earned Value tells the MD whether it finishes on budget.',
    agentLine:
      'This is the thread the flagship Estimator enters at the top: a drawing becomes the priced BOQ the whole project’s money is measured against.',
  },
  {
    tag: 'THREAD 4 · MONTH-END',
    icon: 'ledger',
    accent: 'var(--mod-gl)',
    title: 'Close without the scramble',
    body: 'Because AP, AR, payroll, costing, inventory, tax, real-estate collections and subcontractor bills all post to the same General Ledger as they happen, the close is not a reconciliation marathon — the trial balance is already balanced.',
    agentLine:
      'The Period-Close agent verifies the sub-ledgers reconcile and the accruals posted; the Balance Sheet, P&L and Cash Flow generate in seconds.',
  },
]

export function FourThreads({ className = '' }: { className?: string }) {
  return (
    <div className={`grid gap-[18px] md:grid-cols-2 ${className}`}>
      {THREADS.map((t, i) => (
        <Reveal key={t.tag} delay={i * 0.07} className="h-full">
          <div
            className="vxtile flex h-full flex-col rounded-[16px] border border-line bg-raised p-[26px]"
            style={{ '--tile-accent': t.accent } as CSSProperties}
          >
            <div className="mb-2.5 font-mono text-[11px]" style={{ color: t.accent }}>
              {t.tag}
            </div>
            <div className="mb-2 flex items-center gap-2.5">
              <span
                className="vxtile-ic inline-grid h-7 w-7 place-items-center rounded-lg border border-line"
                style={{ color: t.accent }}
              >
                <Icon name={t.icon} size={15} />
              </span>
              <h3 className="m-0 font-heading text-[17px] font-semibold">{t.title}</h3>
            </div>
            <p className="m-0 text-[13.5px] leading-relaxed text-ink-soft">{t.body}</p>
            <p className="mt-3.5 border-t border-line pt-3.5 text-[13px] leading-relaxed text-ink">
              {t.agentLine}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  )
}
