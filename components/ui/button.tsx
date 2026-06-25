import Link from 'next/link'
import type { ReactNode } from 'react'
import { Icon, type IconName } from './icon'

type Variant = 'primary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const sizeCls: Record<Size, string> = {
  sm: 'text-[13.5px] px-[18px] py-[10px] rounded-[10px] gap-1.5',
  md: 'text-[15px] px-7 py-[15px] rounded-[11px] gap-2',
  lg: 'text-base px-8 py-4 rounded-xl gap-2',
}

export interface ButtonProps {
  href?: string
  variant?: Variant
  size?: Size
  children: ReactNode
  icon?: IconName
  iconRight?: boolean
  className?: string
  external?: boolean
  ariaLabel?: string
}

// Copper primary (glow + lift) / ghost outline. The marketing CTA language.
export function Button({
  href,
  variant = 'primary',
  size = 'md',
  children,
  icon,
  iconRight = false,
  className = '',
  external = false,
  ariaLabel,
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-heading font-semibold no-underline transition-[transform,box-shadow,background,border-color,color] duration-200 ease-spring motion-safe:hover:-translate-y-0.5 active:translate-y-px active:scale-[0.975] focus-visible:outline-none'

  const variantCls =
    variant === 'primary'
      ? 'bg-accent text-[oklch(0.18_0.03_44)] hover:bg-accent-hi shadow-[0_10px_34px_var(--accent-glow)] hover:shadow-[0_14px_44px_var(--accent-glow)]'
      : 'border border-line text-ink-soft hover:text-ink hover:border-line-strong hover:bg-[oklch(1_0_0/0.03)]'

  const content = (
    <>
      {icon && !iconRight && <Icon name={icon} size={size === 'lg' ? 17 : 15} />}
      <span>{children}</span>
      {icon && iconRight && <Icon name={icon} size={size === 'lg' ? 17 : 15} />}
    </>
  )

  const cls = `${base} ${sizeCls[size]} ${variantCls} ${className}`

  if (href) {
    if (external) {
      return (
        <a href={href} className={cls} aria-label={ariaLabel} target="_blank" rel="noreferrer">
          {content}
        </a>
      )
    }
    return (
      <Link href={href} className={cls} aria-label={ariaLabel}>
        {content}
      </Link>
    )
  }
  return (
    <button type="button" className={cls} aria-label={ariaLabel}>
      {content}
    </button>
  )
}
