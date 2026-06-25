import { Fragment } from 'react'
import { Marquee } from '../ui/marquee'

// Name the enemy (never a rival ERP): the manual Excel BOQ, the WhatsApp
// approval, the paper re-keying, the single-point-of-failure accountant.
const ENEMIES = [
  'the manual Excel BOQ',
  'the WhatsApp approval',
  'the paper re-keying',
  'the single-point-of-failure accountant',
]

export function EnemyMarquee({ className = '' }: { className?: string }) {
  return (
    <Marquee
      durationSec={36}
      className={`border-y border-line py-[18px] font-mono text-[13px] text-ink-soft ${className}`}
    >
      <span className="text-accent">Replacing →</span>
      {ENEMIES.map((e) => (
        <Fragment key={e}>
          <span>{e}</span>
          <span style={{ color: 'oklch(0.45 0.02 270)' }} aria-hidden="true">
            /
          </span>
        </Fragment>
      ))}
    </Marquee>
  )
}
