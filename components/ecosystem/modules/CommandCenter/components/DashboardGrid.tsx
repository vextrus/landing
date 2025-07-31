'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Responsive, WidthProvider, Layout } from 'react-grid-layout'
import { GripVertical, Maximize2, Minimize2, Settings, Save, RotateCcw } from 'lucide-react'
import MetricCard from './widgets/MetricCard'
import ActivityFeed from './widgets/ActivityFeed'
import MapWidget from './widgets/MapWidget'
import TimelineWidget from './widgets/TimelineWidget'
import AIInsightsWidget from './widgets/AIInsightsWidget'
import PerformanceChart from './widgets/PerformanceChart'
import { AIPrediction } from '../index'

const ResponsiveGridLayout = WidthProvider(Responsive)

interface DashboardGridProps {
  realtimeData: any
  predictions: AIPrediction[]
  isProcessing: boolean
}

// Default layouts for different screen sizes
const defaultLayouts = {
  lg: [
    { i: 'header', x: 0, y: 0, w: 12, h: 2, static: true },
    { i: 'metric-portfolio', x: 0, y: 2, w: 3, h: 3 },
    { i: 'metric-sites', x: 3, y: 2, w: 3, h: 3 },
    { i: 'metric-workers', x: 6, y: 2, w: 3, h: 3 },
    { i: 'metric-productivity', x: 9, y: 2, w: 3, h: 3 },
    { i: 'map', x: 0, y: 5, w: 8, h: 6 },
    { i: 'ai-insights', x: 8, y: 5, w: 4, h: 6 },
    { i: 'timeline', x: 0, y: 11, w: 8, h: 5 },
    { i: 'activity', x: 8, y: 11, w: 4, h: 5 },
    { i: 'performance', x: 0, y: 16, w: 12, h: 6 }
  ],
  md: [
    { i: 'header', x: 0, y: 0, w: 10, h: 2, static: true },
    { i: 'metric-portfolio', x: 0, y: 2, w: 5, h: 3 },
    { i: 'metric-sites', x: 5, y: 2, w: 5, h: 3 },
    { i: 'metric-workers', x: 0, y: 5, w: 5, h: 3 },
    { i: 'metric-productivity', x: 5, y: 5, w: 5, h: 3 },
    { i: 'map', x: 0, y: 8, w: 10, h: 6 },
    { i: 'timeline', x: 0, y: 14, w: 10, h: 5 },
    { i: 'ai-insights', x: 0, y: 19, w: 5, h: 5 },
    { i: 'activity', x: 5, y: 19, w: 5, h: 5 },
    { i: 'performance', x: 0, y: 24, w: 10, h: 6 }
  ],
  sm: [
    { i: 'header', x: 0, y: 0, w: 6, h: 2, static: true },
    { i: 'metric-portfolio', x: 0, y: 2, w: 3, h: 3 },
    { i: 'metric-sites', x: 3, y: 2, w: 3, h: 3 },
    { i: 'metric-workers', x: 0, y: 5, w: 3, h: 3 },
    { i: 'metric-productivity', x: 3, y: 5, w: 3, h: 3 },
    { i: 'map', x: 0, y: 8, w: 6, h: 5 },
    { i: 'timeline', x: 0, y: 13, w: 6, h: 4 },
    { i: 'ai-insights', x: 0, y: 17, w: 6, h: 5 },
    { i: 'activity', x: 0, y: 22, w: 6, h: 5 },
    { i: 'performance', x: 0, y: 27, w: 6, h: 4 }
  ],
  xs: [
    { i: 'header', x: 0, y: 0, w: 4, h: 2, static: true },
    { i: 'metric-portfolio', x: 0, y: 2, w: 2, h: 3 },
    { i: 'metric-sites', x: 2, y: 2, w: 2, h: 3 },
    { i: 'metric-workers', x: 0, y: 5, w: 2, h: 3 },
    { i: 'metric-productivity', x: 2, y: 5, w: 2, h: 3 },
    { i: 'map', x: 0, y: 8, w: 4, h: 5 },
    { i: 'ai-insights', x: 0, y: 13, w: 4, h: 5 },
    { i: 'timeline', x: 0, y: 18, w: 4, h: 4 },
    { i: 'activity', x: 0, y: 22, w: 4, h: 5 },
    { i: 'performance', x: 0, y: 27, w: 4, h: 4 }
  ],
  xxs: [
    { i: 'header', x: 0, y: 0, w: 2, h: 2, static: true },
    { i: 'metric-portfolio', x: 0, y: 2, w: 2, h: 3 },
    { i: 'metric-sites', x: 0, y: 5, w: 2, h: 3 },
    { i: 'metric-workers', x: 0, y: 8, w: 2, h: 3 },
    { i: 'metric-productivity', x: 0, y: 11, w: 2, h: 3 },
    { i: 'map', x: 0, y: 14, w: 2, h: 5 },
    { i: 'ai-insights', x: 0, y: 19, w: 2, h: 5 },
    { i: 'timeline', x: 0, y: 24, w: 2, h: 4 },
    { i: 'activity', x: 0, y: 28, w: 2, h: 5 },
    { i: 'performance', x: 0, y: 33, w: 2, h: 4 }
  ]
}

export default function DashboardGrid({ realtimeData, predictions, isProcessing }: DashboardGridProps) {
  const [layouts, setLayouts] = useState(defaultLayouts)
  const [isDraggable, setIsDraggable] = useState(true)
  const [isLayoutEditing, setIsLayoutEditing] = useState(false)
  const [showLayoutSaved, setShowLayoutSaved] = useState(false)

  // Load saved layouts from localStorage
  useEffect(() => {
    const savedLayouts = localStorage.getItem('vextrus-dashboard-layouts')
    if (savedLayouts) {
      try {
        setLayouts(JSON.parse(savedLayouts))
      } catch (e) {
        console.error('Failed to load saved layouts:', e)
      }
    }
  }, [])

  // Save layouts to localStorage
  const handleLayoutChange = useCallback((currentLayout: Layout[], allLayouts: any) => {
    setLayouts(allLayouts)
    if (isLayoutEditing) {
      localStorage.setItem('vextrus-dashboard-layouts', JSON.stringify(allLayouts))
    }
  }, [isLayoutEditing])

  // Reset layouts
  const handleResetLayouts = () => {
    setLayouts(defaultLayouts)
    localStorage.removeItem('vextrus-dashboard-layouts')
    setShowLayoutSaved(true)
    setTimeout(() => setShowLayoutSaved(false), 2000)
  }

  // Save current layout
  const handleSaveLayout = () => {
    localStorage.setItem('vextrus-dashboard-layouts', JSON.stringify(layouts))
    setShowLayoutSaved(true)
    setTimeout(() => setShowLayoutSaved(false), 2000)
  }

  // Extract metrics from realtime data
  const metrics = realtimeData ? [
    {
      id: 'portfolio',
      label: 'Portfolio Value',
      value: '৳2,054 Cr',
      change: 12.5,
      trend: 'up' as const,
      sparkline: [30, 45, 42, 65, 78, 82, 95],
      color: '#8B5CF6'
    },
    {
      id: 'sites',
      label: 'Active Sites',
      value: '23',
      subLabel: '5 in Bashundhara',
      change: 2,
      trend: 'up' as const,
      color: '#10B981'
    },
    {
      id: 'workers',
      label: 'Active Workers',
      value: realtimeData.sites ? 
        (realtimeData.sites.bashundhara.workers + realtimeData.sites.jolshiri.workers).toLocaleString() : 
        '8,456',
      subLabel: '92% attendance',
      change: 5.2,
      trend: 'up' as const,
      color: '#F59E0B'
    },
    {
      id: 'productivity',
      label: 'Productivity',
      value: realtimeData.sites ? 
        `${Math.round((realtimeData.sites.bashundhara.productivity + realtimeData.sites.jolshiri.productivity) / 2)}%` : 
        '81%',
      change: -2.1,
      trend: 'down' as const,
      sparkline: [88, 90, 85, 82, 80, 78, 81],
      color: '#06B6D4'
    }
  ] : []

  // Create widget wrapper with drag handle
  const createWidget = (key: string, children: React.ReactNode) => (
    <div key={key} className="relative h-full">
      {isLayoutEditing && (
        <div className="absolute top-2 right-2 z-20 glass-popup rounded-lg p-2 cursor-move opacity-0 group-hover:opacity-100 transition-opacity">
          <GripVertical className="w-4 h-4 text-gray-600" />
        </div>
      )}
      <div className="h-full">
        {children}
      </div>
    </div>
  )

  return (
    <div className="relative">
      {/* Layout Controls */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <motion.button
            onClick={() => setIsLayoutEditing(!isLayoutEditing)}
            className={`px-3 sm:px-4 py-2 rounded-xl text-sm sm:text-base font-medium transition-all flex items-center gap-2 ${
              isLayoutEditing 
                ? 'bg-indigo-600 text-gray-900 shadow-lg' 
                : 'glass-light text-gray-700'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">{isLayoutEditing ? 'Editing Layout' : 'Edit Layout'}</span>
            <span className="sm:hidden">{isLayoutEditing ? 'Editing' : 'Edit'}</span>
          </motion.button>

          {isLayoutEditing && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <motion.button
                onClick={handleSaveLayout}
                className="px-3 sm:px-4 py-2 bg-green-600 text-gray-900 rounded-xl text-sm sm:text-base font-medium shadow-lg flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Save className="w-4 h-4" />
                <span className="hidden sm:inline">Save Layout</span>
                <span className="sm:hidden">Save</span>
              </motion.button>
              <motion.button
                onClick={handleResetLayouts}
                className="px-3 sm:px-4 py-2 glass-light text-gray-700 rounded-xl text-sm sm:text-base font-medium flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </motion.button>
            </motion.div>
          )}
        </div>

        {/* Save Confirmation */}
        <AnimatePresence>
          {showLayoutSaved && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="px-4 py-2 bg-green-500 text-gray-900 rounded-lg font-medium shadow-lg"
            >
              ✓ Layout Saved
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Grid Layout */}
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        onLayoutChange={handleLayoutChange}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={typeof window !== 'undefined' && window.innerWidth < 768 ? 60 : 80}
        isDraggable={isLayoutEditing}
        isResizable={isLayoutEditing}
        margin={[16, 16]}
        containerPadding={[0, 0]}
        useCSSTransforms={true}
        transformScale={1}
        preventCollision={false}
        compactType="vertical"
      >
        {/* Header */}
        {createWidget('header', (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-light rounded-2xl p-6 h-full flex flex-col justify-center"
          >
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Command Center
            </h1>
            <p className="text-xs sm:text-sm lg:text-base text-gray-600">Real-time construction operations intelligence</p>
          </motion.div>
        ))}

        {/* Metric Cards */}
        {metrics.map((metric, index) => 
          createWidget(`metric-${metric.id}`, (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="h-full"
            >
              <MetricCard {...metric} />
            </motion.div>
          ))
        )}

        {/* Map Widget */}
        {createWidget('map', (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="h-full"
          >
            <MapWidget realtimeData={realtimeData} />
          </motion.div>
        ))}

        {/* Timeline Widget */}
        {createWidget('timeline', (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="h-full"
          >
            <TimelineWidget />
          </motion.div>
        ))}

        {/* AI Insights */}
        {createWidget('ai-insights', (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="h-full"
          >
            <AIInsightsWidget 
              predictions={predictions}
              isProcessing={isProcessing}
            />
          </motion.div>
        ))}

        {/* Activity Feed */}
        {createWidget('activity', (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="h-full"
          >
            <ActivityFeed />
          </motion.div>
        ))}

        {/* Performance Chart */}
        {createWidget('performance', (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="h-full"
          >
            <PerformanceChart realtimeData={realtimeData} />
          </motion.div>
        ))}
      </ResponsiveGridLayout>

      {/* Grid Style Override */}
      <style jsx global>{`
        .react-grid-item {
          transition: all 200ms ease;
          transition-property: left, top, width, height;
        }
        .react-grid-item.cssTransforms {
          transition-property: transform, width, height;
        }
        .react-grid-item.resizing {
          z-index: 1;
          will-change: width, height;
        }
        .react-grid-item.react-draggable-dragging {
          transition: none;
          z-index: 3;
          will-change: transform;
          cursor: move !important;
        }
        .react-grid-item.react-grid-placeholder {
          background: rgb(99, 102, 241, 0.1);
          border: 2px dashed rgb(99, 102, 241);
          border-radius: 1rem;
          transition-duration: 100ms;
          z-index: 2;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          -o-user-select: none;
          user-select: none;
        }
        .react-grid-item > .react-resizable-handle {
          position: absolute;
          width: 20px;
          height: 20px;
          background: transparent;
        }
        .react-grid-item > .react-resizable-handle::after {
          content: "";
          position: absolute;
          right: 3px;
          bottom: 3px;
          width: 8px;
          height: 8px;
          border-right: 2px solid rgb(99, 102, 241);
          border-bottom: 2px solid rgb(99, 102, 241);
          opacity: 0;
          transition: opacity 200ms ease;
        }
        .react-grid-item:hover > .react-resizable-handle::after {
          opacity: 1;
        }
      `}</style>
    </div>
  )
}