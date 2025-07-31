'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { useLiquidGlassDark } from '../../theme/liquidGlassDark'
import { GlassCard, GlowText, GradientText } from './GlassMorphism'

// Metric Card Component
interface MetricCardProps {
  title: string
  value: string | number
  change?: {
    value: number
    type: 'increase' | 'decrease'
  }
  icon?: ReactNode
  color?: 'cyan' | 'magenta' | 'gold' | 'purple'
  shimmer?: boolean
}

export function MetricCard({ title, value, change, icon, color = 'cyan', shimmer = false }: MetricCardProps) {
  const theme = useLiquidGlassDark()
  
  const colorMap = {
    cyan: theme.colors.accent.primary,
    magenta: theme.colors.accent.secondary,
    gold: theme.colors.accent.quaternary,
    purple: '#9333EA',
  }
  
  return (
    <GlassCard intensity="medium" hover shimmer={shimmer} className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-white/60 mb-1">{title}</p>
          <p className="text-2xl font-bold">
            <GlowText color={color} size="xl">{value}</GlowText>
          </p>
          {change && (
            <div className="flex items-center gap-1 mt-2">
              <motion.div
                initial={{ y: 5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={cn(
                  'text-sm font-medium',
                  change.type === 'increase' ? 'text-[#00FF88]' : 'text-[#FF3366]'
                )}
              >
                {change.type === 'increase' ? '+' : '-'}{Math.abs(change.value)}%
              </motion.div>
              <motion.div
                className={cn(
                  'w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent',
                  change.type === 'increase' 
                    ? 'border-b-[6px] border-b-[#00FF88]' 
                    : 'border-t-[6px] border-t-[#FF3366] rotate-180'
                )}
                animate={{
                  y: change.type === 'increase' ? [-2, 0, -2] : [2, 0, 2],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          )}
        </div>
        {icon && (
          <motion.div
            className="ml-4"
            style={{
              color: colorMap[color],
              filter: `drop-shadow(0 0 10px ${colorMap[color]}50)`,
            }}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            {icon}
          </motion.div>
        )}
      </div>
    </GlassCard>
  )
}

// Data Visualization Card
interface DataCardProps {
  title: string
  subtitle?: string
  children: ReactNode
  actions?: ReactNode
  fullHeight?: boolean
}

export function DataCard({ title, subtitle, children, actions, fullHeight = false }: DataCardProps) {
  return (
    <GlassCard 
      intensity="strong" 
      className={cn('p-6 flex flex-col', fullHeight && 'h-full')}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">
            <GradientText gradient="aurora">{title}</GradientText>
          </h3>
          {subtitle && (
            <p className="text-sm text-white/60 mt-1">{subtitle}</p>
          )}
        </div>
        {actions && (
          <div className="ml-4">{actions}</div>
        )}
      </div>
      <div className={cn('flex-1', fullHeight && 'min-h-0')}>
        {children}
      </div>
    </GlassCard>
  )
}

// Status Indicator Component
interface StatusIndicatorProps {
  status: 'online' | 'offline' | 'warning' | 'processing'
  label?: string
  pulse?: boolean
}

export function StatusIndicator({ status, label, pulse = true }: StatusIndicatorProps) {
  const theme = useLiquidGlassDark()
  
  const statusConfig = {
    online: { color: theme.colors.accent.success, text: 'Online' },
    offline: { color: theme.colors.accent.danger, text: 'Offline' },
    warning: { color: theme.colors.accent.warning, text: 'Warning' },
    processing: { color: theme.colors.accent.info, text: 'Processing' },
  }
  
  const config = statusConfig[status]
  
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div
          className="w-2 h-2 rounded-full"
          style={{
            background: config.color,
            boxShadow: `0 0 10px ${config.color}`,
          }}
        />
        {pulse && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: config.color }}
            animate={{
              scale: [1, 1.5, 1.5],
              opacity: [0.5, 0, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        )}
      </div>
      <span className="text-sm text-white/75">
        {label || config.text}
      </span>
    </div>
  )
}

// Progress Bar Component
interface ProgressBarProps {
  value: number
  max?: number
  label?: string
  color?: 'cyan' | 'magenta' | 'gold' | 'purple'
  animated?: boolean
}

export function ProgressBar({ value, max = 100, label, color = 'cyan', animated = true }: ProgressBarProps) {
  const theme = useLiquidGlassDark()
  const percentage = (value / max) * 100
  
  const colorMap = {
    cyan: theme.colors.accent.primary,
    magenta: theme.colors.accent.secondary,
    gold: theme.colors.accent.quaternary,
    purple: '#9333EA',
  }
  
  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-white/60">{label}</span>
          <span className="text-sm font-medium text-white">{percentage.toFixed(0)}%</span>
        </div>
      )}
      <div
        className="relative h-2 rounded-full overflow-hidden"
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: `linear-gradient(90deg, ${colorMap[color]} 0%, ${colorMap[color]}CC 100%)`,
            boxShadow: `0 0 20px ${colorMap[color]}50`,
          }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          {animated && (
            <motion.div
              className="absolute inset-0 opacity-50"
              style={{
                background: `linear-gradient(90deg, transparent 0%, white 50%, transparent 100%)`,
              }}
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          )}
        </motion.div>
      </div>
    </div>
  )
}

// Activity Item Component
interface ActivityItemProps {
  icon: ReactNode
  title: string
  description: string
  time: string
  color?: 'cyan' | 'magenta' | 'gold' | 'purple'
}

export function ActivityItem({ icon, title, description, time, color = 'cyan' }: ActivityItemProps) {
  const theme = useLiquidGlassDark()
  
  const colorMap = {
    cyan: theme.colors.accent.primary,
    magenta: theme.colors.accent.secondary,
    gold: theme.colors.accent.quaternary,
    purple: '#9333EA',
  }
  
  return (
    <motion.div
      className="flex items-start gap-3 p-3 rounded-lg transition-all hover:bg-white/5"
      whileHover={{ x: 4 }}
    >
      <div
        className="p-2 rounded-lg"
        style={{
          background: `${colorMap[color]}20`,
          border: `1px solid ${colorMap[color]}40`,
        }}
      >
        <div style={{ color: colorMap[color] }}>
          {icon}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white">{title}</p>
        <p className="text-xs text-white/60 truncate">{description}</p>
      </div>
      <span className="text-xs text-white/40 whitespace-nowrap">{time}</span>
    </motion.div>
  )
}