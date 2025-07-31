import { cn } from '@/lib/utils'

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  background?: 'default' | 'muted' | 'dark' | 'gradient'
  padding?: 'sm' | 'md' | 'lg' | 'xl'
}

const backgroundStyles = {
  default: 'bg-background',
  muted: 'bg-muted',
  dark: 'bg-primary text-white',
  gradient: 'bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5',
}

const paddingStyles = {
  sm: 'py-8 md:py-12',
  md: 'py-12 md:py-16 lg:py-20',
  lg: 'py-16 md:py-24 lg:py-32',
  xl: 'py-20 md:py-32 lg:py-40',
}

export function Section({
  children,
  className,
  id,
  background = 'default',
  padding = 'md',
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        backgroundStyles[background],
        paddingStyles[padding],
        className
      )}
    >
      {children}
    </section>
  )
}