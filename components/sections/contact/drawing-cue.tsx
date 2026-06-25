import { Icon, type IconName } from '../../ui/icon'

// A compact, server-safe cue that sits beside the demo form: "bring a structural
// drawing — we'll price it live." Three plain steps, no animation (static content
// stays static — The Calm System), copper-keyed to the Estimator flagship.

const STEPS: { icon: IconName; label: string; body: string }[] = [
  {
    icon: 'file-check',
    label: 'You bring a drawing',
    body: 'An RCC structural drawing — a pile cap, a footing, a slab. PDF or DWG.',
  },
  {
    icon: 'cpu',
    label: 'We price it live',
    body: 'The Estimator reads the dimensions and the engine returns a priced BOQ and a full Bar Bending Schedule.',
  },
  {
    icon: 'shield-check',
    label: 'You approve it',
    body: 'One approval posts the lines to the costing books. Nothing is written until you say so.',
  },
]

export function DrawingCue({ className = '' }: { className?: string }) {
  return (
    <div
      className={`rounded-[16px] border p-6 sm:p-7 ${className}`}
      style={{
        borderColor: 'oklch(from var(--color-accent) l c h / 0.4)',
        background: 'oklch(from var(--color-accent) l c h / 0.06)',
      }}
    >
      <div className="mb-1 flex items-center gap-2.5">
        <span
          className="inline-grid h-7 w-7 place-items-center rounded-lg"
          style={{
            background: 'oklch(from var(--color-accent) l c h / 0.16)',
            color: 'var(--color-accent)',
          }}
          aria-hidden="true"
        >
          <Icon name="layers" size={15} />
        </span>
        <h3 className="m-0 font-heading text-[16px] font-semibold text-ink">
          Bring a drawing. We&apos;ll price it live.
        </h3>
      </div>
      <p className="m-0 mb-5 text-[13px] leading-snug text-ink-soft">
        The fastest way to know if this is real: watch your own drawing turn into a priced bill on
        the call.
      </p>
      <ol className="m-0 flex list-none flex-col gap-3.5 p-0">
        {STEPS.map((s, i) => (
          <li key={s.label} className="flex items-start gap-3">
            <span
              className="inline-grid h-7 w-7 shrink-0 place-items-center rounded-lg border"
              style={{ borderColor: 'var(--color-line)', color: 'var(--color-accent)' }}
              aria-hidden="true"
            >
              <Icon name={s.icon} size={15} />
            </span>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-[11px] text-accent">{i + 1}</span>
                <span className="font-heading text-[14px] font-semibold text-ink">{s.label}</span>
              </div>
              <p className="m-0 mt-0.5 text-[12.5px] leading-snug text-ink-soft">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
