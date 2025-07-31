'use client'

import { motion } from 'framer-motion'
import { ResponsiveContainer, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import GlassCard from './GlassCard'
import { cn } from '@/lib/utils'

export interface AnimatedChartProps {
  data: any[]
  type?: 'line' | 'area'
  dataKey: string
  color?: string
  gradient?: boolean
  title?: string
  subtitle?: string
  height?: number
  className?: string
}

export default function AnimatedChart({
  data,
  type = 'line',
  dataKey,
  color = '#6366F1',
  gradient = true,
  title,
  subtitle,
  height = 300,
  className
}: AnimatedChartProps) {

  // Custom tooltip with glass morphism
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/90 backdrop-blur-xl rounded-lg p-3 shadow-xl border border-white/20"
        >
          <p className="text-sm font-medium text-gray-900">{label}</p>
          <p className="text-lg font-bold" style={{ color }}>
            {payload[0].value}
          </p>
        </motion.div>
      )
    }
    return null
  }

  return (
    <GlassCard className={cn("p-6", className)} hover glow>
      {/* Header */}
      {(title || subtitle) && (
        <div className="mb-6">
          {title && (
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-sm text-gray-500">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Chart Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{ height }}
      >
        <ResponsiveContainer width="100%" height="100%">
          {type === 'area' ? (
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              {/* Gradient Definitions */}
              {gradient && (
                <defs>
                  <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={color} stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
              )}

              {/* Grid */}
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="#E5E7EB" 
                strokeOpacity={0.3}
                vertical={false}
              />

              {/* Axes */}
              <XAxis 
                dataKey="name" 
                stroke="#9CA3AF"
                tick={{ fill: '#6B7280', fontSize: 12 }}
                axisLine={{ stroke: '#E5E7EB', strokeOpacity: 0.5 }}
              />
              <YAxis 
                stroke="#9CA3AF"
                tick={{ fill: '#6B7280', fontSize: 12 }}
                axisLine={{ stroke: '#E5E7EB', strokeOpacity: 0.5 }}
              />

              {/* Tooltip */}
              <Tooltip 
                content={<CustomTooltip />}
                cursor={{ stroke: color, strokeOpacity: 0.2 }}
              />

              {/* Data Visualization */}
              <Area
                type="monotone"
                dataKey={dataKey}
                stroke={color}
                strokeWidth={3}
                fill={gradient ? `url(#gradient-${dataKey})` : color}
                animationDuration={1500}
                animationEasing="ease-out"
              />
            </AreaChart>
          ) : (
            <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              {/* Gradient Definitions */}
              {gradient && (
                <defs>
                  <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={color} stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
              )}

              {/* Grid */}
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="#E5E7EB" 
                strokeOpacity={0.3}
                vertical={false}
              />

              {/* Axes */}
              <XAxis 
                dataKey="name" 
                stroke="#9CA3AF"
                tick={{ fill: '#6B7280', fontSize: 12 }}
                axisLine={{ stroke: '#E5E7EB', strokeOpacity: 0.5 }}
              />
              <YAxis 
                stroke="#9CA3AF"
                tick={{ fill: '#6B7280', fontSize: 12 }}
                axisLine={{ stroke: '#E5E7EB', strokeOpacity: 0.5 }}
              />

              {/* Tooltip */}
              <Tooltip 
                content={<CustomTooltip />}
                cursor={{ stroke: color, strokeOpacity: 0.2 }}
              />

              {/* Data Visualization */}
              <Line
                type="monotone"
                dataKey={dataKey}
                stroke={color}
                strokeWidth={3}
                fill="none"
                animationDuration={1500}
                animationEasing="ease-out"
                dot={{ fill: color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: color, strokeWidth: 2 }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </motion.div>

      {/* Animated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
        <motion.div
          className="absolute -inset-10 opacity-10"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div 
            className="w-full h-full"
            style={{
              background: `radial-gradient(circle at 30% 50%, ${color}40 0%, transparent 50%)`,
            }}
          />
        </motion.div>
      </div>
    </GlassCard>
  )
}