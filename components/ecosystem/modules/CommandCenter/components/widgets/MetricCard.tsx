'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Activity } from 'lucide-react'
import GlassCard from '../ui/GlassCard'
import AnimatedCounter from '../ui/AnimatedCounter'
import ParallaxCard from '../ui/ParallaxCard'

interface MetricCardProps {
  label: string
  value: string
  subLabel?: string
  change?: number
  trend?: 'up' | 'down'
  sparkline?: number[]
  color: string
}

const MetricCard = React.memo(function MetricCard({ 
  label, 
  value, 
  subLabel, 
  change, 
  trend, 
  sparkline,
  color 
}: MetricCardProps) {
  // Extract numeric value for AnimatedCounter
  const numericValue = parseInt(value.replace(/[^0-9]/g, '')) || 0
  const isNumeric = !isNaN(numericValue) && value.includes(numericValue.toString())
  
  return (
    <ParallaxCard className="h-full" intensity={15}>
      <GlassCard
        className="p-4 sm:p-6 h-full group"
        variant="gradient"
        gradient={`bg-gradient-to-br from-white/90 via-white/80 to-${color}/5`}
        hover
        glow
      >
      {/* Background Gradient */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
        style={{ background: `linear-gradient(135deg, ${color} 0%, transparent 100%)` }}
      />

      {/* Content */}
      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <p className="text-gray-600 text-xs sm:text-sm font-medium transition-colors">{label}</p>
          {change !== undefined && (
            <div className={`flex items-center gap-1 text-sm ${
              trend === 'up' ? 'text-[#10B981]' : 'text-[#EF4444]'
            }`}>
              {trend === 'up' ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>{Math.abs(change)}%</span>
            </div>
          )}
        </div>

        {/* Value */}
        <div className="mb-2">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 transition-colors">
            {isNumeric ? (
              <>
                {value.split(numericValue.toString())[0]}
                <AnimatedCounter 
                  value={numericValue} 
                  duration={1.5}
                  className="font-bold"
                />
                {value.split(numericValue.toString())[1]}
              </>
            ) : (
              <motion.span
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                {value}
              </motion.span>
            )}
          </h3>
          {subLabel && (
            <motion.p 
              className="text-xs text-gray-600 mt-1"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {subLabel}
            </motion.p>
          )}
        </div>

        {/* Sparkline */}
        {sparkline && (
          <motion.div 
            className="mt-4 h-12"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <svg className="w-full h-full">
              <defs>
                <linearGradient id={`gradient-${label}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <motion.polyline
                fill="none"
                stroke={color}
                strokeWidth="2"
                points={sparkline.map((value, i) => 
                  `${(i / (sparkline.length - 1)) * 100},${48 - (value / 100) * 48}`
                ).join(' ')}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
              <motion.polygon
                fill={`url(#gradient-${label})`}
                points={`0,48 ${sparkline.map((value, i) => 
                  `${(i / (sparkline.length - 1)) * 100},${48 - (value / 100) * 48}`
                ).join(' ')} 100,48`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              />
              
              {/* Animated dot at the end */}
              <motion.circle
                cx={100}
                cy={48 - (sparkline[sparkline.length - 1] / 100) * 48}
                r="3"
                fill={color}
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.5, 1] }}
                transition={{ duration: 0.5, delay: 1.5 }}
              />
            </svg>
          </motion.div>
        )}
      </div>

      {/* Hover Glow Effect */}
      <motion.div
        className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${color}20, transparent)`,
          filter: 'blur(8px)'
        }}
      />
      </GlassCard>
    </ParallaxCard>
  )
})

export default MetricCard