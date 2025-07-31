'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded'
  width?: string | number
  height?: string | number
  animation?: 'pulse' | 'wave' | 'none'
}

export function Skeleton({
  className,
  variant = 'rectangular',
  width,
  height,
  animation = 'pulse'
}: SkeletonProps) {
  const baseClasses = 'bg-gray-200'
  
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: '',
    rounded: 'rounded-lg'
  }

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer',
    none: ''
  }

  const style = {
    width: width || '100%',
    height: height || '1rem'
  }

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        animationClasses[animation],
        className
      )}
      style={style}
    />
  )
}

// Widget-specific skeleton loaders
export function MetricCardSkeleton() {
  return (
    <div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-xl p-6 space-y-4">
      <div className="flex items-start justify-between">
        <Skeleton width="60%" height="1rem" />
        <Skeleton variant="rounded" width="60px" height="24px" />
      </div>
      <Skeleton width="80%" height="2rem" />
      <Skeleton width="40%" height="0.75rem" />
      <Skeleton variant="rectangular" height="48px" />
    </div>
  )
}

export function MapWidgetSkeleton() {
  return (
    <div className="glass-light rounded-2xl overflow-hidden h-full">
      <div className="px-6 py-4 border-b border-gray-200/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton variant="circular" width="40px" height="40px" />
            <Skeleton width="120px" height="1.25rem" />
          </div>
          <div className="flex gap-4">
            <Skeleton width="80px" height="1rem" />
            <Skeleton width="80px" height="1rem" />
          </div>
        </div>
      </div>
      <div className="relative h-[400px] bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-gray-300 border-t-indigo-500 rounded-full"
          />
        </div>
      </div>
    </div>
  )
}

export function TimelineWidgetSkeleton() {
  return (
    <div className="glass-light rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200/30">
        <div className="flex items-center gap-3">
          <Skeleton variant="circular" width="40px" height="40px" />
          <Skeleton width="150px" height="1.25rem" />
        </div>
      </div>
      <div className="p-6 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2">
            <div className="flex items-center justify-between">
              <Skeleton width="60%" height="1rem" />
              <Skeleton width="15%" height="1rem" />
            </div>
            <Skeleton variant="rounded" height="32px" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function AIInsightsWidgetSkeleton() {
  return (
    <div className="glass-light rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200/30">
        <div className="flex items-center gap-3">
          <Skeleton variant="circular" width="40px" height="40px" />
          <Skeleton width="100px" height="1.25rem" />
        </div>
      </div>
      <div className="p-4 space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 bg-white/60 rounded-xl space-y-3">
            <div className="flex items-start gap-3">
              <Skeleton variant="rounded" width="32px" height="32px" />
              <div className="flex-1 space-y-2">
                <Skeleton width="80%" height="1rem" />
                <Skeleton width="60%" height="0.75rem" />
              </div>
            </div>
            <Skeleton height="4px" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function ActivityFeedSkeleton() {
  return (
    <div className="glass-light rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton variant="circular" width="40px" height="40px" />
            <Skeleton width="100px" height="1.25rem" />
          </div>
          <Skeleton width="80px" height="0.75rem" />
        </div>
      </div>
      <div className="p-4 space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-start gap-3 p-3 bg-white/60 rounded-xl">
            <Skeleton variant="rounded" width="32px" height="32px" />
            <div className="flex-1 space-y-2">
              <Skeleton width="90%" height="0.875rem" />
              <div className="flex gap-3">
                <Skeleton width="60px" height="0.75rem" />
                <Skeleton width="80px" height="0.75rem" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function PerformanceChartSkeleton() {
  return (
    <div className="glass-light rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton variant="circular" width="40px" height="40px" />
            <Skeleton width="180px" height="1.25rem" />
          </div>
          <div className="flex gap-3">
            <Skeleton variant="rounded" width="200px" height="36px" />
            <Skeleton variant="rounded" width="150px" height="36px" />
          </div>
        </div>
      </div>
      <div className="p-6">
        <Skeleton variant="rectangular" height="300px" className="mb-6" />
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-4 bg-white/60 rounded-xl space-y-2">
              <Skeleton width="60%" height="0.75rem" />
              <Skeleton width="80%" height="1.5rem" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Page transition wrapper
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}