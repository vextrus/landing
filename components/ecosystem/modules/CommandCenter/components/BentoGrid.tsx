'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, 
  TrendingUp, 
  TrendingDown, 
  Activity,
  Zap,
  Layers,
  Grid3x3,
  LayoutGrid,
  Square,
  ChevronRight
} from 'lucide-react'
import dynamic from 'next/dynamic'
import GlassCard from './ui/GlassCard'
import GlassPremium from './ui/GlassPremium'
import NeuralParticles from './ui/NeuralParticles'

// Dynamic imports for heavy components
const MapWidget = dynamic(() => import('./widgets/MapWidget'), { ssr: false })
const TimelineWidget = dynamic(() => import('./widgets/TimelineWidget'), { ssr: false })
const AIInsightsWidget = dynamic(() => import('./widgets/AIInsightsWidget'), { ssr: false })
const PerformanceChart = dynamic(() => import('./widgets/PerformanceChart'), { ssr: false })
const ActivityFeed = dynamic(() => import('./widgets/ActivityFeed'), { ssr: false })

interface BentoGridProps {
  realtimeData: any
  predictions: any[]
  isProcessing: boolean
}

// Bento box size variants
type BentoSize = 'small' | 'medium' | 'large' | 'hero' | 'wide' | 'tall' | 'fullmap'

interface BentoItem {
  id: string
  size: BentoSize
  title: string
  subtitle?: string
  content: React.ReactNode
  gradient?: string
  delay?: number
  priority?: number
}

// Liquid Glass gradient combinations for dark theme
const gradients = {
  primary: 'from-[#00D9FF]/10 to-[#FF00EA]/10',
  success: 'from-[#00FF88]/10 to-[#00D9FF]/10',
  warning: 'from-[#FFB800]/10 to-[#FF00EA]/10',
  danger: 'from-[#FF3366]/10 to-[#FF00EA]/10',
  info: 'from-[#00D9FF]/10 to-[#9333EA]/10',
  neural: 'from-[#FF00EA]/10 to-[#00D9FF]/10'
}

export default function BentoGrid({ realtimeData, predictions, isProcessing }: BentoGridProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  // Extract real-time metrics
  const totalWorkers = realtimeData?.sites ? 
    (realtimeData.sites.bashundhara.workers + realtimeData.sites.jolshiri.workers) : 8456
  
  const avgProductivity = realtimeData?.sites ? 
    Math.round((realtimeData.sites.bashundhara.productivity + realtimeData.sites.jolshiri.productivity) / 2) : 81

  // Define bento items
  const bentoItems: BentoItem[] = useMemo(() => [
    {
      id: 'hero-metric',
      size: 'large',
      title: 'Portfolio Performance',
      subtitle: 'Real-time valuation',
      gradient: gradients.primary,
      priority: 1,
      content: (
        <div className="h-full relative">
          <div className="relative h-full p-4">
            {/* Neural Particles Background */}
            <NeuralParticles 
              count={20} 
              className="absolute inset-0" 
              connectionDistance={120}
              colors={['#00D9FF', '#FF00EA', '#00FF88']}
              speed={0.1}
            />
            
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-[#00D9FF]" />
                  <span className="text-sm text-white/60">AI-Optimized</span>
                </div>
                <div className="text-4xl font-bold text-white mb-2">৳2,054 Cr</div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#00FF88]" />
                  <span className="text-[#00FF88] font-medium">+12.5%</span>
                  <span className="text-white/50 text-sm">vs last quarter</span>
                </div>
              </div>
              
              {/* Mini chart */}
              <div className="mt-4">
                <svg className="w-full h-16" viewBox="0 0 200 40">
                  <path
                    d="M0,30 Q20,25 40,20 T80,15 T120,10 T160,8 T200,5"
                    fill="none"
                    stroke="url(#portfolio-gradient)"
                    strokeWidth="2"
                  />
                  <defs>
                    <linearGradient id="portfolio-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6366F1" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
            
            {/* Animated background effect */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-gradient-to-br from-indigo-500/20 to-purple-600/20" />
          </div>
        </div>
      )
    },
    {
      id: 'ai-brain',
      size: 'large',
      title: 'AI Command Center',
      subtitle: 'Neural network activity',
      gradient: gradients.neural,
      priority: 2,
      content: (
        <div className="h-full flex flex-col overflow-hidden">
          <div className="flex-1 relative overflow-y-auto">
            <AIInsightsWidget predictions={predictions} isProcessing={isProcessing} />
            
            {/* Neural pulse effect */}
            {isProcessing && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-fuchsia-600/20 blur-xl" />
              </motion.div>
            )}
          </div>
        </div>
      )
    },
    {
      id: 'map-view',
      size: 'fullmap' as BentoSize,
      title: 'Site Locations',
      subtitle: 'Live construction map - 12 active sites',
      gradient: gradients.success,
      priority: 3,
      content: <MapWidget realtimeData={realtimeData} />
    },
    {
      id: 'timeline',
      size: 'wide',
      title: 'Project Timeline',
      subtitle: 'Gantt chart with AI predictions',
      gradient: gradients.info,
      priority: 4,
      content: (
        <div className="h-full overflow-hidden">
          <TimelineWidget />
        </div>
      )
    },
    {
      id: 'workers',
      size: 'medium',
      title: 'Active Workers',
      gradient: gradients.warning,
      priority: 5,
      content: (
        <div className="h-full flex flex-col justify-between">
          <div>
            <div className="text-3xl font-bold text-gray-900">{totalWorkers.toLocaleString()}</div>
            <div className="text-sm text-gray-600 mt-1">92% attendance rate</div>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex-1">
              <div className="text-xs text-gray-500 mb-1">Bashundhara</div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-amber-400 to-orange-500"
                  initial={{ width: 0 }}
                  animate={{ width: '65%' }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="text-xs text-gray-500 mb-1">Jolshiri</div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-amber-400 to-orange-500"
                  initial={{ width: 0 }}
                  animate={{ width: '35%' }}
                  transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                />
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'productivity',
      size: 'small',
      title: 'Productivity',
      gradient: gradients.info,
      priority: 6,
      content: (
        <div className="h-full flex flex-col justify-center items-center text-center">
          <div className="relative">
            <div className="text-4xl font-bold text-gray-900">{avgProductivity}%</div>
            <div className="absolute -inset-4 bg-cyan-500/20 rounded-full blur-xl" />
          </div>
          <div className="flex items-center gap-1 mt-2">
            <TrendingDown className="w-4 h-4 text-red-500" />
            <span className="text-sm text-red-500">-2.1%</span>
          </div>
        </div>
      )
    },
    {
      id: 'alerts',
      size: 'small',
      title: 'Active Alerts',
      gradient: gradients.danger,
      priority: 7,
      content: (
        <div className="h-full flex flex-col justify-center items-center">
          <div className="relative">
            <div className="text-4xl font-bold text-gray-900">3</div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          </div>
          <div className="text-sm text-gray-600 mt-2">2 critical</div>
          <button className="mt-3 text-xs text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
            View all <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      )
    },
    {
      id: 'performance',
      size: 'tall',
      title: 'Performance Metrics',
      subtitle: '7-day overview',
      gradient: gradients.primary,
      priority: 8,
      content: (
        <div className="h-full overflow-y-auto">
          <PerformanceChart realtimeData={realtimeData} />
        </div>
      )
    },
    {
      id: 'activity',
      size: 'medium',
      title: 'Activity Feed',
      subtitle: 'Real-time updates',
      gradient: gradients.success,
      priority: 9,
      content: (
        <div className="h-full overflow-y-auto">
          <ActivityFeed />
        </div>
      )
    }
  ], [realtimeData, predictions, isProcessing, totalWorkers, avgProductivity])

  // Grid layout configuration
  const getGridLayout = () => {
    return 'grid-cols-12 gap-6'
  }

  // Get grid span classes with optimized heights and internal scrolling
  const getGridSpan = (size: BentoSize) => {
    const spans = {
      small: 'col-span-3 h-[400px]',    // Compact height for metrics and alerts
      medium: 'col-span-6 h-[520px]',   // Balanced height for charts and feeds
      large: 'col-span-6 h-[600px]',    // Generous height for detailed content
      hero: 'col-span-8 h-[600px]',     // Same as large for consistency
      wide: 'col-span-12 h-[720px]',    // Wide timeline with scrolling capability
      tall: 'col-span-4 h-[800px]',     // Tall performance charts with internal scroll
      fullmap: 'col-span-12 h-[600px]'  // Reasonable map height with internal navigation
    }
    
    console.log('BentoGrid: getGridSpan called', {
      size,
      className: spans[size],
      timestamp: new Date().toISOString()
    });
    
    return spans[size]
  }

  return (
    <div className="w-full">
      {/* Dashboard Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
        <p className="text-gray-600 mt-1">Real-time construction site analytics</p>
      </div>

      {/* Bento Grid */}
      <div className={`grid ${getGridLayout()}`}>
        <AnimatePresence mode="popLayout">
          {bentoItems.map((item, index) => (
              <motion.div
                key={item.id}
                className={`${getGridSpan(item.size)} group`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ 
                  delay: (item.delay || index * 0.05),
                  type: 'spring',
                  stiffness: 300,
                  damping: 30
                }}
                onHoverStart={() => setHoveredItem(item.id)}
                onHoverEnd={() => setHoveredItem(null)}
                layout
              >
                <GlassCard 
                  className="h-full p-6 cursor-pointer flex flex-col relative overflow-hidden"
                  variant="light"
                  blur="sm"
                  style={{
                    transform: hoveredItem === item.id ? 'translateY(-4px) scale(1.01)' : 'translateY(0) scale(1)',
                    boxShadow: hoveredItem === item.id 
                      ? '0 20px 40px rgba(0,0,0,0.12), 0 8px 16px rgba(0,0,0,0.08)' 
                      : '0 4px 12px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.03)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    borderColor: hoveredItem === item.id ? 'rgba(99, 102, 241, 0.2)' : 'rgba(229, 231, 235, 0.3)',
                  }}
                >
                  {/* Enhanced Gradient Overlay */}
                  <div 
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.gradient || gradients.primary} pointer-events-none transition-opacity duration-400`}
                    style={{
                      opacity: hoveredItem === item.id ? 0.15 : 0.08,
                    }}
                  />
                  
                  {/* Shimmer effect on hover */}
                  {hoveredItem === item.id && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                      style={{
                        background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                        transform: 'skewX(-20deg)',
                      }}
                    />
                  )}
                  
                  {/* Card Header */}
                  <div className="mb-4 relative z-10">
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    {item.subtitle && (
                      <p className="text-sm text-gray-600">{item.subtitle}</p>
                    )}
                  </div>

                  {/* Card Content with scroll */}
                  <div className="flex-1 relative z-10 overflow-y-auto overflow-x-hidden">
                    <div className="h-full">
                      {item.content}
                    </div>
                  </div>

                  {/* Enhanced Hover Effect Overlay */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none rounded-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredItem === item.id ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white/15 via-transparent to-white/5 rounded-xl" />
                    
                    {/* Corner accent */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/20 to-transparent rounded-xl" />
                    
                    {/* Enhanced chevron with background */}
                    <div className="absolute bottom-4 right-4">
                      <motion.div
                        className="relative"
                        animate={{ 
                          x: hoveredItem === item.id ? 0 : -10,
                          scale: hoveredItem === item.id ? 1.1 : 1
                        }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      >
                        {/* Chevron background */}
                        <div className="absolute inset-0 w-8 h-8 bg-white/60 rounded-full blur-sm -translate-x-1.5 -translate-y-1.5" />
                        <ChevronRight className="w-5 h-5 text-gray-700 relative" />
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Activity Indicator */}
                  {item.id === 'ai-brain' && isProcessing && (
                    <div className="absolute top-4 right-4">
                      <Activity className="w-5 h-5 text-violet-600 animate-pulse" />
                    </div>
                  )}
                </GlassCard>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

    </div>
  )
}