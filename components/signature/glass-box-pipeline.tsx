// The 4-Eyes glass box, as an iconographic pipeline:
// EVENT → ENGINE DRAFTS → HUMAN REVIEWS → COMMAND WRITES. SVG + captions.

const STAGES = [
  {
    key: 'EVENT',
    color: 'oklch(0.66 0.11 285)',
    copy: 'A bill or drawing arrives. The agent reads the messy real input.',
  },
  {
    key: 'ENGINE DRAFTS',
    color: 'oklch(0.64 0.1 95)',
    copy: 'Computes the outcome, proposes the exact change + a confidence score.',
  },
  {
    key: 'HUMAN REVIEWS',
    color: 'var(--color-accent)',
    copy: 'Confirm · Modify · Reject on a visible diff. Self-approval blocked in the domain.',
  },
  {
    key: 'COMMAND WRITES',
    color: 'oklch(0.62 0.14 155)',
    copy: 'A registered command posts it. Identity, timestamp, before-and-after — logged.',
  },
]

export function GlassBoxPipeline({ className = '' }: { className?: string }) {
  return (
    <div
      className={`overflow-hidden rounded-[18px] border border-line p-6 sm:p-8 ${className}`}
      style={{ background: 'linear-gradient(180deg, var(--color-raised), oklch(0.13 0.01 270))' }}
    >
      <svg
        viewBox="0 0 1080 120"
        width="100%"
        className="block max-h-[130px]"
        role="img"
        aria-label="Pipeline: event, engine drafts, human reviews, registered command writes."
      >
        <defs>
          <marker id="vx-ah" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6" fill="none" stroke="var(--color-accent)" strokeWidth="1.2" />
          </marker>
        </defs>
        {[
          [150, 300],
          [430, 580],
          [700, 850],
        ].map(([x1, x2], i) => (
          <line
            key={i}
            x1={x1}
            y1="60"
            x2={x2}
            y2="60"
            stroke="var(--color-accent)"
            strokeWidth="1.5"
            strokeDasharray="5 5"
            markerEnd="url(#vx-ah)"
            opacity="0.7"
          />
        ))}

        {/* event */}
        <g transform="translate(70,30)">
          <circle
            cx="30"
            cy="30"
            r="30"
            fill="oklch(0.66 0.11 285 / 0.12)"
            stroke="oklch(0.66 0.11 285)"
            strokeWidth="1.4"
          />
          <g
            transform="translate(12,12) scale(1.1)"
            stroke="oklch(0.66 0.11 285)"
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              d="M4 8V5a1 1 0 011-1h3M20 8V5a1 1 0 00-1-1h-3M4 16v3a1 1 0 001 1h3M20 16v3a1 1 0 01-1 1h-3M4 12h16"
              transform="scale(0.6)"
            />
          </g>
        </g>

        {/* engine drafts */}
        <g transform="translate(350,30)">
          <circle
            cx="30"
            cy="30"
            r="30"
            fill="oklch(0.64 0.1 95 / 0.12)"
            stroke="oklch(0.64 0.1 95)"
            strokeWidth="1.4"
          />
          <text
            x="30"
            y="37"
            textAnchor="middle"
            className="font-mono"
            fontSize="18"
            fill="oklch(0.64 0.1 95)"
          >
            ∑
          </text>
        </g>

        {/* human reviews */}
        <g transform="translate(620,30)">
          <circle
            cx="30"
            cy="30"
            r="30"
            fill="oklch(0.72 0.14 44 / 0.14)"
            stroke="var(--color-accent)"
            strokeWidth="1.6"
          />
          <g
            transform="translate(15,15)"
            stroke="var(--color-accent)"
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="6" r="3" />
            <path d="M3 20c0-3 3-5 6-5s6 2 6 5" />
          </g>
        </g>

        {/* command writes */}
        <g transform="translate(890,30)">
          <circle
            cx="30"
            cy="30"
            r="30"
            fill="oklch(0.62 0.14 155 / 0.12)"
            stroke="oklch(0.62 0.14 155)"
            strokeWidth="1.4"
          />
          <path
            d="M4 12l5 5L20 5"
            transform="translate(18,18) scale(0.7)"
            stroke="oklch(0.62 0.14 155)"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>

      <div className="mt-2 grid grid-cols-2 gap-6 text-center md:grid-cols-4">
        {STAGES.map((s) => (
          <div key={s.key}>
            <div className="mb-1 font-mono text-[11px]" style={{ color: s.color }}>
              {s.key}
            </div>
            <p className="m-0 text-[12.5px] leading-snug text-ink-soft">{s.copy}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
