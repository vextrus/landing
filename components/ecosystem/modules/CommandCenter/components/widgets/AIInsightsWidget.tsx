'use client'

import { useState, useMemo, useCallback, useRef, useEffect, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, 
  AlertTriangle, 
  TrendingUp, 
  Lightbulb, 
  Loader2, 
  ChevronRight,
  Sparkles,
  Zap,
  Shield,
  Target,
  Activity,
  Clock
} from 'lucide-react'
import { AIPrediction } from '../../index'

interface AIInsightsWidgetProps {
  predictions: AIPrediction[]
  isProcessing: boolean
}

const defaultPredictions: AIPrediction[] = [
  // Smart Alerts (Critical warnings first)
  {
    id: '1',
    type: 'warning',
    confidence: 98,
    message: 'CRITICAL: Safety equipment inspection overdue at Tower B',
    impact: 'High - Work stoppage required until resolved',
    actions: ['Schedule immediate safety inspection', 'Halt work until cleared', 'Contact safety officer']
  },
  {
    id: '2', 
    type: 'warning',
    confidence: 92,
    message: 'Material shortage predicted for next week',
    impact: 'High - May delay Tower B by 3 days',
    actions: ['Order steel reinforcement now', 'Contact alternative suppliers']
  },
  // Auto Insights (Opportunities and recommendations)
  {
    id: '3',
    type: 'opportunity',
    confidence: 87,
    message: 'Optimal concrete pouring window detected',
    impact: 'Medium - Can accelerate schedule by 2 days',
    actions: ['Schedule concrete trucks for Thursday', 'Prepare additional workforce']
  },
  {
    id: '4',
    type: 'recommendation',
    confidence: 95,
    message: 'Reallocate workers from Plaza to Tower A',
    impact: 'High - Improve efficiency by 15%',
    actions: ['Shift 20 workers tomorrow', 'Update work schedules']
  }
]

function AIInsightsWidget({ predictions, isProcessing }: AIInsightsWidgetProps) {
  // Debug logging to track re-renders
  useEffect(() => {
    console.log('AIInsightsWidget: Re-rendered', {
      predictionsLength: predictions?.length || 0,
      isProcessing,
      timestamp: new Date().toISOString()
    });
  });
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  
  // Stable predictions with proper fallback logic
  const activePredictions = useMemo(() => {
    console.log('AIInsightsWidget: Computing activePredictions', {
      predictions: predictions?.length || 0,
      defaultPredictions: defaultPredictions.length,
      usingRealPredictions: predictions && predictions.length > 0
    });

    // Use real predictions if available, fallback to defaults
    if (predictions && predictions.length > 0) {
      // Validate and filter predictions to ensure they have required fields
      const validPredictions = predictions.filter(p => 
        p && p.id && p.type && p.message && p.confidence && p.actions
      );
      
      if (validPredictions.length > 0) {
        return validPredictions.slice(0, 4); // Limit to 4 items for UI stability
      }
    }
    
    // Fallback to default predictions
    return defaultPredictions
  }, [predictions])
  
  // Stable callback functions to prevent re-renders
  const handleExpandToggle = useCallback((id: string) => {
    setExpandedId(prev => prev === id ? null : id)
  }, [])
  
  const handleHoverStart = useCallback((id: string) => {
    setHoveredId(id)
  }, [])
  
  const handleHoverEnd = useCallback(() => {
    setHoveredId(null)
  }, [])

  const getIcon = (type: AIPrediction['type']) => {
    switch (type) {
      case 'warning': return AlertTriangle
      case 'opportunity': return TrendingUp
      case 'recommendation': return Lightbulb
    }
  }

  const getColor = (type: AIPrediction['type']) => {
    switch (type) {
      case 'warning': return '#F59E0B'
      case 'opportunity': return '#10B981'
      case 'recommendation': return '#6366F1'
    }
  }

  const getGradient = (type: AIPrediction['type']) => {
    switch (type) {
      case 'warning': return 'from-amber-400 to-orange-500'
      case 'opportunity': return 'from-green-400 to-emerald-500'
      case 'recommendation': return 'from-indigo-400 to-purple-500'
    }
  }

  const getSecondaryIcon = (type: AIPrediction['type']) => {
    switch (type) {
      case 'warning': return Shield
      case 'opportunity': return Target
      case 'recommendation': return Zap
    }
  }

  return (
    <motion.div 
      className="h-full flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Enhanced Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            {isProcessing && (
              <motion.div
                className="absolute -inset-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-14 h-14 border-2 border-purple-500 rounded-xl animate-spin" 
                     style={{ borderTopColor: 'transparent', borderRightColor: 'transparent' }} />
              </motion.div>
            )}
            {/* Sparkle effect */}
            <motion.div
              className="absolute -top-1 -right-1"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
            >
              <Sparkles className="w-3 h-3 text-yellow-400" />
            </motion.div>
          </motion.div>
          <div>
            <h3 className="font-semibold text-gray-900">Smart Alerts & Auto Insights</h3>
            <p className="text-xs text-gray-600">Critical warnings first, then AI recommendations</p>
          </div>
        </div>
        
        {/* Processing indicator */}
        <AnimatePresence>
          {isProcessing && (
            <motion.div 
              className="flex items-center gap-2 px-3 py-1 bg-purple-50 rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <Loader2 className="w-3 h-3 text-purple-600 animate-spin" />
              <span className="text-xs text-purple-600 font-medium">Analyzing...</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Insights List with scrollable area */}
      <div className="flex-1 overflow-y-auto space-y-3 pb-2">
        {activePredictions.slice(0, 4).map((prediction, index) => {
          const Icon = getIcon(prediction.type)
          const SecondaryIcon = getSecondaryIcon(prediction.type)
          const color = getColor(prediction.type)
          const gradient = getGradient(prediction.type)
          const isExpanded = expandedId === prediction.id
          const isHovered = hoveredId === prediction.id

          return (
            <motion.div
              key={prediction.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.05,
                layout: { type: "spring", stiffness: 350, damping: 25 }
              }}
              onHoverStart={() => handleHoverStart(prediction.id)}
              onHoverEnd={handleHoverEnd}
              className="relative"
            >
              <motion.div
                className={`relative p-4 bg-white rounded-xl border transition-all cursor-pointer ${
                  isHovered ? 'border-gray-300 shadow-lg' : 'border-gray-200 shadow-sm'
                }`}
                onClick={() => handleExpandToggle(prediction.id)}
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                {/* Background gradient effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 rounded-xl`}
                  animate={{ opacity: isHovered ? 0.05 : 0 }}
                  transition={{ duration: 0.2 }}
                />
                
                {/* Main Content */}
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start gap-3">
                    <motion.div 
                      className="relative flex-shrink-0"
                      animate={{ rotate: isHovered ? [0, -10, 10, 0] : 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${color}20` }}
                      >
                        <Icon className="w-5 h-5" style={{ color }} />
                      </div>
                      {/* Secondary icon on hover */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                          >
                            <SecondaryIcon className="w-3 h-3" style={{ color }} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                    
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 leading-tight">{prediction.message}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <motion.span 
                          className="inline-flex items-center gap-1 text-xs bg-gray-100 px-2 py-0.5 rounded-full"
                          animate={{ scale: isHovered ? 1.05 : 1 }}
                        >
                          <Activity className="w-3 h-3" style={{ color }} />
                          <span className="font-mono font-medium">{prediction.confidence}%</span>
                        </motion.span>
                        <span className="text-xs text-gray-500">{prediction.impact}</span>
                      </div>
                    </div>
                    
                    <motion.div
                      animate={{ rotate: isExpanded ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </motion.div>
                  </div>

                  {/* Confidence Bar */}
                  <div className="mt-3">
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${gradient} relative`}
                        initial={{ width: 0 }}
                        animate={{ width: `${prediction.confidence}%` }}
                        transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                      >
                        {/* Shimmer effect */}
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                          animate={{ x: [-100, 100] }}
                          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                        />
                      </motion.div>
                    </div>
                  </div>

                  {/* Expanded Actions */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 pt-3 border-t border-gray-100 space-y-2">
                          <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                            <Clock className="w-3 h-3" />
                            <span>Recommended Actions</span>
                          </div>
                          {prediction.actions.map((action, actionIndex) => (
                            <motion.div
                              key={actionIndex}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: actionIndex * 0.05 }}
                              className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                              <div 
                                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                style={{ backgroundColor: color }}
                              />
                              <span className="text-xs text-gray-700">{action}</span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Hover glow effect */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      className="absolute inset-0 rounded-xl pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{
                        background: `radial-gradient(circle at center, ${color}10 0%, transparent 70%)`,
                        filter: 'blur(20px)'
                      }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )
        })}
      </div>

      {/* View All Button */}
      <motion.button
        className="w-full mt-3 py-2.5 bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 text-indigo-600 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 border border-indigo-200/50 group"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <Brain className="w-4 h-4" />
        <span>View All AI Insights</span>
        <motion.div
          className="group-hover:translate-x-1 transition-transform"
        >
          <ChevronRight className="w-4 h-4" />
        </motion.div>
      </motion.button>
    </motion.div>
  )
}

// Memoize component with optimized comparison
export default memo(AIInsightsWidget, (prevProps, nextProps) => {
  // Efficient shallow comparison for better performance
  const isEqual = (
    prevProps.isProcessing === nextProps.isProcessing &&
    prevProps.predictions === nextProps.predictions && // Reference comparison is sufficient
    prevProps.predictions?.length === nextProps.predictions?.length
  );
  
  console.log('AIInsightsWidget: memo comparison', {
    isEqual,
    prevProcessing: prevProps.isProcessing,
    nextProcessing: nextProps.isProcessing,
    prevPredictionsLength: prevProps.predictions?.length || 0,
    nextPredictionsLength: nextProps.predictions?.length || 0,
    referenceEqual: prevProps.predictions === nextProps.predictions
  });
  
  return isEqual;
});