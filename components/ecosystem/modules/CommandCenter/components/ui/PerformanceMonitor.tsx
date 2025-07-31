'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, Zap, HardDrive, Gauge } from 'lucide-react'

export function PerformanceMonitor() {
  const [isVisible, setIsVisible] = useState(false)
  const [fps, setFps] = useState(0)
  const [memory, setMemory] = useState({ used: 0, total: 0 })
  const [renderTime, setRenderTime] = useState(0)
  const frameRef = useRef<number>(0)
  const lastTimeRef = useRef<number>(performance.now())

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') return

    let animationFrame: number

    const measureFPS = () => {
      const currentTime = performance.now()
      const delta = currentTime - lastTimeRef.current
      
      if (delta >= 1000) {
        setFps(Math.round((frameRef.current * 1000) / delta))
        frameRef.current = 0
        lastTimeRef.current = currentTime
      }
      
      frameRef.current++

      // Measure memory if available
      if ('memory' in performance) {
        const memInfo = (performance as any).memory
        setMemory({
          used: Math.round(memInfo.usedJSHeapSize / 1048576),
          total: Math.round(memInfo.jsHeapSizeLimit / 1048576)
        })
      }

      animationFrame = requestAnimationFrame(measureFPS)
    }

    animationFrame = requestAnimationFrame(measureFPS)

    // Keyboard shortcut to toggle monitor
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setIsVisible(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyPress)

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  if (process.env.NODE_ENV !== 'development') return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed bottom-4 right-4 glass-popup rounded-xl p-4 shadow-2xl border border-gray-200/50 z-50 min-w-[200px]"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-900">Performance</h3>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>

          <div className="space-y-2">
            {/* FPS */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <Gauge className="w-3 h-3" />
                <span>FPS</span>
              </div>
              <span className={`text-sm font-mono font-bold ${
                fps >= 55 ? 'text-green-500' : fps >= 30 ? 'text-yellow-500' : 'text-red-500'
              }`}>
                {fps}
              </span>
            </div>

            {/* Memory */}
            {memory.total > 0 && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <HardDrive className="w-3 h-3" />
                  <span>Memory</span>
                </div>
                <span className="text-sm font-mono">
                  {memory.used}MB
                </span>
              </div>
            )}

            {/* Performance Bar */}
            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-gray-600">Performance</span>
                <span className={`font-medium ${
                  fps >= 55 ? 'text-green-500' : fps >= 30 ? 'text-yellow-500' : 'text-red-500'
                }`}>
                  {fps >= 55 ? 'Excellent' : fps >= 30 ? 'Good' : 'Poor'}
                </span>
              </div>
              <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full ${
                    fps >= 55 ? 'bg-green-500' : fps >= 30 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  animate={{ width: `${Math.min((fps / 60) * 100, 100)}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </div>

          <div className="mt-3 text-xs text-gray-500 text-center">
            Ctrl+Shift+P to toggle
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}