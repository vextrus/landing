import type { CSSProperties, ReactNode } from 'react'

// Bespoke 2px line-icon set — ported verbatim from the design mockups' inline
// SVG (24×24, ~1.6px stroke, round caps/joins, currentColor). Lucide-compatible
// language. One <Icon> component renders the registry below.

export type IconName =
  | 'demo' // book-a-demo / scan brackets
  | 'spark' // 4-point AI spark
  | 'network' // agents constellation glyph
  | 'shield-check' // 4-Eyes
  | 'shield' // safety
  | 'shield-alert' // leakage / spend control
  | 'layers' // module engine / projects
  | 'ledger' // general ledger
  | 'rebar' // costing / estimator column
  | 'coin' // GL cash
  | 'coins-stack' // receivables / bill-to-cash
  | 'check'
  | 'percent' // tax
  | 'arrow-out' // payables
  | 'arrow-in' // receivables
  | 'cart' // procurement
  | 'building' // real estate
  | 'building-min' // rajuk
  | 'users' // hr
  | 'user' // human review
  | 'branch' // workflow
  | 'file-check' // compliance doc
  | 'rebar-chart' // bbs zigzag
  | 'globe' // foreign
  | 'pin' // bd-native
  | 'arrow-right'
  | 'menu'
  | 'close'
  | 'bell'
  | 'box'
  | 'key'
  | 'gauge'
  | 'cpu'
  | 'lock'

const P: Record<IconName, ReactNode> = {
  demo: (
    <>
      <path d="M4 8V5a1 1 0 011-1h3M20 8V5a1 1 0 00-1-1h-3M4 16v3a1 1 0 001 1h3M20 16v3a1 1 0 01-1 1h-3" />
      <path d="M4 12h16" />
    </>
  ),
  spark: <path d="M12 2l1.9 6.5L20 10l-6.1 1.5L12 18l-1.9-6.5L4 10l6.1-1.5z" />,
  network: (
    <>
      <circle cx="12" cy="5" r="2" />
      <circle cx="5" cy="18" r="2" />
      <circle cx="19" cy="18" r="2" />
      <path d="M12 7l-6 9M12 7l6 9M7 18h10" />
    </>
  ),
  'shield-check': (
    <>
      <path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  shield: <path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6l7-3z" />,
  'shield-alert': (
    <>
      <path d="M12 3s6 6 6 11a6 6 0 01-12 0c0-5 6-11 6-11z" />
      <path d="M12 10v4M12 17h0" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 13l9 5 9-5" />
    </>
  ),
  ledger: (
    <>
      <rect x="4" y="3" width="14" height="18" rx="2" />
      <path d="M8 7h6M8 11h6M8 15h4" />
    </>
  ),
  rebar: (
    <>
      <circle cx="12" cy="5" r="2" />
      <path d="M11 7l-5 12M13 7l5 12M8 16h8" />
    </>
  ),
  coin: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v10M9 9.5C9 8 10 7.5 12 7.5s3 .8 3 2-1.2 1.8-3 2-3 .8-3 2 1.2 2 3 2 3-.6 3-2" />
    </>
  ),
  'coins-stack': (
    <>
      <ellipse cx="9" cy="7" rx="5" ry="2.5" />
      <path d="M4 7v5c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5V7" />
      <ellipse cx="15" cy="14" rx="5" ry="2.5" />
      <path d="M10 14.5V17c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5v-5" />
    </>
  ),
  check: <path d="M5 12l4 4 10-10" />,
  percent: (
    <>
      <path d="M19 5L5 19" />
      <circle cx="7.5" cy="7.5" r="2.5" />
      <circle cx="16.5" cy="16.5" r="2.5" />
    </>
  ),
  'arrow-out': (
    <>
      <path d="M12 20V8M12 8l-4 4M12 8l4 4" />
      <path d="M5 5h14" />
    </>
  ),
  'arrow-in': (
    <>
      <path d="M12 4v12M12 16l-4-4M12 16l4-4" />
      <path d="M5 19h14" />
    </>
  ),
  cart: (
    <>
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="17" cy="20" r="1.5" />
      <path d="M3 4h3l2.2 11h9l1.8-7H7.5" />
    </>
  ),
  building: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="1" />
      <path d="M9 7h2M13 7h2M9 11h2M13 11h2M10 21v-3h4v3" />
    </>
  ),
  'building-min': (
    <>
      <rect x="5" y="3" width="14" height="18" rx="1" />
      <path d="M10 21v-3h4v3" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3 3-5 6-5s6 2 6 5" />
      <path d="M16 6a3 3 0 010 6" />
    </>
  ),
  user: (
    <>
      <circle cx="9" cy="6" r="3" />
      <path d="M3 20c0-3 3-5 6-5s6 2 6 5" />
    </>
  ),
  branch: (
    <>
      <circle cx="6" cy="6" r="2" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="8" r="2" />
      <path d="M6 8v8M6 12h6a4 4 0 004-4" />
    </>
  ),
  'file-check': (
    <>
      <path d="M6 3h7l5 5v13a1 1 0 01-1 1H6a1 1 0 01-1-1V4a1 1 0 011-1z" />
      <path d="M13 3v5h5M9 15l2 2 4-4" />
    </>
  ),
  'rebar-chart': <path d="M3 8h4l3 8h4l3-8h4" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 010 18M12 3a15 15 0 000 18" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  'arrow-right': <path d="M5 12h13M12 5l7 7-7 7" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  bell: (
    <>
      <path d="M6 9a6 6 0 0112 0c0 5 2 6 2 6H4s2-1 2-6z" />
      <path d="M10 20a2 2 0 004 0" />
    </>
  ),
  box: (
    <>
      <path d="M3 8l9-5 9 5v8l-9 5-9-5z" />
      <path d="M3 8l9 5 9-5M12 13v8" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="8" r="4" />
      <path d="M11 11l8 8M16 16l2-2M19 19l2-2" />
    </>
  ),
  gauge: (
    <>
      <path d="M5 17a8 8 0 1114 0" />
      <path d="M12 17l4-5" />
    </>
  ),
  cpu: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 018 0v3" />
    </>
  ),
}

export interface IconProps {
  name: IconName
  size?: number
  strokeWidth?: number
  className?: string
  style?: CSSProperties
  /** Accessible label; omit for decorative icons (renders aria-hidden). */
  label?: string
}

export function Icon({ name, size = 18, strokeWidth = 1.6, className, style, label }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ display: 'block', flexShrink: 0, ...style }}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {P[name]}
    </svg>
  )
}
