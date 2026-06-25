import { Icon } from '../ui/icon'
import { ROWS, COLUMNS, type Cell } from '../../lib/comparison'

// The honest 5×5 whitespace matrix (master spec). Rows × the five buying
// criteria; Vextrus (ROWS[0]) is the only all-green row, and rivals keep their
// genuine partial/full strengths so the win reads as earned. Rendered as real
// server HTML (no 'use client') for SEO; the per-cell reveal is a pure-CSS,
// scroll-driven progressive enhancement (.reveal-up — transform/opacity only,
// reduced-motion respected by the global @media guard).

const STATE_LABEL: Record<Cell, string> = {
  full: 'Full',
  partial: 'Partial',
  none: 'None',
}

// Glyph per state. full = check; partial = tilde/half; none = dash.
function CellGlyph({ state }: { state: Cell }) {
  if (state === 'full') {
    return <Icon name="check" size={16} strokeWidth={2.4} />
  }
  if (state === 'partial') {
    // a tilde — "partial / some" — drawn inline so it sits on the icon baseline.
    return (
      <svg
        viewBox="0 0 24 24"
        width={16}
        height={16}
        fill="none"
        stroke="currentColor"
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ display: 'block', flexShrink: 0 }}
        aria-hidden="true"
      >
        <path d="M4 14c2-4 4-4 6 0s4 4 6 0 4-4 4 0" transform="translate(-1 -1)" />
      </svg>
    )
  }
  // none — a dash.
  return (
    <svg
      viewBox="0 0 24 24"
      width={16}
      height={16}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: 'block', flexShrink: 0 }}
      aria-hidden="true"
    >
      <path d="M6 12h12" />
    </svg>
  )
}

export function CapabilityMatrix({ className = '' }: { className?: string }) {
  return (
    <div className={`overflow-x-auto rounded-[16px] border border-line ${className}`}>
      <table className="w-full min-w-[820px] border-collapse text-left">
        <caption className="sr-only">
          Capability comparison: Vextrus versus the status quo across five buying criteria. Vextrus
          fully meets all five; every alternative falls short on at least one.
        </caption>
        <thead>
          <tr>
            {/* row-header column */}
            <th scope="col" className="sticky top-0 bg-raised p-4 align-bottom">
              <span className="sr-only">Option</span>
            </th>
            {COLUMNS.map((col) => (
              <th
                key={col.id}
                scope="col"
                className="sticky top-0 bg-raised p-4 align-bottom"
                style={{ minWidth: 132 }}
              >
                <div className="font-heading text-[13px] font-semibold leading-snug text-ink">
                  {col.label}
                </div>
                <div className="mt-1 text-[11px] leading-snug text-ink-soft">{col.plain}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row, rowIndex) => {
            const isVextrus = rowIndex === 0
            return (
              <tr
                key={row.id}
                className="border-t border-line"
                style={
                  isVextrus
                    ? {
                        // copper border + subtle glow — the Vextrus accent (reuses
                        // the 2×2 Vextrus-cell treatment).
                        outline: '1.6px solid var(--color-accent)',
                        outlineOffset: '-1.6px',
                        background:
                          'linear-gradient(135deg, oklch(0.72 0.14 44 / 0.10), oklch(0.55 0.14 275 / 0.08))',
                        boxShadow: 'inset 0 0 44px oklch(0.72 0.14 44 / 0.10)',
                      }
                    : undefined
                }
              >
                <th scope="row" className="p-4 align-top" style={{ minWidth: 196 }}>
                  <div className="flex items-center gap-2">
                    {isVextrus && (
                      <img
                        src="/vextrus-mark-light.svg"
                        width={18}
                        height={18}
                        alt=""
                        aria-hidden="true"
                      />
                    )}
                    <span
                      className={`font-heading text-[14px] font-semibold leading-snug ${
                        isVextrus ? 'text-accent' : 'text-ink'
                      }`}
                    >
                      {row.label}
                    </span>
                  </div>
                  <p className="m-0 mt-1 text-[12px] leading-relaxed text-ink-soft">{row.note}</p>
                </th>
                {COLUMNS.map((col, colIndex) => {
                  const state = row.cells[col.id]
                  return (
                    <td key={col.id} className="p-3">
                      <span
                        className={`reveal-up matrix-cell--${state} mx-auto flex h-9 w-9 items-center justify-center rounded-[9px]`}
                        style={{
                          animationDelay: `${(rowIndex + colIndex) * 0.04}s`,
                        }}
                        role="img"
                        aria-label={`${row.label} — ${col.label}: ${STATE_LABEL[state].toLowerCase()}`}
                      >
                        <CellGlyph state={state} />
                        <span className="sr-only">{STATE_LABEL[state]}</span>
                      </span>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
