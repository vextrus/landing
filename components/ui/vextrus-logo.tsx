/**
 * The Ascent — Vextrus brand mark
 * Two faceted geometric planes meeting at an apex.
 * Left facet: Deep Indigo gradient
 * Right facet: Indigo-to-Copper gradient
 * Apex dot: Warm Copper highlight (omitted below 24px)
 */
export function VextrusLogo({ size = 32, className }: { size?: number; className?: string }) {
  const showApex = size >= 24

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Vextrus"
    >
      <defs>
        <linearGradient id="vx-left" x1="0" y1="1" x2="0.5" y2="0">
          <stop offset="0%" stopColor="oklch(0.42 0.14 275)" />
          <stop offset="100%" stopColor="oklch(0.55 0.14 275)" />
        </linearGradient>
        <linearGradient id="vx-right" x1="0.5" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.55 0.14 275)" />
          <stop offset="100%" stopColor="oklch(0.72 0.15 44)" />
        </linearGradient>
      </defs>
      {/* Left facet */}
      <polygon points="32,8 8,56 32,44" fill="url(#vx-left)" />
      {/* Right facet */}
      <polygon points="32,8 56,56 32,44" fill="url(#vx-right)" />
      {/* Apex dot */}
      {showApex && <circle cx="32" cy="6" r="2.5" fill="oklch(0.72 0.15 44)" />}
    </svg>
  )
}
