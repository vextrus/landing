import Link from 'next/link'

// "The Ascent" mark + lowercase "vextrus" wordmark (Outfit 800).
export function BrandMark({ size = 28, className = '' }: { size?: number; className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-[11px] text-inherit no-underline ${className}`}
      aria-label="Vextrus — home"
    >
      <img src="/vextrus-mark-light.svg" width={size} height={size} alt="" aria-hidden="true" />
      <span
        className="font-wordmark font-extrabold lowercase tracking-[-0.03em]"
        style={{ fontSize: Math.round(size * 0.72) }}
      >
        vextrus
      </span>
    </Link>
  )
}
