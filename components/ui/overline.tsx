export function Overline({ children, dark }: { children: string; dark?: boolean }) {
  return (
    <p
      className={`font-heading text-[11px] font-semibold uppercase tracking-[0.2em] ${
        dark ? 'text-[oklch(0.50_0.10_44)]' : 'text-[var(--accent)]'
      }`}
    >
      {children}
    </p>
  )
}
