'use client'

import { motion } from 'framer-motion'
import { Brain, Activity, Zap } from 'lucide-react'
import { useEffect, useState } from 'react'

interface NeuralCoreProps {
  isActive: boolean
  predictions: any[]
  onClick: () => void
}

export default function NeuralCore({ isActive, predictions, onClick }: NeuralCoreProps) {
  const [pulseIntensity, setPulseIntensity] = useState(0.5)
  const [neuralActivity, setNeuralActivity] = useState<number[]>(Array(8).fill(0))

  // Simulate neural activity
  useEffect(() => {
    const interval = setInterval(() => {
      setNeuralActivity(prev => 
        prev.map(() => Math.random() * (isActive ? 100 : 30))
      )
      setPulseIntensity(0.5 + Math.random() * (isActive ? 0.5 : 0.2))
    }, 1000)

    return () => clearInterval(interval)
  }, [isActive])

  return (
    <motion.div
      className="relative cursor-pointer"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Outer Ring - Rotating */}
      <motion.div
        className="absolute inset-0 w-48 h-48"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <linearGradient id="neuralGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <circle
            cx="100"
            cy="100"
            r="95"
            fill="none"
            stroke="url(#neuralGradient1)"
            strokeWidth="2"
            strokeDasharray="10 5"
          />
        </svg>
      </motion.div>

      {/* Middle Ring - Counter-rotating */}
      <motion.div
        className="absolute inset-4 w-40 h-40"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <linearGradient id="neuralGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EC4899" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          <circle
            cx="100"
            cy="100"
            r="95"
            fill="none"
            stroke="url(#neuralGradient2)"
            strokeWidth="3"
            strokeDasharray="5 10"
          />
        </svg>
      </motion.div>

      {/* Neural Synapses */}
      <div className="absolute inset-0 w-48 h-48">
        {neuralActivity.map((activity, index) => {
          const angle = (index * 45) * Math.PI / 180
          const radius = 60 + activity * 0.3
          const x = 96 + Math.cos(angle) * radius
          const y = 96 + Math.sin(angle) * radius

          return (
            <motion.div
              key={index}
              className="absolute w-2 h-2 bg-purple-400 rounded-full"
              style={{ left: x, top: y }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 2,
                delay: index * 0.2,
                repeat: Infinity
              }}
            />
          )
        })}
      </div>

      {/* Core Container */}
      <motion.div
        className="relative w-48 h-48 rounded-full bg-gradient-to-br from-purple-900/50 via-blue-900/50 to-teal-900/50 backdrop-blur-xl border-2 border-purple-400/50 shadow-2xl"
        animate={{
          boxShadow: [
            `0 0 30px rgba(168, 85, 247, ${pulseIntensity})`,
            `0 0 60px rgba(168, 85, 247, ${pulseIntensity * 0.7})`,
            `0 0 30px rgba(168, 85, 247, ${pulseIntensity})`
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {/* Inner Core */}
        <div className="absolute inset-8 rounded-full bg-gradient-to-br from-purple-600/30 to-blue-600/30 backdrop-blur-md flex items-center justify-center">
          {/* AI Brain Icon */}
          <motion.div
            animate={{
              scale: isActive ? [1, 1.1, 1] : 1,
              rotate: isActive ? [0, 5, -5, 0] : 0
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Brain className="w-16 h-16 text-gray-900" />
          </motion.div>

          {/* Activity Indicators */}
          {isActive && (
            <>
              <motion.div
                className="absolute top-2 right-2"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Activity className="w-4 h-4 text-green-400" />
              </motion.div>
              <motion.div
                className="absolute bottom-2 left-2"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
              >
                <Zap className="w-4 h-4 text-yellow-400" />
              </motion.div>
            </>
          )}
        </div>

        {/* Pulse Rings */}
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border border-purple-400/30"
            animate={{
              scale: [1, 1.3, 1.3],
              opacity: [0.5, 0, 0]
            }}
            transition={{
              duration: 3,
              delay: i * 1,
              repeat: Infinity
            }}
          />
        ))}

        {/* Status Text */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-sm font-medium text-gray-900 whitespace-nowrap">
            {isActive ? 'Processing Neural Networks' : 'Neural Core Online'}
          </p>
          {predictions.length > 0 && (
            <p className="text-xs text-purple-400 mt-1">
              {predictions.length} Active Predictions
            </p>
          )}
        </div>
      </motion.div>

      {/* Neural Connection Lines */}
      <svg className="absolute inset-0 w-48 h-48 pointer-events-none">
        <defs>
          <radialGradient id="neuralPulse">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </radialGradient>
        </defs>
        {isActive && (
          <>
            {/* Animated neural pathways */}
            {Array.from({ length: 4 }).map((_, i) => {
              const angle1 = (i * 90) * Math.PI / 180
              const angle2 = ((i + 1) * 90) * Math.PI / 180
              const x1 = 96 + Math.cos(angle1) * 70
              const y1 = 96 + Math.sin(angle1) * 70
              const x2 = 96 + Math.cos(angle2) * 70
              const y2 = 96 + Math.sin(angle2) * 70

              return (
                <motion.line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="url(#neuralPulse)"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 2,
                    delay: i * 0.5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              )
            })}
          </>
        )}
      </svg>
    </motion.div>
  )
}