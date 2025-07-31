'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Layout, Settings, Eye, EyeOff, Maximize2, Minimize2, RefreshCw } from 'lucide-react'

interface WidgetUsage {
  widgetId: string
  views: number
  interactions: number
  timeSpent: number // in seconds
  lastAccessed: Date
  hidden: boolean
  position: { x: number; y: number }
  size: { w: number; h: number }
  priority: number // AI-calculated priority
}

interface LayoutPreference {
  userId: string
  favoriteWidgets: string[]
  hiddenWidgets: string[]
  layoutMode: 'compact' | 'comfortable' | 'spacious'
  colorScheme: 'vibrant' | 'minimal' | 'professional'
  dataRefreshRate: number // in seconds
  lastUpdated: Date
}

interface AdaptiveLayoutProps {
  widgets: React.ReactNode[]
  widgetIds: string[]
  onLayoutChange?: (layout: any) => void
  userId?: string
}

export default function AdaptiveLayout({ 
  widgets, 
  widgetIds, 
  onLayoutChange,
  userId = 'default-user' 
}: AdaptiveLayoutProps) {
  const [widgetUsage, setWidgetUsage] = useState<Map<string, WidgetUsage>>(new Map())
  const [preferences, setPreferences] = useState<LayoutPreference>({
    userId,
    favoriteWidgets: [],
    hiddenWidgets: [],
    layoutMode: 'comfortable',
    colorScheme: 'professional',
    dataRefreshRate: 30,
    lastUpdated: new Date()
  })
  const [isLearning, setIsLearning] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([])

  // Initialize widget usage tracking
  useEffect(() => {
    const initialUsage = new Map<string, WidgetUsage>()
    widgetIds.forEach((id, index) => {
      initialUsage.set(id, {
        widgetId: id,
        views: 0,
        interactions: 0,
        timeSpent: 0,
        lastAccessed: new Date(),
        hidden: false,
        position: { x: (index % 3) * 4, y: Math.floor(index / 3) * 4 },
        size: { w: 4, h: 4 },
        priority: 50
      })
    })
    setWidgetUsage(initialUsage)
  }, [widgetIds])

  // Track widget interactions
  const trackInteraction = useCallback((widgetId: string, type: 'view' | 'interact') => {
    setWidgetUsage(prev => {
      const usage = prev.get(widgetId)
      if (!usage) return prev

      const updated = new Map(prev)
      updated.set(widgetId, {
        ...usage,
        views: type === 'view' ? usage.views + 1 : usage.views,
        interactions: type === 'interact' ? usage.interactions + 1 : usage.interactions,
        lastAccessed: new Date()
      })
      return updated
    })
  }, [])

  // AI Learning Algorithm
  const runAILearning = useCallback(() => {
    setIsLearning(true)

    // Simulate AI processing
    setTimeout(() => {
      const suggestions: string[] = []
      const usageArray = Array.from(widgetUsage.entries())

      // Calculate AI priorities based on usage patterns
      usageArray.forEach(([id, usage]) => {
        let priority = 50 // Base priority

        // Factor in views and interactions
        priority += Math.min(usage.views * 2, 20)
        priority += Math.min(usage.interactions * 5, 30)

        // Time decay factor
        const daysSinceAccess = (Date.now() - usage.lastAccessed.getTime()) / (1000 * 60 * 60 * 24)
        priority -= Math.min(daysSinceAccess * 2, 20)

        // Update priority
        usage.priority = Math.max(0, Math.min(100, priority))
      })

      // Generate suggestions based on AI analysis
      // Find underutilized widgets
      const underutilized = usageArray
        .filter(([_, usage]) => usage.priority < 30 && !usage.hidden)
        .map(([id]) => id)

      if (underutilized.length > 0) {
        suggestions.push(`Consider hiding ${underutilized.length} rarely used widgets to declutter your dashboard`)
      }

      // Find frequently used widgets that could be enlarged
      const frequentlyUsed = usageArray
        .filter(([_, usage]) => usage.priority > 80)
        .map(([id]) => id)

      if (frequentlyUsed.length > 0) {
        suggestions.push(`Enlarge ${frequentlyUsed.length} frequently used widgets for better visibility`)
      }

      // Suggest layout mode based on widget count
      const visibleWidgets = usageArray.filter(([_, usage]) => !usage.hidden).length
      if (visibleWidgets > 6 && preferences.layoutMode !== 'compact') {
        suggestions.push('Switch to compact layout mode for better overview')
      } else if (visibleWidgets <= 3 && preferences.layoutMode !== 'spacious') {
        suggestions.push('Try spacious layout mode for focused work')
      }

      // Data refresh rate suggestion
      const avgInteractionRate = usageArray.reduce((sum, [_, usage]) => 
        sum + usage.interactions, 0) / usageArray.length

      if (avgInteractionRate > 10 && preferences.dataRefreshRate > 15) {
        suggestions.push('Increase data refresh rate for real-time monitoring')
      }

      setAiSuggestions(suggestions)
      setIsLearning(false)
      setShowSuggestions(true)
    }, 2000)
  }, [widgetUsage, preferences])

  // Auto-run AI learning periodically
  useEffect(() => {
    const interval = setInterval(() => {
      runAILearning()
    }, 60000) // Run every minute

    return () => clearInterval(interval)
  }, [runAILearning])

  // Apply AI suggestion
  const applySuggestion = (suggestion: string) => {
    if (suggestion.includes('hiding')) {
      // Hide underutilized widgets
      const underutilized = Array.from(widgetUsage.entries())
        .filter(([_, usage]) => usage.priority < 30)
        .map(([id]) => id)

      setPreferences(prev => ({
        ...prev,
        hiddenWidgets: [...prev.hiddenWidgets, ...underutilized]
      }))
    } else if (suggestion.includes('Enlarge')) {
      // Enlarge frequently used widgets
      const frequentlyUsed = Array.from(widgetUsage.entries())
        .filter(([_, usage]) => usage.priority > 80)

      frequentlyUsed.forEach(([id, usage]) => {
        usage.size = { w: 6, h: 6 }
      })
    } else if (suggestion.includes('compact layout')) {
      setPreferences(prev => ({ ...prev, layoutMode: 'compact' }))
    } else if (suggestion.includes('spacious layout')) {
      setPreferences(prev => ({ ...prev, layoutMode: 'spacious' }))
    }

    // Remove applied suggestion
    setAiSuggestions(prev => prev.filter(s => s !== suggestion))
  }

  const getLayoutClasses = () => {
    switch (preferences.layoutMode) {
      case 'compact': return 'gap-2 p-2'
      case 'comfortable': return 'gap-4 p-4'
      case 'spacious': return 'gap-6 p-6'
    }
  }

  return (
    <div className="relative">
      {/* AI Control Panel */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-indigo-600" />
            <h3 className="font-semibold text-gray-900">Adaptive AI Layout</h3>
          </div>
          <span className="text-xs text-gray-500">
            Learning your preferences...
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Layout Mode Selector */}
          <select
            value={preferences.layoutMode}
            onChange={(e) => setPreferences(prev => ({ 
              ...prev, 
              layoutMode: e.target.value as LayoutPreference['layoutMode']
            }))}
            className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="compact">Compact</option>
            <option value="comfortable">Comfortable</option>
            <option value="spacious">Spacious</option>
          </select>

          {/* AI Learning Button */}
          <motion.button
            onClick={runAILearning}
            disabled={isLearning}
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <RefreshCw className={`w-4 h-4 ${isLearning ? 'animate-spin' : ''}`} />
            {isLearning ? 'Learning...' : 'Run AI Analysis'}
          </motion.button>
        </div>
      </div>

      {/* AI Suggestions */}
      <AnimatePresence>
        {showSuggestions && aiSuggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 p-4 bg-indigo-50 border border-indigo-200 rounded-xl"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-indigo-600" />
                <h4 className="font-medium text-indigo-900">AI Layout Suggestions</h4>
              </div>
              <button
                onClick={() => setShowSuggestions(false)}
                className="text-indigo-600 hover:text-indigo-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              {aiSuggestions.map((suggestion, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-white rounded-lg"
                >
                  <p className="text-sm text-gray-700">{suggestion}</p>
                  <button
                    onClick={() => applySuggestion(suggestion)}
                    className="px-3 py-1 text-xs bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Apply
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Widget Grid with Adaptive Layout */}
      <motion.div 
        className={`grid grid-cols-12 ${getLayoutClasses()}`}
        layout
      >
        {widgets.map((widget, index) => {
          const widgetId = widgetIds[index]
          const usage = widgetUsage.get(widgetId)
          
          if (!usage || preferences.hiddenWidgets.includes(widgetId)) {
            return null
          }

          const priority = usage.priority || 50
          const gridSpan = preferences.layoutMode === 'compact' ? 4 : 
                          preferences.layoutMode === 'spacious' ? 12 : 
                          priority > 80 ? 8 : 6

          return (
            <motion.div
              key={widgetId}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`col-span-${gridSpan} relative group`}
              onMouseEnter={() => trackInteraction(widgetId, 'view')}
              onClick={() => trackInteraction(widgetId, 'interact')}
            >
              {/* Priority Indicator */}
              {priority > 70 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute -top-2 -right-2 z-10"
                >
                  <div className="px-2 py-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-medium rounded-full">
                    High Priority
                  </div>
                </motion.div>
              )}

              {/* Widget Actions */}
              <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setPreferences(prev => ({
                        ...prev,
                        hiddenWidgets: [...prev.hiddenWidgets, widgetId]
                      }))
                    }}
                    className="p-1.5 bg-white/90 rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
                  >
                    <EyeOff className="w-3 h-3 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Widget Content */}
              <div className="h-full">
                {widget}
              </div>

              {/* AI Learning Overlay */}
              {isLearning && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  className="absolute inset-0 bg-indigo-500 rounded-xl pointer-events-none"
                />
              )}
            </motion.div>
          )
        })}
      </motion.div>

      {/* Hidden Widgets Manager */}
      {preferences.hiddenWidgets.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 p-3 bg-gray-100 rounded-lg"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {preferences.hiddenWidgets.length} widgets hidden
            </p>
            <button
              onClick={() => setPreferences(prev => ({ ...prev, hiddenWidgets: [] }))}
              className="text-sm text-indigo-600 hover:text-indigo-700"
            >
              Show All
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}