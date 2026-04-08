'use client'

import { icons, type LucideProps } from 'lucide-react'

interface LucideIconProps extends LucideProps {
  name: string
}

export function LucideIcon({ name, ...props }: LucideIconProps) {
  const Icon = icons[name as keyof typeof icons]
  if (!Icon) return null
  return <Icon {...props} />
}
